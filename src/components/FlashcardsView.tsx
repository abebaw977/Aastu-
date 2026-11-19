import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcards';
import { ALL_FRESHMAN_FLASHCARDS } from '../data/freshmanFlashcards';
import {
  OFFICIAL_17_FRESHMAN_COURSES,
  getSubjectDisplayName,
  normalizeSubjectTo19,
} from '../data/freshmanCourseCatalog';
import { Subject, Flashcard } from '../types';
import { isFreeCourseSubject } from '../utils/authPaymentService';
import { MathRenderer } from './MathRenderer';
import { 
  RotateCw, 
  Check, 
  X, 
  HelpCircle, 
  Shuffle, 
  RefreshCcw, 
  Sparkles, 
  BrainCircuit, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

const COMBINED_FLASHCARDS: Flashcard[] = [...ALL_FRESHMAN_FLASHCARDS, ...FLASHCARDS_DATA];

interface FlashcardsViewProps {
  initialSubject?: Subject | 'all';
  isPaidAccessLocked?: boolean;
  onRequirePaidAccess?: (featureName: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  initialSubject = 'all',
  isPaidAccessLocked = false,
  onRequirePaidAccess,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(() =>
    isPaidAccessLocked ? 'anthropology' : initialSubject || 'all'
  );
  const [cards, setCards] = useState<Flashcard[]>(COMBINED_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedSubject('anthropology');
    } else if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [isPaidAccessLocked, initialSubject]);

  const filteredCards = cards.filter(
    (c) =>
      (!isPaidAccessLocked || isFreeCourseSubject(normalizeSubjectTo19(c.subject))) &&
      (selectedSubject === 'all' ||
        normalizeSubjectTo19(c.subject) === normalizeSubjectTo19(selectedSubject))
  );
  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = currentCard ? Boolean(masteredIds[currentCard.id]) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleMarkMastered = (mastered: boolean) => {
    if (!currentCard) return;
    setMasteredIds((prev) => ({
      ...prev,
      [currentCard.id]: mastered,
    }));
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const masteredCount = filteredCards.filter((c) => masteredIds[c.id]).length;
  const masteryPercentage =
    filteredCards.length > 0 ? Math.round((masteredCount / filteredCards.length) * 100) : 0;

  const freshmanSubjects: { id: Subject; label: string }[] = [
    { id: 'all', label: 'All Subjects' },
    ...OFFICIAL_17_FRESHMAN_COURSES.map((c) => ({
      id: c.subject,
      label: c.shortTitle,
    })),
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Compact All-in-One Header & Subject Picker */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <h2 className="text-base sm:text-lg font-bold">Flashcards</h2>
            <p className="text-xs text-slate-400">
              Mastered: <strong className="text-emerald-400">{masteredCount}/{filteredCards.length} ({masteryPercentage}%)</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => {
              const id = e.target.value as Subject;
              if (isPaidAccessLocked && id !== 'all' && !isFreeCourseSubject(id)) {
                onRequirePaidAccess?.(`Flashcards (${getSubjectDisplayName(id)})`);
                return;
              }
              setSelectedSubject(id);
              setCurrentIndex(0);
              setIsFlipped(false);
              setShowHint(false);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
          >
            {freshmanSubjects.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
                {isPaidAccessLocked && id !== 'all'
                  ? isFreeCourseSubject(id)
                    ? ' (FREE)'
                    : ' (50 ETB)'
                  : ''}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleShuffle}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition text-slate-200 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* Main 3D Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-md p-8 flex flex-col justify-between cursor-pointer hover:border-blue-400 transition-all select-none relative group"
          >
            {/* Top card bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  {getSubjectDisplayName(currentCard.subject)}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {currentCard.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Click anywhere to flip</span>
              </div>
            </div>

            {/* Middle Content: Front vs Back */}
            <div className="py-6 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Question / Prompt</span>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    <MathRenderer text={currentCard.front} />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Answer & Key Rule</span>
                  <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed font-sans bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <MathRenderer text={currentCard.back} />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar: Hint & Card Number */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {currentCard.hint ? (
                <div>
                  {showHint ? (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      💡 Hint: <MathRenderer text={currentCard.hint} />
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(true);
                      }}
                      className="text-xs text-slate-400 hover:text-amber-500 flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" /> Show Hint
                    </button>
                  )}
                </div>
              ) : <div />}

              <span className="text-xs font-semibold text-slate-400">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
            </div>
          </div>

          {/* Action Buttons: Mastered vs Needs Practice + Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Prev
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMarkMastered(false)}
                className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs hover:bg-rose-100 flex items-center gap-1.5 transition"
              >
                <X className="w-4 h-4" /> Still Practicing
              </button>

              <button
                onClick={() => handleMarkMastered(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
              >
                <Check className="w-4 h-4" /> Mastered!
              </button>
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
