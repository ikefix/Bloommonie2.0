import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // reuse same styles
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(email, password);
    if (res.ok) {
      navigate('/admin');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className='general-container'>
      <div className="login-card">
        <div className="login-form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Register</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="login-image">
          {/* reuse the same image */}
        </div>
      </div>
    </div>
  );
};

export default Register;
