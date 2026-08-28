import React, { useState } from 'react';
import { NavTab } from './Navbar';
import { 
  CalendarDays, 
  Library, 
  BookOpen, 
  FileSpreadsheet, 
  Sparkles, 
  GraduationCap, 
  BrainCircuit, 
  RotateCcw, 
  Menu, 
  X,
  Smartphone,
  Edit3,
  Flame,
  CheckCircle2,
  ChevronUp
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  completedTasksCount: number;
  totalTasksCount: number;
  mistakesCount: number;
  onOpenScratchpad: () => void;
  onToggleA04Simulator: () => void;
  isA04SimActive: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  completedTasksCount,
  totalTasksCount,
  mistakesCount,
  onOpenScratchpad,
  onToggleA04Simulator,
  isA04SimActive,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mainTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'plan', label: '5-Day Plan', icon: <CalendarDays className="w-5 h-5" /> },
    { id: 'notes', label: 'Notes', icon: <Library className="w-5 h-5" /> },
    { id: 'practice', label: 'Practice', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'guides', label: 'Formulas', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { id: 'tutor', label: 'AI Coach', icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
  ];

  const secondaryTabs: { id: NavTab; label: string; description: string; icon: React.ReactNode; badge?: string | number }[] = [
    { 
      id: 'mock', 
      label: 'Mock Exam Simulator', 
      description: 'Timed 45-min full AASTU entrance simulation',
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
      badge: 'Timed'
    },
    { 
      id: 'flashcards', 
      label: 'Flashcards Speed Drill', 
      description: 'Spaced repetition memory cards for speed recall',
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />
    },
    { 
      id: 'mistakes', 
      label: 'Mistakes Notebook', 
      description: 'Review and master questions you previously missed',
      icon: <RotateCcw className="w-5 h-5 text-rose-400" />,
      badge: mistakesCount > 0 ? mistakesCount : undefined
    },
  ];

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Slide-up Bottom Drawer / More Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div 
            className="absolute inset-0"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 text-white max-h-[85vh] overflow-y-auto pb-safe shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
                  <Smartphone className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">AASTU Mobile Hub</h3>
                  <p className="text-[11px] text-slate-400">Optimized for Samsung Galaxy A04 (360px)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Mobile Tools */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onOpenScratchpad();
                }}
                className="p-3 bg-slate-800/90 hover:bg-slate-800 rounded-xl border border-slate-700/80 text-left transition flex items-center gap-2.5"
              >
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Scratchpad</div>
                  <div className="text-[10px] text-slate-400">Rough calculations</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onToggleA04Simulator();
                }}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                  isA04SimActive 
                    ? 'bg-blue-600/30 border-blue-500 text-white' 
                    : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80'
                }`}
              >
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Samsung A04 Frame</div>
                  <div className="text-[10px] text-slate-400">{isA04SimActive ? 'Enabled' : 'Toggle 360px View'}</div>
                </div>
              </button>
            </div>

            {/* All Exam Modules */}
            <div className="mt-5 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                More Modules & Drills
              </div>
              {secondaryTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      isActive 
                        ? 'bg-blue-600/20 border-blue-500 text-white' 
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                        {tab.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {tab.label}
                          {tab.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-blue-900/60 text-blue-300 border border-blue-700/40">
                              {tab.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{tab.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Progress summary widget */}
            <div className="mt-5 p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>5-Day Plan Progress:</span>
              </div>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {completedTasksCount} / {totalTasksCount} tasks
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom App Bar */}
      <nav 
        id="samsung-a04-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 text-white shadow-2xl lg:hidden pb-safe"
      >
        <div className="grid grid-cols-6 items-center px-1 py-1.5 max-w-md mx-auto">
          {mainTabs.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 touch-target ${
                  isActive
                    ? 'text-blue-400 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`relative p-1 rounded-lg transition ${
                  isActive ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-sm' : ''
                }`}>
                  {item.icon}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'text-blue-300 font-extrabold' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More Drawer Button */}
          <button
            id="mobile-tab-more"
            onClick={() => setIsDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 touch-target ${
              isDrawerOpen || secondaryTabs.some(t => t.id === activeTab)
                ? 'text-indigo-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`relative p-1 rounded-lg transition ${
              secondaryTabs.some(t => t.id === activeTab) ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-400' : ''
            }`}>
              <Menu className="w-5 h-5" />
              {mistakesCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-rose-500 text-[8px] text-white font-bold flex items-center justify-center ring-2 ring-slate-950">
                  {mistakesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 text-slate-400">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
