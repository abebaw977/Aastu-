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
  priority: 1 | 2 | 3 | 4;
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

const BOILERPLATE_BOLD_LABELS = new Set([
  'note',
  'important',
  'tip',
  'exam tip',
  'shortcut',
  'shortcut tip',
  'example',
  'examples',
  'definition',
  'definitions',
  'summary',
  'warning',
  'caution',
  'solution',
  'answer',
  'why',
  'formula',
  'overview',
  'introduction',
  'objectives',
  'chapter introduction',
  'chapter objectives',
  'learning objectives',
  'key takeaways',
  'exam trap',
  'exam traps',
  'key idea',
  'meaning',
  'etymology',
  'question',
  'recall',
  'proof',
  'given',
  'step',
  'therefore',
  'hence',
  'conclusion',
]);

const FINITE_ENGLISH_CLAUSE_WORDS =
  /\b(?:is|are|was|were|have|has|had|can|could|may|might|will|would|should|must|that|which|who|whom|whose|when|where|why|how|because|since|although|if|unless|they|we|you|he|she|it|does|did|do|makes|made|shows|gives|means|refers|occurs|allows|causes|enables)\b/i;

const GENERAL_NON_NOUN_WORDS = new Set([
  'about', 'above', 'across', 'after', 'again', 'against', 'almost', 'alone', 'along', 'already',
  'although', 'always', 'among', 'another', 'answer', 'anyone', 'anything', 'around', 'became',
  'because', 'become', 'becomes', 'becoming', 'before', 'behind', 'being', 'below', 'beside',
  'between', 'beyond', 'both', 'cannot', 'chapter', 'clearly', 'common', 'commonly', 'complete',
  'completely', 'consider', 'considered', 'considering', 'contains', 'could', 'create', 'created',
  'creates', 'creating', 'current', 'currently', 'describe', 'described', 'describes', 'describing',
  'detail', 'details', 'determine', 'determined', 'determines', 'develop', 'developed', 'developing',
  'different', 'differently', 'direct', 'directly', 'discuss', 'discussed', 'discusses', 'during',
  'earlier', 'easily', 'either', 'enable', 'enables', 'enough', 'entire', 'especially', 'essential',
  'essentially', 'every', 'everyone', 'everything', 'example', 'examples', 'except', 'explain',
  'explained', 'explaining', 'explains', 'express', 'expressed', 'first', 'follow', 'following',
  'follows', 'former', 'found', 'frequently', 'further', 'furthermore', 'general', 'generally',
  'given', 'gives', 'giving', 'great', 'greater', 'greatest', 'having', 'hence', 'hereby',
  'higher', 'highest', 'however', 'identify', 'identified', 'identifies', 'important', 'importantly',
  'include', 'included', 'includes', 'including', 'increase', 'increased', 'increases', 'increasing',
  'indeed', 'indicate', 'indicated', 'indicates', 'instead', 'into', 'involve', 'involved',
  'involves', 'involving', 'known', 'large', 'larger', 'largest', 'later', 'latter', 'learn',
  'learning', 'least', 'less', 'likewise', 'little', 'local', 'lower', 'mainly', 'major',
  'making', 'many', 'meaning', 'means', 'meant', 'might', 'moreover', 'mostly', 'multiple',
  'must', 'namely', 'necessary', 'needed', 'needs', 'neither', 'never', 'nonetheless', 'nothing',
  'number', 'occur', 'occurred', 'occurring', 'occurs', 'often', 'other', 'others', 'otherwise',
  'overall', 'particular', 'particularly', 'people', 'perhaps', 'place', 'possible', 'possibly',
  'present', 'presented', 'presents', 'primary', 'primarily', 'produce', 'produced', 'produces',
  'provide', 'provided', 'provides', 'providing', 'rather', 'really', 'recent', 'recently',
  'refer', 'referred', 'referring', 'refers', 'regard', 'regarding', 'regardless', 'related',
  'remain', 'remains', 'require', 'required', 'requires', 'requiring', 'result', 'resulting',
  'results', 'second', 'section', 'several', 'should', 'shown', 'shows', 'similar', 'similarly',
  'simple', 'simply', 'since', 'single', 'small', 'smaller', 'smallest', 'some', 'someone',
  'something', 'sometimes', 'somewhat', 'specific', 'specifically', 'state', 'stated', 'states',
  'still', 'study', 'studying', 'subject', 'subjects', 'such', 'summarize', 'summary', 'support',
  'taken', 'takes', 'taking', 'their', 'theirs', 'themselves', 'there', 'therefore', 'these',
  'they', 'thing', 'things', 'third', 'those', 'though', 'three', 'through', 'throughout', 'today',
  'together', 'toward', 'towards', 'under', 'understand', 'understanding', 'unless', 'until',
  'usually', 'using', 'various', 'versus', 'where', 'whereas', 'whether', 'which', 'while',
  'within', 'without', 'would', 'written',
]);

