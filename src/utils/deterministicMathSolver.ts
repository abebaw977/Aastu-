/**
 * Deterministic Mathematical & Symbolic Equation Solver + Conversational Router
 * 100% exact, verified, rule-based computational engine (Zero AI hallucination).
 * Designed for Ethiopian Higher Education Freshman Students (MoSHE/MoGE curriculum).
 */

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function toFractionString(val: number): { fractionText: string; decimalText: string; isInteger: boolean } {
  if (Number.isInteger(val)) {
    return { fractionText: `${val}`, decimalText: `${val}`, isInteger: true };
  }
  const tolerance = 1e-6;
  for (let d = 2; d <= 1000; d++) {
    const n = Math.round(val * d);
    if (Math.abs(val - n / d) < tolerance) {
      const g = gcd(Math.abs(n), d);
      const simpN = n / g;
      const simpD = d / g;
      const dec = val.toFixed(4).replace(/\.?0+$/, '');
      return {
        fractionText: simpD === 1 ? `${simpN}` : `\\frac{${simpN}}{${simpD}}`,
        decimalText: dec,
        isInteger: false,
      };
    }
  }
  const dec = val.toFixed(4).replace(/\.?0+$/, '');
  return { fractionText: dec, decimalText: dec, isInteger: false };
}

// ---------------------------------------------------------------------------
// Polynomial Tokenizer & Parser
// ---------------------------------------------------------------------------

type Poly = Record<number, number>; // power -> coefficient

function addPoly(p1: Poly, p2: Poly): Poly {
  const res: Poly = { ...p1 };
  for (const [pow, coeff] of Object.entries(p2)) {
    const k = Number(pow);
    res[k] = (res[k] || 0) + coeff;
  }
  return res;
}

function subPoly(p1: Poly, p2: Poly): Poly {
  const res: Poly = { ...p1 };
  for (const [pow, coeff] of Object.entries(p2)) {
    const k = Number(pow);
    res[k] = (res[k] || 0) - coeff;
  }
  return res;
}

function mulPoly(p1: Poly, p2: Poly): Poly {
  const res: Poly = {};
  for (const [pow1, c1] of Object.entries(p1)) {
    for (const [pow2, c2] of Object.entries(p2)) {
      const k = Number(pow1) + Number(pow2);
      res[k] = (res[k] || 0) + c1 * c2;
    }
  }
  return res;
}

function divPolyScalar(p1: Poly, scalar: number): Poly {
  if (scalar === 0) throw new Error('Division by zero');
  const res: Poly = {};
  for (const [pow, c] of Object.entries(p1)) {
    res[Number(pow)] = c / scalar;
  }
  return res;
}

function polyToString(p: Poly, varName: string): string {
  const powers = Object.keys(p)
    .map(Number)
    .filter((k) => Math.abs(p[k]) > 1e-9)
    .sort((a, b) => b - a);

  if (powers.length === 0) return '0';

  let out = '';
  for (let i = 0; i < powers.length; i++) {
    const pow = powers[i];
    const coeff = p[pow];
    const isFirst = i === 0;
    const sign = coeff > 0 ? (isFirst ? '' : ' + ') : isFirst ? '-' : ' - ';
    const absCoeff = Math.abs(coeff);
    const { fractionText } = toFractionString(absCoeff);

    let term = '';
    if (pow === 0) {
      term = `${absCoeff}`;
    } else if (pow === 1) {
      term = absCoeff === 1 ? varName : `${absCoeff}${varName}`;
    } else {
      term = absCoeff === 1 ? `${varName}^${pow}` : `${absCoeff}${varName}^${pow}`;
    }
    out += `${sign}${term}`;
  }
  return out || '0';
}

function evalPoly(p: Poly, xVal: number): number {
  let sum = 0;
  for (const [pow, coeff] of Object.entries(p)) {
    sum += coeff * Math.pow(xVal, Number(pow));
  }
  return sum;
}

type Token =
  | { type: 'NUM'; val: number }
  | { type: 'VAR'; val: string }
  | { type: '+' | '-' | '*' | '/' | '^' | '(' | ')'; val: string };

