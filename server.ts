import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Modality, LiveServerMessage, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";
import {
  getCourseBySubject,
  normalizeFreshmanSubject,
  cleanStudentTopicInput,
  inferSubjectFromTopic,
  resolveEffectiveFocusAreas,
  parseGeminiJsonSafely,
  sanitizeAndShuffleQuestion,
  synthesizeVerifiedExamQuestions,
  synthesizeMasterNoteChapter,
  synthesizeTutorAnswer,
  detectGreetingOrConversational,
  detectExplicitSubjectFromText,
} from "./src/server/serverExamSynthesizer.ts";
import {
  solveDeterministicMathProblem,
  handleConversationalAndMetaQuestions,
} from "./src/utils/deterministicMathSolver.ts";
import { registerAuthPaymentPdfRoutes } from "./src/server/authPaymentPdfServer.ts";

dotenv.config();

// Prevent server process crashes from unhandled errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception caught in server:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection caught in server:", reason);
});

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// Allow Capacitor Android APK (https://localhost, capacitor://localhost) and web origins to access /api/* securely
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    origin &&
    (origin === "https://localhost" ||
      origin === "http://localhost" ||
      origin === "capacitor://localhost" ||
      origin.startsWith("http://localhost:") ||
      origin.endsWith(".run.app"))
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.use(express.json({ limit: "60mb" }));

// Register SQLite Student Auth, Telebirr 50 ETB Manual Payment Verification & Admin PDF Library routes
registerAuthPaymentPdfRoutes(app);

