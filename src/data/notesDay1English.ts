import { MasterNoteChapter } from '../types';

export const DAY1_ENGLISH_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'eng-ch1-grammar-mastery',
    subject: 'aptitude',
    chapterNumber: 2,
    title: 'English & Verbal Aptitude: Advanced Grammar, Sentence Correction & Conditionals',
    gradeLevel: 'University Prep',
    overview: 'Massive, exhaustive grammar handbook specifically engineered for the AASTU English & Verbal section. Covers Subject-Verb Agreement exceptions, all 4 Conditional forms with Subjunctive Inversions, Active vs Passive voice in STEM contexts, Direct/Indirect speech transformations, Relative Pronouns (who/whom/whose/which/that), Modals of deduction, Parallelism, and Dangling Modifiers.',
    estimatedReadTimeMinutes: 40,
    sections: [
      {
        id: 'eng-1-1-subject-verb-agreement',
        heading: '1.1 Subject-Verb Agreement: The 10 Critical University Entrance Rules',
        content: `Subject-Verb Agreement is the single most heavily tested grammar topic in Ethiopian university entrance exams (accounting for 35–45% of error identification and sentence completion items).

---

### Rule 1: Singular Indefinite Pronouns
The following indefinite pronouns are **ALWAYS SINGULAR** and require singular verbs (is, was, has, does, verb+-s):
- *Each, Every, Everyone, Everybody, Everything*
- *Anyone, Anybody, Anything, No one, Nobody, Nothing*
- *Either, Neither, One, Another, Much*

**Exam Trap Examples**:
- ❌ *Incorrect*: "Each of the experimental samples were contaminated."
- ✅ **Correct**: "Each of the experimental samples **was** contaminated."
- ❌ *Incorrect*: "Neither of the two solutions have reached equilibrium."
- ✅ **Correct**: "Neither of the two solutions **has** reached equilibrium."

---

### Rule 2: Intervening Prepositional Phrases & Distractors
The verb must agree with the **true head noun** (subject), ignoring all modifying phrases placed in between (such as *along with, together with, as well as, in addition to, accompanied by, including, of, with*).

- ❌ *Incorrect*: "The speed of the supersonic particles have been recorded."
- ✅ **Correct**: "The **speed** [of the supersonic particles] **has been** recorded." (Subject is 'speed', singular).
- ❌ *Incorrect*: "The lead researcher, along with her lab assistants, are attending the conference."
- ✅ **Correct**: "The **lead researcher**, [along with her lab assistants], **is attending** the conference."

---

### Rule 3: Correlative Conjunctions ('Either...or', 'Neither...nor', 'Not only...but also')
When subjects are connected by *either...or*, *neither...nor*, or *not only...but also*, the verb **must agree with the subject closest (nearest) to it**.

- ✅ **Correct**: "Neither the professor nor the **students were** aware of the apparatus defect."
- ✅ **Correct**: "Neither the students nor the **professor was** aware of the apparatus defect."

---

### Rule 4: 'A Number of' vs. 'The Number of'
- **'A number of'** = Several / Many $\\implies$ **PLURAL VERB**
  - "A number of engineering candidates **have passed** the entrance test."
- **'The number of'** = A specific statistic / quantity $\\implies$ **SINGULAR VERB**
  - "The number of admitted students **is** limited to 500."

---

### Rule 5: Quantities of Time, Money, Distance, and Measurements
Expressions of time, money, volume, distance, and physical measurements are considered a **single unit** and take a **SINGULAR VERB**.
- "Fifty kilometers **is** a long distance to travel on foot." (NOT 'are').
- "Ten million Birr **was** allocated for laboratory renovations." (NOT 'were').
- "Three hours **is** the maximum duration allowed for the mock exam."

---

### Rule 6: Collective Nouns (Jury, Committee, Team, Faculty)
- When acting as a unified single body $\\implies$ **Singular Verb**:
  - "The evaluation committee **has finalized** the exam syllabus."
- When members act individually $\\implies$ **Plural Verb**:
  - "The committee **are divided** in their opinions regarding the pass mark."

---

### Rule 7: Fractional Expressions & Percentages ('Some of', 'All of', 'Most of', '50% of')
With fractions and percentages, the verb agrees with the **object of the preposition**:
- "Two-thirds of the **water was** evaporated." (Water = uncountable $\\implies$ singular).
- "Two-thirds of the **students were** eligible for scholarship." (Students = countable plural $\\implies$ plural).`,
        equations: [
          {
            name: "Rule of Proximity",
            formula: "\\text{Neither } S_1 \\text{ nor } S_2 + V_{(S_2)}",
            explanation: "The verb takes the number and person of the nearest subject ($S_2$)."
          },
          {
            name: "The 'Number of' Pattern",
            formula: "\\text{'A number of'} + \\text{Plural Verb} \\quad \\text{vs} \\quad \\text{'The number of'} + \\text{Singular Verb}",
            explanation: "'A number' indicates quantity; 'The number' denotes a singular count."
          }
        ],
        workedExamples: [
          {
            problem: "Identify the grammatically correct sentence: \n(A) The diversity of flora and fauna in the Ethiopian highlands are astonishing. \n(B) The diversity of flora and fauna in the Ethiopian highlands is astonishing. \n(C) The diversity of flora and fauna in the Ethiopian highlands were astonishing. \n(D) The diversity of flora and fauna in the Ethiopian highlands have been astonishing.",
            stepByStepSolution: [
              "Identify the true grammatical subject: Eliminate the prepositional phrases '[of flora and fauna]' and '[in the Ethiopian highlands]'.",
              "The head noun is 'The diversity', which is an abstract singular noun.",
              "A singular subject requires a singular present verb ('is').",
              "Therefore, option (B) is the only correct answer."
            ],
            shortcutTip: "Cross out all prepositional phrases between commas or 'of' to isolate the lone root noun instantly!"
          }
        ],
        examTraps: [
          "Letting plural nouns inside prepositional phrases (e.g. 'samples', 'particles', 'highlands') fool you into choosing a plural verb.",
          "Treating 'everybody' or 'everyone' as plural because they refer to multiple people. In English grammar, they are grammatically singular!"
        ],
        keyTakeaways: [
          "Uncountable nouns (information, equipment, advice, research, furniture, luggage) NEVER take plural '-s' and ALWAYS take singular verbs.",
          "'One of the [Plural Noun] who [Plural Verb]' vs 'The ONLY one of the [Plural Noun] who [Singular Verb]'."
        ]
      },
      {
        id: 'eng-1-2-conditionals-inversions',
        heading: '1.2 The 4 Conditionals, Mixed Types & Advanced Inversions',
        content: `Conditionals express conditions and their real or hypothetical consequences.

---

### Master Conditional Matrix

| Type | If-Clause | Main Clause | Use Case | Example |
|---|---|---|---|---|
| **Zero** | Present Simple | Present Simple | Scientific laws, universal facts | "If you heat ice, it **melts**." |
| **First** | Present Simple | will / can / may + Base Verb | Real future possibility | "If you study hard, you **will succeed**." |
| **Second** | Past Simple (were) | would / could / might + Base Verb | Unreal / hypothetical present | "If I **were** the director, I **would hire** her." |
| **Third** | Past Perfect (had + V3) | would / could / might + have + V3 | Unreal past / regret | "If we **had calibrated** the tool, it **would have worked**." |

---

### Special Second Conditional Note: Subjunctive 'Were'
In formal English and university entrance testing, **'were'** is strictly used for ALL subjects (including *I, he, she, it*) in hypothetical conditions:
- ✅ "If she **were** available, she would lead the research project." (Never use 'was' in formal conditional exams).

---

### Advanced Subjunctive Inversions (High-Scoring AASTU Pattern)
Entrance examiners frequently omit the word **'If'** and invert the subject and auxiliary verb. You must recognize these immediately:

#### 1. Inversion of First Conditional (Should):
- Standard: "If you need further laboratory assistance, please notify the technician."
- **Inverted**: "**Should you need** further laboratory assistance, please notify the technician."

#### 2. Inversion of Second Conditional (Were):
- Standard: "If the temperature were higher, the reaction would proceed faster."
- **Inverted**: "**Were the temperature higher**, the reaction would proceed faster."
- Standard (with action verb): "If he knew the formula, he would solve it."
- **Inverted**: "**Were he to know** the formula, he would solve it."

#### 3. Inversion of Third Conditional (Had):
- Standard: "If we had known the deadline, we would have submitted the paper earlier."
- **Inverted**: "**Had we known** the deadline, we would have submitted the paper earlier."

---

### Mixed Conditionals (Past Cause with Present Result):
- Structure: $\\text{If} + \\text{Past Perfect (had + V3)}, \\dots \\text{would} + \\text{Base Verb (now)}$
- Example: "If he **had passed** the entrance exam last year, he **would be** a sophomore engineering student today."`,
        equations: [
          {
            name: "Third Conditional Rule",
            formula: "\\text{If} + S + \\text{had} + V_3, \\dots S + \\text{would have} + V_3",
            explanation: "Regret or unreal condition in the past."
          },
          {
            name: "Third Conditional Inversion",
            formula: "\\text{Had} + S + V_3, \\dots S + \\text{would have} + V_3",
            explanation: "Formal inversion omitting the word 'If'."
          }
        ],
        workedExamples: [
          {
            problem: "Complete the sentence: '__________ the severe weather conditions, the flight would have landed on schedule.' \n(A) Had it not been for \n(B) If it was not for \n(C) Were it not \n(D) Should it not be",
            stepByStepSolution: [
              "Look at the main clause: 'would have landed' (Third Conditional pattern).",
              "The matching condition must be in the past perfect: 'If it had not been for...'",
              "Inverted form of 'If it had not been for...' is 'Had it not been for...'",
              "Therefore, (A) is the correct answer."
            ],
            shortcutTip: "Spot 'would have + V3' in the result clause $\\to$ scan immediately for 'Had + V3' or 'Had it not been for' in the choices!"
          }
        ],
        examTraps: [
          "Never put 'would' or 'would have' in the IF-clause! (e.g. ❌ 'If I would have known...' is ALWAYS WRONG; ✅ 'If I had known...').",
          "Confusing Second Conditional ('would + V') with Third Conditional ('would have + V3'). Always check time markers like 'yesterday' vs 'now'."
        ],
        keyTakeaways: [
          "Unless = If not. (e.g. 'Unless you study' = 'If you do not study'). Never use a negative verb directly with 'unless'.",
          "Provided that / As long as = If."
        ]
      },
      {
        id: 'eng-1-3-voice-speech-reading',
        heading: '1.3 Passive Voice, Relative Pronouns & Speed Reading Comprehension',
        content: `### 1. Active vs. Passive Voice in STEM Writing
In scientific and engineering writing, the **Passive Voice** is preferred because the *experiment, process, or phenomenon* is more significant than the person performing it.

**Transformation Rule**:
- Active: $\\text{Subject} + \\text{Verb} + \\text{Object}$
- Passive: $\\text{Object} + \\text{be (in appropriate tense)} + \\text{Past Participle (V3)} + (\\text{by Subject})$

| Tense | Active Form | Passive Form |
|---|---|---|
| Present Simple | conducts | is / are conducted |
| Present Continuous | is conducting | is / are being conducted |
| Past Simple | conducted | was / were conducted |
| Past Continuous | was conducting | was / were being conducted |
| Present Perfect | has conducted | has / have been conducted |
| Past Perfect | had conducted | had been conducted |
| Modals (can/must) | can conduct | can / must be conducted |

**Impersonal Passive for Scientific Hypotheses**:
- "It is widely believed that..."
- "The chemical compound was reported to have antibiotic properties."

---

### 2. Relative Pronouns: Who vs. Whom vs. Whose vs. Which vs. That

- **Who**: Subject pronoun (refers to people, performs action: *The scientist who discovered...*).
- **Whom**: Object pronoun (refers to people, receives action: *The engineer whom the dean appointed...*).
  - *Quick Test*: Substitute *he/she* vs *him/her*. If *him* fits $\\implies$ use **whom**. (e.g., 'To whom did you give it? $\\to$ I gave it to *him*').
- **Whose**: Possessive pronoun for people or entities (*The university whose campus is located in Kilinto...*).
- **Which**: Non-restrictive clauses (gives extra information, set off with commas: *The oscilloscope, which was imported from Germany, is broken.*).
- **That**: Restrictive / essential clauses (no commas: *The circuit that powers the laser requires 220V.*).

---

### 3. High-Speed Reading Comprehension Tactics for AASTU
The English section contains 2–3 reading passages. You have an average of **45 seconds per question**.

1. **Read Questions First**: Scan the 4–5 questions before touching the passage to know what keywords (names, dates, specialized terms) to locate.
2. **Topic Sentence Technique**: In 90% of academic texts, the main idea of a paragraph is contained in the **first or last sentence**.
3. **Fact vs. Inference**:
   - Direct Fact: Located verbatim or paraphrased in the text.
   - Inference: Logical deduction based on text clues (must NOT contradict stated facts, avoid extreme choices containing *always, never, completely*).
4. **Context Clues for Vocabulary**:
   - Contrast Clues: *However, whereas, in contrast, despite* indicate opposite meaning.
   - Restatement Clues: *That is to say, in other words, known as* define the term.`,
        equations: [
          {
            name: "Passive Verb Structure",
            formula: "\\text{Passive} = \\text{be (conjugated)} + V_3 \\text{ (Past Participle)}",
            explanation: "Essential for scientific and technical report comprehension."
          },
          {
            name: "Who vs Whom He/Him Test",
            formula: "\\text{Who} \\to \\text{He/They (Subject)} \\quad \\text{vs} \\quad \\text{Whom} \\to \\text{Him/Them (Object)}",
            explanation: "Instant grammatical litmus test."
          }
        ],
        workedExamples: [
          {
            problem: "Choose the correct relative pronoun: 'Dr. Bekele, __________ the department honored last year, has published a new paper on quantum thermodynamics.' \n(A) who \n(B) whom \n(C) which \n(D) whose",
            stepByStepSolution: [
              "Analyze the clause: 'the department honored [person] last year'.",
              "The subject of this clause is 'the department' and the verb is 'honored'.",
              "Dr. Bekele is the object receiving the honor ('The department honored *him*').",
              "Because the pronoun functions as an object referring to a person, use 'whom'.",
              "Therefore, (B) is the correct answer."
            ],
            shortcutTip: "Replace with 'him': 'The department honored *him*' $\\implies$ 'who**m**' (both end in 'm')!"
          }
        ],
        examTraps: [
          "Using 'that' with non-restrictive clauses surrounded by commas (e.g. ❌ 'The library, that was built in 2012,...' is WRONG; use 'which').",
          "Selecting reading comprehension choices that are factually true in real life but NOT mentioned or supported anywhere in the provided passage."
        ],
        keyTakeaways: [
          "Dangling Modifiers: A participial phrase at the start of a sentence must logically modify the subject that immediately follows the comma. (e.g. ❌ 'Walking into the lab, the beaker fell.' $\\implies$ ✅ 'Walking into the lab, the student dropped the beaker.').",
          "Parallelism: Elements in a series must have identical grammatical form ('She likes calculating, designing, and coding'—not 'to code')."
        ]
      }
    ]
  }
];
