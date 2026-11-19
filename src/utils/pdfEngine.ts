import * as bundledPdfjs from '../vendor/pdfjs/pdf.min.mjs';
import * as bundledPdfjsWorker from '../vendor/pdfjs/pdf.worker.min.mjs';

let pdfjsLibPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLibPromise) return pdfjsLibPromise;
  pdfjsLibPromise = (async () => {
    try {
      // Register the genuine PDF.js WorkerMessageHandler on globalThis so PDF.js v5
      // runs in-process reliably inside both Web browsers and standalone Android APK WebViews
      // without ever failing on worker file URLs or falling back to text cards.
      if (typeof globalThis !== 'undefined' && bundledPdfjsWorker) {
        (globalThis as any).pdfjsWorker = bundledPdfjsWorker;
      }
      const pdfjs: any = (bundledPdfjs as any)?.default || bundledPdfjs;
      if (pdfjs?.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.mjs';
      }
      return pdfjs;
    } catch (err) {
      console.warn('Bundled PDF.js initialization warning:', err);
      return null;
    }
  })();
  return pdfjsLibPromise;
}

/**
 * Checks if a text snippet is genuine human-readable academic text and NOT
 * raw PDF binary / compressed stream garbage (e.g. "[ n 7 : w $ Y L.- Z0 JL2 * sIwu").
 */
export function isHumanReadableAcademicText(text: string): boolean {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length < 15) return false;

  const words = cleaned.split(' ');
  const realWords = words.filter((w) => /^[A-Za-z]{3,}[.,;:?!)]*$/.test(w));
  if (realWords.length < 3) return false;
  if (realWords.length / Math.max(1, words.length) < 0.35) return false;

  let alphaNumericAndSpace = 0;
  let weirdSymbols = 0;
  for (let i = 0; i < cleaned.length; i++) {
    const code = cleaned.charCodeAt(i);
    const ch = cleaned[i];
    if (
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 48 && code <= 57) ||
      ch === ' ' ||
      '.,;:?!()-/\'"%+=×÷°'.includes(ch)
    ) {
      alphaNumericAndSpace++;
    } else if ('~^\\|@#$%*{}`[]<>_'.includes(ch) || code < 32 || code > 126) {
      weirdSymbols++;
    }
  }

  if (weirdSymbols / cleaned.length > 0.08) return false;
  if (alphaNumericAndSpace / cleaned.length < 0.82) return false;

  return true;
}

function findSubarray(haystack: Uint8Array, needle: number[], startIndex: number): number {
  const max = haystack.length - needle.length;
  outer: for (let i = Math.max(0, startIndex); i <= max; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

async function inflateFlateStream(compressed: Uint8Array): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === 'undefined') return null;

  for (const format of ['deflate', 'deflate-raw'] as const) {
    try {
      const ds = new DecompressionStream(format);
      const writer = ds.writable.getWriter();
      writer.write(new Uint8Array(compressed)).catch(() => {});
      writer.close().catch(() => {});

      const reader = ds.readable.getReader();
      const chunks: Uint8Array[] = [];
      let totalLen = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          totalLen += value.length;
          if (totalLen > 2_500_000) break;
        }
      }

      if (totalLen > 0) {
        const result = new Uint8Array(totalLen);
        let offset = 0;
        for (const c of chunks) {
          result.set(c, offset);
          offset += c.length;
        }
        return result;
      }
    } catch {
      // try next format
    }
  }
  return null;
}

function decodePdfLiteralString(raw: string): string {
  return raw
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
    .replace(/\\([0-7]{1,3})/g, (_, oct) => {
      const code = parseInt(oct, 8);
      return code >= 32 && code <= 126 ? String.fromCharCode(code) : ' ';
    });
}

