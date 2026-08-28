import { DayPlan } from '../types';

export const AASTU_5_DAY_PLAN: DayPlan[] = [
  {
    day: 1,
    title: "Day 1: Calculus Foundations & English Verbal Mastery",
    focusSubjects: ["Mathematics", "English & Verbal Aptitude"],
    tagline: "Master 40% of the Math paper (Limits, Derivatives, Integrals) and lock in high-scoring English grammar.",
    estimatedHours: 9,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "Mathematics (Calculus I & II)",
        topics: [
          "Limits & Continuity (L'Hôpital's rule, indeterminate forms 0/0, ∞/∞)",
          "Derivatives (Product, Quotient, Chain rules, Tangent & Normal lines)",
          "Extrema, Optimization, and Curve sketching"
        ],
        objectives: [
          "Solve 15 limits using L'Hôpital in under 40 seconds each",
          "Master derivatives of trigonometric, exponential, and logarithmic functions",
          "Apply maximum/minimum condition: f'(x) = 0 and f''(x) sign test"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Afternoon (3.5h)",
        subject: "Mathematics (Integral Calculus & Vectors)",
        topics: [
          "Definite & Indefinite Integrals (Substitution, Integration by Parts)",
          "Area under curves and between two curves",
          "3D Vectors: Dot product (angles, projections) and Cross product (area, normal vectors)"
        ],
        objectives: [
          "Memorize standard integral forms: ∫(1/(a²+x²))dx, ∫e^(kx)dx, ∫ln(x)dx",
          "Calculate vector magnitude, unit vectors, orthogonality, and parallelism quickly"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Evening (2.5h)",
        subject: "English & Verbal Aptitude",
        topics: [
          "Sentence completion & Vocabulary in context",
          "Grammar rules: Subject-verb agreement, Conditionals (Types 1, 2, 3), Active/Passive voice",
          "Reading comprehension skimming & keyword scanning tactics"
        ],
        objectives: [
          "Review 50 high-frequency academic vocabulary words",
          "Complete 2 reading comprehension passages with 10 questions in 15 mins"
        ],
        recommendedPracticeCount: 20
      }
    ],
    highYieldTopics: [
      "L'Hôpital's Rule for limits",
      "Vector dot product for angle between lines: cos θ = (u·v)/(|u||v|)",
      "Area between curves: ∫(f(x) - g(x))dx",
      "Conditionals in English (e.g. 'If I had known... I would have...')"
    ],
    examTraps: [
      "Forgetting the constant of integration in indefinite integrals",
      "Confusing cross product direction or sign (u × v = -(v × u))",
      "Applying L'Hôpital's rule when the form is NOT indeterminate (e.g. non-zero denominator)"
    ],
    keyFormulasToMemorize: [
      "d/dx [ln(u)] = u'/u",
      "d/dx [e^(kx)] = k·e^(kx)",
      "|u × v| = |u||v|sin(θ)",
      "u · v = |u||v|cos(θ)"
    ]
  },
  {
    day: 2,
    title: "Day 2: Classical Mechanics, Kinematics & Energy",
    focusSubjects: ["Physics"],
    tagline: "Mechanics accounts for ~35% of the Physics entrance section. Master projectile motion, forces, and conservation laws.",
    estimatedHours: 9,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "Physics (Kinematics in 1D & 2D)",
        topics: [
          "Equations of uniformly accelerated motion: v = u + at, s = ut + ½at², v² = u² + 2as",
          "Projectile Motion: Maximum height H = (u² sin²θ)/(2g), Range R = (u² sin 2θ)/g, Time of flight T = (2u sin θ)/g",
          "Relative velocity in 1D and 2D"
        ],
        objectives: [
          "Solve 10 projectile trajectory and range questions",
          "Recognize motion graphs (s-t, v-t, a-t slope and area relationships)"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Afternoon (3.5h)",
        subject: "Physics (Newton's Laws, Friction & Circular Motion)",
        topics: [
          "Newton's 1st, 2nd, 3rd laws & Free Body Diagrams (FBD)",
          "Static vs Kinetic friction: f_s ≤ μ_s N, f_k = μ_k N on horizontal and inclined planes",
          "Uniform circular motion: a_c = v²/r = ω²r, Centripetal Force F_c = mv²/r",
          "Banking of roads: tan θ = v²/(rg)"
        ],
        objectives: [
          "Quickly compute acceleration on inclined planes with friction: a = g(sin θ - μ cos θ)",
          "Tension in connected blocks and pulley systems"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Evening (2.5h)",
        subject: "Physics (Work, Energy, Power & Momentum)",
        topics: [
          "Work-Energy Theorem: W_net = ΔK = ½mv_f² - ½mv_i²",
          "Conservation of Mechanical Energy: K_i + U_i = K_f + U_f",
          "Power: P = W/t = F · v",
          "Linear Momentum & Collisions (Elastic vs Inelastic, Coefficient of restitution e)"
        ],
        objectives: [
          "Calculate power required for climbing/lifting against gravity",
          "Solve 1D and 2D collision momentum conservation problems"
        ],
        recommendedPracticeCount: 20
      }
    ],
    highYieldTopics: [
      "Projectile Range is maximum at θ = 45°",
      "Inclined plane acceleration: a = g(sin θ - μ_k cos θ)",
      "In an isolated system, total momentum is ALWAYS conserved",
      "Work done by centripetal force is always ZERO (perpendicular to displacement)"
    ],
    examTraps: [
      "Forgetting to decompose gravity into mg sin θ and mg cos θ on an incline",
      "Assuming mechanical energy is conserved in inelastic collisions (only momentum is conserved!)",
      "Mixing up degrees and radians when calculating angular velocity ω = 2π/T"
    ],
    keyFormulasToMemorize: [
      "Range R = (u² sin 2θ)/g",
      "Height H = (u² sin²θ)/(2g)",
      "Power P = F · v = F v cos θ",
      "Conservation of Momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂"
    ]
  },
  {
    day: 3,
    title: "Day 3: Core Chemistry & Advanced Mathematics",
    focusSubjects: ["Chemistry", "Mathematics"],
    tagline: "Lock in chemical stoichiometry, bonding, acid-base equilibrium, alongside matrices, sequences, and trigonometry.",
    estimatedHours: 9,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "Chemistry (Atomic Structure, Bonding & Stoichiometry)",
        topics: [
          "Quantum numbers (n, l, m_l, m_s) and electronic configuration (Aufbau, Hund, Pauli)",
          "Chemical bonding: Ionic, Covalent, Hybridization (sp, sp², sp³), VSEPR geometry",
          "Mole concept, Stoichiometry, Limiting reactants, Percentage yield, Solution concentration (Molarity, Molality)"
        ],
        objectives: [
          "Determine molecular geometry (e.g. NH3 is trigonal pyramidal, H2O is bent)",
          "Calculate limiting reactant and theoretical yield in 3 steps"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Afternoon (3.5h)",
        subject: "Chemistry (Equilibrium, Acids & Bases, Electrochemistry)",
        topics: [
          "Chemical Equilibrium: Kc, Kp expressions and Le Chatelier's Principle (effects of T, P, V, conc.)",
          "Acids and Bases: pH, pOH, Kw = 10^-14, Buffer solutions, Henderson-Hasselbalch equation",
          "Electrochemistry: Galvanic vs Electrolytic cells, Standard reduction potentials E°_cell = E°_cathode - E°_anode, Faraday's laws"
        ],
        objectives: [
          "Predict equilibrium shift when temperature or pressure changes",
          "Calculate pH for strong vs weak acid solutions and standard cell EMF"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Evening (2.5h)",
        subject: "Mathematics (Algebra, Sequences, Trigonometry & Matrices)",
        topics: [
          "Arithmetic (AP) & Geometric (GP) Progressions: a_n, S_n, S_∞ = a/(1-r)",
          "Trigonometric identities: sin²x+cos²x=1, sin(2x)=2sinx cosx, cos(2x)=cos²x-sin²x",
          "Matrices & Determinants: 2x2 and 3x3 determinants, inverse matrix A⁻¹ = (1/det A) adj(A)",
          "Coordinate Geometry: Distance formula, line equations, circles (x-h)² + (y-k)² = r²"
        ],
        objectives: [
          "Solve sum to infinity of convergent GP (|r| < 1)",
          "Quick 2x2 matrix inversion and 3x3 determinant calculation"
        ],
        recommendedPracticeCount: 20
      }
    ],
    highYieldTopics: [
      "Le Chatelier's Principle: Adding heat shifts endothermic forward (ΔH > 0)",
      "pH = -log[H+], pH + pOH = 14",
      "Sum of infinite GP: S_∞ = a / (1 - r) for |r| < 1",
      "Determinant of 2x2: ad - bc; Inverse = (1/(ad-bc)) * [[d, -b], [-c, a]]"
    ],
    examTraps: [
      "Solids and pure liquids are OMITTED from equilibrium constant Kc expressions",
      "Spontaneous cell reaction requires E°_cell > 0 and ΔG° < 0",
      "Forgetting to check the common ratio condition |r| < 1 before using S_∞ formula"
    ],
    keyFormulasToMemorize: [
      "pH = -log[H⁺]",
      "E°_cell = E°_cathode - E°_anode",
      "S_∞ = a / (1 - r)",
      "sin(2θ) = 2 sin θ cos θ",
      "cos(2θ) = cos²θ - sin²θ = 1 - 2sin²θ = 2cos²θ - 1"
    ]
  },
  {
    day: 4,
    title: "Day 4: Electromagnetism, Waves, Optics & Analytical Aptitude",
    focusSubjects: ["Physics", "Quantitative Aptitude"],
    tagline: "Tackle electricity, magnetism, optics, and crack quantitative aptitude shortcuts for high exam speed.",
    estimatedHours: 9,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "Physics (Electricity, Magnetism & DC Circuits)",
        topics: [
          "Coulomb's Law: F = k(q₁q₂)/r², Electric field E = F/q = kq/r²",
          "Ohm's Law, Resistors in Series & Parallel, Kirchhoff's Laws (KCL, KVL)",
          "Capacitors: C = Q/V = ε₀A/d, Series & Parallel combinations, Energy U = ½CV²",
          "Magnetic Force: F = q(v × B) = qvB sin θ, F = ILB sin θ on a current-carrying wire"
        ],
        objectives: [
          "Find equivalent resistance and branch currents in complex resistor networks",
          "Apply right-hand rule for magnetic force on charged particles"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Afternoon (3.5h)",
        subject: "Physics (Waves, Optics, Thermodynamics & Modern Physics)",
        topics: [
          "Wave motion: v = fλ, Standing waves, Doppler effect f' = f(v ± v_o)/(v ∓ v_s)",
          "Geometric Optics: Snell's Law n₁ sin θ₁ = n₂ sin θ₂, Mirror & Lens equation: 1/f = 1/d_o + 1/d_i",
          "Thermodynamics: First Law ΔU = Q - W, Ideal Gas Law PV = nRT",
          "Modern Physics: Photoelectric effect E = hf = Φ + K_max, de Broglie wavelength λ = h/p"
        ],
        objectives: [
          "Solve Doppler frequency shifts when source or observer moves",
          "Calculate focal length, image distance, and magnification m = -d_i/d_o"
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Evening (2.5h)",
        subject: "Quantitative & Logical Aptitude",
        topics: [
          "Number & Letter series pattern recognition",
          "Speed, Time, Distance & Work-rate problems (e.g. 1/A + 1/B = 1/T)",
          "Percentages, Ratios, Probability: P(E) = n(E)/n(S)",
          "Syllogisms and logical deductions"
        ],
        objectives: [
          "Master work-rate shortcut: Combined time = (A × B) / (A + B)",
          "Solve 15 logical pattern questions in under 12 minutes"
        ],
        recommendedPracticeCount: 20
      }
    ],
    highYieldTopics: [
      "Total internal reflection occurs when light travels from denser to rarer medium and θ > θ_c where sin θ_c = n₂/n₁",
      "Photoelectric effect: Increasing light intensity increases CURRENT, not kinetic energy of electrons",
      "Work rate formula: Time together = (A * B) / (A + B)",
      "Kirchhoff's Junction Rule is based on Conservation of Charge"
    ],
    examTraps: [
      "Mixing up series and parallel formulas for Capacitors vs Resistors (Capacitors in parallel add directly: C_p = C₁ + C₂)",
      "Sign convention in lens formula: Diverging (concave) lens has negative focal length f < 0",
      "In Doppler effect, check if observer and source are moving TOWARD (frequency increases) or AWAY (decreases)"
    ],
    keyFormulasToMemorize: [
      "V = IR, P = IV = I²R = V²/R",
      "1/R_parallel = 1/R₁ + 1/R₂ => R = (R₁R₂)/(R₁+R₂)",
      "1/f = 1/d_o + 1/d_i",
      "E = hf = hc/λ = Φ + K_max",
      "Time Together = (A × B) / (A + B)"
    ]
  },
  {
    day: 5,
    title: "Day 5: Full Mock Simulation & High-Yield Weakness Drill",
    focusSubjects: ["All Subjects (Math, Physics, Chemistry, Aptitude)"],
    tagline: "Simulate real AASTU exam conditions with a 60-question timed mock, pinpoint weak spots, and review key formulas.",
    estimatedHours: 8,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "Full-Length AASTU Mock Exam Simulation (Timed 75 min)",
        topics: [
          "60 Questions comprehensive balanced test: 20 Math, 15 Physics, 15 Chemistry, 10 Aptitude & English",
          "Simulated exam timer, no interruptions, immediate diagnostic scorecard"
        ],
        objectives: [
          "Practice strict exam pacing: 1.15 minutes per question",
          "Learn to skip and mark questions taking > 1.5 minutes on first pass"
        ],
        recommendedPracticeCount: 60
      },
      {
        period: "Afternoon (3.5h)",
        subject: "Post-Mock Diagnostic & Weakness Targeted Drills",
        topics: [
          "Deep review of all incorrect and flagged questions",
          "Identify subject-wise accuracy gaps",
          "Targeted re-practice of top 3 weakest topic areas using the Question Bank"
        ],
        objectives: [
          "Understand 100% of the mistakes made on the morning mock test",
          "Re-attempt failed questions until scored 100%"
        ],
        recommendedPracticeCount: 30
      },
      {
        period: "Evening (2.5h)",
        subject: "Formula Speed Drills & Exam-Day Strategy",
        topics: [
          "Rapid flashcard deck review across all 4 subjects",
          "Review the Master Cheat Sheet",
          "Exam day checklist: Time management, option elimination strategy, resting schedule for the remaining 3 days"
        ],
        objectives: [
          "100% recall on all critical formulas in under 5 seconds each",
          "Plan pacing: First pass (easy 50%), Second pass (medium 35%), Final pass (hard 15%)"
        ],
        recommendedPracticeCount: 20
      }
    ],
    highYieldTopics: [
      "Exam Pacing: Never spend more than 90 seconds on a single question on the first pass",
      "Elimination technique: Usually 2 options can be quickly eliminated by units, sign, or extreme magnitude",
      "Review the master formula sheet one more time before sleep"
    ],
    examTraps: [
      "Panicking over the first 3 hard questions; skip ahead immediately to gather guaranteed easy points",
      "Changing correct intuitive answers at the last minute without solid mathematical proof"
    ],
    keyFormulasToMemorize: [
      "Review All Math, Physics, and Chemistry formulas from Days 1-4"
    ]
  }
];
