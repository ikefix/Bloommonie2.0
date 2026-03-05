import React, { createContext, useState, useContext } from 'react';


// create and export context so other components can consume it
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // `user` holds basic profile info and the JWT access token returned by the server
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  // helper that persists to localStorage for us
  const persistUser = (u) => {
    setUser(u);
    if (u) {
      localStorage.setItem('user', JSON.stringify(u));
    } else {
      localStorage.removeItem('user');
    }
  };

  // call login endpoint, expect { user: {...}, token: '...' }
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data.message || 'Login failed' };
      }
      const u = { ...data.user, token: data.token };
      persistUser(u);
      return { ok: true, user: u };
    } catch (err) {
      console.error('login error', err);
      return { ok: false, message: 'Network error' };
    }
  };

  // register a new account
  const register = async (email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data.message || 'Registration failed' };
      }
      const u = { ...data.user, token: data.token };
      persistUser(u);
      return { ok: true, user: u };
    } catch (err) {
      console.error('register error', err);
      return { ok: false, message: 'Network error' };
    }
  };

  const logout = () => {
    persistUser(null);
  };

  // convenience helper for components that need a bearer token fetch
  const authFetch = (input, init = {}) => {
    const token = user?.token;
    const headers = init.headers ? { ...init.headers } : {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return fetch(input, { ...init, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user?.token,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
