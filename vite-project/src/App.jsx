import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import AppNavigation from "./navigation/AppNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ConnectionChecker from "./components/ConnectionChecker";
import { useAuthStore } from '../stores/authStore';
import './components/AuthLoadingScreen.css';

// Functional component wrapper to handle authentication initialization
const AppWithAuth = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const [showMinLoading, setShowMinLoading] = React.useState(true);

  // Initialize authentication state from localStorage on app startup
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Ensure minimum 3-second loading screen
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowMinLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen during authentication initialization (minimum 3 seconds)
  if (isInitializing || showMinLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="loading-content">
          <div className="loader"></div>
          <p>Initializing application...</p>
          {isInitializing && <p style={{ fontSize: '0.875rem', color: '#666' }}>Fetching latest user data...</p>}
        </div>
      </div>
    );
  }

  return <AppComponent />;
};

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundary 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />
      );
    }

    return (
        <AppNavigation />
    );
  }
}

// Export as App to maintain the same name
export default AppWithAuth;
