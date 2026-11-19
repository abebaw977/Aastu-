import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

/**
 * Default deployed backend URL for the Android APK when VITE_API_BASE_URL is not overridden at build time.
 * Keeps all Gemini API calls strictly on the backend server (no API keys in the APK).
 */
const DEFAULT_PRODUCTION_BACKEND_URL =
  'https://ais-pre-4r2whut7pkxcpt7lj27n6q-669566522160.europe-west2.run.app';
const LOCAL_TERMUX_BACKEND_URL = 'http://127.0.0.1:3000';

/**
 * Returns true when running inside the packaged Capacitor Android/iOS native shell.
 */
export function isNativeMobileApp(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/**
 * Resolves a backend API path (e.g. `/api/gemini/tutor`) for both Web and Capacitor Android APK.
 */
export function resolveBackendApiUrl(path: string, baseOverride?: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (baseOverride) {
    return `${baseOverride.replace(/\/+$/, '')}${normalizedPath}`;
  }

  const envBaseUrl =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
      ? String(import.meta.env.VITE_API_BASE_URL).trim()
      : '';

  const isCapNative = isNativeMobileApp();
  const isLocalWebViewOrigin =
    typeof window !== 'undefined' &&
    (window.location.protocol === 'capacitor:' ||
      window.location.protocol === 'file:' ||
      (isCapNative && window.location.hostname === 'localhost'));

  if (isCapNative || isLocalWebViewOrigin) {
    const base = (envBaseUrl || LOCAL_TERMUX_BACKEND_URL).replace(/\/+$/, '');
    return `${base}${normalizedPath}`;
  }

  return normalizedPath;
}

/**
 * Returns ordered candidate backend base URLs for the Android APK:
 * 1. Explicit VITE_API_BASE_URL if set
 * 2. Local Termux Express server on the same phone (http://127.0.0.1:3000)
 * 3. Cloud Run backend URL
 */
export function getAndroidCandidateBaseUrls(): string[] {
  const envBaseUrl =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
      ? String(import.meta.env.VITE_API_BASE_URL).trim().replace(/\/+$/, '')
      : '';

  const candidates = [
    LOCAL_TERMUX_BACKEND_URL,
    envBaseUrl,
    DEFAULT_PRODUCTION_BACKEND_URL,
  ].filter(Boolean);

  return Array.from(new Set(candidates));
}

export interface AndroidBackHandlerCallbacks {
  /**
   * Return `true` if the back press was consumed by closing a modal, scratchpad, simulator,
   * or returning to the main tab. Return `false` if already at the root screen.
   */
  onHardwareBack: () => boolean;
}

/**
 * Initializes Android native StatusBar, Keyboard visibility classes, and Hardware Back Button handling.
 * Returns a cleanup function.
 */
export function initAndroidNativeBridge(callbacks?: Partial<AndroidBackHandlerCallbacks>): () => void {
  const cleanups: Array<() => void> = [];

  // 1. Configure Android Status Bar to match the slate-900 academic header
  if (isNativeMobileApp()) {
    StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    StatusBar.setBackgroundColor({ color: '#0f172a' }).catch(() => {});
  }

  // 2. Configure Native & WebView Keyboard detection so bottom navigation doesn't overlap text inputs
  if (isNativeMobileApp()) {
    const showPromise = Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboard-open');
    });
    const hidePromise = Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboard-open');
    });

    cleanups.push(() => {
      showPromise.then((h) => h.remove()).catch(() => {});
      hidePromise.then((h) => h.remove()).catch(() => {});
    });
  }

  // Fallback visualViewport listener for Android WebView & mobile browsers
  if (typeof window !== 'undefined' && window.visualViewport) {
    const vv = window.visualViewport;
    let baselineHeight = window.innerHeight;

    const handleViewportResize = () => {
      if (window.innerWidth > 1024) {
        document.body.classList.remove('keyboard-open');
        return;
      }
      if (vv.height > baselineHeight) {
        baselineHeight = vv.height;
      }
      const heightDiff = baselineHeight - vv.height;
      if (heightDiff > 140) {
        document.body.classList.add('keyboard-open');
      } else {
        document.body.classList.remove('keyboard-open');
      }
    };

    vv.addEventListener('resize', handleViewportResize);
    cleanups.push(() => vv.removeEventListener('resize', handleViewportResize));
  }

  // 3. Configure Android Hardware Back Button
  const backListenerPromise = CapApp.addListener('backButton', () => {
    const handledInApp = callbacks?.onHardwareBack ? callbacks.onHardwareBack() : false;
    if (!handledInApp) {
      // Minimize app gracefully when user presses back on the home screen
      CapApp.minimizeApp().catch(() => {
        CapApp.exitApp().catch(() => {});
      });
    }
  });

  cleanups.push(() => {
    backListenerPromise.then((h) => h.remove()).catch(() => {});
  });

  return () => {
    for (const fn of cleanups) {
      try {
        fn();
      } catch {
        // ignore cleanup errors
      }
    }
  };
}
