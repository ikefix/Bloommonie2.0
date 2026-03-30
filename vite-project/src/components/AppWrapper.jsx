import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import App from './App';

const AppWrapper = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize authentication state from localStorage on app startup
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <App />;
};

export default AppWrapper;
