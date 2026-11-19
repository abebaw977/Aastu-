import type { Subject } from '../types';
import type {
  AmharicSubjectMeta,
  AmharicChapterNote,
  AmharicSection,
  AmharicWorkedExample,
  AmharicGlossaryItem,
  AmharicReviewQA,
} from './amharic/types';

import { ANTHROPOLOGY_AM_NOTES } from './amharic/anthropologyAm';
import { BIOLOGY_AM_NOTES } from './amharic/biologyAm';
import { CHEMISTRY_AM_NOTES } from './amharic/chemistryAm';
import { CIVICS_AM_NOTES } from './amharic/civicsAm';
import { CRITICAL_THINKING_AM_NOTES } from './amharic/criticalThinkingAm';
import { ECONOMICS_AM_NOTES } from './amharic/economicsAm';
import { EMERGING_TECH_AM_NOTES } from './amharic/emergingTechAm';
import { ENGLISH_1_AM_NOTES } from './amharic/english1Am';
import { ENGLISH_2_AM_NOTES } from './amharic/english2Am';
import { ENTREPRENEUR_AM_NOTES } from './amharic/entrepreneurAm';
import { GEOGRAPHY_AM_NOTES } from './amharic/geographyAm';
import { GLOBAL_AFFAIRS_AM_NOTES } from './amharic/globalAffairsAm';
import { HISTORY_AM_NOTES } from './amharic/historyAm';
import { INCLUSIVE_AM_NOTES } from './amharic/inclusiveAm';
import { MATHS_APPLIED_AM_NOTES } from './amharic/mathsAppliedAm';
import { MATHS_NAT_AM_NOTES } from './amharic/mathsNatAm';
import { MATHS_SOCIAL_AM_NOTES } from './amharic/mathsSocialAm';
import { PHYSICS_AM_NOTES } from './amharic/physicsAm';
import { PSYCHOLOGY_AM_NOTES } from './amharic/psychologyAm';

export type {
  AmharicSubjectMeta,
  AmharicChapterNote,
  AmharicSection,
  AmharicWorkedExample,
  AmharicGlossaryItem,
  AmharicReviewQA,
};

