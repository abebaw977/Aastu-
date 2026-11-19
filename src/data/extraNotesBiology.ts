import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for General Biology (Biology - 10 Chapters)
 * Preserves all existing notes and adds biochemical pathways, genetic matrices,
 * evolutionary mechanisms, Ethiopian endemic biodiversity, and exam traps for all 10 chapters.
 */
export const EXTRA_NOTES_BIOLOGY: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Introduction
  1: [
    {
      id: 'bio-extra-c1-sec1',
      heading: '1.4 Masterclass: Emergent Properties, The Hierarchy of Biological Organization & Scientific Inquiry',
      content: `### 1.4.1 The Hierarchy of Life and Emergent Properties
- **Emergent Properties**: Novel properties that arise at each ascending level of biological complexity that were not present at the preceding simpler level, resulting from specific structural arrangements and functional interactions among components.
- **Hierarchical Levels of Biological Complexity**:
  $$\\text{Atom} \\to \\text{Molecule} \\to \\text{Organelle} \\to \\text{Cell (Basic Unit of Life)} \\to \\text{Tissue} \\to \\text{Organ} \\to \\text{Organ System} \\to \\text{Organism} \\to \\text{Population} \\to \\text{Community} \\to \\text{Ecosystem} \\to \\text{Biosphere}$$
- **Seven Universal Characteristics of Living Organisms**:
  1. **Cellular Organization**: Composed of one or more cells surrounded by a membrane.
  2. **Metabolism**: Energy processing via anabolism (synthesis) and catabolism (breakdown).
  3. **Homeostasis**: Active physiological regulation to maintain stable internal equilibrium.
  4. **Growth and Development**: Regulated genetic expansion and cellular differentiation.
  5. **Reproduction**: Biogenesis (transmitting hereditary information to offspring).
  6. **Response to Stimuli**: Irritability and behavioral sensitivity to environmental changes.
  7. **Evolutionary Adaptation**: Heritable modifications acquired over generations via natural selection.

---

### 1.4.2 Scientific Method: Deductive vs. Inductive Logic & Experimental Rigor
- **Inductive Reasoning**: Deriving generalized scientific principles from a vast multitude of specific empirical observations (*"All 50 observed swan species have feathers $\\implies$ all birds possess feathers"*).
- **Deductive Reasoning**: Applying a generalized scientific theory/law to predict specific, testable experimental outcomes (*"If all organisms require water, then drought will reduce plant growth rate"*).
- **Positive Control vs. Negative Control**:
  - **Positive Control**: Receives a treatment with a known, validated response, proving the experimental assay is functioning properly.
  - **Negative Control**: Receives no active treatment or a placebo, establishing the baseline against which experimental effects are measured.`,
      keyTakeaways: [
        'The cell is the lowest structural level capable of performing all activities required for life independently.',
        'A scientific hypothesis must be both testable via empirical observation and falsifiable.'
      ]
    }
  ],

  // Chapter 2: Biological Molecules
  2: [
    {
      id: 'bio-extra-c2-sec1',
      heading: '2.4 Masterclass: Macromolecular Biochemistry, Bond Topography & Protein Structural Hierarchy',
      content: `### 2.4.1 Comprehensive Biomolecule Taxonomy

| Macromolecule Class | Monomeric Subunit | Polymeric Structure | Key Covalent Linkage | Primary Biological Functions |
| :--- | :--- | :--- | :--- | :--- |
| **Carbohydrates** | Monosaccharides (e.g., Glucose, Fructose, Galactose) | Polysaccharides (Starch, Glycogen, Cellulose, Chitin) | **Glycosidic Bond** (formed by condensation/dehydration) | Quick metabolic energy (glucose); energy storage (glycogen in animals, starch in plants); structural cell walls (cellulose in plants, chitin in fungi/insects). |
| **Lipids** | Glycerol + Fatty acids (not true polymers; hydrophobic) | Triglycerides, Phospholipids, Steroids (e.g., Cholesterol) | **Ester Linkage** | Long-term dense energy storage ($9\\text{ kcal/g}$); lipid bilayer cell membranes (amphipathic phospholipids); steroid hormones (testosterone, estrogen). |
| **Proteins** | $20$ standard L-Amino acids | Polypeptide chains | **Peptide Bond** (amide bond between $-\\text{COOH}$ and $-\\text{NH}_2$) | Enzymatic catalysis, structural support (collagen/keratin), membrane transport pumps, immune antibodies, cellular signaling. |
| **Nucleic Acids** | Nucleotides (Phosphate + Pentose Sugar + Nitrogenous Base) | DNA (Deoxyribonucleic acid), RNA (Ribonucleic acid) | **Phosphodiester Bond** ($3'\\to 5'$ backbone) | Encoding, transmitting, and expressing genetic hereditary information. |

---

### 2.4.2 Four Levels of Protein Structural Hierarchy
1. **Primary ($1^\\circ$) Structure**: The linear sequence of amino acids linked by covalent peptide bonds, dictated directly by genetic mRNA codons.
2. **Secondary ($2^\\circ$) Structure**: Localized coiling ($\\alpha$-helix) or folding ($\\beta$-pleated sheet) stabilized strictly by **hydrogen bonds** along the polypeptide backbone.
3. **Tertiary ($3^\\circ$) Structure**: The overall three-dimensional folding of a single polypeptide, stabilized by **R-group interactions**: hydrophobic interactions, van der Waals forces, ionic salt bridges, hydrogen bonds, and covalent **disulfide bridges** ($-\\text{S}-\\text{S}-$ between cysteine residues).
4. **Quaternary ($4^\\circ$) Structure**: The association of two or more polypeptide subunits into a functional multimeric protein complex (e.g., Hemoglobin with $2\\alpha$ and $2\\beta$ chains).`,
      examTraps: [
        'Assuming protein denaturation breaks peptide bonds. Denaturation disrupts secondary, tertiary, and quaternary bonds (hydrogen, ionic, hydrophobic), leaving the primary covalent peptide backbone completely intact.',
        'Confusing saturated with unsaturated fatty acids: Saturated fatty acids have no double bonds, pack tightly, and are solid at room temperature; unsaturated fatty acids have one or more cis double bonds causing kinks, remaining liquid oils.'
      ],
      keyTakeaways: [
        'Condensation (dehydration) reactions synthesize biological polymers by releasing water; hydrolysis breaks them apart by adding water.',
        'Phospholipids are amphipathic: hydrophilic phosphate heads face the aqueous cytosol/extracellular fluid, while hydrophobic fatty acid tails face inward.'
      ]
    }
  ],

  // Chapter 3: Cellular Basis of Life
  3: [
    {
      id: 'bio-extra-c3-sec1',
      heading: '3.4 Masterclass: Organelle Cytology, Fluid Mosaic Membrane Dynamics & Osmotic Tonicity',
      content: `### 3.4.1 Prokaryotic vs. Eukaryotic Structural Matrix

| Feature / Organelle | Prokaryotic Cells (Bacteria, Archaea) | Eukaryotic Cells (Protists, Fungi, Plants, Animals) |
| :--- | :--- | :--- |
| **True Membrane-Bound Nucleus** | **Absent** (genetic material resides in an open **nucleoid** region). | **Present** (double-membrane nuclear envelope with nuclear pores). |
| **Membrane-Bound Organelles** | **Absent** (no mitochondria, ER, Golgi, lysosomes, chloroplasts). | **Present** (highly compartmentalized endomembrane system). |
| **Ribosome Size** | **$70\\text{S}$** (composed of $50\\text{S}$ and $30\\text{S}$ subunits). | **$80\\text{S}$** in cytosol (composed of $60\\text{S}$ and $40\\text{S}$); $70\\text{S}$ in mitochondria/chloroplasts. |
| **DNA Architecture** | Single, circular double-stranded DNA molecule without histones. | Multiple linear chromosomes complexed with basic **histone proteins**. |
| **Cell Wall Composition** | Peptidoglycan (murein) in bacteria; pseudomurein in Archaea. | Cellulose in plants; Chitin in fungi; Absent in animal cells. |
| **Cell Division** | **Binary fission** (no mitotic spindle apparatus). | **Mitosis** (somatic) and **Meiosis** (germline). |

---

### 3.4.2 Cellular Membrane Transport & Osmotic Tonicity

| Transport Mechanism | Energy Requirement | Direction Along Concentration Gradient | Transport Protein Utilized | Biological Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Simple Diffusion** | Passive (Zero ATP) | **Down** ($[\\text{High}] \\to [\\text{Low}]$) | None (moves directly across phospholipid bilayer) | $O_2, CO_2$, lipid-soluble steroid hormones. |
| **Facilitated Diffusion** | Passive (Zero ATP) | **Down** ($[\\text{High}] \\to [\\text{Low}]$) | Channel proteins (aquaporins) or carrier proteins | Glucose entering red blood cells via GLUT-1. |
| **Primary Active Transport** | Active (**Direct ATP hydrolysis**) | **Against / Up** ($[\\text{Low}] \\to [\\text{High}]$) | Transmembrane protein pump | $\\text{Na}^+/\\text{K}^+$ ATPase pump ($3\\text{ Na}^+$ out, $2\\text{ K}^+$ in). |
| **Secondary Active Transport**| Active (Uses ion gradient established by primary pump)| One ion down gradient, cotransported solute against | Symporters or Antiporters | $\\text{Na}^+$/glucose cotransporter in intestinal epithelium. |

- **Osmotic Tonicity Matrix**:
  - **Hypotonic Environment**: Water moves into cell; animal cells swell and **lyse** (burst); plant cells become **turgid** (normal firm state).
  - **Hypertonic Environment**: Water leaves cell; animal cells **crenate** (shrivel); plant cells undergo **plasmolysis** (plasma membrane pulls away from cell wall).
  - **Isotonic Environment**: Net water movement is zero; animal cells maintain normal volume; plant cells become **flaccid** (wilted).`,
      keyTakeaways: [
        'The endosymbiotic theory demonstrates that mitochondria and chloroplasts originated as free-living aerobic prokaryotes engulfed by ancestral eukaryotes.',
        'The $\\text{Na}^+/\\text{K}^+$ pump is electrogenic, pumping 3 $\\text{Na}^+$ ions out for every 2 $\\text{K}^+$ ions imported per ATP hydrolyzed.'
      ]
    }
  ],

  // Chapter 4: Cellular Metabolism and Metabolic Disorders
  4: [
    {
      id: 'bio-extra-c4-sec1',
      heading: '4.4 Masterclass: Bioenergetics of Aerobic Respiration, Enzyme Kinetics & Inborn Metabolic Errors',
      content: `### 4.4.1 The Four Stages of Aerobic Cellular Respiration

$$\\text{Overall Equation}: \\quad C_6H_{12}O_6 + 6O_2 \\longrightarrow 6CO_2 + 6H_2O + 30\\text{--}32\\text{ ATP}$$

1. **Glycolysis (Cytosol — Anaerobic)**:
   - 1 Glucose ($6C$) $\\to$ 2 Pyruvate ($3C$).
   - Yield: **Net $2\\text{ ATP}$** (via substrate-level phosphorylation) and **$2\\text{ NADH}$**.
   - Rate-limiting enzyme: **Phosphofructokinase-1 (PFK-1)**, allosterically inhibited by high ATP and citrate.
2. **Pyruvate Oxidation / Link Reaction (Mitochondrial Matrix)**:
   - 2 Pyruvate $\\to$ 2 Acetyl-CoA ($2C$) $+ 2CO_2$.
   - Yield: **$2\\text{ NADH}$**.
3. **Citric Acid (Krebs) Cycle (Mitochondrial Matrix)**:
   - Acetyl-CoA ($2C$) combines with Oxaloacetate ($4C$) to form Citrate ($6C$).
   - Per glucose (2 turns): Yields **$4CO_2$**, **$6\\text{ NADH}$**, **$2\\text{ FADH}_2$**, and **$2\\text{ ATP/GTP}$**.
4. **Oxidative Phosphorylation & Chemiosmosis (Inner Mitochondrial Membrane / Cristae)**:
   - High-energy electrons from $\\text{NADH}$ and $\\text{FADH}_2$ traverse Complexes I, II, III, and IV of the electron transport chain (ETC).
   - Protons ($H^+$) are pumped from matrix to intermembrane space, generating a steep **proton-motive force (electrochemical gradient)**.
   - Protons flow back into the matrix through **ATP Synthase**, driving rotary synthesis of $\\sim 26\\text{--}28\\text{ ATP}$.
   - **Terminal Electron Acceptor**: Molecular Oxygen ($O_2$), which accepts electrons and protons to form metabolic water ($H_2O$).

---

### 4.4.2 Inborn Errors of Metabolism
- **Phenylketonuria (PKU)**: Autosomal recessive defect in phenylalanine hydroxylase (PAH), preventing conversion of phenylalanine to tyrosine; causes accumulation of neurotoxic phenylpyruvate leading to severe intellectual disability if untreated.
- **Galactosemia**: Deficiency in galactose-1-phosphate uridylyltransferase (GALT), causing toxic buildup of galactose resulting in hepatomegaly, cataracts, and intellectual impairment.`,
      examTraps: [
        'Believing oxygen is consumed in the Krebs cycle: The Krebs cycle itself does not use $O_2$ directly; however, it ceases anaerobically because the electron transport chain backs up, depleting the matrix of oxidized $NAD^+$ and $FAD$.',
        'Confusing competitive with non-competitive enzyme inhibition: Competitive inhibitors bind to the active site and can be overcome by increasing substrate concentration ($V_{\\max}$ unchanged, $K_m$ increases); non-competitive inhibitors bind to an allosteric site ($V_{\\max}$ decreases, $K_m$ unchanged).'
      ],
      keyTakeaways: [
        'Substrate-level phosphorylation occurs in glycolysis and the citric acid cycle; oxidative phosphorylation generates the vast majority of ATP via ATP Synthase.',
        'Under anaerobic conditions, fermentation regenerates $NAD^+$ from $NADH$ to keep glycolysis running.'
      ]
    }
  ],

  // Chapter 5: Genetics and Evolution
  5: [
    {
      id: 'bio-extra-c5-sec1',
      heading: '5.4 Masterclass: Mendelian Ratios, The Molecular Central Dogma & Hardy-Weinberg Population Genetics',
      content: `### 5.4.1 Classical Mendelian Inheritance vs. Non-Mendelian Genetics
- **Law of Segregation**: Two alleles for a heritable character segregate during gamete formation and end up in different gametes.
- **Law of Independent Assortment**: Alleles of two or more different genes assort independently of each other during gamete formation (valid for unlinked genes on non-homologous chromosomes).
- **Prototypical Phenotypic Ratios**:
  - Monohybrid heterozygous cross ($Aa \\times Aa$): **$3:1$** phenotypic ratio ($1\\,AA : 2\\,Aa : 1\\,aa$).
  - Dihybrid heterozygous cross ($AaBb \\times AaBb$): **$9:3:3:1$** phenotypic ratio.
  - Incomplete dominance ($C^R C^W \\times C^R C^W$): **$1:2:1$** phenotypic ratio (Red : Pink : White).
  - Testcross ($Aa \\times aa$): **$1:1$** phenotypic ratio.

---

### 5.4.2 Population Genetics & The Hardy-Weinberg Equilibrium
For a non-evolving population in genetic equilibrium, allele frequencies remain constant across generations:
$$p + q = 1, \\qquad p^2 + 2pq + q^2 = 1$$
- $p$: Frequency of the dominant allele ($A$).
- $q$: Frequency of the recessive allele ($a$).
- $p^2$: Frequency of homozygous dominant genotype ($AA$).
- $2pq$: Frequency of heterozygous genotype ($Aa$).
- $q^2$: Frequency of homozygous recessive genotype ($aa$).
- **Five Conditions Required for Hardy-Weinberg Equilibrium**:
  1. No mutations; 2. Random mating; 3. No natural selection; 4. Extremely large population size (no genetic drift); 5. No gene flow (no migration/immigration).`,
      workedExamples: [
        {
          problem: 'In an Ethiopian human population, albinism is an autosomal recessive disorder ($a$). If $1$ in $10,000$ individuals is albino: (1) Find the frequency of the recessive allele $q$ and dominant allele $p$; (2) Calculate the percentage of the population who are asymptomatic genetic carriers ($Aa$).',
          stepByStepSolution: [
            'Step 1 (Recessive genotype frequency): $q^2 = \\frac{1}{10,000} = 0.0001$.',
            'Step 2 (Recessive allele frequency): $q = \\sqrt{q^2} = \\sqrt{0.0001} = 0.01$ (i.e., $1\\%$).',
            'Step 3 (Dominant allele frequency): $p = 1 - q = 1 - 0.01 = 0.99$ (i.e., $99\\%$).',
            'Step 4 (Heterozygous carrier frequency): $2pq = 2 \\times (0.99) \\times (0.01) = 0.0198 = 1.98\\%$.',
            'Result: Approximately **$1.98\\%$ of the population (about 1 in 50 people)** are carriers.'
          ],
          shortcutTip: 'Always start with $q^2$ (homozygous recessive phenotype frequency) to find $q$, because the dominant phenotype includes both $p^2$ and $2pq$!'
        }
      ],
      examTraps: [
        'Confusing allele frequency ($p, q$) with genotype frequency ($p^2, 2pq, q^2$). $q$ is the frequency of allele $a$; $q^2$ is the frequency of the homozygous recessive individual $aa$.',
        'Assuming dominant alleles always have higher frequencies in a population: A dominant allele can be rare (e.g., Huntington\'s disease allele is dominant but extremely rare).'
      ],
      keyTakeaways: [
        'The Central Dogma describes unidirectional information transfer: $\\text{DNA} \\xrightarrow{\\text{transcription}} \\text{mRNA} \\xrightarrow{\\text{translation}} \\text{Protein}$.',
        'Natural selection acts on individual phenotypes, but evolution occurs at the level of populations over generations.'
      ]
    }
  ],

  // Chapter 6: Infectious Diseases and Immunity
  6: [
    {
      id: 'bio-extra-c6-sec1',
      heading: '6.4 Masterclass: Innate vs. Adaptive Immunity, Immunoglobulin Classes & HIV Pathogenesis',
      content: `### 6.4.1 The Dual Architecture of the Human Immune System

| Parameter | Innate (Non-Specific) Immunity | Adaptive (Specific) Immunity |
| :--- | :--- | :--- |
| **Response Time** | Rapid (minutes to hours). | Delayed ($4\\text{--}7\\text{ days}$ on primary encounter). |
| **Target Specificity** | Broad recognition of pathogen-associated molecular patterns (PAMPs). | Highly specific antigen receptor recognition (epitope-level). |
| **Immunological Memory** | **None**; identical response on repeated exposure. | **Robust memory**; rapid and vigorous secondary response. |
| **Key Cellular Components** | Neutrophils, Macrophages, Dendritic cells, Natural Killer (NK) cells. | **B lymphocytes** (humoral) and **T lymphocytes** (cell-mediated). |
| **Soluble Factors** | Lysozyme, Complement proteins, Interferons (anti-viral). | **Antibodies (Immunoglobulins)**, Cytokines. |

---

### 6.4.2 The Five Classes of Immunoglobulins (Antibodies — MADGE)
1. **IgM**: Pentamer; first antibody secreted during primary immune response; potent complement activator and agglutinator.
2. **IgA**: Dimer; predominant antibody in bodily secretions (saliva, tears, colostrum/breast milk, mucus); mucosal barrier defense.
3. **IgG**: Monomer; **most abundant antibody in serum ($\sim 80\\%$)**; crosses the human placenta to provide passive immunity to fetus; opsonization and toxin neutralization.
4. **IgE**: Monomer; binds to mast cells and basophils; triggers histamine release during **allergic reactions** and defense against parasitic helminths.
5. **IgD**: Monomer; serves as membrane antigen receptor on mature, naive B cells.

---

### 6.4.3 Pathogenesis of HIV/AIDS
- Human Immunodeficiency Virus (HIV) is an enveloped retrovirus that targets **$CD4^+$ T-helper lymphocytes** using viral envelope glycoprotein **gp120** binding to $CD4$ and coreceptor CCR5/CXCR4.
- **Viral Enzymes**: Reverse Transcriptase (RNA $\\to$ cDNA), Integrase (inserts cDNA into host genome as provirus), and Protease (cleaves viral polyproteins).
- Progression to AIDS occurs when circulating $CD4^+$ count drops below **$200\\text{ cells/}\\mu\\text{L}$**, rendering the patient vulnerable to opportunistic infections (*Pneumocystis jirovecii*, Tuberculosis, Kaposi's sarcoma).`,
      keyTakeaways: [
        'Vaccines generate active immunity by inducing immunological memory without causing full-blown disease.',
        'Cytotoxic T cells ($CD8^+$) kill virus-infected cells displaying foreign antigen on MHC Class I molecules.'
      ]
    }
  ],

  // Chapter 7: Taxonomy of Organisms
  7: [
    {
      id: 'bio-extra-c7-sec1',
      heading: '7.4 Masterclass: The Three-Domain Cladistics Architecture & Taxonomic Hierarchies',
      content: `### 7.4.1 Carl Woese\'s Three-Domain System
Based on comparative sequencing of small-subunit ribosomal RNA ($16\\text{S}/18\\text{S}$ rRNA):

| Biological Characteristic | Domain **Archaea** | Domain **Bacteria** | Domain **Eukarya** |
| :--- | :--- | :--- | :--- |
| **Nuclear Envelope** | Absent | Absent | **Present** |
| **Membrane Lipids** | Branched hydrocarbons with **ether linkages** | Unbranched fatty acids with **ester linkages** | Unbranched fatty acids with **ester linkages** |
| **Peptidoglycan Cell Wall** | Absent (pseudomurein or proteinaceous) | **Present** | Absent (cellulose/chitin/none) |
| **Introns in Genes** | Present in some | Extremely rare | **Present in most** |
| **Histones Associated with DNA**| **Present** | Absent | **Present** |
| **Sensitivity to Antibiotics** | No (resistant to streptomycin/chloramphenicol) | **Yes** (inhibited by common antibiotics) | No |
| **Ecological Niches** | Often **extremophiles** (methanogens, extreme halophiles, thermophiles) | Ubiquitous in soil, water, animal guts, pathogens | Diverse macroscopic and microscopic ecosystems |

---

### 7.4.2 Cladistics: Homologous vs. Analogous Structures
- **Homologous Structures**: Anatomical features that share a **common evolutionary origin** despite having different present functions (e.g., human arm, bat wing, whale flipper) — indicative of **Divergent Evolution**.
- **Analogous Structures**: Features that perform **similar biological functions** but evolved independently with **no common ancestral origin** (e.g., bird wing vs. butterfly wing) — indicative of **Convergent Evolution** due to similar environmental pressures.`,
      examTraps: [
        'Classifying Archaea as Bacteria: Biochemically and genetically, Archaea are more closely related to Eukarya (sharing histones, RNA polymerases, and translation initiation mechanisms) than to Bacteria!',
        'Confusing analogous structures with homologous structures: Analogous traits reflect convergent adaptations to similar lifestyles, not close phylogenetic kinship.'
      ],
      keyTakeaways: [
        'The Linnaean taxonomic hierarchy in descending order: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species.',
        'Binomial nomenclature italicizes Genus (capitalized) and species (lowercase): e.g., *Homo sapiens*.'
      ]
    }
  ],

  // Chapter 8: Ecology and Conservation
  8: [
    {
      id: 'bio-extra-c8-sec1',
      heading: '8.4 Masterclass: Trophic Energetics, Ethiopian Endemic Biodiversity & Conservation Hotspots',
      content: `### 8.4.1 Trophic Dynamics and Lindeman\'s 10% Energy Rule
- **Trophic Efficiency**: Only approximately **$10\\%$** (range $5\\%\\text{--}20\\%$) of chemical energy available at one trophic level is incorporated into biomass at the next ascending trophic level.
  - The remaining $90\\%$ is lost as metabolic heat through cellular respiration, unassimilated waste (feces), or uneaten biomass.
  - This thermodynamic reality severely limits the length of food chains to $4\\text{--}5$ trophic levels.

---

### 8.4.2 Ethiopia\'s Globally Renowned Endemic Biodiversity

| Endemic Species | Vernacular / Scientific Name | Primary Habitat / National Park | Conservation Status & Threat |
| :--- | :--- | :--- | :--- |
| **Walia Ibex** | *Capra walie* | **Simien Mountains National Park** (Afroalpine crags, $>3,000\\text{ m}$). | Endangered; threatened by livestock overgrazing, human settlement, and habitat fragmentation. |
| **Ethiopian Wolf (Red Fox)** | *Canis simensis* | **Bale Mountains National Park** and Simien Mountains (plateaus). | Critically endangered; world's rarest canid; threatened by rabies/distemper from feral dogs and agricultural encroachment. |
| **Gelada Baboon** | *Theropithecus gelada* | Simien Mountains and central highland cliffs. | Least concern / Vulnerable locally; unique grass-grazing, bleeding-heart chest primate. |
| **Mountain Nyala** | *Tragelaphus buxtoni* | Bale Mountains and Arsi highlands montane forests. | Endangered spiral-horned antelope; habitat loss. |
| **Menelik\'s Bushbuck** | *Tragelaphus scriptus meneliki* | Highlands and Rift Valley juniper-Hagenia forests. | Subspecies endemic to Ethiopian highlands. |

---

### 8.4.3 Biogeochemical Cycles: Nitrogen Cycle Key Transformations
1. **Nitrogen Fixation**: Conversion of atmospheric $N_2$ to ammonia ($NH_3/NH_4^+$) by symbiotic bacteria (*Rhizobium* in legume root nodules) or free-living cyanobacteria (*Nostoc*).
2. **Nitrification**: Two-step aerobic oxidation:
   - $NH_4^+ \\xrightarrow{\\text{Nitrosomonas}} NO_2^-$ (Nitrite).
   - $NO_2^- \\xrightarrow{\\text{Nitrobacter}} NO_3^-$ (Nitrate, the primary absorbable form for plants).
3. **Assimilation**: Plant roots absorb $NO_3^-$ to synthesize amino acids and nucleotides.
4. **Ammonification (Decomposition)**: Fungi and bacteria convert nitrogenous organic waste back to $NH_4^+$.
5. **Denitrification**: Anaerobic bacteria (*Pseudomonas*) reduce $NO_3^-$ back to gaseous $N_2$, returning it to the atmosphere.`,
      keyTakeaways: [
        'Ethiopia is part of the Eastern Afromontane and Horn of Africa biodiversity hotspots, boasting high rates of endemism.',
        'Energy flows unidirectionally through ecosystems and dissipates as heat, whereas matter cycles continuously.'
      ]
    }
  ],

  // Chapter 9: Botany and Zoology
  9: [
    {
      id: 'bio-extra-c9-sec1',
      heading: '9.4 Masterclass: Plant Vascular Transport Dynamics & Animal Homeostatic Feedback Systems',
      content: `### 9.4.1 Plant Vascular Transport: Xylem vs. Phloem Mechanics
1. **Xylem Transport (Cohesion-Tension / Transpiration-Pull Model)**:
   - Transports water and dissolved mineral ions **unidirectionally** from roots to leaves.
   - Conducting elements: **Tracheids** and **Vessel Elements** (dead and hollow at functional maturity with lignified walls).
   - Mechanism: Transpiration of water vapor from leaf stomata generates negative hydrostatic pressure (suction tension); continuous water columns are pulled upward due to **cohesion** (hydrogen bonding between water molecules) and **adhesion** (attraction of water to hydrophilic xylem cell walls).
2. **Phloem Transport (Pressure-Flow / Bulk-Flow Hypothesis)**:
   - Transports organic photoassimilates (sucrose) **bidirectionally** from **sources** (mature photosynthetic leaves) to **sinks** (roots, tubers, growing fruits).
   - Conducting elements: **Sieve-Tube Elements** (living cells lacking nuclei/vacuoles) supported metabolically by nucleated **Companion Cells**.
   - Mechanism: Active loading of sucrose at the source lowers water potential; water enters by osmosis from xylem, creating high turgor pressure; at the sink, sucrose is unloaded, water leaves, and bulk fluid flows down the hydrostatic pressure gradient.

---

### 9.4.2 Animal Physiology: Negative vs. Positive Homeostatic Feedback
- **Negative Feedback Loop**: The biological control mechanism that counteracts and reverses a physiological deviation, returning the variable toward its stable **set point** (e.g., thermoregulation, blood glucose homeostasis by insulin and glucagon).
- **Positive Feedback Loop**: Amplifies and reinforces the initial stimulus to drive a physiological event to a swift explosive completion (e.g., oxytocin release during uterine labor contractions; platelet plug formation in blood clotting).`,
      keyTakeaways: [
        'Transpiration pull requires zero metabolic ATP from the plant; it is solar-driven evaporation creating physical water tension.',
        'Negative feedback maintains homeostatic stability; positive feedback drives rapid, irreversible developmental transitions.'
      ]
    }
  ],

  // Chapter 10: Applications of Biological Sciences
  10: [
    {
      id: 'bio-extra-c10-sec1',
      heading: '10.4 Masterclass: Recombinant DNA Technology, PCR Amplification & CRISPR-Cas9 Precision',
      content: `### 10.4.1 Molecular Biotechnology Toolkit
1. **Restriction Endonucleases (Restriction Enzymes)**:
   - Bacterial enzymes that cleave double-stranded DNA at specific palindromic recognition sequences (e.g., EcoRI cutting at $5'-\\text{GAATTC}-3'$), generating "sticky ends" for gene cloning.
2. **DNA Ligase**:
   - Molecular glue that seals phosphodiester bonds between sticky ends of foreign DNA and vector plasmids.
3. **Polymerase Chain Reaction (PCR — Kary Mullis)**:
   - Exponentially amplifies a specific target DNA sequence in vitro through $30\\text{--}35$ automated thermal cycles:
     - **Denaturation ($94\\text{--}96^\\circ\\text{C}$)**: Heat separates double-stranded DNA into single strands.
     - **Annealing ($50\\text{--}65^\\circ\\text{C}$)**: Short oligonucleotide primers bind to complementary target sequences.
     - **Extension ($72^\\circ\\text{C}$)**: Thermostable **Taq Polymerase** (isolated from *Thermus aquaticus*) synthesizes new DNA strands.
     - Yield after $n$ cycles: $2^n$ copies.
4. **CRISPR-Cas9 Precision Gene Editing**:
   - Derived from bacterial adaptive immune systems against bacteriophages.
   - A synthetic single-guide RNA (sgRNA) directs the **Cas9 endonuclease** to induce double-strand breaks at exact genomic loci, enabling gene knockouts, point corrections, or insertion of therapeutic sequences.`,
      examTraps: [
        'Using standard human DNA polymerase in PCR: Normal human polymerase would be permanently denatured and destroyed at $95^\\circ\\text{C}$. PCR strictly requires heat-tolerant Taq polymerase.',
        'Confusing restriction enzymes with DNA ligase: Restriction enzymes CUT DNA; DNA ligase JOINS DNA fragments.'
      ],
      keyTakeaways: [
        'PCR achieves billions-fold DNA amplification in just a few hours without living cellular hosts.',
        'CRISPR-Cas9 enables targeted, nucleotide-level genomic modification in medicine, crop improvement, and veterinary science.'
      ]
    }
  ]
};
