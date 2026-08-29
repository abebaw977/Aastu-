# AASTU Entrance Exam Prep & 5-Day Fast Track Portal

An intensive, structured preparation platform designed specifically for the **Addis Ababa Science and Technology University (AASTU)** and **ASTU** entrance examinations. Built with high-yield textbook-grade master notes, realistic timed mock exams, formula cheat sheets, a personalized question vault, and an AI Socratic Tutor powered by Google Gemini.

---

## 🌟 Key Features

- 📅 **5-Day Fast Track Study Plan**: Structured day-by-day roadmap covering High-Yield Math (Calculus & Vectors), Physics (Mechanics & Electromagnetism), Chemistry (Physical, Inorganic & Organic), and Quantitative Aptitude.
- 📖 **Textbook-Grade Master Notes**: In-depth theoretical summaries, full KaTeX mathematical equations, step-by-step solved entrance exam problems, 30-second speed shortcuts, and examiner trap alerts.
- 🎯 **Full Mock Exam Simulator**: Timed multi-subject practice tests with realistic exam interfaces, instant grading, categorized score breakdowns, and detailed step-by-step solutions.
- 🤖 **AI Socratic Tutor & Coach**: Interactive exam assistant powered by Google Gemini with customizable personas (Strict University Professor, Speed-Solving Strategist, Patient Mentor) to explain complex physics/math derivations.
- ✨ **AI Note Generator & Expander**: Automatically generate comprehensive notes for any chapter or custom topic with KaTeX equations, worked examples, and speed hacks.
- 💾 **Personal Study Notes & Question Vault**: Bookmark tricky entrance questions, write formatted revision notes, and perform one-click JSON backup & restore.
- ⚡ **Formula Reference Cheat Sheets**: Quick lookup reference cards for all essential physics, chemistry, and calculus formulas.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion), KaTeX (LaTeX math rendering), Lucide React Icons, Canvas Confetti
- **Backend**: Express.js (Node.js), `@google/genai` (Google Gen AI SDK)
- **Deployment**: Production-ready containerized setup bundled with `esbuild`

---

## 📋 Prerequisites

Before running this application locally, ensure you have the following installed:

- **Node.js**: `v18.0.0` or higher (Node.js 20+ recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **Google Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

---

## 🚀 Installation & Getting Started

### 1. Clone or Extract the Project

```bash
git clone <repository-url>
cd aastu-exam-prep
```

*(Or navigate into the extracted project folder)*

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying from `.env.example`:

```bash
cp .env.example .env
```

Open `.env` and add your Google Gemini API key:

```env
# Required for AI Tutor and Note Generator capabilities
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# (Optional) Application URL
APP_URL="http://localhost:3000"
```

> **Security Note**: Never commit your `.env` file containing real API keys to version control. The Express server safely proxies all Gemini API requests so your key is never exposed to the client browser.

### 4. Run the Development Server

Start the full-stack development server (Express + Vite):

```bash
npm run dev
```

The application will be live at:
```
http://localhost:3000
```

---

## 📦 Production Build & Deployment

### Build the Application

To build the optimized client bundle and bundle the Express backend with `esbuild`:

```bash
npm run build
```

This compiles static assets into `dist/` and creates the backend server bundle at `dist/server.cjs`.

### Start in Production

Run the compiled server:

```bash
npm run start
```

### Clean Build Artifacts

```bash
npm run clean
```

### TypeScript Validation / Linting

```bash
npm run lint
```

---

## 📁 Project Directory Structure

```
├── .env.example                 # Template for environment variables
├── index.html                   # Main HTML entry point (KaTeX & SEO tags)
├── metadata.json                # Application metadata & capabilities
├── package.json                 # Project dependencies & build scripts
├── server.ts                    # Express backend (Gemini API proxy & Vite middleware)
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration (Tailwind CSS plugin)
└── src/
    ├── main.tsx                 # React application bootstrap entry
    ├── App.tsx                  # Core application container & tab routing
    ├── index.css                # Global stylesheet & Tailwind CSS import
    ├── types.ts                 # TypeScript type definitions & interfaces
    ├── data/
    │   ├── masterNotes.ts       # Comprehensive AASTU Master study notes
    │   ├── questions.ts         # High-yield entrance exam question bank
    │   └── formulaSheets.ts     # Formula cheat sheet definitions
    ├── components/
    │   ├── AASTUMasterNotesView.tsx  # Master textbook notes & search
    │   ├── AINoteGeneratorModal.tsx  # AI note generator & custom topic creator
    │   ├── AITutorView.tsx           # Socratic AI tutor with persistent chat history
    │   ├── ExamSimulator.tsx         # Full-featured timed mock examination engine
    │   ├── FormulaCheatSheet.tsx     # Quick-access formula reference sheets
    │   ├── MathRenderer.tsx          # LaTeX & KaTeX formula parsing component
    │   ├── StudyRoadmap.tsx          # 5-Day Fast Track study roadmap view
    │   └── StudentNotesView.tsx      # Personal notes, question vault & backup system
    └── utils/
        ├── gemini.ts            # Client-side AI service dispatcher
        └── storage.ts           # Local storage managers, JSON export & backup utilities
```

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the full-stack app in development mode on port 3000 |
| `npm run build` | Compiles the Vite frontend and bundles the Express server |
| `npm run start` | Launches the production server from `dist/server.cjs` |
| `npm run lint` | Runs `tsc --noEmit` to verify TypeScript types across the codebase |
| `npm run clean` | Removes compiled distribution directories |

---

## 💡 Troubleshooting & FAQs

- **Gemini API Error / "API key not configured"**:
  Ensure your `GEMINI_API_KEY` is correctly set in `.env` and restart the development server (`npm run dev`).
- **LaTeX Math Formulas Not Rendering**:
  KaTeX stylesheets are imported automatically in `index.html`. Ensure an active internet connection on initial load or verify local stylesheet loading.
- **Port Conflict (Port 3000 in use)**:
  Ensure no other instance or service is occupying port `3000` before running `npm run dev`.

---

## 🎓 Target Audience

Crafted for Ethiopian Grade 12 STEM students preparing for the **AASTU** (Addis Ababa Science and Technology University) and **ASTU** (Adama Science and Technology University) Freshman Entrance Examinations.
