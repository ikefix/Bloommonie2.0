import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuthStore } from '../../../stores/authStore';
import logoImage from '../../assets/logo.png';
import './login.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { 
    resetPassword, 
    isLoading, 
    error, 
    setError,
    isAuthenticated 
  } = useAuthStore();
  
  const [resetStatus, setResetStatus] = useState('loading'); // loading, success, error, ready
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get('token');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!token) {
      setResetStatus('error');
      setMessage('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    setResetStatus('ready');
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await resetPassword(token, formData.newPassword);
      if (result.success) {
        setResetStatus('success');
        setMessage(result.message || 'Password reset successful! You can now log in with your new password.');
      } else {
        setResetStatus('error');
        setMessage(result.error || 'Password reset failed. Please try again.');
      }
    } catch (err) {
      setResetStatus('error');
      setMessage('An error occurred during password reset. Please try again.');
      console.error('Reset password error:', err);
    }
  };

  const handleContinue = () => {
    navigate('/login');
  };

  const handleRequestNew = () => {
    navigate('/forgot-password');
  };

  if (resetStatus === 'loading') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Loading...</h2>
          <div className="verification-loading">
            <FaLock className="spinner" />
            <p>Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (resetStatus === 'success') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Password Reset Successful!</h2>
          <div className="verification-success">
            <FaCheckCircle className="success-icon" />
            <p>{message}</p>
            <button 
              className="login-btn" 
              onClick={handleContinue}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (resetStatus === 'error') {
    return (
      <div className="login-section">
        <div className="login-container">
          <img src={logoImage} alt="logo" className="logo" />
          <h2>Reset Failed</h2>
          <div className="verification-error">
            <FaTimesCircle className="error-icon" />
            <p>{message}</p>
            <div className="verification-actions">
              <button 
                className="login-btn" 
                onClick={handleRequestNew}
              >
                Request New Reset Link
              </button>
              <button 
                className="secondary-btn" 
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-section">
      <div className="login-container">
        
        <img src={logoImage} alt="logo" className="logo" />

        <h2>Reset Password</h2>
        <p className="forgot-description">
          Enter your new password below. Make sure it's at least 6 characters long.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* NEW PASSWORD */}
          <div className="input-group">
            <FaLock className="icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="newPassword"
              placeholder="New Password" 
              value={formData.newPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <FaEyeSlash 
              className="eye-icon" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <FaLock className="icon" />
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              placeholder="Confirm New Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <FaEyeSlash 
              className="eye-icon" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* BUTTON */}
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>

          {/* LOGIN LINK */}
          <p className="signup-text">
            Remember your password? <a href="#" onClick={() => navigate('/login')}>Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
