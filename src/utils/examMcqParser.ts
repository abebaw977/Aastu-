export interface ParsedMcqItem {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ParsedMcqBatchResult {
  detectedTitle?: string;
  questions: ParsedMcqItem[];
  warnings: string[];
  formatDetected: 'json' | 'markdown' | 'empty';
}

export const SAMPLE_README_MCQ_TEMPLATE = `# Calculus I — Midterm Practice Exam

1. Evaluate $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.
A) $0$
B) $1$
C) $5$
D) Does not exist
Answer: C
Explanation: Using the standard trigonometric limit $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$, rewrite as $5 \\cdot \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = 5(1) = 5$.

---

2. Find the derivative of $f(x) = x^3 + 4x - 7$ at $x = 2$.
A) $12$
B) $16$
C) $8$
D) $19$
Answer: B
Explanation: $f'(x) = 3x^2 + 4$, so $f'(2) = 3(4) + 4 = 16$.

---

3. Which of the following matrices is singular (non-invertible)?
- [ ] $\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$
- [x] $\\begin{pmatrix} 2 & 4 \\\\ 1 & 2 \\end{pmatrix}$
- [ ] $\\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$
- [ ] $\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$
Explanation: A $2\\times 2$ matrix is singular when its determinant equals $0$: $(2)(2) - (4)(1) = 0$.
`;

function letterToIndex(letter: string): number {
  const upper = letter.trim().toUpperCase();
  const code = upper.charCodeAt(0) - 65;
  return code >= 0 && code <= 5 ? code : -1;
}

function cleanMarkdownInline(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/^\s*[-*]{3,}\s*$/gm, '')
    .trim();
}

function resolveCorrectAnswerIndex(
  rawValue: unknown,
  options: string[]
): number {
  if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
    const idx = Math.trunc(rawValue);
    if (idx >= 0 && idx < options.length) return idx;
    if (idx >= 1 && idx <= options.length) return idx - 1;
    return 0;
  }

  const str = String(rawValue ?? '').trim();
  if (!str) return 0;

  // Match explicit option letter: "B", "B)", "(B)", "Option B", "B. text"
  const letterMatch = str.match(/^(?:option\s*)?\(?([A-Fa-f])\)?(?:[.):\s]|$)/);
  if (letterMatch) {
    const idx = letterToIndex(letterMatch[1]);
    if (idx >= 0 && idx < options.length) return idx;
  }

  // Exact numeric string
  if (/^\d+$/.test(str)) {
    const num = Number(str);
    // Check if an option literally equals the number first
    const literalIdx = options.findIndex((o) => o.trim() === str);
    if (literalIdx >= 0) return literalIdx;
    if (num >= 1 && num <= options.length) return num - 1;
    if (num >= 0 && num < options.length) return num;
  }

  // Match option text directly (case-insensitive)
  const lower = str.toLowerCase();
  const exactIdx = options.findIndex((o) => o.trim().toLowerCase() === lower);
  if (exactIdx >= 0) return exactIdx;

  const partialIdx = options.findIndex(
    (o) => lower.length >= 3 && o.toLowerCase().includes(lower)
  );
  if (partialIdx >= 0) return partialIdx;

  return 0;
}

function normalizeJsonItem(raw: any): ParsedMcqItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const question = String(
    raw.question ?? raw.prompt ?? raw.stem ?? raw.q ?? raw.text ?? ''
  ).trim();
  if (!question) return null;

  let options: string[] = [];
  const rawOptions = raw.options ?? raw.choices ?? raw.answers ?? raw.alternatives;

  if (Array.isArray(rawOptions)) {
    options = rawOptions
      .map((opt: any) => {
        if (typeof opt === 'string') return opt.trim();
        if (opt && typeof opt === 'object') {
          return String(opt.text ?? opt.label ?? opt.value ?? '').trim();
        }
        return String(opt ?? '').trim();
      })
      .filter(Boolean);
  } else if (rawOptions && typeof rawOptions === 'object') {
    const orderedKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (const k of orderedKeys) {
      if (rawOptions[k] !== undefined && String(rawOptions[k]).trim()) {
        options.push(String(rawOptions[k]).trim());
      }
    }
    if (options.length === 0) {
      options = Object.values(rawOptions)
        .map((v) => String(v ?? '').trim())
        .filter(Boolean);
    }
  }

  if (options.length < 2) return null;
  options = options.slice(0, 6);

  // Strip leading "A) " / "A. " prefixes if included inside JSON option strings
  options = options.map((opt) =>
    opt.replace(/^(?:\(?[A-Fa-f][).:\]]\s+)/, '').trim()
  );

  const rawAnswer =
    raw.correctAnswer ?? raw.correct_answer ?? raw.answer ?? raw.correct ?? raw.key ?? raw.ans;
  const correctAnswer = resolveCorrectAnswerIndex(rawAnswer, options);

  const explanation = String(
    raw.explanation ?? raw.solution ?? raw.rationale ?? raw.reason ?? raw.note ?? ''
  ).trim();

  return {
    question: question.slice(0, 4000),
    options: options.map((o) => o.slice(0, 600)),
    correctAnswer,
    explanation: explanation.slice(0, 4000),
  };
}

