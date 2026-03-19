import React from 'react';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,

} from "react-icons/fa";

import logoImage from "../../assets/logo.png";
import "./login.css";
import bloommonieGooglePics from "../../assets/google-icon.png";



const Register = () => {
  return (
    <div className="login-section">
      <div className="login-container">

        <img src={logoImage} alt="logo" className="logo" />

        <h2>Create Account</h2>

        <form>
          {/* FULL NAME */}
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Full Name" />
          </div>

          {/* EMAIL / PHONE */}
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

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="Confirm Password" />
            <FaEyeSlash className="eye-icon" />
          </div>

          {/* AGREEMENT */}
          <div className="options">
            <label>
              <input type="checkbox" />
              <span> Agree to Policy and Privacy</span>
            </label>
          </div>

          {/* BUTTON */}
          <button type="submit" className="login-btn">
            Sign Up
          </button>

          {/* LOGIN LINK */}
          <p className="signup-text">
            Already have account? <span>Sign In</span>
          </p>

          {/* DIVIDER */}
          <div className="divider">
            <span>Or Sign up with</span>
          </div>

          {/* SOCIALS */}
          <div className="socials">
            <div className="social">
              <img src={bloommonieGooglePics} alt="Google" />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;