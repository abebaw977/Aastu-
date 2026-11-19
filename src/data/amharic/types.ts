import type { Subject } from '../../types';

export interface AmharicSubjectMeta {
  nameAm: string;
  shortNameAm: string;
  overviewAm: string;
}

export interface AmharicSection {
  headingAm: string;
  contentAm: string;
  keyPointsAm?: string[];
}

export interface AmharicWorkedExample {
  problemAm: string;
  stepsAm: string[];
  tipAm?: string;
}

export interface AmharicGlossaryItem {
  termEn: string;
  termAm: string;
  definitionAm: string;
}

export interface AmharicReviewQA {
  questionAm: string;
  answerAm: string;
}

export interface AmharicChapterNote {
  subject: Subject;
  chapterNumber: number;
  titleAm: string;
  briefOverviewAm: string;
  briefPointsAm: string[];
  examTipAm: string;
  expandedOverviewAm?: string;
  learningOutcomesAm?: string[];
  sectionsAm?: AmharicSection[];
  workedExamplesAm?: AmharicWorkedExample[];
  glossaryAm?: AmharicGlossaryItem[];
  examTrapsAm?: string[];
  keyTakeawaysAm?: string[];
  reviewQaAm?: AmharicReviewQA[];
}
