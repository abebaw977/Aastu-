import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Data & Secure Upload Directories (stored outside public/ so screenshots & PDFs are never publicly exposed)
const DATA_DIR = path.join(process.cwd(), 'data');
const SCREENSHOTS_DIR = path.join(DATA_DIR, 'uploads', 'screenshots');
const PDFS_DIR = path.join(DATA_DIR, 'uploads', 'pdfs');
const SQLITE_DB_PATH = path.join(DATA_DIR, 'freshman_academy.sqlite');

for (const dir of [DATA_DIR, SCREENSHOTS_DIR, PDFS_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Initialize built-in Node SQLite database (DatabaseSync from node:sqlite)
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(SQLITE_DB_PATH);

// Configure SQLite pragmas for reliability and foreign keys
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL COLLATE NOCASE,
    phone_number TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    account_status TEXT NOT NULL DEFAULT 'PENDING_PAYMENT',
    rejection_reason TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS payment_requests (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 50,
    currency TEXT NOT NULL DEFAULT 'ETB',
    payment_method TEXT NOT NULL DEFAULT 'Telebirr',
    transaction_ref TEXT,
    screenshot_filename TEXT NOT NULL,
    screenshot_mime TEXT NOT NULL,
    screenshot_size INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    admin_note TEXT,
    submitted_at TEXT NOT NULL,
    reviewed_at TEXT,
    reviewed_by TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS published_pdfs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT 'all',
    course_code TEXT,
    semester INTEGER NOT NULL DEFAULT 1,
    category TEXT NOT NULL DEFAULT 'Lecture Module / Textbook',
    description TEXT,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    is_published INTEGER NOT NULL DEFAULT 1,
    uploaded_by TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

/**
 * Cryptographically secure password hashing using Node's built-in scrypt
 * Format: scrypt$<salt_hex>$<derived_key_hex>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
    const [, salt, originalKeyHex] = parts;
    const derivedBuffer = crypto.scryptSync(password, salt, 64);
    const originalBuffer = Buffer.from(originalKeyHex, 'hex');
    if (derivedBuffer.length !== originalBuffer.length) return false;
    return crypto.timingSafeEqual(derivedBuffer, originalBuffer);
  } catch {
    return false;
  }
}

// Ensure Admin account (AfraimAbebaw) exists in SQLite with hashed password
function ensureDefaultAdminAccount() {
  const targetAdminUsername = (process.env.ADMIN_USERNAME || 'AfraimAbebaw').trim();
  const targetAdminPhone = (process.env.ADMIN_PHONE || '0925804385').trim();
  const targetAdminPassword = process.env.ADMIN_PASSWORD || '@@abebaw%%12&&';
  const now = new Date().toISOString();

  // Check if AfraimAbebaw already exists
  const existingTargetAdmin = db
    .prepare(`SELECT * FROM users WHERE username = ? COLLATE NOCASE LIMIT 1`)
    .get(targetAdminUsername) as any;

  if (existingTargetAdmin) {
    // Ensure role is admin, status is APPROVED, and password matches targetAdminPassword
    if (
      existingTargetAdmin.role !== 'admin' ||
      existingTargetAdmin.account_status !== 'APPROVED' ||
      !verifyPassword(targetAdminPassword, existingTargetAdmin.password_hash)
    ) {
      db.prepare(`
        UPDATE users
        SET username = ?, password_hash = ?, role = 'admin', account_status = 'APPROVED', updated_at = ?
        WHERE id = ?
      `).run(targetAdminUsername, hashPassword(targetAdminPassword), now, existingTargetAdmin.id);
    }
    // Remove any legacy default 'admin' account if different
    db.prepare(`DELETE FROM users WHERE LOWER(username) = 'admin' AND id != ?`).run(existingTargetAdmin.id);
    return;
  }

  // Otherwise check if a legacy 'admin' role account exists and migrate it in-place
  const legacyAdmin = db
    .prepare(`SELECT * FROM users WHERE role = 'admin' LIMIT 1`)
    .get() as any;

  if (legacyAdmin) {
    db.prepare(`
      UPDATE users
      SET username = ?, phone_number = ?, password_hash = ?, role = 'admin', account_status = 'APPROVED', updated_at = ?
      WHERE id = ?
    `).run(targetAdminUsername, targetAdminPhone, hashPassword(targetAdminPassword), now, legacyAdmin.id);
    return;
  }

  const adminId = `usr_admin_${crypto.randomBytes(6).toString('hex')}`;
  db.prepare(`
    INSERT INTO users (id, username, phone_number, password_hash, role, account_status, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'admin', 'APPROVED', ?, ?)
  `).run(adminId, targetAdminUsername, targetAdminPhone, hashPassword(targetAdminPassword), now, now);
}

ensureDefaultAdminAccount();

export interface AuthenticatedUser {
  id: string;
  username: string;
  phoneNumber: string;
  role: 'student' | 'admin';
  accountStatus: 'PENDING_PAYMENT' | 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapUserRow(row: any): AuthenticatedUser {
  return {
    id: row.id,
    username: row.username,
    phoneNumber: row.phone_number,
    role: row.role === 'admin' ? 'admin' : 'student',
    accountStatus: row.account_status,
    rejectionReason: row.rejection_reason || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapPaymentRow(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    phoneNumber: row.phone_number,
    amount: Number(row.amount || 40),
    currency: row.currency || 'ETB',
    paymentMethod: row.payment_method || 'Telebirr',
    transactionRef: row.transaction_ref || '',
    screenshotMime: row.screenshot_mime,
    screenshotSize: Number(row.screenshot_size || 0),
    screenshotUrl: `/api/payments/${row.id}/screenshot`,
    status: row.status as 'PENDING' | 'APPROVED' | 'REJECTED',
    adminNote: row.admin_note || null,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at || null,
    reviewedBy: row.reviewed_by || null,
  };
}

function mapPdfRow(row: any) {
  return {
    id: row.id,
    title: row.title,
    subject: row.subject,
    courseCode: row.course_code || '',
    semester: Number(row.semester || 1),
    category: row.category || 'Lecture Module / Textbook',
    description: row.description || '',
    originalFilename: row.original_filename,
    fileSize: Number(row.file_size || 0),
    isPublished: Boolean(row.is_published),
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
    fileUrl: `/api/pdfs/${row.id}/file`,
  };
}

function createSessionForUser(userId: string): string {
  const token = `fah_sess_${crypto.randomBytes(32).toString('hex')}`;
  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
  db.prepare(`
    INSERT INTO sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(token, userId, now.toISOString(), expires.toISOString());
  return token;
}

function extractToken(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  if (typeof req.query.token === 'string' && req.query.token.trim()) {
    return req.query.token.trim();
  }
  return null;
}

function getAuthenticatedUserFromRequest(req: express.Request): AuthenticatedUser | null {
  const token = extractToken(req);
  if (!token) return null;

  const sessionRow = db.prepare(`SELECT user_id, expires_at FROM sessions WHERE token = ?`).get(token) as
    | { user_id: string; expires_at: string }
    | undefined;
  if (!sessionRow) return null;

  if (new Date(sessionRow.expires_at).getTime() < Date.now()) {
    db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
    return null;
  }

  const userRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(sessionRow.user_id);
  if (!userRow) return null;
  return mapUserRow(userRow);
}

function getLatestPaymentForUser(userId: string) {
  const row = db
    .prepare(`SELECT * FROM payment_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1`)
    .get(userId);
  return row ? mapPaymentRow(row) : null;
}

export function registerAuthPaymentPdfRoutes(app: express.Express) {
  // 1. SIGN UP (Username, Phone Number, Password, Confirm Password — NO Email)
  app.post('/api/auth/signup', (req, res) => {
    try {
      const { username, phoneNumber, password, confirmPassword } = req.body || {};
      const cleanUsername = String(username || '').trim();
      const cleanPhone = String(phoneNumber || '').trim();
      const rawPassword = String(password || '');
      const rawConfirm = String(confirmPassword || '');

      if (!cleanUsername || !cleanPhone || !rawPassword || !rawConfirm) {
        return res.status(400).json({
          error: 'All fields are required: Username, Phone Number, Password, and Confirm Password.',
        });
      }

      if (cleanUsername.length < 3 || cleanUsername.length > 36) {
        return res.status(400).json({
          error: 'Username must be between 3 and 36 characters.',
        });
      }

      if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
        return res.status(400).json({
          error: 'Username may only contain letters, numbers, underscores (_), dots (.), or hyphens (-).',
        });
      }

      const digitsOnlyPhone = cleanPhone.replace(/[\s()-]/g, '');
      if (!/^\+?[0-9]{9,15}$/.test(digitsOnlyPhone)) {
        return res.status(400).json({
          error: 'Please enter a valid phone number (e.g., 0911223344).',
        });
      }

      if (rawPassword.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long.',
        });
      }

      if (rawPassword !== rawConfirm) {
        return res.status(400).json({
          error: 'Password and Confirm Password do not match.',
        });
      }

      const existingUser = db
        .prepare(`SELECT id FROM users WHERE username = ? COLLATE NOCASE`)
        .get(cleanUsername);
      if (existingUser) {
        return res.status(409).json({
          error: 'That username is already taken. Please choose another username or log in.',
        });
      }

      const userId = `usr_${crypto.randomBytes(10).toString('hex')}`;
      const now = new Date().toISOString();
      const passwordHash = hashPassword(rawPassword);

      db.prepare(`
        INSERT INTO users (id, username, phone_number, password_hash, role, account_status, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'student', 'PENDING_PAYMENT', ?, ?)
      `).run(userId, cleanUsername, cleanPhone, passwordHash, now, now);

      const userRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
      const user = mapUserRow(userRow);
      const token = createSessionForUser(userId);

      return res.status(201).json({
        user,
        token,
        latestPayment: null,
      });
    } catch (err: any) {
      console.error('Signup error:', err);
      return res.status(500).json({ error: err.message || 'Failed to create account.' });
    }
  });

  // 2. LOGIN (Username or Phone Number + Password)
  app.post('/api/auth/login', (req, res) => {
    try {
      const { username, usernameOrPhone, password } = req.body || {};
      const identifier = String(usernameOrPhone || username || '').trim();
      const rawPassword = String(password || '');

      if (!identifier || !rawPassword) {
        return res.status(400).json({ error: 'Please enter your username (or phone number) and password.' });
      }

      const userRow = db
        .prepare(
          `SELECT * FROM users WHERE username = ? COLLATE NOCASE OR phone_number = ? LIMIT 1`
        )
        .get(identifier, identifier) as any;

      if (!userRow || !verifyPassword(rawPassword, userRow.password_hash)) {
        return res.status(401).json({ error: 'Invalid username/phone number or password.' });
      }

      const user = mapUserRow(userRow);
      const token = createSessionForUser(user.id);
      const latestPayment = getLatestPaymentForUser(user.id);

      return res.json({
        user,
        token,
        latestPayment,
      });
    } catch (err: any) {
      console.error('Login error:', err);
      return res.status(500).json({ error: err.message || 'Login failed.' });
    }
  });

  // 3. LOGOUT
  app.post('/api/auth/logout', (req, res) => {
    try {
      const token = extractToken(req);
      if (token) {
        db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
      }
      return res.json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Logout failed.' });
    }
  });

  // 4. GET CURRENT SESSION & ACCOUNT STATUS
  app.get('/api/auth/me', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated.' });
      }
      const latestPayment = getLatestPaymentForUser(user.id);
      return res.json({
        user,
        latestPayment,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to verify session.' });
    }
  });

  // 5. SUBMIT TELEBIRR 40 BIRR PAYMENT SCREENSHOT
  app.post('/api/payments/submit', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Please log in first to submit payment.' });
      }

      if (user.accountStatus === 'APPROVED') {
        return res.status(400).json({ error: 'Your account is already approved and unlocked.' });
      }

      // Check if user already has a PENDING payment request waiting for admin verification
      const existingPending = db
        .prepare(`SELECT * FROM payment_requests WHERE user_id = ? AND status = 'PENDING' LIMIT 1`)
        .get(user.id) as any;

      if (existingPending) {
        return res.status(400).json({
          error: 'You already have a payment request waiting for admin verification.',
          payment: mapPaymentRow(existingPending),
        });
      }

      const { phoneNumber, transactionRef, screenshotBase64, screenshotMime } = req.body || {};
      const cleanPhone = String(phoneNumber || user.phoneNumber || '').trim();
      const cleanTxRef = String(transactionRef || '').trim();
      const rawBase64 = String(screenshotBase64 || '').trim();

      if (!cleanPhone) {
        return res.status(400).json({ error: 'Student phone number is required.' });
      }

      if (!rawBase64) {
        return res.status(400).json({ error: 'Please select and upload your Telebirr payment screenshot.' });
      }

      // Extract base64 data & MIME type
      let mime = String(screenshotMime || 'image/jpeg').toLowerCase();
      let base64Payload = rawBase64;
      const dataUrlMatch = rawBase64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/i);
      if (dataUrlMatch) {
        mime = dataUrlMatch[1].toLowerCase();
        base64Payload = dataUrlMatch[2];
      }

      if (!mime.startsWith('image/')) {
        return res.status(400).json({ error: 'Payment screenshot must be a valid image file (PNG, JPG, WEBP).' });
      }

      const fileBuffer = Buffer.from(base64Payload, 'base64');
      if (fileBuffer.length < 64) {
        return res.status(400).json({ error: 'The selected screenshot file appears to be empty or corrupted.' });
      }
      if (fileBuffer.length > 15 * 1024 * 1024) {
        return res.status(400).json({ error: 'Screenshot file size must be under 15 MB.' });
      }

      const ext = mime.includes('png')
        ? 'png'
        : mime.includes('webp')
        ? 'webp'
        : mime.includes('gif')
        ? 'gif'
        : 'jpg';

      const paymentId = `pay_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
      const screenshotFilename = `${paymentId}.${ext}`;
      const screenshotFullPath = path.join(SCREENSHOTS_DIR, screenshotFilename);

      // Write screenshot securely to local server filesystem (outside public/)
      fs.writeFileSync(screenshotFullPath, fileBuffer);

      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO payment_requests (
          id, user_id, username, phone_number, amount, currency, payment_method,
          transaction_ref, screenshot_filename, screenshot_mime, screenshot_size,
          status, submitted_at
        ) VALUES (?, ?, ?, ?, 40, 'ETB', 'Telebirr', ?, ?, ?, ?, 'PENDING', ?)
      `).run(
        paymentId,
        user.id,
        user.username,
        cleanPhone,
        cleanTxRef || null,
        screenshotFilename,
        mime,
        fileBuffer.length,
        now
      );

      // Keep student status as PENDING_VERIFICATION (NOT approved automatically!)
      db.prepare(`
        UPDATE users
        SET account_status = 'PENDING_VERIFICATION', rejection_reason = NULL, updated_at = ?
        WHERE id = ?
      `).run(now, user.id);

      const paymentRow = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(paymentId);
      const updatedUserRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(user.id);

      return res.status(201).json({
        message: 'Payment submitted successfully. Your payment is waiting for admin verification.',
        payment: mapPaymentRow(paymentRow),
        user: mapUserRow(updatedUserRow),
      });
    } catch (err: any) {
      console.error('Payment submission error:', err);
      return res.status(500).json({ error: err.message || 'Failed to submit payment.' });
    }
  });

  // 6. GET MY PAYMENT SUBMISSIONS
  app.get('/api/payments/my', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated.' });
      }
      const rows = db
        .prepare(`SELECT * FROM payment_requests WHERE user_id = ? ORDER BY submitted_at DESC`)
        .all(user.id) as any[];
      return res.json({
        user,
        payments: rows.map(mapPaymentRow),
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to load payment history.' });
    }
  });

  // 7. SECURE SCREENSHOT STREAMING (ONLY Admin or the student who uploaded it)
  app.get('/api/payments/:id/screenshot', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Authentication required to view payment screenshot.' });
      }

      const paymentRow = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(req.params.id) as any;
      if (!paymentRow) {
        return res.status(404).json({ error: 'Payment record not found.' });
      }

      if (user.role !== 'admin' && paymentRow.user_id !== user.id) {
        return res.status(403).json({ error: 'Access denied.' });
      }

      const safeFilename = path.basename(paymentRow.screenshot_filename);
      const filePath = path.join(SCREENSHOTS_DIR, safeFilename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Screenshot file not found on server.' });
      }

      res.setHeader('Content-Type', paymentRow.screenshot_mime || 'image/jpeg');
      res.setHeader('Cache-Control', 'private, no-store, max-age=0');
      return res.sendFile(filePath);
    } catch (err: any) {
      console.error('Screenshot fetch error:', err);
      return res.status(500).json({ error: 'Failed to load screenshot.' });
    }
  });

  // ============================================================================
  // ADMIN PANEL ENDPOINTS (Protected by Admin role authentication)
  // ============================================================================

  const requireAdmin: express.RequestHandler = (req, res, next) => {
    const user = getAuthenticatedUserFromRequest(req);
    if (!user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    if (user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access only.' });
      return;
    }
    (req as any).adminUser = user;
    next();
  };

  // 8. ADMIN OVERVIEW & PAYMENT REQUESTS LIST
  app.get('/api/admin/overview', requireAdmin, (_req, res) => {
    try {
      const paymentRows = db
        .prepare(`
          SELECT * FROM payment_requests
          ORDER BY CASE status WHEN 'PENDING' THEN 0 WHEN 'APPROVED' THEN 1 ELSE 2 END, submitted_at DESC
        `)
        .all() as any[];

      const userRows = db
        .prepare(`SELECT * FROM users ORDER BY created_at DESC`)
        .all() as any[];

      const pdfRows = db
        .prepare(`SELECT * FROM published_pdfs ORDER BY created_at DESC`)
        .all() as any[];

      // Filter PDFs to only those whose files genuinely exist on disk
      const existingPdfs = pdfRows.filter((row) => {
        const safeFile = path.basename(row.filename);
        return fs.existsSync(path.join(PDFS_DIR, safeFile));
      });

      return res.json({
        payments: paymentRows.map(mapPaymentRow),
        users: userRows.map(mapUserRow),
        pdfs: existingPdfs.map(mapPdfRow),
      });
    } catch (err: any) {
      console.error('Admin overview error:', err);
      return res.status(500).json({ error: err.message || 'Failed to load admin dashboard data.' });
    }
  });

  // 9. ADMIN APPROVE PAYMENT REQUEST
  app.post('/api/admin/payments/:id/approve', requireAdmin, (req, res) => {
    try {
      const adminUser = (req as any).adminUser as AuthenticatedUser;
      const paymentId = req.params.id;
      const paymentRow = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(paymentId) as any;

      if (!paymentRow) {
        return res.status(404).json({ error: 'Payment request not found.' });
      }

      const now = new Date().toISOString();

      db.prepare(`
        UPDATE payment_requests
        SET status = 'APPROVED', admin_note = ?, reviewed_at = ?, reviewed_by = ?
        WHERE id = ?
      `).run(req.body?.note || 'Verified and approved by Admin', now, adminUser.username, paymentId);

      // Unlock full access for the student
      db.prepare(`
        UPDATE users
        SET account_status = 'APPROVED', rejection_reason = NULL, updated_at = ?
        WHERE id = ?
      `).run(now, paymentRow.user_id);

      const updatedPayment = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(paymentId);
      const updatedUser = db.prepare(`SELECT * FROM users WHERE id = ?`).get(paymentRow.user_id);

      return res.json({
        message: `Payment approved. ${paymentRow.username} now has full access.`,
        payment: mapPaymentRow(updatedPayment),
        user: updatedUser ? mapUserRow(updatedUser) : null,
      });
    } catch (err: any) {
      console.error('Approve payment error:', err);
      return res.status(500).json({ error: err.message || 'Failed to approve payment.' });
    }
  });

  // 10. ADMIN REJECT PAYMENT REQUEST
  app.post('/api/admin/payments/:id/reject', requireAdmin, (req, res) => {
    try {
      const adminUser = (req as any).adminUser as AuthenticatedUser;
      const paymentId = req.params.id;
      const reason = String(req.body?.reason || 'Payment screenshot could not be verified. Please submit a valid Telebirr payment screenshot.').trim();

      const paymentRow = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(paymentId) as any;
      if (!paymentRow) {
        return res.status(404).json({ error: 'Payment request not found.' });
      }

      const now = new Date().toISOString();

      db.prepare(`
        UPDATE payment_requests
        SET status = 'REJECTED', admin_note = ?, reviewed_at = ?, reviewed_by = ?
        WHERE id = ?
      `).run(reason, now, adminUser.username, paymentId);

      // Set student status to REJECTED unless they have another APPROVED payment
      const otherApproved = db
        .prepare(`SELECT id FROM payment_requests WHERE user_id = ? AND status = 'APPROVED' AND id != ? LIMIT 1`)
        .get(paymentRow.user_id, paymentId);

      if (!otherApproved) {
        db.prepare(`
          UPDATE users
          SET account_status = 'REJECTED', rejection_reason = ?, updated_at = ?
          WHERE id = ?
        `).run(reason, now, paymentRow.user_id);
      }

      const updatedPayment = db.prepare(`SELECT * FROM payment_requests WHERE id = ?`).get(paymentId);
      const updatedUser = db.prepare(`SELECT * FROM users WHERE id = ?`).get(paymentRow.user_id);

      return res.json({
        message: `Payment request rejected for ${paymentRow.username}.`,
        payment: mapPaymentRow(updatedPayment),
        user: updatedUser ? mapUserRow(updatedUser) : null,
      });
    } catch (err: any) {
      console.error('Reject payment error:', err);
      return res.status(500).json({ error: err.message || 'Failed to reject payment.' });
    }
  });

  // 11. ADMIN UPDATE STUDENT ACCOUNT STATUS Directly
  app.post('/api/admin/users/:id/status', requireAdmin, (req, res) => {
    try {
      const targetUserId = req.params.id;
      const { accountStatus, rejectionReason } = req.body || {};
      const validStatuses = ['PENDING_PAYMENT', 'PENDING_VERIFICATION', 'APPROVED', 'REJECTED'];

      if (!validStatuses.includes(accountStatus)) {
        return res.status(400).json({ error: 'Invalid account status.' });
      }

      const targetRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(targetUserId) as any;
      if (!targetRow) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const now = new Date().toISOString();
      db.prepare(`
        UPDATE users
        SET account_status = ?, rejection_reason = ?, updated_at = ?
        WHERE id = ?
      `).run(accountStatus, accountStatus === 'REJECTED' ? (rejectionReason || 'Access revoked by Admin') : null, now, targetUserId);

      const updatedRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(targetUserId);
      return res.json({
        user: mapUserRow(updatedRow),
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to update user status.' });
    }
  });

  // 12. ADMIN CHANGE PASSWORD / CREDENTIALS
  app.post('/api/admin/change-password', requireAdmin, (req, res) => {
    try {
      const adminUser = (req as any).adminUser as AuthenticatedUser;
      const { currentPassword, newPassword, newUsername } = req.body || {};

      const adminRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(adminUser.id) as any;
      if (!adminRow || !verifyPassword(String(currentPassword || ''), adminRow.password_hash)) {
        return res.status(401).json({ error: 'Current admin password is incorrect.' });
      }

      if (!newPassword || String(newPassword).length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters.' });
      }

      const updatedUsername = String(newUsername || adminRow.username).trim();
      const now = new Date().toISOString();

      db.prepare(`
        UPDATE users
        SET username = ?, password_hash = ?, updated_at = ?
        WHERE id = ?
      `).run(updatedUsername, hashPassword(String(newPassword)), now, adminUser.id);

      const updatedRow = db.prepare(`SELECT * FROM users WHERE id = ?`).get(adminUser.id);
      return res.json({
        message: 'Admin credentials updated successfully.',
        user: mapUserRow(updatedRow),
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to update admin password.' });
    }
  });

  // 13. ADMIN UPLOAD & PUBLISH REAL PDF
  app.post('/api/admin/pdfs/upload', requireAdmin, (req, res) => {
    try {
      const adminUser = (req as any).adminUser as AuthenticatedUser;
      const {
        title,
        subject = 'all',
        courseCode = '',
        semester = 1,
        category = 'Lecture Module / Textbook',
        description = '',
        isPublished = true,
        pdfBase64,
        originalFilename = 'document.pdf',
      } = req.body || {};

      const cleanTitle = String(title || '').trim();
      if (!cleanTitle) {
        return res.status(400).json({ error: 'PDF title is required.' });
      }

      const rawBase64 = String(pdfBase64 || '').trim();
      if (!rawBase64) {
        return res.status(400).json({ error: 'Please select a valid PDF file to upload.' });
      }

      const base64Payload = rawBase64.replace(/^data:application\/pdf;base64,/i, '').replace(/^data:[^;]+;base64,/i, '');
      const pdfBuffer = Buffer.from(base64Payload, 'base64');

      if (pdfBuffer.length < 16) {
        return res.status(400).json({ error: 'Uploaded PDF file is empty or invalid.' });
      }

      // Verify %PDF- magic header bytes so only genuine PDF files can be uploaded
      const headerStr = pdfBuffer.subarray(0, 8).toString('ascii');
      if (!headerStr.includes('%PDF-')) {
        return res.status(400).json({ error: 'The selected file is not a valid PDF document.' });
      }

      if (pdfBuffer.length > 45 * 1024 * 1024) {
        return res.status(400).json({ error: 'PDF file size must be under 45 MB.' });
      }

      const pdfId = `pdf_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
      const storedFilename = `${pdfId}.pdf`;
      const fullPath = path.join(PDFS_DIR, storedFilename);

      fs.writeFileSync(fullPath, pdfBuffer);

      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO published_pdfs (
          id, title, subject, course_code, semester, category, description,
          filename, original_filename, file_size, is_published, uploaded_by, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        pdfId,
        cleanTitle,
        String(subject || 'all'),
        String(courseCode || '').trim(),
        Number(semester) === 2 ? 2 : 1,
        String(category || 'Lecture Module / Textbook').trim(),
        String(description || '').trim(),
        storedFilename,
        String(originalFilename || `${cleanTitle}.pdf`),
        pdfBuffer.length,
        isPublished ? 1 : 0,
        adminUser.username,
        now
      );

      const insertedRow = db.prepare(`SELECT * FROM published_pdfs WHERE id = ?`).get(pdfId);
      return res.status(201).json({
        message: 'PDF uploaded and saved successfully.',
        pdf: mapPdfRow(insertedRow),
      });
    } catch (err: any) {
      console.error('Admin PDF upload error:', err);
      return res.status(500).json({ error: err.message || 'Failed to upload PDF.' });
    }
  });

  // 14. ADMIN TOGGLE PUBLISH / EDIT PDF METADATA
  app.put('/api/admin/pdfs/:id', requireAdmin, (req, res) => {
    try {
      const pdfId = req.params.id;
      const existing = db.prepare(`SELECT * FROM published_pdfs WHERE id = ?`).get(pdfId) as any;
      if (!existing) {
        return res.status(404).json({ error: 'PDF record not found.' });
      }

      const title = req.body?.title !== undefined ? String(req.body.title).trim() : existing.title;
      const subject = req.body?.subject !== undefined ? String(req.body.subject) : existing.subject;
      const courseCode = req.body?.courseCode !== undefined ? String(req.body.courseCode).trim() : existing.course_code;
      const semester = req.body?.semester !== undefined ? (Number(req.body.semester) === 2 ? 2 : 1) : existing.semester;
      const category = req.body?.category !== undefined ? String(req.body.category) : existing.category;
      const description = req.body?.description !== undefined ? String(req.body.description) : existing.description;
      const isPublished = req.body?.isPublished !== undefined ? (req.body.isPublished ? 1 : 0) : existing.is_published;

      db.prepare(`
        UPDATE published_pdfs
        SET title = ?, subject = ?, course_code = ?, semester = ?, category = ?, description = ?, is_published = ?
        WHERE id = ?
      `).run(title, subject, courseCode, semester, category, description, isPublished, pdfId);

      const updated = db.prepare(`SELECT * FROM published_pdfs WHERE id = ?`).get(pdfId);
      return res.json({ pdf: mapPdfRow(updated) });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to update PDF.' });
    }
  });

  // 15. ADMIN DELETE PDF (Removes both DB row and file on disk)
  app.delete('/api/admin/pdfs/:id', requireAdmin, (req, res) => {
    try {
      const pdfId = req.params.id;
      const existing = db.prepare(`SELECT * FROM published_pdfs WHERE id = ?`).get(pdfId) as any;
      if (!existing) {
        return res.status(404).json({ error: 'PDF record not found.' });
      }

      const safeFile = path.basename(existing.filename);
      const filePath = path.join(PDFS_DIR, safeFile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      db.prepare(`DELETE FROM published_pdfs WHERE id = ?`).run(pdfId);
      return res.json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete PDF.' });
    }
  });

  // 16. STUDENT & ADMIN: LIST PUBLISHED PDFS (Only returns PDFs that actually exist on disk and are published by Admin)
  app.get('/api/pdfs', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Authentication required.' });
      }
      if (user.role !== 'admin' && user.accountStatus !== 'APPROVED') {
        return res.status(403).json({ error: 'Full access approval is required to access published PDFs.' });
      }

      const rows = db
        .prepare(`SELECT * FROM published_pdfs WHERE is_published = 1 ORDER BY created_at DESC`)
        .all() as any[];

      // Strictly verify that the actual PDF file exists on the filesystem
      const verifiedRows = rows.filter((row) => {
        const safeFile = path.basename(row.filename);
        return fs.existsSync(path.join(PDFS_DIR, safeFile));
      });

      return res.json({
        pdfs: verifiedRows.map(mapPdfRow),
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to load published PDFs.' });
    }
  });

  // 17. STREAM / DOWNLOAD REAL PDF FILE (Requires Approved Student or Admin)
  app.get('/api/pdfs/:id/file', (req, res) => {
    try {
      const user = getAuthenticatedUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'Authentication required to access PDF.' });
      }
      if (user.role !== 'admin' && user.accountStatus !== 'APPROVED') {
        return res.status(403).json({ error: 'Payment verification required to view or download PDFs.' });
      }

      const pdfRow = db.prepare(`SELECT * FROM published_pdfs WHERE id = ?`).get(req.params.id) as any;
      if (!pdfRow || (!pdfRow.is_published && user.role !== 'admin')) {
        return res.status(404).json({ error: 'PDF document not found.' });
      }

      const safeFile = path.basename(pdfRow.filename);
      const filePath = path.join(PDFS_DIR, safeFile);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'PDF file does not exist on server.' });
      }

      const downloadName = String(pdfRow.original_filename || `${pdfRow.title}.pdf`).replace(/[^a-zA-Z0-9._-]/g, '_');
      const disposition = req.query.download === '1' ? 'attachment' : 'inline';

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `${disposition}; filename="${downloadName}"`);
      res.setHeader('Cache-Control', 'private, max-age=300');
      return res.sendFile(filePath);
    } catch (err: any) {
      console.error('Stream PDF error:', err);
      return res.status(500).json({ error: 'Failed to stream PDF file.' });
    }
  });
}
