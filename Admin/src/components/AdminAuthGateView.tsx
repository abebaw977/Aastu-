import React, { useState, useEffect } from 'react';
import { AuthUser, PaymentRequestRecord } from '../../../src/types';
import { loginUser, logoutUser } from '../../../src/utils/authPaymentService';
import { ADMIN_FIREBASE_PROJECT_ID } from '../firebase';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Database,
  KeyRound,
} from 'lucide-react';

interface AdminAuthGateViewProps {
  onAdminAuthenticated: (user: AuthUser, latestPayment: PaymentRequestRecord | null) => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 60;

export const AdminAuthGateView: React.FC<AdminAuthGateViewProps> = ({ onAdminAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (lockoutRemaining > 0) {
      setError(`Security Lockout Active: Please wait ${lockoutRemaining}s before trying again.`);
      return;
    }

    if (!username.trim() || !password) {
      setError('Please enter your Administrator Username and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({
        usernameOrPhone: username.trim(),
        password,
      });

      if (res.user.role !== 'admin') {
        await logoutUser().catch(() => {});
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
          setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
          setFailedAttempts(0);
          setError(
            `Unauthorized non-admin access attempt blocked. Security lockout activated for ${LOCKOUT_DURATION_SECONDS} seconds.`
          );
        } else {
          setError(
            `Access Denied: This account does not have Administrator privileges (${MAX_FAILED_ATTEMPTS - nextAttempts} attempts remaining).`
          );
        }
        setLoading(false);
        return;
      }

      setFailedAttempts(0);
      onAdminAuthenticated(res.user, res.latestPayment);
    } catch (err: any) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
        setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
        setFailedAttempts(0);
        setError(
          `Too many failed authentication attempts. Security lockout activated for ${LOCKOUT_DURATION_SECONDS} seconds.`
        );
      } else {
        setError(
          err.message ||
            `Invalid Administrator credentials (${MAX_FAILED_ATTEMPTS - nextAttempts} attempts remaining).`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Security Header */}
      <header className="border-b border-amber-500/20 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-sm text-slate-950 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white block leading-none">
                ABEFA Admin Control
              </span>
              <span className="text-[11px] text-amber-400 font-medium">
                Isolated Administrator Application · Protected Access
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Firebase: {ADMIN_FIREBASE_PROJECT_ID}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Centered Admin Authentication Vault */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Administrator Sign In</h1>
              <p className="text-xs text-slate-400">
                Verify Telebirr 40 ETB payments, publish PDFs & post Mid/Final Exam MCQs
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Username or Phone
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-auth-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  autoComplete="username"
                  disabled={lockoutRemaining > 0 || loading}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  disabled={lockoutRemaining > 0 || loading}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-auth-submit"
              type="submit"
              disabled={loading || lockoutRemaining > 0}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>
                {lockoutRemaining > 0
                  ? `Locked (${lockoutRemaining}s)`
                  : loading
                  ? 'Verifying Admin Credentials...'
                  : 'Unlock Admin Control Panel'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Protected by Brute-Force Lockout & Firestore Role Verification. Unauthorized access is strictly prohibited.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        © 2026 ABEFA Admin Control App · Package ID: edu.freshmanacademy.admin
      </footer>
    </div>
  );
};
