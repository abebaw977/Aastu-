# Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: Any path not explicitly defined in `/users/{userId}`, `/payments/{paymentId}`, `/pdfs/{pdfId}`, `/pdf_chunks/{chunkId}`, or `/test/{docId}` is unconditionally denied (`allow read, write: if false;`).
2. **Path Variable Hardening (`isValidId`)**: Every single-document operation (`get`, `create`, `update`, `delete`) must validate its document ID against `^[a-zA-Z0-9_\-]+$` with length between 3 and 128 characters.
3. **Strict Schema & Key Allowlisting**: Every `create` and `update` operation on `/users/{userId}`, `/payments/{paymentId}`, `/pdfs/{pdfId}`, and `/pdf_chunks/{chunkId}` must pass its dedicated validation blueprint (`isValidUserAccount`, `isValidPaymentRequest`, `isValidPublishedPdf`, `isValidPdfChunk`), which enforces exact required/allowed keys (`hasAll` + `hasOnly`), field types, and string `.size()` boundaries.
4. **Role & Privilege Escalation Prevention**: A newly created user account must either be a student (`role == 'student'` and `accountStatus == 'PENDING_PAYMENT'`) or the single bootstrapped admin record (`userId == 'usr_admin_default' && role == 'admin'`). No student can self-assign `role == 'admin'` or `accountStatus == 'APPROVED'` on signup.
5. **Relational Integrity on Payments**: A `/payments/{paymentId}` document can only be created if its `userId` references an existing `/users/{userId}` document (`exists(/databases/$(database)/documents/users/$(incoming().userId))`), with `amount == 50`, `currency == 'ETB'`, `paymentMethod == 'Telebirr'`, and initial `status == 'PENDING'`.
6. **Action-Based Updates & Immutability**: Updates to `/users/{userId}` and `/payments/{paymentId}` are restricted to explicit action branches using `incoming().diff(existing()).affectedKeys().hasOnly(...)` and preserve immutable fields (`id`, `createdAt`, `userId`, `submittedAt`, `screenshotDataUrl`).

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1 — Privilege Escalation on Signup**: Creating `/users/usr_attacker` with `role: "admin"` and `accountStatus: "APPROVED"`.
2. **Payload 2 — Shadow Field Injection on User Create**: Creating `/users/usr_shadow` with an extra undeclared field `isSuperAdmin: true`.
3. **Payload 3 — Plaintext / Oversized Password Hash Poisoning**: Creating `/users/usr_badhash` with `passwordHash: "123"` (violates minimum hash length and PBKDF2 prefix).
4. **Payload 4 — ID Mismatch Spoofing**: Creating `/users/usr_one` where `data.id == "usr_two"`.
5. **Payload 5 — Path ID Poisoning**: Creating `/users/invalid$id!@#` with non-alphanumeric characters or >128 chars.
6. **Payload 6 — Orphaned Payment Submission**: Creating `/payments/pay_orphan` where `userId: "usr_nonexistent"` does not exist in `/users`.
7. **Payload 7 — Auto-Approved Payment Creation**: Creating `/payments/pay_cheat` with initial `status: "APPROVED"` instead of `"PENDING"`.
8. **Payload 8 — Invalid Payment Amount/Currency**: Creating `/payments/pay_fakeamount` with `amount: 1` or `currency: "USD"`.
9. **Payload 9 — Immutable Field Tampering on Payment Update**: Updating `/payments/pay_1` while mutating `userId` or `screenshotDataUrl`.
10. **Payload 10 — Shadow Field Update on User Account**: Updating `/users/usr_1` while changing `createdAt` or injecting `hacked: true`.
11. **Payload 11 — Oversized Resource Exhaustion Payload**: Creating `/pdfs/pdf_1` with a `title` exceeding 200 characters or `description` exceeding 2000 characters.
12. **Payload 12 — Unprotected Collection Write**: Writing to `/unprotected_collection/doc_1` (blocked by global default-deny safety net).
