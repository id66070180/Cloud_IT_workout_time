import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // เพิ่มไฟล์ CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError('กรุณากรอกอีเมลให้ถูกต้อง');
      setLoading(false);
      return;
    }
    if (phone && !validatePhone(phone)) {
      setError('กรุณากรอกเบอร์โทรให้ถูกต้อง');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email,
        phone,
      });
      alert('User registered successfully');
      navigate('/login');
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">IT Workout Time</h2>
        <p className="register-subtitle">Sign up Account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'กำลังสมัคร...' : 'sign up'}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Enter here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
