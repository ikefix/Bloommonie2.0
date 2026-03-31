import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,

} from "react-icons/fa";

import { useAuthStore } from "../../../stores/authStore";
import logoImage from "../../assets/logo.png";
import "./login.css";
import bloommonieGooglePics from "../../assets/google-icon.png";

const Register = () => {
  const navigate = useNavigate();
  const { 
    register, 
    initiateGoogleAuth, 
    isLoading, 
    error, 
    setError,
    setRegistrationData,
    registrationData,
    isAuthenticated 
  } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAndConditionsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.termsAndConditionsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        termsAndConditionsAccepted: formData.termsAndConditionsAccepted
      });

      if (result.success) {
        // Registration successful, show success message
        alert(result.message || 'Registration successful! Please check your email for verification.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleGoogleRegister = () => {
    initiateGoogleAuth();
  };

  const handleLoginLink = () => {
    navigate('/login');
  };

  return (
    <div className="login-section">
      <div className="login-container">

        <img src={logoImage} alt="logo" className="logo" />

        <h2>Create Account</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div className="input-group">
            <FaUser className="icon" />
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* PHONE */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <FaLock className="icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Password" 
              value={formData.password}
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
              placeholder="Confirm Password" 
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

          {/* AGREEMENT */}
          <div className="options">
            <label>
              <input 
                type="checkbox" 
                name="termsAndConditionsAccepted"
                checked={formData.termsAndConditionsAccepted}
                onChange={handleChange}
              /> 
              <span> Agree to Policy and Privacy</span>
            </label>
          </div>

          {/* BUTTON */}
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* LOGIN LINK */}
          <p className="signup-text">
            Already have account? <Link to="/login">Sign In</Link>
          </p>

          {/* DIVIDER */}
          <div className="divider">
            <span>Or Sign up with</span>
          </div>

          {/* SOCIALS */}
          <div className="socials">
            <div className="social" onClick={handleGoogleRegister}>
              <img src={bloommonieGooglePics} alt="Google" />
              <span>Continue with Google</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;