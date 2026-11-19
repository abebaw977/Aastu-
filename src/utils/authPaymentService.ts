import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  AccountStatus,
  AdminPracticePost,
  AuthUser,
  PaymentRequestRecord,
  PublishedPdfDocument,
  Semester,
  Subject,
} from '../types';
import {
  getDownloadedPdfFromDevice,
  saveDownloadedPdfToDevice,
} from './pdfOfflineStorage';

const AUTH_TOKEN_STORAGE_KEY = 'freshman_auth_session_token';
const AUTH_USER_ID_STORAGE_KEY = 'freshman_auth_user_id';
const CACHED_AUTH_USER_KEY = 'freshman_cached_auth_user_v1';
const CACHED_LATEST_PAYMENT_KEY = 'freshman_cached_latest_payment_v1';
const CACHED_PUBLISHED_PDFS_META_KEY = 'freshman_cached_published_pdfs_meta_v1';
const CACHED_PRACTICE_POSTS_KEY = 'freshman_cached_practice_posts_v1';
const LOCAL_APK_DB_KEY = 'freshman_apk_sqlite_mirror_v1';

export function getSavedAuthToken(): string {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function getSavedUserId(): string {
  try {
    const explicit = localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
    if (explicit) return explicit;
    const tok = getSavedAuthToken();
    if (tok.startsWith('fah_uid:')) {
      return tok.split(':')[1] || '';
    }
    return '';
  } catch {
    return '';
  }
}

export function getCachedAuthUser(): AuthUser | null {
  try {
    if (!getSavedAuthToken()) return null;
    const raw = localStorage.getItem(CACHED_AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getCachedLatestPayment(): PaymentRequestRecord | null {
  try {
    if (!getSavedAuthToken()) return null;
    const raw = localStorage.getItem(CACHED_LATEST_PAYMENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PaymentRequestRecord;
  } catch {
    return null;
  }
}

export function saveCachedSession(
  user: AuthUser | null,
  latestPayment?: PaymentRequestRecord | null
): void {
  try {
    if (user) {
      localStorage.setItem(CACHED_AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CACHED_AUTH_USER_KEY);
    }
    if (latestPayment !== undefined) {
      if (latestPayment) {
        localStorage.setItem(CACHED_LATEST_PAYMENT_KEY, JSON.stringify(latestPayment));
      } else {
        localStorage.removeItem(CACHED_LATEST_PAYMENT_KEY);
      }
    }
  } catch {
    // ignore storage errors
  }
}

export function saveAuthToken(token: string, userId?: string): void {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }
    if (userId) {
      localStorage.setItem(AUTH_USER_ID_STORAGE_KEY, userId);
    }
  } catch {
    // ignore storage errors
  }
}

export function clearAuthToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
    localStorage.removeItem(CACHED_AUTH_USER_KEY);
    localStorage.removeItem(CACHED_LATEST_PAYMENT_KEY);
  } catch {
    // ignore storage errors
  }
}

export const FREE_TRIAL_SUBJECT: Subject = 'anthropology';

export function isFreeCourseSubject(subject?: string | null): boolean {
  return String(subject || '').trim().toLowerCase() === 'anthropology';
}

const DEVICE_HARDWARE_ID_KEY = 'freshman_device_hardware_id_v3';
const LEGACY_DEVICE_ACTIVATED_PHONE_KEY = 'freshman_device_activated_phone_v1';

function computePhoneHardwareSignature(): string {
  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return 'srv00000';
    }
    const ua = String(navigator.userAgent || '');
    // Extract Android device model if present in User-Agent (e.g. "SM-A045F", "Pixel 7")
    const androidModelMatch = ua.match(/Android\s+[0-9.]+;\s*([^;)]+)/i);
    const modelToken = androidModelMatch
      ? androidModelMatch[1].replace(/\s+Build\/.*$/i, '').trim().toLowerCase()
      : String(navigator.platform || 'web').toLowerCase();
    const sw = typeof window.screen !== 'undefined' ? window.screen.width || 0 : 0;
    const sh = typeof window.screen !== 'undefined' ? window.screen.height || 0 : 0;
    const minDim = Math.min(sw, sh);
    const maxDim = Math.max(sw, sh);
    const dpr = typeof window.devicePixelRatio === 'number' ? Math.round(window.devicePixelRatio * 100) : 100;
    const cores = (navigator as any).hardwareConcurrency || 4;
    const rawSig = `${modelToken}|${minDim}x${maxDim}|${dpr}|${cores}`;
    let hash = 2166136261;
    for (let i = 0; i < rawSig.length; i++) {
      hash ^= rawSig.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36).slice(0, 8).padStart(6, '0');
  } catch {
    return 'hw000000';
  }
}

export function getOrCreateDeviceId(): string {
  try {
    // Always remove legacy single-phone-system lock key so it never blocks login or signup
    localStorage.removeItem(LEGACY_DEVICE_ACTIVATED_PHONE_KEY);

    const hwSig = computePhoneHardwareSignature();
    let existing = localStorage.getItem(DEVICE_HARDWARE_ID_KEY);
    if (!existing || !existing.startsWith(`v3_${hwSig}_`)) {
      const randPart =
        existing && existing.startsWith('v3_')
          ? existing.split('_').slice(2).join('_')
          : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
      existing = `v3_${hwSig}_${randPart}`.slice(0, 64);
      localStorage.setItem(DEVICE_HARDWARE_ID_KEY, existing);
    }
    return existing;
  } catch {
    return `v3_${computePhoneHardwareSignature()}_local`;
  }
}

export function isSamePhysicalPhone(
  serverBoundDeviceId: string | undefined | null,
  currentDeviceId: string
): boolean {
  const bound = String(serverBoundDeviceId || '').trim();
  if (!bound) return true;
  // Legacy device IDs before v3 are automatically migrated to the current phone on login
  if (!bound.startsWith('v3_')) return true;
  if (bound === currentDeviceId) return true;

  // Compare physical phone hardware signature so switching between Chrome & APK on the same phone is recognized as 1 phone
  const boundParts = bound.split('_');
  const currentParts = String(currentDeviceId || '').split('_');
  if (boundParts.length >= 3 && currentParts.length >= 3 && boundParts[1] === currentParts[1]) {
    return true;
  }
  return false;
}

export function normalizeEthiopianPhone(raw: string): string {
  const cleaned = String(raw || '').replace(/[\s\-()]/g, '').trim();
  if (cleaned.startsWith('+251') && cleaned.length === 13) {
    return '0' + cleaned.slice(4);
  }
  if (cleaned.startsWith('251') && cleaned.length === 12) {
    return '0' + cleaned.slice(3);
  }
  if ((cleaned.startsWith('9') || cleaned.startsWith('7')) && cleaned.length === 9) {
    return '0' + cleaned;
  }
  return cleaned;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Network request timed out while offline.'));
    }, ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Attaches the user's session token to protected screenshot or PDF URLs
 * so they remain private and require authentication.
 */
export function getAuthenticatedAssetUrl(rawUrl: string, download = false): string {
  if (!rawUrl) return '';
  if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) return rawUrl;
  const token = getSavedAuthToken();
  const sep = rawUrl.includes('?') ? '&' : '?';
  let finalUrl = token ? `${rawUrl}${sep}token=${encodeURIComponent(token)}` : rawUrl;
  if (download) {
    finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'download=1';
  }
  return finalUrl;
}

function normalizeScreenshotMime(rawMime?: string, fileName?: string): string {
  const cleaned = String(rawMime || '').trim().toLowerCase();
  if (cleaned.startsWith('image/') && cleaned.length >= 7 && cleaned.length <= 64) {
    return cleaned;
  }
  const lowerName = String(fileName || '').toLowerCase();
  if (lowerName.endsWith('.png')) return 'image/png';
  if (lowerName.endsWith('.webp')) return 'image/webp';
  if (lowerName.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return withTimeout(
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = String(reader.result || '');
        if (!res || !res.startsWith('data:')) {
          reject(new Error('Selected file could not be read as an image.'));
          return;
        }
        resolve(res);
      };
      reader.onerror = () => reject(new Error('Failed to read selected file.'));
      reader.onabort = () => reject(new Error('Reading selected file was cancelled.'));
      try {
        reader.readAsDataURL(file);
      } catch {
        reject(new Error('Failed to open selected screenshot file.'));
      }
    }),
    7000
  );
}

/**
 * Compresses image screenshots so phone camera/screen photos always stay
 * well under Firestore's 1 MiB document size limit while keeping Telebirr text sharp.
 */
