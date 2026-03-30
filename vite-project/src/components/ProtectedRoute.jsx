import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}
