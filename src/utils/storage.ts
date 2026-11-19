import { Question, UserStudyNote, SavedExamRecord, TutorChatSession, CustomCourseOutline } from '../types';

export const STORAGE_KEYS = {
  CHECKED_TASKS: 'aastu_prep_checked_tasks',
  BOOKMARKS: 'aastu_prep_bookmarks',
  MISTAKES: 'aastu_prep_mistakes',
  SAVED_GENERATED_QUESTIONS: 'aastu_prep_saved_generated_questions',
  USER_NOTES: 'aastu_prep_user_notes',
  EXAM_HISTORY: 'aastu_prep_exam_history',
  COMPLETED_CHAPTERS: 'aastu_completed_chapters',
  TUTOR_SESSIONS: 'aastu_prep_tutor_sessions',
  CUSTOM_OUTLINES: 'freshman_custom_outlines',
};

export function deduplicateQuestionsById(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of questions) {
    if (!q || !q.id) continue;
    if (seen.has(q.id)) continue;
    seen.add(q.id);
    out.push(q);
  }
  return out;
}

// --- Custom Generated Questions ---
export function loadSavedGeneratedQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_GENERATED_QUESTIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? deduplicateQuestionsById(parsed) : [];
  } catch (e) {
    console.error('Failed to load saved generated questions:', e);
    return [];
  }
}

export function saveGeneratedQuestionsToStorage(questions: Question[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.SAVED_GENERATED_QUESTIONS,
      JSON.stringify(deduplicateQuestionsById(questions))
    );
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

// --- AI Tutor Chat Sessions ---
export function loadTutorChatSessions(): TutorChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TUTOR_SESSIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    let didRepair = false;
    const cleaned: TutorChatSession[] = parsed.map((session: TutorChatSession) => {
      if (!Array.isArray(session.messages)) return session;
      let updatedTitle = session.title || 'Freshman Course Discussion';
      if (updatedTitle.includes('AASTU')) {
        updatedTitle = updatedTitle.replace(/AASTU/g, 'Freshman');
        didRepair = true;
      }
      const updatedMessages = session.messages
        .filter((msg) => {
          const isErrMsg =
            msg.id?.startsWith('msg-err-') ||
            msg.content?.includes('Could not generate response') ||
            msg.content?.includes('Failed to fetch') ||
            msg.content?.includes('Failed to reach AI Tutor');
          if (isErrMsg && msg.role === 'assistant') {
            didRepair = true;
            return false;
          }
          return true;
        })
        .map((msg) => {
          if (msg.content?.includes('AASTU')) {
            didRepair = true;
            return {
              ...msg,
              content: msg.content.replace(/AASTU/g, 'Freshman'),
            };
          }
          return msg;
        });
      return { ...session, title: updatedTitle, messages: updatedMessages };
    });

    if (didRepair) {
      saveTutorChatSessionsToStorage(cleaned);
    }

    return cleaned;
  } catch (e) {
    console.error('Failed to load tutor chat sessions:', e);
    return [];
  }
}

export function saveTutorChatSessionsToStorage(sessions: TutorChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TUTOR_SESSIONS, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save tutor chat sessions to storage:', e);
  }
}

// --- Custom Course Outlines & Syllabi ---
export function loadCustomOutlines(): Record<string, CustomCourseOutline> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_OUTLINES);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    console.error('Failed to load custom outlines:', e);
    return {};
  }
}

export function saveCustomOutlinesToStorage(outlines: Record<string, CustomCourseOutline>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_OUTLINES, JSON.stringify(outlines));
  } catch (e) {
    console.error('Failed to save custom outlines:', e);
  }
}

export function saveCustomOutline(outline: CustomCourseOutline): void {
  const current = loadCustomOutlines();
  const key = outline.courseId || outline.id;
  current[key] = { ...outline, courseId: key };
  saveCustomOutlinesToStorage(current);
}

export function deleteCustomOutline(courseIdOrId: string): void {
  const current = loadCustomOutlines();
  delete current[courseIdOrId];
  for (const k of Object.keys(current)) {
    if (current[k]?.id === courseIdOrId || current[k]?.courseId === courseIdOrId) {
      delete current[k];
    }
  }
  saveCustomOutlinesToStorage(current);
}

/**
 * Formats a student's saved CustomCourseOutline into a structured readable summary
 * following the exact path and contents of the student's course outline.
 */
