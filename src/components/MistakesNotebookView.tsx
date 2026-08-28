import React, { useState } from 'react';
import { Question } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  RotateCcw, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen,
  ArrowRight,
  Flame
} from 'lucide-react';

interface MistakesNotebookViewProps {
  mistakeQuestions: Question[];
  onRemoveMistake: (id: string) => void;
  onClearAllMistakes: () => void;
  onOpenAITutor: (q: Question) => void;
}

export const MistakesNotebookView: React.FC<MistakesNotebookViewProps> = ({
  mistakeQuestions,
  onRemoveMistake,
  onClearAllMistakes,
  onOpenAITutor,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  if (mistakeQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Mistakes Notebook is Clean!
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
          Any question you answer incorrectly in the Practice Sets or Mock Exam Simulator will automatically appear here for targeted revision before exam day.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-indigo-950 rounded-2xl p-6 text-white border border-rose-800/40 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> High-Priority Revision
            </span>
            <span className="text-xs text-rose-200">
              {mistakeQuestions.length} Questions to Review
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Targeted Mistakes & Weakness Notebook
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Re-solve your missed problems to ensure you don't repeat the same mistakes on the real AASTU entrance exam.
          </p>
        </div>

        <button
          onClick={onClearAllMistakes}
          className="px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold rounded-lg border border-rose-700/60 flex items-center gap-1.5 transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {mistakeQuestions.map((q, qIdx) => {
          const userPick = selectedAnswers[q.id];
          const isAnswered = userPick !== undefined;
          const isCorrect = isAnswered && userPick === q.correctAnswer;
          const showExp = Boolean(showExplanations[q.id]);

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                    {q.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {q.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAITutor(q)}
                    className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Ask AI Tutor
                  </button>

                  <button
                    onClick={() => onRemoveMistake(q.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 rounded transition"
                    title="Remove from notebook (Mastered)"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </button>
                </div>
              </div>

              <div className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                <span className="text-rose-600 font-bold mr-1.5">#{qIdx + 1}</span>
                <MathRenderer text={q.question} />
              </div>

              {/* Multiple Choice Options for Re-solving */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isChosen = userPick === oIdx;
                  const isTrueAnswer = q.correctAnswer === oIdx;

                  let optClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50';

                  if (isAnswered) {
                    if (isTrueAnswer) {
                      optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isChosen && !isTrueAnswer) {
                      optClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold';
                    } else {
                      optClass = 'border-slate-200 dark:border-slate-800 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${optClass}`}
                    >
                      <span><MathRenderer text={opt} /></span>
                      {isAnswered && (
                        <div>
                          {isTrueAnswer && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isChosen && !isTrueAnswer && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Solution breakdown */}
              {showExp && (
                <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 animate-in fade-in duration-200">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Solution & Exam Rationale:</span>
                    {isCorrect && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Mastered this concept!
                      </span>
                    )}
                  </div>
                  <div><MathRenderer text={q.explanation} /></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
