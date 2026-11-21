import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  /** Text that can contain inline math ($...$ or \(...\)), block math ($$...$$ or \[...\]), or full Markdown/README syntax */
  text?: string;
  /** Alias for text prop used across module components */
  content?: string;
  /** Explicit LaTeX formula string to render directly */
  latex?: string;
  /** Whether to render in display (block) mode or inline mode */
  displayMode?: boolean;
  /** Optional custom class name */
  className?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const KNOWN_LATEX_COMMANDS = [
  'frac', 'dfrac', 'tfrac', 'cfrac', 'sqrt', 'root', 'overline', 'underline', 'widetilde', 'widehat',
  'vec', 'bar', 'hat', 'tilde', 'dot', 'ddot', 'mathbf', 'mathrm', 'mathbb', 'mathcal', 'mathsf', 'mathtt', 'mathfrak', 'mathscr',
  'text', 'textbf', 'textit', 'textrm', 'textup', 'texttt', 'textnormal', 'textsf', 'textsc', 'mbox', 'hbox',
  'boldsymbol', 'bm', 'pmb', 'operatorname', 'ce', 'pu',
  'theta', 'vartheta', 'Delta', 'Omega', 'Lambda', 'Sigma', 'Pi', 'Phi', 'Psi', 'Gamma', 'Theta', 'Xi', 'Upsilon',
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'iota', 'kappa', 'lambda',
  'mu', 'nu', 'xi', 'pi', 'varpi', 'rho', 'varrho', 'sigma', 'varsigma', 'tau', 'upsilon', 'phi', 'varphi', 'chi', 'psi', 'omega',
  'sum', 'int', 'iint', 'iiint', 'oint', 'oiint', 'idotsint', 'lim', 'limsup', 'liminf', 'prod', 'coprod',
  'left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'middle', 'langle', 'rangle', 'lfloor', 'rfloor', 'lceil', 'rceil', 'lvert', 'rvert', 'lVert', 'rVert', 'vert', 'Vert',
  'cdot', 'cdots', 'ldots', 'dots', 'vdots', 'ddots', 'times', 'div', 'pm', 'mp', 'ast', 'star', 'circ', 'bullet', 'oplus', 'otimes', 'bigoplus', 'bigotimes',
  'le', 'leq', 'ge', 'geq', 'neq', 'ne', 'not', 'approx', 'equiv', 'cong', 'sim', 'simeq', 'asymp', 'doteq', 'propto', 'll', 'gg', 'prec', 'succ',
  'infty', 'partial', 'nabla', 'hbar', 'ell', 'Re', 'Im', 'wp', 'aleph', 'beth', 'gimel', 'prime', 'backprime', 'degree', 'celsius', 'angstrom',
  'in', 'notin', 'ni', 'subset', 'subseteq', 'subsetneq', 'supset', 'supseteq', 'supsetneq', 'sqsubset', 'sqsupset', 'cup', 'cap', 'bigcup', 'bigcap', 'bigsqcup', 'biguplus', 'bigvee', 'bigwedge', 'setminus', 'smallsetminus', 'complement', 'emptyset', 'varnothing',
  'forall', 'exists', 'nexists', 'neg', 'lnot', 'land', 'lor', 'implies', 'impliedby', 'iff', 'therefore', 'because',
  'to', 'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow', 'leftrightarrow', 'Leftrightarrow', 'rightleftharpoons', 'xrightarrow', 'xleftarrow', 'mapsto', 'longmapsto', 'uparrow', 'downarrow', 'updownarrow', 'nearrow', 'searrow',
  'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'arcsec', 'arccsc', 'arccot', 'sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch',
  'ln', 'log', 'lg', 'exp', 'min', 'max', 'argmax', 'argmin', 'sup', 'inf', 'det', 'tr', 'rank', 'span', 'proj', 'comp', 'grad', 'curl', 'dim', 'ker', 'deg', 'gcd', 'lcm', 'arg', 'Pr', 'mod', 'pmod', 'bmod',
  'binom', 'tbinom', 'dbinom', 'choose', 'over', 'atop', 'stackrel', 'overset', 'underset', 'overbrace', 'underbrace',
  'begin', 'end', 'matrix', 'pmatrix', 'bmatrix', 'vmatrix', 'Vmatrix', 'cases', 'aligned', 'align', 'array', 'gathered', 'gather', 'equation', 'split', 'eqnarray',
  'triangle', 'angle', 'perp', 'parallel', 'mid', 'nmid', 'quad', 'qquad', 'boxed', 'cancel', 'bcancel', 'xcancel', 'color', 'phantom', 'displaystyle', 'limits', 'nolimits', 'checkmark', 'dagger', 'ddagger',
  'R', 'N', 'Z', 'Q', 'C', 'F', 'dx', 'dy', 'dz', 'dt', 'du', 'dv', 'dr', 'ds'
];

