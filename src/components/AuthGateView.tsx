import React, { useState } from 'react';
import { AuthUser, PaymentRequestRecord } from '../types';
import { loginUser, signUpStudent, logoutUser } from '../utils/authPaymentService';
import {
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface AuthGateViewProps {
  onAuthenticated: (user: AuthUser, latestPayment: PaymentRequestRecord | null) => void;
}

export const AuthGateView: React.FC<AuthGateViewProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetFormMessages = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (!username.trim() || !phoneNumber.trim() || !password || !confirmPassword) {
        setError('Please fill in Username, Phone Number, Password, and Confirm Password.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      setLoading(true);
      try {
        const res = await signUpStudent({
          username: username.trim(),
          phoneNumber: phoneNumber.trim(),
          password,
          confirmPassword,
        });
        onAuthenticated(res.user, res.latestPayment);
      } catch (err: any) {
        let msg = err?.message || 'Sign up failed. Please try again.';
        try {
          if (typeof msg === 'string' && msg.trim().startsWith('{')) {
            const parsed = JSON.parse(msg);
            if (parsed?.error) msg = parsed.error;
          }
        } catch {}
        setError(msg);
      } finally {
        setLoading(false);
      }
    } else {
      if (!username.trim() || !password) {
        setError('Please enter your Username (or Phone Number) and Password.');
        return;
      }

      setLoading(true);
      try {
        const res = await loginUser({
          usernameOrPhone: username.trim(),
          password,
        });
        if (res.user.role === 'admin') {
          await logoutUser().catch(() => {});
          setError(
            'Admin accounts are separated from the Freshman Student App for security. Please sign in using the dedicated Admin Control App.'
          );
          setLoading(false);
          return;
        }
        onAuthenticated(res.user, res.latestPayment);
      } catch (err: any) {
        let msg = err?.message || 'Invalid credentials. Please check your username and password.';
        try {
          if (typeof msg === 'string' && msg.trim().startsWith('{')) {
            const parsed = JSON.parse(msg);
            if (parsed?.error) msg = parsed.error;
          }
        } catch {}
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Bar (Pure Student Portal — Zero Admin Buttons) */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
              AB
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-white">
              ABEFA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              Student Portal
            </span>
          </div>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 flex items-center justify-center p-3 xs:p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Academic Value Proposition (Hidden on small mobile so form is immediate) */}
          <div className="hidden md:block md:col-span-6 space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-blue-400 tracking-wide uppercase">
                Ethiopian Higher Education Freshman Curriculum · MoSHE / MoGE
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Complete First-Year University Mastery & Exam Preparation
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Sign in or create your student account to unlock all 17 Freshman Common Courses,
                Textbook Master Notes, Official PDF Handouts, Mid & Final Exam Practice Questions,
                and Flashcards Speed Drills.
              </p>
            </div>
          </div>

          {/* Right Column: Student Login & Sign-Up Card */}
          <div className="w-full md:col-span-6 max-w-md mx-auto md:max-w-none">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 xs:p-6 sm:p-8 shadow-xl">
              {/* Segmented Mode Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-6">
                <button
                  type="button"
                  id="auth-tab-login"
                  onClick={() => resetFormMessages('login')}
                  className={`py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${
                    mode === 'login'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  id="auth-tab-signup"
                  onClick={() => resetFormMessages('signup')}
                  className={`py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${
                    mode === 'signup'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SIGN UP
                </button>
              </div>

              {/* Heading */}
              <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {mode === 'login' ? 'Welcome Back, Student' : 'Create Student Account'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'login'
                    ? 'Log in with your Username (or Phone Number) and Password.'
                    : 'Sign up requires only Username, Phone Number, and Password — no email needed.'}
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {mode === 'signup' ? 'Username' : 'Username or Phone Number'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="auth-input-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        mode === 'signup'
                          ? 'Choose a username (e.g. abebe_2026)'
                          : 'Enter your username or phone number'
                      }
                      autoComplete="username"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Phone Number (Required on SIGN UP) */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="auth-input-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="09XXXXXXXX"
                        autoComplete="tel"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 tabular-nums"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="auth-input-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        mode === 'signup' ? 'Create password (min. 6 characters)' : 'Enter your password'
                      }
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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

                {/* Confirm Password (Required on SIGN UP) */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <CheckCircle2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="auth-input-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>
                    {loading
                      ? 'Please wait...'
                      : mode === 'signup'
                      ? 'Sign Up & Open App'
                      : 'Login to Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Mode Footer Switcher */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
                {mode === 'login' ? (
                  <p>
                    Don&apos;t have a student account yet?{' '}
                    <button
                      type="button"
                      onClick={() => resetFormMessages('signup')}
                      className="text-blue-400 font-semibold hover:underline"
                    >
                      Sign Up Now
                    </button>
                  </p>
                ) : (
                  <p>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => resetFormMessages('login')}
                      className="text-blue-400 font-semibold hover:underline"
                    >
                      Login Here
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        © 2026 ABEFA · Official Student Learning Portal
      </footer>
    </div>
  );
};
