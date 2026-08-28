import React, { useState, useEffect } from 'react';
import { Question, ExamResult, Subject } from '../types';
import { MathRenderer } from './MathRenderer';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  Sparkles,
  Trophy,
  BarChart3,
  Sliders,
  Layers,
  Zap,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  HelpCircle,
  RefreshCw,
  Award,
  Atom,
  Calculator,
  FlaskConical,
  BrainCircuit,
  Plus
} from 'lucide-react';

interface MockExamViewProps {
  allQuestions: Question[];
  onSaveMistakes: (wrongQuestions: Question[]) => void;
  onOpenAITutorWithQuestion: (q: Question) => void;
  onAddCustomQuestionsToBank?: (questions: Question[]) => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  allQuestions,
  onSaveMistakes,
  onOpenAITutorWithQuestion,
  onAddCustomQuestionsToBank
}) => {
  // Exam Execution State
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [durationMinutes, setDurationMinutes] = useState<number>(20);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(20 * 60);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [examTitle, setExamTitle] = useState<string>('Custom AI Mock Exam');

  // AI Exam Creator Configuration State
  const [examMode, setExamMode] = useState<'ai_custom' | 'standard'>('ai_custom');
  const [customCount, setCustomCount] = useState<number>(10);
  const [customSubjects, setCustomSubjects] = useState<Subject[]>([
    'mathematics', 
    'physics', 
    'chemistry', 
    'aptitude'
  ]);
  const [customDifficulty, setCustomDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('medium');
  const [customContentFocus, setCustomContentFocus] = useState<string>('Full AASTU High-Yield Syllabus');
  const [customTopicInput, setCustomTopicInput] = useState<string>('');
  
  // AI Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Content Topic Presets
  const TOPIC_PRESETS = [
    { label: '🌟 Full High-Yield Syllabus', value: 'Full AASTU High-Yield STEM Syllabus (Calculus, Physics Mechanics, Chemistry Equilibrium, Aptitude)' },
    { label: '📐 Calculus & Vectors', value: 'Calculus (Limits, Derivatives, Integrals) and 3D Vectors & Geometry' },
    { label: '⚡ Mechanics & Electromagnetism', value: 'Newtonian Mechanics, Work-Energy, Circuits, and Magnetic Induction' },
    { label: '🧪 Stoichiometry & Organic', value: 'Stoichiometry, Acid-Base Equilibria, Thermochemistry & Organic Reactions' },
    { label: '🧠 Logic & Analytical Series', value: 'Analytical Reasoning, Number Patterns, Syllogisms & Word Aptitude' },
    { label: '🚀 Matrices, Sequences & Complex', value: 'Matrices, Determinants, Arithmetic/Geometric Sequences & Complex Numbers' },
    { label: '🔬 Thermodynamics & Waves', value: 'First/Second Laws of Thermodynamics, Wave Optics & Sound Waves' },
  ];

  // Subject details with icons & colors
  const SUBJECT_CONFIGS: { id: Subject; name: string; icon: React.ReactNode; color: string; bg: string }[] = [
    { id: 'mathematics', name: 'Mathematics', icon: <Calculator className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-600/20 border-blue-500/30' },
    { id: 'physics', name: 'Physics', icon: <Atom className="w-4 h-4" />, color: 'text-cyan-400', bg: 'bg-cyan-600/20 border-cyan-500/30' },
    { id: 'chemistry', name: 'Chemistry', icon: <FlaskConical className="w-4 h-4" />, color: 'text-emerald-400', bg: 'bg-emerald-600/20 border-emerald-500/30' },
    { id: 'aptitude', name: 'Analytical Aptitude', icon: <BrainCircuit className="w-4 h-4" />, color: 'text-amber-400', bg: 'bg-amber-600/20 border-amber-500/30' },
  ];

  const handleToggleSubject = (subj: Subject) => {
    if (customSubjects.includes(subj)) {
      if (customSubjects.length === 1) return; // keep at least 1
      setCustomSubjects(customSubjects.filter(s => s !== subj));
    } else {
      setCustomSubjects([...customSubjects, subj]);
    }
  };

  const handleSelectAllSubjects = () => {
    setCustomSubjects(['mathematics', 'physics', 'chemistry', 'aptitude']);
  };

  // Fallback offline synthesizer from existing question bank
  const synthesizeOfflineExamSet = (count: number, subjects: Subject[], difficulty: string, focus: string): Question[] => {
    let pool = allQuestions.filter(q => subjects.includes(q.subject));
    
    // Filter by difficulty if not mixed
    if (difficulty !== 'mixed') {
      const diffPool = pool.filter(q => q.difficulty === difficulty);
      if (diffPool.length >= count) {
        pool = diffPool;
      }
    }

    // Filter by keyword if specific
    const lowerFocus = focus.toLowerCase();
    const keywordPool = pool.filter(q => 
      q.topic.toLowerCase().includes(lowerFocus) || 
      q.question.toLowerCase().includes(lowerFocus) ||
      (q.shortcutTip && q.shortcutTip.toLowerCase().includes(lowerFocus))
    );

    if (keywordPool.length >= count) {
      pool = keywordPool;
    }

    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Generate AI Mock Exam
  const handleGenerateAIMockExam = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationStep('Connecting to Gemini STEM Exam Engine...');

    const activeFocus = customTopicInput.trim() || customContentFocus;

    try {
      setGenerationStep('Synthesizing high-yield questions & LaTeX formatting...');
      
      const response = await fetch('/api/gemini/generate-exam-set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: customCount,
          subjects: customSubjects,
          contentFocus: activeFocus,
          difficulty: customDifficulty
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error generating questions');
      }

      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No valid questions generated');
      }

      setGenerationStep('Finalizing mock exam test suite & answer keys...');

      const generatedSet: Question[] = data.questions;

      // Optional: add to master bank in App state
      if (onAddCustomQuestionsToBank) {
        onAddCustomQuestionsToBank(generatedSet);
      }

      // Start the generated exam directly
      setExamTitle(`AI Mock: ${customDifficulty.toUpperCase()} • ${customCount} Qs`);
      setExamQuestions(generatedSet);
      
      const calcDuration = durationMinutes > 0 ? durationMinutes : Math.max(10, Math.round(customCount * 1.8));
      setDurationMinutes(calcDuration);
      setTimeLeftSeconds(calcDuration * 60);
      setUserAnswers({});
      setFlaggedIds({});
      setCurrentIndex(0);
      setExamStarted(true);
      setExamCompleted(false);
      setExamResult(null);

    } catch (err: any) {
      console.warn('AI Exam Generation API fallback:', err);
      // Fallback synthesizer so student is NEVER blocked
      setGenerationStep('Creating balanced practice set from AASTU offline vault...');
      
      setTimeout(() => {
        const fallbackSet = synthesizeOfflineExamSet(customCount, customSubjects, customDifficulty, activeFocus);
        
        if (fallbackSet.length === 0) {
          setGenerationError('Could not assemble question set. Please select more subjects or reduce question count.');
          setIsGenerating(false);
          return;
        }

        setExamTitle(`AI Mock (${customDifficulty.toUpperCase()}) • ${fallbackSet.length} Questions`);
        setExamQuestions(fallbackSet);
        
        const calcDuration = durationMinutes > 0 ? durationMinutes : Math.max(10, Math.round(fallbackSet.length * 1.8));
        setDurationMinutes(calcDuration);
        setTimeLeftSeconds(calcDuration * 60);
        setUserAnswers({});
        setFlaggedIds({});
        setCurrentIndex(0);
        setExamStarted(true);
        setExamCompleted(false);
        setExamResult(null);
        setIsGenerating(false);
      }, 700);
      return;
    } finally {
      setIsGenerating(false);
    }
  };

  // Start standard 22-question benchmark exam
  const handleStartStandardExam = () => {
    const mathQs = allQuestions.filter(q => q.subject === 'mathematics');
    const physQs = allQuestions.filter(q => q.subject === 'physics');
    const chemQs = allQuestions.filter(q => q.subject === 'chemistry');
    const aptQs = allQuestions.filter(q => q.subject === 'aptitude');

    const selected = [
      ...mathQs.slice(0, 7),
      ...physQs.slice(0, 6),
      ...chemQs.slice(0, 5),
      ...aptQs.slice(0, 4)
    ];

    const finalSet = selected.length > 0 ? selected : allQuestions;

    setExamTitle('Standard AASTU Entrance Benchmark (22 Qs)');
    setExamQuestions(finalSet);
    setDurationMinutes(45);
    setTimeLeftSeconds(45 * 60);
    setUserAnswers({});
    setFlaggedIds({});
    setCurrentIndex(0);
    setExamStarted(true);
    setExamCompleted(false);
    setExamResult(null);
  };

  // Timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examCompleted && timeLeftSeconds > 0) {
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
  }, [examStarted, examCompleted, timeLeftSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optIndex: number) => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setUserAnswers(prev => ({
      ...prev,
      [q.id]: optIndex
    }));
  };

  const handleToggleFlag = () => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setFlaggedIds(prev => ({
      ...prev,
      [q.id]: !prev[q.id]
    }));
  };

  const handleSubmitExam = () => {
    const totalTimeSpent = (durationMinutes * 60) - timeLeftSeconds;
    let correctCount = 0;
    const wrongList: Question[] = [];

    const breakdown: ExamResult['subjectBreakdown'] = {
      mathematics: { total: 0, correct: 0 },
      physics: { total: 0, correct: 0 },
      chemistry: { total: 0, correct: 0 },
      aptitude: { total: 0, correct: 0 },
    };

    const answersReport = examQuestions.map(q => {
      const selected = userAnswers[q.id] !== undefined ? userAnswers[q.id] : null;
      const isCorrect = selected === q.correctAnswer;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongList.push(q);
      }

      if (breakdown[q.subject]) {
        breakdown[q.subject].total++;
        if (isCorrect) breakdown[q.subject].correct++;
      }

      return {
        questionId: q.id,
        userSelected: selected,
        isCorrect
      };
    });

    const scorePercentage = Math.round((correctCount / examQuestions.length) * 100);

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      totalQuestions: examQuestions.length,
      correctCount,
      scorePercentage,
      timeSpentSeconds: totalTimeSpent,
      subjectBreakdown: breakdown,
      answers: answersReport
    };

    setExamResult(result);
    setExamCompleted(true);
    setExamStarted(false);

    // Save wrong questions to Mistakes Notebook
    if (wrongList.length > 0) {
      onSaveMistakes(wrongList);
    }

    // Trigger celebration if high score
    if (scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Pre-exam Landing Screen with AI Custom Builder & Standard Modes
  if (!examStarted && !examCompleted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Mode Selector Header Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 shadow-sm">
          <button
            id="exam-mode-ai-custom-btn"
            onClick={() => setExamMode('ai_custom')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              examMode === 'ai_custom'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Custom Exam Generator</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold uppercase">
              NEW
            </span>
          </button>

          <button
            id="exam-mode-standard-btn"
            onClick={() => setExamMode('standard')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              examMode === 'standard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Standard 22-Q AASTU Mock</span>
          </button>
        </div>

        {/* AI Custom Exam Builder Screen */}
        {examMode === 'ai_custom' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  AI Custom Mock Exam Creator
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Customize your mock exam: select question count, specific subjects, topic content, and target difficulty.
                </p>
              </div>
              <div className="text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 self-start">
                <Flame className="w-4 h-4 text-amber-500" />
                Gemini 3.7 Powered
              </div>
            </div>

            {/* 1. Number of Questions */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>1. How Many Questions?</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold normal-case">
                  {customCount} Questions (~{Math.round(customCount * 1.8)} mins)
                </span>
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[5, 10, 15, 20, 25, 30].map((num) => (
                  <button
                    key={num}
                    id={`ai-exam-count-${num}`}
                    type="button"
                    onClick={() => {
                      setCustomCount(num);
                      setDurationMinutes(Math.round(num * 1.8));
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition text-center flex flex-col items-center justify-center gap-0.5 ${
                      customCount === num
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm ring-2 ring-blue-400/40'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-black">{num}</span>
                    <span className="text-[10px] font-normal opacity-80">Questions</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Subject(s) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  2. Select Subject(s) to Include
                </label>
                <button
                  type="button"
                  onClick={handleSelectAllSubjects}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Select All 4 Subjects
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {SUBJECT_CONFIGS.map((s) => {
                  const isSelected = customSubjects.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      id={`ai-exam-subject-${s.id}`}
                      type="button"
                      onClick={() => handleToggleSubject(s.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                        isSelected
                          ? `${s.bg} border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/30 text-slate-900 dark:text-white`
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                          {s.icon}
                        </div>
                        <span className="text-xs font-bold">{s.name}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-slate-600'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Question Difficulty Level */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                3. Target Difficulty Level
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'easy', label: 'Easy', desc: 'Foundations & Direct Formulas', color: 'emerald', border: 'border-emerald-500/40', activeBg: 'bg-emerald-600' },
                  { id: 'medium', label: 'Medium', desc: 'Standard AASTU Exam Level', color: 'blue', border: 'border-blue-500/40', activeBg: 'bg-blue-600' },
                  { id: 'hard', label: 'Hard', desc: 'Challenger / Multi-step Math', color: 'rose', border: 'border-rose-500/40', activeBg: 'bg-rose-600' },
                  { id: 'mixed', label: 'Mixed', desc: 'Realistic Exam Distribution', color: 'indigo', border: 'border-indigo-500/40', activeBg: 'bg-indigo-600' },
                ].map((diff) => {
                  const isSelected = customDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      id={`ai-exam-diff-${diff.id}`}
                      type="button"
                      onClick={() => setCustomDifficulty(diff.id as any)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? `bg-slate-900 dark:bg-slate-800 text-white ${diff.border} ring-2 ring-blue-400/30`
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold capitalize">{diff.label}</span>
                        {isSelected && <span className={`w-2 h-2 rounded-full ${diff.activeBg}`} />}
                      </div>
                      <p className="text-[10px] opacity-80 leading-tight">{diff.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Content & Topic Scope */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                4. Topic / Content Focus Scope
              </label>

              {/* Quick Topic Chips */}
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCustomContentFocus(preset.value);
                      setCustomTopicInput('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      customContentFocus === preset.value && !customTopicInput
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Custom Topic Input */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="ai-custom-topic-input"
                    type="text"
                    value={customTopicInput}
                    onChange={(e) => setCustomTopicInput(e.target.value)}
                    placeholder="Or type specific topics (e.g. 'Integrals, Projectile Motion & Acid-Base titrations')..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {customTopicInput && (
                    <button
                      type="button"
                      onClick={() => setCustomTopicInput('')}
                      className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 5. Exam Duration Timing */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>5. Exam Timer Limit</span>
                </label>
                <span className="text-xs font-bold text-slate-500">
                  {durationMinutes > 0 ? `${durationMinutes} Minutes` : 'Untimed Practice'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Auto (Recommended)', mins: Math.round(customCount * 1.8) },
                  { label: '15 Mins', mins: 15 },
                  { label: '30 Mins', mins: 30 },
                  { label: '45 Mins', mins: 45 },
                  { label: '60 Mins', mins: 60 },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setDurationMinutes(t.mins)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      durationMinutes === t.mins
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {generationError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Generate & Launch Action Button */}
            <div className="pt-2">
              <button
                id="generate-ai-mock-exam-btn"
                type="button"
                onClick={handleGenerateAIMockExam}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                    <span>{generationStep || 'Generating Custom AI Exam...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span>Generate & Launch {customCount}-Question AI Mock Exam</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Standard Benchmark Mock Exam Mode */}
        {examMode === 'standard' && (
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white border border-blue-800/40 shadow-xl text-center space-y-5">
            <div className="inline-flex p-3 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-blue-300 mx-auto">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Standard AASTU Entrance Mock Exam
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Full-length 22-question benchmark exam balancing Mathematics, Physics, Chemistry, and Analytical Aptitude under standard 45-minute timed exam conditions.
            </p>

            {/* Exam Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-left">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Total Questions</div>
                <div className="text-lg font-bold text-white">22 Questions</div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Time Limit</div>
                <div className="text-lg font-bold text-blue-400">45 Minutes</div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Pacing</div>
                <div className="text-lg font-bold text-emerald-400">~2 min / Q</div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Passing Target</div>
                <div className="text-lg font-bold text-amber-400">75%+ Score</div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4">
              <button
                id="start-standard-exam-btn"
                onClick={handleStartStandardExam}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 mx-auto"
              >
                Start Standard Mock Exam <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Exam In-Progress Screen
  if (examStarted && !examCompleted) {
    const currentQ = examQuestions[currentIndex];
    const isAnswered = userAnswers[currentQ?.id] !== undefined;
    const isFlagged = Boolean(flaggedIds[currentQ?.id]);
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="space-y-4">
        {/* Exam Control Top Bar */}
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-blue-400 truncate max-w-[200px] sm:max-w-none">
              {examTitle}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Answered: <strong className="text-white">{answeredCount}</strong> / {examQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Countdown timer badge */}
            <div className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 border ${
              timeLeftSeconds < 300 
                ? 'bg-rose-950 text-rose-300 border-rose-700 animate-pulse' 
                : 'bg-slate-800 text-amber-300 border-slate-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area (3 Cols) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 uppercase">
                  {currentQ?.subject}
                </span>
                <span className="text-xs text-slate-500 font-medium truncate max-w-[180px] sm:max-w-none">
                  {currentQ?.topic}
                </span>
                {currentQ?.difficulty && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    currentQ.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    currentQ.difficulty === 'hard' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                )}
              </div>

              <button
                onClick={handleToggleFlag}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
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

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ?.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    id={`mock-opt-${idx}`}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition flex items-center justify-between text-xs sm:text-base gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-semibold ring-2 ring-blue-400/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="overflow-x-auto"><MathRenderer text={opt} /></span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-600 text-white' 
                        : 'border-slate-300 dark:border-slate-700 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>

              <span className="text-xs text-slate-500 font-medium">
                {currentIndex + 1} of {examQuestions.length}
              </span>

              <button
                onClick={() => setCurrentIndex(Math.min(examQuestions.length - 1, currentIndex + 1))}
                disabled={currentIndex === examQuestions.length - 1}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Question Navigator
            </h4>

            {/* Color Legend */}
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

            {/* Number grid */}
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
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition ${btnBg} ${
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
                onClick={handleSubmitExam}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition text-center"
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

    const filteredReportQuestions = examQuestions.filter(q => {
      const rep = examResult.answers.find(a => a.questionId === q.id);
      if (reviewFilter === 'incorrect') return rep && !rep.isCorrect;
      if (reviewFilter === 'flagged') return Boolean(flaggedIds[q.id]);
      return true;
    });

    return (
      <div className="space-y-6">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white border border-blue-800/40 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-800/60 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {examTitle} • Performance Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Diagnostic Score: {examResult.scorePercentage}%
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                {examResult.scorePercentage >= 75
                  ? '🎉 Outstanding! You are well-positioned for the AASTU Entrance Exam.'
                  : examResult.scorePercentage >= 50
                  ? '👍 Good progress! Focus on your weak subject areas below to push into top ranking.'
                  : '💪 Keep pushing! Review the step-by-step explanations and repeat the 5-day daily plan.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setExamStarted(false);
                  setExamCompleted(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Create Another Mock Exam
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
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
            {(Object.entries(examResult.subjectBreakdown) as [string, { total: number; correct: number }][]).map(([subj, stats]) => {
              if (stats.total === 0) return null;
              const subjPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={subj} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>{subj}</span>
                    <span className={subjPct >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}>
                      {subjPct}%
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {stats.correct} of {stats.total} correct
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${subjPct >= 70 ? 'bg-emerald-500' : subjPct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${subjPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In-Depth Question Review Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Full Answer Review & Step-by-Step Solutions ({filteredReportQuestions.length} Questions)
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5">
              {(['all', 'incorrect', 'flagged'] as ('all' | 'incorrect' | 'flagged')[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
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
              const rep = examResult.answers.find(a => a.questionId === q.id);
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
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                        {q.subject}
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

                      <button
                        onClick={() => onOpenAITutorWithQuestion(q)}
                        className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Ask AI Tutor
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base overflow-x-auto">
                    <MathRenderer text={q.question} />
                  </div>

                  {/* Options with markers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = userPick === oIdx;
                      const isAnswer = q.correctAnswer === oIdx;

                      let badgeClass = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                      if (isAnswer) {
                        badgeClass = 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isChosen && !isAnswer) {
                        badgeClass = 'border-rose-500 bg-rose-100/60 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 line-through';
                      }

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-lg border flex items-center justify-between ${badgeClass}`}>
                          <span className="overflow-x-auto"><MathRenderer text={opt} /></span>
                          {isAnswer && <span className="text-[10px] font-bold uppercase bg-emerald-600 text-white px-1.5 py-0.5 rounded shrink-0">Correct</span>}
                          {isChosen && !isAnswer && <span className="text-[10px] font-bold uppercase bg-rose-600 text-white px-1.5 py-0.5 rounded shrink-0">Your Pick</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Explanation */}
                  <div className="bg-slate-50 dark:bg-slate-800/90 rounded-lg p-3.5 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                    <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Solution Breakdown:</strong>
                    <MathRenderer text={q.explanation} />
                    {q.shortcutTip && (
                      <div className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-800/40">
                        ⚡ <strong>Exam Tip:</strong> {q.shortcutTip}
                      </div>
                    )}
                  </div>
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
