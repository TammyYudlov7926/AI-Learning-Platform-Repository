import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAppDispatch } from '../hooks/redux';
import { loginSuccess } from '../features/user/userSlice';
import '../styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, role } = await authAPI.login(phone, password);

      dispatch(loginSuccess({ token, role, phone }));

      if (role === 'ADMIN') navigate('/admin');
      else navigate('/ask');
    } catch (err) {
      console.log(err);
      setError('User not found. Redirecting to Register...');
      setTimeout(() => navigate('/register'), 2000);
    }
  };

  return (
    <div className="auth-outer-wrapper">
      <div className="auth-container">
        <div className="auth-image"></div>
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <p>Don't have an account? <a href="/register">Sign up</a></p>

          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        

          <div className="password-wrapper">
   <input type={showPassword ? 'text' : 'password'} 
   placeholder="Password" value={password} 
   onChange={(e) => setPassword(e.target.value)} required /> 
   <span className="password-toggle-icon" onClick={() => setShowPassword((prev) => !prev)} >
     {showPassword ? '👁️' : '👁️'} </span>
      </div>
          <button type="submit">Start learning</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
