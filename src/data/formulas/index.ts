import { FormulaItem, Subject } from '../../types';
import { MATH_FORMULAS } from './mathFormulas';
import { PHYSICS_FORMULAS } from './physicsFormulas';
import { CHEMISTRY_FORMULAS } from './chemistryFormulas';
import { APTITUDE_FORMULAS } from './aptitudeFormulas';

export const ALL_FORMULAS: FormulaItem[] = [
  ...MATH_FORMULAS,
  ...PHYSICS_FORMULAS,
  ...CHEMISTRY_FORMULAS,
  ...APTITUDE_FORMULAS,
];

export { MATH_FORMULAS, PHYSICS_FORMULAS, CHEMISTRY_FORMULAS, APTITUDE_FORMULAS };

export const FORMULA_STATS = {
  total: ALL_FORMULAS.length,
  mathematics: MATH_FORMULAS.length,
  physics: PHYSICS_FORMULAS.length,
  chemistry: CHEMISTRY_FORMULAS.length,
  aptitude: APTITUDE_FORMULAS.length,
};

export const FORMULA_CATEGORIES: Record<Subject, string[]> = {
  all: ['All Categories'],
  mathematics: Array.from(new Set(MATH_FORMULAS.map(f => f.category))),
  physics: Array.from(new Set(PHYSICS_FORMULAS.map(f => f.category))),
  chemistry: Array.from(new Set(CHEMISTRY_FORMULAS.map(f => f.category))),
  aptitude: Array.from(new Set(APTITUDE_FORMULAS.map(f => f.category))),
};