export async function compressScreenshotDataUrl(file: File): Promise<{
  dataUrl: string;
  mime: string;
  byteSize: number;
}> {
  const rawDataUrl = await readFileAsDataUrl(file);
  const safeMime = normalizeScreenshotMime(file.type, file.name);
  const maxAllowedChars = 650000;

  if (
    typeof document === 'undefined' ||
    (rawDataUrl.length <= 320000 &&
      ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(safeMime))
  ) {
    return {
      dataUrl: rawDataUrl,
      mime: safeMime,
      byteSize: Math.max(10, Math.round(rawDataUrl.length * 0.75)),
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (rawDataUrl.length <= 850000) {
        resolve({
          dataUrl: rawDataUrl,
          mime: safeMime,
          byteSize: Math.max(10, Math.round(rawDataUrl.length * 0.75)),
        });
      } else {
        reject(
          new Error(
            'Screenshot image is too large or took too long to process. Please select a clearer JPG or PNG screenshot.'
          )
        );
      }
    }, 8000);

    const finishResolve = (result: { dataUrl: string; mime: string; byteSize: number }) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(result);
    };

    const finishReject = (err: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(err);
    };

    const img = new Image();
    img.onload = () => {
      try {
        const steps = [
          { maxDim: 1080, quality: 0.72 },
          { maxDim: 900, quality: 0.54 },
          { maxDim: 720, quality: 0.4 },
          { maxDim: 560, quality: 0.3 },
        ];

        let bestDataUrl = '';
        for (const step of steps) {
          let width = img.naturalWidth || img.width || 800;
          let height = img.naturalHeight || img.height || 1200;
          if (width > step.maxDim || height > step.maxDim) {
            if (width > height) {
              height = Math.max(1, Math.round((height * step.maxDim) / width));
              width = step.maxDim;
            } else {
              width = Math.max(1, Math.round((width * step.maxDim) / height));
              height = step.maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) break;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', step.quality);
          bestDataUrl = compressed;
          if (compressed.length <= maxAllowedChars) {
            finishResolve({
              dataUrl: compressed,
              mime: 'image/jpeg',
              byteSize: Math.max(10, Math.round(compressed.length * 0.75)),
            });
            return;
          }
        }

        if (bestDataUrl && bestDataUrl.length <= 880000) {
          finishResolve({
            dataUrl: bestDataUrl,
            mime: 'image/jpeg',
            byteSize: Math.max(10, Math.round(bestDataUrl.length * 0.75)),
          });
          return;
        }

        if (rawDataUrl.length <= 850000) {
          finishResolve({
            dataUrl: rawDataUrl,
            mime: safeMime,
            byteSize: Math.max(10, Math.round(rawDataUrl.length * 0.75)),
          });
          return;
        }

        finishReject(
          new Error(
            'Screenshot file is too large to upload. Please crop or take a regular phone screenshot under 1 MB.'
          )
        );
      } catch {
        if (rawDataUrl.length <= 850000) {
          finishResolve({
            dataUrl: rawDataUrl,
            mime: safeMime,
            byteSize: Math.max(10, Math.round(rawDataUrl.length * 0.75)),
          });
        } else {
          finishReject(
            new Error('Could not process this image format. Please choose a JPG or PNG screenshot.')
          );
        }
      }
    };
    img.onerror = () => {
      if (rawDataUrl.length <= 850000) {
        finishResolve({
          dataUrl: rawDataUrl,
          mime: safeMime,
          byteSize: Math.max(10, Math.round(rawDataUrl.length * 0.75)),
        });
      } else {
        finishReject(
          new Error('Unsupported or unreadable image file. Please select a JPG or PNG screenshot.')
        );
      }
    };
    img.src = rawDataUrl;
  });
}

// ============================================================================
// WebCrypto PBKDF2 Password Hashing (Shared across Web + Android APK + Firestore)
// ============================================================================
async function hashPasswordWebCrypto(password: string, saltHex?: string): Promise<string> {
  const salt =
    saltHex ||
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 50000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `pbkdf2$${salt}$${hashHex}`;
}

async function verifyPasswordWebCrypto(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split('$');
    if (parts[0] !== 'pbkdf2') return false;
    if (parts.length === 3) {
      const salt = parts[1];
      const candidate = await hashPasswordWebCrypto(password, salt);
      return candidate === storedHash;
    }
    if (parts.length === 4) {
      const iter = parseInt(parts[1], 10) || 10000;
      const salt = parts[2];
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
      const derivedBits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: enc.encode(salt), iterations: iter, hash: 'SHA-256' },
        keyMaterial,
        256
      );
      const hashHex = Array.from(new Uint8Array(derivedBits))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return `pbkdf2$${iter}$${salt}$${hashHex}` === storedHash;
    }
    return false;
  } catch {
    return false;
  }
}

const ADMIN_PRESET_HASH =
  'pbkdf2$f4a9b2c8e1d30765a4b8c9d0e2f13456$a978603d742f23cd2dbeb74677bedf296062825993eb733a7072364765bedc13';
const ADMIN_PRESET_NAME = 'AfraimAbebaw';

interface FirestoreUserDoc {
  id: string;
  username: string;
  usernameLower: string;
  phoneNumber: string;
  passwordHash: string;
  role: 'student' | 'admin';
  accountStatus: AccountStatus;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
  boundDeviceId?: string;
}

interface FirestorePaymentDoc {
  id: string;
  userId: string;
  username: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  paymentMethod: 'Telebirr';
  transactionRef: string;
  screenshotMime: string;
  screenshotSize: number;
  screenshotDataUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  adminNote: string;
  submittedAt: string;
  reviewedAt: string;
  reviewedBy: string;
}

interface FirestorePdfDoc {
  id: string;
  title: string;
  subject: Subject;
  courseCode: string;
  semester: Semester;
  category: string;
  description: string;
  originalFilename: string;
  fileSize: number;
  isPublished: boolean;
  uploadedBy: string;
  createdAt: string;
  chunkCount: number;
}

interface FirestorePdfChunkDoc {
  id: string;
  pdfId: string;
  chunkIndex: number;
  data: string;
}

function toAuthUser(docData: FirestoreUserDoc): AuthUser {
  return {
    id: docData.id,
    username: docData.username,
    phoneNumber: docData.phoneNumber,
    role: docData.role,
    accountStatus: docData.accountStatus,
    rejectionReason: docData.rejectionReason ? docData.rejectionReason : null,
    createdAt: docData.createdAt,
    updatedAt: docData.updatedAt,
  };
}

function toPaymentRecord(docData: FirestorePaymentDoc): PaymentRequestRecord {
  return {
    id: docData.id,
    userId: docData.userId,
    username: docData.username,
    phoneNumber: docData.phoneNumber,
    amount: docData.amount,
    currency: docData.currency,
    paymentMethod: 'Telebirr',
    transactionRef: docData.transactionRef,
    screenshotMime: docData.screenshotMime,
    screenshotSize: docData.screenshotSize,
    screenshotUrl: docData.screenshotDataUrl,
    status: docData.status,
    adminNote: docData.adminNote ? docData.adminNote : null,
    submittedAt: docData.submittedAt,
    reviewedAt: docData.reviewedAt ? docData.reviewedAt : null,
    reviewedBy: docData.reviewedBy ? docData.reviewedBy : null,
  };
}

function isPermissionDeniedError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return msg.includes('missing or insufficient permissions') || msg.includes('permission-denied');
}

async function ensureCloudAdminAccount(): Promise<FirestoreUserDoc> {
  const adminRef = doc(db, 'users', 'usr_admin_default');
  try {
    const snap = await getDoc(adminRef);
    const now = new Date().toISOString();
    if (!snap.exists()) {
      const adminDoc: FirestoreUserDoc = {
        id: 'usr_admin_default',
        username: ADMIN_PRESET_NAME,
        usernameLower: ADMIN_PRESET_NAME.toLowerCase(),
        phoneNumber: '0925804385',
        passwordHash: ADMIN_PRESET_HASH,
        role: 'admin',
        accountStatus: 'APPROVED',
        rejectionReason: '',
        createdAt: now,
        updatedAt: now,
      };
      await setDoc(adminRef, adminDoc);
      return adminDoc;
    }
    const existingData = snap.data() as FirestoreUserDoc;
    return existingData;
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.GET, 'users/usr_admin_default');
    }
    throw error;
  }
}

async function fetchLatestPaymentForUserFromCloud(userId: string): Promise<PaymentRequestRecord | null> {
  try {
    const q = query(collection(db, 'payments'), where('currency', '==', 'ETB'));
    const snap = await getDocs(q);
    const matching = snap.docs
      .map((d) => d.data() as FirestorePaymentDoc)
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    return matching.length > 0 ? toPaymentRecord(matching[0]) : null;
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.LIST, 'payments');
    }
    return null;
  }
}

async function reassemblePdfDataUrl(pdfDoc: FirestorePdfDoc): Promise<string> {
  try {
    const chunkPromises: Promise<string>[] = [];
    for (let i = 0; i < pdfDoc.chunkCount; i++) {
      const chunkId = `${pdfDoc.id}_chunk_${i}`;
      chunkPromises.push(
        getDoc(doc(db, 'pdf_chunks', chunkId)).then((s) =>
          s.exists() ? (s.data() as FirestorePdfChunkDoc).data : ''
        )
      );
    }
    const parts = await Promise.all(chunkPromises);
    return parts.join('');
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.GET, 'pdf_chunks');
    }
    return '';
  }
}

// ============================================================================
// Offline Local Fallback (Used ONLY when device has zero internet connection)
// ============================================================================
interface LocalApkDbState {
  users: (AuthUser & { passwordHash: string })[];
  sessions: Record<string, string>;
  payments: (PaymentRequestRecord & { screenshotDataUrl: string })[];
  pdfs: (PublishedPdfDocument & { pdfDataUrl: string })[];
}

