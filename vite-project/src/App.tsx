import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import AppNavigation from "./navigation/AppNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ConnectionChecker from "./components/ConnectionChecker";
import SkeletonLoader from "./components/SkeletonLoader";
import { useAuthStore } from '../stores/authStore';
import './components/AuthLoadingScreen.css';


// Functional component wrapper to handle authentication initialization
const AppWithAuth: React.FC = () => {
  const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
  const isInitializing = useAuthStore((state: any) => state.isInitializing);
  const [showMinLoading, setShowMinLoading] = React.useState<boolean>(true);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean>(true);

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

  // Detect if this is first launch (not a reload)
  React.useEffect(() => {
    // Check if we're coming from a direct app launch (not navigation within app)
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const entry = navigationEntries[0] as PerformanceNavigationTiming;
      // If it's a reload or navigation, mark as not first launch
      if (entry.type === 'reload' || entry.type === 'back_forward') {
        setIsFirstLaunch(false);
      }
    }
  }, []);

  // Show loading screen during authentication initialization (minimum 3 seconds)
  // Only show if not first launch (splash screen handles first time)
  if ((isInitializing || showMinLoading) && !isFirstLaunch) {
    return <SkeletonLoader />;
  }

  return <AppComponent />;
};
class AppComponent extends Component<{}, { hasError: boolean; error: any; errorInfo: any }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ errorInfo });
  }

  handleRetry() {
    this.setState({ hasError: false, error: null, errorInfo: null });
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
    return <AppNavigation />;
  }
}

// Export as App to maintain the same name
export default AppWithAuth;