function tryParseJsonPayload(input: string): ParsedMcqBatchResult | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const jsonCandidates: string[] = [];

  // Extract fenced JSON / MCQ code blocks if present
  const fenceRegex = /```(?:json|mcq|javascript|js|ts|typescript)?\s*([\s\S]*?)```/gi;
  let match: RegExpExecArray | null;
  while ((match = fenceRegex.exec(trimmed)) !== null) {
    if (match[1]?.trim()) {
      jsonCandidates.push(match[1].trim());
    }
  }

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    jsonCandidates.unshift(trimmed);
  }

  const allQuestions: ParsedMcqItem[] = [];
  const warnings: string[] = [];
  let detectedTitle: string | undefined;

  for (const candidate of jsonCandidates) {
    try {
      const parsed = JSON.parse(candidate);
      let list: any[] = [];
      if (Array.isArray(parsed)) {
        list = parsed;
      } else if (parsed && typeof parsed === 'object') {
        if (typeof parsed.title === 'string' && parsed.title.trim()) {
          detectedTitle = parsed.title.trim();
        }
        if (Array.isArray(parsed.questions)) {
          list = parsed.questions;
        } else if (Array.isArray(parsed.mcqs)) {
          list = parsed.mcqs;
        } else if (Array.isArray(parsed.items)) {
          list = parsed.items;
        } else if (parsed.question || parsed.prompt || parsed.stem) {
          list = [parsed];
        }
      }

      list.forEach((item, idx) => {
        const normalized = normalizeJsonItem(item);
        if (normalized) {
          allQuestions.push(normalized);
        } else {
          warnings.push(`Skipped JSON item #${idx + 1} (missing question or at least 2 options).`);
        }
      });
    } catch {
      // Not valid JSON, fall back to Markdown/README parser
    }
  }

  if (allQuestions.length > 0) {
    return {
      detectedTitle,
      questions: allQuestions,
      warnings,
      formatDetected: 'json',
    };
  }

  return null;
}

/**
 * Splits a single line if options were pasted inline like:
 * "A) Force  B) Mass  C) Velocity  D) Acceleration"
 */
function expandInlineOptions(line: string): string[] {
  const inlineMatches = line.match(/(?:^|\s)\(?[A-Da-d][).]\s+/g);
  if (inlineMatches && inlineMatches.length >= 2) {
    const parts = line
      .split(/(?=(?:^|\s)\(?[A-Fa-f][).]\s+)/g)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length >= 2) return parts;
  }
  return [line];
}

