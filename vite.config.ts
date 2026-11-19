import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

/**
 * Termux & Android-safe Offline PWA Service Worker + Web App Manifest generator.
 * Avoids workbox-build's multi-process terser worker pool which crashes on Android Termux.
 */
function offlinePwaPlugin(): Plugin {
  return {
    name: 'freshman-offline-pwa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const collectFiles = (dir: string, base = ''): string[] => {
        const results: string[] = [];
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
          const rel = path.posix.join(base, entry.name);
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            results.push(...collectFiles(full, rel));
          } else if (/\.(js|css|html|ico|png|svg|woff|woff2|ttf|webmanifest)$/i.test(entry.name) && entry.name !== 'sw.js') {
            results.push('/' + rel);
          }
        }
        return results;
      };

      const manifest = {
        name: 'Freshman Academy Hub',
        short_name: 'Freshman Hub',
        description: 'Ethiopian Higher Education Freshman Course Mastery Hub — All 17 Subjects, Notes, Formulas, Mock Exams & AI Tutor',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
          {src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
          {src: '/icons/icon-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
        ],
      };

      fs.writeFileSync(path.join(distDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));

      const assets = collectFiles(distDir);
      const cacheName = `freshman-hub-v1-${Date.now()}`;
      const swContent = `const CACHE_NAME = ${JSON.stringify(cacheName)};
const PRECACHE_URLS = ${JSON.stringify(['/', ...assets])};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || req.url.includes('/api/')) return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
`;
      fs.writeFileSync(path.join(distDir, 'sw.js'), swContent);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), offlinePwaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
