import React, { useState, useEffect } from 'react';
import { AuthUser, ThemeMode } from '../types';
import { updateUserProfile } from '../utils/authPaymentService';
import {
  X,
  User,
  Phone,
  Lock,
  Palette,
  CheckCircle2,
  AlertCircle,
  Save,
  Sun,
  Moon,
  ShieldCheck,
} from 'lucide-react';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onUserUpdated: (updated: AuthUser) => void;
  themeMode: ThemeMode;
  onChangeThemeMode: (mode: ThemeMode) => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdated,
  themeMode,
  onChangeThemeMode,
}) => {
  const [username, setUsername] = useState(currentUser.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUsername(currentUser.username);
      setCurrentPassword('');
      setNewPassword('');
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSaving(true);
    try {
      const res = await updateUserProfile({
        username,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      onUserUpdated(res.user);
      setSuccessMsg(`${res.message} Settings updated.`);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const themeOptions: {
    id: ThemeMode;
    label: string;
    subtitle: string;
    previewBg: string;
    previewBorder: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'blue',
      label: 'Blue Mode',
      subtitle: 'Deep Academic Navy & Royal Blue background',
      previewBg: 'bg-[#0b1d3a] text-white',
      previewBorder: 'border-blue-500',
      icon: <Palette className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'black',
      label: 'Black Mode',
      subtitle: 'True Pitch Black contrast & battery saver',
      previewBg: 'bg-black text-white',
      previewBorder: 'border-slate-500',
      icon: <Moon className="w-4 h-4 text-slate-200" />,
    },
    {
      id: 'white',
      label: 'White Mode',
      subtitle: 'Crisp Daylight White background with dark text',
      previewBg: 'bg-white text-slate-900',
      previewBorder: 'border-amber-500',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Settings & Profile System</h2>
              <p className="text-xs text-slate-400">
                Update your name or password (Phone is your permanent student ID)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* 1. BACKGROUND MODE SWITCHER (BLUE / BLACK / WHITE) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-blue-400" />
                <span>Background Mode (Blue · Black · White)</span>
              </label>
              <span className="text-xs font-semibold text-blue-400 capitalize">
                Active: {themeMode}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {themeOptions.map((opt) => {
                const isSelected = themeMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeThemeMode(opt.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-950/50'
                        : 'border-slate-700 bg-slate-800/70 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center ${opt.previewBg} ${opt.previewBorder}`}
                      >
                        {opt.icon}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {opt.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. MODIFY USER PROFILE FORM */}
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Update Name & Password</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentUser.role === 'admin' ? 'Admin Account' : currentUser.accountStatus}
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Student Name / Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={64}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-400">
                    Phone Number (Primary ID)
                  </label>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-700/50 text-[10px] font-bold text-amber-300">
                    <Lock className="w-2.5 h-2.5" />
                    Locked
                  </span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={currentUser.phoneNumber}
                    readOnly
                    disabled
                    aria-readonly="true"
                    title="Phone number is your permanent student account profile (like email) and cannot be changed"
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-400 cursor-not-allowed select-none"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  Permanent primary student profile (like email) — cannot be modified.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Password (Optional — leave blank to keep current password)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    New Password (min 6 chars)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
