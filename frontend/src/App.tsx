import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AskQuestionPage from './pages/AskQuestionPage';

import AdminDashboard from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/toast.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div style={{ padding: '2rem' }}><h2>ברוך הבא!</h2></div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/ask" element={<ProtectedRoute><AskQuestionPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
