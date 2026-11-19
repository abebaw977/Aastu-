import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Inclusiveness (Inclusive - 8 Chapters)
 * Preserves all existing notes and adds disability models, Universal Design for Learning (UDL),
 * legal conventions (UNCRPD), barrier mitigation, and multi-stakeholder matrices for all 8 chapters.
 */
export const EXTRA_NOTES_INCLUSIVE: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Understanding Disabilities and Vulnerabilities
  1: [
    {
      id: 'inc-extra-c1-sec1',
      heading: '1.4 Masterclass: The Social vs. Medical Paradigm of Disability & Vulnerability Dimensions',
      content: `### 1.4.1 Impairment vs. Disability vs. Handicap (WHO Framework)
- **Impairment**: Any physiological or psychological loss or abnormality of bodily structure or anatomical function (e.g., loss of a limb, damaged optic nerve, inner ear hair cell degradation).
- **Disability**: Any restriction or lack of ability (resulting from an impairment) to perform an activity in the manner or within the range considered standard for a human being (e.g., inability to walk, inability to see printed text).
- **Handicap**: The **social disadvantage** imposed upon an individual resulting from environmental, physical, or attitudinal barriers that prevent the fulfillment of a normal social role (e.g., a wheelchair user being unable to enter a public university building because there are only stairs and zero ramps).

---

### 1.4.2 Comparative Matrix: Medical Model vs. Social Model of Disability

| Dimension | Medical (Deficit) Model | Social (Human Rights) Model |
| :--- | :--- | :--- |
| **Locus of the Problem** | Located **inside the individual** (the biological defect, disease, or anatomical flaw). | Located in **unaccommodating society** (inaccessible environments, prejudice, rigid systems). |
| **Solution & Goal** | Medical treatment, surgery, rehabilitation, "curing" the person to fit into normal society. | Systemic social transformation, barrier elimination, universal accessibility, legal equality. |
| **Role of the Person** | Passive patient, recipient of clinical charity, object of medical intervention. | Active rights-bearer, citizen, decision-maker, and full participant. |
| **Agent of Change** | Doctors, surgeons, clinical therapists, charity organizations. | Disabled people's organizations (DPOs), lawmakers, inclusive educators, society. |`,
      keyTakeaways: [
        'Under the Social Model, a person with an impairment is disabled not by their body, but by an unaccommodating society that constructs physical, communication, and attitudinal barriers.',
        'Vulnerability encompasses socio-economic risks affecting marginalized populations beyond physical impairments.'
      ]
    }
  ],

  // Chapter 2: Concept of Inclusion
  2: [
    {
      id: 'inc-extra-c2-sec1',
      heading: '2.4 Masterclass: The Inclusion Paradigm Continuum & Universal Human Rights Principles',
      content: `### 2.4.1 The Four Evolutionary Stages: Exclusion $\\to$ Segregation $\\to$ Integration $\\to$ Inclusion

$$\\begin{array}{c|l|l}
\\textbf{Paradigm} & \\textbf{Spatial & Institutional Arrangement} & \\textbf{Philosophy & Operational Assumption} \\\\ \\hline
\\textbf{Exclusion} & Denied access to education, public buildings, and employment. & Viewed as uneducable, a burden, or divine punishment; hidden at home. \\\\
\\textbf{Segregation} & Isolated into specialized institutions, separate "special schools". & Grouped only with peers having identical disabilities; severed from mainstream society. \\\\
\\textbf{Integration} & Placed into mainstream schools, but **must adapt to the rigid existing system**. & Individual must "fit in" without institutional curriculum or structural modifications. \\\\
\\textbf{Inclusion} & **The system transforms itself** to accommodate all diverse learners universally. & Proactive restructuring of environments, policies, and pedagogy to welcome all citizens.
\\end{array}$$

---

### 2.4.2 Universal Design (UD) Principles
Universal Design is the design of products, environments, and communication to be usable by all people, to the greatest extent possible, without the need for adaptation or specialized design:
1. **Equitable Use**: Useful and marketable to people with diverse abilities.
2. **Flexibility in Use**: Accommodates a wide range of individual preferences and abilities.
3. **Simple and Intuitive Use**: Easy to understand, regardless of user experience, knowledge, or language skills.
4. **Perceptible Information**: Communicates necessary information effectively through multiple sensory modalities (visual, auditory, tactile).
5. **Tolerance for Error**: Minimizes hazards and adverse consequences of accidental actions.
6. **Low Physical Effort**: Can be used efficiently and comfortably with minimum fatigue.
7. **Size and Space for Approach and Use**: Appropriate dimensions for approach, reach, manipulation, and use regardless of body size, posture, or mobility.`,
      keyTakeaways: [
        'Integration asks the child to change to fit the school; Inclusion changes the school to welcome every child.',
        'Universal design benefits everyone (e.g., curb cuts designed for wheelchairs also help parents with strollers and cyclists).'
      ]
    }
  ],

  // Chapter 3: Identification and Differentiated Services
  3: [
    {
      id: 'inc-extra-c3-sec1',
      heading: '3.4 Masterclass: Universal Design for Learning (UDL) & Differentiated Instructional Pedagogy',
      content: `### 3.4.1 The Three Brain Networks of Universal Design for Learning (UDL)
Developed by CAST (Center for Applied Special Technology):
1. **Multiple Means of Representation (The "What" of Learning — Recognition Network)**:
   - Presenting information and course content in diverse multi-modal formats: digital text-to-speech, tactile Braille, high-contrast visual diagrams, closed-captioned video lectures, and physical manipulatives.
2. **Multiple Means of Action and Expression (The "How" of Learning — Strategic Network)**:
   - Providing alternative modalities for students to demonstrate mastery: oral presentations, written essays, multimedia portfolios, concept maps, or hands-on laboratory demonstrations.
3. **Multiple Means of Engagement (The "Why" of Learning — Affective Network)**:
   - Stimulating interest and motivation through collaborative peer learning, real-world relevant problem-solving, flexible pacing, and self-assessment rubrics.

---

### 3.4.2 Differentiated Instruction Across Four Pedagogical Dimensions
- **Content**: What the student needs to learn or how access to information is delivered (audiobooks, tiered reading levels).
- **Process**: Activities in which the student engages to make sense of the content (graphic organizers, small-group cooperative stations).
- **Product**: Culminating projects that demonstrate knowledge acquisition.
- **Learning Environment**: Physical and affective classroom atmosphere (quiet study zones, accessible wheelchair seating).`,
      keyTakeaways: [
        'UDL proactively builds accessibility into curriculum design from the start, avoiding last-minute ad hoc accommodations.',
        'Differentiated instruction acknowledges that one-size-fits-all teaching leaves many diverse learners behind.'
      ]
    }
  ],

  // Chapter 4: Promoting Inclusive Culture
  4: [
    {
      id: 'inc-extra-c4-sec1',
      heading: '4.4 Masterclass: Dismantling the Four Barriers to Inclusion & Combating Cultural Stigma',
      content: `### 4.4.1 The Four Systematic Barriers to Social Inclusion
1. **Attitudinal Barriers**:
   - Prejudices, fear, low expectations, negative cultural superstitions (believing disability is caused by curses, ancestral sins, or witchcraft), pity, and patronizing charity models. *The hardest barrier to eradicate!*
2. **Physical (Architectural) Barriers**:
   - Absence of ramps, narrow doorways, steep stairs, inaccessible bathrooms, lack of tactile paving for visually impaired pedestrians, non-curb-cut pavements.
3. **Communication and Information Barriers**:
   - Printed materials lacking Braille or digital screen-reader compatibility, lack of certified sign-language interpreters for deaf citizens, websites lacking alt-text descriptions.
4. **Institutional (Policy & Legal) Barriers**:
   - Inflexible examination guidelines, absence of inclusive educational budgeting, discriminatory employment hiring requirements.`,
      keyTakeaways: [
        'Attitudinal barriers are the most pervasive impediment to inclusion, generating all physical and institutional barriers.',
        'Persons with disabilities must be portrayed as autonomous, capable citizens rather than tragic objects of pity.'
      ]
    }
  ],

  // Chapter 5: Inclusion for Peace, Democracy and Development
  5: [
    {
      id: 'inc-extra-c5-sec1',
      heading: '5.4 Masterclass: The Macroeconomic Impact of Exclusion & The UN Sustainable Development Goals',
      content: `### 5.4.1 The Economic Cost of Exclusion vs. Benefit of Inclusion
- **The Exclusion Trap**: Excluding persons with disabilities from education and productive employment costs developing nations an estimated **$3\\%\\text{--}7\\%$ of annual Gross Domestic Product (GDP)** due to lost productivity, caregiver absenteeism, and welfare dependency.
- **The Inclusion Dividend**: Investing in inclusive vocational education and accessible infrastructure unlocks massive human capital, expands national tax bases, and stimulates domestic economic growth.

---

### 5.4.2 Inclusiveness in the UN 2030 Sustainable Development Goals (SDGs)
The 2030 Agenda pledge to **"Leave No One Behind"** explicitly embeds disability across key goals:
- **SDG 4 (Quality Education)**: Guarantee inclusive and equitable quality education and promote lifelong learning opportunities for all.
- **SDG 8 (Decent Work & Economic Growth)**: Promote full and productive employment and decent work for all women and men, including for persons with disabilities.
- **SDG 10 (Reduced Inequalities)**: Empower and promote the social, economic, and political inclusion of all.
- **SDG 11 (Sustainable Cities)**: Provide universal access to safe, inclusive, and accessible, green and public spaces.`,
      keyTakeaways: [
        'Inclusion is an economic imperative; empowering marginalized citizens yields substantial returns in national productivity.',
        'Sustainable development cannot be achieved while systematically leaving behind millions of citizens with disabilities.'
      ]
    }
  ],

  // Chapter 6: Legal Framework for Inclusion
  6: [
    {
      id: 'inc-extra-c6-sec1',
      heading: '6.4 Masterclass: UNCRPD Human Rights Architecture & Ethiopian Constitutional Safeguards',
      content: `### 6.4.1 UN Convention on the Rights of Persons with Disabilities (UNCRPD, 2006)
Ratified by Ethiopia in 2010; marks the definitive global paradigm shift from medical charity to binding human rights:
- **Article 3 (Eight General Principles)**:
  1. Respect for inherent dignity, individual autonomy, and independence.
  2. Non-discrimination.
  3. Full and effective participation and inclusion in society.
  4. Respect for difference and acceptance of persons with disabilities as part of human diversity.
  5. Equality of opportunity.
  6. Accessibility.
  7. Equality between men and women.
  8. Respect for the evolving capacities of children with disabilities.
- **Reasonable Accommodation**: Necessary and appropriate modifications and adjustments not imposing a disproportionate or undue burden, to ensure persons with disabilities enjoy all human rights on an equal basis with others. Denying reasonable accommodation is legally classified as **discrimination**.

---

### 6.4.2 Ethiopian Domestic Constitutional and Legislative Framework
- **1995 FDRE Constitution Article 41(5)**: Explicit state obligation to allocate resources for the rehabilitation and assistance of physically and mentally disabled persons, the aged, and orphans.
- **Federal Building Proclamation No. 624/2009**: Mandates that all public buildings must incorporate physical accessibility features (ramps, elevators, braille signage, accessible restrooms).
- **Higher Education Proclamation No. 1152/2019**: Directs public universities to establish special needs support centers, provide assistive technology, and adapt exam procedures.`,
      keyTakeaways: [
        'The UNCRPD legally redefines accessibility and reasonable accommodation as fundamental human rights, not optional favors.',
        'Denial of reasonable accommodation constitutes unlawful discrimination under international and domestic law.'
      ]
    }
  ],

  // Chapter 7: Resources Management for Inclusion
  7: [
    {
      id: 'inc-extra-c7-sec1',
      heading: '7.4 Masterclass: Specialized Resource Centers, Assistive Tech Ecosystems & Budgetary Allocation',
      content: `### 7.4.1 Higher Education Specialized Resource Centers
Comprehensive university inclusive resource centers provide three foundational service streams:
1. **Assistive Technology Ecosystem**:
   - Screen-reading software (JAWS, NVDA, TalkBack).
   - Refreshable Braille displays and Braille embossers for converting course syllabi and exam sheets.
   - Screen-magnification software (ZoomText) for low-vision scholars.
   - Speech-to-text transcription software and FM listening systems for hard-of-hearing students.
2. **Specialized Human Resources**:
   - Certified Ethiopian Sign Language (EthSL) interpreters for lectures and campus events.
   - Transcribers, readers, and peer sighted-guides.
   - Special needs educational coordinators.
3. **Adaptive Exam Administration**:
   - Extended examination time ($25\\%\\text{--}50\\%$ extra time).
   - Large-print test booklets, oral examination options, and quiet distraction-free testing cubicles.`,
      keyTakeaways: [
        'Assistive technology bridges the gap between individual functional capacity and environmental requirements.',
        'Providing extended exam time compensates for processing or reading speed without compromising academic standards.'
      ]
    }
  ],

  // Chapter 8: Collaborative Partnerships with Stakeholders
  8: [
    {
      id: 'inc-extra-c8-sec1',
      heading: '8.4 Masterclass: Multi-Sectoral Stakeholder Synergy & Organizations of Persons with Disabilities',
      content: `### 8.4.1 The Multi-Stakeholder Inclusion Ecosystem
True inclusion cannot be achieved by universities or educational institutions operating in isolation:
1. **Organizations of Persons with Disabilities (OPDs)**:
   - Ethiopian National Association of the Blind (ENAB), Ethiopian National Association of the Deaf (ENAD), Ethiopian National Disability Action Network (ENDAN).
   - Core Motto: *"Nothing About Us Without Us"*—insisting that persons with disabilities must lead, formulate, and monitor all policies affecting their lives.
2. **Inter-Ministerial Collaboration**:
   - Ministry of Education (MoE, inclusive pedagogy).
   - Ministry of Health (MoH, early medical screening and intervention).
   - Ministry of Women and Social Affairs (MoWSA, welfare and protection).
   - Ministry of Urban and Infrastructure (accessible public transport and building compliance).
3. **Family and Community Engagement**:
   - Parent support groups, combating domestic stigmatization, encouraging girls with disabilities to attend school, and community-based rehabilitation (CBR).`,
      keyTakeaways: [
        '"Nothing About Us Without Us" is the core ethical principle demanding direct representation of persons with disabilities in all policy decisions.',
        'Cross-sectoral collaboration ensures continuous support across education, healthcare, transport, and employment.'
      ]
    }
  ]
};
