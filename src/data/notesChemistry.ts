import { MasterNoteChapter } from '../types';

export const CHEMISTRY_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'chem-ch1-bonding-structure',
    subject: 'chemistry',
    chapterNumber: 1,
    title: 'Atomic Structure, Chemical Bonding & Molecular Geometry',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Quantum numbers, electron configurations, periodic trends, VSEPR theory, hybridization (sp, sp2, sp3, sp3d, sp3d2), dipole moments, and intermolecular forces.',
    estimatedReadTimeMinutes: 26,
    sections: [
      {
        id: 'chem-1-1-quantum-trends',
        heading: '1.1 Quantum Numbers, Orbitals & Periodic Trends',
        content: `### The 4 Quantum Numbers:
1. **Principal ($n$)**: Main energy level / shell ($n = 1, 2, 3, \\dots$). Max electrons in shell = $2n^2$.
2. **Angular Momentum ($\\ell$)**: Subshell orbital shape ($\\ell = 0$ to $n-1$).
   - $\\ell = 0$ ($s$, spherical), $\\ell = 1$ ($p$, dumbbell), $\\ell = 2$ ($d$, cloverleaf), $\\ell = 3$ ($f$).
3. **Magnetic ($m_\\ell$)**: Spatial orientation ($- \\ell \\le m_\\ell \\le +\\ell$). Number of orbitals = $2\\ell + 1$.
4. **Spin ($m_s$)**: Electron intrinsic spin ($+\\frac{1}{2}$ or $-\\frac{1}{2}$).

### Electronic Configuration Principles:
- **Aufbau Principle**: Electrons fill lowest energy orbitals first ($1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p$).
- **Pauli Exclusion Principle**: No two electrons in an atom can have the same set of 4 quantum numbers.
- **Hund's Rule of Maximum Multiplicity**: Orbitals of equal energy (degenerate) are each occupied with one electron with parallel spin before any orbital is doubly occupied.
- *Exceptions (Half-filled & Fully-filled $d$-subshell stability)*:
  - Chromium ($Z=24$): $[\text{Ar}] 4s^1 3d^5$ (not $4s^2 3d^4$)
  - Copper ($Z=29$): $[\text{Ar}] 4s^1 3d^{10}$ (not $4s^2 3d^9$)

### Periodic Trends Summary:
- **Atomic Radius**: Increases DOWN a group (more shells), DECREASES across a period (greater effective nuclear charge $Z_{\\text{eff}}$).
- **Ionization Energy & Electronegativity**: Decreases DOWN a group, INCREASES across a period (Fluorine is most electronegative with value 4.0).
- **Electron Affinity**: Most exothermic for Halogens (Chlorine has higher electron affinity than Fluorine due to smaller electron-electron repulsion in 3p vs 2p).`,
        equations: [
          {
            name: "Effective Nuclear Charge",
            formula: "Z_{\\text{eff}} = Z - S",
            explanation: "Where $Z$ is nuclear charge (atomic number) and $S$ is core shielding electrons."
          },
          {
            name: "Steric Number & Hybridization",
            formula: "\\text{Steric Number} = (\\text{Number of } \\sigma \\text{ bonds}) + (\\text{Lone pairs on central atom})",
            explanation: "Steric # 2: sp (Linear); 3: sp2 (Trigonal planar); 4: sp3 (Tetrahedral); 5: sp3d; 6: sp3d2."
          }
        ],
        workedExamples: [
          {
            problem: "Determine the hybridization, molecular geometry, and bond angle of sulfur tetrafluoride ($SF_4$) and xenon difluoride ($XeF_2$).",
            stepByStepSolution: [
              "For $SF_4$: Sulfur has 6 valence electrons. 4 single $\\sigma$ bonds with F leaves 2 electrons (1 lone pair).",
              "Steric Number = $4 + 1 = 5 \\implies sp^3d$ hybridization. Electron geometry: Trigonal bipyramidal. Molecular shape: **See-saw** (bond angles $\\approx 102^\\circ$ and $173^\\circ$).",
              "For $XeF_2$: Xenon has 8 valence electrons. 2 $\\sigma$ bonds with F leaves 6 electrons (3 lone pairs).",
              "Steric Number = $2 + 3 = 5 \\implies sp^3d$ hybridization. 3 lone pairs occupy equatorial positions. Molecular shape: **Linear** ($180^\\circ$ bond angle)."
            ]
          }
        ],
        examTraps: [
          "Confusing electron-pair geometry with molecular shape (e.g. $NH_3$ is tetrahedral electron geometry, but TRIGONAL PYRAMIDAL molecular shape due to 1 lone pair).",
          "$SF_6$ is $sp^3d^2$ (Octahedral, non-polar), while $SF_4$ is $sp^3d$ (See-saw, polar)."
        ],
        keyTakeaways: [
          "A single bond consists of $1\\sigma$; a double bond consists of $1\\sigma + 1\\pi$; a triple bond consists of $1\\sigma + 2\\pi$.",
          "Intermolecular forces strength: Ionic / Covalent network > Hydrogen bonding (H bonded to N, O, F) > Dipole-Dipole > London Dispersion forces."
        ]
      }
    ]
  },
  {
    id: 'chem-ch2-equilibrium-thermo',
    subject: 'chemistry',
    chapterNumber: 2,
    title: 'Chemical Equilibrium, Kinetics, Acids-Bases & Electrochemistry',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Equilibrium constants (Kc, Kp), Le Chatelier’s principle, Rate laws, Arrhenius equation, pH/pOH, Buffers & Henderson-Hasselbalch, Ksp, Galvanic cells, Nernst equation, and Gibbs Free Energy.',
    estimatedReadTimeMinutes: 32,
    sections: [
      {
        id: 'chem-2-1-equilibrium-acid-base',
        heading: '2.1 Equilibrium, Le Chatelier & Acid-Base Calculations',
        content: `### Dynamic Chemical Equilibrium:
For $a A + b B \\rightleftharpoons c C + d D$:
$$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad K_p = K_c (R T)^{\\Delta n}$$
*(where $\\Delta n = (c + d) - (a + b)$ is the change in moles of gas).*
- Solids and pure liquids are OMITTED from equilibrium expressions (activity = 1).
- If reaction is reversed: $K' = \\frac{1}{K}$.
- If coefficients multiplied by $n$: $K' = K^n$.

### Le Chatelier's Principle:
- **Concentration**: Adding reactant shifts RIGHT; adding product shifts LEFT.
- **Pressure / Volume**: Increasing pressure (decreasing volume) shifts reaction towards the side with FEWER moles of gas.
- **Temperature**:
  - Exothermic ($\Delta H < 0$): Increasing $T$ shifts LEFT ($K$ decreases).
  - Endothermic ($\Delta H > 0$): Increasing $T$ shifts RIGHT ($K$ increases).
- **Catalyst**: Speeds up forward and reverse rates equally; DOES NOT alter $K$ or shift equilibrium position.

### pH & Buffer Solutions:
- $\\text{pH} = -\\log_{10}[H_3O^+], \\quad \\text{pOH} = -\\log_{10}[OH^-]$
- $\\text{pH} + \\text{pOH} = 14$ at $25^\\circ\\text{C}$ ($K_w = 1.0 \\times 10^{-14}$).
- **Weak Acid Ionization**: $[H^+] = \\sqrt{K_a \\cdot C_a}$
- **Henderson-Hasselbalch Equation for Buffers**:
  $$\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{Conjugate Base}]}{[\\text{Weak Acid}]}\\right)$$`,
        equations: [
          {
            name: "Henderson-Hasselbalch Equation",
            formula: "\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[A^-]}{[HA]}\\right)",
            explanation: "Maximum buffer capacity occurs when $[A^-] = [HA] \\implies \\text{pH} = \\text{p}K_a$."
          },
          {
            name: "Nernst Equation & Cell Potential",
            formula: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n} \\log_{10}(Q)",
            explanation: "Calculates cell potential at non-standard concentrations at 298 K."
          }
        ],
        workedExamples: [
          {
            problem: "Calculate the pH of a buffer solution composed of $0.2\\text{ M } CH_3COOH$ and $0.2\\text{ M } CH_3COONa$ given $K_a = 1.8 \\times 10^{-5}$ ($\text{p}K_a = 4.74$).",
            stepByStepSolution: [
              "Identify weak acid $[HA] = 0.2\\text{ M}$ and conjugate base $[A^-] = 0.2\\text{ M}$.",
              "Use Henderson-Hasselbalch: $\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{0.2}{0.2}\\right)$.",
              "Since $\\log(1) = 0$, $\\text{pH} = \\text{p}K_a = 4.74$."
            ]
          }
        ],
        examTraps: [
          "Catalysts DO NOT shift equilibrium position or change the numerical value of $K_c$. They only help reach equilibrium faster.",
          "Temperature is the ONLY factor that changes the numerical equilibrium constant $K$."
        ],
        keyTakeaways: [
          "Spontaneous reaction condition: $\\Delta G < 0$, $E^\\circ_{\\text{cell}} > 0$, and $K > 1$.",
          "Standard free energy relation: $\\Delta G^\\circ = -n F E^\\circ = -R T \\ln K$."
        ]
      }
    ]
  }
];
