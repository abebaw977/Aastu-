// Offline IndexedDB storage for downloaded Published PDFs (LTMW Library)
// Stores full PDF data URLs on the student's phone so downloaded PDFs open
// instantaneously inside the Freshman Academy Hub PDF reader even without internet.

const DB_NAME = 'freshman_ltmw_pdf_library_db';
const DB_VERSION = 1;
const STORE_NAME = 'downloaded_pdfs';
const LOCAL_META_INDEX_KEY = 'freshman_downloaded_pdf_ids_v1';

export interface StoredOfflinePdfRecord {
  id: string;
  pdfDataUrl: string;
  fileSize: number;
  downloadedAt: string;
}

function getLocalDownloadedIndex(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LOCAL_META_INDEX_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setLocalDownloadedIndex(index: Record<string, boolean>): void {
  try {
    localStorage.setItem(LOCAL_META_INDEX_KEY, JSON.stringify(index));
  } catch {
    // ignore storage quota errors
  }
}

function openPdfDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open offline PDF database.'));
  });
}

export async function getDownloadedPdfIds(): Promise<Record<string, boolean>> {
  const fallbackIndex = getLocalDownloadedIndex();
  try {
    const db = await openPdfDatabase();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = (req.result || []) as string[];
        const map: Record<string, boolean> = { ...fallbackIndex };
        keys.forEach((k) => {
          map[String(k)] = true;
        });
        setLocalDownloadedIndex(map);
        resolve(map);
      };
      req.onerror = () => resolve(fallbackIndex);
    });
  } catch {
    return fallbackIndex;
  }
}

export async function saveDownloadedPdfToDevice(
  pdfId: string,
  pdfDataUrl: string,
  fileSize = 0
): Promise<void> {
  if (!pdfId || !pdfDataUrl) return;
  const idx = getLocalDownloadedIndex();
  idx[pdfId] = true;
  setLocalDownloadedIndex(idx);

  try {
    const db = await openPdfDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record: StoredOfflinePdfRecord = {
        id: pdfId,
        pdfDataUrl,
        fileSize: fileSize || Math.round(pdfDataUrl.length * 0.75),
        downloadedAt: new Date().toISOString(),
      };
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Fallback for restricted environments
    try {
      sessionStorage.setItem(`freshman_pdf_data_${pdfId}`, pdfDataUrl);
    } catch {
      // ignore
    }
  }
}

export async function getDownloadedPdfFromDevice(pdfId: string): Promise<string | null> {
  if (!pdfId) return null;
  try {
    const db = await openPdfDatabase();
    const record = await new Promise<StoredOfflinePdfRecord | undefined>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(pdfId);
      req.onsuccess = () => resolve(req.result as StoredOfflinePdfRecord | undefined);
      req.onerror = () => resolve(undefined);
    });
    if (record && record.pdfDataUrl) {
      return record.pdfDataUrl;
    }
  } catch {
    // ignore and check sessionStorage fallback
  }

  try {
    return sessionStorage.getItem(`freshman_pdf_data_${pdfId}`);
  } catch {
    return null;
  }
}

export async function deleteDownloadedPdfFromDevice(pdfId: string): Promise<void> {
  const idx = getLocalDownloadedIndex();
  delete idx[pdfId];
  setLocalDownloadedIndex(idx);

  try {
    const db = await openPdfDatabase();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(pdfId);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

/**
 * Converts a base64 Data URL (`data:application/pdf;base64,...`) or raw base64 string
 * into a Uint8Array suitable for Freshman Academy Hub's built-in PDF.js canvas reader.
 */
export function pdfDataUrlToUint8Array(dataUrlOrBase64: string): Uint8Array {
  const trimmed = String(dataUrlOrBase64 || '').trim();
  if (!trimmed) {
    throw new Error('PDF data is empty.');
  }
  const commaIdx = trimmed.indexOf(',');
  const base64 = commaIdx >= 0 ? trimmed.slice(commaIdx + 1) : trimmed;
  const cleanBase64 = base64.replace(/[\r\n\s]+/g, '');
  const binaryString = atob(cleanBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
