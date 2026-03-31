import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuthStore } from '../../../stores/authStore';
import logoImage from '../../assets/logo.png';
import './login.css';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Use the hook properly to get the store
  const { 
    isLoading, 
    error, 
    setError,
    isAuthenticated,
    setAuthState
  } = useAuthStore();

  const [callbackStatus, setCallbackStatus] = useState('loading');
  const [message, setMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && callbackStatus === 'loading') {
      setCallbackStatus('redirecting');
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    }
  }, [isAuthenticated, navigate, callbackStatus]);

  useEffect(() => {
    if (callbackStatus === 'redirecting') return;
    
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

    if (token && userId) {
      // Google OAuth success - backend redirected here with token and userId
      handleGoogleAuthSuccess(token, userId);
    } else if (code) {
      // Fallback: Check if there's a Google auth code
      handleGoogleCallback(code);
    } else {
      setCallbackStatus('error');
      setMessage('Invalid Google authentication callback');
    }
  }, [searchParams, callbackStatus]);

  const handleGoogleAuthSuccess = async (token, userId) => {
    try {
      // Use the proper store action to set authentication state
      setAuthState({
        token: token,
        isAuthenticated: true,
        user: {
          id: userId,
          // We'll fetch more user data later if needed
        }
      });
      
      // Persist to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id: userId }));
      
      setCallbackStatus('success');
      setMessage('Google authentication successful!');
      
      // Redirect to admin after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setCallbackStatus('error');
      setMessage('Failed to complete Google authentication');
      console.error('Google auth success error:', err);
    }
  };

  const handleGoogleCallback = async (code) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/google/callback?code=${code}`);
      const data = await response.json();
      
      if (data.token && data.user) {
        setAuthState({
          token: data.token,
          isAuthenticated: true,
          user: data.user
        });
        
        // Persist to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setCallbackStatus('success');
        setMessage('Google authentication successful!');
        
        // Redirect to admin after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setCallbackStatus('error');
        setMessage(data.message || 'Google authentication failed');
      }
    } catch (err) {
      setCallbackStatus('error');
      setMessage('Failed to process Google authentication');
      console.error('Google callback error:', err);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleRetry = () => {
    navigate('/login');
  };

  if (callbackStatus === 'loading') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Processing Google Authentication...</h2>
          <div className="verification-loading">
            <FaSpinner className="spinner" />
            <p>Completing your sign-in with Google...</p>
          </div>
        </div>
      </div>
    );
  }

  if (callbackStatus === 'success') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Authentication Successful!</h2>
          <div className="verification-success">
            <FaCheckCircle className="success-icon" />
            <p>{message}</p>
            <button
              className="login-btn"
              onClick={handleContinue}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (callbackStatus === 'error') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Authentication Failed</h2>
          <div className="verification-error">
            <FaTimesCircle className="error-icon" />
            <p>{message}</p>
            <div className="verification-actions">
              <button
                className="login-btn"
                onClick={handleRetry}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default GoogleCallback;
