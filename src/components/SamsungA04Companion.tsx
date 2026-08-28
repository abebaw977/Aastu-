import React, { useState, useRef, useEffect } from 'react';
import { ALL_FORMULAS } from '../data/formulas';
import { FormulaItem, Subject } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  Smartphone, 
  Timer, 
  Edit3, 
  BookOpen, 
  X, 
  RotateCcw, 
  Eraser, 
  Play, 
  Pause, 
  Search, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  Zap,
  Flame,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface SamsungA04CompanionProps {
  isSimActive: boolean;
  onToggleSim: () => void;
  isScratchpadOpen: boolean;
  onCloseScratchpad: () => void;
  onOpenScratchpad: () => void;
}

export const SamsungA04Companion: React.FC<SamsungA04CompanionProps> = ({
  isSimActive,
  onToggleSim,
  isScratchpadOpen,
  onCloseScratchpad,
  onOpenScratchpad,
}) => {
  // Mini 30-Sec Pocket Stopwatch HUD
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quick Formula Peek Bottom Sheet
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);
  const [formulaSearch, setFormulaSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Touch Scratchpad Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#3b82f6');
  const [penSize, setPenSize] = useState(3);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = (sec: number = 30) => {
    setTimerSeconds(sec);
    setIsTimerRunning(true);
  };

  const handleResetTimer = (sec: number = 30) => {
    setIsTimerRunning(false);
    setTimerSeconds(sec);
  };

  // Scratchpad drawing logic
  useEffect(() => {
    if (isScratchpadOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio || 360;
      canvas.height = rect.height * window.devicePixelRatio || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isScratchpadOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Filtered Formulas for Quick-Peek Drawer
  const filteredPeekFormulas = ALL_FORMULAS.filter(f => {
    const matchSubj = selectedSubject === 'all' || f.subject === selectedSubject;
    const q = formulaSearch.toLowerCase().trim();
    const matchQ = !q || 
      f.name.toLowerCase().includes(q) || 
      f.topic.toLowerCase().includes(q) || 
      f.formula.toLowerCase().includes(q);
    return matchSubj && matchQ;
  }).slice(0, 40);

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  return (
    <>
      {/* Floating Speed Widget on Mobile for Samsung A04 users */}
      <div className="fixed bottom-18 right-3 z-30 flex flex-col gap-2 items-end lg:bottom-6 lg:right-6">
        {/* Quick 30-Sec Timer HUD */}
        {isTimerOpen ? (
          <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-3 shadow-2xl text-white w-64 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Timer className="w-4 h-4 text-amber-400" />
                <span>30-Sec Speed HUD</span>
              </div>
              <button 
                onClick={() => setIsTimerOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-center">
              <div className={`text-3xl font-black font-mono tracking-wider ${
                timerSeconds <= 5 ? 'text-rose-500 animate-ping' : timerSeconds <= 10 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">AASTU Target Pace: 30-45s / Question</div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  isTimerRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => handleResetTimer(30)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> 30s
              </button>
              <button
                onClick={() => handleResetTimer(45)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                45s
              </button>
            </div>
          </div>
        ) : (
          <button
            id="samsung-a04-speed-timer-btn"
            onClick={() => setIsTimerOpen(true)}
            className="p-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 text-xs font-bold border border-amber-400/40"
            title="Open 30s Speed Timer HUD"
          >
            <Timer className="w-4 h-4" />
            <span className="hidden sm:inline">30s Timer</span>
          </button>
        )}

        {/* Quick Formula Search Peek Button */}
        <button
          id="samsung-a04-formula-peek-btn"
          onClick={() => setIsFormulaSheetOpen(true)}
          className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 text-xs font-bold border border-blue-400/40"
          title="Quick 350+ Formula Peek"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Formula Peek</span>
        </button>

        {/* Quick Scratchpad Floating Button */}
        <button
          id="samsung-a04-scratchpad-btn"
          onClick={onOpenScratchpad}
          className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 text-xs font-bold border border-purple-400/40"
          title="Open Calculation Scratchpad"
        >
          <Edit3 className="w-4 h-4" />
          <span className="hidden sm:inline">Scratchpad</span>
        </button>
      </div>

      {/* Quick Formula Peek Bottom Sheet */}
      {isFormulaSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="absolute inset-0" onClick={() => setIsFormulaSheetOpen(false)} />
          <div className="relative bg-slate-900 border-t border-blue-800 rounded-t-3xl p-4 text-white max-h-[80vh] flex flex-col pb-safe shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Grab Bar */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">Instant Formula Peek</h3>
                  <p className="text-[11px] text-slate-400">Search 350+ formulas without leaving your question</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFormulaSheetOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Subject filter */}
            <div className="py-2.5 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formulaSearch}
                  onChange={(e) => setFormulaSearch(e.target.value)}
                  placeholder="Search formula (e.g., quadratic, Snell, mole, velocity)..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude'] as (Subject | 'all')[]).map(subj => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap capitalize transition ${
                      selectedSubject === subj
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {subj === 'aptitude' ? 'Aptitude' : subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 mt-1">
              {filteredPeekFormulas.map(item => (
                <div 
                  key={item.id}
                  className="p-3 bg-slate-800/70 border border-slate-700/60 rounded-xl hover:border-blue-500/50 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-300">{item.name}</span>
                    <button
                      onClick={() => handleCopy(item.formula, item.id)}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-700/60 px-2 py-0.5 rounded"
                    >
                      {copiedFormulaId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedFormulaId === item.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="my-1.5 py-1.5 px-2 bg-slate-950 rounded-lg text-center overflow-x-auto text-blue-200 border border-slate-800">
                    <MathRenderer latex={item.formula} displayMode />
                  </div>
                  {item.examTip && (
                    <div className="text-[11px] text-amber-300 bg-amber-950/30 px-2 py-1 rounded border border-amber-800/40 mt-1">
                      ⚡ <strong>30s Hack:</strong> {item.examTip}
                    </div>
                  )}
                </div>
              ))}
              {filteredPeekFormulas.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  No formula matched "{formulaSearch}". Try another keyword.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Scratchpad Dialog */}
      {isScratchpadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl text-white h-[85vh] max-h-[650px] overflow-hidden">
            {/* Scratchpad Header */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">Calculation Scratchpad</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">Rough work for Samsung A04</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCanvas}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Eraser className="w-3.5 h-3.5 text-rose-400" /> Clear
                </button>
                <button
                  onClick={onCloseScratchpad}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-slate-950 relative touch-none cursor-crosshair">
              <canvas
                ref={canvasRef}
                className="w-full h-full block"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <div className="absolute top-2 left-2 pointer-events-none text-[10px] text-slate-600">
                Draw or scribble equations with your finger or stylus
              </div>
            </div>

            {/* Drawing Controls */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Color:</span>
                {['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#ffffff'].map(color => (
                  <button
                    key={color}
                    onClick={() => setPenColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      penColor === color ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-80'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Stroke:</span>
                {[2, 4, 6].map(size => (
                  <button
                    key={size}
                    onClick={() => setPenSize(size)}
                    className={`px-2 py-0.5 text-xs rounded border transition ${
                      penSize === size ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {size === 2 ? 'Fine' : size === 4 ? 'Med' : 'Thick'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