async function loadLocalApkDb(): Promise<LocalApkDbState> {
  const now = new Date().toISOString();
  try {
    const raw = localStorage.getItem(LOCAL_APK_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LocalApkDbState;
      if (Array.isArray(parsed.users)) {
        const hasTargetAdmin = parsed.users.some(
          (u) => u.username.toLowerCase() === ADMIN_PRESET_NAME.toLowerCase() && u.role === 'admin'
        );
        if (!hasTargetAdmin) {
          parsed.users = parsed.users.filter(
            (u) => !(u.role === 'admin' && u.username.toLowerCase() === 'admin')
          );
          parsed.users.unshift({
            id: 'usr_admin_default',
            username: ADMIN_PRESET_NAME,
            phoneNumber: '0925804385',
            passwordHash: ADMIN_PRESET_HASH,
            role: 'admin',
            accountStatus: 'APPROVED',
            rejectionReason: null,
            createdAt: now,
            updatedAt: now,
          });
          saveLocalApkDb(parsed);
        }
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  const initialState: LocalApkDbState = {
    users: [
      {
        id: 'usr_admin_default',
        username: ADMIN_PRESET_NAME,
        phoneNumber: '0925804385',
        passwordHash: ADMIN_PRESET_HASH,
        role: 'admin',
        accountStatus: 'APPROVED',
        rejectionReason: null,
        createdAt: now,
        updatedAt: now,
      },
    ],
    sessions: {},
    payments: [],
    pdfs: [],
  };
  saveLocalApkDb(initialState);
  return initialState;
}

function saveLocalApkDb(state: LocalApkDbState): void {
  try {
    localStorage.setItem(LOCAL_APK_DB_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

async function requireAuthenticatedCloudAdmin(): Promise<FirestoreUserDoc> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Authentication required. Please log in as Admin.');
  }
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (!snap.exists()) {
      throw new Error('Admin account not found.');
    }
    const userDoc = snap.data() as FirestoreUserDoc;
    if (userDoc.role !== 'admin') {
      throw new Error('Access denied: Admin privileges required.');
    }
    return userDoc;
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    }
    throw error;
  }
}

// ============================================================================
// Public Client Service Methods (Connected to Live Firebase Cloud Firestore)
// ============================================================================

export async function signUpStudent(params: {
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}): Promise<{ user: AuthUser; token: string; latestPayment: PaymentRequestRecord | null }> {
  const cleanUsername = String(params.username || '').trim();
  const cleanPhone = String(params.phoneNumber || '').trim();
  const normalizedPhone = normalizeEthiopianPhone(cleanPhone);
  const password = String(params.password || '');
  const confirmPassword = String(params.confirmPassword || '');

  if (!cleanUsername || !cleanPhone || !password || !confirmPassword) {
    throw new Error(
      'All fields are required: Username, Phone Number, Password, and Confirm Password.'
    );
  }
  if (cleanUsername.length < 3 || cleanUsername.length > 64) {
    throw new Error('Username must be between 3 and 64 characters.');
  }
  if (normalizedPhone.length < 9 || normalizedPhone.length > 32) {
    throw new Error('Please enter a valid Ethiopian phone number (e.g., 09... or 07...).');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }
  if (password !== confirmPassword) {
    throw new Error('Password and Confirm Password do not match.');
  }

  const currentDeviceId = getOrCreateDeviceId();
  const localState = await loadLocalApkDb();

  // Fast targeted duplicate checks (parallel with 2500ms timeout)
  try {
    const [usernameSnap, phoneSnap] = await Promise.all([
      withTimeout(
        getDocs(query(collection(db, 'users'), where('usernameLower', '==', cleanUsername.toLowerCase()), limit(1))),
        2500
      ).catch(() => null),
      withTimeout(
        getDocs(query(collection(db, 'users'), where('phoneNumber', '==', normalizedPhone), limit(1))),
        2500
      ).catch(() => null),
    ]);

    if (usernameSnap && !usernameSnap.empty) {
      throw new Error('That username is already taken. Please choose another username.');
    }
    if (phoneSnap && !phoneSnap.empty) {
      throw new Error(
        'This phone number is already registered! Please switch to LOGIN and sign in with your phone number and password.'
      );
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('already registered') || error.message.includes('already taken'))
    ) {
      throw error;
    }
  }

  const now = new Date().toISOString();
  const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const passwordHash = await hashPasswordWebCrypto(password);

  const newUserDoc: FirestoreUserDoc = {
    id: userId,
    username: cleanUsername,
    usernameLower: cleanUsername.toLowerCase(),
    phoneNumber: normalizedPhone.slice(0, 32),
    passwordHash,
    role: 'student',
    accountStatus: 'PENDING_PAYMENT',
    rejectionReason: '',
    createdAt: now,
    updatedAt: now,
    boundDeviceId: currentDeviceId,
  };

  try {
    await withTimeout(setDoc(doc(db, 'users', userId), newUserDoc), 4000);
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.CREATE, `users/${userId}`);
    }
    // If offline or timed out, continue with local cache
  }

  const user = toAuthUser(newUserDoc);
  const token = `fah_uid:${userId}:${Date.now()}`;
  saveAuthToken(token, userId);
  saveCachedSession(user, null);

  // Also mirror locally for instant offline cache
  const existingLocalIdx = localState.users.findIndex(
    (u) => normalizeEthiopianPhone(u.phoneNumber) === normalizedPhone
  );
  if (existingLocalIdx >= 0) {
    localState.users[existingLocalIdx] = { ...user, passwordHash };
  } else {
    localState.users.unshift({ ...user, passwordHash });
  }
  localState.sessions[token] = userId;
  saveLocalApkDb(localState);

  return { user, token, latestPayment: null };
}

export async function loginUser(params: {
  usernameOrPhone: string;
  password: string;
}): Promise<{ user: AuthUser; token: string; latestPayment: PaymentRequestRecord | null }> {
  const idf = String(params.usernameOrPhone || '').trim();
  const idfLower = idf.toLowerCase();
  const normalizedInputPhone = normalizeEthiopianPhone(idf);
  const password = String(params.password || '');

  if (!idf || !password) {
    throw new Error('Please enter both your Username/Phone Number and Password.');
  }

  const currentDeviceId = getOrCreateDeviceId();
  let matchedDoc: FirestoreUserDoc | null = null;
  let allCloudUsers: FirestoreUserDoc[] = [];
  let cloudReachable = typeof navigator === 'undefined' ? true : navigator.onLine;

  if (cloudReachable) {
    try {
      if (idfLower === ADMIN_PRESET_NAME.toLowerCase() || idfLower === 'admin') {
        await withTimeout(ensureCloudAdminAccount(), 3000).catch(() => {});
      }

      // Fast parallel targeted lookup by username and phone number with limit(1)
      const [snapUser, snapPhone] = await Promise.all([
        withTimeout(
          getDocs(query(collection(db, 'users'), where('usernameLower', '==', idfLower), limit(1))),
          2500
        ).catch(() => null),
        withTimeout(
          getDocs(query(collection(db, 'users'), where('phoneNumber', '==', normalizedInputPhone), limit(1))),
          2500
        ).catch(() => null),
      ]);

      if (snapUser && !snapUser.empty) {
        matchedDoc = snapUser.docs[0].data() as FirestoreUserDoc;
      } else if (snapPhone && !snapPhone.empty) {
        matchedDoc = snapPhone.docs[0].data() as FirestoreUserDoc;
      }
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.LIST, 'users');
      }
      cloudReachable = false;
    }
  }

  // Offline local fallback if phone has no internet connection
  if (!matchedDoc && !cloudReachable) {
    const localState = await loadLocalApkDb();
    const localFound = localState.users.find(
      (u) =>
        u.username.toLowerCase() === idfLower ||
        u.phoneNumber === idf ||
        normalizeEthiopianPhone(u.phoneNumber) === normalizedInputPhone
    );
    if (localFound) {
      matchedDoc = {
        id: localFound.id,
        username: localFound.username,
        usernameLower: localFound.username.toLowerCase(),
        phoneNumber: localFound.phoneNumber,
        passwordHash: localFound.passwordHash,
        role: localFound.role,
        accountStatus: localFound.accountStatus,
        rejectionReason: localFound.rejectionReason || '',
        createdAt: localFound.createdAt,
        updatedAt: localFound.updatedAt,
      };
    }
  }

  if (!matchedDoc || !(await verifyPasswordWebCrypto(password, matchedDoc.passwordHash))) {
    throw new Error('Invalid username/phone number or password.');
  }

  // Server check: allow any student to log in on their 1st phone, and block a 2nd phone if this phone number is already active on another phone
  if (matchedDoc.role === 'student') {
    if (
      matchedDoc.boundDeviceId &&
      matchedDoc.boundDeviceId.startsWith('v3_') &&
      !isSamePhysicalPhone(matchedDoc.boundDeviceId, currentDeviceId)
    ) {
      throw new Error(
        `This phone number (${matchedDoc.phoneNumber}) is already active on a first phone. Using one phone number on more than one phone is blocked for security. Please log out on the first phone first.`
      );
    }

    // Bind or upgrade this student account's active phone on the server
    if (matchedDoc.boundDeviceId !== currentDeviceId && cloudReachable) {
      const now = new Date().toISOString();
      try {
        await updateDoc(doc(db, 'users', matchedDoc.id), {
          boundDeviceId: currentDeviceId,
          updatedAt: now,
        });
        matchedDoc = { ...matchedDoc, boundDeviceId: currentDeviceId, updatedAt: now };
      } catch {
        // ignore if offline
      }
    }
  }

  const user = toAuthUser(matchedDoc);
  const token = `fah_uid:${matchedDoc.id}:${Date.now()}`;
  saveAuthToken(token, matchedDoc.id);

  // Mirror into local offline cache
  const localState = await loadLocalApkDb();
  const existingIdx = localState.users.findIndex((u) => u.id === user.id);
  if (existingIdx >= 0) {
    localState.users[existingIdx] = { ...user, passwordHash: matchedDoc.passwordHash };
  } else {
    localState.users.unshift({ ...user, passwordHash: matchedDoc.passwordHash });
  }
  localState.sessions[token] = user.id;
  saveLocalApkDb(localState);

  const latestPayment = cloudReachable
    ? await fetchLatestPaymentForUserFromCloud(matchedDoc.id)
    : getCachedLatestPayment();

  saveCachedSession(user, latestPayment);
  return { user, token, latestPayment };
}

