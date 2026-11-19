import { FormulaItem, Subject } from '../types';

const RAW_FRESHMAN_FORMULAS: FormulaItem[] = [
  // ==========================================
  // MATHEMATICS (LOGIC, VECTORS, MATRICES, CALCULUS)
  // ==========================================
  {
    id: 'form-math-1',
    subject: 'mathematics',
    semester: 1,
    topic: 'Propositional Logic',
    category: 'Material Implication Equivalence',
    name: 'Conditional to Disjunction',
    formula: 'p \\rightarrow q \\equiv \\neg p \\lor q',
    variablesExplanation: 'p: hypothesis/antecedent; q: conclusion/consequent',
    description: 'Converts conditional statements into disjunctive form for algebraic truth simplification.',
    examTip: 'Extremely high yield for proving tautologies without writing full truth tables.',
    difficulty: 'Core'
  },
  {
    id: 'form-math-2',
    subject: 'mathematics',
    semester: 1,
    topic: 'Propositional Logic',
    category: 'Contrapositive Equivalence',
    name: 'Contrapositive Law',
    formula: 'p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p',
    variablesExplanation: 'Flips both variables and negates both sides.',
    description: 'An implication and its contrapositive always share identical truth values.',
    examTip: 'The converse (q → p) and inverse (¬p → ¬q) are NOT equivalent to p → q!',
    difficulty: 'Core'
  },
  {
    id: 'form-math-3',
    subject: 'mathematics',
    semester: 1,
    topic: 'Vectors in R³',
    category: 'Cross Product Determinant',
    name: 'Vector Cross Product',
    formula: '\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}',
    variablesExplanation: 'Produces normal vector perpendicular to plane formed by u and v.',
    description: 'Magnitude |u × v| equals area of parallelogram spanned by u and v.',
    examTip: 'Cross product is anti-commutative: u × v = -(v × u).',
    difficulty: 'Core'
  },
  {
    id: 'form-math-4',
    subject: 'mathematics',
    semester: 1,
    topic: 'Matrices & Linear Systems',
    category: 'Determinant Scaling Property',
    name: 'Scalar Determinant Scaling',
    formula: '\\det(k A) = k^n \\det(A)',
    variablesExplanation: 'k: scalar multiplier; n: dimension of square matrix A (n × n)',
    description: 'When multiplying an n × n matrix by a scalar k, the determinant scales by kⁿ.',
    examTip: 'For a 3x3 matrix with det(A)=3: det(2A) = 2³(3) = 24, NOT 6!',
    difficulty: 'Advanced'
  },
  {
    id: 'form-math-5',
    subject: 'mathematics',
    semester: 2,
    topic: 'Differential Calculus',
    category: 'Indeterminate Limits',
    name: 'L\'Hôpital\'s Rule',
    formula: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
    variablesExplanation: 'Applicable when direct substitution yields 0/0 or ±∞/±∞.',
    description: 'Allows taking independent derivatives of numerator and denominator to resolve indeterminate limits.',
    examTip: 'Do NOT use quotient rule! Differentiate f(x) and g(x) separately.',
    difficulty: 'Core'
  },

  // ==========================================
  // GENERAL PHYSICS I & II
  // ==========================================
  {
    id: 'form-phys-1',
    subject: 'physics',
    semester: 1,
    topic: '2D Kinematics',
    category: 'Projectile Motion',
    name: 'Horizontal Range Formula',
    formula: 'R = \\frac{u^2 \\sin(2\\theta)}{g}',
    variablesExplanation: 'u: initial launch velocity; θ: launch angle; g: gravitational acceleration',
    description: 'Calculates maximum horizontal distance reached by projectile returning to launch level.',
    examTip: 'Maximum range occurs at θ = 45°. Complementary angles (e.g., 30° and 60°) achieve equal range.',
    units: 'm',
    difficulty: 'Core'
  },
  {
    id: 'form-phys-2',
    subject: 'physics',
    semester: 1,
    topic: 'Work & Energy',
    category: 'Work-Energy Theorem',
    name: 'Kinetic Energy Theorem',
    formula: 'W_{\\text{net}} = \\Delta K = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2',
    variablesExplanation: 'W_net: total work by all forces; m: mass; v: velocity',
    description: 'The net work done on a particle equals the change in its kinetic energy.',
    examTip: 'Valid for both constant and variable forces along any arbitrary trajectory.',
    units: 'Joules (J)',
    difficulty: 'Core'
  },
  {
    id: 'form-phys-3',
    subject: 'physics',
    semester: 2,
    topic: 'Electrostatics',
    category: 'Gauss\'s Law',
    name: 'Electric Flux Through Closed Surface',
    formula: '\\Phi_E = \\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}',
    variablesExplanation: 'E: electric field vector; dA: normal area element; Q_enc: net enclosed charge; ε₀: permittivity of free space',
    description: 'Fundamental Maxwell equation relating enclosed charge to electric flux.',
    examTip: 'Charges outside the Gaussian surface contribute ZERO to the total net flux integral.',
    difficulty: 'Advanced'
  },
  {
    id: 'form-phys-4',
    subject: 'physics',
    semester: 2,
    topic: 'Electromagnetism',
    category: 'Faraday & Lenz',
    name: 'Induced Electromotive Force (EMF)',
    formula: '\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}',
    variablesExplanation: 'N: number of turns; Φ_B = B A cos θ: magnetic flux through coil',
    description: 'Calculates induced voltage generated by changing magnetic field or area.',
    examTip: 'The negative sign represents Lenz\'s law: induced current opposes the original flux variation.',
    units: 'Volts (V)',
    difficulty: 'Core'
  },

  // ==========================================
  // GENERAL CHEMISTRY I & II
  // ==========================================
  {
    id: 'form-chem-1',
    subject: 'chemistry',
    semester: 1,
    topic: 'Chemical Thermodynamics',
    category: 'Gibbs Free Energy',
    name: 'Spontaneity Equation',
    formula: '\\Delta G = \\Delta H - T\\Delta S',
    variablesExplanation: 'ΔH: enthalpy change; T: absolute Kelvin temperature; ΔS: entropy change',
    description: 'Governs spontaneity of chemical reactions at constant temperature and pressure.',
    examTip: 'Spontaneous when ΔG < 0. Reaction is spontaneous at all T when ΔH < 0 and ΔS > 0.',
    units: 'kJ/mol',
    difficulty: 'Core'
  },
  {
    id: 'form-chem-2',
    subject: 'chemistry',
    semester: 1,
    topic: 'Chemical Equilibrium',
    category: 'Gas Phase Equilibrium',
    name: 'Kp to Kc Conversion',
    formula: 'K_p = K_c (RT)^{\\Delta n}',
    variablesExplanation: 'R = 0.0821 L·atm/(mol·K); T: Kelvin temperature; Δn = moles(gas products) - moles(gas reactants)',
    description: 'Converts partial pressure equilibrium constant to molar concentration constant.',
    examTip: 'When Δn = 0 (equal moles of gas on both sides), Kp = Kc!',
    difficulty: 'Core'
  },
  {
    id: 'form-chem-3',
    subject: 'chemistry',
    semester: 1,
    topic: 'Acid-Base Equilibria',
    category: 'Buffer Solutions',
    name: 'Henderson-Hasselbalch Equation',
    formula: '\\text{pH} = \\text{pK}_a + \\log \\left( \\frac{[\\text{Conjugate Base } A^-]}{[\\text{Weak Acid } HA]} \\right)',
    variablesExplanation: 'pKa = -log(Ka); [A⁻] and [HA] are equilibrium molar concentrations',
    description: 'Calculates the pH of buffer solutions resisting change upon acid/base additions.',
    examTip: 'When [A⁻] = [HA], pH = pKa (ideal buffer point, half-equivalence point in titration).',
    difficulty: 'Core'
  },

  // ==========================================
  // LOGIC & CRITICAL THINKING
  // ==========================================
  {
    id: 'form-loct-1',
    subject: 'critical_thinking',
    semester: 1,
    topic: 'Deductive Inference',
    category: 'Valid Inference Rules',
    name: 'Modus Ponens & Modus Tollens',
    formula: '\\text{MP: } p \\rightarrow q, \\; p \\; \\vdash \\; q \\qquad \\text{MT: } p \\rightarrow q, \\; \\neg q \\; \\vdash \\; \\neg p',
    variablesExplanation: 'MP: Affirming the Antecedent; MT: Denying the Consequent',
    description: 'Two fundamental forms of universally valid deductive arguments.',
    examTip: 'Do NOT confuse with Affirming the Consequent (p → q, q ⊢ p) which is an invalid fallacy!',
    difficulty: 'Core'
  },

  // ==========================================
  // PHYSICAL FITNESS & HEALTH
  // ==========================================
  {
    id: 'form-spsc-1',
    subject: 'fitness',
    semester: 1,
    topic: 'Cardiorespiratory Training Zones',
    category: 'Karvonen Formula',
    name: 'Target Heart Rate Reserve',
    formula: 'HR_{\\text{target}} = HR_{\\text{rest}} + \\%\\text{Intensity} \\times (HR_{\\text{max}} - HR_{\\text{rest}})',
    variablesExplanation: 'HR_max = 220 - Age; HR_rest = resting heart rate measured upon waking',
    description: 'Calculates the optimal aerobic training zone (typically 65%–85% intensity) for cardiorespiratory fitness development.',
    examTip: 'Karvonen is more accurate than simple percentage of HRmax because it factors in baseline resting heart rate.',
    difficulty: 'Core'
  },

  // ==========================================
  // APPLIED MATHEMATICS II / CALCULUS
  // ==========================================
  {
    id: 'form-math2-1',
    subject: 'math_applied_2',
    semester: 2,
    topic: 'Integral Calculus',
    category: 'Integration Techniques',
    name: 'Integration by Parts Formula',
    formula: '\\int u \\, dv = u v - \\int v \\, du',
    variablesExplanation: 'Choose u using LIATE priority: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential',
    description: 'Derived from the product rule of differentiation; converts complicated products into simpler integrable terms.',
    examTip: 'Always differentiate u to get du, and integrate dv to get v.',
    difficulty: 'Core'
  },
  {
    id: 'form-math2-2',
    subject: 'math_applied_2',
    semester: 2,
    topic: 'Differential Calculus',
    category: 'Indeterminate Limits',
    name: 'L\'Hôpital\'s Rule',
    formula: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
    variablesExplanation: 'Valid ONLY when the direct limit yields indeterminate forms 0/0 or ±∞/±∞.',
    description: 'Differentiates the numerator and denominator independently until a determinate limit value emerges.',
    examTip: 'Differentiate top and bottom separately! Do NOT use the quotient rule here.',
    difficulty: 'Core'
  },

  // ==========================================
  // GENERAL PHYSICS II
  // ==========================================
  {
    id: 'form-phys2-1',
    subject: 'physics_2',
    semester: 2,
    topic: 'Electrostatics',
    category: 'Electric Flux & Charge',
    name: 'Gauss\'s Law of Electrostatics',
    formula: '\\Phi_E = \\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}',
    variablesExplanation: 'ΦE: total electric flux; Q_enc: net charge enclosed inside Gaussian surface; ε₀: permittivity of free space',
    description: 'Relates electric flux passing through an arbitrary closed surface to the net electric charge enclosed.',
    examTip: 'Inside any charged static conducting sphere, Q_enc = 0 so E = 0 always!',
    difficulty: 'Core'
  },
  {
    id: 'form-phys2-2',
    subject: 'physics_2',
    semester: 2,
    topic: 'Electromagnetism',
    category: 'Electromagnetic Induction',
    name: 'Faraday\'s Law of Induction with Lenz\'s Law',
    formula: '\\mathcal{E} = -N \\frac{d\\Phi_B}{dt} = -N \\frac{d}{dt} [B A \\cos\\theta]',
    variablesExplanation: 'N: number of turns; ΦB = B·A: magnetic flux; negative sign represents Lenz\'s Law opposition',
    description: 'A time-varying magnetic flux through a conducting loop induces an electromotive force (EMF).',
    examTip: 'Be careful with θ: it is the angle between the magnetic field B and the normal vector to the coil area!',
    difficulty: 'Core'
  },

  // ==========================================
  // GENERAL CHEMISTRY II
  // ==========================================
  {
    id: 'form-chem2-1',
    subject: 'chemistry_2',
    semester: 2,
    topic: 'Electrochemistry',
    category: 'Non-Standard Cell Potential',
    name: 'Nernst Equation at 298 K',
    formula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n} \\log Q',
    variablesExplanation: 'E°cell: standard cell EMF; n: moles of electrons transferred; Q: reaction quotient',
    description: 'Determines electrochemical cell potential under non-standard conditions of concentration and pressure.',
    examTip: 'At chemical equilibrium, E_cell = 0 and Q = K_eq, so E°cell = (0.0592/n) log K.',
    difficulty: 'Core'
  },

  // ==========================================
  // GENERAL BIOLOGY II
  // ==========================================
  {
    id: 'form-biol-1',
    subject: 'biology_2',
    semester: 2,
    topic: 'Population Genetics',
    category: 'Hardy-Weinberg Equilibrium',
    name: 'Allele and Genotype Frequencies',
    formula: 'p + q = 1, \\quad p^2 + 2pq + q^2 = 1',
    variablesExplanation: 'p: dominant allele frequency; q: recessive allele frequency; p²: homozygous dominant; 2pq: heterozygous; q²: homozygous recessive',
    description: 'Predicts stable genotype frequencies in large, randomly mating populations in absence of evolutionary forces.',
    examTip: 'Always calculate q first by taking the square root of the recessive phenotype frequency q²!',
    difficulty: 'Core'
  },
  {
    id: 'form-biol-2',
    subject: 'biology_2',
    semester: 2,
    topic: 'Population Ecology',
    category: 'Population Growth Dynamics',
    name: 'Logistic Population Growth Model',
    formula: '\\frac{dN}{dt} = r N \\left( \\frac{K - N}{K} \\right)',
    variablesExplanation: 'N: population size; r: intrinsic per capita growth rate; K: environmental carrying capacity',
    description: 'Describes sigmoidal (S-shaped) population growth as resources become limiting near carrying capacity K.',
    examTip: 'The maximum absolute growth rate (inflection point) occurs when N = K / 2.',
    difficulty: 'Core'
  },

  // ==========================================
  // GEOGRAPHY OF ETHIOPIA
  // ==========================================
  {
    id: 'form-geo-1',
    subject: 'geography',
    semester: 2,
    topic: 'Climatology of the Horn',
    category: 'Atmospheric Environmental Lapse Rate',
    name: 'Normal Temperature Lapse Rate in Highlands',
    formula: 'T_h = T_0 - \\left( 0.6^\\circ\\text{C} \\times \\frac{h - h_0}{100\\text{ m}} \\right)',
    variablesExplanation: 'T_h: temperature at altitude h; T_0: base temperature; h: altitude in meters',
    description: 'Quantifies the temperature drop with elevation in the Ethiopian highlands, explaining the zonation from Bereha to Wurch.',
    examTip: 'Every 1,000 meters elevation gain reduces temperature by approximately 6°C.',
    difficulty: 'Core'
  },

  // ==========================================
  // EMERGING TECHNOLOGIES / ICT
  // ==========================================
  {
    id: 'form-emte-1',
    subject: 'emerging_tech',
    semester: 2,
    topic: 'Artificial Intelligence & Neural Networks',
    category: 'Perceptron Activation Model',
    name: 'Artificial Neuron Linear Combination',
    formula: 'y = \\sigma \\left( \\sum_{i=1}^{n} w_i x_i + b \\right)',
    variablesExplanation: 'x_i: input features; w_i: synaptic weights; b: bias; σ: non-linear activation function (e.g. ReLU, Sigmoid)',
    description: 'Foundational mathematical neuron equation driving deep learning layers in computer vision and natural language processing.',
    examTip: 'The bias term b shifts the activation function left or right along the input axis.',
    difficulty: 'Core'
  },

  // ==========================================
  // ECONOMICS
  // ==========================================
  {
    id: 'form-econ-1',
    subject: 'economics',
    semester: 1,
    topic: 'Microeconomics & Elasticity',
    category: 'Price Elasticity of Demand',
    name: 'Point & Midpoint Price Elasticity',
    formula: 'E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} = \\frac{dQ_d}{dP} \\cdot \\frac{P}{Q_d}',
    variablesExplanation: 'Q_d: quantity demanded; P: market price',
    description: 'Measures the responsiveness of quantity demanded of a good to a change in its price.',
    examTip: 'If |E_d| > 1 demand is Elastic; if |E_d| < 1 demand is Inelastic; if |E_d| = 1 demand is Unit Elastic.',
    difficulty: 'Core'
  },
  {
    id: 'form-econ-2',
    subject: 'economics',
    semester: 1,
    topic: 'Macroeconomics & National Income',
    category: 'Expenditure Approach to GDP',
    name: 'Gross Domestic Product Identity',
    formula: '\\text{GDP} = C + I + G + (X - M)',
    variablesExplanation: 'C: Household Consumption; I: Gross Private Investment; G: Government Purchases; X: Exports; M: Imports',
    description: 'Total market value of all final goods and services produced within a country’s borders in a given period.',
    examTip: 'Transfer payments (pensions, subsidies) and intermediate goods are excluded from GDP!',
    difficulty: 'Core'
  },

  // ==========================================
  // ENTREPREUNER
  // ==========================================
  {
    id: 'form-entr-1',
    subject: 'entrepreneur',
    semester: 2,
    topic: 'Financial Analysis & Startup Planning',
    category: 'Break-Even Analysis',
    name: 'Break-Even Quantity Formula',
    formula: 'Q_{\\text{BEP}} = \\frac{\\text{FC}}{P - \\text{VC}}',
    variablesExplanation: 'FC: Total Fixed Costs; P: Selling Price per unit; VC: Variable Cost per unit',
    description: 'Determines the exact sales volume in units required to cover all fixed and variable costs.',
    examTip: 'The denominator (P - VC) is the Contribution Margin per unit.',
    difficulty: 'Core'
  },

  // ==========================================
  // MATHSSCO
  // ==========================================
  {
    id: 'form-msco-1',
    subject: 'math_social',
    semester: 1,
    topic: 'Financial & Business Mathematics',
    category: 'Compound Interest & Marginal Profit',
    name: 'Compound Growth & Marginal Profit Condition',
    formula: 'A = P\\left(1 + \\frac{r}{m}\\right)^{mt}, \\quad \\Pi\'(Q) = \\text{MR}(Q) - \\text{MC}(Q) = 0',
    variablesExplanation: 'P: principal; r: annual nominal rate; m: compounding periods per year; t: years',
    description: 'Governs compound interest accumulation and profit optimization in social and business sciences.',
    examTip: 'Profit is maximized where Marginal Revenue (MR) equals Marginal Cost (MC).',
    difficulty: 'Core'
  }
];

export const ALL_FRESHMAN_FORMULAS: FormulaItem[] = RAW_FRESHMAN_FORMULAS.map((f) => {
  const mappedSubj: Subject =
    f.subject === 'physics_2'
      ? 'physics'
      : f.subject === 'chemistry_2'
      ? 'chemistry'
      : f.subject === 'biology_2'
      ? 'biology'
      : f.subject === 'geography_history'
      ? 'geography'
      : f.subject;
  return {
    ...f,
    subject: mappedSubj,
  };
});

