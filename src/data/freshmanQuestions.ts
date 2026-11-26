import type { Question, Subject } from '../types.ts';

const SUBJECT_EXACT_NAME_MAP: Partial<Record<Subject, string>> = {
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

const RAW_FRESHMAN_QUESTIONS: Question[] = [
  // ==========================================
  // MATHEMATICS FOR NATURAL SCIENCES (MATH 1011 & 1012)
  // ==========================================
  {
    id: 'math-q1',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    topic: 'Propositional Logic & Equivalence',
    question: 'Given the compound proposition $(p \\land \\neg q) \\rightarrow r$, which of the following is logically equivalent to its contrapositive?',
    options: [
      '¬r → (¬p ∨ q)',
      'r → (p ∧ ¬q)',
      '(¬p ∨ q) → ¬r',
      '¬r → (p ∧ ¬q)'
    ],
    correctAnswer: 0,
    explanation: 'The contrapositive of A → B is ¬B → ¬A. Here, A is (p ∧ ¬q) and B is r. Thus, the contrapositive is ¬r → ¬(p ∧ ¬q). By De Morgan\'s law, ¬(p ∧ ¬q) ≡ ¬p ∨ ¬(¬q) ≡ ¬p ∨ q. Hence, the contrapositive is ¬r → (¬p ∨ q). An implication and its contrapositive are always logically equivalent.',
    shortcutTip: 'Remember: Contrapositive always flips the sides and negates both terms: ¬Consequent → ¬Antecedent!',
    yearReference: 'Freshman Midterm Exam',
    difficulty: 'medium'
  },
  {
    id: 'math-q2',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    topic: 'Predicate Logic & Quantifiers',
    question: 'What is the correct negation of the statement: "For every student $x$, if $x$ attends all lectures, then $x$ passes the exam"?',
    options: [
      'Every student x attends all lectures and x fails the exam.',
      'There exists at least one student x such that x attends all lectures and x fails the exam.',
      'There exists at least one student x such that x does not attend all lectures and x passes the exam.',
      'No student attends all lectures and passes the exam.'
    ],
    correctAnswer: 1,
    explanation: 'The symbolic form is ∀x (A(x) → P(x)). The negation is ¬[∀x (A(x) → P(x))] ≡ ∃x ¬(A(x) → P(x)). Since ¬(p → q) ≡ p ∧ ¬q, this becomes ∃x (A(x) ∧ ¬P(x)): "There exists a student x who attends all lectures and does NOT pass the exam."',
    shortcutTip: 'The negation of "For all... If P then Q" is always "There exists someone who has P but NOT Q"!',
    yearReference: 'MoSHE National Benchmark',
    difficulty: 'medium'
  },
  {
    id: 'math-q3',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    topic: 'Vectors & 3D Geometry',
    question: 'Find the value of $k$ such that the vectors $\\mathbf{u} = \\langle 2, -3, 4 \\rangle$ and $\\mathbf{v} = \\langle k, 4, 1 \\rangle$ are orthogonal in $\\mathbb{R}^3$.',
    options: [
      'k = 2',
      'k = 4',
      'k = -2',
      'k = 8'
    ],
    correctAnswer: 1,
    explanation: 'Two vectors are orthogonal if and only if their dot product equals zero: u · v = 0. Compute u · v = (2)(k) + (-3)(4) + (4)(1) = 2k - 12 + 4 = 2k - 8 = 0. Therefore, 2k = 8 ⇒ k = 4.',
    shortcutTip: 'Set dot product to 0: 2k - 12 + 4 = 0 ⇒ 2k = 8 ⇒ k = 4 immediately.',
    yearReference: 'University Common Midterm',
    difficulty: 'easy'
  },
  {
    id: 'math-q4',
    subject: 'mathematics',
    semester: 1,
    courseCode: 'Math 1011',
    topic: 'Matrices & Determinants',
    question: 'If $A$ is a $3 \\times 3$ matrix with $\\det(A) = -4$, what is the value of $\\det(2A^{-1})$?',
    options: [
      '-2',
      '2',
      '-1/2',
      '1/2'
    ],
    correctAnswer: 0,
    explanation: 'For an n × n matrix, det(k M) = kⁿ det(M). Here n = 3 and k = 2, so det(2A⁻¹) = 2³ det(A⁻¹) = 8 · (1 / det(A)) = 8 · (1 / -4) = -2.',
    shortcutTip: 'Remember: Scalar factor comes out raised to dimension n! For 3x3: 2³ = 8, then divide by det(A).',
    yearReference: 'Freshman Math 1011 Final',
    difficulty: 'hard'
  },
  {
    id: 'math-q5',
    subject: 'mathematics',
    semester: 2,
    courseCode: 'Math 1012',
    topic: 'Calculus Limits & L\'Hôpital\'s Rule',
    question: 'Evaluate the limit: $\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x}{x^2}$.',
    options: [
      '1',
      '2',
      '4',
      '0'
    ],
    correctAnswer: 1,
    explanation: 'Direct substitution at x = 0 gives (1 - 1 - 0) / 0 = 0/0. Applying L\'Hôpital\'s rule: differentiate numerator and denominator: lim_{x→0} (2e^{2x} - 2) / (2x) = lim_{x→0} (e^{2x} - 1) / x. This is still 0/0. Applying L\'Hôpital again: lim_{x→0} (2e^{2x}) / 1 = 2(e^0) = 2.',
    shortcutTip: 'Taylor series shortcut: e^{2x} ≈ 1 + 2x + (2x)²/2! = 1 + 2x + 2x². Subtracting 1 + 2x leaves 2x². Dividing by x² yields 2!',
    yearReference: 'Calculus Final Exam',
    difficulty: 'medium'
  },

  // ==========================================
  // GENERAL PHYSICS I & II (PHYS 1011 & 1012)
  // ==========================================
  {
    id: 'phys-q1',
    subject: 'physics',
    semester: 1,
    courseCode: 'Phys 1011',
    topic: '2D Kinematics & Projectiles',
    question: 'A projectile is launched from ground level with speed $u$ at an angle $\\theta$ above the horizontal. At what point during its trajectory is the speed of the projectile at its minimum?',
    options: [
      'At the launch point',
      'At the maximum height of the trajectory',
      'Just before it strikes the ground',
      'The speed remains constant throughout flight'
    ],
    correctAnswer: 1,
    explanation: 'The horizontal velocity component v_x = u cos θ remains constant throughout motion (neglecting air resistance). The vertical velocity component is v_y(t) = u sin θ - gt. At the peak (maximum height), v_y = 0, so the total speed v = √(v_x² + v_y²) = √(v_x² + 0) = u cos θ, which is the minimum speed during flight.',
    shortcutTip: 'Speed is √(v_x² + v_y²). Since v_x is constant, speed is minimal when v_y = 0 (at top peak).',
    yearReference: 'Physics 1011 Midterm',
    difficulty: 'easy'
  },
  {
    id: 'phys-q2',
    subject: 'physics',
    semester: 1,
    courseCode: 'Phys 1011',
    topic: 'Newton\'s Laws & Incline Dynamics',
    question: 'A crate of mass $m$ rests on a rough ramp inclined at an angle $\\theta$ to the horizontal. If the coefficient of static friction is $\\mu_s$, what is the condition for the crate to remain at rest without sliding?',
    options: [
      'tan θ ≤ μ_s',
      'sin θ ≤ μ_s',
      'cos θ ≤ μ_s',
      'tan θ ≥ μ_s'
    ],
    correctAnswer: 0,
    explanation: 'The component of gravity pulling down the incline is F_g,parallel = mg sin θ. The maximum static friction opposing motion is f_s,max = μ_s N = μ_s mg cos θ. For equilibrium, F_g,parallel ≤ f_s,max ⇒ mg sin θ ≤ μ_s mg cos θ. Dividing both sides by mg cos θ gives tan θ ≤ μ_s.',
    shortcutTip: 'The critical angle of repose is always tan θ_crit = μ_s.',
    yearReference: 'General Physics I Midterm',
    difficulty: 'medium'
  },
  {
    id: 'phys-q3',
    subject: 'physics',
    semester: 2,
    courseCode: 'Phys 1012',
    topic: 'Electrostatics & Gauss\'s Law',
    question: 'A solid spherical conducting shell carries a total positive charge $Q$. What is the electric field at a distance $r$ from the center, where $r$ is less than the inner radius $R$ of the conductor?',
    options: [
      'E = Q / (4πε₀ r²)',
      'E = Q / (4πε₀ R²)',
      'E = 0',
      'E = Q r / (4πε₀ R³)'
    ],
    correctAnswer: 2,
    explanation: 'In electrostatic equilibrium, the electric field inside a conductor is strictly zero everywhere (E = 0). If it were not zero, the free mobile charges inside would experience a force and accelerate, which contradicts the condition of electrostatic equilibrium. All excess charge resides on the outer boundary surface.',
    shortcutTip: 'Inside any conductor in electrostatic equilibrium, E is ALWAYS 0!',
    yearReference: 'Physics 1012 Final Exam',
    difficulty: 'easy'
  },
  {
    id: 'phys-q4',
    subject: 'physics',
    semester: 2,
    courseCode: 'Phys 1012',
    topic: 'Electromagnetic Induction & Faraday\'s Law',
    question: 'A wire loop lies flat on a table in a magnetic field directed vertically upward into the ceiling. If the magnitude of the magnetic field begins to decrease over time, what is the direction of the induced current in the loop when viewed from above?',
    options: [
      'Clockwise',
      'Counter-clockwise',
      'No current is induced because the loop is stationary',
      'Alternating back and forth continuously'
    ],
    correctAnswer: 1,
    explanation: 'By Lenz\'s Law, the induced current creates an induced magnetic field that opposes the change in magnetic flux. Here, the upward magnetic field is decreasing. To oppose this decrease, the induced magnetic field must also point UPWARD. Using the right-hand grip rule (thumb pointing upward), the fingers curl COUNTER-CLOCKWISE.',
    shortcutTip: 'Upward flux decreasing ⇒ Induced field points UP to replace it ⇒ Counter-clockwise current.',
    yearReference: 'General Physics II Midterm',
    difficulty: 'hard'
  },

  // ==========================================
  // GENERAL CHEMISTRY I & II (CHEM 1011 & 1012)
  // ==========================================
  {
    id: 'chem-q1',
    subject: 'chemistry',
    semester: 1,
    courseCode: 'Chem 1011',
    topic: 'VSEPR & Molecular Geometry',
    question: 'What is the molecular geometry and hybridization of the central atom in chlorine trifluoride ($\\text{ClF}_3$)?',
    options: [
      'Trigonal planar, sp²',
      'Trigonal pyramidal, sp³',
      'T-shaped, sp³d',
      'Tetrahedral, sp³'
    ],
    correctAnswer: 2,
    explanation: 'Chlorine has 7 valence electrons. It forms 3 single bonds with fluorine atoms and retains 2 lone pairs. The steric number SN = 3 bonded atoms + 2 lone pairs = 5. Electron-pair geometry is trigonal bipyramidal, corresponding to sp³d hybridization. The 2 lone pairs occupy the equatorial positions to minimize 90° repulsions, leaving the 3 bonded fluorine atoms in a T-SHAPED molecular geometry.',
    shortcutTip: 'Steric number 5 with 2 lone pairs is always T-shaped (e.g., ClF₃, BrF₃).',
    yearReference: 'General Chemistry Midterm',
    difficulty: 'medium'
  },
  {
    id: 'chem-q2',
    subject: 'chemistry',
    semester: 1,
    courseCode: 'Chem 1011',
    topic: 'Thermodynamics & Spontaneity',
    question: 'Under which thermodynamic conditions is a chemical reaction spontaneous at ALL temperatures?',
    options: [
      'ΔH > 0 and ΔS > 0',
      'ΔH < 0 and ΔS > 0',
      'ΔH < 0 and ΔS < 0',
      'ΔH > 0 and ΔS < 0'
    ],
    correctAnswer: 1,
    explanation: 'The Gibbs free energy change is ΔG = ΔH - TΔS. A reaction is spontaneous when ΔG < 0. If ΔH is negative (exothermic) and ΔS is positive (entropy increases), then -TΔS is always negative for all absolute temperatures T > 0. Therefore, ΔG is negative at every temperature.',
    shortcutTip: 'Negative ΔH (heat released) + Positive ΔS (more disorder) = Always spontaneous!',
    yearReference: 'Chemistry 1011 Final',
    difficulty: 'easy'
  },
  {
    id: 'chem-q3',
    subject: 'chemistry',
    semester: 2,
    courseCode: 'Chem 1012',
    topic: 'Organic Mechanisms: SN1 vs SN2',
    question: 'Which of the following alkyl halides undergoes nucleophilic substitution via the $S_N2$ mechanism at the fastest rate?',
    options: [
      'CH₃Br (Bromomethane)',
      '(CH₃)₂CHBr (2-Bromopropane)',
      '(CH₃)₃CBr (2-Bromo-2-methylpropane)',
      'CH₃CH₂Br (Bromoethane)'
    ],
    correctAnswer: 0,
    explanation: 'The SN2 mechanism proceeds via a concerted one-step backside attack. It is extremely sensitive to steric hindrance around the electrophilic carbon. The rate order for SN2 is Methyl > Primary (1°) > Secondary (2°) ≫ Tertiary (3° does not occur). CH₃Br is a methyl halide with zero steric bulk, allowing the fastest nucleophile attack.',
    shortcutTip: 'SN2 rates favor least hindered carbons: Methyl > 1° > 2° > 3°.',
    yearReference: 'Organic Chemistry Midterm',
    difficulty: 'medium'
  },

  // ==========================================
  // GENERAL BIOLOGY (BIOL 1011 & 1012)
  // ==========================================
  {
    id: 'biol-q1',
    subject: 'biology',
    semester: 1,
    courseCode: 'Biol 1011',
    topic: 'Cellular Respiration Bioenergetics',
    question: 'During aerobic cellular respiration, what is the direct role of molecular oxygen ($O_2$)?',
    options: [
      'To oxidize glucose in the cytoplasm',
      'To act as the final electron acceptor at Complex IV of the mitochondrial electron transport chain',
      'To combine with pyruvate in the Krebs cycle to produce carbon dioxide',
      'To directly phosphorylate ADP into ATP in glycolysis'
    ],
    correctAnswer: 1,
    explanation: 'In the mitochondrial electron transport chain, electrons from NADH and FADH₂ pass through Complexes I-IV. Molecular oxygen (O₂) serves as the terminal electron acceptor, where it combines with 4 electrons and 4 protons (H⁺) to form 2 molecules of water (H₂O). Without oxygen, the chain halts and oxidative phosphorylation stops.',
    shortcutTip: 'Oxygen = Final electron acceptor at end of ETC, producing H₂O.',
    yearReference: 'General Biology Midterm',
    difficulty: 'easy'
  },
  {
    id: 'biol-q2',
    subject: 'biology',
    semester: 2,
    courseCode: 'Biol 1012',
    topic: 'Population Genetics & Hardy-Weinberg',
    question: 'In an Ethiopian sheep population conforming to Hardy-Weinberg equilibrium, the frequency of homozygous black sheep (recessive trait, $bb$) is 0.04. What percentage of the population is expected to be heterozygous carriers ($Bb$)?',
    options: [
      '16%',
      '32%',
      '64%',
      '4%'
    ],
    correctAnswer: 1,
    explanation: 'The frequency of the recessive phenotype (bb) is q² = 0.04. Taking the square root gives q = √0.04 = 0.2. Since p + q = 1, p = 1 - 0.2 = 0.8. The heterozygous frequency is 2pq = 2(0.8)(0.2) = 0.32, which is 32%.',
    shortcutTip: 'q² = 0.04 ⇒ q = 0.2 ⇒ p = 0.8 ⇒ 2pq = 2 × 0.8 × 0.2 = 0.32 (32%).',
    yearReference: 'Biology 1012 Final',
    difficulty: 'medium'
  },

  // ==========================================
  // COMMUNICATIVE ENGLISH SKILLS (ENLA 1011 & 1012)
  // ==========================================
  {
    id: 'eng-q1',
    subject: 'english',
    semester: 1,
    courseCode: 'EnLa 1011',
    topic: 'Subject-Verb Concord',
    question: 'Choose the sentence that demonstrates correct subject-verb agreement:',
    options: [
      'The comprehensive analysis of the laboratory specimens were completed yesterday.',
      'Neither the project director nor the laboratory technicians was present during the inspection.',
      'The array of solar panels installed on the engineering building produces sufficient electricity.',
      'Each of the newly admitted freshman students have been assigned an academic advisor.'
    ],
    correctAnswer: 2,
    explanation: 'In option C, the head noun of the subject is "The array" (singular), so the verb "produces" (singular) correctly agrees. In A, "analysis" is singular but "were" is plural. In B, correlative "neither...nor" requires agreement with the closest noun ("technicians" - plural), so it should be "were". In D, "Each" is singular and requires "has been assigned".',
    shortcutTip: 'Ignore prepositional phrases ("of solar panels", "of the specimens") to find the true head subject!',
    yearReference: 'English 1011 Common Midterm',
    difficulty: 'medium'
  },
  {
    id: 'eng-q2',
    subject: 'english',
    semester: 2,
    courseCode: 'EnLa 1012',
    topic: 'APA 7th Edition Referencing',
    question: 'According to APA 7th edition formatting rules, how should an in-text parenthetical citation be styled for a study authored by four researchers (Tadesse, Bekele, Chala, and Haile) published in 2023?',
    options: [
      '(Tadesse, Bekele, Chala, & Haile, 2023)',
      '(Tadesse et. al., 2023)',
      '(Tadesse et al., 2023)',
      '(Tadesse and others, 2023)'
    ],
    correctAnswer: 2,
    explanation: 'In APA 7th edition, any work with three or more authors is cited using the first author\'s surname followed by "et al." from the very first in-text citation: (Tadesse et al., 2023). Notice that "et" has no period, while "al." is an abbreviation of "alia" and ends with a period.',
    shortcutTip: '3+ authors = FirstAuthor et al., Year from the very first citation!',
    yearReference: 'Academic Writing Midterm',
    difficulty: 'medium'
  },

  // ==========================================
  // CRITICAL THINKING & LOGIC (LOCT 1011)
  // ==========================================
  {
    id: 'loct-q1',
    subject: 'critical_thinking',
    semester: 1,
    courseCode: 'LoCT 1011',
    topic: 'Informal Fallacies',
    question: '"Professor Yohannes has argued in favor of revising the freshman curriculum. But why should we listen to him? He went through a messy divorce last semester and drives an old beat-up car." Which fallacy is committed?',
    options: [
      'Straw Man',
      'Argumentum Ad Hominem (Abusive)',
      'Appeal to Pity (Ad Misericordiam)',
      'Red Herring'
    ],
    correctAnswer: 1,
    explanation: 'The speaker attacks Professor Yohannes\'s personal domestic life and vehicle ownership rather than addressing the substantive merits of his curriculum proposal. This is an Ad Hominem Abusive fallacy (attacking the person instead of the argument).',
    shortcutTip: 'Attacking personal traits/marital status instead of the logic = Ad Hominem.',
    yearReference: 'Logic & Critical Thinking Midterm',
    difficulty: 'easy'
  },
  {
    id: 'loct-q2',
    subject: 'critical_thinking',
    semester: 1,
    courseCode: 'LoCT 1011',
    topic: 'Deductive Validity vs Truth',
    question: 'Consider the argument: "All reptiles have feathers. A cobra is a reptile. Therefore, a cobra has feathers." What is the logical status of this argument?',
    options: [
      'Invalid and Unsound',
      'Valid and Sound',
      'Valid but Unsound',
      'Strong and Cogent'
    ],
    correctAnswer: 2,
    explanation: 'The argument has the valid syllogistic form: All M are P; S is M; therefore S is P. If the premises were true, the conclusion would necessarily follow. Therefore, it is VALID. However, the first premise ("All reptiles have feathers") is factually false in reality. A valid deductive argument with at least one false premise is UNSOUND.',
    shortcutTip: 'Valid form + False real-world premise = Valid but Unsound!',
    yearReference: 'LoCT 1011 Benchmark Exam',
    difficulty: 'medium'
  },

  // ==========================================
  // CIVICS & ETHICS (CEST 1011)
  // ==========================================
  {
    id: 'civ-q1',
    subject: 'civics',
    semester: 1,
    courseCode: 'CESt 1011',
    topic: 'Normative Moral Theories',
    question: 'According to Immanuel Kant\'s Deontological ethics, why is telling a lie morally impermissible even if it saves someone\'s life?',
    options: [
      'Because lying decreases overall societal happiness',
      'Because a maxim of lying cannot be universalized without contradiction and violates treating persons as ends in themselves',
      'Because the state constitution penalizes perjury',
      'Because lying demonstrates a lack of Aristotelian courage'
    ],
    correctAnswer: 1,
    explanation: 'Kant\'s Categorical Imperative states that one must act only on maxims that can be universalized into universal moral laws. If everyone lied whenever convenient, the concept of a promise or truth would self-destruct (contradiction in conception). Moreover, lying deceives and manipulates persons, treating them as mere means rather than ends in themselves.',
    shortcutTip: 'Kant = Universal moral duty (Categorical Imperative) independent of outcomes!',
    yearReference: 'CESt 1011 Common Midterm',
    difficulty: 'medium'
  },

  // ==========================================
  // PHYSICAL FITNESS & HEALTH (SPSC 1011)
  // ==========================================
  {
    id: 'spsc-q1',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: 'Components of Physical Fitness',
    question: 'Which of the following is classified as a Health-Related component of physical fitness rather than a Skill-Related component?',
    options: [
      'Agility',
      'Cardiorespiratory Endurance',
      'Balance',
      'Reaction Time'
    ],
    correctAnswer: 1,
    explanation: 'Health-related components directly influence long-term health and disease prevention: Cardiorespiratory Endurance, Muscular Strength, Muscular Endurance, Flexibility, and Body Composition. Agility, balance, coordination, power, reaction time, and speed are Skill-Related (performance-related) components.',
    shortcutTip: 'Health-related = Heart, muscles, fat, flexibility. Skill-related = Agility, speed, balance, reaction.',
    yearReference: 'Physical Fitness 1011 Exam',
    difficulty: 'easy'
  },
  {
    id: 'spsc-q2',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '1.1 Definitions of Physical Fitness Terms',
    question: 'Which statement accurately distinguishes Physical Exercise from general Physical Activity?',
    options: [
      'Physical Activity is always competitive and governed by formal sport rules',
      'Physical Exercise is planned, structured, and repetitive movement intended to improve or maintain fitness',
      'Physical Activity requires gym equipment while Physical Exercise does not',
      'Physical Exercise expends less energy than basal resting metabolism'
    ],
    correctAnswer: 1,
    explanation: 'Physical Activity refers to any bodily movement produced by skeletal muscles requiring energy expenditure (e.g., walking, gardening). Physical Exercise is a planned, structured, and repetitive subset specifically done to improve or maintain physical fitness.',
    shortcutTip: 'Exercise = Planned + Structured + Repetitive.',
    yearReference: 'SpSc 1011 Unit 1 Exam',
    difficulty: 'easy'
  },
  {
    id: 'spsc-q3',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '1.2 General Principles of Fitness Training',
    question: 'Which fitness training principle is summed up by the phrase "Use it or lose it," explaining why fitness gains decline when training stops?',
    options: [
      'Principle of Overload',
      'Principle of Individual Difference',
      'Principle of Reversibility',
      'Principle of Periodization'
    ],
    correctAnswer: 2,
    explanation: 'The Principle of Reversibility states that training adaptations are transient and fitness gains are lost when regular training stops or drops sharply. Overload requires stressing above normal levels, Periodization cycles training phases, and Individual Difference tailors programs to personal genetics and needs.',
    shortcutTip: 'Stopped training → Gains reverse → Principle of Reversibility.',
    yearReference: 'SpSc 1011 Unit 1 Exam',
    difficulty: 'easy'
  },
  {
    id: 'spsc-q4',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '2.1 Hypokinetic Diseases & 2.2 Cardiovascular Health',
    question: 'Which cholesterol change and disease prevention effect are produced by regular aerobic physical activity?',
    options: [
      'Raises LDL ("bad") cholesterol and lowers HDL ("good") cholesterol',
      'Causes osteoporosis by placing excessive load on weight-bearing bones',
      'Raises HDL ("good") cholesterol, lowers LDL ("bad") cholesterol, and prevents hypokinetic diseases like Type 2 diabetes and coronary heart disease',
      'Eliminates the need for any carbohydrate consumption during endurance exercise'
    ],
    correctAnswer: 2,
    explanation: 'Regular physical activity prevents hypokinetic diseases (obesity, type 2 diabetes, osteoporosis) and improves cardiovascular lipid profiles in hypercholesterolemia and dyslipidemia by elevating protective HDL ("good") cholesterol and lowering atherogenic LDL ("bad") cholesterol.',
    shortcutTip: 'Exercise = High HDL (Good) + Low LDL (Bad).',
    yearReference: 'SpSc 1011 Unit 2 Exam',
    difficulty: 'medium'
  },
  {
    id: 'spsc-q5',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '3.2 Nutrition and Physical Performance',
    question: 'What is the ideal post-exercise nutrition strategy for promoting muscle repair and glycogen replenishment?',
    options: [
      'Consume a high-fat, low-carbohydrate meal 4 hours after finishing exercise',
      'Consume protein and carbohydrates within 30–60 minutes after exercise',
      'Avoid all fluids for 2 hours post-workout to prevent stomach cramping',
      'Consume only pure fat immediately after resistance training'
    ],
    correctAnswer: 1,
    explanation: 'Within 30–60 minutes post-exercise, muscles show peak blood flow and nutrient uptake. Consuming both protein and carbohydrates in this window promotes muscle tissue repair and rapid glycogen replenishment. Before exercise (2–3 hrs prior), focus on carbs, moderate protein, low fat, and hydration.',
    shortcutTip: 'Before (2–3 h) = Carbs + Low Fat; After (30–60 min) = Protein + Carbs.',
    yearReference: 'SpSc 1011 Unit 3 Exam',
    difficulty: 'easy'
  },
  {
    id: 'spsc-q6',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '4.4 Cardiorespiratory Exercise Prescription',
    question: 'According to standard Unit 4 exercise prescription guidelines for a healthy adult, what are the target frequency, intensity, and duration to develop cardiorespiratory fitness?',
    options: [
      '1 day/week at 95–100% MHR for 5 minutes',
      '3–5 days/week at 60–85% MHR for 20–60 minutes',
      '7 days/week at 30–40% MHR for 10 minutes',
      '2 days/week at >90% 1RM for 15–30 seconds'
    ],
    correctAnswer: 1,
    explanation: 'Cardiorespiratory fitness development follows the prescription of 3–5 days per week at 60–85% Maximum Heart Rate (MHR) for 20–60 minutes per session using continuous, interval, or cross-training methods.',
    shortcutTip: 'Cardio numbers: 3–5 days/wk, 60–85% MHR, 20–60 min.',
    yearReference: 'SpSc 1011 Unit 4 Exam',
    difficulty: 'medium'
  },
  {
    id: 'spsc-q7',
    subject: 'fitness',
    semester: 1,
    courseCode: 'SpSc 1011',
    topic: '4.5 Muscle Fitness & 4.6 Flexibility Prescription',
    question: 'Which stretching prescription is recommended during the cool-down phase to develop flexibility safely without injury?',
    options: [
      'Ballistic bouncing stretches held for 2 seconds each once a month',
      'Static stretching held for 15–30 seconds to mild tension, performed 2–3 days/week',
      'Heavy plyometric box jumps immediately after lifting 95% 1RM',
      'Holding stretches past sharp pain for 5 minutes daily'
    ],
    correctAnswer: 1,
    explanation: 'Flexibility is safely developed using static, dynamic, or PNF stretching 2–3+ days/week, holding static stretches for 15–30 seconds to the point of mild tension (never sharp pain) during the cool-down.',
    shortcutTip: 'Flexibility = 2–3 days/wk, 15–30 seconds static hold at mild tension.',
    yearReference: 'SpSc 1011 Unit 4 Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // APPLIED MATHEMATICS II / CALCULUS (MATH 1012)
  // ==========================================
  {
    id: 'math2-q1',
    subject: 'math_applied_2',
    semester: 2,
    courseCode: 'Math 1012',
    topic: 'L\'Hôpital\'s Rule & Indeterminate Forms',
    question: 'Evaluate the limit: $\\lim_{x \\to 0} \\frac{e^{3x} - 1 - 3x}{x^2}$.',
    options: [
      '0',
      '3/2',
      '9/2',
      'Undefined'
    ],
    correctAnswer: 2,
    explanation: 'Direct substitution yields 0/0. Applying L\'Hôpital\'s Rule once gives lim (3e^{3x} - 3)/(2x), which is still 0/0. Applying L\'Hôpital\'s Rule a second time gives lim (9e^{3x})/2. Evaluating at x = 0 gives 9(1)/2 = 9/2.',
    shortcutTip: 'Using Maclaurin expansion of e^{3x} = 1 + 3x + (9x^2)/2 + ...: subtracting (1 + 3x) leaves 9x^2 / 2, dividing by x^2 immediately gives 9/2!',
    yearReference: 'Math 1012 Final Exam',
    difficulty: 'medium'
  },
  {
    id: 'math2-q2',
    subject: 'math_applied_2',
    semester: 2,
    courseCode: 'Math 1012',
    topic: 'Integration by Parts',
    question: 'Evaluate the definite integral $\\int_{1}^{e} x \\ln x \\, dx$.',
    options: [
      '(e^2 + 1) / 4',
      '(e^2 - 1) / 4',
      'e^2 / 2',
      '(3e^2 + 1) / 4'
    ],
    correctAnswer: 0,
    explanation: 'Use integration by parts: let u = ln x and dv = x dx. Then du = (1/x) dx and v = x^2 / 2. Then ∫ x ln x dx = (x^2 / 2) ln x - ∫ (x^2 / 2)(1/x) dx = (x^2 / 2) ln x - x^2 / 4. Evaluating from 1 to e: [(e^2 / 2)(1) - e^2 / 4] - [(0) - 1/4] = e^2 / 4 + 1/4 = (e^2 + 1) / 4.',
    shortcutTip: 'LIATE rule: Logarithm first (u = ln x), Algebraic second (dv = x dx).',
    yearReference: 'Calculus II National Exam',
    difficulty: 'hard'
  },

  // ==========================================
  // GENERAL PHYSICS II (PHYS 1012)
  // ==========================================
  {
    id: 'phys2-q1',
    subject: 'physics_2',
    semester: 2,
    courseCode: 'Phys 1012',
    topic: 'Gauss\'s Law & Electric Fields',
    question: 'A solid spherical conductor of radius $R$ carries a total net positive charge $+Q$. What is the magnitude of the electrostatic field $\\mathbf{E}$ at a distance $r < R$ inside the conducting sphere?',
    options: [
      'E = kQ / r^2',
      'E = kQr / R^3',
      'E = 0',
      'E = kQ / R^2'
    ],
    correctAnswer: 2,
    explanation: 'In electrostatic equilibrium, all excess charge on a conductor resides entirely on its outer surface. Since there is zero net enclosed charge within any Gaussian surface of radius r < R inside the conductor, by Gauss\'s Law $\\oint E \\cdot dA = Q_{\\text{enc}}/\\varepsilon_0 = 0$, the electric field inside is strictly zero everywhere.',
    shortcutTip: 'Inside a static conductor, electric field is ALWAYS 0!',
    yearReference: 'Phys 1012 Midterm',
    difficulty: 'easy'
  },
  {
    id: 'phys2-q2',
    subject: 'physics_2',
    semester: 2,
    courseCode: 'Phys 1012',
    topic: 'Faraday\'s Law of Electromagnetic Induction',
    question: 'A coil of 100 turns and cross-sectional area $0.05\\text{ m}^2$ is oriented perpendicular to a uniform magnetic field. If the magnetic field decreases uniformly from $1.2\\text{ T}$ to $0.4\\text{ T}$ in $0.2\\text{ s}$, what is the induced EMF across the coil?',
    options: [
      '10 V',
      '20 V',
      '40 V',
      '200 V'
    ],
    correctAnswer: 1,
    explanation: 'By Faraday\'s law: |EMF| = N |ΔΦ/Δt| = N · A · |ΔB/Δt|. Here, N = 100, A = 0.05 m^2, ΔB = 1.2 - 0.4 = 0.8 T, Δt = 0.2 s. Therefore: |EMF| = 100 · 0.05 · (0.8 / 0.2) = 5 · 4 = 20 V.',
    shortcutTip: 'EMF = N × Area × (ΔB / Δt) = 100 × 0.05 × 4 = 20 V directly.',
    yearReference: 'Physics II Common Final',
    difficulty: 'medium'
  },

  // ==========================================
  // GENERAL CHEMISTRY II / ORGANIC (CHEM 1012)
  // ==========================================
  {
    id: 'chem2-q1',
    subject: 'chemistry_2',
    semester: 2,
    courseCode: 'Chem 1012',
    topic: 'Nucleophilic Substitution Mechanisms (SN1 vs SN2)',
    question: 'Which of the following conditions most strongly favors an $S_N2$ substitution mechanism over an $S_N1$ mechanism?',
    options: [
      'Tertiary alkyl halide substrate in a polar protic solvent',
      'Primary alkyl halide substrate with a strong nucleophile in a polar aprotic solvent',
      'Bulky hindered base at high temperatures',
      'Weak neutral nucleophile in water'
    ],
    correctAnswer: 1,
    explanation: 'S_N2 reactions proceed via a concerted backside attack in a single step with stereochemical inversion (Walden inversion). S_N2 is fastest for methyl and primary substrates (low steric hindrance), requires strong nucleophiles, and is accelerated by polar aprotic solvents (such as acetone, DMSO) that do not solvate/shield the nucleophile anion.',
    shortcutTip: 'SN2 = 1° substrate + Strong nucleophile + Polar aprotic solvent.',
    yearReference: 'Chemistry 1012 Final',
    difficulty: 'medium'
  },

  // ==========================================
  // GENERAL BIOLOGY II (BIOL 1012)
  // ==========================================
  {
    id: 'biol2-q1',
    subject: 'biology_2',
    semester: 2,
    courseCode: 'Biol 1012',
    topic: 'Hardy-Weinberg Equilibrium & Population Genetics',
    question: 'In a randomly mating population of 500 Ethiopian mountain nyalas in Hardy-Weinberg equilibrium, 20 individuals display an autosomal recessive albino phenotype ($q^2$). What is the frequency of heterozygous carriers ($2pq$) in this population?',
    options: [
      '0.04',
      '0.20',
      '0.32',
      '0.64'
    ],
    correctAnswer: 2,
    explanation: 'Homozygous recessive frequency q^2 = 20 / 500 = 0.04. Therefore, the recessive allele frequency q = √0.04 = 0.2. The dominant allele frequency p = 1 - q = 1 - 0.2 = 0.8. The heterozygous frequency 2pq = 2(0.8)(0.2) = 0.32 (32%).',
    shortcutTip: 'Find q first: q = √0.04 = 0.2, then p = 0.8, then 2pq = 2(0.8)(0.2) = 0.32.',
    yearReference: 'Biol 1012 Common Exam',
    difficulty: 'medium'
  },

  // ==========================================
  // COMMUNICATIVE ENGLISH SKILLS II (ENLA 1012)
  // ==========================================
  {
    id: 'enla2-q1',
    subject: 'english_2',
    semester: 2,
    courseCode: 'EnLa 1012',
    topic: 'APA 7th Edition Citation Standards',
    question: 'According to APA 7th edition referencing guidelines, how should a scholarly source authored by three or more individuals (e.g. Kebede, Chala, and Girma, published in 2023) be cited in-text the FIRST time it appears in an academic proposal?',
    options: [
      '(Kebede, Chala, & Girma, 2023)',
      '(Kebede et al., 2023)',
      '(Kebede et. al., 2023)',
      '(Kebede and others, 2023)'
    ],
    correctAnswer: 1,
    explanation: 'In APA 7th edition, any work with three or more authors is shortened to the first author followed by "et al." from the VERY FIRST in-text citation: (Kebede et al., 2023). Note that "et" is not an abbreviation and takes no period, while "al." takes a period.',
    shortcutTip: 'APA 7th: 3+ authors = (FirstAuthor et al., Year) from the first citation!',
    yearReference: 'EnLa 1012 Academic Writing',
    difficulty: 'easy'
  },

  // ==========================================
  // GENERAL PSYCHOLOGY (PSYC 1011)
  // ==========================================
  {
    id: 'psy-q1',
    subject: 'psychology',
    semester: 2,
    courseCode: 'Psyc 1011',
    topic: 'Operant Conditioning Paradigms',
    question: 'An automobile chime sounds repeatedly when the driver turns on the engine without fastening the seatbelt. Once the driver buckles the seatbelt, the irritating buzzing stops. This is an example of:',
    options: [
      'Positive Reinforcement',
      'Negative Reinforcement',
      'Positive Punishment',
      'Negative Punishment'
    ],
    correctAnswer: 1,
    explanation: 'The goal is to increase the desired behavior (fastening the seatbelt). An unpleasant, aversive stimulus (the annoying buzzer) is REMOVED when the behavior occurs. Removing an aversive stimulus to increase a behavior is the exact definition of Negative Reinforcement.',
    shortcutTip: 'Removing something unpleasant to increase behavior = Negative Reinforcement!',
    yearReference: 'Psychology 1011 Midterm',
    difficulty: 'easy'
  },

  // ==========================================
  // GEOGRAPHY OF ETHIOPIA & THE HORN (GEES 1011)
  // ==========================================
  {
    id: 'geo-q1',
    subject: 'geography',
    semester: 2,
    courseCode: 'GeES 1011',
    topic: 'Drainage Systems & River Basins',
    question: 'Which of the following Ethiopian rivers flows into the Indian Ocean drainage system and is the longest river within Ethiopian borders, yet fails to reach the sea due to evaporation in arid sands?',
    options: [
      'Abay (Blue Nile)',
      'Awash River',
      'Wabi Shebelle',
      'Baro River'
    ],
    correctAnswer: 2,
    explanation: 'The Wabi Shebelle originates in the southeastern Ethiopian highlands and flows for approximately 1,340 km within Ethiopian territory, making it the longest river within national borders. It belongs to the Indian Ocean drainage system, but due to high evaporation in the arid sands of southern Somalia, it desiccates before reaching the coast.',
    shortcutTip: 'Longest within Ethiopia = Wabi Shebelle. Highest volume discharge = Abay.',
    yearReference: 'Geography of Ethiopia Midterm',
    difficulty: 'medium'
  },
  {
    id: 'geo-q2',
    subject: 'geography',
    semester: 2,
    courseCode: 'GeES 1011',
    topic: 'Traditional Agro-Ecological Zones',
    question: 'Which traditional Ethiopian agro-climatic zone is located at an altitude between 1,500 and 2,300 meters above sea level, features average temperatures of 15°C to 20°C, and is the most densely populated zone supporting teff, coffee, and maize?',
    options: [
      'Bereha (Hot arid)',
      'Kolla (Warm tropical)',
      'Woina Dega (Sub-tropical)',
      'Wurch (Afro-alpine)'
    ],
    correctAnswer: 2,
    explanation: 'Woina Dega (Sub-tropical / temperate) spans altitudes between 1,500 and 2,300 m with moderate temperatures (15-20°C) and reliable rainfall. It is historically the primary agricultural heartland and settlement zone of Ethiopia.',
    shortcutTip: '1,500 - 2,300m + Teff/Coffee heartland = Woina Dega!',
    yearReference: 'Geography 1011 Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // HISTORY OF ETHIOPIA AND THE HORN (7 UNITS)
  // ==========================================
  {
    id: 'hist-q1',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 1: Sources & Methods of Historical Study',
    question: 'In historical methodology, what is the fundamental distinction between External Criticism and Internal Criticism when evaluating a newly discovered historical manuscript?',
    options: [
      'External criticism establishes the physical authenticity and genuineness of the document, whereas internal criticism evaluates the credibility, accuracy, and potential bias of its content',
      'External criticism is applied only to secondary sources, whereas internal criticism is applied only to primary sources',
      'External criticism translates foreign languages, whereas internal criticism dates archaeological fossils',
      'External criticism relies on oral tradition, whereas internal criticism rejects all written chronicles'
    ],
    correctAnswer: 0,
    explanation: 'Historians subject sources to two levels of criticism: External Criticism verifies whether the source is authentic (genuine rather than forged) by checking its physical medium, script, language, and provenance; Internal Criticism then evaluates the reliability and truthfulness of the statements inside the text by checking authorial bias and corroborating with independent evidence.',
    shortcutTip: 'External = Outside/Physical Authenticity (Is it genuine?); Internal = Inside/Content Reliability (Is it truthful?).',
    yearReference: 'History Unit 1 Benchmark',
    difficulty: 'easy'
  },
  {
    id: 'hist-q2',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 1: Historiography of Ethiopia and the Horn',
    question: 'Which 6th-century AD Greek work written by Cosmas Indicopleustes provides a crucial historical account of the Aksumite Empire\'s "silent trade" in gold with Sasu and King Kaleb\'s expedition to South Arabia?',
    options: [
      'The Periplus of the Erythraean Sea',
      'Christian Topography',
      'Futuh al-Habesha',
      'Kibre Negest'
    ],
    correctAnswer: 1,
    explanation: 'Christian Topography (written c. 525 AD by the Greek monk and former merchant Cosmas Indicopleustes) describes Aksum\'s caravan gold trade with Sasu in southwestern Ethiopia and King Kaleb\'s military preparations. In contrast, the Periplus of the Erythraean Sea is a 1st-century AD anonymous merchant guide mentioning King Zoscales.',
    shortcutTip: '1st century AD (Zoscales & Adulis) = Periplus; 6th century AD (Cosmas, King Kaleb & Sasu gold) = Christian Topography.',
    yearReference: 'History Unit 1 Midterm',
    difficulty: 'medium'
  },
  {
    id: 'hist-q3',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 2: Human Evolution & Stone Age Tools',
    question: 'Which Paleolithic stone tool technology is characterized by symmetrical, bifacial hand-axes and cleavers worked on both sides and is associated with Homo erectus at Ethiopian sites such as Konso Gardula and Melka Kunture?',
    options: [
      'Mode I (Oldowan) technology',
      'Mode II (Acheulean) technology',
      'Mode III (Sangoon / Levallois) technology',
      'Neolithic microlithic pottery technology'
    ],
    correctAnswer: 1,
    explanation: 'Mode I (Oldowan) consists of simple pebble choppers made by Homo habilis (e.g., at Gona and Omo); Mode II (Acheulean) features standardized bifacial hand-axes and cleavers produced by Homo erectus (e.g., at Konso Gardula and Melka Kunture); Mode III (Sangoon) features finer flake/blade tools hafted onto spears by Homo sapiens.',
    shortcutTip: 'Mode I = Oldowan (Homo habilis); Mode II = Acheulean bifacial hand-axes (Homo erectus); Mode III = Sangoon blades (Homo sapiens).',
    yearReference: 'History Unit 2 Midterm',
    difficulty: 'medium'
  },
  {
    id: 'hist-q4',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 2: Languages, Religions & Peopling of the Region',
    question: 'Why did Islam penetrate much more deeply into the eastern, central, and southern interior of Ethiopia through the Gulf of Aden port of Zeila than through the Dahlak Islands on the Red Sea?',
    options: [
      'The Dahlak route was blocked by rugged terrain and a well-established northern Christian Kingdom, whereas Zeila opened onto accessible caravan trade routes where Muslim merchants and clerics peacefully spread Islam',
      'The Dahlak Islands were uninhabited until the 19th century',
      'The port of Zeila was controlled by the Portuguese navy',
      'The Aksumite Empire prohibited all maritime trade at Adulis in the 1st century AD'
    ],
    correctAnswer: 0,
    explanation: 'In northern Ethiopia, the well-established Christian Kingdom and rugged highland escarpments restricted Islamic expansion beyond the coastal Dahlak Sultanate. Conversely, the Port of Zeila connected directly with the eastern and central Rift Valley trade routes, enabling Muslim merchants and Sufi clerics to peacefully spread Islam and establish the medieval Muslim Sultanates (Shewa, Ifat, Fatagar, Dawaro, Bali, and Adal).',
    shortcutTip: 'Zeila = Primary gateway for Islam & Muslim Sultanates in the Ethiopian interior; Dahlak = Restricted Red Sea island route.',
    yearReference: 'History Unit 2 Final',
    difficulty: 'easy'
  },
  {
    id: 'hist-q5',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 3: Ancient States & Muslim Sultanates',
    question: 'Which of the following was the oldest Muslim Sultanate in the Ethiopian interior, founded around 896 AD in northeastern Shewa before being annexed by Umar Walasma of Ifat in 1285?',
    options: [
      'The Sultanate of Adal',
      'The Sultanate of Shewa (Makhzumite Dynasty)',
      'The Sultanate of Dawaro',
      'The Emirate of Harar'
    ],
    correctAnswer: 1,
    explanation: 'The Sultanate of Shewa, ruled by the Makhzumite Dynasty from c. 896 AD (283 AH), was the oldest Muslim state in the Ethiopian interior. In 1285 AD, Umar Walasma, founder of the Walasma Dynasty of the Sultanate of Ifat, annexed the Makhzumite Sultanate of Shewa.',
    shortcutTip: 'Oldest Muslim Sultanate (896 AD) = Sultanate of Shewa (Makhzumite Dynasty); 1285 AD = Sultanate of Ifat (Walasma Dynasty).',
    yearReference: 'History Unit 3 Midterm',
    difficulty: 'medium'
  },
  {
    id: 'hist-q6',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 3: Economic Formations (Rist vs. Gult)',
    question: 'In the traditional land tenure system of northern and central highland Ethiopia, what was the fundamental difference between Rist and Gult?',
    options: [
      'Rist was a hereditary lineage right to claim and use land, whereas Gult was a state-granted right given to officials or churches to collect tribute from peasants',
      'Rist was private land owned exclusively by foreign merchants, whereas Gult was communal pastureland',
      'Rist applied only to urban houses in Gondar, whereas Gult applied only to pastoral lowlands',
      'Rist could be freely bought and sold on the open market, whereas Gult was inherited by all peasant children equally'
    ],
    correctAnswer: 0,
    explanation: 'Rist was the hereditary, communal birthright of peasants to use land based on descent from a founding ancestor (it could not be sold outside the lineage). Gult was not ownership of the soil, but an official administrative right granted by the monarch to nobles, military officers, or monasteries to collect tribute and labor service from Rist-holding peasants.',
    shortcutTip: 'Rist = Hereditary peasant land-use right; Gult = State-granted tribute-collection right.',
    yearReference: 'History Unit 3 Final',
    difficulty: 'easy'
  },
  {
    id: 'hist-q7',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 4: Late 13th to Early 16th Century Dynamics',
    question: 'What was the primary purpose of the "Royal Prison" of Amba Gishen (established c. 1300 under King Widim-Ra\'ad), and what was the underlying root cause of the wars between the Christian Kingdom and the Sultanates of Ifat and Adal?',
    options: [
      'Amba Gishen confined male royal princes to prevent succession civil wars; the Christian–Sultanate wars were primarily driven by economic rivalry to control the lucrative Zeila trade route',
      'Amba Gishen held foreign Portuguese prisoners; the wars were caused by disputes over the Blue Nile waters',
      'Amba Gishen served as the capital of the Zagwe dynasty; the wars were fought over gold mines in Damot',
      'Amba Gishen was a monastery founded by Abba Estifanos; the wars were fought over the port of Massawa'
    ],
    correctAnswer: 0,
    explanation: 'Established around 1300 by King Widim-Ra\'ad, the flat-topped mountain fortress of Amba Gishen confined all male descendants of Yikuno-Amlak to prevent bloody royal succession struggles. Meanwhile, although ideological religion was used to mobilize troops, the fundamental cause of the conflict between the Christian Kingdom and Ifat/Adal was economic competition over the Zeila long-distance caravan trade route.',
    shortcutTip: 'Amba Gishen = Solved royal succession wars; Christian vs. Ifat/Adal conflict = Economic rivalry over the Zeila trade route.',
    yearReference: 'History Unit 4 Midterm',
    difficulty: 'medium'
  },
  {
    id: 'hist-q8',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 4: Medieval Religious Movements',
    question: 'Which 14th-century Ethiopian monastic leader championed the strict observance of the Saturday (Old Testament) Sabbath alongside Sunday—a movement later reconciled by Emperor Zara-Yaqob at the Council of Debre Mitmaq (1450)?',
    options: [
      'Abba Ewostatewos',
      'Abba Estifanos of Gundagunde',
      'Pedro Paez',
      'Abba Salama (Frumentius)'
    ],
    correctAnswer: 0,
    explanation: 'Abba Ewostatewos led the 14th-century monastic movement demanding observance of the Saturday Sabbath in addition to Sunday. Emperor Zara-Yaqob resolved this schism at the Council of Debre Mitmaq (1450) by officially recognizing both Sabbaths. In contrast, Abba Estifanos (leader of the Deqiqe Estifanos) rejected bowing to the Emperor and was persecuted by Zara-Yaqob.',
    shortcutTip: 'Ewostatewos = Saturday Sabbath (reconciled in 1450); Deqiqe Estifanos = Refused to bow to the king (persecuted).',
    yearReference: 'History Unit 4 Final',
    difficulty: 'medium'
  },
  {
    id: 'hist-q9',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 5: 16th-Century Oromo Population Movement & Gadaa System',
    question: 'During the 16th-century Oromo population movement, what was the difference between the integration mechanisms of Gudifacha and Moggasa?',
    options: [
      'Gudifacha was the adoption of an individual into an Oromo family as a child, whereas Moggasa was the collective adoption and incorporation of non-Oromo clans or communities into an Oromo Gosa (clan) by the Abba Gadaa',
      'Gudifacha was a military tax collected from conquered states, whereas Moggasa was the 8-year Butta military campaign',
      'Gudifacha applied only to the Barentu confederacy, whereas Moggasa applied only to the Borana confederacy',
      'Gudifacha was the election of the Abba Dula, whereas Moggasa was the worship of Waaqa'
    ],
    correctAnswer: 0,
    explanation: 'Both Gudifacha and Moggasa were inclusive Oromo institutions that granted full equal rights to non-Oromo peoples: Gudifacha operated at the family/household level (parent-to-child adoption), while Moggasa operated at the clan/community level (incorporating entire non-Oromo groups into an Oromo clan through a sacred oath led by the Abba Gadaa).',
    shortcutTip: 'Gudifacha = Individual/Family adoption; Moggasa = Collective/Clan adoption.',
    yearReference: 'History Unit 5 Final',
    difficulty: 'easy'
  },
  {
    id: 'hist-q10',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 5: Foreign Intervention, Gondarine Period & Zemene-Mesafint',
    question: 'Which set of actions was undertaken by Emperor Fasiledas (r. 1632–1667) immediately following the abdication of his father Emperor Susenyos in 1632?',
    options: [
      'He restored the Ethiopian Orthodox faith, expelled the Jesuit missionaries, adopted a "Closed-Door Policy" toward Europeans, and founded Gondar as a permanent capital in 1636',
      'He invited Alfonso Mendez to crown him Catholic Patriarch and moved the capital to Debre Tabor',
      'He assassinated King Iyoas in 1769 and inaugurated the Zemene-Mesafint',
      'He signed the Treaty of Wuchale with Count Pietro Antonelli'
    ],
    correctAnswer: 0,
    explanation: 'After Susenyos\'s forced imposition of Roman Catholicism (1622) triggered a bloody peasant civil war, Susenyos abdicated in 1632. His son Emperor Fasiledas immediately restored the Orthodox Tewahedo Church, expelled the Jesuits, instituted a "Closed-Door Policy" against Europeans (signing pacts with Ottoman/Yemeni port rulers), and established Gondar as the permanent royal capital in 1636.',
    shortcutTip: 'Fasiledas (1632–1667) = Restored Orthodoxy + Expelled Jesuits + Closed-Door Policy + Founded Gondar (1636).',
    yearReference: 'History Unit 5 Final',
    difficulty: 'easy'
  },
  {
    id: 'hist-q11',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 6: Unification & Major Battles Against Foreign Aggressors',
    question: 'Which sequence correctly matches the four major battles fought by Kassa Hailu (Emperor Tewodros II) between 1852 and 1855 to end the Zemene-Mesafint in exact chronological order?',
    options: [
      'Gur Amba (against Dejazmach Goshu) -> Gorgora Bichen (against Ras Ali\'s generals) -> Ayshal (against Ras Ali II) -> Deresge (against Dejazmach Wube)',
      'Deresge -> Ayshal -> Maqdela -> Dabarki',
      'Gundet -> Gura -> Dogali -> Metemma',
      'Embabo -> Azule -> Chelenqo -> Adwa'
    ],
    correctAnswer: 0,
    explanation: 'Kassa Hailu ended the Zemene-Mesafint through four chronological victories: 1) Gur Amba (Nov 1852, defeating Dejazmach Goshu of Gojjam), 2) Gorgora Bichen (April 1853, defeating Ras Ali II\'s four vassal generals), 3) Ayshal (June 1853, crushing Ras Ali II and ending the Yejju dynasty), and 4) Deresge (Feb 1855, defeating Dejazmach Wube of Simien/Tigray), after which he was crowned Emperor Tewodros II.',
    shortcutTip: 'Tewodros\'s 4 Unification Battles (1852–1855): G-G-A-D = Gur Amba -> Gorgora Bichen -> Ayshal -> Deresge.',
    yearReference: 'History Unit 6 Final',
    difficulty: 'medium'
  },
  {
    id: 'hist-q12',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 6: The Battle of Adwa & Treaty of Wuchale',
    question: 'What was the central diplomatic controversy surrounding Article XVII of the 1889 Treaty of Wuchale between Ethiopia and Italy?',
    options: [
      'Italy demanded sovereign control over the port of Zeila',
      'The Amharic version made Italian diplomatic mediation optional ("may"), while the Italian version made it mandatory ("must"), effectively declaring an Italian protectorate over Ethiopia',
      'Ethiopia agreed to pay a 10 million lira indemnity to Khedival Egypt',
      'The treaty redrew the borders of the Kingdom of Kafa'
    ],
    correctAnswer: 1,
    explanation: 'Article XVII had a deceptive linguistic divergence: the Amharic text stated that Ethiopia "may" use the services of the Italian government for foreign diplomatic relations (an optional choice), whereas the Italian text used "consente" (shall/must), giving Italy a protectorate over Ethiopia. When Emperor Menelik II uncovered the deceit, he abrogated the treaty in 1893, leading directly to the historic Ethiopian victory at the Battle of Adwa on March 1, 1896.',
    shortcutTip: 'Article XVII of Wuchale Treaty: Amharic = "May" (Optional); Italian = "Must" (Protectorate).',
    yearReference: 'History Unit 6 Common Exam',
    difficulty: 'easy'
  },
  {
    id: 'hist-q13',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 7: Post-1941 Peasant Rebellions & Oppositions',
    question: 'Which post-1941 Ethiopian peasant rebellion was directly triggered by the 1967 Agricultural Income Tax Proclamation, which peasants feared was a government plot to measure and abolish their ancestral communal Rist land tenure?',
    options: [
      'The Gojjam Peasant Rebellion (1968)',
      'The First Woyane Rebellion in Tigray (1943)',
      'The Bale Peasant Rebellion (1963–1970)',
      'The Gedeo Peasant Uprising at Michille (1960)'
    ],
    correctAnswer: 0,
    explanation: 'The 1968 Gojjam Peasant Rebellion was sparked by the 1967 Agricultural Income Tax Proclamation and the abuses of Governor Dejazmach Tsehayu Enqu-Selassie; Gojjam peasants resisted tax assessment teams out of fear it would undermine their communal Rist system, eventually forcing Emperor Haile-Selassie to cancel the tax and remove the governor.',
    shortcutTip: 'Gojjam 1968 = 1967 Agricultural Income Tax vs. Rist; Bale 1963–70 = Waqo Gutu; Woyane 1943 = Haile-Mariam Redda.',
    yearReference: 'History Unit 7 Final',
    difficulty: 'medium'
  },
  {
    id: 'hist-q14',
    subject: 'history',
    semester: 2,
    courseCode: 'History',
    topic: 'Unit 7: The Derg Regime (1974–1991) & Transitional Period',
    question: 'Which landmark proclamation issued by the Derg on March 4, 1975 abolished all private and feudal land ownership, eliminated rural tenancy (Chisegna), declared all rural land the collective property of the Ethiopian people, and established Peasant Associations?',
    options: [
      'Proclamation No. 31/1975 (Public Ownership of Rural Lands Proclamation)',
      'Proclamation No. 47/1975 (Government Ownership of Urban Lands and Extra Houses)',
      'The 1955 Revised Imperial Constitution',
      'The 1991 Transitional Period Charter'
    ],
    correctAnswer: 0,
    explanation: 'On March 4, 1975, the Derg enacted Proclamation No. 31/1975 ("Public Ownership of Rural Lands"), fulfilling the student movement slogan "Land to the Tiller" by nationalizing all rural land, abolishing landlordism and tenancy, granting usufruct plots up to 10 hectares, and creating Peasant Associations (Gebere Mahber). Proclamation No. 47/1975 (July 1975) nationalized urban land and extra houses and created Kebeles.',
    shortcutTip: 'March 1975 Proclamation 31/1975 = Rural Land Reform & Peasant Associations; July 1975 Proclamation 47/1975 = Urban Land & Kebeles.',
    yearReference: 'History Unit 7 Final',
    difficulty: 'easy'
  },

  // ==========================================
  // EMERGING TECHNOLOGIES (EMTE 1012)
  // ==========================================
  {
    id: 'emte-q1',
    subject: 'emerging_tech',
    semester: 2,
    courseCode: 'EmTe 1012',
    topic: 'Machine Learning Taxonomies',
    question: 'An algorithm is provided with a large dataset of patient vital signs (heart rate, blood pressure, glucose) paired with medical labels indicating whether each patient has diabetes (Yes/No). The goal is to predict diabetes in new patients. This is an example of:',
    options: [
      'Unsupervised Clustering',
      'Supervised Classification',
      'Reinforcement Learning',
      'Unsupervised Dimensionality Reduction'
    ],
    correctAnswer: 1,
    explanation: 'Because the dataset contains known target labels (Yes/No diabetes), the algorithm is trained under supervision (Supervised Learning). Because the output is a discrete categorical class rather than a continuous number, this is specifically a Classification task.',
    shortcutTip: 'Labeled data + Discrete output category = Supervised Classification!',
    yearReference: 'Emerging Tech 1012 Final',
    difficulty: 'easy'
  },
  {
    id: 'emte-q2',
    subject: 'emerging_tech',
    semester: 2,
    courseCode: 'EmTe 1012',
    topic: 'Cloud Computing Service Models',
    question: 'A software company rents raw virtual machines, storage blocks, and network configurations from a cloud provider (such as AWS EC2 or Google Compute Engine), and installs its own operating systems and runtimes. Which cloud service model is being utilized?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)'
    ],
    correctAnswer: 2,
    explanation: 'Infrastructure as a Service (IaaS) provides fundamental computing resources (virtual machines, networking, physical hardware abstraction). The client manages the OS, middleware, and application runtime. In contrast, PaaS abstracts the OS, and SaaS delivers ready-to-use software.',
    shortcutTip: 'Managing OS & raw virtual hardware = IaaS. Managing only code = PaaS. Using finished app = SaaS.',
    yearReference: 'Emerging Semester Exam',
    difficulty: 'medium'
  },

  // ==========================================
  // ANTHROPOLOGY
  // ==========================================
  {
    id: 'anth-q1',
    subject: 'anthropology',
    semester: 1,
    courseCode: 'Anthropology',
    topic: 'Cultural Relativism vs Ethnocentrism',
    question: 'In Social Anthropology, which methodological principle requires researchers to understand and evaluate a society’s beliefs, customs, and practices strictly within the context of that culture itself rather than judging them by external standards?',
    options: [
      'Ethnocentrism',
      'Cultural Relativism',
      'Biological Determinism',
      'Unilineal Evolutionism'
    ],
    correctAnswer: 1,
    explanation: 'Cultural relativism (championed by Franz Boas) posits that a person’s beliefs, values, and practices should be understood based on that person’s own culture, rather than judged against the criteria of another culture (which is ethnocentrism).',
    shortcutTip: 'Judging by your own culture = Ethnocentrism; Understanding within their own culture = Cultural Relativism.',
    yearReference: 'Anthropology Midterm',
    difficulty: 'easy'
  },
  {
    id: 'anth-q2',
    subject: 'anthropology',
    semester: 1,
    courseCode: 'Anthropology',
    topic: 'Indigenous Conflict Resolution in Ethiopia',
    question: 'Which indigenous Ethiopian institution is widely practiced among the Oromo people as a holistic socio-political governance and conflict resolution system, inscribed by UNESCO as Intangible Cultural Heritage?',
    options: [
      'Gadaa System',
      'Shimgilina',
      'Yajoka Qicha',
      'Mada’a'
    ],
    correctAnswer: 0,
    explanation: 'The Gadaa system is the indigenous democratic socio-political system of the Oromo, regulating political, economic, social, and religious activities through generation-sets rotating every eight years.',
    shortcutTip: 'Oromo generation-set democratic governance (8-year cycle) = Gadaa System.',
    yearReference: 'Anthropology Final Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // ENTREPREUNER
  // ==========================================
  {
    id: 'entr-q1',
    subject: 'entrepreneur',
    semester: 2,
    courseCode: 'Entrepreuner',
    topic: 'Entrepreneurship vs Intrapreneurship',
    question: ' according to Joseph Schumpeter’s theory of economic development, what is the primary role of an entrepreneur in the market economy?',
    options: [
      'Maintaining market equilibrium by avoiding technological change',
      'Acting as an innovator who drives "creative destruction" through new products, production methods, or markets',
      'Eliminating all financial risk by relying solely on government subsidies',
      'Performing routine administrative supervision within an established bureaucracy'
    ],
    correctAnswer: 1,
    explanation: 'Schumpeter defined the entrepreneur as an innovator who disrupts existing market equilibrium ("creative destruction") by introducing new goods, new methods of production, opening new markets, or creating new organizational forms.',
    shortcutTip: 'Schumpeter = Innovation + Creative Destruction!',
    yearReference: 'Entrepreuner Midterm',
    difficulty: 'medium'
  },
  {
    id: 'entr-q2',
    subject: 'entrepreneur',
    semester: 2,
    courseCode: 'Entrepreuner',
    topic: 'Business Plan & Break-Even Analysis',
    question: 'A startup manufactures solar lanterns with Fixed Costs of $FC = 40,000\\text{ ETB}$, a selling price per unit of $P = 500\\text{ ETB}$, and a variable cost per unit of $VC = 300\\text{ ETB}$. What is the Break-Even Point ($Q_{BEP}$) in units?',
    options: [
      '80 units',
      '133 units',
      '200 units',
      '400 units'
    ],
    correctAnswer: 2,
    explanation: 'The Break-Even Point in units is given by Q_BEP = FC / (P - VC). Substituting the values: Q_BEP = 40,000 / (500 - 300) = 40,000 / 200 = 200 units.',
    shortcutTip: 'Break-Even Units = Fixed Cost ÷ Contribution Margin per Unit (P − VC).',
    yearReference: 'Entrepreuner Final Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // GLOBALAFFARIS
  // ==========================================
  {
    id: 'glob-q1',
    subject: 'global_affairs',
    semester: 1,
    courseCode: 'GlobalAffaris',
    topic: 'Theories of International Relations',
    question: 'Which core assumption distinguishes Classical and Structural Realism from Liberalism in International Relations theory?',
    options: [
      'International institutions and NGOs have superseded sovereign states as the primary global actors',
      'The international system is fundamentally anarchic, and unitary states prioritize national security and survival through self-help',
      'Economic interdependence guarantees perpetual peace among trading nations',
      'Global politics is determined exclusively by shared cultural norms rather than material capabilities'
    ],
    correctAnswer: 1,
    explanation: 'Realism (Morgenthau, Waltz) posits that the international system is anarchic (no overarching world government), sovereign states are the principal rational actors, and states rely on self-help and balance of power to ensure survival.',
    shortcutTip: 'Realism = Anarchy + Sovereign States + Self-Help + Balance of Power.',
    yearReference: 'GlobalAffaris Midterm',
    difficulty: 'medium'
  },
  {
    id: 'glob-q2',
    subject: 'global_affairs',
    semester: 1,
    courseCode: 'GlobalAffaris',
    topic: 'Bretton Woods Institutions & Global Governance',
    question: 'While the World Bank primarily provides long-term development loans for infrastructure and poverty reduction, which Bretton Woods institution is mandated to oversee global monetary cooperation, exchange rate stability, and short-term balance-of-payments support?',
    options: [
      'World Trade Organization (WTO)',
      'International Monetary Fund (IMF)',
      'United Nations Development Programme (UNDP)',
      'International Court of Justice (ICJ)'
    ],
    correctAnswer: 1,
    explanation: 'The International Monetary Fund (IMF) monitors the international monetary system, exchange rate stability, and provides short-to-medium-term financial assistance to countries experiencing balance-of-payments crises.',
    shortcutTip: 'Balance-of-payments & monetary stability = IMF; Long-term development projects = World Bank.',
    yearReference: 'GlobalAffaris Final Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // INCLUSIVE
  // ==========================================
  {
    id: 'incl-q1',
    subject: 'inclusive',
    semester: 2,
    courseCode: 'Inclusive',
    topic: 'Models of Disability & Inclusion',
    question: 'What is the fundamental distinction between the Medical Model and the Social Model of disability in Inclusive Education?',
    options: [
      'The Medical Model blames society, whereas the Social Model focuses on surgical cure',
      'The Medical Model views disability as an individual deficit to be fixed, whereas the Social Model views disability as the result of environmental, attitudinal, and systemic barriers in society',
      'Both models advocate segregating learners with disabilities into special institutions',
      'The Social Model rejects assistive technology and reasonable accommodation'
    ],
    correctAnswer: 1,
    explanation: 'The Medical Model locates the problem within the individual’s impairment, whereas the Social Model (and UNCRPD) recognizes that disability arises from the interaction between individuals with impairments and societal/environmental barriers.',
    shortcutTip: 'Medical Model = "Fix the person"; Social Model = "Remove societal & environmental barriers".',
    yearReference: 'Inclusive Midterm',
    difficulty: 'easy'
  },
  {
    id: 'incl-q2',
    subject: 'inclusive',
    semester: 2,
    courseCode: 'Inclusive',
    topic: 'Universal Design for Learning (UDL)',
    question: 'Universal Design for Learning (UDL) structures inclusive pedagogy around which three core principles?',
    options: [
      'Standardized testing, rigid pacing, and single-modality lectures',
      'Multiple means of Engagement, Multiple means of Representation, and Multiple means of Action and Expression',
      'Segregation, Remediation, and Institutionalization',
      'Visual learning only, Auditory learning only, and Kinesthetic learning only'
    ],
    correctAnswer: 1,
    explanation: 'UDL provides flexible learning environments through three core networks: Multiple means of Engagement (the "why" of learning), Multiple means of Representation (the "what" of learning), and Multiple means of Action & Expression (the "how" of learning).',
    shortcutTip: 'UDL 3 Pillars = Engagement (Why) + Representation (What) + Action/Expression (How).',
    yearReference: 'Inclusive Final Exam',
    difficulty: 'medium'
  },

  // ==========================================
  // ECONOMICS
  // ==========================================
  {
    id: 'econ-q1',
    subject: 'economics',
    semester: 1,
    courseCode: 'Economics',
    topic: 'Market Equilibrium & Price Elasticity',
    question: 'Suppose the market demand for coffee is $Q_d = 120 - 2P$ and the market supply is $Q_s = 30 + P$. What are the equilibrium price ($P^*$) and equilibrium quantity ($Q^*$) in this market?',
    options: [
      'P* = 20, Q* = 80',
      'P* = 30, Q* = 60',
      'P* = 40, Q* = 70',
      'P* = 50, Q* = 20'
    ],
    correctAnswer: 1,
    explanation: 'At market equilibrium, Q_d = Q_s. Setting 120 - 2P = 30 + P gives 90 = 3P, so P* = 30. Substituting P* = 30 into Q_s = 30 + 30 gives Q* = 60 units.',
    shortcutTip: 'Set Qd = Qs → 120 − 2P = 30 + P → 3P = 90 → P* = 30, Q* = 60.',
    yearReference: 'Economics Midterm',
    difficulty: 'easy'
  },
  {
    id: 'econ-q2',
    subject: 'economics',
    semester: 1,
    courseCode: 'Economics',
    topic: 'National Income Accounting (GDP)',
    question: 'Using the expenditure approach to National Income Accounting, if Consumption $C = 500$, Gross Investment $I = 180$, Government Purchases $G = 220$, Exports $X = 90$, and Imports $M = 140$, what is the Gross Domestic Product ($\\text{GDP}$)?',
    options: [
      '850',
      '900',
      '950',
      '1,130'
    ],
    correctAnswer: 0,
    explanation: 'By the expenditure approach, GDP = C + I + G + (X - M). Substituting the values: GDP = 500 + 180 + 220 + (90 - 140) = 900 - 50 = 850.',
    shortcutTip: 'Remember net exports NX = Exports − Imports. Here NX = 90 − 140 = −50, so GDP = 900 − 50 = 850.',
    yearReference: 'Economics Final Exam',
    difficulty: 'easy'
  },

  // ==========================================
  // MATHSSCO (MATHEMATICS FOR SOCIAL SCIENCES)
  // ==========================================
  {
    id: 'msco-q1',
    subject: 'math_social',
    semester: 1,
    courseCode: 'MathsSco',
    topic: 'Marginal Analysis in Business Calculus',
    question: 'A firm’s total profit function (in thousands of birr) for producing $x$ units of output is given by $\\Pi(x) = -x^2 + 40x - 100$. At what output level $x$ is the firm’s profit maximized?',
    options: [
      'x = 10 units',
      'x = 20 units',
      'x = 40 units',
      'x = 300 units'
    ],
    correctAnswer: 1,
    explanation: 'To maximize profit, take the first derivative (marginal profit) and set it to zero: Π\'(x) = -2x + 40 = 0 => 2x = 40 => x = 20 units. Since Π\'\'(x) = -2 < 0, x = 20 is the global maximum.',
    shortcutTip: 'Maximum profit occurs where Marginal Profit Π\'(x) = 0.',
    yearReference: 'MathsSco Midterm',
    difficulty: 'easy'
  },
  {
    id: 'msco-q2',
    subject: 'math_social',
    semester: 1,
    courseCode: 'MathsSco',
    topic: 'Matrix Algebra & Cramers Rule',
    question: 'What is the determinant of the matrix $A = \\begin{pmatrix} 4 & 3 \\\\ 2 & 5 \\end{pmatrix}$, and is the matrix invertible?',
    options: [
      'det(A) = 14; Invertible because det(A) ≠ 0',
      'det(A) = 26; Invertible because det(A) ≠ 0',
      'det(A) = -14; Singular',
      'det(A) = 0; Non-invertible'
    ],
    correctAnswer: 0,
    explanation: 'For a 2×2 matrix [[a, b], [c, d]], det(A) = ad - bc = (4)(5) - (3)(2) = 20 - 6 = 14. Since det(A) = 14 ≠ 0, the matrix is non-singular (invertible).',
    shortcutTip: '2×2 Determinant = Main diagonal product minus off-diagonal product: (4×5) − (3×2) = 14.',
    yearReference: 'MathsSco Final Exam',
    difficulty: 'easy'
  }
];

export const ALL_FRESHMAN_QUESTIONS: Question[] = RAW_FRESHMAN_QUESTIONS.map((q) => {
  const mappedSubj: Subject =
    q.subject === 'physics_2'
      ? 'physics'
      : q.subject === 'chemistry_2'
      ? 'chemistry'
      : q.subject === 'biology_2'
      ? 'biology'
      : q.subject === 'geography_history'
      ? 'geography'
      : q.subject;
  const cleanName = SUBJECT_EXACT_NAME_MAP[mappedSubj] || 'Maths1';
  return {
    ...q,
    subject: mappedSubj,
    courseCode: cleanName,
  };
});