export async function logoutUser(): Promise<void> {
  const userId = getSavedUserId();
  const currentDeviceId = getOrCreateDeviceId();

  // 1. Instantly clear tokens and local cache so the UI transitions to logged-out state with zero lag
  clearAuthToken();
  try {
    localStorage.removeItem(CACHED_AUTH_USER_KEY);
    localStorage.removeItem(CACHED_LATEST_PAYMENT_KEY);
  } catch {
    // ignore
  }

  // 2. Non-blocking device unbind in background
  if (userId && (typeof navigator === 'undefined' || navigator.onLine)) {
    withTimeout(
      (async () => {
        const userRef = doc(db, 'users', userId);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data() as FirestoreUserDoc;
          if (data.role === 'student' && isSamePhysicalPhone(data.boundDeviceId, currentDeviceId)) {
            await updateDoc(userRef, {
              boundDeviceId: '',
              updatedAt: new Date().toISOString(),
            });
          }
        }
      })(),
      2500
    ).catch(() => {});
  }
}

export async function fetchCurrentSession(): Promise<{
  user: AuthUser;
  latestPayment: PaymentRequestRecord | null;
}> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Not authenticated.');
  }

  const currentDeviceId = getOrCreateDeviceId();
  const cachedUser = getCachedAuthUser();
  const cachedPayment = getCachedLatestPayment();

  // If offline, immediately return cached session without hanging
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    if (cachedUser) {
      return { user: cachedUser, latestPayment: cachedPayment };
    }
    const localState = await loadLocalApkDb();
    const localUser = localState.users.find((u) => u.id === userId);
    if (localUser) {
      const { passwordHash: _ph, ...cleanUser } = localUser;
      void _ph;
      saveCachedSession(cleanUser, cachedPayment);
      return { user: cleanUser, latestPayment: cachedPayment };
    }
    throw new Error('Offline and no cached session found.');
  }

  try {
    const snap = await withTimeout(getDoc(doc(db, 'users', userId)), 3500);
    if (!snap.exists()) {
      if (cachedUser) {
        return { user: cachedUser, latestPayment: cachedPayment };
      }
      clearAuthToken();
      throw new Error('Session expired.');
    }
    const userDoc = snap.data() as FirestoreUserDoc;

    // Server check: if this phone number is bound to a different first phone, block the second phone
    if (userDoc.role === 'student') {
      if (
        userDoc.boundDeviceId &&
        userDoc.boundDeviceId.startsWith('v3_') &&
        !isSamePhysicalPhone(userDoc.boundDeviceId, currentDeviceId)
      ) {
        clearAuthToken();
        throw new Error('Session expired.');
      }
      if (userDoc.boundDeviceId !== currentDeviceId) {
        updateDoc(doc(db, 'users', userId), {
          boundDeviceId: currentDeviceId,
          updatedAt: new Date().toISOString(),
        }).catch(() => {});
      }
    }

    const user = toAuthUser(userDoc);
    const latestPayment = await withTimeout(
      fetchLatestPaymentForUserFromCloud(userId),
      3500
    ).catch(() => cachedPayment);

    saveCachedSession(user, latestPayment);
    return {
      user,
      latestPayment,
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    }
    // On network/offline timeout, preserve the user's cached session instead of logging out
    if (cachedUser) {
      return { user: cachedUser, latestPayment: cachedPayment };
    }
    const localState = await loadLocalApkDb();
    const localUser = localState.users.find((u) => u.id === userId);
    if (localUser) {
      const { passwordHash: _ph, ...cleanUser } = localUser;
      void _ph;
      saveCachedSession(cleanUser, cachedPayment);
      return { user: cleanUser, latestPayment: cachedPayment };
    }
    throw error;
  }
}

export async function submitPaymentScreenshot(params: {
  phoneNumber: string;
  transactionRef?: string;
  file: File;
}): Promise<{
  message: string;
  payment: PaymentRequestRecord;
  user: AuthUser;
}> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Please log in first.');
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error(
      'No internet connection. Please turn on mobile data or Wi-Fi and tap Submit Payment again.'
    );
  }

  const normalizedInputPhone = normalizeEthiopianPhone(params.phoneNumber || '');
  if (normalizedInputPhone.length > 0 && normalizedInputPhone.length < 4) {
    throw new Error('Please enter a valid phone number (e.g. 09XXXXXXXX).');
  }

  // Compress the screenshot first so any file read/format issue fails cleanly before hitting Firestore
  const { dataUrl, mime, byteSize } = await compressScreenshotDataUrl(params.file);
  if (!dataUrl || dataUrl.length < 20 || dataUrl.length > 940000) {
    throw new Error(
      'Payment screenshot is invalid or too large. Please select a standard JPG or PNG screenshot.'
    );
  }

  const userRef = doc(db, 'users', userId);
  let userDoc: FirestoreUserDoc | null = null;
  let userExistsInCloud = false;
  let userLookupError: unknown = null;

  try {
    const userSnap = await withTimeout(getDoc(userRef), 8000);
    if (userSnap.exists()) {
      userDoc = userSnap.data() as FirestoreUserDoc;
      userExistsInCloud = true;
    }
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    }
    userLookupError = error;
    // Check local cache/fallback below before failing
  }

  const localState = await loadLocalApkDb();
  const localUser = localState.users.find((u) => u.id === userId);

  if (!userDoc) {
    if (localUser && !userLookupError) {
      const nowFallback = new Date().toISOString();
      const fallbackPhone = normalizeEthiopianPhone(
        normalizedInputPhone || localUser.phoneNumber || ''
      ).slice(0, 32);
      const safeUsername = String(localUser.username || '').trim().slice(0, 64);
      const recreatedDoc: FirestoreUserDoc = {
        id: localUser.id,
        username: safeUsername.length >= 3 ? safeUsername : `student_${localUser.id.slice(-6)}`,
        usernameLower: (safeUsername.length >= 3 ? safeUsername : `student_${localUser.id.slice(-6)}`).toLowerCase(),
        phoneNumber: fallbackPhone.length >= 4 ? fallbackPhone : '0900000000',
        passwordHash: localUser.passwordHash,
        role: 'student',
        accountStatus: 'PENDING_PAYMENT',
        rejectionReason: '',
        createdAt: localUser.createdAt || nowFallback,
        updatedAt: nowFallback,
        boundDeviceId: getOrCreateDeviceId(),
      };
      try {
        await withTimeout(setDoc(userRef, recreatedDoc), 10000);
        userDoc = recreatedDoc;
        userExistsInCloud = true;
      } catch (createErr) {
        if (isPermissionDeniedError(createErr)) {
          handleFirestoreError(createErr, OperationType.CREATE, `users/${userId}`);
        }
        throw new Error(
          'Could not reach the server to verify your account. Please check your internet connection and try again.'
        );
      }
    } else if (userLookupError) {
      throw new Error(
        'Slow or unstable internet connection. Could not reach the server to send your payment. Please try again.'
      );
    } else {
      throw new Error('User account not found. Please log in again.');
    }
  }

  const cleanPhone = normalizeEthiopianPhone(
    normalizedInputPhone || userDoc.phoneNumber || ''
  ).slice(0, 32);
  if (cleanPhone.length < 4) {
    throw new Error('Please enter a valid Ethiopian phone number (e.g. 09XXXXXXXX).');
  }

  const now = new Date().toISOString();
  const payId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const cleanRef = String(params.transactionRef || '').trim().slice(0, 128);
  const safeUsername = String(userDoc.username || '').trim().slice(0, 64);

  const paymentDoc: FirestorePaymentDoc = {
    id: payId,
    userId: userDoc.id,
    username: safeUsername.length >= 3 ? safeUsername : `student_${userDoc.id.slice(-6)}`,
    phoneNumber: cleanPhone,
    amount: 40,
    currency: 'ETB',
    paymentMethod: 'Telebirr',
    transactionRef: cleanRef,
    screenshotMime: normalizeScreenshotMime(mime, params.file.name).slice(0, 64),
    screenshotSize: Math.max(10, Math.min(1000000, byteSize)),
    screenshotDataUrl: dataUrl,
    status: 'PENDING',
    adminNote: '',
    submittedAt: now,
    reviewedAt: '',
    reviewedBy: '',
  };

  // Step 1: Write payment document first with a generous 22s timeout for mobile connections
  try {
    await withTimeout(setDoc(doc(db, 'payments', payId), paymentDoc), 22000);
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.CREATE, `payments/${payId}`);
    }
    throw new Error(
      error instanceof Error && error.message.includes('timed out')
        ? 'Upload timed out. Your internet connection may be slow — please try again.'
        : error instanceof Error
        ? error.message
        : 'Failed to send payment to Admin. Please try again.'
    );
  }

  // Step 2: Update the student's accountStatus to PENDING_VERIFICATION
  if (userExistsInCloud) {
    try {
      await withTimeout(
        updateDoc(userRef, {
          accountStatus: 'PENDING_VERIFICATION',
          rejectionReason: '',
          phoneNumber: cleanPhone,
          updatedAt: now,
        }),
        10000
      );
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
      }
      // If payment document was already saved to Firestore, don't fail the student and cause duplicate submissions
    }
  }

  const updatedUser: FirestoreUserDoc = {
    ...userDoc,
    accountStatus: 'PENDING_VERIFICATION',
    rejectionReason: '',
    phoneNumber: cleanPhone,
    updatedAt: now,
  };

  const authUser = toAuthUser(updatedUser);
  const payRec = toPaymentRecord(paymentDoc);
  saveCachedSession(authUser, payRec);

  // Keep offline local mirror in sync
  const localIdx = localState.users.findIndex((u) => u.id === userId);
  if (localIdx >= 0) {
    localState.users[localIdx] = {
      ...localState.users[localIdx],
      accountStatus: 'PENDING_VERIFICATION',
      rejectionReason: null,
      phoneNumber: cleanPhone,
      updatedAt: now,
    };
  }
  localState.payments = [
    { ...payRec, screenshotDataUrl: dataUrl },
    ...localState.payments.filter((p) => p.id !== payId),
  ];
  saveLocalApkDb(localState);

  return {
    message: 'Payment submitted successfully. Your payment is waiting for admin verification.',
    payment: payRec,
    user: authUser,
  };
}

