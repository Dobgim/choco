import { createContext, useContext, useMemo, useState } from 'react';

// Front-end-only credentials for the demo admin area. For real
// production security, replace with a proper backend auth service.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'VelvetAdmin@2026';
const SESSION_KEY = 'vc-admin-session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => localStorage.getItem(SESSION_KEY) === 'yes');

  const value = useMemo(
    () => ({
      authed,
      login: (username, password) => {
        const ok = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
        if (ok) {
          localStorage.setItem(SESSION_KEY, 'yes');
          setAuthed(true);
        }
        return ok;
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      },
    }),
    [authed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
