import React, { useState, useEffect } from 'react';
import { Subject, Semester, CustomCourseOutline, OutlineChapterItem, UserStudyNote } from '../types';
import { OFFICIAL_17_FRESHMAN_COURSES, getCourseById } from '../data/freshmanCourseCatalog';
import { MathRenderer } from './MathRenderer';
import { formatCourseOutlineSummary } from '../utils/storage';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  BookOpen, 
  FileText, 
  Upload, 
  Check, 
  AlertCircle, 
  RotateCcw,
  GraduationCap,
  Layers,
  ChevronDown,
  Calendar,
  User,
  Percent,
  Edit3,
  FolderKanban
} from 'lucide-react';

interface AddEditCourseSyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  onSaveOutline: (outline: CustomCourseOutline) => void;
  onDeleteOutline?: (courseIdOrId: string) => void;
  onSaveNote?: (note: UserStudyNote) => void;
  existingOutline?: CustomCourseOutline | null;
  customOutlines?: Record<string, CustomCourseOutline>;
}

const SUBJECT_OPTIONS: { value: Subject; label: string }[] = OFFICIAL_17_FRESHMAN_COURSES.map(
  (c) => ({
    value: c.subject,
    label: c.shortTitle,
  })
);

export const AddEditCourseSyllabusModal: React.FC<AddEditCourseSyllabusModalProps> = ({
  isOpen,
  onClose,
  initialCourseId = 'anthropology',
  onSaveOutline,
  onDeleteOutline,
  onSaveNote,
  existingOutline,
  customOutlines = {},
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || 'anthropology');
  const [activeTab, setActiveTab] = useState<'editor' | 'quick_paste' | 'saved_vault' | 'preview'>('editor');

  // Form fields
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [subject, setSubject] = useState<Subject>('mathematics');
  const [semester, setSemester] = useState<Semester>(1);
  const [instructorName, setInstructorName] = useState<string>('');
  const [academicYear, setAcademicYear] = useState<string>('2026 Academic Year');
  const [syllabusOverview, setSyllabusOverview] = useState<string>('');
  const [gradingPolicy, setGradingPolicy] = useState<string>('Midterm: 30%, Quizzes & Assignments: 20%, Final Exam: 50%');
  const [chapters, setChapters] = useState<OutlineChapterItem[]>([]);
  const [customLectureNotes, setCustomLectureNotes] = useState<string>('');

  // Quick paste text
  const [quickPasteText, setQuickPasteText] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [lastSavedOutline, setLastSavedOutline] = useState<CustomCourseOutline | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const savedOutlinesList: CustomCourseOutline[] = Object.values(customOutlines || {});

  useEffect(() => {
    if (isOpen) {
      setSelectedCourseId(initialCourseId || 'anthropology');
      setSaveSuccess(false);
      setConfirmDeleteId(null);
    }
  }, [initialCourseId, isOpen]);

  // Load existing outline or defaults when selectedCourseId changes
  useEffect(() => {
    setConfirmDeleteId(null);
    setLastSavedOutline(null);

    if (selectedCourseId === '__new_custom__') {
      setCourseCode('CUST 101');
      setCourseTitle('');
      setSubject('chemistry_2');
      setSemester(1);
      setInstructorName('');
      setAcademicYear('2026 Academic Year');
      setSyllabusOverview('');
      setGradingPolicy('Midterm: 30%, Continuous Assessment: 20%, Final Exam: 50%');
      setChapters([
        {
          id: `ch-1-${Date.now()}`,
          chapterNumber: 1,
          title: 'Chapter 1: Fundamental Concepts & Definitions',
          topics: ['Core definitions and classifications', 'Governing mechanisms and properties'],
          readings: 'Lecture Handout Unit 1',
        },
        {
          id: `ch-2-${Date.now()}`,
          chapterNumber: 2,
          title: 'Chapter 2: Mathematical Formulations & Applications',
          topics: ['Quantitative relationships and equations', 'Worked exam problem applications'],
          readings: 'Lecture Handout Unit 2',
        },
      ]);
      setCustomLectureNotes('');
      return;
    }

    const savedMatch =
      customOutlines[selectedCourseId] ||
      (existingOutline && existingOutline.courseId === selectedCourseId ? existingOutline : null) ||
      savedOutlinesList.find((o) => o.id === selectedCourseId || o.courseId === selectedCourseId);

    if (savedMatch) {
      setCourseCode(savedMatch.courseCode);
      setCourseTitle(savedMatch.courseTitle);
      setSubject(savedMatch.subject);
      setSemester(savedMatch.semester || 1);
      setInstructorName(savedMatch.instructorName || '');
      setAcademicYear(savedMatch.academicYear || '2026 Academic Year');
      setSyllabusOverview(savedMatch.syllabusOverview || '');
      setGradingPolicy(savedMatch.gradingPolicy || 'Midterm: 30%, Quizzes: 20%, Final Exam: 50%');
      setChapters(
        savedMatch.chapters && savedMatch.chapters.length > 0
          ? savedMatch.chapters.map((c, idx) => ({
              id: c.id || `ch-${idx + 1}-${Date.now()}`,
              chapterNumber: idx + 1,
              title: c.title,
              topics: Array.isArray(c.topics) ? [...c.topics] : [String(c.topics || '')],
              readings: c.readings || '',
            }))
          : []
      );
      setCustomLectureNotes(savedMatch.customLectureNotes || '');
      return;
    }

    const course = getCourseById(selectedCourseId);
    if (course) {
      setCourseCode(course.code);
      setCourseTitle(course.title);
      setSubject(course.subject);
      setSemester(course.semester);
      setInstructorName('');
      setAcademicYear('2026 Academic Year');
      setSyllabusOverview(course.overview);
      setGradingPolicy(`Midterm: ${course.midtermWeight}, Final: ${course.finalWeight}`);
      setChapters(
        course.defaultChapters.map((c, i) => ({
          id: `ch-${i + 1}-${Date.now()}`,
          chapterNumber: c.chapterNumber,
          title: c.title,
          topics: [...c.topics],
          readings: c.readings || '',
        }))
      );
      setCustomLectureNotes('');
    }
  }, [selectedCourseId, existingOutline, customOutlines]);

  if (!isOpen) return null;

  const isCurrentSaved = Boolean(
    selectedCourseId !== '__new_custom__' &&
      (customOutlines[selectedCourseId] ||
        savedOutlinesList.some((o) => o.courseId === selectedCourseId || o.id === selectedCourseId))
  );

  const handleResetToMoSHEDefaults = () => {
    const course = getCourseById(selectedCourseId);
    if (!course) return;

    setCourseCode(course.code);
    setCourseTitle(course.title);
    setSubject(course.subject);
    setSemester(course.semester);
    setSyllabusOverview(course.overview);
    setGradingPolicy(`Midterm: ${course.midtermWeight}, Final: ${course.finalWeight}`);
    setChapters(
      course.defaultChapters.map((c, i) => ({
        id: `ch-${i + 1}-${Date.now()}`,
        chapterNumber: c.chapterNumber,
        title: c.title,
        topics: [...c.topics],
        readings: c.readings || '',
      }))
    );
  };

  const handleAddChapter = () => {
    const nextNum = chapters.length + 1;
    const newChapter: OutlineChapterItem = {
      id: `ch-${nextNum}-${Date.now()}`,
      chapterNumber: nextNum,
      title: `Chapter ${nextNum}: New Unit Title`,
      topics: ['Subtopic 1', 'Subtopic 2'],
      readings: '',
    };
    setChapters([...chapters, newChapter]);
  };

  const handleRemoveChapter = (id: string) => {
    if (chapters.length <= 1) {
      setErrorMsg('Course outline must have at least one chapter.');
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    const updated = chapters
      .filter((ch) => ch.id !== id)
      .map((ch, idx) => ({ ...ch, chapterNumber: idx + 1 }));
    setChapters(updated);
  };

  const handleUpdateChapter = (id: string, field: keyof OutlineChapterItem, value: any) => {
    setChapters(
      chapters.map((ch) => {
        if (ch.id === id) {
          return { ...ch, [field]: value };
        }
        return ch;
      })
    );
  };

  const handleTopicsStringChange = (id: string, topicsStr: string) => {
    const list = topicsStr
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);
    handleUpdateChapter(id, 'topics', list.length > 0 ? list : [topicsStr]);
  };

  const handleParseQuickPaste = () => {
    if (!quickPasteText.trim()) return;

    try {
      const parsed = JSON.parse(quickPasteText);
      if (parsed.chapters && Array.isArray(parsed.chapters)) {
        if (parsed.courseTitle) setCourseTitle(parsed.courseTitle);
        if (parsed.courseCode) setCourseCode(parsed.courseCode);
        if (parsed.syllabusOverview) setSyllabusOverview(parsed.syllabusOverview);
        if (parsed.gradingPolicy) setGradingPolicy(parsed.gradingPolicy);
        if (parsed.customLectureNotes) setCustomLectureNotes(parsed.customLectureNotes);

        const newChapters: OutlineChapterItem[] = parsed.chapters.map((c: any, idx: number) => ({
          id: `ch-${idx + 1}-${Date.now()}`,
          chapterNumber: c.chapterNumber || idx + 1,
          title: c.title || `Chapter ${idx + 1}`,
          topics: Array.isArray(c.topics) ? c.topics : [String(c.topics || '')],
          readings: c.readings || '',
        }));
        setChapters(newChapters);
        setActiveTab('editor');
        return;
      }
    } catch {
      const lines = quickPasteText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
      const parsedChapters: OutlineChapterItem[] = [];
      let currentCh: OutlineChapterItem | null = null;
      const notesBuffer: string[] = [];

      lines.forEach((line) => {
        const chMatch = line.match(/^(?:Chapter|Unit|Module|Week|\d+[.:])\s*(\d+)?[:\-.]?\s*(.+)$/i);
        if (chMatch) {
          if (currentCh) {
            parsedChapters.push(currentCh);
          }
          const num = parsedChapters.length + 1;
          currentCh = {
            id: `ch-${num}-${Date.now()}`,
            chapterNumber: num,
            title: chMatch[2] || line,
            topics: [],
            readings: '',
          };
        } else if (line.startsWith('-') || line.startsWith('*') || line.startsWith('•')) {
          const topicClean = line.replace(/^[-*•]\s*/, '').trim();
          if (currentCh) {
            currentCh.topics.push(topicClean);
          } else {
            notesBuffer.push(line);
          }
        } else {
          if (currentCh && currentCh.topics.length < 6) {
            currentCh.topics.push(line);
          } else {
            notesBuffer.push(line);
          }
        }
      });

      if (currentCh) {
        parsedChapters.push(currentCh);
      }

      if (parsedChapters.length > 0) {
        setChapters(parsedChapters);
      }
      if (notesBuffer.length > 0 && !customLectureNotes) {
        setCustomLectureNotes(notesBuffer.join('\n\n'));
      }
      setActiveTab('editor');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setQuickPasteText(text);
        try {
          const parsed = JSON.parse(text);
          if (parsed.chapters) {
            setQuickPasteText(JSON.stringify(parsed, null, 2));
          }
        } catch {
          // Plain text
        }
      }
    };
    reader.readAsText(file);
  };

  const buildCurrentOutlineObject = (): CustomCourseOutline => {
    const cleanCode = courseCode.trim() || 'COURSE 101';
    const effectiveCourseId =
      selectedCourseId === '__new_custom__'
        ? `custom-${cleanCode.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`
        : selectedCourseId;

    const existing = customOutlines[effectiveCourseId];
    return {
      id: existing?.id || `outline-${effectiveCourseId}-${Date.now()}`,
      courseId: effectiveCourseId,
      courseCode: cleanCode,
      courseTitle: courseTitle.trim() || `${cleanCode} Course Outline`,
      subject,
      semester,
      instructorName: instructorName.trim() || undefined,
      academicYear: academicYear.trim() || undefined,
      syllabusOverview:
        syllabusOverview.trim() ||
        `Structured university course outline and contents for ${courseTitle.trim() || cleanCode}.`,
      gradingPolicy: gradingPolicy.trim(),
      chapters: chapters.map((ch, idx) => ({
        ...ch,
        chapterNumber: idx + 1,
        topics: ch.topics.filter((t) => t.trim().length > 0),
      })),
      customLectureNotes: customLectureNotes.trim() || undefined,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleSave = () => {
    if (!courseTitle.trim()) {
      setErrorMsg('Please enter a Course Title before saving.');
      setTimeout(() => setErrorMsg(null), 3500);
      return;
    }

    const outline = buildCurrentOutlineObject();
    onSaveOutline(outline);
    setSelectedCourseId(outline.courseId);
    setLastSavedOutline(outline);

    if (customLectureNotes.trim() && onSaveNote) {
      const noteItem: UserStudyNote = {
        id: `note-${outline.courseId}-${Date.now()}`,
        title: `${outline.courseCode}: ${outline.courseTitle} — Syllabus & Course Contents`,
        subject: outline.subject,
        courseId: outline.courseId,
        courseCode: outline.courseCode,
        semester: outline.semester,
        topic: outline.courseTitle,
        content: `### Course: ${outline.courseCode} — ${outline.courseTitle}\n**Instructor:** ${
          instructorName || 'Department Faculty'
        }\n**Grading:** ${gradingPolicy}\n\n#### Course Outline Chapters:\n${outline.chapters
          .map(
            (c) =>
              `**Chapter ${c.chapterNumber}: ${c.title}**\n${c.topics.map((t) => `- ${t}`).join('\n')}`
          )
          .join('\n\n')}\n\n---\n\n#### Course Contents & Lecture Notes:\n${customLectureNotes}`,
        tags: ['Course Outline', outline.courseCode, outline.subject],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: true,
      };
      onSaveNote(noteItem);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  const handleDeleteCurrentOrTarget = (targetCourseId: string) => {
    if (!onDeleteOutline) return;
    onDeleteOutline(targetCourseId);
    setConfirmDeleteId(null);
    setLastSavedOutline(null);
    if (targetCourseId === selectedCourseId) {
      const official = getCourseById(targetCourseId);
      if (official) {
        handleResetToMoSHEDefaults();
      } else {
        setSelectedCourseId('anthropology');
      }
    }
  };

  const customCreatedOutlines = savedOutlinesList.filter(
    (o) => !OFFICIAL_17_FRESHMAN_COURSES.some((c) => c.id === o.courseId)
  );

  const previewOutlineObj = buildCurrentOutlineObject();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Course Outlines & Contents Manager
                </h3>
                <span className="text-xs text-emerald-300 font-semibold">
                  · {savedOutlinesList.length} Saved Course Outline{savedOutlinesList.length === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Add, edit, or delete your personal course outlines, chapters, and study notes permanently.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Selector & Mode Switcher Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-[260px] flex flex-wrap sm:flex-nowrap items-center gap-2">
            <label className="text-xs font-semibold text-slate-300 whitespace-nowrap">
              Course Outline:
            </label>
            <div className="relative flex-1 min-w-[210px]">
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  if (activeTab === 'saved_vault') setActiveTab('editor');
                }}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer pr-8"
              >
                <option value="__new_custom__">
                  + Create Brand-New Custom Course Outline...
                </option>
                {customCreatedOutlines.length > 0 && (
                  <optgroup label="Your Custom Added Courses">
                    {customCreatedOutlines.map((co) => (
                      <option key={co.courseId} value={co.courseId}>
                        [Saved ✓] {co.courseCode}: {co.courseTitle}
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="University Subject List (19 Subjects)">
                  {OFFICIAL_17_FRESHMAN_COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {customOutlines[c.id] ? '[Saved ✓] ' : ''}
                      {c.shortTitle}
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCourseId('__new_custom__');
                setActiveTab('editor');
              }}
              className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Custom Course</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Outline Editor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quick_paste')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'quick_paste'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Quick Paste / Import</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved_vault')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'saved_vault'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Saved Outlines ({savedOutlinesList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Outline Preview</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Post-Save Confirmation Banner */}
          {(saveSuccess || lastSavedOutline) && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    Course Outline & Contents Permanently Saved ({ (lastSavedOutline || previewOutlineObj).courseCode }: { (lastSavedOutline || previewOutlineObj).courseTitle })
                  </div>
                  <div className="text-[11px] text-emerald-200/80">
                    Your syllabus outline and chapters are now available inside Subjects & Course Notes.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="space-y-6">
              {/* Course Meta Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> Course Code
                  </label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. Chem 1012 / CS 201"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Course Title / Custom Course Name
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="e.g. Polymer Chemistry & Macromolecules / Applied Calculus"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Subject Domain
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" /> Instructor / Department
                  </label>
                  <input
                    type="text"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    placeholder="e.g. Dr. Yohannes / Chemistry Dept"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Academic Year
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="e.g. 2026 Academic Year"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-purple-400" /> Grading Weights
                  </label>
                  <input
                    type="text"
                    value={gradingPolicy}
                    onChange={(e) => setGradingPolicy(e.target.value)}
                    placeholder="e.g. Midterm 30%, Final 50%"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Course Overview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Course Outline Overview & Objectives
                  </label>
                  {getCourseById(selectedCourseId) && (
                    <button
                      type="button"
                      onClick={handleResetToMoSHEDefaults}
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset to Standard Default Outline
                    </button>
                  )}
                </div>
                <textarea
                  value={syllabusOverview}
                  onChange={(e) => setSyllabusOverview(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="Describe the course scope, learning goals, and focus areas..."
                />
              </div>

              {/* Chapters & Units Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>Course Outline Chapters & Units ({chapters.length})</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Add each chapter/unit and its subtopics to organize your course study plan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Chapter / Unit</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {chapters.map((ch, idx) => (
                    <div
                      key={ch.id || idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                            {ch.chapterNumber}
                          </span>
                          <input
                            type="text"
                            value={ch.title}
                            onChange={(e) => handleUpdateChapter(ch.id, 'title', e.target.value)}
                            placeholder="Chapter / Unit title..."
                            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveChapter(ch.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                          title="Delete Chapter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">
                            Chapter Subtopics & Contents (one per line)
                          </label>
                          <textarea
                            value={ch.topics.join('\n')}
                            onChange={(e) => handleTopicsStringChange(ch.id, e.target.value)}
                            rows={3}
                            placeholder={'e.g. Addition vs Condensation Polymers\nDegree of Polymerization & Molecular Weight\nCrystallinity and Glass Transition Temperature'}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">
                            Reference Textbook / Module Readings (optional)
                          </label>
                          <textarea
                            value={ch.readings || ''}
                            onChange={(e) => handleUpdateChapter(ch.id, 'readings', e.target.value)}
                            rows={3}
                            placeholder="e.g. Course Module Ch. 3, Lecture Slides Week 4..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Course Contents & Lecture Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Course Contents, Lecture Material & Specific Definitions</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Supports Markdown & LaTeX formulas (<code className="text-cyan-300">$...$</code>)
                  </span>
                </div>
                <textarea
                  value={customLectureNotes}
                  onChange={(e) => setCustomLectureNotes(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  placeholder="Paste your detailed course contents, lecturer notes, key equations, theorem statements, or syllabus instructions here..."
                />
              </div>
            </div>
          )}

          {activeTab === 'quick_paste' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" /> Rapid Course Outline & Syllabus Importer
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Paste any course outline text from your university syllabus, PDF, handout, or upload a file. It will automatically organize your chapters, subtopics, and course contents.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition border border-slate-700 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload Outline File (.txt / .md / .json)
                    <input type="file" accept=".txt,.json,.md" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <textarea
                value={quickPasteText}
                onChange={(e) => setQuickPasteText(e.target.value)}
                rows={10}
                placeholder={`Paste your course outline or syllabus here. Example:\n\nChapter 1: Introduction to Polymers\n- Monomers, repeating units, and classification\n- Addition vs condensation polymerization mechanisms\n- Degree of polymerization and molar mass calculation\n\nChapter 2: Thermal & Mechanical Properties of Polymers\n- Glass transition temperature (Tg) and melting point (Tm)\n- Cross-linking, elastomers, fibers, and plastics`}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleParseQuickPaste}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                  <span>Parse into Chapters & Course Contents</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved_vault' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Your Permanently Saved Course Outlines ({savedOutlinesList.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Edit or delete your saved course outlines and syllabus chapters below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourseId('__new_custom__');
                    setActiveTab('editor');
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Course Outline</span>
                </button>
              </div>

              {savedOutlinesList.length === 0 ? (
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-8 text-center space-y-3">
                  <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
                  <div className="text-sm font-bold text-white">No Custom Course Outlines Saved Yet</div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Use the Outline Editor or Quick Paste tab to add a course outline and click &ldquo;Save Course Outline Permanently&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedOutlinesList.map((item) => (
                    <div
                      key={item.courseId || item.id}
                      className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="font-bold text-blue-400">{item.courseCode}</span>
                            <span>·</span>
                            <span>{item.chapters?.length || 0} Chapters</span>
                          </div>
                          <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                            {item.courseTitle}
                          </h5>
                          {item.syllabusOverview && (
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {item.syllabusOverview}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCourseId(item.courseId);
                              setActiveTab('editor');
                            }}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Edit</span>
                          </button>

                          {confirmDeleteId === item.courseId ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleDeleteCurrentOrTarget(item.courseId)}
                                className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition"
                              >
                                Confirm Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(item.courseId)}
                              className="px-2.5 py-1.5 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Chapters preview list */}
                      {item.chapters && item.chapters.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {item.chapters.map((ch) => (
                            <div
                              key={ch.id || ch.chapterNumber}
                              className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-2.5 text-xs flex items-start justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-slate-200 truncate">
                                  Ch {ch.chapterNumber}: {ch.title}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                                  {ch.topics.join(', ')}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-bold text-blue-400">{courseCode}</span>
                  <span>·</span>
                  <span className="text-emerald-400">{gradingPolicy}</span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">{courseTitle || 'Untitled Course Outline'}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{syllabusOverview}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Structured Course Outline Summary
                </h4>
                <pre className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-[11px] text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto">
                  {formatCourseOutlineSummary(previewOutlineObj)}
                </pre>
              </div>

              {customLectureNotes && (
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Rendered Course Contents & Lecture Notes
                  </h4>
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 prose prose-invert max-w-none">
                    <MathRenderer content={customLectureNotes} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Close
            </button>

            {isCurrentSaved && onDeleteOutline && (
              confirmDeleteId === selectedCourseId ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDeleteCurrentOrTarget(selectedCourseId)}
                    className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
                  >
                    Confirm Permanent Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-2.5 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(selectedCourseId)}
                  className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Saved Outline</span>
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved Permanently!
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Course Outline Permanently</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
