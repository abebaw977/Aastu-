import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Prevent server process crashes from unhandled errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception caught in server:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection caught in server:", reason);
});

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!aiClient && key) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Resilient Gemini generator with supported models and retry backoff
const SUPPORTED_MODELS = ["gemini-3.6-flash", "gemini-3.7-flash"];

async function generateContentWithFallback(ai: GoogleGenAI, contents: string, config?: any): Promise<string> {
  let lastError: any = null;

  for (const model of SUPPORTED_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        });
        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        console.warn(`Model ${model} (attempt ${attempt}) encountered error: ${err.message || err}`);
        lastError = err;
        // Wait briefly on retry
        await new Promise(resolve => setTimeout(resolve, attempt * 500));
      }
    }
  }

  throw lastError || new Error("The AI model is currently busy. Please try again in a few seconds.");
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", hasAi: Boolean(process.env.GEMINI_API_KEY) });
});

// AI Tutor endpoint
app.post("/api/gemini/tutor", async (req, res) => {
  try {
    const { question, context, subject, userQuery } = req.body;
    const ai = getAI();

    if (!ai) {
      // Fallback helpful message if key is not active
      return res.json({
        answer: `**AASTU High-Yield Strategy Guide for ${subject || "General Science"}**:\n\n` +
          `1. **Core Concept**: Focus on high-frequency questions (Calculus, Vectors, Newton's Laws, Stoichiometry, and Reading Comprehension).\n` +
          `2. **Time Management**: AASTU exams give around 1 to 1.2 minutes per question. Always eliminate obviously incorrect choices first.\n` +
          `3. **Step-by-Step Approach**: Identify the given variables, select the governing equation, and compute with rounded estimates if units differ.\n\n` +
          `*(Connect your Gemini API Key in Settings > Secrets for real-time dynamic AI step-by-step problem breakdown)*`
      });
    }

    const prompt = `You are an expert tutor specializing in the Addis Ababa Science and Technology University (AASTU) Entrance Examination in Ethiopia (STEM / Pre-engineering / Natural Science focus).
The student is preparing on an intense 5-day / 8-day deadline and needs direct, crystal-clear, step-by-step explanations, shortcut formulas, and test-taking speed hacks.

Subject: ${subject || "General / STEM"}
Exam Context: ${context || "AASTU Entrance Examination"}
${question ? `Problem / Question Context:\n${question}\n` : ""}
Student's Query or Doubt:
"${userQuery || "Please explain how to solve this step-by-step and provide exam shortcuts."}"

Instructions:
1. Provide a step-by-step clear solution or conceptual breakdown.
2. Highlight high-yield shortcuts / mental math tricks that save time on the exam.
3. Call out common traps/mistakes Ethiopian entrance exam students often make on this topic.
4. Keep the tone encouraging, concise, highly structured with bullet points and bold math formulas.`;

    const text = await generateContentWithFallback(ai, prompt, {
      systemInstruction: "You are an elite academic coach for Ethiopian university STEM entrance exams (AASTU, ASTU, EUEE). Always format math cleanly with standard symbols and step-by-step logic."
    });

    return res.json({ answer: text });
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate tutor response" });
  }
});

// AI Concept Explainer endpoint
app.post("/api/gemini/explain-concept", async (req, res) => {
  try {
    const { concept, subject } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        explanation: `**${concept || "Core Concept"}** is a high-frequency topic on the AASTU entrance exam.\n\n` +
          `*To activate real-time AI concept breakdowns, add your Gemini API Key in Settings > Secrets.*`
      });
    }

    const prompt = `You are a premier STEM instructor for the AASTU (Addis Ababa Science and Technology University) Entrance Exam.
Provide an ultra-clear, high-yield conceptual breakdown for: "${concept}".
Subject: ${subject || "Natural Science / STEM"}

Structure the response with:
1. **Core Definition & Physical / Mathematical Meaning** (Clear & intuitive)
2. **Key Governing Formulas & Equations** (Use LaTeX format like $E = mc^2$ or $\\int f(x) dx$)
3. **AASTU Exam Shortcuts & Mnemonics** (How to solve problems on this topic in under 60 seconds)
4. **Common Exam Traps / Pitfalls** (What distractors examiners commonly use)
5. **Quick Worked Example** (1 concise exam-grade sample problem with solution)`;

    const text = await generateContentWithFallback(ai, prompt, {
      systemInstruction: "You are an elite academic coach for Ethiopian university STEM entrance exams (AASTU, ASTU, EUEE). Always format math cleanly with standard symbols and step-by-step logic."
    });

    return res.json({ explanation: text });
  } catch (error: any) {
    console.error("AI Explain error:", error);
    return res.status(500).json({ error: error.message || "Failed to explain concept" });
  }
});

