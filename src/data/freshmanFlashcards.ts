import { Flashcard, Subject } from '../types';

const FLASHCARD_SUBJECT_NAME_MAP: Partial<Record<Subject, string>> = {
  anthropology: 'Anthropology',
  biology: 'Biology',
  biology_2: 'Biology',
  geography: 'Geography',
  geography_history: 'Geography',
  entrepreneur: 'Entrepreuner',
  global_affairs: 'GlobalAffaris',
  chemistry: 'Chemistry',
  chemistry_2: 'Chemistry',
  history: 'History',
  civics: 'Civics',
  inclusive: 'Inclusive',
  critical_thinking: 'CriticalThinking',
  mathematics: 'MathsNat',
  economics: 'Economics',
  math_applied_2: 'MathsApplied',
  emerging_tech: 'Emerging',
  math_social: 'MathsSco',
  english: 'English1',
  physics: 'Physics',
  physics_2: 'Physics',
  english_2: 'English2',
  psychology: 'Psychology',
  fitness: 'Physical Fitness',
};

const RAW_FRESHMAN_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    category: 'Logic Equivalence',
    front: 'What is the logical equivalence for Material Implication: p → q?',
    back: 'p → q ≡ ¬p ∨ q\n(Also equivalent to its contrapositive: ¬q → ¬p).',
    hint: 'Think of "Either not P, or Q".'
  },
  {
    id: 'fc-2',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    category: 'Quantifiers',
    front: 'How do you negate the universally quantified conditional: ¬[∀x (P(x) → Q(x))]?',
    back: '∃x (P(x) ∧ ¬Q(x))\n"There exists at least one x that satisfies P(x) but does NOT satisfy Q(x)."',
    hint: 'Universal flips to existential, and implication turns into conjunction with negated consequent.'
  },
  {
    id: 'fc-3',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    category: 'Vectors',
    front: 'What is the algebraic condition for two non-zero vectors u and v to be perpendicular (orthogonal)?',
    back: 'u · v = 0\nTheir scalar dot product must equal zero (since cos 90° = 0).',
    hint: 'Dot product formula: |u||v|cos θ.'
  },
  {
    id: 'fc-4',
    subject: 'physics',
    semester: 1,
    courseCode: 'Phys 1011',
    category: 'Projectiles',
    front: 'At what launch angle does an idealized projectile achieve maximum horizontal range?',
    back: 'θ = 45°\nBecause the range formula R = (u² sin 2θ)/g peaks when sin 2θ = 1 (2θ = 90° ⇒ θ = 45°).',
    hint: 'Recall sin(2θ) reaches maximum value of 1.'
  },
  {
    id: 'fc-5',
    subject: 'physics',
    semester: 1,
    courseCode: 'Phys 1011',
    category: 'Friction',
    front: 'What is the critical angle of repose θ for a mass resting on an incline with static friction coefficient μ_s?',
    back: 'tan θ = μ_s\nAt this angle, downhill gravitational pull mg sin θ exactly balances maximum static friction μ_s mg cos θ.',
    hint: 'Divide sin θ by cos θ.'
  },
  {
    id: 'fc-6',
    subject: 'chemistry',
    semester: 1,
    courseCode: 'Chem 1011',
    category: 'VSEPR',
    front: 'What is the molecular geometry and bond angle of a molecule with Steric Number 4 and 1 lone pair (e.g. NH₃)?',
    back: 'Trigonal Pyramidal\nBond angle is ~107° (compressed from 109.5° due to lone pair-bond pair repulsion).',
    hint: 'Electron geometry is tetrahedral, but 1 position is occupied by a lone pair.'
  },
  {
    id: 'fc-7',
    subject: 'chemistry',
    semester: 1,
    courseCode: 'Chem 1011',
    category: 'Thermodynamics',
    front: 'Under what signs of ΔH and ΔS is a chemical reaction spontaneous at ALL temperatures?',
    back: 'ΔH < 0 (exothermic) and ΔS > 0 (entropy increase).\nΔG = ΔH - TΔS is negative at every absolute temperature T > 0.',
    hint: 'Heat released and disorder increased.'
  },
  {
    id: 'fc-8',
    subject: 'critical_thinking',
    semester: 1,
    courseCode: 'LoCT 1011',
    category: 'Fallacies',
    front: 'What is the Argumentum Ad Hominem fallacy?',
    back: 'Attacking the arguer\'s character, motive, background, or personal life instead of addressing the logical merits of their argument.',
    hint: 'Latin for "to the person".'
  },
  {
    id: 'fc-9',
    subject: 'civics',
    semester: 1,
    courseCode: 'CESt 1011',
    category: 'Normative Ethics',
    front: 'What is the fundamental difference between Utilitarianism and Kantian Deontology?',
    back: 'Utilitarianism judges morality strictly by consequences (greatest net happiness for the greatest number);\nDeontology judges actions by adherence to universal moral duties regardless of consequences.',
    hint: 'Outcomes vs Duty.'
  },
  {
    id: 'fc-10',
    subject: 'english',
    semester: 1,
    courseCode: 'EnLa 1011',
    category: 'Conditionals',
    front: 'What is the inverted formal structure of the 3rd conditional: "If I had known..."?',
    back: '"Had I known...", the subject would have...\nDrops "if" and fronts the auxiliary verb "Had".',
    hint: 'Inversion eliminates the word "if".'
  },
  {
    id: 'fc-11',
    subject: 'emerging_tech',
    semester: 2,
    courseCode: 'EmTe 1012',
    category: 'Cloud Computing',
    front: 'What is the distinction between IaaS, PaaS, and SaaS in cloud computing?',
    back: '• IaaS: Virtual infrastructure (VMs, storage, networking; user manages OS and apps).\n• PaaS: Development platform (user only writes app code; cloud manages OS/runtime).\n• SaaS: Finished application delivered over the web (e.g. Gmail, Google Docs).',
    hint: 'Infrastructure vs Platform vs Software.'
  },
  {
    id: 'fc-12',
    subject: 'biology',
    semester: 1,
    courseCode: 'Biol 1011',
    category: 'Respiration',
    front: 'What serves as the terminal electron acceptor in aerobic respiration?',
    back: 'Molecular Oxygen (O₂)\nIt accepts electrons and protons at Complex IV to form H₂O.',
    hint: 'It is reduced to water.'
  },
  {
    id: 'fc-13',
    subject: 'anthropology',
    semester: 1,
    courseCode: 'Anthropology',
    category: 'Culture & Relativism',
    front: 'What is the difference between Ethnocentrism and Cultural Relativism?',
    back: '• Ethnocentrism: Judging another culture using the values and standards of one’s own culture.\n• Cultural Relativism: Understanding a culture’s beliefs and practices from within its own context.',
    hint: 'Own lens vs Insider context.'
  },
  {
    id: 'fc-14',
    subject: 'entrepreneur',
    semester: 2,
    courseCode: 'Entrepreuner',
    category: 'Financial Feasibility',
    front: 'What is the formula for the Break-Even Point in units (Q_BEP)?',
    back: 'Q_BEP = Fixed Costs (FC) ÷ (Selling Price per Unit P − Variable Cost per Unit VC)\nAt Q_BEP, Total Revenue equals Total Cost (Zero net profit/loss).',
    hint: 'Fixed Cost divided by Contribution Margin per unit.'
  },
  {
    id: 'fc-15',
    subject: 'global_affairs',
    semester: 1,
    courseCode: 'GlobalAffaris',
    category: 'IR Theories',
    front: 'What are the 3 core assumptions of Realism in Global Affairs?',
    back: '1. Statism: Sovereign states are the primary actors.\n2. Survival: National security is the supreme national interest.\n3. Self-Help: In an anarchic international system, states must rely on their own power and alliances.',
    hint: '3 S’s: Statism, Survival, Self-Help.'
  },
  {
    id: 'fc-16',
    subject: 'inclusive',
    semester: 2,
    courseCode: 'Inclusive',
    category: 'Universal Design',
    front: 'What are the 3 core principles of Universal Design for Learning (UDL)?',
    back: '1. Multiple means of Engagement (the "Why" of learning)\n2. Multiple means of Representation (the "What" of learning)\n3. Multiple means of Action & Expression (the "How" of learning)',
    hint: 'Engagement, Representation, Action/Expression.'
  },
  {
    id: 'fc-17',
    subject: 'economics',
    semester: 1,
    courseCode: 'Economics',
    category: 'Macroeconomics',
    front: 'How is Gross Domestic Product (GDP) calculated using the Expenditure Approach?',
    back: 'GDP = C + I + G + (X − M)\nWhere C = Consumption, I = Gross Investment, G = Government Spending, and (X − M) = Net Exports.',
    hint: 'Consumption + Investment + Government + Net Exports.'
  },
  {
    id: 'fc-18',
    subject: 'math_social',
    semester: 1,
    courseCode: 'MathsSco',
    category: 'Business Calculus',
    front: 'What is the first-order condition for maximizing profit Π(Q) = TR(Q) − TC(Q)?',
    back: 'Marginal Revenue equals Marginal Cost: MR(Q) = MC(Q) (i.e., Π\'(Q) = 0), with second-order condition Π\'\'(Q) < 0.',
    hint: 'Set Marginal Revenue equal to Marginal Cost.'
  },
  {
    id: 'fc-fit-1',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 1: Definitions',
    front: 'How do Physical Activity, Physical Exercise, and Sport differ?',
    back: '• Physical Activity: Any skeletal muscle movement requiring energy expenditure (e.g., walking, gardening).\n• Physical Exercise: Planned, structured, and repetitive movement to improve/maintain fitness.\n• Sport: Competitive physical activity governed by rules, skill, and strategy.',
    hint: 'Incidental movement vs Planned/Structured/Repetitive vs Competitive rules.'
  },
  {
    id: 'fc-fit-2',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 1: Training Principles',
    front: 'What does the FIIT Principle stand for, and what does the Principle of Reversibility mean?',
    back: '• FIIT: Frequency (how often), Intensity (how hard), Time (how long), Type (what kind of exercise).\n• Reversibility: "Use it or lose it" — fitness gains are lost when training stops.',
    hint: 'F-I-I-T designs workouts; Reversibility describes detraining.'
  },
  {
    id: 'fc-fit-3',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 2: Hypokinetic Diseases',
    front: 'What are Hypokinetic Diseases, and how does exercise affect HDL and LDL cholesterol?',
    back: '• Hypokinetic diseases: Conditions caused by insufficient physical activity (e.g., obesity, type 2 diabetes, osteoporosis).\n• Cholesterol effect: Exercise raises HDL ("good" cholesterol) and lowers LDL ("bad" cholesterol), reducing Coronary Heart Disease and dyslipidemia risk.',
    hint: 'Hypo = low, kinetic = movement; HDL High, LDL Low.'
  },
  {
    id: 'fc-fit-4',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 3: Sports Nutrition',
    front: 'What are the key nutritional guidelines Before (2–3 hrs) and After (30–60 min) Exercise?',
    back: '• Before Exercise (2–3 hrs prior): High carbohydrates for energy, moderate protein, low fat, and proper hydration.\n• After Exercise (30–60 min post): Protein + Carbohydrates to promote muscle repair and glycogen replenishment.',
    hint: 'Before = low fat + carbs; After = protein + carbs within 30–60 min.'
  },
  {
    id: 'fc-fit-5',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 4: Components & Prescription',
    front: 'What are the 4 Health-Related Components of Fitness in SpSc 1011 Unit 4, and what are SMART fitness goals?',
    back: '• 4 Components: Cardio-respiratory Fitness, Muscle Fitness (Strength & Endurance), Flexibility, and Body Composition.\n• SMART Goals: Specific, Measurable, Achievable, Relevant, Time-bound.',
    hint: 'Heart/lungs, muscles, joint ROM, fat vs lean mass.'
  },
  {
    id: 'fc-fit-6',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 4: Cardiorespiratory',
    front: 'What is the standard Exercise Prescription and what are the 3 training techniques for Cardiorespiratory Fitness?',
    back: '• Prescription: 3–5 days/week, 60%–85% MHR, for 20–60 minutes.\n• Techniques: Continuous training, Interval training, and Cross-training.',
    hint: '3–5 days, 60–85% MHR, 20–60 min.'
  },
  {
    id: 'fc-fit-7',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    category: 'Unit 4: Muscle & Flexibility',
    front: 'What is the standard Flexibility Prescription (frequency, hold time, types) and Warm-Up vs Cool-Down stretching rule?',
    back: '• Flexibility: Static, Dynamic, or PNF stretching performed 2–3 days/week, holding static stretches 15–30 seconds to mild tension.\n• Warm-Up uses light activity + Dynamic stretching; Cool-Down lowers heart rate and uses Static stretching.',
    hint: 'Dynamic before workout; Static 15–30s after workout.'
  }
];

export const ALL_FRESHMAN_FLASHCARDS: Flashcard[] = RAW_FRESHMAN_FLASHCARDS.map((fc) => {
  const mappedSubj: Subject =
    fc.subject === 'physics_2'
      ? 'physics'
      : fc.subject === 'chemistry_2'
      ? 'chemistry'
      : fc.subject === 'biology_2'
      ? 'biology'
      : fc.subject === 'geography_history'
      ? 'geography'
      : fc.subject;
  return {
    ...fc,
    subject: mappedSubj,
    courseCode: FLASHCARD_SUBJECT_NAME_MAP[mappedSubj] || 'Maths1',
  };
});

