import React, { useState } from 'react';
import { UserStudyNote, Subject } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Pin, 
  PinOff, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Sparkles, 
  Calculator, 
  Compass, 
  FlaskConical, 
  Brain, 
  FileText, 
  Calendar, 
  Clock, 
  Tag, 
  Save, 
  X,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Eye,
  Code
} from 'lucide-react';
import { downloadBackupFile, restoreBackupFromJSON } from '../utils/storage';

interface StudentNotesViewProps {
  userNotes: UserStudyNote[];
  onSaveNote: (note: UserStudyNote) => void;
  onDeleteNote: (id: string) => void;
  onOpenAITutorWithTopic?: (topic: string, subject: Subject) => void;
  savedQuestionsCount?: number;
  examHistoryCount?: number;
  onDataRestored?: () => void;
}

export const StudentNotesView: React.FC<StudentNotesViewProps> = ({
  userNotes,
  onSaveNote,
  onDeleteNote,
  onOpenAITutorWithTopic,
  savedQuestionsCount = 0,
  examHistoryCount = 0,
  onDataRestored,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(userNotes[0]?.id || null);
  
  // Note Editing State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editSubject, setEditSubject] = useState<Subject | 'general'>('mathematics');
  const [editTopic, setEditTopic] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editTags, setEditTags] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPreviewTab, setIsPreviewTab] = useState<boolean>(false);
  const [backupModalOpen, setBackupModalOpen] = useState<boolean>(false);
  const [restoreMessage, setRestoreMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter and sort notes (pinned first, then newest updated)
  const filteredNotes = userNotes.filter((note) => {
    const matchSubj = selectedSubject === 'all' || note.subject === selectedSubject;
    const q = searchQuery.toLowerCase();
    const matchQuery = 
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      (note.topic && note.topic.toLowerCase().includes(q)) ||
      (note.tags && note.tags.some(t => t.toLowerCase().includes(q)));
    return matchSubj && matchQuery;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const activeNote = userNotes.find(n => n.id === activeNoteId) || filteredNotes[0] || null;

  const handleStartCreate = () => {
    setEditTitle('');
    setEditSubject(selectedSubject === 'all' ? 'mathematics' : selectedSubject);
    setEditTopic('');
    setEditContent('');
    setEditTags('');
    setActiveNoteId(null);
    setIsEditing(true);
    setIsPreviewTab(false);
  };

  const handleStartEdit = (note: UserStudyNote) => {
    setEditTitle(note.title);
    setEditSubject(note.subject);
    setEditTopic(note.topic || '');
    setEditContent(note.content);
    setEditTags((note.tags || []).join(', '));
    setActiveNoteId(note.id);
    setIsEditing(true);
    setIsPreviewTab(false);
  };

  const handleSaveCurrentNote = () => {
    if (!editTitle.trim() && !editContent.trim()) {
      setIsEditing(false);
      return;
    }

    const now = new Date().toLocaleString();
    const tagArray = editTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const noteToSave: UserStudyNote = {
      id: activeNoteId || `note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: editTitle.trim() || 'Untitled Note',
      subject: editSubject as Subject,
      topic: editTopic.trim() || undefined,
      content: editContent.trim(),
      tags: tagArray,
      createdAt: activeNote ? activeNote.createdAt : now,
      updatedAt: now,
      pinned: activeNote ? activeNote.pinned : false,
    };

    onSaveNote(noteToSave);
    setActiveNoteId(noteToSave.id);
    setIsEditing(false);
  };

  const handleTogglePin = (note: UserStudyNote) => {
    onSaveNote({
      ...note,
      pinned: !note.pinned,
      updatedAt: new Date().toLocaleString(),
    });
  };

  const handleCopyNote = (note: UserStudyNote) => {
    const text = `${note.title}\n[${note.subject.toUpperCase()}${note.topic ? ` - ${note.topic}` : ''}]\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      const res = restoreBackupFromJSON(content);
      if (res.success) {
        setRestoreMessage({
          type: 'success',
          text: `Successfully restored ${res.stats?.notes || 0} notes, ${res.stats?.questions || 0} questions, and ${res.stats?.exams || 0} exam logs!`,
        });
        if (onDataRestored) onDataRestored();
      } else {
        setRestoreMessage({
          type: 'error',
          text: res.error || 'Failed to restore backup file.',
        });
      }
    };
    reader.readAsText(file);
  };

  const getSubjectIcon = (subj: Subject | 'general') => {
    switch (subj) {
      case 'mathematics': return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'physics': return <Compass className="w-4 h-4 text-cyan-500" />;
      case 'chemistry': return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      case 'aptitude': return <Brain className="w-4 h-4 text-amber-500" />;
      default: return <FileText className="w-4 h-4 text-purple-500" />;
    }
  };

  const getSubjectBadge = (subj: Subject | 'general') => {
    switch (subj) {
      case 'mathematics': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300';
      case 'physics': return 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 border-cyan-300';
      case 'chemistry': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300';
      case 'aptitude': return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300';
      default: return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 text-white border border-blue-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5" /> Permanent Storage Active
              </span>
              <span className="text-xs text-slate-400">
                Auto-saved to Browser & Device
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Saved Study Notes & Personal Revision Vault
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Write, store, and organize custom formula sheets, mnemonic tricks, textbook summaries, and revision notes. Everything is stored permanently and persists across refreshes.
            </p>
          </div>

          {/* Quick Storage Stats & Backup Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="new-student-note-btn"
              onClick={handleStartCreate}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Study Note
            </button>

            <button
              onClick={() => setBackupModalOpen(true)}
              className="px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
              title="Backup & Restore Data"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Backup Data ({userNotes.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude'] as (Subject | 'all')[]).map((subj) => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubject(subj);
                setIsEditing(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition flex items-center gap-1.5 ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj !== 'all' && getSubjectIcon(subj as Subject)}
              {subj === 'aptitude' ? 'Aptitude & English' : subj}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved notes, tags..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Two-Column Notes Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Notes List (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              Saved Notes ({filteredNotes.length})
            </span>
            <button
              onClick={handleStartCreate}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Note
            </button>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-400 stroke-1" />
              <p className="text-xs font-semibold">No notes found</p>
              <button
                onClick={handleStartCreate}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Create Your First Note
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotes.map((note) => {
                const isSelected = note.id === activeNote?.id && !isEditing;

                return (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveNoteId(note.id);
                      setIsEditing(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-sm ring-1 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {getSubjectIcon(note.subject)}
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getSubjectBadge(note.subject)}`}>
                          {note.subject}
                        </span>
                        {note.topic && (
                          <span className="text-[10px] text-slate-500 font-medium truncate max-w-[100px]">
                            {note.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {note.pinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1.5 leading-snug truncate">
                      {note.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {note.content}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400">
                      <span>{note.updatedAt || note.createdAt}</span>
                      {note.tags && note.tags.length > 0 && (
                        <span className="truncate max-w-[100px]">
                          #{note.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Note Viewer / Editor (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 min-h-[450px]">
          {isEditing ? (
            /* Editing / Creating Mode */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  {activeNoteId ? 'Edit Study Note' : 'Create New Study Note'}
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPreviewTab(!isPreviewTab)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {isPreviewTab ? <Code className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isPreviewTab ? 'Raw Text' : 'Render LaTeX'}</span>
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    id="save-note-submit-btn"
                    onClick={handleSaveCurrentNote}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
              </div>

              {/* Title & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Note Title
                  </label>
                  <input
                    id="note-title-input"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Integration by Parts Shortcut & Trigonometric Substitutions"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Subject
                  </label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="aptitude">Aptitude & English</option>
                    <option value="general">General STEM</option>
                  </select>
                </div>
              </div>

              {/* Topic & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Topic Scope (Optional)
                  </label>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeholder="e.g. Calculus Unit 3, Electrochemistry, Sound Waves"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g. high-yield, formula, trap, day-2"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Math LaTeX Symbols insertion toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">
                  Quick Insert:
                </span>
                {[
                  { label: '∫ Integral', code: ' \\int_{a}^{b} f(x) \\, dx ' },
                  { label: 'lim Limit', code: ' \\lim_{x \\to 0} ' },
                  { label: '∑ Sum', code: ' \\sum_{i=1}^{n} ' },
                  { label: '√ Sqrt', code: ' \\sqrt{x} ' },
                  { label: 'Frac', code: ' \\frac{a}{b} ' },
                  { label: 'Vector', code: ' \\vec{v} ' },
                  { label: 'θ Theta', code: ' \\theta ' },
                  { label: 'Δ Delta', code: ' \\Delta ' },
                ].map((sym) => (
                  <button
                    key={sym.label}
                    type="button"
                    onClick={() => setEditContent(prev => prev + sym.code)}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold rounded border border-slate-200 dark:border-slate-700 transition"
                  >
                    {sym.label}
                  </button>
                ))}
              </div>

              {/* Content Textarea or Preview */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Note Content & Formulas
                </label>

                {isPreviewTab ? (
                  <div className="min-h-[220px] p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed overflow-x-auto">
                    <MathRenderer text={editContent || '_No content entered yet._'} />
                  </div>
                ) : (
                  <textarea
                    id="note-content-textarea"
                    rows={10}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Write your study notes here... LaTeX math is automatically supported! (e.g. $E = mc^2$, $\int u \, dv = uv - \int v \, du$)"
                    className="w-full p-4 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                )}
              </div>
            </div>
          ) : activeNote ? (
            /* Active Note Display Mode */
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border flex items-center gap-1.5 ${getSubjectBadge(activeNote.subject)}`}>
                    {getSubjectIcon(activeNote.subject)}
                    {activeNote.subject}
                  </span>
                  {activeNote.topic && (
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1 rounded">
                      {activeNote.topic}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Updated: {activeNote.updatedAt}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePin(activeNote)}
                    className={`p-2 rounded-lg border transition ${
                      activeNote.pinned
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={activeNote.pinned ? 'Unpin note' : 'Pin to top'}
                  >
                    {activeNote.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleCopyNote(activeNote)}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Copy note to clipboard"
                  >
                    {copiedId === activeNote.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleStartEdit(activeNote)}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${activeNote.title}"?`)) {
                        onDeleteNote(activeNote.id);
                      }
                    }}
                    className="p-2 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {activeNote.title}
              </h1>

              {/* Tags */}
              {activeNote.tags && activeNote.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeNote.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Main Note Content Rendered with LaTeX */}
              <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-4">
                <MathRenderer text={activeNote.content} />
              </div>

              {/* Footer AI Coach Assistance Link */}
              {onOpenAITutorWithTopic && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Need AI elaboration on this note?</span>
                  <button
                    onClick={() => onOpenAITutorWithTopic(activeNote.title, activeNote.subject)}
                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Discuss with AI Tutor
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 space-y-3">
              <FileText className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                No note selected
              </h3>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Select a note from the left drawer or click "New Study Note" to create a fresh revision card.
              </p>
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Create Study Note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backup & Data Manager Modal */}
      {backupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Data Backup & Restore Manager
                </h3>
              </div>
              <button
                onClick={() => {
                  setBackupModalOpen(false);
                  setRestoreMessage(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Export all your personal study notes, generated AI practice questions, exam history, and task progress into a single permanent JSON backup file.
            </p>

            {/* Storage Summary */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{userNotes.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Notes</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-amber-500">{savedQuestionsCount}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">AI Qs Saved</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-emerald-500">{examHistoryCount}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Exams Taken</div>
              </div>
            </div>

            {restoreMessage && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                restoreMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300'
              }`}>
                {restoreMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{restoreMessage.text}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={downloadBackupFile}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete JSON Backup</span>
              </button>

              <label className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition">
                <Upload className="w-4 h-4" />
                <span>Restore / Import from Backup JSON</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleRestoreFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