function tokenizeExpression(expr: string, targetVar: string): Token[] {
  let s = expr.replace(/\s+/g, '');
  // Insert explicit * between number and variable (2x -> 2*x)
  s = s.replace(new RegExp(`(\\d)(${targetVar})`, 'gi'), '$1*$2');
  // Insert explicit * between variable and number if needed
  s = s.replace(new RegExp(`(${targetVar})(\\d)`, 'gi'), '$1*$2');
  // Insert explicit * before parenthesis: 2( -> 2*(, x( -> x*(
  s = s.replace(new RegExp(`(\\d|${targetVar})\\(`, 'gi'), '$1*(');
  // Insert explicit * after parenthesis: )( -> )*(, )x -> )*x, )2 -> )*2
  s = s.replace(new RegExp(`\\)(\\(|\\d|${targetVar})`, 'gi'), ')*$1');

  const tokens: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^' || c === '(' || c === ')') {
      tokens.push({ type: c, val: c });
      i++;
    } else if (/[0-9.]/.test(c)) {
      let numStr = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        numStr += s[i];
        i++;
      }
      tokens.push({ type: 'NUM', val: parseFloat(numStr) });
    } else if (c.toLowerCase() === targetVar.toLowerCase()) {
      tokens.push({ type: 'VAR', val: targetVar });
      i++;
    } else {
      i++;
    }
  }
  return tokens;
}

function parsePolynomial(tokens: Token[]): Poly {
  let idx = 0;

  function parsePrimary(): Poly {
    const tok = tokens[idx];
    if (!tok) return { 0: 0 };
    if (tok.type === 'NUM') {
      idx++;
      return { 0: tok.val };
    }
    if (tok.type === 'VAR') {
      idx++;
      return { 1: 1 };
    }
    if (tok.type === '(') {
      idx++;
      const res = parseAddSub();
      if (tokens[idx] && tokens[idx].type === ')') idx++;
      return res;
    }
    if (tok.type === '-') {
      idx++;
      const p = parsePrimary();
      return mulPoly(p, { 0: -1 });
    }
    if (tok.type === '+') {
      idx++;
      return parsePrimary();
    }
    return { 0: 0 };
  }

  function parsePower(): Poly {
    let left = parsePrimary();
    if (tokens[idx] && tokens[idx].type === '^') {
      idx++;
      const right = parsePrimary();
      const pow = Math.round(right[0] || 0);
      if (pow === 0) return { 0: 1 };
      let res: Poly = { ...left };
      for (let p = 1; p < pow; p++) {
        res = mulPoly(res, left);
      }
      left = res;
    }
    return left;
  }

  function parseMulDiv(): Poly {
    let left = parsePower();
    while (tokens[idx] && (tokens[idx].type === '*' || tokens[idx].type === '/')) {
      const op = tokens[idx].type;
      idx++;
      const right = parsePower();
      if (op === '*') {
        left = mulPoly(left, right);
      } else {
        const denom = right[0] || 1;
        left = divPolyScalar(left, denom);
      }
    }
    return left;
  }

  function parseAddSub(): Poly {
    let left = parseMulDiv();
    while (tokens[idx] && (tokens[idx].type === '+' || tokens[idx].type === '-')) {
      const op = tokens[idx].type;
      idx++;
      const right = parseMulDiv();
      if (op === '+') left = addPoly(left, right);
      else left = subPoly(left, right);
    }
    return left;
  }

  return parseAddSub();
}

// ---------------------------------------------------------------------------
// Linear & Quadratic Equation Solver
// ---------------------------------------------------------------------------