// Lazy initialize Gemini API client and hot-reload if .env key changes
let aiClient: GoogleGenAI | null = null;
let currentLoadedKey: string = "";
function getAI(): GoogleGenAI | null {
  dotenv.config({ override: true });
  const key = (process.env.GEMINI_API_KEY || "").trim();
  if (!key) {
    aiClient = null;
    currentLoadedKey = "";
    return null;
  }
  if (!aiClient || currentLoadedKey !== key) {
    currentLoadedKey = key;
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

// Resilient Gemini generator using official models with graceful degradation
const SUPPORTED_MODELS = [
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash"
];

let preferredModelIndex = 0;

async function generateContentWithFallback(ai: GoogleGenAI, contents: string, config?: any, timeoutMs = 25000): Promise<string> {
  let lastError: any = null;

  const effectiveConfig = {
    ...config,
    thinkingConfig: config?.thinkingConfig || { thinkingLevel: ThinkingLevel.LOW },
  };

  // Try models starting from preferred working model
  const orderedModels = [
    ...SUPPORTED_MODELS.slice(preferredModelIndex),
    ...SUPPORTED_MODELS.slice(0, preferredModelIndex)
  ];

  for (let i = 0; i < orderedModels.length; i++) {
    const model = orderedModels[i];
    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model,
          contents,
          config: effectiveConfig,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Model ${model} timed out`)), timeoutMs)
        )
      ]);
      if (response && response.text) {
        preferredModelIndex = SUPPORTED_MODELS.indexOf(model);
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      const isUnavailable = err?.status === 503 || err?.status === 429 || errMsg.includes('503') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE') || errMsg.includes('timed out');
      
      // Quiet failover to next model
      if (!isUnavailable) {
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }
  }

  throw lastError || new Error("AI service is currently experiencing high regional demand. Please try again shortly.");
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", hasAi: Boolean(process.env.GEMINI_API_KEY) });
});

// AI Tutor endpoint
app.post("/api/gemini/tutor", async (req, res) => {
  try {
    const { question, context, subject, userQuery, courseOutlineContext, recentHistoryText } = req.body;
    const cleanQuery = String(userQuery || "").trim();
    if (!cleanQuery) {
      return res.status(400).json({ error: "Empty query provided." });
    }

    // 1. Direct Rule 2 & Rule 8 handling for Greetings & Short Conversational Messages
    const conversationalReply = detectGreetingOrConversational(cleanQuery);
    if (conversationalReply) {
      return res.json({ answer: conversationalReply });
    }

    // 2. Direct handling for Conversational / Emotional / Meta questions (e.g. "are you crazy", "who are you")
    const metaReply = handleConversationalAndMetaQuestions(cleanQuery);
    if (metaReply) {
      return res.json({ answer: metaReply });
    }

    // 3. Pure Deterministic Mathematical & Symbolic Equation Solver (100% exact, zero AI hallucination)
    const mathReply = solveDeterministicMathProblem(cleanQuery);
    if (mathReply) {
      return res.json({ answer: mathReply, modelUsed: "Deterministic Academic Solver (100% Exact)" });
    }

    const ai = getAI();
    if (!ai) {
      const fallbackAns = synthesizeTutorAnswer({
        userQuery: cleanQuery,
        subject,
        roleId: "academic_tutor",
      });
      return res.json({ answer: fallbackAns, modelUsed: "Curriculum Intelligence (Offline Verified)" });
    }

    const TUTOR_SYSTEM_INSTRUCTION = `You are the ABEFA AI Academic Tutor for Ethiopian Higher Education Freshman Common Courses (MoSHE/MoGE harmonized national curriculum).

GOLDEN RULE: Before responding, identify exactly what the student asked, then provide ONLY the information needed to satisfy that request.

PRECISE CHAT BEHAVIOR RULES:
1. Answer the exact request. Never assume what the student wants.
2. Greetings: If the student greets you ("Hi", "Hello", "Selam", etc.), respond strictly with "Hi! How can I help you today?" No unsolicited lessons, course lists, or subject dumps.
3. Simple questions: Give a direct, concise answer first. Do not turn ordinary questions into multi-page textbook dumps.
4. Detailed requests: Provide detailed explanations ONLY when explicitly requested (e.g., "explain in detail", "step by step", "deep dive") or clearly necessary.
5. Topic boundaries: Discuss strictly the requested subject and topic. Never add unrelated chapters or switch to other subjects.
6. Ambiguous messages: Ask ONE short clarification question instead of guessing.
7. Follow-ups: Interpret "explain more", "continue", and "give examples" using relevant recent conversation history. If unclear, ask.
8. Short replies: Treat "okay", "yes", "thanks", and "bye" as conversational messages, not requests for lessons.
9. Quizzes and notes: Generate them only when the student requests them. Follow the requested number, format, and difficulty.
10. No automatic generation: Never generate unsolicited lessons, notes, quizzes, or chapter summaries.
11. Empty messages: Do not process empty input.
12. Context accuracy: Never confuse previous assistant responses with the latest student message. Preserve relevant context without letting it override the current request.
13. No fabricated context: Do not invent student questions, uploaded materials, course content, or university requirements.
14. Response length: Match the requested detail.
15. One submission, one response: Deliver a single, complete, well-formed answer.
16. Scientific & Math formatting: Format formulas cleanly in LaTeX ($...$ inline, $$...$$ block).`;

    const historyInstruction = recentHistoryText
      ? `\nRECENT CONVERSATION HISTORY (for follow-ups like "explain more" or "continue"):\n${recentHistoryText}\n`
      : "";

    // Include outline ONLY if the student explicitly asked for course syllabus / outline
    const askedForOutline = /\b(?:syllabus|outline|curriculum|chapters|units\s+list)\b/i.test(cleanQuery);
    const outlineInstruction = (askedForOutline && courseOutlineContext)
      ? `\nOFFICIAL COURSE OUTLINE REFERENCE:\n${courseOutlineContext}\n`
      : "";

    const prompt = `${historyInstruction}${outlineInstruction}
${question ? `Problem / Question Context:\n${question}\n` : ""}
Student's Query:
"${cleanQuery}"

${subject && subject !== "general" ? `Target Subject: ${subject}` : ""}

Instruction: Apply the Golden Rule. Answer ONLY what the student actually asks above according to the system rules. Do not add unsolicited textbook chapters or background outlines.`;

    try {
      const text = await generateContentWithFallback(ai, prompt, {
        systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      });

      return res.json({ answer: text });
    } catch (apiErr: any) {
      console.warn("AI Tutor live model unavailable, delegating to synthesizer:", apiErr?.message);
      const fallbackAns = synthesizeTutorAnswer({
        userQuery: cleanQuery,
        subject,
        roleId: "academic_tutor",
      });
      return res.json({ answer: fallbackAns, modelUsed: "Curriculum Intelligence (Offline Verified)" });
    }
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate tutor response" });
  }
});

// Multi-turn Gemini Chatbot endpoint with role-based system instructions and model routing
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history = [], roleId = "academic_tutor", model: requestedModel, subject } = req.body;
    const cleanMessage = String(message || "").trim();
    if (!cleanMessage) {
      return res.status(400).json({ error: "Empty message provided." });
    }

    const roleDefinitions: Record<string, { roleName: string; defaultModel: string; instruction: string }> = {
      academic_tutor: {
        roleName: "Freshman Academic Tutor",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA AI Academic Tutor for Ethiopian Higher Education Freshman Common Courses (MoSHE/MoGE curriculum).
Maintain an academic, encouraging, and clear tone. Provide structured, step-by-step explanations.
Format all mathematical, physical, and chemical formulas cleanly using LaTeX ($...$ inline, $$...$$ block).
Answer directly what the student asks. If context from prior turns exists, maintain conversation continuity.`
      },
      stem_solver: {
        roleName: "STEM & Complex Math Solver",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA Senior STEM & Mathematical Proof Solver specializing in university freshman calculus, linear algebra, mechanics, thermodynamics, electromagnetism, and organic chemistry.
You excel at complex, multi-step problem solving, derivations, and mathematical proofs.
Always write equations with pristine LaTeX ($...$ inline, $$...$$ display). Break down each step methodically with justification for each transformation. State assumptions, formulas used, and sanity-check final units.`
      },
      concept_simplifier: {
        roleName: "Concept Simplifier (ELI5)",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA Concept Simplifier. Your superpower is turning dense, abstract university-level concepts into intuitive, unforgettable real-world analogies (Explain Like I'm 5 / freshman beginner).
Avoid heavy academic jargon. Use relatable everyday scenarios (e.g. daily Ethiopian life, coffee ceremonies, bus routes, smartphones).
Follow the formula: 1) Intuitive Analogy, 2) The Real Scientific Concept, 3) Why It Matters for Exams.`
      },
      rapid_reviewer: {
        roleName: "Rapid Speed Reviewer",
        defaultModel: "gemini-3.1-flash-lite",
        instruction: `You are the ABEFA Rapid Flash Reviewer. Speed and high-yield density are your priorities.
Provide ultra-concise, punchy bullet points, flash definitions, key formulas, and exam cheat-sheet summaries.
Cut all conversational filler. Get straight to the key points needed to answer questions in under 30 seconds.`
      },
      exam_coach: {
        roleName: "Exam Prep & Strategy Coach",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA University Exam Strategy Coach.
You help students master midterm and final exam tactics: spotting typical exam distractors, eliminating wrong choices in multiple-choice questions, remembering key formulas under pressure, and understanding what university examiners look for.`
      }
    };

    const activeRole = roleDefinitions[roleId] || roleDefinitions.academic_tutor;
    const targetModel = requestedModel || activeRole.defaultModel;

    // Direct greeting handling for simple "Hi" or conversational replies (instant 0ms response)
    const conversationalReply = detectGreetingOrConversational(cleanMessage);
    if (conversationalReply) {
      return res.json({
        answer: conversationalReply,
        modelUsed: targetModel,
        roleId,
        roleName: activeRole.roleName,
      });
    }

    // Direct handling for Conversational / Emotional / Meta questions (e.g. "are you crazy", "who are you")
    const metaReply = handleConversationalAndMetaQuestions(cleanMessage);
    if (metaReply) {
      return res.json({
        answer: metaReply,
        modelUsed: targetModel,
        roleId,
        roleName: activeRole.roleName,
      });
    }

    // Pure Deterministic Mathematical & Symbolic Equation Solver (100% exact, zero AI hallucination)
    const mathReply = solveDeterministicMathProblem(cleanMessage);
    if (mathReply) {
      return res.json({
        answer: mathReply,
        modelUsed: "Deterministic Academic Solver (100% Exact)",
        roleId,
        roleName: activeRole.roleName,
      });
    }

    const ai = getAI();
    if (!ai) {
      const fallbackAns = synthesizeTutorAnswer({
        userQuery: cleanMessage,
        subject,
        roleId,
      });
      return res.json({
        answer: fallbackAns,
        modelUsed: "Curriculum Intelligence (Offline Verified)",
        roleId,
        roleName: activeRole.roleName,
      });
    }

    // Prepare multi-turn contents
    const formattedHistory = Array.isArray(history)
      ? history
          .filter((turn: any) => turn && typeof turn.content === "string" && turn.content.trim())
          .map((turn: any) => ({
            role: turn.role === "assistant" || turn.role === "model" ? "model" : "user",
            parts: [{ text: String(turn.content).trim() }],
          }))
      : [];

    const contents = [
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: cleanMessage }],
      },
    ];

    // Priority ordering of models:
    // 1. Requested/default model
    // 2. gemini-flash-latest
    // 3. gemini-3.1-flash-lite
    // 4. gemini-3.8-flash
    const modelsToAttempt = [
      targetModel,
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
    ].filter((m, idx, arr) => arr.indexOf(m) === idx);

    let finalAnswer = "";
    let finalModelUsed = targetModel;
    let lastError = null;

    for (const m of modelsToAttempt) {
      const modelConfig: any = {
        systemInstruction: `${activeRole.instruction}\n${subject && subject !== "all" && subject !== "general" ? `Student Subject Focus: ${subject}` : ""}`,
      };
      if (m === "gemini-3.8-flash") {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      } else if (m === "gemini-3.1-flash-lite") {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };
      }

      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: m,
            contents,
            config: modelConfig,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Model ${m} timed out`)), 16000)
          ),
        ]);

        if (response && response.text) {
          finalAnswer = response.text;
          finalModelUsed = m;
          break;
        }
      } catch (err: any) {
        lastError = err;
        // Quiet failover to next model
      }
    }

    if (!finalAnswer) {
      console.warn("All live Gemini models failed or timed out, generating curriculum synthesis fallback:", lastError?.message);
      finalAnswer = synthesizeTutorAnswer({
        userQuery: cleanMessage,
        subject,
        roleId,
      });
      finalModelUsed = "Curriculum Intelligence (Offline Verified)";
    }

    return res.json({
      answer: finalAnswer,
      modelUsed: finalModelUsed,
      roleId,
      roleName: activeRole.roleName,
    });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    const fallbackAns = synthesizeTutorAnswer({
      userQuery: req.body?.message || "",
      subject: req.body?.subject,
      roleId: req.body?.roleId || "academic_tutor",
    });
    return res.json({
      answer: fallbackAns,
      modelUsed: "Curriculum Intelligence (Offline Verified)",
      roleId: req.body?.roleId || "academic_tutor",
      roleName: "Freshman Academic Coach",
    });
  }
});

