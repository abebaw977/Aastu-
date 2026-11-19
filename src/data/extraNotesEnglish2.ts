import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Communicative English Skills II (English2 - 5 Units)
 * Preserves all existing notes and adds academic grammar matrices, syntactic transformation rules,
 * discourse analyses, and exam traps for all 5 units.
 */
export const EXTRA_NOTES_ENGLISH2: Record<number, MasterNoteSection[]> = {
  // Unit 1: Life Skills
  1: [
    {
      id: 'eng2-extra-u1-sec1',
      heading: '1.4 Masterclass: The Comprehensive Active-Passive Transformation Matrix & Impersonal Passive Structures',
      content: `### 1.4.1 Active to Passive Voice Transformation Principles
Passive voice shifts communicative focus from the **agent (actor)** to the **patient / receiver** or the **action itself**.
- **Transformation Algorithm (Three Rules)**:
  1. The direct object of the active clause becomes the grammatical subject of the passive clause.
  2. The verb is converted to: **Auxiliary $\\mathbf{Be}$ (in the active tense)** $+$ **Past Participle ($V_3$)**.
  3. The active subject becomes the prepositional agent ($\\mathbf{by} + \\text{agent}$) or is omitted when obvious, irrelevant, or unknown.

---

### 1.4.2 Master Active-Passive Conjugation Matrix Across Tenses

| Verb Tense | Active Voice Structure | Passive Voice Structure | Active Example | Passive Transformation |
| :--- | :--- | :--- | :--- | :--- |
| **Present Simple** | $S + V_1(s/es) + O$ | $S + \\mathbf{am/is/are} + V_3$ | *"The counselor advises students."* | *"Students **are advised** by the counselor."* |
| **Present Continuous** | $S + \\text{am/is/are} + V\\text{-ing} + O$ | $S + \\mathbf{am/is/are} + \\mathbf{being} + V_3$ | *"She is writing an essay."* | *"An essay **is being written** by her."* |
| **Present Perfect** | $S + \\text{has/have} + V_3 + O$ | $S + \\mathbf{has/have} + \\mathbf{been} + V_3$ | *"They have resolved the dispute."* | *"The dispute **has been resolved**."* |
| **Past Simple** | $S + V_2 + O$ | $S + \\mathbf{was/were} + V_3$ | *"The dean approved the grant."* | *"The grant **was approved** by the dean."* |
| **Past Continuous** | $S + \\text{was/were} + V\\text{-ing} + O$ | $S + \\mathbf{was/were} + \\mathbf{being} + V_3$ | *"Technicians were repairing the lab."* | *"The lab **was being repaired**."* |
| **Past Perfect** | $S + \\text{had} + V_3 + O$ | $S + \\mathbf{had} + \\mathbf{been} + V_3$ | *"He had finalized the results."* | *"The results **had been finalized**."* |
| **Future Simple (will)**| $S + \\text{will} + V_1 + O$ | $S + \\mathbf{will} + \\mathbf{be} + V_3$ | *"We will conduct the interview."* | *"The interview **will be conducted**."* |
| **Future (going to)** | $S + \\text{be going to} + V_1 + O$ | $S + \\mathbf{be going to} + \\mathbf{be} + V_3$| *"They are going to launch the club."*| *"The club **is going to be launched**."* |
| **Modals** | $S + \\text{modal} + V_1 + O$ | $S + \\mathbf{modal} + \\mathbf{be} + V_3$ | *"You must submit the report."* | *"The report **must be submitted**."* |
| **Modal Perfect** | $S + \\text{modal} + \\text{have} + V_3 + O$ | $S + \\mathbf{modal} + \\mathbf{have} + \\mathbf{been} + V_3$ | *"Someone should have informed him."* | *"He **should have been informed**."* |

*(Note: Present Perfect Continuous, Past Perfect Continuous, Future Continuous, and Future Perfect Continuous are avoided in passive constructions due to awkward double -ing auxiliaries).*

---

### 1.4.3 Academic Impersonal Passive (Reporting Beliefs, Claims & Hypotheses)
In scientific and formal academic writing, personal pronouns (*"I think"*, *"People say"*) are replaced with objective **impersonal passive constructions**:
- **Pattern A (Dummy Pronoun 'It' + Passive Reporting Verb + That-Clause)**:
  $$\\mathbf{It} + \\text{is} + \\{ \\text{said / believed / thought / reported / claimed / suggested} \\} + \\mathbf{that} + \\text{Clause}$$
  - Active: *"People believe that critical thinking enhances employability."*
  - Impersonal Passive A: *"**It is believed that** critical thinking enhances employability."*
- **Pattern B (Subject + Passive Reporting Verb + To-Infinitive)**:
  $$\\mathbf{Subject} + \\text{is/are} + \\{ \\text{said / believed / thought / reported} \\} + \\mathbf{to} + V_1$$
  - Impersonal Passive B: *"Critical thinking **is believed to enhance** employability."*
  - For past actions: *"He is reported **to have completed** the trial ahead of schedule."*`,
      workedExamples: [
        {
          problem: 'Transform the following active academic sentences into passive voice: (1) "Researchers have discovered a sustainable natural molluscicide in Ethiopia." (2) "People believe that emotional intelligence predicts workplace leadership better than IQ."',
          stepByStepSolution: [
            'Sentence 1: Identify direct object = "a sustainable natural molluscicide in Ethiopia". Tense = Present Perfect ("have discovered"). Passive auxiliary = "has been discovered". Result: **"A sustainable natural molluscicide in Ethiopia has been discovered by researchers."**',
            'Sentence 2 (Pattern A): Use dummy pronoun "It": **"It is believed that emotional intelligence predicts workplace leadership better than IQ."**',
            'Sentence 2 (Pattern B): Promote embedded subject "emotional intelligence": **"Emotional intelligence is believed to predict workplace leadership better than IQ."**'
          ],
          shortcutTip: 'Only transitive verbs (verbs taking direct objects) can form passives. Intransitive verbs like "arrive", "happen", "die", "occur", and "exist" CANNOT be made passive!'
        }
      ],
      examTraps: [
        'Attempting to form a passive from an intransitive verb: *"The accident was happened yesterday"* is a severe grammatical error. Correct: *"The accident happened yesterday."*',
        'Retaining redundant or vague agents like *"by somebody"*, *"by people"*, or *"by them"*. In academic writing, vague agents should be omitted entirely.'
      ],
      keyTakeaways: [
        'Passive voice is dominant in scientific procedures and research methodology sections because the focus is on what was done, not who did it.',
        'Impersonal passive structures ("It is estimated that...") convey objective academic detachment and epistemic modesty.'
      ]
    }
  ],

  // Unit 2: Speculations about the Future of Science
  2: [
    {
      id: 'eng2-extra-u2-sec1',
      heading: '2.4 Masterclass: The Taxonomy of Future Tense Forms & Dr. Aklilu Lemma\'s Scientific Discourse',
      content: `### 2.4.1 Comprehensive System of Expressing Future Time in English
Unlike past and present, English has no inflected future tense ending; instead, it employs a precise spectrum of modal and aspectual structures:

| Form | Primary Semantic Function | Academic / Discourse Context | Prototypical Sentence |
| :--- | :--- | :--- | :--- |
| **Will + $V_1$** | 1. Objective predictions / future facts.<br>2. Spontaneous decisions made at speech moment.<br>3. Promises and offers. | Expressing scientific predictions based on theory or personal belief (*"I think..."*). | *"Advances in genetic editing **will eradicate** hereditary sickle-cell anemia."* |
| **Be going to + $V_1$** | 1. Intentions / prior decisions made before speaking.<br>2. Predictions based on **tangible present evidence**. | Present symptoms indicating imminent outcome. | *"Look at those dark clouds; it **is going to rain**."* / *"The university **is going to establish** an AI lab."* |
| **Present Continuous ($am/is/are + V\\text{-ing}$)** | Fixed personal plans with a **scheduled time, date, and partner/venue**. | Confirmed calendar commitments and appointments. | *"The research panel **is meeting** Dr. Lemma tomorrow at 10:00 AM."* |
| **Present Simple ($V_1 / V_s$)** | Fixed public timetables, transport schedules, university calendars. | Unalterable institutional schedules. | *"The second semester **commences** on March 15th."* |
| **Future Continuous ($will + be + V\\text{-ing}$)** | 1. Action in ongoing progress at a specific future moment.<br>2. Polite inquiries about plans. | Visualizing future research operations in progress. | *"At this time next decade, scientists **will be monitoring** water quality via satellite IoT sensors."* |
| **Future Perfect ($will + have + V_3$)** | Action that will be **completed prior to a specified future deadline** (signaled by *by*, *by the time*). | Milestones, target completion dates in research proposals. | *"By the year 2030, Ethiopia **will have vaccinated** the high-risk population against endemic parasites."* |

---

### 2.4.2 Scientific Narrative Discourse: The Endod Case Study (Dr. Aklilu Lemma & Dr. Legesse Wolde-Yohannes)
Mike Muller's article *"Grassroots attack on bilharzia"* showcases classic communicative structures:
1. **The Serendipitous Observation (1964, Adwa, Tigray)**:
   Dr. Aklilu Lemma noticed dead snails downstream from where village women were washing clothes with crushed berries of the soapberry plant (*Phytolacca dodecandra*, vernacularly known as **Endod**).
2. **The Scientific Hypothesis**:
   Endod berries release saponin compounds that act as a potent, biodegradable molluscicide, destroying the intermediate host snail (*Biomphalaria*) of the parasitic blood fluke (*Schistosoma*).
3. **The Global Scientific Struggle**:
   Third-world research faced skepticism from Western pharmaceutical corporations because a locally cultivable natural plant berry offered minimal profit margins compared to synthetic chemicals like niclosamide.
4. **Discourse Features**:
   - Contrastive discourse markers: *However, nevertheless, despite, in contrast*.
   - Cause-effect connectors: *Consequently, thereby, as a result of, leading to*.
   - Speculative future modals: *may yield, could provide, is projected to transform*.`,
      workedExamples: [
        {
          problem: 'Fill in each blank with the most precise future form: (1) "By December next year, our engineering team _____ (complete) the solar irrigation project." (2) "Look at that erratic pressure gauge; the boiler _____ (explode)!" (3) "Professor Tadesse _____ (deliver) the keynote speech on biotechnology at 2:00 PM next Monday."',
          stepByStepSolution: [
            'Item 1: The prepositional cue "By December next year" signals completion before a future deadline. Use Future Perfect: **will have completed**.',
            'Item 2: The exclamation "Look at that erratic pressure gauge" provides immediate present physical evidence. Use Be Going To: **is going to explode**.',
            'Item 3: A fixed conference schedule with a specified day and time represents a confirmed official arrangement. Use Present Continuous or Present Simple: **is delivering** (or **delivers**).'
          ],
          shortcutTip: 'Whenever you see "By + future time expression" (e.g., By tomorrow, By 2030, By the time he arrives), immediately select the Future Perfect: will have + V3!'
        }
      ],
      examTraps: [
        'Using "will" in subordinate time clauses: *"When he will arrive, we will begin the seminar"* is INCORRECT. Clauses introduced by *when, after, before, as soon as, until* must use the **Present Simple**: *"When he arrives, we will begin..."*',
        'Confusing "will" (spontaneous prediction/decision) with "going to" (prediction based on visible present evidence).'
      ],
      keyTakeaways: [
        'Future Perfect (will have + V3) always measures the completion of an action prior to a future point in time.',
        'In time and conditional clauses, future meanings are grammatically realized by present tenses.'
      ]
    }
  ],

  // Unit 3: Environmental Protection
  3: [
    {
      id: 'eng2-extra-u3-sec1',
      heading: '3.4 Masterclass: Modal Verbs of Deduction & Certainty, Obligation, and Environmental Rhetoric',
      content: `### 3.4.1 Epistemic Modals: Degrees of Certainty & Logical Deduction
In academic arguments on environmental issues (e.g., deforestation, global warming, desertification), modal verbs express varying degrees of evidential certainty:

| Degree of Certainty | Present / Future Deduction ($S + \\text{modal} + V_1$) | Past Deduction ($S + \\text{modal} + \\text{have} + V_3$) | Example in Environmental Context |
| :--- | :--- | :--- | :--- |
| **100% Certain (Affirmative Deduction)** | **Must** (*"It is logically certain"*) | **Must have** $+ V_3$ | *"The drastic drop in river levels **must have resulted** from upstream diversion."* |
| **100% Certain (Negative Deduction)** | **Cannot / Can't** (*"It is logically impossible"*) | **Can't have / Couldn't have** $+ V_3$ | *"A desert environment **cannot support** broadleaf deciduous rainforests."* |
| **50%–70% Possibility** | **May / Might / Could** | **May have / Might have / Could have** $+ V_3$ | *"The unexpected flash flood **might have been triggered** by rapid highland snowmelt."* |
| **Moral Expectation / Advisability** | **Should / Ought to** | **Should have / Ought to have** $+ V_3$ (*Unfulfilled past duty*) | *"Governments **should have enacted** stringent emissions controls a decade ago."* |

---

### 3.4.2 Root (Deontic) Modals: Obligation, Prohibition & Absence of Obligation

| Category | Modal Expression | Communicative Meaning | Contrast Example |
| :--- | :--- | :--- | :--- |
| **Strong Obligation** | **Must** | Internal / personal compulsion; speaker insists | *"We **must protect** our indigenous biodiversity."* |
| **External Obligation** | **Have to / Has to** | External authority, law, regulation, physical necessity | *"Factories **have to treat** toxic effluents before discharge."* |
| **Prohibition** | **Must not / May not** | Forbidden by law, regulation, or danger | *"Citizens **must not dump** hazardous chemical waste in rivers."* |
| **Absence of Obligation** | **Don't have to / Needn't** | Not necessary; completely optional | *"You **don't have to print** the report; digital submission is accepted."* |

---

### 3.4.3 Environmental Rhetoric: Cohesive Argumentation in "A River Ran Through It"
- **Rhetorical Problem-Solution Structure**:
  1. **Situation**: A vibrant river ecosystem supporting fisheries, agriculture, and municipal water supply.
  2. **Problem (Anthropogenic Impact)**: Industrial discharge, untreated municipal sewage, chemical fertilizer runoff, and siltation caused by deforestation.
  3. **Evaluation**: Loss of aquatic biodiversity, waterborne epidemics, and economic decline.
  4. **Solution & Call to Action**: Watershed reforestation, wastewater treatment plants, and community wetland conservancies.`,
      workedExamples: [
        {
          problem: 'Choose the correct modal form: (1) "The lake has dried up completely within two months; the prolonged drought _____ (must have / shouldn\'t have / could) destroyed the local fishery." (2) "You _____ (mustn\'t / don\'t have to) enter the chemical processing zone without safety goggles; it is strictly prohibited by factory regulations."',
          stepByStepSolution: [
            'Item 1: Complete desiccation of the lake provides conclusive logical evidence for an outcome that already occurred in the past. Use past deduction: **must have**.',
            'Item 2: The phrase "strictly prohibited by factory regulations" indicates an absolute legal ban. Use prohibition: **mustn\'t**.'
          ],
          shortcutTip: '"Mustn\'t" means DO NOT DO IT (prohibited!). "Don\'t have to" means YOU CAN DO IT IF YOU WANT, BUT IT IS NOT REQUIRED (optional).'
        }
      ],
      examTraps: [
        'Using "must have not" for negative logical deduction in the past. The correct form is **"cannot have + V3"** or **"can\'t have + V3"**: *"He can\'t have forgotten the conference"* (NOT *"He must not have forgotten"*).',
        'Confusing "mustn\'t" (prohibition) with "don\'t have to" (lack of obligation).'
      ],
      keyTakeaways: [
        'Past deductions require modal + have + past participle (V3): must have (certain), might have (possible), can\'t have (impossible).',
        'Should have + V3 indicates an obligation or advisable action that was NOT performed.'
      ]
    }
  ],

  // Unit 4: Indigenous Knowledge
  4: [
    {
      id: 'eng2-extra-u4-sec1',
      heading: '4.4 Masterclass: The Systematic Rules of Indirect (Reported) Speech & Discourse Integration',
      content: `### 4.4.1 Direct to Indirect Speech Backshifting Paradigm
When the reporting verb is in the **past tense** (e.g., *said, told, reported, explained*), tenses, pronouns, and deictic markers of time and place shift systematically backward:

| Direct Speech Tense | Indirect (Reported) Speech Tense | Direct Speech Example | Reported Speech Transformation |
| :--- | :--- | :--- | :--- |
| **Present Simple** | **Past Simple** | *"I preserve traditional herbal medicine,"* he said. | He said that he **preserved** traditional herbal medicine. |
| **Present Continuous** | **Past Continuous** | *"We are recording oral folklore,"* she said. | She said that they **were recording** oral folklore. |
| **Present Perfect** | **Past Perfect** | *"The elders have shared their wisdom,"* he stated. | He stated that the elders **had shared** their wisdom. |
| **Past Simple** | **Past Perfect** | *"The crop failed last year,"* the farmer remarked. | The farmer remarked that the crop **had failed the previous year**. |
| **Past Continuous** | **Past Perfect Continuous** | *"They were building terraces,"* she said. | She said that they **had been building** terraces. |
| **Future Simple (will)** | **Conditional (would)** | *"Science will integrate local insight,"* she noted. | She noted that science **would integrate** local insight. |
| **Can / May / Must** | **Could / Might / Had to** | *"We must document indigenous seeds,"* he said. | He said that they **had to document** indigenous seeds. |

---

### 4.4.2 Exceptions to the Backshifting Rule
Tenses in the reported clause **do NOT change** under three specific conditions:
1. **Universal Truths or Permanent Scientific Facts**:
   - Direct: *"The professor said, 'Water boils at $100^\\circ\\text{C}$ at sea level.'"*
   - Reported: *"The professor said that water **boils** at $100^\\circ\\text{C}$ at sea level."* (Remains present simple!).
2. **Present Reporting Verb**:
   - Direct: *"He says, 'Indigenous knowledge provides sustainable ecological solutions.'"*
   - Reported: *"He says that indigenous knowledge **provides** sustainable ecological solutions."*
3. **Immediate Reporting**: When the reported situation remains currently true at the moment of reporting.

---

### 4.4.3 Reporting Questions, Commands & Requests

| Direct Construction | Introductory Verb Structure | Transformation Mechanics | Example |
| :--- | :--- | :--- | :--- |
| **Wh- Questions** | $S + \\text{asked} + O + \\mathbf{wh\\text{-word}} + \\text{Clause}$ | Word order becomes **declarative (Subject before Verb)**; question mark is deleted! | Direct: *"Where did you find the fossils?"* $\\implies$ She asked me **where I had found** the fossils. |
| **Yes/No Questions** | $S + \\text{asked} + O + \\mathbf{if / whether} + \\text{Clause}$ | Insert *if* or *whether*; change question word order to subject-verb. | Direct: *"Do you cultivate Enset?"* $\\implies$ He inquired **if they cultivated** Enset. |
| **Imperatives / Commands** | $S + \\text{ordered / told / instructed} + O + \\mathbf{to} + V_1$ | Convert imperative verb into **infinitive (to + verb)**; negative is **not to + verb**. | Direct: *"Preserve the seed bank!"* $\\implies$ The botanist urged the community **to preserve** the seed bank. |

---

### 4.4.4 Shifts in Time and Place Adverbials (Deictic Shifts)
- **Now** $\\to$ **Then / At that time**
- **Today** $\\to$ **That day**
- **Yesterday** $\\to$ **The day before / The previous day**
- **Tomorrow** $\\to$ **The next day / The following day**
- **Here** $\\to$ **There**
- **This / These** $\\to$ **That / Those**
- **Ago** $\\to$ **Before**`,
      workedExamples: [
        {
          problem: 'Transform the following sentences into indirect reported speech: (1) "Why did the research team choose the Afar depression for hominid fossil excavation?" asked the student. (2) "Do not contaminate the sacred community springs," the village elder instructed the villagers.',
          stepByStepSolution: [
            'Sentence 1 (Wh-question): Reporting verb = "asked". Wh-word = "why". Change past simple "did choose" to past perfect "had chosen". Invert question order into declarative order (Subject "the research team" precedes auxiliary "had chosen"): **The student asked why the research team had chosen the Afar depression for hominid fossil excavation.**',
            'Sentence 2 (Negative imperative): Reporting verb = "instructed". Convert negative command into "not to + V1": **The village elder instructed the villagers not to contaminate the sacred community springs.**'
          ],
          shortcutTip: 'In reported questions, NEVER use auxiliary "did", "do", or "does", and never invert subject and verb. Say "She asked where I lived" (NOT "where did I live").'
        }
      ],
      examTraps: [
        'Inverting subject and verb in reported questions: *"He asked me where was the laboratory"* is WRONG. Correct: *"He asked me where the laboratory was."*',
        'Using "said" with a direct personal object without "to": *"He said me that..."* is WRONG. Use **"told me that..."** or **"said to me that..."**.'
      ],
      keyTakeaways: [
        'Reported questions always take statement word order (Subject + Verb) and end with a full stop, never a question mark.',
        'Universal truths and scientific laws do not backshift their tenses even when the reporting verb is in the past.'
      ]
    }
  ],

  // Unit 5: Cultural Heritages
  5: [
    {
      id: 'eng2-extra-u5-sec1',
      heading: '5.4 Masterclass: Defining vs. Non-Defining Relative Clauses & Academic Heritage Discourse',
      content: `### 5.4.1 Defining vs. Non-Defining Relative Clauses: The Complete Contrast Matrix

| Linguistic Dimension | Defining (Restrictive) Relative Clause | Non-Defining (Non-Restrictive) Relative Clause |
| :--- | :--- | :--- |
| **Communicative Purpose** | Provides **essential, identifying information**; specifies which person or thing is being talked about. | Provides **extra, non-essential parenthetical information** about an already identified noun. |
| **Omission Effect** | Removing the clause leaves the core sentence **meaningless, incomplete, or ambiguous**. | Removing the clause leaves the core sentence **grammatically and semantically complete**. |
| **Punctuation (Commas)** | **NO COMMAS** are ever used. | **Enclosed by COMMAS** (or a comma and a period at sentence end). |
| **Pronoun "That"** | **Can replace *who* or *which*** (*"The monument that was carved..."*). | **"That" can NEVER be used!** (Must use *who*, *whom*, *which*, *whose*). |
| **Pronoun Omission** | The relative pronoun can be **omitted if it is the object** of the relative clause (*"The museum (which) we visited"*). | The relative pronoun **CAN NEVER BE OMITTED** under any circumstance. |
| **Illustrative Sentence** | *"The artisans **who carved the rock churches of Lalibela** used volcanic scoria."* | *"Lalibela, **which is located in the Amhara region**, is a UNESCO World Heritage site."* |

---

### 5.4.2 Relative Pronoun Selection Guide

| Antecedent (Noun) | Subject Role in Clause | Object Role in Clause | Possessive Role |
| :--- | :--- | :--- | :--- |
| **Person** | **Who** (or *that* in defining clauses) | **Whom / Who** (or *that* / zero $\\emptyset$ in defining clauses) | **Whose** |
| **Thing / Animal / Place** | **Which** (or *that* in defining clauses) | **Which** (or *that* / zero $\\emptyset$ in defining clauses) | **Whose** / **Of which** |
| **Time** | — | **When** (or *that* / zero $\\emptyset$) | — |
| **Place** | — | **Where** (or preposition $+ \\text{which}$) | — |
| **Reason** | — | **Why** (or *that* / zero $\\emptyset$) | — |

- **Preposition Fronting vs. Preposition Stranding**:
  - Formal (Fronting): *"The obelisk **about which** the archeologist wrote is located in Axum."*
  - Informal (Stranding): *"The obelisk **which** the archeologist wrote **about** is located in Axum."*

---

### 5.4.3 Ethiopia\'s Cultural and Natural Heritage Typology
1. **Tangible Cultural Heritage**:
   - Monolithic Rock-Hewn Churches of **Lalibela** (12th-13th century, King Gebre Mesqel Lalibela).
   - Stele Park and Ruins of **Axum** (ancient trading empire, Ezana stone).
   - Royal Enclosure (Fasil Ghebbi) of **Gondar** (17th-century castles of Emperor Fasilides).
   - Walled City of **Harar Jugol** (82 mosques, 102 shrines, 4th holy city of Islam).
   - **Tiya** megalithic carved stone pillars (Soddo region).
   - **Konso** Cultural Landscape (stone terracing, waga anthropomorphic wooden grave statues).
2. **Intangible Cultural Heritage of Humanity (UNESCO Registered)**:
   - **Meskel** (Commemoration of the Finding of the True Cross and Demera bonfire).
   - **Gadaa System** (Oromo democratic socio-political generation-class governance system).
   - **Fichee-Chambalaalla** (Sidama New Year festival calculated by star-gazers / *Ayyaanto*).
   - **Timkat** (Ethiopian Epiphany, baptism commemoration with the Tabot procession).
   - **Shuwalid** festival of Harar (social reconciliation, dating, and community cohesion).`,
      workedExamples: [
        {
          problem: 'Combine the pairs of sentences using an appropriate relative pronoun, applying proper punctuation: (1) "The Semien Mountains National Park is home to the endemic Walia Ibex. It was inscribed on the UNESCO World Heritage list in 1978." (2) "The young paleontologist discovered a 3.8-million-year-old cranium. You interviewed him yesterday."',
          stepByStepSolution: [
            'Pair 1: The Semien Mountains National Park is already uniquely identified by its proper name; the second sentence adds extra non-essential information. Use a Non-Defining Relative Clause with commas and "which" (NOT "that"): **"The Semien Mountains National Park, which was inscribed on the UNESCO World Heritage list in 1978, is home to the endemic Walia Ibex."**',
            'Pair 2: The relative pronoun acts as the object of "interviewed". Since "The young paleontologist" is being identified, use a Defining Relative Clause. Pronoun options: "whom", "who", "that", or omission ($\emptyset$): **"The young paleontologist whom you interviewed yesterday discovered a 3.8-million-year-old cranium."**'
          ],
          shortcutTip: 'If the antecedent is a unique proper noun (e.g., Addis Ababa, Emperor Tewodros, Lake Tana), the relative clause is ALWAYS non-defining and MUST have commas around it!'
        }
      ],
      examTraps: [
        'Using "that" in non-defining relative clauses: *"Addis Ababa, that is the headquarters of the AU, is expanding"* is UNGRAMMATICAL. You must use **"which"**: *"Addis Ababa, which is the headquarters of the AU, is expanding."*',
        'Omitting the relative pronoun when it serves as the SUBJECT of the clause: *"The student won the scholarship was praised"* is WRONG. Correct: *"The student who won the scholarship was praised."*'
      ],
      keyTakeaways: [
        'Defining relative clauses never take commas; non-defining relative clauses must be separated by commas.',
        'The relative pronoun "that" is never used in non-defining clauses or immediately after prepositions (use "which" or "whom").'
      ]
    }
  ]
};
