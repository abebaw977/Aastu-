import { StudyGuideTopic } from '../types';

export const STUDY_GUIDES: StudyGuideTopic[] = [
  {
    id: 'sg-math-1',
    subject: 'mathematics',
    title: 'Differential & Integral Calculus Cheat Sheet',
    summary: 'Calculus makes up approximately 35-40% of the AASTU Mathematics entrance paper. Fast execution of limits, derivative rules, and integration tricks is essential.',
    keyFormulas: [
      {
        name: "L'Hôpital's Rule",
        formula: "\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}",
        description: "Applies ONLY to indeterminate forms (0/0 or ∞/∞). Differentiate numerator and denominator separately.",
        unitsOrNotes: "Do not use quotient rule!"
      },
      {
        name: "Standard Trig Limits",
        formula: "\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k, \\quad \\lim_{x \\to 0} \\frac{\\tan(kx)}{x} = k, \\quad \\lim_{x \\to 0} \\frac{1-\\cos(x)}{x^2} = \\frac{1}{2}",
        description: "Instant limits as x approaches 0.",
        unitsOrNotes: "Angles in radians"
      },
      {
        name: "Derivative of Log & Exponential",
        formula: "\\frac{d}{dx}[\\ln(u)] = \\frac{u'}{u}, \\quad \\frac{d}{dx}[e^u] = u' e^u, \\quad \\frac{d}{dx}[a^x] = a^x \\ln(a)",
        description: "Chain rule derivatives for transcendentals.",
        unitsOrNotes: "a > 0, a ≠ 1"
      },
      {
        name: "Area Between Two Curves",
        formula: "A = \\int_{a}^{b} [f(x) - g(x)] dx \\quad \\text{where } f(x) \\ge g(x)",
        description: "Find intersection points x = a, b first, then integrate Top curve minus Bottom curve.",
        unitsOrNotes: "Area is always strictly positive"
      },
      {
        name: "Integration by Parts",
        formula: "\\int u \\, dv = u v - \\int v \\, du",
        description: "Use LIATE rule to choose u (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential).",
        unitsOrNotes: "LIATE priority for u"
      }
    ],
    mustKnowConcepts: [
      "Extrema: At critical points, f'(x) = 0 or f'(x) does not exist. If f''(x) > 0 -> Local Minimum; if f''(x) < 0 -> Local Maximum.",
      "Tangent line at (x₀, y₀): y - y₀ = f'(x₀)(x - x₀). Normal line slope is -1/f'(x₀).",
      "Definite integral symmetry: For odd functions (f(-x) = -f(x)), ∫_{-a}^{a} f(x) dx = 0. For even functions, ∫_{-a}^{a} f(x) dx = 2 ∫_{0}^{a} f(x) dx."
    ],
    fastSolvingTricks: [
      "For rational functions as x → ∞: compare highest powers. If numerator degree = denominator degree, limit is ratio of leading coefficients.",
      "Integration shortcut: ∫ f'(x)/f(x) dx = ln|f(x)| + C. For instance, ∫ (2x)/(x²+5) dx = ln(x²+5) + C."
    ]
  },
  {
    id: 'sg-math-2',
    subject: 'mathematics',
    title: 'Vectors, Matrices & Coordinate Geometry',
    summary: 'High-yield spatial math: dot and cross products, 2x2/3x3 matrix inverses and determinants, and circle/line geometry.',
    keyFormulas: [
      {
        name: "Vector Dot Product & Angle",
        formula: "\\mathbf{u} \\cdot \\mathbf{v} = u_x v_x + u_y v_y + u_z v_z = |\\mathbf{u}||\\mathbf{v}|\\cos(\\theta)",
        description: "Orthogonality condition: u · v = 0 <=> θ = 90°.",
        unitsOrNotes: "Scalar result"
      },
      {
        name: "Vector Cross Product Magnitude",
        formula: "|\\mathbf{u} \\times \\mathbf{v}| = |\\mathbf{u}||\\mathbf{v}|\\sin(\\theta)",
        description: "Represents the area of the parallelogram formed by u and v. Parallel condition: u × v = 0.",
        unitsOrNotes: "Vector perpendicular to both u and v"
      },
      {
        name: "2x2 Matrix Inverse",
        formula: "A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\implies A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
        description: "Inverse exists if and only if det(A) = ad - bc ≠ 0.",
        unitsOrNotes: "Swap main diagonal, negate off-diagonal"
      },
      {
        name: "General Circle Equation",
        formula: "x^2 + y^2 + 2gx + 2fy + c = 0 \\implies \\text{Center } (-g, -f), \\; r = \\sqrt{g^2 + f^2 - c}",
        description: "Quick extraction of center and radius from expanded form.",
        unitsOrNotes: "Condition: g² + f² - c > 0"
      },
      {
        name: "Infinite Geometric Series Sum",
        formula: "S_\\infty = \\frac{a}{1 - r} \\quad \\text{valid for } |r| < 1",
        description: "Instant sum for convergent geometric series with first term a and ratio r.",
        unitsOrNotes: "If |r| ≥ 1, series diverges"
      }
    ],
    mustKnowConcepts: [
      "Unit vector in direction of v: u_v = v / |v|.",
      "Perpendicular distance from point (x₀, y₀) to line Ax + By + C = 0: d = |Ax₀ + By₀ + C| / √(A² + B²).",
      "Properties of determinants: det(AB) = det(A)·det(B), det(A^T) = det(A), det(kA) = k^n det(A) for n×n matrix."
    ],
    fastSolvingTricks: [
      "To find distance between parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0: d = |C₁ - C₂| / √(A² + B²).",
      "If two rows or columns of a matrix are proportional, det(A) is instantly 0."
    ]
  },
  {
    id: 'sg-phys-1',
    subject: 'physics',
    title: 'Mechanics, Dynamics & Conservation Laws',
    summary: 'The backbone of the AASTU Physics section: 1D/2D kinematics, Newton\'s laws on inclines, conservation of momentum, and work-energy.',
    keyFormulas: [
      {
        name: "Projectile Motion Formulas",
        formula: "T = \\frac{2u\\sin\\theta}{g}, \\quad H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin(2\\theta)}{g}",
        description: "Time of flight, Maximum height, and Horizontal Range. Maximum range occurs at θ = 45°.",
        unitsOrNotes: "Neglecting air resistance"
      },
      {
        name: "Inclined Plane Acceleration",
        formula: "a = g(\\sin\\theta - \\mu_k \\cos\\theta)",
        description: "Acceleration down a rough incline with kinetic friction coefficient μ_k.",
        unitsOrNotes: "Mass m cancels out"
      },
      {
        name: "Work-Energy Theorem",
        formula: "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        description: "Net work done by all forces equals change in kinetic energy.",
        unitsOrNotes: "Joules (J)"
      },
      {
        name: "Conservation of Linear Momentum",
        formula: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2",
        description: "Applies to all isolated collisions. In perfectly elastic collisions, kinetic energy is also conserved.",
        unitsOrNotes: "Vector equation (watch signs!)"
      },
      {
        name: "Power & Velocity",
        formula: "P = \\frac{W}{t} = \\mathbf{F} \\cdot \\mathbf{v} = F v \\cos\\theta",
        description: "Instantaneous power when force F produces velocity v.",
        unitsOrNotes: "Watts (W) = J/s"
      }
    ],
    mustKnowConcepts: [
      "Centripetal acceleration: a_c = v²/r = ω²r. Direction is always toward center, work done by centripetal force is ZERO.",
      "Conservative forces (Gravity, Spring) vs Non-conservative forces (Friction, Drag). Friction converts mechanical energy into thermal energy.",
      "Equilibrium conditions: ΣF = 0 (translational equilibrium) and Στ = 0 (rotational equilibrium)."
    ],
    fastSolvingTricks: [
      "In projectile motion, complementary angles (e.g. 30° and 60°, or 15° and 75°) yield the EXACT same horizontal range R.",
      "Connected masses over light pulley (Atwood machine): a = (m₂ - m₁)g / (m₁ + m₂), Tension T = 2m₁m₂g / (m₁ + m₂)."
    ]
  },
  {
    id: 'sg-phys-2',
    subject: 'physics',
    title: 'Electricity, Magnetism, Waves & Optics',
    summary: 'Critical formulas for DC circuits, capacitors, Lorentz force, Snell\'s law, thin lenses, and photoelectric emission.',
    keyFormulas: [
      {
        name: "Ohm's Law & Power",
        formula: "V = IR, \\quad P = IV = I^2 R = \\frac{V^2}{R}",
        description: "Voltage, current, resistance, and electrical power dissipation.",
        unitsOrNotes: "V (Volts), I (Amperes), R (Ohms)"
      },
      {
        name: "Resistors vs Capacitors Combinations",
        formula: "R_{\\text{series}} = R_1+R_2, \\; \\frac{1}{R_{\\text{par}}} = \\frac{1}{R_1}+\\frac{1}{R_2}; \\quad C_{\\text{par}} = C_1+C_2, \\; \\frac{1}{C_{\\text{ser}}} = \\frac{1}{C_1}+\\frac{1}{C_2}",
        description: "Note: Capacitors add inversely in series and directly in parallel (opposite of resistors!).",
        unitsOrNotes: "Watch out for this classic swap trap"
      },
      {
        name: "Magnetic Force (Lorentz Force)",
        formula: "\\mathbf{F} = q(\\mathbf{v} \\times \\mathbf{B}) \\implies F = qvB\\sin\\theta; \\quad F = ILB\\sin\\theta \\text{ (wire)}",
        description: "Magnetic force is perpendicular to both velocity and magnetic field (does NO work on charge).",
        unitsOrNotes: "Right hand rule for positive charges"
      },
      {
        name: "Snell's Law & Critical Angle",
        formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2, \\quad \\sin\\theta_c = \\frac{n_2}{n_1} \\; (n_1 > n_2)",
        description: "Total internal reflection occurs only when light moves from denser to rarer medium and θ > θ_c.",
        unitsOrNotes: "n_air ≈ 1.0"
      },
      {
        name: "Photoelectric Equation",
        formula: "E = hf = \\Phi + K_{\\max}, \\quad K_{\\max} = e V_s",
        description: "Incident photon energy hf is used to overcome work function Φ, remainder is maximum KE of photoelectron.",
        unitsOrNotes: "h = 6.63×10⁻³⁴ J·s"
      }
    ],
    mustKnowConcepts: [
      "Thin Lens Equation: 1/f = 1/d_o + 1/d_i. Convex lens: f > 0; Concave lens: f < 0. Magnification m = -d_i / d_o.",
      "Doppler Effect: Approaching -> higher frequency (blue shift for light, higher pitch for sound); Receding -> lower frequency.",
      "Kirchhoff's Current Law (KCL): ΣI_in = ΣI_out (charge conservation). Kirchhoff's Voltage Law (KVL): ΣV_loop = 0 (energy conservation)."
    ],
    fastSolvingTricks: [
      "Two identical parallel resistors R || R have equivalent resistance R/2. N identical parallel resistors: R/N.",
      "For sound waves in air: v ≈ 331 + 0.6T (where T is in °C)."
    ]
  },
  {
    id: 'sg-chem-1',
    subject: 'chemistry',
    title: 'General & Physical Chemistry Mastery',
    summary: 'Atomic quantum numbers, VSEPR geometry, gas laws, chemical equilibrium, acids/bases, and electrochemistry.',
    keyFormulas: [
      {
        name: "Ideal Gas Law",
        formula: "PV = nRT = \\frac{m}{M}RT \\implies P M = \\rho R T",
        description: "Relates pressure, volume, moles, and temperature. Gas density ρ = PM / (RT).",
        unitsOrNotes: "T must be in Kelvin!"
      },
      {
        name: "Equilibrium Constant & Le Chatelier",
        formula: "aA + bB \\rightleftharpoons cC + dD \\implies K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}",
        description: "Pure solids and liquids are omitted. K_c depends solely on TEMPERATURE.",
        unitsOrNotes: "Catalyst changes rate, NOT K_c"
      },
      {
        name: "pH and pOH Calculations",
        formula: "\\text{pH} = -\\log[H^+], \\quad \\text{pOH} = -\\log[OH^-], \\quad \\text{pH} + \\text{pOH} = 14 \\text{ at } 25^\\circ\\text{C}",
        description: "Ion product of water K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴.",
        unitsOrNotes: "Log base 10"
      },
      {
        name: "Standard Cell Potential (EMF)",
        formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        description: "Spontaneous galvanic cell requires E°_cell > 0 and ΔG° = -nFE°_cell < 0.",
        unitsOrNotes: "Reduction potentials standard"
      },
      {
        name: "Faraday's Law of Electrolysis",
        formula: "m = \\frac{M \\cdot I \\cdot t}{n \\cdot F}",
        description: "Mass deposited at electrode. F = 96,500 C/mol e⁻.",
        unitsOrNotes: "I in Amps, t in seconds"
      }
    ],
    mustKnowConcepts: [
      "Quantum Numbers: n (1,2,3...), l (0 to n-1: s,p,d,f), m_l (-l to +l), m_s (±1/2).",
      "VSEPR geometries: 2 pairs -> Linear (180°), 3 pairs -> Trigonal planar (120°), 4 pairs (no lone pairs) -> Tetrahedral (109.5°), 4 pairs (1 lone pair) -> Trigonal pyramidal (107°), 4 pairs (2 lone pairs) -> Bent (104.5°).",
      "Buffer solutions resist pH change: Henderson-Hasselbalch equation pH = pKa + log([Conjugate Base]/[Weak Acid])."
    ],
    fastSolvingTricks: [
      "Quick pH trick: If [H⁺] = 1.0 × 10⁻ⁿ, pH = n. If [H⁺] = a × 10⁻ⁿ, pH = n - log(a). E.g., [H⁺] = 2 × 10⁻⁴ => pH = 4 - 0.3 = 3.7.",
      "Le Chatelier: Pressure increase shifts toward FEWER gas moles. Temperature increase shifts toward ENDOTHERMIC direction."
    ]
  },
  {
    id: 'sg-apt-1',
    subject: 'aptitude',
    title: 'Aptitude, Speed Math & English Rules',
    summary: 'Mental math shortcuts for work-rate, speed-distance-time, probability, logic sequences, and high-frequency English grammar rules.',
    keyFormulas: [
      {
        name: "Work-Rate Combined Time",
        formula: "T_{\\text{together}} = \\frac{A \\times B}{A + B}, \\quad \\text{For 3 workers: } \\frac{1}{T} = \\frac{1}{A} + \\frac{1}{B} + \\frac{1}{C}",
        description: "Instant time calculation when two entities work together.",
        unitsOrNotes: "Same time units"
      },
      {
        name: "Speed-Distance-Time Unit Conversion",
        formula: "v (\\text{km/h}) = v (\\text{m/s}) \\times \\frac{18}{5}, \\quad v (\\text{m/s}) = v (\\text{km/h}) \\times \\frac{5}{18}",
        description: "Instant conversion between m/s and km/h without multi-step dimensional analysis.",
        unitsOrNotes: "10 m/s = 36 km/h, 20 m/s = 72 km/h"
      },
      {
        name: "Relative Speed",
        formula: "v_{\\text{rel}} = v_1 + v_2 \\text{ (opposite directions)}, \\quad v_{\\text{rel}} = |v_1 - v_2| \\text{ (same direction)}",
        description: "Used for trains passing each other or closing speed.",
        unitsOrNotes: "Time to meet = Distance / Relative Speed"
      },
      {
        name: "Probability Formula",
        formula: "P(A) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes in sample space}}",
        description: "P(A or B) = P(A) + P(B) - P(A and B). For independent events, P(A and B) = P(A) × P(B).",
        unitsOrNotes: "0 ≤ P(A) ≤ 1"
      }
    ],
    mustKnowConcepts: [
      "English Conditionals: Type 1 (If + Present, ... will + V1), Type 2 (If + Past Simple, ... would + V1), Type 3 (If + Past Perfect, ... would have + V3).",
      "Subject-Verb Agreement: Words joined by 'along with', 'as well as', 'together with' take the verb matching the FIRST subject (e.g. 'The professor, as well as the students, is attending').",
      "Number series differences: Check primary difference (+2, +4, +8), ratio (×3), or squares/cubes (n² + 1)."
    ],
    fastSolvingTricks: [
      "Cross-multiplication for percentage comparison: a/b vs c/d -> compare a·d with b·c.",
      "Train passing a stationary pole: Distance = Length of Train. Train passing a platform/bridge: Distance = Length of Train + Length of Platform."
    ]
  }
];
