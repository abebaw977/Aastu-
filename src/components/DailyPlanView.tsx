import React, { useState, useRef } from 'react';
import { FRESHMAN_SEMESTER_PLAN } from '../data/freshmanStudyPlan';
import { OFFICIAL_17_FRESHMAN_COURSES, CourseCatalogEntry } from '../data/freshmanCourseCatalog';
import { getAmharicChapterNote, getAmharicSubjectMeta } from '../data/amharicNotes';
import { Subject, CustomCourseOutline } from '../types';
import { NavTab } from './Navbar';
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  GraduationCap,
  BookOpen,
  Library,
  Target,
  CheckSquare,
  Square,
  Calculator,
  Compass,
  FlaskConical,
  Dna,
  Brain,
  Scale,
  Activity,
  Globe,
  Cpu,
  Layers,
  Plus,
  Edit3,
  FileText,
  Lock,
  Search,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Languages,
} from 'lucide-react';

interface DailyPlanViewProps {
  onStartSubjectPractice: (subject: Subject) => void;
  onOpenGuides: (subject: Subject) => void;
  onOpenNotes?: (subject: Subject) => void;
  onOpenFlashcards?: (subject?: Subject) => void;
  onNavigateTab?: (tab: NavTab) => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  customOutlines?: Record<string, CustomCourseOutline>;
  onOpenSyllabusModal?: (courseId?: string) => void;
  isPaidAccessLocked?: boolean;
  onRequirePaidAccess?: (featureName: string) => void;
  amharicSubjects?: Record<string, boolean>;
  onToggleAmharicSubject?: (subject: Subject) => void;
}

