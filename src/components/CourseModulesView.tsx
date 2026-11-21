import React, { useState, useEffect } from 'react';
import { FRESHMAN_COURSES, ALL_FRESHMAN_CHAPTERS } from '../data/freshmanModules';
import { OFFICIAL_17_FRESHMAN_COURSES } from '../data/freshmanCourseCatalog';
import { getAmharicChapterNote, getAmharicSubjectMeta } from '../data/amharicNotes';
import {
  buildFullAmharicTranslatedSections,
  polishAmharicChapterNote,
  polishMixedAmharicText,
} from '../utils/amharicNoteExpander';
import {
  MasterNoteChapter,
  Subject,
  UserStudyNote,
  CustomCourseOutline,
} from '../types';
import { isFreeCourseSubject } from '../utils/authPaymentService';
import { MathRenderer } from './MathRenderer';
import { StudentNotesView } from './StudentNotesView';
import { PublishedPdfsView } from './PublishedPdfsView';
import {
  BookOpen,
  Search,
  Calculator,
  Compass,
  FlaskConical,
  Brain,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Bookmark,
  BookmarkCheck,
  FileText,
  Lightbulb,
  Maximize2,
  Minimize2,
  GraduationCap,
  Edit3,
  Library,
  Plus,
  Dna,
  Scale,
  Activity,
  Compass as Globe,
  Cpu,
  Layers,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Languages,
} from 'lucide-react';

interface CourseModulesViewProps {
  initialSubject?: Subject | 'all';
  userNotes?: UserStudyNote[];
  onSaveNote?: (note: UserStudyNote) => void;
  onDeleteNote?: (id: string) => void;
  savedQuestionsCount?: number;
  examHistoryCount?: number;
  onDataRestored?: () => void;
  customOutlines?: Record<string, CustomCourseOutline>;
  onOpenSyllabusModal?: (courseId?: string) => void;
  onDeleteCustomOutline?: (courseIdOrId: string) => void;
  isPaidAccessLocked?: boolean;
  onRequirePaidAccess?: (featureName: string) => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
  amharicSubjects?: Record<string, boolean>;
  onToggleAmharicSubject?: (subject: Subject) => void;
}