export async function fetchMyPayments(): Promise<{
  user: AuthUser;
  payments: PaymentRequestRecord[];
}> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Not authenticated.');
  }

  try {
    const userSnap = await getDoc(doc(db, 'users', userId));
    if (!userSnap.exists()) {
      throw new Error('User not found.');
    }
    const userDoc = userSnap.data() as FirestoreUserDoc;

    const paySnap = await getDocs(
      query(collection(db, 'payments'), where('currency', '==', 'ETB'))
    );
    const payments = paySnap.docs
      .map((d) => d.data() as FirestorePaymentDoc)
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
      .map(toPaymentRecord);

    return {
      user: toAuthUser(userDoc),
      payments,
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.LIST, 'payments');
    }
    throw error;
  }
}

export async function fetchAdminOverview(): Promise<{
  payments: PaymentRequestRecord[];
  users: AuthUser[];
  pdfs: PublishedPdfDocument[];
}> {
  await requireAuthenticatedCloudAdmin();

  try {
    const [usersSnap, paymentsSnap, pdfsSnap] = await Promise.all([
      getDocs(query(collection(db, 'users'), where('usernameLower', '>=', ''))),
      getDocs(query(collection(db, 'payments'), where('currency', '==', 'ETB'))),
      getDocs(query(collection(db, 'pdfs'), where('semester', 'in', [1, 2]))),
    ]);

    const users = usersSnap.docs
      .map((d) => toAuthUser(d.data() as FirestoreUserDoc))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const payments = paymentsSnap.docs
      .map((d) => toPaymentRecord(d.data() as FirestorePaymentDoc))
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

    const pdfDocs = pdfsSnap.docs
      .map((d) => d.data() as FirestorePdfDoc)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const pdfs: PublishedPdfDocument[] = pdfDocs.map((p) => ({
      id: p.id,
      title: p.title,
      subject: p.subject,
      courseCode: p.courseCode,
      semester: p.semester,
      category: p.category,
      description: p.description,
      originalFilename: p.originalFilename,
      fileSize: p.fileSize,
      isPublished: p.isPublished,
      uploadedBy: p.uploadedBy,
      createdAt: p.createdAt,
      fileUrl: '',
      chunkCount: p.chunkCount || 1,
    }));

    return { payments, users, pdfs };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.LIST, 'admin_overview');
    }
    throw error;
  }
}

export async function approvePaymentRequest(
  paymentId: string,
  note?: string
): Promise<{
  message: string;
  payment: PaymentRequestRecord;
  user: AuthUser | null;
}> {
  const adminDoc = await requireAuthenticatedCloudAdmin();
  const payRef = doc(db, 'payments', paymentId);

  try {
    const paySnap = await getDoc(payRef);
    if (!paySnap.exists()) {
      throw new Error('Payment request not found.');
    }
    const payData = paySnap.data() as FirestorePaymentDoc;
    const now = new Date().toISOString();
    const cleanNote = String(note || 'Approved by Admin').trim().slice(0, 500);

    await updateDoc(payRef, {
      status: 'APPROVED',
      adminNote: cleanNote,
      reviewedAt: now,
      reviewedBy: adminDoc.username,
    });

    const studentRef = doc(db, 'users', payData.userId);
    const studentSnap = await getDoc(studentRef);
    let updatedStudent: AuthUser | null = null;

    if (studentSnap.exists()) {
      const sData = studentSnap.data() as FirestoreUserDoc;
      await updateDoc(studentRef, {
        accountStatus: 'APPROVED',
        rejectionReason: '',
        updatedAt: now,
      });
      updatedStudent = toAuthUser({
        ...sData,
        accountStatus: 'APPROVED',
        rejectionReason: '',
        updatedAt: now,
      });
    }

    const updatedPayment: FirestorePaymentDoc = {
      ...payData,
      status: 'APPROVED',
      adminNote: cleanNote,
      reviewedAt: now,
      reviewedBy: adminDoc.username,
    };

    return {
      message: `Payment approved for ${payData.username}. Full access is now unlocked.`,
      payment: toPaymentRecord(updatedPayment),
      user: updatedStudent,
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `payments/${paymentId}`);
    }
    throw error;
  }
}

export async function rejectPaymentRequest(
  paymentId: string,
  reason?: string
): Promise<{
  message: string;
  payment: PaymentRequestRecord;
  user: AuthUser | null;
}> {
  const adminDoc = await requireAuthenticatedCloudAdmin();
  const payRef = doc(db, 'payments', paymentId);

  try {
    const paySnap = await getDoc(payRef);
    if (!paySnap.exists()) {
      throw new Error('Payment request not found.');
    }
    const payData = paySnap.data() as FirestorePaymentDoc;
    const now = new Date().toISOString();
    const cleanReason = String(
      reason || 'Payment screenshot could not be verified. Please submit a valid 40 ETB Telebirr receipt.'
    )
      .trim()
      .slice(0, 500);

    await updateDoc(payRef, {
      status: 'REJECTED',
      adminNote: cleanReason,
      reviewedAt: now,
      reviewedBy: adminDoc.username,
    });

    const studentRef = doc(db, 'users', payData.userId);
    const studentSnap = await getDoc(studentRef);
    let updatedStudent: AuthUser | null = null;

    if (studentSnap.exists()) {
      const sData = studentSnap.data() as FirestoreUserDoc;
      await updateDoc(studentRef, {
        accountStatus: 'REJECTED',
        rejectionReason: cleanReason,
        updatedAt: now,
      });
      updatedStudent = toAuthUser({
        ...sData,
        accountStatus: 'REJECTED',
        rejectionReason: cleanReason,
        updatedAt: now,
      });
    }

    const updatedPayment: FirestorePaymentDoc = {
      ...payData,
      status: 'REJECTED',
      adminNote: cleanReason,
      reviewedAt: now,
      reviewedBy: adminDoc.username,
    };

    return {
      message: `Payment rejected for ${payData.username}.`,
      payment: toPaymentRecord(updatedPayment),
      user: updatedStudent,
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `payments/${paymentId}`);
    }
    throw error;
  }
}

export async function updateStudentAccountStatus(
  userId: string,
  accountStatus: AccountStatus,
  rejectionReason?: string
): Promise<{ user: AuthUser }> {
  await requireAuthenticatedCloudAdmin();
  const userRef = doc(db, 'users', userId);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      throw new Error('Student account not found.');
    }
    const data = snap.data() as FirestoreUserDoc;
    const now = new Date().toISOString();
    const cleanReason = String(rejectionReason || '').trim().slice(0, 500);

    await updateDoc(userRef, {
      accountStatus,
      rejectionReason: cleanReason,
      updatedAt: now,
    });

    return {
      user: toAuthUser({
        ...data,
        accountStatus,
        rejectionReason: cleanReason,
        updatedAt: now,
      }),
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    }
    throw error;
  }
}

