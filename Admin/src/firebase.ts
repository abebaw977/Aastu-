import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  initializeFirestore,
  setLogLevel,
  type Firestore,
} from 'firebase/firestore';
import adminFirebaseConfig from '../firebase-applet-config.json';

// Silence WebChannel fallback logs during offline/cached operation
setLogLevel('silent');

const adminApp = getApps().length > 0 ? getApp() : initializeApp(adminFirebaseConfig);

function createAdminFirestoreInstance(): Firestore {
  try {
    return initializeFirestore(
      adminApp,
      {
        experimentalAutoDetectLongPolling: true,
      },
      adminFirebaseConfig.firestoreDatabaseId
    );
  } catch {
    return getFirestore(adminApp, adminFirebaseConfig.firestoreDatabaseId);
  }
}

export const adminDb = createAdminFirestoreInstance();
export const adminAuth = getAuth(adminApp);
export const ADMIN_FIRESTORE_DATABASE_ID = adminFirebaseConfig.firestoreDatabaseId;
export const ADMIN_FIREBASE_PROJECT_ID = adminFirebaseConfig.projectId;

export async function verifyAdminCloudConnection(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return false;
  }
  try {
    await getDoc(doc(adminDb, 'test', 'connection'));
    return true;
  } catch {
    return true;
  }
}
