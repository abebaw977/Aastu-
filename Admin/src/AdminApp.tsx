import React, { useState, useEffect, useCallback } from 'react';
import { AuthUser, PaymentRequestRecord, ThemeMode } from '../../src/types';
import {
  getSavedAuthToken,
  getCachedAuthUser,
  saveCachedSession,
  fetchCurrentSession,
  logoutUser,
  clearAuthToken,
} from '../../src/utils/authPaymentService';
import { initAndroidNativeBridge } from '../../src/utils/capacitorAndroid';
import { verifyAdminCloudConnection } from './firebase';
import { AdminAuthGateView } from './components/AdminAuthGateView';
import { AdminDashboardView } from './components/AdminDashboardView';

export default function AdminApp() {
  const [adminUser, setAdminUser] = useState<AuthUser | null>(() => {
    const cached = getCachedAuthUser();
    return cached?.role === 'admin' ? cached : null;
  });

  const [themeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('freshman_admin_theme_mode');
      if (saved === 'blue' || saved === 'black' || saved === 'white') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'blue';
  });

  useEffect(() => {
    initAndroidNativeBridge();
    verifyAdminCloudConnection().catch(() => {});
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-blue', 'theme-black', 'theme-white', 'dark');
    root.classList.add(`theme-${themeMode}`);
    if (themeMode === 'blue' || themeMode === 'black') {
      root.classList.add('dark');
    }
  }, [themeMode]);

  useEffect(() => {
    const token = getSavedAuthToken();
    if (!token) return;
    let mounted = true;
    fetchCurrentSession()
      .then((res) => {
        if (!mounted) return;
        if (res.user.role !== 'admin') {
          clearAuthToken();
          setAdminUser(null);
          return;
        }
        setAdminUser(res.user);
        saveCachedSession(res.user, res.latestPayment);
      })
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof Error && err.message === 'Session expired.') {
          clearAuthToken();
          setAdminUser(null);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAdminAuthenticated = useCallback(
    (user: AuthUser, latestPayment: PaymentRequestRecord | null) => {
      if (user.role !== 'admin') return;
      setAdminUser(user);
      saveCachedSession(user, latestPayment);
    },
    []
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      clearAuthToken();
    }
    setAdminUser(null);
  }, []);

  if (!adminUser || adminUser.role !== 'admin') {
    return <AdminAuthGateView onAdminAuthenticated={handleAdminAuthenticated} />;
  }

  return (
    <AdminDashboardView
      adminUser={adminUser}
      onLogout={handleLogout}
      onAdminUserUpdated={(updated) => setAdminUser(updated)}
    />
  );
}