export const CourseModulesView: React.FC<CourseModulesViewProps> = ({
  initialSubject = 'all',
  userNotes = [],
  onSaveNote,
  onDeleteNote,
  savedQuestionsCount = 0,
  examHistoryCount = 0,
  onDataRestored,
  customOutlines = {},
  onOpenSyllabusModal,
  onDeleteCustomOutline,
  isPaidAccessLocked = false,
  onRequirePaidAccess,
  isAdmin = false,
  onOpenAdminPanel,
  amharicSubjects: externalAmharicSubjects,
  onToggleAmharicSubject: externalToggleAmharicSubject,
}) => {
  const [localAmharicSubjects, setLocalAmharicSubjects] = useState<Record<string, boolean>>({});
  const amharicSubjects = externalAmharicSubjects ?? localAmharicSubjects;
  const handleToggleAmharic = (subj: Subject) => {
    if (!subj || subj === 'all') return;
    if (externalToggleAmharicSubject) {
      externalToggleAmharicSubject(subj);
      return;
    }
    setLocalAmharicSubjects((prev) => ({ ...prev, [subj]: !prev[subj] }));
  };
  const [notesSubTab, setNotesSubTab] = useState<'modules' | 'pdfs' | 'outlines' | 'personal'>('modules');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(() =>
    isPaidAccessLocked ? 'anthropology' : initialSubject || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    const anthChapter = ALL_FRESHMAN_CHAPTERS.find((c) => c.subject === 'anthropology');
    return (isPaidAccessLocked && anthChapter ? anthChapter.id : ALL_FRESHMAN_CHAPTERS[0]?.id) || '';
  });

  useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedSubject('anthropology');
      const anthChapter = ALL_FRESHMAN_CHAPTERS.find((c) => c.subject === 'anthropology');
      if (anthChapter) setSelectedChapterId(anthChapter.id);
    } else if (initialSubject) {
      setSelectedSubject(initialSubject);
      const firstMatch = ALL_FRESHMAN_CHAPTERS.find(
        (c) => initialSubject === 'all' || c.subject === initialSubject
      );
      if (firstMatch) setSelectedChapterId(firstMatch.id);
    }
  }, [isPaidAccessLocked, initialSubject]);

  const handleSelectCourseSubject = (subj: Subject) => {
    if (isPaidAccessLocked && subj !== 'all' && !isFreeCourseSubject(subj)) {
      onRequirePaidAccess?.(`Course Modules & Notes (${String(subj).toUpperCase()})`);
      return;
    }
    setSelectedSubject(subj);
    const firstMatch = allCombinedChapters.find((c) => subj === 'all' || c.subject === subj);
    if (firstMatch) {
      setSelectedChapterId(firstMatch.id);
    }
  };

  const [confirmDeleteOutlineId, setConfirmDeleteOutlineId] = useState<string | null>(null);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('freshman_completed_chapters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedEqId, setCopiedEqId] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const allCourses = FRESHMAN_COURSES;
  const allCombinedChapters: MasterNoteChapter[] = ALL_FRESHMAN_CHAPTERS;

  const mergedCourseOutlines: CustomCourseOutline[] = [
    ...OFFICIAL_17_FRESHMAN_COURSES.map((course) => {
      const saved = customOutlines?.[course.id];
      if (saved) return saved;
      return {
        id: `official-outline-${course.id}`,
        courseId: course.id,
        courseCode: course.code,
        courseTitle: course.title,
        subject: course.subject,
        semester: course.semester,
        syllabusOverview: course.overview,
        gradingPolicy: `Midterm: ${course.midtermWeight || '30%'}, Continuous Assessment: 20%, Final Exam: ${course.finalWeight || '50%'}`,
        chapters: course.defaultChapters,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
    }),
    ...(Object.values(customOutlines || {}) as CustomCourseOutline[]).filter(
      (o) => !OFFICIAL_17_FRESHMAN_COURSES.some((c) => c.id === o.courseId)
    ),
  ];

  const filteredCourseOutlines = mergedCourseOutlines.filter(
    (o) => selectedSubject === 'all' || o.subject === selectedSubject
  );

  const availableChapters = allCombinedChapters.filter((ch) => {
    const matchSubject = selectedSubject === 'all' || ch.subject === selectedSubject;
    const q = searchQuery.toLowerCase();
    const amNote = getAmharicChapterNote(ch.id, ch.subject, ch.chapterNumber, ch.title, ch.overview);
    const matchQuery =
      !q ||
      (ch.title || '').toLowerCase().includes(q) ||
      (ch.moduleName || '').toLowerCase().includes(q) ||
      (ch.overview || '').toLowerCase().includes(q) ||
      amNote.titleAm.toLowerCase().includes(q) ||
      amNote.briefOverviewAm.toLowerCase().includes(q) ||
      (amNote.expandedOverviewAm || '').toLowerCase().includes(q) ||
      amNote.briefPointsAm.some((pt) => pt.toLowerCase().includes(q)) ||
      (amNote.sectionsAm || []).some(
        (s) =>
          s.headingAm.toLowerCase().includes(q) ||
          s.contentAm.toLowerCase().includes(q)
      ) ||
      (amNote.glossaryAm || []).some(
        (g) =>
          g.termEn.toLowerCase().includes(q) ||
          g.termAm.toLowerCase().includes(q) ||
          g.definitionAm.toLowerCase().includes(q)
      ) ||
      (ch.sections || []).some(
        (s) =>
          (s.heading || '').toLowerCase().includes(q) ||
          (s.content || '').toLowerCase().includes(q) ||
          (s.keyTakeaways || []).some((k) => (k || '').toLowerCase().includes(q))
      );
    return matchSubject && matchQuery;
  });

  const activeChapter =
    availableChapters.find((ch) => ch.id === selectedChapterId) ||
    availableChapters[0] ||
    allCombinedChapters[0];

  const activeChapterIdx = availableChapters.findIndex((ch) => ch.id === activeChapter?.id);

  const handlePrevChapter = () => {
    if (activeChapterIdx > 0) {
      setSelectedChapterId(availableChapters[activeChapterIdx - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (activeChapterIdx >= 0 && activeChapterIdx < availableChapters.length - 1) {
      setSelectedChapterId(availableChapters[activeChapterIdx + 1].id);
    }
  };

  const toggleChapterCompleted = (id: string) => {
    setCompletedChapters((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('freshman_completed_chapters', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleCopyEquation = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedEqId(id);
    setTimeout(() => setCopiedEqId(null), 2000);
  };

  const getSubjectIcon = (subj: Subject) => {
    switch (subj) {
      case 'mathematics':
      case 'math_applied_2':
        return <Calculator className="w-4 h-4 text-blue-400" />;
      case 'physics':
      case 'physics_2':
        return <Compass className="w-4 h-4 text-cyan-400" />;
      case 'chemistry':
      case 'chemistry_2':
        return <FlaskConical className="w-4 h-4 text-emerald-400" />;
      case 'biology':
      case 'biology_2':
        return <Dna className="w-4 h-4 text-teal-400" />;
      case 'english':
      case 'english_2':
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'critical_thinking':
        return <Brain className="w-4 h-4 text-amber-400" />;
      case 'civics':
        return <Scale className="w-4 h-4 text-purple-400" />;
      case 'fitness':
        return <Activity className="w-4 h-4 text-rose-400" />;
      case 'psychology':
        return <Brain className="w-4 h-4 text-rose-300" />;
      case 'geography':
      case 'geography_history':
        return <Globe className="w-4 h-4 text-amber-500" />;
      case 'history':
        return <Globe className="w-4 h-4 text-orange-400" />;
      case 'emerging_tech':
        return <Cpu className="w-4 h-4 text-sky-400" />;
      default:
        return <GraduationCap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className={`space-y-4 ${isFocusMode ? 'max-w-5xl mx-auto' : ''}`}>
      {/* Simple, Student-Friendly Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1.5 flex items-center justify-between gap-1.5 shadow-sm">
        <div className="flex flex-1 flex-nowrap items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 touch-pan-x">
          <button
            id="modules-tab-btn"
            type="button"
            onClick={() => setNotesSubTab('modules')}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 sm:shrink sm:flex-1 ${
              notesSubTab === 'modules'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Library className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Course Notes</span>
          </button>

          <button
            id="personal-notes-tab-btn"
            type="button"
            onClick={() => setNotesSubTab('personal')}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 sm:shrink sm:flex-1 ${
              notesSubTab === 'personal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-300 shrink-0" />
            <span>My Notes <span className="text-xs opacity-75">({userNotes.length})</span></span>
          </button>

          <button
            id="course-outlines-tab-btn"
            type="button"
            onClick={() => setNotesSubTab('outlines')}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 sm:shrink sm:flex-1 ${
              notesSubTab === 'outlines'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-300 shrink-0" />
            <span>Outlines</span>
          </button>
        </div>
      </div>

      {notesSubTab === 'pdfs' ? (
        <PublishedPdfsView
          isAdmin={isAdmin}
          onOpenAdminPanel={onOpenAdminPanel}
          initialSubject={selectedSubject}
          isPaidAccessLocked={isPaidAccessLocked}
          onRequirePaidAccess={onRequirePaidAccess}
        />
      ) : notesSubTab === 'personal' ? (
        <StudentNotesView
          userNotes={userNotes}
          onSaveNote={onSaveNote || (() => {})}
          onDeleteNote={onDeleteNote || (() => {})}
          savedQuestionsCount={savedQuestionsCount}
          examHistoryCount={examHistoryCount}
          onDataRestored={onDataRestored}
        />
      ) : notesSubTab === 'outlines' ? (
        <div className="space-y-4">
          {/* Compact Top Bar for Course Outlines */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => handleSelectCourseSubject(e.target.value as Subject)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Subjects ({mergedCourseOutlines.length})</option>
                {allCourses.map((course) => (
                  <option key={course.id} value={course.subject}>
                    {course.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            {onOpenSyllabusModal && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenSyllabusModal('__new_custom__')}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Outline</span>
                </button>
              </div>
            )}
          </div>

          {filteredCourseOutlines.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
              <Layers className="w-10 h-10 text-blue-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No Course Outlines Found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredCourseOutlines.map((outline) => {
                const isOutlineAmharic = Boolean(amharicSubjects[outline.subject]);
                const outlineAmMeta = getAmharicSubjectMeta(outline.subject);
                return (
                  <div
                    key={outline.courseId || outline.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span className="font-bold text-blue-400">{outline.courseCode}</span>
                          <span>·</span>
                          <span>
                            {outline.chapters?.length || 0}{' '}
                            {isOutlineAmharic ? 'ምዕራፎች' : 'Chapters'}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {isOutlineAmharic && outlineAmMeta
                            ? outlineAmMeta.nameAm
                            : outline.courseTitle}
                        </h3>
                        {isOutlineAmharic && outlineAmMeta && (
                          <p className="text-xs text-emerald-200/90 max-w-2xl">
                            {outlineAmMeta.overviewAm}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleAmharic(outline.subject)}
                          aria-pressed={isOutlineAmharic}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                            isOutlineAmharic
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border-slate-700'
                          }`}
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>AMM</span>
                        </button>

                        {onOpenSyllabusModal && (
                          <button
                            type="button"
                            onClick={() => onOpenSyllabusModal(outline.courseId)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Edit</span>
                          </button>
                        )}

                        {onDeleteCustomOutline &&
                          (confirmDeleteOutlineId === outline.courseId ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  onDeleteCustomOutline(outline.courseId);
                                  setConfirmDeleteOutlineId(null);
                                }}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteOutlineId(null)}
                                className="px-2.5 py-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteOutlineId(outline.courseId)}
                              className="px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Chapters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {(outline.chapters || []).map((ch) => {
                        const chAm = isOutlineAmharic
                          ? getAmharicChapterNote(undefined, outline.subject, ch.chapterNumber, ch.title)
                          : null;
                        return (
                          <div
                            key={ch.id || ch.chapterNumber}
                            className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2"
                          >
                            <div>
                              <div className="text-xs font-bold text-white">
                                {isOutlineAmharic && chAm
                                  ? chAm.titleAm
                                  : `Chapter ${ch.chapterNumber}: ${ch.title}`}
                              </div>
                              {isOutlineAmharic && chAm ? (
                                <p className="mt-1 text-xs text-emerald-200/85 leading-relaxed">
                                  {chAm.expandedOverviewAm || chAm.briefOverviewAm}
                                </p>
                              ) : (
                                <ul className="mt-1 space-y-0.5 pl-4">
                                  {(ch.topics || []).slice(0, 4).map((t, tIdx) => (
                                    <li key={tIdx} className="text-xs text-slate-300 list-disc">
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Student-Friendly Navigation: 1. Subject Selector Bar, 2. Chapter & Search Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 sm:p-3.5 space-y-2.5 shadow-sm">
            {/* 1. Quick Subject Switcher (1-Tap Horizontal Carousel) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar touch-pan-x">
              <button
                type="button"
                onClick={() => handleSelectCourseSubject('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border cursor-pointer shrink-0 ${
                  selectedSubject === 'all'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                All Courses ({ALL_FRESHMAN_CHAPTERS.length})
              </button>
              {allCourses.map((course) => {
                const isSelected = selectedSubject === course.subject;
                const isFreeCourse = isFreeCourseSubject(course.subject);
                const isSubjAm = Boolean(amharicSubjects[course.subject]);
                const amMeta = getAmharicSubjectMeta(course.subject);
                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => handleSelectCourseSubject(course.subject)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {getSubjectIcon(course.subject)}
                    <span>{isSubjAm && amMeta ? amMeta.shortNameAm : course.shortTitle}</span>
                    {isSubjAm && (
                      <span className="text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-500/40">
                        AMM
                      </span>
                    )}
                    {isFreeCourse && isPaidAccessLocked && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded">FREE</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 2. Chapter Selector, Amharic Mode Toggle & Search */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
              {/* Direct Chapter Jump Dropdown */}
              <div className="flex-1 min-w-[180px]">
                <select
                  value={activeChapter?.id || ''}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 truncate cursor-pointer"
                  aria-label="Select Chapter to Study"
                >
                  {availableChapters.map((ch, idx) => {
                    const isChAm = Boolean(amharicSubjects[ch.subject]);
                    const chAm = isChAm
                      ? getAmharicChapterNote(ch.id, ch.subject, ch.chapterNumber, ch.title)
                      : null;
                    return (
                      <option key={ch.id} value={ch.id}>
                        {idx + 1}. {ch.courseCode}:{' '}
                        {isChAm && chAm ? polishMixedAmharicText(chAm.titleAm) : ch.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Per-Subject Amharic Mode Toggle */}
              {activeChapter && (
                <button
                  type="button"
                  id="notes-amharic-mode-toggle"
                  onClick={() => handleToggleAmharic(activeChapter.subject)}
                  aria-pressed={Boolean(amharicSubjects[activeChapter.subject])}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                    amharicSubjects[activeChapter.subject]
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-sm'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                  }`}
                  title="Switch notes of this subject between English and Amharic"
                >
                  <Languages className="w-3.5 h-3.5 shrink-0" />
                  <span>AMM</span>
                </button>
              )}

              {/* Quick Search in Notes */}
              <div className="relative w-full sm:w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in notes..."
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Focus Reading Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                  isFocusMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
                title={isFocusMode ? 'Exit Full Screen Reading' : 'Full Screen Reading Mode'}
              >
                {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Chapter Split View: On Mobile, Reader is Shown First so Students Don't Scroll Past 18 Cards! */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Desktop Left Sidebar: Chapters List */}
            <div className={`${isFocusMode ? 'hidden' : 'hidden lg:block'} lg:col-span-4 space-y-3`}>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
                <div className="text-xs font-bold text-slate-400 mb-2.5 flex items-center justify-between">
                  <span>
                    {activeChapter && amharicSubjects[activeChapter.subject]
                      ? 'የምዕራፎች ዝርዝር'
                      : 'Chapters List'}
                  </span>
                  <span className="text-blue-400">
                    {availableChapters.length}{' '}
                    {activeChapter && amharicSubjects[activeChapter.subject] ? 'ምዕራፎች' : 'Chapters'}
                  </span>
                </div>

                <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                  {availableChapters.map((chapter) => {
                    const isSelected = activeChapter?.id === chapter.id;
                    const isDone = Boolean(completedChapters[chapter.id]);
                    const isChAm = Boolean(amharicSubjects[chapter.subject]);
                    const chAm = isChAm
                      ? getAmharicChapterNote(chapter.id, chapter.subject, chapter.chapterNumber, chapter.title)
                      : null;
                    const chAmTitle = chAm ? polishMixedAmharicText(chAm.titleAm) : '';

                    return (
                      <div
                        key={chapter.id}
                        onClick={() => setSelectedChapterId(chapter.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition text-left flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="font-bold text-blue-400">{chapter.courseCode}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />{' '}
                              {isChAm
                                ? `${Math.max(chapter.estimatedReadTimeMinutes + 5, 15)} ደቂቃ`
                                : `${chapter.estimatedReadTimeMinutes}m`}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {isChAm && chAmTitle ? chAmTitle : chapter.title}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChapterCompleted(chapter.id);
                          }}
                          className={`p-1 rounded-lg transition shrink-0 ${
                            isDone ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title={isDone ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          {isDone ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content: Active Chapter Reader */}
            <div className={`${isFocusMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-5`}>
              {activeChapter ? (() => {
                const isActiveAmharic = Boolean(amharicSubjects[activeChapter.subject]);
                const rawActiveAmNote = isActiveAmharic
                  ? getAmharicChapterNote(
                      activeChapter.id,
                      activeChapter.subject,
                      activeChapter.chapterNumber,
                      activeChapter.title,
                      activeChapter.overview
                    )
                  : null;
                const activeAmNote = rawActiveAmNote
                  ? polishAmharicChapterNote(rawActiveAmNote)
                  : null;
                const activeAmSubjMeta = getAmharicSubjectMeta(activeChapter.subject);
                const translatedChapter = isActiveAmharic
                  ? buildFullAmharicTranslatedSections(activeChapter)
                  : null;
                const chapterEquationsAm = translatedChapter
                  ? translatedChapter.sections.flatMap((sec) => sec.equations)
                  : [];

                return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
                  {/* Chapter Header + 1-Tap Actions */}
                  <div className="space-y-3 pb-4 border-b border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        {getSubjectIcon(activeChapter.subject)}
                        <span className="font-bold text-blue-400">{activeChapter.courseCode}</span>
                        <span>·</span>
                        <span>
                          {isActiveAmharic && activeAmSubjMeta
                            ? activeAmSubjMeta.shortNameAm
                            : activeChapter.moduleName}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleAmharic(activeChapter.subject)}
                          aria-pressed={isActiveAmharic}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                            isActiveAmharic
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border-slate-700'
                          }`}
                          title="Toggle Amharic Mode"
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>AMM</span>
                        </button>

                        <button
                          type="button"
                          onClick={handlePrevChapter}
                          disabled={activeChapterIdx <= 0}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>{isActiveAmharic ? 'ቀዳሚ' : 'Prev'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextChapter}
                          disabled={
                            activeChapterIdx < 0 ||
                            activeChapterIdx >= availableChapters.length - 1
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isActiveAmharic ? 'ቀጣይ' : 'Next'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleChapterCompleted(activeChapter.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                            completedChapters[activeChapter.id]
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                          }`}
                        >
                          {completedChapters[activeChapter.id] ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{isActiveAmharic ? 'ተጠናቋል' : 'Done'}</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{isActiveAmharic ? 'ተነቧል' : 'Mark Read'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {isActiveAmharic && activeAmNote ? (
                      <div className="space-y-3 pt-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                            <Languages className="w-3.5 h-3.5" />
                            <span>ሙሉ እና ሰፊ የአማርኛ መማሪያ</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold">
                            <Clock className="w-3 h-3 text-emerald-400" />
                            <span>
                              {Math.max(activeChapter.estimatedReadTimeMinutes + 5, 15)} ደቂቃ ጥልቅ ንባብ
                            </span>
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                          {activeAmNote.titleAm}
                        </h2>
                        <div className="bg-slate-950/80 border border-emerald-900/50 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
                          <div className="text-xs font-bold text-emerald-400">
                            የምዕራፉ ሙሉ መግቢያ እና ትኩረት
                          </div>
                          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed">
                            <MathRenderer
                              text={activeAmNote.expandedOverviewAm || activeAmNote.briefOverviewAm}
                            />
                          </div>
                          {translatedChapter?.overviewAm && (
                            <div className="pt-2.5 border-t border-emerald-900/40 text-xs sm:text-sm text-slate-300 leading-relaxed">
                              <div className="text-[11px] font-bold text-blue-300 mb-1">
                                የዋናው ምዕራፍ ዝርዝር መግቢያ (ከእንግሊዝኛው ሙሉ ማስታወሻ የተተረጎመ)
                              </div>
                              <MathRenderer text={translatedChapter.overviewAm} />
                            </div>
                          )}
                        </div>

                        {activeAmNote.learningOutcomesAm && activeAmNote.learningOutcomesAm.length > 0 && (
                          <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 space-y-2">
                            <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-blue-400" />
                              <span>የመማር ግቦች</span>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {activeAmNote.learningOutcomesAm.map((outcome, oIdx) => (
                                <li
                                  key={oIdx}
                                  className="text-xs text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2"
                                >
                                  <span className="text-blue-400 font-bold shrink-0">✓</span>
                                  <div className="flex-1 min-w-0">
                                    <MathRenderer text={outcome} />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                          {activeChapter.title}
                        </h2>
                        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <MathRenderer text={activeChapter.overview} />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Chapter Content: Comprehensive Expanded Amharic Textbook OR English Textbook Sections */}
                  {isActiveAmharic && activeAmNote ? (
                    <div className="space-y-6">
                      {/* 1. Deep Amharic Textbook Sections */}
                      {activeAmNote.sectionsAm && activeAmNote.sectionsAm.length > 0 && (
                        <div className="space-y-5">
                          {activeAmNote.sectionsAm.map((amSec, sIdx) => (
                            <div
                              key={sIdx}
                              className="bg-slate-950/75 border border-emerald-900/40 rounded-xl p-4 sm:p-5 space-y-3"
                            >
                              <h3 className="text-base sm:text-lg font-bold text-emerald-300 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 shrink-0 text-emerald-400" />
                                <span>{amSec.headingAm}</span>
                              </h3>
                              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed">
                                <MathRenderer text={amSec.contentAm} />
                              </div>
                              {amSec.keyPointsAm && amSec.keyPointsAm.length > 0 && (
                                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                                  <div className="text-[11px] font-bold text-blue-300">
                                    የክፍሉ ዋና ነጥቦች
                                  </div>
                                  <ul className="space-y-1">
                                    {amSec.keyPointsAm.map((kp, kIdx) => (
                                      <li
                                        key={kIdx}
                                        className="text-xs text-slate-300 flex items-start gap-2"
                                      >
                                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                                        <div className="flex-1 min-w-0">
                                          <MathRenderer text={kp} />
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 1b. Full Translated Textbook Sections from Built English Notes */}
                      {translatedChapter && translatedChapter.sections.length > 0 && (
                        <div className="space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-950/35 border border-emerald-800/50">
                            <div className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-2">
                              <Library className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>
                                ሙሉ የምዕራፉ የመማሪያ ክፍሎች በአማርኛ — ከእንግሊዝኛው ሙሉ ማስታወሻ የተተረጎመ ({translatedChapter.sections.length} ክፍሎች)
                              </span>
                            </div>
                          </div>

                          {translatedChapter.sections.map((trSec, trIdx) => (
                            <div
                              key={trSec.id || trIdx}
                              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4"
                            >
                              <h3 className="text-base sm:text-lg font-bold text-blue-300 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
                                <span>{trSec.headingAm}</span>
                              </h3>

                              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto">
                                <MathRenderer text={trSec.contentAm} />
                              </div>

                              {trSec.equations.length > 0 && (
                                <div className="bg-slate-900/90 border border-blue-900/40 rounded-xl p-3.5 space-y-2.5">
                                  <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5" /> የክፍሉ ቁልፍ ቀመሮች እና ሕጎች
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {trSec.equations.map((eq, eqIdx) => (
                                      <div
                                        key={eqIdx}
                                        className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="text-xs font-semibold text-slate-200">
                                            <MathRenderer text={eq.nameAm} />
                                          </div>
                                          <div className="text-sm text-cyan-300 my-1.5 p-2 rounded bg-slate-900 border border-slate-800/80 overflow-x-auto text-center">
                                            <MathRenderer latex={eq.formula} displayMode={true} />
                                          </div>
                                          {eq.explanationAm && (
                                            <div className="text-[11px] text-slate-400">
                                              <MathRenderer text={eq.explanationAm} />
                                            </div>
                                          )}
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCopyEquation(eq.formula, `tr-${trSec.id}-${eqIdx}`)
                                          }
                                          className="p-1.5 self-end sm:self-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                                          title="Copy Formula"
                                        >
                                          {copiedEqId === `tr-${trSec.id}-${eqIdx}` ? (
                                            <Check className="w-4 h-4 text-emerald-400" />
                                          ) : (
                                            <Copy className="w-4 h-4" />
                                          )}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {trSec.workedExamples.length > 0 && (
                                <div className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-3.5 space-y-3">
                                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5" /> የተሰሩ የፈተና ምሳሌዎች (ሙሉ መፍትሔ)
                                  </div>
                                  {trSec.workedExamples.map((ex, exIdx) => (
                                    <div key={exIdx} className="space-y-2">
                                      <div className="text-xs sm:text-sm font-bold text-white bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto">
                                        <MathRenderer text={ex.problemAm} />
                                      </div>
                                      <div className="space-y-1.5 pl-3">
                                        {ex.stepsAm.map((step, stIdx) => (
                                          <div
                                            key={stIdx}
                                            className="text-xs text-slate-300 leading-relaxed overflow-x-auto"
                                          >
                                            <MathRenderer text={step} />
                                          </div>
                                        ))}
                                      </div>
                                      {ex.shortcutTipAm && (
                                        <div className="text-[11px] bg-amber-500/10 text-amber-200 border border-amber-500/30 p-2.5 rounded-lg flex items-start gap-1.5">
                                          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                          <div className="flex-1 min-w-0">
                                            <strong>የፈተና ምክር:</strong>{' '}
                                            <MathRenderer text={ex.shortcutTipAm} />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {trSec.examTraps.length > 0 && (
                                <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3.5 space-y-2">
                                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5" /> የክፍሉ የፈተና ወጥመዶች
                                  </div>
                                  <ul className="space-y-1.5">
                                    {trSec.examTraps.map((trap, tIdx) => (
                                      <li
                                        key={tIdx}
                                        className="text-xs text-rose-200/90 flex items-start gap-2"
                                      >
                                        <span className="text-rose-400 font-bold shrink-0">·</span>
                                        <div className="flex-1 min-w-0">
                                          <MathRenderer text={trap} />
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trSec.keyTakeaways.length > 0 && (
                                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                                  <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> የክፍሉ ዋና መደምደሚያዎች
                                  </div>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {trSec.keyTakeaways.map((tk, tkIdx) => (
                                      <li
                                        key={tkIdx}
                                        className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5"
                                      >
                                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                          <MathRenderer text={tk} />
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 2. Quick Exam Revision Checklist */}
                      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                        <h3 className="text-sm sm:text-base font-bold text-blue-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>ዋና ዋና የፈተና ማጠቃለያ ነጥቦች</span>
                        </h3>
                        <ul className="space-y-2.5">
                          {activeAmNote.briefPointsAm.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                            >
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5 tabular-nums">
                                {pIdx + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <MathRenderer text={point} />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 3. Worked Exam Examples in Amharic */}
                      {activeAmNote.workedExamplesAm && activeAmNote.workedExamplesAm.length > 0 && (
                        <div className="bg-slate-950/80 border border-emerald-900/40 rounded-xl p-4 sm:p-5 space-y-4">
                          <div className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span>የተሰሩ የፈተና ምሳሌዎች</span>
                          </div>
                          {activeAmNote.workedExamplesAm.map((ex, exIdx) => (
                            <div key={exIdx} className="space-y-2.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                              <div className="text-xs sm:text-sm font-bold text-white bg-slate-900 p-3 rounded-lg border border-slate-800">
                                <MathRenderer text={ex.problemAm} />
                              </div>
                              <div className="space-y-1.5 pl-2">
                                {ex.stepsAm.map((step, stIdx) => (
                                  <div key={stIdx} className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                                    <MathRenderer text={step} />
                                  </div>
                                ))}
                              </div>
                              {ex.tipAm && (
                                <div className="text-xs bg-amber-500/10 text-amber-200 border border-amber-500/30 p-2.5 rounded-lg flex items-start gap-1.5">
                                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <MathRenderer text={ex.tipAm} />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 4. All Key Formulas (Unclipped, Translated Labels) */}
                      {chapterEquationsAm.length > 0 && (
                        <div className="bg-slate-950/80 border border-blue-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                          <div className="text-xs sm:text-sm font-bold text-blue-400 flex items-center gap-1.5">
                            <Zap className="w-4 h-4" />
                            <span>ሁሉም ቁልፍ ቀመሮች እና ሕጎች</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2.5">
                            {chapterEquationsAm.map((eq, eqIdx) => (
                              <div
                                key={eqIdx}
                                className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold text-slate-200">
                                    <MathRenderer text={eq.nameAm} />
                                  </div>
                                  <div className="text-sm text-cyan-300 my-1.5 p-2 rounded bg-slate-950 border border-slate-800/80 overflow-x-auto text-center">
                                    <MathRenderer latex={eq.formula} displayMode={true} />
                                  </div>
                                  {eq.explanationAm && (
                                    <div className="text-[11px] text-slate-400">
                                      <MathRenderer text={eq.explanationAm} />
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopyEquation(eq.formula, `am-eq-${eqIdx}`)
                                  }
                                  className="p-1.5 self-end sm:self-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                                  title="Copy Formula"
                                >
                                  {copiedEqId === `am-eq-${eqIdx}` ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Bilingual Key Terms Glossary */}
                      {activeAmNote.glossaryAm && activeAmNote.glossaryAm.length > 0 && (
                        <div className="bg-slate-950/75 border border-indigo-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                          <div className="text-xs sm:text-sm font-bold text-indigo-300 flex items-center gap-1.5">
                            <Languages className="w-4 h-4 text-indigo-400" />
                            <span>ቁልፍ ቃላት እና ትርጓሜ</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {activeAmNote.glossaryAm.map((item, gIdx) => (
                              <div
                                key={gIdx}
                                className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1"
                              >
                                <div className="text-xs font-bold text-white flex flex-wrap items-center gap-1.5">
                                  <span className="text-emerald-300">{item.termAm}</span>
                                  <span className="text-slate-500">·</span>
                                  <span className="text-blue-300">{item.termEn}</span>
                                </div>
                                <div className="text-xs text-slate-300 leading-relaxed">
                                  <MathRenderer text={item.definitionAm} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 6. Exam Tip & Common Exam Traps */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-2.5">
                        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="text-xs font-bold text-amber-300">
                            ዋና የፈተና ምክር
                          </div>
                          <div className="text-xs sm:text-sm text-amber-100/95 leading-relaxed">
                            <MathRenderer text={activeAmNote.examTipAm} />
                          </div>
                        </div>
                      </div>

                      {activeAmNote.examTrapsAm && activeAmNote.examTrapsAm.length > 0 && (
                        <div className="bg-rose-950/25 border border-rose-900/40 rounded-xl p-4 space-y-2">
                          <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" />
                            <span>የተለመዱ የፈተና ወጥመዶች</span>
                          </div>
                          <ul className="space-y-1.5">
                            {activeAmNote.examTrapsAm.map((trap, tIdx) => (
                              <li
                                key={tIdx}
                                className="text-xs sm:text-sm text-rose-200/90 flex items-start gap-2"
                              >
                                <span className="text-rose-400 font-bold shrink-0">!</span>
                                <div className="flex-1 min-w-0">
                                  <MathRenderer text={trap} />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 7. Key Takeaways */}
                      {activeAmNote.keyTakeawaysAm && activeAmNote.keyTakeawaysAm.length > 0 && (
                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>ዋና መደምደሚያዎች</span>
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeAmNote.keyTakeawaysAm.map((tk, tkIdx) => (
                              <li
                                key={tkIdx}
                                className="text-xs text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <MathRenderer text={tk} />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 8. Self-Check Exam Q&A in Amharic */}
                      {activeAmNote.reviewQaAm && activeAmNote.reviewQaAm.length > 0 && (
                        <div className="bg-slate-950/80 border border-teal-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                          <div className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-1.5">
                            <Brain className="w-4 h-4 text-teal-400" />
                            <span>ራስን መፈተኛ ጥያቄና መልስ</span>
                          </div>
                          <div className="space-y-2.5">
                            {activeAmNote.reviewQaAm.map((qa, qIdx) => (
                              <div
                                key={qIdx}
                                className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2"
                              >
                                <div className="text-xs sm:text-sm font-bold text-white">
                                  <MathRenderer text={qa.questionAm} />
                                </div>
                                <div className="text-xs sm:text-sm text-emerald-200 bg-emerald-950/30 border border-emerald-900/40 p-2.5 rounded-lg">
                                  <MathRenderer text={qa.answerAm} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-7">
                      {activeChapter.sections.map((section, sIdx) => (
                        <div key={section.id || sIdx} className="space-y-4">
                          <h3 className="text-base sm:text-lg font-bold text-blue-400 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 shrink-0" />
                            <span>{section.heading}</span>
                          </h3>

                          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <MathRenderer text={section.content} />
                          </div>

                          {/* Governing Equations Box */}
                          {section.equations && section.equations.length > 0 && (
                            <div className="bg-slate-950/80 border border-blue-900/40 rounded-xl p-4 space-y-3">
                              <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" /> Key Formulas & Laws
                              </div>
                              <div className="grid grid-cols-1 gap-2.5">
                                {section.equations.map((eq, eqIdx) => (
                                  <div
                                    key={eqIdx}
                                    className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-semibold text-slate-200">
                                        <MathRenderer text={eq.name} />
                                      </div>
                                      <div className="text-sm text-cyan-300 my-1.5 p-2 rounded bg-slate-950 border border-slate-800/80 overflow-x-auto text-center">
                                        <MathRenderer latex={eq.formula} displayMode={true} />
                                      </div>
                                      <div className="text-[11px] text-slate-400">
                                        <MathRenderer text={eq.explanation} />
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCopyEquation(eq.formula, `${section.id}-${eqIdx}`)
                                      }
                                      className="p-1.5 self-end sm:self-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                                      title="Copy Formula"
                                    >
                                      {copiedEqId === `${section.id}-${eqIdx}` ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Worked Exam Problems */}
                          {section.workedExamples && section.workedExamples.length > 0 && (
                            <div className="bg-slate-950/80 border border-emerald-900/40 rounded-xl p-4 space-y-3">
                              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5" /> Worked Exam Example
                              </div>
                              {section.workedExamples.map((ex, exIdx) => (
                                <div key={exIdx} className="space-y-2.5">
                                  <div className="text-xs sm:text-sm font-bold text-white bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <MathRenderer text={ex.problem} />
                                  </div>
                                  <div className="space-y-1.5 pl-3">
                                    {ex.stepByStepSolution.map((step, stIdx) => (
                                      <div key={stIdx} className="text-xs text-slate-300">
                                        <MathRenderer text={step} />
                                      </div>
                                    ))}
                                  </div>
                                  {ex.shortcutTip && (
                                    <div className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/30 p-2.5 rounded-lg flex items-start gap-1.5">
                                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                      <div>
                                        <strong>Exam Tip:</strong>{' '}
                                        <MathRenderer text={ex.shortcutTip} />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Examiner Traps */}
                          {section.examTraps && section.examTraps.length > 0 && (
                            <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4 space-y-2">
                              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" /> Common Exam Traps
                              </div>
                              <ul className="space-y-1.5">
                                {section.examTraps.map((trap, tIdx) => (
                                  <li
                                    key={tIdx}
                                    className="text-xs text-rose-200/90 flex items-start gap-2"
                                  >
                                    <span className="text-rose-400 font-bold">·</span>
                                    <div>
                                      <MathRenderer text={trap} />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Key Takeaways */}
                          {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                              <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Key Takeaways
                              </div>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {section.keyTakeaways.map((takeaway, tkIdx) => (
                                  <li
                                    key={tkIdx}
                                    className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5"
                                  >
                                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                      <MathRenderer text={takeaway} />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Chapter Navigation Bar */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevChapter}
                      disabled={activeChapterIdx <= 0}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{isActiveAmharic ? 'ቀዳሚ ምዕራፍ' : 'Previous Chapter'}</span>
                    </button>

                    <span className="text-xs text-slate-400 font-medium tabular-nums">
                      {isActiveAmharic
                        ? `ምዕራፍ ${activeChapterIdx + 1} / ${availableChapters.length}`
                        : `Chapter ${activeChapterIdx + 1} of ${availableChapters.length}`}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextChapter}
                      disabled={
                        activeChapterIdx < 0 ||
                        activeChapterIdx >= availableChapters.length - 1
                      }
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isActiveAmharic ? 'ቀጣይ ምዕራፍ' : 'Next Chapter'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                );
              })() : (
                <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
                  <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-white">No matching chapters found</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
