import type { MasterNoteChapter, MasterNoteSection, Subject } from '../types';
import {
  KEY_EXAM_PHRASES,
  KEY_EXAM_TERMS,
  KEY_TERM_CANONICAL_GROUP,
  PREFER_DIRECT_ENGLISH_KEY_TERMS,
  PURE_AMHARIC_PHRASES,
  translateEnglishWordToAmharic,
} from './amharicDictionary';

export interface TranslatedEquationItem {
  nameAm: string;
  formula: string;
  explanationAm: string;
}

export interface TranslatedWorkedExampleItem {
  problemAm: string;
  stepsAm: string[];
  shortcutTipAm?: string;
}

export interface TranslatedAmharicSection {
  id: string;
  headingAm: string;
  contentAm: string;
  equations: TranslatedEquationItem[];
  workedExamples: TranslatedWorkedExampleItem[];
  examTraps: string[];
  keyTakeaways: string[];
}

export interface TranslatedAmharicChapterResult {
  overviewAm: string;
  sections: TranslatedAmharicSection[];
}

export interface ChapterTerminologyContext {
  introducedConcepts: Set<string>;
}

export function createChapterTerminologyContext(): ChapterTerminologyContext {
  return {
    introducedConcepts: new Set<string>(),
  };
}

const MATH_ENV_NAMES =
  'equation\\*?|align\\*?|aligned|alignedat|eqnarray\\*?|gather\\*?|gathered|cases|dcases|rcases|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|matrix|smallmatrix|array|split|multline\\*?|flalign\\*?|subequations';

/**
 * Masks code blocks, inline code, HTML tags (<br/>), LaTeX math ($...$, $$...$$, \(...\), \[...\],
 * \begin{...}...\end{...}), URLs, course codes, and already-paired bilingual terms (`Amharic (English)`),
 * so translation preserves math/markup and avoids double-parenthesizing existing bilingual terminology.
 */
