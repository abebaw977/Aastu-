import React, { useState, useMemo, useEffect } from 'react';
import { STUDY_GUIDES } from '../data/studyGuides';
import { ALL_FORMULAS, FORMULA_STATS, FORMULA_CATEGORIES } from '../data/formulas';
import { Subject, FormulaItem } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  Calculator,
  Compass,
  FlaskConical,
  Brain,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Filter,
  Layers,
  Award,
  Download,
  Info
} from 'lucide-react';

interface StudyGuidesViewProps {
  initialSubject?: Subject;
}

export const StudyGuidesView: React.FC<StudyGuidesViewProps> = ({
  initialSubject = 'all',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'formulas' | 'guides'>('formulas');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(initialSubject);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aastu_bookmarked_formulas');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('aastu_bookmarked_formulas', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Categories for current subject
  const currentCategories = useMemo(() => {
    if (selectedSubject === 'all') {
      return ['All Categories'];
    }
    return ['All Categories', ...(FORMULA_CATEGORIES[selectedSubject] || [])];
  }, [selectedSubject]);

  // Filtered Formulas
  const filteredFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => {
      const matchSubject = selectedSubject === 'all' || f.subject === selectedSubject;
      const matchCategory = selectedCategory === 'all' || selectedCategory === 'All Categories' || f.category === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'all' || f.difficulty === selectedDifficulty;
      const matchBookmark = !showOnlyBookmarked || bookmarkedIds.includes(f.id);

      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        f.name.toLowerCase().includes(q) ||
        f.topic.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        (f.examTip && f.examTip.toLowerCase().includes(q));

      return matchSubject && matchCategory && matchDifficulty && matchBookmark && matchQuery;
    });
  }, [selectedSubject, selectedCategory, selectedDifficulty, showOnlyBookmarked, bookmarkedIds, searchQuery]);

  // Filtered Guides
  const filteredGuides = useMemo(() => {
    return STUDY_GUIDES.filter((guide) => {
      const matchSubject = selectedSubject === 'all' || guide.subject === selectedSubject;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.keyFormulas.some(f => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q) || f.description.toLowerCase().includes(q));
      return matchSubject && matchQuery;
    });
  }, [selectedSubject, searchQuery]);

  const getSubjectIcon = (subj: Subject) => {
    switch (subj) {
      case 'mathematics': return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'physics': return <Compass className="w-4 h-4 text-purple-500" />;
      case 'chemistry': return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      default: return <Brain className="w-4 h-4 text-amber-500" />;
    }
  };

  const getSubjectColor = (subj: Subject) => {
    switch (subj) {
      case 'mathematics': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'physics': return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'chemistry': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      default: return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 text-white border border-blue-800/40 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              AASTU 350+ Master Formula Compendium & Guides
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                {FORMULA_STATS.total} Core Formulas Available
              </span>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            The definitive Ethiopian university STEM entrance formula bank. Contains governing equations, 
            unit breakdowns, variable definitions, and 30-to-45 second speed hacks for rapid exam problem solving.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400">Mathematics</div>
                <div className="text-sm font-bold text-white">{FORMULA_STATS.mathematics} Formulas</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400">Physics</div>
                <div className="text-sm font-bold text-white">{FORMULA_STATS.physics} Formulas</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
              <FlaskConical className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400">Chemistry</div>
                <div className="text-sm font-bold text-white">{FORMULA_STATS.chemistry} Formulas</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400">Aptitude & English</div>
                <div className="text-sm font-bold text-white">{FORMULA_STATS.aptitude} Formulas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('formulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeSubTab === 'formulas'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          350+ Formula Vault ({filteredFormulas.length})
        </button>

        <button
          onClick={() => setActiveSubTab('guides')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeSubTab === 'guides'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          Chapter Study Sheets ({filteredGuides.length})
        </button>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude'] as Subject[]).map((subj) => (
              <button
                key={subj}
                id={`guide-filter-${subj}`}
                onClick={() => {
                  setSelectedSubject(subj);
                  setSelectedCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition flex items-center gap-1.5 ${
                  selectedSubject === subj
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {subj !== 'all' && getSubjectIcon(subj)}
                {subj === 'aptitude' ? 'Aptitude & English' : subj}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formula, LaTeX, rule..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Secondary Category & Bookmark Bar (For Formulas mode) */}
        {activeSubTab === 'formulas' && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <span className="text-slate-400 font-medium ml-2">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="Core">Core Standard</option>
                <option value="Advanced">Advanced (High-Yield)</option>
                <option value="Top-Rank">Top-Rank Shortcuts</option>
              </select>
            </div>

            <button
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                showOnlyBookmarked 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Pinned Favorites ({bookmarkedIds.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: 350+ FORMULAS GRID */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-4">
          {filteredFormulas.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">No formulas match your filters</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the search query or selecting "All Categories".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFormulas.map((f) => {
                const isCopied = copiedId === f.id;
                const isBookmarked = bookmarkedIds.includes(f.id);

                return (
                  <div
                    key={f.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSubjectColor(f.subject)}`}>
                            {f.subject}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {f.category}
                          </span>
                          {f.difficulty && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              f.difficulty === 'Top-Rank' 
                                ? 'bg-red-500/20 text-red-300' 
                                : f.difficulty === 'Advanced' 
                                ? 'bg-amber-500/20 text-amber-300' 
                                : 'bg-slate-700/40 text-slate-300'
                            }`}>
                              {f.difficulty}
                            </span>
                          )}
                        </div>

                        {/* Actions: Copy & Bookmark */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleBookmark(f.id)}
                            title={isBookmarked ? "Remove from Pinned" : "Pin Formula for Quick Review"}
                            className="p-1 rounded text-slate-400 hover:text-amber-400 transition"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyFormula(f.formula, f.id)}
                            title="Copy LaTeX Formula"
                            className="p-1 rounded text-slate-400 hover:text-blue-400 transition"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Formula Name */}
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {f.name}
                      </h4>

                      {/* LaTeX Formula Display Box */}
                      <div className="mt-2.5 bg-slate-950 text-blue-200 p-3 rounded-lg border border-slate-800 overflow-x-auto text-center font-bold">
                        <MathRenderer latex={f.formula} displayMode={true} />
                      </div>

                      {/* Description & Variables */}
                      <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <MathRenderer text={f.description} />
                      </div>

                      {f.variablesExplanation && (
                        <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Where: </span>
                          <MathRenderer text={f.variablesExplanation} />
                        </div>
                      )}
                    </div>

                    {/* Bottom: Exam Speed Tip */}
                    {f.examTip && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-300 font-medium flex items-start gap-1.5 bg-amber-500/10 p-2 rounded">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Exam Shortcut: </span>
                          <MathRenderer text={f.examTip} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CHAPTER STUDY SHEETS */}
      {activeSubTab === 'guides' && (
        <div className="space-y-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 flex items-center gap-1">
                    {getSubjectIcon(guide.subject)}
                    {guide.subject}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {guide.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  {guide.summary}
                </p>
              </div>

              {/* Key Formulas Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Governing Formulas & Equations
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.keyFormulas.map((f, fIdx) => {
                    const formulaId = `${guide.id}-f-${fIdx}`;
                    const isCopied = copiedId === formulaId;

                    return (
                      <div
                        key={fIdx}
                        className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700/80 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                            {f.name}
                          </span>
                          <button
                            onClick={() => handleCopyFormula(f.formula, formulaId)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded transition"
                            title="Copy Formula"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Formula display box */}
                        <div className="bg-slate-950 text-blue-200 p-3 rounded-lg border border-slate-800 overflow-x-auto text-center font-bold">
                          <MathRenderer latex={f.formula} displayMode={true} />
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                          <MathRenderer text={f.description} />
                        </div>

                        {f.unitsOrNotes && (
                          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                            Note: <MathRenderer text={f.unitsOrNotes} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Must-Know Concepts & Speed Tricks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200/60 dark:border-blue-900/40">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    Must-Know Exam Concepts
                  </h5>
                  <ul className="space-y-1.5 text-xs text-blue-950 dark:text-blue-200">
                    {guide.mustKnowConcepts.map((c, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <div><MathRenderer text={c} /></div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/60 dark:border-emerald-900/40">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    Fast-Solving Speed Hacks
                  </h5>
                  <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                    {guide.fastSolvingTricks.map((t, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">⚡</span>
                        <div><MathRenderer text={t} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
