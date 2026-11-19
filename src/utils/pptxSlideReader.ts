export interface PptxSlideTable {
  rows: string[][];
}

export interface PptxSlideBullet {
  text: string;
  level: number;
  isHeading?: boolean;
}

export interface PptxSlideData {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: PptxSlideBullet[];
  tables: PptxSlideTable[];
  images: string[]; // Data URLs of embedded images on this slide
  notes?: string;
}

interface ZipEntryRecord {
  filename: string;
  compressionMethod: number;
  compressedSize: number;
  uncompressedSize: number;
  localHeaderOffset: number;
}

function base64DataUrlToUint8Array(dataUrl: string): Uint8Array {
  const commaIdx = dataUrl.indexOf(',');
  const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  const clean = base64.replace(/[\r\n\s]/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const sub = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(sub));
  }
  return btoa(binary);
}

async function inflateRawBytes(compressed: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream !== 'undefined') {
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(compressed);
    writer.close();
    const response = new Response(ds.readable);
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  }
  throw new Error('DecompressionStream not supported in this browser.');
}

function parseZipCentralDirectory(bytes: Uint8Array): Map<string, ZipEntryRecord> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const entries = new Map<string, ZipEntryRecord>();

  // Locate End of Central Directory (EOCD) signature 0x06054b50
  let eocdOffset = -1;
  const minEocdSearch = Math.max(0, bytes.length - 65557);
  for (let i = bytes.length - 22; i >= minEocdSearch; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset < 0) {
    throw new Error('Invalid PPTX archive: ZIP Central Directory not found.');
  }

  const totalEntries = view.getUint16(eocdOffset + 10, true);
  const cdOffset = view.getUint32(eocdOffset + 16, true);
  const decoder = new TextDecoder('utf-8');

  let ptr = cdOffset;
  for (let i = 0; i < totalEntries && ptr + 46 <= bytes.length; i++) {
    const sig = view.getUint32(ptr, true);
    if (sig !== 0x02014b50) break;

    const compressionMethod = view.getUint16(ptr + 10, true);
    const compressedSize = view.getUint32(ptr + 20, true);
    const uncompressedSize = view.getUint32(ptr + 24, true);
    const fileNameLen = view.getUint16(ptr + 28, true);
    const extraLen = view.getUint16(ptr + 30, true);
    const commentLen = view.getUint16(ptr + 32, true);
    const localHeaderOffset = view.getUint32(ptr + 42, true);

    const nameBytes = bytes.subarray(ptr + 46, ptr + 46 + fileNameLen);
    const filename = decoder.decode(nameBytes);

    entries.set(filename, {
      filename,
      compressionMethod,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });

    ptr += 46 + fileNameLen + extraLen + commentLen;
  }

  return entries;
}

async function extractZipEntryBytes(
  archiveBytes: Uint8Array,
  entry: ZipEntryRecord
): Promise<Uint8Array> {
  const view = new DataView(
    archiveBytes.buffer,
    archiveBytes.byteOffset,
    archiveBytes.byteLength
  );
  const offset = entry.localHeaderOffset;
  if (offset + 30 > archiveBytes.length || view.getUint32(offset, true) !== 0x04034b50) {
    throw new Error(`Invalid local header for ${entry.filename}`);
  }

  const fileNameLen = view.getUint16(offset + 26, true);
  const extraLen = view.getUint16(offset + 28, true);
  const dataStart = offset + 30 + fileNameLen + extraLen;
  const rawSlice = archiveBytes.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.compressionMethod === 0) {
    return rawSlice;
  }
  if (entry.compressionMethod === 8) {
    return await inflateRawBytes(rawSlice);
  }
  throw new Error(`Unsupported ZIP compression method: ${entry.compressionMethod}`);
}

function getMimeForMediaPath(mediaPath: string): string {
  const lower = mediaPath.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  if (lower.endsWith('.bmp')) return 'image/bmp';
  return '';
}

function extractParagraphText(pNode: Element): string {
  const textParts: string[] = [];
  const children = Array.from(pNode.getElementsByTagName('*'));
  for (const el of children) {
    const local = el.localName || el.tagName.split(':').pop() || '';
    if (local === 't') {
      textParts.push(el.textContent || '');
    } else if (local === 'br') {
      textParts.push('\n');
    } else if (local === 'tab') {
      textParts.push('  ');
    }
  }
  return textParts.join('').replace(/\s+\n/g, '\n').trim();
}