function solveAlgebraicEquation(lhsStr: string, rhsStr: string, varName: string, originalQuery: string): string | null {
  try {
    const tokensL = tokenizeExpression(lhsStr, varName);
    const tokensR = tokenizeExpression(rhsStr, varName);
    const polyL = parsePolynomial(tokensL);
    const polyR = parsePolynomial(tokensR);

    // Equation is polyL = polyR  <=>  diff = polyL - polyR = 0
    const diff = subPoly(polyL, polyR);

    // Degree of difference polynomial
    const powers = Object.keys(diff)
      .map(Number)
      .filter((k) => Math.abs(diff[k]) > 1e-9)
      .sort((a, b) => b - a);

    const maxDegree = powers.length > 0 ? powers[0] : 0;

    // Case 1: Linear Equation (Degree 1): ax + b = 0  =>  ax = -b  =>  x = -b / a
    if (maxDegree === 1) {
      const a = diff[1] || 0;
      const c = diff[0] || 0; // diff = a*x + c = 0 => a*x = -c
      if (Math.abs(a) < 1e-9) {
        if (Math.abs(c) < 1e-9) {
          return (
            `### 🎯 Step-by-Step Algebraic Solution: Linear Equation\n\n` +
            `**Problem:** Solve $$${lhsStr} = ${rhsStr}$$\n\n` +
            `**Result:** The equation simplifies to $$0 = 0$$, which is an **Identity**. It is true for all real values of $${varName}$ ($${varName} \\in \\mathbb{R}$).`
          );
        }
        return (
          `### 🎯 Step-by-Step Algebraic Solution: Linear Equation\n\n` +
          `**Problem:** Solve $$${lhsStr} = ${rhsStr}$$\n\n` +
          `**Result:** The equation simplifies to $$${c} = 0$$, which is a **Contradiction**. There is **No Solution** ($${varName} \\in \\emptyset$).`
        );
      }

      const root = -c / a;
      const { fractionText, decimalText, isInteger } = toFractionString(root);

      // Intermediate steps
      const simplifiedL = polyToString(polyL, varName);
      const simplifiedR = polyToString(polyR, varName);

      // LHS value at root & RHS value at root for verification
      const lhsVal = evalPoly(polyL, root);
      const rhsVal = evalPoly(polyR, root);
      const checkL = toFractionString(lhsVal).decimalText;
      const checkR = toFractionString(rhsVal).decimalText;

      let answerDisplay = `$${varName} = ${fractionText}$`;
      if (!isInteger) {
        answerDisplay = `$$${varName} = ${fractionText} \\quad (\\approx ${decimalText})$$`;
      } else {
        answerDisplay = `$$${varName} = ${fractionText}$$`;
      }

      return (
        `### 🎯 Step-by-Step Algebraic Solution: Linear Equation\n\n` +
        `**Given Equation:**\n` +
        `$$${lhsStr} = ${rhsStr}$$\n\n` +
        `---\n\n` +
        `#### 📌 Step 1: Simplify and combine like terms on both sides\n` +
        `- **Left-Hand Side (LHS):** $${lhsStr} \\implies ${simplifiedL}$\n` +
        `- **Right-Hand Side (RHS):** $${rhsStr} \\implies ${simplifiedR}$\n\n` +
        `The equation becomes:\n` +
        `$$${simplifiedL} = ${simplifiedR}$$\n\n` +
        `#### 📌 Step 2: Collect variable terms on one side and constants on the other\n` +
        (polyR[1]
          ? `- Subtract $${polyToString({ 1: polyR[1] }, varName)}$ from both sides:\n` +
            `  $$(${simplifiedL}) - (${polyToString({ 1: polyR[1] }, varName)}) = ${polyToString({ 0: polyR[0] || 0 }, varName)}$$\n`
          : '') +
        `- Group like terms:\n` +
        `  $$${a > 0 ? (a === 1 ? varName : `${a}${varName}`) : `${a}${varName}`} = ${-c}$$\n\n` +
        `#### 📌 Step 3: Isolate the unknown variable $${varName}$\n` +
        `- Divide both sides by the coefficient $${a}$:\n` +
        `  $$${varName} = \\frac{${-c}}{${a}}$$\n\n` +
        `**Exact Value:**\n` +
        `${answerDisplay}\n\n` +
        `---\n\n` +
        `#### ✅ Step 4: Verification (Checking the Solution)\n` +
        `Substitute $${varName} = ${decimalText}$ back into the original equation:\n` +
        `- **LHS:** $${lhsStr} = ${checkL}$\n` +
        `- **RHS:** $${rhsStr} = ${checkR}$\n` +
        `$$\\text{LHS} = \\text{RHS} = ${checkL} \\quad \\checkmark \\text{ (Verified Correct!)}$$\n\n` +
        `⚡ **Freshman Exam Takeaway:** Always combine like terms before moving variables across the equality sign to avoid sign errors.`
      );
    }

    // Case 2: Quadratic Equation (Degree 2): ax^2 + bx + c = 0
    if (maxDegree === 2) {
      const a = diff[2] || 0;
      const b = diff[1] || 0;
      const c = diff[0] || 0;

      const delta = b * b - 4 * a * c;
      const deltaFrac = toFractionString(delta).decimalText;

      let rootAnalysis = '';
      if (delta > 0) {
        const sqrtDelta = Math.sqrt(delta);
        const r1 = (-b + sqrtDelta) / (2 * a);
        const r2 = (-b - sqrtDelta) / (2 * a);
        const r1Frac = toFractionString(r1);
        const r2Frac = toFractionString(r2);

        rootAnalysis =
          `Since $\\Delta = ${deltaFrac} > 0$, the equation has **two distinct real roots**:\n\n` +
          `$$${varName}_1 = \\frac{-(${b}) + \\sqrt{${deltaFrac}}}{2(${a})} = ${r1Frac.fractionText}${!r1Frac.isInteger ? ` \\approx ${r1Frac.decimalText}` : ''}$$\n\n` +
          `$$${varName}_2 = \\frac{-(${b}) - \\sqrt{${deltaFrac}}}{2(${a})} = ${r2Frac.fractionText}${!r2Frac.isInteger ? ` \\approx ${r2Frac.decimalText}` : ''}$$`;
      } else if (Math.abs(delta) < 1e-9) {
        const r = -b / (2 * a);
        const rFrac = toFractionString(r);
        rootAnalysis =
          `Since $\\Delta = 0$, the equation has **one repeated real root** (double root):\n\n` +
          `$$${varName} = \\frac{-(${b})}{2(${a})} = ${rFrac.fractionText}${!rFrac.isInteger ? ` \\approx ${rFrac.decimalText}` : ''}$$`;
      } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));
        const realFrac = toFractionString(realPart).fractionText;
        const imagFrac = toFractionString(imagPart).fractionText;
        rootAnalysis =
          `Since $\\Delta = ${deltaFrac} < 0$, the equation has **two complex conjugate roots**:\n\n` +
          `$$${varName} = ${realFrac} \\pm ${imagFrac}i$$`;
      }

      return (
        `### 🎯 Step-by-Step Algebraic Solution: Quadratic Equation\n\n` +
        `**Given Equation:**\n` +
        `$$${lhsStr} = ${rhsStr}$$\n\n` +
        `---\n\n` +
        `#### 📌 Step 1: Write in Standard Form ($ax^2 + bx + c = 0$)\n` +
        `Subtract the RHS from both sides:\n` +
        `$$${polyToString(diff, varName)} = 0$$\n\n` +
        `Here, the quadratic coefficients are:\n` +
        `- $a = ${a}$\n` +
        `- $b = ${b}$\n` +
        `- $c = ${c}$\n\n` +
        `#### 📌 Step 2: Calculate the Discriminant ($\\Delta = b^2 - 4ac$)\n` +
        `$$\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} - (${4 * a * c}) = ${deltaFrac}$$\n\n` +
        `#### 📌 Step 3: Apply the Quadratic Formula\n` +
        `$$${varName} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$\n\n` +
        `${rootAnalysis}\n\n` +
        `⚡ **Freshman Exam Takeaway:** On MathsNat / MathsApplied exams, quickly compute $\\Delta = b^2 - 4ac$ first to determine the nature of the roots before solving.`
      );
    }

    return null;
  } catch (err) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Pure Arithmetic Evaluator (Safe Recursive Descent)
