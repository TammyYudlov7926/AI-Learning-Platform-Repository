import React, { useState } from 'react';
import { registerUser } from '../../api/authService';
import Toast from '../common/Toast';

const Register = () => { 
const [name, setName] = useState(''); 
const [phone, setPhone] = useState(''); 
const [password, setPassword] = useState(''); 
const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null); 

const handleSubmit = async (e: React.FormEvent) => { 
e.preventDefault(); 
try { 
await registerUser(name, phone, password); 
setToast({ message: 'You have successfully registered!', type: 'success' }); 
setName(''); setPhone(''); setPassword(''); 
} catch (error: any) { 
setToast({ message: error.response?.data?.message || 'An error occurred during registration', type: 'error' }); 
} 
}; 

return ( 
<> 
<form onSubmit={handleSubmit}> 
<input placeholder="name" value={name} onChange={e => setName(e.target.value)} required /> 
<input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required /> 
<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /> 
<button type="submit">Subscribe</button> 
</form> 
{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />} 
</> 
);
};

export default Register;