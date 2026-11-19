# Freshman Admin Control App (`edu.freshmanacademy.admin`)

This `/Admin` directory contains the **isolated, standalone Administrator Application**, its **Firebase configuration**, and its **dedicated Android Capacitor Gradle project** (`/Admin/android`).

## Why Admin Is Separated from the Freshman Student App
- **Zero Admin Attack Surface on Student App:** The Freshman Student App (`edu.freshmanacademy.hub`) has no Admin Login button on the registration/login screen (`AuthGateView.tsx`) and rejects any administrator credentials entered into the student portal.
- **Hardened Admin Authentication (`AdminAuthGateView.tsx`):** Includes brute-force lockout protection (locks out for 60 seconds after 5 failed attempts) and strict `role === 'admin'` verification.
- **Shared Live Cloud Firestore Database:** Connected to the same Cloud Firestore database (`ai-studio-aastuentranceexa-1548a313-ba2a-4373-8a06-d0e57da8c2ab` in `firebase-applet-config.json`), so approving a student's 50 ETB Telebirr payment, uploading a course/exam PDF, or posting Mid/Final Exam Images & MCQs updates all student devices in real time.

## Directory Structure
- `/Admin/src/AdminApp.tsx` — Standalone Admin Application root
- `/Admin/src/components/AdminAuthGateView.tsx` — Hardened Admin Login & Brute-Force Protection
- `/Admin/src/components/AdminDashboardView.tsx` — Full Admin Control Panel (Telebirr Payments, Student Accounts, PDFs, Practice Images & MCQs, Admin Security)
- `/Admin/src/firebase.ts` — Dedicated Admin Firebase Auth & Firestore instance
- `/Admin/firebase-applet-config.json` — Firebase project & Firestore database config
- `/Admin/firestore.rules` — Firestore security rules
- `/Admin/capacitor.config.ts` — Capacitor configuration (`edu.freshmanacademy.admin`)
- `/Admin/android/` — Standalone Android Studio / Gradle project for building the Admin APK

## Building the Admin Android APK
From the workspace root:
```bash
npm run build:admin
npm run android:admin:apk:debug
```
Or directly inside `/Admin`:
```bash
npm run android:apk:debug
```
The compiled Admin APK will be generated at:
`Admin/android/app/build/outputs/apk/debug/app-debug.apk`
