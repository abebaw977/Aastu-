import React, { useState } from 'react';
import {
  CalendarDays,
  Library,
  GraduationCap,
  BrainCircuit,
  RotateCcw,
  MoreHorizontal,
  X,
  FileText,
  ShieldCheck,
  LogOut,
  User,
  Lock,
  Settings,
  Palette,
} from 'lucide-react';
import { NavTab } from './Navbar';
import { AuthUser, ThemeMode } from '../types';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
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

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
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
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  const isTabActive = (tabKey: NavTab) => {
    if (activeTab === tabKey) return true;
    if (tabKey === 'modules' && activeTab === 'notes') return true;
    if (tabKey === 'pdfs' && (activeTab === 'formulas' || activeTab === 'guides')) return true;
    return false;
  };

  const primaryTabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'plan', label: 'Subjects', icon: <CalendarDays className="w-4 h-4 xs:w-5 xs:h-5" /> },
    { id: 'modules', label: 'Notes', icon: <Library className="w-4 h-4 xs:w-5 xs:h-5" /> },
    { id: 'mock', label: 'Exams', icon: <GraduationCap className="w-4 h-4 xs:w-5 xs:h-5" /> },
    { id: 'pdfs', label: 'PDFs', icon: <FileText className="w-4 h-4 xs:w-5 xs:h-5" /> },
  ];

  const secondaryTabs: {
    id: NavTab;
    label: string;
    subtitle: string;
    icon: React.ReactNode;
    badge?: number | string;
    color: string;
  }[] = [
    {
      id: 'flashcards',
      label: 'Flashcards',
      subtitle: 'Quick formula & definition cards',
      icon: <BrainCircuit className="w-5 h-5 text-teal-400" />,
      color: 'bg-teal-950/60 border-teal-800/60',
    },
    {
      id: 'mistakes',
      label: 'Mistakes Review',
      subtitle: 'Practice questions you missed',
      icon: <RotateCcw className="w-5 h-5 text-rose-400" />,
      badge: mistakesCount > 0 ? mistakesCount : undefined,
      color: 'bg-rose-950/60 border-rose-800/60',
    },
  ];

  const isSecondaryActive = secondaryTabs.some((t) => isTabActive(t.id));

  const handleSelectTab = (tab: NavTab) => {
    setShowMoreSheet(false);
    setActiveTab(tab);
  };

  return (
    <>
      {showMoreSheet && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 flex flex-col justify-end lg:hidden"
          onClick={() => setShowMoreSheet(false)}
        >
          <div
            className="bg-slate-900 border-t border-slate-700 rounded-t-3xl p-4 pb-8 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-slate-700 rounded-full mx-auto mb-1" />

            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-white">More Study Tools & Settings</h3>
              <button
                type="button"
                onClick={() => setShowMoreSheet(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary Study Tools */}
            <div className="grid grid-cols-2 gap-2.5">
              {secondaryTabs.map((item) => {
                const active = isTabActive(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer active:scale-[0.98] flex flex-col justify-between gap-2 ${
                      active
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : `${item.color} text-slate-200`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                        {item.icon}
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instant Background Mode Switcher: Blue / Black / White */}
            {onChangeThemeMode && (
              <div className="p-3 rounded-2xl border bg-slate-950/80 border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Palette className="w-4 h-4 text-indigo-400" />
                    <span>Background Color</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['blue', 'black', 'white'] as ThemeMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => onChangeThemeMode(mode)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize border cursor-pointer active:scale-95 ${
                        themeMode === mode
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Settings & Edit Profile */}
            {onOpenSettingsModal && (
              <button
                type="button"
                onClick={() => {
                  setShowMoreSheet(false);
                  onOpenSettingsModal();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border bg-slate-800/80 border-slate-700 text-left cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Profile & Password Settings</div>
                    <div className="text-[11px] text-slate-400">
                      Edit username, phone number & password
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-400">Open</span>
              </button>
            )}

            {currentUser && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold truncate">
                    <User className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{currentUser.username}</span>
                    <span className="text-[10px] text-slate-400">({currentUser.phoneNumber})</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      currentUser.role === 'admin' || currentUser.accountStatus === 'APPROVED'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {currentUser.role === 'admin'
                      ? 'Admin'
                      : currentUser.accountStatus === 'APPROVED'
                      ? 'Approved'
                      : 'Free Tier'}
                  </span>
                </div>

                {currentUser.role !== 'admin' &&
                  currentUser.accountStatus !== 'APPROVED' &&
                  onOpenPaymentModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreSheet(false);
                        onOpenPaymentModal();
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl border bg-emerald-950/60 border-emerald-500/40 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-emerald-400" />
                        <div className="text-xs font-bold text-white">
                          Unlock All 17 Courses (40 ETB · 20 Birr Off)
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-300">Unlock</span>
                    </button>
                  )}

                {currentUser.role === 'admin' && onOpenAdminPanel && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreSheet(false);
                      onOpenAdminPanel();
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border bg-amber-950/60 border-amber-500/40 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <div className="text-xs font-bold text-white">Open Admin Panel</div>
                    </div>
                  </button>
                )}

                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreSheet(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border bg-rose-950/50 border-rose-500/30 text-rose-300 text-xs font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav
        id="freshman-bottom-nav"
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 lg:hidden pb-safe shadow-lg select-none"
      >
        <div className="grid grid-cols-5 h-14 xs:h-16 max-w-md mx-auto px-0.5 xs:px-1">
          {primaryTabs.map((item) => {
            const active = isTabActive(item.id) && !showMoreSheet;
            return (
              <button
                key={item.id}
                type="button"
                id={`mobile-nav-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 xs:gap-1 cursor-pointer min-h-[44px] active:scale-95 px-0.5 ${
                  active ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {active && (
                  <span className="absolute top-0 w-6 xs:w-7 h-1 bg-blue-500 rounded-b-full" />
                )}
                <div>{item.icon}</div>
                <span
                  className={`text-[9.5px] xs:text-[10px] tracking-tight leading-none truncate max-w-[50px] xs:max-w-none text-center ${
                    active ? 'font-bold text-white' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            id="mobile-nav-more"
            onClick={() => setShowMoreSheet((prev) => !prev)}
            className={`relative flex flex-col items-center justify-center gap-0.5 xs:gap-1 cursor-pointer min-h-[44px] active:scale-95 px-0.5 ${
              isSecondaryActive || showMoreSheet
                ? 'text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {(isSecondaryActive || showMoreSheet) && (
              <span className="absolute top-0 w-6 xs:w-7 h-1 bg-indigo-500 rounded-b-full" />
            )}
            <div className="relative">
              <MoreHorizontal className="w-4 h-4 xs:w-5 xs:h-5" />
              {mistakesCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[14px] h-[14px] px-1 rounded-full bg-rose-500 text-white text-[8.5px] font-bold flex items-center justify-center">
                  {mistakesCount > 9 ? '9+' : mistakesCount}
                </span>
              )}
            </div>
            <span
              className={`text-[9.5px] xs:text-[10px] tracking-tight leading-none truncate max-w-[50px] xs:max-w-none text-center ${
                isSecondaryActive || showMoreSheet ? 'font-bold text-white' : 'font-medium'
              }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