// Dynamic question generator (Single)
app.post("/api/gemini/generate-question", async (req, res) => {
  try {
    const { subject, topic, difficulty } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.status(400).json({ error: "Gemini API key is required for dynamic question generation." });
    }

    const prompt = `Generate 1 realistic, high-quality multiple choice question tailored to the AASTU (Addis Ababa Science and Technology University) Entrance Exam standard.
Subject: ${subject || "Mathematics"}
Topic: ${topic || "Calculus or Vectors"}
Difficulty Level: ${difficulty || "Medium"}

Return ONLY a valid JSON object matching this schema:
{
  "id": "gen-${Date.now()}",
  "subject": "${subject}",
  "topic": "${topic}",
  "question": "The question statement clearly written",
  "options": [
    "A) First option",
    "B) Second option",
    "C) Third option",
    "D) Fourth option"
  ],
  "correctAnswer": 0, // index 0, 1, 2, or 3 corresponding to A, B, C, D
  "explanation": "Detailed step-by-step explanation with formula and why the correct answer is right.",
  "shortcut": "A quick tip or shortcut formula for solving this in under 45 seconds."
}`;

    const text = await generateContentWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const parsed = JSON.parse(text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Generate Question error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate question" });
  }
});

// AI Custom Mock Exam Question Set Generator
app.post("/api/gemini/generate-exam-set", async (req, res) => {
  try {
    const { 
      count = 10, 
      subjects = ["mathematics", "physics", "chemistry", "aptitude"], 
      contentFocus = "AASTU High-Yield Core Syllabus", 
      difficulty = "medium" 
    } = req.body;

    const requestedCount = Math.min(Math.max(Number(count) || 5, 3), 35);
    const subjectsList = Array.isArray(subjects) && subjects.length > 0 
      ? subjects.join(", ") 
      : "Mathematics, Physics, Chemistry, Aptitude";

    const ai = getAI();

    if (!ai) {
      return res.status(400).json({ 
        error: "Gemini API key not found. Please connect your Gemini API key in Settings > Secrets to activate AI Exam Generation." 
      });
    }

    const prompt = `You are the Head Examination Specialist for the Addis Ababa Science and Technology University (AASTU) Entrance Examination (Ethiopia).
Create a custom mock exam question set of EXACTLY ${requestedCount} multiple choice questions (MCQs).

Requirements:
- Total Questions: ${requestedCount}
- Allowed Subjects: ${subjectsList} (Distribute questions evenly or appropriately among these subjects)
- Focus Topic / Syllabus Scope: "${contentFocus}"
- Difficulty Tier: "${difficulty}" (easy = fundamental principles & definitions, medium = standard AASTU exam computational questions, hard = multi-step challenging engineering problems, mixed = realistic exam balance)
- Target Standard: Pre-Engineering & Applied Sciences entrance at AASTU / ASTU / Ethiopian University Freshman Entry.
- Math / Science formatting: Write mathematical equations, integrals, vectors, chemical formulas, and units in clean standard notation or LaTeX (e.g. \\lim_{x \\to 0}, \\int_a^b, \\vec{v}, H_2SO_4).
- Every question MUST have exactly 4 options labeled "A) ...", "B) ...", "C) ...", "D) ...".
- "correctAnswer" MUST be an integer 0, 1, 2, or 3 corresponding to option A, B, C, or D.
- Provide a rigorous step-by-step "explanation" and a high-yield "shortcutTip" for quick 30-45 second solving.

Return ONLY a valid JSON array of objects with this structure:
[
  {
    "id": "ai-exam-1-${Date.now()}",
    "subject": "mathematics", // one of "mathematics", "physics", "chemistry", "aptitude"
    "topic": "Calculus - Integration",
    "question": "Question text with clear parameters and LaTeX math formatting",
    "options": [
      "A) First option",
      "B) Second option",
      "C) Third option",
      "D) Fourth option"
    ],
    "correctAnswer": 0,
    "explanation": "Step-by-step solution showing the algebraic steps and physical principles.",
    "shortcutTip": "Exam shortcut or mental trick to eliminate distractors in 30s.",
    "difficulty": "${difficulty === 'mixed' ? 'medium' : difficulty}"
  }
]`;

    const text = await generateContentWithFallback(ai, prompt, {
      systemInstruction: "You are an elite academic professor designing authentic entrance exam papers for Addis Ababa Science and Technology University (AASTU). Always output strict valid JSON array format.",
      responseMimeType: "application/json",
    });

    let parsedQuestions: any[] = [];
    try {
      parsedQuestions = JSON.parse(text || "[]");
      if (!Array.isArray(parsedQuestions)) {
        if (parsedQuestions && Array.isArray((parsedQuestions as any).questions)) {
          parsedQuestions = (parsedQuestions as any).questions;
        } else {
          parsedQuestions = [parsedQuestions];
        }
      }
    } catch (parseErr) {
      console.error("Failed to parse JSON response from Gemini:", parseErr, text);
      return res.status(500).json({ error: "Failed to parse generated questions into JSON format." });
    }

    // Format and sanitize each question to ensure frontend stability
    const sanitized = parsedQuestions.map((q, idx) => {
      let subj: string = (q.subject || "mathematics").toLowerCase();
      if (!["mathematics", "physics", "chemistry", "aptitude"].includes(subj)) {
        if (subj.includes("math") || subj.includes("calc") || subj.includes("algebra")) subj = "mathematics";
        else if (subj.includes("phys") || subj.includes("mechanic")) subj = "physics";
        else if (subj.includes("chem") || subj.includes("organic")) subj = "chemistry";
        else subj = "aptitude";
      }

      let options: string[] = Array.isArray(q.options) && q.options.length >= 4 
        ? q.options.slice(0, 4) 
        : ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"];

      // Ensure options have A), B), C), D) prefix
      options = options.map((opt: string, optIdx: number) => {
        const prefix = String.fromCharCode(65 + optIdx) + ")";
        if (!opt.startsWith(prefix) && !opt.startsWith(`${String.fromCharCode(65 + optIdx)}.`) && !opt.startsWith(`(${String.fromCharCode(65 + optIdx)})`)) {
          return `${prefix} ${opt}`;
        }
        return opt;
      });

      let correctAns = typeof q.correctAnswer === "number" ? q.correctAnswer : 0;
      if (correctAns < 0 || correctAns > 3) correctAns = 0;

      return {
        id: q.id || `ai-gen-${Date.now()}-${idx}`,
        subject: subj,
        topic: q.topic || "Core Concept",
        question: q.question || "Question statement",
        options,
        correctAnswer: correctAns,
        explanation: q.explanation || "Step-by-step solution breakdown.",
        shortcutTip: q.shortcutTip || q.shortcut || "Examine units and eliminate extremes.",
        difficulty: q.difficulty || (difficulty === "mixed" ? (idx % 3 === 0 ? "easy" : idx % 3 === 1 ? "medium" : "hard") : difficulty),
        yearReference: "AI Generated • AASTU Format"
      };
    });

    return res.json({ 
      questions: sanitized,
      count: sanitized.length,
      config: { count: requestedCount, subjects, contentFocus, difficulty }
    });
  } catch (error: any) {
    console.error("AI Exam Set Generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate custom mock exam questions" });
  }
});