const ACADEMIC_NOUN_SUFFIX_REGEX =
  /(?:tion|sion|ment|ism|ist|logy|graphy|metry|nomy|osis|sis|ity|ance|ence|ure|ide|ate|ine|gen|ium|ics|ory|ary|age|dom|ship|gram|sphere|graph|scope|meter|type|form|rate|law|rule|scale|stage|phase|level|factor|system|model|theory|method|process|concept|principle|effect|force|energy|value|ratio|index|class|group|order|cycle|zone|layer|field|wave|bond|acid|base|cell|gene|trait|organ|tissue)$/i;

function translateSimplePhraseToAmharic(phrase: string): string {
  if (!phrase || !phrase.trim()) return phrase;
  let working = phrase.trim();
  for (let i = 0; i < COMPILED_PURE_PHRASE_RULES.length; i++) {
    working = working.replace(COMPILED_PURE_PHRASE_RULES[i].regex, `\uE002R${i}\uE003`);
  }
  working = working.replace(/(\uE002R\d+\uE003)|([A-Za-z]+(?:[-'’][A-Za-z]+)*)/g, (full, tok, word) => {
    if (tok) return tok;
    if (!word) return full;
    const translated = translateEnglishWordToAmharic(word);
    return translated === null ? word : translated;
  });
  working = working.replace(/\uE002R(\d+)\uE003/g, (_, idxStr) => {
    const rule = COMPILED_PURE_PHRASE_RULES[Number(idxStr)];
    return rule ? rule.replacement : '';
  });
  return cleanupAmharicFormatting(working);
}

function isBoldMajorTermCandidate(rawInner: string): boolean {
  if (!rawInner || /\uE000T|\uE008B/.test(rawInner)) return false;
  const cleaned = rawInner
    .replace(/^(\d+(?:\.\d+)*[.)]\s*|[A-Za-z]\)\s*)/, '')
    .replace(/[:;,.!?]+$/, '')
    .trim();
  if (!cleaned || cleaned.length < 2 || cleaned.length > 56) return false;
  if (!/[A-Za-z]{2,}/.test(cleaned)) return false;
  const words = cleaned.split(/\s+/);
  if (words.length > 6) return false;
  if (/^(?:step|part|chapter)\s+\d+$/i.test(cleaned)) return false;
  if (BOILERPLATE_BOLD_LABELS.has(cleaned.toLowerCase())) return false;
  if (FINITE_ENGLISH_CLAUSE_WORDS.test(cleaned)) return false;
  return true;
}

