import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/user/userSlice';
import { registerUser, loginUser } from '../api/authService';
import '../styles/auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. שליחת רישום לשרת
      await registerUser(name, phone, password);

      // 2. ניסיון להתחבר מיד אחרי רישום
      const { token, role } = await loginUser(phone, password);

      // 3. שמירה ב-Redux וב-localStorage
      dispatch(loginSuccess({ token, role, phone }));

      // 4. הפניה לפי רול
      if (role === 'ADMIN') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      console.error(err);
      setError('Registration failed or login failed');
    }
  };

  return (
    <div className="auth-outer-wrapper">
      <div className="auth-container">
        <div className="auth-image"></div>
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          <p>Already have an account? <a href="/login">Log in</a></p>

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          <button type="submit">Create account</button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
