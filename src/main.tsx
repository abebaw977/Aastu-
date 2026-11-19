import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminApp from '../Admin/src/AdminApp.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

const isStandaloneAdminRoute =
  typeof window !== 'undefined' &&
  (window.location.pathname.toLowerCase().startsWith('/admin') ||
    new URLSearchParams(window.location.search).get('app') === 'admin' ||
    import.meta.env.VITE_APP_TARGET === 'admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStandaloneAdminRoute ? <AdminApp /> : <App />}
  </StrictMode>
);

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
