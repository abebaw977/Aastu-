import React, { useState } from 'react';
import { Question, Subject, Difficulty } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  RefreshCw, 
  Zap, 
  PlusCircle,
  Calculator,
  Compass,
  FlaskConical,
  Brain
} from 'lucide-react';

interface PracticeViewProps {
  questions: Question[];
  selectedSubject: Subject;
  setSelectedSubject: (s: Subject) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onRecordMistake: (q: Question) => void;
  onOpenAITutorWithQuestion: (q: Question) => void;
  onAddCustomQuestion?: (q: Question) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  selectedSubject,
  setSelectedSubject,
  bookmarkedIds,
  onToggleBookmark,
  onRecordMistake,
  onOpenAITutorWithQuestion,
  onAddCustomQuestion,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiGenTopic, setAiGenTopic] = useState<string>('Calculus');
  const [genError, setGenError] = useState<string | null>(null);

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchSubject && matchDiff;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const isBookmarked = currentQ ? bookmarkedIds.includes(currentQ.id) : false;

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(index);
    setShowExplanation(true);

    if (currentQ && index !== currentQ.correctAnswer) {
      onRecordMistake(currentQ);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handleGenerateAIQuestion = async () => {
    try {
      setIsGeneratingAI(true);
      setGenError(null);

      const targetSubject = selectedSubject === 'all' ? 'mathematics' : selectedSubject;
      const res = await fetch('/api/gemini/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: targetSubject,
          topic: aiGenTopic,
          difficulty: selectedDifficulty === 'all' ? 'medium' : selectedDifficulty,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate question. Ensure your Gemini API Key is configured.');
      }

      const newQ: Question = await res.json();
      if (onAddCustomQuestion && newQ && newQ.question) {
        onAddCustomQuestion(newQ);
        setCurrentIndex(filteredQuestions.length); // point to new question
        setSelectedOption(null);
        setShowExplanation(false);
      }
    } catch (err: any) {
      setGenError(err.message || 'Error generating question.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const getSubjectBadge = (subj: string) => {
    switch (subj) {
      case 'mathematics':
        return (
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" /> Mathematics
          </span>
        );
      case 'physics':
        return (
          <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Physics
          </span>
        );
      case 'chemistry':
        return (
          <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <FlaskConical className="w-3.5 h-3.5" /> Chemistry
          </span>
        );
      default:
        return (
          <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Brain className="w-3.5 h-3.5" /> Aptitude & English
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Subject tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude'] as Subject[]).map((subj) => (
            <button
              key={subj}
              id={`practice-filter-${subj}`}
              onClick={() => {
                setSelectedSubject(subj);
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj === 'aptitude' ? 'Aptitude & English' : subj}
            </button>
          ))}
        </div>

        {/* Difficulty filter & Question count */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Difficulty:</span>
          {(['all', 'easy', 'medium', 'hard'] as (Difficulty | 'all')[]).map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No questions found for this filter</h3>
          <p className="text-sm text-slate-500 mt-1">Try selecting "All Subjects" or generate new questions with AI.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
          {/* Question Card Header */}
          <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              {getSubjectBadge(currentQ.subject)}
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded font-medium">
                {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(currentQ.id)}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  isBookmarked
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-500" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Save'}</span>
              </button>

              <button
                onClick={() => onOpenAITutorWithQuestion(currentQ)}
                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Ask AI Tutor
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-6">
            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              <MathRenderer text={currentQ.question} />
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAnswer = idx === currentQ.correctAnswer;
                const showResult = selectedOption !== null;

                let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/20';

                if (showResult) {
                  if (isCorrectAnswer) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-400/30';
                  } else if (isSelected && !isCorrectAnswer) {
                    optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-semibold';
                  } else {
                    optionStyle = 'border-slate-200 dark:border-slate-800 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`opt-btn-${idx}`}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between text-sm sm:text-base ${optionStyle}`}
                  >
                    <span><MathRenderer text={opt} /></span>
                    {showResult && (
                      <div>
                        {isCorrectAnswer && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & AASTU Shortcut Box */}
            {showExplanation && (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300">
                {/* Step-by-Step Explanation */}
                <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Verified Step-by-Step Solution:
                  </h5>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    <MathRenderer text={currentQ.explanation} />
                  </div>
                </div>

                {/* AASTU Shortcut Hack */}
                {currentQ.shortcutTip && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl p-4 border border-amber-200 dark:border-amber-800/50">
                    <div className="flex items-start gap-2.5">
                      <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 block mb-1">
                          ⚡ AASTU Speed Shortcut (Solve in 30 Seconds):
                        </span>
                        <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-snug">
                          <MathRenderer text={currentQ.shortcutTip} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <div className="text-xs text-slate-500 font-medium">
                {currentIndex + 1} / {filteredQuestions.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Dynamic Question Generator Box */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-5 text-white shadow-md border border-blue-800/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h4 className="font-bold text-sm sm:text-base">Generate Fresh AASTU AI Practice Questions</h4>
            </div>
            <p className="text-xs text-blue-200">
              Need more practice on a specific weak topic? Generate infinite verified multiple-choice questions instantly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={aiGenTopic}
              onChange={(e) => setAiGenTopic(e.target.value)}
              placeholder="e.g. Limits, Optics, Hybridization"
              className="px-3 py-2 rounded-lg bg-slate-800/90 text-white text-xs border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400"
            />
            <button
              onClick={handleGenerateAIQuestion}
              disabled={isGeneratingAI}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
            >
              {isGeneratingAI ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
              {isGeneratingAI ? 'Generating...' : 'Generate Question'}
            </button>
          </div>
        </div>

        {genError && (
          <p className="text-xs text-rose-300 mt-2 bg-rose-950/60 px-3 py-1.5 rounded border border-rose-800">
            {genError}
          </p>
        )}
      </div>
    </div>
  );
};