// Streaming Multi-turn Gemini Chatbot endpoint (Server-Sent Events)
app.post("/api/gemini/chat-stream", async (req, res) => {
  try {
    const { message, history = [], roleId = "academic_tutor", model: requestedModel, subject } = req.body;
    const cleanMessage = String(message || "").trim();
    if (!cleanMessage) {
      return res.status(400).json({ error: "Empty message provided." });
    }

    const roleDefinitions: Record<string, { roleName: string; defaultModel: string; instruction: string }> = {
      academic_tutor: {
        roleName: "Freshman Academic Tutor",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA AI Academic Tutor for Ethiopian Higher Education Freshman Common Courses (MoSHE/MoGE curriculum).
Maintain an academic, encouraging, and clear tone. Provide structured, step-by-step explanations.
Format all mathematical, physical, and chemical formulas cleanly using LaTeX ($...$ inline, $$...$$ block).
Answer directly what the student asks. If context from prior turns exists, maintain conversation continuity.`
      },
      stem_solver: {
        roleName: "STEM & Complex Math Solver",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA Senior STEM & Mathematical Proof Solver specializing in university freshman calculus, linear algebra, mechanics, thermodynamics, electromagnetism, and organic chemistry.
You excel at complex, multi-step problem solving, derivations, and mathematical proofs.
Always write equations with pristine LaTeX ($...$ inline, $$...$$ display). Break down each step methodically with justification for each transformation. State assumptions, formulas used, and sanity-check final units.`
      },
      concept_simplifier: {
        roleName: "Concept Simplifier (ELI5)",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA Concept Simplifier. Your superpower is turning dense, abstract university-level concepts into intuitive, unforgettable real-world analogies (Explain Like I'm 5 / freshman beginner).
Avoid heavy academic jargon. Use relatable everyday scenarios (e.g. daily Ethiopian life, coffee ceremonies, bus routes, smartphones).
Follow the formula: 1) Intuitive Analogy, 2) The Real Scientific Concept, 3) Why It Matters for Exams.`
      },
      rapid_reviewer: {
        roleName: "Rapid Speed Reviewer",
        defaultModel: "gemini-3.1-flash-lite",
        instruction: `You are the ABEFA Rapid Flash Reviewer. Speed and high-yield density are your priorities.
Provide ultra-concise, punchy bullet points, flash definitions, key formulas, and exam cheat-sheet summaries.
Cut all conversational filler. Get straight to the key points needed to answer questions in under 30 seconds.`
      },
      exam_coach: {
        roleName: "Exam Prep & Strategy Coach",
        defaultModel: "gemini-flash-latest",
        instruction: `You are the ABEFA University Exam Strategy Coach.
You help students master midterm and final exam tactics: spotting typical exam distractors, eliminating wrong choices in multiple-choice questions, remembering key formulas under pressure, and understanding what university examiners look for.`
      }
    };

    const activeRole = roleDefinitions[roleId] || roleDefinitions.academic_tutor;
    const targetModel = requestedModel || activeRole.defaultModel;

    // Check direct greeting or conversational reply (immediate 0ms response)
    const conversationalReply = detectGreetingOrConversational(cleanMessage);
    if (conversationalReply) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.write(`data: ${JSON.stringify({ text: conversationalReply, roleId, roleName: activeRole.roleName, modelUsed: targetModel })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    // Direct handling for Conversational / Emotional / Meta questions (e.g. "are you crazy", "who are you")
    const metaReply = handleConversationalAndMetaQuestions(cleanMessage);
    if (metaReply) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.write(`data: ${JSON.stringify({ text: metaReply, roleId, roleName: activeRole.roleName, modelUsed: targetModel })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    // Pure Deterministic Mathematical & Symbolic Equation Solver (100% exact, zero AI hallucination)
    const mathReply = solveDeterministicMathProblem(cleanMessage);
    if (mathReply) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.write(`data: ${JSON.stringify({ text: mathReply, roleId, roleName: activeRole.roleName, modelUsed: "Deterministic Academic Solver (100% Exact)" })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    const streamSynthesizedAnswer = (resObj: express.Response) => {
      const synthesized = synthesizeTutorAnswer({
        userQuery: cleanMessage,
        subject,
        roleId,
      });
      const words = synthesized.split(" ");
      for (let i = 0; i < words.length; i += 6) {
        const chunk = words.slice(i, i + 6).join(" ") + " ";
        resObj.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
      resObj.write("data: [DONE]\n\n");
      resObj.end();
    };

    const ai = getAI();
    if (!ai) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      streamSynthesizedAnswer(res);
      return;
    }

    const formattedHistory = Array.isArray(history)
      ? history
          .filter((turn: any) => turn && typeof turn.content === "string" && turn.content.trim())
          .map((turn: any) => ({
            role: turn.role === "assistant" || turn.role === "model" ? "model" : "user",
            parts: [{ text: String(turn.content).trim() }],
          }))
      : [];

    const contents = [
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: cleanMessage }],
      },
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Ordered models to attempt: requested model first, then ultra-fast fallbacks
    const streamingModels = [
      targetModel,
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    let streamedSuccessfully = false;

    for (const m of streamingModels) {
      if (streamedSuccessfully) break;

      const modelConfig: any = {
        systemInstruction: `${activeRole.instruction}\n${subject && subject !== "all" && subject !== "general" ? `Student Subject Focus: ${subject}` : ""}`,
      };
      if (m === "gemini-3.8-flash") {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      } else if (m === "gemini-3.1-flash-lite") {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };
      }

      try {
        const streamPromise = ai.models.generateContentStream({
          model: m,
          contents,
          config: modelConfig,
        });

        // Generous 16s timeout to allow initial stream handshake without premature cutoff
        const responseStream = await Promise.race([
          streamPromise,
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Stream model ${m} timed out`)), 16000)
          ),
        ]);

        let modelSentChunk = false;
        for await (const chunk of responseStream) {
          if (chunk.text) {
            modelSentChunk = true;
            streamedSuccessfully = true;
            res.write(`data: ${JSON.stringify({ text: chunk.text, roleId, roleName: activeRole.roleName, modelUsed: m })}\n\n`);
          }
        }

        if (modelSentChunk) {
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }
      } catch (err: any) {
        // If some chunks were already written to client, do not restart stream with a different model; finish cleanly
        if (streamedSuccessfully) {
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }
        // Quiet failover to next model
      }
    }

    if (!streamedSuccessfully) {
      streamSynthesizedAnswer(res);
    }
  } catch (error: any) {
    console.error("Gemini stream endpoint error:", error);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
    }
    const fallbackAns = synthesizeTutorAnswer({
      userQuery: req.body?.message || "",
      subject: req.body?.subject,
      roleId: req.body?.roleId || "academic_tutor",
    });
    res.write(`data: ${JSON.stringify({ text: fallbackAns })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
});

// AI Concept Explainer endpoint
app.post("/api/gemini/explain-concept", async (req, res) => {
  try {
    const { concept, subject, courseOutlineContext } = req.body;
    const ai = getAI();

    if (!ai) {
      const fallbackExpl = synthesizeTutorAnswer({
        userQuery: `Explain concept in plain language: ${concept}`,
        subject,
        roleId: "concept_simplifier",
      });
      return res.json({ explanation: fallbackExpl });
    }

    const outlineInstruction = courseOutlineContext
      ? `\nSTUDENT'S SAVED COURSE OUTLINE & CONTENTS (FOLLOW THIS EXACT COURSE PATH):\n${courseOutlineContext}\n`
      : "";

    const prompt = `You are a premier university professor for Ethiopian Higher Education Freshman Common Courses (MoSHE/MoGE Curriculum).
Provide an ultra-clear, high-yield conceptual breakdown for: "${concept}".
Subject: ${subject || "Freshman Common Course"}
${outlineInstruction}
Structure the response with:
1. **Core Definition & Intuitive Meaning** (Clear & intuitive, aligned with the course outline)
2. **Key Governing Principles, Mechanisms, or Equations**
3. **University Exam Shortcuts & Mnemonics** (How to solve problems on this topic in under 60 seconds)
4. **Common Exam Traps / Pitfalls** (What distractors examiners commonly use)
5. **Quick Worked Example** (1 concise exam-grade sample problem with solution)`;

    try {
      const text = await generateContentWithFallback(ai, prompt, {
        systemInstruction: "You are an elite academic professor for Ethiopian university freshman common courses. Always stay strictly on the student's requested subject.",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      });
      return res.json({ explanation: text });
    } catch (apiErr: any) {
      console.warn("Concept explanation fallback triggered:", apiErr?.message);
      const fallbackExpl = synthesizeTutorAnswer({
        userQuery: `Explain concept in plain language: ${concept}`,
        subject,
        roleId: "concept_simplifier",
      });
      return res.json({ explanation: fallbackExpl });
    }
  } catch (error: any) {
    console.error("AI Explain error:", error);
    const fallbackExpl = synthesizeTutorAnswer({
      userQuery: req.body?.concept ? `Explain concept: ${req.body.concept}` : "Core freshman concepts",
      subject: req.body?.subject,
      roleId: "concept_simplifier",
    });
    return res.json({ explanation: fallbackExpl });
  }
});

// Dynamic question generator (Single)
app.post("/api/gemini/generate-question", async (req, res) => {
  try {
    const { subject, topic, difficulty, courseOutlineContext } = req.body;
    const cleanedTopic = cleanStudentTopicInput(topic);
    const normSubj = inferSubjectFromTopic(cleanedTopic, subject);
    const course = getCourseBySubject(normSubj);
    const courseName = course ? `${course.code}: ${course.title}` : normSubj;
    const effectiveTopic = cleanedTopic || (course ? `${course.title} Core Topics` : "Core Syllabus");
    const ai = getAI();

    const getFallbackSingleQuestion = () => {
      const synthesized = synthesizeVerifiedExamQuestions({
        count: 1,
        subjects: [normSubj],
        contentFocus: effectiveTopic,
        difficulty: difficulty || "medium",
      });
      const q = synthesized[0];
      return {
        ...q,
        shortcut: q.shortcutTip || "Eliminate distractor options by checking key definitions and units first.",
      };
    };

    if (!ai) {
      return res.json(getFallbackSingleQuestion());
    }

    const outlineBlock = courseOutlineContext
      ? `\nSTUDENT'S SAVED COURSE OUTLINE & CONTENTS:\n${courseOutlineContext}\n- Ensure the question directly tests the concepts, definitions, or formulas from the student's saved course outline and target topic!\n`
      : "";

    const prompt = `Generate 1 realistic, high-quality university examination multiple-choice question.
Course Context: ${courseName} (Subject ID: "${normSubj}")
Target Topic: "${effectiveTopic}"
Difficulty Level: ${difficulty || "medium"}
${outlineBlock}
CRITICAL REQUIREMENT:
- The question MUST be 100% EXCLUSIVELY about "${effectiveTopic}". Do NOT generate a question about any other topic!
- Ensure the 4 options are distinct and realistic, with one unambiguously correct answer (0, 1, 2, or 3).
- Provide a step-by-step explanation and a 30-second exam shortcut.`;

    try {
      const text = await generateContentWithFallback(
        ai,
        prompt,
        {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              topic: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              shortcut: { type: Type.STRING },
            },
            required: ["question", "options", "correctAnswer", "explanation", "shortcut"],
          },
        },
        18000
      );

      const parsed = parseGeminiJsonSafely<any>(text, null);
      if (parsed && parsed.question && Array.isArray(parsed.options) && parsed.options.length >= 4) {
        const cleanQ = sanitizeAndShuffleQuestion(
          { ...parsed, subject: normSubj, topic: parsed.topic || effectiveTopic },
          Math.floor(Math.random() * 100),
          normSubj,
          difficulty || "medium"
        );
        return res.json({
          ...cleanQ,
          shortcut: cleanQ.shortcutTip || parsed.shortcut || "Check units and boundary conditions first.",
        });
      }
      return res.json(getFallbackSingleQuestion());
    } catch (apiErr: any) {
      console.warn("Question generation fallback triggered:", apiErr?.message);
      return res.json(getFallbackSingleQuestion());
    }
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
      subjects = ["mathematics", "physics", "chemistry"],
      contentFocus = "Freshman MoSHE Core Syllabus",
      difficulty = "medium",
      courseOutlineContext,
    } = req.body;

    const requestedCount = Math.min(Math.max(Number(count) || 10, 3), 35);
    const cleanFocus = cleanStudentTopicInput(contentFocus);
    const isGenericSyllabus =
      !cleanFocus ||
      /^(full|freshman|all\s+courses|core\s+syllabus|moshe|general|standard|semester)/i.test(cleanFocus) ||
      cleanFocus.toLowerCase().includes("common courses") ||
      cleanFocus.toLowerCase().includes("common syllabus");

    let normalizedSubjects =
      Array.isArray(subjects) && subjects.length > 0
        ? subjects.map((s: string) => normalizeFreshmanSubject(s))
        : ["mathematics", "physics", "chemistry", "biology"];

    // If the student asked for a specific custom topic (e.g. "Polymers"), lock the subject to the matching course
    // so Gemini generates 100% of the exam on their requested topic!
    if (!isGenericSyllabus) {
      const inferred = inferSubjectFromTopic(cleanFocus, normalizedSubjects[0]);
      if (normalizedSubjects.length > 1 || !normalizedSubjects.includes(inferred)) {
        normalizedSubjects = [inferred];
      }
    }

    const formattedCoursesList = normalizedSubjects
      .map((s) => {
        const c = getCourseBySubject(s);
        return c ? `${c.code} (${c.title}) [subject: "${s}"]` : s;
      })
      .join(", ");

    const ai = getAI();

    if (!ai) {
      const questions = synthesizeVerifiedExamQuestions({
        count: requestedCount,
        subjects: normalizedSubjects,
        contentFocus: cleanFocus,
        difficulty,
      });
      return res.json({
        questions,
        count: questions.length,
        config: { count: requestedCount, subjects: normalizedSubjects, contentFocus: cleanFocus, difficulty, isFallback: true },
      });
    }

    const outlinePromptSection = courseOutlineContext
      ? `\nSTUDENT'S SAVED COURSE OUTLINE & CONTENTS (STRICT EXAM BLUEPRINT PATH):\n${courseOutlineContext}\n- You MUST design the exam questions directly from the chapters, subtopics, and lecture contents in the student's saved course outline above!\n`
      : "";

    const buildExamBatchPrompt = (batchCount: number, batchIndex: number) => `You are the Head University Examination Specialist for ${formattedCoursesList}.
Create a custom mock exam question set of EXACTLY ${batchCount} distinct multiple-choice questions (MCQs)${batchIndex > 1 ? ` (Part ${batchIndex} — avoid repeating earlier questions)` : ""}.
${outlinePromptSection}
CRITICAL TOPIC LOCK REQUIREMENT:
${
  !isGenericSyllabus
    ? `- The student explicitly requested an examination ONLY about: "${cleanFocus}".
- EVERY SINGLE QUESTION (100% of all ${batchCount} questions) MUST directly test "${cleanFocus}" (covering its definitions, mechanisms, equations, calculations, properties, applications, and edge cases).
- DO NOT generate questions about any other topic outside "${cleanFocus}"!`
    : `- Selected Freshman Courses: ${formattedCoursesList}
- Distribute questions evenly across the selected courses and set each question's "subject" field to one of: ${JSON.stringify(normalizedSubjects)}.
- Focus Topic / Syllabus Scope: "${cleanFocus}"`
}
- Difficulty Tier: "${difficulty}" (easy = fundamental principles & definitions, medium = standard university exam computational/analytical questions, hard = multi-step challenging problems, mixed = balanced exam distribution)
- Write mathematical equations, integrals, vectors, chemical formulas, and units in clean standard notation or LaTeX (e.g. $E = mc^2$, $\\bar{X}_n = \\frac{1}{1-p}$).
- Every question MUST have 4 distinct options and "correctAnswer" as integer 0, 1, 2, or 3.
- Provide a clear step-by-step "explanation" and a 30-second "shortcutTip".`;

    const examQuestionSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          topic: { type: Type.STRING },
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          correctAnswer: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
          shortcutTip: { type: Type.STRING },
          difficulty: { type: Type.STRING },
        },
        required: ["subject", "topic", "question", "options", "correctAnswer", "explanation"],
      },
    };

    try {
      // If requestedCount > 15, split into 2 parallel AI calls so 100% of questions are generated by Gemini AI fast!
      const batchCounts =
        requestedCount <= 15
          ? [requestedCount]
          : [Math.ceil(requestedCount / 2), requestedCount - Math.ceil(requestedCount / 2)];

      const batchResults = await Promise.all(
        batchCounts.map((bCount, idx) =>
          generateContentWithFallback(
            ai,
            buildExamBatchPrompt(bCount, idx + 1),
            {
              systemInstruction:
                "You are an elite academic professor designing authentic university examination papers. Strictly follow the user's topic focus and output valid JSON array format.",
              responseMimeType: "application/json",
              responseSchema: examQuestionSchema,
            },
            25000
          ).catch((err) => {
            console.warn(`Exam batch ${idx + 1} error:`, err?.message);
            return "[]";
          })
        )
      );

      let parsedQuestions: any[] = [];
      for (const text of batchResults) {
        let batchParsed = parseGeminiJsonSafely<any[]>(text, []);
        if (!Array.isArray(batchParsed)) {
          if (batchParsed && Array.isArray((batchParsed as any).questions)) {
            batchParsed = (batchParsed as any).questions;
          } else {
            batchParsed = [];
          }
        }
        parsedQuestions.push(...batchParsed);
      }

      const finalQuestions = synthesizeVerifiedExamQuestions({
        count: requestedCount,
        subjects: normalizedSubjects,
        contentFocus: cleanFocus,
        difficulty,
        seedQuestions: parsedQuestions,
      });

      return res.json({
        questions: finalQuestions,
        count: finalQuestions.length,
        config: { count: requestedCount, subjects: normalizedSubjects, contentFocus: cleanFocus, difficulty },
      });
    } catch (apiErr: any) {
      console.warn("Live exam set generation fallback triggered, synthesizing full exam set:", apiErr?.message);
      const fallbackQuestions = synthesizeVerifiedExamQuestions({
        count: requestedCount,
        subjects: normalizedSubjects,
        contentFocus: cleanFocus,
        difficulty,
      });
      return res.json({
        questions: fallbackQuestions,
        count: fallbackQuestions.length,
        config: { count: requestedCount, subjects: normalizedSubjects, contentFocus: cleanFocus, difficulty, isFallback: true },
      });
    }
  } catch (error: any) {
    console.error("AI Exam Set Generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate custom mock exam questions" });
  }
});

