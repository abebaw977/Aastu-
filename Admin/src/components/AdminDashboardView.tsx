import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AuthUser,
  LTMW_PDF_CATEGORIES,
  PaymentRequestRecord,
  PublishedPdfDocument,
  Subject,
  Semester,
  AccountStatus,
  AdminPracticePost,
} from '../../../src/types';
import {
  fetchAdminOverview,
  approvePaymentRequest,
  rejectPaymentRequest,
  updateStudentAccountStatus,
  uploadAdminPdf,
  updateAdminPdf,
  deleteAdminPdf,
  changeAdminCredentials,
  getAuthenticatedAssetUrl,
  subscribeToAdminCloudUpdates,
  downloadPublishedPdfWithProgress,
  detectPublishedFileType,
  fetchAdminPracticePosts,
  subscribeToPracticePosts,
  createAdminPracticePost,
  createAdminPracticePostsBatch,
  deleteAdminPracticePost,
  deleteAdminPracticePostsBatch,
} from '../../../src/utils/authPaymentService';
import {
  parseMcqsFromReadmeOrCode,
  SAMPLE_README_MCQ_TEMPLATE,
} from '../../../src/utils/examMcqParser';
import {
  OFFICIAL_17_FRESHMAN_COURSES,
  getSubjectDisplayName,
} from '../../../src/data/freshmanCourseCatalog';
import { FreshmanPdfReaderModal } from '../../../src/components/FreshmanPdfReaderModal';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  LogOut,
  FileText,
  Upload,
  Trash2,
  Eye,
  Users,
  CreditCard,
  Search,
  Lock,
  X,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Code,
  ListChecks,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AdminDashboardViewProps {
  adminUser: AuthUser;
  onLogout: () => void;
  onOpenStudentAppView?: () => void;
  onAdminUserUpdated: (updated: AuthUser) => void;
  onPdfsChanged?: () => void;
}