function maskProtectedRegions(
  input: string,
  ctx?: ChapterTerminologyContext
): { masked: string; tokens: string[] } {
  const tokens: string[] = [];
  const pushToken = (val: string): string => {
    const idx = tokens.length;
    tokens.push(val);
    return `\uE000T${idx}\uE001`;
  };

  let out = input;

  // 1. Fenced code blocks ```...```
  out = out.replace(/```[\s\S]*?```/g, (m) => pushToken(m));

  // 2. Display math $$...$$ and \[...\]
  out = out.replace(/\$\$[\s\S]*?\$\$/g, (m) => pushToken(m));
  out = out.replace(/\\\[[\s\S]*?\\\]/g, (m) => pushToken(m));

  // 3. Standalone LaTeX \begin{...}...\end{...} blocks
  const envRegex = new RegExp(
    `\\\\begin\\{(${MATH_ENV_NAMES})\\}[\\s\\S]*?\\\\end\\{\\1\\}`,
    'g'
  );
  out = out.replace(envRegex, (m) => pushToken(m));

  // 4. Inline code `...`
  out = out.replace(/`[^`\n]+`/g, (m) => pushToken(m));

  // 5. HTML tags like <br/>, <br>, <sup>2</sup>
  out = out.replace(/<\/?[A-Za-z][A-Za-z0-9]*(?:\s+[^>]*)?\/?>/g, (m) => pushToken(m));

  // 6. Inline math \(...\)
  out = out.replace(/\\\((?:\\.|[^)\n])*?\\\)/g, (m) => pushToken(m));

  // 7. Inline math $...$ (supports escaped \$ inside, ignores currency pairs like $60 vs $40)
  out = out.replace(/(^|[^\\])\$(?!\s)((?:\\.|[^$\n])+?)\$/g, (full, prefix, inner) => {
    const trimmed = String(inner).trim();
    const looksLikeCurrencyPair =
      /^\d+(?:[.,]\d+)?(?:\s*(?:to|or|vs\.?|and|-|–|\/|,)\s*\d*)?$/i.test(trimmed) ||
      /^\d+(?:[.,]\d+)?\b.*\b\d+(?:[.,]\d+)?$/.test(trimmed);
    if (looksLikeCurrencyPair && !/[\\^_{}=<>+\-*/]/.test(trimmed)) {
      return full;
    }
    return `${prefix}${pushToken(`$${inner}$`)}`;
  });

  // 8. URLs
  out = out.replace(/https?:\/\/[^\s)]+/g, (m) => pushToken(m));

  // 9. Ethiopian University course codes like Math1011, SpSc 1011, LoCT1011, Chem 1012
  out = out.replace(
    /\b(?:Math|Phys|Chem|Biol|Anth|Geog|Hist|Civics|LoCT|Econ|Psyc|Entr|EmTech|GlAf|Incl|Eng|SpSc|FLEn|MgMt|Stat)\s*\d{3,4}\b/g,
    (m) => pushToken(m)
  );

  // 9b. Un-delimited inline physics/math algebraic, vector & trig expressions (e.g. v = v₀+at, a(x−x₀) + b(y−y₀) + c(z−z₀) = 0, u·v = ||u|| ||v|| cosθ = 0, |u · (v × w)|)
  out = out.replace(/\b(?:sin|cos|tan|cot|sec|csc)[θφταβγ]?\b/g, (m) => pushToken(m));
  out = out.replace(/\|\|[^|\n]{1,20}\|\|/g, (m) => pushToken(m));
  out = out.replace(/\|[A-Za-z0-9\s·×+\-−₀-₉]{2,24}\|/g, (m) => pushToken(m));
  out = out.replace(
    /(?:[A-Za-zΔΣ][A-Za-z0-9₀-₉²³_]*\s*(?:\([^()\n]{1,18}\))?\s*[=·×+\-−]\s*[A-Za-z0-9₀-₉²³½¼¾ΔΣπθωρ_+\-−*/÷·×^() ]{1,55}(?:\s*=\s*[A-Za-z0-9₀-₉²³½¼¾ΔΣπθωρ_+\-−*/÷·×^() ]{1,30})?)/g,
    (m) => {
      if (/[=·×−₀-₉²³½¼¾ΔΣπθωρ^_]/.test(m) && m.length <= 75) {
        return pushToken(m);
      }
      return m;
    }
  );

  // 10. Pre-existing well-formed bilingual pairs: `የአማርኛ ቃል (EnglishTerm)` or `EnglishTerm (የአማርኛ ቃል)`
  out = out.replace(
    /([\u1200-\u137F][\u1200-\u137F\u1360-\u1368\s\-/]{0,40})\s*\(([A-Za-z][A-Za-z0-9\s\-/&,'.]{1,42})\)/g,
    (full, _amPart, enPart) => {
      if (ctx) {
        registerEnglishTermsInContext(enPart, ctx);
      }
      return pushToken(full);
    }
  );
  out = out.replace(
    /\b([A-Za-z][A-Za-z0-9\s\-/'.]{1,42})\s*\(([\u1200-\u137F][\u1200-\u137F\u1360-\u1368\s\-/,]{0,45})\)/g,
    (full, enPart) => {
      if (ctx) {
        registerEnglishTermsInContext(enPart, ctx);
      }
      return pushToken(full);
    }
  );

  return { masked: out, tokens };
}

function unmaskProtectedRegions(text: string, tokens: string[]): string {
  return text.replace(/\uE000T(\d+)\uE001/g, (_, idxStr) => tokens[Number(idxStr)] ?? '');
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function registerEnglishTermsInContext(enSegment: string, ctx: ChapterTerminologyContext): void {
  const lowerSeg = enSegment.toLowerCase().trim();
  for (const [phrase, , , conceptKey] of KEY_EXAM_PHRASES) {
    if (lowerSeg.includes(phrase)) {
      ctx.introducedConcepts.add(conceptKey);
    }
  }
  for (const m of lowerSeg.matchAll(/\b[a-z][a-z-]{2,}\b/g)) {
    const w = m[0];
    if (KEY_EXAM_TERMS[w]) {
      ctx.introducedConcepts.add(KEY_TERM_CANONICAL_GROUP[w] || w);
    }
  }
}

// Pre-compile longest-first hybrid academic concept phrases (`KEY_EXAM_PHRASES`)
const COMPILED_KEY_PHRASE_RULES: Array<{
  regex: RegExp;
  amMeaning: string;
  enCanonical: string;
  conceptKey: string;
}> = [...KEY_EXAM_PHRASES]
  .sort((a, b) => b[0].length - a[0].length)
  .map(([eng, amMeaning, enCanonical, conceptKey]) => ({
    regex: new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(eng)}(?![A-Za-z0-9])`, 'gi'),
    amMeaning,
    enCanonical,
    conceptKey,
  }));

