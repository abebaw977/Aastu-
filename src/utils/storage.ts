import { Question, UserStudyNote, SavedExamRecord } from '../types';

export const STORAGE_KEYS = {
  CHECKED_TASKS: 'aastu_prep_checked_tasks',
  BOOKMARKS: 'aastu_prep_bookmarks',
  MISTAKES: 'aastu_prep_mistakes',
  SAVED_GENERATED_QUESTIONS: 'aastu_prep_saved_generated_questions',
  USER_NOTES: 'aastu_prep_user_notes',
  EXAM_HISTORY: 'aastu_prep_exam_history',
  COMPLETED_CHAPTERS: 'aastu_completed_chapters',
};

// --- Custom Generated Questions ---
export function loadSavedGeneratedQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_GENERATED_QUESTIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load saved generated questions:', e);
    return [];
  }
}

export function saveGeneratedQuestionsToStorage(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_GENERATED_QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save generated questions to storage:', e);
  }
}

// --- User Personal Notes ---
export function loadUserNotes(): UserStudyNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load user notes:', e);
    return [];
  }
}

export function saveUserNotesToStorage(notes: UserStudyNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save user notes to storage:', e);
  }
}

// --- Exam History ---
export function loadExamHistory(): SavedExamRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load exam history:', e);
    return [];
  }
}

export function saveExamHistoryToStorage(records: SavedExamRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save exam history to storage:', e);
  }
}

// --- Full Backup Export & Import ---
export interface CompleteBackupData {
  version: number;
  exportedAt: string;
  generatedQuestions: Question[];
  userNotes: UserStudyNote[];
  examHistory: SavedExamRecord[];
  mistakes: Question[];
  bookmarks: string[];
  checkedTasks: Record<string, boolean>;
  completedChapters: Record<string, boolean>;
}

export function exportCompleteBackup(): string {
  const data: CompleteBackupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    generatedQuestions: loadSavedGeneratedQuestions(),
    userNotes: loadUserNotes(),
    examHistory: loadExamHistory(),
    mistakes: JSON.parse(localStorage.getItem(STORAGE_KEYS.MISTAKES) || '[]'),
    bookmarks: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]'),
    checkedTasks: JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKED_TASKS) || '{}'),
    completedChapters: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS) || '{}'),
  };

  return JSON.stringify(data, null, 2);
}

export function downloadBackupFile(): void {
  const jsonStr = exportCompleteBackup();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const timestamp = new Date().toISOString().slice(0, 10);
  a.download = `AASTU_Prep_Permanent_Backup_${timestamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function restoreBackupFromJSON(jsonText: string): { success: boolean; error?: string; stats?: { questions: number; notes: number; exams: number } } {
  try {
    const data: Partial<CompleteBackupData> = JSON.parse(jsonText);
    
    if (data.generatedQuestions && Array.isArray(data.generatedQuestions)) {
      const existing = loadSavedGeneratedQuestions();
      const mergedMap = new Map<string, Question>();
      existing.forEach(q => mergedMap.set(q.id, q));
      data.generatedQuestions.forEach(q => mergedMap.set(q.id, q));
      saveGeneratedQuestionsToStorage(Array.from(mergedMap.values()));
    }

    if (data.userNotes && Array.isArray(data.userNotes)) {
      const existing = loadUserNotes();
      const mergedMap = new Map<string, UserStudyNote>();
      existing.forEach(n => mergedMap.set(n.id, n));
      data.userNotes.forEach(n => mergedMap.set(n.id, n));
      saveUserNotesToStorage(Array.from(mergedMap.values()));
    }

    if (data.examHistory && Array.isArray(data.examHistory)) {
      const existing = loadExamHistory();
      const mergedMap = new Map<string, SavedExamRecord>();
      existing.forEach(h => mergedMap.set(h.id, h));
      data.examHistory.forEach(h => mergedMap.set(h.id, h));
      saveExamHistoryToStorage(Array.from(mergedMap.values()));
    }

    if (data.mistakes && Array.isArray(data.mistakes)) {
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(data.mistakes));
    }
    if (data.bookmarks && Array.isArray(data.bookmarks)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(data.bookmarks));
    }
    if (data.checkedTasks && typeof data.checkedTasks === 'object') {
      localStorage.setItem(STORAGE_KEYS.CHECKED_TASKS, JSON.stringify(data.checkedTasks));
    }
    if (data.completedChapters && typeof data.completedChapters === 'object') {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_CHAPTERS, JSON.stringify(data.completedChapters));
    }

    return {
      success: true,
      stats: {
        questions: data.generatedQuestions?.length || 0,
        notes: data.userNotes?.length || 0,
        exams: data.examHistory?.length || 0,
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Invalid JSON format' };
  }
}