function cleanErrorMessage(err: unknown, defaultMsg: string): string {
  if (!err) return defaultMsg;
  const raw = err instanceof Error ? err.message : String(err);
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      if (parsed.error && typeof parsed.error === 'string') {
        const pathSuffix = parsed.path ? ` (${parsed.path})` : '';
        return `${parsed.error}${pathSuffix}`;
      }
    }
  } catch {
    // not JSON
  }
  return raw || defaultMsg;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adminUser,
  onLogout,
  onOpenStudentAppView,
  onAdminUserUpdated,
  onPdfsChanged,
}) => {
  const [activeSection, setActiveSection] = useState<'payments' | 'pdfs' | 'exams' | 'students' | 'settings'>('payments');
  const [payments, setPayments] = useState<PaymentRequestRecord[]>([]);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [pdfs, setPdfs] = useState<PublishedPdfDocument[]>([]);
  const [practicePosts, setPracticePosts] = useState<AdminPracticePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Payment Filter & Screenshot Lightbox
  const [paymentFilter, setPaymentFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedPayment, setInspectedPayment] = useState<PaymentRequestRecord | null>(null);

  // PDF Upload Form State
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfSubject, setPdfSubject] = useState<Subject>('anthropology');
  const [pdfCourseCode, setPdfCourseCode] = useState('Anthropology');
  const [pdfSemester, setPdfSemester] = useState<Semester>(1);
  const [pdfCategory, setPdfCategory] = useState<string>('Lecture notes');
  const [pdfDescription, setPdfDescription] = useState('');
  const [pdfIsPublished, setPdfIsPublished] = useState(true);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [previewPdfDoc, setPreviewPdfDoc] = useState<{
    pdf: PublishedPdfDocument;
    dataUrl: string;
  } | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);

  // Exams & MCQs Upload State (README/Code Batch, Single MCQ, Exam Sheet Image)
  const [examUploadMode, setExamUploadMode] = useState<'readme' | 'single' | 'image'>('readme');
  const [examSubject, setExamSubject] = useState<Subject>('anthropology');
  const [examType, setExamType] = useState<'midterm' | 'final'>('midterm');
  const [examTestTitle, setExamTestTitle] = useState('');
  const [readmeMcqCode, setReadmeMcqCode] = useState('');
  const [singleQuestion, setSingleQuestion] = useState('');
  const [singleOptions, setSingleOptions] = useState<string[]>(['', '', '', '']);
  const [singleCorrectIndex, setSingleCorrectIndex] = useState<number>(0);
  const [singleExplanation, setSingleExplanation] = useState('');
  const [singleQuestionImage, setSingleQuestionImage] = useState<File | null>(null);
  const [examSheetImage, setExamSheetImage] = useState<File | null>(null);
  const [examSheetNotes, setExamSheetNotes] = useState('');
  const [publishingExam, setPublishingExam] = useState(false);
  const [examManageSubjectFilter, setExamManageSubjectFilter] = useState<Subject>('all');
  const [examManageTypeFilter, setExamManageTypeFilter] = useState<'ALL' | 'midterm' | 'final'>('ALL');
  const [examManageSearch, setExamManageSearch] = useState('');
  const [expandedExamGroupKey, setExpandedExamGroupKey] = useState<string | null>(null);
  const [confirmDeleteGroupKey, setConfirmDeleteGroupKey] = useState<string | null>(null);
  const [inspectedExamImage, setInspectedExamImage] = useState<AdminPracticePost | null>(null);
  const singleImgInputRef = useRef<HTMLInputElement | null>(null);
  const sheetImgInputRef = useRef<HTMLInputElement | null>(null);
  const readmeFileInputRef = useRef<HTMLInputElement | null>(null);

  // Admin Password Settings Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminUser.username);
  const [newPassword, setNewPassword] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, posts] = await Promise.all([
        fetchAdminOverview(),
        fetchAdminPracticePosts(),
      ]);
      setPayments(data.payments || []);
      setUsers(data.users || []);
      setPdfs(data.pdfs || []);
      setPracticePosts(posts || []);
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to load admin dashboard data.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    const unsubscribe = subscribeToAdminCloudUpdates(() => {
      fetchAdminOverview()
        .then((data) => {
          setPayments(data.payments || []);
          setUsers(data.users || []);
          setPdfs(data.pdfs || []);
        })
        .catch(() => {
          // ignore background refresh error
        });
    });
    const unsubPractice = subscribeToPracticePosts((posts) => {
      setPracticePosts(posts || []);
    });
    return () => {
      unsubscribe();
      unsubPractice();
    };
  }, [loadDashboardData]);

  const showBannerMessage = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleApprovePayment = async (payment: PaymentRequestRecord) => {
    setActionBusyId(payment.id);
    setError(null);
    try {
      const res = await approvePaymentRequest(payment.id);
      showBannerMessage(res.message);
      await loadDashboardData();
      if (inspectedPayment?.id === payment.id) {
        setInspectedPayment(res.payment);
      }
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to approve payment.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleRejectPayment = async (payment: PaymentRequestRecord) => {
    setActionBusyId(payment.id);
    setError(null);
    try {
      const res = await rejectPaymentRequest(
        payment.id,
        'Your Telebirr payment screenshot could not be verified. Please submit a clear 50 ETB Telebirr receipt screenshot.'
      );
      showBannerMessage(res.message);
      await loadDashboardData();
      if (inspectedPayment?.id === payment.id) {
        setInspectedPayment(res.payment);
      }
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to reject payment.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleChangeStudentStatus = async (studentId: string, status: AccountStatus) => {
    setActionBusyId(studentId);
    setError(null);
    try {
      await updateStudentAccountStatus(studentId, status);
      showBannerMessage('Student account status updated.');
      await loadDashboardData();
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to update student status.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleSubjectSelectionForPdf = (subj: Subject) => {
    setPdfSubject(subj);
    const matchedCourse = OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === subj);
    if (matchedCourse) {
      setPdfCourseCode(matchedCourse.code);
      setPdfSemester(matchedCourse.semester);
    }
  };

  const handleUploadPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

      if (!pdfTitle.trim()) {
        setError('Please enter a title for the document.');
        return;
      }
      if (!pdfFile) {
        setError('Please select a PDF, PPTX, or Image file from your device.');
        return;
      }

      setUploadingPdf(true);
      try {
        const res = await uploadAdminPdf({
          title: pdfTitle.trim(),
          subject: pdfSubject,
          courseCode: getSubjectDisplayName(pdfSubject),
          semester: pdfSemester,
          category: pdfCategory,
          description: pdfDescription.trim(),
          isPublished: pdfIsPublished,
          file: pdfFile,
        });
        showBannerMessage(res.message);
      setPdfTitle('');
      setPdfDescription('');
      setPdfFile(null);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      await loadDashboardData();
      onPdfsChanged?.();
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to upload PDF.'));
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleTogglePublishPdf = async (pdf: PublishedPdfDocument) => {
    setActionBusyId(pdf.id);
    setError(null);
    try {
      await updateAdminPdf(pdf.id, { isPublished: !pdf.isPublished });
      showBannerMessage(
        !pdf.isPublished ? `"${pdf.title}" published to students.` : `"${pdf.title}" unpublished.`
      );
      await loadDashboardData();
      onPdfsChanged?.();
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to update PDF status.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDeletePdf = async (pdf: PublishedPdfDocument) => {
    setActionBusyId(pdf.id);
    setError(null);
    try {
      await deleteAdminPdf(pdf.id);
      showBannerMessage(`Deleted "${pdf.title}".`);
      await loadDashboardData();
      onPdfsChanged?.();
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to delete PDF.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleSaveAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!currentPassword || !newPassword) {
      setError('Please enter both your current password and new password.');
      return;
    }
    setSavingSettings(true);
    try {
      const res = await changeAdminCredentials({
        currentPassword,
        newPassword,
        newUsername: newUsername.trim(),
      });
      showBannerMessage(res.message);
      onAdminUserUpdated(res.user);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to update admin credentials.'));
    } finally {
      setSavingSettings(false);
    }
  };

  const pendingPaymentsCount = payments.filter((p) => p.status === 'PENDING').length;
  const approvedPaymentsCount = payments.filter((p) => p.status === 'APPROVED').length;
  const studentUsers = users.filter((u) => u.role === 'student');

  const filteredPayments = payments.filter((p) => {
    const matchStatus = paymentFilter === 'ALL' || p.status === paymentFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchQuery =
      !q ||
      p.username.toLowerCase().includes(q) ||
      p.phoneNumber.toLowerCase().includes(q) ||
      (p.transactionRef || '').toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes <= 0) return '0 KB';
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Parsed README/Code MCQ Preview
  const parsedBatch = React.useMemo(
    () => parseMcqsFromReadmeOrCode(readmeMcqCode),
    [readmeMcqCode]
  );

  const handleUploadReadmeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target?.result || '');
      setReadmeMcqCode(text);
      const res = parseMcqsFromReadmeOrCode(text);
      if (!examTestTitle.trim() && res.detectedTitle) {
        setExamTestTitle(res.detectedTitle);
      } else if (!examTestTitle.trim()) {
        setExamTestTitle(file.name.replace(/\.[^.]+$/, ''));
      }
    };
    reader.readAsText(file);
    if (readmeFileInputRef.current) readmeFileInputRef.current.value = '';
  };

  const handlePublishReadmeBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (parsedBatch.questions.length === 0) {
      setError('No valid MCQs parsed yet. Paste README Markdown or JSON MCQ code first.');
      return;
    }
    const finalTitle =
      examTestTitle.trim() ||
      parsedBatch.detectedTitle ||
      `${getSubjectDisplayName(examSubject)} ${examType === 'final' ? 'Final' : 'Midterm'} Exam`;

    setPublishingExam(true);
    try {
      const res = await createAdminPracticePostsBatch({
        subject: examSubject,
        examType,
        title: finalTitle,
        questions: parsedBatch.questions,
      });
      showBannerMessage(res.message);
      setReadmeMcqCode('');
      setExamTestTitle('');
      const refreshed = await fetchAdminPracticePosts();
      setPracticePosts(refreshed);
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to publish MCQ exam test.'));
    } finally {
      setPublishingExam(false);
    }
  };

  const handlePublishSingleMcq = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanOpts = singleOptions.map((o) => o.trim()).filter(Boolean);
    if (!singleQuestion.trim() && !singleQuestionImage) {
      setError('Enter the question text or attach a question image.');
      return;
    }
    if (cleanOpts.length < 2) {
      setError('Enter at least 2 answer options.');
      return;
    }
    setPublishingExam(true);
    try {
      const res = await createAdminPracticePost({
        postType: 'mcq',
        subject: examSubject,
        examType,
        title:
          examTestTitle.trim() ||
          `${getSubjectDisplayName(examSubject)} ${examType === 'final' ? 'Final' : 'Midterm'} Practice`,
        question: singleQuestion.trim(),
        options: cleanOpts,
        correctAnswer: Math.min(singleCorrectIndex, cleanOpts.length - 1),
        explanation: singleExplanation.trim(),
        imageFile: singleQuestionImage,
      });
      showBannerMessage(res.message);
      setSingleQuestion('');
      setSingleOptions(['', '', '', '']);
      setSingleCorrectIndex(0);
      setSingleExplanation('');
      setSingleQuestionImage(null);
      if (singleImgInputRef.current) singleImgInputRef.current.value = '';
      const refreshed = await fetchAdminPracticePosts();
      setPracticePosts(refreshed);
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to publish MCQ.'));
    } finally {
      setPublishingExam(false);
    }
  };

  const handlePublishExamSheetImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!examSheetImage) {
      setError('Please select an exam sheet image to upload.');
      return;
    }
    setPublishingExam(true);
    try {
      const res = await createAdminPracticePost({
        postType: 'image',
        subject: examSubject,
        examType,
        title:
          examTestTitle.trim() ||
          `${getSubjectDisplayName(examSubject)} ${examType === 'final' ? 'Final' : 'Midterm'} Paper`,
        explanation: examSheetNotes.trim(),
        imageFile: examSheetImage,
      });
      showBannerMessage(res.message);
      setExamSheetImage(null);
      setExamSheetNotes('');
      if (sheetImgInputRef.current) sheetImgInputRef.current.value = '';
      const refreshed = await fetchAdminPracticePosts();
      setPracticePosts(refreshed);
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to publish exam sheet image.'));
    } finally {
      setPublishingExam(false);
    }
  };

  const handleDeleteSinglePracticePost = async (postId: string) => {
    setActionBusyId(postId);
    setError(null);
    try {
      await deleteAdminPracticePost(postId);
      setPracticePosts((prev) => prev.filter((p) => p.id !== postId));
      showBannerMessage('Deleted item from Exam Hub.');
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to delete exam item.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDeleteExamGroup = async (groupKey: string, postIds: string[]) => {
    setActionBusyId(groupKey);
    setError(null);
    try {
      await deleteAdminPracticePostsBatch(postIds);
      const idSet = new Set(postIds);
      setPracticePosts((prev) => prev.filter((p) => !idSet.has(p.id)));
      setConfirmDeleteGroupKey(null);
      showBannerMessage(`Deleted exam test (${postIds.length} MCQs).`);
    } catch (err: any) {
      setError(cleanErrorMessage(err, 'Failed to delete exam test.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const filteredPracticePosts = React.useMemo(() => {
    const q = examManageSearch.trim().toLowerCase();
    return practicePosts.filter((p) => {
      const matchSubj = examManageSubjectFilter === 'all' || p.subject === examManageSubjectFilter;
      const matchType = examManageTypeFilter === 'ALL' || p.examType === examManageTypeFilter;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.question.toLowerCase().includes(q) ||
        getSubjectDisplayName(p.subject).toLowerCase().includes(q);
      return matchSubj && matchType && matchSearch;
    });
  }, [practicePosts, examManageSubjectFilter, examManageTypeFilter, examManageSearch]);

  const groupedMcqTests = React.useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        title: string;
        subject: Subject;
        examType: 'midterm' | 'final';
        posts: AdminPracticePost[];
        latestCreatedAt: string;
      }
    >();

    for (const p of filteredPracticePosts) {
      if (p.postType !== 'mcq') continue;
      const key = `${p.subject}::${p.examType}::${(p.title || 'Exam Test').trim()}`;
      const existing = map.get(key);
      if (existing) {
        existing.posts.push(p);
        if (p.createdAt > existing.latestCreatedAt) {
          existing.latestCreatedAt = p.createdAt;
        }
      } else {
        map.set(key, {
          key,
          title: p.title || 'Uploaded Exam Test',
          subject: p.subject,
          examType: p.examType,
          posts: [p],
          latestCreatedAt: p.createdAt,
        });
      }
    }

    return Array.from(map.values())
      .map((g) => ({
        ...g,
        posts: [...g.posts].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
      }))
      .sort((a, b) => b.latestCreatedAt.localeCompare(a.latestCreatedAt));
  }, [filteredPracticePosts]);

  const examImagePosts = React.useMemo(
    () => filteredPracticePosts.filter((p) => p.postType === 'image'),
    [filteredPracticePosts]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm sm:text-base text-white truncate">
                ABEFA · Admin Panel
              </h1>
              <p className="text-xs text-slate-400 truncate">
                Admin: <span className="text-slate-200 font-medium">{adminUser.username}</span> · Manual Payment & PDF Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenStudentAppView && (
              <button
                type="button"
                onClick={onOpenStudentAppView}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Student App View</span>
              </button>
            )}
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 xs:p-4 sm:p-6 space-y-4 xs:space-y-6">
        {/* Summary Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 xs:gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 xs:p-4">
            <div className="text-[11px] xs:text-xs text-slate-400">Pending Requests</div>
            <div className="text-xl xs:text-2xl font-bold text-amber-400 mt-0.5 xs:mt-1 tabular-nums">
              {pendingPaymentsCount}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 xs:p-4">
            <div className="text-[11px] xs:text-xs text-slate-400">Approved Paid</div>
            <div className="text-xl xs:text-2xl font-bold text-emerald-400 mt-0.5 xs:mt-1 tabular-nums">
              {approvedPaymentsCount}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 xs:p-4">
            <div className="text-[11px] xs:text-xs text-slate-400">Registered Students</div>
            <div className="text-xl xs:text-2xl font-bold text-white mt-0.5 xs:mt-1 tabular-nums">
              {studentUsers.length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 xs:p-4">
            <div className="text-[11px] xs:text-xs text-slate-400">Published PDFs</div>
            <div className="text-xl xs:text-2xl font-bold text-blue-400 mt-0.5 xs:mt-1 tabular-nums">
              {pdfs.filter((p) => p.isPublished).length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 xs:p-4">
            <div className="text-[11px] xs:text-xs text-slate-400">Uploaded MCQs & Papers</div>
            <div className="text-xl xs:text-2xl font-bold text-purple-400 mt-0.5 xs:mt-1 tabular-nums">
              {practicePosts.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Horizontally scrollable on small mobile */}
        <div className="flex items-center gap-1.5 xs:gap-2 border-b border-slate-800 pb-2.5 overflow-x-auto no-scrollbar touch-pan-x">
          <button
            type="button"
            onClick={() => setActiveSection('payments')}
            className={`px-3 xs:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 xs:gap-2 transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'payments'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>PAYMENT REQUESTS ({payments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('pdfs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'pdfs'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>UPLOAD & MANAGE PDFS ({pdfs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('exams')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'exams'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>EXAMS & MCQS ({practicePosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('students')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'students'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>STUDENTS ({studentUsers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'settings'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>ADMIN SECURITY</span>
          </button>
        </div>

        {/* Status Messages */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SECTION 1: PAYMENT REQUESTS */}
        {activeSection === 'payments' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">PAYMENT REQUESTS</h2>
                <p className="text-xs text-slate-400">
                  Review Telebirr 50 ETB payment screenshots and click APPROVE or REJECT.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                  {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPaymentFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                        paymentFilter === st
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search username or phone..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {filteredPayments.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
                <Clock className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-sm font-semibold text-white">No Payment Requests Found</h3>
                <p className="text-xs text-slate-400">
                  When students submit their 50 ETB Telebirr payment screenshots, they will appear here for verification.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredPayments.map((req) => {
                  const isBusy = actionBusyId === req.id;
                  return (
                    <div
                      key={req.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                    >
                      {/* Request Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 flex-1 text-xs">
                        <div>
                          <span className="text-slate-500 block">Username</span>
                          <span className="font-bold text-white text-sm mt-0.5 block">
                            {req.username}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Phone Number</span>
                          <span className="font-semibold text-slate-200 mt-0.5 block tabular-nums">
                            {req.phoneNumber}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Amount</span>
                          <span className="font-bold text-emerald-400 mt-0.5 block tabular-nums">
                            {req.amount} {req.currency}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Payment Method</span>
                          <span className="font-semibold text-slate-200 mt-0.5 block">
                            {req.paymentMethod}
                            {req.transactionRef ? ` · ${req.transactionRef}` : ''}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Submission Date/Time</span>
                          <span className="font-medium text-slate-300 mt-0.5 block tabular-nums">
                            {new Date(req.submittedAt).toLocaleString()}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Status</span>
                          <span
                            className={`font-bold mt-0.5 inline-flex items-center gap-1 ${
                              req.status === 'APPROVED'
                                ? 'text-emerald-400'
                                : req.status === 'REJECTED'
                                ? 'text-rose-400'
                                : 'text-amber-400'
                            }`}
                          >
                            {req.status === 'APPROVED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {req.status === 'REJECTED' && <XCircle className="w-3.5 h-3.5" />}
                            {req.status === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                            <span>{req.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Screenshot Thumbnail & Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                        <button
                          type="button"
                          onClick={() => setInspectedPayment(req)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition"
                        >
                          <img
                            src={getAuthenticatedAssetUrl(req.screenshotUrl)}
                            alt={`Screenshot from ${req.username}`}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded object-cover border border-slate-700"
                          />
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span>View Screenshot</span>
                        </button>

                        <button
                          type="button"
                          disabled={isBusy || req.status === 'APPROVED'}
                          onClick={() => handleApprovePayment(req)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition whitespace-nowrap"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>APPROVE</span>
                        </button>

                        <button
                          type="button"
                          disabled={isBusy || req.status === 'REJECTED'}
                          onClick={() => handleRejectPayment(req)}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition whitespace-nowrap"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>REJECT</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: ADMIN PDF / PPTX / IMAGE UPLOAD & MANAGEMENT */}
        {activeSection === 'pdfs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Upload New PDF / PPTX / Image Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-white">
                    Upload & Publish Course PDF / PPTX / Image
                  </h2>
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-700/50 text-[10px] font-bold text-blue-300">
                      PDF
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 text-[10px] font-bold text-amber-300">
                      PPTX
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/50 text-[10px] font-bold text-emerald-300">
                      IMAGE
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload PDF modules, PowerPoint (.pptx) lecture slides, or high-res study images. Students can read them with Full Screen, Scroll Bar, and Portrait/Landscape controls.
                </p>
              </div>

              <form onSubmit={handleUploadPdf} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Document / Presentation Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={pdfTitle}
                    onChange={(e) => setPdfTitle(e.target.value)}
                    placeholder="e.g. Geography Unit 1–8 Slides or Module PDF"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Subject ({OFFICIAL_17_FRESHMAN_COURSES.length} Subjects)
                    </label>
                    <select
                      value={pdfSubject}
                      onChange={(e) => handleSubjectSelectionForPdf(e.target.value as Subject)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {OFFICIAL_17_FRESHMAN_COURSES.map((c) => (
                        <option key={c.id} value={c.subject}>
                          {c.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category (LTMW)
                    </label>
                    <select
                      value={pdfCategory}
                      onChange={(e) => setPdfCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {LTMW_PDF_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description / Study Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={pdfDescription}
                    onChange={(e) => setPdfDescription(e.target.value)}
                    placeholder="Short summary of chapters, slides, or exam year covered..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Select PDF, PPTX, or Image File <span className="text-rose-400">*</span>
                  </label>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf,.pptx,.ppt,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,image/png,image/jpeg,image/webp,image/gif,image/*"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    required
                    className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supported formats: <strong className="text-slate-300">.pdf</strong>, <strong className="text-amber-300">.pptx / .ppt</strong>, and <strong className="text-emerald-300">.png / .jpg / .webp</strong>
                  </p>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pdfIsPublished}
                    onChange={(e) => setPdfIsPublished(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-blue-600"
                  />
                  <span>Publish immediately to approved students</span>
                </label>

                <button
                  type="submit"
                  disabled={uploadingPdf}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {uploadingPdf
                      ? 'Uploading File...'
                      : 'Upload & Publish (PDF / PPTX / Image)'}
                  </span>
                </button>
              </form>
            </div>

            {/* Uploaded PDFs / PPTX / Images List */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Published Documents, Slides & Images ({pdfs.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    All PDF, PPTX, and Image files uploaded by Admin are listed here and shown to students.
                  </p>
                </div>
              </div>

              {pdfs.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                  <h3 className="text-sm font-semibold text-white">No Documents Uploaded Yet</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Use the upload form on the left to upload course PDFs, PPTX slide decks, or study images for your students.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pdfs.map((pdf) => {
                    const fmt = detectPublishedFileType(pdf.originalFilename, pdf.fileUrl);
                    return (
                    <div
                      key={pdf.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
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
                          <span>{pdf.category}</span>
                          <span>·</span>
                          <span className="tabular-nums">{formatBytes(pdf.fileSize)}</span>
                          <span>·</span>
                          <span
                            className={
                              pdf.isPublished
                                ? 'text-emerald-400 font-semibold'
                                : 'text-amber-400 font-semibold'
                            }
                          >
                            {pdf.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white truncate">{pdf.title}</h3>
                        {pdf.description && (
                          <p className="text-xs text-slate-400 line-clamp-2">{pdf.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          disabled={actionBusyId === pdf.id}
                          onClick={async () => {
                            setActionBusyId(pdf.id);
                            setError(null);
                            try {
                              const dataUrl = await downloadPublishedPdfWithProgress(pdf);
                              setPreviewPdfDoc({ pdf, dataUrl });
                            } catch (err: any) {
                              setError(err?.message || 'Could not load document preview.');
                            } finally {
                              setActionBusyId(null);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span>
                            {actionBusyId === pdf.id
                              ? 'Opening...'
                              : `Read ${fmt.toUpperCase()}`}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePublishPdf(pdf)}
                          disabled={actionBusyId === pdf.id}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                        >
                          {pdf.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePdf(pdf)}
                          disabled={actionBusyId === pdf.id}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2B: ADMIN EXAM TESTS & MCQS UPLOADER (README/CODE BATCH + SINGLE MCQ + IMAGE) */}
        {activeSection === 'exams' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Exam Uploader */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <span>Upload Exam Tests & MCQs for Academy App</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Paste README / Markdown / JSON MCQ code blocks, add a single MCQ, or upload an exam sheet image. Students in the Academy app read these exact uploaded MCQs.
                </p>
              </div>

              {/* Upload Mode Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setExamUploadMode('readme')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    examUploadMode === 'readme'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>README / Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExamUploadMode('single')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    examUploadMode === 'single'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  <span>Single MCQ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExamUploadMode('image')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    examUploadMode === 'image'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Exam Image</span>
                </button>
              </div>

              {/* Shared Subject, Exam Type, and Exam Test Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject ({OFFICIAL_17_FRESHMAN_COURSES.length} Courses)
                  </label>
                  <select
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value as Subject)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {OFFICIAL_17_FRESHMAN_COURSES.map((c) => (
                      <option key={c.id} value={c.subject}>
                        {c.shortTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Exam Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['midterm', 'final'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setExamType(t)}
                        className={`py-2 rounded-xl text-xs font-bold capitalize border transition cursor-pointer ${
                          examType === t
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {t} Exam
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Exam Test Title
                </label>
                <input
                  type="text"
                  value={examTestTitle}
                  onChange={(e) => setExamTestTitle(e.target.value)}
                  placeholder={
                    parsedBatch.detectedTitle
                      ? `Detected: ${parsedBatch.detectedTitle}`
                      : 'e.g. Applied Math I Midterm 2026'
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* MODE 1: README / CODE BATCH IMPORTER */}
              {examUploadMode === 'readme' && (
                <form onSubmit={handlePublishReadmeBatch} className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-300">
                      Paste README / Markdown / JSON MCQs
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setReadmeMcqCode(SAMPLE_README_MCQ_TEMPLATE);
                          if (!examTestTitle.trim()) {
                            setExamTestTitle('Calculus I — Midterm Practice Exam');
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                      >
                        Load Sample README
                      </button>
                      <label className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 cursor-pointer">
                        Upload .md / .txt / .json
                        <input
                          ref={readmeFileInputRef}
                          type="file"
                          accept=".md,.markdown,.txt,.json,text/markdown,text/plain,application/json"
                          onChange={handleUploadReadmeFile}
                          className="hidden"
                        />
                      </label>
                      {readmeMcqCode && (
                        <button
                          type="button"
                          onClick={() => setReadmeMcqCode('')}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 text-[11px] font-semibold cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={10}
                    value={readmeMcqCode}
                    onChange={(e) => {
                      const next = e.target.value;
                      setReadmeMcqCode(next);
                      if (!examTestTitle.trim()) {
                        const res = parseMcqsFromReadmeOrCode(next);
                        if (res.detectedTitle) setExamTestTitle(res.detectedTitle);
                      }
                    }}
                    placeholder={`Paste MCQs from README.md, Markdown, or JSON here:\n\n1. What is the SI unit of force?\nA) Joule\nB) Newton\nC) Watt\nD) Pascal\nAnswer: B\nExplanation: Force = mass × acceleration (kg·m/s² = Newton).`}
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 leading-relaxed"
                  />

                  {/* Live Parsed Preview */}
                  {readmeMcqCode.trim() && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-emerald-400">
                            Parsed {parsedBatch.questions.length} MCQ{parsedBatch.questions.length === 1 ? '' : 's'} ready to publish
                          </span>
                          {parsedBatch.formatDetected !== 'empty' && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/50 text-[10px] uppercase">
                              {parsedBatch.formatDetected}
                            </span>
                          )}
                        </div>
                      </div>

                      {parsedBatch.warnings.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-700/40 text-[11px] text-amber-300 space-y-0.5">
                          {parsedBatch.warnings.slice(0, 4).map((w, i) => (
                            <div key={i}>• {w}</div>
                          ))}
                        </div>
                      )}

                      {parsedBatch.questions.length > 0 && (
                        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                          {parsedBatch.questions.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs"
                            >
                              <div className="font-bold text-white">
                                <span className="text-purple-400 mr-1.5">Q{idx + 1}.</span>
                                {item.question}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {item.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === item.correctAnswer;
                                  return (
                                    <div
                                      key={oIdx}
                                      className={`px-2 py-1 rounded border text-[11px] flex items-center justify-between gap-1.5 ${
                                        isCorrect
                                          ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200 font-semibold'
                                          : 'bg-slate-950 border-slate-800 text-slate-300'
                                      }`}
                                    >
                                      <span className="truncate">
                                        {String.fromCharCode(65 + oIdx)}) {opt}
                                      </span>
                                      {isCorrect && (
                                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              {item.explanation && (
                                <div className="text-[11px] text-slate-400">
                                  <strong className="text-slate-300">Explanation:</strong> {item.explanation}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={publishingExam || parsedBatch.questions.length === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-45 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>
                      {publishingExam
                        ? 'Publishing MCQs...'
                        : `Publish ${parsedBatch.questions.length} MCQ${parsedBatch.questions.length === 1 ? '' : 's'} Exam Test`}
                    </span>
                  </button>
                </form>
              )}

              {/* MODE 2: SINGLE MCQ CREATOR */}
              {examUploadMode === 'single' && (
                <form onSubmit={handlePublishSingleMcq} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Question Text <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={singleQuestion}
                      onChange={(e) => setSingleQuestion(e.target.value)}
                      placeholder="Enter MCQ question (supports LaTeX like $x^2 + 1$)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">
                      Answer Options (select the correct answer)
                    </label>
                    {singleOptions.map((optVal, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSingleCorrectIndex(idx)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold border shrink-0 transition cursor-pointer ${
                            singleCorrectIndex === idx
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Mark as Correct Answer"
                        >
                          {String.fromCharCode(65 + idx)}
                        </button>
                        <input
                          type="text"
                          value={optVal}
                          onChange={(e) => {
                            const next = [...singleOptions];
                            next[idx] = e.target.value;
                            setSingleOptions(next);
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Explanation / Solution (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={singleExplanation}
                      onChange={(e) => setSingleExplanation(e.target.value)}
                      placeholder="Explain why the selected answer is correct..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Optional Question Diagram / Image
                    </label>
                    <input
                      ref={singleImgInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/*"
                      onChange={(e) => setSingleQuestionImage(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={publishingExam}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{publishingExam ? 'Publishing MCQ...' : 'Publish Single MCQ'}</span>
                  </button>
                </form>
              )}

              {/* MODE 3: EXAM PAPER IMAGE */}
              {examUploadMode === 'image' && (
                <form onSubmit={handlePublishExamSheetImage} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Select Exam Paper Image <span className="text-rose-400">*</span>
                    </label>
                    <input
                      ref={sheetImgInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/*"
                      onChange={(e) => setExamSheetImage(e.target.files?.[0] || null)}
                      required
                      className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Instructions or Answer Key (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={examSheetNotes}
                      onChange={(e) => setExamSheetNotes(e.target.value)}
                      placeholder="e.g. 1. C, 2. A, 3. D — or exam instructions..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={publishingExam}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{publishingExam ? 'Uploading Image...' : 'Publish Exam Paper Image'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Manage Published Exam Tests, MCQs & Images */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3 space-y-3">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Published Exam Tests & MCQs ({groupedMcqTests.length} Tests · {examImagePosts.length} Images)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every MCQ test and exam sheet shown here is immediately readable by students in the Academy Exams tab.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={examManageSubjectFilter}
                    onChange={(e) => setExamManageSubjectFilter(e.target.value as Subject)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="all">All Subjects</option>
                    {OFFICIAL_17_FRESHMAN_COURSES.map((c) => (
                      <option key={c.id} value={c.subject}>
                        {c.shortTitle}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                    {(['ALL', 'midterm', 'final'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setExamManageTypeFilter(t)}
                        className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition cursor-pointer ${
                          examManageTypeFilter === t
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t === 'ALL' ? 'All' : t}
                      </button>
                    ))}
                  </div>

                  <div className="relative flex-1 min-w-[140px]">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={examManageSearch}
                      onChange={(e) => setExamManageSearch(e.target.value)}
                      placeholder="Filter exams..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {groupedMcqTests.length === 0 && examImagePosts.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <GraduationCap className="w-9 h-9 text-slate-600 mx-auto" />
                  <h3 className="text-sm font-semibold text-white">No Exam Tests Uploaded Yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Use the README / Code batch uploader or Single MCQ form on the left to publish exam tests for students.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
                  {groupedMcqTests.map((group) => {
                    const isExpanded = expandedExamGroupKey === group.key;
                    const isDeleting = actionBusyId === group.key;
                    return (
                      <div
                        key={group.key}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/50 font-bold uppercase">
                                {group.examType}
                              </span>
                              <span className="font-semibold text-blue-400">
                                {getSubjectDisplayName(group.subject)}
                              </span>
                              <span className="text-slate-500">·</span>
                              <span className="text-emerald-400 font-bold">
                                {group.posts.length} MCQ{group.posts.length === 1 ? '' : 's'}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white">{group.title}</h3>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedExamGroupKey(isExpanded ? null : group.key)
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                  <span>Hide</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                  <span>View MCQs</span>
                                </>
                              )}
                            </button>

                            {confirmDeleteGroupKey === group.key ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={isDeleting}
                                  onClick={() =>
                                    handleDeleteExamGroup(
                                      group.key,
                                      group.posts.map((p) => p.id)
                                    )
                                  }
                                  className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer"
                                >
                                  {isDeleting ? 'Deleting...' : 'Confirm'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteGroupKey(null)}
                                  className="px-2 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteGroupKey(group.key)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 cursor-pointer"
                                title="Delete Entire Exam Test"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            {group.posts.map((post, qIdx) => (
                              <div
                                key={post.id}
                                className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-2 text-xs"
                              >
                                <div className="space-y-1 min-w-0 flex-1">
                                  <div className="font-semibold text-white">
                                    <span className="text-purple-400 mr-1.5">Q{qIdx + 1}.</span>
                                    {post.question}
                                  </div>
                                  <div className="text-[11px] text-emerald-400">
                                    Correct: {String.fromCharCode(65 + (post.correctAnswer || 0))}){' '}
                                    {post.options[post.correctAnswer || 0] || ''}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  disabled={actionBusyId === post.id}
                                  onClick={() => handleDeleteSinglePracticePost(post.id)}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 shrink-0 cursor-pointer"
                                  title="Delete this MCQ"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {examImagePosts.map((imgPost) => (
                    <div
                      key={imgPost.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={imgPost.imageDataUrl}
                          alt={imgPost.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-bold uppercase">
                              IMAGE · {imgPost.examType}
                            </span>
                            <span className="text-blue-400 font-semibold truncate">
                              {getSubjectDisplayName(imgPost.subject)}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                            {imgPost.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setInspectedExamImage(imgPost)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          disabled={actionBusyId === imgPost.id}
                          onClick={() => handleDeleteSinglePracticePost(imgPost.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 cursor-pointer"
                          title="Delete Exam Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 3: REGISTERED STUDENTS */}
        {activeSection === 'students' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Registered Students ({studentUsers.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                View all student accounts stored in SQLite and manage their access status.
              </p>
            </div>

            {studentUsers.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">
                No students have signed up yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-3 font-semibold">Username</th>
                      <th className="py-3 px-3 font-semibold">Phone Number</th>
                      <th className="py-3 px-3 font-semibold">Account Status</th>
                      <th className="py-3 px-3 font-semibold">Registered Date</th>
                      <th className="py-3 px-3 font-semibold text-right">Manual Access Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {studentUsers.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-semibold text-white">{st.username}</td>
                        <td className="py-3 px-3 tabular-nums text-slate-300">{st.phoneNumber}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`font-semibold ${
                              st.accountStatus === 'APPROVED'
                                ? 'text-emerald-400'
                                : st.accountStatus === 'REJECTED'
                                ? 'text-rose-400'
                                : 'text-amber-400'
                            }`}
                          >
                            {st.accountStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 tabular-nums text-slate-400">
                          {new Date(st.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            type="button"
                            disabled={actionBusyId === st.id || st.accountStatus === 'APPROVED'}
                            onClick={() => handleChangeStudentStatus(st.id, 'APPROVED')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold transition"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={actionBusyId === st.id || st.accountStatus === 'REJECTED'}
                            onClick={() => handleChangeStudentStatus(st.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-semibold transition"
                          >
                            Reject / Lock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: ADMIN SECURITY SETTINGS */}
        {activeSection === 'settings' && (
          <div className="max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">Admin Credentials & Security</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Update your Admin username and password stored in Cloud Firestore.
              </p>
            </div>

            <form onSubmit={handleSaveAdminCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current admin password"
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  New Password (min. 6 characters)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong admin password"
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs sm:text-sm font-semibold text-white transition"
              >
                {savingSettings ? 'Saving...' : 'Update Admin Credentials'}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Payment Screenshot Fullscreen Inspection Modal */}
      {inspectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">{inspectedPayment.username}</span>
                <span className="text-slate-400"> · </span>
                <span className="tabular-nums text-slate-200">{inspectedPayment.phoneNumber}</span>
                <span className="text-slate-400"> · </span>
                <span className="text-emerald-400 font-semibold">
                  {inspectedPayment.amount} {inspectedPayment.currency} ({inspectedPayment.paymentMethod})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectedPayment(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-950 flex items-center justify-center">
              <img
                src={getAuthenticatedAssetUrl(inspectedPayment.screenshotUrl)}
                alt={`Payment screenshot from ${inspectedPayment.username}`}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="px-5 py-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900">
              <div className="text-xs text-slate-400">
                Submitted: {new Date(inspectedPayment.submittedAt).toLocaleString()} · Status:{' '}
                <strong className="text-white">{inspectedPayment.status}</strong>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={actionBusyId === inspectedPayment.id || inspectedPayment.status === 'APPROVED'}
                  onClick={() => handleApprovePayment(inspectedPayment)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPROVE</span>
                </button>
                <button
                  type="button"
                  disabled={actionBusyId === inspectedPayment.id || inspectedPayment.status === 'REJECTED'}
                  onClick={() => handleRejectPayment(inspectedPayment)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>REJECT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Freshman PDF Reader Preview Modal */}
      {previewPdfDoc && (
        <FreshmanPdfReaderModal
          pdf={previewPdfDoc.pdf}
          pdfDataUrl={previewPdfDoc.dataUrl}
          onClose={() => setPreviewPdfDoc(null)}
        />
      )}

      {/* Exam Sheet Image Preview Lightbox */}
      {inspectedExamImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-bold text-white truncate">
                {inspectedExamImage.title} ({getSubjectDisplayName(inspectedExamImage.subject)} · {inspectedExamImage.examType.toUpperCase()})
              </div>
              <button
                type="button"
                onClick={() => setInspectedExamImage(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-slate-950 flex flex-col items-center gap-3">
              <img
                src={inspectedExamImage.imageDataUrl}
                alt={inspectedExamImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
              {inspectedExamImage.explanation && (
                <div className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap">
                  {inspectedExamImage.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
