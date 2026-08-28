import { MasterNoteChapter } from '../types';

export const APTITUDE_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'apt-ch1-quant-speed',
    subject: 'aptitude',
    chapterNumber: 1,
    title: 'Quantitative Aptitude, Speed Math & Analytical Logic',
    gradeLevel: 'University Prep',
    overview: 'High-speed shortcuts for Work & Time, Pipes & Cisterns, Relative Speed & Trains, Mixtures & Alligation, Permutations & Combinations, Probability, and Syllogisms.',
    estimatedReadTimeMinutes: 24,
    sections: [
      {
        id: 'apt-1-1-quant-shortcuts',
        heading: '1.1 Quantitative Math & Mental Speed Formulas',
        content: `### 1. Work and Time Magic Formulas:
- If Person A completes a job in $A$ days and Person B completes it in $B$ days:
  $$\\text{Combined Time} = \\frac{A \\cdot B}{A + B} \\text{ days}$$
- If 3 people take $A, B, C$ days respectively:
  $$\\text{Combined Time} = \\frac{A B C}{A B + B C + C A}$$
- If A & B together take $T$ days, and A alone takes $B$ days:
  $$A_{\\text{alone}} = \\frac{B \\cdot T}{B - T}$$

### 2. Relative Speed & Train Problems:
- **Same Direction**: Relative Speed $= |V_1 - V_2|$
- **Opposite Direction (Towards each other)**: Relative Speed $= V_1 + V_2$
- **Speed Conversion**:
  - $\\text{km/h} \\to \\text{m/s}$: Multiply by $\\frac{5}{18}$
  - $\\text{m/s} \\to \\text{km/h}$: Multiply by $\\frac{18}{5}$
- **Train Crossing a Pole / Person**: Distance $= L_{\\text{train}}$, $\\text{Time} = \\frac{L_{\\text{train}}}{V_{\\text{train}}}$
- **Train Crossing a Bridge / Platform**: Distance $= L_{\\text{train}} + L_{\\text{platform}}$, $\\text{Time} = \\frac{L_{\\text{train}} + L_{\\text{platform}}}{V_{\\text{train}}}$

### 3. Alligation & Mixture Rule:
$$\\frac{\\text{Quantity of Cheaper}}{\\text{Quantity of Dearer}} = \\frac{\\text{Price of Dearer} - \\text{Mean Price}}{\\text{Mean Price} - \\text{Price of Cheaper}}$$

### 4. Permutations, Combinations & Probability:
- Permutations (Order matters): $P(n, r) = \\frac{n!}{(n-r)!}$
- Combinations (Selection only): $C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$
- Circular Permutations: $(n - 1)!$ arrangements.
- At Least 1 Occurrence Probability: $P(\\text{at least one}) = 1 - P(\\text{none})$.`,
        equations: [
          {
            name: "Work & Time 2-Person Formula",
            formula: "T = \\frac{A \\cdot B}{A + B}",
            explanation: "Solves combined work problems in 5 seconds without fractions."
          },
          {
            name: "Km/h to M/s Conversion",
            formula: "V_{\\text{m/s}} = V_{\\text{km/h}} \\times \\frac{5}{18}",
            explanation: "Instant unit conversion essential for train and kinematics physics questions."
          }
        ],
        workedExamples: [
          {
            problem: "Pipe A can fill a tank in 12 hours, while Pipe B can empty the full tank in 18 hours. If both pipes are opened simultaneously, how long will it take to fill the empty tank?",
            stepByStepSolution: [
              "Filling rate of Pipe A = $+\\frac{1}{12}$ tank/hr.",
              "Emptying rate of Pipe B = $-\\frac{1}{18}$ tank/hr.",
              "Net filling rate = $\\frac{1}{12} - \\frac{1}{18} = \\frac{3 - 2}{36} = \\frac{1}{36}$ tank/hr.",
              "Total time required to fill = $\\frac{1}{1/36} = 36\\text{ hours}$."
            ],
            shortcutTip: "Use formula $T = \\frac{A \\cdot B}{B - A} = \\frac{12 \\times 18}{18 - 12} = \\frac{216}{6} = 36\\text{ hours}$!"
          }
        ],
        examTraps: [
          "Forgetting to subtract the emptying pipe's rate in cistern problems.",
          "Using permutations instead of combinations when team or group selections are made where order doesn't matter."
        ],
        keyTakeaways: [
          "Sum of first $n$ natural numbers $= \\frac{n(n+1)}{2}$.",
          "Sum of squares $= \\frac{n(n+1)(2n+1)}{6}$; Sum of cubes $= \\left[\\frac{n(n+1)}{2}\\right]^2$."
        ]
      }
    ]
  },
  {
    id: 'apt-ch2-english-grammar',
    subject: 'aptitude',
    chapterNumber: 2,
    title: 'English for STEM: Grammar Rules, Error Spotting & Reading',
    gradeLevel: 'University Prep',
    overview: 'High-frequency grammar rules, Subject-Verb agreement exceptions, Conditional sentences (Types 0, 1, 2, 3), Active vs Passive voice, and vocabulary in context.',
    estimatedReadTimeMinutes: 20,
    sections: [
      {
        id: 'apt-2-1-grammar-rules',
        heading: '2.1 Essential Grammar Traps & Sentence Structures',
        content: `### 1. Subject-Verb Agreement High-Yield Rules:
- **Singular Indefinite Pronouns**: *Each, every, either, neither, someone, anyone, everyone, nobody* always take a **SINGULAR** verb.
  - *Example*: "Neither of the two experimental samples **was** contaminated." (NOT 'were').
- **Intervening Prepositional Phrases**: The verb agrees with the true subject, NOT the noun in between.
  - *Example*: "The quality of these engineering components **is** exceptional." (Subject is 'quality', singular).
- **'Either... or' / 'Neither... nor'**: The verb agrees with the **closer** subject.
  - *Example*: "Neither the professor nor his students **were** aware of the anomaly."

### 2. The 4 Conditional Structures:
1. **Zero Conditional (Scientific Facts)**:
   $$\\text{If} + \\text{Present Simple}, \\dots \\text{Present Simple}$$
   - *Example*: "If water reaches 100°C, it boils."
2. **First Conditional (Real Future Possibility)**:
   $$\\text{If} + \\text{Present Simple}, \\dots \\text{will} + \\text{Verb}$$
   - *Example*: "If you master these calculus formulas, you will score high."
3. **Second Conditional (Hypothetical / Unreal Present)**:
   $$\\text{If} + \\text{Past Simple (were)}, \\dots \\text{would} + \\text{Verb}$$
   - *Example*: "If I **were** the examiner, I would test vectors."
4. **Third Conditional (Unreal Past / Regret)**:
   $$\\text{If} + \\text{Past Perfect (had + V3)}, \\dots \\text{would have} + \\text{V3}$$
   - *Example*: "If he **had checked** the battery voltage, the circuit **would not have burned**."`,
        equations: [
          {
            name: "Third Conditional Formula",
            formula: "\\text{If} + \\text{had} + V_3, \\dots \\text{would have} + V_3",
            explanation: "Tested heavily in sentence completion and error correction."
          }
        ],
        workedExamples: [
          {
            problem: "Identify the correct sentence: (A) If the team had calibrated the apparatus, they would obtain accurate readings. (B) If the team had calibrated the apparatus, they would have obtained accurate readings.",
            stepByStepSolution: [
              "The 'if' clause uses past perfect ('had calibrated'), indicating an unreal condition in the past.",
              "The matching result clause must follow the Third Conditional pattern: 'would have + past participle' ('would have obtained').",
              "Therefore, option (B) is grammatically correct."
            ]
          }
        ],
        examTraps: [
          "Using 'would have' inside the 'if' clause (e.g. 'If I would have studied...' is ALWAYS WRONG; use 'If I had studied...').",
          "Using 'was' instead of subjunctive 'were' in hypothetical conditionals ('If I were you...', not 'If I was you...')."
        ],
        keyTakeaways: [
          "Active vs Passive: In scientific writing, passive voice is favored when emphasizing the result over the actor ('The solution was heated to 80°C').",
          "Read questions carefully for negative indicators like 'EXCEPT', 'NOT', or 'INCORRECT'."
        ]
      }
    ]
  }
];