// Shared schema for AI Note generation
const NOTE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    overview: { type: Type.STRING },
    estimatedReadTimeMinutes: { type: Type.INTEGER },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING },
          content: { type: Type.STRING },
          equations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                formula: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ["name", "formula", "explanation"],
            },
          },
          workedExamples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                problem: { type: Type.STRING },
                stepByStepSolution: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                shortcutTip: { type: Type.STRING },
              },
              required: ["problem", "stepByStepSolution"],
            },
          },
          examTraps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          keyTakeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["heading", "content", "keyTakeaways"],
      },
    },
  },
  required: ["title", "overview", "sections"],
};

// Helper to generate a 100% AI-generated MasterNoteChapter (uses 2 parallel AI calls when Full Textbook is selected for massive 8-chapter depth!)
async function generatePureAIMasterNote(params: {
  ai: GoogleGenAI;
  day?: number | null;
  subject?: string;
  topic?: string;
  focusAreas?: string;
  detailLevel?: string;
  courseOutlineContext?: string;
}) {
  const cleanedTopic = cleanStudentTopicInput(params.topic);
  const normSubj = inferSubjectFromTopic(cleanedTopic, params.subject || "mathematics");
  const course = getCourseBySubject(normSubj);
  const courseLabel = course ? `${course.code}: ${course.title}` : normSubj;
  const noteTopic = cleanedTopic || `${courseLabel} Core Syllabus`;
  const effectiveFocus = resolveEffectiveFocusAreas(noteTopic, params.focusAreas, course?.code);
  const isFullTextbook =
    String(params.detailLevel || "comprehensive").toLowerCase() === "comprehensive" ||
    String(params.detailLevel || "").toLowerCase().includes("full");

  const focusInstruction = effectiveFocus
    ? `Specific Subtopics to Cover Within "${noteTopic}": ${effectiveFocus}`
    : `Cover ALL essential subtopics, definitions, classifications, mechanisms, mathematical/chemical formulations, worked calculations, and exam applications of "${noteTopic}".`;

  const outlineBlueprintBlock = params.courseOutlineContext
    ? `\nSTUDENT'S SAVED COURSE OUTLINE & CONTENTS (FOLLOW THIS EXACT COURSE PATH):\n${params.courseOutlineContext}\n- Structure your chapters, subtopics, definitions, derivations, and worked exam problems so they directly follow the student's saved course outline path and lecture contents above!\n`
    : "";

  if (isFullTextbook) {
    // Run 2 parallel Gemini calls (Part I: Chapters 1-4, Part II: Chapters 5-8) so the student receives a massive, 8-chapter, 100% AI-generated textbook exclusively about `noteTopic`!
    const part1Prompt = `You are a Senior University Professor writing Volume I (Chapters 1 to 4) of an EXHAUSTIVE, FULL UNIVERSITY TEXTBOOK EDITION exclusively about:
Topic: "${noteTopic}"
Course Context: ${courseLabel}
${focusInstruction}
${outlineBlueprintBlock}
CRITICAL TOPIC LOCK RULE:
- 100% of your content MUST be strictly and exclusively about "${noteTopic}" (and its subtopics in the student's course outline if provided).
- Do NOT write about unrelated chapters or other topics outside "${noteTopic}"!
- Generate EXACTLY 4 comprehensive, long, textbook-grade chapters in the "sections" array:
  1. "Chapter 1: Foundational Theory, Formal Definitions, Classification & Nomenclature of ${noteTopic}"
  2. "Chapter 2: Core Mechanisms, Structural Principles & Step-by-Step Theoretical Foundations of ${noteTopic}"
  3. "Chapter 3: Mathematical Formulations, Governing Equations, Quantitative Laws & Derivations in ${noteTopic}"
  4. "Chapter 4: Deep-Dive Subtopics, Synthesis/Transformations & Comparative Matrix of ${noteTopic}"

Formatting & Depth Requirements for Each Chapter:
- In "content", write a rich, multi-paragraph university textbook lecture (400–700+ words per chapter) using clean Markdown:subsection headings (###, ####), bullet points, numbered protocols, Markdown comparison tables (| Col 1 | Col 2 |), callouts (> **Note:** or > **Important:**), and clean LaTeX math/chemistry ($...$ and $$...$$).
- In each chapter, include 2 to 4 governing "equations" (or reaction/structural equations) strictly for "${noteTopic}".
- In each chapter, include 2 detailed university exam "workedExamples" strictly testing "${noteTopic}" with multi-step solutions and a 30-second "shortcutTip".
- In each chapter, include 3 specific "examTraps" and 3 "keyTakeaways" strictly about "${noteTopic}".`;

    const part2Prompt = `You are a Senior University Professor writing Volume II (Chapters 5 to 8) of an EXHAUSTIVE, FULL UNIVERSITY TEXTBOOK EDITION exclusively about:
Topic: "${noteTopic}"
Course Context: ${courseLabel}
${focusInstruction}
${outlineBlueprintBlock}
CRITICAL TOPIC LOCK RULE:
- 100% of your content MUST be strictly and exclusively about "${noteTopic}" (and its subtopics in the student's course outline if provided).
- Do NOT write about unrelated chapters or other topics outside "${noteTopic}"!
- Generate EXACTLY 4 comprehensive, long, textbook-grade chapters in the "sections" array:
  1. "Chapter 5: Physical, Chemical & Analytical Properties, Structure-Property Relationships & Advanced Concepts in ${noteTopic}"
  2. "Chapter 6: Real-World, Industrial & Scientific Applications + Boundary-Value Edge Cases of ${noteTopic}"
  3. "Chapter 7: Comprehensive University Midterm & Final Worked Problem Bank on ${noteTopic}"
  4. "Chapter 8: Complete Examiner Trap Encyclopedia, 30-Second Speed Playbook & 4.00 GPA Mastery Checklist for ${noteTopic}"

Formatting & Depth Requirements for Each Chapter:
- In "content", write a rich, multi-paragraph university textbook lecture (400–700+ words per chapter) using clean Markdown: subsection headings (###, ####), bullet points, numbered step-by-step protocols, Markdown tables (| Col 1 | Col 2 |), callouts (> **Tip:** or > **Warning:**), and clean LaTeX math/chemistry ($...$ and $$...$$).
- In each chapter, include 2 to 4 governing "equations" or quantitative relationships strictly for "${noteTopic}".
- In each chapter (especially Chapter 7), include 2 to 4 challenging university exam "workedExamples" strictly testing "${noteTopic}" with step-by-step solutions and a 30-second "shortcutTip".
- In each chapter, include 3 to 5 specific "examTraps" and 4 "keyTakeaways" strictly about "${noteTopic}".`;

    const [res1, res2] = await Promise.all([
      generateContentWithFallback(
        params.ai,
        part1Prompt,
        {
          systemInstruction:
            "You are an elite academic professor writing exhaustive university textbook chapters strictly on the requested topic. Output strictly valid JSON format.",
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
          responseSchema: NOTE_RESPONSE_SCHEMA,
        },
        30000
      ).catch((e) => {
        console.warn("Full Textbook Part 1 error:", e?.message);
        return "";
      }),
      generateContentWithFallback(
        params.ai,
        part2Prompt,
        {
          systemInstruction:
            "You are an elite academic professor writing exhaustive university textbook chapters strictly on the requested topic. Output strictly valid JSON format.",
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
          responseSchema: NOTE_RESPONSE_SCHEMA,
        },
        30000
      ).catch((e) => {
        console.warn("Full Textbook Part 2 error:", e?.message);
        return "";
      }),
    ]);

    const parsed1 = parseGeminiJsonSafely<any>(res1, null);
    const parsed2 = parseGeminiJsonSafely<any>(res2, null);

    const combinedSections = [
      ...(Array.isArray(parsed1?.sections) ? parsed1.sections : []),
      ...(Array.isArray(parsed2?.sections) ? parsed2.sections : []),
    ].map((sec, idx) => {
      const cleanH = String(sec.heading || `Core Principles of ${noteTopic}`).replace(/^(Chapter|Section|Part)\s*\d+\s*[:.—-]\s*/i, "").trim();
      return {
        ...sec,
        heading: `Chapter ${idx + 1}: ${cleanH}`,
      };
    });

    if (combinedSections.length > 0) {
      return synthesizeMasterNoteChapter({
        rawNote: {
          title: parsed1?.title || parsed2?.title || `${noteTopic} — Complete University Textbook Edition`,
          overview:
            parsed1?.overview ||
            parsed2?.overview ||
            `Exhaustive, multi-chapter AI University Textbook Compendium exclusively covering ${noteTopic} (${courseLabel}).`,
          estimatedReadTimeMinutes: Math.max(75, combinedSections.length * 12),
          sections: combinedSections,
        },
        day: params.day,
        subject: normSubj,
        topic: noteTopic,
        focusAreas: effectiveFocus,
        detailLevel: params.detailLevel,
      });
    }
  }

  // Concise / Formula Sheet (or fallback if parallel call returned empty)
  const singlePrompt = `You are a Senior University Professor writing a high-yield university study guide exclusively for:
Topic: "${noteTopic}"
Course Context: ${courseLabel} (Subject ID: "${normSubj}")
${focusInstruction}
${outlineBlueprintBlock}
Detail Level: ${params.detailLevel}

CRITICAL TOPIC LOCK RULE:
- 100% of your content MUST be strictly and exclusively about "${noteTopic}". Do NOT include unrelated topics from the rest of ${courseLabel}.
- Format equations and chemical structures using clean LaTeX ($...$ and $$...$$) and Markdown tables/callouts.
- Provide 3 to 4 detailed sections with theoretical explanations, 2 to 4 governing equations per section, 2 to 3 worked exam examples per section, examiner traps, and key takeaways.`;

  const text = await generateContentWithFallback(
    params.ai,
    singlePrompt,
    {
      systemInstruction:
        "You are an elite academic professor writing university study notes strictly on the requested topic. Output strictly valid JSON format.",
      responseMimeType: "application/json",
      maxOutputTokens: 8192,
      responseSchema: NOTE_RESPONSE_SCHEMA,
    },
    26000
  );

  const parsedNote = parseGeminiJsonSafely<any>(text, null);
  return synthesizeMasterNoteChapter({
    rawNote: parsedNote,
    day: params.day,
    subject: normSubj,
    topic: noteTopic,
    focusAreas: effectiveFocus,
    detailLevel: params.detailLevel,
  });
}

