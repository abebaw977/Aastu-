export type Subject = 'mathematics' | 'physics' | 'chemistry' | 'aptitude' | 'all';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  subject: 'mathematics' | 'physics' | 'chemistry' | 'aptitude';
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
}

export interface UserStudyNote {
  id: string;
  title: string;
  subject: Subject;
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
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  difficulty: string;
  subjectBreakdown: ExamResult['subjectBreakdown'];
  questions: Question[];
  answers: ExamResult['answers'];
}

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
  subject: 'mathematics' | 'physics' | 'chemistry' | 'aptitude';
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
  subject: 'mathematics' | 'physics' | 'chemistry' | 'aptitude';
  category: string;
  front: string;
  back: string;
  hint?: string;
}

export interface MasterNoteSection {
  id: string;
  heading: string;
  content: string; // Markdown / detailed theoretical notes
  equations?: {
    name: string;
    formula: string;
    explanation: string;
  }[];
  workedExamples?: {
    problem: string;
    stepByStepSolution: string[];
    shortcutTip?: string;
  }[];
  examTraps?: string[];
  keyTakeaways: string[];
}

export interface MasterNoteChapter {
  id: string;
  subject: 'mathematics' | 'physics' | 'chemistry' | 'aptitude';
  chapterNumber: number;
  title: string;
  gradeLevel: 'Grade 11 & 12 Advanced' | 'University Prep';
  overview: string;
  estimatedReadTimeMinutes: number;
  sections: MasterNoteSection[];
}

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
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
  subject: 'mathematics' | 'physics' | 'chemistry' | 'aptitude';
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
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  subjectBreakdown: {
    mathematics: { total: number; correct: number };
    physics: { total: number; correct: number };
    chemistry: { total: number; correct: number };
    aptitude: { total: number; correct: number };
  };
  answers: {
    questionId: string;
    userSelected: number | null;
    isCorrect: boolean;
  }[];
}
