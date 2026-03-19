import "./login.css";
import { FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-section">
      <div className="login-container">

        <img src="/logo.png" alt="logo" className="logo" />

        <h2>Login</h2>

        <form>
          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="text" placeholder="Phone or Email" />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" />
            <FaEyeSlash className="eye-icon" />
          </div>

          {/* OPTIONS */}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup-text">
            Don’t have an account? <span>Sign Up</span>
          </p>

          {/* DIVIDER */}
          <div className="divider">
            <span>Or Sign in with</span>
          </div>

          {/* SOCIAL */}
          <div className="socials">
            <div className="social">
              <FaGoogle />
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;