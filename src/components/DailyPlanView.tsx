import React, { useState } from 'react';
import { AASTU_5_DAY_PLAN } from '../data/studyPlan';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Zap, 
  BookMarked, 
  ArrowRight,
  Flame,
  Lightbulb,
  Award
} from 'lucide-react';
import { Subject } from '../types';

interface DailyPlanViewProps {
  onStartSubjectPractice: (subject: Subject) => void;
  onOpenGuides: (subject: Subject) => void;
  onOpenNotes?: (subject: Subject) => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export const DailyPlanView: React.FC<DailyPlanViewProps> = ({
  onStartSubjectPractice,
  onOpenGuides,
  onOpenNotes,
  checkedTasks,
  onToggleTask,
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const selectedDay = AASTU_5_DAY_PLAN.find((d) => d.day === selectedDayNum) || AASTU_5_DAY_PLAN[0];

  // Calculate day completion
  const getDayTaskIds = (dayNum: number) => {
    const day = AASTU_5_DAY_PLAN.find(d => d.day === dayNum);
    if (!day) return [];
    const ids: string[] = [];
    day.timeBlocks.forEach((block, bIdx) => {
      block.objectives.forEach((_, oIdx) => {
        ids.push(`d${dayNum}-b${bIdx}-o${oIdx}`);
      });
    });
    return ids;
  };

  const getDayProgress = (dayNum: number) => {
    const taskIds = getDayTaskIds(dayNum);
    if (taskIds.length === 0) return 0;
    const completed = taskIds.filter(id => checkedTasks[id]).length;
    return Math.round((completed / taskIds.length) * 100);
  };

  return (
    <div className="space-y-4">
      {/* 5-Day Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {AASTU_5_DAY_PLAN.map((plan) => {
          const isSelected = selectedDayNum === plan.day;
          const progress = getDayProgress(plan.day);
          const isFullyDone = progress === 100;

          return (
            <button
              key={plan.day}
              id={`day-plan-select-${plan.day}`}
              onClick={() => setSelectedDayNum(plan.day)}
              className={`p-3.5 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40 ring-2 ring-blue-400/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  Day {plan.day}
                </span>
                {isFullyDone ? (
                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                ) : (
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {progress}%
                  </span>
                )}
              </div>

              <div className="font-semibold text-xs sm:text-sm line-clamp-1 mb-2">
                {plan.focusSubjects.join(' & ')}
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${isSelected ? 'bg-white' : 'bg-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Main Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        {/* Day Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                DAY {selectedDay.day} OF 5
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Est. {selectedDay.estimatedHours} Hours Study
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {onOpenNotes && (
                <button
                  onClick={() => onOpenNotes('all')}
                  className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1 transition border border-emerald-300 dark:border-emerald-800"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  Read Master Notes
                </button>
              )}
              {selectedDay.focusSubjects.includes('Mathematics') && (
                <button
                  onClick={() => onStartSubjectPractice('mathematics')}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  Math Practice
                </button>
              )}
              {selectedDay.focusSubjects.includes('English & Verbal Aptitude') && (
                <button
                  onClick={() => onStartSubjectPractice('aptitude')}
                  className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  English Practice
                </button>
              )}
              {selectedDay.focusSubjects.includes('Physics') && (
                <button
                  onClick={() => onStartSubjectPractice('physics')}
                  className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  Physics Practice
                </button>
              )}
              {selectedDay.focusSubjects.includes('Chemistry') && (
                <button
                  onClick={() => onStartSubjectPractice('chemistry')}
                  className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  Chemistry Practice
                </button>
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {selectedDay.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {selectedDay.tagline}
          </p>

          {selectedDay.day === 1 && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
                <BookMarked className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-sm text-blue-950 dark:text-blue-200">
                  Day 1 Master Study Tutorial & Ultra-Large Comprehensive Notes Active
                </h5>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  Day 1 covers <strong>Calculus (Limits, Derivatives, Integrals & 3D Vectors)</strong> and <strong>English Grammar & Verbal Aptitude</strong>. Access the textbook-grade notes with full KaTeX formulas, worked solutions, and shortcut tricks using the <em>"Read Master Notes"</em> tab above. Complete all Day 1 study blocks before requesting Day 2 notes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Structured 3-Phase Time Blocks */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Daily Time Blocks & Interactive Checklists
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedDay.timeBlocks.map((block, bIdx) => (
              <div 
                key={bIdx}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">
                      {block.period}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      🎯 {block.recommendedPracticeCount} Qs
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {block.subject}
                  </h5>

                  {/* Core Topics Covered */}
                  <div className="mb-3 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Topics:
                    </div>
                    {block.topics.map((top, tIdx) => (
                      <p key={tIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 leading-snug">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{top}</span>
                      </p>
                    ))}
                  </div>

                  {/* Actionable Objectives / Checklist */}
                  <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Study Goals (Check when done):
                    </div>
                    {block.objectives.map((obj, oIdx) => {
                      const taskId = `d${selectedDay.day}-b${bIdx}-o${oIdx}`;
                      const isChecked = Boolean(checkedTasks[taskId]);

                      return (
                        <div
                          key={oIdx}
                          onClick={() => onToggleTask(taskId)}
                          className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition text-xs select-none ${
                            isChecked
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                            {obj}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Yield Topics & Common Traps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* High-Yield Concepts */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-900/40">
            <h5 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Guaranteed High-Yield Exam Topics
            </h5>
            <ul className="space-y-1.5 text-xs text-emerald-800 dark:text-emerald-300">
              {selectedDay.highYieldTopics.map((top, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>{top}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Traps */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900/40">
            <h5 className="font-bold text-amber-900 dark:text-amber-300 text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              AASTU Classic Exam Traps to Avoid
            </h5>
            <ul className="space-y-1.5 text-xs text-amber-800 dark:text-amber-300">
              {selectedDay.examTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-black">⚠</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Must-Memorize Formulas for the Day */}
        <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h5 className="font-bold text-sm text-white">
                Day {selectedDay.day} High-Frequency Formulas to Lock In
              </h5>
            </div>
            <button
              onClick={() => onOpenGuides('all')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              Open Full Formula Sheets <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedDay.keyFormulasToMemorize.map((formula, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700 font-mono text-xs text-blue-200 flex items-center justify-between"
              >
                <span>{formula}</span>
                <span className="text-[10px] text-slate-400 font-sans">Must Know</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
