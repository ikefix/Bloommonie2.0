import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../../assets/login-image.jpg';
import './login.css';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.ok) {
      navigate('/admin');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className='general-container'>
      <div className="login-card">
        <div className="login-form">
          <h2>Login</h2>
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
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p> */}
          <div>
            login with google
          </div>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;