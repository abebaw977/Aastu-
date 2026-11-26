import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Physical Fitness (SpSc 1011 - 4 Units)
 * Covers Unit 1: Concepts of Physical Fitness, Unit 2: Health Benefits of Physical Activity,
 * Unit 3: Nutrition and Physical Performance, and Unit 4: Health-Related Components & Exercise Prescription.
 */
export const EXTRA_NOTES_FITNESS: Record<number, MasterNoteSection[]> = {
  // Unit 1: Concepts of Physical Fitness
  1: [
    {
      id: 'fit-extra-u1-sec1',
      heading: '1.3 Masterclass: Comparative Matrix of Movement Concepts & Training Principles',
      content: `### 1.3.1 Physical Activity vs. Physical Exercise vs. Sport vs. Physical Fitness
Freshman examinations in **SpSc 1011** regularly test the precise boundaries separating everyday movement from structured exercise and competitive sport.

| Concept | Core Definition | Structure & Purpose | Typical Examples |
| :--- | :--- | :--- | :--- |
| **Physical Fitness** | Ability to live a full, balanced life and perform daily tasks vigorously without undue fatigue, with energy left for leisure and emergencies. | Outcome / physiological state encompassing **Health-Related** and **Skill-Related** components. | High $\\text{VO}_{2\\max}$, strong muscular endurance, healthy body fat %, supple joints. |
| **Physical Activity** | Any bodily movement produced by **skeletal muscles** that results in **energy expenditure** above resting basal metabolic rate ($>1\\text{ MET}$). | Broadest umbrella term; unstructured or incidental daily movement. | Walking to lecture, gardening, climbing campus stairs, household chores. |
| **Physical Exercise** | A **planned, structured, repetitive**, and intentional subset of physical activity performed specifically to improve or maintain physical fitness. | Organized by intensity, duration, frequency, and progression (**FIIT**). | Running $5\\text{ km}$ at $70\\%\\text{ MHR}$, resistance gym sessions, structured yoga. |
| **Sport** | Competitive physical activity governed by **institutionalized rules**, standardized scoring, and organized skill/strategy. | Focused on victory, teamwork, tactics, and rule-bound competition. | Football (soccer), athletics track races, basketball, volleyball tournaments. |

---

### 1.3.2 Applied Breakdown of the General Principles of Fitness Training
1. **Principle of Overload**: Biological tissues (myofibrils, cardiac muscle, mitochondria, bone matrix) adapt **only** when challenged beyond their habitual daily load. Once the body adapts, the previous stimulus becomes maintenance rather than improvement; hence progressive overload is required.
2. **FIIT Principle (Workout Architecture)**:
   - **Frequency**: Number of training sessions per week (e.g., $3\\text{--}5\\text{ days/week}$ for aerobic fitness; $2\\text{--}3\\text{ days/week}$ per muscle group for strength).
   - **Intensity**: Physiological difficulty or workload (expressed as $\\%\\text{ MHR}$, $\\%\\text{ HRR}$, $\\%\\text{ 1RM}$, or RPE $1\\text{--}10$).
   - **Time**: Duration of a single session (e.g., $20\\text{--}60\\text{ minutes}$) or sets $\\times$ reps in resistance work.
   - **Type**: Specific exercise modality targeting the desired energy system or muscle group (jogging, cycling, swimming, weights, stretching).
3. **Principle of Rest, Recovery, and Periodization**:
   - **Supercompensation Cycle**: Training causes temporary micro-trauma and glycogen depletion; physiological remodeling and strength gains happen **during rest and sleep**, not during the workout itself. Insufficient recovery triggers **Overtraining Syndrome** (chronic fatigue, elevated resting heart rate, injury).
   - **Periodization**: Planned cyclical variation of training volume and intensity across **Macrocycles** (annual/semester), **Mesocycles** ($4\\text{--}8\\text{ weeks}$), and **Microcycles** ($1\\text{ week}$) to peak performance and prevent plateaus.
4. **Principle of Reversibility (Detraining)**:
   - Fitness adaptations are **transient**: *"Use it or lose it."* Cardiorespiratory fitness ($\\text{VO}_{2\\max}$) begins declining within $2\\text{ weeks}$ of complete inactivity, and muscular strength declines significantly after $4\\text{--}8\\text{ weeks}$ without stimulus.
5. **Principle of Individual Difference**:
   - Identical training loads yield different rates of adaptation across individuals due to **genetics (Type I vs. Type II muscle fiber ratios), age, baseline fitness, sex, nutrition, sleep, and medical history**.`,
      workedExamples: [
        {
          problem: 'A freshman student walks $20\\text{ minutes}$ to class every morning, plays an intramural basketball match on Saturday under referee rules, and jogs $30\\text{ minutes}$ every Monday, Wednesday, and Friday at $75\\%\\text{ MHR}$ to build aerobic endurance. Classify each of the three activities accurately and identify which FIIT variable is represented by "$75\\%\\text{ MHR}$".',
          stepByStepSolution: [
            '1. Walking $20\\text{ minutes}$ to class = **Physical Activity** (skeletal muscle movement expending energy, incidental/unstructured for fitness training).',
            '2. Jogging Mon/Wed/Fri for $30\\text{ min}$ at $75\\%\\text{ MHR}$ = **Physical Exercise** (planned, structured, repetitive movement targeting cardiorespiratory fitness).',
            '3. Saturday basketball match under referee rules = **Sport** (competitive physical activity governed by formal rules and strategy).',
            '4. "$75\\%\\text{ MHR}$" represents **Intensity** in the **FIIT Principle** (Mon/Wed/Fri = Frequency; $30\\text{ min}$ = Time; Jogging = Type).'
          ],
          shortcutTip: 'Remember the hierarchy: Every Exercise and Sport is Physical Activity, but NOT all Physical Activity is Exercise or Sport!'
        }
      ],
      examTraps: [
        'Confusing Physical Activity with Physical Exercise: Household chores and casual walking are Physical Activity, NOT Physical Exercise, unless they are planned, structured, and repetitive with a fitness objective.',
        'Assuming muscle grows inside the gym: Muscle protein synthesis and neural adaptation occur during Rest and Recovery; lifting daily without rest leads to overtraining, not faster gains.'
      ],
      keyTakeaways: [
        'Physical Fitness is an adaptive physiological state; Physical Exercise is the structured process used to build it.',
        'FIIT, Overload, Rest/Periodization, Reversibility, and Individual Difference form the universal backbone of safe training design.'
      ]
    }
  ],

  // Unit 2: The Health Benefits of Physical Activity
  2: [
    {
      id: 'fit-extra-u2-sec1',
      heading: '2.3 Masterclass: Hypokinetic Pathophysiology, Lipid Profiles & Cardiovascular Protection',
      content: `### 2.3.1 Mechanism of Hypokinetic Diseases ("Lack of Movement" Conditions)
Derived from **hypo-** (under/insufficient) and **-kinetic** (movement), **hypokinetic diseases** develop directly or indirectly from chronic sedentary behavior and low energy expenditure.

| Hypokinetic Condition | Pathological Mechanism in Sedentary Lifestyle | Physiological Protection from Regular Physical Activity |
| :--- | :--- | :--- |
| **Obesity** | Chronic positive energy balance ($\\text{Caloric Intake} > \\text{Energy Expenditure}$) leads to excess adipose tissue accumulation and visceral fat inflammation. | Increases daily caloric expenditure, preserves/builds metabolically active **lean muscle mass**, and raises resting metabolic efficiency. |
| **Type 2 Diabetes Mellitus** | Skeletal muscle cells lose **insulin sensitivity**, causing chronic hyperglycemia and elevated pancreatic insulin demand. | Muscle contraction activates **GLUT4 glucose transporters** independently of insulin during exercise and boosts insulin sensitivity for $24\\text{--}48\\text{ hours}$ post-workout. |
| **Osteoporosis** | Lack of mechanical loading reduces osteoblast bone-building activity, lowering **Bone Mineral Density (BMD)** and raising fracture risk. | Weight-bearing aerobic exercise and resistance training apply mechanical stress along bone shafts, stimulating **osteogenesis** and preserving bone mass. |

---

### 2.3.2 Cardiovascular Protection: Coronary Heart Disease (CHD) & Blood Lipid Regulation
1. **Coronary Heart Disease (CHD) Prevention**:
   - **Atherosclerosis**: Sedentary habits promote endothelial dysfunction, arterial stiffness, and fatty plaque buildup inside **coronary arteries**, restricting oxygenated blood delivery to the **myocardium** and triggering angina or myocardial infarction (heart attack).
   - **Cardiac Adaptation**: Aerobic training enlarges left ventricular stroke volume ($\\text{SV}$), reduces resting heart rate (**exercise-induced bradycardia**), lowers resting systolic/diastolic **blood pressure** via nitric oxide vasodilation, and promotes **coronary collateral circulation**.
2. **Hypercholesterolemia & Dyslipidemia Management**:
   - **Hypercholesterolemia** refers to abnormally elevated total blood cholesterol; **Dyslipidemia** denotes an unhealthy balance of blood lipoproteins and triglycerides.
   - **LDL ("Bad" Cholesterol — Low-Density Lipoprotein)**: Transports cholesterol from the liver to peripheral tissues and deposits excess cholesterol into arterial walls, accelerating plaque formation.
   - **HDL ("Good" Cholesterol — High-Density Lipoprotein)**: Performs **reverse cholesterol transport**, scavenging excess cholesterol from arterial walls and returning it to the liver for excretion.
   - **Effect of Exercise**: Sustained moderate-to-vigorous aerobic training consistently **raises HDL cholesterol**, lowers **triglycerides**, and shifts harmful small-dense **LDL** particles toward safer patterns.`,
      workedExamples: [
        {
          problem: 'A sedentary adult has blood test results showing Total Cholesterol $= 245\\text{ mg/dL}$ (elevated), $\\text{LDL} = 165\\text{ mg/dL}$ (high), and $\\text{HDL} = 34\\text{ mg/dL}$ (low). Diagnose the lipid status using SpSc 1011 terminology and explain how $150\\text{ minutes/week}$ of brisk walking or jogging alters this risk profile.',
          stepByStepSolution: [
            '1. Classification: Elevated total cholesterol is **Hypercholesterolemia**, and the combination of high **LDL** with low **HDL** represents **Dyslipidemia** — a major risk factor for **Coronary Heart Disease (CHD)**.',
            '2. Exercise Effect on Lipoproteins: Regular aerobic exercise stimulates **lipoprotein lipase (LPL)** activity, raising protective **HDL ("good" cholesterol)** and reducing circulating **LDL ("bad" cholesterol)** and triglycerides.',
            '3. Vascular Outcome: Improved endothelial function lowers arterial blood pressure and slows atherosclerotic plaque progression in coronary arteries.'
          ],
          shortcutTip: 'Think **H = Healthy/High** for HDL (you want HDL High!) and **L = Lethal/Low** for LDL (you want LDL Low!).'
        }
      ],
      examTraps: [
        'Thinking Type 1 Diabetes is a classic hypokinetic disease: Type 1 is autoimmune beta-cell destruction; **Type 2 Diabetes**, **Obesity**, **Osteoporosis**, **Hypertension**, and **Coronary Heart Disease** are the primary hypokinetic disorders.',
        'Mixing up LDL and HDL roles: Exercise **increases HDL** and **decreases LDL/triglycerides**, never the reverse.'
      ],
      keyTakeaways: [
        'Regular physical activity prevents hypokinetic diseases by enhancing insulin sensitivity (GLUT4), bone mineral density, and energy balance.',
        'Cardiorespiratory training lowers CHD mortality by strengthening stroke volume, lowering blood pressure, raising HDL, and lowering LDL.'
      ]
    }
  ],

  // Unit 3: Nutrition and Physical Performance
  3: [
    {
      id: 'fit-extra-u3-sec1',
      heading: '3.3 Masterclass: Nutrient Timing, Hydration Calculations & Training Diet Planning',
      content: `### 3.3.1 Exercise Nutrient Timing Matrix (Before, During & After Activity)
Optimizing sports performance and freshman training recovery depends not only on *what* you eat, but *when* macronutrients and fluids are consumed relative to workout onset.

| Phase | Optimal Timing Window | Primary Macronutrient Focus | Hydration & Practical Guidelines |
| :--- | :--- | :--- | :--- |
| **3.2.1 Before Exercise** | **$2\\text{--}3\\text{ hours}$** pre-workout (or light carb snack $30\\text{--}60\\text{ min}$ prior) | **High Complex Carbohydrates** (tops up muscle & liver **glycogen**), **Moderate Protein**, **Low Fat & Low Fiber** (prevents slow gastric emptying and GI distress). | Drink **$400\\text{--}600\\text{ mL}$** of water $2\\text{ hours}$ prior so urine is pale yellow before starting. |
| **3.2.2 During Exercise** | Continuous throughout sessions ($>60\\text{ min}$ especially) | **Simple Carbohydrates** ($30\\text{--}60\\text{ g/hour}$ via sports drinks, fruit, or gels) for endurance events $>60\\text{ minutes}$ to spare glycogen and delay central fatigue. | Small sips of fluid every **$15\\text{--}20\\text{ minutes}$** ($150\\text{--}250\\text{ mL}$); replace **electrolytes** (sodium, potassium) when sweating heavily. |
| **3.2.3 After Exercise** | **Within $30\\text{--}60\\text{ minutes}$** ("Anabolic / Recovery Window") | **Carbohydrates + High-Quality Protein** (ideally **$3:1$ to $4:1$ carb-to-protein ratio** for endurance; $20\\text{--}30\\text{ g}$ protein for strength) to drive **glycogen resynthesis** and **muscle protein repair**. | Replace **$1.25\\text{--}1.5\\text{ L}$ of fluid per $1\\text{ kg}$** of body weight lost during sweat-heavy training. |

---

### 3.3.2 How to Plan Your Training Diet (Section 3.2.4 Applied Rules)
1. **Macronutrient Distribution**:
   - **Carbohydrates ($45\\text{--}65\\%$ of total kcal, or $5\\text{--}8\\text{ g/kg/day}$ for active athletes)**: Primary high-octane fuel for both anaerobic glycolysis and aerobic metabolism.
   - **Proteins ($10\\text{--}35\\%$ of kcal, or $1.2\\text{--}2.0\\text{ g/kg/day}$ for exercising individuals)**: Supplies essential amino acids for myofibrillar repair, enzyme synthesis, and recovery.
   - **Healthy Fats ($20\\text{--}35\\%$ of kcal)**: Vital for hormone synthesis, cell membranes, fat-soluble vitamins (A, D, E, K), and sustained low-intensity aerobic fuel.
2. **Energy Balance & Caloric Matching**:
   - **Maintenance**: $\\text{Calories In} \\approx \\text{Total Daily Energy Expenditure (TDEE)}$.
   - **Muscle Hypertrophy**: Modest caloric surplus ($+250\\text{--}500\\text{ kcal/day}$) paired with progressive resistance training.
   - **Healthy Fat Loss**: Moderate caloric deficit ($-300\\text{--}500\\text{ kcal/day}$) with adequate protein to preserve lean muscle tissue.`,
      workedExamples: [
        {
          problem: 'A $70\\text{ kg}$ freshman cross-country runner finishes a grueling $90\\text{-minute}$ morning session weighing $68.8\\text{ kg}$. Calculate: (1) How much sweat weight was lost and the exact post-exercise rehydration target? (2) When should the recovery meal be eaten and with what target nutrient composition?',
          stepByStepSolution: [
            '1. Sweat Weight Lost: $70.0\\text{ kg} - 68.8\\text{ kg} = \\mathbf{1.2\\text{ kg}}$ of fluid loss.',
            '2. Rehydration Target: Athletes must replace roughly $1.5\\text{ L}$ ($1500\\text{ mL}$) per $1\\text{ kg}$ lost $\\Rightarrow 1.2 \\times 1.5\\text{ L} = \\mathbf{1.8\\text{ L}}$ ($1800\\text{ mL}$) consumed gradually with sodium/electrolytes.',
            '3. Recovery Meal Timing: Within **$30\\text{--}60\\text{ minutes}$** post-exercise, when muscle blood flow and **GLUT4** sensitivity are highest.',
            '4. Nutrient Ratio: Combine **carbohydrates and protein** (approx. $3:1\\text{ to }4:1$ ratio, e.g., $60\\text{--}80\\text{ g}$ carbs + $20\\text{ g}$ protein) to replenish depleted **glycogen** and repair damaged muscle fibers.'
          ],
          shortcutTip: 'Pre-workout = **Low Fat + High Carb** ($2\\text{--}3\\text{ h}$ before). Post-workout = **Carb + Protein** within **$30\\text{--}60\\text{ min}$**.'
        }
      ],
      examTraps: [
        'Eating a high-fat, fried meal right before running: Dietary fat drastically slows gastric emptying, causing stomach cramps and sluggish performance.',
        'Waiting $4\\text{ hours}$ after intense exercise to eat: Missing the **$30\\text{--}60\\text{ minute}$** post-exercise recovery window significantly slows muscle glycogen replenishment.'
      ],
      keyTakeaways: [
        'Carbohydrates fuel performance before and during prolonged workouts, while fat and heavy fiber should be kept low right before training.',
        'Pairing carbohydrates and protein within $30\\text{--}60\\text{ minutes}$ post-exercise maximizes recovery and glycogen restoration.'
      ]
    }
  ],

  // Unit 4: Health-Related Components & Principles of Exercise Prescription
  4: [
    {
      id: 'fit-extra-u4-sec1',
      heading: '4.7 Masterclass: Complete Exercise Prescription Blueprint (Cardio, Muscle & Flexibility)',
      content: `### 4.7.1 Standardized Prescription Matrix Across All Three Training Modes
Unit 4 integrates physiology into actionable **Exercise Prescription** using **SMART goals**, structured session phases (**Warm-Up $\\rightarrow$ Primary Conditioning $\\rightarrow$ Cool-Down**), and modality-specific dosing.

| Fitness Domain | Frequency | Intensity | Time / Volume | Key Methods & Techniques |
| :--- | :--- | :--- | :--- | :--- |
| **4.4 Cardiorespiratory Fitness** | **$3\\text{--}5\\text{ days/week}$** | **$60\\%\\text{--}85\\%\\text{ MHR}$** (or $50\\%\\text{--}85\\%\\text{ HRR}$) | **$20\\text{--}60\\text{ min}$** continuous or accumulated | **Continuous**, **Interval Training**, **Fartlek**, **Cross-Training** |
| **4.5 Muscle Strength** | **$2\\text{--}3\\text{ days/week}$** (non-consecutive; $48\\text{ h}$ rest) | Heavy load: **$80\\%\\text{--}90\\%\\text{ 1RM}$** | **$2\\text{--}5\\text{ sets} \\times 1\\text{--}6\\text{ reps}$** ($2\\text{--}5\\text{ min}$ rest) | **Free weights**, **Machines**, **Bodyweight**, **Plyometrics** |
| **4.5 Muscular Endurance** | **$2\\text{--}3\\text{ days/week}$** | Light-moderate: **$<65\\%\\text{ 1RM}$** | **$2\\text{--}3\\text{ sets} \\times 12\\text{--}20\\text{ reps}$** ($30\\text{--}60\\text{ s}$ rest) | High-rep resistance circuits, calisthenics |
| **4.6 Flexibility** | **$2\\text{--}3+\\text{ days/week}$** (daily ideal) | Stretch to **mild tension**, never sharp pain | Hold **$15\\text{--}30\\text{ seconds}$**, $2\\text{--}4\\text{ reps/muscle}$ | **Static** (post-workout), **Dynamic** (warm-up), **PNF** |

---

### 4.7.2 Session Structure & Safety Rules (Sections 4.2.1 – 4.5.1)
- **SMART Goal Formulation**:
  - **S**pecific (exact target: *"Run $3\\text{ km}$"* instead of *"Get fit"*).
  - **M**easurable (quantifiable metric: time, kg lifted, resting HR).
  - **A**chievable (realistic for baseline fitness level).
  - **R**elevant (aligned with health or athletic priorities).
  - **T**ime-bound (clear deadline, e.g., *within $8\\text{ weeks}$*).
- **Three Mandatory Phases of Every Workout**:
  1. **Warm-Up ($5\\text{--}10\\text{ min}$)**: Low-intensity movement + **dynamic stretching** to raise core muscle temperature, elevate synovial fluid lubrication, and progressively accelerate heart rate.
  2. **Primary Conditioning Period: The Workout Plan ($20\\text{--}60\\text{ min}$)**: Main aerobic, resistance, or sport-specific block individualized to fitness capacity.
  3. **Cool-Down ($5\\text{--}10\\text{ min}$)**: Gradual reduction in pace + **static stretching** to prevent **venous blood pooling** in the lower extremities, avoid post-exercise dizziness, and enhance joint range of motion while muscles are warm.
- **Weight Training Breathing & Recovery Rule**:
  - **Exhale on exertion** (concentric lifting phase) and **inhale on lowering** (eccentric phase) — avoid holding breath (**Valsalva maneuver**), which spikes blood pressure dangerously.
  - Allow **$48\\text{ hours}$ of recovery** before training the exact same muscle group again.`,
      workedExamples: [
        {
          problem: 'A $22\\text{-year-old}$ beginner student wants to design a comprehensive weekly workout plan. Their resting heart rate is $\\text{RHR} = 70\\text{ bpm}$, and their $1\\text{-Repetition Maximum (1RM)}$ on the barbell bench press is $60\\text{ kg}$. Compute: (1) Their aerobic Target Heart Rate zone at $60\\%\\text{--}80\\%\\text{ HRR}$; (2) Their recommended bench press weight for **Muscular Strength** ($85\\%\\text{ 1RM}$) vs **Muscular Endurance** ($60\\%\\text{ 1RM}$).',
          stepByStepSolution: [
            '1. Maximum Heart Rate: $\\text{MHR} = 220 - 22 = \\mathbf{198\\text{ bpm}}$.',
            '2. Heart Rate Reserve: $\\text{HRR} = 198 - 70 = \\mathbf{128\\text{ bpm}}$.',
            '3. Lower Aerobic Target ($60\\%$): $(128 \\times 0.60) + 70 = 76.8 + 70 = \\mathbf{147\\text{ bpm}}$.',
            '4. Upper Aerobic Target ($80\\%$): $(128 \\times 0.80) + 70 = 102.4 + 70 = \\mathbf{172\\text{ bpm}}$ $\\Rightarrow$ Cardiorespiratory Target Zone = **$147\\text{--}172\\text{ bpm}$** ($3\\text{--}5\\text{ days/wk}$, $20\\text{--}60\\text{ min}$).',
            '5. Bench Press Load: For **Muscular Strength**, load $= 60\\text{ kg} \\times 0.85 = \\mathbf{51\\text{ kg}}$ for $4\\text{--}6\\text{ reps}$. For **Muscular Endurance**, load $= 60\\text{ kg} \\times 0.60 = \\mathbf{36\\text{ kg}}$ for $15\\text{--}20\\text{ reps}$.'
          ],
          shortcutTip: 'Always double-check **Reps vs Load**: Low Reps ($1\\text{--}6$) + Heavy Weight ($>80\\%\\text{ 1RM}$) = **Strength**; High Reps ($12\\text{--}20$) + Lighter Weight ($<65\\%\\text{ 1RM}$) = **Endurance**!'
        }
      ],
      examTraps: [
        'Performing long-duration static stretching BEFORE explosive sprinting or heavy lifting: Static holds before power tasks temporarily reduce force output; use **Dynamic Stretching** in the Warm-Up and **Static Stretching** ($15\\text{--}30\\text{ s}$) in the Cool-Down.',
        'Forgetting the $48\\text{-hour}$ muscle recovery window in resistance programming or skipping the Cool-Down after intense jogging (risking venous blood pooling and syncope).'
      ],
      keyTakeaways: [
        'Every safe exercise prescription begins with SMART goals, includes Warm-Up, Primary Conditioning, and Cool-Down, and respects individual baseline capacity.',
        'Cardiorespiratory training uses continuous/interval/cross-training ($3\\text{--}5\\text{ days/wk}$, $60\\%\\text{--}85\\%\\text{ MHR}$); resistance training scales %1RM to strength vs endurance goals; flexibility uses $15\\text{--}30\\text{ s}$ static or PNF holds $2\\text{--}3\\text{ days/wk}$.'
      ]
    }
  ]
};