const KATEX_MACROS: Record<string, string> = {
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\C': '\\mathbb{C}',
  '\\F': '\\mathbb{F}',
  '\\dx': '\\,dx',
  '\\dy': '\\,dy',
  '\\dz': '\\,dz',
  '\\dt': '\\,dt',
  '\\du': '\\,du',
  '\\dv': '\\,dv',
  '\\dr': '\\,dr',
  '\\ds': '\\displaystyle',
  '\\grad': '\\nabla',
  '\\curl': '\\nabla\\times',
  '\\divg': '\\nabla\\cdot',
  '\\bm': '\\boldsymbol',
  '\\bold': '\\mathbf',
  '\\abs': '\\left|#1\\right|',
  '\\norm': '\\left\\|#1\\right\\|',
  '\\degree': '^\\circ',
  '\\angstrom': '\\text{\\AA}',
};

const KNOWN_LATEX_CMD_REGEX = new RegExp(
  `\\\\\\\\(?=(?:${KNOWN_LATEX_COMMANDS.join('|')})\\b)`,
  'g'
);

/**
 * Converts \ce{...} chemistry expressions into standard KaTeX-compatible LaTeX
 */
function convertChemCeToLatex(input: string): string {
  return input.replace(/\\ce\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (_, chemBody: string) => {
    let c = chemBody.trim();
    c = c.replace(/<=>/g, ' \\rightleftharpoons ');
    c = c.replace(/<-->/g, ' \\leftrightarrow ');
    c = c.replace(/->/g, ' \\rightarrow ');
    c = c.replace(/<-/g, ' \\leftarrow ');
    // Convert simple element subscripts like H2O, CH3, SO4 into H_2O, CH_3, SO_4
    c = c.replace(/([A-Za-z)\]])(\d+)/g, '$1_{$2}');
    return c;
  });
}

function normalizeLatexEnvironments(input: string): string {
  return input
    .replace(/\\begin\{align\*?\}/g, '\\begin{aligned}')
    .replace(/\\end\{align\*?\}/g, '\\end{aligned}')
    .replace(/\\begin\{eqnarray\*?\}/g, '\\begin{aligned}')
    .replace(/\\end\{eqnarray\*?\}/g, '\\end{aligned}')
    .replace(/\\begin\{gather\*?\}/g, '\\begin{gathered}')
    .replace(/\\end\{gather\*?\}/g, '\\end{gathered}')
    .replace(/\\begin\{equation\*?\}/g, '')
    .replace(/\\end\{equation\*?\}/g, '')
    .replace(/\\mathbbm\{1\}/g, '\\mathbf{1}');
}

/**
 * Repairs LaTeX strings that were corrupted by JSON escape sequences (\f -> \x0c, \t -> \x09, \b -> \x08, \r -> \x0d)
 * or double-escaped backslashes (\\frac -> \frac) or triple dollar signs ($$$).
 */
