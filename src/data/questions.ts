import { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  // ================= MATHEMATICS =================
  {
    id: 'math-1',
    subject: 'mathematics',
    topic: 'Calculus - Limits',
    question: 'Evaluate the limit: \\lim_{x \\to 0} \\frac{\\sin(5x)}{\\tan(2x)}',
    options: [
      'A) 5/2',
      'B) 2/5',
      'C) 0',
      'D) 1'
    ],
    correctAnswer: 0,
    explanation: 'Using the fundamental trigonometric limit \\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1 and \\lim_{u \\to 0} \\frac{\\tan(u)}{u} = 1:\n\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\tan(2x)} = \\lim_{x \\to 0} \\left(\\frac{\\sin(5x)}{5x} \\cdot 5x \\cdot \\frac{2x}{\\tan(2x)} \\cdot \\frac{1}{2x}\\right) = 1 \\cdot 1 \\cdot \\frac{5}{2} = 5/2.\nAlternatively by L\'Hôpital\'s Rule: \\lim_{x \\to 0} \\frac{5\\cos(5x)}{2\\sec^2(2x)} = \\frac{5(1)}{2(1)} = 5/2.',
    shortcutTip: 'For limits of form sin(ax)/tan(bx) or sin(ax)/sin(bx) as x → 0, the answer is directly the coefficient ratio a/b = 5/2.',
    yearReference: 'AASTU Standard Pattern',
    difficulty: 'easy'
  },
  {
    id: 'math-2',
    subject: 'mathematics',
    topic: 'Calculus - Derivatives & Tangents',
    question: 'What is the slope of the tangent line to the curve f(x) = x^3 - 3x^2 + 4x - 5 at the point where x = 2?',
    options: [
      'A) 2',
      'B) 4',
      'C) 6',
      'D) 8'
    ],
    correctAnswer: 1,
    explanation: 'The slope of the tangent is given by the first derivative f\'(x).\nf\'(x) = \\frac{d}{dx}(x^3 - 3x^2 + 4x - 5) = 3x^2 - 6x + 4.\nSubstitute x = 2:\nf\'(2) = 3(2)^2 - 6(2) + 4 = 3(4) - 12 + 4 = 12 - 12 + 4 = 4.',
    shortcutTip: 'Differentiate term by term using power rule nx^(n-1), plug in x = 2 immediately.',
    yearReference: 'AASTU 2022 Pattern',
    difficulty: 'easy'
  },
  {
    id: 'math-3',
    subject: 'mathematics',
    topic: 'Vectors & 3D Geometry',
    question: 'If vector u = (2, -1, 3) and vector v = (1, 4, -2), what is the dot product u · v and are the vectors perpendicular?',
    options: [
      'A) u · v = -8, Not perpendicular',
      'B) u · v = 0, Perpendicular',
      'C) u · v = -8, Perpendicular',
      'D) u · v = 4, Not perpendicular'
    ],
    correctAnswer: 0,
    explanation: 'The dot product u · v = u_x v_x + u_y v_y + u_z v_z.\nu · v = (2)(1) + (-1)(4) + (3)(-2) = 2 - 4 - 6 = -8.\nSince u · v ≠ 0, the vectors are not perpendicular (they are only perpendicular if dot product equals 0).',
    shortcutTip: 'Two vectors are orthogonal if and only if their scalar product is zero. Here (-8 ≠ 0), so not perpendicular.',
    yearReference: 'AASTU Prep Core',
    difficulty: 'easy'
  },
  {
    id: 'math-4',
    subject: 'mathematics',
    topic: 'Calculus - Definite Integrals',
    question: 'Compute the value of the definite integral: \\int_{0}^{2} (3x^2 - 4x + 1) dx',
    options: [
      'A) 2',
      'B) 4',
      'C) 6',
      'D) 8'
    ],
    correctAnswer: 0,
    explanation: 'Antiderivative F(x) = \\int (3x^2 - 4x + 1) dx = x^3 - 2x^2 + x.\nEvaluating from 0 to 2:\nF(2) = (2)^3 - 2(2)^2 + (2) = 8 - 8 + 2 = 2.\nF(0) = 0.\nF(2) - F(0) = 2 - 0 = 2.',
    shortcutTip: 'Integrate: x^3 - 2x^2 + x, plug in 2: 8 - 8 + 2 = 2.',
    yearReference: 'EUEE / AASTU Natural Science',
    difficulty: 'medium'
  },
  {
    id: 'math-5',
    subject: 'mathematics',
    topic: 'Matrices & Determinants',
    question: 'Find the determinant of the 2x2 matrix A = [[4, 3], [2, 5]].',
    options: [
      'A) 14',
      'B) 26',
      'C) -14',
      'D) 10'
    ],
    correctAnswer: 0,
    explanation: 'For a 2x2 matrix [[a, b], [c, d]], det(A) = ad - bc.\ndet(A) = (4)(5) - (3)(2) = 20 - 6 = 14.',
    shortcutTip: 'Main diagonal product minus anti-diagonal product: (4×5) - (3×2) = 14.',
    yearReference: 'AASTU Math Core',
    difficulty: 'easy'
  },
  {
    id: 'math-6',
    subject: 'mathematics',
    topic: 'Sequences & Series',
    question: 'An infinite geometric series has first term a = 12 and common ratio r = 1/3. What is its sum to infinity S_∞?',
    options: [
      'A) 18',
      'B) 16',
      'C) 24',
      'D) 36'
    ],
    correctAnswer: 0,
    explanation: 'For an infinite geometric series with |r| < 1, the sum to infinity is given by:\nS_∞ = \\frac{a}{1 - r} = \\frac{12}{1 - 1/3} = \\frac{12}{2/3} = 12 \\times \\frac{3}{2} = 18.',
    shortcutTip: 'S_∞ = a / (1 - r) = 12 / (2/3) = 18.',
    yearReference: 'AASTU Standard',
    difficulty: 'easy'
  },
  {
    id: 'math-7',
    subject: 'mathematics',
    topic: 'Coordinate Geometry',
    question: 'What is the center and radius of the circle with equation x^2 + y^2 - 6x + 8y = 0?',
    options: [
      'A) Center (3, -4), Radius = 5',
      'B) Center (-3, 4), Radius = 5',
      'C) Center (3, -4), Radius = 25',
      'D) Center (-6, 8), Radius = 10'
    ],
    correctAnswer: 0,
    explanation: 'Complete the square for x and y terms:\n(x^2 - 6x + 9) + (y^2 + 8y + 16) = 0 + 9 + 16\n(x - 3)^2 + (y + 4)^2 = 25\nThis is in standard form (x - h)^2 + (y - k)^2 = r^2.\nCenter (h, k) = (3, -4), Radius r = \\sqrt{25} = 5.',
    shortcutTip: 'Center formula: (-coeff(x)/2, -coeff(y)/2) = (-(-6)/2, -(8)/2) = (3, -4). Radius = √(h² + k² - c) = √(9 + 16 - 0) = 5.',
    yearReference: 'AASTU Prep',
    difficulty: 'medium'
  },
  {
    id: 'math-8',
    subject: 'mathematics',
    topic: 'Trigonometry',
    question: 'If \\sin(\\theta) = 3/5 and \\theta is in quadrant II, what is the value of \\cos(2\\theta)?',
    options: [
      'A) 7/25',
      'B) -7/25',
      'C) 24/25',
      'D) -24/25'
    ],
    correctAnswer: 0,
    explanation: 'Using the double angle identity for cosine:\n\\cos(2\\theta) = 1 - 2\\sin^2(\\theta).\nSince \\sin(\\theta) = 3/5:\n\\cos(2\\theta) = 1 - 2(3/5)^2 = 1 - 2(9/25) = 1 - 18/25 = 7/25.\n(Notice that in this formula we don\'t even need cos(θ) directly!).',
    shortcutTip: 'cos(2θ) = 1 - 2sin²θ = 1 - 2(9/25) = 7/25. Positive regardless of quadrant II because sin²θ is always positive.',
    yearReference: 'AASTU Math Set',
    difficulty: 'medium'
  },
  {
    id: 'math-9',
    subject: 'mathematics',
    topic: 'Calculus - Integration by Substitution',
    question: 'Evaluate \\int 2x e^{x^2} dx',
    options: [
      'A) e^{x^2} + C',
      'B) 2e^{x^2} + C',
      'C) \\frac{1}{2}e^{x^2} + C',
      'D) x^2 e^{x^2} + C'
    ],
    correctAnswer: 0,
    explanation: 'Let u = x^2, then du = 2x dx.\nThe integral transforms into \\int e^u du = e^u + C = e^{x^2} + C.',
    shortcutTip: 'Notice 2x is the exact derivative of x^2. The integral of f\'(x)e^{f(x)} is simply e^{f(x)} + C.',
    yearReference: 'AASTU Calculus',
    difficulty: 'easy'
  },
  {
    id: 'math-10',
    subject: 'mathematics',
    topic: 'Complex Numbers',
    question: 'What is the modulus and principal argument of the complex number z = -1 + i\\sqrt{3}?',
    options: [
      'A) Modulus = 2, Argument = 2π/3',
      'B) Modulus = 2, Argument = π/3',
      'C) Modulus = 4, Argument = 2π/3',
      'D) Modulus = 2, Argument = 5π/6'
    ],
    correctAnswer: 0,
    explanation: 'Modulus |z| = \\sqrt{(-1)^2 + (\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2.\nFor argument: Real part x = -1 < 0, Imaginary part y = \\sqrt{3} > 0 (Quadrant II).\nReference angle \\alpha = \\arctan(\\sqrt{3}/1) = \\pi/3 (60°).\nArgument in Quadrant II = \\pi - \\pi/3 = 2\\pi/3 (120°).',
    shortcutTip: 'Modulus = √(1+3) = 2. Point (-1, √3) is in Quadrant II, so angle is 180° - 60° = 120° = 2π/3.',
    yearReference: 'AASTU Complex Set',
    difficulty: 'medium'
  },

  // ================= PHYSICS =================
  {
    id: 'phys-1',
    subject: 'physics',
    topic: 'Kinematics - Projectile Motion',
    question: 'A ball is launched from ground level with initial speed u = 20 m/s at an angle of 30° to the horizontal. What is the maximum height reached? (Take g = 10 m/s²)',
    options: [
      'A) 5 m',
      'B) 10 m',
      'C) 15 m',
      'D) 20 m'
    ],
    correctAnswer: 0,
    explanation: 'Maximum height H = \\frac{u^2 \\sin^2(\\theta)}{2g}.\nHere u = 20 m/s, \\theta = 30° (so \\sin(30°) = 0.5), g = 10 m/s².\nH = \\frac{(20)^2 \\cdot (0.5)^2}{2(10)} = \\frac{400 \\cdot 0.25}{20} = \\frac{100}{20} = 5\\text{ m}.',
    shortcutTip: 'Vertical velocity u_y = 20 sin(30°) = 10 m/s. Max height = u_y² / (2g) = 100 / 20 = 5 m.',
    yearReference: 'AASTU Physics Core',
    difficulty: 'easy'
  },
  {
    id: 'phys-2',
    subject: 'physics',
    topic: 'Dynamics - Friction on Incline',
    question: 'A 5 kg block rests on a 30° frictionless inclined plane. What is the magnitude of the acceleration down the ramp? (g = 9.8 m/s²)',
    options: [
      'A) 4.9 m/s²',
      'B) 9.8 m/s²',
      'C) 8.5 m/s²',
      'D) 2.45 m/s²'
    ],
    correctAnswer: 0,
    explanation: 'On a frictionless incline of angle \\theta, the component of gravity parallel to the incline is F_{net} = mg \\sin(\\theta).\nBy Newton\'s 2nd Law, a = F_{net}/m = g \\sin(\\theta).\na = 9.8 \\cdot \\sin(30°) = 9.8 \\cdot 0.5 = 4.9\\text{ m/s²}. (Notice mass cancels out!).',
    shortcutTip: 'Frictionless incline acceleration is always a = g sin(θ). 9.8 × 0.5 = 4.9 m/s².',
    yearReference: 'AASTU Mechanics',
    difficulty: 'easy'
  },
  {
    id: 'phys-3',
    subject: 'physics',
    topic: 'Work, Energy & Power',
    question: 'An electric motor lifts a 200 kg load vertically upwards at a constant speed of 3 m/s. What is the power output of the motor? (g = 10 m/s²)',
    options: [
      'A) 6,000 W',
      'B) 600 W',
      'C) 2,000 W',
      'D) 18,000 W'
    ],
    correctAnswer: 0,
    explanation: 'At constant speed, upward tension force F = mg = 200 kg \\times 10 m/s² = 2000 N.\nPower P = F \\cdot v = 2000 N \\times 3 m/s = 6000 W (or 6 kW).',
    shortcutTip: 'P = mgv = 200 × 10 × 3 = 6,000 Watts.',
    yearReference: 'AASTU Physics Set',
    difficulty: 'easy'
  },
  {
    id: 'phys-4',
    subject: 'physics',
    topic: 'DC Circuits & Ohm\'s Law',
    question: 'Two resistors of 6 \\Omega and 12 \\Omega are connected in parallel across a 24 V battery. What is the total current drawn from the battery?',
    options: [
      'A) 6 A',
      'B) 4 A',
      'C) 2 A',
      'D) 8 A'
    ],
    correctAnswer: 0,
    explanation: 'For parallel resistors: R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 12}{6 + 12} = \\frac{72}{18} = 4\\,\\Omega.\nTotal current I = \\frac{V}{R_{eq}} = \\frac{24\\text{ V}}{4\\,\\Omega} = 6\\text{ A}.\nAlternatively, branch currents: I_1 = 24/6 = 4 A, I_2 = 24/12 = 2 A. Total I = 4 + 2 = 6 A.',
    shortcutTip: 'Parallel branch shortcut: I = I_1 + I_2 = (24/6) + (24/12) = 4 + 2 = 6 A.',
    yearReference: 'AASTU Circuit Theory',
    difficulty: 'easy'
  },
  {
    id: 'phys-5',
    subject: 'physics',
    topic: 'Waves & Doppler Effect',
    question: 'A sound source emits a 500 Hz frequency moving at 34 m/s toward a stationary observer. If speed of sound in air is 340 m/s, what frequency does the observer hear?',
    options: [
      'A) 555.6 Hz',
      'B) 450.0 Hz',
      'C) 500.0 Hz',
      'D) 600.0 Hz'
    ],
    correctAnswer: 0,
    explanation: 'Doppler formula when source moves toward stationary observer:\nf\' = f \\left(\\frac{v}{v - v_s}\\right) = 500 \\left(\\frac{340}{340 - 34}\\right) = 500 \\left(\\frac{340}{306}\\right) = 500 \\times 1.1111 = 555.6\\text{ Hz}.',
    shortcutTip: 'Approaching source always increases perceived frequency: 500 × (340/306) ≈ 555.6 Hz.',
    yearReference: 'AASTU Waves',
    difficulty: 'medium'
  },
  {
    id: 'phys-6',
    subject: 'physics',
    topic: 'Optics - Lens Formula',
    question: 'An object is placed 20 cm in front of a converging (convex) lens with a focal length of 10 cm. Where is the image formed and what are its characteristics?',
    options: [
      'A) 20 cm behind the lens, real, inverted, same size',
      'B) 10 cm behind the lens, real, inverted, smaller',
      'C) 20 cm in front of the lens, virtual, upright, magnified',
      'D) At infinity'
    ],
    correctAnswer: 0,
    explanation: 'Using the thin lens equation: 1/f = 1/d_o + 1/d_i\n1/10 = 1/20 + 1/d_i\n1/d_i = 1/10 - 1/20 = 1/20 \\implies d_i = 20\\text{ cm}.\nMagnification m = -d_i/d_o = -20/20 = -1 (same size, inverted, real since d_i > 0).',
    shortcutTip: 'When an object is placed at 2f (2 × 10 = 20 cm), the image is ALWAYS formed at 2f (20 cm) on the other side, real, inverted, and equal in size.',
    yearReference: 'AASTU Optics',
    difficulty: 'medium'
  },
  {
    id: 'phys-7',
    subject: 'physics',
    topic: 'Modern Physics - Photoelectric Effect',
    question: 'In a photoelectric experiment, if the intensity of incident light of frequency f > f_0 is doubled while keeping frequency constant, what happens to the maximum kinetic energy of emitted photoelectrons?',
    options: [
      'A) Remains unchanged',
      'B) Doubles',
      'C) Quadruples',
      'D) Decreases by half'
    ],
    correctAnswer: 0,
    explanation: 'Einstein\'s photoelectric equation: K_{max} = hf - \\Phi.\nK_{max} depends ONLY on the photon frequency f and the metal\'s work function \\Phi, NOT on light intensity.\nDoubling intensity increases the number of photons (and hence the photocurrent), but individual photon energy remains hf, so K_{max} is unchanged.',
    shortcutTip: 'Classic exam trap: Intensity controls current (number of electrons); Frequency controls Kinetic Energy (voltage / speed).',
    yearReference: 'AASTU Modern Physics Trap',
    difficulty: 'medium'
  },
  {
    id: 'phys-8',
    subject: 'physics',
    topic: 'Thermodynamics - Ideal Gas Law',
    question: 'An ideal gas in a sealed container of fixed volume V is heated from 27°C to 327°C. By what factor does its pressure increase?',
    options: [
      'A) 2',
      'B) 12',
      'C) 3',
      'D) 1.5'
    ],
    correctAnswer: 0,
    explanation: 'Gay-Lussac\'s Law for constant volume: P_1/T_1 = P_2/T_2, where temperatures MUST be in Kelvin!\nT_1 = 27 + 273 = 300 K\nT_2 = 327 + 273 = 600 K\nP_2 = P_1 \\times (T_2/T_1) = P_1 \\times (600/300) = 2 P_1.\nThe pressure doubles (increases by a factor of 2).',
    shortcutTip: 'Always convert Celsius to Kelvin before calculating gas laws! 300 K to 600 K is a 2x increase.',
    yearReference: 'AASTU Thermodynamics',
    difficulty: 'medium'
  },

  // ================= CHEMISTRY =================
  {
    id: 'chem-1',
    subject: 'chemistry',
    topic: 'Atomic Structure & Quantum Numbers',
    question: 'Which set of quantum numbers (n, l, m_l, m_s) is NOT allowed for an electron in an atom?',
    options: [
      'A) n = 3, l = 3, m_l = 0, m_s = +1/2',
      'B) n = 3, l = 2, m_l = -1, m_s = -1/2',
      'C) n = 2, l = 1, m_l = -1, m_s = +1/2',
      'D) n = 4, l = 0, m_l = 0, m_s = -1/2'
    ],
    correctAnswer: 0,
    explanation: 'Quantum rules:\n1. Principal quantum number n = 1, 2, 3, ...\n2. Angular momentum quantum number l = 0, 1, ..., (n-1). For n = 3, the maximum value of l is (3-1) = 2 (s, p, d orbitals).\nTherefore, l = 3 is strictly FORBIDDEN when n = 3.',
    shortcutTip: 'Rule: l must always be strictly less than n (l < n). Since l = 3 = n, option A is invalid.',
    yearReference: 'AASTU Chemistry Standard',
    difficulty: 'easy'
  },
  {
    id: 'chem-2',
    subject: 'chemistry',
    topic: 'Chemical Bonding & Hybridization',
    question: 'What is the hybridization and molecular shape of the central atom in Methane (CH₄) vs Ammonia (NH₃)?',
    options: [
      'A) Both are sp³ hybridized; CH₄ is tetrahedral, NH₃ is trigonal pyramidal',
      'B) CH₄ is sp³, NH₃ is sp²; both tetrahedral',
      'C) Both are sp³ hybridized; both tetrahedral',
      'D) CH₄ is sp³, NH₃ is T-shaped'
    ],
    correctAnswer: 0,
    explanation: 'Both CH₄ and NH₃ have steric number 4 (CH₄: 4 bond pairs, 0 lone pairs; NH₃: 3 bond pairs, 1 lone pair) → both sp³ hybridized.\nDue to lone pair-bond pair repulsion in NH₃, its molecular geometry is trigonal pyramidal (bond angle ~107°), while CH₄ is tetrahedral (~109.5°).',
    shortcutTip: 'Steric number = bonds + lone pairs. 4 pairs = sp³. 1 lone pair compresses tetrahedral into trigonal pyramidal.',
    yearReference: 'AASTU Bonding Core',
    difficulty: 'medium'
  },
  {
    id: 'chem-3',
    subject: 'chemistry',
    topic: 'Stoichiometry & Limiting Reactant',
    question: 'In the Haber process: N₂(g) + 3H₂(g) → 2NH₃(g). If 28 g of N₂ (molar mass = 28 g/mol) reacts with 12 g of H₂ (molar mass = 2 g/mol), what is the maximum mass of NH₃ produced? (Molar mass of NH₃ = 17 g/mol)',
    options: [
      'A) 34 g',
      'B) 68 g',
      'C) 17 g',
      'D) 51 g'
    ],
    correctAnswer: 0,
    explanation: 'Moles of N₂ = 28 g / (28 g/mol) = 1.0 mol.\nMoles of H₂ = 12 g / (2 g/mol) = 6.0 mol.\nStoichiometric ratio requires 3 moles of H₂ for 1 mole of N₂.\nFor 1.0 mol N₂, we only need 3.0 mol H₂. We have 6.0 mol H₂ (excess), so N₂ is the LIMITING REACTANT.\n1.0 mol N₂ produces 2.0 mol NH₃.\nMass of NH₃ = 2.0 mol × 17 g/mol = 34 g.',
    shortcutTip: '1 mol N₂ gives 2 mol NH₃ = 2 × 17 = 34 g. H₂ is in excess.',
    yearReference: 'AASTU Stoichiometry',
    difficulty: 'medium'
  },
  {
    id: 'chem-4',
    subject: 'chemistry',
    topic: 'Chemical Equilibrium & Le Chatelier',
    question: 'For the exothermic reaction: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat (ΔH < 0), which change will shift equilibrium to the RIGHT (increasing SO₃ yield)?',
    options: [
      'A) Decreasing temperature and increasing total pressure',
      'B) Increasing temperature and decreasing pressure',
      'C) Adding a positive catalyst',
      'D) Removing SO₂ gas'
    ],
    correctAnswer: 0,
    explanation: 'By Le Chatelier\'s Principle:\n1. Since reaction is exothermic (releases heat), decreasing temperature shifts equilibrium toward the forward exothermic direction (RIGHT).\n2. Gaseous moles: Reactants = 2 + 1 = 3 moles, Products = 2 moles. Increasing pressure shifts toward fewer gas moles (RIGHT).\nBoth factors favor SO₃ production.',
    shortcutTip: 'Exothermic + fewer product gas moles = Lower T + Higher P shifts right.',
    yearReference: 'AASTU Equilibrium Trap',
    difficulty: 'medium'
  },
  {
    id: 'chem-5',
    subject: 'chemistry',
    topic: 'Acids, Bases & pH',
    question: 'What is the pH of a 0.005 M solution of sulfuric acid (H₂SO₄), assuming complete dissociation of both protons?',
    options: [
      'A) 2.0',
      'B) 2.3',
      'C) 3.0',
      'D) 1.0'
    ],
    correctAnswer: 0,
    explanation: 'H₂SO₄ is a diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻.\n[H⁺] = 2 × 0.005 M = 0.01 M = 10⁻² M.\npH = -log[H⁺] = -log(10⁻²) = 2.0.',
    shortcutTip: 'Don\'t forget the factor of 2 for diprotic H₂SO₄: [H⁺] = 2 × 0.005 = 0.01 M = 10⁻² => pH = 2.',
    yearReference: 'AASTU Acid-Base Core',
    difficulty: 'easy'
  },
  {
    id: 'chem-6',
    subject: 'chemistry',
    topic: 'Electrochemistry',
    question: 'Given standard reduction potentials: E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V. What is the standard cell potential (E°_cell) for the Daniell cell: Zn + Cu²⁺ → Zn²⁺ + Cu?',
    options: [
      'A) +1.10 V',
      'B) -1.10 V',
      'C) +0.42 V',
      'D) -0.42 V'
    ],
    correctAnswer: 0,
    explanation: 'Cathode (reduction): Cu²⁺ + 2e⁻ → Cu, E°_cat = +0.34 V\nAnode (oxidation): Zn → Zn²⁺ + 2e⁻, E°_an = -0.76 V\nE°_cell = E°_cathode - E°_anode = +0.34 - (-0.76) = +0.34 + 0.76 = +1.10 V.\nPositive EMF means the reaction is spontaneous.',
    shortcutTip: 'E°_cell = E°_red(cathode) - E°_red(anode) = 0.34 - (-0.76) = 1.10 V.',
    yearReference: 'AASTU Galvanic Cells',
    difficulty: 'easy'
  },
  {
    id: 'chem-7',
    subject: 'chemistry',
    topic: 'Organic Chemistry',
    question: 'What is the IUPAC name of CH₃-CH(CH₃)-CH₂-CH₂-OH?',
    options: [
      'A) 3-methylbutan-1-ol',
      'B) 2-methylbutan-4-ol',
      'C) Isopentyl alcohol',
      'D) 3-methylbutanal'
    ],
    correctAnswer: 0,
    explanation: 'Number the 4-carbon parent chain starting from the end closest to the principal -OH functional group:\nC1: -CH₂-OH\nC2: -CH₂-\nC3: -CH(CH₃)-\nC4: -CH₃\nParent is butan-1-ol with a methyl substituent at carbon 3 -> 3-methylbutan-1-ol.',
    shortcutTip: 'Functional group -OH gets lowest locator number (C1). Substituent methyl is at position 3.',
    yearReference: 'AASTU Organic Nomenclature',
    difficulty: 'easy'
  },

  // ================= APTITUDE & ENGLISH =================
  {
    id: 'apt-1',
    subject: 'aptitude',
    topic: 'Quantitative Aptitude - Work Rate',
    question: 'Abebe can complete a coding assignment in 6 hours, while Chala can complete the same assignment in 3 hours. How long will it take them to finish the assignment working together?',
    options: [
      'A) 2 hours',
      'B) 4.5 hours',
      'C) 1.5 hours',
      'D) 2.5 hours'
    ],
    correctAnswer: 0,
    explanation: 'Rate of Abebe = 1/6 jobs/hr.\nRate of Chala = 1/3 = 2/6 jobs/hr.\nCombined rate = 1/6 + 2/6 = 3/6 = 1/2 jobs/hr.\nTime taken = 1 / (1/2) = 2 hours.',
    shortcutTip: 'Work shortcut formula: Time = (A × B) / (A + B) = (6 × 3) / (6 + 3) = 18 / 9 = 2 hours.',
    yearReference: 'AASTU Aptitude Standard',
    difficulty: 'easy'
  },
  {
    id: 'apt-2',
    subject: 'aptitude',
    topic: 'Logical Reasoning - Number Series',
    question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
    options: [
      'A) 127',
      'B) 125',
      'C) 95',
      'D) 126'
    ],
    correctAnswer: 0,
    explanation: 'Pattern 1: Each term is generated by (2 × previous term + 1):\n3 × 2 + 1 = 7\n7 × 2 + 1 = 15\n15 × 2 + 1 = 31\n31 × 2 + 1 = 63\n63 × 2 + 1 = 127.\n\nPattern 2: The differences are powers of 2: +4, +8, +16, +32, so next difference is +64 -> 63 + 64 = 127.',
    shortcutTip: 'Pattern is 2n + 1 (or 2^(k+1) - 1). 63 × 2 + 1 = 127.',
    yearReference: 'AASTU Logical Patterns',
    difficulty: 'easy'
  },
  {
    id: 'apt-3',
    subject: 'aptitude',
    topic: 'English - Sentence Structure & Conditionals',
    question: 'Choose the correct option to complete the sentence: "If she _______ harder during the semester, she would have passed the AASTU entrance exam with distinction."',
    options: [
      'A) had studied',
      'B) studied',
      'C) has studied',
      'D) would study'
    ],
    correctAnswer: 0,
    explanation: 'This is a Third Conditional sentence expressing an unreal past condition and its hypothetical past result.\nStructure: If + Past Perfect (had + V3), ... would have + V3.\nTherefore, "had studied" is the grammatically correct option.',
    shortcutTip: 'Third conditional pattern: If + had + past participle -> would have + past participle.',
    yearReference: 'AASTU English Grammar',
    difficulty: 'easy'
  },
  {
    id: 'apt-4',
    subject: 'aptitude',
    topic: 'Quantitative Aptitude - Speed, Distance & Time',
    question: 'A train 150 meters long passes an electric pole in 15 seconds. What is the speed of the train in km/h?',
    options: [
      'A) 36 km/h',
      'B) 45 km/h',
      'C) 54 km/h',
      'D) 25 km/h'
    ],
    correctAnswer: 0,
    explanation: 'Distance = Length of train = 150 m.\nTime = 15 s.\nSpeed in m/s = Distance / Time = 150 / 15 = 10 m/s.\nTo convert m/s to km/h, multiply by 18/5 (or 3.6):\nSpeed = 10 × (18/5) = 36 km/h.',
    shortcutTip: 'Conversion rule: m/s to km/h multiply by 18/5. 10 m/s × 3.6 = 36 km/h.',
    yearReference: 'AASTU Aptitude Word Problems',
    difficulty: 'easy'
  },
  {
    id: 'apt-5',
    subject: 'aptitude',
    topic: 'English - Vocabulary in Context',
    question: 'In the sentence: "The engineering team sought a PRAGMATIC solution rather than relying on unproven theoretical models," the word PRAGMATIC most nearly means:',
    options: [
      'A) Practical and realistic',
      'B) Expensive and elaborate',
      'C) Abstract and philosophical',
      'D) Temporary and rushed'
    ],
    correctAnswer: 0,
    explanation: '"Pragmatic" means dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    shortcutTip: 'Context clue: "rather than relying on unproven theoretical models" indicates the opposite of theoretical, which is practical.',
    yearReference: 'AASTU English Vocabulary',
    difficulty: 'easy'
  }
];
