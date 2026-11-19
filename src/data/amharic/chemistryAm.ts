import type { AmharicChapterNote } from './types';

export const CHEMISTRY_AM_NOTES: Record<string, AmharicChapterNote> = {
  'chem-mod-ch1': {
    subject: 'chemistry',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የቁስ አካል መሰረት፣ ልኬት እና Significant Figures (Essential Ideas)',
    briefOverviewAm:
      'የቁስ አካልን (Matter) ምደባ፣ Physical vs Chemical Properties፣ Extensive vs Intensive Properties፣ SI Units፣ Accuracy vs Precision፣ Significant Figures እና Dimensional Analysisን በዝርዝር ያስተምራል።',
    briefPointsAm: [
      'Matter Classification፡ Pure Substances (Elements & Compounds — Fixed composition) vs Mixtures (Homogeneous/Solution & Heterogeneous)።',
      'Intensive Property (በመጠን የማይቀየር — Density, Temperature, Melting point) vs Extensive Property (በመጠን የሚቀየር — Mass, Volume, Length, Heat)።',
      'Accuracy (ከትክክለኛው ዋጋ ጋር መቅረብ) vs Precision (የተደጋገሙ ልኬቶች እርስ በርስ መቀራረብ)።',
      'Significant Figures Rules፡ የመደመር/መቀነስ ሕግ = ዝቅተኛ Decimal places፤ የማባዛት/ማካፈል ሕግ = ዝቅተኛ Total significant figures።',
    ],
    examTipAm:
      'በExtensive እና Intensive ውስጥ Mass እና Volume ሁለቱም **Extensive** ናቸው፤ ነገር ግን ጥምርታቸው (**Density = Mass / Volume**) ሁልጊዜ **Intensive** ነው!',
    expandedOverviewAm:
      'General Chemistry (Chem 1012) Chapter 1 የኬሚስትሪ ሳይንስ መሰረታዊ መርሆዎችንና የሂሳብ ትንተና መሣሪያዎችን ይዘረጋል። የቁስ አካልን በSolid, Liquid, Gas, Plasma እና Pure Substance vs Mixture መመደብን፣ Physical vs Chemical changes መለየትን፣ በIntensive እና Extensive ባህሪያት መካከል ያለውን ልዩነት፣ 7ቱን መሰረታዊ የSI Units እና Metric Prefixes ($10^{-12}$ pico እስከ $10^{12}$ tera)፣ የTemperature Conversion ቀመሮችን ($K$, $^\\circ\\text{C}$, $^\\circ\\text{F}$)፣ Significant Figures & Rounding Rules እንዲሁም Factor-Label (Dimensional Analysis) ስሌትን በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Elements, Compounds, Homogeneous Mixtures እና Heterogeneous Mixturesን በምሳሌ መለየት።',
      'Intensive እና Extensive Propertiesን እንዲሁም Physical እና Chemical Changesን መለየት።',
      'Significant Figures ሕጎችን በመጠቀም በመደመር፣ መቀነስ፣ ማባዛትና ማካፈል ትክክለኛውን ውጤት ማስቀመጥ።',
      'Dimensional Analysis በመጠቀም የተደባለቁ Unit conversions ($\\text{g/cm}^3 \\leftrightarrow \\text{kg/m}^3$) በትክክል ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 የቁስ አካል ምደባ እና ባህሪያት (Matter & Properties)',
        contentAm: `### 1.1.1 Pure Substances vs Mixtures
- **Element**: በኬሚካላዊ ዘዴ ወደ ቀላል ንጥረ ነገር የማይከፋፈል (ምሳሌ፡ $\\text{O}_2$, $\\text{Fe}$, $\\text{Au}$)።
- **Compound**: ሁለት ወይም ከዚያ በላይ ኤለመንቶች በቋሚ ክብደት ጥምርታ (Law of Definite Proportions) በኬሚካላዊ ትስስር የተዋሃዱ (ምሳሌ፡ $\\text{H}_2\\text{O}$, $\\text{NaCl}$)።
- **Homogeneous Mixture (Solution)**: በአይን የማይለይ ወጥ ቅይጥ (ምሳሌ፡ Salt water, Air, Brass alloy)።
- **Heterogeneous Mixture**: ወጥ ያልሆነና በቀላሉ የሚለይ (ምሳሌ፡ Sand in water, Oil and water, Blood)።

### 1.1.2 Physical vs Chemical & Intensive vs Extensive
- **Physical Change**: የሞለኪውሉ ማንነት አይቀየርም (Melting, Boiling, Sublimation, Dissolving)።
- **Chemical Change**: አዲስ ንጥረ ነገር ይፈጠራል (Rusting, Combustion, Fermentation, Electrolysis of water)።
- **Extensive** (Depends on amount): Mass ($m$), Volume ($V$), Length, Total Enthalpy ($H$), Entropy ($S$)።
- **Intensive** (Independent of amount): Density ($\\rho$), Temperature ($T$), Color, Boiling Point, Molarity ($M$), Molar Mass ($MM$)።`,
      },
      {
        headingAm: '1.2 Significant Figures, Accuracy/Precision እና የሙቀት ቀመሮች',
        contentAm: `### 1.2.1 Significant Figures Rules
1. Non-zero digits ($1–9$) ሁልጊዜ Significant ናቸው።
2. **Captive zeros** (በቁጥሮች መካከል ያሉ — $1005$) ሁልጊዜ Significant ናቸው (**4 sig figs**)።
3. **Leading zeros** (ከመጀመሪያው ቁጥር በፊት ያሉ — $0.0045$) በፍጹም Significant **አይደሉም** (**2 sig figs**)።
4. **Trailing zeros**:
   - Decimal point **ካለ** ($2.500$, $100.$) Significant **ናቸው** (**4** እና **3 sig figs**)።
   - Decimal point **ከሌለ** ($1200$) Ambiguous ስለሆነ በScientific Notation ($1.2 \\times 10^3 = 2$ sig figs) መጻፍ ይመረጣል።
- **Exact numbers** (ቆጠራ ቁጥሮች ለምሳሌ 12 eggs ወይም Definitions: $1\\text{ in} = 2.54\\text{ cm}$) Infinite sig figs አላቸው!

### 1.2.2 ቁልፍ ቀመሮች
- **Density**: $\\rho = \\frac{m}{V}$ ($1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$)
- **Temperature**:
  $$K = ^\\circ\\text{C} + 273.15 \\qquad ^\\circ\\text{F} = \\frac{9}{5}(^\\circ\\text{C}) + 32 \\qquad ^\\circ\\text{C} = \\frac{5}{9}(^\\circ\\text{F} - 32)$$`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የሚከተለውን የመደመርና ማባዛት ጥምር ስሌት በትክክለኛው Significant Figures አስሉ፡ $\\frac{(14.25 + 2.1)}{0.0450}$',
        stepsAm: [
          '1. መጀመሪያ ቅንፍ ውስጥ ያለውን መደመር፡ $14.25\\text{ (2 decimal)} + 2.1\\text{ (1 decimal)} = 16.35 \\approx 16.4$ (1 decimal place $\\rightarrow$ 3 sig figs ይሆናል)።',
          '2. አሁን ማካፈል፡ $16.35 \\div 0.0450 = 363.333...$።',
          '3. 16.4 (3 sig figs) እና 0.0450 (3 sig figs፤ leading zeros አይቆጠሩም፣ trailing zero ከdecimal በኋላ ስላለ ይቆጠራል)።',
          '4. መልሱ ወደ **3 sig figs** ሲጠጋጋ **363** (ወይም $3.63 \\times 10^2$) ይሆናል።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Intensive Property', termAm: 'መጠን-ነጻ ባህሪ', definitionAm: 'የቁስ አካሉ መጠን ቢጨምርም ቢቀንስም የማይለወጥ ባህሪ (ለምሳሌ Density)።' },
      { termEn: 'Dimensional Analysis', termAm: 'የአሃድ ትንተና (Factor-Label)', definitionAm: 'አሃዶችን እርስ በርስ እያጣፉ ከአንድ መለኪያ ወደ ሌላ የመቀየር ዘዴ።' },
    ],
    examTrapsAm: [
      'Volume conversion ላይ Cubed መሆኑን አይርሱ! $1\\text{ m} = 100\\text{ cm}$ ስለሆነ $1\\text{ m}^3 = (100)^3\\text{ cm}^3 = \\mathbf{10^6}\\text{ cm}^3$ እንጂ $100\\text{ cm}^3$ አይደለም!',
      '"$-40^\\circ\\text{C}$" እና "$-40^\\circ\\text{F}$" ተመሳሳይ የሙቀት መጠን ናቸው ($\\frac{9}{5}(-40)+32 = -40$)።',
    ],
    keyTakeawaysAm: [
      'Significant figures በAddition/Subtraction ላይ በDecimal places ሲወሰን፣ በMultiplication/Division ላይ በአጠቃላይ Sig Figs ይወሰናል።',
      'Mixture በPhysical means (Filtration, Distillation) ይለያል፤ Compound ግን በChemical means ብቻ ይለያል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ 0.005040 ውስጥ ስንት Significant Figures አሉ?',
        answerAm: 'መልስ፡ **4 Significant Figures** (5, 0, 4, እና መጨረሻ ላይ ያለው 0፤ የመጀመሪያዎቹ ሦስቱ ዜሮዎች Leading zeros ስለሆኑ አይቆጠሩም)።',
      },
    ],
  },

  'chem-mod-ch2': {
    subject: 'chemistry',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ አተሞች፣ ሞለኪውሎች እና ኬሚካላዊ ስያሜ (Atoms, Ions & Nomenclature)',
    briefOverviewAm:
      'የአቶሚክ ቲዎሪ እድገት (Dalton, Thomson, Rutherford, Millikan)፣ Subatomic Particles፣ Isotopes & Average Atomic Mass፣ Periodic Table እና የIonic/Molecular/Acid Nomenclature ሕጎችን ያስተምራል።',
    briefPointsAm: [
      'Dalton’s Atomic Theory (Conservation of Mass, Definite & Multiple Proportions)፤ Thomson = Electron ($e/m$ ratio)፤ Millikan = Electron charge ($-1.602\\times 10^{-19}\\text{ C}$)፤ Rutherford = Dense Positive Nucleus (Gold foil experiment)።',
      'Atomic Number ($Z$) = የProtons ብዛት፤ Mass Number ($A$) = Protons + Neutrons፤ Charge = Protons - Electrons።',
      'Average Atomic Mass = $\\sum (\\text{Isotope Mass}_i \\times \\text{Fractional Abundance}_i)$።',
      'Nomenclature፡ Ionic (Metal + Nonmetal; NO prefixes, Roman numerals for transition metals) vs Covalent/Molecular (Nonmetal + Nonmetal; USE mono-, di-, tri-, tetra- prefixes)።',
    ],
    examTipAm:
      'Polyatomic Oxyanions፡ **-ate** ብዙ ኦክሲጅን ሲኖረው **-ite** አንድ ኦክሲጅን ያንሳል ($\\text{NO}_3^-$ nitrate vs $\\text{NO}_2^-$ nitrite)፤ አሲድ ሲሆኑ **-ate $\\rightarrow$ -ic acid**, **-ite $\\rightarrow$ -ous acid** ይሆናሉ!',
    expandedOverviewAm:
      'Chapter 2 የአተም ውስጣዊ መዋቅር እንዴት እንደተገኘ (Law of Conservation of Mass, Law of Definite Proportions, Law of Multiple Proportions, Cathode Ray Tube, Oil Drop Experiment, Alpha-Scattering Gold Foil Experiment)፣ የProton, Neutron እና Electron ባህሪያትን፣ Isotopes & Mass Spectrometryን፣ የPeriodic Table አደረጃጀትን (Groups: Alkali metals, Alkaline earth, Chalcogens, Halogens, Noble gases) እና የሁሉንም ኬሚካላዊ ውህዶች (Binary Ionic, Transition Metal Compounds, Polyatomic Compounds, Molecular/Covalent Compounds, Binary Acids & Oxyacids) IUPAC Nomenclature ሕጎችን በጥልቀት ያቀርባል።',
    learningOutcomesAm: [
      'የThomson, Millikan, Rutherford እና Chadwick ሙከራዎች ያስገኙትን ግኝት መለየት።',
      'ከ$^A_Z X^{q}$ ምልክት በመነሳት Protons, Neutrons እና Electrons መቁጠር።',
      'የIsotopes Average Atomic Mass ወይም Relative Abundance ማስላት።',
      'Ionic, Molecular, Binary Acids (hydro-...-ic acid) እና Oxyacids (-ic / -ous) ስሞችንና ፎርሙላዎችን በትክክል መጻፍ።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 Subatomic Structure, Isotopes & Average Atomic Mass',
        contentAm: `### 2.1.1 Atomic Symbolism & Isotopes
ለአንድ አተም ወይም አዮን $^A_Z \\text{X}^q$:
- **Protons ($p^+$)** = $Z$ (የኤለመንቱን ማንነት ይወስናል!)
- **Neutrons ($n^0$)** = $A - Z$
- **Electrons ($e^-$)** = $Z - q$ (Cation $+q$ ኤሌክትሮን አጥቷል፤ Anion $-q$ ኤሌክትሮን አግኝቷል)።
- **Isotopes**: ተመሳሳይ $Z$ (Protons) ነገር ግን የተለየ $A$ (Neutrons) ያላቸው የአንድ ኤለመንት አተሞች።

### 2.1.2 Average Atomic Mass Formula
$$\\text{Average Atomic Mass} = \\sum_i (m_i \\times f_i) = m_1 f_1 + m_2 f_2 + \\dots$$
(እዚህ $f_i = \\frac{\\%\\text{ Abundance}}{100}$ ሲሆን $\\sum f_i = 1$ መሆን አለበት!)`,
      },
      {
        headingAm: '2.2 Complete IUPAC Chemical Nomenclature Guide',
        contentAm: `### 2.2.1 ዋና የስያሜ ሕጎች
| ውህድ ዓይነት | መለያ (Identification) | የስያሜ ሕግ (Naming Rule) | ምሳሌ |
|---|---|---|---|
| **Type I Ionic** | Fixed-charge Metal (Grp 1, 2, $\\text{Al}^{3+}, \\text{Zn}^{2+}, \\text{Ag}^+$) + Nonmetal | Cation name + Anion root + **-ide** (No Roman, No prefix!) | $\\text{CaCl}_2$ = Calcium chloride |
| **Type II Ionic** | Variable-charge Transition Metal + Nonmetal | Metal (**Roman numeral**) + Anion | $\\text{Fe}_2\\text{O}_3$ = Iron(**III**) oxide |
| **Molecular (Covalent)** | Nonmetal + Nonmetal | Greek Prefix (mono-, di-, tri-...) + 1st element + Prefix + 2nd**-ide** | $\\text{N}_2\\text{O}_5$ = Dinitrogen pentoxide |
| **Binary Acid** (aq) | $\\text{H}$ + 1 Nonmetal (no O) | **hydro** + root + **-ic acid** | $\\text{HCl}(aq)$ = Hydrochloric acid |
| **Oxyacid** (aq) | $\\text{H}$ + Polyatomic Oxyanion | **-ate** $\\rightarrow$ **-ic acid** <br> **-ite** $\\rightarrow$ **-ous acid** | $\\text{HNO}_3$ = Nitric acid <br> $\\text{HNO}_2$ = Nitrous acid |

### 2.2.2 የግድ መታወቅ ያለባቸው Polyatomic Ions
- $\\text{NH}_4^+$ (Ammonium), $\\text{OH}^-$ (Hydroxide), $\\text{CN}^-$ (Cyanide), $\\text{NO}_3^-$ (Nitrate), $\\text{SO}_4^{2-}$ (Sulfate), $\\text{CO}_3^{2-}$ (Carbonate), $\\text{PO}_4^{3-}$ (Phosphate), $\\text{MnO}_4^-$ (Permanganate), $\\text{Cr}_2\\text{O}_7^{2-}$ (Dichromate), $\\text{ClO}_4^-$ (Perchlorate) / $\\text{ClO}_3^-$ (Chlorate) / $\\text{ClO}_2^-$ (Chlorite) / $\\text{ClO}^-$ (Hypochlorite)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'Gallium ሁለት የተፈጥሮ Isotopes አሉት፡ $^{69}\\text{Ga}$ (68.9256 amu) እና $^{71}\\text{Ga}$ (70.9247 amu)። የGallium Average Atomic Mass **69.723 amu** ከሆነ የ$^{69}\\text{Ga}$ Fractional/Percentage Abundance ስንት ነው?',
        stepsAm: [
          '1. የ$^{69}\\text{Ga}$ abundance $x$ እንበል፤ ስለዚህ የ$^{71}\\text{Ga}$ abundance $(1 - x)$ ይሆናል።',
          '2. $68.9256x + 70.9247(1 - x) = 69.723$',
          '3. $68.9256x + 70.9247 - 70.9247x = 69.723 \\implies -1.9991x = -1.2017$',
          '4. $x = \\frac{1.2017}{1.9991} \\approx 0.6011 \\implies \\mathbf{60.11\\%}$ ለ$^{69}\\text{Ga}$ እና **39.89%** ለ$^{71}\\text{Ga}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Law of Multiple Proportions', termAm: 'የብዜት ጥምርታ ሕግ', definitionAm: 'ሁለት ኤለመንቶች ከአንድ በላይ ውህድ ሲፈጥሩ የአንዱ ቋሚ ክብደት ከሌላው ጋር በትንሽ ሙሉ ቁጥር ጥምርታ ይዋሃዳል ($\\text{CO}$ vs $\\text{CO}_2$)።' },
      { termEn: 'Oxyanion', termAm: 'ኦክሲአንዮን', definitionAm: 'ኦክሲጅን እና ሌላ ኤለመንት የያዘ አሉታዊ Polyatomic Ion ($\\text{SO}_4^{2-}$, $\\text{NO}_3^-$)።' },
    ],
    examTrapsAm: [
      'Ionic ውህድ ውስጥ **Greek prefixes (di-, tri-) አትጠቀሙ!** $\\text{MgCl}_2$ *Magnesium dichloride* ሳይሆን **Magnesium chloride** ነው!',
      'Group 1, 2 እና $\\text{Al}, \\text{Zn}, \\text{Ag}, \\text{Cd}$ ላይ **Roman numeral አይጻፍም!** $\\text{Fe}^{3+}$ ግን Iron(**III**) ይፈልጋል።',
    ],
    keyTakeawaysAm: [
      'Rutherford በGold foil ሙከራ አተም በአብዛኛው ባዶ ቦታ እንደሆነና ጥቅጥቅ ያለ Positive Nucleus እንዳለው አረጋገጠ።',
      'ስያሜ ከመስጠት በፊት ውህዱ Ionic (Metal+Nonmetal), Molecular (Nonmetal+Nonmetal), ወይም Acid (starts with H, aq) መሆኑን መጀመሪያ ይለዩ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በ$^{56}_{26}\\text{Fe}^{3+}$ ውስጥ ስንት Protons, Neutrons እና Electrons አሉ?',
        answerAm: 'መልስ፡ $p^+ = 26$፣ $n^0 = 56 - 26 = 30$፣ እና $e^- = 26 - 3 = \\mathbf{23}$።',
      },
    ],
  },

  'chem-mod-ch3': {
    subject: 'chemistry',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ የሞል ጽንሰ-ሐሳብ፣ Empirical Formula እና Solution Concentration',
    briefOverviewAm:
      'Formula/Molar Mass, Avogadro\'s Number ($6.022 \\times 10^{23}$), Percent Composition, Empirical & Molecular Formulas, Molarity, Dilution ($M_1V_1 = M_2V_2$) እና Molality/Mass Percent ያስተምራል።',
    briefPointsAm: [
      '$1\\text{ mol} = 6.022 \\times 10^{23}$ particles (Avogadro\'s number $N_A$)፤ $n = \\frac{m}{MM}$።',
      'Empirical Formula Steps፡ Percent $\\rightarrow$ Mass (in 100 g) $\\rightarrow$ Moles ($\\div MM$) $\\rightarrow$ Divide by smallest mole $\\rightarrow$ Multiply by integer if needed ($0.5\\times 2$, $0.33\\times 3$, $0.25\\times 4$)።',
      'Molecular Formula Multiplier: $k = \\frac{\\text{Molar Mass}}{\\text{Empirical Formula Mass}}$፤ Molecular = $k \\times \\text{Empirical}$።',
      'Molarity ($M = \\frac{n_{\\text{solute}}}{V_{\\text{solution (L)}}}$) እና Dilution ($M_1V_1 = M_2V_2$)።',
    ],
    examTipAm:
      'Empirical Formula ስሌት ላይ ከትንሹ ሞል ካካፈሉ በኋላ **1.5** ካገኙ (ወደ 2 አያጠጋጉ!) **ሁሉንም በ2 ያባዙ** ($1.5 \\times 2 = 3$)! 1.33 ከሆነ $\\times 3$፣ 1.25 ከሆነ $\\times 4$!',
    expandedOverviewAm:
      'Chapter 3 የኬሚካላዊ ቁጥር ትስስር መሠረት የሆነውን **The Mole Concept** እና **Solution Stoichiometry**ን ያስተምራል። በMass, Moles, እና Number of Atoms/Molecules መካከል መቀያየርን፣ Percent Composition by Mass ማስላትን፣ ከPercent Composition ወይም ከCombustion Analysis መረጃ በመነሳት Empirical & Molecular Formulas መወሰንን፣ እንዲሁም Molarity ($M$), Molality ($m$), Mass Percent ($\\% w/w$), ppm/ppb እና Mole Fraction ($X$) መካከል መቀያየርን ይሸፍናል።',
    learningOutcomesAm: [
      'Mass $\\leftrightarrow$ Moles $\\leftrightarrow$ Particles ስሌቶችን ያለ ስህተት መፈጸም።',
      'ከCombustion Analysis ($\\text{CO}_2$ እና $\\text{H}_2\\text{O}$) እና ከPercent Composition በመነሳት Empirical እና Molecular Formula ማግኘት።',
      'Molarity, Dilution ($M_1V_1 = M_2V_2$) እና Mixing Solutions ($M_f = \\frac{M_1V_1 + M_2V_2}{V_1 + V_2}$) ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Mole Calculations & Empirical/Molecular Formulas',
        contentAm: `### 3.1.1 ዋና ቀመሮች
- **Moles**: $n = \\frac{\\text{Mass (g)}}{\\text{Molar Mass (g/mol)}} = \\frac{N}{N_A}$, where $N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$.
- **Percent Composition**: $\\%\\text{ Element} = \\frac{n_{\\text{atom}} \\times MM_{\\text{atom}}}{MM_{\\text{compound}}} \\times 100\\%$.
- **Combustion Analysis Trick (for $C_xH_yO_z$)**:
  - $\\text{mol C} = \\text{mol CO}_2$፤ $\\text{mol H} = \\mathbf{2} \\times \\text{mol H}_2\\text{O}$ (ውሃ ውስጥ 2 H ስላለ!)።
  - $\\text{Mass of O} = \\text{Total Sample Mass} - (\\text{Mass C} + \\text{Mass H})$።`,
      },
      {
        headingAm: '3.2 Solution Concentration Units & Dilution',
        contentAm: `### 3.2.1 የConcentration መለኪያዎች ሰንጠረዥ
| Unit | Formula | Temperature Dependent? |
|---|---|---|
| **Molarity ($M$)** | $\\frac{\\text{moles of solute}}{\\text{Liters of solution}}$ | **Yes** (Volume expands with $T$) |
| **Molality ($m$)** | $\\frac{\\text{moles of solute}}{\\text{kg of solvent}}$ | **No** (Mass doesn't change with $T$) |
| **Mass % ($\\% w/w$)** | $\\frac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100\\%$ | **No** |
| **Mole Fraction ($X_A$)** | $\\frac{n_A}{n_{\\text{total}}}$ | **No** |
| **Dilution** | $M_1 V_1 = M_2 V_2$ | (Solute moles remain constant!) |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ Organic compound **40.0% C, 6.7% H, እና 53.3% O** አለው። Molar Mass = **180.16 g/mol** ከሆነ Empirical እና Molecular Formula ስንት ነው?',
        stepsAm: [
          '1. 100 g ናሙና እንውሰድ: 40.0 g C, 6.7 g H, 53.3 g O.',
          '2. ወደ ሞል መቀየር: $n_C = \\frac{40.0}{12.01} = 3.33$, $n_H = \\frac{6.7}{1.008} = 6.65$, $n_O = \\frac{53.3}{16.00} = 3.33$.',
          '3. በትንሹ (3.33) ማካፈል: $C = 1$, $H = 2$, $O = 1 \\implies$ **Empirical Formula = $\\text{CH}_2\\text{O}$** (Mass = $30.03\\text{ g/mol}$).',
          '4. $k = \\frac{180.16}{30.03} = 6 \\implies$ **Molecular Formula = $\\text{C}_6\\text{H}_{12}\\text{O}_6$** (Glucose)!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Empirical Formula', termAm: 'ቀላል የአተም ጥምርታ ፎርሙላ', definitionAm: 'በውህድ ውስጥ ያሉትን ኤለመንቶች በትንሹ ሙሉ ቁጥር ጥምርታ የሚያሳይ ፎርሙላ።' },
      { termEn: 'Molarity', termAm: 'ሞላሪቲ (M)', definitionAm: 'በ1 ሊትር Solution ውስጥ የሚገኝ የSolute ሞል ብዛት ($\text{mol/L}$)።' },
    ],
    examTrapsAm: [
      'Dilution ሲጠየቅ "How much water must be **added**?" ከተባለ $V_{\\text{added}} = V_2 - V_1$ እንጂ $V_2$ ብቻውን አይደለም!',
      'Molality ($m$) denominator ውስጥ ያለው የ**Solvent** ክብደት (kg) እንጂ የSolution ክብደት አይደለም!',
    ],
    keyTakeawaysAm: [
      'በDilution ጊዜ Solute ሞሎች ስለማይቀየሩ $M_1V_1 = M_2V_2$ ሁልጊዜ ይሠራል።',
      'Molarity ከDensity እና Mass% በቀላሉ ይገኛል (Assume 1 L or 100 g basis)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ 200 mL የሆነ 0.5 M $\\text{NaCl}$ solution ለመቀጠን (dilute) ወደ 0.1 M ለማድረስ ስንት mL ውኃ መጨመር አለበት?',
        answerAm: 'መልስ፡ $V_2 = \\frac{0.5 \\times 200}{0.1} = 1000\\text{ mL}$። ስለዚህ የሚጨመረው ውኃ = $1000 - 200 = \\mathbf{800\\text{ mL}}$!',
      },
    ],
  },

  'chem-mod-ch4': {
    subject: 'chemistry',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ Stoichiometry, Limiting Reactant, Percent Yield እና Redox Reactions',
    briefOverviewAm:
      'Chemical Equations ማመጣጠን፣ Reaction Types (Precipitation, Acid-Base, Redox), Limiting vs Excess Reactant, Percent Yield, Titration እና Oxidation-Reduction Balancingን በዝርዝር ያስተምራል።',
    briefPointsAm: [
      'Limiting Reactant፡ ለመጀመሪያ ጊዜ የሚያልቅና የሚመረተውን **Theoretical Yield** የሚወስን Reactant ነው! (ምንጊዜም $n \\div \\text{coefficient}$ በትንሹ ይለያል)።',
      'Percent Yield = $\\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\times 100\\%$ (ሁልጊዜ $< 100\\%$)።',
      'Oxidation (OIL = Loss of $e^-$, Oxidation Number $\\uparrow$) vs Reduction (RIG = Gain of $e^-$, Oxidation Number $\\downarrow$)።',
      'Strong Acids (7): $\\text{HCl, HBr, HI, HNO}_3, \\text{H}_2\\text{SO}_4, \\text{HClO}_3, \\text{HClO}_4$።',
    ],
    examTipAm:
      'Oxidizing Agent = ራሱ **Reduced** የሚሆነው ንጥረ ነገር ነው! Reducing Agent = ራሱ **Oxidized** የሚሆነው ነው — እንዳትምታቱ!',
    expandedOverviewAm:
      'Chapter 4 በኬሚካላዊ ምላሾች ውስጥ ያለውን የክብደትና የሞል ትስስር (**Reaction Stoichiometry**) እንዲሁም ሦስቱን ዋና የAqueous Reactions ዓይነቶች (Precipitation + Net Ionic Equations, Acid-Base Neutralization + Titrations, Oxidation-Reduction Reactions + Half-Reaction Method) በጥልቀት ይሸፍናል። በተጨማሪም በLimiting Reactant እና Excess Reactant መካከል ያለውን ስሌት (የተረፈውን Excess mass ጨምሮ) እና Gravimetric Analysis ይተነትናል።',
    learningOutcomesAm: [
      'Solubility Rules በመጠቀም Molecular, Complete Ionic እና Net Ionic Equations መጻፍ።',
      'Limiting Reactant፣ Theoretical Yield፣ Excess Reactant Leftover እና Percent Yield ማስላት።',
      'Oxidation Numbers መመደብ እና Redox Equationsን በHalf-Reaction Method (Acidic & Basic medium) ማመጣጠን።',
      'Acid-Base እና Redox Titration (Molarity & Unknown mass%) ችግሮችን መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Limiting Reactant, Excess Leftover & Yield',
        contentAm: `### 4.1.1 ፈጣን የፈተና ስልት (Shortcut for Limiting Reactant)
ለምላሽ $aA + bB \\rightarrow cC$:
1. የሁለቱንም Reactants ሞል ($n_A, n_B$) ፈልጉ።
2. $\\frac{n_A}{a}$ እና $\\frac{n_B}{b}$ አስሉ — **ትንሹን ቁጥር የሚሰጠው Limiting Reactant** ነው! (በግራም ብዛት ትንሹን አትምረጡ — በሞል ጥምርታ ብቻ!)።
3. Product ($n_C$) የሚሰላው **ከLimiting Reactant ብቻ** ነው።
4. **Percent Yield**: $\\%\\text{ Yield} = \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\times 100\\%$።`,
      },
      {
        headingAm: '4.2 Redox Balancing (Half-Reaction Method) & Titrations',
        contentAm: `### 4.2.1 Oxidation Number Rules & Balancing
- Free element = $0$፤ Monatomic ion = charge፤ $\\text{F} = -1$፤ $\\text{O} = -2$ (Peroxides $\\text{H}_2\\text{O}_2$ ውስጥ $-1$, $\\text{OF}_2$ ውስጥ $+2$)፤ $\\text{H} = +1$ (Metal hydrides $\\text{NaH}$ ውስጥ $-1$)።
- **Half-Reaction Balancing in Acidic Solution**:
  1. Split into Oxidation & Reduction half-reactions.
  2. Balance atoms other than O and H.
  3. Balance **O** by adding $\\text{H}_2\\text{O}$.
  4. Balance **H** by adding $\\text{H}^+$.
  5. Balance charge by adding $e^-$.
  6. Equalize $e^-$ and add half-reactions.
- *(For **Basic Solution**: follow steps 1–6, then add equal $\\text{OH}^-$ to both sides to cancel every $\\text{H}^+$ into $\\text{H}_2\\text{O}$!)*`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'በ$2\\text{Al}(s) + 3\\text{Cl}_2(g) \\rightarrow 2\\text{AlCl}_3(s)$ ውስጥ $5.40\\text{ g Al}$ ($MM=27.0$) እና $21.3\\text{ g Cl}_2$ ($MM=71.0$) ቢገናኙ Limiting Reactant ማን ነው? Theoretical Yield ($MM=133.3$) ስንት ግራም ነው?',
        stepsAm: [
          '1. $n_{\\text{Al}} = \\frac{5.40}{27.0} = 0.200\\text{ mol}$፤ $n_{\\text{Cl}_2} = \\frac{21.3}{71.0} = 0.300\\text{ mol}$.',
          '2. Divide by coefficients: Al = $\\frac{0.200}{2} = 0.100$፤ Cl2 = $\\frac{0.300}{3} = 0.100$.',
          '3. ሁለቱም እኩል ስለሆኑ በStoichiometric ratio ሙሉ በሙሉ ያልቃሉ (ሁለቱም Limiting ናቸው)!',
          '4. $n_{\\text{AlCl}_3} = 0.200\\text{ mol} \\implies \\text{Mass} = 0.200 \\times 133.3 = \\mathbf{26.66\\text{ g}}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Spectator Ions', termAm: 'ተመልካች አዮኖች', definitionAm: 'በAqueous ምላሽ ውስጥ ሳይቀየሩ በሁለቱም በኩል የሚገኙና ከNet Ionic Equation የሚወጡ አዮኖች።' },
      { termEn: 'Equivalence Point', termAm: 'የእኩልነት ነጥብ', definitionAm: 'በTitration ውስጥ የሚጨመረው Titrant ሞል ከAnalyte ጋር በትክክለኛ Stoichiometric ratio እኩል የሚሆንበት ነጥብ።' },
    ],
    examTrapsAm: [
      'Titration ላይ $\\text{H}_2\\text{SO}_4 + 2\\text{NaOH} \\rightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$ ሲሆን $M_a V_a = M_b V_b$ **አይሠራም**! የ1:2 ratio ስላለ $\\frac{M_a V_a}{1} = \\frac{M_b V_b}{2}$ መጠቀም ግዴታ ነው!',
    ],
    keyTakeawaysAm: [
      'Spectator ions (Group 1, $\\text{NO}_3^-$, $\\text{NH}_4^+$) በNet Ionic Equation ውስጥ አይጻፉም።',
      'Limiting reactant ሁልጊዜ በMole-to-Coefficient ጥምርታ እንጂ በግራም ብዛት አይለካም።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በ$\\text{K}_2\\text{Cr}_2\\text{O}_7$ ውስጥ የChromium ($\\text{Cr}$) Oxidation Number ስንት ነው?',
        answerAm: 'መልስ፡ $2(+1) + 2x + 7(-2) = 0 \\implies 2x = +12 \\implies x = \\mathbf{+6}$።',
      },
    ],
  },

  'chem-mod-ch5': {
    subject: 'chemistry',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ Quantum Theory, Electron Configurations እና Periodic Trends',
    briefOverviewAm:
      'Electromagnetic Radiation ($c = \\lambda\\nu$, $E = h\\nu$), Photoelectric Effect, Bohr Model, de Broglie & Heisenberg, Four Quantum Numbers ($n, l, m_l, m_s$), Aufbau Exceptions ($\\text{Cr}, \\text{Cu}$) እና Periodic Trends ያስተምራል።',
    briefPointsAm: [
      'Wave-Particle Equations፡ $c = \\lambda \\nu$ ($c = 3.0\\times 10^8\\text{ m/s}$) እና $E = h\\nu = \\frac{hc}{\\lambda}$ ($h = 6.626\\times 10^{-34}\\text{ J}\\cdot\\text{s}$)።',
      'Four Quantum Numbers፡ $n \\ge 1$ (Shell), $l = 0..n-1$ ($s=0, p=1, d=2, f=3$), $m_l = -l..+l$ (Orbital orientation), $m_s = \\pm \\frac{1}{2}$ (Spin)።',
      'Aufbau Exceptions፡ $\\text{Cr}\\,(Z=24) = [\\text{Ar}]4s^1 3d^5$ እና $\\text{Cu}\\,(Z=29) = [\\text{Ar}]4s^1 3d^{10}$ (Half-filled & fully-filled $d$ orbitals stability!)።',
      'Periodic Trends (Top-Right $\\nearrow$)፡ Ionization Energy $\\uparrow$, Electronegativity $\\uparrow$, Electron Affinity $\\uparrow$፤ Atomic Radius ግን **Bottom-Left** ($\\swarrow$) $\\uparrow$!',
    ],
    examTipAm:
      'Transition metal Cations (ለምሳሌ $\\text{Fe}^{2+}$) ሲፈጠሩ ኤሌክትሮን መጀመሪያ የሚነሳው ከከፍተኛው Shell (**$4s$**) እንጂ ከ$3d$ አይደለም! ($\\text{Fe} = [\\text{Ar}]4s^2 3d^6 \\rightarrow \\text{Fe}^{2+} = [\\text{Ar}]3d^6$)።',
    expandedOverviewAm:
      'Chapter 5 ከClassical Physics ወደ Quantum Mechanics የተደረገውን ሽግግርና የዘመናዊ Periodic Table መሠረትን ይዳስሳል። Planck\'s Quantum Theory, Einstein\'s Photoelectric Effect, Hydrogen Emission Spectrum (Balmer, Lyman, Paschen series & Rydberg Equation), de Broglie Wavelength ($\\lambda = \\frac{h}{mv}$), Heisenberg Uncertainty Principle, የ4ቱ Quantum Numbers ገደቦች፣ Pauli Exclusion Principle, Hund\'s Rule (Paramagnetic vs Diamagnetic) እና የAtomic Radius, Ionic Radius (Isoelectronic series), Ionization Energy (IE1 vs IE2 jumps) እና Electron Affinity (N, Be, Noble gas exceptions) ይተነትናል።',
    learningOutcomesAm: [
      'የፎቶን Wavelength, Frequency, Energy እና Hydrogen Electron Transition ($n_i \\rightarrow n_f$) ማስላት።',
      'የሚቻሉ እና የማይቻሉ Quantum Number ስብስቦችን ($n, l, m_l, m_s$) መለየት።',
      'የአተሞችንና የTransition Metal Ionsን Electron Configuration ($s, p, d, f$) እና Unpaired electrons (Paramagnetic vs Diamagnetic) መወሰን።',
      'Isoelectronic ions ($\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^-, \\text{Na}^+, \\text{Mg}^{2+}$) በመጠን መደርደርና የIE/EA ልዩነቶችን ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 Quantum Equations & Four Quantum Numbers',
        contentAm: `### 5.1.1 ቁልፍ ቀመሮች
- **Photon Energy**: $E = h\\nu = \\frac{hc}{\\lambda}$
- **Bohr Hydrogen Energy**: $E_n = -2.18 \\times 10^{-18}\\text{ J}\\left(\\frac{1}{n^2}\\right)$, $\\Delta E = -2.18 \\times 10^{-18}\\text{ J}\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$
- **de Broglie Wavelength**: $\\lambda = \\frac{h}{mv}$

### 5.1.2 Quantum Numbers Rules ($n, l, m_l, m_s$)
| Symbol | Name | Allowed Values | Determines |
|---|---|---|---|
| $n$ | Principal | $1, 2, 3, \\dots$ | Energy & Size (Max $e^- = 2n^2$) |
| $l$ | Angular Momentum | $0$ to $n-1$ ($s=0,p=1,d=2,f=3$) | Subshell **Shape** |
| $m_l$ | Magnetic | $-l, \\dots, 0, \\dots, +l$ | Orbital **Orientation** ($2l+1$ orbitals) |
| $m_s$ | Spin | $+\\frac{1}{2}$ or $-\\frac{1}{2}$ | Electron Spin (Max $2$ $e^-$ per orbital) |`,
      },
      {
        headingAm: '5.2 Electron Configurations & Periodic Exceptions',
        contentAm: `### 5.2.1 Periodic Trend Exceptions (በፈተና በጣም የሚጠየቁ!)
1. **First Ionization Energy ($IE_1$) Drops**:
   - **Group 2 vs Group 13** ($\\text{Be} > \\text{B}$, $\\text{Mg} > \\text{Al}$): የB ኤሌክትሮን በከፍተኛ energy $2p$ orbital ውስጥ ስለሆነ በቀላሉ ይነሳል።
   - **Group 15 vs Group 16** ($\\text{N} > \\text{O}$, $\\text{P} > \\text{S}$): የ$\text{N}$ ($2p^3$) Half-filled stability አለው፤ የ$\text{O}$ ($2p^4$) ግን electron-electron repulsion ስላለው $IE_1$ ትንሽ ዝቅ ይላል!
2. **Isoelectronic Series**: ተመሳሳይ Electron ቁጥር ሲኖር **ብዙ Proton ($Z$) ያለው ትንሹ (Smallest Radius)** ነው! ($\\text{Mg}^{2+} < \\text{Na}^+ < \\text{F}^- < \\text{O}^{2-} < \\text{N}^{3-}$)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የሚከተሉት Quantum Number ስብስቦች መካከል **የማይቻለው (Invalid)** የቱ ነው? (A) $(3, 2, -2, +\\frac{1}{2})$ (B) $(2, 2, 0, -\\frac{1}{2})$ (C) $(4, 0, 0, +\\frac{1}{2})$ (D) $(5, 3, -1, -\\frac{1}{2})$',
        stepsAm: [
          '1. ሕጉ $0 \\le l \\le n - 1$ እና $|m_l| \\le l$ ነው።',
          '2. በ(B) $(2, 2, 0, -\\frac{1}{2})$ ላይ $n = 2$ እና $l = 2$ ተሰጥቷል። ግን $l$ እስከ $n-1 = 1$ ብቻ ነው የሚፈቀደው ($2d$ orbital የለም)!',
          '3. ስለዚህ **(B)** የማይቻል ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Pauli Exclusion Principle', termAm: 'የፓውሊ መገለል መርህ', definitionAm: 'በአንድ አተም ውስጥ ሁለት ኤሌክትሮኖች አራቱንም Quantum Numbers ተመሳሳይ ሊኖራቸው አይችልም (በ1 orbital ቢበዛ 2 ተቃራኒ spin $e^-$)።' },
      { termEn: 'Hund’s Rule', termAm: 'የሁንድ ሕግ', definitionAm: 'Degenerate orbitals ሲሞሉ መጀመሪያ በአንድ አቅጣጫ spin አንድ አንድ ኤሌክትሮን ከገባ በኋላ ይጣመራሉ።' },
    ],
    examTrapsAm: [
      'Emission = ከፍተኛ $n$ ወደ ዝቅተኛ $n$ ($\\Delta E < 0$, photon emitted)፤ Absorption = ዝቅተኛ $n$ ወደ ከፍተኛ $n$ ($\\Delta E > 0$)።',
      'Paramagnetic = $\\ge 1$ unpaired electron (መግነጢሳዊ)፤ Diamagnetic = ሁሉም የተጣመሩ (paired) ናቸው።',
    ],
    keyTakeawaysAm: [
      'Cation ሲፈጠር መጀመሪያ ከፍተኛው $n$ ($4s$ ከ$3d$ በፊት!) ኤሌክትሮኖችን ያጣል።',
      'Isoelectronic ions ላይ Radius ከNuclear charge ($Z$) ጋር Inverse relationship አለው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የ$\\text{Mn}^{2+}$ ($Z=25$) Electron Configuration እና የUnpaired Electrons ብዛት ስንት ነው?',
        answerAm: 'መልስ፡ $\\text{Mn} = [\\text{Ar}]4s^2 3d^5 \\implies \\text{Mn}^{2+} = [\\text{Ar}]3d^5$፤ **5 unpaired electrons** (strongly paramagnetic!)።',
      },
    ],
  },

  'chem-mod-ch6': {
    subject: 'chemistry',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ ኬሚካላዊ ትስስር፣ Lewis Structures, VSEPR, Hybridization እና Polarity',
    briefOverviewAm:
      'Ionic vs Covalent Bonding, Born-Haber/Lattice Energy, Lewis Structures, Octet Exceptions, Formal Charge, Resonance, Bond Enthalpy ($\\Delta H$), VSEPR Molecular Geometry, Hybridization ($sp, sp^2, sp^3, sp^3d, sp^3d^2$) እና Molecular Polarityን ያስተምራል።',
    briefPointsAm: [
      'Formal Charge (FC) = $\\text{Valence } e^- - (\\text{Nonbonding } e^- + \\frac{1}{2}\\text{Bonding } e^-)$ (ምርጡ Lewis structure FC ወደ 0 የቀረበ እና Negative FC በMost Electronegative atom ላይ ሲሆን ነው)።',
      'VSEPR Shapes (Electron domains)፡ 2 = Linear ($180^\\circ, sp$), 3 = Trigonal planar ($120^\\circ, sp^2$), 4 = Tetrahedral ($109.5^\\circ, sp^3$), 5 = Trigonal bipyramidal ($sp^3d$), 6 = Octahedral ($sp^3d^2$)።',
      'Lone pairs ከBonding pairs በላይ ስለሚገፉ Bond Angle ይቀንሳሉ ($\\text{CH}_4\\,109.5^\\circ > \\text{NH}_3\\,107^\\circ > \\text{H}_2\\text{O}\\,104.5^\\circ$)።',
      '$\\Delta H_{\\text{rxn}} \\approx \\sum BE(\\text{Bonds Broken}) - \\sum BE(\\text{Bonds Formed})$ (Reactants minus Products — ከ$\\Delta H_f^\\circ$ ተቃራኒ!)።',
    ],
    examTipAm:
      'Bond Enthalpy ($BE$) ስሌት **Reactants minus Products** ነው! ($\Delta H_f^\circ$ ግን Products minus Reactants ነው — ይህንን አትቀላቅሉ!)። Single bond = $1\\sigma$፤ Double bond = $1\\sigma + 1\\pi$፤ Triple bond = $1\\sigma + 2\\pi$።',
    expandedOverviewAm:
      'Chapter 6 ሞለኪውሎች እንዴት እንደሚያያዙና ባለ3-ልኬት ቅርጻቸው (3D Geometry) እንዴት እንደሚወሰን የሚያሳይ የChemistry ዋና ምዕራፍ ነው። Lattice Energy ($E \\propto \\frac{Q_1 Q_2}{r}$), Electronegativity difference (Nonpolar $<0.4$, Polar covalent $0.4–1.8$, Ionic $>1.8$), የLewis Structure አሳሳልና Octet Exceptions (Incomplete octet $\\text{Be, B}$፣ Odd-electron radicals $\\text{NO}$፣ Expanded octet Period $\\ge 3$ like $\\text{PCl}_5, \\text{SF}_6$), Formal Charge & Resonance, Bond Length/Strength, VSEPR Electron vs Molecular Geometry table, Polarity (Dipole cancellation in symmetric geometries), Valence Bond Hybridization እና Molecular Orbital (MO) Bond Order & $\\text{O}_2$ Paramagnetismን ይሸፍናል።',
    learningOutcomesAm: [
      'Lattice Energyን በIon charges እና Ionic radii መሠረት ማወዳደር።',
      'ትክክለኛ Lewis Structures መሳል፣ Formal Charge ማስላት እና ዋና Resonance Contributor መምረጥ።',
      'የማንኛውንም ሞለኪውል Electron Geometry, Molecular Geometry, Approximate Bond Angles, Hybridization እና Polarity መተንበይ።',
      'Bond Order ($\\frac{1}{2}(N_b - N_a)$) እና $\\sigma/\\pi$ bonds ብዛት ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 VSEPR Geometries, Bond Angles & Hybridization Master Table',
        contentAm: `### 6.1.1 Complete VSEPR & Hybridization Chart
| Steric # (Domains) | Bonding / Lone Pairs | Electron Geometry | Molecular Geometry | Angle | Hybridization | Example |
|---|---|---|---|---|---|---|
| **2** | 2 BP, 0 LP | Linear | **Linear** | $180^\\circ$ | $sp$ | $\\text{CO}_2, \\text{BeCl}_2$ |
| **3** | 3 BP, 0 LP | Trigonal Planar | **Trigonal Planar** | $120^\\circ$ | $sp^2$ | $\\text{BF}_3, \\text{SO}_3$ |
| **3** | 2 BP, 1 LP | Trigonal Planar | **Bent (Angular)** | $<120^\\circ$ | $sp^2$ | $\\text{SO}_2, \\text{O}_3$ |
| **4** | 4 BP, 0 LP | Tetrahedral | **Tetrahedral** | $109.5^\\circ$ | $sp^3$ | $\\text{CH}_4, \\text{NH}_4^+$ |
| **4** | 3 BP, 1 LP | Tetrahedral | **Trigonal Pyramidal** | $\\approx 107^\\circ$ | $sp^3$ | $\\text{NH}_3, \\text{PCl}_3$ |
| **4** | 2 BP, 2 LP | Tetrahedral | **Bent** | $\\approx 104.5^\\circ$ | $sp^3$ | $\\text{H}_2\\text{O}, \\text{OF}_2$ |
| **5** | 5 BP, 0 LP | Trig. Bipyramidal | **Trigonal Bipyramidal** | $90^\\circ, 120^\\circ$ | $sp^3d$ | $\\text{PCl}_5$ |
| **5** | 4 BP, 1 LP | Trig. Bipyramidal | **Seesaw** | $<90^\\circ, <120^\\circ$ | $sp^3d$ | $\\text{SF}_4$ |
| **5** | 3 BP, 2 LP | Trig. Bipyramidal | **T-shaped** | $<90^\\circ$ | $sp^3d$ | $\\text{ClF}_3$ |
| **5** | 2 BP, 3 LP | Trig. Bipyramidal | **Linear** | $180^\\circ$ | $sp^3d$ | $\\text{XeF}_2, \\text{I}_3^-$ |
| **6** | 6 BP, 0 LP | Octahedral | **Octahedral** | $90^\\circ$ | $sp^3d^2$ | $\\text{SF}_6$ |
| **6** | 5 BP, 1 LP | Octahedral | **Square Pyramidal** | $<90^\\circ$ | $sp^3d^2$ | $\\text{BrF}_5$ |
| **6** | 4 BP, 2 LP | Octahedral | **Square Planar** | $90^\\circ$ | $sp^3d^2$ | $\\text{XeF}_4$ |`,
      },
      {
        headingAm: '6.2 Molecular Polarity, Bond Enthalpy & MO Theory',
        contentAm: `### 6.2.1 Molecular Polarity Shortcut
- **Nonpolar by Symmetry**: ሁሉም የውጭ አተሞች ተመሳሳይ ሆነው ቅርጹ Linear (0 LP or 3 LP like $\\text{XeF}_2$), Trigonal planar (0 LP), Tetrahedral (0 LP like $\\text{CCl}_4$), Trigonal bipyramidal (0 LP), Octahedral (0 LP), ወይም **Square Planar ($\\text{XeF}_4$)** ከሆነ Dipoles ስለሚጣፉ **Nonpolar** ነው!
- **Polar**: $\\text{H}_2\\text{O}$ (Bent), $\\text{NH}_3$ (Trigonal pyramidal), $\\text{SF}_4$ (Seesaw), $\\text{ClF}_3$ (T-shaped), $\\text{BrF}_5$ (Square pyramidal) — Asymmetric geometries!
- **MO Bond Order**: $BO = \\frac{1}{2}(\\text{Bonding } e^- - \\text{Antibonding } e^-)$ ($BO > 0$ stable; $\\text{O}_2$ has $BO=2$ with 2 unpaired $e^-$ in $\\pi^*_{2p}$ $\\implies$ **Paramagnetic**!)`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የ$\\text{XeF}_4$ን Molecular Geometry, Hybridization, Bond Angle እና Polarity ወስኑ (Xe = Group 18, 8 valence $e^-$)።',
        stepsAm: [
          '1. Total valence $e^- = 8 + 4(7) = 36\\,e^-$.',
          '2. 4 single $\\text{Xe–F}$ bonds ($8\\,e^-$), F octets ($24\\,e^-$) $\\rightarrow$ 4 leftover $e^-$ = **2 lone pairs** on Xe.',
          '3. Steric number = 4 bonding + 2 lone pairs = **6 electron domains** $\\implies$ Octahedral electron geometry & **$sp^3d^2$** hybridization.',
          '4. 2ቱ Lone pairs በተቃራኒ (180°) ስለሚቀመጡ Molecular Geometry = **Square Planar**, Bond Angle = **$90^\\circ$**, እና Symmetrical ስለሆነ **Nonpolar**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Formal Charge', termAm: 'ፎርማል ቻርጅ', definitionAm: 'በሞለኪውል ውስጥ ያለ አተም በእኩል ትስስር ሲከፋፈል የሚኖረው ምናባዊ ቻርጅ።' },
      { termEn: 'Lattice Energy', termAm: 'የላቲስ ኃይል', definitionAm: '1 ሞል Ionic solid ከጋዝ አዮኖች ሲፈጠር የሚለቀቀው (ወይም ለመበተን የሚያስፈልገው) ኃይል።' },
    ],
    examTrapsAm: [
      'Period 2 ኤለመንቶች ($\\text{C, N, O, F}$) በፍጹም **Expanded Octet** (> 8 electrons) መያዝ አይችሉም! ($d$-orbitals የላቸውም)።',
      'Trigonal Bipyramidal (Steric #5) ውስጥ Lone pairs ሁልጊዜ **Equatorial** ቦታ ($120^\\circ$) ላይ ይቀመጣሉ፤ Axial ($90^\\circ$) ላይ አይቀመጡም!',
    ],
    keyTakeawaysAm: [
      'Polar covalent bonds ያሉት ሞለኪውል ($\\text{CO}_2, \\text{BF}_3, \\text{CCl}_4, \\text{XeF}_4$) Symmetry ካለው አጠቃላይ ሞለኪውሉ **Nonpolar** ይሆናል።',
      'Triple bond ከDouble፣ Double ከSingle bond በጥንካሬ ይበልጣሉ ነገር ግን በርዝመት ያጥራሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በAcetonitrile ($\\text{CH}_3\\text{C}\\equiv\\text{N}$) ውስጥ ስንት $\\sigma$ እና ስንት $\\pi$ bonds አሉ?',
        answerAm: 'መልስ፡ 3 $\\text{C–H}$ ($3\\sigma$), 1 $\\text{C–C}$ ($1\\sigma$), 1 $\\text{C}\\equiv\\text{N}$ ($1\\sigma + 2\\pi$) $\\implies$ ጠቅላላ **$5\\sigma$ እና $2\\pi$ bonds**!',
      },
    ],
  },

  'chem-mod-ch7': {
    subject: 'chemistry',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ Chemical Equilibrium, Acid-Base pH እና Buffer Solutions',
    briefOverviewAm:
      'Equilibrium Constants ($K_c, K_p = K_c(RT)^{\\Delta n}$), Reaction Quotient ($Q$ vs $K$), Le Châtelier’s Principle, ICE Tables, Weak Acids/Bases ($K_a, K_b$), Salt Hydrolysis, Henderson-Hasselbalch Buffers እና $K_{sp}$ Solubilityን ያስተምራል።',
    briefPointsAm: [
      '$K$ አገላለጽ ውስጥ **Pure Solids (s) እና Pure Liquids (l) አይገቡም!** ($K_p = K_c(RT)^{\\Delta n_g}$, $\\Delta n_g = \\text{mol gas prod} - \\text{mol gas react}$)።',
      '$Q < K \\rightarrow$ Forward shift (ወደ ቀኝ)፤ $Q > K \\rightarrow$ Reverse shift (ወደ ግራ)፤ $Q = K \\rightarrow$ Equilibrium።',
      'Le Châtelier’s Principle፡ ሙቀት (Temperature) ብቻ ነው የ$K$ ዋጋን የሚቀይረው! Catalyst $K$ን አይቀይርም፤ Equilibrium በፍጥነት እንዲደረስ ብቻ ያደርጋል።',
      'pH & Buffers፡ $\\text{pH} = -\\log[\\text{H}^+]$፣ $\\text{pH} + \\text{pOH} = 14$ (25°C)፣ $K_a \\times K_b = K_w = 10^{-14}$፣ Henderson-Hasselbalch: $\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{A}^-]}{[\\text{HA}]}$።',
    ],
    examTipAm:
      '5% Approximation Shortcut for Weak Acids: $[\\text{H}^+] \\approx \\sqrt{K_a \\cdot C_0}$ (ይህ የሚሠራው $\\frac{\\sqrt{K_a C_0}}{C_0} < 5\\%$ ወይም $C_0 / K_a > 400$ ሲሆን ነው፤ ካልሆነ Quadratic formula ይጠቀሙ)።',
    expandedOverviewAm:
      'Chapter 7 በPhysical Chemistry ፈተናዎች ውስጥ ከፍተኛውን ድርሻ የሚይዘውን **Chemical & Ionic Equilibria** ይሸፍናል። $K_c$ እና $K_p$ ትስስርን፣ $K$ manipulation rules (reversing $\\rightarrow 1/K$, multiplying by $n \\rightarrow K^n$, adding reactions $\\rightarrow K_1 \\times K_2$)፣ Le Châtelier’s Principle (Concentration, Pressure/Volume, Inert Gas, Endothermic vs Exothermic Temperature shifts)፣ Brønsted-Lowry & Lewis Acids/Bases፣ Strong vs Weak Acids/Bases pH ስሌት፣ Polyprotic Acids, Salt Hydrolysis (Acidic, Basic, Neutral salts), Buffer Action & Buffer Capacity, Acid-Base Titration Curves (pH at half-equivalence = $\\text{p}K_a$) እና Solubility Product ($K_{sp}$) + Common Ion Effectን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      '$K_c, K_p$ እና Reaction Quotient ($Q$) በመጠቀም የምላሽ አቅጣጫንና Equilibrium Concentrationsን (ICE Table) ማስላት።',
      'የConcentration, Volume/Pressure, Temperature እና Catalyst ለውጦች በEquilibrium እና በ$K$ ላይ ያላቸውን ተጽዕኖ መተንበይ።',
      'የWeak Acids/Bases, Salt Solutions እና Buffer Solutions pH በICE Table እና Henderson-Hasselbalch ቀመር ማስላት።',
      'ከ$K_{sp}$ molar solubility ማግኘትና Common Ion effect + Precipitation ($Q_{sp}$ vs $K_{sp}$) መፈተሽ።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 Equilibrium Constants, Q vs K & Le Châtelier',
        contentAm: `### 7.1.1 $K_c$, $K_p$ እና Le Châtelier ማጠቃለያ
- **Equation**: $K_p = K_c(RT)^{\\Delta n_g}$, where $R = 0.0821\\text{ L}\\cdot\\text{atm/(mol}\\cdot\\text{K)}$.
- **Manipulations**: Reverse $\\implies K' = \\frac{1}{K}$፤ Multiply by $n \\implies K' = K^n$፤ Add steps $\\implies K_{\\text{net}} = K_1 \\cdot K_2$.
- **Le Châtelier Shifts**:
  - Pressure $\\uparrow$ (Volume $\\downarrow$): ወደ **ትንሽ ጋዝ ሞል** ጎን ይሸጋገራል ($K$ አይቀየርም)።
  - Inert gas added at constant $V$: **ምንም Shift የለም!**
  - Endothermic ($\\Delta H > 0$, Heat as reactant): $T\\uparrow \\implies$ Right shift & **$K$ increases**!
  - Exothermic ($\\Delta H < 0$, Heat as product): $T\\uparrow \\implies$ Left shift & **$K$ decreases**!`,
      },
      {
        headingAm: '7.2 Acid-Base Equilibria, Salt Hydrolysis, Buffers & Ksp',
        contentAm: `### 7.2.1 pH & Buffer Equations
- **pH Relations (at 25°C)**: $\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$፤ $\\text{pOH} = -\\log[\\text{OH}^-]$፤ $\\text{pH} + \\text{pOH} = 14$፤ $K_a \\cdot K_b = K_w = 1.0 \\times 10^{-14}$.
- **Salt Hydrolysis Quick Rule**:
  - Strong Acid + Strong Base ($\\text{NaCl}, \\text{KNO}_3$) $\\implies$ **Neutral ($\text{pH}=7$)**
  - Strong Acid + Weak Base ($\\text{NH}_4\\text{Cl}$) $\\implies$ **Acidic ($\text{pH}<7$)**
  - Weak Acid + Strong Base ($\\text{CH}_3\\text{COONa}, \\text{NaF}$) $\\implies$ **Basic ($\text{pH}>7$)**
- **Henderson-Hasselbalch (Buffers)**:
  $$\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{Conjugate Base}]}{[\\text{Weak Acid}]}\\right)$$
  (Maximum buffer capacity at $[\\text{A}^-] = [\\text{HA}] \\implies \\mathbf{\\text{pH} = \\text{p}K_a}$!)`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          '0.20 M Acetic Acid ($\\text{CH}_3\\text{COOH}$, $K_a = 1.8 \\times 10^{-5}$) እና 0.20 M $\\text{CH}_3\\text{COONa}$ በእኩል Volume ቢደባለቁ (ወይም አንድ ላይ 0.20 M / 0.20 M ቢሆኑ) እና 0.10 M Acid / 0.20 M Conjugate Base ከሆነ pH ስንት ነው? ($\\log 2 = 0.30$)',
        stepsAm: [
          '1. $\\text{p}K_a = -\\log(1.8 \\times 10^{-5}) = 4.74$.',
          '2. ለ0.10 M HA እና 0.20 M $\\text{A}^-$: $\\text{pH} = 4.74 + \\log\\left(\\frac{0.20}{0.10}\\right) = 4.74 + \\log(2)$.',
          '3. $\\text{pH} = 4.74 + 0.30 = \\mathbf{5.04}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Buffer Solution', termAm: 'ባፈር መፍትሔ', definitionAm: 'ትንሽ Strong Acid ወይም Strong Base ሲጨመር የpH ለውጥን የሚቋቋም Weak Acid/Conjugate Base ጥንድ።' },
      { termEn: 'Common Ion Effect', termAm: 'የጋራ አዮን ተጽዕኖ', definitionAm: 'በመፍትሔው ውስጥ ቀድሞ ያለ የጋራ አዮን በመጨመሩ የWeak Electrolyte ionization ወይም Solubility መቀነስ።' },
    ],
    examTrapsAm: [
      'Pure Solid ወይም Pure Liquid ቢጨመር (e.g., $\\text{CaCO}_3(s)$ መጨመር) **Equilibriumን በፍጹም አይቀይርም!** Concentration ቋሚ ስለሆነ!',
      '1:2 salt እንደ $\\text{CaF}_2$ ($\\text{Ca}^{2+} + 2\\text{F}^-$) ላይ $K_{sp} = s(2s)^2 = \\mathbf{4s^3}$ እንጂ $s^2$ ወይም $2s^3$ አይደለም!',
    ],
    keyTakeawaysAm: [
      'Temperature ብቻ ነው Equilibrium Constant ($K$) ዋጋን የሚቀይረው።',
      'Conjugate pair Strong Acid $\\leftrightarrow$ Extremely Weak Base (No hydrolysis)፤ Weak Acid $\\leftrightarrow$ Measurable Weak Base (Hydrolyzes)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ ለ$\\text{Ag}_2\\text{CrO}_4$ ($K_{sp} = 4.0 \\times 10^{-12}$) Molar Solubility ($s$) በ$s$ terms እንዴት ይጻፋል?',
        answerAm: 'መልስ፡ $[\\text{Ag}^+] = 2s, [\\text{CrO}_4^{2-}] = s \\implies K_{sp} = (2s)^2(s) = 4s^3 \\implies s = \\sqrt[3]{\\frac{K_{sp}}{4}} = \\mathbf{1.0 \\times 10^{-4}\\text{ M}}$!',
      },
    ],
  },

  'chem-mod-ch8': {
    subject: 'chemistry',
    chapterNumber: 8,
    titleAm: 'ምዕራፍ 8፡ ኦርጋኒክ ኬሚስትሪ — Hydrocarbons እና Functional Groups',
    briefOverviewAm:
      'Alkanes, Alkenes, Alkynes, Aromatic Hydrocarbons, Alcohols, Ethers, Aldehydes, Ketones, Carboxylic Acids, Esters, Amines, Amides, IUPAC Naming, Isomerism, Markovnikov’s Rule እና Oxidation/Esterification reactions ያስተምራል።',
    briefPointsAm: [
      'Hydrocarbon Formulas፡ Alkanes ($C_nH_{2n+2}$, $sp^3$ Substitution), Alkenes ($C_nH_{2n}$, $sp^2$ Addition), Alkynes ($C_nH_{2n-2}$, $sp$ Addition)።',
      'Markovnikov’s Rule ($\\text{HX}$ ወደ Alkene ሲጨመር)፡ $\\text{H}^+$ ብዙ $\\text{H}$ ወዳለው $C$ ይሄዳል ("The rich get richer")፤ $\\text{X}^-$ ደግሞ ጥቂት $\\text{H}$ ወዳለው (More substituted) $C$ ይገባል።',
      'Alcohol Oxidation፡ $1^\\circ$ Alcohol $\\xrightarrow{\\text{PCC}}$ Aldehyde $\\xrightarrow{\\text{KMnO}_4/\\text{CrO}_3}$ Carboxylic Acid፤ $2^\\circ$ Alcohol $\\rightarrow$ Ketone፤ $3^\\circ$ Alcohol $\\rightarrow$ No Reaction!',
      'Fischer Esterification: $\\text{Carboxylic Acid} + \\text{Alcohol} \\xrightarrow{\\text{H}^+} \\text{Ester} + \\text{H}_2\\text{O}$፤ Saponification (Ester + Base $\\rightarrow$ Soap/Salt + Alcohol)።',
    ],
    examTipAm:
      'IUPAC Priority Order (ከፍተኛ $\\rightarrow$ ዝቅተኛ): **Carboxylic Acid ($-\\text{oic acid}$) > Ester ($-\\text{oate}$) > Amide ($-\\text{amide}$) > Aldehyde ($-\\text{al}$) > Ketone ($-\\text{one}$) > Alcohol ($-\\text{ol}$) > Amine ($-\\text{amine}$) > Alkene/Alkyne**!',
    expandedOverviewAm:
      'Chapter 8 የOrganic Chemistry መሠረትንና የሁሉንም ዋና Functional Groups አወቃቀር፣ IUPAC ስያሜ (Longest chain, Lowest locant, Alphabetical order)፣ Structural & Geometric (cis/trans, E/Z) Isomerism፣ Physical Properties (Hydrogen bonding & Boiling point order: Carboxylic acid > Amide > Alcohol > Ketone/Aldehyde > Ester/Ether > Alkane) እና ዋና ዋና ኬሚካላዊ ምላሾችን (Alkene Addition, Benzene Electrophilic Aromatic Substitution, Alcohol Oxidation, Tollens/Fehling Tests for Aldehydes, Fischer Esterification, Amide hydrolysis) ያስተምራል።',
    learningOutcomesAm: [
      'Alkanes, Alkenes, Alkynes, Haloalkanes, Alcohols, Aldehydes, Ketones, Carboxylic Acids, Esters እና Aminesን በIUPAC ስም መሰየምና መሳል።',
      'Structural Isomers እና Alkene Geometric ($cis/trans$ or $E/Z$) Isomers መለየት።',
      'Markovnikov Addition, Elimination (Zaitsev’s rule), Alcohol Oxidation እና Esterification ምርቶችን መተንበይ።',
      'Functional Groupsን በBoiling point እና Water solubility ደረጃ መደርደር።',
    ],
    sectionsAm: [
      {
        headingAm: '8.1 Functional Groups Priority, Naming & Boiling Point Table',
        contentAm: `### 8.1.1 Functional Groups & Suffixes
