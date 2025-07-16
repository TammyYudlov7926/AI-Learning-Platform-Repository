import React, { useState } from 'react';
import { loginUser } from '../../api/authService';
import Toast from '../common/Toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(phone, password);
      setToast({ message: 'התחברת בהצלחה!', type: 'success' });
      localStorage.setItem('token', data.token);
      setPhone(''); setPassword('');
       navigate('/user');

    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'אירעה שגיאה בהתחברות', type: 'error' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} required />
        <input type="password" placeholder="סיסמה" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">התחבר</button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default Login;
