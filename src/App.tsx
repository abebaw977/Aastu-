import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SamsungA04Companion } from './components/SamsungA04Companion';
import { SamsungA04DeviceView } from './components/SamsungA04DeviceView';
import { DailyPlanView } from './components/DailyPlanView';
import { CourseModulesView } from './components/CourseModulesView';
import { MockExamView } from './components/MockExamView';
import { FlashcardsView } from './components/FlashcardsView';
import { MistakesNotebookView } from './components/MistakesNotebookView';
import { AuthGateView } from './components/AuthGateView';
import { PaymentGateView } from './components/PaymentGateView';
import { PublishedPdfsView } from './components/PublishedPdfsView';
import { FRESHMAN_SEMESTER_PLAN } from './data/freshmanStudyPlan';
import {
  Question,
  Subject,
  UserStudyNote,
  SavedExamRecord,
  CustomCourseOutline,
  AuthUser,
  PaymentRequestRecord,
  ThemeMode,
} from './types';
import { AddEditCourseSyllabusModal } from './components/AddEditCourseSyllabusModal';
import { UserSettingsModal } from './components/UserSettingsModal';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import {
  getSavedAuthToken,
  getCachedAuthUser,
  getCachedLatestPayment,
  saveCachedSession,
  fetchCurrentSession,
  logoutUser,
  clearAuthToken,
  isFreeCourseSubject,
} from './utils/authPaymentService';
import { initAndroidNativeBridge } from './utils/capacitorAndroid';
import { 
  loadUserNotes, 
  saveUserNotesToStorage, 
  loadSavedGeneratedQuestions, 
  loadExamHistory, 
  saveExamHistoryToStorage,
  loadCustomOutlines,
  saveCustomOutline,
  deleteCustomOutline
} from './utils/storage';

