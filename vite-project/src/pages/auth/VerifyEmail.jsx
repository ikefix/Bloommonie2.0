import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { useAuthStore } from '../../../stores/authStore';
import logoImage from '../../assets/logo.png';
import './login.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { 
    verifyEmail, 
    isLoading, 
    error, 
    setError,
    isAuthenticated 
  } = useAuthStore();
  
  const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link. Please check your email and try again.');
      return;
    }

    const performVerification = async () => {
      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setVerificationStatus('success');
          setMessage(result.message || 'Email verified successfully! You can now log in.');
        } else {
          setVerificationStatus('error');
          setMessage(result.error || 'Email verification failed. Please try again.');
        }
      } catch (err) {
        setVerificationStatus('error');
        setMessage('An error occurred during verification. Please try again.');
        console.error('Email verification error:', err);
      }
    };

    performVerification();
  }, [searchParams, verifyEmail]);

  const handleContinue = () => {
    if (verificationStatus === 'success') {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  const handleResend = () => {
    navigate('/register');
  };

  return (
    <div className="login-section">
      <div className="login-container">
        
        <img src={logoImage} alt="logo" className="logo" />

        <h2>Email Verification</h2>

        {verificationStatus === 'loading' && (
          <div className="verification-loading">
            <FaSpinner className="spinner" />
            <p>Verifying your email address...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="verification-success">
            <FaCheckCircle className="success-icon" />
            <h3>Email Verified Successfully!</h3>
            <p>{message}</p>
            <button 
              className="login-btn" 
              onClick={handleContinue}
            >
              Continue to Login
            </button>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="verification-error">
            <FaTimesCircle className="error-icon" />
            <h3>Verification Failed</h3>
            <p>{message}</p>
            <div className="verification-actions">
              <button 
                className="login-btn" 
                onClick={handleResend}
              >
                Request New Verification
              </button>
              <button 
                className="secondary-btn" 
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
