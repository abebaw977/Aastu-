import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'edu.freshmanacademy.admin',
  appName: 'Freshman Admin Control',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'ais-pre-4r2whut7pkxcpt7lj27n6q-669566522160.europe-west2.run.app',
      'ais-dev-4r2whut7pkxcpt7lj27n6q-669566522160.europe-west2.run.app',
    ],
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#0f172a',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#0f172a',
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