// AI Master Study Notes Generator
app.post("/api/gemini/generate-notes", async (req, res) => {
  try {
    const { day, subject = "mathematics", topic, focusAreas, detailLevel = "comprehensive", courseOutlineContext } = req.body;
    const cleanedTopic = cleanStudentTopicInput(topic);
    const normSubj = inferSubjectFromTopic(cleanedTopic, subject);
    const course = getCourseBySubject(normSubj);
    const courseLabel = course ? `${course.code}: ${course.title}` : normSubj;
    const noteTopic = cleanedTopic || `${courseLabel} Core Syllabus`;
    const effectiveFocus = resolveEffectiveFocusAreas(noteTopic, focusAreas, course?.code);
    const ai = getAI();

    if (!ai) {
      const note = synthesizeMasterNoteChapter({
        day,
        subject: normSubj,
        topic: noteTopic,
        focusAreas: effectiveFocus,
        detailLevel,
      });
      return res.json({ note });
    }

    try {
      const finalNote = await generatePureAIMasterNote({
        ai,
        day,
        subject: normSubj,
        topic: noteTopic,
        focusAreas: effectiveFocus,
        detailLevel,
        courseOutlineContext,
      });
      return res.json({ note: finalNote });
    } catch (apiErr: any) {
      console.warn("Live note generation fallback triggered, synthesizing topic note:", apiErr?.message);
      const fallbackNote = synthesizeMasterNoteChapter({
        day,
        subject: normSubj,
        topic: noteTopic,
        focusAreas: effectiveFocus,
        detailLevel,
      });
      return res.json({ note: fallbackNote });
    }
  } catch (error: any) {
    console.error("AI Note Generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI master note" });
  }
});

