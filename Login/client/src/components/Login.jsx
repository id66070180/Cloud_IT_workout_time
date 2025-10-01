// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">IT Workout Time</h2>
        <p className="login-subtitle">Login</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* ยังไม่ได้ทำ remember */}
          {/* <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div> */}
          {error && <div className="error">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <p>
            Don’t have an account? <a href="/register">Sign up now</a>
          </p>
          <p><a href="/forgot-password">Forgot password</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
