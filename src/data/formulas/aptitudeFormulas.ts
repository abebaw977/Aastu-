import { FormulaItem } from '../../types';

export const APTITUDE_FORMULAS: FormulaItem[] = [
  // 1. WORK & TIME
  {
    id: 'af-wk-01',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Work & Time',
    name: "Combined Work-Rate Two Entity Formula",
    formula: "T_{\\text{together}} = \\frac{A \\times B}{A + B}",
    variablesExplanation: "A = days taken by person A alone, B = days taken by person B alone",
    units: "Days or hours",
    description: "Instant time calculation when two entities work simultaneously at constant rates.",
    examTip: "If A takes 6 days and B takes 12 days: T = (6 × 12) / (6 + 12) = 72 / 18 = 4 days.",
    difficulty: 'Core'
  },
  {
    id: 'af-wk-02',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Work & Time',
    name: "Combined Work for 3 Entities",
    formula: "T_{\\text{together}} = \\frac{A \\times B \\times C}{AB + BC + CA} \\iff \\frac{1}{T} = \\frac{1}{A} + \\frac{1}{B} + \\frac{1}{C}",
    variablesExplanation: "A, B, C are individual completion times",
    description: "Calculates total completion time for three entities working concurrently.",
    examTip: "LCM method is often fastest: assume total work = LCM(A, B, C) units, then sum daily unit rates.",
    difficulty: 'Core'
  },
  {
    id: 'af-wk-03',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Work & Time',
    name: "Pipes & Cisterns Inflow/Outflow",
    formula: "\\text{Net Rate} = \\frac{1}{A} + \\frac{1}{B} - \\frac{1}{C} \\implies T_{\\text{fill}} = \\frac{1}{\\text{Net Rate}}",
    variablesExplanation: "A, B are inlet filling pipes, C is an emptying/leakage pipe",
    description: "Net filling rate when inlet and drainage pipes operate simultaneously.",
    examTip: "Emptying pipes always take a NEGATIVE sign in the rate equation.",
    difficulty: 'Core'
  },

  // 2. SPEED, DISTANCE, TIME & TRAINS
  {
    id: 'af-spd-01',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Speed, Distance & Time',
    name: "Unit Conversion Factor (km/h <-> m/s)",
    formula: "v (\\text{m/s}) = v (\\text{km/h}) \\times \\frac{5}{18}, \\quad v (\\text{km/h}) = v (\\text{m/s}) \\times \\frac{18}{5}",
    variablesExplanation: "5/18 factor comes from 1000m / 3600s = 5/18",
    description: "Instant unit conversion in speed problems.",
    examTip: "72 km/h = 72 × (5/18) = 20 m/s. 54 km/h = 15 m/s. 90 km/h = 25 m/s.",
    difficulty: 'Core'
  },
  {
    id: 'af-spd-02',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Speed, Distance & Time',
    name: "Harmonic Average Speed (Equal Distance)",
    formula: "v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2}",
    variablesExplanation: "v_1 = speed outbound, v_2 = speed return for identical distance d",
    description: "Average speed for round trips or two equal distance segments.",
    examTip: "Average speed is NEVER the simple arithmetic mean (v_1 + v_2)/2 unless travel TIMES are equal!",
    difficulty: 'Core'
  },
  {
    id: 'af-spd-03',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Speed, Distance & Time',
    name: "Train Crossing Station / Platform / Bridge",
    formula: "T = \\frac{L_{\\text{train}} + L_{\\text{platform}}}{v_{\\text{train}}}, \\quad T_{\\text{pole}} = \\frac{L_{\\text{train}}}{v_{\\text{train}}}",
    variablesExplanation: "L = length in meters, v = speed in m/s, T = crossing time in seconds",
    description: "Total distance traveled when crossing stationary extended objects versus point objects.",
    examTip: "A pole or standing person has negligible length (L_pole = 0).",
    difficulty: 'Core'
  },
  {
    id: 'af-spd-04',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Speed, Distance & Time',
    name: "Relative Speed (Same vs Opposite Directions)",
    formula: "v_{\\text{rel}} = \\begin{cases} v_1 + v_2 & \\text{Opposite directions (towards each other)} \\\\ |v_1 - v_2| & \\text{Same direction (chase / overtake)} \\end{cases}",
    variablesExplanation: "Time to meet or overtake = Distance Separation / v_rel",
    description: "Effective relative approach speed between two moving bodies.",
    examTip: "Boats & Streams: Downstream speed = u + v, Upstream speed = u - v (where u = boat speed in still water, v = stream speed).",
    difficulty: 'Core'
  },

  // 3. PERCENTAGES, PROFIT & LOSS, INTEREST
  {
    id: 'af-fin-01',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Commercial Math',
    name: "Profit & Loss Percentages",
    formula: "\\%\\text{Profit} = \\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100\\%, \\quad \\%\\text{Loss} = \\frac{\\text{CP} - \\text{SP}}{\\text{CP}} \\times 100\\%",
    variablesExplanation: "SP = Selling Price, CP = Cost Price",
    description: "Percentage profit or loss is always calculated with respect to COST PRICE (CP) unless stated otherwise.",
    examTip: "SP = CP × (1 + %Profit/100).",
    difficulty: 'Core'
  },
  {
    id: 'af-fin-02',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Commercial Math',
    name: "Simple & Compound Interest",
    formula: "SI = \\frac{P \\cdot r \\cdot t}{100}, \\quad A = P\\left(1 + \\frac{r}{100}\\right)^t, \\quad CI = A - P",
    variablesExplanation: "P = principal amount, r = annual interest rate %, t = time in years, A = total maturity amount",
    description: "Linear simple interest versus exponential compound growth.",
    examTip: "Difference between CI and SI for 2 years: Difference = P × (r / 100)².",
    difficulty: 'Core'
  },

  // 4. MIXTURES, ALLIGATION & RATIOS
  {
    id: 'af-mix-01',
    subject: 'aptitude',
    topic: 'Quantitative Reasoning',
    category: 'Ratios & Mixtures',
    name: "Rule of Alligation (Cross Mixture Ratio)",
    formula: "\\frac{q_{\\text{cheaper}}}{q_{\\text{dearer}}} = \\frac{c_{\\text{dearer}} - m}{m - c_{\\text{cheaper}}}",
    variablesExplanation: "c_cheaper = cheaper price/concentration, c_dearer = dearer price, m = target mean mixture value",
    description: "Visual cross-method to find ratio of two ingredients needed to produce a mixture of target concentration.",
    examTip: "Saves up to 60 seconds on complex milk-water dilution or alloy mixing problems.",
    difficulty: 'Advanced'
  },

  // 5. ENGLISH GRAMMAR & VERBAL REASONING RULES
  {
    id: 'af-eng-01',
    subject: 'aptitude',
    topic: 'Verbal Reasoning & English',
    category: 'Grammar Formulas',
    name: "Conditional Sentences Structural Rules",
    formula: "\\text{Type 1: If + Pres. Simple } \\to \\text{will + V1} \\quad | \\quad \\text{Type 2: If + Past Simple } \\to \\text{would + V1} \\quad | \\quad \\text{Type 3: If + Past Perfect } \\to \\text{would have + V3}",
    variablesExplanation: "V1 = base verb, V3 = past participle",
    description: "Strict verbal tense pairing formulas tested in English section.",
    examTip: "Inverted conditional: 'Had I known...' replaces 'If I had known...'.",
    difficulty: 'Core'
  },
  {
    id: 'af-eng-02',
    subject: 'aptitude',
    topic: 'Verbal Reasoning & English',
    category: 'Grammar Formulas',
    name: "Subject-Verb Agreement with Intervening Phrases",
    formula: "\\text{Subject } [\\text{as well as / together with / along with / accompanied by}] \\dots \\implies \\text{Verb matches 1st Subject}",
    variablesExplanation: "The intervening prepositional phrase does NOT change the grammatical number of the main subject",
    description: "A singular subject followed by 'as well as [plural noun]' still takes a SINGULAR verb.",
    examTip: "Example: 'The Dean, as well as thirty professors, is (not are) attending the colloquium.'",
    difficulty: 'Core'
  }
];
