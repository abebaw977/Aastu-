import React from 'react';
import { 
  CalendarDays, 
  BookOpen, 
  FileSpreadsheet, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Flame, 
  GraduationCap, 
  Library,
  Smartphone
} from 'lucide-react';

export type NavTab = 'plan' | 'notes' | 'practice' | 'mock' | 'guides' | 'flashcards' | 'tutor' | 'mistakes';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  completedTasksCount: number;
  totalTasksCount: number;
  mistakesCount: number;
  onToggleA04Simulator?: () => void;
  isA04SimActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedTasksCount,
  totalTasksCount,
  mistakesCount,
  onToggleA04Simulator,
  isA04SimActive = false,
}) => {
  const planProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'plan', label: '5-Day Plan', icon: <CalendarDays className="w-4 h-4" />, badge: `${planProgress}%` },
    { id: 'notes', label: 'AASTU Master Notes', icon: <Library className="w-4 h-4 text-emerald-400" />, badge: 'Extensive' },
    { id: 'practice', label: 'Practice Sets', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'mock', label: 'Mock Exam Simulator', icon: <GraduationCap className="w-4 h-4" />, badge: 'Timed' },
    { id: 'guides', label: 'Formula & Guides', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards Drill', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'tutor', label: 'AI Study Coach', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { 
      id: 'mistakes', 
      label: 'Mistakes Notebook', 
      icon: <RotateCcw className="w-4 h-4" />, 
      badge: mistakesCount > 0 ? mistakesCount : undefined 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('plan')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-sm sm:text-base tracking-wider text-white shadow-inner shadow-blue-400 shrink-0">
              AASTU
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight text-white flex items-center gap-1.5">
                AASTU Prep
                <span className="text-[9px] uppercase font-bold tracking-widest bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded border border-blue-500/30">
                  STEM 2026
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                8 Days Left • 5-Day Fast-Track Blueprint
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {onToggleA04Simulator && (
              <button
                id="samsung-a04-sim-header-btn"
                onClick={onToggleA04Simulator}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                  isA04SimActive
                    ? 'bg-blue-600 border-blue-400 text-white shadow-sm'
                    : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800 text-slate-300'
                }`}
                title="Toggle Samsung Galaxy A04 (360px) Device Frame"
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Samsung A04 View</span>
              </button>
            )}

            {/* Desktop Tab Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive 
                          ? 'bg-blue-900/60 text-blue-100' 
                          : item.id === 'mistakes' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 text-slate-300 text-xs sm:hidden">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">{planProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