export async function changeAdminCredentials(params: {
  currentPassword: string;
  newPassword: string;
  newUsername?: string;
}): Promise<{ message: string; user: AuthUser }> {
  const adminDoc = await requireAuthenticatedCloudAdmin();
  if (!(await verifyPasswordWebCrypto(params.currentPassword, adminDoc.passwordHash))) {
    throw new Error('Current admin password is incorrect.');
  }
  if (!params.newPassword || params.newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters.');
  }

  const nextUsername = String(params.newUsername || adminDoc.username).trim().slice(0, 64);
  if (nextUsername.length < 3) {
    throw new Error('Username must be at least 3 characters.');
  }

  const nextHash = await hashPasswordWebCrypto(params.newPassword);
  const now = new Date().toISOString();
  const adminRef = doc(db, 'users', adminDoc.id);

  try {
    await updateDoc(adminRef, {
      username: nextUsername,
      usernameLower: nextUsername.toLowerCase(),
      passwordHash: nextHash,
      updatedAt: now,
    });
    return {
      message: 'Admin credentials updated in Cloud Database.',
      user: toAuthUser({
        ...adminDoc,
        username: nextUsername,
        usernameLower: nextUsername.toLowerCase(),
        passwordHash: nextHash,
        updatedAt: now,
      }),
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${adminDoc.id}`);
    }
    throw error;
  }
}

export function detectPublishedFileType(
  filename?: string,
  dataUrl?: string
): 'pdf' | 'pptx' | 'image' {
  const lowerName = String(filename || '').toLowerCase().trim();
  const lowerUrl = String(dataUrl || '').slice(0, 120).toLowerCase();

  if (
    lowerName.endsWith('.pptx') ||
    lowerName.endsWith('.ppt') ||
    lowerUrl.includes('presentationml') ||
    lowerUrl.includes('ms-powerpoint') ||
    lowerUrl.includes('application/zip')
  ) {
    return 'pptx';
  }

  if (
    lowerName.endsWith('.png') ||
    lowerName.endsWith('.jpg') ||
    lowerName.endsWith('.jpeg') ||
    lowerName.endsWith('.webp') ||
    lowerName.endsWith('.gif') ||
    lowerName.endsWith('.svg') ||
    lowerUrl.startsWith('data:image/')
  ) {
    return 'image';
  }

  return 'pdf';
}

export async function uploadAdminPdf(params: {
  title: string;
  subject: Subject;
  courseCode?: string;
  semester: Semester;
  category: string;
  description?: string;
  isPublished: boolean;
  file: File;
}): Promise<{ message: string; pdf: PublishedPdfDocument }> {
  const adminDoc = await requireAuthenticatedCloudAdmin();
  const fileNameLower = String(params.file.name || '').toLowerCase();
  const mimeLower = String(params.file.type || '').toLowerCase();

  const isPdf = fileNameLower.endsWith('.pdf') || mimeLower === 'application/pdf';
  const isPptx =
    fileNameLower.endsWith('.pptx') ||
    fileNameLower.endsWith('.ppt') ||
    mimeLower.includes('presentation') ||
    mimeLower.includes('powerpoint');
  const isImage =
    mimeLower.startsWith('image/') ||
    /\.(png|jpe?g|webp|gif|bmp)$/i.test(fileNameLower);

  if (!isPdf && !isPptx && !isImage) {
    throw new Error('Please select a valid PDF (.pdf), PowerPoint (.pptx), or Image (.png/.jpg/.webp) file.');
  }

  let dataUrl = await readFileAsDataUrl(params.file);
  if (isPptx && dataUrl.startsWith('data:application/octet-stream;base64,')) {
    dataUrl = dataUrl.replace(
      'data:application/octet-stream;base64,',
      'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,'
    );
  }

  const chunkSize = 600000;
  const chunks: string[] = [];
  for (let i = 0; i < dataUrl.length; i += chunkSize) {
    chunks.push(dataUrl.slice(i, i + chunkSize));
  }
  if (chunks.length === 0) {
    throw new Error('Selected file is empty.');
  }
  if (chunks.length > 120) {
    throw new Error('File exceeds maximum cloud storage chunk limit (approx. 54 MB).');
  }

  const now = new Date().toISOString();
  const pdfId = `pdf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const defaultExt = isPptx ? 'presentation.pptx' : isImage ? 'image.png' : 'document.pdf';
  const targetPublished = Boolean(params.isPublished ?? true);

  const pdfDoc: FirestorePdfDoc = {
    id: pdfId,
    title: String(params.title || '').trim().slice(0, 200),
    subject: (params.subject || 'all') as Subject,
    courseCode: String(params.courseCode || '').trim().slice(0, 64),
    semester: (Number(params.semester) === 2 ? 2 : 1) as Semester,
    category: String(params.category || 'Lecture notes').trim().slice(0, 100),
    description: String(params.description || '').trim().slice(0, 2000),
    originalFilename: String(params.file.name || defaultExt).slice(0, 255),
    fileSize: params.file.size || Math.round(dataUrl.length * 0.75),
    isPublished: false, // kept unpublished until all chunks are successfully committed
    uploadedBy: String(adminDoc.username || 'admin').trim().slice(0, 64) || 'admin',
    createdAt: now,
    chunkCount: chunks.length,
  };

  try {
    // 1. Write parent PDF document first (unpublished) so chunks pass existence validation and students do not read empty chunks
    try {
      await setDoc(doc(db, 'pdfs', pdfId), pdfDoc);
    } catch (createErr) {
      if (isPermissionDeniedError(createErr)) {
        handleFirestoreError(createErr, OperationType.CREATE, `pdfs/${pdfId}`);
      }
      throw createErr;
    }

    // 2. Write all chunk documents in parallel batches of 4
    const batchSize = 4;
    for (let start = 0; start < chunks.length; start += batchSize) {
      const slice = chunks.slice(start, start + batchSize);
      await Promise.all(
        slice.map(async (chunkData, offset) => {
          const i = start + offset;
          const chunkId = `${pdfId}_chunk_${i}`;
          const chunkDoc: FirestorePdfChunkDoc = {
            id: chunkId,
            pdfId,
            chunkIndex: i,
            data: chunkData,
          };
          try {
            await setDoc(doc(db, 'pdf_chunks', chunkId), chunkDoc);
          } catch (chunkErr) {
            if (isPermissionDeniedError(chunkErr)) {
              handleFirestoreError(chunkErr, OperationType.CREATE, `pdf_chunks/${chunkId}`);
            }
            throw chunkErr;
          }
        })
      );
    }

    // 3. Publish parent document if requested
    if (targetPublished) {
      await updateDoc(doc(db, 'pdfs', pdfId), {
        isPublished: true,
      });
      pdfDoc.isPublished = true;
    }
  } catch (error) {
    // Clean up partial parent and chunks on failure
    try {
      await deleteDoc(doc(db, 'pdfs', pdfId));
      for (let i = 0; i < chunks.length; i++) {
        await deleteDoc(doc(db, 'pdf_chunks', `${pdfId}_chunk_${i}`)).catch(() => {});
      }
    } catch {
      // ignore rollback cleanup error
    }
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.CREATE, `pdfs/${pdfId}`);
    }
    throw error;
  }

  // Save uploaded document locally on Admin device as well for instant preview
  await saveDownloadedPdfToDevice(pdfDoc.id, dataUrl, pdfDoc.fileSize);

  const formatLabel = isPptx ? 'PPTX Presentation' : isImage ? 'Image Document' : 'PDF Document';

  return {
    message: `${formatLabel} uploaded and published to Cloud Database.`,
    pdf: {
      id: pdfDoc.id,
      title: pdfDoc.title,
      subject: pdfDoc.subject,
      courseCode: pdfDoc.courseCode,
      semester: pdfDoc.semester,
      category: pdfDoc.category,
      description: pdfDoc.description,
      originalFilename: pdfDoc.originalFilename,
      fileSize: pdfDoc.fileSize,
      isPublished: pdfDoc.isPublished,
      uploadedBy: pdfDoc.uploadedBy,
      createdAt: pdfDoc.createdAt,
      fileUrl: dataUrl,
      chunkCount: pdfDoc.chunkCount,
    },
  };
}

export async function updateAdminPdf(
  pdfId: string,
  updates: Partial<{
    title: string;
    subject: Subject;
    courseCode: string;
    semester: Semester;
    category: string;
    description: string;
    isPublished: boolean;
  }>
): Promise<{ pdf: PublishedPdfDocument }> {
  await requireAuthenticatedCloudAdmin();
  const pdfRef = doc(db, 'pdfs', pdfId);

  try {
    const snap = await getDoc(pdfRef);
    if (!snap.exists()) {
      throw new Error('PDF document not found.');
    }
    const existingPdf = snap.data() as FirestorePdfDoc;
    const nextPayload = {
      title: updates.title !== undefined ? String(updates.title).trim().slice(0, 200) : existingPdf.title,
      subject: updates.subject !== undefined ? updates.subject : existingPdf.subject,
      courseCode:
        updates.courseCode !== undefined ? String(updates.courseCode).trim().slice(0, 64) : existingPdf.courseCode,
      semester:
        updates.semester !== undefined ? ((Number(updates.semester) === 2 ? 2 : 1) as Semester) : existingPdf.semester,
      category:
        updates.category !== undefined ? String(updates.category).trim().slice(0, 100) : existingPdf.category,
      description:
        updates.description !== undefined
          ? String(updates.description).trim().slice(0, 2000)
          : existingPdf.description,
      isPublished: updates.isPublished !== undefined ? Boolean(updates.isPublished) : existingPdf.isPublished,
    };

    await updateDoc(pdfRef, nextPayload);
    const updatedDoc: FirestorePdfDoc = { ...existingPdf, ...nextPayload };
    const localCached = await getDownloadedPdfFromDevice(updatedDoc.id);
    const dataUrl = localCached || (await reassemblePdfDataUrl(updatedDoc));

    return {
      pdf: {
        id: updatedDoc.id,
        title: updatedDoc.title,
        subject: updatedDoc.subject,
        courseCode: updatedDoc.courseCode,
        semester: updatedDoc.semester,
        category: updatedDoc.category,
        description: updatedDoc.description,
        originalFilename: updatedDoc.originalFilename,
        fileSize: updatedDoc.fileSize,
        isPublished: updatedDoc.isPublished,
        uploadedBy: updatedDoc.uploadedBy,
        createdAt: updatedDoc.createdAt,
        fileUrl: dataUrl,
        chunkCount: updatedDoc.chunkCount || 1,
      },
    };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `pdfs/${pdfId}`);
    }
    throw error;
  }
}

export async function deleteAdminPdf(pdfId: string): Promise<{ ok: boolean }> {
  await requireAuthenticatedCloudAdmin();
  const pdfRef = doc(db, 'pdfs', pdfId);

  try {
    const snap = await getDoc(pdfRef);
    if (snap.exists()) {
      const pdfData = snap.data() as FirestorePdfDoc;
      for (let i = 0; i < pdfData.chunkCount; i++) {
        await deleteDoc(doc(db, 'pdf_chunks', `${pdfId}_chunk_${i}`));
      }
      await deleteDoc(pdfRef);
    }
    return { ok: true };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.DELETE, `pdfs/${pdfId}`);
    }
    throw error;
  }
}

function getCachedPublishedPdfsMeta(): PublishedPdfDocument[] {
  try {
    const raw = localStorage.getItem(CACHED_PUBLISHED_PDFS_META_KEY);
    return raw ? (JSON.parse(raw) as PublishedPdfDocument[]) : [];
  } catch {
    return [];
  }
}

function saveCachedPublishedPdfsMeta(pdfs: PublishedPdfDocument[]): void {
  try {
    const light = pdfs.map((p) => ({ ...p, fileUrl: '' }));
    localStorage.setItem(CACHED_PUBLISHED_PDFS_META_KEY, JSON.stringify(light));
  } catch {
    // ignore storage errors
  }
}