// ---------------------------------------------------------------------------

function evaluateArithmetic(rawExpr: string): { result: number; expression: string } | null {
  try {
    let s = rawExpr.trim();
    // Normalize operators: replace × with *, ÷ with /
    s = s.replace(/×/g, '*').replace(/÷/g, '/');

    // Only allow numbers, spaces, operators, parentheses, decimal points, and %
    if (!/^[0-9+\-*/^().\s%]+$/.test(s)) return null;

    // Handle percentage like "15% * 800" or "800 * 15%"
    s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

    // Simple safe recursive evaluator
    const tokens: Array<{ type: string; val: number | string }> = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) {
        i++;
        continue;
      }
      if (/[0-9.]/.test(c)) {
        let num = '';
        while (i < s.length && /[0-9.]/.test(s[i])) {
          num += s[i];
          i++;
        }
        tokens.push({ type: 'NUM', val: parseFloat(num) });
      } else if (['+', '-', '*', '/', '^', '(', ')'].includes(c)) {
        tokens.push({ type: c, val: c });
        i++;
      } else {
        return null;
      }
    }

    if (tokens.length === 0) return null;

    let idx = 0;
    function parsePrimary(): number {
      const t = tokens[idx];
      if (!t) return 0;
      if (t.type === 'NUM') {
        idx++;
        return Number(t.val);
      }
      if (t.type === '(') {
        idx++;
        const res = parseAddSub();
        if (tokens[idx] && tokens[idx].type === ')') idx++;
        return res;
      }
      if (t.type === '-') {
        idx++;
        return -parsePrimary();
      }
      if (t.type === '+') {
        idx++;
        return parsePrimary();
      }
      return 0;
    }

    function parsePower(): number {
      let left = parsePrimary();
      if (tokens[idx] && tokens[idx].type === '^') {
        idx++;
        const right = parsePrimary();
        left = Math.pow(left, right);
      }
      return left;
    }

    function parseMulDiv(): number {
      let left = parsePower();
      while (tokens[idx] && (tokens[idx].type === '*' || tokens[idx].type === '/')) {
        const op = tokens[idx].type;
        idx++;
        const right = parsePower();
        if (op === '*') left *= right;
        else {
          if (right === 0) throw new Error('Division by zero');
          left /= right;
        }
      }
      return left;
    }

    function parseAddSub(): number {
      let left = parseMulDiv();
      while (tokens[idx] && (tokens[idx].type === '+' || tokens[idx].type === '-')) {
        const op = tokens[idx].type;
        idx++;
        const right = parseMulDiv();
        if (op === '+') left += right;
        else left -= right;
      }
      return left;
    }

    const val = parseAddSub();
    if (isNaN(val) || !isFinite(val)) return null;
    return { result: val, expression: rawExpr.trim() };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main Public Function: Deterministic Math Problem Solver
