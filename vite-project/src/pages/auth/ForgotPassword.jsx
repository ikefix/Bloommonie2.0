import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAuthStore } from '../../../stores/authStore';
import logoImage from '../../assets/logo.png';
import './login.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { 
    forgotPassword, 
    isLoading, 
    error, 
    setError,
    passwordResetData,
    isAuthenticated 
  } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        // Show success message
        alert(result.message || 'Password reset link has been sent to your email.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-section">
      <div className="login-container">
        
        {/* Back Button */}
        <div className="back-button" onClick={handleBackToLogin}>
          <FaArrowLeft /> Back to Login
        </div>

        <img src={logoImage} alt="logo" className="logo" />

        <h2>Forgot Password</h2>
        <p className="forgot-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {passwordResetData.isResetLinkSent && (
          <div className="success-message">
            Password reset link has been sent to your email. Please check your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* BUTTON */}
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {/* LOGIN LINK */}
          <p className="signup-text">
            Remember your password? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
