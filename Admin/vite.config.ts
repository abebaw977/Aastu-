import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function adminOfflinePwaPlugin(): Plugin {
  return {
    name: 'freshman-admin-offline-pwa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const manifest = {
        name: 'Freshman Admin Control',
        short_name: 'Freshman Admin',
        description:
          'Standalone Administrator Control Center for Freshman Academy Hub — Payment Approvals, PDF Publishing & Exam MCQs',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
      };

      fs.writeFileSync(
        path.join(distDir, 'manifest.webmanifest'),
        JSON.stringify(manifest, null, 2)
      );
    },
  };
}

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react(), tailwindcss(), adminOfflinePwaPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
