import { FormulaItem } from '../../types';

export const CHEMISTRY_FORMULAS: FormulaItem[] = [
  // 1. ATOMIC STRUCTURE & QUANTUM
  {
    id: 'cf-at-01',
    subject: 'chemistry',
    topic: 'Atomic Structure',
    category: 'Quantum Chemistry',
    name: "Rydberg Formula for Hydrogen Transitions",
    formula: "\\frac{1}{\\lambda} = R_H Z^2 \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)",
    variablesExplanation: "R_H = 1.097×10⁷ m⁻¹, n_1 < n_2 are positive integers, Z = atomic number",
    description: "Calculates spectral line wavelengths in hydrogen and hydrogen-like ions.",
    examTip: "Lyman series (n_1 = 1) -> UV; Balmer series (n_1 = 2) -> Visible; Paschen series (n_1 = 3) -> Infrared.",
    difficulty: 'Core'
  },
  {
    id: 'cf-at-02',
    subject: 'chemistry',
    topic: 'Atomic Structure',
    category: 'Quantum Chemistry',
    name: "Four Quantum Numbers Permitted Rules",
    formula: "n \\in \\{1, 2, 3\\dots\\}, \\; l \\in \\{0, \\dots, n-1\\}, \\; m_l \\in \\{-l, \\dots, +l\\}, \\; m_s = \\pm \\frac{1}{2}",
    variablesExplanation: "n = energy level, l = subshell shape (0=s, 1=p, 2=d, 3=f), m_l = orientation, m_s = spin",
    description: "Uniquely defines the quantum state of any electron according to the Pauli Exclusion Principle.",
    examTip: "Maximum electrons in shell n: 2n². Maximum electrons in subshell l: 2(2l + 1).",
    difficulty: 'Core'
  },

  // 2. STOICHIOMETRY & SOLUTIONS
  {
    id: 'cf-st-01',
    subject: 'chemistry',
    topic: 'Stoichiometry & Solutions',
    category: 'Concentration Units',
    name: "Molarity, Molality & Mole Fraction",
    formula: "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{m_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_{\\text{total}}}",
    variablesExplanation: "n = moles = mass/molar mass, V = volume in Liters",
    units: "M (mol/L), m (mol/kg)",
    description: "Primary quantitative concentration measures in analytical chemistry.",
    examTip: "Molarity changes with temperature (due to volume expansion); Molality and Mole Fraction are temperature-independent.",
    difficulty: 'Core'
  },
  {
    id: 'cf-st-02',
    subject: 'chemistry',
    topic: 'Stoichiometry & Solutions',
    category: 'Concentration Units',
    name: "Dilution Formula & Molarity from Density",
    formula: "M_1 V_1 = M_2 V_2, \\quad M = \\frac{\\%(\\text{w/w}) \\times \\text{density}(\\text{g/mL}) \\times 10}{\\text{Molar Mass}}",
    variablesExplanation: "%(w/w) = mass percentage, density in g/mL",
    description: "Conservation of moles during dilution, and instant conversion from bottle percentage assay to molarity.",
    examTip: "The '% × d × 10 / M' shortcut solves commercial acid molarity questions in 10 seconds.",
    difficulty: 'Advanced'
  },

  // 3. GAS LAWS
  {
    id: 'cf-gas-01',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Gas Laws',
    name: "Ideal Gas Law & Gas Density",
    formula: "P V = n R T = \\frac{m}{M} R T \\implies P M = \\rho R T \\iff \\rho = \\frac{P M}{R T}",
    variablesExplanation: "R = 0.0821 L·atm/(mol·K) = 8.314 J/(mol·K), M = molar mass, ρ = density (g/L)",
    description: "Equation of state for ideal gases relating pressure, volume, temperature, and molecular density.",
    examTip: "At STP (0°C = 273.15 K, 1 atm): 1 mole of any ideal gas occupies exactly 22.4 Liters.",
    difficulty: 'Core'
  },
  {
    id: 'cf-gas-02',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Gas Laws',
    name: "Dalton's Partial Pressure & Graham's Effusion Law",
    formula: "P_A = X_A P_{\\text{total}}, \\quad \\frac{\\text{Rate}_1}{\\text{Rate}_2} = \\sqrt{\\frac{M_2}{M_1}} = \\sqrt{\\frac{\\rho_2}{\\rho_1}}",
    variablesExplanation: "X_A = mole fraction, M_1, M_2 = molar masses of gases",
    description: "Partial pressure fraction and inverse-square-root relation for gas effusion/diffusion rates.",
    examTip: "Lighter gases (smaller M) always effuse and diffuse faster than heavier gases.",
    difficulty: 'Core'
  },

  // 4. THERMODYNAMICS & EQUILIBRIUM
  {
    id: 'cf-eq-01',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Chemical Equilibrium',
    name: "Equilibrium Constant Relation (Kp vs Kc)",
    formula: "K_p = K_c (R T)^{\\Delta n_g}, \\quad \\Delta n_g = \\sum n_{\\text{gas, products}} - \\sum n_{\\text{gas, reactants}}",
    variablesExplanation: "R = 0.0821 L·atm/(mol·K), T in Kelvin",
    description: "Converts partial pressure equilibrium constant Kp to molar concentration constant Kc.",
    examTip: "If Δn_g = 0 (same gas moles on both sides), Kp = Kc and pressure change has NO effect on equilibrium position.",
    difficulty: 'Core'
  },
  {
    id: 'cf-eq-02',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Thermodynamics',
    name: "Gibbs Free Energy & Equilibrium Spontaneity",
    formula: "\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ = -R T \\ln K_{\\text{eq}}",
    variablesExplanation: "ΔH = enthalpy, ΔS = entropy, R = 8.314 J/mol·K, K_eq = equilibrium constant",
    description: "Criterion for spontaneity at constant T and P. Spontaneous when ΔG < 0.",
    examTip: "If ΔH < 0 and ΔS > 0 => Spontaneous at ALL temperatures. If ΔH > 0 and ΔS < 0 => Non-spontaneous at all temperatures.",
    difficulty: 'Core'
  },

  // 5. CHEMICAL KINETICS
  {
    id: 'cf-kin-01',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Chemical Kinetics',
    name: "First-Order Integrated Rate Law & Half-Life",
    formula: "\\ln\\left(\\frac{[A]_0}{[A]_t}\\right) = k t \\implies [A]_t = [A]_0 e^{-k t}, \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}",
    variablesExplanation: "[A]_0 = initial concentration, k = rate constant (s⁻¹)",
    description: "First-order kinetics where half-life is strictly INDEPENDENT of initial concentration.",
    examTip: "Zero-order half-life: t_1/2 = [A]_0 / (2k). Second-order half-life: t_1/2 = 1 / (k [A]_0).",
    difficulty: 'Core'
  },
  {
    id: 'cf-kin-02',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Chemical Kinetics',
    name: "Arrhenius Equation for Temperature Dependence",
    formula: "k = A e^{-E_a / (R T)} \\implies \\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)",
    variablesExplanation: "E_a = activation energy (J/mol), A = pre-exponential frequency factor",
    description: "Models exponential increase in reaction rate constant with temperature.",
    examTip: "A catalyst provides an alternative mechanism with LOWER E_a, thereby increasing k without affecting ΔH or K_eq.",
    difficulty: 'Advanced'
  },

  // 6. ACIDS, BASES & BUFFERS
  {
    id: 'cf-ac-01',
    subject: 'chemistry',
    topic: 'Inorganic Chemistry',
    category: 'Acids & Bases',
    name: "pH, pOH & Water Autoionization",
    formula: "\\text{pH} = -\\log[\\text{H}^+], \\quad \\text{pOH} = -\\log[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14.00 \\; (\\text{at } 25^\\circ\\text{C})",
    variablesExplanation: "K_w = [H⁺][OH⁻] = 1.0×10⁻¹⁴ at 25°C",
    description: "Logarithmic scale for acidity and basicity in aqueous solutions.",
    examTip: "If [H⁺] = 3.0×10⁻⁵ M, pH = 5 - log(3) = 5 - 0.48 = 4.52.",
    difficulty: 'Core'
  },
  {
    id: 'cf-ac-02',
    subject: 'chemistry',
    topic: 'Inorganic Chemistry',
    category: 'Acids & Bases',
    name: "Henderson-Hasselbalch Buffer Equation",
    formula: "\\text{pH} = \\text{p}K_a + \\log\\left( \\frac{[\\text{Conjugate Base } A^-]}{[\\text{Weak Acid } HA]} \\right)",
    variablesExplanation: "pK_a = -log(K_a)",
    description: "Calculates the pH of a buffer solution composed of a weak acid and its conjugate salt.",
    examTip: "When [A⁻] = [HA], pH = pKa (optimal buffer capacity point).",
    difficulty: 'Core'
  },
  {
    id: 'cf-ac-03',
    subject: 'chemistry',
    topic: 'Inorganic Chemistry',
    category: 'Acids & Bases',
    name: "Weak Acid Dissociation [H+] Shortcut",
    formula: "[\\text{H}^+] = \\sqrt{K_a \\cdot C_a} \\implies \\text{pH} = \\frac{1}{2}(\\text{p}K_a - \\log C_a)",
    variablesExplanation: "C_a = initial molar concentration of weak acid (valid when ionization < 5%)",
    description: "Instant formula for monoprotic weak acid pH without solving quadratic equations.",
    examTip: "For 0.1 M acetic acid (Ka = 1.8×10⁻⁵): [H⁺] = √(1.8×10⁻⁶) = 1.34×10⁻³ M => pH ≈ 2.87.",
    difficulty: 'Advanced'
  },

  // 7. ELECTROCHEMISTRY
  {
    id: 'cf-el-01',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Electrochemistry',
    name: "Standard Cell Potential & Nernst Equation",
    formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}, \\quad E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n}\\log Q \\; (\\text{at } 298\\text{ K})",
    variablesExplanation: "n = moles of electrons transferred, Q = reaction quotient",
    units: "Potential in Volts (V)",
    description: "Calculates cell voltage under non-standard concentration conditions.",
    examTip: "At equilibrium: E_cell = 0 and Q = K_eq => E°_cell = (0.0592/n) log K_eq.",
    difficulty: 'Core'
  },
  {
    id: 'cf-el-02',
    subject: 'chemistry',
    topic: 'Physical Chemistry',
    category: 'Electrochemistry',
    name: "Faraday's Laws of Electrolysis",
    formula: "m = \\frac{M \\cdot I \\cdot t}{n \\cdot F}, \\quad Q = I \\cdot t",
    variablesExplanation: "M = molar mass (g/mol), I = current (Amps), t = time (seconds), n = valence electrons, F = 96,500 C/mol e⁻",
    description: "Calculates the mass of substance deposited or liberated at an electrode during electrolysis.",
    examTip: "Always ensure time t is in SECONDS before computing.",
    difficulty: 'Core'
  }
];
