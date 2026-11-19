# Freshman Academy Hub (Semester 1 & 2)

> **Comprehensive University Freshman Course Mastery Hub for all 17 Ethiopian Higher Education (MoSHE/MoGE Curriculum) Common Courses.**

---

## 📖 Overview

**Freshman Academy Hub** is a full-stack, mobile-first academic platform built for Ethiopian university freshman students transitioning into higher education. It covers all **17 Official Ethiopian Higher Education Freshman Common Courses** across **Semester 1** and **Semester 2**, providing textbook-grade module notes, LaTeX equations, timed midterm/final exam simulations, 350+ formula bank, AI Tutor, and dynamic syllabus & personal lecture notes customization.

### 🎓 All 17 Official Ethiopian University Freshman Common Courses (Semester 1 & 2)

| # | Course Code | Official Course Name | Semester | ECTS Credits |
| :-: | :--- | :--- | :-: | :-: |
| 1 | **Math 1011** | Mathematics for Natural Sciences / Applied Math I | Semester 1 | 3-4 Cr |
| 2 | **Phys 1011** | General Physics I (Mechanics, Waves, Thermodynamics) | Semester 1 | 3-4 Cr |
| 3 | **Chem 1011** | General Chemistry I (Atoms, Bonding, Equilibrium) | Semester 1 | 3 Cr |
| 4 | **Biol 1011** | General Biology I (Cell Biology, Bioenergetics, Genetics) | Semester 1 | 3 Cr |
| 5 | **EnLa 1011** | Communicative English Skills I | Semester 1 | 3 Cr |
| 6 | **LoCT 1011** | Critical Thinking & Logic | Semester 1 | 3 Cr |
| 7 | **CESt 1011** | Civics & Ethical Education / Moral & Citizenship | Semester 1 | 3 Cr |
| 8 | **SpSc 1011** | Physical Fitness & Health (Sports Science) | Semester 1 | 2 Cr |
| 9 | **Math 1012** | Applied Mathematics II (Multivariable Calculus & Matrices) | Semester 2 | 3-4 Cr |
| 10 | **Phys 1012** | General Physics II / Modern Physics (E&M and Optics) | Semester 2 | 3-4 Cr |
| 11 | **Chem 1012** | General Chemistry II (Organic & Analytical Chemistry) | Semester 2 | 3 Cr |
| 12 | **Biol 1012** | General Biology II / Applied Biology (Ecology & Physiology) | Semester 2 | 3 Cr |
| 13 | **EnLa 1012** | Communicative English Skills II (Academic Writing) | Semester 2 | 3 Cr |
| 14 | **Psyc 1011** | General Psychology & Life Skills | Semester 2 | 3 Cr |
| 15 | **GeES 1011** | Geography of Ethiopia and the Horn | Semester 2 | 3 Cr |
| 16 | **Hist 1012** | History of Ethiopia and the Horn | Semester 2 | 3 Cr |
| 17 | **EmTe 1012** | Introduction to Emerging Technologies / Computer & ICT | Semester 2 | 3 Cr |

---

## 🚀 Key Features

1. **Dynamic Custom Course Outlines & Personal Syllabus Feature**:
   - Students can create, edit, customize, and delete custom outlines for all 17 freshman common courses.
   - Edit course codes, instructor names, office hours, grading weight distributions (Quizzes, Midterms, Lab/Assignments, Final Exam), textbook references, chapter breakdowns, and personal lecture notes.
   - Built-in "Load Official MoSHE Defaults" pre-fills accredited syllabi for instant customization.
   - Persistent `localStorage` backup with complete JSON Export / Import for zero data loss.

2. **Official Freshman Course Modules Hub**:
   - Textbook-grade module notes, mathematical proofs, and KaTeX-rendered equations for every common course.
   - Worked university exam problems with step-by-step solutions and 30-second examiner shortcuts.
   - Interactive formula copying and distraction-free "Focus Mode".

3. **12-Week Semester Mastery Plan & Block-by-Block Scheduling**:
   - Morning, Afternoon, and Evening study blocks tailored to Ethiopian university semesters.
   - Actionable target checklists with persistent progress tracking saved to `localStorage`.
   - High-yield exam topics, examiner traps, and governing formulas highlighted per week.

4. **Multi-Course Practice Drills & Midterm/Final Benchmark Simulator**:
   - Practice questions covering all 17 freshman courses with comprehensive rationales.
   - Timed benchmark mock exams (Semester 1 Benchmark, Semester 2 Benchmark, or Combined 25-Question Diagnostic).
   - Mistakes Notebook automatically saves missed questions for targeted review.

