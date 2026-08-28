import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  /** Text that can contain inline math ($...$ or \(...\)), block math ($$...$$ or \[...\]), or raw LaTeX */
  text?: string;
  /** Explicit LaTeX formula string to render directly */
  latex?: string;
  /** Whether to render in display (block) mode or inline mode */
  displayMode?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Sanitizes and renders a single LaTeX formula safely with KaTeX
 */
export const renderLatexToString = (formula: string, displayMode: boolean = false): string => {
  if (!formula) return '';
  let clean = formula.trim();

  // Strip wrapping math delimiters if passed
  if (clean.startsWith('$$') && clean.endsWith('$$')) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('\\[') && clean.endsWith('\\]')) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('$') && clean.endsWith('$')) {
    clean = clean.slice(1, -1).trim();
  } else if (clean.startsWith('\\(') && clean.endsWith('\\)')) {
    clean = clean.slice(2, -2).trim();
  }

  // Remove unmatched trailing braces if any typo occurred in source data
  let openCount = 0;
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === '{' && (i === 0 || clean[i - 1] !== '\\')) openCount++;
    if (clean[i] === '}' && (i === 0 || clean[i - 1] !== '\\')) openCount--;
  }
  if (openCount < 0 && clean.endsWith('}')) {
    clean = clean.slice(0, openCount);
  }

  try {
    return katex.renderToString(clean, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false,
      trust: true,
    });
  } catch (err) {
    console.warn('KaTeX render error:', err, 'Formula:', clean);
    return `<span class="katex-error text-rose-400 font-mono">${escapeHtml(clean)}</span>`;
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Checks if a string looks like pure LaTeX formula (contains backslashes like \frac, \cos, \vec, _, ^, etc.)
 */
export const isLikelyPureLatex = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (trimmed.startsWith('$') || trimmed.startsWith('\\[')) return true;
  const mathIndicators = [
    '\\frac', '\\vec', '\\cos', '\\sin', '\\tan', '\\cot', '\\sec', '\\csc',
    '\\lim', '\\int', '\\sum', '\\sqrt', '\\theta', '\\alpha', '\\beta', '\\gamma',
    '\\Delta', '\\Omega', '\\lambda', '\\mu', '\\sigma', '\\pi', '\\infty', '\\cdot',
    '\\times', '\\pm', '\\mp', '\\le', '\\ge', '\\neq', '\\approx', '\\equiv',
    '\\partial', '\\in', '\\notin', '\\subset', '\\cup', '\\cap', '\\to', '\\implies',
    '\\iff', '\\hat', '\\bar', '\\mathbf', '\\text', '\\begin', '\\end', '\\binom',
    '\\left', '\\right', '\\over', '^', '_'
  ];
  return mathIndicators.some((cmd) => trimmed.includes(cmd));
};

/**
 * Parses mixed text containing markdown and math ($...$, $$...$$, etc.) into safe rendered HTML
 */
export const renderMixedContent = (content: string): string => {
  if (!content) return '';

  // Store math tokens temporarily to protect them from markdown regex replacements
  const mathTokens: string[] = [];
  const addToken = (html: string) => {
    const placeholder = `___MATH_TOKEN_${mathTokens.length}___`;
    mathTokens.push(html);
    return placeholder;
  };

  let text = content;

  // 1. Extract block math $$...$$
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const rendered = renderLatexToString(math, true);
    return addToken(`<div class="my-3 py-2 px-3 overflow-x-auto rounded-lg bg-slate-900/90 dark:bg-slate-950 text-blue-200 text-center border border-slate-800 shadow-sm">${rendered}</div>`);
  });

  // 2. Extract block math \[...\]
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
    const rendered = renderLatexToString(math, true);
    return addToken(`<div class="my-3 py-2 px-3 overflow-x-auto rounded-lg bg-slate-900/90 dark:bg-slate-950 text-blue-200 text-center border border-slate-800 shadow-sm">${rendered}</div>`);
  });

  // 3. Extract inline math $...$
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const rendered = renderLatexToString(math, false);
    return addToken(`<span class="inline-math px-1 py-0.5 rounded bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold border border-blue-200/50 dark:border-blue-900/50">${rendered}</span>`);
  });

  // 4. Extract inline math \(...\)
  text = text.replace(/\\\(([^\n]+?)\\\)/g, (_, math) => {
    const rendered = renderLatexToString(math, false);
    return addToken(`<span class="inline-math px-1 py-0.5 rounded bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold border border-blue-200/50 dark:border-blue-900/50">${rendered}</span>`);
  });

  // Now process simple markdown structures line-by-line
  const lines = text.split('\n');
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Headings
    if (line.startsWith('### ')) {
      line = `<h4 class="text-base font-bold text-slate-900 dark:text-white mt-4 mb-1.5 flex items-center gap-1.5">${line.slice(4)}</h4>`;
    } else if (line.startsWith('## ')) {
      line = `<h3 class="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">${line.slice(3)}</h3>`;
    } else if (line.startsWith('# ')) {
      line = `<h2 class="text-xl font-black text-slate-900 dark:text-white mt-6 mb-3">${line.slice(2)}</h2>`;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Unordered list item
      line = `<div class="flex items-start gap-2 ml-2 my-1"><span class="text-blue-500 font-bold">•</span><span>${line.slice(2)}</span></div>`;
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list item
      const numMatch = line.match(/^(\d+)\.\s(.*)$/);
      if (numMatch) {
        line = `<div class="flex items-start gap-2 ml-2 my-1"><span class="font-bold text-blue-600 dark:text-blue-400 shrink-0">${numMatch[1]}.</span><span>${numMatch[2]}</span></div>`;
      }
    }

    // Bold text **...**
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    
    // Italic text *...*
    line = line.replace(/\*([^*]+?)\*/g, '<em class="italic text-slate-700 dark:text-slate-300">$1</em>');

    processedLines.push(line);
  }

  let finalHtml = processedLines.join('\n');

  // Restore math tokens
  mathTokens.forEach((tokenHtml, idx) => {
    finalHtml = finalHtml.replace(`___MATH_TOKEN_${idx}___`, tokenHtml);
  });

  return finalHtml;
};

export const MathRenderer: React.FC<MathRendererProps> = ({
  text,
  latex,
  displayMode = false,
  className = '',
}) => {
  const htmlContent = useMemo(() => {
    if (latex) {
      return renderLatexToString(latex, displayMode);
    }
    if (!text) return '';

    // If explicit displayMode or pure formula without text
    if (displayMode || (!text.includes('\n') && isLikelyPureLatex(text) && !text.includes(' '))) {
      return renderLatexToString(text, displayMode);
    }

    // If text contains $ or $$ or markdown
    return renderMixedContent(text);
  }, [text, latex, displayMode]);

  return (
    <span
      className={`math-rendered-container ${className} ${displayMode ? 'block overflow-x-auto my-2' : 'inline'}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