export async function fetchPublishedPdfs(): Promise<{ pdfs: PublishedPdfDocument[] }> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Not authenticated.');
  }

  const cachedMeta = getCachedPublishedPdfsMeta();
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { pdfs: cachedMeta };
  }

  try {
    const pdfsSnap = await withTimeout(
      getDocs(query(collection(db, 'pdfs'), where('semester', 'in', [1, 2]))),
      6000
    );
    const publishedDocs = pdfsSnap.docs
      .map((d) => d.data() as FirestorePdfDoc)
      .filter((p) => p.isPublished)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const pdfs: PublishedPdfDocument[] = publishedDocs.map((p) => ({
      id: p.id,
      title: p.title,
      subject: p.subject,
      courseCode: p.courseCode,
      semester: p.semester,
      category: p.category,
      description: p.description,
      originalFilename: p.originalFilename,
      fileSize: p.fileSize,
      isPublished: p.isPublished,
      uploadedBy: p.uploadedBy,
      createdAt: p.createdAt,
      fileUrl: '',
      chunkCount: p.chunkCount || 1,
    }));

    saveCachedPublishedPdfsMeta(pdfs);
    return { pdfs };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.LIST, 'pdfs');
    }
    if (cachedMeta.length > 0) {
      return { pdfs: cachedMeta };
    }
    throw error;
  }
}

/**
 * Downloads all chunks of a published PDF with real-time progress reporting (0% -> 100%)
 * and stores the reassembled PDF in the device's offline IndexedDB storage so the student
 * can open it anytime in the Freshman built-in PDF reader.
 */
export async function downloadPublishedPdfWithProgress(
  pdf: PublishedPdfDocument,
  onProgress?: (percent: number, loadedBytes: number, totalBytes: number) => void
): Promise<string> {
  const totalBytes = Math.max(1024, pdf.fileSize || 100 * 1024);

  // Check if already in memory on the object
  if (pdf.fileUrl && pdf.fileUrl.startsWith('data:')) {
    onProgress?.(50, Math.round(totalBytes * 0.5), totalBytes);
    await saveDownloadedPdfToDevice(pdf.id, pdf.fileUrl, totalBytes);
    onProgress?.(100, totalBytes, totalBytes);
    return pdf.fileUrl;
  }

  // Check if already downloaded on device AND verify it is complete (not a truncated partial download)
  const existingOffline = await getDownloadedPdfFromDevice(pdf.id);
  const expectedMinBase64Len =
    pdf.fileSize && pdf.fileSize > 4096 ? Math.floor(pdf.fileSize * 1.15) : 100;
  if (existingOffline && existingOffline.length >= expectedMinBase64Len) {
    onProgress?.(100, totalBytes, totalBytes);
    return existingOffline;
  }

  let chunkCount = pdf.chunkCount || 0;
  // Always refresh metadata from Firestore if chunkCount looks missing or too small for fileSize
  if (!chunkCount || chunkCount < 1 || (chunkCount === 1 && totalBytes > 450000)) {
    try {
      const snap = await getDoc(doc(db, 'pdfs', pdf.id));
      if (snap.exists()) {
        const meta = snap.data() as FirestorePdfDoc;
        chunkCount = Math.max(chunkCount, meta.chunkCount || 1);
      } else if (!chunkCount) {
        throw new Error('PDF document no longer exists on the server.');
      }
    } catch (err) {
      if (!chunkCount) throw err;
    }
  }

  onProgress?.(5, Math.round(totalBytes * 0.05), totalBytes);

  const chunks: string[] = new Array(chunkCount).fill('');
  const batchSize = 4;
  for (let start = 0; start < chunkCount; start += batchSize) {
    const end = Math.min(chunkCount, start + batchSize);
    const indices = Array.from({ length: end - start }, (_, idx) => start + idx);

    await Promise.all(
      indices.map(async (i) => {
        const chunkId = `${pdf.id}_chunk_${i}`;
        try {
          const chunkSnap = await getDoc(doc(db, 'pdf_chunks', chunkId));
          if (!chunkSnap.exists()) {
            throw new Error(`Missing PDF segment ${i + 1} of ${chunkCount}. Please retry download.`);
          }
          const chunkData = (chunkSnap.data() as FirestorePdfChunkDoc).data || '';
          chunks[i] = chunkData;
        } catch (error) {
          if (isPermissionDeniedError(error)) {
            handleFirestoreError(error, OperationType.GET, `pdf_chunks/${chunkId}`);
          }
          throw error;
        }
      })
    );

    const ratio = end / chunkCount;
    const pct = Math.min(95, Math.max(10, Math.round(ratio * 92)));
    const loaded = Math.min(totalBytes, Math.round(totalBytes * (pct / 100)));
    onProgress?.(pct, loaded, totalBytes);
  }

  const fullDataUrl = chunks.join('');
  if (!fullDataUrl || fullDataUrl.length < expectedMinBase64Len) {
    throw new Error('Downloaded PDF file was incomplete. Please check your internet connection and try again.');
  }

  await saveDownloadedPdfToDevice(pdf.id, fullDataUrl, totalBytes);
  onProgress?.(100, totalBytes, totalBytes);
  return fullDataUrl;
}

/**
 * Subscribes to live Firestore changes on `/users` and `/payments` so the Admin phone
 * automatically updates the moment any student signs up or submits a Telebirr screenshot.
 */
export function subscribeToAdminCloudUpdates(onUpdate: () => void): () => void {
  const usersQuery = query(collection(db, 'users'), where('usernameLower', '>=', ''));
  const paymentsQuery = query(collection(db, 'payments'), where('currency', '==', 'ETB'));

  const unsubUsers = onSnapshot(
    usersQuery,
    () => {
      onUpdate();
    },
    () => {
      // ignore snapshot errors
    }
  );

  const unsubPayments = onSnapshot(
    paymentsQuery,
    () => {
      onUpdate();
    },
    () => {
      // ignore snapshot errors
    }
  );

  return () => {
    unsubUsers();
    unsubPayments();
  };
}

// ============================================================================
// User Profile Modification (Username & Optional Password Change ONLY; Phone is Locked)
// ============================================================================
export async function updateUserProfile(params: {
  username: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<{ message: string; user: AuthUser }> {
  const userId = getSavedUserId();
  if (!userId) {
    throw new Error('Please log in to modify your profile.');
  }

  const cleanUsername = String(params.username || '').trim().slice(0, 64);

  if (cleanUsername.length < 3) {
    throw new Error('Username must be at least 3 characters.');
  }

  const userRef = doc(db, 'users', userId);
  let userDoc: FirestoreUserDoc | null = null;
  const isOnline = typeof navigator === 'undefined' ? true : navigator.onLine;

  if (isOnline) {
    try {
      const snap = await withTimeout(getDoc(userRef), 3500);
      if (snap.exists()) {
        userDoc = snap.data() as FirestoreUserDoc;
      }
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.GET, `users/${userId}`);
      }
    }
  }

  const localState = await loadLocalApkDb();
  const localIdx = localState.users.findIndex((u) => u.id === userId);
  if (!userDoc && localIdx >= 0) {
    const lu = localState.users[localIdx];
    userDoc = {
      id: lu.id,
      username: lu.username,
      usernameLower: lu.username.toLowerCase(),
      phoneNumber: lu.phoneNumber,
      passwordHash: lu.passwordHash,
      role: lu.role,
      accountStatus: lu.accountStatus,
      rejectionReason: lu.rejectionReason || '',
      createdAt: lu.createdAt,
      updatedAt: lu.updatedAt,
    };
  }

  if (!userDoc) {
    throw new Error('User account record could not be loaded.');
  }

  // Check if username is being changed and if another user already has it
  if (isOnline && cleanUsername.toLowerCase() !== userDoc.usernameLower) {
    try {
      const existingSnap = await withTimeout(
        getDocs(
          query(collection(db, 'users'), where('usernameLower', '==', cleanUsername.toLowerCase()))
        ),
        3500
      );
      const conflict = existingSnap.docs.some((d) => d.id !== userId);
      if (conflict) {
        throw new Error('That username is already taken by another account.');
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('already taken')) {
        throw err;
      }
    }
  }

  let nextPasswordHash = userDoc.passwordHash;
  if (params.newPassword && params.newPassword.trim().length > 0) {
    if (params.newPassword.trim().length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }
    if (params.currentPassword) {
      const validCurrent = await verifyPasswordWebCrypto(
        params.currentPassword,
        userDoc.passwordHash
      );
      if (!validCurrent) {
        throw new Error('Current password is incorrect.');
      }
    }
    nextPasswordHash = await hashPasswordWebCrypto(params.newPassword.trim());
  }

  // Phone number is the student's permanent primary account identifier (like email) and is NEVER changed here
  const now = new Date().toISOString();
  const updatePayload = {
    username: cleanUsername,
    usernameLower: cleanUsername.toLowerCase(),
    passwordHash: nextPasswordHash,
    updatedAt: now,
  };

  if (isOnline) {
    try {
      await withTimeout(updateDoc(userRef, updatePayload), 4000);
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
      }
      throw error;
    }
  }

  const updatedDoc: FirestoreUserDoc = {
    ...userDoc,
    ...updatePayload,
  };
  const updatedUser = toAuthUser(updatedDoc);

  if (localIdx >= 0) {
    localState.users[localIdx] = { ...updatedUser, passwordHash: nextPasswordHash };
    saveLocalApkDb(localState);
  }
  saveCachedSession(updatedUser, getCachedLatestPayment());

  return {
    message: 'Name and password settings updated successfully!',
    user: updatedUser,
  };
}

