import React, { useState } from 'react';
import { ALL_AASTU_MASTER_NOTES } from '../data/aastuNotesData';
import { MasterNoteChapter, Subject, UserStudyNote } from '../types';
import { MathRenderer } from './MathRenderer';
import { StudentNotesView } from './StudentNotesView';
import { 
  BookOpen, 
  Search, 
  Calculator, 
  Compass, 
  FlaskConical, 
  Brain, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Bookmark, 
  BookmarkCheck, 
  Printer, 
  ChevronRight, 
  ChevronDown, 
  FileText,
  Lightbulb,
  Maximize2,
  Minimize2,
  GraduationCap,
  Edit3,
  PenTool,
  Library
} from 'lucide-react';

interface AASTUMasterNotesViewProps {
  onOpenAITutorWithTopic?: (topic: string, subject: Subject) => void;
  onJumpToPractice?: (subject: Subject) => void;
  userNotes?: UserStudyNote[];
  onSaveNote?: (note: UserStudyNote) => void;
  onDeleteNote?: (id: string) => void;
  savedQuestionsCount?: number;
  examHistoryCount?: number;
  onDataRestored?: () => void;
}

export const AASTUMasterNotesView: React.FC<AASTUMasterNotesViewProps> = ({
  onOpenAITutorWithTopic,
  onJumpToPractice,
  userNotes = [],
  onSaveNote,
  onDeleteNote,
  savedQuestionsCount = 0,
  examHistoryCount = 0,
  onDataRestored,
}) => {
  const [notesSubTab, setNotesSubTab] = useState<'master' | 'personal'>('master');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(ALL_AASTU_MASTER_NOTES[0].id);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aastu_completed_chapters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedEqId, setCopiedEqId] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Filter chapters
  const filteredChapters = ALL_AASTU_MASTER_NOTES.filter((ch) => {
    const matchSubject = selectedSubject === 'all' || ch.subject === selectedSubject;
    const q = searchQuery.toLowerCase();
    const matchQuery = 
      ch.title.toLowerCase().includes(q) ||
      ch.overview.toLowerCase().includes(q) ||
      ch.sections.some(s => 
        s.heading.toLowerCase().includes(q) || 
        s.content.toLowerCase().includes(q) ||
        s.keyTakeaways.some(k => k.toLowerCase().includes(q))
      );
    return matchSubject && matchQuery;
  });

  const activeChapter = ALL_AASTU_MASTER_NOTES.find((ch) => ch.id === selectedChapterId) || filteredChapters[0] || ALL_AASTU_MASTER_NOTES[0];

  const toggleChapterCompleted = (id: string) => {
    setCompletedChapters(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('aastu_completed_chapters', JSON.stringify(updated));
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
      case 'mathematics': return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'physics': return <Compass className="w-4 h-4 text-purple-500" />;
      case 'chemistry': return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      default: return <Brain className="w-4 h-4 text-amber-500" />;
    }
  };

  const getSubjectBadge = (subj: Subject) => {
    switch (subj) {
      case 'mathematics':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'physics':
        return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'chemistry':
        return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      default:
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }
  };

  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const totalChapters = ALL_AASTU_MASTER_NOTES.length;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  return (
    <div className={`space-y-6 ${isFocusMode ? 'max-w-5xl mx-auto' : ''}`}>
      {/* Sub-navigation Switcher between Master Syllabus & Personal Vault */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 shadow-sm">
        <button
          id="notes-tab-master-btn"
          onClick={() => setNotesSubTab('master')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            notesSubTab === 'master'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Library className="w-4 h-4 text-emerald-400" />
          <span>AASTU Master Notes (Official Syllabus)</span>
        </button>

        <button
          id="notes-tab-personal-btn"
          onClick={() => setNotesSubTab('personal')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            notesSubTab === 'personal'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Edit3 className="w-4 h-4 text-amber-300" />
          <span>My Personal Study Notes</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded-full font-bold">
            {userNotes.length} Saved
          </span>
        </button>
      </div>

      {notesSubTab === 'personal' ? (
        <StudentNotesView
          userNotes={userNotes}
          onSaveNote={onSaveNote || (() => {})}
          onDeleteNote={onDeleteNote || (() => {})}
          onOpenAITutorWithTopic={onOpenAITutorWithTopic}
          savedQuestionsCount={savedQuestionsCount}
          examHistoryCount={examHistoryCount}
          onDataRestored={onDataRestored}
        />
      ) : (
        <>
          {/* Top Hero Banner */}
          {!isFocusMode && (
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 text-white border border-blue-800/40 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500/20 text-blue-300 text-xs font-extrabold px-2.5 py-0.5 rounded border border-blue-500/30 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> AASTU Official Syllabus Vault
                    </span>
                    <span className="text-xs text-slate-400">
                      {totalChapters} Comprehensive Chapters • Extensive STEM Notes
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    AASTU Comprehensive Master Notes & High-Yield Vault
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Textbook-grade comprehensive notes, mathematical proofs, governing equations, 30-second speed hacks, and examiner traps tailored exclusively for the Addis Ababa Science & Technology University entrance standard.
                  </p>
                </div>

                {/* Read progress summary */}
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 min-w-[200px] text-right sm:text-left">
                  <div className="text-xs text-slate-400 font-medium">Mastery Progress</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">
                    {completedCount} / {totalChapters} Chapters Read
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude'] as Subject[]).map((subj) => (
            <button
              key={subj}
              id={`notes-filter-${subj}`}
              onClick={() => {
                setSelectedSubject(subj);
                const firstMatching = ALL_AASTU_MASTER_NOTES.find(ch => subj === 'all' || ch.subject === subj);
                if (firstMatching) setSelectedChapterId(firstMatching.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition flex items-center gap-1.5 ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj !== 'all' && getSubjectIcon(subj)}
              {subj === 'aptitude' ? 'Aptitude & English' : subj}
            </button>
          ))}
        </div>

        {/* Search input & Focus Mode toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, formulas, rules..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isFocusMode ? 'Exit Full Screen' : 'Focus Reading Mode'}
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Table of Contents / Chapter Drawer (4 cols) */}
        {!isFocusMode && (
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3 sticky top-36 max-h-[calc(100vh-160px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                Table of Contents ({filteredChapters.length})
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Click to study</span>
            </div>

            <div className="space-y-2">
              {filteredChapters.map((ch) => {
                const isSelected = ch.id === activeChapter.id;
                const isDone = Boolean(completedChapters[ch.id]);

                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-sm ring-1 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {getSubjectIcon(ch.subject)}
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getSubjectBadge(ch.subject)}`}>
                          {ch.subject}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapterCompleted(ch.id);
                        }}
                        className="text-slate-400 hover:text-emerald-500 transition"
                        title={isDone ? 'Mark as unread' : 'Mark as completed'}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : ''}`} />
                      </button>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-2 leading-snug">
                      {ch.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        ~{ch.estimatedReadTimeMinutes} min read
                      </span>
                      <span className="font-medium text-slate-400">
                        {ch.sections.length} Sections
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right In-Depth Master Note Reader (8 cols or 12 cols in Focus Mode) */}
        <div className={`${isFocusMode ? 'lg:col-span-12' : 'lg:col-span-8'} bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-8`}>
          {/* Chapter Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border flex items-center gap-1.5 ${getSubjectBadge(activeChapter.subject)}`}>
                  {getSubjectIcon(activeChapter.subject)}
                  {activeChapter.subject}
                </span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1 rounded">
                  {activeChapter.gradeLevel}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{activeChapter.estimatedReadTimeMinutes} mins
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleChapterCompleted(activeChapter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    completedChapters[activeChapter.id]
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {completedChapters[activeChapter.id] ? 'Completed' : 'Mark as Read'}
                </button>

                {onOpenAITutorWithTopic && (
                  <button
                    onClick={() => onOpenAITutorWithTopic(activeChapter.title, activeChapter.subject)}
                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Ask AI Tutor
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {activeChapter.title}
            </h1>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white font-bold block mb-1">Chapter Summary:</strong>
              <MathRenderer text={activeChapter.overview} />
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-10">
            {activeChapter.sections.map((section, sIdx) => (
              <div key={section.id} className="space-y-5 border-b border-slate-100 dark:border-slate-800/80 pb-8 last:border-b-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">§</span>
                  {section.heading}
                </h3>

                {/* Section Markdown / Content */}
                <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <MathRenderer text={section.content} />
                </div>

                {/* Key Equations & Formulas Block */}
                {section.equations && section.equations.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Key Governing Equations & Fast Rules:
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.equations.map((eq, eIdx) => {
                        const eqKey = `${section.id}-eq-${eIdx}`;
                        const isCopied = copiedEqId === eqKey;

                        return (
                          <div
                            key={eIdx}
                            className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 space-y-2 relative group shadow-md"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                              <span>{eq.name}</span>
                              <button
                                onClick={() => handleCopyEquation(eq.formula, eqKey)}
                                className="text-slate-400 hover:text-white transition p-1"
                                title="Copy Equation"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>

                            <div className="text-sm sm:text-base text-blue-200 font-bold bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto text-center">
                              <MathRenderer latex={eq.formula} displayMode={true} />
                            </div>

                            <div className="text-xs text-slate-400 leading-snug">
                              <MathRenderer text={eq.explanation} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Worked Examples */}
                {section.workedExamples && section.workedExamples.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      High-Yield Worked Exemplars & Exam Practice:
                    </h4>

                    <div className="space-y-4">
                      {section.workedExamples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200/80 dark:border-blue-900/40 space-y-3"
                        >
                          <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            <span className="text-blue-600 font-extrabold mr-1.5">Example {exIdx + 1}:</span>
                            <MathRenderer text={ex.problem} />
                          </div>

                          <div className="space-y-1.5 pl-3 border-l-2 border-blue-400 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            {ex.stepByStepSolution.map((step, sIndex) => (
                              <div key={sIndex} className="leading-relaxed flex items-start gap-1.5">
                                <span className="font-semibold text-slate-900 dark:text-white shrink-0">•</span>
                                <div><MathRenderer text={step} /></div>
                              </div>
                            ))}
                          </div>

                          {ex.shortcutTip && (
                            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 p-3 rounded-lg text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold uppercase tracking-wider block mb-0.5">⚡ 30-Second Speed Shortcut:</span>
                                <MathRenderer text={ex.shortcutTip} />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Exam Traps */}
                {section.examTraps && section.examTraps.length > 0 && (
                  <div className="bg-rose-50 dark:bg-rose-950/30 rounded-xl p-4 border border-rose-200 dark:border-rose-900/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ⚠️ AASTU Examiner Traps to Avoid:
                    </div>
                    <ul className="space-y-1 text-xs text-rose-950 dark:text-rose-200">
                      {section.examTraps.map((trap, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <div><MathRenderer text={trap} /></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Takeaways */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      🎯 Core Takeaways:
                    </div>
                    <ul className="space-y-1 text-xs text-emerald-950 dark:text-emerald-200">
                      {section.keyTakeaways.map((takeaway, tkIdx) => (
                        <li key={tkIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <div><MathRenderer text={takeaway} /></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Navigation & Practice Link */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleChapterCompleted(activeChapter.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedChapters[activeChapter.id] ? 'Chapter Finished ✓' : 'Mark as Mastered'}
              </button>
            </div>

            {onJumpToPractice && (
              <button
                onClick={() => onJumpToPractice(activeChapter.subject)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                Practice {activeChapter.subject.toUpperCase()} Questions <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
