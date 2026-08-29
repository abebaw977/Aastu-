import React, { useState, useEffect, useRef } from 'react';
import { Question, Subject, TutorChatSession, TutorChatMessage, UserStudyNote } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  HelpCircle, 
  Lightbulb, 
  Flame, 
  Calculator,
  Compass,
  FlaskConical,
  Brain,
  Key,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  History,
  Plus,
  Trash2,
  Pin,
  PinOff,
  Copy,
  Check,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  MessageSquare
} from 'lucide-react';
import { 
  loadTutorChatSessions, 
  saveTutorChatSessionsToStorage, 
  loadUserNotes, 
  saveUserNotesToStorage 
} from '../utils/storage';

interface AITutorViewProps {
  initialQuestionContext?: Question | null;
  onClearContext?: () => void;
  onSaveUserNote?: (note: UserStudyNote) => void;
}

interface GeneratedQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  shortcut: string;
}

const DEFAULT_WELCOME_MESSAGE: TutorChatMessage = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `👋 **Selam! I am your 24/7 AASTU Entrance Exam AI Coach.**\n\nI specialize in **Mathematics (Calculus, Vectors, Geometry), Physics (Mechanics, Waves, Electromagnetism), Chemistry (Physical, Organic & Inorganic), and Analytical & Verbal Aptitude**.\n\nAsk me anything:\n- Step-by-step problem solutions and rigorous derivations\n- 30-45 second exam shortcuts and mental math hacks\n- Common pitfalls, traps, and distractors Ethiopian university examiners design.\n\n*What topic or question are we tackling today?*`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AITutorView: React.FC<AITutorViewProps> = ({
  initialQuestionContext,
  onClearContext,
  onSaveUserNote,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'generator' | 'concepts' | 'apikey'>('chat');
  
  // History and Session Management
  const [sessions, setSessions] = useState<TutorChatSession[]>(() => {
    return loadTutorChatSessions();
  });
  
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const saved = loadTutorChatSessions();
    if (saved.length > 0) return saved[0].id;
    return `session-${Date.now()}`;
  });

  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState<boolean>(false);
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');
  
  // Current active messages
  const [messages, setMessages] = useState<TutorChatMessage[]>(() => {
    const saved = loadTutorChatSessions();
    if (saved.length > 0) return saved[0].messages;
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [savedNoteMsgId, setSavedNoteMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Question Generator state
  const [genSubject, setGenSubject] = useState<string>('Mathematics');
  const [genTopic, setGenTopic] = useState<string>('Calculus & Limits');
  const [genDifficulty, setGenDifficulty] = useState<string>('Medium');
  const [generatedQuestion, setGeneratedQuestion] = useState<GeneratedQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Concept Explainer state
  const [conceptQuery, setConceptQuery] = useState<string>('L’Hôpital’s Rule for Indeterminate Forms (0/0, ∞/∞)');
  const [conceptResult, setConceptResult] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Sync current conversation to sessions and localStorage
  const syncCurrentSession = (updatedMessages: TutorChatMessage[]) => {
    const now = new Date().toLocaleString();
    
    // Derive title from first user message
    const firstUserMsg = updatedMessages.find(m => m.role === 'user');
    let sessionTitle = firstUserMsg 
      ? firstUserMsg.content.slice(0, 42).trim() + (firstUserMsg.content.length > 42 ? '...' : '') 
      : 'AASTU Prep Discussion';
    
    if (initialQuestionContext) {
      sessionTitle = `Exam Q: ${initialQuestionContext.question.slice(0, 35)}...`;
    }

    setSessions(prev => {
      const existingIdx = prev.findIndex(s => s.id === currentSessionId);
      let updated: TutorChatSession[];
      
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          title: updated[existingIdx].title === 'AASTU Prep Discussion' ? sessionTitle : updated[existingIdx].title,
          updatedAt: now,
          messages: updatedMessages,
        };
      } else {
        const newSession: TutorChatSession = {
          id: currentSessionId,
          title: sessionTitle,
          subject: initialQuestionContext?.subject || 'general',
          createdAt: now,
          updatedAt: now,
          messages: updatedMessages,
          pinned: false,
        };
        updated = [newSession, ...prev];
      }

      saveTutorChatSessionsToStorage(updated);
      return updated;
    });
  };

  const handleStartNewSession = () => {
    const newId = `session-${Date.now()}`;
    const initialMsgs: TutorChatMessage[] = [DEFAULT_WELCOME_MESSAGE];
    setCurrentSessionId(newId);
    setMessages(initialMsgs);
    if (onClearContext) onClearContext();
    
    // Insert into sessions list
    const newSession: TutorChatSession = {
      id: newId,
      title: 'New AASTU Coaching Session',
      subject: 'general',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      messages: initialMsgs,
      pinned: false,
    };

    setSessions(prev => {
      const updated = [newSession, ...prev];
      saveTutorChatSessionsToStorage(updated);
      return updated;
    });
  };

  const handleSelectSession = (s: TutorChatSession) => {
    setCurrentSessionId(s.id);
    setMessages(s.messages);
    if (window.innerWidth < 768) {
      setIsHistorySidebarOpen(false);
    }
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved AI Coach session?')) return;

    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      saveTutorChatSessionsToStorage(filtered);
      
      if (id === currentSessionId) {
        if (filtered.length > 0) {
          setCurrentSessionId(filtered[0].id);
          setMessages(filtered[0].messages);
        } else {
          const freshId = `session-${Date.now()}`;
          setCurrentSessionId(freshId);
          setMessages([DEFAULT_WELCOME_MESSAGE]);
        }
      }
      return filtered;
    });
  };

  const handleTogglePinSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s);
      saveTutorChatSessionsToStorage(updated);
      return updated;
    });
  };

  const handleClearAllHistory = () => {
    if (!window.confirm('Are you sure you want to clear ALL past AI Coach conversation history? This cannot be undone.')) return;
    setSessions([]);
    saveTutorChatSessionsToStorage([]);
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([DEFAULT_WELCOME_MESSAGE]);
  };

  const samplePrompts = [
    { title: "L'Hôpital Limits Tricks", query: "Give me the fastest shortcut techniques to evaluate limits with L'Hôpital's rule on the AASTU exam." },
    { title: "Atwood Machine Physics", query: "Explain how to find acceleration and string tension for connected pulley blocks on inclines." },
    { title: "Le Chatelier Shift Rules", query: "How do temperature and pressure changes shift chemical equilibrium in exothermic reactions?" },
    { title: "Work Rate Math Shortcut", query: "Show me the fast mental math formula for 2 or 3 people working together on a task." },
    { title: "5-Day Study Cramming Strategy", query: "How should I structure my daily study hours for the next 5 days to maximize my AASTU score?" }
  ];

  const highYieldConcepts = [
    { title: "L'Hôpital & Indeterminate Forms", subject: "Mathematics", query: "L’Hôpital’s Rule and limits of indeterminate forms (0/0, inf/inf, 1^inf)" },
    { title: "3D Vectors & Line-Plane Distances", subject: "Mathematics", query: "3D Vector Cross Products, Plane Equations, and Shortest Distances" },
    { title: "Rotational Dynamics & Torque", subject: "Physics", query: "Moment of Inertia, Rolling without Slipping, and Angular Momentum Conservation" },
    { title: "Gauss's Law & Electric Flux", subject: "Physics", query: "Gauss's Law, Electric Flux through closed surfaces, and spherical charge distributions" },
    { title: "Buffer Solutions & Henderson-Hasselbalch", subject: "Chemistry", query: "Buffer solutions, pH calculation, and Henderson-Hasselbalch equation" },
    { title: "Inverted Conditionals & Subjunctives", subject: "Aptitude & English", query: "Inverted conditionals (Had I known, Were he to go) and Subject-Verb Agreement traps" }
  ];

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: TutorChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    syncCurrentSession(newMsgs);

    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: text,
          subject: initialQuestionContext?.subject || 'STEM General',
          context: initialQuestionContext 
            ? `Question: ${initialQuestionContext.question}\nOptions: ${initialQuestionContext.options.join(', ')}\nCorrect Answer: ${initialQuestionContext.options[initialQuestionContext.correctAnswer]}`
            : 'AASTU Ethiopian University Entrance Examination Prep'
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Failed to reach AI Tutor endpoint');
      }

      const data = await res.json();
      const botMsg: TutorChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'assistant',
        content: data.answer || "I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedMsgs = [...newMsgs, botMsg];
      setMessages(updatedMsgs);
      syncCurrentSession(updatedMsgs);
    } catch (err: any) {
      const errorMsg: TutorChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Could not generate response.**\n\n${err.message || 'Please verify your Gemini API Key in Settings > Secrets or check connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const updatedMsgs = [...newMsgs, errorMsg];
      setMessages(updatedMsgs);
      syncCurrentSession(updatedMsgs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMessageAsNote = (msg: TutorChatMessage, promptText?: string) => {
    const title = promptText ? `Coach Note: ${promptText.slice(0, 35)}...` : 'AI Coach Study Explanation';
    const now = new Date().toLocaleString();
    
    const userNote: UserStudyNote = {
      id: `ai-coach-note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      subject: (initialQuestionContext?.subject || 'general') as Subject,
      topic: 'AI Coach Tutoring',
      content: msg.content,
      tags: ['ai-coach', 'explanation', 'formula'],
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };

    if (onSaveUserNote) {
      onSaveUserNote(userNote);
    } else {
      const existing = loadUserNotes();
      saveUserNotesToStorage([userNote, ...existing]);
    }

    setSavedNoteMsgId(msg.id);
    setTimeout(() => setSavedNoteMsgId(null), 2500);
  };

  const handleCopyMessage = (msg: TutorChatMessage) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedMsgId(msg.id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleExportSession = () => {
    let md = `# AASTU AI Coach Session Log\n**Exported:** ${new Date().toLocaleString()}\n\n---\n\n`;
    messages.forEach(m => {
      md += `### ${m.role === 'user' ? '🧑 Student' : '🤖 AI Coach'} [${m.timestamp}]\n\n${m.content}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AASTU_AI_Coach_Chat_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateQuestion = async () => {
    setIsGenerating(true);
    setSelectedOption(null);
    try {
      const res = await fetch('/api/gemini/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: genSubject,
          topic: genTopic,
          difficulty: genDifficulty
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Could not generate question');
      }

      const data = await res.json();
      setGeneratedQuestion(data);
    } catch (err: any) {
      alert(`Error generating question: ${err.message || 'Check Gemini API Key configuration'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExplainConcept = async (conceptToExplain?: string) => {
    const query = conceptToExplain || conceptQuery;
    if (!query.trim() || isExplaining) return;

    setIsExplaining(true);
    try {
      const res = await fetch('/api/gemini/explain-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: query,
          subject: genSubject
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Failed to fetch concept explanation');
      }
      const data = await res.json();
      setConceptResult(data.explanation || 'No explanation generated');
    } catch (err: any) {
      setConceptResult(`⚠️ Could not explain concept: ${err.message}`);
    } finally {
      setIsExplaining(false);
    }
  };

  // Filtered Sessions for search
  const filteredSessions = sessions.filter(s => {
    const q = historySearchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.messages.some(m => m.content.toLowerCase().includes(q));
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-5 text-white border border-blue-800/40 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-blue-600 flex items-center justify-center shadow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              AASTU 24/7 AI Exam Coach & Solver
            </h2>
            <p className="text-xs text-blue-200">
              Persistent step-by-step solutions, chat session history, and 1-click note saving.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            AI Tutor Chat
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'generator'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Question Generator
          </button>

          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'concepts'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            Concept Explorer
          </button>

          <button
            onClick={() => setActiveTab('apikey')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'apikey'
                ? 'bg-amber-600 text-white shadow'
                : 'text-amber-300 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            API Key
          </button>
        </div>
      </div>

      {/* If opened with specific question context */}
      {initialQuestionContext && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex items-start justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              Active Question Context ({initialQuestionContext.subject}):
            </div>
            <div className="text-slate-800 dark:text-slate-200 font-medium line-clamp-2">
              <MathRenderer text={initialQuestionContext.question} />
            </div>
          </div>
          {onClearContext && (
            <button
              onClick={onClearContext}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs underline shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* TAB 1: AI TUTOR CHAT WITH PERMANENT SESSION HISTORY */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left History Sidebar (Collapsible on desktop, drawer on mobile) */}
          <div className={`lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3 ${
            isHistorySidebarOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-blue-500" />
                Coach Sessions ({sessions.length})
              </span>
              <button
                onClick={handleStartNewSession}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> New Chat
              </button>
            </div>

            {/* Search History */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                placeholder="Search past explanations..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Saved Sessions List */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  <MessageSquare className="w-6 h-6 mx-auto mb-1 opacity-40" />
                  No chat history found.
                </div>
              ) : (
                filteredSessions.map((s) => {
                  const isCurrent = s.id === currentSessionId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectSession(s)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition flex items-start justify-between gap-2 group ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {s.pinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
                          <h5 className="text-xs truncate">{s.title}</h5>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{s.messages.length} msgs</span>
                          <span>•</span>
                          <span>{s.updatedAt?.slice(0, 10) || 'Recent'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                        <button
                          onClick={(e) => handleTogglePinSession(s.id, e)}
                          className="p-1 text-slate-400 hover:text-amber-500"
                          title={s.pinned ? 'Unpin' : 'Pin'}
                        >
                          {s.pinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={(e) => handleDeleteSession(s.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-500"
                          title="Delete Session"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {sessions.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                <button
                  onClick={handleClearAllHistory}
                  className="text-rose-500 hover:underline"
                >
                  Clear All History
                </button>
                <button
                  onClick={handleExportSession}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Export MD
                </button>
              </div>
            )}
          </div>

          {/* Right Chat Container (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsHistorySidebarOpen(!isHistorySidebarOpen)}
                  className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1"
                >
                  <History className="w-3.5 h-3.5 text-blue-500" />
                  <span>History ({sessions.length})</span>
                </button>

                <span className="font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                  Active Coaching Session
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartNewSession}
                  className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-blue-100 transition"
                >
                  <Plus className="w-3 h-3" /> New Chat
                </button>

                <button
                  onClick={handleExportSession}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Export this conversation as Markdown"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 min-h-[420px] max-h-[520px] overflow-y-auto space-y-4">
              {messages.map((m, idx) => {
                const isAssistant = m.role === 'assistant';
                const isSaved = savedNoteMsgId === m.id;
                const isCopied = copiedMsgId === m.id;

                // Find prompt prior to this assistant msg
                const prevUserMsg = idx > 0 ? messages[idx - 1]?.content : undefined;

                return (
                  <div
                    key={m.id || idx}
                    className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isAssistant ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 shadow-sm'
                        : 'bg-blue-600 text-white rounded-br-none'
                    }`}>
                      <div className="font-sans">
                        <MathRenderer text={m.content} />
                      </div>

                      {/* Bottom action toolbar for assistant answers */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px]">
                        <span className={`font-mono ${isAssistant ? 'text-slate-400' : 'text-blue-200'}`}>
                          {m.timestamp}
                        </span>

                        {isAssistant && idx > 0 && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyMessage(m)}
                              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 transition"
                              title="Copy explanation"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button
                              onClick={() => handleSaveMessageAsNote(m, prevUserMsg)}
                              className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold transition"
                              title="Save permanently into My Study Notes"
                            >
                              {isSaved ? <CheckCircle2 className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                              <span>{isSaved ? 'Saved to Notes!' : 'Save to My Notes'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-500" />
                    Thinking and solving step-by-step with Gemini 3.7 Flash...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              <span className="text-[11px] font-bold uppercase text-slate-400 whitespace-nowrap">
                Quick Prompts:
              </span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 whitespace-nowrap transition"
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Query Input Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 shadow-md flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask any math/physics question, request a shortcut, or paste a difficult problem..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isLoading}
                className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl shadow transition shrink-0 flex items-center gap-1 text-xs font-semibold"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Ask AI Coach</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DYNAMIC QUESTION GENERATOR */}
      {activeTab === 'generator' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Dynamic AASTU Question Generator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Generate infinite realistic university entrance exam questions with KaTeX formulas, step-by-step explanations, and 45-second speed hacks.
            </p>
          </div>

          {/* Generator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={genSubject}
                onChange={(e) => {
                  setGenSubject(e.target.value);
                  if (e.target.value === 'Mathematics') setGenTopic('Calculus & Limits');
                  else if (e.target.value === 'Physics') setGenTopic('Newtonian Mechanics & Pulley Systems');
                  else if (e.target.value === 'Chemistry') setGenTopic('Stoichiometry & Equilibrium');
                  else setGenTopic('Grammar & Analytical Aptitude');
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Aptitude">English & Aptitude</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Topic Focus
              </label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                placeholder="e.g., 3D Vectors, Thermodynamics, Inverted Conditionals"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Difficulty Level
              </label>
              <select
                value={genDifficulty}
                onChange={(e) => setGenDifficulty(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Standard Grade 12">Standard Grade 12 High-Yield</option>
                <option value="Advanced AASTU Level">Advanced AASTU Level</option>
                <option value="Challenging Competition Level">Challenging Top-1% Level</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateQuestion}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Exam Question...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Generate New Question
                </>
              )}
            </button>
          </div>

          {/* Render Generated Question */}
          {generatedQuestion && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
                  {generatedQuestion.subject} • {generatedQuestion.topic}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Target Time: 60s
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                <MathRenderer text={generatedQuestion.question} />
              </div>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {generatedQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = oIdx === generatedQuestion.correctAnswer;
                  const showResult = selectedOption !== null;

                  let btnClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400";
                  if (showResult) {
                    if (isCorrect) {
                      btnClass = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold";
                    } else if (isSelected) {
                      btnClass = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200";
                    }
                  } else if (isSelected) {
                    btnClass = "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showResult}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition ${btnClass}`}
                    >
                      <span><MathRenderer text={opt} /></span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Shortcut */}
              {selectedOption !== null && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-blue-900 dark:text-blue-300">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Step-by-Step Explanation:
                    </div>
                    <div><MathRenderer text={generatedQuestion.explanation} /></div>
                  </div>

                  {generatedQuestion.shortcut && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                        <Zap className="w-4 h-4 text-amber-600" />
                        AASTU 45-Second Exam Shortcut:
                      </div>
                      <div><MathRenderer text={generatedQuestion.shortcut} /></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONCEPT EXPLORER */}
      {activeTab === 'concepts' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" />
              High-Yield Concept & Shortcut Explorer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select or type any exam formula, theorem, or grammar rule to receive a complete breakdown with mnemonics, equations, and worked sample problems.
            </p>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {highYieldConcepts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setConceptQuery(item.query);
                  handleExplainConcept(item.query);
                }}
                className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">{item.subject}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.query}</p>
              </button>
            ))}
          </div>

          {/* Custom Search */}
          <div className="flex gap-2">
            <input
              type="text"
              value={conceptQuery}
              onChange={(e) => setConceptQuery(e.target.value)}
              placeholder="Type any concept (e.g., Archimedes Parabola Shortcut, Lenz's Law, Henderson equation)..."
              className="flex-1 text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleExplainConcept()}
              disabled={isExplaining || !conceptQuery.trim()}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5 shrink-0"
            >
              {isExplaining ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              Explain
            </button>
          </div>

          {/* Result */}
          {conceptResult && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed space-y-3">
              <div className="font-sans">
                <MathRenderer text={conceptResult} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: API KEY BEST PRACTICES GUIDE */}
      {activeTab === 'apikey' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-500/20">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Best & Most Secure Way to Add Your Gemini API Key
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Follow this guide to connect Google's Gemini API seamlessly and securely in Google AI Studio and Node.js environments.
              </p>
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Get a Free API Key
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Visit <strong>Google AI Studio</strong> at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline font-semibold"
                >
                  aistudio.google.com/app/apikey
                </a>{' '}
                and click <strong>"Create API Key"</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                In AI Studio UI (Top Right)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Click the <strong>Settings (⚙️)</strong> menu in the upper right ➔ Select <strong>Secrets / Environment Variables</strong> ➔ Add or paste your key into <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-[11px] font-mono">GEMINI_API_KEY</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Local Development (.env)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If running the code locally or on GitHub/Cloud Run, create a <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-[11px] font-mono">.env</code> file in the project root containing:
                <br />
                <code className="block mt-1 p-1 bg-slate-900 text-emerald-400 text-[10px] rounded font-mono">
                  GEMINI_API_KEY="AIzaSy..."
                </code>
              </p>
            </div>
          </div>

          {/* Security Best Practices Banner */}
          <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-emerald-950 dark:text-emerald-200">
              <div className="font-bold">Full-Stack Server-Side Protection</div>
              <p className="leading-relaxed text-emerald-900 dark:text-emerald-300">
                This application uses a full-stack architecture where all AI calls are safely proxied through backend routes (<code className="font-mono text-[11px]">/api/gemini/*</code>). Your API key is never exposed to browser client-side bundles or inspect tools.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