function extractTextOperatorsFromStreamContent(content: string): string[] {
  const extractedLines: string[] = [];

  const btEtRegex = /BT[\s\S]{1,25000}?ET/g;
  const blocks = content.match(btEtRegex) || [content];

  for (const block of blocks) {
    const lineParts: string[] = [];

    const tjArrayRegex = /\[([^\]]{1,4000})\]\s*TJ/g;
    let tjMatch: RegExpExecArray | null;
    while ((tjMatch = tjArrayRegex.exec(block)) !== null) {
      const inner = tjMatch[1];
      const litRegex = /\((?:\\.|[^\\()])*\)/g;
      let lit: RegExpExecArray | null;
      let wordBuf = '';
      while ((lit = litRegex.exec(inner)) !== null) {
        const decoded = decodePdfLiteralString(lit[0].slice(1, -1));
        wordBuf += decoded;
      }
      if (wordBuf.trim()) {
        lineParts.push(wordBuf.trim());
      }
    }

    const singleTjRegex = /\((?:\\.|[^\\()])*\)\s*(?:Tj|'|")/g;
    let sMatch: RegExpExecArray | null;
    while ((sMatch = singleTjRegex.exec(block)) !== null) {
      const parenEnd = sMatch[0].lastIndexOf(')');
      if (parenEnd > 1) {
        const decoded = decodePdfLiteralString(sMatch[0].slice(1, parenEnd));
        if (decoded.trim()) {
          lineParts.push(decoded.trim());
        }
      }
    }

    if (lineParts.length > 0) {
      const joined = lineParts.join(' ').replace(/\s+/g, ' ').trim();
      if (isHumanReadableAcademicText(joined)) {
        extractedLines.push(joined);
      }
    }
  }

  return extractedLines;
}

async function extractTextViaNativeStreamDecompression(
  bytes: Uint8Array,
  onProgress?: (status: string, percent: number) => void
): Promise<{ fullText: string; pageTexts: string[]; numPages: number }> {
  const decoder = new TextDecoder('latin1');
  const rawAscii = decoder.decode(bytes.slice(0, Math.min(bytes.length, 4_000_000)));

  const pageMatches = rawAscii.match(/\/Type\s*\/Page\b/g);
  const estimatedPages = Math.max(1, pageMatches ? pageMatches.length : 1);

  const streamMarker = [115, 116, 114, 101, 97, 109]; // "stream"
  const endstreamMarker = [101, 110, 100, 115, 116, 114, 101, 97, 109]; // "endstream"

  const cleanParagraphs: string[] = [];
  let pos = 0;
  let streamCount = 0;
  const maxStreams = 600;

  while (pos < bytes.length && streamCount < maxStreams) {
    const sIdx = findSubarray(bytes, streamMarker, pos);
    if (sIdx === -1) break;

    if (sIdx >= 3 && bytes[sIdx - 3] === 101 && bytes[sIdx - 2] === 110 && bytes[sIdx - 1] === 100) {
      pos = sIdx + 6;
      continue;
    }

    let dataStart = sIdx + 6;
    if (bytes[dataStart] === 13 && bytes[dataStart + 1] === 10) dataStart += 2;
    else if (bytes[dataStart] === 10 || bytes[dataStart] === 13) dataStart += 1;

    const eIdx = findSubarray(bytes, endstreamMarker, dataStart);
    if (eIdx === -1) break;

    let dataEnd = eIdx;
    if (dataEnd > dataStart && (bytes[dataEnd - 1] === 10 || bytes[dataEnd - 1] === 13)) dataEnd--;
    if (dataEnd > dataStart && bytes[dataEnd - 1] === 13) dataEnd--;

    const streamLen = dataEnd - dataStart;
    if (streamLen > 10 && streamLen < 1_000_000) {
      streamCount++;
      if (streamCount % 25 === 0) {
        onProgress?.(
          `Scanning PDF streams (${streamCount})...`,
          Math.min(85, 20 + Math.round((sIdx / bytes.length) * 65))
        );
      }

      const slice = bytes.subarray(dataStart, dataEnd);
      const inflated = await inflateFlateStream(slice);
      const textSource = inflated ? decoder.decode(inflated) : decoder.decode(slice);

      if (textSource.includes('Tj') || textSource.includes('TJ')) {
        const lines = extractTextOperatorsFromStreamContent(textSource);
        for (const l of lines) {
          cleanParagraphs.push(l);
        }
      }
    }

    pos = eIdx + 9;
  }

  const pageTexts: string[] = [];
  const chunkSize = 8;
  for (let i = 0; i < cleanParagraphs.length; i += chunkSize) {
    pageTexts.push(cleanParagraphs.slice(i, i + chunkSize).join('\n\n'));
  }

  return {
    fullText: cleanParagraphs.join('\n\n'),
    pageTexts,
    numPages: Math.max(estimatedPages, pageTexts.length),
  };
}

/**
 * Extracts clean, human-readable text from a PDF Uint8Array.
 */
