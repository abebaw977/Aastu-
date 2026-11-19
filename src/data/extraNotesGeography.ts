import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Geography of Ethiopia and the Horn (Geography - 8 Chapters)
 * Preserves all existing notes and adds geological stratigraphy tables, lapse rate derivations,
 * hydrological balances, demographic formulas, and exam traps for all 8 chapters.
 */
export const EXTRA_NOTES_GEOGRAPHY: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Introduction
  1: [
    {
      id: 'geo-extra-c1-sec1',
      heading: '1.4 Masterclass: Astronomical Compactness Indices, Grid Referencing & Contour Topography',
      content: `### 1.4.1 Shape Compactness Indices of Ethiopia
The geographic shape of a state impacts border defense, transport integration, and administrative coherence. Compactness is measured mathematically relative to a theoretical circle (the most compact geometric shape):
1. **Area-to-Boundary (Circularity) Ratio ($C$)**:
   $$C = \\frac{4\\pi \\cdot \\text{Area}}{(\\text{Perimeter})^2}$$
   - A perfect circle has $C = 1.0$. Ethiopia's index is $\\sim 0.65\\text{--}0.70$, indicating a **moderately compact shape**.
2. **Boyce-Clark Index of Radial Compactness**:
   Computes standard deviation of radial distances from the geometric center to peripheral boundaries. Low variance signifies high circular compactness.
3. **Implications of Ethiopia\'s Compact Shape**:
   - Shortens boundary length relative to total land area ($1,106,000\\text{ km}^2$), reducing national border defense expenses.
   - Facilitates radial road/railway network construction radiating outward from the central capital, Addis Ababa.

---

### 1.4.2 Topographic Contour Interpretation Mechanics
- **Contour Lines (Isohypses)**: Lines connecting points of equal elevation above mean sea level.
- **Contour Interval (CI)**: Vertical distance between two consecutive contour lines:
  $$\\text{CI} = \\frac{\\text{Difference between Index Contours}}{\\text{Number of intervals between them}}$$
- **Slope (Gradient) Formula**:
  $$\\text{Gradient} = \\frac{\\text{Vertical Interval (VI)}}{\\text{Horizontal Equivalent (HE)}} \\times 100\\% = \\tan(\\theta)$$
- **Topographic Landform Signatures**:
  - **Steep Slope**: Contours spaced very closely together.
  - **Gentle Slope**: Contours spaced widely apart.
  - **Uniform (Even) Slope**: Contours spaced at equal, uniform distances.
  - **Concave Slope**: Contours closely spaced at high elevation (top) and widely spaced at low elevation (base).
  - **Convex Slope**: Contours widely spaced at the top and closely packed near the base.
  - **River Valley / Spur Rule**: Contour "V" or "U" bends pointing **upstream (toward higher ground)** indicate a **river valley**; contours pointing **downhill (toward lower ground)** indicate a **ridge or spur**.`,
      equations: [
        {
          name: 'Topographic Slope Gradient Formula',
          formula: '\\text{Gradient (\\%)} = \\frac{\\text{Vertical Interval (m)}}{\\text{Horizontal Distance (m)}} \\times 100\\%',
          description: 'Used on topographic maps to determine road slope and erosion vulnerability.'
        }
      ],
      workedExamples: [
        {
          problem: 'On a $1:50,000$ topographic map, two mountain peaks $A$ and $B$ are separated by a map distance of $6\\text{ cm}$. Peak $A$ has an elevation of $2800\\text{ m}$ and Peak $B$ has an elevation of $2200\\text{ m}$. Calculate: (1) The actual ground distance in kilometers; (2) The vertical interval (VI); (3) The average slope gradient in percentage.',
          stepByStepSolution: [
            'Step 1 (Ground Distance): Scale is $1\\text{ cm} = 50,000\\text{ cm} = 500\\text{ m} = 0.5\\text{ km}$. Ground distance $\\text{HE} = 6\\text{ cm} \\times 0.5\\text{ km} = 3.0\\text{ km} = 3000\\text{ m}$.',
            'Step 2 (Vertical Interval): $\\text{VI} = 2800\\text{ m} - 2200\\text{ m} = 600\\text{ m}$.',
            'Step 3 (Slope Gradient): $\\text{Gradient} = \\frac{\\text{VI}}{\\text{HE}} \\times 100\\% = \\frac{600\\text{ m}}{3000\\text{ m}} \\times 100\\% = 20.0\\%$.'
          ],
          shortcutTip: 'Map distance to real distance: multiply by map scale denominator and convert centimeters to meters/kilometers.'
        }
      ],
      examTraps: [
        'Confusing small scale with large scale maps: A $1:1,000,000$ map is a SMALL SCALE map (shows large area with low detail); a $1:25,000$ map is a LARGE SCALE map (shows small area with high detail).',
        'Misinterpreting contour V-shapes: Contours pointing toward higher elevations indicate valleys/streams; contours pointing downhill indicate spurs/ridges.'
      ],
      keyTakeaways: [
        'Ethiopia extends across $12^\\circ$ latitude ($3^\\circ\\text{N}$ to $15^\\circ\\text{N}$) and $15^\\circ$ longitude ($33^\\circ\\text{E}$ to $48^\\circ\\text{E}$).',
        'Local solar time varies by 1 full hour between Akobo (west) and the eastern tip of Ogaden.'
      ]
    }
  ],

  // Chapter 2: The Geology of Ethiopia and the Horn
  2: [
    {
      id: 'geo-extra-c2-sec1',
      heading: '2.4 Masterclass: Chronological Stratigraphy of Ethiopia from Precambrian to Cenozoic',
      content: `### 2.4.1 Geological Evolution of the Horn of Africa
The landforms of Ethiopia are the cumulative product of endogenic tectonic forces and exogenic weathering over four major geological eras:

| Geological Era & Time Span | Major Tectonic & Geological Events | Resulting Rock Formations in Ethiopia | Key Economic Resources & Minerals |
| :--- | :--- | :--- | :--- |
| **Precambrian Era** (Before $600\\text{ Ma}$ — $>80\\%$ of geological time) | Orogeny, intense metamorphism, and deep intrusive igneous activity. Continental crust consolidation. | **Basement Complex Rocks** (Metamorphic: Schist, Gneiss, Quartzite; Intrusive igneous: Granite, Diorite). Exposed in northern Tigray, western lowlands, southern Sidama/Borena. | **Primary Metallic Minerals**: Gold (*Adola* greenstone belt), Tantalum (*Kenticha*), Platinum (*Yubdo*), Nickel, Marble, Granite quarries. |
| **Paleozoic Era** ($600\\text{--}250\\text{ Ma}$) | Prolonged continental denudation, weathering, and **peneplanation** (land flattened to base level); no marine transgression. | Sediments were mostly eroded away and washed into ancestral seas; limited Paleozoic sandstone remnants in northern Ethiopia. | Base level erosion exposed the ancient Precambrian crystalline basement rocks. |
| **Mesozoic Era** ($250\\text{--}70\\text{ Ma}$) | **Mesozoic Marine Transgression (Sinking)** and subsequent **Regression (Uplift)** caused by continental tilting toward the southeast: | **Triassic**: **Adigrat Sandstone** (continental fluvial deposit).<br>**Jurassic**: **Antalo Limestone** (warm shallow marine sea, rich in fossils).<br>**Cretaceous**: **Upper Sandstone** (regressive deltaic deposits). | **Non-Metallic Minerals**: Limestone for Portland cement (Muger, Dire Dawa, Dejen), gypsum, building stones, potential petroleum/gas reservoir rocks (Ogaden). |
| **Cenozoic Era** ($70\\text{ Ma}$ to Present) | 1. **Arabian-Somali Swell & Uplift**: Huge dome uplifted Ethiopian plateau.<br>2. **Rifting & Tectonism**: Tension fractures formed the **Great East African Rift Valley**.<br>3. **Extensive Volcanism**: Trap Series flood basalts followed by Aden volcanic series.<br>4. **Quaternary Glaciation & Pluvial Periods**: Lake expansion, carving of rift lakes, and alluvial deposition. | **Volcanic Rocks**: Basalts (Ashangi & Magdala groups), Rhyolites, Trachytes, Tuffs, Ignimbrites.<br>**Quaternary Alluvial & Lacustrine Deposits**: Danakil evaporites (potash, halite salt). | **Evaporites**: Potash (*Danakil Depression* / Dallol), Rock salt (*Amole*), Soda ash (Lake Abijatta), Geothermal energy (Aluto-Langano, Tendaho). |`,
      keyTakeaways: [
        'The Mesozoic sedimentary succession from bottom to top is: Adigrat Sandstone $\\to$ Antalo Limestone $\\to$ Upper Sandstone.',
        'The Afar Depression is an active tectonic triple junction where the African (Nubian), Somali, and Arabian plates diverge.'
      ]
    }
  ],

  // Chapter 3: The Topography of Ethiopia and the Horn
  3: [
    {
      id: 'geo-extra-c3-sec1',
      heading: '3.4 Masterclass: Topographic Relief Divisions & Structural Geomorphology of the Highlands',
      content: `### 3.4.1 The Three Major Physiographic Units of Ethiopia
Over $56\\%$ of Ethiopia's landmass lies above $1,000\\text{ m}$ elevation, earning the country the title *"The Roof of East Africa"*:
1. **The Western Highlands and Lowlands**:
   - **Western Highlands**: Includes the **Tigray Plateau**, **North Central Massifs** (featuring Ethiopia's highest peak, **Ras Dejen at $4,533\\text{ m}$** in the Simien Mountains), **Shewan Plateau** (central watershed dividing Abay, Awash, and Omo basins), and **Southwestern Plateaus** (heavily forested, source of coffee, high rainfall: Keffa, Illubabor).
   - **Western Lowlands**: Bordering Sudan/South Sudan (Tekeze, Abay-Dinder, Baro-Akobo).
2. **The Southeastern Highlands and Lowlands**:
   - **Southeastern Highlands**: Divided into the **Hararghe Plateau** (rising abruptly from the Afar lowlands), **Arsi-Bale Massifs** (second highest summit: **Mount Tullu Deemtu at $4,377\\text{ m}$** in the Bale Mountains, Sanetti plateau), and **Sidama Plateau**.
   - **Southeastern Lowlands**: The vast, gently sloping arid plains of **Ogaden**, **Elkeri**, and **Borena**.
3. **The Rift Valley System**:
   - Divided into **Three Distinct Physiographic Sub-Units**:
     1. **The Afar Triangle (Danakil Depression)**: Lowest elevation in Africa (**Lake Asale / Dallol at $-125\\text{ m}$** below sea level), active basalt shield volcano **Erta Ale** (continuous molten lava lake).
     2. **The Main Ethiopian Rift (Central MER)**: Extending from Lake Ziway to Lake Chamo; narrowest and highest floor elevation ($1,600\\text{--}1,800\\text{ m}$).
     3. **The Southern Rift (Chew Bahir / Stephanie Rift)**: Bordering northern Kenya.`,
      keyTakeaways: [
        'Ras Dejen ($4,533\\text{ m}$) in the Simien Mountains is the highest point; Dallol ($-125\\text{ m}$) in the Afar Depression is the lowest point.',
        'The Ethiopian Rift Valley bisects the Ethiopian highlands into northwestern and southeastern massifs.'
      ]
    }
  ],

  // Chapter 4: Drainage Systems and Water Resource
  4: [
    {
      id: 'geo-extra-c4-sec1',
      heading: '4.4 Masterclass: Hydrographic Basins, Runoff Balances & Multipurpose Dam Engineering',
      content: `### 4.4.1 Ethiopia\'s Three Major Drainage Systems

| Drainage System | Major River Basins | Drainage Characteristics | Destination / Outflow | Hydro-Development Potential |
| :--- | :--- | :--- | :--- | :--- |
| **1. Western (Mediterranean) Drainage System** | **Abay (Blue Nile)**, **Tekeze (Atbara)**, **Baro-Akobo**, **Gibe-Omo** *(endorheic south)*. | **Carries $>60\\%$ of Ethiopia's total annual runoff**. Rivers have steep gradients, deep gorges, and immense hydroelectric energy potential. | **Mediterranean Sea** via the Nile River in Egypt/Sudan (Baro, Abay, Tekeze); Omo empties into Lake Turkana. | **Grand Ethiopian Renaissance Dam (GERD)** on Abay ($5,150\\text{ MW}$); Gilgel Gibe III ($1,870\\text{ MW}$) on Omo; Tekeze Dam ($300\\text{ MW}$). |
| **2. Southeastern (Indian Ocean) Drainage System** | **Wabi Shebelle**, **Genale-Dawa**. | Drains the southeastern plateaus across semi-arid plains; long courses with high seasonal flow variability. | **Indian Ocean** (Genale-Dawa reaches ocean as Juba in Somalia; Wabi Shebelle dries up in sands before reaching ocean). | Genale Dawa III ($254\\text{ MW}$); extensive irrigation potential in lower valleys (Melka Wakena Dam). |
| **3. Inland (Rift Valley) Closed Drainage System** | **Awash River**, Lake Ziway-Langano-Abijatta-Shalla system, Lake Hawassa, Lake Chamo-Abaya. | Endorheic (no outlet to the sea); rivers terminate in salty terminal lakes or evaporate in arid lowlands. | Terminate in inland lakes (Awash terminates in **Lake Abbe** on the Djibouti border). | **Most utilized river for commercial irrigation in Ethiopia** (Wonji-Shoa, Metehara, Kesem sugarcane estates); Koka Dam. |

---

### 4.4.2 Ethiopian Lakes: Genesis and Limnological Types
1. **Tectonic Rift Lakes**: Formed in faulted graben depressions of the Rift Valley floor (**Lake Abaya** [largest rift lake, $1,162\\text{ km}^2$], **Chamo**, **Hawassa**, **Ziway** [freshwater], **Abijatta** [alkaline soda], **Shalla** [deepest lake in Ethiopia, $266\\text{ m}$]).
2. **Volcanic Caldera & Crater Lakes**: Formed inside explosive volcanic craters (Bishoftu crater lakes: Babogaya, Hora, Bishoftu; Mount Zuqualla crater lake; Wonchi crater lake).
3. **Highland Dammed Lake**: **Lake Tana** ($3,600\\text{ km}^2$, largest lake in Ethiopia, source of the Blue Nile/Abay), formed when Quaternary basalt lava flows dammed the ancestral outlet of northern highland streams.`,
      keyTakeaways: [
        'Ethiopia is the "Water Tower of East Africa", producing over 122 billion cubic meters of surface runoff annually.',
        'Awash River is the most commercially developed river in Ethiopia for irrigation agriculture and agro-industry.'
      ]
    }
  ],

  // Chapter 5: The Climate of Ethiopia and the Horn
  5: [
    {
      id: 'geo-extra-c5-sec1',
      heading: '5.4 Masterclass: Orographic Lapse Rate Calculations, The ITCZ Mechanism & Five Agro-Ecological Zones',
      content: `### 5.4.1 Altitude and Lapse Rate Mechanics in Tropical Climates
In tropical Ethiopia, altitude modifies temperature far more than latitude. Temperature drops predictably with increasing altitude:
- **Environmental (Normal) Lapse Rate (ELR)**: Average temperature decrease of **$6.5^\\circ\\text{C}$ per $1,000\\text{ m}$ elevation gain** ($0.0065^\\circ\\text{C/m}$).
  $$T_{\\text{target}} = T_{\\text{base}} - \\left[\\frac{\\Delta h}{1000} \\times 6.5^\\circ\\text{C}\\right]$$

---

### 5.4.2 The Five Traditional Agro-Ecological Zones of Ethiopia

| Agro-Climatic Zone | Elevation Range (m) | Mean Annual Temp ($^\\circ\\text{C}$) | Annual Rainfall (mm) | Dominant Vegetation & Typical Crops |
| :--- | :--- | :--- | :--- | :--- |
| **1. Wurch (Alpine / Cold Highlands)** | $>3,300\\text{ m}$ | $<10^\\circ\\text{C}$ (frequent frost) | $900\\text{--}1,400\\text{ mm}$ | Afroalpine moorland, Giant Lobelia, Erica arborea; limited barley cultivation, sheep rearing. |
| **2. Dega (Cool / Temperate Highlands)** | $2,300\\text{--}3,300\\text{ m}$ | $10^\\circ\\text{--}15^\\circ\\text{C}$ | $900\\text{--}2,000\\text{ mm}$ | Hagenia, Juniperus, Podocarpus; Barley, Wheat, Pulses (faba beans), Potatoes, Cattle, Sheep. High settlement density! |
| **3. Woina Dega (Warm / Sub-Tropical Highlands)** | $1,500\\text{--}2,300\\text{ m}$ | $15^\\circ\\text{--}20^\\circ\\text{C}$ | $800\\text{--}2,200\\text{ mm}$ | **The most ideal agricultural zone**; Teff, Maize, Sorghum, Enset, Coffee, Vegetables; highest rural population concentration. |
| **4. Kolla (Warm Lowlands / Tropical)** | $500\\text{--}1,500\\text{ m}$ | $20^\\circ\\text{--}30^\\circ\\text{C}$ | $400\\text{--}1,000\\text{ mm}$ | Acacia-Commiphora woodlands; Sorghum, Millet, Sesame, Cotton, pastoral livestock (camels, goats). |
| **5. Bereha (Hot Arid / Desert Lowlands)** | $<500\\text{ m}$ | $>30^\\circ\\text{C}$ | $<400\\text{ mm}$ (erratic) | Xerophytic thorny scrub, succulents, bare sand/rock; nomadic transhumance camel pastoralism; Dallol, Ogaden. |`,
      equations: [
        {
          name: 'Atmospheric Temperature Elevation Lapse Rate',
          formula: 'T_2 = T_1 - 6.5 \\times \\left(\\frac{h_2 - h_1}{1000}\\right)',
          description: 'Calculates mean temperature at any mountain altitude from a known baseline station.'
        }
      ],
      workedExamples: [
        {
          problem: 'A weather monitoring station in the Afar Lowlands located at an elevation of $200\\text{ m}$ records a mean annual temperature of $32.0^\\circ\\text{C}$. Using the standard Environmental Lapse Rate ($6.5^\\circ\\text{C}/1000\\text{ m}$), calculate the expected mean annual temperature at the summit of Mount Tullu Deemtu in the Bale Mountains ($4,377\\text{ m}$).',
          stepByStepSolution: [
            'Step 1 (Elevation difference): $\\Delta h = 4377\\text{ m} - 200\\text{ m} = 4177\\text{ m}$.',
            'Step 2 (Temperature drop): $\\Delta T = \\frac{4177}{1000} \\times 6.5^\\circ\\text{C} = 4.177 \\times 6.5 = 27.15^\\circ\\text{C}$.',
            'Step 3 (Summit temperature): $T_{\\text{summit}} = 32.0^\\circ\\text{C} - 27.15^\\circ\\text{C} = 4.85^\\circ\\text{C}$.',
            'Result: The expected temperature at the summit is approximately **$4.85^\\circ\\text{C}$** (Wurch alpine zone).'
          ],
          shortcutTip: 'Multiply elevation change in thousands of meters by 6.5 and subtract from the base temperature.'
        }
      ],
      examTraps: [
        'Confusing Kiremt with Belg: Kiremt is the main summer rainy season (June–September) driven by Atlantic/Congo equatorial westerlies; Belg is the short spring rainy season (March–May) driven by Indian Ocean trade winds.',
        'Adding temperature instead of subtracting when moving to higher elevations. Temperature always DECREASES as altitude rises within the troposphere.'
      ],
      keyTakeaways: [
        'The Inter-Tropical Convergence Zone (ITCZ) is the primary regional driver of seasonal rainfall shifts across Ethiopia.',
        'Woina Dega ($1,500\\text{--}2,300\\text{ m}$) supports the densest rural population in Ethiopia due to fertile soils, reliable rainfall, and absence of malaria.'
      ]
    }
  ],

  // Chapter 6: Soils, Natural Vegetation and Wildlife
  6: [
    {
      id: 'geo-extra-c6-sec1',
      heading: '6.4 Masterclass: The 11 Soil Orders of Ethiopia, Vertisol Dynamics & National Park Protection',
      content: `### 6.4.1 Major Soil Types of Ethiopia (FAO/UNESCO Classification)
1. **Nitisols**: Deep, well-drained, red-to-reddish-brown clay soils with blocky structure; high water-storage capacity and good permeability; dominant in high-rainfall southwestern highlands; **most productive soils for coffee, enset, and maize**.
2. **Vertisols (Black Cotton Soils)**: Heavy clay soils ($>30\\%$ swelling clay); shrink and develop wide, deep cracks during dry season; swell and become impermeable waterlogged mud during rainy season; high natural mineral fertility but require drainage furrowing (*Broad Bed and Furrow — BBM* technology); extensive in Shewa, Gojjam, and Arsi plains.
3. **Cambisols**: Young, moderately developed brown soils with good chemical fertility; widespread in central highlands.
4. **Regosols and Leptosols**: Shallow, rocky, immature soils with minimal horizon development on steep mountain slopes; highly prone to accelerated water erosion; dominant in Tigray and North Wollo highlands.
5. **Fluvisols (Alluvial Soils)**: Highly fertile soils deposited along active river floodplains and deltas (Awash, Baro, Omo valleys); prime soils for commercial irrigated plantations.

---

### 6.4.2 Soil Conservation Strategies in the Ethiopian Highlands
- **Physical Soil Conservation Structures**: Stone bunds, soil bunds, fanya juu terraces, check dams in gullies, hillside contour ditches.
- **Biological Soil Conservation Measures**: Agroforestry, contour grass strips (*Vetiver grass*), reforestation, area exclosures (fencing off degraded mountains from grazing to regenerate natural vegetative cover).`,
      keyTakeaways: [
        'Vertisols have high natural chemical fertility but suffer from extreme physical management difficulties (cracking when dry, waterlogging when wet).',
        'Area exclosure is one of the most cost-effective and successful community-managed ecological regeneration methods in northern Ethiopia.'
      ]
    }
  ],

  // Chapter 7: Population of Ethiopia and the Horn
  7: [
    {
      id: 'geo-extra-c7-sec1',
      heading: '7.4 Masterclass: Demographic Measurement Matrix, The Youth Bulge & Linguistic Geography',
      content: `### 7.4.1 Demographic Measurement Equations

$$\\begin{aligned}
\\text{\\textbf{Crude Birth Rate (CBR)}} &= \\frac{\\text{Live Births in Year}}{\\text{Total Mid-Year Population}} \\times 1,000 \\\\
\\text{\\textbf{Crude Death Rate (CDR)}} &= \\frac{\\text{Total Deaths in Year}}{\\text{Total Mid-Year Population}} \\times 1,000 \\\\
\\text{\\textbf{Rate of Natural Increase (RNI \\%)}} &= \\frac{\\text{CBR} - \\text{CDR}}{10} \\\\
\\text{\\textbf{Doubling Time (Rule of 70)}} &= \\frac{70}{\\text{RNI (\\%)}} \\\\
\\text{\\textbf{Age Dependency Ratio (ADR)}} &= \\frac{\\text{Pop}_{(0\\text{--}14)} + \\text{Pop}_{(65+)}}{\\text{Working-Age Pop}_{(15\\text{--}64)}} \\times 100
\\end{aligned}$$

---

### 7.4.2 Language Geography: The Two Super-Families of Ethiopia
1. **Afro-Asiatic Super-Family ($\sim 98\\%$ of population)**:
   - **Cushitic**: Oromiffa, Somaligna, Sidamigna, Afarigna, Hadiyigna, Kembatigna, Gedeogna, Agaw.
   - **Semitic (Ethio-Semitic)**: Amharic, Tigrigna, Guragigna, Harari, Siltigna, Argobba, Ge'ez.
   - **Omotic**: Wolaitatto, Gamogna, Gofigna, Dawrogna, Kafigna, Bench, Ari, Hamer.
2. **Nilo-Saharan Super-Family ($\sim 2\\%$ along western border)**:
   - Anywa, Nuer, Majang, Gumuz, Berta, Kunama, Mursi.`,
      keyTakeaways: [
        'Ethiopia\'s demographic pyramid has an expansive broad base, indicating high youthful dependency and future population momentum.',
        'To calculate doubling time: divide 70 by the annual percentage growth rate (RNI %).'
      ]
    }
  ],

  // Chapter 8: Economic Activities in Ethiopia
  8: [
    {
      id: 'geo-extra-c8-sec1',
      heading: '8.4 Masterclass: Agricultural Systems Taxonomy, Mineral Belts & Transport Infrastructure',
      content: `### 8.4.1 Ethiopia\'s Five Major Agricultural Systems
1. **Highland Mixed Farming System**: Integrated crop-livestock production in Highlands ($>1,500\\text{ m}$); ox-drawn plow (*Maresha*); grain-plough complex vs. enset/horticultural complex.
2. **Lowland Pastoralism**: Semi-arid/arid plains ($<1,500\\text{ m}$); livestock rearing as sole economic activity; seasonal nomadism.
3. **Shifting Cultivation**: Slash-and-burn farming practiced in western lowland forests (Gambella, Benishangul-Gumuz).
4. **Commercial Agricultural Plantations**: Large-scale mechanized irrigation farming along river floodplains (Awash, Omo, Baro) producing sugarcane, cotton, and horticulture.
5. **Urban and Peri-Urban Agriculture**: Dairying, poultry, and vegetable gardening surrounding metropolitan urban centers.

---

### 8.4.2 Strategic Transport Corridors of Ethiopia
- **Addis Ababa–Djibouti Transport Corridor**: Primary economic trade artery handling over **$90\\%$ of Ethiopia's international maritime import-export cargo**; features the electrified standard-gauge railway ($752\\text{ km}$) and expressway.
- **Port Diversification Alternatives**: Berbera corridor (Somaliland), Port Sudan corridor, Lamu port (LAPSSET corridor via Kenya).`,
      keyTakeaways: [
        'Agriculture contributes over 80% of Ethiopia\'s export revenue, dominated by Arabica coffee, oilseeds, pulses, and cut flowers.',
        'Industrial Parks (Hawassa, Bole Lemi, Kombolcha) are designed for export-oriented light manufacturing and textile value chains.'
      ]
    }
  ]
};