export function formatCourseOutlineSummary(
  outline: CustomCourseOutline,
  chapterNumberFilter?: number
): string {
  if (!outline) return '';
  const targetChapters =
    typeof chapterNumberFilter === 'number' && chapterNumberFilter > 0
      ? outline.chapters.filter((c) => c.chapterNumber === chapterNumberFilter)
      : outline.chapters;

  const chaptersToFormat = targetChapters.length > 0 ? targetChapters : outline.chapters;

  const chapterLines = (chaptersToFormat || [])
    .map((ch) => {
      const topicsList = Array.isArray(ch.topics) && ch.topics.length > 0 ? ch.topics.join('; ') : 'Core chapter concepts';
      const refPart = ch.readings ? ` | Reference/Readings: ${ch.readings}` : '';
      return `  - Chapter ${ch.chapterNumber}: ${ch.title}\n    Subtopics & Contents: ${topicsList}${refPart}`;
    })
    .join('\n');

  return [
    `=== STUDENT'S SAVED COURSE OUTLINE & CONTENTS (STRICT LEARNING PATH) ===`,
    `Course: ${outline.courseCode} — ${outline.courseTitle} (Subject: ${outline.subject})`,
    outline.instructorName ? `Instructor / Department: ${outline.instructorName}` : '',
    outline.gradingPolicy ? `Assessment & Grading Structure: ${outline.gradingPolicy}` : '',
    outline.syllabusOverview ? `Course Syllabus Overview & Objectives:\n${outline.syllabusOverview}` : '',
    `Ordered Course Outline Chapters & Topics (${chaptersToFormat.length} chapter(s) selected):`,
    chapterLines || '  - Follow course overview and lecture notes below.',
    outline.customLectureNotes
      ? `Student's Course Contents & Lecture Notes:\n${outline.customLectureNotes}`
      : '',
    `=== END OF SAVED COURSE OUTLINE ===`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Finds a matching saved CustomCourseOutline by outlineId, courseId, subject, or topic keyword.
 */
export function findMatchingCustomOutline(
  outlines: Record<string, CustomCourseOutline>,
  params: { outlineId?: string; courseId?: string; subject?: string; topic?: string }
): CustomCourseOutline | null {
  const list = Object.values(outlines || {});
  if (list.length === 0) return null;

  if (params.outlineId) {
    const byId =
      outlines[params.outlineId] ||
      list.find((o) => o.id === params.outlineId || o.courseId === params.outlineId);
    if (byId) return byId;
  }

  if (params.courseId) {
    const byCourse =
      outlines[params.courseId] ||
      list.find((o) => o.courseId.toLowerCase() === params.courseId!.toLowerCase());
    if (byCourse) return byCourse;
  }

  if (params.topic && params.topic.trim().length >= 3) {
    const q = params.topic.trim().toLowerCase();
    const byTopicMatch = list.find(
      (o) =>
        o.courseTitle.toLowerCase().includes(q) ||
        o.courseCode.toLowerCase().includes(q) ||
        o.chapters.some(
          (ch) =>
            ch.title.toLowerCase().includes(q) ||
            ch.topics.some((t) => t.toLowerCase().includes(q))
        )
    );
    if (byTopicMatch) return byTopicMatch;
  }

  if (params.subject && params.subject !== 'all' && params.subject !== 'general') {
    const bySubj = list.find((o) => o.subject === params.subject);
    if (bySubj) return bySubj;
  }

  return null;
}

/**
 * Resolves the formatted course outline summary string from explicit context or saved outlines in localStorage.
 */
export function resolveCourseOutlineContext(params: {
  courseOutlineContext?: string;
  outlineId?: string;
  courseId?: string;
  subject?: string;
  topic?: string;
  chapterNumber?: number;
}): string {
  if (params.courseOutlineContext && params.courseOutlineContext.trim()) {
    return params.courseOutlineContext.trim();
  }
  const outlines = loadCustomOutlines();
  const matched = findMatchingCustomOutline(outlines, params);
  if (!matched) return '';
  return formatCourseOutlineSummary(matched, params.chapterNumber);
}

// --- Full Backup Export & Import ---
export interface CompleteBackupData {
  version: number;
  exportedAt: string;
  generatedQuestions: Question[];
  userNotes: UserStudyNote[];
  examHistory: SavedExamRecord[];
  customOutlines?: Record<string, CustomCourseOutline>;
  tutorSessions?: TutorChatSession[];
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
    customOutlines: loadCustomOutlines(),
    tutorSessions: loadTutorChatSessions(),
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
  a.download = `Freshman_Academy_Permanent_Backup_${timestamp}.json`;
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

    if (data.tutorSessions && Array.isArray(data.tutorSessions)) {
      const existing = loadTutorChatSessions();
      const mergedMap = new Map<string, TutorChatSession>();
      existing.forEach(s => mergedMap.set(s.id, s));
      data.tutorSessions.forEach(s => mergedMap.set(s.id, s));
      saveTutorChatSessionsToStorage(Array.from(mergedMap.values()));
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
    if (data.customOutlines && typeof data.customOutlines === 'object') {
      const existing = loadCustomOutlines();
      const merged = { ...existing, ...data.customOutlines };
      saveCustomOutlinesToStorage(merged);
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