export async function extractPdfTextWithEngine(
  bytes: Uint8Array,
  onProgress?: (status: string, percent: number) => void
): Promise<{ fullText: string; pageTexts: string[]; numPages: number }> {
  onProgress?.('Opening PDF document...', 15);

  const pdfjs = await loadPdfJs();
  if (pdfjs && typeof pdfjs.getDocument === 'function') {
    try {
      const bytesCopy = new Uint8Array(bytes.length);
      bytesCopy.set(bytes);

      const loadingTask = pdfjs.getDocument({
        data: bytesCopy,
        isEvalSupported: false,
        useSystemFonts: true,
      });

      const doc = await loadingTask.promise;
      const numPages = doc.numPages || 1;
      const pageTexts: string[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        if (pageNum === 1 || pageNum % 5 === 0 || pageNum === numPages) {
          onProgress?.(
            `Reading PDF page ${pageNum} of ${numPages}...`,
            Math.min(90, 20 + Math.round((pageNum / numPages) * 70))
          );
        }
        const page = await doc.getPage(pageNum);
        const textContent = await page.getTextContent();
        const rawPageStr = (textContent.items || [])
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (isHumanReadableAcademicText(rawPageStr)) {
          pageTexts.push(rawPageStr);
        }
      }

      if (pageTexts.join(' ').trim().length > 80) {
        return {
          fullText: pageTexts.join('\n\n'),
          pageTexts,
          numPages: doc.numPages || pageTexts.length,
        };
      }
    } catch (err) {
      console.warn('PDF.js text extraction notice, falling back to stream decompression:', err);
    }
  }

  return extractTextViaNativeStreamDecompression(bytes, onProgress);
}

export interface RenderedPdfPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
  text?: string;
}

export interface ProgressivePdfController {
  requestPriorityPage: (pageNumber: number) => void;
  cancel: () => void;
}

function wrapCanvasLine(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function renderFallbackPagesToImages(
  bytes: Uint8Array,
  onProgress?: (status: string, percent: number) => void
): Promise<{ pages: RenderedPdfPage[]; numPages: number }> {
  const extracted = await extractTextViaNativeStreamDecompression(bytes, onProgress);
  const rawParagraphs = extracted.fullText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const pagesText: string[][] = [];
  let currentBucket: string[] = [];
  let currentCharCount = 0;

  for (const p of rawParagraphs) {
    currentBucket.push(p);
    currentCharCount += p.length;
    if (currentCharCount >= 1400) {
      pagesText.push(currentBucket);
      currentBucket = [];
      currentCharCount = 0;
    }
  }
  if (currentBucket.length > 0) {
    pagesText.push(currentBucket);
  }

  const totalPages = Math.max(1, pagesText.length || extracted.numPages || 1);
  const rendered: RenderedPdfPage[] = [];
  const canvas = document.createElement('canvas');

  for (let idx = 0; idx < totalPages; idx++) {
    const pageNum = idx + 1;
    onProgress?.(
      `Rendering page ${pageNum} of ${totalPages}...`,
      Math.min(98, 50 + Math.round((pageNum / totalPages) * 48))
    );

    const width = 900;
    const height = 1260;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, 54);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.fillText(`FRESHMAN ACADEMY DOCUMENT READER`, 48, 34);
    ctx.textAlign = 'right';
    ctx.fillText(`Page ${pageNum} of ${totalPages}`, width - 48, 34);
    ctx.textAlign = 'left';

    const paragraphs = pagesText[idx] || [];
    let y = 104;

    if (paragraphs.length > 0) {
      ctx.fillStyle = '#1e293b';
      ctx.font = '19px Georgia, Cambria, serif';
      for (const para of paragraphs) {
        const lines = wrapCanvasLine(ctx, para, width - 110);
        for (const line of lines) {
          if (y > height - 70) break;
          ctx.fillText(line, 55, y);
          y += 30;
        }
        y += 16;
        if (y > height - 70) break;
      }
    }

    rendered.push({
      pageNumber: pageNum,
      dataUrl: canvas.toDataURL('image/jpeg', 0.88),
      width,
      height,
      text: paragraphs.join('\n\n'),
    });
  }

  canvas.width = 0;
  canvas.height = 0;
  return { pages: rendered, numPages: totalPages };
}