| Class | Functional Group | IUPAC Suffix | Prefix (if lower priority) | H-Bonding? |
|---|---|---|---|---|
| **Carboxylic Acid** | $-\\text{COOH}$ | **-oic acid** | carboxy- | **Strongest** (Dimers!) |
| **Ester** | $-\\text{COOR}$ | alkyl **-oate** | alkoxycarbonyl- | No (H-acceptor only) |
| **Amide** | $-\\text{CONH}_2$ | **-amide** | carbamoyl- | Strong (if $1^\\circ/2^\\circ$) |
| **Aldehyde** | $-\\text{CHO}$ | **-al** | oxo- / formyl- | No |
| **Ketone** | $-\\text{CO}-$ | **-one** | oxo- | No |
| **Alcohol** | $-\\text{OH}$ | **-ol** | hydroxy- | **Yes** |
| **Amine** | $-\\text{NH}_2$ | **-amine** | amino- | Yes ($1^\\circ/2^\\circ$) |
| **Ether** | $-\\text{O}-$ | alkoxyalkane | alkoxy- | No |

### 8.1.2 ዋና የላብራቶሪ መለያ ሙከራዎች (Qualitative Organic Tests)
- **Bromine Water Test ($\\text{Br}_2 / \\text{CCl}_4$)**: ቀይ-ቡናማ ቀለም ወዲያው ካጠፋ (Decolorizes) = **Alkene / Alkyne** (Unsaturated)! Alkane & Benzene (ያለ catalyst) አያጠፉም።
- **Tollens’ Reagent ($[\\text{Ag}(\\text{NH}_3)_2]^+$)**: Silver mirror የሚፈጥረው **Aldehyde** ብቻ ነው (**Ketone አይመልስም!**)።`,
      },
      {
        headingAm: '8.2 Key Organic Reactions Summary',
        contentAm: `### 8.2.1 Must-Know Reaction Pathways