export const DailyPlanView: React.FC<DailyPlanViewProps> = ({
  onStartSubjectPractice,
  onOpenGuides,
  onOpenNotes,
  onOpenFlashcards,
  onNavigateTab,
  checkedTasks,
  onToggleTask,
  customOutlines = {},
  onOpenSyllabusModal,
  isPaidAccessLocked = false,
  onRequirePaidAccess,
  amharicSubjects = {},
  onToggleAmharicSubject,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(() =>
    isPaidAccessLocked ? 'anthropology' : OFFICIAL_17_FRESHMAN_COURSES[0].id
  );
  const [subjectSearch, setSubjectSearch] = useState<string>('');
  const [showChecklistAndTips, setShowChecklistAndTips] = useState<boolean>(false);
  const activeHubRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedCourseId('anthropology');
    }
  }, [isPaidAccessLocked]);

  const customOnlyOutlines = (Object.values(customOutlines || {}) as CustomCourseOutline[]).filter(
    (o) => !OFFICIAL_17_FRESHMAN_COURSES.some((c) => c.id === o.courseId)
  );

  const allSubjectEntries: {
    id: string;
    code: string;
    title: string;
    shortTitle: string;
    subject: Subject;
    creditHours: number;
    category: string;
    overview: string;
    keyTopics: string[];
    chapters: {
      chapterNumber: number;
      title: string;
      topics: string[];
      readings?: string;
    }[];
    isCustomOutlineSaved: boolean;
    savedOutline?: CustomCourseOutline;
  }[] = [
    ...OFFICIAL_17_FRESHMAN_COURSES.map((course: CourseCatalogEntry) => {
      const saved = customOutlines[course.id];
      return {
        id: course.id,
        code: saved?.courseCode || course.code,
        title: saved?.courseTitle || course.title,
        shortTitle: saved?.courseTitle || course.shortTitle,
        subject: course.subject,
        creditHours: course.creditHours,
        category: course.category,
        overview: saved?.syllabusOverview || course.overview,
        keyTopics:
          saved && saved.chapters.length > 0
            ? saved.chapters.map((c) => c.title)
            : course.keyTopics,
        chapters:
          saved && saved.chapters.length > 0
            ? saved.chapters.map((c) => ({
                chapterNumber: c.chapterNumber,
                title: c.title,
                topics: c.topics,
                readings: c.readings,
              }))
            : course.defaultChapters,
        isCustomOutlineSaved: Boolean(saved),
        savedOutline: saved,
      };
    }),
    ...customOnlyOutlines.map((co) => ({
      id: co.courseId,
      code: co.courseCode,
      title: co.courseTitle,
      shortTitle: co.courseTitle,
      subject: co.subject,
      creditHours: 3,
      category: 'Custom Added Subject',
      overview: co.syllabusOverview || `Custom university course outline for ${co.courseTitle}.`,
      keyTopics: co.chapters.map((c) => c.title),
      chapters: co.chapters.map((c) => ({
        chapterNumber: c.chapterNumber,
        title: c.title,
        topics: c.topics,
        readings: c.readings,
      })),
      isCustomOutlineSaved: true,
      savedOutline: co,
    })),
  ];

  const activeSubjectEntry =
    allSubjectEntries.find((item) => item.id === selectedCourseId) || allSubjectEntries[0];

  const filteredSubjectEntries = allSubjectEntries.filter((item) => {
    const q = subjectSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      item.shortTitle.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const getSubjectStudyBlocks = (entry: typeof activeSubjectEntry) => {
    const matchedPlanBlocks: {
      period: string;
      courseTitle: string;
      topics: string[];
      actionableTargets: { id: string; text: string; category?: string }[];
      recommendedPracticeCount: number;
      highYieldTopics: string[];
      examTraps: string[];
      keyFormulas: string[];
    }[] = [];

    FRESHMAN_SEMESTER_PLAN.forEach((plan) => {
      plan.timeBlocks.forEach((b) => {
        if (b.subject === entry.subject && !entry.id.startsWith('custom-')) {
          matchedPlanBlocks.push({
            period: `Unit ${matchedPlanBlocks.length + 1}`,
            courseTitle: b.courseTitle,
            topics: b.topics,
            actionableTargets: b.actionableTargets,
            recommendedPracticeCount: b.recommendedPracticeCount,
            highYieldTopics: plan.highYieldTopics || [],
            examTraps: plan.examTraps || [],
            keyFormulas: plan.keyFormulasToMemorize || [],
          });
        }
      });
    });

    if (entry.isCustomOutlineSaved || matchedPlanBlocks.length === 0) {
      return entry.chapters.map((ch) => ({
        period: `Chapter ${ch.chapterNumber}`,
        courseTitle: `${entry.code}: ${ch.title}`,
        topics: ch.topics,
        actionableTargets: ch.topics.map((t, idx) => ({
          id: `subj-${entry.id}-ch${ch.chapterNumber}-t${idx + 1}`,
          text: `Master ${t} (${ch.title})`,
          category: idx % 2 === 0 ? 'Concept' : 'Practice',
        })),
        recommendedPracticeCount: 15,
        highYieldTopics: entry.keyTopics,
        examTraps: [
          `Verify all governing conditions and units before applying ${ch.title} formulas.`,
          `Watch for multi-step conceptual distractors in ${entry.code} exam questions.`,
        ],
        keyFormulas: [],
      }));
    }

    return matchedPlanBlocks;
  };

  const getSubjectTargetIds = (entry: typeof activeSubjectEntry): string[] => {
    const blocks = getSubjectStudyBlocks(entry);
    const ids: string[] = [];
    blocks.forEach((b) => {
      b.actionableTargets.forEach((t) => ids.push(t.id));
    });
    return ids;
  };

  const getSubjectProgress = (entry: typeof activeSubjectEntry): number => {
    const ids = getSubjectTargetIds(entry);
    if (ids.length === 0) return 0;
    const done = ids.filter((id) => checkedTasks[id]).length;
    return Math.round((done / ids.length) * 100);
  };

  const activeBlocks = getSubjectStudyBlocks(activeSubjectEntry);
  const activeTargetIds = getSubjectTargetIds(activeSubjectEntry);
  const activeCompletedCount = activeTargetIds.filter((id) => checkedTasks[id]).length;
  const activeProgress = getSubjectProgress(activeSubjectEntry);

  const subjectHighYield = Array.from(
    new Set([
      ...activeSubjectEntry.keyTopics,
      ...activeBlocks.flatMap((b) => b.highYieldTopics),
    ])
  ).slice(0, 6);

  const subjectExamTraps = Array.from(
    new Set(activeBlocks.flatMap((b) => b.examTraps))
  ).slice(0, 5);

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

  const handleSelectSubjectCard = (item: typeof activeSubjectEntry) => {
    const isFreeCourse = item.subject === 'anthropology';
    const isCourseLocked = Boolean(isPaidAccessLocked && !isFreeCourse);
    if (isCourseLocked && onRequirePaidAccess) {
      onRequirePaidAccess(`Course: ${item.code} — ${item.title}`);
      return;
    }
    setSelectedCourseId(item.id);
    if (activeHubRef.current) {
      activeHubRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const [activeCategory, setActiveCategory] = useState<'all' | 'natural' | 'social' | 'common'>('all');

  const filteredByCategory = filteredSubjectEntries.filter((item) => {
    if (activeCategory === 'all') return true;
    const cat = item.category.toLowerCase();
    if (activeCategory === 'natural') {
      return cat.includes('natural') || item.subject === 'mathematics' || item.subject === 'math_applied_2' || item.subject === 'physics' || item.subject === 'physics_2' || item.subject === 'chemistry' || item.subject === 'chemistry_2' || item.subject === 'biology' || item.subject === 'biology_2';
    }
    if (activeCategory === 'social') {
      return cat.includes('social') || item.subject === 'geography' || item.subject === 'history' || item.subject === 'civics' || item.subject === 'psychology' || item.subject === 'anthropology';
    }
    if (activeCategory === 'common') {
      return item.subject === 'english' || item.subject === 'english_2' || item.subject === 'critical_thinking' || item.subject === 'emerging_tech' || item.subject === 'fitness';
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* 1. ACTIVE SUBJECT HERO HUB (Clean, High-Contrast & 1-Tap Ready) */}
      <div
        ref={activeHubRef}
        className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          {(() => {
            const isHeroAmharic = Boolean(amharicSubjects[activeSubjectEntry.subject]);
            const heroAmMeta = getAmharicSubjectMeta(activeSubjectEntry.subject);
            return (
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-blue-400">{activeSubjectEntry.code}</span>
                  <span>·</span>
                  <span>
                    {activeSubjectEntry.chapters.length}{' '}
                    {isHeroAmharic ? 'ምዕራፎች' : 'Chapters'}
                  </span>
                  <span>·</span>
                  <span>{activeSubjectEntry.creditHours} {isHeroAmharic ? 'ክሬዲት ሰዓት' : 'Cr. Hrs'}</span>
                  {isHeroAmharic && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                      አማርኛ ሁነታ
                    </span>
                  )}
                  {activeSubjectEntry.isCustomOutlineSaved && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-400 font-semibold">Custom Outline</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
                    {getSubjectIcon(activeSubjectEntry.subject)}
                  </span>
                  <span>
                    {isHeroAmharic && heroAmMeta
                      ? heroAmMeta.nameAm
                      : activeSubjectEntry.shortTitle}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                  {isHeroAmharic && heroAmMeta
                    ? heroAmMeta.overviewAm
                    : activeSubjectEntry.overview}
                </p>
              </div>
            );
          })()}

          {/* Quick Subject Switch Dropdown + Amharic Mode Toggle + Outline Editor */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onToggleAmharicSubject && (
              <button
                type="button"
                id="hero-amharic-mode-toggle"
                onClick={() => onToggleAmharicSubject(activeSubjectEntry.subject)}
                aria-pressed={Boolean(amharicSubjects[activeSubjectEntry.subject])}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  amharicSubjects[activeSubjectEntry.subject]
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border-slate-700'
                }`}
                title="Switch between English and Amharic Mode for this subject"
              >
                <Languages className="w-3.5 h-3.5 shrink-0" />
                <span>AMM</span>
              </button>
            )}

            <select
              value={activeSubjectEntry.id}
              onChange={(e) => {
                const found = allSubjectEntries.find((item) => item.id === e.target.value);
                if (found) handleSelectSubjectCard(found);
              }}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 max-w-[200px] sm:max-w-xs truncate"
              aria-label="Switch Active Subject"
            >
              {allSubjectEntries.map((item) => {
                const isFree = item.subject === 'anthropology';
                const locked = Boolean(isPaidAccessLocked && !isFree);
                return (
                  <option key={item.id} value={item.id}>
                    {item.shortTitle} {locked ? '(40 ETB)' : isPaidAccessLocked && isFree ? '(FREE)' : ''}
                  </option>
                );
              })}
            </select>

            {onOpenSyllabusModal && (
              <button
                type="button"
                onClick={() => onOpenSyllabusModal(activeSubjectEntry.id)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                title="Edit Course Syllabus Outline"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden xs:inline">Edit Outline</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 PROMINENT 1-TAP ACTION BUTTONS FOR THE SELECTED SUBJECT */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {onOpenNotes && (
            <button
              type="button"
              onClick={() => onOpenNotes(activeSubjectEntry.subject)}
              className="py-3 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Library className="w-4 h-4 shrink-0" />
              <span>
                {amharicSubjects[activeSubjectEntry.subject]
                  ? 'ማስታወሻ አንብብ (አማርኛ)'
                  : 'Read Notes'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onStartSubjectPractice(activeSubjectEntry.subject)}
            className="py-3 px-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Practice Exam</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenGuides(activeSubjectEntry.subject)}
            className="py-3 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>PDF Library</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenFlashcards
                ? onOpenFlashcards(activeSubjectEntry.subject)
                : onNavigateTab?.('flashcards')
            }
            className="py-3 px-3.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <BrainCircuit className="w-4 h-4 shrink-0" />
            <span>Flashcards</span>
          </button>
        </div>

        {/* Clean Chapter Cards for Selected Subject */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>
                {amharicSubjects[activeSubjectEntry.subject]
                  ? `${getAmharicSubjectMeta(activeSubjectEntry.subject)?.shortNameAm || activeSubjectEntry.shortTitle} — ሙሉ ምዕራፎች በአማርኛ (${activeSubjectEntry.chapters.length})`
                  : `${activeSubjectEntry.shortTitle} Chapters (${activeSubjectEntry.chapters.length})`}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeSubjectEntry.chapters.map((ch) => {
              const isHeroAmharic = Boolean(amharicSubjects[activeSubjectEntry.subject]);
              const amNote = isHeroAmharic
                ? getAmharicChapterNote(
                    undefined,
                    activeSubjectEntry.subject,
                    ch.chapterNumber,
                    ch.title
                  )
                : null;

              return (
                <div
                  key={ch.chapterNumber}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-blue-400">
                      {isHeroAmharic ? `ምዕራፍ ${ch.chapterNumber}` : `Chapter ${ch.chapterNumber}`}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">
                      {isHeroAmharic && amNote ? amNote.titleAm : ch.title}
                    </h4>
                    {isHeroAmharic && amNote ? (
                      <div className="space-y-1.5 pt-1">
                        <p className="text-xs text-emerald-200/90 leading-relaxed line-clamp-3">
                          {amNote.expandedOverviewAm || amNote.briefOverviewAm}
                        </p>
                        <ul className="space-y-1 pt-0.5">
                          {amNote.briefPointsAm.slice(0, 3).map((pt, pIdx) => (
                            <li key={pIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold shrink-0">·</span>
                              <span className="line-clamp-1">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <ul className="space-y-1 pt-1">
                        {ch.topics.slice(0, 4).map((topic, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-blue-400 font-bold shrink-0">·</span>
                            <span className="line-clamp-1">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    {onOpenNotes && (
                      <button
                        type="button"
                        onClick={() => onOpenNotes(activeSubjectEntry.subject)}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isHeroAmharic ? 'በአማርኛ አንብብ' : 'Read Notes'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Study Checklist & Exam Tips (Keeps Page Clean & Uncluttered) */}
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowChecklistAndTips((prev) => !prev)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>
                Study Checklist & Exam Tips ({activeCompletedCount}/{activeTargetIds.length} Completed · {activeProgress}%)
              </span>
            </div>
            {showChecklistAndTips ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showChecklistAndTips && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeBlocks.map((block, bIdx) => (
                  <div
                    key={bIdx}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2.5"
                  >
                    <div className="text-xs font-bold text-white">
                      {block.period} · {block.courseTitle}
                    </div>
                    <div className="space-y-1.5">
                      {block.actionableTargets.map((target) => {
                        const isDone = Boolean(checkedTasks[target.id]);
                        return (
                          <button
                            key={target.id}
                            type="button"
                            onClick={() => onToggleTask(target.id)}
                            className={`w-full text-left p-2 rounded-lg border transition flex items-start gap-2 cursor-pointer ${
                              isDone
                                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                            <span className={`text-xs ${isDone ? 'line-through text-slate-400' : ''}`}>
                              {target.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> High-Yield Exam Topics
                  </div>
                  <ul className="space-y-1">
                    {subjectHighYield.map((topic, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">·</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Common Exam Traps
                  </div>
                  <ul className="space-y-1">
                    {subjectExamTraps.map((trap, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">·</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. ALL 17+ UNIVERSITY SUBJECTS DIRECTORY (With Category Filters, Search & 1-Tap Actions) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Freshman University Courses ({allSubjectEntries.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select any course to view its chapters, or tap Notes, Exam, PDFs, or Cards directly below
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={subjectSearch}
                onChange={(e) => setSubjectSearch(e.target.value)}
                placeholder="Search subject or code..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {onOpenSyllabusModal && (
              <button
                type="button"
                onClick={() => onOpenSyllabusModal('__new_custom__')}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer"
                title="Add Custom Course Syllabus"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Add Course</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: `All (${allSubjectEntries.length})` },
            { id: 'natural', label: 'Natural & Health' },
            { id: 'social', label: 'Social & Humanities' },
            { id: 'common', label: 'Common & Tech' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Enhanced Subject Cards Grid with 1-Tap Direct Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredByCategory.map((item) => {
            const isSelected = activeSubjectEntry.id === item.id;
            const progress = getSubjectProgress(item);
            const isFullyDone = progress === 100 && getSubjectTargetIds(item).length > 0;
            const isFreeCourse = item.subject === 'anthropology';
            const isCourseLocked = Boolean(isPaidAccessLocked && !isFreeCourse);
            const isCardAmharic = Boolean(amharicSubjects[item.subject]);
            const cardAmMeta = getAmharicSubjectMeta(item.subject);

            return (
              <div
                key={item.id}
                id={`subject-card-${item.id}`}
                className={`p-3.5 rounded-xl transition border flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div
                  onClick={() => handleSelectSubjectCard(item)}
                  className="cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1.5 rounded-lg bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                        {getSubjectIcon(item.subject)}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white truncate block">
                          {isCardAmharic && cardAmMeta ? cardAmMeta.shortNameAm : item.shortTitle}
                        </span>
                        <span className="text-[10px] text-blue-400 font-semibold">
                          {item.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {onToggleAmharicSubject && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleAmharicSubject(item.subject);
                          }}
                          aria-pressed={isCardAmharic}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                            isCardAmharic
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-emerald-500/60 hover:text-emerald-300'
                          }`}
                          title="Toggle Amharic Mode for this subject"
                        >
                          <Languages className="w-2.5 h-2.5" />
                          <span>AMM</span>
                        </button>
                      )}
                      {isPaidAccessLocked && isFreeCourse && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                          FREE
                        </span>
                      )}
                      {isCourseLocked && (
                        <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>40 ETB</span>
                        </span>
                      )}
                      {isFullyDone && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {isCardAmharic && cardAmMeta ? cardAmMeta.overviewAm : item.overview}
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                    <span>
                      {item.chapters.length} {isCardAmharic ? 'ምዕራፎች' : 'Chapters'}
                    </span>
                    <span>·</span>
                    <span>{item.creditHours} {isCardAmharic ? 'ክሬዲት ሰዓት' : 'Credit Hrs'}</span>
                  </div>
                </div>

                {/* 1-Tap Quick Action Row on Every Subject Card */}
                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-4 gap-1.5 text-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenNotes) onOpenNotes(item.subject);
                    }}
                    className="py-1.5 px-1 rounded-lg bg-slate-900 hover:bg-emerald-950/40 hover:text-emerald-300 border border-slate-800 text-[11px] font-semibold text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                    title="Read Course Notes"
                  >
                    <BookOpen className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{isCardAmharic ? 'ማስታወሻ' : 'Notes'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartSubjectPractice(item.subject);
                    }}
                    className="py-1.5 px-1 rounded-lg bg-slate-900 hover:bg-blue-950/40 hover:text-blue-300 border border-slate-800 text-[11px] font-semibold text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                    title="Start Practice Exam"
                  >
                    <GraduationCap className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>Exam</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGuides(item.subject);
                    }}
                    className="py-1.5 px-1 rounded-lg bg-slate-900 hover:bg-indigo-950/40 hover:text-indigo-300 border border-slate-800 text-[11px] font-semibold text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                    title="Open Textbooks & PDFs"
                  >
                    <FileText className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span>PDFs</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenFlashcards) {
                        onOpenFlashcards(item.subject);
                      } else {
                        onNavigateTab?.('flashcards');
                      }
                    }}
                    className="py-1.5 px-1 rounded-lg bg-slate-900 hover:bg-teal-950/40 hover:text-teal-300 border border-slate-800 text-[11px] font-semibold text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                    title="Open Flashcards"
                  >
                    <BrainCircuit className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>Cards</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