5. **350+ Formulas & Theorems Vault**:
   - Compendium of governing equations, equivalence laws, and unit breakdowns across all 17 courses.
   - One-click LaTeX formula copy button and semester/subject filters.

6. **AI Academic Tutor & Note Generator**:
   - 24/7 AI tutor specialized in Ethiopian university common courses.
   - AI Study Note Generator that generates comprehensive summaries, key theorems, and worked problems for any day, week, or module.

7. **Samsung Galaxy A04 (360px) Companion & Mobile-First Touch Navigation**:
   - Custom floating canvas scratchpad for quick rough derivations.
   - Toggleable 360px viewport simulation mode matching student devices in Ethiopian universities.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React icons
- **Math & Typography**: KaTeX for LaTeX formula rendering, Tailwind Typography
- **Backend & Server**: Express.js with Vite middleware (`server.ts` running via `tsx`)
- **AI Integration**: Google Gemini API (`@google/genai`) for AI Tutor, question generation, and intelligent study note synthesis
- **Storage**: Client-side resilient `localStorage` sync with exportable JSON data backups (Study notes, custom syllabi, exam records, bookmarks, mistakes)

---

## 📥 Installation & Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

Verify versions:
```bash
node -v
npm -v
```

### 2. Clone or Extract the Repository
```bash
git clone <repository-url>
cd freshman-academy-hub
```

### 3. Install Dependencies
Install all required packages from `package.json`:
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Add your Google Gemini API Key into `.env`:
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
PORT=3000
```
> *Note: The application includes rich offline fallback question sets, course syllabi, module notes, and formula vaults if an API key is not present.*

### 5. Run Development Server
Start the full-stack server (Express + Vite on port 3000):
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 6. Build for Production
To build the optimized client bundle:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

---

## 📁 Directory Structure

```
freshman-academy-hub/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Top desktop navigation & branding
│   │   ├── MobileBottomNav.tsx             # Mobile sticky bottom nav bar
│   │   ├── CourseModulesView.tsx           # 17 Courses Modules & Student Notes
│   │   ├── AddEditCourseSyllabusModal.tsx  # Dynamic course syllabus & notes editor
│   │   ├── DailyPlanView.tsx               # 12-Week Semester Mastery Plan & Checklists
│   │   ├── PracticeView.tsx                # Practice drills across 17 courses
│   │   ├── MockExamView.tsx                # Midterm/Final timed benchmark simulator
│   │   ├── StudyGuidesView.tsx             # 350+ Formulas, Theorems & Laws compendium
│   │   ├── FlashcardsView.tsx              # Rapid recall flashcard decks
│   │   ├── AITutorView.tsx                 # 24/7 AI Academic Tutor & Chat History
│   │   ├── AINoteGeneratorModal.tsx        # AI Note Generation & Local Save modal
│   │   ├── StudentNotesView.tsx            # Personal Notes Manager & Backup/Restore
│   │   ├── MistakesNotebookView.tsx        # Review missed exam questions
│   │   ├── MathRenderer.tsx                # KaTeX LaTeX renderer
│   │   └── SamsungA04Companion.tsx         # Scratchpad & 360px device frame
│   ├── data/
│   │   ├── freshmanCourseCatalog.ts        # Official 17 courses catalog & defaults
│   │   ├── freshmanModules.ts              # Full curriculum chapters & notes (Sem 1 & 2)
│   │   ├── freshmanStudyPlan.ts            # 12-Week semester study roadmap & targets
│   │   ├── freshmanQuestions.ts            # Midterm & Final questions bank (17 courses)
│   │   ├── freshmanFormulas.ts             # Governing formulas and theorem laws (17 courses)
│   │   └── freshmanFlashcards.ts           # Speed recall flashcards
│   ├── types.ts                            # TypeScript data interfaces & 17 subjects
│   ├── utils/
│   │   └── storage.ts                      # LocalStorage persistence & JSON backup
│   ├── App.tsx                             # Main app controller
│   └── main.tsx                            # React root mount
├── server.ts                               # Express API server & Gemini proxy
├── package.json                            # Project manifest and scripts
├── vite.config.ts                          # Vite configuration
└── README.md                               # Documentation & setup manual
```

---

## 📄 License
MIT License. Built for Ethiopian university students to excel in their freshman common courses.