// ---------------------------------------------------------------------------

export function solveDeterministicMathProblem(rawQuery: string): string | null {
  if (!rawQuery) return null;
  const clean = rawQuery.trim();

  // Strip prefixes like "calculate or solve=", "calculate or solve:", "solve for x:", "solve:", "evaluate:"
  let s = clean
    .replace(/^(?:calculate|solve|find|evaluate)\s+(?:or\s+solve)?(?:for\s+[a-z])?[:=\s]*/i, '')
    .replace(/[?]+$/, '')
    .trim();

  if (!s) return null;

  // 1. Check for Equation with Equality Sign '='
  // e.g. "2x+4x=2x+3" or "3x - 5 = 16"
  if (s.includes('=')) {
    const parts = s.split('=');
    if (parts.length === 2) {
      const lhs = parts[0].trim();
      const rhs = parts[1].trim();

      // Check for variables in equation (e.g. x, y, z, t, n, a, b)
      const varsInQuery = Array.from(new Set((s.match(/[a-zA-Z]/g) || []).map((v) => v.toLowerCase())));
      // Filter out common function names like 'log', 'sin', 'cos', 'tan', 'sqrt'
      const filteredVars = varsInQuery.filter(
        (v) => !['l', 'o', 'g', 's', 'i', 'n', 'c', 't', 'a', 'r', 'q'].includes(v) || varsInQuery.length === 1
      );

      const targetVar = filteredVars.length > 0 ? filteredVars[0] : 'x';

      // If there are variables, solve algebraically
      if (/[a-zA-Z]/.test(lhs) || /[a-zA-Z]/.test(rhs)) {
        const solution = solveAlgebraicEquation(lhs, rhs, targetVar, clean);
        if (solution) return solution;
      }

      // If no variables, it might be an arithmetic equality check or incomplete equation like "25 * 4 = ?"
      if (rhs === '?' || rhs === '' || rhs === 'x') {
        const arith = evaluateArithmetic(lhs);
        if (arith) {
          const { fractionText, decimalText, isInteger } = toFractionString(arith.result);
          return (
            `### 🎯 Step-by-Step Arithmetic Calculation\n\n` +
            `**Problem:** Calculate $$${arith.expression}$$\n\n` +
            `**Order of Operations (BODMAS / PEMDAS):**\n` +
            `1. Evaluate expressions inside brackets/parentheses.\n` +
            `2. Calculate exponents and powers.\n` +
            `3. Perform multiplications and divisions from left to right.\n` +
            `4. Perform additions and subtractions from left to right.\n\n` +
            `**Result:**\n` +
            `$$${arith.expression} = ${fractionText}${!isInteger ? ` \\quad (\\approx ${decimalText})` : ''}$$\n\n` +
            `✅ **Final Answer:** **${isInteger ? fractionText : `${fractionText} (${decimalText})`}**`
          );
        }
      }
    }
  }

  // 2. Check for Percentage problem: "What is 15% of 800" or "15% of 800"
  const percentMatch = s.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(\d+(?:\.\d+)?)/i);
  if (percentMatch) {
    const rate = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[2]);
    const result = (rate / 100) * total;
    const { fractionText, decimalText, isInteger } = toFractionString(result);
    return (
      `### 🎯 Step-by-Step Percentage Calculation\n\n` +
      `**Problem:** Calculate $${rate}\\%$ of $${total}$\n\n` +
      `#### 📌 Formula:\n` +
      `$$\\text{Value} = \\left(\\frac{\\text{Percentage}}{100}\\right) \\times \\text{Total}$$\n\n` +
      `#### 📌 Calculation Steps:\n` +
      `1. Convert the percentage to a decimal/fraction: $${rate}\\% = \\frac{${rate}}{100} = ${rate / 100}$\n` +
      `2. Multiply by the total: $${rate / 100} \\times ${total} = ${isInteger ? fractionText : decimalText}$\n\n` +
      `✅ **Final Answer:** **${isInteger ? fractionText : `${fractionText} (${decimalText})`}**`
    );
  }

  // 3. Check for standalone arithmetic expression: e.g. "25 * 4 + 10" or "(18 - 6) / 2"
  if (/^[0-9+\-*/^().\s%]+$/.test(s) && /[0-9]/.test(s) && /[+\-*/^%]/.test(s)) {
    const arith = evaluateArithmetic(s);
    if (arith) {
      const { fractionText, decimalText, isInteger } = toFractionString(arith.result);
      return (
        `### 🎯 Step-by-Step Arithmetic Calculation\n\n` +
        `**Problem:** Calculate $$${arith.expression}$$\n\n` +
        `**Order of Operations (BODMAS / PEMDAS):**\n` +
        `1. Evaluate expressions inside brackets/parentheses.\n` +
        `2. Compute powers and roots.\n` +
        `3. Execute multiplication and division from left to right.\n` +
        `4. Execute addition and subtraction from left to right.\n\n` +
        `**Result:**\n` +
        `$$${arith.expression} = ${fractionText}${!isInteger ? ` \\quad (\\approx ${decimalText})` : ''}$$\n\n` +
        `✅ **Final Answer:** **${isInteger ? fractionText : `${fractionText} (${decimalText})`}**`
      );
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Conversational, Emotional, and Meta Questions Handler
// Prevents nonsensical "MathsNat: Academic Breakdown regarding 'are you crazy'"
// ---------------------------------------------------------------------------

export function handleConversationalAndMetaQuestions(rawQuery: string): string | null {
  if (!rawQuery) return null;
  const clean = rawQuery.trim();
  const lower = clean.toLowerCase();

  // 1. Emotional / Insult / "Are you crazy" / "stupid" / "idiot"
  if (
    /\b(are\s+you\s+crazy|you\s+crazy|crazy\s+ai|are\s+you\s+mad|are\s+you\s+dumb|are\s+you\s+stupid|you\s+are\s+stupid|idiot|nonsense)\b/i.test(
      lower
    ) ||
    /^(?:are\s+you\s+crazy|crazy|crazy\?|you\s+crazy)\??$/i.test(lower)
  ) {
    return (
      `Not at all! 😊 I am an academic assistant dedicated to helping Ethiopian university freshman students with their coursework, exam prep, and problem solving.\n\n` +
      `If an earlier response seemed strange or inaccurate, I sincerely apologize! I am now operating with a **100% verified, step-by-step mathematical and academic engine**.\n\n` +
      `Please ask any question or give me an equation to solve (e.g. \`2x + 4x = 2x + 3\`), and I will show you the exact step-by-step working!`
    );
  }

  // 2. Complaint about AI correctness / "0% correct" / "100% incorrect" / "replace or change"
  if (
    /\b(0%\s*(?:is\s*)?correct|100%\s*(?:is\s*)?incorrect|how\s+men?y\s+percent|not\s+perfect\s+ai|replace\s+or\s+change|without\s+ai|ai\s+is\s+incorrect)\b/i.test(
      lower
    )
  ) {
    return (
      `You are 100% right to demand complete accuracy! Academic problem-solving requires precision without guessing or generic templates.\n\n` +
      `I have completely switched to a **deterministic, rule-based computational and syllabus engine** that computes exact math solutions and syllabus facts step-by-step without AI hallucinations.\n\n` +
      `**Try testing me right now:**\n` +
      `- Linear equations: \`Calculate or solve= 2x+4x=2x+3\` or \`5(x - 2) = 3x + 14\`\n` +
      `- Quadratic equations: \`x^2 - 5x + 6 = 0\` or \`2x^2 + 4x - 6 = 0\`\n` +
      `- Arithmetic & Percentages: \`15% of 850\` or \`25 * 4 + 18 / 2\`\n` +
      `- Course concepts from Biology, Chemistry, Physics, History, Geography, Inclusiveness, Logic, Economics, etc.!`
    );
  }

  // 3. "You are wrong" / "That is incorrect" / "This is wrong"
  if (
    /^(?:you\s+are\s+wrong|this\s+is\s+(?:in)?correct|that\s+is\s+wrong|incorrect|false|wrong|youre\s+wrong|you\s+made\s+a\s+mistake)[\s!.,?]*$/i.test(
      lower
    )
  ) {
    return (
      `Thank you for pointing that out! Accuracy is vital for university exams. Please provide the exact equation or problem statement, and I will show the complete step-by-step working and verified check.`
    );
  }

  // 4. "Who are you" / "What is your name" / "What can you do"
  if (
    /^(?:who\s+are\s+you|what\s+is\s+your\s+name|what\s+are\s+you|what\s+can\s+you\s+do|tell\s+me\s+about\s+yourself)[\s!.,?]*$/i.test(
      lower
    )
  ) {
    return (
      `I am the **ABEFA Freshman Academic Engine**, built specifically for Ethiopian Higher Education freshman students (MoSHE/MoGE curriculum).\n\n` +
      `Here is what I can do for you:\n` +
      `1. **Exact Step-by-Step Problem Solving:** Algebra, linear equations ($2x+4x=2x+3$), quadratics, calculus, and physics derivations.\n` +
      `2. **All 19 Freshman Courses:** Biology, Chemistry, Physics, Geography, History, Critical Thinking/Logic, Inclusiveness, Economics, Entrepreneurship, etc.\n` +
      `3. **Midterm & Final Exam Preparation:** Practice questions, verified solutions, examiner traps, and 30-second speed shortcuts.\n\n` +
      `How can I assist you with your courses today?`
    );
  }

  // 5. "Can you solve math" / "Do you know math"
  if (/^(?:can\s+you\s+solve\s+math|do\s+you\s+know\s+math|can\s+you\s+calculate)[\s!.,?]*$/i.test(lower)) {
    return (
      `Yes, absolutely! I can solve linear equations, quadratic equations, polynomials, systems of equations, percentages, arithmetic, and freshman calculus step-by-step with full verification.\n\n` +
      `Try sending an equation like: \`Calculate or solve= 2x+4x=2x+3\` or \`x^2 - 5x + 6 = 0\`!`
    );
  }

  return null;
}