export const AMHARIC_SUBJECT_META: Partial<Record<Subject, AmharicSubjectMeta>> = {
  anthropology: {
    nameAm: 'አንትሮፖሎጂ (Social Anthropology)',
    shortNameAm: 'አንትሮፖሎጂ',
    overviewAm:
      'የሰው ልጅ ባዮሎጂካዊና ባህላዊ አመጣጥ፣ የባህል ጽንሰ-ሐሳብ፣ ባህላዊ ብዝሃነት፣ የኢትዮጵያ ብሔረሰቦች ማንነት፣ ባህላዊ የአስተዳደርና የግጭት አፈታት ሥርዓቶች (ገዳ፣ ሽምግልና) እና ሀገር በቀል እውቀቶችን በጥልቀት የሚያስተምር ሙሉ የአማርኛ መማሪያ ማስታወሻ ነው።',
  },
  biology: {
    nameAm: 'ባዮሎጂ (General Biology)',
    shortNameAm: 'ባዮሎጂ',
    overviewAm:
      'የሕይወት መሰረትና ሳይንሳዊ ዘዴ፣ ባዮሞለኪውሎች፣ የሴል መዋቅርና Membrane Transport፣ ኢንዛይሞችና ሜታቦሊዝም (Photosynthesis/Respiration)፣ ጄኔቲክስና ኢቮሉሽን፣ በሽታና Immunity፣ Taxonomy፣ Ecology፣ Botany/Zoology እና ዘመናዊ Biotechnology (PCR/CRISPR) በጥልቀት ይሸፍናል።',
  },
  geography: {
    nameAm: 'ጂኦግራፊ (Geography of Ethiopia & the Horn)',
    shortNameAm: 'ጂኦግራፊ',
    overviewAm:
      'የኢትዮጵያና የአፍሪካ ቀንድ አቀማመጥ፣ Geological History፣ የመሬት አቀማመጥ (Physiography & Rift Valley)፣ የውኃ ሀብት (Drainage Systems)፣ የአየር ንብረት (Agro-ecological zones)፣ አፈርና ደን፣ የሕዝብ ስርጭት እና ኢኮኖሚያዊ እንቅስቃሴዎችን በጥልቀት ያስተምራል።',
  },
  entrepreneur: {
    nameAm: 'ኢንተርፕረነርሺፕ (Entrepreneurship)',
    shortNameAm: 'ኢንተርፕረነርሺፕ',
    overviewAm:
      'የሥራ ፈጠራ ባህሪ፣ ፈጠራና ኢኖቬሽን (Creativity & Innovation)፣ የቢዝነስ እቅድ አዘገጃጀት፣ MSEs፣ የንግድ ሕጋዊ አደረጃጀት፣ ምርትና ኦፕሬሽን፣ ግብይት (Marketing Mix 4Ps/7Ps)፣ የፋይናንስ ምንጮችና Business Ethicsን በዝርዝር ያስተምራል።',
  },
  global_affairs: {
    nameAm: 'ግሎባል አፌርስ (Global Affairs)',
    shortNameAm: 'ግሎባል አፌርስ',
    overviewAm:
      'ዓለም አቀፍ ግንኙነቶች (Realism, Liberalism, Constructivism)፣ የውጭ ፖሊሲና ዲፕሎማሲ፣ ዓለም አቀፍ የፖለቲካ ኢኮኖሚ (IPE)፣ ግሎባላይዜሽንና ዓለም አቀፍ ተቋማት (UN, AU, WTO, IMF) እና ወቅታዊ ዓለም አቀፍ ተግዳሮቶችን በጥልቀት ያብራራል።',
  },
  chemistry: {
    nameAm: 'ኬሚስትሪ (General Chemistry)',
    shortNameAm: 'ኬሚስትሪ',
    overviewAm:
      'የቁስ አካል መሰረትና Significant Figures፣ አቶሚክ መዋቅርና Nomenclature፣ የሞል ጽንሰ-ሐሳብ፣ Stoichiometryና Redox Balancing፣ Quantum Theory & Periodic Trends፣ Lewis Structures/VSEPR/Hybridization፣ Chemical Equilibrium/pH/Buffers፣ Organic Chemistry እና Electrochemistryን በጥልቀት ይሸፍናል።',
  },
  history: {
    nameAm: 'ታሪክ (History of Ethiopia & the Horn)',
    shortNameAm: 'ታሪክ',
    overviewAm:
      'የታሪክ ሳይንስና Historiography፣ የጥንት ሥልጣኔዎች (Punt, Damat, Aksum, Zagwe, Harar)፣ የመካከለኛው ዘመንና የዘመነ መሳፍንት፣ ዘመናዊ የኢትዮጵያ ግንባታ፣ የአድዋ ድልና ፀረ-ቅኝ ግዛት ትግል፣ እንዲሁም የ1974 እና 1991 ፖለቲካዊ ሽግግሮችን በጥልቀት ያቀርባል።',
  },
  civics: {
    nameAm: 'ሲቪክስ እና ሥነ-ምግባር (Moral & Citizenship Education)',
    shortNameAm: 'ሲቪክስ',
    overviewAm:
      'ዜግነትና መልካም ሥነ-ምግባር፣ የሞራል ፍልስፍናዎች (Virtue, Deontology/Kant, Utilitarianism)፣ Ethical Decision-Making፣ የመንግሥት መዋቅሮች፣ ሕገ-መንግሥታዊነት፣ ዴሞክራሲና ሰብአዊ መብቶችን (1st, 2nd, 3rd Generations) በጥልቀት ያስተምራል።',
  },
  inclusive: {
    nameAm: 'ኢንክሉሲቭ ኤዱኬሽን (Inclusiveness)',
    shortNameAm: 'ኢንክሉሲቭ',
    overviewAm:
      'አካል ጉዳተኝነትንና ተጋላጭነትን (Medical vs Social Model)፣ የአካታች ትምህርት ፍልስፍና፣ ልዩ የትምህርት ድጋፍ (IEP & Assistive Tech)፣ አካታች ባህል መገንባት፣ ብሔራዊና ዓለም አቀፍ የሕግ ማዕቀፎች (CRPD) እና Collaborative Partnershipsን በጥልቀት ያስረዳል።',
  },
  critical_thinking: {
    nameAm: 'ሎጂክ እና ክሪቲካል ቲንኪንግ (Logic & Critical Thinking)',
    shortNameAm: 'ክሪቲካል ቲንኪንግ',
    overviewAm:
      'ፍልስፍናና ቅርንጫፎቹ፣ Arguments (Deductive Validity/Soundness vs Inductive Strength/Cogency)፣ ቋንቋና ትርጉም (Intension vs Extension & Definitions)፣ ሂሳዊ አስተሳሰብ፣ Informal Fallacies (Relevance, Weak Induction, Presumption) እና Categorical Propositions (Square of Opposition) በጥልቀት ያጠናል።',
  },
  mathematics: {
    nameAm: 'ሒሳብ ለተፈጥሮ ሳይንስ (Maths for Natural Sciences)',
    shortNameAm: 'ሒሳብ (Nat)',
    overviewAm:
      'Propositional & Predicate Logic፣ Set Theory፣ Real & Complex Numbers (De Moivre & Polar Form)፣ Mathematical Induction፣ Polynomial/Rational/Exponential/Logarithmic/Trigonometric Functions እና Analytic Geometry (Lines, Circles, Parabola, Ellipse, Hyperbola) በዝርዝር ምሳሌዎች ያስተምራል።',
  },
  economics: {
    nameAm: 'ኢኮኖሚክስ (General Economics)',
    shortNameAm: 'ኢኮኖሚክስ',
    overviewAm:
      'Scarcity, PPF & Economic Systems፣ Demand, Supply & Elasticity (PED/YED/XED)፣ Consumer Behavior (Cardinal Utility & Indifference Curves)፣ Production & Cost Curves ($MC, ATC, AVC$)፣ Market Structures (Perfect Competition vs Monopoly) እና Macroeconomics (GDP, Inflation, Fiscal/Monetary Policy) በጥልቀት ያብራራል።',
  },
  math_applied_2: {
    nameAm: 'አፕላይድ ሒሳብ 1 (Applied Mathematics I)',
    shortNameAm: 'አፕላይድ ሒሳብ',
    overviewAm:
      'Vectors in 2D & 3D (Dot/Cross products, Lines & Planes)፣ Matrices, Determinants & Cramer’s Rule/Gauss-Jordan፣ Limits, Continuity & Derivatives (Chain Rule, Implicit, L’Hôpital, Optimization) እና Integration Techniques (Substitution, By Parts, Partial Fractions, Area/Volume) በጥልቀት ያስተምራል።',
  },
  emerging_tech: {
    nameAm: 'ኢመርጂንግ ቴክኖሎጂ (Emerging Technologies)',
    shortNameAm: 'ኢመርጂንግ ቴክ',
    overviewAm:
      'የኢንዱስትሪ አብዮቶች (IR 1.0–4.0)፣ Data Science & Big Data 5Vs፣ Artificial Intelligence & Machine Learning፣ Internet of Things (IoT Architecture)፣ Augmented & Virtual Reality (AR/VR/MR)፣ Tech Ethics/Privacy/Cybersecurity እና Cloud, Blockchain & Quantum Computing በጥልቀት ይሸፍናል።',
  },
  math_social: {
    nameAm: 'ሒሳብ ለማህበራዊ ሳይንስ (Maths for Social Sciences)',
    shortNameAm: 'ሒሳብ (Social)',
    overviewAm:
      'Propositional Logic & Set Theory፣ Real Numbers, Equations & Inequalities፣ Functions (Linear, Quadratic, Exponential, Logarithmic, Break-Even Analysis)፣ Matrix Algebra & Leontief Input-Output Model እና Introduction to Calculus (Limits, Marginal Cost/Revenue Derivatives, Integrals) በጥልቀት ያስተምራል።',
  },
  english: {
    nameAm: 'ኮሙኒኬቲቭ እንግሊዝኛ 1 (Communicative English I)',
    shortNameAm: 'እንግሊዝኛ 1',
    overviewAm:
      'Study Skills & Present/Past Tenses፣ Health & Fitness (Modals & Gerunds/Infinitives)፣ Cultural Values (Passive Voice & Comparisons)፣ Wildlife Conservation (Conditionals Types 0/1/2/3 & Wishes) እና Population & Migration (Perfect Tenses & Essay Cohesion) በጥልቀት ያስተምራል።',
  },
  physics: {
    nameAm: 'ፊዚክስ (General Physics)',
    shortNameAm: 'ፊዚክስ',
    overviewAm:
      'Dimensional Analysis & Vectors፣ Kinematics & Newton’s Laws Dynamics፣ Work, Energy & Momentum Conservation፣ Fluid Mechanics (Pascal, Archimedes, Bernoulli)፣ Heat & Thermodynamics፣ Oscillations, Waves & Optics፣ Electromagnetism (Coulomb, Ohm, Kirchhoff, Faraday) እና Physics Applications በጥልቀት ይይዛል።',
  },
  english_2: {
    nameAm: 'ኮሙኒኬቲቭ እንግሊዝኛ 2 (Communicative English II)',
    shortNameAm: 'እንግሊዝኛ 2',
    overviewAm:
      'Life Skills & Active/Passive Voice (incl. Impersonal Passive)፣ Future of Science & Dr. Aklilu Lemma (All Future Tense Forms)፣ Environmental Protection & Modals (Obligation/Deduction)፣ Indigenous Knowledge & Reported Speech፣ እና Cultural Heritages & Defining/Non-Defining Relative Clauses በጥልቀት ያቀርባል።',
  },
  psychology: {
    nameAm: 'ሳይኮሎጂ (General Psychology)',
    shortNameAm: 'ሳይኮሎጂ',
    overviewAm:
      'የሳይኮሎጂ ትምህርት ቤቶችና Research Methods፣ Sensation & Perception (Weber/Gestalt)፣ Classical/Operant/Social Learning፣ Memory & Forgetting፣ Motivation (Maslow/Lewin) & Emotion፣ Personality (Freud/OCEAN/Rogers)፣ Mental Disorders & Therapy እና Life, Personal, Academic (SQ3R/Eisenhower) & Social Skillsን በጥልቀት ያስተምራል።',
  },
  fitness: {
    nameAm: 'አካላዊ ብቃት (Physical Fitness)',
    shortNameAm: 'አካላዊ ብቃት',
    overviewAm:
      'የአካል ብቃት እንቅስቃሴ ፊዚዮሎጂ፣ የFITT መርሆዎች (Frequency, Intensity, Time, Type)፣ Aerobic vs Anaerobic Metabolism፣ የልብ ምት መጠን (Target Heart Rate Zones) እና ከጉዳት የመከላከያ Warm-up/Cool-down ሳይንስን በጥልቀት ያስረዳል።',
  },
};