export function parseMcqsFromReadmeOrCode(rawInput: string): ParsedMcqBatchResult {
  const raw = String(rawInput || '').replace(/\r\n/g, '\n').trim();
  if (!raw) {
    return { questions: [], warnings: [], formatDetected: 'empty' };
  }

  // 1. Check JSON / fenced JSON blocks first
  const jsonResult = tryParseJsonPayload(raw);
  if (jsonResult && jsonResult.questions.length > 0) {
    return jsonResult;
  }

  // 2. Markdown / README / Structured MCQ Text Parser
  const rawLines = raw.split('\n');
  const lines: string[] = [];
  for (const l of rawLines) {
    const expanded = expandInlineOptions(l);
    lines.push(...expanded);
  }

  let detectedTitle: string | undefined;
  const warnings: string[] = [];
  const questions: ParsedMcqItem[] = [];

  interface DraftQuestion {
    questionLines: string[];
    options: string[];
    markedCorrectIndex: number | null;
    answerRaw: string;
    explanationLines: string[];
    stage: 'stem' | 'options' | 'explanation';
  }

  let current: DraftQuestion | null = null;
  let insideFence = false;

  const finalizeCurrent = () => {
    if (!current) return;
    const questionText = cleanMarkdownInline(current.questionLines.join('\n'));
    const cleanOptions = current.options
      .map((o) => cleanMarkdownInline(o))
      .filter(Boolean)
      .slice(0, 6);

    if (!questionText && cleanOptions.length === 0) {
      current = null;
      return;
    }

    if (!questionText) {
      warnings.push('Skipped an entry without question text.');
      current = null;
      return;
    }

    if (cleanOptions.length < 2) {
      warnings.push(`Skipped question "${questionText.slice(0, 50)}..." (needs at least 2 options A–D).`);
      current = null;
      return;
    }

    let correctAnswer = 0;
    if (current.markedCorrectIndex !== null && current.markedCorrectIndex < cleanOptions.length) {
      correctAnswer = current.markedCorrectIndex;
    } else if (current.answerRaw.trim()) {
      correctAnswer = resolveCorrectAnswerIndex(current.answerRaw, cleanOptions);
    } else {
      warnings.push(
        `Question ${questions.length + 1} ("${questionText.slice(0, 40)}...") had no Answer line — defaulted to Option A.`
      );
    }

    const explanation = cleanMarkdownInline(current.explanationLines.join('\n'));

    questions.push({
      question: questionText.slice(0, 4000),
      options: cleanOptions.map((o) => o.slice(0, 600)),
      correctAnswer,
      explanation: explanation.slice(0, 4000),
    });

    current = null;
  };

  // Patterns
  const questionStartPattern =
    /^(?:#{1,4}\s*)?(?:\*{1,2})?(?:(?:Question|Q)\s*#?\s*\d+|\d+)(?:\*{1,2})?\s*[.):\-]\s*(.*)$/i;
  const questionHeaderOnlyPattern =
    /^(?:#{1,4}\s*)?(?:\*{1,2})?(?:Question|Q)\s*#?\s*(\d+)\s*(?:\*{1,2})?$/i;
  const checkboxOptionPattern = /^\s*[-*]\s*\[([xX ])\]\s+(.+)$/;
  const labeledOptionPattern =
    /^\s*(?:[-*•]\s*)?(\*?)\s*(?:\*{1,2})?\(?([A-Fa-f])(?:\*{1,2})?[).:\]]\s*(?:\*{1,2})?\s*(.+)$/;
  const answerLinePattern =
    /^\s*(?:[-*•]\s*)?(?:\*{1,2})?(?:Correct\s*Answer|Correct\s*Option|Answer|Ans|Key|Correct)(?:\*{1,2})?\s*[:=\-]\s*(?:\*{1,2})?(.+?)(?:\*{1,2})?\s*$/i;
  const explanationLinePattern =
    /^\s*(?:[-*•]\s*)?(?:\*{1,2})?(?:Explanation|Solution|Rationale|Reason|Hint|Note)(?:\*{1,2})?\s*[:=\-]\s*(?:\*{1,2})?(.*)$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      insideFence = !insideFence;
      if (current) {
        if (current.stage === 'explanation') {
          current.explanationLines.push(line);
        } else if (current.stage === 'stem') {
          current.questionLines.push(line);
        }
      }
      continue;
    }

    if (insideFence) {
      if (current) {
        if (current.stage === 'explanation') {
          current.explanationLines.push(line);
        } else if (current.stage === 'options' && current.options.length > 0) {
          current.options[current.options.length - 1] += `\n${line}`;
        } else {
          current.questionLines.push(line);
        }
      }
      continue;
    }

    // Horizontal divider separates questions
    if (/^[-*_]{3,}$/.test(trimmed)) {
      if (current && current.options.length >= 2) {
        finalizeCurrent();
      }
      continue;
    }

    // Detect document title before any question begins
    if (!current && questions.length === 0) {
      const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
      if (headingMatch && !questionStartPattern.test(trimmed) && !questionHeaderOnlyPattern.test(trimmed)) {
        if (!detectedTitle) detectedTitle = headingMatch[1].replace(/\*{1,2}/g, '').trim();
        continue;
      }
      const titleFieldMatch = trimmed.match(/^(?:\*{1,2})?(?:Title|Exam|Test|Topic)(?:\*{1,2})?\s*:\s*(.+)$/i);
      if (titleFieldMatch) {
        if (!detectedTitle) detectedTitle = titleFieldMatch[1].trim();
        continue;
      }
    }

    // 1. Check Explanation line
    const expMatch = trimmed.match(explanationLinePattern);
    if (expMatch && current && current.options.length > 0) {
      current.stage = 'explanation';
      if (expMatch[1]?.trim()) {
        current.explanationLines.push(expMatch[1].trim());
      }
      continue;
    }

    // 2. Check Answer line
    const ansMatch = trimmed.match(answerLinePattern);
    if (ansMatch && current && current.options.length > 0) {
      current.answerRaw = ansMatch[1].trim();
      continue;
    }

    // 3. Check Question Start (e.g., "1. ...", "Q2: ...", "**3.** ...")
    // Guard against matching a numbered formula inside an explanation unless options were already collected cleanly
    const qStartMatch = trimmed.match(questionStartPattern);
    const qHeaderOnlyMatch = trimmed.match(questionHeaderOnlyPattern);
    if (
      (qStartMatch || qHeaderOnlyMatch) &&
      (!current || current.options.length >= 2 || (current.stage === 'stem' && current.questionLines.length === 0))
    ) {
      if (current && current.options.length >= 2) {
        finalizeCurrent();
      } else if (current && current.options.length === 0 && current.questionLines.length > 0) {
        // Previous block had no options — finalize (will log warning) and start new
        finalizeCurrent();
      }

      const stemText = (qStartMatch?.[1] || '').replace(/^\*{1,2}|\*{1,2}$/g, '').trim();
      current = {
        questionLines: stemText ? [stemText] : [],
        options: [],
        markedCorrectIndex: null,
        answerRaw: '',
        explanationLines: [],
        stage: 'stem',
      };
      continue;
    }

    if (!current) {
      // Ignore stray markdown metadata lines before Q1
      continue;
    }

    // 4. Check Markdown checkbox options: "- [x] ..." / "- [ ] ..."
    const cbMatch = line.match(checkboxOptionPattern);
    if (cbMatch && current.stage !== 'explanation') {
      current.stage = 'options';
      const isChecked = cbMatch[1].toLowerCase() === 'x';
      const optIdx = current.options.length;
      let optText = cbMatch[2].trim();
      optText = optText.replace(/^(?:\(?[A-Fa-f][).:\]]\s+)/, '').trim();
      if (isChecked) {
        current.markedCorrectIndex = optIdx;
      }
      current.options.push(optText);
      continue;
    }

    // 5. Check labeled options: "A) ...", "B. ...", "(C) ...", "*D. ..."
    const optMatch = line.match(labeledOptionPattern);
    if (optMatch && current.stage !== 'explanation') {
      const starPrefix = optMatch[1];
      const letter = optMatch[2];
      let optText = optMatch[3].trim();
      const letterIdx = letterToIndex(letter);

      // Verify sequential or standard A-F label so regular sentences starting with "A. " inside stem aren't confused unless they fit
      const isLikelyOption =
        current.stage === 'options' ||
        letterIdx === 0 ||
        letterIdx === current.options.length;

      if (isLikelyOption) {
        current.stage = 'options';
        let isMarkedCorrect = Boolean(starPrefix);
        if (/\s*(?:\[correct\]|\(correct\)|✓|✔|✅)\s*$/i.test(optText)) {
          isMarkedCorrect = true;
          optText = optText
            .replace(/\s*(?:\[correct\]|\(correct\)|✓|✔|✅)\s*$/gi, '')
            .trim();
        }
        const optIdx = current.options.length;
        if (isMarkedCorrect) {
          current.markedCorrectIndex = optIdx;
        }
        current.options.push(optText);
        continue;
      }
    }

    // 6. Append line to active stage
    if (!trimmed) {
      if (current.stage === 'explanation' && current.explanationLines.length > 0) {
        current.explanationLines.push('');
      }
      continue;
    }

    if (current.stage === 'explanation') {
      current.explanationLines.push(trimmed);
    } else if (current.stage === 'options' && current.options.length > 0) {
      // Continuation line of last option
      current.options[current.options.length - 1] += ` ${trimmed}`;
    } else {
      current.questionLines.push(trimmed);
    }
  }

  finalizeCurrent();

  return {
    detectedTitle,
    questions,
    warnings,
    formatDetected: questions.length > 0 ? 'markdown' : 'empty',
  };
}
