import React, { useState, useEffect, useCallback } from 'react';
import { LTMW_PDF_CATEGORIES, PublishedPdfDocument, Subject } from '../types';
import {
  downloadPublishedPdfWithProgress,
  fetchPublishedPdfs,
  detectPublishedFileType,
  isFreeCourseSubject,
} from '../utils/authPaymentService';
import {
  getDownloadedPdfFromDevice,
  getDownloadedPdfIds,
} from '../utils/pdfOfflineStorage';
import {
  OFFICIAL_17_FRESHMAN_COURSES,
  getSubjectDisplayName,
  normalizeSubjectTo19,
} from '../data/freshmanCourseCatalog';
import { FreshmanPdfReaderModal } from './FreshmanPdfReaderModal';
import {
  FileText,
  Download,
  BookOpen,
  Search,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface PublishedPdfsViewProps {
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
  initialSubject?: Subject | 'all';
  isPaidAccessLocked?: boolean;
  onRequirePaidAccess?: (featureName?: string) => void;
}

interface DownloadProgressState {
  percent: number;
  loadedBytes: number;
  totalBytes: number;
}

function matchesLtmwCategory(pdfCategory: string, selectedCategory: string): boolean {
  if (selectedCategory === 'ALL') return true;
  const cat = (pdfCategory || '').trim().toLowerCase();
  const target = selectedCategory.trim().toLowerCase();
  if (cat === target) return true;

  // Backward-compatible matching for previously uploaded PDFs
  if (target === 'lecture notes') {
    return cat.includes('lecture');
  }
  if (target === 'textbook') {
    return cat.includes('textbook') || cat.includes('module');
  }
  if (target === 'mid and final exam') {
    return cat.includes('mid') || cat.includes('final') || cat.includes('exam');
  }
  if (target === 'worksheet and assignment') {
    return cat.includes('worksheet') || cat.includes('assignment');
  }
  return false;
}

export const PublishedPdfsView: React.FC<PublishedPdfsViewProps> = ({
  isAdmin = false,
  onOpenAdminPanel,
  initialSubject = 'all',
  isPaidAccessLocked = false,
  onRequirePaidAccess,
}) => {
  const [pdfs, setPdfs] = useState<PublishedPdfDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>(
    isPaidAccessLocked ? 'anthropology' : initialSubject || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Track which PDFs have been downloaded to the student's phone
  const [downloadedMap, setDownloadedMap] = useState<Record<string, boolean>>({});
  // Track active download progress per PDF ID
  const [downloadingMap, setDownloadingMap] = useState<Record<string, DownloadProgressState>>({});

  // Built-in Freshman PDF Reader modal state
  const [activeReaderPdf, setActiveReaderPdf] = useState<{
    pdf: PublishedPdfDocument;
    dataUrl: string;
  } | null>(null);

  useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedSubject('anthropology');
    } else if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject, isPaidAccessLocked]);

  const loadPdfs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [res, localDownloaded] = await Promise.all([
        fetchPublishedPdfs(),
        getDownloadedPdfIds(),
      ]);
      setPdfs(res.pdfs || []);
      setDownloadedMap(localDownloaded || {});
    } catch (err: any) {
      setError(err.message || 'Could not load published PDFs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPdfs();
  }, [loadPdfs]);

  const handleDownloadPdf = async (pdf: PublishedPdfDocument): Promise<string | null> => {
    const normSubj = normalizeSubjectTo19(pdf.subject);
    if (isPaidAccessLocked && !isFreeCourseSubject(normSubj)) {
      onRequirePaidAccess?.(`Published PDF (${getSubjectDisplayName(normSubj)}): ${pdf.title}`);
      return null;
    }
    if (downloadingMap[pdf.id]) return null;
    setError(null);
    const total = Math.max(1024, pdf.fileSize || 100 * 1024);
    setDownloadingMap((prev) => ({
      ...prev,
      [pdf.id]: { percent: 2, loadedBytes: 0, totalBytes: total },
    }));

    try {
      const dataUrl = await downloadPublishedPdfWithProgress(
        pdf,
        (percent, loadedBytes, totalBytes) => {
          setDownloadingMap((prev) => ({
            ...prev,
            [pdf.id]: { percent, loadedBytes, totalBytes },
          }));
        }
      );

      setDownloadedMap((prev) => ({ ...prev, [pdf.id]: true }));
      return dataUrl;
    } catch (err: any) {
      setError(err?.message || `Failed to download "${pdf.title}". Please check your connection.`);
      return null;
    } finally {
      setDownloadingMap((prev) => {
        const next = { ...prev };
        delete next[pdf.id];
        return next;
      });
    }
  };

  const handleOpenDownloadedPdf = async (pdf: PublishedPdfDocument) => {
    const normSubj = normalizeSubjectTo19(pdf.subject);
    if (isPaidAccessLocked && !isFreeCourseSubject(normSubj)) {
      onRequirePaidAccess?.(`Read Document (${getSubjectDisplayName(normSubj)}): ${pdf.title}`);
      return;
    }
    setError(null);
    try {
      let dataUrl = await getDownloadedPdfFromDevice(pdf.id);
      if (!dataUrl) {
        dataUrl = (await handleDownloadPdf(pdf)) || null;
      }
      if (!dataUrl) {
        dataUrl = await getDownloadedPdfFromDevice(pdf.id);
      }
      // Open reader modal (FreshmanPdfReaderModal also supports auto-download if dataUrl is empty)
      setActiveReaderPdf({ pdf, dataUrl: dataUrl || '' });
    } catch (err: any) {
      setError(err?.message || 'Unable to open document.');
    }
  };

  const filteredPdfs = pdfs.filter((pdf) => {
    const matchSubject =
      selectedSubject === 'all' ||
      normalizeSubjectTo19(pdf.subject) === normalizeSubjectTo19(selectedSubject);
    const matchCategory = matchesLtmwCategory(pdf.category, selectedCategory);
    const q = searchQuery.trim().toLowerCase();
    const subjLabel = getSubjectDisplayName(pdf.subject).toLowerCase();
    const matchSearch =
      !q ||
      pdf.title.toLowerCase().includes(q) ||
      subjLabel.includes(q) ||
      (pdf.description || '').toLowerCase().includes(q);
    return matchSubject && matchCategory && matchSearch;
  });

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes <= 0) return '0 KB';
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Compact All-in-One Header & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>PDF Library (Books, Notes & Exams)</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && onOpenAdminPanel && (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Upload PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={loadPdfs}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <select
            value={selectedSubject}
            onChange={(e) => {
              const nextSubj = e.target.value as Subject;
              if (
                isPaidAccessLocked &&
                nextSubj !== 'all' &&
                !isFreeCourseSubject(nextSubj)
              ) {
                onRequirePaidAccess?.(
                  `Published PDFs — ${getSubjectDisplayName(nextSubj)}`
                );
                return;
              }
              setSelectedSubject(nextSubj);
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Subjects</option>
            {OFFICIAL_17_FRESHMAN_COURSES.map((c) => (
              <option key={c.id} value={c.subject}>
                {c.shortTitle}
                {isPaidAccessLocked
                  ? isFreeCourseSubject(c.subject)
                    ? ' (FREE)'
                    : ' (40 ETB)'
                  : ''}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDFs by title or course..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Space-Saving Category Filter Strip for Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 touch-pan-x sm:flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-2.5 xs:px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer shrink-0 sm:shrink ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            All Files
          </button>
          {LTMW_PDF_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 xs:px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer shrink-0 sm:shrink ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* PDFs Grid or Empty State */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Loading published LTMW PDF documents...
        </div>
      ) : filteredPdfs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {pdfs.length === 0
              ? 'No PDF Documents Published by Admin Yet'
              : 'No Matching PDFs Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {pdfs.length === 0
              ? 'Only verified Lecture notes, Textbooks, Mid and Final exams, and Worksheets uploaded by Admin appear here.'
              : 'Try clearing your search or selecting "All LTMW Categories" and "All Subjects".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPdfs.map((pdf) => {
            const isDownloaded = Boolean(downloadedMap[pdf.id]);
            const progressState = downloadingMap[pdf.id];
            const isDownloading = Boolean(progressState);
            const fmt = detectPublishedFileType(pdf.originalFilename, pdf.fileUrl);

            return (
              <div
                key={pdf.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${
                        fmt === 'pptx'
                          ? 'bg-amber-950/90 text-amber-300 border-amber-700/60'
                          : fmt === 'image'
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60'
                          : 'bg-blue-950/90 text-blue-300 border-blue-700/60'
                      }`}
                    >
                      {fmt}
                    </span>
                    <span className="font-semibold text-blue-400">
                      {getSubjectDisplayName(pdf.subject)}
                    </span>
                    <span>·</span>
                    <span className="text-slate-200 font-medium">{pdf.category}</span>
                    <span>·</span>
                    <span className="tabular-nums">{formatBytes(pdf.fileSize)}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{pdf.title}</h3>

                  {pdf.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">{pdf.description}</p>
                  )}
                </div>

                {/* Live Download Progress Bar when downloading */}
                {isDownloading && progressState && (
                  <div className="space-y-1.5 bg-slate-950 border border-blue-500/40 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-blue-300">
                        Downloading {fmt.toUpperCase()} to app...
                      </span>
                      <span className="font-bold text-white tabular-nums">
                        {progressState.percent}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-150"
                        style={{ width: `${progressState.percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 tabular-nums">
                      <span>{formatBytes(progressState.loadedBytes)} downloaded</span>
                      <span>Total: {formatBytes(progressState.totalBytes)}</span>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 tabular-nums flex items-center gap-1.5">
                    {isDownloaded ? (
                      <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Downloaded · Offline Ready</span>
                      </span>
                    ) : (
                      <span>Published {new Date(pdf.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>

                  {/* Primary Actions: Open / Read in Built-in Full-Screen / Portrait-Landscape Reader */}
                  <div className="flex flex-wrap items-center gap-2">
                    {!isDownloaded && (
                      <button
                        type="button"
                        disabled={isDownloading}
                        onClick={() => handleDownloadPdf(pdf)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-400" />
                        <span>
                          {isDownloading
                            ? `Saving (${progressState?.percent || 0}%)...`
                            : `Save Offline`}
                        </span>
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleOpenDownloadedPdf(pdf)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-semibold text-white flex items-center gap-1.5 transition whitespace-nowrap"
                    >
                      {isPaidAccessLocked && !isFreeCourseSubject(normalizeSubjectTo19(pdf.subject)) ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5" />
                      )}
                      <span>Open & Read {fmt.toUpperCase()}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ABEFA Built-in PDF Reading System */}
      {activeReaderPdf && (
        <FreshmanPdfReaderModal
          pdf={activeReaderPdf.pdf}
          pdfDataUrl={activeReaderPdf.dataUrl}
          onClose={() => setActiveReaderPdf(null)}
        />
      )}
    </div>
  );
};
