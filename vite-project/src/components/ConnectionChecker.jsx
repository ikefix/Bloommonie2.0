import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaSync, FaCheckCircle } from 'react-icons/fa';
import logoImage from '../assets/logo.png';
import './ErrorBoundary.css';

const ConnectionChecker = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState('checking'); // checking, connected, error
  const [error, setError] = useState(null);

  useEffect(() => {
    checkBackendConnection();
  }, []); // Empty dependency array - only run once

  const checkBackendConnection = async () => {
    try {
      // Simple connection check - try to reach the backend server
      // We'll use a health check approach by trying to connect to the base URL
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Any response (even 404) means the server is running
      setConnectionStatus('connected');
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Connection check failed:', err);
      setError(err);
      setConnectionStatus('error');
    }
  };

  const handleClearCacheAndBack = () => {
    // Clear all localStorage data
    localStorage.clear();
    sessionStorage.clear();
    
    // Go back to login page
    window.location.href = '/login';
  };

  const handleRetry = () => {
    setConnectionStatus('checking');
    setError(null);
    checkBackendConnection();
  };

  const handleContinueAnyway = () => {
    // Allow user to continue even with connection issues
    setConnectionStatus('connected');
  };

  if (connectionStatus === 'checking') {
    return (
      <div className="error-boundary-section">
        <div className="error-boundary-container">
          <img src={logoImage} alt="logo" className="error-boundary-logo" />
          <h2 className="error-boundary-title">Checking Connection...</h2>
          <div className="connection-status">
            <div className="status-indicator" style={{ background: '#ffc107' }}></div>
            <span>Checking backend connection...</span>
          </div>
        </div>
      </div>
    );
  }

  if (connectionStatus === 'error') {
    const isConnectionError = error?.message?.includes('ERR_CONNECTION_REFUSED') ||
                             error?.message?.includes('ERR_SOCKET_NOT_CONNECTED') ||
                             error?.message?.includes('Failed to load URL') ||
                             error?.message?.includes('Network Error') ||
                             error?.name?.includes('TypeError') ||
                             error?.message?.includes('ERR_TIMED_OUT');

    const isNgrokError = error?.message?.includes('ngrok') ||
                        error?.message?.includes('arcelia-unthievish-duplicitously');

    return (
      <div className="error-boundary-section">
        <div className="error-boundary-container">
          <img src={logoImage} alt="logo" className="error-boundary-logo" />
          <h2 className="error-boundary-title">Connection Error</h2>
          
          {isNgrokError ? (
            <div className="verification-error">
              <FaExclamationTriangle className="error-icon" />
              <div className="error-content">
                <h3>Stale Configuration Detected</h3>
                <p>
                  The application is trying to connect to an old ngrok URL: <strong>arcelia-unthievish-duplicitously.ngrok-free.dev</strong>
                </p>
                <p>
                  This usually happens when there are cached OAuth redirects or stale configuration files.
                </p>
                <div className="error-solutions">
                  <h4>Solutions:</h4>
                  <ol>
                    <li>Clear browser cache and localStorage</li>
                    <li>Check for any stale ngrok URLs in configuration files</li>
                    <li>Restart the application after clearing cache</li>
                    <li>Ensure Google OAuth is configured for localhost:5000</li>
                    <li>Clear any browser cookies for the application</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : isConnectionError ? (
            <div className="verification-error">
              <FaExclamationTriangle className="error-icon" />
              <div className="error-content">
                <h3>Backend Server Not Running</h3>
                <p>
                  Unable to connect to the backend server at <strong>localhost:5000</strong>.
                  This is required for authentication and Google OAuth to work properly.
                </p>
                <div className="error-solutions">
                  <h4>Solutions:</h4>
                  <ol>
                    <li>Start the backend server: <code>cd bloommoniebackend2.0 && npm start</code></li>
                    <li>Check if port 5000 is available</li>
                    <li>Verify backend is running on correct port</li>
                    <li>Check firewall/antivirus settings</li>
                    <li>Make sure MongoDB is running (required for backend)</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <div className="verification-error">
              <FaExclamationTriangle className="error-icon" />
              <div className="error-content">
                <h3>Network Error</h3>
                <p>
                  {error?.message || 'A network error occurred while connecting to the server.'}
                </p>
                <div className="error-solutions">
                  <h4>Solutions:</h4>
                  <ol>
                    <li>Check your internet connection</li>
                    <li>Try refreshing the page</li>
                    <li>Check if backend server is running</li>
                    <li>Restart the application</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {isNgrokError && (
            <div className="error-actions">
              <button className="error-btn error-btn-primary" onClick={handleClearCacheAndBack}>
                <FaSync className="button-icon" />
                Clear Cache & Go Back
              </button>
              <button className="error-btn error-btn-secondary" onClick={handleRetry}>
                Retry Connection
              </button>
            </div>
          )}

          {!isNgrokError && (
            <div className="error-actions">
              <button className="error-btn error-btn-primary" onClick={handleRetry}>
                <FaSync className="button-icon" />
                Retry Connection
              </button>
              <button className="error-btn error-btn-secondary" onClick={handleContinueAnyway}>
                Continue Anyway
              </button>
            </div>
          )}

          <div className="connection-status">
            <div className="status-indicator offline"></div>
            <span>Backend Offline</span>
          </div>
        </div>
      </div>
    );
  }

  if (connectionStatus === 'connected') {
    return (
      <>
        <div className="connection-indicator-top-right" style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: '#28a745',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '15px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          zIndex: 9999,
        }}>
          <FaCheckCircle size={12} />
          Backend Connected
        </div>
        {children}
      </>
    );
  }

  return children;
};

export default ConnectionChecker;
