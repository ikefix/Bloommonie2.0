import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../../stores/authStore";
import bloommonieGoogleImage from "../../assets/google-pics.png";
import logoImage from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { 
    login, 
    initiateGoogleAuth, 
    isLoading, 
    error, 
    setError,
    isAuthenticated 
  } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
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
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = () => {
    initiateGoogleAuth();
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-section">
      <div className="login-container">

        <img src={logoImage} alt="logo" className="logo" />

        <h2>Login</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              type="text" 
              name="email"
              placeholder="Phone or Email" 
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
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
            />
            <FaEyeSlash 
              className="eye-icon" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* OPTIONS */}
          <div className="options">
            <label>
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              /> Remember me
            </label>
            <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

          {/* DIVIDER */}
          <div className="divider">
            <span>Or Sign in with</span>
          </div>

          {/* SOCIAL */}
          <div className="socials">
            <div className="social" onClick={handleGoogleLogin}>
              <img src={bloommonieGoogleImage} alt="Google" />
              <span>Continue with Google</span>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;