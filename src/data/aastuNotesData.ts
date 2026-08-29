import { MasterNoteChapter, Subject } from '../types';
import { MATH_MASTER_NOTES } from './notesMath';
import { DAY1_ENGLISH_MASTER_NOTES } from './notesDay1English';
import { DAY2_PHYSICS_MASTER_NOTES } from './notesDay2Physics';
import { PHYSICS_MASTER_NOTES } from './notesPhysics';
import { CHEMISTRY_MASTER_NOTES } from './notesChemistry';
import { APTITUDE_MASTER_NOTES } from './notesAptitude';

export const ALL_AASTU_MASTER_NOTES: MasterNoteChapter[] = [
  ...MATH_MASTER_NOTES,
  ...DAY1_ENGLISH_MASTER_NOTES,
  ...DAY2_PHYSICS_MASTER_NOTES,
  ...PHYSICS_MASTER_NOTES,
  ...CHEMISTRY_MASTER_NOTES,
  ...APTITUDE_MASTER_NOTES,
];

export const getMasterNotesBySubject = (subject: Subject): MasterNoteChapter[] => {
  if (subject === 'all') return ALL_AASTU_MASTER_NOTES;
  return ALL_AASTU_MASTER_NOTES.filter((chapter) => chapter.subject === subject);
};