export default function App() {
  // Authentication & Payment Verification State (Restored immediately from local cache for instant offline startup)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const cached = getCachedAuthUser();
    return cached?.role === 'admin' ? null : cached;
  });
  const [latestPayment, setLatestPayment] = useState<PaymentRequestRecord | null>(() =>
    getCachedLatestPayment()
  );
  const [isPaymentPromptOpen, setIsPaymentPromptOpen] = useState<boolean>(false);
  const [paymentPromptReason, setPaymentPromptReason] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('freshman_theme_mode');
      if (saved === 'blue' || saved === 'black' || saved === 'white') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'blue';
  });

  const [amharicSubjects, setAmharicSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.removeItem('freshman_amharic_subjects');
      localStorage.removeItem('freshman_amharic_subjects_v2');
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleToggleAmharicSubject = useCallback((subject: Subject) => {
    if (!subject || subject === 'all') return;
    setAmharicSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('freshman_theme_mode', mode);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-blue', 'theme-black', 'theme-white', 'dark');
    root.classList.add(`theme-${themeMode}`);
    if (themeMode === 'blue' || themeMode === 'black') {
      root.classList.add('dark');
    }
  }, [themeMode]);

  const isPaidAccessLocked = Boolean(
    currentUser && currentUser.role !== 'admin' && currentUser.accountStatus !== 'APPROVED'
  );

  const requirePaidAccessPrompt = useCallback((featureName: string) => {
    setPaymentPromptReason(featureName);
    setIsPaymentPromptOpen(true);
  }, []);

  // Instant real-time Firestore listener + rapid fallback poll so Admin approvals/rejections unlock the student app within milliseconds
  useEffect(() => {
    if (!currentUser || currentUser.role === 'admin' || currentUser.accountStatus === 'APPROVED') {
      return;
    }
    const isWaiting =
      currentUser.accountStatus === 'PENDING_VERIFICATION' || latestPayment?.status === 'PENDING';
    if (!isWaiting) return;

    let isMounted = true;

    // 1. Instant real-time listener on student's user doc
    const unsubUser = onSnapshot(
      doc(db, 'users', currentUser.id),
      (snap) => {
        if (!isMounted || !snap.exists()) return;
        const data = snap.data() as any;
        if (data.accountStatus !== currentUser.accountStatus || data.rejectionReason !== currentUser.rejectionReason) {
          fetchCurrentSession()
            .then((res) => {
              if (!isMounted) return;
              setCurrentUser(res.user);
              setLatestPayment(res.latestPayment);
              saveCachedSession(res.user, res.latestPayment);
              if (res.user.accountStatus === 'APPROVED') {
                setIsPaymentPromptOpen(false);
                setPaymentPromptReason(null);
              }
            })
            .catch(() => {});
        }
      },
      () => {
        // Fallback silently if offline
      }
    );

    // 2. Instant real-time listener on latest payment doc
    let unsubPay = () => {};
    if (latestPayment?.id) {
      unsubPay = onSnapshot(
        doc(db, 'payments', latestPayment.id),
        (snap) => {
          if (!isMounted || !snap.exists()) return;
          const payData = snap.data() as any;
          if (payData.status !== latestPayment.status || payData.adminNote !== latestPayment.adminNote) {
            fetchCurrentSession()
              .then((res) => {
                if (!isMounted) return;
                setCurrentUser(res.user);
                setLatestPayment(res.latestPayment);
                saveCachedSession(res.user, res.latestPayment);
                if (res.user.accountStatus === 'APPROVED') {
                  setIsPaymentPromptOpen(false);
                  setPaymentPromptReason(null);
                }
              })
              .catch(() => {});
          }
        },
        () => {}
      );
    }

    // 3. Rapid 2.5-second fallback poll
    const interval = setInterval(async () => {
      try {
        const res = await fetchCurrentSession();
        if (!isMounted) return;
        setCurrentUser(res.user);
        setLatestPayment(res.latestPayment);
        saveCachedSession(res.user, res.latestPayment);
        if (res.user.accountStatus === 'APPROVED') {
          setIsPaymentPromptOpen(false);
          setPaymentPromptReason(null);
        }
      } catch {
        // ignore poll error
      }
    }, 2500);

    return () => {
      isMounted = false;
      unsubUser();
      unsubPay();
      clearInterval(interval);
    };
  }, [currentUser?.id, currentUser?.accountStatus, currentUser?.rejectionReason, latestPayment?.id, latestPayment?.status, latestPayment?.adminNote]);

  useEffect(() => {
    const token = getSavedAuthToken();
    if (!token) {
      return;
    }
    let mounted = true;
    fetchCurrentSession()
      .then((res) => {
        if (!mounted) return;
        if (res.user.role === 'admin') {
          clearAuthToken();
          setCurrentUser(null);
          setLatestPayment(null);
          return;
        }
        setCurrentUser(res.user);
        setLatestPayment(res.latestPayment);
        saveCachedSession(res.user, res.latestPayment);
      })
      .catch((err) => {
        if (!mounted) return;
        // Never log out when offline; only clear if explicitly expired while online
        if (err instanceof Error && err.message === 'Session expired.') {
          clearAuthToken();
          setCurrentUser(null);
          setLatestPayment(null);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAuthenticated = useCallback(
    (user: AuthUser, payment: PaymentRequestRecord | null) => {
      if (user.role === 'admin') return;
      saveCachedSession(user, payment);
      setCurrentUser(user);
      setLatestPayment(payment);
      setIsPaymentPromptOpen(false);
      setPaymentPromptReason(null);
    },
    []
  );

  const handleLogout = useCallback(async () => {
    await logoutUser();
    setCurrentUser(null);
    setLatestPayment(null);
    setIsPaymentPromptOpen(false);
    setPaymentPromptReason(null);
  }, []);

  const [activeTab, setActiveTabState] = useState<NavTab>('plan');
  const tabHistoryRef = useRef<NavTab[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  const getTabFeatureLabel = (tab: NavTab): string => {
    switch (tab) {
      case 'modules':
      case 'notes':
        return 'Course Modules & Textbook Master Notes';
      case 'pdfs':
      case 'formulas':
      case 'guides':
        return 'Published PDF Library [LTMW (Lecture, Textbook, Mid, Worksheet)]';
      case 'mock':
        return 'Timed Midterm & Final Exam Simulator';
      case 'flashcards':
        return 'Flashcards Speed Drill';
      case 'mistakes':
        return 'Mistakes Notebook';
      default:
        return 'Full Course & Study Features';
    }
  };

  const setActiveTab = useCallback(
    (nextTab: NavTab) => {
      setActiveTabState((prev) => {
        if (prev !== nextTab) {
          tabHistoryRef.current = [...tabHistoryRef.current.slice(-15), prev];
          try {
            window.history.pushState({ tab: nextTab }, '');
            window.scrollTo(0, 0);
          } catch {
            // ignore history errors in restricted contexts
          }
        }
        return nextTab;
      });
    },
    []
  );
  const [selectedPracticeSubject, setSelectedPracticeSubject] = useState<Subject | 'all'>(() =>
    isPaidAccessLocked ? 'anthropology' : 'all'
  );

  useEffect(() => {
    if (isPaidAccessLocked) {
      setSelectedPracticeSubject('anthropology');
    }
  }, [isPaidAccessLocked]);
  
  // Custom Saved Questions count
  const [savedGeneratedQuestions, setSavedGeneratedQuestions] = useState<Question[]>(() => {
    return loadSavedGeneratedQuestions();
  });

  // User Study Notes State (localStorage persistent)
  const [userNotes, setUserNotes] = useState<UserStudyNote[]>(() => {
    return loadUserNotes();
  });

  // Mock Exam History State (localStorage persistent)
  const [examHistory, setExamHistory] = useState<SavedExamRecord[]>(() => {
    return loadExamHistory();
  });

  // Custom Course Outlines & Syllabi (localStorage persistent)
  const [customOutlines, setCustomOutlines] = useState<Record<string, CustomCourseOutline>>(() => {
    return loadCustomOutlines();
  });
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState<boolean>(false);
  const [activeSyllabusCourseId, setActiveSyllabusCourseId] = useState<string | undefined>(undefined);

  const handleOpenSyllabusModal = (courseId?: string) => {
    if (isPaidAccessLocked && !isFreeCourseSubject(courseId)) {
      requirePaidAccessPrompt('Custom Course Syllabus & Chapter Outline Editor');
      return;
    }
    setActiveSyllabusCourseId(courseId || (isPaidAccessLocked ? 'anthropology' : undefined));
    setIsSyllabusModalOpen(true);
  };

  const handleSaveCustomOutline = (outline: CustomCourseOutline) => {
    saveCustomOutline(outline);
    setCustomOutlines(loadCustomOutlines());
  };

  const handleDeleteCustomOutline = (courseId: string) => {
    deleteCustomOutline(courseId);
    setCustomOutlines(loadCustomOutlines());
  };
  const [isA04SimActive, setIsA04SimActive] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);

  // Refs for latest modal/tab states inside Android hardware back listener
  const stateRef = useRef({
    activeTab,
    isSyllabusModalOpen,
    isScratchpadOpen,
    isA04SimActive,
    isPaymentPromptOpen,
  });
  useEffect(() => {
    stateRef.current = {
      activeTab,
      isSyllabusModalOpen,
      isScratchpadOpen,
      isA04SimActive,
      isPaymentPromptOpen,
    };
  }, [activeTab, isSyllabusModalOpen, isScratchpadOpen, isA04SimActive, isPaymentPromptOpen]);

  const handleHardwareBackNavigation = useCallback((): boolean => {
    const current = stateRef.current;
    if (current.isPaymentPromptOpen) {
      setIsPaymentPromptOpen(false);
      return true;
    }
    if (current.isSyllabusModalOpen) {
      setIsSyllabusModalOpen(false);
      return true;
    }
    if (current.isScratchpadOpen) {
      setIsScratchpadOpen(false);
      return true;
    }
    if (current.isA04SimActive) {
      setIsA04SimActive(false);
      return true;
    }
    if (tabHistoryRef.current.length > 0) {
      const prevTab = tabHistoryRef.current.pop()!;
      setActiveTabState(prevTab);
      return true;
    }
    if (current.activeTab !== 'plan') {
      setActiveTabState('plan');
      return true;
    }
    return false;
  }, []);

  // Initialize Capacitor Android hardware back button, status bar, keyboard & offline listeners
  useEffect(() => {
    const cleanupNative = initAndroidNativeBridge({
      onHardwareBack: handleHardwareBackNavigation,
    });

    const handlePopState = () => {
      handleHardwareBackNavigation();
    };
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      cleanupNative();
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleHardwareBackNavigation]);

  // LocalStorage-backed Task Checklist State
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('freshman_checked_tasks');
      if (saved) return JSON.parse(saved);
      // fallback to previous key if exists
      const old = localStorage.getItem('aastu_prep_checked_tasks');
      return old ? JSON.parse(old) : {};
    } catch {
      return {};
    }
  });

  // LocalStorage-backed Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freshman_bookmarks');
      if (saved) return JSON.parse(saved);
      const old = localStorage.getItem('aastu_prep_bookmarks');
      return old ? JSON.parse(old) : [];
    } catch {
      return [];
    }
  });

  // LocalStorage-backed Mistakes Notebook State
  const [mistakeQuestions, setMistakeQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('freshman_mistakes');
      if (saved) return JSON.parse(saved);
      const old = localStorage.getItem('aastu_prep_mistakes');
      return old ? JSON.parse(old) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('freshman_checked_tasks', JSON.stringify(checkedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [checkedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('freshman_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('freshman_mistakes', JSON.stringify(mistakeQuestions));
    } catch (e) {
      console.error(e);
    }
  }, [mistakeQuestions]);

  useEffect(() => {
    saveUserNotesToStorage(userNotes);
  }, [userNotes]);

  useEffect(() => {
    saveExamHistoryToStorage(examHistory);
  }, [examHistory]);

  // Total targets count across 12-week semester plan
  const totalTasksCount = FRESHMAN_SEMESTER_PLAN.reduce((acc, week) => {
    return acc + week.timeBlocks.reduce((bAcc, block) => bAcc + block.actionableTargets.length, 0);
  }, 0);

  const completedTasksCount = Object.values(checkedTasks).filter(Boolean).length;

  const handleToggleTask = (taskId: string) => {
    if (isPaidAccessLocked && !taskId.toLowerCase().includes('anth')) {
      requirePaidAccessPrompt('Course Study Target Checklist');
      return;
    }
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleToggleBookmark = (questionId: string) => {
    setBookmarkedIds(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleRecordMistake = (q: Question) => {
    setMistakeQuestions(prev => {
      if (prev.some(item => item.id === q.id)) return prev;
      return [q, ...prev];
    });
  };

  const handleSaveBatchMistakes = (wrongList: Question[]) => {
    setMistakeQuestions(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const newItems = wrongList.filter(item => !existingIds.has(item.id));
      return [...newItems, ...prev];
    });
  };

  const handleRemoveMistake = (id: string) => {
    setMistakeQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleClearAllMistakes = () => {
    setMistakeQuestions([]);
  };

  // User Notes Handlers (Course Notes + Personal Notes)
  const handleSaveUserNote = (note: UserStudyNote) => {
    setUserNotes(prev => {
      const index = prev.findIndex(n => n.id === note.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = note;
        return next;
      }
      return [note, ...prev];
    });
  };

  const handleDeleteUserNote = (id: string) => {
    setUserNotes(prev => prev.filter(n => n.id !== id));
  };

  // Exam History Handlers
  const handleSaveExamRecord = (record: SavedExamRecord) => {
    setExamHistory(prev => [record, ...prev]);
  };

  const handleDeleteExamRecord = (id: string) => {
    setExamHistory(prev => prev.filter(r => r.id !== id));
  };

  const handleStartSubjectPractice = (subject: Subject) => {
    if (isPaidAccessLocked && !isFreeCourseSubject(subject)) {
      requirePaidAccessPrompt(`Mid/Final Exam Sim (${subject.toUpperCase()})`);
      return;
    }
    setSelectedPracticeSubject(subject);
    setActiveTab('mock');
  };

  const handleOpenGuides = (subject: Subject) => {
    if (isPaidAccessLocked && !isFreeCourseSubject(subject)) {
      requirePaidAccessPrompt(`Published PDF Library [LTMW] (${subject.toUpperCase()})`);
      return;
    }
    setSelectedPracticeSubject(subject);
    setActiveTab('pdfs');
  };

  // Callback when user restores full backup from JSON
  const handleDataRestored = () => {
    setUserNotes(loadUserNotes());
    setExamHistory(loadExamHistory());
    setCustomOutlines(loadCustomOutlines());
    setSavedGeneratedQuestions(loadSavedGeneratedQuestions());
    try {
      setMistakeQuestions(JSON.parse(localStorage.getItem('freshman_mistakes') || '[]'));
      setBookmarkedIds(JSON.parse(localStorage.getItem('freshman_bookmarks') || '[]'));
      setCheckedTasks(JSON.parse(localStorage.getItem('freshman_checked_tasks') || '{}'));
    } catch (e) {
      console.error(e);
    }
  };

  // 1. STUDENT LOGIN AND SIGN-UP MUST COME FIRST
  if (!currentUser || currentUser.role === 'admin') {
    return <AuthGateView onAuthenticated={handleAuthenticated} />;
  }

  const appContent = (
    <div
      className={`min-h-screen app-theme-shell flex flex-col font-sans safe-area-shell ${
        themeMode === 'white'
          ? 'bg-slate-50 text-slate-900'
          : themeMode === 'black'
          ? 'bg-black text-slate-100'
          : 'bg-[#0b1936] text-slate-100'
      }`}
    >
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        mistakesCount={mistakeQuestions.length}
        onToggleA04Simulator={() => setIsA04SimActive(prev => !prev)}
        isA04SimActive={isA04SimActive}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenPaymentModal={
          isPaidAccessLocked
            ? () => requirePaidAccessPrompt('Full Student Access (All 17 Courses, Modules, Exams & PDFs)')
            : undefined
        }
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        themeMode={themeMode}
        onChangeThemeMode={setThemeMode}
      />

      {/* Top Payment Verification Status Bar for Unapproved Students (Anthropology is 100% Free across all features!) */}
      {isPaidAccessLocked && (
        <div className="bg-slate-900 border-b border-emerald-500/30 px-3 sm:px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                {currentUser.accountStatus === 'PENDING_VERIFICATION'
                  ? 'WAITING FOR ADMIN VERIFICATION'
                  : currentUser.accountStatus === 'REJECTED'
                  ? 'PAYMENT REJECTED · ANTHROPOLOGY FREE'
                  : 'FREE COURSE UNLOCKED: ANTHROPOLOGY'}
              </span>
              <span className="text-slate-300">
                {currentUser.accountStatus === 'PENDING_VERIFICATION'
                  ? 'Your 40 ETB Telebirr screenshot is waiting for Admin approval. Social Anthropology (Anth 1012) is 100% free while you wait!'
                  : 'Social Anthropology (Anth 1012) is 100% FREE across all features (Modules, PDFs, Exams & Flashcards)! Unlock all 17 courses for 40 ETB (20 Birr discount from 60 ETB).'}
              </span>
            </div>
            <button
              type="button"
              id="banner-open-payment-btn"
              onClick={() =>
                requirePaidAccessPrompt('Full Student Access (All 17 Courses, Modules, Exams & PDFs)')
              }
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition whitespace-nowrap"
            >
              {currentUser.accountStatus === 'PENDING_VERIFICATION'
                ? 'View Payment Status'
                : 'Unlock All 17 Courses (40 ETB · 20 Off)'}
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full mx-auto max-w-7xl p-2 xs:p-3 sm:p-6 lg:p-8 pb-20 xs:pb-24 sm:pb-12">
        {activeTab === 'plan' && (
          <DailyPlanView
            onStartSubjectPractice={handleStartSubjectPractice}
            onOpenGuides={handleOpenGuides}
            onOpenNotes={(subj) => {
              if (isPaidAccessLocked && !isFreeCourseSubject(subj)) {
                requirePaidAccessPrompt(`Course Modules & Master Notes (${String(subj || '').toUpperCase()})`);
                return;
              }
              setSelectedPracticeSubject(subj);
              setActiveTab('modules');
            }}
            onOpenFlashcards={(subj) => {
              if (subj && isPaidAccessLocked && !isFreeCourseSubject(subj)) {
                requirePaidAccessPrompt(`Flashcards (${String(subj || '').toUpperCase()})`);
                return;
              }
              if (subj) setSelectedPracticeSubject(subj);
              setActiveTab('flashcards');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            checkedTasks={checkedTasks}
            onToggleTask={handleToggleTask}
            customOutlines={customOutlines}
            onOpenSyllabusModal={handleOpenSyllabusModal}
            isPaidAccessLocked={isPaidAccessLocked}
            onRequirePaidAccess={requirePaidAccessPrompt}
            amharicSubjects={amharicSubjects}
            onToggleAmharicSubject={handleToggleAmharicSubject}
          />
        )}

        {(activeTab === 'modules' || activeTab === 'notes') && (
          <CourseModulesView
            initialSubject={selectedPracticeSubject}
            userNotes={userNotes}
            onSaveNote={handleSaveUserNote}
            onDeleteNote={handleDeleteUserNote}
            savedQuestionsCount={savedGeneratedQuestions.length}
            examHistoryCount={examHistory.length}
            onDataRestored={handleDataRestored}
            customOutlines={customOutlines}
            onOpenSyllabusModal={handleOpenSyllabusModal}
            onDeleteCustomOutline={handleDeleteCustomOutline}
            isPaidAccessLocked={isPaidAccessLocked}
            onRequirePaidAccess={requirePaidAccessPrompt}
            isAdmin={false}
            amharicSubjects={amharicSubjects}
            onToggleAmharicSubject={handleToggleAmharicSubject}
          />
        )}

        {(activeTab === 'pdfs' || activeTab === 'formulas' || activeTab === 'guides') && (
          <PublishedPdfsView
            isAdmin={false}
            initialSubject={selectedPracticeSubject}
            isPaidAccessLocked={isPaidAccessLocked}
            onRequirePaidAccess={requirePaidAccessPrompt}
          />
        )}

        {activeTab === 'mock' && (
          <MockExamView
            onSaveMistakes={handleSaveBatchMistakes}
            examHistory={examHistory}
            onSaveExamRecord={handleSaveExamRecord}
            onDeleteExamRecord={handleDeleteExamRecord}
            initialSubject={selectedPracticeSubject}
            isPaidAccessLocked={isPaidAccessLocked}
            onRequirePaidAccess={requirePaidAccessPrompt}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            initialSubject={selectedPracticeSubject}
            isPaidAccessLocked={isPaidAccessLocked}
            onRequirePaidAccess={requirePaidAccessPrompt}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakesNotebookView
            mistakeQuestions={mistakeQuestions}
            onRemoveMistake={handleRemoveMistake}
            onClearAllMistakes={handleClearAllMistakes}
          />
        )}
      </main>

      {/* Mobile Sticky Thumb Navigation Bar for Samsung A04 and Smartphones */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mistakesCount={mistakeQuestions.length}
        onToggleA04Simulator={() => setIsA04SimActive(prev => !prev)}
        isA04SimActive={isA04SimActive}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenPaymentModal={
          isPaidAccessLocked
            ? () => requirePaidAccessPrompt('Full Student Access (All 17 Courses, Modules, Exams & PDFs)')
            : undefined
        }
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        themeMode={themeMode}
        onChangeThemeMode={setThemeMode}
      />

      {/* User Profile Modification & Background Theme Mode Settings Modal */}
      <UserSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentUser={currentUser}
        onUserUpdated={(updatedUser) => setCurrentUser(updatedUser)}
        themeMode={themeMode}
        onChangeThemeMode={setThemeMode}
      />

      {/* Paid Access Required Prompt & 40 ETB Telebirr Payment Modal */}
      {isPaidAccessLocked && isPaymentPromptOpen && (
        <PaymentGateView
          user={currentUser}
          latestPayment={latestPayment}
          promptFeatureName={paymentPromptReason}
          onClosePreview={() => setIsPaymentPromptOpen(false)}
          onUserAndPaymentUpdated={(updatedUser, updatedPayment) => {
            setCurrentUser(updatedUser);
            setLatestPayment(updatedPayment);
            if (updatedUser.accountStatus === 'APPROVED') {
              setIsPaymentPromptOpen(false);
              setPaymentPromptReason(null);
            }
          }}
          onLogout={handleLogout}
        />
      )}

      {/* Floating Speed Stopwatch, Formula Peek & Touch Scratchpad Companion */}
      <SamsungA04Companion
        isSimActive={isA04SimActive}
        onToggleSim={() => setIsA04SimActive(prev => !prev)}
        isScratchpadOpen={isScratchpadOpen}
        onCloseScratchpad={() => setIsScratchpadOpen(false)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        hideFloatingButtons={true}
      />

      {/* Dynamic Add / Edit Course Outline & Syllabus Modal */}
      <AddEditCourseSyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        initialCourseId={activeSyllabusCourseId}
        onSaveOutline={handleSaveCustomOutline}
        onDeleteOutline={handleDeleteCustomOutline}
        onSaveNote={handleSaveUserNote}
        customOutlines={customOutlines}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-500 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 ABEFA • Ethiopian Higher Education Curriculum</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>All 17 University Freshman Subjects</span>
          </div>
        </div>
      </footer>
    </div>
  );

  return appContent;
}