// ============================================================================
// Admin-Posted Exam Tests & MCQs (Midterm & Final Exam Tests, MCQs & Images)
// ============================================================================
function isCleanPracticePost(post: AdminPracticePost): boolean {
  if (!post) return false;
  if (post.postType === 'image') return Boolean(post.imageDataUrl);
  const stem = String(post.question || '').trim();
  if (
    stem.startsWith('According to the Mid & Final Exam document') &&
    stem.includes('which of the following statements is accurate and verified')
  ) {
    return false;
  }
  if (!stem && !post.imageDataUrl) return false;
  if (!Array.isArray(post.options) || post.options.length < 2 || post.options.length > 6) {
    return false;
  }
  for (const opt of post.options) {
    if (!String(opt || '').trim()) return false;
  }
  return true;
}

export function getCachedPracticePosts(): AdminPracticePost[] {
  try {
    const raw = localStorage.getItem(CACHED_PRACTICE_POSTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? (parsed as AdminPracticePost[]).filter(isCleanPracticePost)
      : [];
  } catch {
    return [];
  }
}

export function saveCachedPracticePosts(posts: AdminPracticePost[]): void {
  const cleanPosts = posts.filter(isCleanPracticePost);
  try {
    localStorage.setItem(CACHED_PRACTICE_POSTS_KEY, JSON.stringify(cleanPosts));
  } catch {
    try {
      localStorage.setItem(CACHED_PRACTICE_POSTS_KEY, JSON.stringify(cleanPosts.slice(0, 40)));
    } catch {
      // ignore storage errors
    }
  }
}

export async function fetchAdminPracticePosts(): Promise<AdminPracticePost[]> {
  const cached = getCachedPracticePosts();
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return cached;
  }

  try {
    const q = query(
      collection(db, 'practice_posts'),
      where('examType', 'in', ['midterm', 'final'])
    );
    const snap = await withTimeout(getDocs(q), 5000);
    const posts = snap.docs
      .map((d) => d.data() as AdminPracticePost)
      .filter(isCleanPracticePost)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    saveCachedPracticePosts(posts);
    return posts;
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.LIST, 'practice_posts');
    }
    return cached;
  }
}

export function subscribeToPracticePosts(
  onUpdate: (posts: AdminPracticePost[]) => void
): () => void {
  const q = query(
    collection(db, 'practice_posts'),
    where('examType', 'in', ['midterm', 'final'])
  );
  const unsub = onSnapshot(
    q,
    (snap) => {
      const posts = snap.docs
        .map((d) => d.data() as AdminPracticePost)
        .filter(isCleanPracticePost)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      saveCachedPracticePosts(posts);
      onUpdate(posts);
    },
    () => {
      // ignore offline snapshot error
    }
  );
  return unsub;
}

export async function createAdminPracticePost(params: {
  postType: 'mcq' | 'image';
  subject: Subject;
  examType: 'midterm' | 'final';
  title: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  imageFile?: File | null;
}): Promise<{ message: string; post: AdminPracticePost }> {
  const adminDoc = await requireAuthenticatedCloudAdmin();

  let imageDataUrl = '';
  if (params.imageFile) {
    const compressed = await compressScreenshotDataUrl(params.imageFile);
    imageDataUrl = compressed.dataUrl;
  }

  if (params.postType === 'image' && !imageDataUrl) {
    throw new Error('Please select an exam image file to post.');
  }

  const cleanTitle = String(params.title || '').trim().slice(0, 200) || 'Exam Test';
  const cleanQuestion = String(params.question || '').trim().slice(0, 4000);

  if (params.postType === 'mcq' && !cleanQuestion && !imageDataUrl) {
    throw new Error('Please enter the MCQ question text or attach a question image.');
  }

  const rawOptions = Array.isArray(params.options)
    ? params.options.map((o) => String(o || '').trim().slice(0, 600)).filter(Boolean).slice(0, 6)
    : [];

  if (params.postType === 'mcq' && rawOptions.length < 2) {
    throw new Error('Please provide at least 2 answer options for an MCQ.');
  }

  const cleanOptions = params.postType === 'mcq' ? rawOptions : [];

  const maxIdx = Math.max(0, cleanOptions.length - 1);
  const correctAnswer =
    typeof params.correctAnswer === 'number' &&
    params.correctAnswer >= 0 &&
    params.correctAnswer <= maxIdx
      ? params.correctAnswer
      : 0;

  const now = new Date().toISOString();
  const postId = `prac_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const postDoc: AdminPracticePost = {
    id: postId,
    postType: params.postType,
    subject: params.subject,
    examType: params.examType === 'final' ? 'final' : 'midterm',
    title: cleanTitle,
    question: cleanQuestion,
    options: cleanOptions,
    correctAnswer,
    explanation: String(params.explanation || '').trim().slice(0, 4000),
    imageDataUrl,
    uploadedBy: String(adminDoc.username || 'admin').trim().slice(0, 64) || 'admin',
    createdAt: now,
  };

  try {
    await setDoc(doc(db, 'practice_posts', postId), postDoc);
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.CREATE, `practice_posts/${postId}`);
    }
    throw error;
  }

  const updatedCache = [postDoc, ...getCachedPracticePosts().filter((p) => p.id !== postId)];
  saveCachedPracticePosts(updatedCache);

  return {
    message:
      params.postType === 'image'
        ? `Published ${params.examType === 'final' ? 'Final' : 'Midterm'} Exam Sheet Image!`
        : `Published ${params.examType === 'final' ? 'Final' : 'Midterm'} Exam MCQ!`,
    post: postDoc,
  };
}

export async function createAdminPracticePostsBatch(params: {
  subject: Subject;
  examType: 'midterm' | 'final';
  title: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}): Promise<{ message: string; posts: AdminPracticePost[] }> {
  const adminDoc = await requireAuthenticatedCloudAdmin();
  const cleanTitle = String(params.title || '').trim().slice(0, 200) || 'Uploaded Exam Test';
  const cleanUploadedBy = String(adminDoc.username || 'admin').trim().slice(0, 64) || 'admin';
  const cleanExamType: 'midterm' | 'final' = params.examType === 'final' ? 'final' : 'midterm';

  const validItems = (params.questions || []).filter(
    (item) =>
      String(item.question || '').trim().length > 0 &&
      Array.isArray(item.options) &&
      item.options.filter((o) => String(o || '').trim().length > 0).length >= 2
  );

  if (validItems.length === 0) {
    throw new Error('No valid MCQs found to publish.');
  }

  const baseMs = Date.now();
  const createdPosts: AdminPracticePost[] = validItems.map((item, idx) => {
    const cleanOptions = item.options
      .map((o) => String(o || '').trim().slice(0, 600))
      .filter(Boolean)
      .slice(0, 6);
    const maxIdx = Math.max(0, cleanOptions.length - 1);
    const correctAnswer =
      typeof item.correctAnswer === 'number' &&
      item.correctAnswer >= 0 &&
      item.correctAnswer <= maxIdx
        ? Math.trunc(item.correctAnswer)
        : 0;
    const postId = `prac_${baseMs}_${idx}_${Math.random().toString(36).slice(2, 6)}`;
    return {
      id: postId,
      postType: 'mcq',
      subject: params.subject,
      examType: cleanExamType,
      title: cleanTitle,
      question: String(item.question || '').trim().slice(0, 4000),
      options: cleanOptions,
      correctAnswer,
      explanation: String(item.explanation || '').trim().slice(0, 4000),
      imageDataUrl: '',
      uploadedBy: cleanUploadedBy,
      createdAt: new Date(baseMs + idx).toISOString(),
    };
  });

  // Upload in parallel chunks of 6 so large 30-100 question tests publish quickly
  const chunkSize = 6;
  for (let start = 0; start < createdPosts.length; start += chunkSize) {
    const slice = createdPosts.slice(start, start + chunkSize);
    await Promise.all(
      slice.map(async (postDoc) => {
        try {
          await setDoc(doc(db, 'practice_posts', postDoc.id), postDoc);
        } catch (error) {
          if (isPermissionDeniedError(error)) {
            handleFirestoreError(error, OperationType.CREATE, `practice_posts/${postDoc.id}`);
          }
          throw error;
        }
      })
    );
  }

  const idSet = new Set(createdPosts.map((p) => p.id));
  const updatedCache = [...createdPosts, ...getCachedPracticePosts().filter((p) => !idSet.has(p.id))];
  saveCachedPracticePosts(updatedCache);

  return {
    message: `Published "${cleanTitle}" (${createdPosts.length} MCQs) to Academy Exam Hub!`,
    posts: createdPosts,
  };
}

export async function deleteAdminPracticePost(postId: string): Promise<{ ok: boolean }> {
  await requireAuthenticatedCloudAdmin();
  try {
    await deleteDoc(doc(db, 'practice_posts', postId));
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      handleFirestoreError(error, OperationType.DELETE, `practice_posts/${postId}`);
    }
    throw error;
  }
  const nextCache = getCachedPracticePosts().filter((p) => p.id !== postId);
  saveCachedPracticePosts(nextCache);
  return { ok: true };
}

export async function deleteAdminPracticePostsBatch(postIds: string[]): Promise<{ ok: boolean }> {
  await requireAuthenticatedCloudAdmin();
  const uniqueIds = Array.from(new Set(postIds.filter(Boolean)));
  const chunkSize = 6;
  for (let start = 0; start < uniqueIds.length; start += chunkSize) {
    const slice = uniqueIds.slice(start, start + chunkSize);
    await Promise.all(
      slice.map(async (postId) => {
        try {
          await deleteDoc(doc(db, 'practice_posts', postId));
        } catch (error) {
          if (isPermissionDeniedError(error)) {
            handleFirestoreError(error, OperationType.DELETE, `practice_posts/${postId}`);
          }
          throw error;
        }
      })
    );
  }
  const removeSet = new Set(uniqueIds);
  const nextCache = getCachedPracticePosts().filter((p) => !removeSet.has(p.id));
  saveCachedPracticePosts(nextCache);
  return { ok: true };
}


