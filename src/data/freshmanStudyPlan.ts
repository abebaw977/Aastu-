import { WeekPlan } from '../types';

export const FRESHMAN_SEMESTER_PLAN: WeekPlan[] = [
  // ==========================================
  // SEMESTER 1: WEEKS 1 TO 12
  // ==========================================
  {
    week: 1,
    semester: 1,
    title: "Week 1: Propositional Logic, Quantifiers & Academic Grammar",
    focusCourses: ["Mathematics for Natural Sciences", "Communicative English Skills I", "Critical Thinking"],
    tagline: "Build foundational logic rigor with truth tables and master grammatical accuracy and paragraph unity.",
    estimatedHours: 18,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Mathematics for Natural Sciences)",
        topics: [
          "Propositions & Compound Statements",
          "Truth Tables for Negation, Conjunction, Disjunction, Conditional, and Biconditional",
          "Tautologies, Contradictions, and Logical Equivalence",
          "Universal (∀) and Existential (∃) Quantifiers and their Negation"
        ],
        objectives: [
          "Distinguish valid mathematical propositions from open non-propositions",
          "Construct accurate multi-variable truth tables for complex compound statements",
          "Apply De Morgan's laws and material implication equivalences",
          "Translate English statements with nested quantifiers into formal symbolic logic"
        ],
        actionableTargets: [
          { id: "w1-t1", text: "Solve 20 Logic truth tables (Conjunction, Implication, Equivalence)", category: "Practice" },
          { id: "w1-t2", text: "Master Quantifiers: Translating 'For all' (∀) and 'There exists' (∃) into symbolic logic", category: "Concept" },
          { id: "w1-t3", text: "Prove Material Implication Law: p → q ≡ ¬p ∨ q using truth tables", category: "Proof" },
          { id: "w1-t4", text: "Practice negating nested quantifiers in calculus definitions", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "english",
        courseTitle: "EnLa 1011 (Communicative English Skills I)",
        topics: [
          "Grammar in Context: Subject-Verb Agreement with Intervening Phrases",
          "Avoiding Sentence Fragments, Run-on Sentences, and Comma Splices",
          "Four Types of Conditional Sentences (Zero, 1st, 2nd, 3rd) and Formal Inversions",
          "Paragraph Architecture: Controlling Ideas, Unity, and Coherence"
        ],
        objectives: [
          "Identify and eliminate sentence boundary errors in student drafts",
          "Master subjunctive forms and third conditional inversions ('Had I known...')",
          "Draft a unified 5-sentence cause-and-effect academic paragraph"
        ],
        actionableTargets: [
          { id: "w1-t5", text: "Draft a 5-sentence cause-and-effect paragraph with clear topic sentence", category: "Writing" },
          { id: "w1-t6", text: "Complete 25 Subject-Verb Agreement drills with intervening prepositional phrases", category: "Practice" },
          { id: "w1-t7", text: "Transform 10 conditional sentences into formal inverted structures", category: "Writing" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "critical_thinking",
        courseTitle: "LoCT 1011 (Critical Thinking & Logic)",
        topics: [
          "Definition & Value of Critical Thinking in Higher Education",
          "Premise-Conclusion Indicators and Argument Reconstruction",
          "Distinguishing Arguments from Explanations, Conditional Statements, and Reports"
        ],
        objectives: [
          "Locate explicit and implicit conclusion statements in university texts",
          "Diagram standard argument structures with multiple supporting premises"
        ],
        actionableTargets: [
          { id: "w1-t8", text: "Analyze 10 deductive argument validity tests and diagram premises", category: "Concept" },
          { id: "w1-t9", text: "Identify premise indicators ('since', 'because', 'given that') vs conclusion indicators", category: "Practice" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Material Implication (p → q ≡ ¬p ∨ q)",
      "Contrapositive Equivalence (p → q ≡ ¬q → ¬p)",
      "Quantifier Negations ¬(∀x P(x)) ≡ ∃x ¬P(x)",
      "Subject-verb agreement with correlative conjunctions (either...or, neither...nor)"
    ],
    examTraps: [
      "Assuming 'Unless p, q' means p → q. It actually translates to ¬p → q (or q ∨ p).",
      "Treating intervening phrases as grammatical subjects in English grammar.",
      "Confusing an explanation ('He failed because he fell sick') with an argument."
    ],
    keyFormulasToMemorize: [
      "p → q ≡ ¬p ∨ q",
      "¬(p ∧ q) ≡ ¬p ∨ ¬q",
      "¬(∀x P(x)) ≡ ∃x ¬P(x)",
      "Had + Subject + Past Participle, Subject + Would Have + Past Participle"
    ]
  },

  {
    week: 2,
    semester: 1,
    title: "Week 2: Set Theory, Relations, Vectors & 1D/2D Kinematics",
    focusCourses: ["Mathematics for Natural Sciences", "General Physics I", "General Chemistry"],
    tagline: "Unify set operations and cartesian products with physics vectors, projectile kinematics, and atomic orbitals.",
    estimatedHours: 19,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Sets, Relations & Functions)",
        topics: [
          "Sets, Subsets, Power Sets, and Cartesian Products A × B",
          "Binary Relations: Reflexive, Symmetric, Transitive, and Equivalence Relations",
          "Functions: Injective (One-to-one), Surjective (Onto), Bijective, and Inverse Functions"
        ],
        objectives: [
          "Determine equivalence classes given a partition of a set",
          "Test functions for injectivity and surjectivity algebraically"
        ],
        actionableTargets: [
          { id: "w2-t1", text: "Verify equivalence relation properties (Reflexive, Symmetric, Transitive) on 5 relations", category: "Proof" },
          { id: "w2-t2", text: "Find inverse function f⁻¹(x) and verify f(f⁻¹(x)) = x for 10 rational functions", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Kinematics & Vector Mechanics)",
        topics: [
          "Vector Operations in 2D and 3D (Magnitude, Unit Vectors, Resolving Components)",
          "1D Constant Acceleration Equations: v = u + at, s = ut + ½at², v² = u² + 2as",
          "Projectile Motion: Maximum Height, Total Time of Flight, and Horizontal Range"
        ],
        objectives: [
          "Solve multi-stage kinematic problems with variable braking and acceleration",
          "Calculate angled projectile trajectories on horizontal and inclined planes"
        ],
        actionableTargets: [
          { id: "w2-t3", text: "Solve 12 projectile trajectory and range equations under varying launch angles", category: "Practice" },
          { id: "w2-t4", text: "Derive horizontal range formula R = (u² sin 2θ)/g from fundamental 2D kinematics", category: "Proof" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "chemistry",
        courseTitle: "Chem 1011 (Atomic Structure & Quantum Numbers)",
        topics: [
          "Bohr Model of Hydrogen Atom and Emission Spectra (Rydberg Equation)",
          "Quantum Numbers: Principal (n), Angular Momentum (l), Magnetic (ml), Spin (ms)",
          "Aufbau Principle, Pauli Exclusion Principle, and Hund's Rule"
        ],
        objectives: [
          "Write condensed ground-state electron configurations for transition metals and ions",
          "Identify quantum number violations in orbital assignment questions"
        ],
        actionableTargets: [
          { id: "w2-t5", text: "Determine all valid sets of 4 quantum numbers for valence electrons in Cr and Cu", category: "Concept" },
          { id: "w2-t6", text: "Calculate photon wavelength and frequency for Balmer series transitions", category: "Practice" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Range of projectile R = (u² sin 2θ)/g (maximum at 45°)",
      "Anomalous electron configurations of Cr [Ar] 4s¹ 3d⁵ and Cu [Ar] 4s¹ 3d¹⁰",
      "Function composition (g ∘ f)(x) and domain restrictions",
      "Equivalence classes forming disjoint partitions of a set"
    ],
    examTraps: [
      "Writing 4s² 3d⁴ for Chromium instead of the stable half-filled 4s¹ 3d⁵.",
      "Forgetting that projectile velocity at maximum height is NOT zero; only the VERTICAL component is zero (v_x = u cos θ)!"
    ],
    keyFormulasToMemorize: [
      "R = \\frac{u^2 \\sin(2\\theta)}{g}",
      "H_{\\max} = \\frac{u^2 \\sin^2\\theta}{2g}",
      "E_n = -\\frac{13.6\\text{ eV}}{n^2}",
      "\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)"
    ]
  },

  {
    week: 3,
    semester: 1,
    title: "Week 3: Newton's Dynamics, Friction & Chemical Bonding Geometry",
    focusCourses: ["General Physics I", "General Chemistry", "Critical Thinking"],
    tagline: "Free-body diagrams on inclines, VSEPR molecular geometry, and identifying deductive fallacies.",
    estimatedHours: 18,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Newton's Laws & Friction)",
        topics: [
          "Newton's 1st, 2nd, and 3rd Laws & Action-Reaction Misconceptions",
          "Static vs Kinetic Friction on Inclined Planes: f_s ≤ μ_s N, f_k = μ_k N",
          "Connected Bodies (Atwood Machines, Pulleys) and Tension Calculations"
        ],
        objectives: [
          "Construct accurate free-body diagrams for multi-body connected systems",
          "Calculate critical incline angle of repose where motion begins"
        ],
        actionableTargets: [
          { id: "w3-t1", text: "Solve 10 inclined plane acceleration problems with friction coefficients", category: "Practice" },
          { id: "w3-t2", text: "Derive tension and acceleration for a double-mass Atwood pulley system", category: "Proof" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "chemistry",
        courseTitle: "Chem 1011 (Chemical Bonding & Molecular Shapes)",
        topics: [
          "Ionic vs Covalent Bonding, Electronegativity Differences and Bond Dipoles",
          "Lewis Structures, Formal Charges, and Resonance Structures",
          "VSEPR Theory: Molecular Geometry and Bond Angle Deviations",
          "Orbital Hybridization: sp, sp², sp³, sp³d, and sp³d² Central Atoms"
        ],
        objectives: [
          "Predict the exact 3D molecular shape and net polarity for complex polyatomic ions",
          "Assign hybridization to every central atom in organic and inorganic molecules"
        ],
        actionableTargets: [
          { id: "w3-t3", text: "Predict VSEPR shape and hybridization for 15 molecules (SF₄, XeF₄, BrF₅, etc.)", category: "Concept" },
          { id: "w3-t4", text: "Calculate formal charge for all atoms in O₃, NO₃⁻, and SCN⁻", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "critical_thinking",
        courseTitle: "LoCT 1011 (Deductive Syllogisms & Informal Fallacies)",
        topics: [
          "Categorical Propositions: Universal Affirmative (A), Universal Negative (E), Particular Affirmative (I), Particular Negative (O)",
          "Standard-Form Categorical Syllogisms, Mood, and Figure",
          "Fallacies of Relevance: Ad Hominem, Appeal to Pity, Straw Man, Red Herring"
        ],
        objectives: [
          "Detect and name specific informal fallacies in everyday and political discourse",
          "Test syllogism validity using 3-circle Venn diagram techniques"
        ],
        actionableTargets: [
          { id: "w3-t5", text: "Classify 20 informal fallacies from university exam past papers", category: "Concept" },
          { id: "w3-t6", text: "Test validity of 5 syllogisms using 3-circle Venn diagrams", category: "Proof" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Incline acceleration: a = g(sin θ - μ_k cos θ)",
      "Formal charge formula: FC = Valence - LonePairElectrons - ½(BondingElectrons)",
      "Square planar geometry of XeF₄ (sp³d² with 2 axial lone pairs)",
      "Straw Man fallacy vs Red Herring distinction"
    ],
    examTraps: [
      "Equating normal force to mg on an incline. It is mg cos θ!",
      "Assuming molecules with polar bonds are always polar. Symmetrical arrangements cancel dipoles."
    ],
    keyFormulasToMemorize: [
      "\\text{FC} = V - N_{\\text{non-bonding}} - \\frac{1}{2} N_{\\text{bonding}}",
      "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N",
      "\\tan \\theta_{\\text{crit}} = \\mu_s"
    ]
  },

  {
    week: 4,
    semester: 1,
    title: "Week 4: Matrices, Systems of Linear Equations & Limits",
    focusCourses: ["Mathematics for Natural Sciences", "General Physics I", "Communicative English"],
    tagline: "Master Gaussian elimination, 3x3 determinants, Cramer's rule, and calculus limit laws.",
    estimatedHours: 19,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Matrices & Systems of Linear Equations)",
        topics: [
          "Matrix Operations: Addition, Scalar Multiplication, and Matrix Product AB",
          "Determinants of 2x2 and 3x3 Matrices (Cofactor Expansion, Sarrus Rule)",
          "Matrix Inverse A⁻¹ using Adjugate Matrix and Gaussian Row Elimination",
          "Solving Systems of Linear Equations using Cramer's Rule and Row Operations"
        ],
        objectives: [
          "Compute 3x3 determinants rapidly using row reduction techniques",
          "Determine whether a linear system has a unique solution, infinite solutions, or no solution"
        ],
        actionableTargets: [
          { id: "w4-t1", text: "Compute inverse A⁻¹ for 5 3x3 invertible matrices using adjugate method", category: "Practice" },
          { id: "w4-t2", text: "Solve 3-variable linear systems using Cramer's Rule (D, Dx, Dy, Dz)", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Limit & Continuity Foundations)",
        topics: [
          "Intuitive and Rigorous Epsilon-Delta (ε-δ) Definition of Limit",
          "Limit Laws, One-Sided Limits, and Infinite Limits (Vertical Asymptotes)",
          "Limits at Infinity and Horizontal Asymptotes for Rational Functions",
          "The Squeeze (Sandwich) Theorem for Trigonometric Limits"
        ],
        objectives: [
          "Master Limit theorems and L'Hôpital's Rule for algebraic 0/0 forms",
          "Evaluate trigonometric limits using standard form lim(x→0) sin(x)/x = 1"
        ],
        actionableTargets: [
          { id: "w4-t3", text: "Master Limit theorems and L'Hôpital's Rule for 0/0 and ∞/∞ indeterminate forms", category: "Concept" },
          { id: "w4-t4", text: "Evaluate 15 trigonometric limits using Squeeze Theorem and conjugate techniques", category: "Practice" }
        ],
        recommendedPracticeCount: 25
      },
      {
        period: "Evening (2.5h)",
        subject: "english",
        courseTitle: "EnLa 1011 (Academic Vocabulary & Transitional Devices)",
        topics: [
          "Academic Word List (AWL) High-Frequency Stems, Prefixes & Suffixes",
          "Transitional Markers: Additive, Adversative (Contrast), Causal, and Sequential",
          "Synthesizing Multiple Sentence Patterns into Cohesive Academic Arguments"
        ],
        objectives: [
          "Incorporate formal transitional markers smoothly to elevate writing style",
          "Infer meanings of advanced academic terms from contextual clues"
        ],
        actionableTargets: [
          { id: "w4-t5", text: "Complete 30 Academic Word List (AWL) context inference drills", category: "Practice" },
          { id: "w4-t6", text: "Rewrite a disjointed 6-sentence paragraph using 5 distinct cohesive transition devices", category: "Writing" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Cramer's Rule condition: det(A) ≠ 0 for a unique solution",
      "Standard limit: lim(x→0) sin(kx)/x = k",
      "Row operations preserve determinant properties (row swap changes sign, scaling scales det)",
      "Three continuity criteria at x = c: f(c) exists, lim f(x) exists, and lim f(x) = f(c)"
    ],
    examTraps: [
      "Assuming AB = BA. Matrix multiplication is strictly NON-COMMUTATIVE!",
      "Forgetting to check whether the denominator is non-zero before applying direct substitution."
    ],
    keyFormulasToMemorize: [
      "x_i = \\frac{\\det(A_i)}{\\det(A)}",
      "A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)",
      "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
      "\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0"
    ]
  },

  {
    week: 5,
    semester: 1,
    title: "Week 5: Work-Energy Theorem, Momentum & Chemical Thermodynamics",
    focusCourses: ["General Physics I", "General Chemistry", "General Biology"],
    tagline: "Conservation laws in mechanics, Hess's Law thermochemistry, and cellular bioenergetics.",
    estimatedHours: 19,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Work, Energy & Momentum)",
        topics: [
          "Work Done by Constant and Variable Forces (W = ∫ F dx)",
          "Work-Energy Theorem: W_net = ΔK = ½mv_f² - ½mv_i²",
          "Conservative vs Non-Conservative Forces and Mechanical Energy Conservation",
          "Linear Momentum, Impulse (J = Δp = ∫ F dt), and 1D/2D Collisions (Elastic vs Inelastic)"
        ],
        objectives: [
          "Calculate speed changes in non-conservative systems with friction loss",
          "Solve 1D and 2D elastic collision problems using kinetic energy and momentum conservation"
        ],
        actionableTargets: [
          { id: "w5-t1", text: "Solve 12 collision problems distinguishing elastic (e=1) from inelastic (e<1)", category: "Practice" },
          { id: "w5-t2", text: "Apply Work-Energy theorem to spring-block oscillating systems", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "chemistry",
        courseTitle: "Chem 1011 (Chemical Thermodynamics & Hess's Law)",
        topics: [
          "First Law of Thermodynamics: ΔU = q + w, Work of Gas Expansion w = -PΔV",
          "Enthalpy of Reaction (ΔH_rxn), Calorimetry, and Heat Capacity (q = mcΔT)",
          "Hess's Law of Heat Summation and Standard Enthalpies of Formation (ΔH°_f)",
          "Second Law: Entropy (ΔS), Gibbs Free Energy (ΔG = ΔH - TΔS), and Spontaneity"
        ],
        objectives: [
          "Calculate overall reaction enthalpy using Hess's Law cycles",
          "Predict whether a chemical process is spontaneous at high or low temperatures"
        ],
        actionableTargets: [
          { id: "w5-t3", text: "Solve 8 multi-step Hess's Law thermochemical cycle equations", category: "Practice" },
          { id: "w5-t4", text: "Determine temperature range of spontaneity from ΔH and ΔS signs", category: "Concept" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "biology",
        courseTitle: "Biol 1011 (Enzymes & Cellular Respiration)",
        topics: [
          "Enzyme Catalysis, Activation Energy (Ea), and Allosteric Inhibition",
          "Glycolysis: Key Regulatory Steps (Phosphofructokinase) and ATP Yield",
          "The Citric Acid (Krebs) Cycle in Mitochondrial Matrix",
          "Oxidative Phosphorylation and ATP Synthase Chemiosmosis"
        ],
        objectives: [
          "Trace carbon atoms and calculate total ATP output per oxidized glucose molecule",
          "Contrast substrate-level phosphorylation with oxidative phosphorylation"
        ],
        actionableTargets: [
          { id: "w5-t5", text: "Trace electron flow through Complexes I, II, III, IV and calculate net ATP yield", category: "Concept" },
          { id: "w5-t6", text: "Compare competitive vs non-competitive enzyme inhibition curves (Km, Vmax)", category: "Practice" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Completely inelastic collision: bodies stick together (m₁v₁ + m₂v₂ = (m₁+m₂)V_f)",
      "Spontaneity criteria: ΔG < 0 is spontaneous; ΔH < 0, ΔS > 0 is spontaneous at all T",
      "Terminal electron acceptor in cellular respiration is O₂ (reduced to H₂O)",
      "Hess's law: ΔH°_rxn = Σ n ΔH°_f(products) - Σ m ΔH°_f(reactants)"
    ],
    examTraps: [
      "Forgetting the negative sign in expansion work: w = -P_ext ΔV.",
      "Assuming kinetic energy is conserved in all collisions. Momentum is ALWAYS conserved, but kinetic energy is ONLY conserved in ELASTIC collisions."
    ],
    keyFormulasToMemorize: [
      "W_{\\text{net}} = \\Delta K",
      "\\Delta G = \\Delta H - T\\Delta S",
      "\\Delta H^\\circ_{\\text{rxn}} = \\sum n \\Delta H^\\circ_f(\\text{prod}) - \\sum m \\Delta H^\\circ_f(\\text{react})",
      "J = F_{\\text{avg}} \\Delta t = \\Delta p"
    ]
  },

  {
    week: 6,
    semester: 1,
    title: "Week 6: Civics, Ethical Theories & Midterm Intensive Review",
    focusCourses: ["Civics & Ethical Education", "Mathematics for Natural Sciences", "General Physics I"],
    tagline: "Synthesize normative moral frameworks and run diagnostic checks across all Week 1-5 topics.",
    estimatedHours: 20,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "civics",
        courseTitle: "CESt 1011 (Normative Ethics & Constitutional Governance)",
        topics: [
          "Normative Ethical Theories: Utilitarianism (Bentham, Mill) vs Deontology (Kant)",
          "Aristotelian Virtue Ethics and the Doctrine of the Golden Mean",
          "The Ethiopian Constitution (1995 FDRE): Supremacy, Human Rights & Division of Powers",
          "Democratic Principles: Rule of Law, Accountability, Transparency, and Separation of Powers"
        ],
        objectives: [
          "Apply utilitarian and deontological frameworks to resolve real-world public policy dilemmas",
          "Identify constitutional protections for civil, political, and socio-economic rights"
        ],
        actionableTargets: [
          { id: "w6-t1", text: "Compare Utilitarianism, Kantian Duty, and Virtue Ethics on 3 moral case studies", category: "Concept" },
          { id: "w6-t2", text: "Review key provisions of the FDRE Constitution regarding fundamental human rights", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Midterm Diagnostic Drill)",
        topics: [
          "Comprehensive review: Logic, Truth Tables, Quantifiers, Sets, Relations, Functions",
          "Vector Operations, 3D Lines & Planes, Matrices, Determinants, and Limit Calculations"
        ],
        objectives: [
          "Identify and patch knowledge gaps under timed exam conditions before Week 7 Midterms"
        ],
        actionableTargets: [
          { id: "w6-t3", text: "Complete 35-question full Math 1011 Midterm Practice Simulator under 45 minutes", category: "Practice" },
          { id: "w6-t4", text: "Log all incorrect questions into Mistakes Notebook for targeted remediation", category: "Practice" }
        ],
        recommendedPracticeCount: 35
      },
      {
        period: "Evening (2.5h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Midterm Diagnostic Drill)",
        topics: [
          "Comprehensive review: Kinematics, Projectiles, Newton's Laws, Friction, Work-Energy, Momentum"
        ],
        objectives: [
          "Solidify speed-solving formulas for incline mechanics and collision equations"
        ],
        actionableTargets: [
          { id: "w6-t5", text: "Complete 30-question Physics Midterm Practice Simulator with step-by-step scoring", category: "Practice" }
        ],
        recommendedPracticeCount: 30
      }
    ],
    highYieldTopics: [
      "Kant's Categorical Imperative: Never treat humans merely as means to an end",
      "The Golden Mean: Virtue is the middle state between excess and deficiency",
      "Constitutional Supremacy (Article 9 of FDRE Constitution)",
      "High-speed determinant shortcuts for triangular and diagonal matrices"
    ],
    examTraps: [
      "Confusing Act Utilitarianism with Rule Utilitarianism.",
      "Overlooking the unit vector conversion when finding vector projections."
    ],
    keyFormulasToMemorize: [
      "\\det(AB) = \\det(A) \\cdot \\det(B)",
      "\\det(A^{-1}) = \\frac{1}{\\det(A)}",
      "W_{\\text{nc}} = \\Delta E_{\\text{mech}}"
    ]
  },

  {
    week: 7,
    semester: 1,
    title: "Week 7: Official Midterm Examination Week & Performance Audit",
    focusCourses: ["Mathematics", "Physics", "Chemistry", "English", "Critical Thinking", "Civics"],
    tagline: "Execute official university midterm exams (30% weight) with maximum composure and precision.",
    estimatedHours: 15,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 Midterm Examination Session",
        topics: ["Midterm Exam Execution: Chapters 1 through 4"],
        objectives: ["Attain 90%+ score on official Mathematics for Natural Science midterm"],
        actionableTargets: [
          { id: "w7-t1", text: "Sit official Math 1011 Midterm (30% course weight) with calm pacing", category: "Practice" },
          { id: "w7-t2", text: "Conduct post-exam solution review and verify score tally", category: "Practice" }
        ],
        recommendedPracticeCount: 30
      },
      {
        period: "Afternoon (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 & Chem 1011 Midterm Sessions",
        topics: ["Physics & Chemistry Midterm Exam Execution"],
        objectives: ["Execute clean algebraic calculations without arithmetic slips"],
        actionableTargets: [
          { id: "w7-t3", text: "Complete Physics and Chemistry Midterms maintaining 90s average pace per question", category: "Practice" }
        ],
        recommendedPracticeCount: 30
      },
      {
        period: "Evening (2.5h)",
        subject: "critical_thinking",
        courseTitle: "LoCT 1011 & EnLa 1011 Midterm Sessions",
        topics: ["Critical Thinking & Communicative English Midterms"],
        objectives: ["Achieve top tier marks on argument analysis and grammar sections"],
        actionableTargets: [
          { id: "w7-t4", text: "Log all post-midterm feedback into Personal Study Notes for final exam prep", category: "Writing" }
        ],
        recommendedPracticeCount: 25
      }
    ],
    highYieldTopics: [
      "Time management: Allocate no more than 1.5 minutes per multiple choice question",
      "Flagging technique: Mark uncertain questions immediately and return during final 10 minutes",
      "Read all options before selecting: Distractors are designed to catch hasty readers"
    ],
    examTraps: [
      "Second-guessing your initial correct intuition without concrete algebraic disproof."
    ],
    keyFormulasToMemorize: [
      "Review all Week 1-6 high-yield formula sheets"
    ]
  },

  {
    week: 8,
    semester: 1,
    title: "Week 8: Fluid Dynamics, Thermal Physics & Chemical Equilibrium",
    focusCourses: ["General Physics I", "General Chemistry", "Physical Fitness"],
    tagline: "Post-midterm acceleration into fluid statics/dynamics, gas laws, and equilibrium constants.",
    estimatedHours: 18,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Fluid Mechanics & Thermal Physics)",
        topics: [
          "Fluid Statics: Density, Pressure, Pascal's Principle, Archimedes' Buoyancy Principle",
          "Fluid Dynamics: Equation of Continuity (A₁v₁ = A₂v₂) and Bernoulli's Equation",
          "Ideal Gas Law (PV = nRT), Thermal Expansion, and Calorimetry Heat Transfer"
        ],
        objectives: [
          "Calculate buoyant force on submerged and floating bodies (F_B = ρ_fluid V_sub g)",
          "Apply Bernoulli's principle to calculate flow speed and pressure changes in constricted pipes"
        ],
        actionableTargets: [
          { id: "w8-t1", text: "Solve 10 Bernoulli's equation problems with varying pipe heights and radii", category: "Practice" },
          { id: "w8-t2", text: "Calculate buoyant forces for partially submerged floating icebergs and blocks", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "chemistry",
        courseTitle: "Chem 1011 (Chemical Equilibrium & Le Chatelier's Principle)",
        topics: [
          "Dynamic Equilibrium Concept and the Law of Mass Action",
          "Equilibrium Constants K_c and K_p and their Relationship: K_p = K_c(RT)^(Δn)",
          "Reaction Quotient Q and Direction of Shift towards Equilibrium",
          "Le Chatelier's Principle: Shifts with Concentration, Pressure/Volume, Temperature, and Catalysts"
        ],
        objectives: [
          "Predict the direction of equilibrium shift when stress is applied to gas-phase reactions",
          "Calculate equilibrium concentrations using RICE (Reaction, Initial, Change, Equilibrium) tables"
        ],
        actionableTargets: [
          { id: "w8-t3", text: "Solve 8 equilibrium RICE tables involving quadratic equation solutions", category: "Practice" },
          { id: "w8-t4", text: "Predict Le Chatelier shifts for 10 endothermic and exothermic equilibrium systems", category: "Concept" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "fitness",
        courseTitle: "SpSc 1011 (Exercise Physiology & Fitness Principles)",
        topics: [
          "Health-Related vs Skill-Related Fitness Dimensions",
          "The FITT Principle: Frequency, Intensity, Time, Type",
          "Cardiorespiratory Capacity: Maximum Heart Rate (MHR = 220 - Age) and Target Zones",
          "Energy Systems during Exercise: ATP-CP, Glycolytic, and Oxidative Pathways"
        ],
        objectives: [
          "Calculate personalized aerobic training heart rate thresholds for collegiate athletes",
          "Design a balanced weekly fitness prescription complying with FITT guidelines"
        ],
        actionableTargets: [
          { id: "w8-t5", text: "Calculate target aerobic training heart rate zone for different age groups", category: "Practice" },
          { id: "w8-t6", text: "Distinguish health-related components (flexibility, endurance) from skill-related (agility, power)", category: "Concept" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Bernoulli's equation: P + ½ρv² + ρgh = constant",
      "Catalysts speed up both forward and reverse rates equally; they DO NOT alter the equilibrium constant K!",
      "K_p = K_c(RT)^(Δn) where Δn = moles of gaseous products - moles of gaseous reactants",
      "Target training zone: 65% to 85% of MHR (220 - Age)"
    ],
    examTraps: [
      "Including pure solids (s) or pure liquids (l) in equilibrium expressions K_c or K_p. ONLY gases and aqueous species appear!",
      "Assuming temperature increases always increase K. For exothermic reactions, increasing temperature DECREASES K!"
    ],
    keyFormulasToMemorize: [
      "P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2",
      "K_p = K_c(RT)^{\\Delta n}",
      "F_B = \\rho_{\\text{fluid}} V_{\\text{submerged}} g",
      "\\text{MHR} = 220 - \\text{Age}"
    ]
  },

  {
    week: 9,
    semester: 1,
    title: "Week 9: Cell Biology, Molecular Genetics & Reading Strategies",
    focusCourses: ["General Biology", "Communicative English Skills I", "Critical Thinking"],
    tagline: "DNA transcription/translation, Mendelian genetics crosses, and critical reading inferences.",
    estimatedHours: 18,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "biology",
        courseTitle: "Biol 1011 (Molecular Genetics & Mendelian Crosses)",
        topics: [
          "Structure of DNA (Double Helix, Antiparallel Strands, Base-Pairing Rules)",
          "Central Dogma: DNA Replication, Transcription (mRNA), and Translation (Polypeptide)",
          "Mendel's Laws of Segregation and Independent Assortment",
          "Monohybrid and Dihybrid Crosses, Incomplete Dominance, Codominance, and Sex-Linked Inheritance"
        ],
        objectives: [
          "Predict phenotypic and genotypic ratios for X-linked recessive disorders (e.g., hemophilia)",
          "Transcribe and translate given DNA sequences using the genetic codon table"
        ],
        actionableTargets: [
          { id: "w9-t1", text: "Solve 10 Mendelian pedigree charts for autosomal dominant and sex-linked traits", category: "Practice" },
          { id: "w9-t2", text: "Translate a 30-nucleotide mRNA strand into amino acid sequence identifying Start/Stop codons", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "english",
        courseTitle: "EnLa 1011 (Critical Reading & Academic Text Analysis)",
        topics: [
          "Reading Comprehension Strategies: Skimming for Gist vs Scanning for Specific Data",
          "Identifying Authorial Stance, Tone, and Underlying Assumptions",
          "Making Valid Inferences and Distinguishing Facts from Opinion in Scientific Discourse"
        ],
        objectives: [
          "Complete university comprehension passages within tight 12-minute time envelopes",
          "Identify contextual evidence supporting disputed thesis assertions"
        ],
        actionableTargets: [
          { id: "w9-t3", text: "Read 3 university-level research abstracts and answer 15 critical inference questions", category: "Practice" },
          { id: "w9-t4", text: "Identify rhetorical markers indicating academic hedging and cautious claims", category: "Concept" }
        ],
        recommendedPracticeCount: 15
      },
      {
        period: "Evening (2.5h)",
        subject: "critical_thinking",
        courseTitle: "LoCT 1011 (Scientific Reasoning & Inductive Inferences)",
        topics: [
          "Inductive Generalization, Analogical Arguments, and Causal Reasoning (Mill's Methods)",
          "Fallacies of Weak Induction: Hasty Generalization, False Cause (Post Hoc), Slippery Slope"
        ],
        objectives: [
          "Evaluate sample size and representativeness in empirical statistical studies",
          "Detect Post Hoc Ergo Propter Hoc fallacies in published research claims"
        ],
        actionableTargets: [
          { id: "w9-t5", text: "Analyze 8 empirical scenarios using Mill's Methods of Agreement and Difference", category: "Concept" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Directionality: DNA replication and RNA transcription ALWAYS occur in the 5' to 3' direction",
      "Start codon AUG codes for Methionine; Stop codons are UAA, UAG, UGA",
      "Sex-linked recessive conditions are significantly more frequent in human males (XY)",
      "Post hoc fallacy assumes temporal sequence implies causation ('A happened before B, so A caused B')"
    ],
    examTraps: [
      "Transcribing thymine (T) into mRNA. RNA uses URACIL (U) in place of thymine!",
      "Confusing Codominance (AB blood type, both alleles expressed) with Incomplete Dominance (pink snapdragons, blended phenotype)."
    ],
    keyFormulasToMemorize: [
      "\\text{Dihybrid F2 Phenotypic Ratio}: 9:3:3:1",
      "\\text{Monohybrid F2 Phenotypic Ratio}: 3:1 (1:2:1 \\text{ genotypic})"
    ]
  },

  {
    week: 10,
    semester: 1,
    title: "Week 10: Rotational Dynamics, Oscillations & Acid-Base Equilibria",
    focusCourses: ["General Physics I", "General Chemistry", "Mathematics for Natural Sciences"],
    tagline: "Torque, rotational kinetic energy, simple harmonic motion, and pH buffer calculations.",
    estimatedHours: 19,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 (Rotational Dynamics & SHM)",
        topics: [
          "Rotational Kinematics (θ, ω, α) and Torque (τ = r × F = Iα)",
          "Moment of Inertia for Common Geometries and Parallel Axis Theorem (I = I_cm + Md²)",
          "Rotational Kinetic Energy (K_rot = ½Iω²) and Rolling Without Slipping",
          "Simple Harmonic Motion (SHM): Mass-Spring Systems and Simple Pendulum (T = 2π√(L/g))"
        ],
        objectives: [
          "Calculate acceleration of a cylinder rolling down an inclined plane",
          "Determine period and maximum velocity for harmonic oscillators"
        ],
        actionableTargets: [
          { id: "w10-t1", text: "Calculate speed at bottom of incline for hoop, solid cylinder, and sphere", category: "Practice" },
          { id: "w10-t2", text: "Solve 10 Simple Harmonic Motion displacement, velocity, and period problems", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Afternoon (3h)",
        subject: "chemistry",
        courseTitle: "Chem 1011 (Acid-Base Equilibria & Buffer Solutions)",
        topics: [
          "Arrhenius, Brønsted-Lowry, and Lewis Acid-Base Definitions",
          "Self-Ionization of Water (K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C) and pH Scale",
          "Weak Acids (K_a), Weak Bases (K_b), and Percent Ionization",
          "Buffer Solutions and the Henderson-Hasselbalch Equation",
          "Acid-Base Titration Curves and Indicator Selection"
        ],
        objectives: [
          "Calculate pH of weak acid solutions using quadratic or 5% approximation checks",
          "Determine buffer pH change upon addition of strong acid or base"
        ],
        actionableTargets: [
          { id: "w10-t3", text: "Calculate pH of 8 weak acid/base solutions using K_a and Henderson-Hasselbalch", category: "Practice" },
          { id: "w10-t4", text: "Determine buffer capacity and pH change when 0.01 mol HCl is added to buffer", category: "Practice" }
        ],
        recommendedPracticeCount: 20
      },
      {
        period: "Evening (2.5h)",
        subject: "mathematics",
        courseTitle: "Math 1011 (Advanced Calculus Continuity & IVT)",
        topics: [
          "Intermediate Value Theorem (IVT) and Root Existence Proofs",
          "Types of Discontinuities: Removable, Jump, and Essential (Infinite)",
          "Continuous Functions on Closed Intervals and Extreme Value Theorem (EVT)"
        ],
        objectives: [
          "Prove root existence for polynomial equations on bounded intervals using IVT"
        ],
        actionableTargets: [
          { id: "w10-t5", text: "Prove root existence on given intervals for 5 polynomials using IVT", category: "Proof" }
        ],
        recommendedPracticeCount: 15
      }
    ],
    highYieldTopics: [
      "Sphere rolls down fastest, then solid cylinder, then hollow hoop (lowest moment of inertia = highest linear speed)",
      "Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])",
      "Pendulum period T depends ONLY on length L and gravity g, NOT on mass m!",
      "A Lewis acid is an electron-pair acceptor; a Lewis base is an electron-pair donor"
    ],
    examTraps: [
      "Applying Henderson-Hasselbalch equation to a strong acid. It ONLY applies to conjugate weak acid-base pairs!",
      "Forgetting to convert angle to radians when dealing with rotational kinematics."
    ],
    keyFormulasToMemorize: [
      "\\tau = I\\alpha",
      "T = 2\\pi \\sqrt{\\frac{L}{g}}, \\quad T = 2\\pi \\sqrt{\\frac{m}{k}}",
      "\\text{pH} = \\text{pK}_a + \\log \\left( \\frac{[A^-]}{[HA]} \\right)",
      "K_w = [H^+][OH^-] = 1.0 \\times 10^{-14}"
    ]
  },

  {
    week: 11,
    semester: 1,
    title: "Week 11: Final Comprehensive Course Review & Formula Lockdown",
    focusCourses: ["All Semester 1 Courses"],
    tagline: "Systematic synthesis of all 8 common courses: formulas, proofs, traps, and speed drills.",
    estimatedHours: 20,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 Comprehensive Final Review",
        topics: ["Complete course audit: Logic, Sets, Vectors, Matrices, Determinants, Limits, Continuity"],
        objectives: ["Solve 40 mixed university exam problems under 60 minutes"],
        actionableTargets: [
          { id: "w11-t1", text: "Review all 25 core theorem proofs in Mathematics for Natural Sciences", category: "Proof" },
          { id: "w11-t2", text: "Complete 40 mixed Math 1011 review drills with 90%+ accuracy", category: "Practice" }
        ],
        recommendedPracticeCount: 40
      },
      {
        period: "Afternoon (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 & Chem 1011 Comprehensive Review",
        topics: ["Physics Mechanics & Thermal Laws; Chemistry Bonding, Thermo & Equilibria"],
        objectives: ["Consolidate all physics and chemistry governing equations into personal formula sheet"],
        actionableTargets: [
          { id: "w11-t3", text: "Audit and verify all formulas in Physics I and General Chemistry cheat sheets", category: "Concept" },
          { id: "w11-t4", text: "Retake all marked problems from the Mistakes Notebook", category: "Practice" }
        ],
        recommendedPracticeCount: 35
      },
      {
        period: "Evening (2.5h)",
        subject: "critical_thinking",
        courseTitle: "LoCT, CESt, Biol & EnLa Final Review",
        topics: ["Fallacy classifications, Constitutional rights, Genetics ratios, and Academic writing patterns"],
        objectives: ["Lock in definitions and distinction tables across humanities and life sciences"],
        actionableTargets: [
          { id: "w11-t5", text: "Drill 50 flashcards on informal fallacies, ethical theories, and biological pathways", category: "Practice" }
        ],
        recommendedPracticeCount: 50
      }
    ],
    highYieldTopics: [
      "Review the Top 50 most frequently tested concepts in Ethiopian freshman common courses",
      "Re-solve all previous university exam questions with full mathematical rigor"
    ],
    examTraps: [
      "Cramming without active problem solving. Test yourself with closed notes!"
    ],
    keyFormulasToMemorize: [
      "All Master Formula Sheets"
    ]
  },

  {
    week: 12,
    semester: 1,
    title: "Week 12: Official Final Examination Week & Semester 1 Culmination",
    focusCourses: ["All Semester 1 Courses"],
    tagline: "Official University Final Examinations (50% course weight). Deliver peak academic performance.",
    estimatedHours: 15,
    timeBlocks: [
      {
        period: "Morning (3h)",
        subject: "mathematics",
        courseTitle: "Math 1011 Final Examination (50% Weight)",
        topics: ["Official university final examination: Math for Natural Sciences"],
        objectives: ["Execute 50 questions in 90 minutes maintaining high accuracy and strategic pacing"],
        actionableTargets: [
          { id: "w12-t1", text: "Sit official Math 1011 Final Exam (50% weight) with focused time management", category: "Practice" }
        ],
        recommendedPracticeCount: 50
      },
      {
        period: "Afternoon (3h)",
        subject: "physics",
        courseTitle: "Phys 1011 & Chem 1011 Final Examinations",
        topics: ["Official university final examinations: Physics I and Chemistry"],
        objectives: ["Attain 'A' grade standard across all STEM common courses"],
        actionableTargets: [
          { id: "w12-t2", text: "Complete General Physics and Chemistry Finals with thorough step verification", category: "Practice" }
        ],
        recommendedPracticeCount: 50
      },
      {
        period: "Evening (2.5h)",
        subject: "english",
        courseTitle: "EnLa, LoCT, CESt & Biol Final Examinations",
        topics: ["Official university final examinations: English, Logic, Civics, Biology"],
        objectives: ["Conclude Semester 1 with high cumulative Grade Point Average (GPA ≥ 3.75)"],
        actionableTargets: [
          { id: "w12-t3", text: "Complete all remaining course exams and audit final semester GPA", category: "Concept" }
        ],
        recommendedPracticeCount: 50
      }
    ],
    highYieldTopics: [
      "Pacing: Allocate 1 minute per multiple choice question and 10 minutes per essay/problem solving section",
      "Rest and nutrition: Adequate sleep is scientifically proven to boost problem-solving recall by 25%"
    ],
    examTraps: [
      "Rushing through the last 5 questions without checking for sign or unit transfer errors."
    ],
    keyFormulasToMemorize: [
      "Congratulations on completing Semester 1! Prepare for Semester 2 Calculus, Physics II, Organic Chem & Emerging Tech."
    ]
  }
];
