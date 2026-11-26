import type { MasterNoteSection, Subject } from '../types.ts';
import { EXTRA_NOTES_EMERGING } from './extraNotesEmerging.ts';
import { EXTRA_NOTES_MATHS_SCO } from './extraNotesMathsSco.ts';
import { EXTRA_NOTES_ENGLISH1 } from './extraNotesEnglish1.ts';
import { EXTRA_NOTES_PHYSICS } from './extraNotesPhysics.ts';
import { EXTRA_NOTES_ENGLISH2 } from './extraNotesEnglish2.ts';
import { EXTRA_NOTES_PSYCHOLOGY } from './extraNotesPsychology.ts';
import { EXTRA_NOTES_ANTHROPOLOGY } from './extraNotesAnthropology.ts';
import { EXTRA_NOTES_BIOLOGY } from './extraNotesBiology.ts';
import { EXTRA_NOTES_GEOGRAPHY } from './extraNotesGeography.ts';
import { EXTRA_NOTES_ENTREPRENEUR } from './extraNotesEntrepreneur.ts';
import { EXTRA_NOTES_GLOBAL_AFFAIRS } from './extraNotesGlobalAffairs.ts';
import { EXTRA_NOTES_CHEMISTRY } from './extraNotesChemistry.ts';
import { EXTRA_NOTES_HISTORY } from './extraNotesHistory.ts';
import { EXTRA_NOTES_CIVICS } from './extraNotesCivics.ts';
import { EXTRA_NOTES_INCLUSIVE } from './extraNotesInclusive.ts';
import { EXTRA_NOTES_CRITICAL_THINKING } from './extraNotesCriticalThinking.ts';
import { EXTRA_NOTES_MATHS_NAT } from './extraNotesMathsNat.ts';
import { EXTRA_NOTES_ECONOMICS } from './extraNotesEconomics.ts';
import { EXTRA_NOTES_MATHS_APPLIED } from './extraNotesMathsApplied.ts';
import { EXTRA_NOTES_FITNESS } from './extraNotesFitness.ts';

/**
 * Central registry mapping canonical Subject and Chapter Number to enlarged extra notes.
 * This ensures that existing notes in freshmanModules.ts are NEVER modified or deleted,
 * and enlarged notes are cleanly appended at runtime.
 */
export const EXTRA_ENLARGED_NOTES: Partial<Record<Subject, Record<number, MasterNoteSection[]>>> = {
  // Batch 1: Emerging, MathsSco, English1, Physics, English2, Psychology
  emerging_tech: EXTRA_NOTES_EMERGING,
  math_social: EXTRA_NOTES_MATHS_SCO,
  english: EXTRA_NOTES_ENGLISH1,
  physics: EXTRA_NOTES_PHYSICS,
  english_2: EXTRA_NOTES_ENGLISH2,
  psychology: EXTRA_NOTES_PSYCHOLOGY,

  // Batch 2: Anthropology, Biology, Geography, Entrepreneur, GlobalAffairs, Chemistry
  anthropology: EXTRA_NOTES_ANTHROPOLOGY,
  biology: EXTRA_NOTES_BIOLOGY,
  geography: EXTRA_NOTES_GEOGRAPHY,
  entrepreneur: EXTRA_NOTES_ENTREPRENEUR,
  global_affairs: EXTRA_NOTES_GLOBAL_AFFAIRS,
  chemistry: EXTRA_NOTES_CHEMISTRY,

  // Batch 3: History, Civics, Inclusive, CriticalThinking, MathsNat, Economics, MathsApplied
  history: EXTRA_NOTES_HISTORY,
  civics: EXTRA_NOTES_CIVICS,
  inclusive: EXTRA_NOTES_INCLUSIVE,
  critical_thinking: EXTRA_NOTES_CRITICAL_THINKING,
  mathematics: EXTRA_NOTES_MATHS_NAT,
  economics: EXTRA_NOTES_ECONOMICS,
  math_applied_2: EXTRA_NOTES_MATHS_APPLIED,
  fitness: EXTRA_NOTES_FITNESS,
};
