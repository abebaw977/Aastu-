import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Question,
  ExamResult,
  Subject,
  SavedExamRecord,
  AdminPracticePost,
} from '../types';
import {
  OFFICIAL_17_FRESHMAN_COURSES,
  getSubjectDisplayName,
} from '../data/freshmanCourseCatalog';
import {
  fetchAdminPracticePosts,
  getCachedPracticePosts,
  subscribeToPracticePosts,
  isFreeCourseSubject,
} from '../utils/authPaymentService';
import { MathRenderer } from './MathRenderer';
import confetti from 'canvas-confetti';
import {
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  BarChart3,
  RefreshCw,
  History,
  Trash2,
  Eye,
  Calendar,
  GraduationCap,
  Search,
  Lock,
  Image as ImageIcon,
  X,
  Play,
  BookOpen,
} from 'lucide-react';

interface MockExamViewProps {
  onSaveMistakes: (wrongQuestions: Question[]) => void;
  examHistory?: SavedExamRecord[];
  onSaveExamRecord?: (record: SavedExamRecord) => void;
  onDeleteExamRecord?: (id: string) => void;
  initialSubject?: Subject | 'all';
  isPaidAccessLocked?: boolean;
  onRequirePaidAccess?: (featureName: string) => void;
}

interface GroupedExamTest {
  key: string;
  title: string;
  subject: Subject;
  examType: 'midterm' | 'final';
  posts: AdminPracticePost[];
  latestCreatedAt: string;
}