export function repairCorruptedLatex(input: string): string {
  if (!input) return '';
  let s = input;

  // 1. Restore control characters produced when JSON.parse ate \f, \b, \t, \r in LaTeX commands
  s = s.replace(/\x0c(rac|orall|lat|rown)/g, '\\f$1');
  s = s.replace(/\x08(ar|eta|egin|inom|oxed|ullet|ig|ackslash|ecause|ot|owtie|igg|mod)/g, '\\b$1');
  s = s.replace(/\x09(heta|au|an|anh|imes|ext|extbf|extit|extrm|extup|exttt|extnormal|extsf|extsc|ilde|o\b|op\b|riangle|frac|herefore|r\b)/g, '\\t$1');
  s = s.replace(/\x0d(?!\n)(ight|ho|angle|ceil|floor|brace|brack|vert|Vert|m\b|oman|oot|e\b|ank)/g, '\\r$1');

  // 2. Repair stripped leading backslashes before unmistakable LaTeX braced macros (e.g. rac{a}{b} -> \frac{a}{b}, ext{g/mol} -> \text{g/mol})
  s = s.replace(/(?<![a-zA-Z\\])rac\{/g, '\\frac{');
  s = s.replace(/(?<![a-zA-Z\\])(dfrac|tfrac|cfrac|sqrt|overline|underline|widetilde|widehat|mathbf|mathrm|mathbb|mathcal|mathfrak|boldsymbol|textbf|textit|binom|boxed)\{/g, '\\$1{');
  s = s.replace(/(?<![a-zA-Z\\])ext\{/g, '\\text{');
  s = s.replace(/(?<![a-zA-Z\\])vec\{/g, '\\vec{');
  s = s.replace(/(?<![a-zA-Z\\])bar\{/g, '\\bar{');
  s = s.replace(/(?<![a-zA-Z\\])hat\{/g, '\\hat{');

  // 3. Collapse accidental double-backslashes before known LaTeX commands (e.g. \\frac -> \frac, \\theta -> \theta)
  s = s.replace(KNOWN_LATEX_CMD_REGEX, '\\');

  // 4. Convert \ce{...} chemical formulas into standard KaTeX syntax
  if (s.includes('\\ce{')) {
    s = convertChemCeToLatex(s);
  }

  // 5. Normalize 3 or more consecutive dollar signs ($$$...$$$) into $$...$$
  s = s.replace(/\${3,}/g, '$$');

  return s;
}

/**
 * Cleans and normalizes a single LaTeX formula string so KaTeX can render it without syntax errors
 */
export function cleanFormulaString(formula: string): string {
  if (!formula) return '';
  let clean = normalizeLatexEnvironments(repairCorruptedLatex(formula)).trim();

  // Repeatedly strip outer backticks and math delimiters ($$, $, \[, \], \(, \))
  let changed = true;
  while (changed) {
    changed = false;
    if (clean.startsWith('`') && clean.endsWith('`') && clean.length >= 2) {
      clean = clean.slice(1, -1).trim();
      changed = true;
    }
    if (clean.startsWith('$$') && clean.endsWith('$$') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
      changed = true;
    } else if (clean.startsWith('\\[') && clean.endsWith('\\]') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
      changed = true;
    } else if (clean.startsWith('\\(') && clean.endsWith('\\)') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
      changed = true;
    } else if (clean.startsWith('$') && clean.endsWith('$') && clean.length >= 2) {
      clean = clean.slice(1, -1).trim();
      changed = true;
    }
  }

  // Strip any stray unescaped $ signs left inside the formula (which otherwise cause KaTeX "Can't use function '$' in math mode")
  clean = clean.replace(/(?<!\\)\$/g, '');

  // Strip trailing dangling single backslash (do not strip matrix row break `\\`), underscore, or caret
  clean = clean.replace(/(?<!\\)[\\]+$|[_^]+$/, '').trim();

  // Balance \left and \right delimiters
  const leftMatches = (clean.match(/\\left(?![a-zA-Z])/g) || []).length;
  const rightMatches = (clean.match(/\\right(?![a-zA-Z])/g) || []).length;
  if (leftMatches > rightMatches) {
    clean = clean + '\\right.'.repeat(leftMatches - rightMatches);
  } else if (rightMatches > leftMatches) {
    clean = clean.replace(/\\right(?![a-zA-Z])/g, '');
  }

  // Balance unmatched curly braces { and }
  let openCount = 0;
  let resultChars = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    const prev = i > 0 ? clean[i - 1] : '';
    if (ch === '{' && prev !== '\\') {
      openCount++;
      resultChars += ch;
    } else if (ch === '}' && prev !== '\\') {
      if (openCount > 0) {
        openCount--;
        resultChars += ch;
      }
      // If openCount === 0, skip the unmatched closing brace '}'
    } else {
      resultChars += ch;
    }
  }
  if (openCount > 0) {
    resultChars += '}'.repeat(openCount);
  }

  return resultChars.trim();
}

/**
 * Fallback human-readable math formatter if a formula still cannot be parsed by KaTeX
 */
function formatReadableMathFallback(formula: string): string {
  let s = escapeHtml(formula);
  s = s
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1) / ($2)')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\bar\{([^{}]*)\}/g, '$1̄')
    .replace(/\\vec\{([^{}]*)\}/g, '$1⃗')
    .replace(/\\hat\{([^{}]*)\}/g, '$1̂')
    .replace(/\\text\{([^{}]*)\}/g, '$1')
    .replace(/\\textbf\{([^{}]*)\}/g, '<strong>$1</strong>')
    .replace(/\\mathrm\{([^{}]*)\}/g, '$1')
    .replace(/\\Delta\b/g, 'Δ')
    .replace(/\\Omega\b/g, 'Ω')
    .replace(/\\Sigma\b|\bsum\b|\\sum\b/g, '∑')
    .replace(/\\int\b/g, '∫')
    .replace(/\\alpha\b/g, 'α')
    .replace(/\\beta\b/g, 'β')
    .replace(/\\gamma\b/g, 'γ')
    .replace(/\\delta\b/g, 'δ')
    .replace(/\\epsilon\b|\\varepsilon\b/g, 'ε')
    .replace(/\\theta\b|\\vartheta\b/g, 'θ')
    .replace(/\\lambda\b/g, 'λ')
    .replace(/\\mu\b/g, 'μ')
    .replace(/\\nu\b/g, 'ν')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\rho\b/g, 'ρ')
    .replace(/\\sigma\b/g, 'σ')
    .replace(/\\tau\b/g, 'τ')
    .replace(/\\phi\b|\\varphi\b/g, 'φ')
    .replace(/\\psi\b/g, 'ψ')
    .replace(/\\omega\b/g, 'ω')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\partial\b/g, '∂')
    .replace(/\\nabla\b/g, '∇')
    .replace(/\\pm\b/g, '±')
    .replace(/\\mp\b/g, '∓')
    .replace(/\\times\b/g, '×')
    .replace(/\\cdot\b/g, '·')
    .replace(/\\div\b/g, '÷')
    .replace(/\\le\b|\\leq\b/g, '≤')
    .replace(/\\ge\b|\\geq\b/g, '≥')
    .replace(/\\neq\b|\\ne\b/g, '≠')
    .replace(/\\approx\b/g, '≈')
    .replace(/\\equiv\b/g, '≡')
    .replace(/\\propto\b/g, '∝')
    .replace(/\\implies\b|\\Rightarrow\b/g, '⇒')
    .replace(/\\iff\b|\\Leftrightarrow\b/g, '⇔')
    .replace(/\\to\b|\\rightarrow\b/g, '→')
    .replace(/\\leftarrow\b/g, '←')
    .replace(/\\rightleftharpoons\b/g, '⇌')
    .replace(/\\in\b/g, '∈')
    .replace(/\\notin\b/g, '∉')
    .replace(/\\subset\b/g, '⊂')
    .replace(/\\subseteq\b/g, '⊆')
    .replace(/\\cup\b/g, '∪')
    .replace(/\\cap\b/g, '∩')
    .replace(/\\forall\b/g, '∀')
    .replace(/\\exists\b/g, '∃')
    .replace(/\\neg\b|\\lnot\b/g, '¬')
    .replace(/\\land\b/g, '∧')
    .replace(/\\lor\b/g, '∨')
    .replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9+-])/g, '<sup>$1</sup>')
    .replace(/_\{([^{}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>')
    .replace(/\\[a-zA-Z]+/g, '');
  return `<span class="font-serif italic">${s}</span>`;
}

/**
 * Sanitizes and renders a single LaTeX formula safely with KaTeX (HTML-only output to prevent duplicate MathML text)
 */
export const renderLatexToString = (formula: string, displayMode: boolean = false): string => {
  if (!formula) return '';
  const clean = cleanFormulaString(formula);
  if (!clean) return '';

  try {
    const rendered = katex.renderToString(clean, {
      displayMode,
      throwOnError: false,
      output: 'html',
      strict: false,
      trust: true,
      macros: KATEX_MACROS,
    });
    if (!rendered.includes('katex-error')) {
      return rendered;
    }

    // Second-pass retry if KaTeX reported a parse error (e.g. unsupported macro)
    const simplified = clean
      .replace(/\\(?:Limits|limits|nolimits)\b/g, '')
      .replace(/\\(?:ds|displaystyle)\b/g, '')
      .replace(/\\text\{([^{}]*)\}/g, '\\mathrm{$1}');
    const retryRendered = katex.renderToString(simplified, {
      displayMode,
      throwOnError: false,
      output: 'html',
      strict: false,
      trust: true,
      macros: KATEX_MACROS,
    });
    if (!retryRendered.includes('katex-error')) {
      return retryRendered;
    }

    return formatReadableMathFallback(clean);
  } catch {
    return formatReadableMathFallback(clean);
  }
};

/**
 * Checks if a string looks like a LaTeX formula
 */
export const isLikelyPureLatex = (str: string): boolean => {
  if (!str) return false;
  const trimmed = repairCorruptedLatex(str).trim();
  if (trimmed.startsWith('$') || trimmed.startsWith('\\[') || trimmed.startsWith('\\(')) return true;
  const mathIndicators = [
    '\\frac', '\\dfrac', '\\tfrac', '\\vec', '\\cos', '\\sin', '\\tan', '\\cot', '\\sec', '\\csc',
    '\\lim', '\\int', '\\sum', '\\prod', '\\sqrt', '\\theta', '\\alpha', '\\beta', '\\gamma',
    '\\Delta', '\\Omega', '\\lambda', '\\mu', '\\sigma', '\\pi', '\\infty', '\\cdot',
    '\\times', '\\pm', '\\mp', '\\le', '\\ge', '\\neq', '\\approx', '\\equiv', '\\propto',
    '\\partial', '\\nabla', '\\in', '\\notin', '\\subset', '\\cup', '\\cap', '\\to', '\\rightarrow', '\\implies',
    '\\iff', '\\hat', '\\bar', '\\overline', '\\mathbf', '\\mathrm', '\\text', '\\begin', '\\end', '\\binom',
    '\\left', '\\right', '\\over', '^{', '_{'
  ];
  return mathIndicators.some((cmd) => trimmed.includes(cmd));
};

const INLINE_MATH_SPAN_CLASS =
  'inline-math px-1.5 py-0.5 mx-0.5 rounded-md bg-blue-50/90 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 font-semibold border border-blue-200/70 dark:border-blue-800/60';

const BLOCK_MATH_DIV_CLASS =
  'my-3.5 py-3 px-4 overflow-x-auto rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/90 dark:from-slate-950 dark:to-indigo-950/70 text-blue-100 text-center border border-blue-500/30 border-l-4 border-l-blue-500 shadow-sm';

/**
 * Scans unprotected text for naked LaTeX expressions (commands like \frac{...}{...}, \bar{X}_n, \Delta G, \theta,
 * or subscript/superscript formulas like M_n, M_w, H_2O, 10^{-5}) that were not wrapped in $...$ and renders them via KaTeX.
 */
function autoRenderNakedLatexInText(text: string, addToken: (html: string) => string): string {
  if (!text) return text;

  // 1. First detect naked LaTeX backslash commands (e.g., \frac{a}{b}, \bar{X}_n = \frac{1}{1-p}, \Delta H, \theta, \rightarrow)
  // We scan character by character when we see a '\' followed by a known command so balanced nested braces {...} are captured cleanly.
  const cmdSet = new Set(KNOWN_LATEX_COMMANDS);
  let out = '';
  let i = 0;

  while (i < text.length) {
    // Skip any @@PROTECTED_TOKEN_N@@
    if (text[i] === '@' && text.slice(i, i + 18) === '@@PROTECTED_TOKEN_') {
      const endMarker = text.indexOf('@@', i + 18);
      if (endMarker !== -1) {
        out += text.slice(i, endMarker + 2);
        i = endMarker + 2;
        continue;
      }
    }

    if (text[i] === '\\') {
      // Check if followed by a known LaTeX command name
      const cmdMatch = text.slice(i + 1).match(/^([a-zA-Z]+)/);
      if (cmdMatch && cmdSet.has(cmdMatch[1])) {
        // Look slightly backward in `out` to see if there is an immediate LHS variable/number like "M_n = " or "\bar{X}_n = " or "2"
        const lhsMatch = out.match(/([A-Za-z0-9_^{}()[\]+\-*/=<>.,\s]*?(?:[A-Za-z0-9_^{}()[\]]+\s*=\s*|[0-9]+\s*|[A-Za-z]_[A-Za-z0-9]+\s*[=+\-*/]?\s*))$/);
        let prefix = '';
        if (lhsMatch && lhsMatch[1] && lhsMatch[1].trim().length > 0 && lhsMatch[1].trim().length <= 24) {
          // Only pull in LHS if it doesn't contain a full English word of 4+ letters
          const trimmedLhs = lhsMatch[1];
          if (!/[a-zA-Z]{4,}/.test(trimmedLhs)) {
            prefix = trimmedLhs;
            out = out.slice(0, out.length - prefix.length);
          }
        }

        // Now advance from `i` across the full contiguous math expression (including balanced {...} and chained math operators/commands)
        let j = i;
        let braceDepth = 0;
        while (j < text.length) {
          if (text.slice(j, j + 18) === '@@PROTECTED_TOKEN_') break;
          const ch = text[j];
          if (ch === '\n' || ch === '|' || ch === '`') break;

          if (ch === '\\') {
            if (text[j + 1] === '\\') {
              j += 2;
              continue;
            }
            const nextCmd = text.slice(j + 1).match(/^([a-zA-Z]+|[,;:!{}()|% ])/);
            if (nextCmd) {
              j += 1 + nextCmd[1].length;
              continue;
            }
            break;
          }

          if (ch === '{') {
            braceDepth++;
            j++;
            continue;
          }
          if (ch === '}') {
            if (braceDepth > 0) {
              braceDepth--;
              j++;
              continue;
            }
            break;
          }

          if (braceDepth > 0) {
            j++;
            continue;
          }

          // Outside braces: allow math operators, numbers, subscripts/superscripts, parens, brackets, commas, primes, and &
          if (/[0-9_^+=<>/*\-(),[\]'!&]/.test(ch)) {
            j++;
            continue;
          }

          if (ch === ' ') {
            // Look ahead past spaces: continue ONLY if followed by a math operator (=, +, -, *, /, <, >, \command, ^, _)
            const rest = text.slice(j);
            const spaceLookahead = rest.match(/^(\s+)(?:(\\[a-zA-Z]+)|([=+\-*/<>^_&])|([0-9]+|[A-Za-z](?:_[A-Za-z0-9{]|\^[A-Za-z0-9{])))/);
            if (spaceLookahead) {
              if (spaceLookahead[2]) {
                const cName = spaceLookahead[2].slice(1);
                if (cmdSet.has(cName)) {
                  j += spaceLookahead[1].length;
                  continue;
                }
              } else {
                j += spaceLookahead[1].length;
                continue;
              }
            }
            break;
          }

          if (/[A-Za-z]/.test(ch)) {
            // Check how many letters follow
            const wordMatch = text.slice(j).match(/^[A-Za-z]+/);
            const word = wordMatch ? wordMatch[0] : ch;
            const afterWord = text[j + word.length] || '';
            // Allow 1-3 letter math variables (like x, y, n, p, dx, dt, mol, sin, cos, ln, log, max, min, PDI) or variables followed by _ or ^ or (
            if (
              word.length === 1 ||
              afterWord === '_' ||
              afterWord === '^' ||
              afterWord === '\'' ||
              /^(?:sin|cos|tan|cot|sec|csc|ln|log|exp|lim|max|min|det|mod|mol|PDI|dx|dy|dz|dt|du|dv|dr)$/.test(word)
            ) {
              j += word.length;
              continue;
            }
            break;
          }

          break;
        }

        const rawMath = (prefix + text.slice(i, j)).trim();
        // Keep trailing punctuation outside the math span
        const trailingPunctMatch = rawMath.match(/([.,;:!?]+)$/);
        const cleanMathExpr = trailingPunctMatch
          ? rawMath.slice(0, rawMath.length - trailingPunctMatch[1].length).trim()
          : rawMath;
        const trailingPunct = trailingPunctMatch ? trailingPunctMatch[1] : '';

        if (cleanMathExpr) {
          const leadingSpace = prefix.match(/^\s*/)?.[0] || '';
          const rendered = renderLatexToString(cleanMathExpr, false);
          out += leadingSpace + addToken(`<span class="${INLINE_MATH_SPAN_CLASS}">${rendered}</span>`) + trailingPunct;
          i = j;
          continue;
        }
      }
    }

    out += text[i];
    i++;
  }

  // 2. Also convert standalone subscript/superscript tokens (e.g., M_n, M_w, e^x, a^n, x^2, 10^{-5}, H_2O, CO_2, (-1)^n)
  // that are outside protected tokens
  out = out.replace(
    /(?<![A-Za-z0-9\\@])([A-Za-z0-9()]+(?:_(?:\{[^{}]+\}|[A-Za-z0-9]+)|\^(?:\{[^{}]+\}|[0-9+-]+|[A-Za-z]))+)(?![A-Za-z0-9@])/g,
    (match) => {
      if (match.includes('PROTECTED_TOKEN')) return match;
      const rendered = renderLatexToString(match, false);
      return addToken(`<span class="${INLINE_MATH_SPAN_CLASS}">${rendered}</span>`);
    }
  );

  return out;
}

/**
 * Formats inline markdown (bold, italic, inline code, links) on a single line or table cell
 */
function formatInlineMarkdown(line: string): string {
  let out = line;

  // 1. Inline code `...`
  out = out.replace(
    /`([^`\n]+)`/g,
    '<code class="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-mono text-[0.88em] border border-slate-300/60 dark:border-slate-700">$1</code>'
  );

  // 2. Bold + Italic ***...***
  out = out.replace(
    /\*\*\*([^*]+?)\*\*\*/g,
    '<strong class="font-extrabold italic text-slate-900 dark:text-white">$1</strong>'
  );

  // 3. Bold **...**
  out = out.replace(
    /\*\*([\s\S]*?)\*\*/g,
    '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>'
  );

  // 4. Italic *...*
  out = out.replace(
    /\*([^*\n]+?)\*/g,
    '<em class="italic text-indigo-900/90 dark:text-indigo-200/90 font-medium">$1</em>'
  );

  return out;
}

/**
 * Parses mixed text containing full README/Markdown syntax (# through ######, tables, code blocks,
 * blockquotes, checklists, nested lists, callouts) and LaTeX math ($...$, $$...$$, or naked LaTeX) into rich HTML.
 */
export const renderMixedContent = (content: string): string => {
  if (!content) return '';

  // Store protected tokens (math & fenced code blocks) to shield them from markdown regexes
  const protectedTokens: string[] = [];
  const addToken = (html: string) => {
    const placeholder = `@@PROTECTED_TOKEN_${protectedTokens.length}@@`;
    protectedTokens.push(html);
    return placeholder;
  };

  let text = repairCorruptedLatex(content.replace(/\r\n/g, '\n'));

  // Unwrap backticks that wrap math delimiters like `$$...$$` or `$...$`
  text = text.replace(/`(\$\$[\s\S]*?\$\$)`/g, '$1');
  text = text.replace(/`(\$[^\$\n]+?\$)`/g, '$1');

  // 0. Extract fenced code blocks ```lang ... ```
  text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, codeBody) => {
    const cleanLang = (lang || '').trim().toLowerCase();
    const trimmedBody = String(codeBody || '').trim();

    // If the fenced block is explicitly a math/latex block OR contains pure LaTeX formulas, render it with KaTeX!
    const isMathLang = ['latex', 'math', 'tex', 'katex', 'formula', 'equation'].includes(cleanLang);
    const looksLikeProgrammingCode =
      /\b(?:function|const|let|var|import|export|return|class|public|private|def|print|console\.log|#include|SELECT|FROM|WHERE)\b/.test(
        trimmedBody
      );

    if (isMathLang || ((!cleanLang || cleanLang === 'text') && isLikelyPureLatex(trimmedBody) && !looksLikeProgrammingCode)) {
      const mathLines = trimmedBody
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
      const renderedLines = mathLines.map((l) => renderLatexToString(l, true)).join('<div class="my-2"></div>');
      return addToken(`<div class="${BLOCK_MATH_DIV_CLASS}">${renderedLines}</div>`);
    }

    const displayLang = cleanLang || 'text';
    return addToken(
      `<div class="my-4 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-md">` +
        `<div class="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">` +
          `<span class="uppercase tracking-wider font-bold text-blue-400">${escapeHtml(displayLang)}</span>` +
          `<span>Academic Reference Block</span>` +
        `</div>` +
        `<pre class="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed"><code>${escapeHtml(
          trimmedBody
        )}</code></pre>` +
      `</div>`
    );
  });

  // 1. Extract block math $$...$$
  text = text.replace(/(?<!\\)\$\$([\s\S]*?)(?<!\\)\$\$/g, (_, math) => {
    const rendered = renderLatexToString(math, true);
    return addToken(`<div class="${BLOCK_MATH_DIV_CLASS}">${rendered}</div>`);
  });

  // 2. Extract block math \[...\]
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
    const rendered = renderLatexToString(math, true);
    return addToken(`<div class="${BLOCK_MATH_DIV_CLASS}">${rendered}</div>`);
  });

  // 2b. Extract naked LaTeX display environments (\begin{aligned}...\end{aligned}, \begin{pmatrix}...\end{pmatrix}, \begin{cases}...\end{cases}, etc.)
  text = text.replace(
    /\\begin\{(equation\*?|align\*?|aligned|eqnarray\*?|gather\*?|gathered|cases|pmatrix|bmatrix|vmatrix|Vmatrix|matrix|array|split)\}([\s\S]*?)\\end\{\1\}/g,
    (fullEnv) => {
      const rendered = renderLatexToString(fullEnv, true);
      return addToken(`<div class="${BLOCK_MATH_DIV_CLASS}">${rendered}</div>`);
    }
  );

  // 3. Extract inline math $...$ (supporting escaped \$ inside, while avoiding currency pairs like "$60 vs $40")
  text = text.replace(/(?<!\\)\$((?:\\\$|[^$\n])+?)(?<!\\)\$/g, (fullMatch, math: string) => {
    const trimmed = math.trim();
    if (
      /^\d+(?:\.\d+)?\s*(?:ETB|Birr|birr|USD|[a-zA-Z]{3,}\s+[a-zA-Z]{2,})/i.test(trimmed) &&
      !/[\\^_=+*<>]/.test(trimmed)
    ) {
      return fullMatch;
    }
    const rendered = renderLatexToString(math, false);
    return addToken(`<span class="${INLINE_MATH_SPAN_CLASS}">${rendered}</span>`);
  });

  // 4. Extract inline math \(...\)
  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => {
    const rendered = renderLatexToString(math, false);
    return addToken(`<span class="${INLINE_MATH_SPAN_CLASS}">${rendered}</span>`);
  });

  // 5. Convert inline backticked LaTeX formulas (e.g. `\frac{1}{1-p}` or `\Delta G = \Delta H - T\Delta S`) into rendered KaTeX
  text = text.replace(/`([^`\n]+)`/g, (fullMatch, inner: string) => {
    const trimmedInner = inner.trim();
    if (isLikelyPureLatex(trimmedInner) && !trimmedInner.includes('//') && !trimmedInner.includes('http')) {
      const rendered = renderLatexToString(trimmedInner, false);
      return addToken(`<span class="${INLINE_MATH_SPAN_CLASS}">${rendered}</span>`);
    }
    return fullMatch;
  });

  // 6. Auto-detect and render any remaining naked LaTeX commands or subscript/superscript formulas in text
  text = autoRenderNakedLatexInText(text, addToken);

  const restoreTokens = (str: string): string => {
    let result = str;
    protectedTokens.forEach((tokenHtml, idx) => {
      result = result.replace(`@@PROTECTED_TOKEN_${idx}@@`, () => tokenHtml);
    });
    return result;
  };

  const isMultiLine = text.includes('\n') || /^\s*#{1,6}\s/.test(text);

  if (!isMultiLine) {
    return restoreTokens(formatInlineMarkdown(text));
  }

  // Process multi-line Markdown / README blocks (Tables, Blockquotes, Headings # to ######, Lists, Callouts, Paragraphs)
  const lines = text.split('\n');
  const htmlBlocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines (spacing is handled by block margins)
    if (!trimmed) {
      i++;
      continue;
    }

    // A. Markdown Table Detection: line starts and ends with | (or has | with separator line below)
    if (
      trimmed.startsWith('|') &&
      trimmed.endsWith('|') &&
      i + 1 < lines.length &&
      lines[i + 1].trim().startsWith('|')
    ) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((cell) => formatInlineMarkdown(cell.trim()));

        const headerCells = parseRow(tableLines[0]);
        // Check if second row is a separator row like | :--- | :--- |
        const isSecondRowSeparator = /^[\s|:-]+$/.test(tableLines[1]);
        const bodyStartIndex = isSecondRowSeparator ? 2 : 1;
        const bodyRows = tableLines.slice(bodyStartIndex).map(parseRow);

        let tableHtml =
          `<div class="my-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">` +
          `<table class="w-full text-left border-collapse text-xs sm:text-sm">` +
          `<thead><tr class="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700">`;

        headerCells.forEach((cell) => {
          tableHtml += `<th class="py-2.5 px-3.5 font-extrabold text-slate-900 dark:text-white tracking-tight">${cell}</th>`;
        });
        tableHtml += `</tr></thead><tbody class="divide-y divide-slate-200/70 dark:divide-slate-800/80">`;

        bodyRows.forEach((row, rIdx) => {
          const rowBg =
            rIdx % 2 === 0
              ? 'bg-white dark:bg-slate-900/60'
              : 'bg-slate-50/70 dark:bg-slate-900/30';
          tableHtml += `<tr class="${rowBg} hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">`;
          row.forEach((cell) => {
            tableHtml += `<td class="py-2.5 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed align-top">${cell}</td>`;
          });
          tableHtml += `</tr>`;
        });

        tableHtml += `</tbody></table></div>`;
        htmlBlocks.push(tableHtml);
        continue;
      }
    }

    // B. Horizontal Rule (---, ***, ___)
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      htmlBlocks.push(
        `<hr class="my-5 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />`
      );
      i++;
      continue;
    }

    // C. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const quoteContent = quoteLines.map((ql) => formatInlineMarkdown(ql)).join('<br/>');
      htmlBlocks.push(
        `<blockquote class="my-3.5 pl-4 pr-3.5 py-3 border-l-4 border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-r-xl text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed shadow-2xs">${quoteContent}</blockquote>`
      );
      continue;
    }

    // D. All 6 Markdown Heading Levels (# through ######), even if preceded by whitespace
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = formatInlineMarkdown(headingMatch[2].trim());

      if (level === 1) {
        htmlBlocks.push(
          `<h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-6 mb-3 pb-2 border-b-2 border-blue-500/40 tracking-tight">${headingText}</h2>`
        );
      } else if (level === 2) {
        htmlBlocks.push(
          `<h3 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-6 mb-2.5 pb-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">` +
            `<span class="w-1.5 h-5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>` +
            `<span>${headingText}</span>` +
          `</h3>`
        );
      } else if (level === 3) {
        htmlBlocks.push(
          `<h4 class="text-sm sm:text-base font-extrabold text-blue-700 dark:text-blue-300 mt-5 mb-2 flex items-center gap-2">` +
            `<span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>` +
            `<span>${headingText}</span>` +
          `</h4>`
        );
      } else if (level === 4) {
        // #### Heading — styled as an attractive textbook sub-card banner
        htmlBlocks.push(
          `<div class="mt-4 mb-2 px-3.5 py-2 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/70 dark:border-indigo-800/60 border-l-4 border-l-indigo-500 font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 shadow-2xs">` +
            `${headingText}` +
          `</div>`
        );
      } else {
        // ##### and ###### Headings
        htmlBlocks.push(
          `<h6 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-3.5 mb-1.5">${headingText}</h6>`
        );
      }
      i++;
      continue;
    }

    // E. Checklist Items (- [x] or - [ ])
    const checkMatch = trimmed.match(/^[-*+]\s+\[([ xX])\]\s+(.*)$/);
    if (checkMatch) {
      const isChecked = checkMatch[1].toLowerCase() === 'x';
      const itemBody = formatInlineMarkdown(checkMatch[2]);
      htmlBlocks.push(
        `<div class="flex items-start gap-2.5 my-1.5 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40">` +
          `<span class="inline-flex items-center justify-center w-4 h-4 rounded mt-0.5 text-[10px] font-bold shrink-0 ${
            isChecked
              ? 'bg-emerald-600 text-white'
              : 'border border-slate-400 dark:border-slate-600 text-transparent'
          }">✓</span>` +
          `<span class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">${itemBody}</span>` +
        `</div>`
      );
      i++;
      continue;
    }

    // F. Unordered List Items (- ..., * ..., + ...), supporting indentation levels
    const ulMatch = rawLine.match(/^(\s*)[-*+]\s+(.*)$/);
    if (ulMatch) {
      const indentSpaces = ulMatch[1].length;
      const itemBody = formatInlineMarkdown(ulMatch[2].trim());
      const isSubBullet = indentSpaces >= 2;

      htmlBlocks.push(
        `<div class="flex items-start gap-2.5 ${isSubBullet ? 'ml-6 my-1' : 'ml-1 my-1.5'}">` +
          `<span class="${
            isSubBullet
              ? 'text-indigo-400 dark:text-indigo-400 text-xs mt-1'
              : 'w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2'
          } shrink-0">${isSubBullet ? '▸' : ''}</span>` +
          `<div class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex-1">${itemBody}</div>` +
        `</div>`
      );
      i++;
      continue;
    }

    // G. Ordered / Numbered List Items (1. ..., 2. ...)
    const olMatch = rawLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (olMatch) {
      const indentSpaces = olMatch[1].length;
      const stepNum = olMatch[2];
      const itemBody = formatInlineMarkdown(olMatch[3].trim());

      htmlBlocks.push(
        `<div class="flex items-start gap-2.5 ${indentSpaces >= 2 ? 'ml-5' : 'ml-0'} my-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 shadow-2xs">` +
          `<span class="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-xs shrink-0 mt-0.5 tabular-nums shadow-2xs">${stepNum}</span>` +
          `<div class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex-1">${itemBody}</div>` +
        `</div>`
      );
      i++;
      continue;
    }

    // H. Special Callout Lines (⚡ Shortcut, ⚠️ Trap, 💡 Tip)
    if (trimmed.startsWith('⚡') || trimmed.startsWith('⚠️') || trimmed.startsWith('💡')) {
      const isTrap = trimmed.startsWith('⚠️');
      const isTip = trimmed.startsWith('💡');
      const boxStyle = isTrap
        ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/70 text-rose-950 dark:text-rose-200'
        : isTip
        ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-900/70 text-indigo-950 dark:text-indigo-200'
        : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/70 text-amber-950 dark:text-amber-200';

      htmlBlocks.push(
        `<div class="my-2.5 p-3 rounded-xl border ${boxStyle} text-xs sm:text-sm leading-relaxed shadow-2xs">` +
          `${formatInlineMarkdown(trimmed)}` +
        `</div>`
      );
      i++;
      continue;
    }

    // I. Standard Paragraph
    htmlBlocks.push(
      `<p class="my-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">${formatInlineMarkdown(
        trimmed
      )}</p>`
    );
    i++;
  }

  return restoreTokens(htmlBlocks.join('\n'));
};

export const MathRenderer: React.FC<MathRendererProps> = ({
  text,
  content,
  latex,
  displayMode = false,
  className = '',
}) => {
  const effectiveText = text ?? content;

  const htmlContent = useMemo(() => {
    if (latex) {
      return renderLatexToString(latex, displayMode);
    }
    if (!effectiveText) return '';

    // If explicit displayMode or pure single-token formula without spaces
    if (
      displayMode ||
      (!effectiveText.includes('\n') && isLikelyPureLatex(effectiveText) && !effectiveText.trim().includes(' '))
    ) {
      return renderLatexToString(effectiveText, displayMode);
    }

    return renderMixedContent(effectiveText);
  }, [effectiveText, latex, displayMode]);

  const isBlockContent = Boolean(
    displayMode ||
      (effectiveText && (effectiveText.includes('\n') || /^\s*#{1,6}\s/.test(effectiveText)))
  );

  return (
    <div
      className={`math-rendered-container ${className} ${
        isBlockContent ? 'block space-y-1' : 'inline'
      }`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