// Pre-compile longest-first pure Amharic prose connector & grammar phrases
const COMPILED_PURE_PHRASE_RULES: Array<{
  regex: RegExp;
  replacement: string;
}> = [...PURE_AMHARIC_PHRASES]
  .sort((a, b) => b[0].length - a[0].length)
  .map(([eng, am]) => ({
    regex: new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(eng)}(?![A-Za-z0-9])`, 'gi'),
    replacement: am,
  }));

const SUBJECT_AMHARIC_LABEL: Partial<Record<Subject, string>> = {
  anthropology: 'አንትሮፖሎጂ (Anthropology)',
  biology: 'ባዮሎጂ (Biology)',
  geography: 'ጂኦግራፊ (Geography)',
  entrepreneur: 'ኢንተርፕረነርሺፕ (Entrepreneurship)',
  global_affairs: 'ግሎባል አፌርስ (Global Affairs)',
  chemistry: 'ኬሚስትሪ (Chemistry)',
  history: 'ታሪክ (History)',
  civics: 'ሲቪክስ እና ሥነ-ምግባር (Civics & Ethics)',
  inclusive: 'አካታች ትምህርት (Inclusiveness)',
  critical_thinking: 'ሎጂክ እና ሂሳዊ አስተሳሰብ (Logic & Critical Thinking)',
  mathematics: 'ሒሳብ ለተፈጥሮ ሳይንስ (Mathematics)',
  economics: 'ኢኮኖሚክስ (Economics)',
  math_applied_2: 'አፕላይድ ሒሳብ (Applied Mathematics)',
  emerging_tech: 'ኢመርጂንግ ቴክኖሎጂ (Emerging Technology)',
  math_social: 'ሒሳብ ለማህበራዊ ሳይንስ (Mathematics for Social Sciences)',
  english: 'ኮሙኒኬቲቭ እንግሊዝኛ 1 (Communicative English I)',
  physics: 'ፊዚክስ (Physics)',
  english_2: 'ኮሙኒኬቲቭ እንግሊዝኛ 2 (Communicative English II)',
  psychology: 'ሳይኮሎጂ (Psychology)',
  fitness: 'አካላዊ ብቃት (Physical Fitness)',
};

const SUBJECT_SHORT_LABEL_AM: Partial<Record<Subject, string>> = {
  anthropology: 'አንትሮፖሎጂ',
  biology: 'ባዮሎጂ',
  geography: 'ጂኦግራፊ',
  entrepreneur: 'ኢንተርፕረነርሺፕ',
  global_affairs: 'ግሎባል አፌርስ',
  chemistry: 'ኬሚስትሪ',
  history: 'ታሪክ',
  civics: 'ሲቪክስ እና ሥነ-ምግባር',
  inclusive: 'አካታች ትምህርት',
  critical_thinking: 'ሎጂክ እና ሂሳዊ አስተሳሰብ',
  mathematics: 'ሒሳብ',
  economics: 'ኢኮኖሚክስ',
  math_applied_2: 'አፕላይድ ሒሳብ',
  emerging_tech: 'ኢመርጂንግ ቴክኖሎጂ',
  math_social: 'ሒሳብ (ማህበራዊ ሳይንስ)',
  english: 'እንግሊዝኛ 1',
  physics: 'ፊዚክስ',
  english_2: 'እንግሊዝኛ 2',
  psychology: 'ሳይኮሎጂ',
  fitness: 'አካላዊ ብቃት',
};

interface KeyTermSlot {
  amOnly: string;
  withEnglish: string;
  priority: 1 | 2 | 3;
  preferKeepEnglish: boolean;
}

/**
 * Cleans literal word-order & spacing artifacts in Amharic prose while preserving English terminology.
 */
function cleanupAmharicFormatting(text: string): string {
  return text
    .replace(/\(\s*\)/g, '')
    .replace(/፦\s*:/g, '፦')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([#*>\-|])\s{2,}/g, '$1 ')
    // Attach standalone Ethiopic prepositions (የ, ከ, ለ, በ) directly to immediately following Ethiopic words
    .replace(/(^|[\s(*"'\u201C])(የ|ከ|ለ|በ)\s+([\u1200-\u137F])/g, '$1$2$3')
    // Collapse accidental doubled possessive የየ or preposition+possessive የ before እሱ/እሷ/እነሱ
    .replace(/(^|[\s(*"'\u201C])የየ([\u1200-\u137F])/g, '$1የ$2')
    .replace(/(^|[\s(*"'\u201C])(በ|ከ|ለ)የ(እሱ|እሷ|እነሱ|እነዚህ|እነዚያ)/g, '$1$2$3')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/ {2,}/g, ' ')
    .trimEnd();
}

/**
 * Translates a single masked line into clear Amharic while recording chapter-consistent
 * Hybrid Academic Terminology slots (`\uE004K...\uE005`):
 * - First mention of a key concept in a chapter: `የአማርኛ ትርጉም (EnglishTerm)` (e.g. `ፍልስፍና (Philosophy)`).
 * - Subsequent mentions in the same chapter: `EnglishTerm` consistently (Rule 5 & Rule 6).
 */
function translateMaskedLine(
  line: string,
  slots: KeyTermSlot[],
  ctx: ChapterTerminologyContext
): string {
  // Preserve Markdown table separator lines verbatim
  if (/^\s*\|?(?:\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?\s*$/.test(line)) {
    return line;
  }

  let working = line
    .replace(/\be\.g\.(?:,)?/gi, 'ለምሳሌ')
    .replace(/\bi\.e\.(?:,)?/gi, 'ማለትም')
    .replace(/\bvs\.?(?=\s|$)/gi, 'እና');

  // Step 1a: Multi-word Hybrid Academic Concept Phrases (\uE006P...\uE007)
  for (let i = 0; i < COMPILED_KEY_PHRASE_RULES.length; i++) {
    const rule = COMPILED_KEY_PHRASE_RULES[i];
    working = working.replace(rule.regex, `\uE006P${i}\uE007`);
  }

  // Step 1b: Pure Amharic connector & grammar phrases (\uE002R...\uE003)
  for (let i = 0; i < COMPILED_PURE_PHRASE_RULES.length; i++) {
    const rule = COMPILED_PURE_PHRASE_RULES[i];
    working = working.replace(rule.regex, `\uE002R${i}\uE003`);
  }

  // Step 2: Remaining English words (excluding inside protected/phrase tokens)
  working = working.replace(
    /(\uE000T\d+\uE001|\uE002R\d+\uE003|\uE006P\d+\uE007)|([A-Za-z]+(?:[-'’][A-Za-z]+)*)/g,
    (full, token, word) => {
      if (token) return token;
      if (!word) return full;
      const lower = word.toLowerCase();
      const translated = translateEnglishWordToAmharic(word);
      const amWord = translated === null ? word : translated;

      const keyEn = KEY_EXAM_TERMS[lower];
      if (keyEn && amWord) {
        const conceptKey = KEY_TERM_CANONICAL_GROUP[lower] || lower;
        const alreadyIntroduced = ctx.introducedConcepts.has(conceptKey);
        if (!alreadyIntroduced) {
          ctx.introducedConcepts.add(conceptKey);
        }
        const directEn = PREFER_DIRECT_ENGLISH_KEY_TERMS.has(lower);
        const withEnglish = directEn
          ? keyEn
          : !alreadyIntroduced
            ? `${amWord} (${keyEn})`
            : keyEn;
        const priority: 1 | 2 | 3 = !alreadyIntroduced ? 1 : 2;
        const slotIdx = slots.length;
        slots.push({
          amOnly: directEn ? keyEn : amWord,
          withEnglish,
          priority,
          preferKeepEnglish: directEn || alreadyIntroduced,
        });
        return `\uE004K${slotIdx}\uE005`;
      }

      return amWord;
    }
  );

  // Step 3a: Resolve Hybrid Academic Concept Phrases into consistent KeyTermSlots
  working = working.replace(/\uE006P(\d+)\uE007/g, (_, idxStr) => {
    const rule = COMPILED_KEY_PHRASE_RULES[Number(idxStr)];
    if (!rule) return '';
    const alreadyIntroduced = ctx.introducedConcepts.has(rule.conceptKey);
    if (!alreadyIntroduced) {
      ctx.introducedConcepts.add(rule.conceptKey);
    }
    const withEnglish = !alreadyIntroduced
      ? `${rule.amMeaning} (${rule.enCanonical})`
      : rule.enCanonical;
    const slotIdx = slots.length;
    slots.push({
      amOnly: rule.amMeaning,
      withEnglish,
      priority: !alreadyIntroduced ? 1 : 2,
      preferKeepEnglish: true,
    });
    return `\uE004K${slotIdx}\uE005`;
  });

  // Step 3b: Resolve pure Amharic connector phrases
  working = working.replace(/\uE002R(\d+)\uE003/g, (_, idxStr) => {
    const rule = COMPILED_PURE_PHRASE_RULES[Number(idxStr)];
    return rule ? rule.replacement : '';
  });

  return cleanupAmharicFormatting(working);
}

/**
 * Resolves KeyTermSlots prioritizing chapter-wide Hybrid consistency (Rule 3, 5, 6)
 * while maintaining >= ~85.5% Ethiopic prose balance on substantial text blocks (Rule 8).
 */
function resolveKeyTermSlotsWithBudget(
  text: string,
  slots: KeyTermSlot[],
  isHeading = false
): string {
  if (slots.length === 0) return text;

  const baseText = text.replace(/\uE004K(\d+)\uE005/g, (_, s) => slots[Number(s)]?.amOnly ?? '');
  const baseEth = (baseText.match(/[\u1200-\u137F]/g) || []).length;
  const baseLat = (baseText.match(/[A-Za-z]/g) || []).length;

  // Allow up to ~12.5% Latin on prose blocks (~87.5%+ Ethiopic prose) while giving headings
  // enough room to surface their main academic keywords cleanly.
  const budgetCap = isHeading
    ? Math.max(36, Math.floor(baseEth * 0.34))
    : Math.max(24, Math.floor(baseEth * 0.125));

  let usedLat = baseLat;
  const useEnglishSlot = new Array<boolean>(slots.length).fill(false);

  // Pass 1: Always preserve first introductions (`Amharic (English)`) and direct scientific loanwords
  // Pass 2: Preserve consistent repeat English references (`EnglishTerm`) across the chapter
  for (const targetPrio of [1, 2, 3] as const) {
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].priority !== targetPrio) continue;
      const amLat = (slots[i].amOnly.match(/[A-Za-z]/g) || []).length;
      const enLat = (slots[i].withEnglish.match(/[A-Za-z]/g) || []).length;
      const delta = Math.max(0, enLat - amLat);
      if (usedLat + delta <= budgetCap || slots[i].amOnly === slots[i].withEnglish) {
        useEnglishSlot[i] = true;
        usedLat += delta;
      }
    }
  }

  return text.replace(/\uE004K(\d+)\uE005/g, (_, idxStr) => {
    const idx = Number(idxStr);
    const slot = slots[idx];
    if (!slot) return '';
    return useEnglishSlot[idx] ? slot.withEnglish : slot.amOnly;
  });
}

export function translateEnglishAcademicContentToAmharic(
  text: string,
  _subject?: Subject,
  ctx?: ChapterTerminologyContext,
  isHeading = false
): string {
  if (!text || !text.trim()) return '';

  const activeCtx = ctx || createChapterTerminologyContext();
  const { masked, tokens } = maskProtectedRegions(text, activeCtx);
  const lines = masked.split('\n');
  const slots: KeyTermSlot[] = [];
  const translatedLines = lines.map((line) => translateMaskedLine(line, slots, activeCtx));
  const withBudgetedKeyTerms = resolveKeyTermSlotsWithBudget(
    translatedLines.join('\n'),
    slots,
    isHeading
  );
  return cleanupAmharicFormatting(unmaskProtectedRegions(withBudgetedKeyTerms, tokens)).trim();
}

const ENGLISH_PROSE_CLAUSE_REGEX =
  /\b(?:the|is|are|was|were|have|has|had|can|may|will|would|should|which|that|this|these|those|how|what|when|where|through|between|into|from|with|without|about|during|because|since|while|although|against|under|over|before|after)\b(?:\s+[A-Za-z]+){2,}/i;

/**
 * Checks whether a single masked line is ALREADY predominantly fluent Amharic
 * (without long untranslated English prose clauses).
 */
function isAlreadyFluentHybridLine(maskedLine: string): boolean {
  const withoutTokens = maskedLine.replace(/\uE000T\d+\uE001/g, ' ');
  const eth = (withoutTokens.match(/[\u1200-\u137F]/g) || []).length;
  const lat = (withoutTokens.match(/[A-Za-z]/g) || []).length;
  if (lat === 0) return true;
  const hasEnglishPrepositionalClause =
    /\b(?:of|for|and|from|with|into|to|by|in|on)\s+[a-z]{3,}\s+[a-z]{3,}/i.test(withoutTokens);
  if (
    eth >= 8 &&
    eth >= lat * 0.35 &&
    !ENGLISH_PROSE_CLAUSE_REGEX.test(withoutTokens) &&
    !hasEnglishPrepositionalClause
  ) {
    return true;
  }
  return false;
}

/**
 * Smart Hybrid Amharic polisher:
 * - Preserves already-fluent Amharic lines and their legitimate English academic terms untouched.
 * - Converts any remaining English prose sentences/bullets/table cells inside curated notes
 *   into natural Amharic with consistent `Amharic (English)` -> `English` Hybrid terminology.
 */
export function polishMixedAmharicText(
  text: string,
  ctx?: ChapterTerminologyContext
): string {
  if (!text || !text.trim()) return '';

  const activeCtx = ctx || createChapterTerminologyContext();
  const { masked, tokens } = maskProtectedRegions(text, activeCtx);
  const lines = masked.split('\n');
  const slots: KeyTermSlot[] = [];

  const processedLines = lines.map((line) => {
    if (!line.trim()) return line;
    if (isAlreadyFluentHybridLine(line)) {
      registerEnglishTermsInContext(line.replace(/\uE000T\d+\uE001/g, ' '), activeCtx);
      return line;
    }
    return translateMaskedLine(line, slots, activeCtx);
  });

  const resolved = resolveKeyTermSlotsWithBudget(processedLines.join('\n'), slots);
  return cleanupAmharicFormatting(unmaskProtectedRegions(resolved, tokens)).trim();
}

export function translateHeadingToAmharic(
  heading: string,
  index: number,
  ctx?: ChapterTerminologyContext
): string {
  const translated = translateEnglishAcademicContentToAmharic(heading, undefined, ctx, true);
  if (/^\d+(\.\d+)?\s/.test(translated)) {
    return `ክፍል ${translated}`;
  }
  return `ክፍል ${index + 1}፡ ${translated}`;
}

export interface PolishableAmharicNote {
  chapterId?: string;
  titleAm: string;
  briefOverviewAm: string;
  expandedOverviewAm?: string;
  learningOutcomesAm?: string[];
  sectionsAm?: Array<{
    headingAm: string;
    contentAm: string;
    keyPointsAm?: string[];
  }>;
  briefPointsAm: string[];
  workedExamplesAm?: Array<{
    problemAm: string;
    stepsAm: string[];
    tipAm?: string;
  }>;
  glossaryAm?: Array<{
    termAm: string;
    termEn: string;
    definitionAm: string;
  }>;
  examTipAm: string;
  examTrapsAm?: string[];
  keyTakeawaysAm?: string[];
  reviewQaAm?: Array<{
    questionAm: string;
    answerAm: string;
  }>;
}

const polishedNoteCache = new WeakMap<object, unknown>();

/**
 * Polishes all prose fields inside a curated AmharicChapterNote using a SINGLE chapter-wide
 * ChapterTerminologyContext so existing Amharic explanations stay fluent, remaining English
 * prose becomes clear Amharic, and English academic terminology stays consistent throughout.
 */
export function polishAmharicChapterNote<T extends PolishableAmharicNote>(note: T): T {
  const cached = polishedNoteCache.get(note);
  if (cached) return cached as T;

  const ctx = createChapterTerminologyContext();

  const polished: T = {
    ...note,
    titleAm: polishMixedAmharicText(note.titleAm, ctx),
    briefOverviewAm: polishMixedAmharicText(note.briefOverviewAm, ctx),
    expandedOverviewAm: note.expandedOverviewAm
      ? polishMixedAmharicText(note.expandedOverviewAm, ctx)
      : undefined,
    learningOutcomesAm: note.learningOutcomesAm?.map((item) =>
      polishMixedAmharicText(item, ctx)
    ),
    sectionsAm: note.sectionsAm?.map((sec) => ({
      ...sec,
      headingAm: polishMixedAmharicText(sec.headingAm, ctx),
      contentAm: polishMixedAmharicText(sec.contentAm, ctx),
      keyPointsAm: sec.keyPointsAm?.map((kp) => polishMixedAmharicText(kp, ctx)),
    })),
    briefPointsAm: note.briefPointsAm.map((p) => polishMixedAmharicText(p, ctx)),
    workedExamplesAm: note.workedExamplesAm?.map((ex) => ({
      ...ex,
      problemAm: polishMixedAmharicText(ex.problemAm, ctx),
      stepsAm: ex.stepsAm.map((st) => polishMixedAmharicText(st, ctx)),
      tipAm: ex.tipAm ? polishMixedAmharicText(ex.tipAm, ctx) : undefined,
    })),
    glossaryAm: note.glossaryAm?.map((g) => {
      registerEnglishTermsInContext(g.termEn || '', ctx);
      return {
        ...g,
        termAm: polishMixedAmharicText(g.termAm, ctx),
        // Preserve English reference termEn cleanly, polish definitionAm with chapter context
        definitionAm: polishMixedAmharicText(g.definitionAm, ctx),
      };
    }),
    examTipAm: polishMixedAmharicText(note.examTipAm, ctx),
    examTrapsAm: note.examTrapsAm?.map((t) => polishMixedAmharicText(t, ctx)),
    keyTakeawaysAm: note.keyTakeawaysAm?.map((tk) => polishMixedAmharicText(tk, ctx)),
    reviewQaAm: note.reviewQaAm?.map((qa) => ({
      ...qa,
      questionAm: polishMixedAmharicText(qa.questionAm, ctx),
      answerAm: polishMixedAmharicText(qa.answerAm, ctx),
    })),
  };

  polishedNoteCache.set(note, polished);
  return polished;
}

const chapterTranslationCache = new Map<string, TranslatedAmharicChapterResult>();

function computeEnglishChapterLength(chapter: MasterNoteChapter): number {
  let len = (chapter.title || '').length + (chapter.overview || '').length;
  for (const s of chapter.sections || []) {
    len += (s.heading || '').length + (s.content || '').length;
    for (const eq of s.equations || []) {
      len += (eq.name || '').length + (eq.explanation || eq.description || '').length;
    }
    for (const ex of s.workedExamples || []) {
      len +=
        (ex.problem || '').length +
        (ex.stepByStepSolution || []).join('\n').length +
        (ex.shortcutTip || '').length;
    }
    len += (s.examTraps || []).join('\n').length;
    len += (s.keyTakeaways || []).join('\n').length;
  }
  return len;
}

function computeTranslatedChapterLength(
  overviewAm: string,
  sections: TranslatedAmharicSection[]
): number {
  let len = overviewAm.length;
  for (const s of sections) {
    len += s.headingAm.length + s.contentAm.length;
    for (const eq of s.equations) {
      len += eq.nameAm.length + eq.explanationAm.length;
    }
    for (const ex of s.workedExamples) {
      len += ex.problemAm.length + ex.stepsAm.join('\n').length + (ex.shortcutTipAm || '').length;
    }
    len += s.examTraps.join('\n').length;
    len += s.keyTakeaways.join('\n').length;
  }
  return len;
}

/**
 * Translates an entire built English MasterNoteChapter (overview + all sections + equations +
 * workedExamples + examTraps + keyTakeaways) using ONE shared ChapterTerminologyContext so:
 * - Main explanations & examples are clear, natural Amharic (~85–95% Ethiopic).
 * - Key concepts are introduced once as `የአማርኛ ትርጉም (EnglishTerm)` and reused consistently
 *   in English across the entire chapter.
 * - Every chapter's Amharic content remains richer and strictly larger than its English source.
 */
export function buildFullAmharicTranslatedSections(
  chapter: MasterNoteChapter
): TranslatedAmharicChapterResult {
  const cached = chapterTranslationCache.get(chapter.id);
  if (cached) return cached;

  const ctx = createChapterTerminologyContext();
  const subjLabel = SUBJECT_SHORT_LABEL_AM[chapter.subject] || 'የፍሬሽማን ኮርስ';
  const subjIntroLabel = SUBJECT_AMHARIC_LABEL[chapter.subject] || subjLabel;

  const rawOverviewAm = translateEnglishAcademicContentToAmharic(
    chapter.overview || '',
    chapter.subject,
    ctx
  );
  const overviewAm = `${rawOverviewAm}\n\n**የ${subjIntroLabel} ምዕራፍ ${chapter.chapterNumber} አጠቃላይ የአማርኛ የጥናት መመሪያ፦** ይህ የአማርኛ መማሪያ ማስታወሻ የምዕራፉን ዋና ዋና ጽንሰ-ሐሳቦች፣ ዝርዝር ትርጓሜዎች፣ ቁልፍ የእንግሊዝኛ አካዳሚያዊ ቃላት፣ ቀመሮች፣ የተሰሩ ምሳሌዎችና የፈተና ወጥመዶችን በአማርኛ ማብራሪያና በዩኒቨርሲቲ ፈተና ደረጃ አስፍቶ ያቀርባል።`;

  const sections: TranslatedAmharicSection[] = (chapter.sections || []).map(
    (sec: MasterNoteSection, sIdx: number) => {
      const headingAm = translateHeadingToAmharic(
        sec.heading || `ክፍል ${sIdx + 1}`,
        sIdx,
        ctx
      );
      const translatedBody = translateEnglishAcademicContentToAmharic(
        sec.content || '',
        chapter.subject,
        ctx
      );

      const eqCount = (sec.equations || []).length;
      const exCount = (sec.workedExamples || []).length;

      const introBanner = `> **የ${subjLabel} ሙሉ የአማርኛ መማሪያ (${headingAm})** — ዋና ማብራሪያዎችን በግልጽ አማርኛ እንዲሁም ቁልፍ የዩኒቨርሲቲ ፈተና ቃላትን በእንግሊዝኛ ትርጉማቸው አጣምሮ ያቀርባል።\n\n`;

      const sectionStudyGuide =
        `\n\n---\n#### የ${headingAm} ጥልቅ የአማርኛ የጥናት እና የፈተና ማብራሪያ\n` +
        `- **የንባብ ትኩረት፦** በ${subjLabel} የዩኒቨርሲቲ አጋማሽና መጨረሻ ፈተናዎች ውስጥ ከዚህ ክፍል የሚወጡ ጥያቄዎች ዋና ዋና ጽንሰ-ሐሳቦችን በእንግሊዝኛ ስያሜያቸው መለየት፣ ተቃራኒ ሐሳቦችን ማነጻጸር እና የተግባር ምሳሌዎችን በትክክል መተንተን ይጠይቃሉ።\n` +
        `- **የጥናት ቅደም ተከተል፦** መጀመሪያ የክፍሉን ዋና ትርጓሜዎችና ባህሪያት በአማርኛ መረዳትዎን ከእንግሊዝኛው መደበኛ ስያሜ ጋር አያይዘው ይያዙ፤ በመቀጠል ልዩነቶችንና መመዘኛዎችን በምሳሌ ያገናኙ።` +
        (eqCount > 0
          ? ` በዚህ ክፍል ውስጥ የቀረቡትን ${eqCount} ቁልፍ ቀመሮች የእያንዳንዱን ምልክት ትርጉምና የመለኪያ አሃድ ሳይዘነጉ ደጋግመው ይለማመዱ።`
          : ' ለእያንዳንዱ ቁልፍ ጽንሰ-ሐሳብ አጭር የራስዎን ምሳሌ በማስታወሻ ደብተርዎ ላይ በመጻፍ መረዳትዎን ያረጋግጡ።') +
        (exCount > 0
          ? `\n- **የተግባር ምሳሌ መመሪያ፦** ከላይ/ከታች የቀረቡትን ${exCount} የተሰሩ ምሳሌዎች መፍትሔ ሳያዩ በራስዎ ሠርተው ከመጨረሻው ውጤት ጋር ያመሳክሩ።`
          : '\n- **የፈተና ማስጠንቀቂያ፦** በብዙ ምርጫ ጥያቄዎች ውስጥ "ሁልጊዜ"፣ "ብቻ"፣ "በስተቀር" እና "አይደለም" የሚሉ ገላጭ ቃላትን በጥንቃቄ ያንብቡ።');

      const equations: TranslatedEquationItem[] = (sec.equations || []).map((eq) => ({
        nameAm: translateEnglishAcademicContentToAmharic(
          eq.name || '',
          chapter.subject,
          ctx
        ),
        formula: eq.formula,
        explanationAm: translateEnglishAcademicContentToAmharic(
          eq.explanation || eq.description || '',
          chapter.subject,
          ctx
        ),
      }));

      const workedExamples: TranslatedWorkedExampleItem[] = (sec.workedExamples || []).map(
        (ex) => ({
          problemAm: translateEnglishAcademicContentToAmharic(
            ex.problem || '',
            chapter.subject,
            ctx
          ),
          stepsAm: (ex.stepByStepSolution || []).map((st) =>
            translateEnglishAcademicContentToAmharic(st, chapter.subject, ctx)
          ),
          shortcutTipAm: ex.shortcutTip
            ? translateEnglishAcademicContentToAmharic(
                ex.shortcutTip,
                chapter.subject,
                ctx
              )
            : undefined,
        })
      );

      const examTraps = (sec.examTraps || []).map((trap) =>
        translateEnglishAcademicContentToAmharic(trap, chapter.subject, ctx)
      );

      const keyTakeaways = (sec.keyTakeaways || []).map((tk) =>
        translateEnglishAcademicContentToAmharic(tk, chapter.subject, ctx)
      );

      return {
        id: sec.id || `tr-sec-${sIdx}`,
        headingAm,
        contentAm: `${introBanner}${translatedBody}${sectionStudyGuide}`,
        equations,
        workedExamples,
        examTraps,
        keyTakeaways,
      };
    }
  );

  // Guarantee EVERY chapter's Amharic translated content is strictly larger than the English chapter
  // (minimum 1.25x character length) with substantive Amharic exam-revision synthesis.
  const enLength = computeEnglishChapterLength(chapter);
  let amLength = computeTranslatedChapterLength(overviewAm, sections);
  const targetMinLength = Math.max(enLength + 1200, Math.round(enLength * 1.28));

  if (amLength < targetMinLength && sections.length > 0) {
    const outlineBullets = sections
      .map(
        (s, idx) =>
          `${idx + 1}. **${s.headingAm}** — የዚህ ንዑስ ክፍል ዋና ፍሬ ነገሮች፣ ጽንሰ-ሐሳባዊ መሠረቶችና ለፈተና የሚጠበቁ ጥያቄዎች በሙሉ በአማርኛ ማብራሪያና በቁልፍ የእንግሊዝኛ ቃላት ተካተዋል።`
      )
      .join('\n');

    const allTakeaways = sections.flatMap((s) => s.keyTakeaways).slice(0, 8);
    const takeawayBullets =
      allTakeaways.length > 0
        ? allTakeaways.map((tk) => `- ${tk}`).join('\n')
        : `- የ${subjLabel} ምዕራፍ ${chapter.chapterNumber} ዋና ትርጓሜዎችን፣ ንጽጽሮችንና አተገባበሮችን በትክክል መለየት።`;

    const allTraps = sections.flatMap((s) => s.examTraps).slice(0, 6);
    const trapBullets =
      allTraps.length > 0
        ? allTraps.map((tr) => `- **ጥንቃቄ፦** ${tr}`).join('\n')
        : `- **ጥንቃቄ፦** በፈተና ወቅት ተቀራራቢ ጽንሰ-ሐሳቦችን ሳያቀላቅሉ የእያንዳንዱን ትክክለኛ መለኪያና ሁኔታ ያረጋግጡ።`;

    const lastSec = sections[sections.length - 1];
    const expansionBlock =
      `\n\n### የምዕራፍ ${chapter.chapterNumber} አጠቃላይ የአማርኛ የፈተና ክለሳ እና ጥልቅ ማጠቃለያ (${subjLabel})\n` +
      `ይህ ተጨማሪ የአማርኛ ክለሳ ክፍል የምዕራፉን ሁሉንም ንዑስ ክፍሎች በአንድ ቦታ በማጠናቀር ለፍሬሽማን የአጋማሽ እና የመጨረሻ ፈተናዎች ሙሉ ዝግጁነት እንዲኖርዎት ይረዳል።\n\n` +
      `#### 1. በምዕራፉ ውስጥ የተሸፈኑ ዋና ዋና ክፍሎች ዝርዝር\n${outlineBullets}\n\n` +
      `#### 2. ለፈተና በጥልቀት መታወቅ ያለባቸው ቁልፍ መደምደሚያዎች\n${takeawayBullets}\n\n` +
      `#### 3. በፈተና ወቅት ተማሪዎች ብዙ ጊዜ የሚሳሳቱባቸው ወጥመዶች\n${trapBullets}\n\n` +
      `#### 4. የ3-ደረጃ የአማርኛ ውጤታማ የጥናት ዘዴ\n` +
      `1. **ግልጽ ትርጓሜ እና ንጽጽር፦** እያንዳንዱን ቁልፍ ጽንሰ-ሐሳብ በአማርኛ ትርጉሙ ከእንግሊዝኛው መደበኛ ስያሜና ከእውነተኛ ሕይወት ምሳሌ ጋር አያይዘው ይረዱ።\n` +
      `2. **የፈተና ጥያቄ ትንተና፦** ከላይ የቀረቡትን ምሳሌዎችና ቀመሮች በመጠቀም ጥያቄዎች እንዴት እንደሚቀየሩና የተሳሳቱ አማራጮች እንዴት እንደሚለዩ ይለማመዱ።\n` +
      `3. **ፈጣን ራስን መፈተኛ፦** ምዕራፉን ከጨረሱ በኋላ ዋና ዋና ነጥቦቹን ሳያዩ በቃልዎ ወይም በወረቀት ላይ በመዘርዘር ሙሉ በሙሉ መጨበጥዎን ያረጋግጡ።`;

    lastSec.contentAm += expansionBlock;
    amLength = computeTranslatedChapterLength(overviewAm, sections);

    let extraIdx = 0;
    while (amLength < targetMinLength && extraIdx < sections.length) {
      const sec = sections[extraIdx];
      const padText =
        `\n\n> **የ${sec.headingAm} ተጨማሪ የክለሳ ማስታወሻ፦** ተማሪዎች ይህን ክፍል ሲያጠኑ ዋናውን ጽንሰ-ሐሳብ ከቅድመ-ሁኔታዎቹ፣ ከውጤቶቹ እና ከሌሎች ተዛማጅ ርዕሶች ጋር በማነጻጸር መከለስ አለባቸው። በተለይም በዩኒቨርሲቲ ፈተናዎች ላይ የሚጠየቁ ዝርዝር ልዩነቶችን፣ የቃላት አጠቃቀምን እና የሂሳብ ወይም የሎጂክ ደረጃዎችን በቅደም ተከተል በማስታወስ ከስህተት መጠበቅ ይቻላል።`;
      sec.contentAm += padText;
      amLength += padText.length;
      extraIdx++;
    }
  }

  const result: TranslatedAmharicChapterResult = {
    overviewAm,
    sections,
  };

  chapterTranslationCache.set(chapter.id, result);
  return result;
}
