export type Subject = 
  | 'anthropology'
  | 'biology' 
  | 'geography' 
  | 'entrepreneur'
  | 'global_affairs'
  | 'chemistry' 
  | 'history' 
  | 'civics' 
  | 'inclusive'
  | 'critical_thinking' 
  | 'mathematics' 
  | 'economics'
  | 'math_applied_2'
  | 'emerging_tech' 
  | 'math_social'
  | 'english' 
  | 'physics' 
  | 'english_2'
  | 'psychology' 
  | 'fitness' 
  | 'physics_2'
  | 'chemistry_2'
  | 'biology_2'
  | 'geography_history' 
  | 'aptitude' 
  | 'all';

export type Semester = 1 | 2;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ExamType = 'midterm' | 'final' | 'quiz' | 'custom';

export type AccountStatus = 'PENDING_PAYMENT' | 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';

export interface AuthUser {
  id: string;
  username: string;
  phoneNumber: string;
  role: 'student' | 'admin';
  accountStatus: AccountStatus;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequestRecord {
  id: string;
  userId: string;
  username: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionRef?: string;
  screenshotMime: string;
  screenshotSize: number;
  screenshotUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  adminNote: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

export const LTMW_PDF_CATEGORIES = [
  'Lecture notes',
  'Textbook',
  'Mid and Final exam',
  'Worksheet and assignment',
] as const;

export type LtmwPdfCategory = (typeof LTMW_PDF_CATEGORIES)[number];

export interface PublishedPdfDocument {
  id: string;
  title: string;
  subject: Subject;
  courseCode: string;
  semester: Semester;
  category: string;
  description: string;
  originalFilename: string;
  fileSize: number;
  isPublished: boolean;
  uploadedBy: string;
  createdAt: string;
  fileUrl: string;
  chunkCount?: number;
}

export interface OutlineChapterItem {
  id: string;
  chapterNumber: number;
  title: string;
  topics: string[];
  readings?: string;
}

export interface CustomCourseOutline {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  subject: Subject;
  semester: Semester;
  instructorName?: string;
  academicYear?: string;
  syllabusOverview?: string;
  gradingPolicy?: string;
  referenceMaterials?: string[];
  chapters: OutlineChapterItem[];
  customLectureNotes?: string;
  createdAt?: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  subject: Subject;
  semester?: Semester;
  courseCode?: string; // e.g., 'Math1011', 'Phys1011', 'LoCT1011'
  topic: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  shortcutTip?: string;
  yearReference?: string;
  difficulty: Difficulty;
  isAIGenerated?: boolean;
  generatedAt?: string;
  sourcePdfId?: string;
  sourcePdfTitle?: string;
  examType?: 'midterm' | 'final';
  imageDataUrl?: string;
  postType?: 'mcq' | 'image';
}

export type ThemeMode = 'blue' | 'black' | 'white';

export interface AdminPracticePost {
  id: string;
  postType: 'mcq' | 'image';
  subject: Subject;
  examType: 'midterm' | 'final';
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imageDataUrl: string;
  uploadedBy: string;
  createdAt: string;
}

export interface UserStudyNote {
  id: string;
  title: string;
  subject: Subject;
  courseId?: string;
  courseCode?: string;
  semester?: Semester;
  topic?: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface SavedExamRecord {
  id: string;
  title: string;
  date: string;
  timestamp: number;
  semester?: Semester;
  courseCode?: string;
  examType?: ExamType;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  difficulty: string;
  subjectBreakdown: Record<string, { total: number; correct: number }>;
  questions: Question[];
  answers: {
    questionId: string;
    userSelected: number | null;
    isCorrect: boolean;
  }[];
}

export interface WeekPlan {
  week: number;
  semester: Semester;
  title: string;
  focusCourses: string[];
  tagline: string;
  estimatedHours: number;
  timeBlocks: {
    period: 'Morning (3h)' | 'Afternoon (3h)' | 'Evening (2.5h)';
    subject: Subject;
    courseTitle: string;
    topics: string[];
    objectives: string[];
    actionableTargets: {
      id: string;
      text: string;
      category?: 'Practice' | 'Concept' | 'Proof' | 'Writing';
    }[];
    recommendedPracticeCount: number;
  }[];
  highYieldTopics: string[];
  examTraps: string[];
  keyFormulasToMemorize: string[];
}

// Backwards compatibility alias for components expecting DayPlan
export interface DayPlan {
  day: number;
  title: string;
  focusSubjects: string[];
  tagline: string;
  estimatedHours: number;
  timeBlocks: {
    period: 'Morning (3h)' | 'Afternoon (3.5h)' | 'Evening (2.5h)';
    subject: string;
    topics: string[];
    objectives: string[];
    recommendedPracticeCount: number;
  }[];
  highYieldTopics: string[];
  examTraps: string[];
  keyFormulasToMemorize: string[];
}

export interface StudyGuideTopic {
  id: string;
  subject: Subject;
  semester?: Semester;
  title: string;
  summary: string;
  keyFormulas: {
    name: string;
    formula: string;
    description: string;
    unitsOrNotes?: string;
  }[];
  mustKnowConcepts: string[];
  fastSolvingTricks: string[];
}

export interface Flashcard {
  id: string;
  subject: Subject;
  semester?: Semester;
  courseCode?: string;
  category: string;
  topic?: string;
  front: string;
  back: string;
  hint?: string;
}

export interface MasterNoteSection {
  id: string;
  heading: string;
  content: string; // Markdown / detailed theoretical notes with LaTeX
  equations?: {
    name: string;
    formula: string;
    explanation?: string;
    description?: string;
  }[];
  workedExamples?: {
    problem: string;
    stepByStepSolution: string[];
    shortcutTip?: string;
  }[];
  examTraps?: string[];
  keyTakeaways?: string[];
}

export interface MasterNoteChapter {
  id: string;
  subject: Subject;
  semester?: Semester;
  courseCode?: string;
  chapterNumber: number;
  title: string;
  moduleName?: string;
  gradeLevel?: string;
  overview: string;
  estimatedReadTimeMinutes: number;
  sections: MasterNoteSection[];
}

export interface FreshmanCourse {
  id: string;
  code: string;
  title: string;
  shortTitle?: string;
  semester: Semester;
  subject: Subject;
  creditHours: number;
  overview: string;
  prerequisites?: string;
  keyTopics: string[];
  chapters: MasterNoteChapter[];
  midtermWeight: string;
  finalWeight: string;
  assessmentBreakdown?: { item: string; weight: string }[];
}

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  roleId?: string;
  roleName?: string;
}

export interface TutorChatSession {
  id: string;
  title: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  messages: TutorChatMessage[];
  pinned?: boolean;
}

export interface FormulaItem {
  id: string;
  subject: Subject;
  semester?: Semester;
  topic: string;
  category: string;
  name: string;
  formula: string;
  variablesExplanation?: string;
  description: string;
  examTip?: string;
  units?: string;
  difficulty?: 'Core' | 'Advanced' | 'Top-Rank';
}

export interface ExamResult {
  id: string;
  date: string;
  examType?: ExamType;
  courseCode?: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  letterGrade?: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';
  gpaPoints?: number;
  subjectBreakdown: Record<string, { total: number; correct: number }>;
  answers: {
    questionId: string;
    userSelected: number | null;
    isCorrect: boolean;
  }[];
}
