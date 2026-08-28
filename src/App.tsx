import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SamsungA04Companion } from './components/SamsungA04Companion';
import { SamsungA04DeviceView } from './components/SamsungA04DeviceView';
import { DailyPlanView } from './components/DailyPlanView';
import { PracticeView } from './components/PracticeView';
import { MockExamView } from './components/MockExamView';
import { StudyGuidesView } from './components/StudyGuidesView';
import { AASTUMasterNotesView } from './components/AASTUMasterNotesView';
import { FlashcardsView } from './components/FlashcardsView';
import { AITutorView } from './components/AITutorView';
import { MistakesNotebookView } from './components/MistakesNotebookView';
import { QUESTION_BANK } from './data/questions';
import { AASTU_5_DAY_PLAN } from './data/studyPlan';
import { Question, Subject, UserStudyNote, SavedExamRecord } from './types';
import { 
  loadUserNotes, 
  saveUserNotesToStorage, 
  loadSavedGeneratedQuestions, 
  saveGeneratedQuestionsToStorage, 
  loadExamHistory, 
  saveExamHistoryToStorage 
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('plan');
  const [selectedPracticeSubject, setSelectedPracticeSubject] = useState<Subject>('all');
  
  // Custom Saved Generated Questions
  const [savedGeneratedQuestions, setSavedGeneratedQuestions] = useState<Question[]>(() => {
    return loadSavedGeneratedQuestions();
  });

  // Master Question List combining built-in bank with user's saved generated questions
  const [allQuestions, setAllQuestions] = useState<Question[]>(() => {
    const saved = loadSavedGeneratedQuestions();
    return [...QUESTION_BANK, ...saved];
  });

  // User Study Notes State
  const [userNotes, setUserNotes] = useState<UserStudyNote[]>(() => {
    return loadUserNotes();
  });

  // Mock Exam History State
  const [examHistory, setExamHistory] = useState<SavedExamRecord[]>(() => {
    return loadExamHistory();
  });

  const [tutorQuestionContext, setTutorQuestionContext] = useState<Question | null>(null);
  const [isA04SimActive, setIsA04SimActive] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);

  // LocalStorage-backed Task Checklist State
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aastu_prep_checked_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // LocalStorage-backed Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aastu_prep_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // LocalStorage-backed Mistakes Notebook State
  const [mistakeQuestions, setMistakeQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('aastu_prep_mistakes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('aastu_prep_checked_tasks', JSON.stringify(checkedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [checkedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('aastu_prep_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aastu_prep_mistakes', JSON.stringify(mistakeQuestions));
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

  useEffect(() => {
    saveGeneratedQuestionsToStorage(savedGeneratedQuestions);
  }, [savedGeneratedQuestions]);

  // Total tasks count across 5 days
  const totalTasksCount = AASTU_5_DAY_PLAN.reduce((acc, day) => {
    return acc + day.timeBlocks.reduce((bAcc, block) => bAcc + block.objectives.length, 0);
  }, 0);

  const completedTasksCount = Object.values(checkedTasks).filter(Boolean).length;

  const handleToggleTask = (taskId: string) => {
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

  // User Notes Handlers
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

  const handleOpenAITutorWithQuestion = (q: Question) => {
    setTutorQuestionContext(q);
    setActiveTab('tutor');
  };

  const handleStartSubjectPractice = (subject: Subject) => {
    setSelectedPracticeSubject(subject);
    setActiveTab('practice');
  };

  const handleOpenGuides = (subject: Subject) => {
    setSelectedPracticeSubject(subject);
    setActiveTab('guides');
  };

  const handleAddCustomQuestion = (newQ: Question) => {
    setAllQuestions(prev => [newQ, ...prev]);
    setSavedGeneratedQuestions(prev => [newQ, ...prev]);
  };

  const handleAddBatchCustomQuestions = (newQuestions: Question[]) => {
    setAllQuestions(prev => [...newQuestions, ...prev]);
    setSavedGeneratedQuestions(prev => [...newQuestions, ...prev]);
  };

  // Callback when user restores full backup from JSON
  const handleDataRestored = () => {
    setUserNotes(loadUserNotes());
    setExamHistory(loadExamHistory());
    const restoredQs = loadSavedGeneratedQuestions();
    setSavedGeneratedQuestions(restoredQs);
    setAllQuestions([...QUESTION_BANK, ...restoredQs]);
    try {
      setMistakeQuestions(JSON.parse(localStorage.getItem('aastu_prep_mistakes') || '[]'));
      setBookmarkedIds(JSON.parse(localStorage.getItem('aastu_prep_bookmarks') || '[]'));
      setCheckedTasks(JSON.parse(localStorage.getItem('aastu_prep_checked_tasks') || '{}'));
    } catch (e) {
      console.error(e);
    }
  };

  const appContent = (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        mistakesCount={mistakeQuestions.length}
        onToggleA04Simulator={() => setIsA04SimActive(prev => !prev)}
        isA04SimActive={isA04SimActive}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 pb-24 sm:pb-12">
        {activeTab === 'plan' && (
          <DailyPlanView
            onStartSubjectPractice={handleStartSubjectPractice}
            onOpenGuides={handleOpenGuides}
            onOpenNotes={() => setActiveTab('notes')}
            checkedTasks={checkedTasks}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'notes' && (
          <AASTUMasterNotesView
            onOpenAITutorWithTopic={(topic, subject) => {
              setActiveTab('tutor');
            }}
            onJumpToPractice={(subject) => {
              setSelectedPracticeSubject(subject);
              setActiveTab('practice');
            }}
            userNotes={userNotes}
            onSaveNote={handleSaveUserNote}
            onDeleteNote={handleDeleteUserNote}
            savedQuestionsCount={savedGeneratedQuestions.length}
            examHistoryCount={examHistory.length}
            onDataRestored={handleDataRestored}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            questions={allQuestions}
            selectedSubject={selectedPracticeSubject}
            setSelectedSubject={setSelectedPracticeSubject}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onRecordMistake={handleRecordMistake}
            onOpenAITutorWithQuestion={handleOpenAITutorWithQuestion}
            onAddCustomQuestion={handleAddCustomQuestion}
          />
        )}

        {activeTab === 'mock' && (
          <MockExamView
            allQuestions={allQuestions}
            onSaveMistakes={handleSaveBatchMistakes}
            onOpenAITutorWithQuestion={handleOpenAITutorWithQuestion}
            onAddCustomQuestionsToBank={handleAddBatchCustomQuestions}
            examHistory={examHistory}
            onSaveExamRecord={handleSaveExamRecord}
            onDeleteExamRecord={handleDeleteExamRecord}
          />
        )}

        {activeTab === 'guides' && (
          <StudyGuidesView initialSubject={selectedPracticeSubject} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView />
        )}

        {activeTab === 'tutor' && (
          <AITutorView
            initialQuestionContext={tutorQuestionContext}
            onClearContext={() => setTutorQuestionContext(null)}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakesNotebookView
            mistakeQuestions={mistakeQuestions}
            onRemoveMistake={handleRemoveMistake}
            onClearAllMistakes={handleClearAllMistakes}
            onOpenAITutor={handleOpenAITutorWithQuestion}
          />
        )}
      </main>

      {/* Mobile Sticky Thumb Navigation Bar for Samsung A04 and Smartphones */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        mistakesCount={mistakeQuestions.length}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        onToggleA04Simulator={() => setIsA04SimActive(prev => !prev)}
        isA04SimActive={isA04SimActive}
      />

      {/* Floating Speed Stopwatch, Formula Peek & Touch Scratchpad Companion */}
      <SamsungA04Companion
        isSimActive={isA04SimActive}
        onToggleSim={() => setIsA04SimActive(prev => !prev)}
        isScratchpadOpen={isScratchpadOpen}
        onCloseScratchpad={() => setIsScratchpadOpen(false)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-500 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AASTU Entrance Exam Preparation Portal • Addis Ababa Science and Technology University</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Natural Science & Engineering Track</span>
            <span>•</span>
            <span>Samsung A04 (360px) & Mobile Touch Optimized</span>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <SamsungA04DeviceView
      isOpen={isA04SimActive}
      onClose={() => setIsA04SimActive(false)}
    >
      {appContent}
    </SamsungA04DeviceView>
  );
}
