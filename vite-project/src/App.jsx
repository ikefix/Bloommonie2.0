import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import AppNavigation from "./navigation/AppNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ConnectionChecker from "./components/ConnectionChecker";
import { useAuthStore } from '../stores/authStore';

// Functional component wrapper to handle authentication initialization
const AppWithAuth = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize authentication state from localStorage on app startup
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

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
