import React, { useState, useEffect, useRef } from 'react';
import { AuthUser, PaymentRequestRecord } from '../types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
  submitPaymentScreenshot,
  fetchCurrentSession,
  getAuthenticatedAssetUrl,
  normalizeEthiopianPhone,
} from '../utils/authPaymentService';
import {
  Copy,
  Check,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  Phone,
  FileImage,
  Hash,
  ShieldAlert,
  Lock,
  ArrowLeft,
  X,
} from 'lucide-react';

interface PaymentGateViewProps {
  user: AuthUser;
  latestPayment: PaymentRequestRecord | null;
  onUserAndPaymentUpdated: (user: AuthUser, latestPayment: PaymentRequestRecord | null) => void;
  onLogout: () => void;
  promptFeatureName?: string | null;
  onClosePreview?: () => void;
}

export const PaymentGateView: React.FC<PaymentGateViewProps> = ({
  user,
  latestPayment,
  onUserAndPaymentUpdated,
  onLogout,
  promptFeatureName,
  onClosePreview,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [transactionRef, setTransactionRef] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmittedMessage, setJustSubmittedMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const submittingRef = useRef(false);

  const isWaitingVerification =
    user.accountStatus === 'PENDING_VERIFICATION' || latestPayment?.status === 'PENDING';
  const isRejected =
    user.accountStatus === 'REJECTED' ||
    (latestPayment?.status === 'REJECTED' && !isWaitingVerification);

  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Real-time Firestore snapshot listener + rapid 2.5s poll so student unlocks within milliseconds of Admin approval/rejection
  useEffect(() => {
    if (!isWaitingVerification && !isRejected) return;

    let isMounted = true;

    // 1. Instant real-time listener on user doc
    const unsubUser = onSnapshot(
      doc(db, 'users', user.id),
      (snap) => {
        if (!isMounted || submittingRef.current || !snap.exists()) return;
        const data = snap.data() as any;
        if (data.accountStatus !== user.accountStatus || data.rejectionReason !== user.rejectionReason) {
          fetchCurrentSession()
            .then((res) => {
              if (isMounted && !submittingRef.current) {
                onUserAndPaymentUpdated(res.user, res.latestPayment);
              }
            })
            .catch(() => {});
        }
      },
      () => {
        // Fallback silently if offline
      }
    );

    // 2. Instant real-time listener on payment doc if exists
    let unsubPay = () => {};
    if (latestPayment?.id) {
      unsubPay = onSnapshot(
        doc(db, 'payments', latestPayment.id),
        (snap) => {
          if (!isMounted || submittingRef.current || !snap.exists()) return;
          const payData = snap.data() as any;
          if (payData.status !== latestPayment.status || payData.adminNote !== latestPayment.adminNote) {
            fetchCurrentSession()
              .then((res) => {
                if (isMounted && !submittingRef.current) {
                  onUserAndPaymentUpdated(res.user, res.latestPayment);
                }
              })
              .catch(() => {});
          }
        },
        () => {}
      );
    }

    // 3. Fast 2.5s fallback poll
    const interval = setInterval(async () => {
      if (submittingRef.current) return;
      try {
        const res = await fetchCurrentSession();
        if (isMounted && !submittingRef.current) {
          onUserAndPaymentUpdated(res.user, res.latestPayment);
        }
      } catch {
        // ignore background poll errors
      }
    }, 2500);

    return () => {
      isMounted = false;
      unsubUser();
      unsubPay();
      clearInterval(interval);
    };
  }, [isWaitingVerification, isRejected, user.id, user.accountStatus, user.rejectionReason, latestPayment?.id, latestPayment?.status, latestPayment?.adminNote, onUserAndPaymentUpdated]);

  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText('0925804385');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setError(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    const isImageFile =
      file.type.startsWith('image/') ||
      (!file.type && /\.(png|jpe?g|webp|gif|bmp|heic|heif)$/i.test(file.name));
    if (!isImageFile) {
      setError('Please select a valid image screenshot (PNG, JPG, or WEBP).');
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const formatSubmitError = (err: unknown): string => {
    const raw = err instanceof Error ? err.message : String(err || '');
    if (!raw) return 'Failed to submit payment screenshot. Please try again.';
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && typeof parsed.error === 'string') {
        if (parsed.error.toLowerCase().includes('permission')) {
          return 'Unable to verify payment format with server. Please check your phone number and screenshot, then try again.';
        }
        return parsed.error;
      }
    } catch {
      // plain string error
    }
    return raw;
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const normalizedPhone = normalizeEthiopianPhone(phoneNumber.trim());
    if (!normalizedPhone || normalizedPhone.length < 4) {
      setError('Please enter a valid Ethiopian phone number (e.g. 09XXXXXXXX).');
      return;
    }
    if (!selectedFile) {
      setError('Please select your Telebirr payment screenshot from your phone.');
      return;
    }

    setSubmitting(true);
    submittingRef.current = true;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;
    try {
      const res = await Promise.race([
        submitPaymentScreenshot({
          phoneNumber: normalizedPhone,
          transactionRef: transactionRef.trim(),
          file: selectedFile,
        }),
        new Promise<never>((_, reject) => {
          safetyTimer = setTimeout(() => {
            reject(
              new Error(
                'Submission took too long. Please check your internet connection and tap Submit Payment again.'
              )
            );
          }, 35000);
        }),
      ]);
      setJustSubmittedMessage(res.message);
      onUserAndPaymentUpdated(res.user, res.payment);
    } catch (err: any) {
      setError(formatSubmitError(err));
    } finally {
      if (safetyTimer) clearTimeout(safetyTimer);
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const handleCheckStatusNow = async () => {
    setCheckingStatus(true);
    setError(null);
    try {
      const res = await fetchCurrentSession();
      onUserAndPaymentUpdated(res.user, res.latestPayment);
    } catch (err: any) {
      setError(err.message || 'Could not refresh status.');
    } finally {
      setCheckingStatus(false);
    }
  };

  const statusLabel =
    user.accountStatus === 'PENDING_VERIFICATION'
      ? 'WAITING FOR ADMIN VERIFICATION'
      : user.accountStatus === 'REJECTED'
      ? 'PAYMENT REJECTED'
      : 'PENDING PAYMENT';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md text-slate-100 flex flex-col justify-between overflow-y-auto">
      {/* Top Header */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {onClosePreview && (
              <button
                type="button"
                id="payment-back-to-preview-btn"
                onClick={onClosePreview}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to App</span>
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
              AB
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm sm:text-base text-white truncate">
                ABEFA · Unlock Full Access
              </h1>
              <p className="text-xs text-slate-400 truncate">
                Logged in as <span className="text-slate-200 font-medium">{user.username}</span> ·{' '}
                <span className="tabular-nums">{user.phoneNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCheckStatusNow}
              disabled={checkingStatus}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingStatus ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Status</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            {onClosePreview && (
              <button
                type="button"
                onClick={onClosePreview}
                aria-label="Close payment prompt"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Prompt Alert when Student Clicked a Course, Module, or AI Feature */}
        {promptFeatureName && (
          <div
            id="paid-access-required-prompt"
            className="bg-amber-950/50 border border-amber-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Paid Student Access Required (40 ETB · 20 ETB Discount)
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Unlock Required to Access: <span className="text-amber-300">{promptFeatureName}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can preview the app dashboard for free, but opening courses, study modules, practice questions, and PDFs requires a one-time 40 ETB Telebirr payment verification (20 ETB discount off 60 ETB).
                </p>
              </div>
            </div>
            {onClosePreview && (
              <button
                type="button"
                onClick={onClosePreview}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 whitespace-nowrap shrink-0 transition"
              >
                Keep Previewing App
              </button>
            )}
          </div>
        )}

        {/* Account Status Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">
              Account Status · <span className="text-amber-400 font-semibold">{statusLabel}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Unlock Full Access to ABEFA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Complete your one-time 40 ETB Telebirr payment (20 Birr discount from 60 Birr) and upload your payment screenshot for manual admin verification.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <div className="text-xs text-slate-400">One-Time Access Fee</div>
            <div className="flex items-baseline sm:justify-end gap-2">
              <span className="text-sm font-semibold text-slate-500 line-through tabular-nums">60 ETB</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                40 ETB
              </span>
            </div>
            <div className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
              20 ETB Discount
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Telebirr Payment Instructions */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5">
            <div className="border-b border-slate-800 pb-3 xs:pb-4">
              <p className="text-xs font-medium text-emerald-400">Step 1 · Send Payment via Telebirr</p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 xs:mt-1">Payment Details</h3>
            </div>

            {/* Required Clear Display: PAY 40 BIRR TO: 0925804385 Telebirr */}
            <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 text-center space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                20 BIRR DISCOUNT · WAS 60 BIRR
              </div>
              <p className="text-xs font-bold tracking-wider text-slate-400">PAY 40 BIRR TO:</p>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-mono tabular-nums">
                0925804385
              </div>
              <p className="text-base font-semibold text-emerald-400">Telebirr</p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyPaymentNumber}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied 0925804385</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Telebirr Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-white">How to Unlock Full Access:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>
                  Open your <strong className="text-white">Telebirr</strong> app and transfer{' '}
                  <strong className="text-emerald-400">40 ETB</strong>{' '}
                  <span className="text-slate-400">(20 ETB discount off 60 ETB)</span> to{' '}
                  <strong className="text-white font-mono">0925804385</strong>.
                </li>
                <li>Take a clear screenshot of the Telebirr payment confirmation screen.</li>
                <li>
                  Upload the screenshot in the form and click{' '}
                  <strong className="text-white">Submit Payment</strong>.
                </li>
                <li>
                  Wait for the Admin to verify and approve your payment request. Once approved, full
                  access unlocks immediately.
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: Confirmation State OR Payment Submission Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 xs:p-5 sm:p-6">
            {isWaitingVerification && latestPayment ? (
              <div className="space-y-6" id="payment-confirmation-box">
                <div className="p-5 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
                  <div className="flex items-center gap-2.5 text-amber-300">
                    <Clock className="w-5 h-5 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Payment submitted successfully.
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-amber-200">
                    Your payment is waiting for admin verification.
                  </p>
                  <p className="text-xs text-slate-300 pt-1">
                    This is a manual payment verification system. As soon as the Admin reviews your
                    Telebirr screenshot and clicks Approve, your account will automatically unlock.
                  </p>
                </div>

                {/* Submitted Details Summary */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400">
                    Submitted Payment Details
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div>
                      <span className="text-slate-500 block">Username</span>
                      <span className="font-semibold text-white mt-0.5 block">
                        {latestPayment.username}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone Number</span>
                      <span className="font-semibold text-white mt-0.5 block tabular-nums">
                        {latestPayment.phoneNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Amount & Method</span>
                      <span className="font-semibold text-emerald-400 mt-0.5 block tabular-nums">
                        {latestPayment.amount} {latestPayment.currency} · {latestPayment.paymentMethod}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Status</span>
                      <span className="font-semibold text-amber-400 mt-0.5 block">
                        {latestPayment.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Submitted At</span>
                      <span className="font-semibold text-slate-200 mt-0.5 block tabular-nums">
                        {new Date(latestPayment.submittedAt).toLocaleString()}
                      </span>
                    </div>
                    {latestPayment.transactionRef && (
                      <div>
                        <span className="text-slate-500 block">Transaction Ref</span>
                        <span className="font-semibold text-slate-200 mt-0.5 block font-mono">
                          {latestPayment.transactionRef}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Uploaded Screenshot Preview */}
                {latestPayment.screenshotUrl && (
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 block">Uploaded Payment Screenshot</span>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-center">
                      <img
                        src={getAuthenticatedAssetUrl(latestPayment.screenshotUrl)}
                        alt="Submitted Telebirr payment screenshot"
                        referrerPolicy="no-referrer"
                        className="max-h-64 rounded-lg object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCheckStatusNow}
                    disabled={checkingStatus}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${checkingStatus ? 'animate-spin' : ''}`} />
                    <span>{checkingStatus ? 'Checking Status...' : 'Check Verification Status'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <p className="text-xs font-medium text-blue-400">
                    Step 2 · Submit Payment Proof for Admin Verification
                  </p>
                  <h3 className="text-lg font-bold text-white mt-1">Payment Submission Form</h3>
                </div>

                {isRejected && (
                  <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-rose-300">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Previous Payment Request Was Rejected by Admin</span>
                    </div>
                    <p className="text-slate-200">
                      {user.rejectionReason ||
                        latestPayment?.adminNote ||
                        'Please ensure you transfer 40 ETB to 0925804385 via Telebirr and upload a clear payment screenshot below.'}
                    </p>
                  </div>
                )}

                {justSubmittedMessage && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{justSubmittedMessage}</span>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  {/* Required: Student Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Student Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="payment-input-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="09XXXXXXXX"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Optional: Transaction / Reference Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Telebirr Transaction / Reference Number{' '}
                      <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="payment-input-txref"
                        type="text"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder="e.g. BI82XXXXXX (optional)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
                      />
                    </div>
                  </div>

                  {/* Required: Payment Screenshot */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Telebirr Payment Screenshot <span className="text-rose-400">*</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      id="payment-input-screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer border-2 border-dashed rounded-xl p-5 text-center transition ${
                        selectedFile
                          ? 'border-emerald-500/60 bg-emerald-950/20'
                          : 'border-slate-700 hover:border-blue-500/60 bg-slate-950'
                      }`}
                    >
                      {previewUrl ? (
                        <div className="space-y-3">
                          <img
                            src={previewUrl}
                            alt="Selected payment screenshot preview"
                            className="max-h-52 mx-auto rounded-lg object-contain border border-slate-800"
                          />
                          <div className="text-xs text-emerald-300 font-medium flex items-center justify-center gap-1.5">
                            <FileImage className="w-4 h-4" />
                            <span className="truncate max-w-xs">{selectedFile?.name}</span>
                            <span className="text-slate-400">· Tap to change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-blue-400">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white">
                            Select Telebirr Payment Screenshot from Phone
                          </div>
                          <p className="text-xs text-slate-400">
                            Tap here to choose your 40 ETB Telebirr receipt screenshot (JPG, PNG, WEBP)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    id="payment-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Payment...' : 'Submit Payment'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        © 2026 ABEFA · Telebirr 40 ETB Manual Payment Verification (20 ETB Discount)
      </footer>
    </div>
  );
};