/**
 * Progressive & Priority Full-Document PDF Renderer.
 * - Opens the PDF via the bundled Mozilla PDF.js v5 engine (`src/vendor/pdfjs/`).
 * - Renders ALL pages (1..numPages, whether 80, 148, or 500+ pages — ZERO page limit!).
 * - Immediately emits `onDocumentReady` after rendering the first 3 pages so the reader
 *   displays the full 1..numPages scrollbar right away.
 * - Supports `requestPriorityPage(pageNum)` so scrolling or jumping to page 80..148
 *   renders those exact visible pages immediately before continuing background pages.
 * - Reuses a single offscreen `<canvas>` and JPEG encoding (`0.88`) so Android WebView
 *   never runs out of GPU canvas memory on large 148+ page textbooks.
 */
export function openProgressivePdfRenderer(params: {
  bytes: Uint8Array;
  scale?: number;
  onProgress?: (status: string, percent: number) => void;
  onDocumentReady: (info: {
    numPages: number;
    defaultWidth: number;
    defaultHeight: number;
    initialPages: RenderedPdfPage[];
  }) => void;
  onPageRendered: (page: RenderedPdfPage) => void;
  onError?: (err: Error) => void;
}): ProgressivePdfController {
  const { bytes, scale = 1.65, onProgress, onDocumentReady, onPageRendered, onError } = params;
  let cancelled = false;
  const priorityQueue: number[] = [];
  const renderedSet = new Set<number>();
  let pdfDocRef: any = null;

  const requestPriorityPage = (pageNum: number) => {
    if (cancelled) return;
    // Queue the target page and its immediate neighbors so scrolling anywhere is instant
    const candidates = [pageNum, pageNum + 1, pageNum - 1, pageNum + 2, pageNum + 3];
    for (let i = candidates.length - 1; i >= 0; i--) {
      const p = candidates[i];
      if (p >= 1 && !renderedSet.has(p)) {
        const existingIdx = priorityQueue.indexOf(p);
        if (existingIdx !== -1) {
          priorityQueue.splice(existingIdx, 1);
        }
        priorityQueue.unshift(p);
      }
    }
  };

  const cancel = () => {
    cancelled = true;
    try {
      if (pdfDocRef && typeof pdfDocRef.destroy === 'function') {
        pdfDocRef.destroy();
      }
    } catch {
      // ignore destroy errors
    }
  };

  (async () => {
    try {
      onProgress?.('Loading PDF Engine...', 12);
      const pdfjs = await loadPdfJs();

      if (pdfjs && typeof pdfjs.getDocument === 'function') {
        const bytesCopy = new Uint8Array(bytes.length);
        bytesCopy.set(bytes);

        const loadingTask = pdfjs.getDocument({
          data: bytesCopy,
          isEvalSupported: false,
          useSystemFonts: true,
        });

        const doc = await loadingTask.promise;
        pdfDocRef = doc;
        if (cancelled) return;

        const numPages: number = doc.numPages || 1;
        onProgress?.(`Opening ${numPages}-page PDF...`, 28);

        // Reusable single offscreen canvas to prevent mobile WebView GPU memory exhaustion
        const canvas = document.createElement('canvas');
        let defaultWidth = 900;
        let defaultHeight = 1260;

        const renderSinglePage = async (pageNum: number): Promise<RenderedPdfPage | null> => {
          if (cancelled || pageNum < 1 || pageNum > numPages || renderedSet.has(pageNum)) {
            return null;
          }
          renderedSet.add(pageNum);

          const page = await doc.getPage(pageNum);
          if (cancelled) return null;

          const baseViewport = page.getViewport({ scale: 1 });
          // Cap max pixel dimension at 1800px so huge poster-sized pages stay crisp without exhausting RAM
          const maxDim = Math.max(baseViewport.width || 600, baseViewport.height || 800, 1);
          const effectiveScale = Math.min(scale, 1800 / maxDim);
          const viewport = page.getViewport({ scale: Math.max(1.15, effectiveScale) });

          const width = Math.max(1, Math.floor(viewport.width));
          const height = Math.max(1, Math.floor(viewport.height));

          if (pageNum === 1) {
            defaultWidth = width;
            defaultHeight = height;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d', { alpha: false });
          if (!ctx) return null;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);

          await page.render({
            canvasContext: ctx,
            viewport,
          }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          try {
            if (typeof page.cleanup === 'function') {
              page.cleanup();
            }
          } catch {
            // ignore page cleanup errors
          }

          return {
            pageNumber: pageNum,
            dataUrl,
            width,
            height,
          };
        };

        // 1. Render initial pages (1..min(3, numPages)) so the PDF opens in < 0.5s with full 1..numPages scrollbar
        const initialBatchCount = Math.min(numPages, 3);
        const initialPages: RenderedPdfPage[] = [];

        for (let p = 1; p <= initialBatchCount; p++) {
          if (cancelled) break;
          onProgress?.(
            `Preparing page ${p} of ${numPages}...`,
            Math.min(90, 30 + Math.round((p / initialBatchCount) * 55))
          );
          const rendered = await renderSinglePage(p);
          if (rendered) {
            initialPages.push(rendered);
          }
        }

        if (cancelled) {
          canvas.width = 0;
          canvas.height = 0;
          return;
        }

        // Notify reader modal immediately so all 1..numPages slots & scrollbar appear right away!
        onDocumentReady({
          numPages,
          defaultWidth,
          defaultHeight,
          initialPages,
        });

        // 2. Continue rendering all remaining pages (from 1 to numPages, NO 80-page cap!)
        // while prioritizing any page the student scrolls or jumps to!
        let nextSequentialPage = 1;
        while (!cancelled && renderedSet.size < numPages) {
          let targetPage: number | null = null;

          while (priorityQueue.length > 0) {
            const candidate = priorityQueue.shift()!;
            if (candidate >= 1 && candidate <= numPages && !renderedSet.has(candidate)) {
              targetPage = candidate;
              break;
            }
          }

          if (targetPage === null) {
            while (nextSequentialPage <= numPages && renderedSet.has(nextSequentialPage)) {
              nextSequentialPage++;
            }
            if (nextSequentialPage <= numPages) {
              targetPage = nextSequentialPage;
              nextSequentialPage++;
            }
          }

          if (targetPage === null) break;

          try {
            const pageResult = await renderSinglePage(targetPage);
            if (pageResult && !cancelled) {
              onPageRendered(pageResult);
            }
          } catch (pageErr) {
            console.warn(`Error rendering PDF page ${targetPage}:`, pageErr);
          }

          // Yield briefly to keep scrolling 60fps smooth
          await new Promise((r) => setTimeout(r, 8));
        }

        canvas.width = 0;
        canvas.height = 0;
        return;
      }
    } catch (err) {
      console.warn('PDF.js progressive renderer notice, trying fallback:', err);
    }

    // Fallback only if the file is not a standard PDF structure
    if (!cancelled) {
      try {
        const fallback = await renderFallbackPagesToImages(bytes, onProgress);
        if (cancelled) return;
        onDocumentReady({
          numPages: fallback.numPages,
          defaultWidth: fallback.pages[0]?.width || 900,
          defaultHeight: fallback.pages[0]?.height || 1260,
          initialPages: fallback.pages,
        });
      } catch (fallbackErr: any) {
        if (!cancelled) {
          onError?.(
            fallbackErr instanceof Error
              ? fallbackErr
              : new Error('Unable to render PDF document.')
          );
        }
      }
    }
  })();

  return {
    requestPriorityPage,
    cancel,
  };
}

/**
 * Renders all PDF pages into crisp images without any 80-page truncation limit.
 */
export async function renderPdfPagesToImages(
  bytes: Uint8Array,
  onProgress?: (status: string, percent: number) => void,
  scale: number = 1.65
): Promise<{ pages: RenderedPdfPage[]; numPages: number }> {
  return new Promise((resolve, reject) => {
    const pagesMap = new Map<number, RenderedPdfPage>();
    let totalCount = 0;

    openProgressivePdfRenderer({
      bytes,
      scale,
      onProgress,
      onDocumentReady: ({ numPages, initialPages }) => {
        totalCount = numPages;
        for (const p of initialPages) {
          pagesMap.set(p.pageNumber, p);
        }
        if (pagesMap.size >= numPages) {
          const sorted = Array.from(pagesMap.values()).sort((a, b) => a.pageNumber - b.pageNumber);
          resolve({ pages: sorted, numPages });
        }
      },
      onPageRendered: (page) => {
        pagesMap.set(page.pageNumber, page);
        onProgress?.(
          `Rendered page ${pagesMap.size} of ${totalCount}...`,
          Math.min(99, Math.round((pagesMap.size / Math.max(1, totalCount)) * 100))
        );
        if (pagesMap.size >= totalCount) {
          const sorted = Array.from(pagesMap.values()).sort((a, b) => a.pageNumber - b.pageNumber);
          resolve({ pages: sorted, numPages: totalCount });
        }
      },
      onError: (err) => {
        reject(err);
      },
    });
  });
}