// AI Master Study Notes Generator (Day 3, Day 4, Day 5 or custom topic)
app.post("/api/gemini/generate-notes", async (req, res) => {
  try {
    const { day, subject = "chemistry", topic, focusAreas, detailLevel = "comprehensive" } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.status(400).json({ 
        error: "Gemini API key is required to generate AI study notes. Please configure your key in Settings > Secrets." 
      });
    }

    let defaultDayTopic = "";
    if (day === 3) {
      defaultDayTopic = "Day 3: Organic Reaction Mechanisms, Physical Chemistry, Thermodynamics, Chemical Kinetics & Equilibrium";
    } else if (day === 4) {
      defaultDayTopic = "Day 4: Wave Optics, Interference & Diffraction, Electromagnetism, AC Circuits & Modern Quantum Physics";
    } else if (day === 5) {
      defaultDayTopic = "Day 5: Quantitative Aptitude, Matrices & Determinants, 3D Analytical Coordinate Geometry & Vector Algebra";
    } else {
      defaultDayTopic = topic || "High-Yield STEM Topic for AASTU Entrance Exam";
    }

    const noteTopic = topic || defaultDayTopic;

    const prompt = `You are the Premier Engineering Professor and Master Notes Author for the Addis Ababa Science and Technology University (AASTU) Entrance Examination in Ethiopia.
Create an exhaustive, high-yield, university-grade master study note chapter for:
"${noteTopic}" (Subject: ${subject}, Target: Day ${day || "Special"} Curriculum).
Focus Areas / Subtopics: ${focusAreas || "Complete syllabus breakdown with derivations, formulas, worked examples, examiner traps, and 30-second speed hacks."}
Detail Level: ${detailLevel}

Requirements:
- Format equations using clean LaTeX (e.g., $E = mc^2$, $\\Delta G = \\Delta H - T\\Delta S$, $\\int_a^b f(x)dx$, $\\lim_{x \\to 0}$).
- Provide 2 to 3 detailed sections with deep theoretical explanations, governing laws, and derivations.
- In each section, include key formulas/equations with explanations.
- In each section, include 1 to 2 university entrance worked examples with step-by-step solutions and 30-second shortcut tips.
- Include common examiner traps and key takeaways.

Return ONLY a valid JSON object matching this schema:
{
  "id": "ai-note-day${day || 'x'}-${Date.now()}",
  "subject": "${subject}",
  "chapterNumber": ${day ? Number(day) + 5 : 8},
  "title": "Day ${day || 'Master'}: ${noteTopic.replace(/Day \d+:\s*/, '')}",
  "gradeLevel": "University Prep",
  "overview": "Comprehensive overview explaining why this topic is critical for AASTU entrance exam and what core concepts are mastered.",
  "estimatedReadTimeMinutes": 35,
  "sections": [
    {
      "id": "sec-${Date.now()}-1",
      "heading": "1.1 [First Major Subtopic Name]",
      "content": "Deep theoretical markdown content with markdown headers (###), bullet points, conceptual explanations, physical/chemical meaning, and LaTeX math.",
      "equations": [
        {
          "name": "Governing Equation Name",
          "formula": "\\Delta G^\\circ = -RT \\ln K",
          "explanation": "Brief explanation of what this equation calculates and variable meanings."
        }
      ],
      "workedExamples": [
        {
          "problem": "Clear exam-grade problem statement",
          "stepByStepSolution": [
            "Step 1: Identify given variables...",
            "Step 2: Apply the governing formula...",
            "Step 3: Compute final numerical result..."
          ],
          "shortcutTip": "30-second mental shortcut or elimination trick for this problem."
        }
      ],
      "examTraps": [
        "Common mistake or sign error students make on this topic."
      ],
      "keyTakeaways": [
        "Core rule or concept to remember for test day."
      ]
    },
    {
      "id": "sec-${Date.now()}-2",
      "heading": "1.2 [Second Major Subtopic Name]",
      "content": "Detailed markdown explanation for second subtopic...",
      "equations": [
        {
          "name": "Second Key Formula",
          "formula": "k = A e^{-\\frac{E_a}{RT}}",
          "explanation": "Arrhenius equation relating rate constant to temperature and activation energy."
        }
      ],
      "workedExamples": [
        {
          "problem": "Second exam-grade problem statement",
          "stepByStepSolution": [
            "Step 1...",
            "Step 2...",
            "Step 3..."
          ],
          "shortcutTip": "Shortcut tip..."
        }
      ],
      "examTraps": [
        "Trap or distractor to avoid."
      ],
      "keyTakeaways": [
        "Key takeaway point."
      ]
    }
  ]
}`;

    const text = await generateContentWithFallback(ai, prompt, {
      systemInstruction: "You are an elite academic professor writing master study notes for Addis Ababa Science and Technology University entrance exams. Output strictly valid JSON format.",
      responseMimeType: "application/json",
    });

    const parsedNote = JSON.parse(text || "{}");
    return res.json({ note: parsedNote });
  } catch (error: any) {
    console.error("AI Note Generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI master note" });
  }
});

