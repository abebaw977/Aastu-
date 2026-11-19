import React, { useState, useRef, useEffect } from 'react';
import {
  CalendarDays,
  Library,
  GraduationCap,
  BrainCircuit,
  RotateCcw,
  ChevronDown,
  FileText,
  ShieldCheck,
  LogOut,
  User,
  Lock,
  Settings,
  Palette,
} from 'lucide-react';
import { AuthUser, ThemeMode } from '../types';

export type NavTab =
  | 'plan'
  | 'modules'
  | 'pdfs'
  | 'formulas'
  | 'mock'
  | 'flashcards'
  | 'mistakes'
  | 'notes'
  | 'guides';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  completedTasksCount: number;
  totalTasksCount: number;
  mistakesCount: number;
  onToggleA04Simulator?: () => void;
  isA04SimActive?: boolean;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onOpenAdminPanel?: () => void;
  onOpenPaymentModal?: () => void;
  onOpenSettingsModal?: () => void;
  themeMode?: ThemeMode;
  onChangeThemeMode?: (mode: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  mistakesCount,
  currentUser,
  onLogout,
  onOpenAdminPanel,
  onOpenPaymentModal,
  onOpenSettingsModal,
  themeMode = 'blue',
  onChangeThemeMode,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMoreOpen) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMoreOpen]);

  const isTabActive = (tabKey: NavTab) => {
    if (activeTab === tabKey) return true;
    if (tabKey === 'modules' && activeTab === 'notes') return true;
    if (tabKey === 'pdfs' && (activeTab === 'formulas' || activeTab === 'guides')) return true;
    return false;
  };

  const mainNavItems: {
    id: NavTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'plan',
      label: 'Subjects',
      icon: <CalendarDays className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'modules',
      label: 'Notes',
      icon: <Library className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'mock',
      label: 'Exams',
      icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'pdfs',
      label: 'PDFs',
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: <BrainCircuit className="w-4 h-4 text-teal-400" />,
    },
  ];

  const cycleThemeMode = () => {
    if (!onChangeThemeMode) return;
    const order: ThemeMode[] = ['blue', 'black', 'white'];
    const current: ThemeMode = (themeMode === 'black' || themeMode === 'white') ? themeMode : 'blue';
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    onChangeThemeMode(order[nextIdx]);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-sm pt-safe select-none">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6">
        <div className="flex items-center justify-between gap-1.5 xs:gap-3 h-14">
          {/* Zone 1: Clean Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-1.5 xs:gap-2 cursor-pointer min-w-0 active:scale-[0.99] text-left shrink-0"
          >
            <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-lg xs:rounded-xl bg-blue-600 flex items-center justify-center font-black text-[11px] xs:text-xs tracking-wider text-white shrink-0">
              AB
            </div>
            <span className="font-bold text-xs xs:text-sm sm:text-base text-white tracking-tight whitespace-nowrap truncate">
              ABEFA
            </span>
          </button>

          {/* Zone 2: Direct 1-Tap Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const active = isTabActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold cursor-pointer transition whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              id="nav-tab-mistakes"
              onClick={() => setActiveTab('mistakes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold cursor-pointer transition whitespace-nowrap shrink-0 ${
                isTabActive('mistakes')
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span>Mistakes{mistakesCount > 0 ? ` (${mistakesCount})` : ''}</span>
            </button>
          </nav>

          {/* Zone 3: 1-Tap Quick Actions (Theme, Settings, Account / Unlock) */}
          <div className="flex items-center gap-1 xs:gap-1.5 shrink-0">
            {/* 1-Tap Theme Mode Cycle Button (Blue / Black / White) */}
            {onChangeThemeMode && (
              <button
                type="button"
                onClick={cycleThemeMode}
                title={`Background Mode: ${themeMode.toUpperCase()} (Tap to switch Blue / Black / White)`}
                className="flex items-center gap-1 p-1.5 xs:px-2.5 xs:py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
              >
                <Palette className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="capitalize hidden sm:inline">{themeMode}</span>
              </button>
            )}

            {/* 1-Tap Settings Button */}
            {onOpenSettingsModal && (
              <button
                type="button"
                onClick={onOpenSettingsModal}
                title="Settings & Edit Profile"
                className="flex items-center gap-1 p-1.5 xs:px-2.5 xs:py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
              >
                <Settings className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            )}

            {/* Account & Logout Dropdown on Desktop */}
            <div className="relative hidden lg:block" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="max-w-[90px] truncate">
                  {currentUser?.username || 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
                  {currentUser && (
                    <div className="px-3.5 py-2 border-b border-slate-800 text-xs flex items-center justify-between">
                      <span className="font-semibold text-white truncate">
                        {currentUser.username}
                      </span>
                      <span
                        className={`font-bold ${
                          currentUser.role === 'admin' ||
                          currentUser.accountStatus === 'APPROVED'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {currentUser.role === 'admin'
                          ? 'Admin'
                          : currentUser.accountStatus === 'APPROVED'
                          ? 'Verified'
                          : 'Free Tier'}
                      </span>
                    </div>
                  )}

                  {onChangeThemeMode && (
                    <div className="px-3.5 py-2 border-b border-slate-800">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                        Background Color
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['blue', 'black', 'white'] as ThemeMode[]).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => onChangeThemeMode(mode)}
                            className={`py-1.5 rounded-lg text-xs font-bold capitalize border cursor-pointer ${
                              themeMode === mode
                                ? 'bg-blue-600 text-white border-blue-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {onOpenSettingsModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreOpen(false);
                        onOpenSettingsModal();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs flex items-center gap-2 text-slate-200 hover:bg-slate-800 font-semibold cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-sky-400" />
                      <span>Edit Profile & Password</span>
                    </button>
                  )}

                  {onLogout && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs flex items-center gap-2 text-rose-300 hover:bg-slate-800 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {currentUser &&
              currentUser.role !== 'admin' &&
              currentUser.accountStatus !== 'APPROVED' &&
              onOpenPaymentModal && (
                <button
                  type="button"
                  id="navbar-unlock-payment-btn"
                  onClick={onOpenPaymentModal}
                  className="flex items-center gap-1 px-2 xs:px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Unlock<span className="hidden xs:inline"> (50 ETB)</span></span>
                </button>
              )}

            {currentUser?.role === 'admin' && onOpenAdminPanel && (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