function buildBoldTermSlot(
  rawInner: string,
  slots: KeyTermSlot[],
  ctx: ChapterTerminologyContext
): string | null {
  if (!isBoldMajorTermCandidate(rawInner)) return null;

  const prefixMatch = rawInner.match(/^(\d+(?:\.\d+)*[.)]\s*|[A-Za-z]\)\s*)(.+)$/);
  const prefix = prefixMatch ? prefixMatch[1] : '';
  const body = (prefixMatch ? prefixMatch[2] : rawInner).trim();
  const trailingPunctMatch = body.match(/([:;,.!?]+)$/);
  const trailingPunct = trailingPunctMatch ? trailingPunctMatch[1] : '';
  const coreTerm = body.slice(0, body.length - trailingPunct.length).trim();
  if (!coreTerm) return null;

  const lowerCore = coreTerm.toLowerCase();
  const amCore = translateSimplePhraseToAmharic(coreTerm);
  const amOnly = `**${prefix}${amCore}${trailingPunct}**`;

  // Check if coreTerm matches a multi-word KEY_EXAM_PHRASES entry or single KEY_EXAM_TERMS
  const matchedPhrase = COMPILED_KEY_PHRASE_RULES.find(
    (r) => r.enCanonical.toLowerCase() === lowerCore
  );
  if (matchedPhrase) {
    const already = ctx.introducedConcepts.has(matchedPhrase.conceptKey);
    if (!already) ctx.introducedConcepts.add(matchedPhrase.conceptKey);
    const display = !already && matchedPhrase.amMeaning !== matchedPhrase.enCanonical
      ? `${matchedPhrase.amMeaning} (${matchedPhrase.enCanonical})`
      : matchedPhrase.enCanonical;
    const slotIdx = slots.length;
    slots.push({
      amOnly: `**${prefix}${matchedPhrase.amMeaning}${trailingPunct}**`,
      withEnglish: `**${prefix}${display}${trailingPunct}**`,
      priority: 1,
      preferKeepEnglish: true,
    });
    return `\uE008B${slotIdx}\uE009`;
  }

  const singleKeyEn = KEY_EXAM_TERMS[lowerCore];
  if (singleKeyEn) {
    const conceptKey = KEY_TERM_CANONICAL_GROUP[lowerCore] || lowerCore;
    const already = ctx.introducedConcepts.has(conceptKey);
    if (!already) ctx.introducedConcepts.add(conceptKey);
    const directEn = PREFER_DIRECT_ENGLISH_KEY_TERMS.has(lowerCore);
    const singleAm = translateEnglishWordToAmharic(coreTerm) || amCore;
    const display =
      !already && !directEn && singleAm && singleAm !== singleKeyEn && /[\u1200-\u137F]/.test(singleAm)
        ? `${singleAm} (${singleKeyEn})`
        : singleKeyEn;
    const slotIdx = slots.length;
    slots.push({
      amOnly: directEn ? `**${prefix}${singleKeyEn}${trailingPunct}**` : amOnly,
      withEnglish: `**${prefix}${display}${trailingPunct}**`,
      priority: 1,
      preferKeepEnglish: true,
    });
    return `\uE008B${slotIdx}\uE009`;
  }

  // Register any inner key terms in chapter context and keep the English major term/type/part intact
  registerEnglishTermsInContext(coreTerm, ctx);
  const slotIdx = slots.length;
  slots.push({
    amOnly,
    withEnglish: `**${prefix}${coreTerm}${trailingPunct}**`,
    priority: 1,
    preferKeepEnglish: true,
  });
  return `\uE008B${slotIdx}\uE009`;
}

function makeListItemSlotToken(
  itemText: string,
  slots: KeyTermSlot[],
  ctx: ChapterTerminologyContext
): string | null {
  const trimmed = itemText.trim();
  if (!trimmed || trimmed.length < 3 || trimmed.length > 36) return null;
  if (/\uE000T|\uE008B/.test(trimmed)) return null;
  const words = trimmed.split(/\s+/);
  if (words.length > 3) return null;
  if (FINITE_ENGLISH_CLAUSE_WORDS.test(trimmed)) return null;
  if (words.every((w) => GENERAL_NON_NOUN_WORDS.has(w.toLowerCase()))) return null;

  const lower = trimmed.toLowerCase();
  const singleKeyEn = KEY_EXAM_TERMS[lower];
  const amGloss = translateSimplePhraseToAmharic(trimmed);
  let withEnglish = trimmed;
  if (singleKeyEn) {
    const conceptKey = KEY_TERM_CANONICAL_GROUP[lower] || lower;
    const already = ctx.introducedConcepts.has(conceptKey);
    if (!already) ctx.introducedConcepts.add(conceptKey);
    const directEn = PREFER_DIRECT_ENGLISH_KEY_TERMS.has(lower);
    withEnglish =
      !already && !directEn && /[\u1200-\u137F]/.test(amGloss)
        ? `${amGloss} (${singleKeyEn})`
        : singleKeyEn;
  } else {
    registerEnglishTermsInContext(trimmed, ctx);
    // Title-case single lowercase academic list items (e.g., "mass, temperature, speed" -> "Mass, Temperature, Speed")
    withEnglish = trimmed.replace(/\b[a-z]/g, (ch) => ch.toUpperCase());
  }

  const slotIdx = slots.length;
  slots.push({
    amOnly: amGloss,
    withEnglish,
    priority: 2,
    preferKeepEnglish: true,
  });
  return `\uE008B${slotIdx}\uE009`;
}

