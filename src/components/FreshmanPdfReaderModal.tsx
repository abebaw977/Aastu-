import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PublishedPdfDocument } from '../types';
import {
  getAuthenticatedAssetUrl,
  detectPublishedFileType,
  downloadPublishedPdfWithProgress,
} from '../utils/authPaymentService';
import { parsePptxFromDataUrl, PptxSlideData } from '../utils/pptxSlideReader';
import {
  RenderedPdfPage,
  ProgressivePdfController,
  openProgressivePdfRenderer,
} from '../utils/pdfEngine';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Presentation,
  Loader2,
} from 'lucide-react';

interface FreshmanPdfReaderModalProps {
  pdf: PublishedPdfDocument | null;
  pdfDataUrl?: string | null;
  overrideDataUrl?: string | null;
  onClose: () => void;
  onDownload?: (pdf: PublishedPdfDocument) => void;
  onAskAiTutor?: (pdf: PublishedPdfDocument) => void;
}

export const FreshmanPdfReaderModal: React.FC<FreshmanPdfReaderModalProps> = ({
  pdf,
  pdfDataUrl,
  overrideDataUrl,
  onClose,
  onDownload,
  onAskAiTutor,
}) => {
  const effectiveOverrideUrl = pdfDataUrl || overrideDataUrl;
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [rawSourceUrl, setRawSourceUrl] = useState<string>('');
  const [autoDownloadPct, setAutoDownloadPct] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [rotate90OnMobile, setRotate90OnMobile] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [totalPagesOrSlides, setTotalPagesOrSlides] = useState<number>(1);

  // PPTX Slide Deck State
  const [pptxSlides, setPptxSlides] = useState<PptxSlideData[]>([]);
  const [pptxLoading, setPptxLoading] = useState<boolean>(false);
  const [pptxError, setPptxError] = useState<string | null>(null);

  // PDF Canvas Pages State (supports all pages 1..N with progressive & priority rendering)
  const [renderedPagesMap, setRenderedPagesMap] = useState<Record<number, RenderedPdfPage>>({});
  const [defaultPageSize, setDefaultPageSize] = useState<{ width: number; height: number }>({
    width: 900,
    height: 1260,
  });
  const [pdfCanvasLoading, setPdfCanvasLoading] = useState<boolean>(false);
  const [useNativePdfEmbed, setUseNativePdfEmbed] = useState<boolean>(false);

  const progressiveControllerRef = useRef<ProgressivePdfController | null>(null);
  const modalShellRef = useRef<HTMLDivElement | null>(null);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);

  const fileType = pdf
    ? detectPublishedFileType(pdf.originalFilename, effectiveOverrideUrl || rawSourceUrl || pdf.fileUrl)
    : 'pdf';

  // Ensure document data URL is loaded (auto-downloading chunks if opened directly without pre-loaded dataUrl)
  useEffect(() => {
    if (!pdf) {
      setBlobUrl('');
      setRawSourceUrl('');
      setAutoDownloadPct(null);
      setLoadError(null);
      return;
    }

    let cancelled = false;
    let createdObjectUrl = '';

    const setupFromDataUrl = (resolvedUrl: string) => {
      if (cancelled) return;
      setRawSourceUrl(resolvedUrl);
      setAutoDownloadPct(null);

      if (!resolvedUrl.startsWith('data:')) {
        setBlobUrl(resolvedUrl);
        return;
      }

      try {
        const commaIdx = resolvedUrl.indexOf(',');
        const header = commaIdx >= 0 ? resolvedUrl.slice(0, commaIdx) : '';
        const base64Part = (commaIdx >= 0 ? resolvedUrl.slice(commaIdx + 1) : resolvedUrl).replace(
          /[\r\n\s]/g,
          ''
        );
        const mimeMatch = header.match(/data:([^;]+)/);
        const detected = detectPublishedFileType(pdf.originalFilename, resolvedUrl);
        const defaultMime =
          detected === 'pptx'
            ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            : detected === 'image'
            ? 'image/png'
            : 'application/pdf';
        const mime = mimeMatch ? mimeMatch[1] : defaultMime;

        const binary = atob(base64Part);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: mime });
        createdObjectUrl = URL.createObjectURL(blob);
        setBlobUrl(createdObjectUrl);
      } catch {
        setBlobUrl(resolvedUrl);
      }
    };

    const candidateUrl = effectiveOverrideUrl || getAuthenticatedAssetUrl(pdf.fileUrl);
    if (candidateUrl && (candidateUrl.startsWith('data:') || candidateUrl.startsWith('blob:') || candidateUrl.startsWith('http'))) {
      setLoadError(null);
      setupFromDataUrl(candidateUrl);
    } else {
      // Automatically download from cloud / device storage
      setLoadError(null);
      setAutoDownloadPct(5);
      downloadPublishedPdfWithProgress(pdf, (pct) => {
        if (!cancelled) setAutoDownloadPct(pct);
      })
        .then((downloadedDataUrl) => {
          setupFromDataUrl(downloadedDataUrl);
        })
        .catch((err: any) => {
          if (!cancelled) {
            setAutoDownloadPct(null);
            setLoadError(err?.message || 'Unable to load this exam/study file. Please check your internet connection.');
          }
        });
    }

    return () => {
      cancelled = true;
      if (createdObjectUrl) {
        URL.revokeObjectURL(createdObjectUrl);
      }
    };
  }, [pdf, effectiveOverrideUrl]);

  // Parse PPTX slides when fileType === 'pptx'
  useEffect(() => {
    if (!pdf || fileType !== 'pptx' || !rawSourceUrl) {
      setPptxSlides([]);
      setPptxError(null);
      return;
    }

    let cancelled = false;
    setPptxLoading(true);
    setPptxError(null);

    parsePptxFromDataUrl(rawSourceUrl)
      .then((slides) => {
        if (cancelled) return;
        setPptxSlides(slides);
        setTotalPagesOrSlides(Math.max(1, slides.length));
        setOrientation('landscape');
      })
      .catch((err: any) => {
        if (cancelled) return;
        setPptxError(err?.message || 'Unable to parse slides from this presentation file.');
      })
      .finally(() => {
        if (!cancelled) setPptxLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pdf, fileType, rawSourceUrl]);

  // Render ALL PDF pages (1..numPages, no 80-page limit) with instant priority rendering on scroll/jump
  useEffect(() => {
    if (!pdf || fileType !== 'pdf' || !rawSourceUrl) {
      setRenderedPagesMap({});
      return;
    }

    let cancelled = false;
    if (progressiveControllerRef.current) {
      progressiveControllerRef.current.cancel();
      progressiveControllerRef.current = null;
    }

    setRenderedPagesMap({});
    setPdfCanvasLoading(true);
    setUseNativePdfEmbed(false);

    (async () => {
      try {
        let uint8: Uint8Array;
        if (rawSourceUrl.startsWith('data:')) {
          const commaIdx = rawSourceUrl.indexOf(',');
          const b64 = commaIdx >= 0 ? rawSourceUrl.slice(commaIdx + 1) : rawSourceUrl;
          const binary = atob(b64.replace(/[\r\n\s]/g, ''));
          uint8 = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            uint8[i] = binary.charCodeAt(i);
          }
        } else {
          const resp = await fetch(rawSourceUrl);
          const buf = await resp.arrayBuffer();
          uint8 = new Uint8Array(buf);
        }

        if (cancelled) return;

        const controller = openProgressivePdfRenderer({
          bytes: uint8,
          scale: 1.65,
          onDocumentReady: ({ numPages, defaultWidth, defaultHeight, initialPages }) => {
            if (cancelled) return;
            const initialMap: Record<number, RenderedPdfPage> = {};
            for (const p of initialPages) {
              initialMap[p.pageNumber] = p;
            }
            setDefaultPageSize({
              width: defaultWidth || 900,
              height: defaultHeight || 1260,
            });
            setRenderedPagesMap(initialMap);
            setTotalPagesOrSlides(Math.max(1, numPages));
            setPdfCanvasLoading(false);
          },
          onPageRendered: (page) => {
            if (cancelled) return;
            setRenderedPagesMap((prev) => {
              if (prev[page.pageNumber]) return prev;
              return {
                ...prev,
                [page.pageNumber]: page,
              };
            });
          },
          onError: () => {
            if (!cancelled) {
              setUseNativePdfEmbed(true);
              setPdfCanvasLoading(false);
            }
          },
        });

        progressiveControllerRef.current = controller;
      } catch {
        if (!cancelled) {
          setUseNativePdfEmbed(true);
          setPdfCanvasLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (progressiveControllerRef.current) {
        progressiveControllerRef.current.cancel();
        progressiveControllerRef.current = null;
      }
    };
  }, [pdf, fileType, rawSourceUrl]);

  // Handle Orientation switching (Portrait vs Landscape)
  const handleSelectOrientation = useCallback(async (nextMode: 'portrait' | 'landscape') => {
    setOrientation(nextMode);
    try {
      const scr = window.screen as any;
      if (scr?.orientation?.lock) {
        await scr.orientation.lock(nextMode);
        setRotate90OnMobile(false);
        return;
      }
    } catch {
      // If browser/WebView denies native orientation lock on a portrait phone, enable CSS landscape rotation option
    }
    if (nextMode === 'landscape' && window.innerHeight > window.innerWidth) {
      setRotate90OnMobile(true);
    } else {
      setRotate90OnMobile(false);
    }
  }, []);

  // Handle Full Screen toggling
  const handleToggleFullScreen = useCallback(async () => {
    const nextState = !isFullScreen;
    setIsFullScreen(nextState);
    try {
      if (nextState) {
        if (modalShellRef.current && modalShellRef.current.requestFullscreen) {
          await modalShellRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // CSS full-screen state (`isFullScreen`) already expands the modal to 100vw x 100vh
    }
  }, [isFullScreen]);

  // Sync with ESC key / browser fullscreen exit
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        // Keep CSS fullscreen unless user explicitly toggled or exited
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      try {
        const scr = window.screen as any;
        if (scr?.orientation?.unlock) {
          scr.orientation.unlock();
        }
      } catch {
        // ignore
      }
    };
  }, [isFullScreen]);

  // Track Scroll Progress & Current Page/Slide and prioritize rendering visible pages
  const handleScrollViewport = () => {
    const el = scrollViewportRef.current;
    if (!el) return;
    const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
    const pct = Math.min(100, Math.max(0, (el.scrollTop / maxScroll) * 100));
    setScrollPercent(pct);

    if (totalPagesOrSlides > 1) {
      const estimated = Math.min(
        totalPagesOrSlides,
        Math.max(1, Math.round((pct / 100) * (totalPagesOrSlides - 1)) + 1)
      );
      if (fileType === 'pdf' && progressiveControllerRef.current) {
        progressiveControllerRef.current.requestPriorityPage(estimated);
      }
    }
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setScrollPercent(val);
    const el = scrollViewportRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    el.scrollTo({ top: (val / 100) * maxScroll });
    if (totalPagesOrSlides > 1) {
      const targetPage = Math.min(
        totalPagesOrSlides,
        Math.max(1, Math.round((val / 100) * (totalPagesOrSlides - 1)) + 1)
      );
      if (fileType === 'pdf' && progressiveControllerRef.current) {
        progressiveControllerRef.current.requestPriorityPage(targetPage);
      }
    }
  };

  if (!pdf) return null;

  // Container width: 100% full edge-to-edge width by default so there is zero wasted side space
  const baseWidthPercent = 100;
  const scaledWidthPercent = Math.min(240, Math.max(50, Math.round((baseWidthPercent * zoom) / 100)));

  // CSS 90-degree rotation wrapper for portrait phones when user activates Landscape rotation
  const rotatedWrapperStyle: React.CSSProperties = rotate90OnMobile
    ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '100vh',
        height: '100vw',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        zIndex: 9999,
      }
    : {};

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-0">
      <div
        ref={modalShellRef}
        style={rotatedWrapperStyle}
        className="flex-1 w-full h-full mx-auto bg-slate-950 overflow-hidden flex flex-col max-w-none rounded-none border-0"
      >
        {/* Top Reader Toolbar — Single compact row, hidden when Full Screen is active */}
        {!isFullScreen && (
          <div className="px-2 sm:px-3 py-1.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5">
              {/* Single Toggle Button for Portrait <-> Landscape */}
              <button
                type="button"
                onClick={() =>
                  handleSelectOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')
                }
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                  orientation === 'landscape'
                    ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 shadow'
                    : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow'
                }`}
                title="Toggle Portrait / Landscape Mode"
              >
                {orientation === 'landscape' ? (
                  <>
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Landscape</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Portrait</span>
                  </>
                )}
              </button>

              {/* Compact Zoom Controls */}
              <div className="flex items-center gap-0.5 bg-slate-900 border border-slate-800 rounded-xl px-1.5 py-0.5">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(50, z - 15))}
                  className="p-1 text-slate-400 hover:text-white transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-slate-300 px-1 min-w-[36px] text-center">
                  {zoom}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(220, z + 15))}
                  className="p-1 text-slate-400 hover:text-white transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(100)}
                  className="p-1 text-slate-400 hover:text-white transition"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Full Screen Toggle Button */}
              <button
                type="button"
                onClick={handleToggleFullScreen}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 transition"
                title="Enter Full Screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-800/50 transition shrink-0"
              title="Close Reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Reader Body + Dedicated Interactive Scroll Bar Rail */}
        <div className="flex-1 flex min-h-0 relative bg-slate-950">
          {/* In Full Screen mode: ONLY show floating Exit button so PDF holds the entire area */}
          {isFullScreen && (
            <button
              type="button"
              onClick={handleToggleFullScreen}
              className="fixed top-2.5 left-2.5 z-50 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-white border border-slate-700/80 shadow-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition"
              title="Exit Full Screen"
            >
              <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exit</span>
            </button>
          )}

          {/* Primary Scrollable Document Viewport — Zero side padding & ultra-thin 0.5px gap between pages */}
          <div
            ref={scrollViewportRef}
            onScroll={handleScrollViewport}
            style={{
              scrollbarWidth: 'auto',
              scrollbarColor: '#3b82f6 #0f172a',
              WebkitOverflowScrolling: 'touch',
            }}
            className="flex-1 w-full h-full overflow-y-scroll overflow-x-auto p-0 flex flex-col items-stretch gap-[0.5px] select-text"
          >
            {autoDownloadPct !== null && (
              <div className="my-auto mx-auto max-w-sm w-full bg-slate-900 border border-blue-500/40 rounded-2xl p-6 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
                <p className="text-sm font-bold text-white">
                  Loading "{pdf.title}" ({autoDownloadPct}%)...
                </p>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${autoDownloadPct}%` }}
                  />
                </div>
              </div>
            )}

            {loadError && (
              <div className="my-auto mx-auto max-w-md w-full bg-rose-950/60 border border-rose-500/40 rounded-2xl p-6 text-center space-y-3">
                <p className="text-sm font-bold text-rose-200">{loadError}</p>
              </div>
            )}

            {/* 1. PPTX PRESENTATION SLIDE DECK VIEWER */}
            {autoDownloadPct === null && !loadError && fileType === 'pptx' && (
              <>
                {pptxLoading ? (
                  <div className="my-auto flex flex-col items-center justify-center gap-3 text-slate-300 py-16">
                    <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                    <p className="text-sm font-bold">Loading PowerPoint Presentation Slides...</p>
                  </div>
                ) : pptxError ? (
                  <div className="my-auto mx-auto max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                    <Presentation className="w-10 h-10 text-amber-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">{pdf.title}</h3>
                    <p className="text-xs text-slate-400">{pptxError}</p>
                    {blobUrl && (
                      <a
                        href={blobUrl}
                        download={pdf.originalFilename || `${pdf.title}.pptx`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Presentation File</span>
                      </a>
                    )}
                  </div>
                ) : (
                  pptxSlides.map((slide) => (
                    <div
                      key={`pptx-slide-${slide.slideNumber}`}
                      id={`reader-item-${slide.slideNumber}`}
                      style={{ width: `${scaledWidthPercent}%` }}
                      className={`bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border-b border-slate-700/80 shadow-xl overflow-hidden transition-all shrink-0 ${
                        orientation === 'landscape' ? 'min-h-[340px] sm:min-h-[460px]' : 'min-h-[380px]'
                      }`}
                    >
                      {/* Slide Header Bar */}
                      <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold shrink-0">
                            Slide {slide.slideNumber} / {pptxSlides.length}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                            {slide.title}
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium shrink-0 hidden sm:inline">
                          {pdf.courseCode}
                        </span>
                      </div>

                      {/* Slide Body */}
                      <div className="p-4 sm:p-6 space-y-4">
                        {slide.subtitle && (
                          <div className="text-xs sm:text-sm font-semibold text-blue-300 bg-blue-950/40 border border-blue-800/40 rounded-xl px-4 py-2.5">
                            {slide.subtitle}
                          </div>
                        )}

                        {/* Slide Bullet Points */}
                        {slide.bullets.length > 0 && (
                          <ul className="space-y-2">
                            {slide.bullets.map((b, bIdx) => (
                              <li
                                key={`slide-${slide.slideNumber}-b-${bIdx}`}
                                style={{ paddingLeft: `${b.level * 1.25}rem` }}
                                className={`flex items-start gap-2.5 leading-relaxed ${
                                  b.isHeading
                                    ? 'text-sm sm:text-base font-bold text-amber-300 pt-2'
                                    : b.level === 0
                                    ? 'text-xs sm:text-sm text-slate-100 font-medium'
                                    : 'text-xs sm:text-sm text-slate-300'
                                }`}
                              >
                                <span
                                  className={`mt-1.5 rounded-full shrink-0 ${
                                    b.level === 0
                                      ? 'w-2 h-2 bg-blue-400'
                                      : 'w-1.5 h-1.5 bg-slate-400'
                                  }`}
                                />
                                <span className="whitespace-pre-line">{b.text}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Slide Tables */}
                        {slide.tables.map((tbl, tIdx) => (
                          <div
                            key={`slide-${slide.slideNumber}-tbl-${tIdx}`}
                            className="overflow-x-auto rounded-xl border border-slate-700"
                          >
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                              <tbody>
                                {tbl.rows.map((row, rIdx) => (
                                  <tr
                                    key={`r-${rIdx}`}
                                    className={
                                      rIdx === 0
                                        ? 'bg-blue-950/70 text-blue-200 font-bold'
                                        : rIdx % 2 === 0
                                        ? 'bg-slate-900/80 text-slate-200'
                                        : 'bg-slate-950/60 text-slate-300'
                                    }
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={`c-${cIdx}`}
                                        className="p-2.5 border border-slate-800 whitespace-pre-line"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}

                        {/* Embedded Slide Graphics / Diagrams */}
                        {slide.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {slide.images.map((imgUrl, imgIdx) => (
                              <div
                                key={`slide-${slide.slideNumber}-img-${imgIdx}`}
                                className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-1.5 flex items-center justify-center"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Slide ${slide.slideNumber} figure ${imgIdx + 1}`}
                                  className="max-h-80 w-auto object-contain rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {slide.bullets.length === 0 &&
                          slide.tables.length === 0 &&
                          slide.images.length === 0 && (
                            <p className="text-xs text-slate-400 italic">
                              (Visual/Title Slide {slide.slideNumber})
                            </p>
                          )}

                        {/* Speaker Notes */}
                        {slide.notes && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 bg-slate-950/50 rounded-xl p-3">
                            <span className="font-bold text-slate-300 block mb-1">
                              Instructor Notes:
                            </span>
                            <p className="whitespace-pre-line">{slide.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* 2. IMAGE DOCUMENT VIEWER — Holds 100% area */}
            {fileType === 'image' && rawSourceUrl && (
              <div
                id="reader-item-1"
                style={{ width: `${scaledWidthPercent}%` }}
                className="bg-slate-950 w-full flex flex-col items-center justify-center"
              >
                <img
                  src={rawSourceUrl}
                  alt={pdf.title}
                  className="w-full h-auto object-contain block"
                />
              </div>
            )}

            {/* 3. PDF DOCUMENT VIEWER — Holds 100% area and renders ALL 1..totalPagesOrSlides pages */}
            {fileType === 'pdf' && (
              <>
                {pdfCanvasLoading && Object.keys(renderedPagesMap).length === 0 && !useNativePdfEmbed && (
                  <div className="my-auto flex flex-col items-center justify-center gap-3 text-slate-300 py-16">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <p className="text-sm font-bold">Rendering Scrollable PDF Pages...</p>
                  </div>
                )}

                {!useNativePdfEmbed && Object.keys(renderedPagesMap).length > 0 ? (
                  <>
                    {Array.from({ length: totalPagesOrSlides }, (_, idx) => idx + 1).map((pageNum) => {
                      const renderedPage = renderedPagesMap[pageNum];
                      const pageW = renderedPage?.width || defaultPageSize.width || 900;
                      const pageH = renderedPage?.height || defaultPageSize.height || 1260;

                      return (
                        <div
                          key={`pdf-page-${pageNum}`}
                          id={`reader-item-${pageNum}`}
                          style={{
                            width: `${scaledWidthPercent}%`,
                            aspectRatio: renderedPage ? undefined : `${pageW} / ${pageH}`,
                          }}
                          className="bg-white overflow-hidden border-b-[0.5px] border-slate-300/60 shrink-0 relative m-0 p-0"
                        >
                          {renderedPage ? (
                            <img
                              src={renderedPage.dataUrl}
                              alt={`Page ${pageNum} of ${totalPagesOrSlides}`}
                              className="w-full h-auto block select-none m-0 p-0"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center bg-slate-900/95 text-slate-300 p-6">
                              <Loader2 className="w-6 h-6 text-blue-400 animate-spin mb-2" />
                              <p className="text-xs font-bold text-white">
                                Loading Page {pageNum} of {totalPagesOrSlides}...
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  !pdfCanvasLoading &&
                  blobUrl && (
                    <div
                      style={{ width: `${scaledWidthPercent}%`, minHeight: '90vh' }}
                      className="flex-1 bg-white overflow-hidden flex flex-col"
                    >
                      <object
                        data={`${blobUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                        type="application/pdf"
                        className="w-full flex-1 min-h-[88vh] border-0"
                      >
                        <iframe
                          src={`${blobUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                          title={pdf.title}
                          className="w-full flex-1 min-h-[88vh] border-0"
                        />
                      </object>
                    </div>
                  )
                )}
              </>
            )}
          </div>

          {/* Clean Right-Hand Vertical Scroll Bar Only (No Top/End/Up/Down buttons) */}
          <div className="w-5 sm:w-6 bg-slate-950 border-l border-slate-800/80 flex flex-col items-center justify-center py-2 px-0 shrink-0 select-none">
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(scrollPercent)}
              onChange={handleScrubberChange}
              aria-label="Document Scroll Bar"
              style={{
                writingMode: 'vertical-lr' as any,
                direction: 'ltr',
              }}
              className="h-full w-2.5 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