1. **Alkene + $\\text{HBr}$** $\\rightarrow$ Markovnikov product (Br goes to more substituted C); **with ROOR peroxide** $\\rightarrow$ Anti-Markovnikov!
2. **Alcohol Dehydration** ($\\text{H}_2\\text{SO}_4$, heat) $\\rightarrow$ **Alkene** (Zaitsev’s Rule: More substituted, more stable alkene dominates!).
3. **Oxidation**:
   - $1^\\circ\\text{ R–CH}_2\\text{OH} + \\text{PCC} \\rightarrow \\text{Aldehyde}$ ($\\text{R–CHO}$); $+ \\text{K}_2\\text{Cr}_2\\text{O}_7/\\text{H}^+ \\rightarrow \\text{Carboxylic Acid}$ ($\\text{R–COOH}$).
   - $2^\\circ\\text{ R}_2\\text{CH–OH} + \\text{CrO}_3 \\rightarrow \\text{Ketone}$.
   - $3^\\circ$ Alcohol $\\rightarrow$ **No oxidation** (Carbon lacks $\\alpha$-H!).`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'Propene ($\\text{CH}_3–\\text{CH}=\\text{CH}_2$) ከ$\\text{H}_2\\text{O}$ ጋር በ$\\text{H}_2\\text{SO}_4$ ድጋፍ ሲዋሃድ ዋናው ምርት ማን ነው?',
        stepsAm: [
          '1. Acid-catalyzed hydration የMarkovnikov Addition ይከተላል።',
          '2. $\\text{H}^+$ ብዙ $\\text{H}$ ወዳለው $\\text{CH}_2$ ጫፍ (C1) ይገባል።',
          '3. $-\\text{OH}$ ጥቂት $\\text{H}$ ወዳለው C2 ይገባል $\\implies \\text{CH}_3–\\text{CH(OH)}–\\text{CH}_3$ (**Propan-2-ol**, $2^\\circ$ alcohol)!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Isomers', termAm: 'አይሶመሮች', definitionAm: 'ተመሳሳይ Molecular Formula ኖሯቸው የተለየ አወቃቀር ወይም 3D አቀማመጥ ያላቸው ውህዶች።' },
      { termEn: 'Degree of Unsaturation (IHD)', termAm: 'ያልጠገበ ትስስር መለኪያ', definitionAm: '$\\text{IHD} = C + 1 - \\frac{H + X - N}{2}$ (እያንዳንዱ Ring ወይም $\\pi$-bond IHD በ1 ይጨምራል)።' },
    ],
    examTrapsAm: [
      'Geometric ($cis/trans$) Isomerism የሚኖረው **እያንዳንዱ** የDouble Bond ካርቦን **ሁለት የተለያዩ Groups** ሲኖሩት ብቻ ነው! $\\text{CH}_2=\\text{CHCl}$ $cis/trans$ የለውም!',
      'Ester ($\\text{R–COO–R\'}$) ስያሜ ውስጥ ከO ጋር የተያያዘው **R\'** መጀመሪያ (-yl) ይጻፋል፤ የCarbonyl ($\\text{R–C=O}$) ክፍል ደግሞ **-oate** ይሆናል!',
    ],
    keyTakeawaysAm: [
      'Boiling Point Order (ተመሳሳይ Molar Mass): Carboxylic acid > Alcohol > Aldehyde/Ketone > Ether > Alkane.',
      'Tertiary alcohols oxidize አይሆኑም፤ Ketones ደግሞ በTollens/Fehling reagents oxidize አይሆኑም።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ Ethyl propanoate ከየትኞቹ Carboxylic acid እና Alcohol ይሠራል?',
        answerAm: 'መልስ፡ "Ethyl" = **Ethanol** ($\\text{CH}_3\\text{CH}_2\\text{OH}$), "propanoate" = **Propanoic acid** ($\\text{CH}_3\\text{CH}_2\\text{COOH}$)።',
      },
    ],
  },

  'chem1012-ch1': {
    subject: 'chemistry',
    chapterNumber: 9,
    titleAm: 'ምዕራፍ 9፡ Stereochemistry, $S_N1$ vs $S_N2$ Pathways እና Electrochemistry',
    briefOverviewAm:
      'Stereochemical Chirality ($R/S$ Cahn-Ingold-Prelog), Optical Activity & Enantiomers/Diastereomers, $S_N1$ vs $S_N2$ Kinetics/Stereochemistry, $E1/E2$ እና Galvanic Cells ($E^\\circ_{\\text{cell}}, \\Delta G^\\circ, \\text{Nernst}$) ያስተምራል።',
    briefPointsAm: [
      'Chiral Center፡ 4 የተለያዩ Groups የተያያዙበት $sp^3$ ካርቦን! Max stereoisomers = $2^n$። Enantiomers = Non-superimposable mirror images፤ Meso compound = Chiral centers ኖሮት Symmetry plane ስላለው Achiral ነው!',
      '$S_N2$ ($\\text{Rate} = k[\\text{Sub}][\\text{Nuc}]$)፡ Concerted, **Backside attack $\\rightarrow$ Walden Inversion** ($R\\leftrightarrow S$), Favored by $1^\\circ > 2^\\circ$ substrate, Strong Nucleophile, Polar Aprotic solvent (DMSO, Acetone)።',
      '$S_N1$ ($\\text{Rate} = k[\\text{Sub}]$)፡ Two-step via **Carbocation**, **Racemization** (50:50 $R+S$), Favored by $3^\\circ > 2^\\circ$ substrate, Weak Nucleophile, Polar Protic solvent ($\\text{H}_2\\text{O}, \\text{ROH}$)።',
      'Electrochemistry፡ **AN OX** (Anode = Oxidation, negative in galvanic), **RED CAT** (Cathode = Reduction, positive in galvanic)፤ $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$፤ $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$።',
    ],
    examTipAm:
      'Standard Reduction Potential ($E^\\circ$) ሁለቱንም Half-reactions **መቀነስ (Reduction)** አድርገው ካስቀመጡ በኋላ ቀጥታ $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{red}}(\\text{cathode}) - E^\\circ_{\\text{red}}(\\text{anode})$ ይጠቀሙ — $E^\\circ$ intensive ስለሆነ በstoichiometric coefficients **አያባዙት!**',
    expandedOverviewAm:
      'ይህ ማጠቃለያ ምዕራፍ ሁለት ከፍተኛ የዩኒቨርሲቲ ፈተና ርዕሶችን ያጣምራል፡ (1) **Stereochemistry & Substitution/Elimination Kinetics**: Chirality, Cahn-Ingold-Prelog ($R/S$) priority rules, Enantiomers vs Diastereomers vs Meso compounds, Optical rotation, እና $S_N2$ vs $S_N1$ vs $E2$ vs $E1$ decision matrix። (2) **Electrochemistry**: Galvanic vs Electrolytic cells, Cell notation ($\\text{Anode} \\mid \\text{Anode ion} \\parallel \\text{Cathode ion} \\mid \\text{Cathode}$), Standard Cell Potential ($E^\\circ_{\\text{cell}} > 0$ spontaneous), Free Energy relationship ($\\Delta G^\\circ = -nFE^\\circ = -RT\\ln K$), Nernst Equation ($E = E^\\circ - \\frac{0.0592}{n}\\log Q$ at 298 K) እና Faraday\'s Law of Electrolysis ($m = \\frac{I \\cdot t \\cdot MM}{n \\cdot F}$)።',
    learningOutcomesAm: [
      'Cahn-Ingold-Prelog ሕግ በመጠቀም $R$ እና $S$ Configuration መመደብ እና Enantiomers, Diastereomers & Meso compounds መለየት።',
      'Substrate ($1^\\circ/2^\\circ/3^\\circ$), Nucleophile strength እና Solvent በመመርመር $S_N1$ vs $S_N2$ ምላሽን መወሰን።',
      'Galvanic cell diagram መጻፍ፣ Anode/Cathode መለየት እና $E^\\circ_{\\text{cell}}, \\Delta G^\\circ, K$ እና non-standard $E_{\\text{cell}}$ (Nernst) ማስላት።',
      'Faraday’s Law በመጠቀም በElectroplating/Electrolysis የሚለቀቀውን የብረት ክብደት ($m$) ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '9.1 Chirality (R/S) እና $S_N1$ vs $S_N2$ Comparison Matrix',
        contentAm: `### 9.1.1 $S_N2$ vs $S_N1$ Master Comparison