// AI Note Expander & Editor (Adds depth, worked examples, shortcuts, or rephrases notes)
app.post("/api/gemini/expand-edit-note", async (req, res) => {
  try {
    const { currentTitle, currentContent, action, customPrompt, subject } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.status(400).json({ 
        error: "Gemini API key is required to expand or edit notes using AI." 
      });
    }

    let instructionDetails = "";
    switch (action) {
      case "add_worked_examples":
        instructionDetails = "Add 2 brand-new, challenging step-by-step worked exam problems with solutions and 30-second speed shortcuts.";
        break;
      case "add_speed_hacks":
        instructionDetails = "Add a dedicated section of high-yield mental math shortcuts, rapid formula transformations, and 30-second exam hacks.";
        break;
      case "add_exam_traps":
        instructionDetails = "Add a comprehensive breakdown of examiner traps, unit conversion pitfalls, and distractor options commonly placed in Ethiopian university entrance exams.";
        break;
      case "simplify_explanations":
        instructionDetails = "Rephrase and clarify difficult theoretical paragraphs into intuitive, high-clarity conceptual analogies without losing mathematical rigor.";
        break;
      case "custom_prompt":
        instructionDetails = customPrompt || "Expand and enhance this study note with deeper analysis and formulas.";
        break;
      default:
        instructionDetails = "Expand this note substantially by adding deeper theoretical explanations, additional LaTeX formulas, and extra step-by-step worked examples.";
    }

    const prompt = `You are the Lead Master Note Author for the AASTU (Addis Ababa Science & Technology University) Entrance Exam.
You are tasked with expanding, enriching, and editing the following study note:

Note Title: "${currentTitle || "Study Note"}"
Subject: ${subject || "General Science / STEM"}
Action Requested: ${instructionDetails}

Current Note Content:
\`\`\`markdown
${currentContent}
\`\`\`

Instructions:
1. Preserve existing valuable content while integrating the requested additions/modifications seamlessly.
2. Format all mathematical and scientific formulas in clean LaTeX notation (e.g., $v = u + at$, $\\int_0^1 x^2 dx$, $\\vec{A} \\times \\vec{B}$).
3. Use clear markdown headers (###), bullet points, bold key terms, and boxed formulas.
4. Output the complete updated, ready-to-read markdown note text.`;

    const text = await generateContentWithFallback(ai, prompt, {
      systemInstruction: "You are an elite academic coach. Return the full enhanced markdown note content with clean LaTeX formulas and clear headings."
    });

    return res.json({ updatedContent: text });
  } catch (error: any) {
    console.error("AI Note Expander error:", error);
    return res.status(500).json({ error: error.message || "Failed to expand/edit study note" });
  }
});

// Global Express error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Express Error Handler caught:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  try {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`AASTU Exam Prep Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