/**
 * Parses a .pptx Data URL (or Blob URL) into structured slides with titles,
 * bullet hierarchies, tables, speaker notes, and embedded images.
 */
export async function parsePptxFromDataUrl(dataUrlOrUrl: string): Promise<PptxSlideData[]> {
  let bytes: Uint8Array;
  if (dataUrlOrUrl.startsWith('data:')) {
    bytes = base64DataUrlToUint8Array(dataUrlOrUrl);
  } else {
    const res = await fetch(dataUrlOrUrl);
    const buf = await res.arrayBuffer();
    bytes = new Uint8Array(buf);
  }

  const entries = parseZipCentralDirectory(bytes);
  const decoder = new TextDecoder('utf-8');
  const domParser = new DOMParser();

  // Find all ppt/slides/slideN.xml entries sorted by slide number
  const slideFiles = Array.from(entries.keys())
    .map((name) => {
      const m = /^ppt\/slides\/slide(\d+)\.xml$/i.exec(name);
      return m ? { name, slideNumber: Number(m[1]) } : null;
    })
    .filter((x): x is { name: string; slideNumber: number } => x !== null)
    .sort((a, b) => a.slideNumber - b.slideNumber);

  if (slideFiles.length === 0) {
    throw new Error('No slides found inside the PPTX presentation file.');
  }

  // Cache extracted media images as Data URLs so multiple slides referencing the same graphic don't re-decode
  const mediaDataUrlCache = new Map<string, string>();
  const resolveMediaDataUrl = async (mediaPath: string): Promise<string | null> => {
    const normalizedPath = mediaPath.replace(/^(\.\.\/)+/, 'ppt/').replace(/^\/+/, '');
    if (mediaDataUrlCache.has(normalizedPath)) {
      return mediaDataUrlCache.get(normalizedPath)!;
    }
    const entry = entries.get(normalizedPath);
    if (!entry) return null;
    const mime = getMimeForMediaPath(normalizedPath);
    if (!mime) return null;
    try {
      const imgBytes = await extractZipEntryBytes(bytes, entry);
      const b64 = uint8ArrayToBase64(imgBytes);
      const dataUrl = `data:${mime};base64,${b64}`;
      mediaDataUrlCache.set(normalizedPath, dataUrl);
      return dataUrl;
    } catch {
      return null;
    }
  };

  const slides: PptxSlideData[] = [];

  for (const slideFile of slideFiles) {
    const slideEntry = entries.get(slideFile.name);
    if (!slideEntry) continue;

    const xmlBytes = await extractZipEntryBytes(bytes, slideEntry);
    const xmlString = decoder.decode(xmlBytes);
    const doc = domParser.parseFromString(xmlString, 'application/xml');

    let title = '';
    let subtitle = '';
    const bullets: PptxSlideBullet[] = [];
    const tables: PptxSlideTable[] = [];
    const slideImages: string[] = [];

    // 1. Parse slide relationships (_rels/slideN.xml.rels) to map rId -> ppt/media/imageX
    const relsName = `ppt/slides/_rels/slide${slideFile.slideNumber}.xml.rels`;
    const relsEntry = entries.get(relsName);
    const rIdToTarget = new Map<string, string>();
    if (relsEntry) {
      try {
        const relsBytes = await extractZipEntryBytes(bytes, relsEntry);
        const relsXml = decoder.decode(relsBytes);
        const relsDoc = domParser.parseFromString(relsXml, 'application/xml');
        const relNodes = Array.from(relsDoc.getElementsByTagName('*')).filter(
          (el) => (el.localName || el.tagName) === 'Relationship'
        );
        for (const rel of relNodes) {
          const id = rel.getAttribute('Id') || '';
          const target = rel.getAttribute('Target') || '';
          if (id && target) {
            rIdToTarget.set(id, target);
          }
        }
      } catch {
        // ignore rels parse errors
      }
    }

    // 2. Extract shapes (<p:sp>) for Titles, Subtitles, and Text/Bullets
    const shapes = Array.from(doc.getElementsByTagName('*')).filter(
      (el) => (el.localName || el.tagName.split(':').pop()) === 'sp'
    );

    for (const sp of shapes) {
      const phNodes = Array.from(sp.getElementsByTagName('*')).filter(
        (el) => (el.localName || el.tagName.split(':').pop()) === 'ph'
      );
      const phType = phNodes[0]?.getAttribute('type') || '';
      const isTitleShape = phType === 'title' || phType === 'ctrTitle';
      const isSubTitleShape = phType === 'subTitle';

      const paragraphs = Array.from(sp.getElementsByTagName('*')).filter(
        (el) => (el.localName || el.tagName.split(':').pop()) === 'p'
      );

      for (const p of paragraphs) {
        const text = extractParagraphText(p);
        if (!text) continue;

        const pPr = Array.from(p.children).find(
          (c) => (c.localName || c.tagName.split(':').pop()) === 'pPr'
        );
        const level = Number(pPr?.getAttribute('lvl') || 0);

        if (isTitleShape && !title) {
          title = text;
        } else if (isSubTitleShape && !subtitle) {
          subtitle = text;
        } else if (!title && bullets.length === 0 && text.length < 120) {
          // First concise line on a slide without explicit title placeholder
          title = text;
        } else {
          bullets.push({
            text,
            level: Math.min(Math.max(level, 0), 4),
            isHeading: isTitleShape || isSubTitleShape,
          });
        }
      }
    }

    // 3. Extract Tables (<a:tbl>)
    const tblNodes = Array.from(doc.getElementsByTagName('*')).filter(
      (el) => (el.localName || el.tagName.split(':').pop()) === 'tbl'
    );
    for (const tbl of tblNodes) {
      const rows: string[][] = [];
      const trNodes = Array.from(tbl.children).filter(
        (el) => (el.localName || el.tagName.split(':').pop()) === 'tr'
      );
      for (const tr of trNodes) {
        const rowCells: string[] = [];
        const tcNodes = Array.from(tr.children).filter(
          (el) => (el.localName || el.tagName.split(':').pop()) === 'tc'
        );
        for (const tc of tcNodes) {
          const pNodes = Array.from(tc.getElementsByTagName('*')).filter(
            (el) => (el.localName || el.tagName.split(':').pop()) === 'p'
          );
          const cellText = pNodes
            .map((p) => extractParagraphText(p))
            .filter(Boolean)
            .join('\n');
          rowCells.push(cellText);
        }
        if (rowCells.some((c) => c.length > 0)) {
          rows.push(rowCells);
        }
      }
      if (rows.length > 0) {
        tables.push({ rows });
      }
    }

    // 4. Extract Embedded Images (<a:blip r:embed="rIdX"/>)
    const blipNodes = Array.from(doc.getElementsByTagName('*')).filter(
      (el) => (el.localName || el.tagName.split(':').pop()) === 'blip'
    );
    for (const blip of blipNodes) {
      const rId =
        blip.getAttribute('r:embed') ||
        blip.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'embed') ||
        '';
      if (rId && rIdToTarget.has(rId)) {
        const target = rIdToTarget.get(rId)!;
        const imgDataUrl = await resolveMediaDataUrl(target);
        if (imgDataUrl && !slideImages.includes(imgDataUrl)) {
          slideImages.push(imgDataUrl);
        }
      }
    }

    // 5. Extract Speaker Notes if present (ppt/notesSlides/notesSlideN.xml)
    let notes = '';
    const notesEntry = entries.get(`ppt/notesSlides/notesSlide${slideFile.slideNumber}.xml`);
    if (notesEntry) {
      try {
        const notesBytes = await extractZipEntryBytes(bytes, notesEntry);
        const notesXml = decoder.decode(notesBytes);
        const notesDoc = domParser.parseFromString(notesXml, 'application/xml');
        const noteParas = Array.from(notesDoc.getElementsByTagName('*'))
          .filter((el) => (el.localName || el.tagName.split(':').pop()) === 'p')
          .map((p) => extractParagraphText(p))
          .filter((t) => t.length > 1 && !/^\d+$/.test(t));
        notes = noteParas.join('\n');
      } catch {
        // ignore notes error
      }
    }

    slides.push({
      slideNumber: slideFile.slideNumber,
      title: title || `Slide ${slideFile.slideNumber}`,
      subtitle: subtitle || undefined,
      bullets,
      tables,
      images: slideImages,
      notes: notes || undefined,
    });
  }

  return slides;
}
