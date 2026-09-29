import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAccessToken, getAccessToken } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      if (getAccessToken()) {
        try {
          const { user } = await api.me();
          setUser(user);
        } catch {
          setAccessToken(null);
        }
      }
      setLoading(false);
    }
    restore();
  }, []);

  async function login(email, password) {
    const { user, accessToken } = await api.login({ email, password });
    setAccessToken(accessToken);
    setUser(user);
    return user;
  }
  async function signup(name, email, password) {
    const { user, accessToken } = await api.signup({ name, email, password });
    setAccessToken(accessToken);
    setUser(user);
    return user;
  }
  async function logout() {
    await api.logout().catch(() => {});
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
