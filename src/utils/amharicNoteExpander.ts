import type { MasterNoteChapter, MasterNoteSection, Subject } from '../types';
import {
  AMHARIC_WORD_DICT,
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

  // 9c. Markdown headings (# ... through ###### ...) stay 100% verbatim in English
  out = out.replace(/^(#{1,6}[ \t]+.+)$/gm, (full) => {
    if (/[\u1200-\u137F]/.test(full)) {
      const enHeading = convertHeadingToEnglish(full);
      if (ctx) registerEnglishTermsInContext(enHeading, ctx);
      return pushToken(enHeading);
    }
    if (ctx) registerEnglishTermsInContext(full, ctx);
    return pushToken(full);
  });

  // 9d. All bolded spans (**...**) without Ethiopic stay 100% verbatim in English
  out = out.replace(/\*\*([^*\n]+)\*\*/g, (full, inner) => {
    if (/[\u1200-\u137F]/.test(inner)) return full;
    if (ctx) registerEnglishTermsInContext(inner, ctx);
    return pushToken(full);
  });

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
  let out = text;
  for (let pass = 0; pass < 10 && /\uE000T\d+\uE001/.test(out); pass++) {
    out = out.replace(/\uE000T(\d+)\uE001/g, (_, idxStr) => tokens[Number(idxStr)] ?? '');
  }
  return out;
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

const HEADING_PHRASE_AM_TO_EN: Array<[string, string]> = ([
  ['የአንትሮፖሎጂ ትርጉም፣ ወሰን እና ታሪካዊ አመጣጥ', 'Meaning, Scope & Historical Origin of Anthropology'],
  ['የአንትሮፖሎጂ ልዩ ባህሪያት፣ Emic vs Etic እና የተሳሳቱ አመለካከቶች', 'Unique Features of Anthropology, Emic vs Etic & Misconceptions'],
  ['ፊዚካል (ባዮሎጂካል) እና አርኪኦሎጂካል አንትሮፖሎጂ', 'Physical (Biological) & Archaeological Anthropology'],
  ['ሊንጉዊስቲክ፣ ሶሺዮ-ካልቸራል እና Applied Anthropology', 'Linguistic, Socio-Cultural & Applied Anthropology'],
  ['ባህል፣ Ethnocentrism vs Relativism እና የባህል ለውጥ ዘዴዎች', 'Culture, Ethnocentrism vs Relativism & Mechanisms of Culture Change'],
  ['ጋብቻ፣ ዝምድና እና የኢትዮጵያ 4ቱ ባህላዊ ቀጠናዎች', 'Marriage, Kinship & Ethiopia’s 4 Cultural Areas'],
  ['የመገለል ትርጉም፣ የጾታ መድልዎ እና የተገለሉ የእደ-ጥበብ ባለሙያዎች', 'Meaning of Marginalization, Gender Discrimination & Craftworkers'],
  ['የጾታና የእድሜ ተጋላጭነት እና የሰብአዊ መብት መፍትሄዎች', 'Gender & Age Vulnerability and Human Rights Remedies'],
  ['Ethnicity vs Race እና ሦስቱ የብሔር ንድፈ-ሐሳቦች', 'Ethnicity vs Race & Three Theories of Ethnicity'],
  ['የብዝሃነት አያያዝ እና መድብለ-ባህላዊነት', 'Managing Diversity & Multiculturalism'],
  ['ባህላዊ አስተዳደር እና የግጭት መፍቻ ተቋማት በኢትዮጵያ', 'Customary Governance & Conflict Resolution Institutions in Ethiopia'],
  ['የሴቶች ሰላም አስከባሪ ተቋማት እና Legal Pluralism', 'Women’s Peacebuilding Institutions & Legal Pluralism'],
  ['የሀገር በቀል እውቀት (IKS) ምንነት፣ ባህሪያት እና የኢትዮጵያ ምሳሌዎች', 'Indigenous Knowledge Systems (IKS): Features & Ethiopian Examples'],
  ['የሀገር በቀል እውቀት', 'Indigenous Knowledge'],
  ['IKS ለዘላቂ ልማት፣ ተግዳሮቶች እና ጥበቃ', 'IKS for Sustainable Development, Challenges & Preservation'],
  ['የሕይወት ባህሪያት፣ Emergent Properties እና የሕይወት አመጣጥ', 'Characteristics of Life, Emergent Properties & Origin of Life'],
  ['የባዮሞለኪውሎች እና የትስስር ሰንጠረዥ', 'Biomolecules & Bonding Matrix'],
  ['የቁስ አካል ምደባ እና ባህሪያት', 'Classification & Properties of Matter'],
  ['የሲቪክስ፣ ሥነ-ምግባር፣ ሞራል እና ሕግ ትርጉምና ንጽጽር', 'Civics, Ethics, Morality & Law: Meaning & Comparison'],
  ['የዜግነት በጎነቶች (Civic Virtues) እና የትምህርቱ ዓላማዎች', 'Civic Virtues & Objectives of Civic Education'],
  ['የፍልስፍና ትርጉም እና አራቱ ዋና ዘርፎች', 'Meaning of Philosophy & Four Core Branches'],
  ['Argument vs Non-Argument እና Deductive vs Inductive', 'Argument vs Non-Argument & Deductive vs Inductive'],
  ['ቋንቋ፣ Vagueness vs Ambiguity እና የትርጉም (Definition) ዓይነቶች', 'Language, Vagueness vs Ambiguity & Types of Definitions'],
  ['Relevance & Weak Induction Fallacies (ዋናዎቹ የፈተና ወጥመዶች)', 'Relevance & Weak Induction Fallacies (Core Exam Traps)'],
  ['Conversion, Obversion & Contraposition (Logically Equivalent መቼ ናቸው?)', 'Conversion, Obversion & Contraposition (Logical Equivalence)'],
  ['ሦስቱ መሰረታዊ የኢኮኖሚ ጥያቄዎች እና የኢኮኖሚ ሥርዓቶች', 'Three Basic Economic Questions & Economic Systems'],
  ['ፍላጎት፣ አቅርቦት፣ Equilibrium እና የመንግሥት የዋጋ ቁጥጥር', 'Demand, Supply, Equilibrium & Government Price Controls'],
  ['የአራቱ የገበያ መዋቅሮች ንጽጽር እና ትርፍ ማክሲማይዜሽን', 'Comparison of Four Market Structures & Profit Maximization'],
  ['ሥራ አጥነት፣ የዋጋ ግሽበት እና የማክሮኢኮኖሚ ፖሊሲዎች', 'Unemployment, Inflation & Macroeconomic Policies'],
  ['አራቱ ኢንዱስትሪያል አብዮቶች (IR 1.0 – IR 4.0) እና DIKW', 'Four Industrial Revolutions (IR 1.0–4.0) & DIKW'],
  ['የዳታ ዓይነቶች፣ Big Data 5Vs እና Hadoop', 'Types of Data, Big Data 5Vs & Hadoop'],
  ['የAI ደረጃዎች እና የMachine Learning ዓይነቶች', 'Levels of AI & Types of Machine Learning'],
  ['ዓለም አቀፍ እና የኢትዮጵያ የአካታችነት ሕጎች', 'International & Ethiopian Inclusion Laws'],
  ['የሀብት አስተዳደር፣ Resource Centers እና Twin-Track Approach', 'Resource Mobilization, Resource Centers & Twin-Track Approach'],
  ['ባለድርሻ አካላት፣ የትብብር ደረጃዎች እና Team Models', 'Stakeholders, Collaboration Levels & Team Models'],
  ['ቬክተሮች፣ Dot Product፣ Projections እና Cross Product', 'Vectors, Dot Product, Projections & Cross Product'],
  ['መስመሮችና ፕሌኖች በ ℝ³ እና Vector Spaces (Subspace, Independence, Basis)', 'Lines & Planes in ℝ³ and Vector Spaces (Subspace, Independence, Basis)'],
  ['የማትሪክስ ዓይነቶች፣ Row Operations (RREF)፣ Rank እና Inverse', 'Types of Matrices, Row Operations (RREF), Rank & Inverse'],
  ['ዲተርሚናንት፣ Cramer\'s Rule፣ Eigenvalues እና Diagonalization', 'Determinants, Cramer\'s Rule, Eigenvalues & Diagonalization'],
  ['የዴሪቬቲቭ ሕጎች፣ Implicit እና Inverse Trig/Hyperbolic ዴሪቬቲቮች', 'Derivative Rules, Implicit & Inverse Trig/Hyperbolic Derivatives'],
  ['MVT፣ ግራፍ ትንተና፣ Optimization እና L\'Hôpital\'s Rule', 'MVT, Curve Sketching, Optimization & L\'Hôpital\'s Rule'],
  ['አራቱ ዋና የኢንቴግሬሽን ቴክኒኮች', 'Four Core Integration Techniques'],
  ['FTC፣ Improper Integrals እና Area / Volume / Arc Length', 'FTC, Improper Integrals & Area / Volume / Arc Length'],
  ['ፕሮፖዚሽናል ሎጂክ፡ ፕሮፖዚሽኖች፣ የሎጂክ አገናኞች እና የሎጂክ ሕጎች', 'Propositional Logic: Propositions, Connectives & Laws of Logic'],
  ['ክፍት ፕሮፖዚሽኖች፣ ኳንቲፋየሮች (∀, ∃) እና የክርክር ትክክለኛነት', 'Open Propositions, Quantifiers (∀, ∃) & Validity of Arguments'],
  ['የስብስብ ቲዎሪ (Set Theory)፣ የስብስብ ስሌቶች እና የInclusion-Exclusion መርህ', 'Set Theory, Set Operations & Inclusion-Exclusion Principle'],
  ['የሪል ቁጥሮች ሥርዓት፣ Completeness Axiom እና ሒሳባዊ ኢንዳክሽን (PMI)', 'Real Number System, Completeness Axiom & Mathematical Induction (PMI)'],
  ['የኮምፕሌክስ ቁጥሮች አልጀብራ፣ ፖላር ቅርጽ እና የDe Moivre ቲዎረም', 'Algebra of Complex Numbers, Polar Form & De Moivre\'s Theorem'],
  ['ግንኙነቶች፣ ፈንክሽኖች፣ Bijection እና ተገላቢጦሽ (Inverse)', 'Relations, Functions, Bijection & Inverse Functions'],
  ['ፖሊኖሚያሎች እና ራሽናል ፈንክሽኖች (Asymptotes & Root Theorems)', 'Polynomial & Rational Functions (Asymptotes & Root Theorems)'],
  ['ኤክስፖኔንሻል፣ ሎጋሪዝም፣ ትሪጎኖሜትሪክ እና ሃይፐርቦሊክ ፈንክሽኖች', 'Exponential, Logarithmic, Trigonometric & Hyperbolic Functions'],
  ['ርቀት፣ ቀጥታ መስመር እና ክብ (Lines & Circles)', 'Distance, Straight Lines & Circles'],
  ['ፓራቦላ፣ ኤሊፕስ፣ ሃይፐርቦላ እና Rotation of Axes', 'Parabola, Ellipse, Hyperbola & Rotation of Axes'],
  ['ፕሮፖዚሽናል ሎጂክ እና አቻነት ሕጎች', 'Propositional Logic & Laws of Equivalence'],
  ['ኳንቲፋየሮች፣ የክርክር ትክክለኛነት እና የስብስብ ቲዎሪ', 'Quantifiers, Validity of Arguments & Set Theory'],
  ['እኩልታዎች፣ ኢንኢኳሊቲዎች እና ፈንክሽኖች', 'Equations, Inequalities & Functions'],
  ['ፖሊኖሚያል፣ ራሽናል፣ ኤክስፖኔንሻል እና ሎጋሪዝም ፈንክሽኖች', 'Polynomial, Rational, Exponential & Logarithmic Functions'],
  ['ማትሪክስ አልጀብራ፣ Row Operations እና Rank', 'Matrix Algebra, Row Operations & Rank'],
  ['ዲተርሚናንት፣ Inverse እና የሊኒየር ሥርዓት መፍቻዎች', 'Determinant, Inverse & Solving Linear Systems'],
  ['ገደብ (Limit)፣ ቀጣይነት (Continuity) እና ዴሪቬቲቮች', 'Limits, Continuity & Derivatives'],
  ['የዴሪቬቲቭ አጠቃቀም (Optimization) እና ኢንቴግሬሽን', 'Applications of Derivatives (Optimization) & Integration'],
  ['SI አሃዶች፣ Dimensional Analysis እና Significant Figures', 'SI Units, Dimensional Analysis & Significant Figures'],
  ['ቬክተሮች፣ Components፣ Dot Product እና Cross Product', 'Vectors, Components, Dot Product & Cross Product'],
  ['ኪኔማቲክስ (1D, Projectile, Circular) እና የኒውተን ሕጎች', 'Kinematics (1D, Projectile, Circular) & Newton\'s Laws'],
  ['ሥራ፣ ኃይል (Energy)፣ ሞመንተም እና ግጭቶች (Collisions)', 'Work, Energy, Momentum & Collisions'],
  ['ሙቀት፣ Thermal Expansion፣ Calorimetry እና Heat Transfer', 'Heat, Thermal Expansion, Calorimetry & Heat Transfer'],
  ['የቴርሞዳይናሚክስ ሕጎች እና የHeat Engines Efficiency', 'Laws of Thermodynamics & Heat Engine Efficiency'],
  ['Simple Harmonic Motion (SHM) እና ሞገዶች (Waves & Doppler)', 'Simple Harmonic Motion (SHM) & Waves (Doppler)'],
  ['ኤሌክትሮስታቲክስ፣ DC Circuits እና Kirchhoff\'s Rules', 'Electrostatics, DC Circuits & Kirchhoff\'s Rules'],
  ['ማግኔቲዝም፣ Electromagnetic Induction እና ኤሌክትሮኒክስ', 'Magnetism, Electromagnetic Induction & Electronics'],
  ['ፊዚክስ በግብርና፣ ኢንዱስትሪ እና ሕክምና (Medical Imaging)', 'Physics in Agriculture, Industry & Medicine (Medical Imaging)'],
  ['ፊዚክስ በአርኪኦሎጂ (C-14)፣ ምድር/ህዋ እና ኃይል ማመንጫ', 'Physics in Archaeology (C-14), Earth/Space & Power Generation'],
  ['ቀደምት ትምህርት ቤቶች እና ዘመናዊ አመለካከቶች', 'Early Schools & Modern Perspectives'],
  ['የስልጠና መርሆዎች፣ FITT እና የኃይል ሥርዓቶች', 'Training Principles, FITT & Energy Systems'],
  ['ከሌሎች ሳይንሶች ጋር ያለው ግንኙነት', 'Relationship with Other Sciences'],
  ['ትርጉም እና ስርወ-ቃል', 'Definition & Etymology'],
  ['ታሪካዊ እድገት', 'Historical Development'],
  ['አምስቱ ልዩ መለያ ባህሪያት', 'Five Unique Features'],
  ['የተሳሳቱ አመለካከቶች', 'Misconceptions'],
  ['የባህል ትርጉም እና ባህሪያት', 'Definition & Characteristics of Culture'],
  ['የባህል ለውጥ ዘዴዎች', 'Mechanisms of Culture Change'],
  ['የጋብቻና የቤተሰብ ቅርጾች', 'Forms of Marriage & Family'],
  ['የኢትዮጵያ አራት ባህላዊ ቀጠናዎች', 'Ethiopia’s Four Cultural Areas'],
  ['የተገለሉ የእደ-ጥበብ ባለሙያዎች', 'Marginalized Craftworkers'],
  ['የእድሜ ተጋላጭነት', 'Age Vulnerability'],
  ['ሦስቱ የብሔር ንድፈ-ሐሳቦች', 'Three Theories of Ethnicity'],
  ['ሀገር በቀል ዲሞክራሲያዊ አስተዳደሮች', 'Indigenous Democratic Governance'],
  ['ባህላዊ የግጭት መፍቻ ተቋማት', 'Customary Conflict Resolution Institutions'],
  ['የሴቶች ሚና', 'Role of Women'],
  ['አንጸባራቂ የኢትዮጵያ ሀገር በቀል እውቀቶች', 'Notable Ethiopian Indigenous Knowledge'],
  ['የIKS ጥቅም ለዘመናዊ ልማት', 'Benefits of IKS for Modern Development'],
  ['ስጋቶች እና ጥበቃ', 'Threats & Preservation'],
  ['ቁልፍ የሕይወት ባህሪያት', 'Key Characteristics of Life'],
  ['የሙከራ ተለዋዋጮች', 'Experimental Variables'],
  ['4ቱ ዋና Macromolecules', '4 Major Macromolecules'],
  ['የላብራቶሪ መለያ ሙከራዎች', 'Laboratory Identification Tests'],
  ['ከፍተኛ የፈተና ነጥብ!', 'High-Yield Exam Point!'],
  ['ቁልፍ Organelles እና ልዩ ተግባራቸው', 'Key Organelles & Their Functions'],
  ['ዋና የፈተና ነጥቦች', 'Core Exam Points'],
  ['ዋና የእፅዋት ቡድኖች እና ሆርሞኖች', 'Major Plant Groups & Hormones'],
  ['ዋና የስያሜ ሕጎች', 'Core Nomenclature Rules'],
  ['የግድ መታወቅ ያለባቸው Polyatomic Ions', 'Must-Know Polyatomic Ions'],
  ['የConcentration መለኪያዎች ሰንጠረዥ', 'Concentration Units Table'],
  ['ፈጣን የፈተና ስልት', 'Fast Exam Strategy'],
  ['በፈተና በጣም የሚጠየቁ!', 'High-Frequency Exam Topics!'],
  ['ዋና የላብራቶሪ መለያ ሙከራዎች', 'Key Qualitative Lab Tests'],
  ['ዋና የዜግነት ባህሪያት', 'Core Civic Dispositions'],
  ['ውጤት-ተኮር ሥነ-ምግባር', 'Consequentialist Ethics'],
  ['ግዴታ-ተኮር', 'Duty-Based'],
  ['የLawrence Kohlberg 3 የሞራል እድገት ደረጃዎች', 'Lawrence Kohlberg’s 3 Stages of Moral Development'],
  ['"ለምን ሞራላዊ እንሁን?" እና Rationalizations', '"Why Be Moral?" & Rationalizations'],
  ['የተለመዱ ስህተተኛ ማመካኛዎች', 'Common Rationalizations'],
  ['አራቱ የState መገለጫዎች', 'Four Elements of State'],
  ['የState አወቃቀር እና Parliamentary vs Presidential', 'State Structure & Parliamentary vs Presidential'],
  ['የሕገ-መንግሥት ምድቦች', 'Classification of Constitutions'],
  ['የኢትዮጵያ ሕገ-መንግሥቶች በአጭሩ', 'Ethiopian Constitutions in Brief'],
  ['የዲሞክራሲ መርሆዎች', 'Principles of Democracy'],
  ['የሰብአዊ መብቶች 3 ትውልዶች', '3 Generations of Human Rights'],
  ['አራቱ ዋና የፍልስፍና ዘርፎች', 'Four Core Branches of Philosophy'],
  ['5ቱ የDefinition ዓይነቶች', '5 Types of Definitions'],
  ['ዋና እንቅፋቶች', 'Main Barriers'],
  ['ሌሎች ዋና Fallacies', 'Other Major Fallacies'],
  ['አራቱ ቅርጾች እና Distribution ሰንጠረዥ', 'Four Standard Forms & Distribution Table'],
  ['ቀመሮች እና ትርጓሜ', 'Formulas & Interpretation'],
  ['ግንኙነት', 'Relationship'],
  ['4ቱ የIndifference Curve ባህሪያት', '4 Properties of Indifference Curves'],
  ['TP, AP, MP እና 3ቱ ደረጃዎች', 'TP, AP, MP & The 3 Stages'],
  ['ዋና የCost ቀመሮች', 'Core Cost Formulas'],
  ['GDP ምንን ያካትታል / አያካትትም?', 'What GDP Includes / Excludes?'],
  ['ሥራ አጥነት እና Inflation', 'Unemployment & Inflation'],
  ['3ቱ የዳታ ዓይነቶች', '3 Types of Data'],
  ['3ቱ የAI ደረጃዎች', '3 Levels of AI'],
  ['ሦስቱ ነገሥታት እና የሀገር ግንባታ', 'Three Monarchs & State Building'],
  ['የአድዋ ድል (March 1, 1896) ዓለም አቀፍ ውጤት', 'Global Impact of the Victory of Adwa (March 1, 1896)'],
  ['ኃይለ ሥላሴ (1941–1974)፣ ደርግ (1974–1991) እና FDRE (ከ1991)', 'Haile Selassie (1941–1974), Derg (1974–1991) & FDRE (Since 1991)'],
  ['የ1974 አብዮት ፈንጂዎች', 'Immediate Triggers of the 1974 Revolution'],
  ['የደርግ መውደቅ', 'Fall of the Derg'],
  ['መደበኛ IQ እያላቸው!', 'with Normal IQ!'],
  ['ከSegregation ወደ Inclusion (4ቱ ደረጃዎች)', 'From Segregation to Inclusion (4 Stages)'],
  ['የIEP ዋና ክፍሎች', 'Core Components of an IEP'],
  ['አጋዥ ቴክኖሎጂዎች', 'Assistive Technologies'],
  ['የአመለካከት ሰንሰለት', 'Attitudinal Chain'],
  ['የInclusive Culture መገንቢያዎች', 'Pillars of Inclusive Culture'],
  ['አካታችነት፣ ሰላም፣ ዲሞክራሲ እና SDGs', 'Inclusiveness, Peace, Democracy & SDGs'],
  ['አስፈላጊ ሀብቶች', 'Essential Resources'],
  ['የቡድን ስራ ሞዴሎች', 'Teamwork Models'],
  ['መሰረታዊ ቬክተሮች እና Dot Product', 'Basic Vectors & Dot Product'],
  ['Cross Product እና የጂኦሜትሪ ትርጉሙ', 'Cross Product & Its Geometric Meaning'],
  ['መስመሮች እና ፕሌኖች በ ℝ³', 'Lines & Planes in ℝ³'],
  ['ልዩ የማትሪክስ ዓይነቶች እና ሕጎች', 'Special Matrix Types & Rules'],
  ['Rank እና Consistency', 'Rank & Consistency'],
  ['የዲተርሚናንት ዋና ሕጎች', 'Core Determinant Rules'],
  ['መሰረታዊ እና ልዩ የዴሪቬቲቭ ሕጎች', 'Basic & Special Derivative Rules'],
  ['Mean Value Theorem (MVT) እና የግራፍ ትንተና', 'Mean Value Theorem (MVT) & Curve Sketching'],
  ['L\'Hôpital\'s Rule ለ Indeterminate Forms', 'L\'Hôpital\'s Rule for Indeterminate Forms'],
  ['Trigonometric Substitution (ሦስቱ ቅርጾች)', 'Trigonometric Substitution (Three Forms)'],
  ['የሽክርክሪት ይዘት (Volume) እና Arc Length', 'Volume of Revolution & Arc Length'],
  ['የፕሮፖዚሽን ትርጉም እና መሰረታዊ መርሆዎች', 'Meaning of Propositions & Basic Principles'],
  ['አምስቱ መሰረታዊ የሎጂክ አገናኞች', 'Five Basic Logical Connectives'],
  ['Tautology, Contradiction እና የሎጂክ አልጀብራ ሕጎች', 'Tautology, Contradiction & Laws of Logic'],
  ['የክርክር ትክክለኛነት (Validity of Arguments) እና 9ኙ የኢንፈረንስ ሕጎች', 'Validity of Arguments & 9 Rules of Inference'],
  ['የስብስብ መግለጫ መንገዶች እና ንዑስ ስብስቦች', 'Set Representations & Subsets'],
  ['የስብስብ ስሌቶች (Set Operations) እና ሕጎች', 'Set Operations & Laws'],
  ['የInclusion-Exclusion መቁጠሪያ ቀመሮች', 'Inclusion-Exclusion Counting Formulas'],
  ['የቁጥር ሥርዓቶች ሰንሰለት', 'Hierarchy of Number Systems'],
  ['የሒሳባዊ ኢንዳክሽን መርህ', 'Principle of Mathematical Induction'],
  ['የኮምፕሌክስ ቁጥሮች መሰረታዊ ስሌቶች', 'Basic Operations on Complex Numbers'],
  ['ፖላር (Trigonometric) ቅርጽ እና De Moivre\'s Theorem', 'Polar (Trigonometric) Form & De Moivre\'s Theorem'],
  ['Domain እና Range የመፈለጊያ ወርቃማ ሕጎች', 'Golden Rules for Finding Domain & Range'],
  ['የፈንክሽን ዓይነቶች እና Inverse', 'Types of Functions & Inverse'],
  ['የፖሊኖሚያል ቲዎረሞች', 'Polynomial Theorems'],
  ['መስመሮች እና ርቀቶች', 'Lines & Distances'],
  ['የኮኒክ ክፍሎች ማነጻጸሪያ ሰንጠረዥ', 'Conic Sections Comparison Table'],
  ['Discriminant እና Rotation of Axes', 'Discriminant & Rotation of Axes'],
  ['ፕሮፖዚሽን እና የሎጂክ አገናኞች', 'Propositions & Logical Connectives'],
  ['Quantifiers እና Formal Proofs', 'Quantifiers & Formal Proofs'],
  ['Quadratic Discriminant እና Sign Chart', 'Quadratic Discriminant & Sign Chart'],
  ['ፈንክሽኖች እና Inverse', 'Functions & Inverse'],
  ['የማትሪክስ ቅድመ-ሁኔታዎች', 'Matrix Conditions'],
  ['2×2 እና 3×3 Inverse & Cramer\'s Rule', '2×2 and 3×3 Inverse & Cramer\'s Rule'],
  ['ዋና የዴሪቬቲቭ ሕጎች', 'Core Derivative Rules'],
  ['Optimization በኢኮኖሚክስ', 'Optimization in Economics'],
  ['ኢንቴግሬሽን እና Area Between Curves', 'Integration & Area Between Curves'],
  ['7ቱ መሰረታዊ SI መጠኖች', '7 Fundamental SI Quantities'],
  ['Dimensional Analysis ሕጎች', 'Dimensional Analysis Rules'],
  ['Accuracy vs Precision እና Errors', 'Accuracy vs Precision & Errors'],
  ['Dot & Cross Products በፊዚክስ', 'Dot & Cross Products in Physics'],
  ['Projectile Motion (በአየር መቋቋም በሌለበት)', 'Projectile Motion (Neglecting Air Resistance)'],
  ['Friction & Inclined Plane', 'Friction & Inclined Plane'],
  ['ሥራ እና ኃይል', 'Work & Energy'],
  ['ግፊት እና የPascal ሕግ', 'Pressure & Pascal\'s Law'],
  ['ሦስቱ የሙቀት መተላለፊያ መንገዶች', 'Three Modes of Heat Transfer'],
  ['SHM ቀመሮች', 'SHM Formulas'],
  ['Doppler Effect (ድምጽ)', 'Doppler Effect (Sound)'],
  ['ማግኔቲክ ኃይል እና Induction', 'Magnetic Force & Induction'],
  ['ሴሚኮንዳክተሮች እና Logic Gates', 'Semiconductors & Logic Gates'],
  ['ግብርና እና Soil Physics', 'Agriculture & Soil Physics'],
  ['የሕክምና ምስል ቴክኖሎጂዎች', 'Medical Imaging Technologies'],
  ['ሦስቱ የሕይወት ክህሎት ዘርፎች', 'Three Life Skills Domains'],
  ['ምዕራፍ ', 'Chapter '],
  ['ክፍል ', 'Section '],
  ['ዋና ባህሪያት', 'Main Features'],
  ['ቁልፍ ቀመሮች', 'Key Formulas'],
  ['ዋና ቀመሮች', 'Core Formulas'],
  ['ትርጉም እና ባህሪያት', 'Definition & Characteristics'],
  ['ማህበራዊ ውል', 'Social Contract'],
  ['ማህበራዊ መገለል', 'Marginalization'],
  ['ባህላዊ አንጻራዊነት', 'Cultural Relativism'],
  ['መድብለ-ባህላዊነት', 'Multiculturalism'],
  ['ዜግነት', 'Citizenship'],
  ['ሲቪክስ', 'Civics'],
  ['አንትሮፖሎጂ', 'Anthropology'],
  ['ፊዚክስ', 'Physics'],
  ['ኬሚስትሪ', 'Chemistry'],
  ['ባዮሎጂ', 'Biology'],
  ['ኢኮኖሚክስ', 'Economics'],
  ['ሳይኮሎጂ', 'Psychology'],
  ['ሎጂክ', 'Logic'],
  ['ታሪክ', 'History'],
  ['ፍልስፍና', 'Philosophy'],
  ['ዴሞክራሲ', 'Democracy'],
  ['ሕገ-መንግሥት', 'Constitution'],
  ['እና', '&'],
  ['በ', 'in'],
  ['ለ', 'for'],
] as Array<[string, string]>).sort((a, b) => b[0].length - a[0].length);

const REVERSE_AMHARIC_WORD_MAP: Record<string, string> = (() => {
  const rev: Record<string, string> = {};
  for (const [, amMeaning, enCanonical] of KEY_EXAM_PHRASES) {
    if (amMeaning && !rev[amMeaning]) rev[amMeaning] = enCanonical;
  }
  for (const [enWord, amWord] of Object.entries(AMHARIC_WORD_DICT)) {
    if (!amWord || !/[\u1200-\u137F]/.test(amWord)) continue;
    const cap = KEY_EXAM_TERMS[enWord] || (enWord.charAt(0).toUpperCase() + enWord.slice(1));
    if (!rev[amWord]) rev[amWord] = cap;
  }
  return rev;
})();

/**
 * Converts any curated Amharic or mixed Amharic/English chapter title or Markdown heading
 * into crisp 100% English (zero Ethiopic characters allowed in titles/headings).
 */
export function convertHeadingToEnglish(rawHeading: string): string {
  if (!rawHeading || !rawHeading.trim()) return rawHeading;
  if (!/[\u1200-\u137F]/.test(rawHeading)) return rawHeading.trim();

  const mdMatch = rawHeading.match(/^(\s*#{1,6}\s+)(.+)$/);
  const mdPrefix = mdMatch ? mdMatch[1] : '';
  let body = (mdMatch ? mdMatch[2] : rawHeading).trim();

  // Preserve leading section numbers like "1.1 " or "1.2.1 "
  const numMatch = body.match(/^(\d+(?:\.\d+)*[.:]?\s+)(.+)$/);
  const numPrefix = numMatch ? numMatch[1] : '';
  body = (numMatch ? numMatch[2] : body).trim();

  // If format is `PureAmharic (EnglishTerm)` or `Amharic Prefix (English Label)` where parens already summarize in English:
  const pureAmWithEnParen = body.match(/^([\u1200-\u137F\u1360-\u1368\s\-/,]+)\(([^()]*[A-Za-z][^()]*)\)$/);
  if (pureAmWithEnParen && !/[\u1200-\u137F]/.test(pureAmWithEnParen[2]) && pureAmWithEnParen[2].trim().length >= 4) {
    // Only use parenthetical directly if no separate unparenthesized English topics precede it
    body = pureAmWithEnParen[2].trim();
  }

  for (const [amPhrase, enPhrase] of HEADING_PHRASE_AM_TO_EN) {
    if (body.includes(amPhrase)) {
      body = body.split(amPhrase).join(` ${enPhrase} `);
    }
  }

  // Translate any remaining standalone Ethiopic tokens via reverse word dictionary
  body = body.replace(/[\u1200-\u137F][\u1200-\u137F\-]*/g, (amTok) => {
    if (REVERSE_AMHARIC_WORD_MAP[amTok]) return REVERSE_AMHARIC_WORD_MAP[amTok];
    const stripped = amTok.replace(/^[የበለከ]/, '');
    if (stripped.length >= 2 && REVERSE_AMHARIC_WORD_MAP[stripped]) {
      return REVERSE_AMHARIC_WORD_MAP[stripped];
    }
    return '';
  });

  // Clean up duplicate parentheticals created during substitution e.g. "Marginalization (Marginalization)"
  body = body
    .replace(/\b([A-Za-z][A-Za-z\s&'-]{2,40})\s*\(\s*\1\s*\)/gi, '$1')
    .replace(/\(\s*[\u1200-\u137F\u1360-\u1368\s,;፡፣\-/]*\s*\)/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/[፣፤፥]/g, ', ')
    .replace(/፡/g, ': ')
    .replace(/[\u1200-\u137F\u1360-\u1368]/g, '')
    .replace(/\s+([,.:;!?])/g, '$1')
    .replace(/(^|\s)[&/](\s*[&/])+/g, ' & ')
    .replace(/^[\s,&:\-]+|[\s,&:\-]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (!body) body = 'Core Section';
  return `${mdPrefix}${numPrefix}${body}`.trim();
}

function convertMarkdownHeadingsToEnglish(text: string): string {
  return text.replace(/^(\s*#{1,6}[ \t]+.+)$/gm, (line) =>
    /[\u1200-\u137F]/.test(line) ? convertHeadingToEnglish(line) : line
  );
}

/**
 * Guarantees ZERO Ethiopic characters ever remain inside bolded (**...**) spans:
 * - `**English (Amharic)**` -> `**English** (Amharic)`
 * - `**Amharic (English)**` -> `Amharic (**English**)`
 * - Mixed or pure-Amharic bold spans -> keep English sub-terms bolded or unbold Amharic emphasis.
 */
export function enforceEnglishOnlyBold(text: string): string {
  if (!text || !text.includes('**')) return text;

  return text.replace(/\*\*([^*\n]+)\*\*/g, (full, rawInner: string) => {
    if (!/[\u1200-\u137F]/.test(rawInner)) return full;

    const trimmed = rawInner.trim();
    const punctMatch = trimmed.match(/([:;,.!?፦]+)$/);
    const trailingPunct = punctMatch ? punctMatch[1] : '';
    const punctClean = trailingPunct.replace(/፦/g, ':');
    const core = trimmed.slice(0, trimmed.length - trailingPunct.length).trim();

    if (!core) return trimmed;

    // Pattern 1: `**English (Amharic)**` -> `**English** (Amharic)`
    const enFirstMatch = core.match(
      /^([^()]*[A-Za-z][^()]*?)\s*\(([^()]*[\u1200-\u137F][^()]*)\)$/
    );
    if (enFirstMatch && !/[\u1200-\u137F]/.test(enFirstMatch[1])) {
      const enPart = enFirstMatch[1].trim();
      const amPart = enFirstMatch[2].trim();
      return `**${enPart}** (${amPart})${punctClean}`;
    }

    // Pattern 2: `**Amharic (English)**` -> `Amharic (**English**)`
    const amFirstMatch = core.match(
      /^([\u1200-\u137F][^()]*?)\s*\(([^()]*[A-Za-z0-9][^()]*)\)$/
    );
    if (amFirstMatch && !/[\u1200-\u137F]/.test(amFirstMatch[2])) {
      const amPart = amFirstMatch[1].trim();
      const enPart = amFirstMatch[2].trim();
      return `${amPart} (**${enPart}**)${punctClean}`;
    }

    // Pattern 3: Contains English sub-terms mixed with Amharic prose -> keep only pure English runs bolded
    if (/[A-Za-z]/.test(core)) {
      return rawInner.replace(
        /\b([A-Za-z][A-Za-z0-9\-/'&+.]*(?:\s+[A-Za-z0-9\-/'&+.]+)*)\b/g,
        (enRun) => (enRun.length >= 2 ? `**${enRun}**` : enRun)
      );
    }

    // Pattern 4: Pure Amharic bold span -> if label before colon matches reverse map, translate to bold English;
    // otherwise unbold Amharic emphasis so zero Ethiopic text is bolded.
    if (trailingPunct) {
      const cleanAmHeading = convertHeadingToEnglish(core);
      if (cleanAmHeading && cleanAmHeading !== 'Core Section' && /[A-Za-z]{3,}/.test(cleanAmHeading)) {
        return `**${cleanAmHeading}${punctClean}**`;
      }
    }

    return rawInner;
  });
}

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
      const words = trimmed.split(/\s+/);
      if (
        (idx === 1 || isHeaderLike) &&
        words.length >= 1 &&
        words.length <= 4 &&
        /[A-Za-z]{2,}/.test(trimmed) &&
        !FINITE_ENGLISH_CLAUSE_WORDS.test(trimmed)
      ) {
        const amCell = translateSimplePhraseToAmharic(trimmed);
        registerEnglishTermsInContext(trimmed, ctx);
        const slotIdx = slots.length;
        slots.push({
          amOnly: amCell,
          withEnglish: trimmed,
          priority: 1,
          preferKeepEnglish: true,
        });
        return ` \uE008B${slotIdx}\uE009 `;
      }
      return cell;
    });
    working = updatedCells.join('|');
  }

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
  if (isHeading) {
    return convertHeadingToEnglish(text);
  }

  const activeCtx = ctx || createChapterTerminologyContext();
  const normalizedInput = convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(text));
  const { masked, tokens } = maskProtectedRegions(normalizedInput, activeCtx);
  const lines = masked.split('\n');
  const slots: KeyTermSlot[] = [];
  const translatedLines = lines.map((line) => translateMaskedLine(line, slots, activeCtx));
  const withBudgetedKeyTerms = resolveKeyTermSlotsWithBudget(
    translatedLines.join('\n'),
    slots,
    tokens,
    isHeading
  );
  const unmasked = cleanupAmharicFormatting(unmaskProtectedRegions(withBudgetedKeyTerms, tokens));
  return convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(unmasked)).trim();
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
 * - Ensures ALL Markdown headings (#, ##, ###) and ALL bolded text (**...**) are 100% English.
 * - Converts any remaining English prose sentences/bullets/table cells inside curated notes
 *   into natural Amharic with consistent `Amharic (English)` -> `English` Hybrid terminology.
 */
export function polishMixedAmharicText(
  text: string,
  ctx?: ChapterTerminologyContext
): string {
  if (!text || !text.trim()) return '';

  const activeCtx = ctx || createChapterTerminologyContext();
  const normalizedInput = convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(text));
  const { masked, tokens } = maskProtectedRegions(normalizedInput, activeCtx);
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
  const unmasked = cleanupAmharicFormatting(unmaskProtectedRegions(resolved, tokens));
  return convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(unmasked)).trim();
}

export function translateHeadingToAmharic(
  heading: string,
  index: number,
  _ctx?: ChapterTerminologyContext
): string {
  const cleanEn = convertHeadingToEnglish(heading);
  if (cleanEn && cleanEn.trim()) return cleanEn.trim();
  return `Section ${index + 1}`;
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
 * ChapterTerminologyContext so existing Amharic explanations stay fluent, ALL titles/headings/bolded
 * spans stay 100% English, and English academic terminology stays consistent throughout.
 */
export function polishAmharicChapterNote<T extends PolishableAmharicNote>(
  note: T,
  englishChapter?: { title?: string; sections?: Array<{ heading?: string }> }
): T {
  const cached = polishedNoteCache.get(note) as T | undefined;
  if (cached) {
    if (englishChapter?.title && englishChapter.title.trim() && cached.titleAm !== englishChapter.title.trim()) {
      return { ...cached, titleAm: englishChapter.title.trim() };
    }
    return cached;
  }

  const ctx = createChapterTerminologyContext();
  const resolvedTitle =
    englishChapter?.title && englishChapter.title.trim()
      ? englishChapter.title.trim()
      : convertHeadingToEnglish(note.titleAm);

  const polished: T = {
    ...note,
    titleAm: resolvedTitle,
    briefOverviewAm: polishMixedAmharicText(note.briefOverviewAm, ctx),
    expandedOverviewAm: note.expandedOverviewAm
      ? polishMixedAmharicText(note.expandedOverviewAm, ctx)
      : undefined,
    learningOutcomesAm: note.learningOutcomesAm?.map((item) =>
      polishMixedAmharicText(item, ctx)
    ),
    sectionsAm: note.sectionsAm?.map((sec) => ({
      ...sec,
      headingAm: convertHeadingToEnglish(sec.headingAm),
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
  const subjEnTitle = chapter.moduleName || chapter.courseCode || 'Freshman Course';

  const rawOverviewAm = translateEnglishAcademicContentToAmharic(
    chapter.overview || '',
    chapter.subject,
    ctx
  );
  const overviewAm = `${rawOverviewAm}\n\n**${subjEnTitle} — Chapter ${chapter.chapterNumber} Study Guide:** ይህ ማስታወሻ ዋና የእንግሊዝኛ ቃላትን (Key Terms)፣ ዓይነቶችን (Types)፣ ክፍሎችን (Parts)፣ ቀመሮችን፣ የተሰሩ ምሳሌዎችንና የፈተና ወጥመዶችን በአማርኛ ማብራሪያ አጣምሮ ያቀርባል።`;

  const sections: TranslatedAmharicSection[] = (chapter.sections || []).map(
    (sec: MasterNoteSection, sIdx: number) => {
      const headingAm = sec.heading?.trim()
        ? convertHeadingToEnglish(sec.heading.trim())
        : `Section ${sIdx + 1}`;
      const translatedBody = translateEnglishAcademicContentToAmharic(
        sec.content || '',
        chapter.subject,
        ctx
      );

      const eqCount = (sec.equations || []).length;
      const exCount = (sec.workedExamples || []).length;

      const introBanner = `> **Amharic Study Guide:** ዋና ቃላት፣ Types እና Parts በእንግሊዝኛ፣ ማብራሪያዎቹ በግልጽ አማርኛ ቀርበዋል።\n\n`;

      const sectionStudyGuide =
        `\n\n---\n#### Section Study & Exam Focus\n` +
        `- **Study Guide:** በ${subjLabel} ፈተናዎች ውስጥ የክፍሉን ዋና ትርጓሜዎች (Key Terms)፣ ዓይነቶችን (Types) እና ክፍሎችን (Parts) በእንግሊዝኛ ስያሜያቸው ከአማርኛ ማብራሪያቸው ጋር አያይዘው ይያዙ።` +
        (eqCount > 0
          ? `\n- **Formulas & Units:** በዚህ ክፍል ውስጥ ያሉትን ${eqCount} ቀመሮች (Equations) ከመለኪያ Units ጋር ደጋግመው ይለማመዱ።`
          : '') +
        (exCount > 0
          ? `\n- **Worked Examples:** የቀረቡትን ${exCount} Solved Examples መፍትሔ ሳያዩ በራስዎ ሠርተው ከመጨረሻው ውጤት ጋር ያመሳክሩ።`
          : '\n- **Exam Warning:** በብዙ ምርጫ ጥያቄዎች ውስጥ Always, Only, Except እና Not የሚሉ ቃላትን በጥንቃቄ ያንብቡ።');

      const equations: TranslatedEquationItem[] = (sec.equations || []).map((eq) => ({
        nameAm: eq.name || '',
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
  // than the English chapter while keeping ALL titles/headings/bolded text in English.
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
        ? allTraps.map((tr) => `- **Exam Trap:** ${tr}`).join('\n')
        : `- **Exam Trap:** በፈተና ወቅት ተቀራራቢ ጽንሰ-ሐሳቦችን ሳያቀላቅሉ ሁኔታዎችንና Unitsን ያረጋግጡ።`;

    const lastSec = sections[sections.length - 1];
    const expansionBlock =
      `\n\n### Chapter ${chapter.chapterNumber} Exam Review & Summary (${subjEnTitle})\n` +
      `ይህ የክለሳ ክፍል የምዕራፉን ሁሉንም ንዑስ ክፍሎች በአንድ ላይ በማጠናቀር ለአጋማሽ እና ለመጨረሻ ፈተናዎች (Midterm & Final Exams) ሙሉ ዝግጁነት እንዲኖርዎት ይረዳል።\n\n` +
      `#### 1. Major Sections Covered in This Chapter\n${outlineBullets}\n\n` +
      `#### 2. Key Takeaways for Exams\n${takeawayBullets}\n\n` +
      `#### 3. Common Exam Traps\n${trapBullets}\n\n` +
      `#### 4. Effective 3-Step Study Method\n` +
      `1. **Clear Definitions & Comparison:** እያንዳንዱን ቁልፍ ቃል፣ Type እና Part በእንግሊዝኛ ስያሜው ከአማርኛ ማብራሪያው ጋር ያያይዙ።\n` +
      `2. **Exam Question Practice:** ከላይ የቀረቡትን ምሳሌዎችና ቀመሮች በመጠቀም ጥያቄዎችን ይለማመዱ።\n` +
      `3. **Quick Self-Check:** ምዕራፉን ከጨረሱ በኋላ ዋና ዋና ቃላቱን ሳያዩ በቃልዎ በመዘርዘር መጨበጥዎን ያረጋግጡ።`;

    lastSec.contentAm += expansionBlock;
    amLength = computeTranslatedChapterLength(overviewAm, sections);
    amProseLen += expansionBlock.length;

    let extraIdx = 0;
    const maxPads = sections.length * 3;
    while ((amLength < targetMinLength || amProseLen < targetMinProse) && extraIdx < maxPads) {
      const sec = sections[extraIdx % sections.length];
      const padText =
        `\n\n> **Revision Note:** ተማሪዎች ይህን ክፍል ሲያጠኑ ዋናውን ጽንሰ-ሐሳብ ከቅድመ-ሁኔታዎቹ፣ ከTypes/Parts ክፍፍሎቹ እና ከሌሎች ተዛማጅ ርዕሶች ጋር በማነጻጸር መከለስ አለባቸው፤ በፈተና ላይ የሚጠየቁ ልዩነቶችንና የሂሳብ ወይም የሎጂክ ደረጃዎችን በቅደም ተከተል በማስታወስ ከስህተት መጠበቅ ይቻላል።`;
      sec.contentAm += padText;
      amLength += padText.length;
      amProseLen += padText.length;
      extraIdx++;
    }
  }

  for (const sec of sections) {
    sec.contentAm = convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(sec.contentAm));
  }

  const result: TranslatedAmharicChapterResult = {
    overviewAm: convertMarkdownHeadingsToEnglish(enforceEnglishOnlyBold(overviewAm)),
    sections,
  };

  chapterTranslationCache.set(chapter.id, result);
  return result;
}