function practicePostToQuestion(post: AdminPracticePost): Question {
  return {
    id: post.id,
    subject: post.subject,
    topic: post.title || `${post.examType === 'final' ? 'Final' : 'Midterm'} Exam`,
    question: post.question || post.title || 'Exam Question',
    options: Array.isArray(post.options) ? post.options : [],
    correctAnswer: typeof post.correctAnswer === 'number' ? post.correctAnswer : 0,
    explanation: post.explanation || 'Verified answer key uploaded by Academy Admin.',
    difficulty: 'medium',
    examType: post.examType,
    imageDataUrl: post.imageDataUrl || undefined,
    postType: post.postType,
  };
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  onSaveMistakes,
  examHistory = [],
  onSaveExamRecord,
  onDeleteExamRecord,
  initialSubject,
  isPaidAccessLocked = false,
  onRequirePaidAccess,
}) => {
  // Admin-Uploaded Practice Posts State
  const [practicePosts, setPracticePosts] = useState<AdminPracticePost[]>(() =>
    getCachedPracticePosts()
  );
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);

  // Filters & Sub-tabs
  const [examMode, setExamMode] = useState<'uploaded' | 'history'>('uploaded');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(() =>
    isPaidAccessLocked ? 'anthropology' : initialSubject || 'all'
  );
  const [selectedExamType, setSelectedExamType] = useState<'all' | 'midterm' | 'final'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [useTimer, setUseTimer] = useState<boolean>(true);

  // Exam Sheet Image Modal State
  const [inspectedSheet, setInspectedSheet] = useState<AdminPracticePost | null>(null);
  const [showSheetKeyId, setShowSheetKeyId] = useState<Record<string, boolean>>({});

  // Exam Execution State
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(15 * 60);
  const examStartTimeRef = useRef<number>(Date.now());
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [examTitle, setExamTitle] = useState<string>('Uploaded Exam Test');

  useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedSubject('anthropology');
    } else if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [isPaidAccessLocked, initialSubject]);

  const refreshPosts = async () => {
    setLoadingPosts(true);
    try {
      const posts = await fetchAdminPracticePosts();
      setPracticePosts(posts);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    refreshPosts();
    const unsubscribe = subscribeToPracticePosts((posts) => {
      setPracticePosts(posts);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return practicePosts.filter((p) => {
      const matchSubj = selectedSubject === 'all' || p.subject === selectedSubject;
      const matchType = selectedExamType === 'all' || p.examType === selectedExamType;
      const subjName = getSubjectDisplayName(p.subject).toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.question.toLowerCase().includes(q) ||
        subjName.includes(q);
      return matchSubj && matchType && matchQuery;
    });
  }, [practicePosts, selectedSubject, selectedExamType, searchQuery]);

  // Group MCQ posts into structured Exam Tests (Q1..QN ordered chronologically by upload index)
  const groupedTests: GroupedExamTest[] = useMemo(() => {
    const map = new Map<string, GroupedExamTest>();
    for (const p of filteredPosts) {
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
  }, [filteredPosts]);

  const allFilteredMcqQuestions: Question[] = useMemo(() => {
    return filteredPosts
      .filter((p) => p.postType === 'mcq')
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map(practicePostToQuestion);
  }, [filteredPosts]);

  const imagePosts = useMemo(
    () => filteredPosts.filter((p) => p.postType === 'image'),
    [filteredPosts]
  );

  const launchExamSession = (title: string, questionsList: Question[], subjectForGate: Subject) => {
    if (isPaidAccessLocked && !isFreeCourseSubject(subjectForGate)) {
      onRequirePaidAccess?.(`Uploaded Exam (${getSubjectDisplayName(subjectForGate)})`);
      return;
    }
    if (questionsList.length === 0) return;

    const mins = useTimer ? Math.max(5, Math.round(questionsList.length * 1.5)) : 0;
    setExamTitle(title);
    setExamQuestions(questionsList);
    setDurationMinutes(mins);
    setTimeLeftSeconds(mins * 60);
    examStartTimeRef.current = Date.now();
    setUserAnswers({});
    setFlaggedIds({});
    setCurrentIndex(0);
    setExamStarted(true);
    setExamCompleted(false);
    setExamResult(null);
  };

  // Timer tick (only counts down when durationMinutes > 0)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (examStarted && !examCompleted && durationMinutes > 0 && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examCompleted, durationMinutes, timeLeftSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optIndex: number) => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setUserAnswers((prev) => ({
      ...prev,
      [q.id]: optIndex,
    }));
  };

  const handleToggleFlag = () => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setFlaggedIds((prev) => ({
      ...prev,
      [q.id]: !prev[q.id],
    }));
  };

  const handleSubmitExam = () => {
    const elapsedFromRef = Math.max(1, Math.round((Date.now() - examStartTimeRef.current) / 1000));
    const totalTimeSpent =
      durationMinutes > 0
        ? Math.max(1, durationMinutes * 60 - timeLeftSeconds)
        : elapsedFromRef;
    let correctCount = 0;
    const wrongList: Question[] = [];
    const breakdown: ExamResult['subjectBreakdown'] = {};

    const answersReport = examQuestions.map((q) => {
      const selected = userAnswers[q.id] !== undefined ? userAnswers[q.id] : null;
      const isCorrect = selected === q.correctAnswer;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongList.push(q);
      }

      const subjKey = q.subject || 'general';
      if (!breakdown[subjKey]) {
        breakdown[subjKey] = { total: 0, correct: 0 };
      }
      breakdown[subjKey].total++;
      if (isCorrect) {
        breakdown[subjKey].correct++;
      }

      return {
        questionId: q.id,
        userSelected: selected,
        isCorrect,
      };
    });

    const scorePercentage =
      examQuestions.length > 0 ? Math.round((correctCount / examQuestions.length) * 100) : 0;

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      totalQuestions: examQuestions.length,
      correctCount,
      scorePercentage,
      timeSpentSeconds: totalTimeSpent,
      subjectBreakdown: breakdown,
      answers: answersReport,
    };

    setExamResult(result);
    setExamCompleted(true);
    setExamStarted(false);

    if (onSaveExamRecord) {
      const record: SavedExamRecord = {
        id: result.id,
        title: examTitle,
        date:
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        totalQuestions: examQuestions.length,
        correctCount,
        scorePercentage,
        timeSpentSeconds: totalTimeSpent,
        difficulty: 'official',
        subjectBreakdown: breakdown,
        questions: examQuestions,
        answers: answersReport,
      };
      onSaveExamRecord(record);
    }

    if (wrongList.length > 0) {
      onSaveMistakes(wrongList);
    }

    if (scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReviewPastExam = (record: SavedExamRecord) => {
    setExamTitle(record.title);
    setExamQuestions(record.questions);
    setDurationMinutes(Math.round(record.timeSpentSeconds / 60) || 15);
    setTimeLeftSeconds(0);
    const remappedAnswers: Record<string, number> = {};
    record.answers.forEach((a) => {
      if (a.userSelected !== null) {
        remappedAnswers[a.questionId] = a.userSelected;
      }
    });
    setUserAnswers(remappedAnswers);
    setExamResult({
      id: record.id,
      date: record.date,
      totalQuestions: record.totalQuestions,
      correctCount: record.correctCount,
      scorePercentage: record.scorePercentage,
      timeSpentSeconds: record.timeSpentSeconds,
      subjectBreakdown: record.subjectBreakdown,
      answers: record.answers,
    });
    setExamStarted(false);
    setExamCompleted(true);
  };

  // Pre-exam Hub Screen
  if (!examStarted && !examCompleted) {
    const totalUploadedMcqs = practicePosts.filter((p) => p.postType === 'mcq').length;

    return (
      <div className="space-y-4">
        {/* Top Mode Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setExamMode('uploaded')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              examMode === 'uploaded'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Exam Tests & MCQs ({groupedTests.length + imagePosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setExamMode('history')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              examMode === 'history'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <History className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Past Scores ({examHistory.length})</span>
          </button>
        </div>

        {examMode === 'uploaded' ? (
          <div className="space-y-4">
            {/* Filter & Controls Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <span>Admin-Uploaded Exams & MCQs</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select any official Midterm or Final exam test uploaded by your Academy Admin ({totalUploadedMcqs} MCQs total).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUseTimer((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer ${
                      useTimer
                        ? 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{useTimer ? 'Timed Mode' : 'Untimed'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={refreshPosts}
                    disabled={loadingPosts}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingPosts ? 'animate-spin' : ''}`} />
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
                      onRequirePaidAccess?.(`Uploaded Exams — ${getSubjectDisplayName(nextSubj)}`);
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

                <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs shrink-0">
                  {(['all', 'midterm', 'final'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedExamType(t)}
                      className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                        selectedExamType === t
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t === 'all' ? 'All Exams' : t}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search exam test title or topic..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Combined Practice Banner when multiple tests exist for a filtered subject */}
            {selectedSubject !== 'all' &&
              groupedTests.length > 1 &&
              allFilteredMcqQuestions.length > 0 && (
                <div className="bg-slate-900 border border-blue-800/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-blue-400 uppercase">
                      Combined Subject Practice
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      All {getSubjectDisplayName(selectedSubject)} Uploaded MCQs ({allFilteredMcqQuestions.length} Questions)
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      launchExamSession(
                        `${getSubjectDisplayName(selectedSubject)} — All Uploaded MCQs`,
                        allFilteredMcqQuestions,
                        selectedSubject
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Practice All ({allFilteredMcqQuestions.length} Qs)</span>
                  </button>
                </div>
              )}

            {/* Empty State or Uploaded Exam Cards */}
            {loadingPosts && practicePosts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
                Loading uploaded exam tests & MCQs...
              </div>
            ) : groupedTests.length === 0 && imagePosts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 sm:p-12 text-center space-y-3">
                <GraduationCap className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {practicePosts.length === 0
                    ? 'No Exam Tests Uploaded Yet'
                    : 'No Matching Exam Tests Found'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  {practicePosts.length === 0
                    ? 'Exams, MCQs, and test papers uploaded by your Admin will appear here automatically for you to practice.'
                    : 'Try switching the subject or exam type filter above.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* MCQ Exam Tests Grid */}
                {groupedTests.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedTests.map((group) => {
                      const isLocked = isPaidAccessLocked && !isFreeCourseSubject(group.subject);
                      const firstQuestion = group.posts[0]?.question || '';

                      return (
                        <div
                          key={group.key}
                          className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between gap-4 transition"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border bg-blue-950/90 text-blue-300 border-blue-700/60">
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

                            <h3 className="text-base font-bold text-white leading-snug">
                              {group.title}
                            </h3>

                            {firstQuestion && (
                              <div className="text-xs text-slate-400 line-clamp-2 overflow-hidden">
                                <span className="font-semibold text-slate-300 mr-1">Q1:</span>
                                <MathRenderer text={firstQuestion} />
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                            <span className="text-[11px] text-slate-400 tabular-nums">
                              Uploaded {new Date(group.latestCreatedAt).toLocaleDateString()}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                launchExamSession(
                                  group.title,
                                  group.posts.map(practicePostToQuestion),
                                  group.subject
                                )
                              }
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                            >
                              {isLocked ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span>Start Exam ({group.posts.length} Qs)</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Uploaded Exam Sheet Images */}
                {imagePosts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      <span>Uploaded Exam Papers & Answer Sheets ({imagePosts.length})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {imagePosts.map((sheet) => {
                        const isLocked = isPaidAccessLocked && !isFreeCourseSubject(sheet.subject);
                        const showKey = Boolean(showSheetKeyId[sheet.id]);

                        return (
                          <div
                            key={sheet.id}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-1.5 text-[11px]">
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 font-extrabold uppercase">
                                    {sheet.examType} Paper
                                  </span>
                                  <span className="text-blue-400 font-semibold">
                                    {getSubjectDisplayName(sheet.subject)}
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold text-white">{sheet.title}</h4>
                              </div>
                            </div>

                            {!isLocked && (
                              <img
                                src={sheet.imageDataUrl}
                                alt={sheet.title}
                                onClick={() => setInspectedSheet(sheet)}
                                className="w-full max-h-56 object-contain rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
                              />
                            )}

                            {sheet.explanation && showKey && !isLocked && (
                              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 overflow-x-auto">
                                <MathRenderer text={sheet.explanation} />
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                              <span className="text-[11px] text-slate-400">
                                {new Date(sheet.createdAt).toLocaleDateString()}
                              </span>

                              <div className="flex items-center gap-2">
                                {sheet.explanation && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (isLocked) {
                                        onRequirePaidAccess?.(sheet.title);
                                        return;
                                      }
                                      setShowSheetKeyId((prev) => ({
                                        ...prev,
                                        [sheet.id]: !prev[sheet.id],
                                      }));
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
                                  >
                                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{showKey ? 'Hide Key' : 'Answer Key'}</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isLocked) {
                                      onRequirePaidAccess?.(sheet.title);
                                      return;
                                    }
                                    setInspectedSheet(sheet);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                                >
                                  {isLocked ? (
                                    <Lock className="w-3.5 h-3.5" />
                                  ) : (
                                    <Eye className="w-3.5 h-3.5" />
                                  )}
                                  <span>View Full Paper</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Past Exam History Mode */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Completed Exams & Score History
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review your past uploaded exam attempts, scores, and detailed solutions.
                </p>
              </div>
            </div>

            {examHistory.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <Trophy className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  No Past Exam History Yet
                </h3>
                <p className="text-xs max-w-sm mx-auto text-slate-500">
                  Take any uploaded exam test and submit it to track your performance here.
                </p>
                <button
                  type="button"
                  onClick={() => setExamMode('uploaded')}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Browse Uploaded Exams
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {examHistory.map((record) => {
                  const mins = Math.floor(record.timeSpentSeconds / 60);
                  const secs = record.timeSpentSeconds % 60;
                  const isHighScore = record.scorePercentage >= 75;
                  const isMidScore = record.scorePercentage >= 50 && record.scorePercentage < 75;

                  return (
                    <div
                      key={record.id}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 transition space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                              {record.title}
                            </span>
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {record.date}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>{record.totalQuestions} Questions</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {mins}m {secs}s duration
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className={`px-3 py-1.5 rounded-xl font-black text-sm sm:text-base border flex items-center gap-1.5 ${
                              isHighScore
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                                : isMidScore
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300'
                                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300'
                            }`}
                          >
                            <Trophy className="w-4 h-4" />
                            <span>{record.scorePercentage}%</span>
                            <span className="text-[11px] font-normal opacity-80">
                              ({record.correctCount}/{record.totalQuestions})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {record.subjectBreakdown &&
                          Object.entries(record.subjectBreakdown).map(([subj, rawStats]) => {
                            const stats = rawStats as { total: number; correct: number } | undefined;
                            if (!stats || stats.total === 0) return null;
                            const sPct = Math.round((stats.correct / stats.total) * 100);
                            const subjLabel = getSubjectDisplayName(subj);
                            return (
                              <span
                                key={subj}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                              >
                                <strong>{subjLabel}:</strong> {stats.correct}/{stats.total} ({sPct}%)
                              </span>
                            );
                          })}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleReviewPastExam(record)}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Review Questions & Solutions
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const mins = useTimer
                                ? Math.max(5, Math.round(record.questions.length * 1.5))
                                : 0;
                              setExamTitle(`Retake: ${record.title}`);
                              setExamQuestions(record.questions);
                              setDurationMinutes(mins);
                              setTimeLeftSeconds(mins * 60);
                              examStartTimeRef.current = Date.now();
                              setUserAnswers({});
                              setFlaggedIds({});
                              setCurrentIndex(0);
                              setExamStarted(true);
                              setExamCompleted(false);
                              setExamResult(null);
                            }}
                            className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                          </button>
                        </div>

                        {onDeleteExamRecord && (
                          <button
                            type="button"
                            onClick={() => onDeleteExamRecord(record.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Exam Sheet Image Fullscreen Modal */}
        {inspectedSheet && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-2">
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {inspectedSheet.title} ({getSubjectDisplayName(inspectedSheet.subject)} ·{' '}
                  {inspectedSheet.examType.toUpperCase()})
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedSheet(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-slate-950 flex flex-col items-center gap-3">
                <img
                  src={inspectedSheet.imageDataUrl}
                  alt={inspectedSheet.title}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
                {inspectedSheet.explanation && (
                  <div className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 overflow-x-auto">
                    <strong className="block text-emerald-400 mb-1">Instructions / Answer Key:</strong>
                    <MathRenderer text={inspectedSheet.explanation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Exam In-Progress Screen
  if (examStarted && !examCompleted) {
    const currentQ = examQuestions[currentIndex];
    const isFlagged = Boolean(flaggedIds[currentQ?.id]);
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="space-y-4">
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => {
                setExamStarted(false);
                setExamCompleted(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
            >
              Exit
            </button>
            <span className="font-extrabold text-sm text-blue-400 truncate max-w-[180px] sm:max-w-md">
              {examTitle}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Answered: <strong className="text-white">{answeredCount}</strong> / {examQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 border ${
                durationMinutes > 0 && timeLeftSeconds < 300
                  ? 'bg-rose-950 text-rose-300 border-rose-700 animate-pulse'
                  : 'bg-slate-800 text-amber-300 border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{durationMinutes > 0 ? formatTime(timeLeftSeconds) : 'Untimed'}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmitExam}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  {currentQ?.subject ? getSubjectDisplayName(currentQ.subject) : ''}
                </span>
                <span className="text-xs text-slate-500 font-medium truncate max-w-[180px] sm:max-w-none">
                  {currentQ?.topic}
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleFlag}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed overflow-x-auto">
              <span className="text-blue-600 mr-2 font-bold">Q{currentIndex + 1}.</span>
              <MathRenderer text={currentQ?.question || ''} />
            </div>

            {currentQ?.imageDataUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 p-2">
                <img
                  src={currentQ.imageDataUrl}
                  alt="Question illustration"
                  className="max-h-72 mx-auto object-contain rounded-lg"
                />
              </div>
            )}

            <div className="space-y-2.5">
              {currentQ?.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    id={`mock-opt-${idx}`}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition flex items-center justify-between text-xs sm:text-base gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-semibold ring-2 ring-blue-400/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex-1 min-w-0 overflow-x-auto">
                      <MathRenderer text={opt} />
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>

              <span className="text-xs text-slate-500 font-medium">
                {currentIndex + 1} of {examQuestions.length}
              </span>

              <button
                type="button"
                onClick={() => setCurrentIndex(Math.min(examQuestions.length - 1, currentIndex + 1))}
                disabled={currentIndex === examQuestions.length - 1}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Question Navigator
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Flagged
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 inline-block" /> Unanswered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-blue-500 inline-block" /> Current
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[300px] overflow-y-auto p-0.5">
              {examQuestions.map((q, idx) => {
                const ans = userAnswers[q.id] !== undefined;
                const flg = Boolean(flaggedIds[q.id]);
                const isCur = currentIndex === idx;

                let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (flg) {
                  btnBg = 'bg-amber-400 text-slate-900 font-bold';
                } else if (ans) {
                  btnBg = 'bg-blue-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${btnBg} ${
                      isCur ? 'ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleSubmitExam}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition text-center cursor-pointer"
              >
                End & Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Post-Exam Result & Review Screen
  if (examCompleted && examResult) {
    const minutesSpent = Math.floor(examResult.timeSpentSeconds / 60);
    const secondsSpent = examResult.timeSpentSeconds % 60;

    const filteredReportQuestions = examQuestions.filter((q) => {
      const rep = examResult.answers.find((a) => a.questionId === q.id);
      if (reviewFilter === 'incorrect') return rep && !rep.isCorrect;
      if (reviewFilter === 'flagged') return Boolean(flaggedIds[q.id]);
      return true;
    });

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white border border-blue-800/40 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-800/60 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {examTitle} • Performance Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Score: {examResult.scorePercentage}%
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                {examResult.scorePercentage >= 75
                  ? 'Outstanding! Strong mastery on this exam.'
                  : examResult.scorePercentage >= 50
                  ? 'Good progress! Review the missed questions below to boost your score.'
                  : 'Keep practicing! Study the solution breakdowns and check your Mistakes Notebook.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setExamStarted(false);
                  setExamCompleted(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Back to Uploaded Exams
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Score & Accuracy</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {examResult.correctCount} / {examResult.totalQuestions}
              </div>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Time Taken</div>
              <div className="text-xl font-bold text-blue-300 mt-1">
                {minutesSpent}m {secondsSpent}s
              </div>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Average Pace</div>
              <div className="text-xl font-bold text-amber-300 mt-1">
                {Math.round(examResult.timeSpentSeconds / (examResult.totalQuestions || 1))}s / Question
              </div>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Saved to Mistakes</div>
              <div className="text-xl font-bold text-rose-300 mt-1">
                {examResult.totalQuestions - examResult.correctCount} Questions
              </div>
            </div>
          </div>
        </div>

        {/* Subject-Wise Performance Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Subject-Wise Score Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(
              Object.entries(examResult.subjectBreakdown) as [
                string,
                { total: number; correct: number }
              ][]
            ).map(([subj, stats]) => {
              if (stats.total === 0) return null;
              const subjPct = Math.round((stats.correct / stats.total) * 100);
              const subjLabel = getSubjectDisplayName(subj);
              return (
                <div
                  key={subj}
                  className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 gap-1">
                    <span className="truncate">{subjLabel}</span>
                    <span
                      className={
                        subjPct >= 70
                          ? 'text-emerald-600 dark:text-emerald-400 shrink-0'
                          : 'text-amber-600 shrink-0'
                      }
                    >
                      {subjPct}%
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {stats.correct} of {stats.total} correct
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        subjPct >= 70
                          ? 'bg-emerald-500'
                          : subjPct >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${subjPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Review Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Answer Review & Solutions ({filteredReportQuestions.length} Questions)
            </h3>

            <div className="flex items-center gap-1.5">
              {(['all', 'incorrect', 'flagged'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                    reviewFilter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {f === 'incorrect' ? 'Wrong Only' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredReportQuestions.map((q) => {
              const rep = examResult.answers.find((a) => a.questionId === q.id);
              const userPick = rep?.userSelected;
              const isCorrect = rep?.isCorrect;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-5 space-y-4 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20'
                      : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {getSubjectDisplayName(q.subject)}
                      </span>
                      <span className="text-xs text-slate-500">{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct (+1)
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base overflow-x-auto">
                    <MathRenderer text={q.question} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = userPick === oIdx;
                      const isAnswer = q.correctAnswer === oIdx;

                      let badgeClass =
                        'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                      if (isAnswer) {
                        badgeClass =
                          'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isChosen && !isAnswer) {
                        badgeClass =
                          'border-rose-500 bg-rose-100/60 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${badgeClass}`}
                        >
                          <span className="flex-1 min-w-0 overflow-x-auto">
                            <MathRenderer text={opt} />
                          </span>
                          {isAnswer && (
                            <span className="text-[10px] font-bold uppercase bg-emerald-600 text-white px-1.5 py-0.5 rounded shrink-0">
                              Correct
                            </span>
                          )}
                          {isChosen && !isAnswer && (
                            <span className="text-[10px] font-bold uppercase bg-rose-600 text-white px-1.5 py-0.5 rounded shrink-0">
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="bg-slate-50 dark:bg-slate-800/90 rounded-lg p-3.5 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                      <strong className="block text-slate-900 dark:text-white mb-1 font-bold">
                        Solution Breakdown:
                      </strong>
                      <MathRenderer text={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