// AI Note Expander & Editor
app.post("/api/gemini/expand-edit-note", async (req, res) => {
  try {
    const { currentTitle, currentContent, currentNoteContent, action, customPrompt, customInstruction, subject, topic, courseOutlineContext } = req.body;
    const noteBody = currentContent || currentNoteContent || "";
    const userInstruction = customPrompt || customInstruction || "";
    const rawTargetTopic = currentTitle || topic || "Core Syllabus";
    const cleanTargetTopic = cleanStudentTopicInput(rawTargetTopic);
    const normSubj = inferSubjectFromTopic(cleanTargetTopic, subject);
    const course = getCourseBySubject(normSubj);
    const courseLabel = course ? `${course.code}: ${course.title}` : normSubj;

    const convertMasterNoteToMarkdown = (tb: any) => {
      let md = noteBody ? `${noteBody}\n\n---\n\n# ${tb.title}\n\n> **Executive Overview:** ${tb.overview}\n\n` : `# ${tb.title}\n\n> **Executive Overview:** ${tb.overview}\n\n`;
      for (const sec of tb.sections || []) {
        md += `\n---\n\n## ${sec.heading}\n\n${sec.content}\n\n`;
        if (sec.equations && sec.equations.length > 0) {
          md += `### 📐 Governing Equations & Formulations\n\n`;
          for (const eq of sec.equations) {
            md += `- **${eq.name}:** $$${eq.formula}$$ — *${eq.explanation}*\n`;
          }
          md += `\n`;
        }
        if (sec.workedExamples && sec.workedExamples.length > 0) {
          md += `### 📝 Worked University Exam Problems\n\n`;
          for (const ex of sec.workedExamples) {
            md += `#### ${ex.problem}\n`;
            for (const step of ex.stepByStepSolution) {
              md += `- ${step}\n`;
            }
            if (ex.shortcutTip) {
              md += `- ⚡ **30-Second Shortcut:** ${ex.shortcutTip}\n`;
            }
            md += `\n`;
          }
        }
        if (sec.examTraps && sec.examTraps.length > 0) {
          md += `### ⚠️ Common Examiner Traps\n\n`;
          for (const trap of sec.examTraps) {
            md += `- ❌ ${trap}\n`;
          }
          md += `\n`;
        }
        if (sec.keyTakeaways && sec.keyTakeaways.length > 0) {
          md += `### 🎯 Key Takeaways\n\n`;
          for (const k of sec.keyTakeaways) {
            md += `- ✅ ${k}\n`;
          }
          md += `\n`;
        }
      }
      return md;
    };

    const buildSynthesizedTextbookMarkdown = () => {
      const tb = synthesizeMasterNoteChapter({
        subject: normSubj,
        topic: cleanTargetTopic || `${courseLabel} Master Guide`,
        detailLevel: "comprehensive",
      });
      return convertMasterNoteToMarkdown(tb);
    };

    const ai = getAI();

    if (!ai) {
      return res.json({
        updatedContent: buildSynthesizedTextbookMarkdown(),
      });
    }

    if (action === "full_textbook") {
      try {
        const aiTb = await generatePureAIMasterNote({
          ai,
          subject: normSubj,
          topic: cleanTargetTopic || `${courseLabel} Master Guide`,
          detailLevel: "comprehensive",
          courseOutlineContext,
        });
        return res.json({ updatedContent: convertMasterNoteToMarkdown(aiTb) });
      } catch {
        return res.json({ updatedContent: buildSynthesizedTextbookMarkdown() });
      }
    }

    let instructionDetails = "";
    switch (action) {
      case "add_examples":
      case "add_worked_examples":
        instructionDetails = "Add 4 brand-new, challenging step-by-step worked university exam problems with complete multi-step solutions and 30-second speed shortcuts.";
        break;
      case "add_shortcuts":
      case "add_speed_hacks":
        instructionDetails = "Add an exhaustive section of high-yield mental math shortcuts, rapid formula transformations, boundary-value elimination rules, and 30-second exam hacks.";
        break;
      case "add_traps":
      case "add_exam_traps":
        instructionDetails = "Add a comprehensive breakdown of 8+ examiner traps, unit conversion pitfalls, and distractor options commonly placed in Ethiopian university exams.";
        break;
      case "simplify_explanations":
        instructionDetails = "Rephrase and clarify difficult theoretical paragraphs into intuitive, high-clarity conceptual analogies without losing mathematical rigor.";
        break;
      case "custom":
      case "custom_prompt":
        instructionDetails = userInstruction || "Expand and enhance this study note into a comprehensive university textbook chapter with deeper analysis, derivations, and worked examples.";
        break;
      case "expand_theory":
      default:
        instructionDetails = "Expand this note substantially into an exhaustive university textbook chapter by adding multi-paragraph theoretical explanations, formal definitions, step-by-step derivations, LaTeX formulas, and worked exam examples.";
    }

    const prompt = `You are the Lead Master Textbook Author for Ethiopian Higher Education Freshman Common Courses (${courseLabel}).
You are tasked with expanding, enriching, and editing the following study note into a much larger, deeper university textbook note:

Note Title: "${currentTitle || topic || "Study Note"}"
Course: ${courseLabel}
Action Requested: ${instructionDetails}
${courseOutlineContext ? `\nSTUDENT'S SAVED COURSE OUTLINE & CONTENTS:\n${courseOutlineContext}\n` : ""}
Current Note Content:
\`\`\`markdown
${noteBody}
\`\`\`

Instructions:
1. Preserve existing valuable content while integrating massive, textbook-grade additions seamlessly aligned with the student's course outline.
2. Format all mathematical and scientific formulas in clean LaTeX notation (e.g., $v = u + at$, $\\int_0^1 x^2 dx$, $\\vec{A} \\times \\vec{B}$).
3. Use clear markdown headers (##, ###), comparison tables, bullet points, bold key terms, step-by-step worked examples, and 30-second speed shortcuts.
4. Output the complete updated, ready-to-read markdown note text.`;

    try {
      const text = await generateContentWithFallback(
        ai,
        prompt,
        {
          systemInstruction:
            "You are an elite university professor. Return the full, extensively expanded textbook markdown note content with clean LaTeX formulas and clear headings.",
          maxOutputTokens: 8192,
        },
        22000
      );

      return res.json({ updatedContent: text });
    } catch (apiErr: any) {
      console.warn("Live note expansion failed, using textbook synthesizer:", apiErr?.message);
      return res.json({
        updatedContent: buildSynthesizedTextbookMarkdown(),
      });
    }
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

// Gemini Live API — Real-Time Voice & Audio Bridge via WebSocket (/live)
const wss = new WebSocketServer({ server, path: "/live" });

wss.on("connection", async (clientWs: WebSocket) => {
  console.log("Gemini Live API client connected via WebSocket");
  try {
    const ai = getAI();
    if (!ai) {
      clientWs.send(JSON.stringify({ error: "Gemini server key not configured" }));
      clientWs.close();
      return;
    }

    const session = await ai.live.connect({
      model: "gemini-3.8-live",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
        systemInstruction: "You are the ABEFA AI Academic Voice Tutor for Ethiopian Higher Education Freshman Common Courses (MoSHE/MoGE curriculum). Answer student questions accurately, concisely, and encouragingly.",
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          for (const part of message.serverContent?.modelTurn?.parts ?? []) {
            if (part.inlineData?.data) {
              clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
            }
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
          if (message.serverContent?.outputTranscription?.text) {
            clientWs.send(JSON.stringify({ transcript: message.serverContent.outputTranscription.text }));
          }
        },
        onclose: () => {
          try {
            clientWs.close();
          } catch {}
        },
        onerror: (err) => {
          console.error("Live API session error:", err);
          try {
            clientWs.send(JSON.stringify({ error: err?.message || "Live API session encountered an error" }));
          } catch {}
        },
      },
    });

    clientWs.on("message", (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
          });
        } else if (parsed.text) {
          session.sendRealtimeInput({
            text: parsed.text,
          });
        }
      } catch (err) {
        console.error("Error processing client Live message:", err);
      }
    });

    clientWs.on("close", () => {
      try {
        session.close();
      } catch {}
    });
  } catch (err: any) {
    console.error("Failed to establish Live API session:", err);
    try {
      clientWs.send(JSON.stringify({ error: err?.message || "Failed to initialize Live API session" }));
      clientWs.close();
    } catch {}
  }
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

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`ABEFA Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