| ባህሪ | $S_N2$ Pathway | $S_N1$ Pathway |
|---|---|---|
| **Kinetics (Rate Law)** | Bimolecular: $\\text{Rate} = k[\\text{R–X}][\\text{Nu}]$ | Unimolecular: $\\text{Rate} = k[\\text{R–X}]$ |
| **Mechanism** | 1-step concerted (No intermediate!) | 2-step via **Carbocation intermediate** |
| **Substrate Order** | **Methyl $> 1^\\circ > 2^\\circ$** ($3^\\circ$ = NO rxn!) | **$3^\\circ > 2^\\circ$** ($1^\\circ$ / Methyl = NO rxn!) |
| **Nucleophile** | **Strong** ($\\text{OH}^-, \\text{CN}^-, \\text{RS}^-, \\text{RO}^-$) | **Weak** ($\\text{H}_2\\text{O}, \\text{CH}_3\\text{OH}$) |
| **Solvent** | **Polar Aprotic** (DMSO, DMF, Acetone) | **Polar Protic** ($\\text{H}_2\\text{O}, \\text{ROH}$) |
| **Stereochemistry** | **100% Inversion** (Walden) | **Racemization** ($\\approx 50\\% R + 50\\% S$) |`,
      },
      {
        headingAm: '9.2 Galvanic Electrochemistry, Nernst & Faraday Equations',
        contentAm: `### 9.2.1 Essential Electrochemistry Formulas
