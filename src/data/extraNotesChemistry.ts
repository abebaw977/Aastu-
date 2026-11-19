import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for General Chemistry (Chemistry - 9 Chapters)
 * Preserves all existing notes and adds thermodynamic derivations, quantum number matrices,
 * VSEPR geometries, equilibrium math, organic mechanisms, and electrochemical equations for all 9 chapters.
 */
export const EXTRA_NOTES_CHEMISTRY: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Essential Ideas in Chemistry
  1: [
    {
      id: 'chem-extra-c1-sec1',
      heading: '1.4 Masterclass: Dimensional Factor-Label Analysis, Phase Boundaries & Precision Metrics',
      content: `### 1.4.1 Classification of Matter & Phase Boundaries
- **Matter**: Anything that occupies space and has mass.
  - **Pure Substances**: Constant, fixed chemical composition:
    - **Elements**: Cannot be decomposed into simpler substances by chemical means (e.g., $Au, Fe, O_2$).
    - **Compounds**: Two or more elements chemically combined in fixed stoichiometric ratios by mass (e.g., $H_2O, NaCl$ — Law of Definite Proportions).
  - **Mixtures**: Physical combinations of two or more substances that retain their distinct chemical identities:
    - **Homogeneous Mixture (Solution)**: Completely uniform composition throughout down to the molecular level (e.g., air, brass, dissolved saline solution).
    - **Heterogeneous Mixture**: Non-uniform composition with observable phase boundaries (e.g., oil and water, granite, soil suspension).

---

### 1.4.2 Significant Figures Rules in Quantitative Calculations
1. **Non-zero digits**: Always significant ($48.2\\text{ g} \\implies 3\\text{ sig figs}$).
2. **Leading zeros**: Never significant; serve only as decimal locators ($0.0042\\text{ m} \\implies 2\\text{ sig figs}$).
3. **Captive zeros**: Always significant ($50.08\\text{ mL} \\implies 4\\text{ sig figs}$).
4. **Trailing zeros**: Significant **only if** a decimal point is explicitly written ($120.0\\text{ s} \\implies 4\\text{ sig figs}$; $1200\\text{ s} \\implies 2\\text{ sig figs}$ unless written as $1.200 \\times 10^3$).
5. **Operational Rules**:
   - **Multiplication / Division**: Result is rounded to the same number of significant figures as the measurement with the **fewest significant figures**.
   - **Addition / Subtraction**: Result is rounded to the same number of decimal places as the measurement with the **fewest decimal places**.`,
      keyTakeaways: [
        'Mass is an invariant measure of the quantity of matter; weight is the variable gravitational force exerted on an object.',
        'Intensive properties (density, temperature, boiling point) are independent of sample size; extensive properties (mass, volume, heat capacity) scale directly with amount.'
      ]
    }
  ],

  // Chapter 2: Atoms, Molecules and Ions
  2: [
    {
      id: 'chem-extra-c2-sec1',
      heading: '2.4 Masterclass: Subatomic Mass Spectrometry, Isotopic Abundance & Polyatomic Nomenclature',
      content: `### 2.4.1 Atomic Structure and Relative Isotopic Abundance
- An atom consists of a tiny, dense, positively charged nucleus (containing protons and neutrons) surrounded by an electron cloud:
  $$\\text{Mass Number } (A) = \\text{Protons } (Z) + \\text{Neutrons } (N)$$
- **Isotopes**: Atoms of the same element having the **same atomic number ($Z$)** but **different mass numbers ($A$)** due to different neutron counts.
- **Average Atomic Mass Formula**:
  $$\\text{Average Atomic Mass} = \\sum_{i=1}^{n} (\\text{fractional abundance}_i \\times \\text{isotopic mass}_i)$$

---

### 2.4.2 Systematic Inorganic Chemical Nomenclature Rules
1. **Binary Ionic Compounds (Type I: Fixed Oxidation State)**:
   - Name of cation (metal) $+$ Base name of anion with **-ide** suffix (e.g., $NaCl \\implies \\text{Sodium chloride}$; $Al_2O_3 \\implies \\text{Aluminum oxide}$).
2. **Binary Ionic Compounds (Type II: Variable Oxidation State Transition Metals)**:
   - Metal name $+$ **(Roman numeral indicating cation charge)** $+$ Anion base with **-ide** (e.g., $FeCl_2 \\implies \\text{Iron(II) chloride}$; $Fe_2O_3 \\implies \\text{Iron(III) oxide}$).
3. **Binary Covalent (Molecular) Compounds (Two Nonmetals)**:
   - Use Greek prefixes (*mono, di, tri, tetra, penta, hexa, hepta, octa, nona, deca*) to denote number of atoms:
     - $CO_2 \\implies \\text{Carbon dioxide}$; $N_2O_4 \\implies \\text{Dinitrogen tetroxide}$. *(Prefix "mono-" is omitted on the first element).*
4. **Oxyacids**:
   - If polyatomic ion ends in **-ate** $\\implies$ **-ic acid** ($HNO_3 \\implies \\text{Nitric acid}$).
   - If polyatomic ion ends in **-ite** $\\implies$ **-ous acid** ($HNO_2 \\implies \\text{Nitrous acid}$).`,
      workedExamples: [
        {
          problem: 'Naturally occurring chlorine consists of two stable isotopes: $^{35}\\text{Cl}$ (atomic mass $34.969\\text{ amu}$, natural abundance $75.77\\%$) and $^{37}\\text{Cl}$ (atomic mass $36.966\\text{ amu}$, natural abundance $24.23\\%$). Calculate the average atomic mass of chlorine.',
          stepByStepSolution: [
            'Step 1 (Convert percentages to decimal fractions): $f_1 = 0.7577$; $f_2 = 0.2423$.',
            'Step 2 (Apply weighted average formula): $\\bar{m} = (0.7577 \\times 34.969) + (0.2423 \\times 36.966)$.',
            'Step 3 (Calculate components): $26.4960 + 8.9569 = 35.4529\\text{ amu}$.',
            'Result: The average atomic mass of chlorine is **$35.45\\text{ amu}$** (matching the periodic table value).'
          ],
          shortcutTip: 'Check that the average is closer to the more abundant isotope: 35.45 is much closer to 35 than to 37.'
        }
      ],
      keyTakeaways: [
        'Chemical properties of an element are governed primarily by its valence electron configuration, not its neutron count.',
        'Rutherford\'s gold foil experiment proved that the atom is mostly empty space with mass concentrated in a dense, positive nucleus.'
      ]
    }
  ],

  // Chapter 3: Composition of Substances and Solutions
  3: [
    {
      id: 'chem-extra-c3-sec1',
      heading: '3.4 Masterclass: Mole Stoichiometry, Empirical Formula Determination & Solution Dilution',
      content: `### 3.4.1 The Mole Concept and Stoichiometric Conversions
$$1\\text{ mole} = 6.02214 \\times 10^{23}\\text{ particles (Avogadro\'s Number, } N_A)$$
- **Mass-to-Mole Conversion**:
  $$n = \\frac{m}{M} \\quad (\\text{where } m \\text{ is mass in g, } M \\text{ is molar mass in g/mol})$$
- **Algorithm for Finding Empirical Formula from Percent Composition**:
  1. Assume a $100\\text{ g}$ sample (percentages convert directly to grams).
  2. Divide each mass by the respective element\'s molar mass to obtain **moles of each element**.
  3. Divide all mole values by the **smallest mole value** to obtain a preliminary whole-number mole ratio.
  4. If fractional ratios result, multiply by the smallest common integer ($0.5 \\times 2$, $0.33 \\times 3$, $0.25 \\times 4$).
- **Molecular Formula Multiplier ($n$)**:
  $$n = \\frac{\\text{Experimental Molecular Molar Mass}}{\\text{Empirical Formula Mass}} \\implies \\text{Molecular Formula} = (\\text{Empirical Formula})_n$$

---

### 3.4.2 Solution Concentrations and Dilution Mechanics
- **Molarity ($M$)**:
  $$M = \\frac{\\text{Moles of Solute } (n)}{\\text{Volume of Solution in Liters } (V_{\\text{soln}})} = \\frac{m / M_{\\text{solute}}}{V_{\\text{liters}}}$$
- **Dilution Equation (Conservation of Solute Moles)**:
  $$M_1 V_1 = M_2 V_2$$`,
      equations: [
        {
          name: 'Conservation of Moles Dilution Formula',
          formula: 'M_1 V_1 = M_2 V_2',
          description: 'Calculates required stock solution volumes when preparing dilute laboratory reagents.'
        }
      ],
      workedExamples: [
        {
          problem: 'A chemical compound contains $40.0\\%\\text{ C}$, $6.71\\%\\text{ H}$, and $53.29\\%\\text{ O}$ by mass. Its experimental molecular molar mass is $180.16\\text{ g/mol}$. (1) Determine its empirical formula; (2) Determine its true molecular formula.',
          stepByStepSolution: [
            'Step 1 (Moles per 100 g): $n_C = \\frac{40.0\\text{ g}}{12.011} = 3.33\\text{ mol}$; $n_H = \\frac{6.71\\text{ g}}{1.008} = 6.66\\text{ mol}$; $n_O = \\frac{53.29\\text{ g}}{16.00} = 3.33\\text{ mol}$.',
            'Step 2 (Divide by smallest, 3.33): $C = \\frac{3.33}{3.33} = 1$; $H = \\frac{6.66}{3.33} = 2$; $O = \\frac{3.33}{3.33} = 1$.',
            'Step 3 (Empirical Formula): **$CH_2O$**.',
            'Step 4 (Empirical formula mass): $12.011 + 2(1.008) + 16.00 = 30.03\\text{ g/mol}$.',
            'Step 5 (Multiplier $n$): $n = \\frac{180.16}{30.03} = 6$.',
            'Result: Molecular formula is $(CH_2O)_6 = \\mathbf{C_6H_{12}O_6}$ (Glucose).'
          ],
          shortcutTip: 'Empirical formula gives the simplest whole-number ratio; molecular formula gives the exact actual number of atoms in a molecule.'
        }
      ],
      keyTakeaways: [
        'Dilution adds solvent without altering the absolute number of solute moles present in the solution.',
        'Molarity depends on temperature because liquid volume expands slightly with heating; molality is temperature-independent.'
      ]
    }
  ],

  // Chapter 4: Stoichiometry of Chemical Reactions
  4: [
    {
      id: 'chem-extra-c4-sec1',
      heading: '4.4 Masterclass: Limiting Reactant Determination, Percentage Yield & Redox Half-Reaction Balancing',
      content: `### 4.4.1 Limiting Reactant & Theoretical Yield Algorithm
The **Limiting Reactant (LR)** is the reactant that is completely consumed first, thereby capping the theoretical maximum quantity of product that can be formed.
- **Three-Step Limiting Reactant Method**:
  1. Calculate moles of each available reactant.
  2. For each reactant, divide its moles by its stoichiometric coefficient in the balanced chemical equation.
  3. The reactant with the **smallest calculated quotient is the Limiting Reactant**.
- **Percentage Yield Formula**:
  $$\\%\\text{ Yield} = \\frac{\\text{Actual (Experimental) Yield}}{\\text{Theoretical (Stoichiometric) Yield}} \\times 100\\%$$

---

### 4.4.2 Balancing Redox Equations via the Ion-Electron (Half-Reaction) Method
In an acidic aqueous solution:
1. Divide the overall equation into **Oxidation** and **Reduction** half-reactions.
2. Balance all elements **other than $H$ and $O$**.
3. Balance oxygen ($O$) atoms by adding **$H_2O$** to the oxygen-deficient side.
4. Balance hydrogen ($H$) atoms by adding **$H^+$** to the hydrogen-deficient side.
5. Balance net electrical charge by adding **electrons ($e^-$)** to the more positive side.
6. Multiply half-reactions by integers to equalize electrons transferred; sum the half-reactions and cancel identical species.
*(If in basic solution, add $OH^-$ to both sides to neutralize all $H^+$ into $H_2O$).*`,
      workedExamples: [
        {
          problem: 'In the synthesis of ammonia, $28.0\\text{ g}$ of $N_2$ gas reacts with $9.0\\text{ g}$ of $H_2$ gas according to: $N_2(g) + 3H_2(g) \\to 2NH_3(g)$. If $25.5\\text{ g}$ of $NH_3$ is collected experimentally, calculate: (1) The limiting reactant; (2) The theoretical yield of $NH_3$ in grams; (3) The percentage yield.',
          stepByStepSolution: [
            'Step 1 (Moles of reactants): $n(N_2) = \\frac{28.0\\text{ g}}{28.02\\text{ g/mol}} = 1.00\\text{ mol}$; $n(H_2) = \\frac{9.0\\text{ g}}{2.016\\text{ g/mol}} = 4.46\\text{ mol}$.',
            'Step 2 (Compare stoichiometric requirements): $1.00\\text{ mol } N_2$ requires $3 \\times 1.00 = 3.00\\text{ mol } H_2$. Since we have $4.46\\text{ mol } H_2$ available, $H_2$ is in excess and **$N_2$ is the Limiting Reactant**.',
            'Step 3 (Theoretical yield from LR): $1.00\\text{ mol } N_2 \\times \\frac{2\\text{ mol } NH_3}{1\\text{ mol } N_2} = 2.00\\text{ mol } NH_3$.',
            'Step 4 (Theoretical mass): $2.00\\text{ mol } \\times 17.03\\text{ g/mol} = \\mathbf{34.06\\text{ g } NH_3}$.',
            'Step 5 (Percentage yield): $\\%\\text{ Yield} = \\frac{25.5\\text{ g}}{34.06\\text{ g}} \\times 100\\% = \\mathbf{74.87\\%}$.'
          ],
          shortcutTip: 'Theoretical yield must always be calculated strictly from the limiting reactant, never from the excess reactant!'
        }
      ],
      examTraps: [
        'Assuming the reactant with fewer grams is always the limiting reactant: Grams must be converted to moles and divided by stoichiometric coefficients!',
        'Forgetting to balance charge when balancing redox half-reactions: Mass balance alone is insufficient; total charge must be identical on both sides.'
      ],
      keyTakeaways: [
        'Oxidation is the loss of electrons (increase in oxidation number); Reduction is the gain of electrons (decrease in oxidation number) — OIL RIG.',
        'Actual yield in real laboratory experiments is almost always less than theoretical yield due to side reactions, incomplete equilibrium, or product loss during purification.'
      ]
    }
  ],

  // Chapter 5: Electronic Structure and Periodic Properties
  5: [
    {
      id: 'chem-extra-c5-sec1',
      heading: '5.4 Masterclass: The Four Quantum Numbers, Aufbau Exceptions & Periodic Trend Topography',
      content: `### 5.4.1 The Four Quantum Numbers of Modern Wave Mechanics

| Quantum Number | Symbol | Allowed Values | Physical Meaning |
| :--- | :--- | :--- | :--- |
| **Principal** | $n$ | $1, 2, 3, 4, \\dots$ | Main electronic shell; orbital size and overall energy level. |
| **Angular Momentum (Azimuthal)**| $l$ | $0, 1, 2, \\dots, (n-1)$ | Subshell; three-dimensional shape of orbital ($l=0 \\to s, 1 \\to p, 2 \\to d, 3 \\to f$). |
| **Magnetic** | $m_l$ | $-l, \\dots, 0, \\dots, +l$ | Spatial orientation of the orbital ($2l + 1$ orientations per subshell). |
| **Spin** | $m_s$ | $+1/2, -1/2$ | Intrinsic spin angular momentum direction of the electron. |

- **Three Governing Quantum Rules**:
  1. **Pauli Exclusion Principle**: No two electrons in the same atom can have the exact same set of all four quantum numbers ($n, l, m_l, m_s$); each orbital holds at most 2 electrons with opposite spins.
  2. **Aufbau Principle**: Electrons fill available atomic orbitals of lowest energy first ($1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\dots$).
  3. **Hund\'s Rule**: Degenerate orbitals of equal energy are each singly occupied with parallel spins before any orbital is doubly occupied.
- **Anomalous Electron Configurations (Extra Stability of Half-Filled / Fully-Filled $d$-Subshells)**:
  - **Chromium ($Z = 24$)**: $[Ar]\\,4s^1 3d^5$ (NOT $[Ar]\\,4s^2 3d^4$).
  - **Copper ($Z = 29$)**: $[Ar]\\,4s^1 3d^{10}$ (NOT $[Ar]\\,4s^2 3d^9$).

---

### 5.4.2 Periodic Trend Vectors Across the Periodic Table

$$\\begin{array}{l|c|c}
\\textbf{Periodic Property} & \\textbf{Across a Period (Left } \\to \\textbf{ Right)} & \\textbf{Down a Group (Top } \\to \\textbf{ Bottom)} \\\\ \\hline
\\textbf{Atomic Radius} & \\textbf{Decreases} \\text{ (Higher } Z_{\\text{eff}} \\text{ pulls shell in)} & \\textbf{Increases} \\text{ (Additional electronic shells)} \\\\
\\textbf{First Ionization Energy} & \\textbf{Increases} \\text{ (Stronger nuclear hold)} & \\textbf{Decreases} \\text{ (Increased shielding and radius)} \\\\
\\textbf{Electronegativity} & \\textbf{Increases} \\text{ (Fluorine is highest: 4.0)} & \\textbf{Decreases} \\text{ (Larger valence distance)} \\\\
\\textbf{Metallic Character} & \\textbf{Decreases} & \\textbf{Increases} \\text{ (Easier to lose valence } e^-)
\\end{array}$$`,
      keyTakeaways: [
        'Effective nuclear charge ($Z_{\\text{eff}} = Z - S$) explains why atomic radius contracts across a period despite adding electrons.',
        'Ionization energy exceptions occur at Group 2 $\\to$ Group 13 ($s^2$ stability) and Group 15 $\\to$ Group 16 (half-filled $p^3$ stability).'
      ]
    }
  ],

  // Chapter 6: Chemical Bonding and Molecular Geometry
  6: [
    {
      id: 'chem-extra-c6-sec1',
      heading: '6.4 Masterclass: Formal Charge Calculation, VSEPR Geometries & Hybridization Orbitals',
      content: `### 6.4.1 Formal Charge Calculation & Optimal Resonance
$$\\text{Formal Charge (FC)} = \\text{Valence } e^- - \\text{Lone Pair (non-bonding) } e^- - \\frac{1}{2}(\\text{Bonding } e^-)$$
- **Criteria for the Dominant Resonance Contributor**:
  1. Smallest formal charges (as close to zero as possible).
  2. Negative formal charges reside on the **most electronegative atoms**.
  3. Like charges are not located on adjacent atoms.

---

### 6.4.2 VSEPR Molecular Geometry & Hybridization Matrix

| Steric No. | Bonding Pairs | Lone Pairs | Electron Geometry | Molecular Shape | Ideal Bond Angles | Hybridization | Canonical Example |
| :---: | :---: | :---: | :--- | :--- | :--- | :---: | :--- |
| **$2$** | $2$ | $0$ | Linear | **Linear** | $180^\\circ$ | $sp$ | $BeCl_2, CO_2$ |
| **$3$** | $3$ | $0$ | Trigonal Planar | **Trigonal Planar** | $120^\\circ$ | $sp^2$ | $BF_3, SO_3$ |
| **$3$** | $2$ | $1$ | Trigonal Planar | **Bent** | $<120^\\circ$ | $sp^2$ | $SO_2, NO_2^-$ |
| **$4$** | $4$ | $0$ | Tetrahedral | **Tetrahedral** | $109.5^\\circ$ | $sp^3$ | $CH_4, CCl_4$ |
| **$4$** | $3$ | $1$ | Tetrahedral | **Trigonal Pyramidal** | $107^\\circ$ | $sp^3$ | $NH_3, PCl_3$ |
| **$4$** | $2$ | $2$ | Tetrahedral | **Bent** | $104.5^\\circ$ | $sp^3$ | $H_2O, H_2S$ |
| **$5$** | $5$ | $0$ | Trigonal Bipyramidal | **Trigonal Bipyramidal** | $90^\\circ, 120^\\circ$ | $sp^3d$ | $PCl_5$ |
| **$5$** | $4$ | $1$ | Trigonal Bipyramidal | **Seesaw** | $<90^\\circ, <120^\\circ$ | $sp^3d$ | $SF_4$ |
| **$5$** | $3$ | $2$ | Trigonal Bipyramidal | **T-shaped** | $<90^\\circ$ | $sp^3d$ | $ClF_3$ |
| **$5$** | $2$ | $3$ | Trigonal Bipyramidal | **Linear** | $180^\\circ$ | $sp^3d$ | $XeF_2, I_3^-$ |
| **$6$** | $6$ | $0$ | Octahedral | **Octahedral** | $90^\\circ$ | $sp^3d^2$ | $SF_6$ |
| **$6$** | $5$ | $1$ | Octahedral | **Square Pyramidal** | $<90^\\circ$ | $sp^3d^2$ | $BrF_5$ |
| **$6$** | $4$ | $2$ | Octahedral | **Square Planar** | $90^\\circ$ | $sp^3d^2$ | $XeF_4$ |`,
      keyTakeaways: [
        'Lone pairs exert greater electrostatic repulsion than bonding pairs, compressing adjacent bond angles ($CH_4\\; 109.5^\\circ \\to NH_3\\; 107^\\circ \\to H_2O\\; 104.5^\\circ$).',
        'Single bonds are $\\sigma$; double bonds are $1\\sigma + 1\\pi$; triple bonds are $1\\sigma + 2\\pi$.'
      ]
    }
  ],

  // Chapter 7: Equilibrium Concepts and Acid-Base Equilibrium
  7: [
    {
      id: 'chem-extra-c7-sec1',
      heading: '7.4 Masterclass: Le Chatelier Dynamics, Henderson-Hasselbalch Buffers & Solubility Equilibria',
      content: `### 7.4.1 Chemical Equilibrium & Le Chatelier\'s Principle
For a general reversible reaction $aA + bB \\rightleftharpoons cC + dD$:
$$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\qquad K_p = K_c(RT)^{\\Delta n_{\\text{gas}}}$$
- **Reaction Quotient ($Q$) vs. $K$**:
  - If $Q < K$: System proceeds **forward (rightward)** to form more products.
  - If $Q = K$: Dynamic chemical equilibrium.
  - If $Q > K$: System proceeds **in reverse (leftward)** to form more reactants.
- **Le Chatelier\'s Responses**:
  - **Increase pressure / Decrease volume**: Shifts toward the side with **fewer moles of gas**.
  - **Exothermic reaction ($\\Delta H < 0$)**: Adding heat acts as a product $\\implies$ shifts **left**, $K$ decreases.
  - **Endothermic reaction ($\\Delta H > 0$)**: Adding heat acts as a reactant $\\implies$ shifts **right**, $K$ increases.

---

### 7.4.2 Acid-Base Calculations & Buffer Solutions
- **Autoprotolysis of Water**: $K_w = [H_3O^+][OH^-] = 1.0 \\times 10^{-14}$ at $25^\\circ\\text{C} \\implies \\text{pH} + \\text{pOH} = 14$.
- **Weak Acid Dissociation Constant ($K_a$)**:
  $$HA + H_2O \\rightleftharpoons H_3O^+ + A^-, \\qquad K_a = \\frac{[H_3O^+][A^-]}{[HA]} \\implies [H_3O^+] \\approx \\sqrt{K_a \\cdot C_a}$$
- **Henderson-Hasselbalch Equation for Buffer Solutions**:
  $$\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{Conjugate Base, } A^-]}{[\\text{Weak Acid, } HA]}\\right)$$
  When $[A^-] = [HA]$, $\\text{pH} = \\text{p}K_a$ (maximum buffer capacity).`,
      equations: [
        {
          name: 'Henderson-Hasselbalch Buffer Equation',
          formula: '\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[A^-]}{[HA]}\\right)',
          description: 'Used to calculate pH and design buffer solutions in biological and chemical systems.'
        }
      ],
      workedExamples: [
        {
          problem: 'A buffer solution is prepared by mixing $0.20\\text{ M}$ acetic acid ($CH_3COOH$, $K_a = 1.8 \\times 10^{-5}$) and $0.30\\text{ M}$ sodium acetate ($CH_3COONa$). Calculate the pH of the resulting buffer solution.',
          stepByStepSolution: [
            'Step 1 (Calculate $\\text{p}K_a$): $\\text{p}K_a = -\\log(1.8 \\times 10^{-5}) = 4.74$.',
            'Step 2 (Apply Henderson-Hasselbalch): $\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[CH_3COO^-]}{[CH_3COOH]}\\right)$.',
            'Step 3 (Substitute concentrations): $\\text{pH} = 4.74 + \\log\\left(\\frac{0.30}{0.20}\\right) = 4.74 + \\log(1.5)$.',
            'Step 4 (Evaluate logarithm): $\\log(1.5) = 0.176$.',
            'Step 5 (Compute final pH): $\\text{pH} = 4.74 + 0.176 = \\mathbf{4.92}$.'
          ],
          shortcutTip: 'When base concentration exceeds acid concentration, buffer pH must be higher than the pKa.'
        }
      ],
      keyTakeaways: [
        'Pure solids and pure liquids are omitted from chemical equilibrium constant expressions ($K_c, K_p$).',
        'Catalysts accelerate the rate of achieving equilibrium without altering the equilibrium constant $K$ or position.'
      ]
    }
  ],

  // Chapter 8: Organic Chemistry
  8: [
    {
      id: 'chem-extra-c8-sec1',
      heading: '8.4 Masterclass: Organic Functional Groups, IUPAC Priority Rules & Reaction Mechanisms',
      content: `### 8.4.1 Comprehensive Functional Group Hierarchy (IUPAC Priority Order)

$$\\begin{array}{c|l|l|c}
\\textbf{Priority} & \\textbf{Functional Group Class} & \\textbf{General Structure} & \\textbf{IUPAC Suffix} \\\\ \\hline
1 & \\textbf{Carboxylic Acid} & R-\\text{COOH} & \\text{-oic acid} \\\\
2 & \\textbf{Ester} & R-\\text{COOR}' & \\text{-oate} \\\\
3 & \\textbf{Amide} & R-\\text{CONH}_2 & \\text{-amide} \\\\
4 & \\textbf{Aldehyde} & R-\\text{CHO} & \\text{-al} \\\\
5 & \\textbf{Ketone} & R-\\text{CO}-R' & \\text{-one} \\\\
6 & \\textbf{Alcohol} & R-\\text{OH} & \\text{-ol} \\\\
7 & \\textbf{Amine} & R-\\text{NH}_2 & \\text{-amine} \\\\
8 & \\textbf{Alkyne} & R-\\text{C}\\equiv\\text{C}-R' & \\text{-yne} \\\\
9 & \\textbf{Alkene} & R-\\text{CH}=\\text{CH}-R' & \\text{-ene} \\\\
10 & \\textbf{Alkane} & R-\\text{CH}_2-\\text{CH}_3 & \\text{-ane} \\\\
11 & \\textbf{Ether} & R-\\text{O}-R' & \\text{alkoxy-} \\\\
12 & \\textbf{Alkyl Halide} & R-X \\;(X=\\text{F, Cl, Br, I}) & \\text{halo-}
\\end{array}$$

---

### 8.4.2 Fundamental Organic Reaction Types
1. **Electrophilic Addition to Alkenes (Markovnikov\'s Rule)**:
   - When an asymmetric reagent $HX$ adds to an unsymmetrical alkene, the hydrogen atom attaches to the double-bonded carbon that **already has more hydrogen atoms** ("the rich get richer"), producing the more stable carbocation intermediate ($3^\\circ > 2^\\circ > 1^\\circ$).
2. **Esterification (Fischer Esterification)**:
   $$\\text{Carboxylic Acid} + \\text{Alcohol} \\xrightleftharpoons[H_2O]{H^+} \\text{Ester} + \\text{Water}$$
3. **Saponification (Base-Catalyzed Ester Hydrolysis)**:
   $$\\text{Triglyceride} + 3\\text{ NaOH} \\longrightarrow \\text{Glycerol} + 3\\text{ Sodium Soaps } (R-\\text{COO}^-\\text{Na}^+)$$`,
      keyTakeaways: [
        'Constitutional (structural) isomers have identical molecular formulas but different atom connectivity.',
        'Markovnikov\'s rule is governed by carbocation stability: tertiary carbocations are vastly more stable than primary.'
      ]
    }
  ],

  // Chapter 9: Organic Mechanisms, Chirality & Electrochemistry
  9: [
    {
      id: 'chem-extra-c9-sec1',
      heading: '9.4 Masterclass: Stereochemical Chirality ($R/S$), $S_N1$ vs. $S_N2$ Kinetics & Galvanic Electrochemistry',
      content: `### 9.4.1 Stereochemistry & Optical Chirality
- **Chiral Center (Stereocenter)**: A tetrahedral carbon atom bonded to **four completely different groups**.
- **Enantiomers**: Non-superimposable mirror-image stereoisomers with identical physical properties (boiling point, melting point, density) except that they rotate plane-polarized light in equal but opposite directions ($+d$ dextrorotatory vs. $-l$ levorotatory).
- **Racemic Mixture ($50:50$ pair of enantiomers)**: Optically inactive (net rotation is $0^\\circ$).
- **Diastereomers**: Non-mirror-image stereoisomers having different physical and chemical properties.

---

### 9.4.2 Nucleophilic Substitution: $S_N1$ vs. $S_N2$

| Reaction Parameter | $S_N1$ (Substitution Nucleophilic Unimolecular) | $S_N2$ (Substitution Nucleophilic Bimolecular) |
| :--- | :--- | :--- |
| **Kinetics & Rate Law** | $\\text{Rate} = k[R-X]$ (**First-order**). | $\\text{Rate} = k[R-X][\\text{Nu}^-]$ (**Second-order**). |
| **Mechanism Steps** | **Two steps**: (1) Carbocation formation (slow); (2) Nucleophilic attack. | **One concerted step** (simultaneous bond-forming & bond-breaking). |
| **Substrate Preference** | **$3^\\circ > 2^\\circ \\gg 1^\\circ$** (carbocation stability). | **$1^\\circ > 2^\\circ \\gg 3^\\circ$** (minimal steric hindrance). |
| **Stereochemical Result**| **Racemization** (carbocation is flat trigonal planar). | **Complete Inversion of Configuration** (Walden inversion). |
| **Favored Solvent** | Polar protic solvents ($H_2O, ROH$ stabilize ions). | Polar aprotic solvents (DMSO, Acetone, DMF). |

---

### 9.4.3 Electrochemistry: Galvanic Cells, Cell EMF & The Nernst Equation
- **Standard Cell Potential ($E^\\circ_{\\text{cell}}$)**:
  $$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$$
  *(Reaction is spontaneous if $E^\\circ_{\\text{cell}} > 0 \\iff \\Delta G^\\circ = -nFE^\\circ < 0$).*
- **The Nernst Equation (Non-Standard Conditions at $25^\\circ\\text{C}$)**:
  $$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n}\\log(Q)$$
- **Faraday\'s Law of Electrolysis**:
  $$m = \\frac{I \\cdot t \\cdot M}{n \\cdot F} \\quad (F = 96,485\\text{ C/mol } e^-)$$`,
      equations: [
        {
          name: 'The Nernst Equation at 298 K',
          formula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n}\\log(Q)',
          description: 'Calculates actual electromotive force (EMF) as cell reactants are consumed.'
        },
        {
          name: 'Faraday\'s Quantitative Electrolysis Law',
          formula: 'm = \\frac{I \\cdot t \\cdot M}{n \\cdot F}',
          description: 'Determines electroplated mass of metal deposited on a cathode during electrolysis.'
        }
      ],
      workedExamples: [
        {
          problem: 'A galvanic Daniell cell operates with the standard reaction: $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$. Standard reduction potentials are $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$ and $E^\\circ(Zn^{2+}/Zn) = -0.76\\text{ V}$. (1) Calculate standard cell potential $E^\\circ_{\\text{cell}}$; (2) Using the Nernst equation, find cell potential $E_{\\text{cell}}$ when $[Cu^{2+}] = 0.01\\text{ M}$ and $[Zn^{2+}] = 1.0\\text{ M}$.',
          stepByStepSolution: [
            'Step 1 (Standard Potential): Copper is reduced at cathode ($+0.34\\text{ V}$); Zinc is oxidized at anode ($-0.76\\text{ V}$). $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cat}} - E^\\circ_{\\text{an}} = 0.34 - (-0.76) = \\mathbf{+1.10\\text{ V}}$.',
            'Step 2 (Reaction quotient $Q$): $Q = \\frac{[Zn^{2+}]}{[Cu^{2+}]} = \\frac{1.0}{0.01} = 100 = 10^2$. Number of electrons transferred $n = 2$.',
            'Step 3 (Nernst equation): $E_{\\text{cell}} = 1.10 - \\frac{0.0592}{2}\\log(100) = 1.10 - (0.0296 \\times 2) = 1.10 - 0.0592 = \\mathbf{1.0408\\text{ V}}$.',
            'Result: The non-standard potential is approximately **$1.04\\text{ V}$**.'
          ],
          shortcutTip: 'Anode is where Oxidation occurs (An Ox); Cathode is where Reduction occurs (Red Cat).'
        }
      ],
      keyTakeaways: [
        '$S_N2$ proceeds with backside attack and complete umbrella-like stereochemical inversion; $S_N1$ generates a planar carbocation resulting in racemization.',
        'In a galvanic cell, electrons flow spontaneously through the external circuit from the negative anode to the positive cathode.'
      ]
    }
  ]
};
