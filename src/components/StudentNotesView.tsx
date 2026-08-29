import React, { useState } from 'react';
import { UserStudyNote, Subject } from '../types';
import { MathRenderer } from './MathRenderer';
import { AINoteGeneratorModal } from './AINoteGeneratorModal';
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
  Code,
  Zap,
  RefreshCw,
  Sliders,
  ChevronDown
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
  
  // AI Generator Modal
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState<boolean>(false);

  // AI Expander State
  const [isAIExpanding, setIsAIExpanding] = useState<boolean>(false);
  const [aiExpandAction, setAIExpandAction] = useState<string>('formulas');
  const [customAIPrompt, setCustomAIPrompt] = useState<string>('');
  const [showAIExpandMenu, setShowAIExpandMenu] = useState<boolean>(false);
  const [aiSuccessMessage, setAISuccessMessage] = useState<string | null>(null);

  // Backup & Storage Modal
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
      title: editTitle.trim() || 'Untitled Study Note',
      subject: editSubject,
      topic: editTopic.trim() || undefined,
      content: editContent,
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
    const updatedNote: UserStudyNote = {
      ...note,
      pinned: !note.pinned,
      updatedAt: new Date().toLocaleString(),
    };
    onSaveNote(updatedNote);
  };

  const handleCopyNote = (note: UserStudyNote) => {
    const noteText = `# ${note.title}\nSubject: ${note.subject}\nTopic: ${note.topic || 'General'}\n\n${note.content}`;
    navigator.clipboard.writeText(noteText);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const res = restoreBackupFromJSON(text);
        if (res.success) {
          const stats = res.stats;
          setRestoreMessage({ 
            type: 'success', 
            text: `Restored ${stats?.notes ?? 0} notes, ${stats?.questions ?? 0} saved questions, and ${stats?.exams ?? 0} exam history records!` 
          });
          if (onDataRestored) onDataRestored();
        } else {
          setRestoreMessage({ type: 'error', text: res.error || 'Failed to parse JSON file' });
        }
      } catch (err: any) {
        setRestoreMessage({ type: 'error', text: err.message || 'Error processing backup' });
      }
    };
    reader.readAsText(file);
  };

  // AI Edit & Expansion Handlers
  const handleTriggerAIExpansion = async (action: 'expand_theory' | 'add_examples' | 'add_shortcuts' | 'add_traps' | 'custom', customPrompt?: string) => {
    const targetNote = isEditing ? { title: editTitle, subject: editSubject, content: editContent } : activeNote;
    if (!targetNote || !targetNote.content.trim()) {
      alert('Please enter or select some note content first to expand.');
      return;
    }

    setIsAIExpanding(true);
    setShowAIExpandMenu(false);
    setAISuccessMessage(null);

    try {
      const res = await fetch('/api/gemini/expand-edit-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentNoteContent: targetNote.content,
          action,
          subject: targetNote.subject,
          topic: isEditing ? editTopic : activeNote?.topic,
          customInstruction: customPrompt,
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to expand note with AI');
      }

      const data = await res.json();
      if (data.updatedContent) {
        if (isEditing) {
          setEditContent(data.updatedContent);
        } else if (activeNote) {
          const updatedNote: UserStudyNote = {
            ...activeNote,
            content: data.updatedContent,
            updatedAt: new Date().toLocaleString(),
            tags: Array.from(new Set([...(activeNote.tags || []), 'ai-enhanced']))
          };
          onSaveNote(updatedNote);
        }
        setAISuccessMessage('✨ Note successfully expanded and saved!');
        setTimeout(() => setAISuccessMessage(null), 3000);
      }
    } catch (err: any) {
      alert(`AI Expansion error: ${err.message || 'Could not communicate with AI server.'}`);
    } finally {
      setIsAIExpanding(false);
    }
  };

  const getSubjectIcon = (subj: Subject | 'general') => {
    switch (subj) {
      case 'mathematics': return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'physics': return <Compass className="w-4 h-4 text-purple-500" />;
      case 'chemistry': return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      case 'aptitude': return <Brain className="w-4 h-4 text-amber-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const getSubjectBadge = (subj: Subject | 'general') => {
    switch (subj) {
      case 'mathematics':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'physics':
        return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'chemistry':
        return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'aptitude':
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 text-white border border-blue-800/40 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Personal Study Notes & AI Vault
              </span>
              <span className="text-xs text-slate-400">
                {userNotes.length} Custom Study Notes Saved Permanently
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My AASTU Study Notes & AI Notes Generator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Create, organize, and edit custom revision sheets. Generate textbook-grade Day 3, 4, 5 master notes or expand existing notes with LaTeX formulas, 30s speed hacks, and worked problems with Gemini AI.
            </p>
          </div>

          {/* Quick Storage Stats & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsGeneratorModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>AI Generate Master Notes</span>
            </button>

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
              <span>Backup ({userNotes.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Expansion Notification */}
      {aiSuccessMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{aiSuccessMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30">
        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(['all', 'mathematics', 'physics', 'chemistry', 'aptitude', 'general'] as const).map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, formulas, tags..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Main Content Layout (Sidebar Drawer + Note Reader/Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Notes List Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Notes ({filteredNotes.length})
            </span>
            <button
              onClick={handleStartCreate}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Note
            </button>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <FileText className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs">No notes found.</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsGeneratorModalOpen(true)}
                    className="text-xs text-indigo-500 font-bold hover:underline"
                  >
                    ✨ Generate with Gemini AI
                  </button>
                  <button
                    onClick={handleStartCreate}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    + Create manual note
                  </button>
                </div>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isSelected = activeNote?.id === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveNoteId(note.id);
                      setIsEditing(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start justify-between gap-2 group ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {note.pinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${getSubjectBadge(note.subject)}`}>
                          {note.subject}
                        </span>
                        {note.topic && (
                          <span className="text-[10px] text-slate-500 font-medium truncate">
                            • {note.topic}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {note.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {note.content.replace(/#|\*|`|\$/g, '')}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {note.updatedAt?.slice(0, 10) || 'Recent'}
                        </span>
                        {note.tags && note.tags.length > 0 && (
                          <span className="flex items-center gap-1 truncate text-slate-400">
                            <Tag className="w-3 h-3" /> {note.tags.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons on hover */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePin(note);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500"
                        title={note.pinned ? 'Unpin' : 'Pin to top'}
                      >
                        {note.pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete note "${note.title}"?`)) {
                            onDeleteNote(note.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Active Note Area (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 min-h-[500px]">
          
          {isEditing ? (
            /* Editing Mode */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4" />
                    {activeNoteId ? 'Editing Study Note' : 'Creating New Study Note'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsPreviewTab(false)}
                      className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1 transition ${
                        !isPreviewTab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreviewTab(true)}
                      className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1 transition ${
                        isPreviewTab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview LaTeX
                    </button>
                  </div>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>

                  <button
                    id="save-student-note-submit-btn"
                    onClick={handleSaveCurrentNote}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
              </div>

              {/* Edit Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value as Subject | 'general')}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="aptitude">Aptitude & English</option>
                      <option value="general">General STEM</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Topic Focus
                    </label>
                    <input
                      type="text"
                      value={editTopic}
                      onChange={(e) => setEditTopic(e.target.value)}
                      placeholder="e.g., Calculus Limits, Rotational Dynamics, Buffer pH"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Master Summary of L'Hôpital's Rule & 30-Second Limit Hacks"
                    className="w-full text-xs sm:text-sm font-bold p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g., calculus, speed-hacks, day-1, high-yield"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* AI Assistant Toolbar for Note Expansion */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-blue-900 dark:text-blue-200 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Gemini AI Note Expander:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      disabled={isAIExpanding || !editContent.trim()}
                      onClick={() => handleTriggerAIExpansion('expand_theory')}
                      className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition disabled:opacity-40"
                    >
                      <Calculator className="w-3 h-3 text-blue-500" /> + LaTeX Formulas
                    </button>

                    <button
                      type="button"
                      disabled={isAIExpanding || !editContent.trim()}
                      onClick={() => handleTriggerAIExpansion('add_examples')}
                      className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition disabled:opacity-40"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-500" /> + Worked Problems
                    </button>

                    <button
                      type="button"
                      disabled={isAIExpanding || !editContent.trim()}
                      onClick={() => handleTriggerAIExpansion('add_shortcuts')}
                      className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition disabled:opacity-40"
                    >
                      <Zap className="w-3 h-3 text-amber-500" /> + 30s Shortcuts
                    </button>
                  </div>
                </div>

                {isAIExpanding && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    <span>Gemini AI is expanding your note with LaTeX derivations and worked examples...</span>
                  </div>
                )}

                {/* Content Textarea or LaTeX Preview */}
                {isPreviewTab ? (
                  <div className="min-h-[220px] p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed overflow-x-auto">
                    <MathRenderer text={editContent || '_No content entered yet._'} />
                  </div>
                ) : (
                  <textarea
                    id="note-content-textarea"
                    rows={12}
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

              {/* AI Quick Expansion Toolbar */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/80 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    AI Note Enhancements:
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    disabled={isAIExpanding}
                    onClick={() => handleTriggerAIExpansion('expand_theory')}
                    className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-xs"
                  >
                    <Calculator className="w-3 h-3 text-blue-500" /> + Derivations
                  </button>

                  <button
                    disabled={isAIExpanding}
                    onClick={() => handleTriggerAIExpansion('add_examples')}
                    className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-xs"
                  >
                    <BookOpen className="w-3 h-3 text-emerald-500" /> + Problems
                  </button>

                  <button
                    disabled={isAIExpanding}
                    onClick={() => handleTriggerAIExpansion('add_shortcuts')}
                    className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-xs"
                  >
                    <Zap className="w-3 h-3 text-amber-500" /> + 30s Hacks
                  </button>

                  <button
                    disabled={isAIExpanding}
                    onClick={() => handleTriggerAIExpansion('add_traps')}
                    className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-blue-50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-xs"
                  >
                    <AlertCircle className="w-3 h-3 text-rose-500" /> + Traps
                  </button>
                </div>
              </div>

              {isAIExpanding && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Gemini 3.7 Flash is updating this study note with university-grade content and saving locally...</span>
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
                    Discuss with AI Coach
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
                Select a note from the left drawer, create a fresh revision card, or generate Day 3/4/5 master notes with Gemini.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsGeneratorModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI Generate Notes
                </button>
                <button
                  onClick={handleStartCreate}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Create Study Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Note Generator Modal */}
      <AINoteGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        onSaveAsUserNote={(note) => {
          onSaveNote(note);
          setActiveNoteId(note.id);
        }}
      />

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
