import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  // Mathematics
  {
    id: 'fc-m1',
    subject: 'mathematics',
    category: 'Calculus',
    front: "What is L'Hôpital's Rule and when can it be used?",
    back: "lim [f(x)/g(x)] = lim [f'(x)/g'(x)]. Valid ONLY when direct substitution produces indeterminate forms 0/0 or ∞/∞.",
    hint: "Differentiate numerator and denominator separately."
  },
  {
    id: 'fc-m2',
    subject: 'mathematics',
    category: 'Calculus',
    front: "What is the derivative of f(x) = ln(3x² + 5)?",
    back: "f'(x) = u'/u = (6x) / (3x² + 5).",
    hint: "Chain rule: d/dx[ln(u)] = u'/u."
  },
  {
    id: 'fc-m3',
    subject: 'mathematics',
    category: 'Vectors',
    front: "What is the condition for two vectors u and v to be perpendicular (orthogonal)?",
    back: "Their scalar (dot) product must be zero: u · v = u_x v_x + u_y v_y + u_z v_z = 0.",
    hint: "cos(90°) = 0."
  },
  {
    id: 'fc-m4',
    subject: 'mathematics',
    category: 'Sequences',
    front: "What is the formula for the sum to infinity of a Geometric Progression?",
    back: "S_∞ = a / (1 - r), valid only when the absolute common ratio |r| < 1.",
    hint: "If |r| >= 1, the series diverges."
  },
  {
    id: 'fc-m5',
    subject: 'mathematics',
    category: 'Trigonometry',
    front: "What is the double angle formula for sin(2θ) and cos(2θ)?",
    back: "sin(2θ) = 2 sin(θ) cos(θ)\ncos(2θ) = cos²(θ) - sin²(θ) = 1 - 2sin²(θ) = 2cos²(θ) - 1.",
    hint: "Useful for integrating sin²(x) or cos²(x)."
  },

  // Physics
  {
    id: 'fc-p1',
    subject: 'physics',
    category: 'Kinematics',
    front: "What is the horizontal range formula for projectile motion from ground level?",
    back: "R = (u² sin 2θ) / g. Maximum range occurs at launch angle θ = 45°.",
    hint: "Complementary angles (e.g. 30° & 60°) have identical range."
  },
  {
    id: 'fc-p2',
    subject: 'physics',
    category: 'Mechanics',
    front: "What is the acceleration of a mass sliding down a frictionless incline of angle θ?",
    back: "a = g sin(θ). Mass cancels out completely.",
    hint: "Component of gravity along the slope."
  },
  {
    id: 'fc-p3',
    subject: 'physics',
    category: 'Circuits',
    front: "How do equivalent resistances and capacitances combine in parallel?",
    back: "Resistors in parallel: 1/R_eq = 1/R₁ + 1/R₂ => (R₁R₂)/(R₁+R₂).\nCapacitors in parallel: C_eq = C₁ + C₂ (they add directly!).",
    hint: "Capacitors behave opposite to resistors in series/parallel."
  },
  {
    id: 'fc-p4',
    subject: 'physics',
    category: 'Modern Physics',
    front: "In the photoelectric effect, does increasing light intensity increase the kinetic energy of emitted electrons?",
    back: "NO! Intensity increases the NUMBER of photoelectrons (photocurrent). Kinetic energy depends ONLY on frequency (E = hf - Φ).",
    hint: "Classic AASTU exam trap."
  },
  {
    id: 'fc-p5',
    subject: 'physics',
    category: 'Optics',
    front: "What is Snell's Law and the condition for Total Internal Reflection?",
    back: "Snell's Law: n₁ sin(θ₁) = n₂ sin(θ₂).\nTotal Internal Reflection requires light to go from denser to rarer medium (n₁ > n₂) and incident angle θ₁ > critical angle θ_c (sin θ_c = n₂/n₁).",
    hint: "Light bends away from normal into rarer medium."
  },

  // Chemistry
  {
    id: 'fc-c1',
    subject: 'chemistry',
    category: 'Equilibrium',
    front: "How does increasing temperature affect the equilibrium of an exothermic reaction (ΔH < 0)?",
    back: "It shifts equilibrium to the LEFT (reactants side), reducing the equilibrium constant Kc.",
    hint: "Treat heat as a product on the right side."
  },
  {
    id: 'fc-c2',
    subject: 'chemistry',
    category: 'Acids & Bases',
    front: "What is the relationship between pH, pOH, and [H⁺] at 25°C?",
    back: "pH = -log[H⁺], pOH = -log[OH⁻], pH + pOH = 14, and [H⁺][OH⁻] = 1.0 × 10⁻¹⁴.",
    hint: "Pure water has pH = pOH = 7."
  },
  {
    id: 'fc-c3',
    subject: 'chemistry',
    category: 'Electrochemistry',
    front: "What is the formula for standard cell EMF (E°_cell)?",
    back: "E°_cell = E°_cathode (reduction) - E°_anode (reduction). If E°_cell > 0, the reaction is spontaneous (ΔG° < 0).",
    hint: "Cathode is reduction (Red Cat), Anode is oxidation (An Ox)."
  },
  {
    id: 'fc-c4',
    subject: 'chemistry',
    category: 'Bonding',
    front: "What is the hybridization and bond angle in Methane (CH₄) vs Water (H₂O)?",
    back: "Both central atoms are sp³ hybridized.\nCH₄: 4 bond pairs, 0 lone pairs -> Tetrahedral (109.5°).\nH₂O: 2 bond pairs, 2 lone pairs -> Bent (104.5°).",
    hint: "Lone pairs compress bond angles."
  },

  // Aptitude
  {
    id: 'fc-a1',
    subject: 'aptitude',
    category: 'Work Rate',
    front: "If person A takes X hours and person B takes Y hours to do a job, how long do they take working together?",
    back: "Time together = (X × Y) / (X + Y) hours.",
    hint: "Product divided by sum."
  },
  {
    id: 'fc-a2',
    subject: 'aptitude',
    category: 'Speed & Distance',
    front: "How do you convert speed from km/h to m/s, and vice versa?",
    back: "km/h to m/s: multiply by 5/18 (or divide by 3.6).\nm/s to km/h: multiply by 18/5 (or multiply by 3.6).",
    hint: "72 km/h = 72 × (5/18) = 20 m/s."
  },
  {
    id: 'fc-a3',
    subject: 'aptitude',
    category: 'English Grammar',
    front: "What is the Third Conditional grammatical structure?",
    back: "If + Past Perfect (had + V3), ... would/could/might have + Past Participle (V3).\nExample: 'If I had prepared well, I would have passed.'",
    hint: "Expresses past regrets or unreal past situations."
  }
];
