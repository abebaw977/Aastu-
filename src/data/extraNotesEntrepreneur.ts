import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Entrepreneurship (Entrepreuner - 7 Chapters)
 * Preserves all existing notes and adds business model matrices, Ethiopian Commercial Code structures,
 * financial feasibility formulas, break-even math, and growth matrices for all 7 chapters.
 */
export const EXTRA_NOTES_ENTREPRENEUR: Record<number, MasterNoteSection[]> = {
  // Chapter 1: The Nature of Entrepreneurship
  1: [
    {
      id: 'ent-extra-c1-sec1',
      heading: '1.4 Masterclass: Schumpeterian Creative Destruction, The Entrepreneurial Mindset & Intrapreneurship',
      content: `### 1.4.1 Theoretical Evolution of Entrepreneurial Thought
- **Joseph Schumpeter\'s Theory of Creative Destruction**:
  Entrepreneurship is the fundamental engine of economic dynamism. Entrepreneurs introduce **radical innovations** (new goods, new production methods, opening new markets, discovering new supply sources, reorganization of industry) that disrupt and displace obsolete incumbent business models.
- **The Entrepreneurial Mindset (Core Behavioral Traits)**:
  1. **Calculated Risk-Taking**: Neither reckless gamblers nor passive risk-averters; systematically assess risk-reward ratios and mitigate downside liabilities.
  2. **Internal Locus of Control**: Firm conviction that success or failure is determined by one's own initiative, skill, and effort rather than external luck or fate.
  3. **Tolerance for Ambiguity**: Comfort with incomplete market data and rapidly shifting operational conditions.
  4. **Need for Achievement (David McClelland)**: Deep intrinsic drive for personal mastery, challenging targets, and tangible goal realization.
  5. **Opportunity Obsession**: Identifying unmet market pain points where others perceive only disruption or inconvenience.

---

### 1.4.2 Comparative Matrix: Entrepreneur vs. Intrapreneur vs. Traditional Manager

| Dimension | Entrepreneur | Intrapreneur (Corporate Entrepreneur) | Traditional Administrative Manager |
| :--- | :--- | :--- | :--- |
| **Operational Setting** | Independent new venture / startup. | Inside an established corporate enterprise. | Established corporate or government hierarchy. |
| **Primary Goal** | Market creation, financial autonomy, wealth generation. | Corporate innovation, new product line development. | Operational stability, predictability, resource stewardship. |
| **Risk Exposure** | **Personal financial, career, and reputational risk**. | Moderate corporate career risk; zero personal equity loss. | Minimal personal financial risk; risk-averse behavior. |
| **Resource Base** | Scrappy bootstrapping, external equity/debt. | Corporate funding, established enterprise infrastructure. | Pre-allocated annual operational budget. |
| **Response to Failure** | Direct financial loss; learning opportunity for iteration. | Project cancellation; shielded by corporate balance sheet. | Punitive career consequences; failure is avoided. |`,
      keyTakeaways: [
        'Entrepreneurship is a learned discipline and behavioral mindset, not an inherited genetic personality trait.',
        'Intrapreneurs bring startup agility and disruptive innovation inside large bureaucratic corporations.'
      ]
    }
  ],

  // Chapter 2: Business Planning
  2: [
    {
      id: 'ent-extra-c2-sec1',
      heading: '2.4 Masterclass: Osterwalder\'s 9-Block Business Model Canvas & Bankable Feasibility Criteria',
      content: `### 2.4.1 The Business Model Canvas (Alexander Osterwalder)
A 1-page visual architectural map of how an enterprise creates, delivers, and captures value:

| Canvas Block | Core Diagnostic Question | Key Strategic Components |
| :--- | :--- | :--- |
| **1. Customer Segments** | For whom are we creating value? | Mass market, niche market, segmented, multi-sided platforms (e.g., Ride-hailing connecting riders and drivers). |
| **2. Value Propositions** | What distinct bundle of value solves customer pain points? | Newness, performance, customization, price, design, brand status, convenience/accessibility. |
| **3. Channels** | Through which touchpoints do we reach customers? | Direct sales, e-commerce web/mobile apps, wholesale distributors, retail partners. |
| **4. Customer Relationships**| How do we acquire, retain, and grow customers? | Dedicated personal assistance, automated self-service, community forums, co-creation. |
| **5. Revenue Streams** | For what value are customers genuinely willing to pay? | Asset sale, usage fees, subscription fees, licensing, brokerage fees, advertising. |
| **6. Key Resources** | What critical assets are required to deliver the value? | Physical facilities, intellectual property (patents, brands), human talent, financial capital. |
| **7. Key Activities** | What vital operations must the venture execute flawlessly?| Software engineering, supply chain logistics, precision manufacturing, customer support. |
| **8. Key Partnerships** | Who are our essential suppliers and strategic allies? | Optimization/economies of scale, reduction of risk/uncertainty, acquisition of specific resources. |
| **9. Cost Structure** | What are the major monetary costs incurred? | Cost-driven (no-frills) vs. Value-driven; fixed costs, variable costs, economies of scale. |

---

### 2.4.2 Structure of a Formal Bankable Business Plan
1. **Executive Summary**: 2-page snapshot of the venture, problem, solution, target market, financial projections, and funding request.
2. **Business Description & Industry Analysis**: Vision, mission, legal structure, SWOT analysis, and macro PESTEL trends.
3. **Market Analysis**: TAM (Total Addressable Market), SAM (Serviceable Available Market), SOM (Serviceable Obtainable Market), and competitor profiling.
4. **Organization and Management Team**: Key personnel bios, organizational chart, and advisory board credentials.
5. **Product / Service Line**: Core benefits, lifecycle stage, R&D roadmap, and IP protection.
6. **Marketing and Sales Strategy**: Pricing model, sales distribution channels, and promotional campaigns.
7. **Financial Projections**: 3-to-5-year pro forma Income Statements, Balance Sheets, Cash Flow forecasts, and Break-Even calculations.`,
      keyTakeaways: [
        'The Business Model Canvas is an agile hypothesis-testing tool; the Business Plan is a detailed operational execution roadmap.',
        'Investors prioritize the caliber, coherence, and execution track record of the founding management team above all else.'
      ]
    }
  ],

  // Chapter 3: Business Formation
  3: [
    {
      id: 'ent-extra-c3-sec1',
      heading: '3.4 Masterclass: Legal Structures under the Ethiopian Commercial Code & Regulatory Compliance',
      content: `### 3.4.1 Legal Forms of Business Enterprise in Ethiopia (Commercial Code of Ethiopia)

| Legal Structure | Minimum / Maximum Members | Capital Requirements | Liability of Owners / Partners | Legal Entity & Transferability |
| :--- | :--- | :--- | :--- | :--- |
| **Sole Proprietorship** | Exactly $1$ owner. | No legal minimum capital. | **Unlimited personal liability** (personal assets can be seized for business debts). | No separate legal entity; business terminates upon death of owner. |
| **General Partnership** | Minimum $2$ partners. | Determined by partnership agreement. | **Joint, several, and unlimited liability** for all partnership obligations. | Separate legal person; transfer of shares requires unanimous consent of all partners. |
| **Private Limited Company (PLC / Ltd)** | **Min: $2$, Max: $50$ shareholders**. | Determined by commercial registry. | **Limited to capital contributed** (personal assets strictly protected). | Separate legal personality; shares cannot be offered to the public; share transfer to outsiders restricted. |
| **Share Company (S.C.)** | **Minimum: $5$ shareholders** (No maximum). | Established legal minimum capital. | **Limited strictly to value of subscribed shares**. | Separate legal entity; shares are freely negotiable, transferable, and can be offered for **public subscription/IPO**. |

---

### 3.4.2 Legal Registration and Tax Compliance Steps in Ethiopia
1. **Commercial Name Clearance**: Verify availability of unique trade name with the Ministry of Trade and Regional Integration (MoTRI).
2. **Authentication of Memorandum and Articles of Association**: Executed at the Federal Documents Authentication and Registration Agency (DARA).
3. **Bank Account Opening for Capital Deposit**: Deposit minimum startup equity into a blocked account.
4. **Commercial Registration & Business License Issuance**: Formal issuance of trade license.
5. **Tax Identification Number (TIN) & Value Added Tax (VAT)**: Registering with the Ethiopian Ministry of Revenues (MoR) for income tax and VAT compliance.`,
      keyTakeaways: [
        'A Private Limited Company (PLC) is the most popular form for Ethiopian SMEs because it provides limited liability protection with simple governance.',
        'In general partnerships and sole proprietorships, personal assets (home, car, savings) are directly vulnerable to business creditors.'
      ]
    }
  ],

  // Chapter 4: Product/Service Development
  4: [
    {
      id: 'ent-extra-c4-sec1',
      heading: '4.4 Masterclass: The 5-Stage Design Thinking Framework, MVP Iteration & Ethiopian IP Law',
      content: `### 4.4.1 Stanford d.school 5-Stage Design Thinking Framework
A human-centered, iterative methodology for developing breakout products and services:
1. **Empathize**: Conduct deep qualitative fieldwork, user shadowing, and open-ended interviews to uncover latent customer frustrations and unspoken emotional needs.
2. **Define**: Synthesize observational data to construct a crisp, actionable **Problem Statement (Point of View)** focused on user needs.
3. **Ideate**: Brainstorm a broad range of creative solutions using techniques like SCAMPER (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse) and brainwriting without premature criticism.
4. **Prototype**: Construct inexpensive, low-fidelity rough models (paper wireframes, physical mockups) to facilitate rapid interactive feedback.
5. **Test**: Put prototypes in front of real users in authentic environments to validate hypotheses and uncover failure points.

---

### 4.4.2 Minimum Viable Product (MVP) and Eric Ries\'s Lean Startup Loop
$$\\mathbf{Build} \\longrightarrow \\mathbf{Measure} \\longrightarrow \\mathbf{Learn}$$
- **Minimum Viable Product (MVP)**: The version of a new product that enables a team to collect the maximum amount of validated customer learning with the least effort and capital expenditure.
- **Pivot vs. Persevere**:
  - **Persevere**: Double down on the existing product roadmap if customer engagement metrics confirm core value hypotheses.
  - **Pivot**: Make a fundamental structural correction in product strategy, pricing, or target customer segment based on real feedback.

---

### 4.4.3 Intellectual Property Rights in Ethiopia (EIPO Framework)
- **Patents**: Exclusive rights granted for new, non-obvious, industrially applicable inventions (protection duration: up to **20 years**).
- **Trademarks**: Distinctive signs, logos, or slogans used to identify and distinguish products in commerce (renewable protection).
- **Copyrights**: Exclusive protection for original literary, musical, artistic, and software works (protection: author's lifetime $+ 50\\text{ years}$).
- **Trade Secrets**: Confidential business information, formulas, customer lists, and processes protected by non-disclosure agreements (NDAs).`,
      keyTakeaways: [
        'An MVP is not a broken, buggy product; it is the simplest functional version that delivers core value to early adopters.',
        'Design thinking relies on empathy and iterative prototyping rather than speculative boardroom assumptions.'
      ]
    }
  ],

  // Chapter 5: Marketing
  5: [
    {
      id: 'ent-extra-c5-sec1',
      heading: '5.4 Masterclass: STP Strategy, The Extended 7Ps Marketing Mix & Digital Conversion Funnels',
      content: `### 5.5.1 The Strategic STP Framework (Segmentation, Targeting, Positioning)
1. **Segmentation**: Dividing the heterogeneous broad market into distinct, homogeneous groups of buyers:
   - **Geographic**: Urban vs. rural, climatic zones, regional states.
   - **Demographic**: Age, gender, income, education level, family size.
   - **Psychographic**: Lifestyle, social status, core cultural values, personality traits.
   - **Behavioral**: Usage rate, brand loyalty, purchase occasion, readiness stage.
2. **Targeting**: Selecting which specific market segments to serve (Undifferentiated/Mass, Differentiated, Concentrated/Niche, Micro-marketing).
3. **Positioning**: Designing the venture's offering and brand image to occupy a distinctive, valued mental place in the minds of the target audience relative to competitors (*"Product X is the most reliable, affordable solar pump for Ethiopian smallholder farmers"*).

---

### 5.5.2 The 7Ps Extended Marketing Mix (Booms & Bitner for Services)

| Element | Focus & Strategy | Applied Entrepreneurial Context |
| :--- | :--- | :--- |
| **1. Product** | Functionality, design, quality, packaging, branding, warranty. | Creating a user-friendly mobile payment service with offline USSD capability. |
| **2. Price** | Cost-plus, penetration, skimming, dynamic pricing, discounts. | Adopting penetration pricing to rapidly gain market share in university campuses. |
| **3. Place (Distribution)** | Direct selling, retail distribution, logistics, inventory. | Partnering with local rural cooperatives to distribute hybrid seeds. |
| **4. Promotion** | Advertising, public relations, sales promotions, social media. | Running targeted Telegram and TikTok campaigns with local student ambassadors. |
| **5. People** | Staff recruitment, professional training, customer empathy. | Training call center agents to speak multiple Ethiopian languages fluently. |
| **6. Process** | Speed of service delivery, standardized procedures, bottlenecks. | Implementing 2-click digital loan approval using automated scoring algorithms. |
| **7. Physical Evidence** | Office ambiance, packaging aesthetics, receipt receipts, digital UI. | Designing a clean, professional retail store and high-trust digital interface. |`,
      keyTakeaways: [
        'Marketing is not merely advertising; it encompasses customer discovery, pricing strategy, distribution, and relationship management.',
        'Services require the extended 7Ps (+ People, Process, Physical Evidence) because service delivery is intangible and inseparable.'
      ]
    }
  ],

  // Chapter 6: Business Financing
  6: [
    {
      id: 'ent-extra-c6-sec1',
      heading: '6.4 Masterclass: Break-Even Mathematical Modeling, Working Capital & Capital Structure',
      content: `### 6.4.1 Break-Even Analysis (BEA)
Determines the sales volume at which total revenue ($TR$) exactly equals total cost ($TC$), yielding **zero operational profit**:
$$TR = TC \\implies P \\cdot Q = FC + (VC_{\\text{unit}} \\cdot Q)$$
1. **Break-Even Quantity in Units ($Q_{\\text{BE}}$)**:
   $$Q_{\\text{BE}} = \\frac{FC}{P - VC_{\\text{unit}}} = \\frac{FC}{\\text{Contribution Margin (CM)}}$$
2. **Break-Even Revenue in Currency ($R_{\\text{BE}}$)**:
   $$R_{\\text{BE}} = \\frac{FC}{\\text{Contribution Margin Ratio}} = \\frac{FC}{\\frac{P - VC_{\\text{unit}}}{P}}$$
3. **Sales Required for Target Profit ($\\Pi_{\\text{target}}$)**:
   $$Q_{\\text{target}} = \\frac{FC + \\Pi_{\\text{target}}}{P - VC_{\\text{unit}}}$$

---

### 6.4.2 Debt Financing vs. Equity Financing

| Dimension | Debt Financing (Bank Loans, Microfinance) | Equity Financing (Angel Investors, Venture Capital) |
| :--- | :--- | :--- |
| **Ownership Dilution** | **Zero dilution**; founder retains 100% equity and governance control. | **Dilutes equity**; investors receive voting shares and board representation. |
| **Repayment Obligation** | **Fixed, mandatory periodic repayment** of principal and interest regardless of venture profitability. | **No mandatory repayment**; investors earn dividends and capital gains only if the company grows. |
| **Collateral Requirement** | Substantial physical collateral required in Ethiopian commercial banks ($>100\\%$ of loan value). | **Zero collateral**; based on growth potential and team execution. |
| **Impact on Risk** | High financial distress risk; bankruptcy if loan covenants are breached. | Low bankruptcy risk; investors share financial downside risk. |`,
      equations: [
        {
          name: 'Break-Even Volume Formula',
          formula: 'Q_{\\text{BE}} = \\frac{FC}{P - VC_{\\text{unit}}}',
          description: 'Calculates the exact unit sales volume needed to cover all fixed and variable overhead.'
        }
      ],
      workedExamples: [
        {
          problem: 'An Ethiopian startup manufactures leather laptop backpacks. The enterprise incurs annual fixed costs (rent, salaries, machinery depreciation) of $FC = 180,000\\text{ ETB}$. Each backpack incurs variable costs (leather, zippers, labor) of $VC = 400\\text{ ETB}$ and sells for a retail price of $P = 1,000\\text{ ETB}$. Calculate: (1) Contribution margin per unit; (2) Break-even unit volume; (3) How many units must be sold to earn an annual target profit of $120,000\\text{ ETB}$?',
          stepByStepSolution: [
            'Step 1 (Contribution Margin): $\\text{CM} = P - VC = 1000 - 400 = 600\\text{ ETB per backpack}$.',
            'Step 2 (Break-Even Quantity): $Q_{\\text{BE}} = \\frac{FC}{\\text{CM}} = \\frac{180,000}{600} = \\mathbf{300\\text{ backpacks}}$.',
            'Step 3 (Target Profit Volume): $Q_{\\text{target}} = \\frac{FC + \\Pi_{\\text{target}}}{\\text{CM}} = \\frac{180,000 + 120,000}{600} = \\frac{300,000}{600} = \\mathbf{500\\text{ backpacks}}$.'
          ],
          shortcutTip: 'Divide (Fixed Cost + Target Profit) by Contribution Margin (Price - Variable Cost).'
        }
      ],
      examTraps: [
        'Confusing Fixed Costs with Variable Costs: Fixed costs (rent, insurance) do NOT change with output volume; Variable costs (raw materials, packaging) scale directly with unit production.',
        'Overestimating early startup cash flow: Many profitable businesses go bankrupt due to acute cash flow shortages while waiting for accounts receivable to be paid.'
      ],
      keyTakeaways: [
        'Contribution margin is the money remaining from each unit sold to pay down fixed costs and generate operating profit.',
        'Early-stage startups rely heavily on bootstrapping, friends & family, and microfinance before accessing formal bank loans.'
      ]
    }
  ],

  // Chapter 7: Managing Growth and Transition
  7: [
    {
      id: 'ent-extra-c7-sec1',
      heading: '7.4 Masterclass: The Timmons Equilibrium Model, Ansoff Matrix Strategy & Corporate Ethics',
      content: `### 7.4.1 The Timmons Model of Entrepreneurial Growth (Jeffry Timmons)
Entrepreneurial success is a dynamic balancing act driven by three fundamental forces:
1. **Opportunities**: Market demand, margin potential, and competitive durability (the starting driver).
2. **Lead Entrepreneur & Team**: Industry competence, resilience, integrity, and leadership.
3. **Resources**: Financial, physical, and intellectual assets (kept lean and parsimonious).
- *The Fulcrum*: The **Business Plan** provides the communication vehicle, while the **Founder's Leadership** balances the three forces across scaling phases.

---

### 7.4.2 Ansoff Growth Matrix: Four Expansion Strategies

$$\\begin{array}{c|c|c}
& \\textbf{Existing Products} & \\textbf{New Products} \\\\ \\hline
\\textbf{Existing Markets} & \\textbf{Market Penetration} & \\textbf{Product Development} \\\\
& \\text{(Lowest risk; volume growth)} & \\text{(New features for loyal base)} \\\\ \\hline
\\textbf{New Markets} & \\textbf{Market Development} & \\textbf{Diversification} \\\\
& \\text{(New regions / export)} & \\text{(Highest risk; unrelated entry)}
\\end{array}$$

---

### 7.4.3 Archie Carroll\'s Pyramid of Corporate Social Responsibility (CSR)
1. **Economic Responsibility (Foundation)**: Be profitable; create jobs; produce valuable goods and services.
2. **Legal Responsibility**: Obey all federal, regional, and municipal laws, tax codes, and labor standards.
3. **Ethical Responsibility**: Do what is right, just, and fair; avoid environmental and social harm even when not mandated by law.
4. **Philanthropic Responsibility (Peak)**: Be a good corporate citizen; actively contribute resources to education, healthcare, and community empowerment.`,
      keyTakeaways: [
        'The Timmons model stresses that opportunities drive resources, not the other way around; great founders assemble resources to seize validated opportunities.',
        'The Triple Bottom Line evaluates organizational performance across Profit (economic), People (social), and Planet (environmental) sustainability.'
      ]
    }
  ]
};
