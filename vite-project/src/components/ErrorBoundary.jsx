import React from 'react';
import { FaExclamationTriangle, FaSync } from 'react-icons/fa';
import logoImage from '../assets/logo.png';
import './ErrorBoundary.css';

const ErrorBoundary = ({ error, errorInfo, onRetry }) => {
  const isConnectionError =
    error?.message?.includes('ERR_CONNECTION_REFUSED') ||
    error?.message?.includes('ERR_SOCKET_NOT_CONNECTED') ||
    error?.message?.includes('Failed to load URL');

  const isNetworkError =
    error?.message?.includes('Network Error') ||
    error?.message?.includes('fetch');

  return (
    <div className="error-boundary-section">
      <div className="error-boundary-container">
        <img src={logoImage} alt="logo" className="error-boundary-logo" />
        <h2 className="error-boundary-title">Connection Error</h2>

        {isConnectionError && (
          <div className="verification-error">
            <FaExclamationTriangle className="error-icon" />
            <div className="error-content">
              <h3>Backend Server Not Running</h3>
              <p>
                Unable to connect to the backend server at <strong>localhost:5000</strong>.
              </p>
              <div className="error-solutions">
                <h4>Solutions:</h4>
                <ol>
                  <li>Start the backend server: <code>cd bloommoniebackend2.0 && npm start</code></li>
                  <li>Check if port 5000 is available</li>
                  <li>Verify backend is running on correct port</li>
                  <li>Check firewall/antivirus settings</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {isNetworkError && (
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
                </ol>
              </div>
            </div>
          </div>
        )}

        {!isConnectionError && !isNetworkError && (
          <div className="verification-error">
            <FaExclamationTriangle className="error-icon" />
            <div className="error-content">
              <h3>Application Error</h3>
              <p>
                {error?.message || 'An unexpected error occurred.'}
              </p>
              {errorInfo && (
                <details className="error-details">
                  <summary>Error Details</summary>
                  <pre>{errorInfo.componentStack}</pre>
                </details>
              )}
            </div>
          </div>
        )}

        <div className="error-actions">
          <button className="error-btn error-btn-primary" onClick={onRetry}>
            <FaSync className="button-icon" />
            Retry Connection
          </button>

          <button
            className="error-btn error-btn-secondary"
            onClick={() => (window.location.href = '/')}
          >
            Back to Home
          </button>
        </div>

        {isConnectionError && (
          <div className="connection-status">
            <div className="status-indicator offline"></div>
            <span>Backend Offline</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;