import React, { useState } from 'react';
import { MasterNoteChapter, Subject, UserStudyNote } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  Sparkles, 
  X, 
  RefreshCw, 
  BookOpen, 
  Zap, 
  Check, 
  Copy, 
  Download, 
  FlaskConical, 
  Compass, 
  Calculator, 
  Brain, 
  AlertCircle, 
  CheckCircle2,
  Sliders,
  FileText
} from 'lucide-react';

interface AINoteGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAsUserNote: (note: UserStudyNote) => void;
  onSaveAsMasterChapter?: (chapter: MasterNoteChapter) => void;
}

export const AINoteGeneratorModal: React.FC<AINoteGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSaveAsUserNote,
  onSaveAsMasterChapter,
}) => {
  const [selectedDayPreset, setSelectedDayPreset] = useState<number | null>(3);
  const [subject, setSubject] = useState<Subject>('chemistry');
  const [customTopic, setCustomTopic] = useState<string>('Organic Reaction Mechanisms, Chemical Thermodynamics & Equilibrium');
  const [focusAreas, setFocusAreas] = useState<string>('SN1/SN2 mechanisms, Le Chatelier shifts, Gibbs Free Energy (ΔG = ΔH - TΔS), Arrhenius kinetics, buffer pH');
  const [detailLevel, setDetailLevel] = useState<'comprehensive' | 'concise' | 'formula_sheet'>('comprehensive');
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedChapter, setGeneratedChapter] = useState<MasterNoteChapter | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const presets = [
    {
      day: 3,
      title: "Day 3: Organic & Physical Chemistry",
      subject: "chemistry" as Subject,
      topic: "Organic Reaction Mechanisms, Chemical Thermodynamics, Kinetics & Equilibrium",
      focus: "SN1 vs SN2 kinetics, Markovnikov addition, ΔG = ΔH - TΔS, Hess's Law, Le Chatelier Shifts, Buffer Solutions & Henderson-Hasselbalch",
      icon: <FlaskConical className="w-4 h-4 text-emerald-400" />,
      color: "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400 text-emerald-300"
    },
    {
      day: 4,
      title: "Day 4: Waves, Optics & Electromagnetism",
      subject: "physics" as Subject,
      topic: "Wave Optics, Interference & Diffraction, Gauss's Law, Magnetic Induction, AC Circuits & Quantum Physics",
      focus: "Young's Double Slit, Diffraction Gratings, Gauss's Law flux calculations, Faraday/Lenz's Law, RLC Resonance, Photoelectric Effect",
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      color: "border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400 text-cyan-300"
    },
    {
      day: 5,
      title: "Day 5: Aptitude, Matrices & 3D Geometry",
      subject: "mathematics" as Subject,
      topic: "Quantitative Speed Aptitude, Matrix Determinants & Inverses, 3D Vectors & Analytical Coordinate Geometry",
      focus: "Cramer's Rule, Matrix Eigenvalues, 3D Plane Equations, Shortest Distance between skew lines, Work-Rate fast formulas, Syllogisms",
      icon: <Brain className="w-4 h-4 text-amber-400" />,
      color: "border-amber-500/40 bg-amber-950/20 hover:border-amber-400 text-amber-300"
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedDayPreset(p.day);
    setSubject(p.subject);
    setCustomTopic(p.topic);
    setFocusAreas(p.focus);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/gemini/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: selectedDayPreset,
          subject,
          topic: customTopic,
          focusAreas,
          detailLevel,
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to generate study notes.');
      }

      const data = await res.json();
      if (data.note) {
        setGeneratedChapter(data.note);
      } else {
        throw new Error('No note content returned by AI service.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error communicating with Gemini AI server.');
    } finally {
      setIsGenerating(false);
    }
  };

  const convertChapterToMarkdown = (ch: MasterNoteChapter): string => {
    let md = `# ${ch.title}\n\n**Subject:** ${ch.subject.toUpperCase()} | **Grade:** ${ch.gradeLevel} | **Read Time:** ~${ch.estimatedReadTimeMinutes} mins\n\n## Overview\n${ch.overview}\n\n`;
    
    ch.sections.forEach((sec, idx) => {
      md += `\n---\n\n## ${sec.heading}\n\n${sec.content}\n\n`;
      
      if (sec.equations && sec.equations.length > 0) {
        md += `### 📐 Key Governing Equations\n\n`;
        sec.equations.forEach(eq => {
          md += `**${eq.name}:**\n$$${eq.formula}$$\n*${eq.explanation}*\n\n`;
        });
      }

      if (sec.workedExamples && sec.workedExamples.length > 0) {
        md += `### 📝 Worked University Entrance Examples\n\n`;
        sec.workedExamples.forEach((ex, exIdx) => {
          md += `#### Example ${idx + 1}.${exIdx + 1}: ${ex.problem}\n\n`;
          md += `**Step-by-Step Solution:**\n`;
          ex.stepByStepSolution.forEach((s, sIdx) => {
            md += `${sIdx + 1}. ${s}\n`;
          });
          if (ex.shortcutTip) {
            md += `\n⚡ **30-Second Exam Shortcut:** ${ex.shortcutTip}\n\n`;
          }
        });
      }

      if (sec.examTraps && sec.examTraps.length > 0) {
        md += `### ⚠️ Common Examiner Traps\n\n`;
        sec.examTraps.forEach(trap => {
          md += `- ❌ ${trap}\n`;
        });
        md += `\n`;
      }

      if (sec.keyTakeaways && sec.keyTakeaways.length > 0) {
        md += `### 🎯 Key Takeaways\n\n`;
        sec.keyTakeaways.forEach(k => {
          md += `- ✅ ${k}\n`;
        });
        md += `\n`;
      }
    });

    return md;
  };

  const handleSaveToPersonalNotes = () => {
    if (!generatedChapter) return;
    const mdContent = convertChapterToMarkdown(generatedChapter);
    
    const userNote: UserStudyNote = {
      id: `ai-note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: generatedChapter.title,
      subject: generatedChapter.subject as Subject,
      topic: customTopic || undefined,
      content: mdContent,
      tags: ['ai-generated', `day-${selectedDayPreset || 'special'}`, generatedChapter.subject],
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      pinned: true,
    };

    onSaveAsUserNote(userNote);
    if (onSaveAsMasterChapter) {
      onSaveAsMasterChapter(generatedChapter);
    }
    setSavedSuccess(true);
  };

  const handleCopyMarkdown = () => {
    if (!generatedChapter) return;
    const text = convertChapterToMarkdown(generatedChapter);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!generatedChapter) return;
    const text = convertChapterToMarkdown(generatedChapter);
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedChapter.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between border-b border-blue-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                AI Master Notes Generator
                <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30 font-semibold">
                  Gemini 3.7 Flash
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                Generate exhaustive textbook-grade notes for Day 3, 4, 5, or any custom AASTU entrance syllabus topic.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Presets Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              1-Click Fast-Track Presets (Days 3, 4 & 5)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {presets.map((p) => {
                const isSelected = selectedDayPreset === p.day;
                return (
                  <button
                    key={p.day}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 shadow-md ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {p.icon}
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {p.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {p.focus}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Settings Form */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value as Subject);
                    setSelectedDayPreset(null);
                  }}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="chemistry">Chemistry</option>
                  <option value="physics">Physics</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="aptitude">Aptitude & English</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Chapter Topic Title
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value);
                    setSelectedDayPreset(null);
                  }}
                  placeholder="e.g. Organic Reaction Mechanisms & Electrochemistry"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Specific Focus Areas & Formulas to Include
              </label>
              <textarea
                rows={2}
                value={focusAreas}
                onChange={(e) => setFocusAreas(e.target.value)}
                placeholder="List concepts, equations, derivations, or problem types you want emphasized..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Detail Tier:</span>
                {(['comprehensive', 'concise', 'formula_sheet'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setDetailLevel(tier)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                      detailLevel === tier
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {tier === 'comprehensive' ? 'Full Textbook' : tier === 'concise' ? 'Fast Review' : 'Formula Sheet'}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !customTopic.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating University-Grade Notes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Generate Master Study Note
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generated Result Preview */}
          {generatedChapter && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {generatedChapter.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {generatedChapter.sections.length} Sections • ~{generatedChapter.estimatedReadTimeMinutes} min read
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownloadMarkdown}
                    className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-500" />
                    <span>Download .md</span>
                  </button>

                  <button
                    onClick={handleSaveToPersonalNotes}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition"
                  >
                    {savedSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Notes!
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" /> Save to My Notes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-4 max-h-96 overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                  <div className="font-bold mb-1">Executive Overview:</div>
                  <p>{generatedChapter.overview}</p>
                </div>

                {generatedChapter.sections.map((sec, sIdx) => (
                  <div key={sec.id || sIdx} className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-sm text-blue-600 dark:text-blue-400">
                      {sec.heading}
                    </h5>

                    <div className="font-sans leading-relaxed">
                      <MathRenderer text={sec.content} />
                    </div>

                    {/* Equations */}
                    {sec.equations && sec.equations.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Governing Equations:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sec.equations.map((eq, eqIdx) => (
                            <div key={eqIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                              <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">{eq.name}</div>
                              <div className="font-mono text-xs my-1 text-blue-600 dark:text-blue-400">
                                <MathRenderer text={`$$${eq.formula}$$`} />
                              </div>
                              <div className="text-[11px] text-slate-500">{eq.explanation}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Worked Examples */}
                    {sec.workedExamples && sec.workedExamples.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Worked Examples & Shortcuts:
                        </div>
                        {sec.workedExamples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                            <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                              <MathRenderer text={ex.problem} />
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-2 border-l-2 border-blue-500">
                              {ex.stepByStepSolution.map((s, stepIdx) => (
                                <div key={stepIdx}><MathRenderer text={s} /></div>
                              ))}
                            </div>
                            {ex.shortcutTip && (
                              <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-900 flex items-start gap-1">
                                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <div><span className="font-bold">Shortcut:</span> <MathRenderer text={ex.shortcutTip} /></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Generated notes are stored permanently in browser storage.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition"
          >
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
};