- **Cell Potential**: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$ (Spontaneous when $E^\\circ_{\\text{cell}} > 0$)
- **Thermodynamic Bridge**: $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}} = -RT\\ln K$ ($F = 96,485\\text{ C/mol } e^-$)
- **Nernst Equation (at $25^\\circ\\text{C} = 298\\text{ K}$)**:
  $$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592\\text{ V}}{n}\\log Q$$
- **Faraday’s Electrolysis**:
  $$\\text{moles of } e^- = \\frac{I \\cdot t}{F} \\qquad \\text{mass deposited} = \\frac{I \\cdot t \\cdot MM}{n \\cdot F}$$`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'ለZn–Cu Galvanic Cell: $\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn}$ ($E^\\circ = -0.76\\text{ V}$) እና $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$ ($E^\\circ = +0.34\\text{ V}$)። $E^\\circ_{\\text{cell}}$ እና $\\Delta G^\\circ$ አስሉ ($F = 96,500\\text{ C/mol}$)!',
        stepsAm: [
          '1. ትልቁ $E^\\circ$ (+0.34 V, Cu) Cathode (Reduced) ይሆናል፤ ትንሹ (-0.76 V, Zn) Anode (Oxidized) ይሆናል።',
          '2. $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.34 - (-0.76) = \\mathbf{+1.10\\text{ V}}$.',
          '3. $n = 2\\text{ mol } e^-$፤ $\\Delta G^\\circ = -nFE^\\circ = -(2)(96,500)(1.10) = -212,300\\text{ J} = \\mathbf{-212.3\\text{ kJ}}$ (Spontaneous!)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Enantiomers', termAm: 'ኢናንቲዮመሮች', definitionAm: 'የማይገጣጠሙ የመስታወት ምስሎች (Non-superimposable mirror images) — ሁሉም Chiral centers ተቃራኒ ($R\\leftrightarrow S$) ናቸው።' },
      { termEn: 'Salt Bridge', termAm: 'የጨው ድልድይ', definitionAm: 'በGalvanic cell ውስጥ Cations ወደ Cathode እና Anions ወደ Anode በመላክ የኤሌክትሪክ ሚዛን (Electrical neutrality) የሚጠብቅ ክፍል።' },
    ],
    examTrapsAm: [
      'Cahn-Ingold-Prelog ($R/S$) ላይ ዝቅተኛው Priority Group (#4, ብዙውን ጊዜ H) **ወደ እኛ (Wedge)** ከመጣ clockwise $S$ እና counter-clockwise $R$ ይሆናል (ይገለበጣል)!',
      'Half-reaction በ2 ሲባዛ $n$ በ2 ይባዛል እንጂ **$E^\\circ$ በፍጹም በ2 አይባዛም** (Voltage intensive ባህሪ ነው)!',
    ],
    keyTakeawaysAm: [
      '$E^\\circ_{\\text{cell}} > 0 \\iff \\Delta G^\\circ < 0 \\iff K > 1$ (Spontaneous Galvanic Cell)።',
      '$S_N1$ ከCarbocation rearrangement ($1^\\circ \\rightarrow 2^\\circ \\rightarrow 3^\\circ$ hydride/methyl shift) ጋር ሊሄድ ይችላል፤ $S_N2$ ግን Carbocation ስለሌለው Rearrangement የለውም!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $(R)$-2-Bromobutane ከ$\\text{NaOH}$ ጋር በDMSO solvent ውስጥ $S_N2$ ምላሽ ሲያደርግ የሚገኘው $(R)$-2-Butanol ነው ወይስ $(S)$-2-Butanol?',
        answerAm: 'መልስ፡ $S_N2$ 100% Backside attack ስለሚያደርግ Configuration ይገለበጣል $\\implies$ **$(S)$-2-Butanol**!',
      },
    ],
  },
};