export const AMHARIC_CHAPTER_NOTES: Record<string, AmharicChapterNote> = {
  ...ANTHROPOLOGY_AM_NOTES,
  ...BIOLOGY_AM_NOTES,
  ...CHEMISTRY_AM_NOTES,
  ...CIVICS_AM_NOTES,
  ...CRITICAL_THINKING_AM_NOTES,
  ...ECONOMICS_AM_NOTES,
  ...EMERGING_TECH_AM_NOTES,
  ...ENGLISH_1_AM_NOTES,
  ...ENGLISH_2_AM_NOTES,
  ...ENTREPRENEUR_AM_NOTES,
  ...GEOGRAPHY_AM_NOTES,
  ...GLOBAL_AFFAIRS_AM_NOTES,
  ...HISTORY_AM_NOTES,
  ...INCLUSIVE_AM_NOTES,
  ...MATHS_APPLIED_AM_NOTES,
  ...MATHS_NAT_AM_NOTES,
  ...MATHS_SOCIAL_AM_NOTES,
  ...PHYSICS_AM_NOTES,
  ...PSYCHOLOGY_AM_NOTES,

  // Fitness expanded entry
  'spsc1011-ch1': {
    subject: 'fitness',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የአካል ብቃት ፊዚዮሎጂ፣ የFITT መርህ እና የልብና ሳንባ ስልጠና',
    briefOverviewAm:
      'የአካል ብቃት እንቅስቃሴ መሰረታዊ መርሆዎች (FITT, Overload, Specificity, Reversibility)፣ ከፍተኛ የልብ ምት (MHR & Karvonen THR)፣ የAerobic vs Anaerobic ኃይል ሥርዓቶች እና የHealth-Related vs Skill-Related Fitness አካላትን በጥልቀት ያስተምራል።',
    briefPointsAm: [
      'FITT መርህ፡ **Frequency** (ሳምንታዊ ድግግሞሽ — 3–5 ቀናት)፣ **Intensity** (ጥንካሬ — 60–85% MHR)፣ **Time** (ቆይታ — 20–60 ደቂቃ) እና **Type** (ዓይነት)።',
      'Target Heart Rate፡ $\\text{MHR} = 220 - \\text{Age}$ ሲሆን Karvonen Formula $\\text{THR} = [(\\text{MHR} - \\text{RHR}) \\times \\%\text{Intensity}] + \\text{RHR}$ ነው።',
      'Aerobic vs Anaerobic፡ Aerobic በኦክስጅን (ረጅም ሩጫ፣ ዋና — Slow-twitch Type I fibers)፣ Anaerobic ያለ ኦክስጅን ለአጭር ከባድ ኃይል (100m Sprint, Weightlifting — Fast-twitch Type II fibers)።',
      '5 Health-Related Fitness Components፡ Cardiorespiratory Endurance, Muscular Strength, Muscular Endurance, Flexibility እና Body Composition።',
    ],
    examTipAm:
      'RHR (Resting Heart Rate) ሲሰጥ **Karvonen Formula** ($\\text{THR} = (\\text{MHR} - \\text{RHR}) \\times \\text{Intensity} + \\text{RHR}$) መጠቀም ከቀላሉ $\\text{MHR} \\times \\text{Intensity}$ የበለጠ ትክክለኛ ነው!',
    expandedOverviewAm:
      'Physical Fitness (SpSc 1011) Chapter 1 በሳይንሳዊ Exercise Physiology ላይ የተመሠረተ የአካል ብቃት እውቀትን ይሰጣል። የTraining Principles (Overload, Progression, Specificity, Individuality, Reversibility — "Use it or lose it")፣ የFITT Prescription Framework፣ ሦስቱ የሰውነት Energy Systems (ATP-PCr Immediate 1–10s, Anaerobic Glycolytic 10–90s, Aerobic Oxidative >2 min)፣ የKarvonen Target Heart Rate ስሌት፣ የ5ቱ Health-Related እና 6ቱ Skill-Related Fitness አካላት ልዩነት (Agility, Balance, Coordination, Power, Reaction Time, Speed) እንዲሁም Dynamic Warm-up vs Static Cool-down Stretchingን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'የFITT መርህን በመጠቀም ለግለሰብ ተስማሚ የአካል ብቃት ስልጠና እቅድ መንደፍ።',
      'MHR እና Karvonen Target Heart Rate (THR) Zones ማስላት።',
      'Health-related (5) እና Skill-related (6) የአካል ብቃት አካላትን መለየት።',
      'ATP-PCr, Anaerobic Glycolysis እና Aerobic Energy Systemsን በቆይታና በMuscle fiber type ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 የስልጠና መርሆዎች፣ FITT እና የኃይል ሥርዓቶች (Exercise Physiology)',
        contentAm: `### 1.1.1 Training Principles & FITT
- **Overload & Progression**: ሰውነት ከለመደው በላይ ጫና ሲደረግበት ይጠነክራል፤ ጫናው ቀስ በቀስ መጨመር አለበት (10% rule)።
- **Specificity**: የምናገኘው ውጤት በምንሠራው ልምምድ ዓይነት ይወሰናል (መዋኘት ሩጫን ሙሉ በሙሉ አይተካም)።
- **Reversibility**: ስልጠና ሲቆም ብቃት በ2–4 ሳምንት ውስጥ መመለስ ይጀምራል።
- **FITT**: **F**requency (Days/week) | **I**ntensity (%HR or Weight) | **T**ime (Minutes) | **T**ype (Aerobic/Resistance/Flexibility)።

### 1.1.2 Three Energy Systems
1. **ATP-PCr (Phosphagen — 0–10 sec)**: ያለ $\\text{O}_2$፣ Lactic acid አያመርትም (100m Sprint, Shot put)።
2. **Anaerobic Glycolysis (10 sec – 2 min)**: ያለ $\\text{O}_2$ Glucose ይፈጫል፣ **Lactic Acid/Lactate** ያመርታል (400m run)።
3. **Aerobic Oxidative (> 2 min)**: በ**$\text{O}_2$** በMitochondria ውስጥ Carbohydrates እና Fats ያቃጥላል (Marathon, Cycling) — ከፍተኛ ATP ያመነጫል!`,
      },
      {
        headingAm: '1.2 Heart Rate Zones, Health vs Skill Fitness & Warm-up',
        contentAm: `### 1.2.1 5 Health-Related vs 6 Skill-Related Components
- **Health-Related (ለጤናና ለበሽታ መከላከያ)**: Cardiorespiratory Endurance ($VO_{2\\max}$), Muscular Strength (1-RM Max force), Muscular Endurance (Repetitive contractions), Flexibility (Range of motion at joints), Body Composition (% Fat vs Lean Mass)።
- **Skill-Related (ለስፖርት ብቃት — ABCPRS)**: **A**gility, **B**alance, **C**oordination, **P**ower, **R**eaction Time, **S**peed።
- **Warm-up vs Cool-down**: ከስልጠና በፊት **Dynamic Warm-up** (ደም ዝውውርና የጡንቻ ሙቀት ይጨምራል)፤ በኋላ **Cool-down + Static Stretching** (የልብ ምትን ቀስ ብሎ ለመመለስና Blood pooling ለመከላከል)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ የ20 ዓመት ተማሪ Resting Heart Rate ($RHR$) **60 bpm** አለው። በKarvonen Formula መሠረት ከ**70% እስከ 80%** የስልጠና ዞኑ (Target Heart Rate Zone) ስንት bpm ነው?',
        stepsAm: [
          '1. $\\text{MHR} = 220 - 20 = 200\\text{ bpm}$.',
          '2. Heart Rate Reserve ($\\text{HRR}$) = $\\text{MHR} - \\text{RHR} = 200 - 60 = 140\\text{ bpm}$.',
          '3. Lower Limit (70%): $(140 \\times 0.70) + 60 = 98 + 60 = \\mathbf{158\\text{ bpm}}$.',
          '4. Upper Limit (80%): $(140 \\times 0.80) + 60 = 112 + 60 = \\mathbf{172\\text{ bpm}}$.',
          '5. ስለዚህ Target Zone = **158–172 bpm**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: '$VO_{2\\max}$', termAm: 'ከፍተኛ የኦክስጅን አጠቃቀም', definitionAm: 'በከባድ አካላዊ እንቅስቃሴ ወቅት ሰውነት በደቂቃ መጠቀም የሚችለው ከፍተኛው የኦክስጅን መጠን (የCardiorespiratory fitness ዋና መለኪያ)።' },
      { termEn: 'RICE Principle', termAm: 'የጉዳት የመጀመሪያ እርዳታ (RICE)', definitionAm: 'ለጡንቻ/መገጣጠሚያ ጉዳት: **R**est (እረፍት), **I**ce (በረዶ), **C**ompression (ማሰር), **E**levation (ከፍ ማድረግ)።' },
    ],
    examTrapsAm: [
      'ከከባድ ስልጠና በኋላ ድንገት መቆም **Blood pooling in legs & Dizziness** ያስከትላል — ሁልጊዜ Cool-down ያስፈልጋል!',
      '**Power** ($\\text{Force} \\times \\text{Velocity}$) ከ**Skill-Related** አካላት ውስጥ እንጂ ከHealth-Related ውስጥ አይደለም!',
    ],
    keyTakeawaysAm: [
      'Karvonen Method ከቀላል %MHR በላይ Resting Heart Rateን ግምት ውስጥ ስለሚያስገባ በአካል ብቃት ሳይንስ ይመረጣል።',
      'Static stretching ከስልጠና **በፊት** ሳይሆን **በኋላ (Cool-down)** ሲደረግ ጉዳትን ይከላከላል፤ ከስልጠና በፊት Dynamic warm-up ይመከራል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "አንድ ሰው በድንገት አቅጣጫ ሲቀይር ሚዛኑን ጠብቆ በፍጥነት የመንቀሳቀስ ብቃት" ከSkill-Related አካላት የቱ ነው?',
        answerAm: 'መልስ፡ **Agility**!',
      },
    ],
  },
};

const CHAPTER_BY_SUBJECT_AND_NUM: Record<string, AmharicChapterNote> = {};
for (const note of Object.values(AMHARIC_CHAPTER_NOTES)) {
  CHAPTER_BY_SUBJECT_AND_NUM[`${note.subject}#${note.chapterNumber}`] = note;
}

export function getAmharicSubjectMeta(subject: Subject): AmharicSubjectMeta | null {
  return AMHARIC_SUBJECT_META[subject] || null;
}

export function getAmharicChapterNote(
  chapterId?: string,
  subject?: Subject,
  chapterNumber?: number,
  fallbackTitle?: string,
  fallbackOverview?: string
): AmharicChapterNote {
  if (chapterId && AMHARIC_CHAPTER_NOTES[chapterId]) {
    return AMHARIC_CHAPTER_NOTES[chapterId];
  }
  if (subject && typeof chapterNumber === 'number') {
    const key = `${subject}#${chapterNumber}`;
    if (CHAPTER_BY_SUBJECT_AND_NUM[key]) {
      return CHAPTER_BY_SUBJECT_AND_NUM[key];
    }
  }
  const subjMeta = subject ? AMHARIC_SUBJECT_META[subject] : undefined;
  const resolvedTitle = fallbackTitle || subjMeta?.shortNameAm || 'ማስታወሻ';
  const resolvedOverview =
    fallbackOverview ||
    subjMeta?.overviewAm ||
    'የዚህ ምዕራፍ መሰረታዊ ጽንሰ-ሐሳቦች፣ ትንተናዎች፣ ቀመሮች እና የፈተና ጥያቄዎች ሙሉ ማብራሪያ።';

  return {
    subject: subject || 'all',
    chapterNumber: chapterNumber || 1,
    titleAm: `ምዕራፍ ${chapterNumber || 1}፡ ${resolvedTitle}`,
    briefOverviewAm: resolvedOverview,
    briefPointsAm: [
      'የምዕራፉን መሰረታዊ ትርጉሞች፣ ሕጎች እና ቁልፍ ጽንሰ-ሐሳቦች በጥልቀት ይረዱ።',
      'ዋና ቀመሮችን፣ ሰንጠረዦችን እና በፈተና ላይ የሚጠየቁ የተሰሩ ምሳሌዎችን ይለማመዱ።',
      'በምዕራፉ ውስጥ ያሉ የተለመዱ የፈተና ወጥመዶችን እና ቁልፍ መደምደሚያዎችን በጥንቃቄ ይለዩ።',
    ],
    examTipAm: 'ለፈተና መሰረታዊ ትርጉሞችን፣ ንጽጽሮችን፣ ቁልፍ ቀመሮችን እና የምሳሌ አሰራሮችን አስቀድመው ይከልሱ።',
    expandedOverviewAm: resolvedOverview,
    learningOutcomesAm: [
      `የ${resolvedTitle} ዋና ዋና ጽንሰ-ሐሳቦችንና ንድፈ-ሐሳቦችን በግልጽ መግለጽ።`,
      'በምዕራፉ ውስጥ የተካተቱ ቀመሮችን፣ ምሳሌዎችን እና የፈተና ጥያቄዎችን በትክክል መተንተን።',
    ],
    keyTakeawaysAm: [
      'ከታች የቀረበውን ሙሉ የሁለት ቋንቋ መማሪያ ማብራሪያ ከመሠረታዊ የአማርኛ ነጥቦች ጋር በማጣመር ያንብቡ።',
    ],
  };
}