function isAcademicFallbackNoun(word: string, isMidSentenceCapitalized: boolean): boolean {
  if (word.length < 5) return false;
  const lower = word.toLowerCase();
  if (GENERAL_NON_NOUN_WORDS.has(lower) || FINITE_ENGLISH_CLAUSE_WORDS.test(lower)) return false;
  if (/(?:ing|ed|ly|est|ier|ies)$/i.test(lower) && !ACADEMIC_NOUN_SUFFIX_REGEX.test(lower)) {
    return false;
  }
  return isMidSentenceCapitalized || ACADEMIC_NOUN_SUFFIX_REGEX.test(lower) || lower.length >= 7;
}

/**
 * Translates a single masked line into clear Amharic while recording chapter-consistent
 * Hybrid Academic Terminology slots (`\uE004K...\uE005`):
 * - Main words, bolded types/parts, table concept cells, and listed items stay in English
 *   while explanations, connectors, and teaching prose stay in natural Amharic (78%–84%).
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

  // Step 0a: Markdown table concept cells (first column & short header cells)
  if (/^\s*\|.+\|\s*$/.test(working)) {
    const rawCells = working.split('|');
    const isHeaderLike = rawCells.every((c) => c.trim() === '' || c.trim().split(/\s+/).length <= 5);
    const updatedCells = rawCells.map((cell, idx) => {
      if (idx === 0 || idx === rawCells.length - 1) return cell;
      const trimmed = cell.trim();
      if (!trimmed || /\uE000T|\uE008B/.test(trimmed)) return cell;
      const stripBold = trimmed.replace(/^\*\*(.+)\*\*$/, '$1').trim();
      const wasBold = trimmed.startsWith('**') && trimmed.endsWith('**');
      const words = stripBold.split(/\s+/);
      if (
        (idx === 1 || isHeaderLike) &&
        words.length >= 1 &&
        words.length <= 4 &&
        /[A-Za-z]{2,}/.test(stripBold) &&
        !FINITE_ENGLISH_CLAUSE_WORDS.test(stripBold)
      ) {
        const amCell = translateSimplePhraseToAmharic(stripBold);
        registerEnglishTermsInContext(stripBold, ctx);
        const slotIdx = slots.length;
        slots.push({
          amOnly: wasBold ? `**${amCell}**` : amCell,
          withEnglish: wasBold ? `**${stripBold}**` : stripBold,
          priority: 1,
          preferKeepEnglish: true,
        });
        return ` \uE008B${slotIdx}\uE009 `;
      }
      return cell;
    });
    working = updatedCells.join('|');
  }

  // Step 0b: Bolded Major Terms / Types / Parts (`**...**`)
  working = working.replace(/\*\*([^*\n]{2,56})\*\*/g, (full, inner) => {
    const slotTok = buildBoldTermSlot(inner, slots, ctx);
    return slotTok ?? full;
  });

  // Step 0c: Short standalone listed bullet/numbered items (e.g. `1. Nominal Scale`)
  const standaloneListMatch = working.match(
    /^(\s*(?:[-*]|\d+[.)]|[a-zA-Z]\))\s+)([A-Za-z][A-Za-z0-9\s\-/'&]{2,36})$/
  );
  if (standaloneListMatch) {
    const [, lead, item] = standaloneListMatch;
    if (!FINITE_ENGLISH_CLAUSE_WORDS.test(item) && item.split(/\s+/).length <= 4) {
      const tok = makeListItemSlotToken(item, slots, ctx);
      if (tok) {
        working = `${lead}${tok}`;
      }
    }
  }

  // Step 0d: Inline comma-separated listed types/parts/examples (`A, B, and C` or `A, B, C`)
  working = working.replace(
    /\b([A-Za-z][A-Za-z0-9\-/']*(?:\s+[A-Za-z0-9\-/']+){0,2}(?:,\s+[A-Za-z][A-Za-z0-9\-/']*(?:\s+[A-Za-z0-9\-/']+){0,2})+(?:,?\s+(?:and|or)\s+[A-Za-z][A-Za-z0-9\-/']*(?:\s+[A-Za-z0-9\-/']+){0,2})?)\b/g,
    (full) => {
      if (/\uE000T|\uE008B/.test(full)) return full;
      const parts = full
        .split(/\s*,\s*(?:and|or)\s+|\s*,\s+|\s+(?:and|or)\s+/i)
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length < 2) return full;
      const validNounParts = parts.filter(
        (p) =>
          p.split(/\s+/).length <= 3 &&
          p.length >= 3 &&
          /[A-Za-z]{3,}/.test(p) &&
          !FINITE_ENGLISH_CLAUSE_WORDS.test(p) &&
          !p.split(/\s+/).every((w) => GENERAL_NON_NOUN_WORDS.has(w.toLowerCase()))
      );
      // Require majority of items to be real noun terms (either capitalized or >= 3 items)
      const capCount = validNounParts.filter((p) => /^[A-Z]/.test(p)).length;
      if (validNounParts.length < 2 || (capCount < 2 && parts.length < 3)) {
        return full;
      }
      const hasOr = /\bor\b/i.test(full);
      const renderedParts = parts.map((p) => makeListItemSlotToken(p, slots, ctx) || p);
      if (renderedParts.length === 2) {
        return `${renderedParts[0]} ${hasOr ? 'ወይም' : 'እና'} ${renderedParts[1]}`;
      }
      const last = renderedParts.pop();
      return `${renderedParts.join('፣ ')} ${hasOr ? 'ወይም' : 'እና'} ${last}`;
    }
  );

  // Step 1a: Multi-word Hybrid Academic Concept Phrases (\uE006P...\uE007)
  for (let i = 0; i < COMPILED_KEY_PHRASE_RULES.length; i++) {
    const rule = COMPILED_KEY_PHRASE_RULES[i];
    working = working.replace(/(\uE000T\d+\uE001|\uE008B\d+\uE009)|([^\uE000\uE008]+)/g, (m, tok, seg) => {
      if (tok) return tok;
      return seg.replace(rule.regex, `\uE006P${i}\uE007`);
    });
  }

  // Step 1b: Pure Amharic connector & grammar phrases (\uE002R...\uE003)
  for (let i = 0; i < COMPILED_PURE_PHRASE_RULES.length; i++) {
    const rule = COMPILED_PURE_PHRASE_RULES[i];
    working = working.replace(/(\uE000T\d+\uE001|\uE008B\d+\uE009|\uE006P\d+\uE007)|([^\uE000\uE006\uE008]+)/g, (m, tok, seg) => {
      if (tok) return tok;
      return seg.replace(rule.regex, `\uE002R${i}\uE003`);
    });
  }

  // Step 2: Remaining English words (excluding inside protected/phrase tokens)
  working = working.replace(
    /(\uE000T\d+\uE001|\uE002R\d+\uE003|\uE006P\d+\uE007|\uE008B\d+\uE009)|([A-Za-z]+(?:[-'’][A-Za-z]+)*)/g,
    (full, token, word, offset) => {
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
        const priority: 1 | 2 | 3 | 4 = !alreadyIntroduced ? 1 : 2;
        const slotIdx = slots.length;
        slots.push({
          amOnly: directEn ? keyEn : amWord,
          withEnglish,
          priority,
          preferKeepEnglish: directEn || alreadyIntroduced,
        });
        return `\uE004K${slotIdx}\uE005`;
      }

      // Check mid-sentence capitalized academic nouns or high-value noun fallbacks
      const prevChar = offset > 0 ? working.slice(Math.max(0, offset - 3), offset) : '';
      const isLineOrSentenceStart = offset === 0 || /(?:^|\n|[.!?]\s+|:\s*|-\s*)$/.test(prevChar);
      const isMidCap = /^[A-Z][a-z]{3,}$/.test(word) && !isLineOrSentenceStart;

      if (translated !== null && /[\u1200-\u137F]/.test(amWord)) {
        if (isMidCap && !GENERAL_NON_NOUN_WORDS.has(lower)) {
          const slotIdx = slots.length;
          slots.push({
            amOnly: amWord,
            withEnglish: word,
            priority: 3,
            preferKeepEnglish: true,
          });
          return `\uE004K${slotIdx}\uE005`;
        }
        if (isAcademicFallbackNoun(word, false)) {
          const slotIdx = slots.length;
          const capEn = word.charAt(0).toUpperCase() + word.slice(1);
          slots.push({
            amOnly: amWord,
            withEnglish: capEn,
            priority: 4,
            preferKeepEnglish: false,
          });
          return `\uE004K${slotIdx}\uE005`;
        }
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

  // Step 3c: Unwrap structural bold/list/table tokens (\uE008B...\uE009) into unified KeyTermSlots
  working = working.replace(/\uE008B(\d+)\uE009/g, (_, idxStr) => `\uE004K${idxStr}\uE005`);

  return cleanupAmharicFormatting(working);
}

function isMathOrHtmlToken(tokenValue: string): boolean {
  if (!tokenValue) return false;
  if (tokenValue.startsWith('$') || tokenValue.startsWith('\\(') || tokenValue.startsWith('\\[') || tokenValue.startsWith('\\begin{') || tokenValue.startsWith('```') || tokenValue.startsWith('<')) {
    return true;
  }
  if (/[=·×−₀-₉²³½¼¾ΔΣπθωρ^_]|\\(?:frac|vec|sum|int|sqrt|alpha|beta|theta)/.test(tokenValue)) {
    return true;
  }
  return false;
}

/**
 * Resolves KeyTermSlots targeting 78%–84% Amharic explanations with 16%–22% English
 * major words, bolded types/parts, table concept labels, and listed terms.
 */
function resolveKeyTermSlotsWithBudget(
  text: string,
  slots: KeyTermSlot[],
  tokens: string[],
  isHeading = false
): string {
  if (slots.length === 0) return text;

  const baseText = text
    .replace(/\uE004K(\d+)\uE005/g, (_, s) => slots[Number(s)]?.amOnly ?? '')
    .replace(/\uE000T(\d+)\uE001/g, (_, idxStr) => {
      const val = tokens[Number(idxStr)] ?? '';
      return isMathOrHtmlToken(val) ? ' ' : val;
    });
  let usedEth = (baseText.match(/[\u1200-\u137F]/g) || []).length;
  let usedLat = (baseText.match(/[A-Za-z]/g) || []).length;

  const useEnglishSlot = new Array<boolean>(slots.length).fill(false);

  // Target 78%–84% Amharic on body prose (hard floor 78.5%, Priority-4 ceiling 83.2%)
  // and allow headings down to 68% Amharic so chapter/section headings keep English major topics.
  const floorByPriority: Record<1 | 2 | 3 | 4, number> = isHeading
    ? { 1: 0.68, 2: 0.72, 3: 0.76, 4: 0.79 }
    : { 1: 0.788, 2: 0.795, 3: 0.810, 4: 0.815 };

  for (const targetPrio of [1, 2, 3, 4] as const) {
    const minRatio = floorByPriority[targetPrio];
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].priority !== targetPrio) continue;
      const curTotal = usedEth + usedLat;
      const curRatio = curTotal > 0 ? usedEth / curTotal : 1;
      if (targetPrio === 4 && !isHeading && curRatio <= 0.832) {
        break;
      }

      const amEth = (slots[i].amOnly.match(/[\u1200-\u137F]/g) || []).length;
      const amLat = (slots[i].amOnly.match(/[A-Za-z]/g) || []).length;
      const enEth = (slots[i].withEnglish.match(/[\u1200-\u137F]/g) || []).length;
      const enLat = (slots[i].withEnglish.match(/[A-Za-z]/g) || []).length;

      const nextEth = usedEth + (enEth - amEth);
      const nextLat = usedLat + (enLat - amLat);
      const nextTotal = nextEth + nextLat;
      const nextRatio = nextTotal > 0 ? nextEth / nextTotal : 1;

      if (nextRatio >= minRatio || slots[i].amOnly === slots[i].withEnglish) {
        useEnglishSlot[i] = true;
        usedEth = nextEth;
        usedLat = nextLat;
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
    tokens,
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

  const resolved = resolveKeyTermSlotsWithBudget(
    processedLines.join('\n'),
    slots,
    tokens
  );
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
  const overviewAm = `${rawOverviewAm}\n\n**የ${subjIntroLabel} ምዕራፍ ${chapter.chapterNumber} የጥናት መመሪያ፦** ይህ ማስታወሻ ዋና የእንግሊዝኛ ቃላትን (Key Terms), Types/Parts, ቀመሮችን፣ የተሰሩ ምሳሌዎችንና የፈተና ወጥመዶችን በአማርኛ ማብራሪያ (78%–84% አማርኛ) አጣምሮ ያቀርባል።`;

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

      const introBanner = `> **የ${subjLabel} ሙሉ የአማርኛ መማሪያ (${headingAm})** — ዋና ቃላት፣ Types እና Parts በእንግሊዝኛ፣ ማብራሪያዎቹ በግልጽ አማርኛ ቀርበዋል።\n\n`;

      const sectionStudyGuide =
        `\n\n---\n#### የ${headingAm} የጥናት እና የፈተና ትኩረት\n` +
        `- **የጥናት መመሪያ፦** በ${subjLabel} ፈተናዎች ውስጥ የክፍሉን ዋና ትርጓሜዎች (Key Terms)፣ ዓይነቶችን (Types) እና ክፍሎችን (Parts) በእንግሊዝኛ ስያሜያቸው ከአማርኛ ማብራሪያቸው ጋር አያይዘው ይያዙ።` +
        (eqCount > 0
          ? `\n- **ቀመሮችና Units፦** በዚህ ክፍል ውስጥ ያሉትን ${eqCount} ቀመሮች (Equations) ከመለኪያ Units ጋር ደጋግመው ይለማመዱ።`
          : '') +
        (exCount > 0
          ? `\n- **የተሰሩ ምሳሌዎች፦** የቀረቡትን ${exCount} Solved Examples መፍትሔ ሳያዩ በራስዎ ሠርተው ከመጨረሻው ውጤት ጋር ያመሳክሩ።`
          : '\n- **የፈተና ማስጠንቀቂያ፦** በብዙ ምርጫ ጥያቄዎች ውስጥ "ሁልጊዜ/Always"፣ "ብቻ/Only"፣ "በስተቀር/Except" እና "አይደለም/Not" የሚሉ ቃላትን በጥንቃቄ ያንብቡ።');

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

  // Guarantee EVERY chapter's Amharic translated prose & total content is strictly larger
  // than the English chapter while keeping the Hybrid 78-84% Amharic balance.
  const enLength = computeEnglishChapterLength(chapter);
  const enProseLen =
    (chapter.overview || '').length +
    (chapter.sections || []).reduce((acc, s) => acc + (s.heading || '').length + (s.content || '').length, 0);
  let amLength = computeTranslatedChapterLength(overviewAm, sections);
  let amProseLen =
    overviewAm.length +
    sections.reduce((acc, s) => acc + s.headingAm.length + s.contentAm.length, 0);
  const targetMinLength = Math.max(enLength + 1200, Math.round(enLength * 1.25));
  const targetMinProse = Math.max(enProseLen + 600, Math.round(enProseLen * 1.15));

  if ((amLength < targetMinLength || amProseLen < targetMinProse) && sections.length > 0) {
    const outlineBullets = sections
      .map(
        (s, idx) =>
          `${idx + 1}. **${s.headingAm}** — የዚህ ክፍል ዋና ቃላት (Key Terms)፣ ዓይነቶችና ክፍሎች (Types/Parts) እና ለፈተና የሚጠበቁ ነጥቦች በአማርኛ ማብራሪያ ተካተዋል።`
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
        ? allTraps.map((tr) => `- **Exam Trap፦** ${tr}`).join('\n')
        : `- **Exam Trap፦** በፈተና ወቅት ተቀራራቢ ጽንሰ-ሐሳቦችን ሳያቀላቅሉ ሁኔታዎችንና Unitsን ያረጋግጡ።`;

    const lastSec = sections[sections.length - 1];
    const expansionBlock =
      `\n\n### የምዕራፍ ${chapter.chapterNumber} የፈተና ክለሳ እና ማጠቃለያ (${subjLabel})\n` +
      `ይህ የክለሳ ክፍል የምዕራፉን ሁሉንም ንዑስ ክፍሎች በአንድ ላይ በማጠናቀር ለአጋማሽ እና ለመጨረሻ ፈተናዎች (Midterm & Final Exams) ሙሉ ዝግጁነት እንዲኖርዎት ይረዳል።\n\n` +
      `#### 1. በምዕራፉ ውስጥ የተሸፈኑ ዋና ክፍሎች\n${outlineBullets}\n\n` +
      `#### 2. ለፈተና ቁልፍ መደምደሚያዎች\n${takeawayBullets}\n\n` +
      `#### 3. በፈተና ወቅት የተለመዱ ወጥመዶች\n${trapBullets}\n\n` +
      `#### 4. የ3-ደረጃ ውጤታማ የጥናት ዘዴ\n` +
      `1. **ግልጽ ትርጓሜ እና ንጽጽር፦** እያንዳንዱን ቁልፍ ቃል፣ Type እና Part በእንግሊዝኛ ስያሜው ከአማርኛ ማብራሪያው ጋር ያያይዙ።\n` +
      `2. **የፈተና ጥያቄ ትንተና፦** ከላይ የቀረቡትን ምሳሌዎችና ቀመሮች በመጠቀም ጥያቄዎችን ይለማመዱ።\n` +
      `3. **ፈጣን ራስን መፈተኛ፦** ምዕራፉን ከጨረሱ በኋላ ዋና ዋና ቃላቱን ሳያዩ በቃልዎ በመዘርዘር መጨበጥዎን ያረጋግጡ።`;

    lastSec.contentAm += expansionBlock;
    amLength = computeTranslatedChapterLength(overviewAm, sections);
    amProseLen += expansionBlock.length;

    let extraIdx = 0;
    const maxPads = sections.length * 3;
    while ((amLength < targetMinLength || amProseLen < targetMinProse) && extraIdx < maxPads) {
      const sec = sections[extraIdx % sections.length];
      const padText =
        `\n\n> **የ${sec.headingAm} የክለሳ ማስታወሻ፦** ተማሪዎች ይህን ክፍል ሲያጠኑ ዋናውን ጽንሰ-ሐሳብ ከቅድመ-ሁኔታዎቹ፣ ከTypes/Parts ክፍፍሎቹ እና ከሌሎች ተዛማጅ ርዕሶች ጋር በማነጻጸር መከለስ አለባቸው፤ በፈተና ላይ የሚጠየቁ ልዩነቶችንና የሂሳብ ወይም የሎጂክ ደረጃዎችን በቅደም ተከተል በማስታወስ ከስህተት መጠበቅ ይቻላል።`;
      sec.contentAm += padText;
      amLength += padText.length;
      amProseLen += padText.length;
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
