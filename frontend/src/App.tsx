import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AskQuestionPage from './pages/AskQuestionPage';
import AdminProfile from './components/Admin/AdminProfile';

import Footer from './components/Footer';

import AdminDashboard from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HistoryPage from './pages/HistoryPage';
import './styles/toast.css';
import UserProfile from './components/auth/UserProfile';
import Hero from './components/Hero';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/user/profile" element={<UserProfile />} />

        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ask" element={<ProtectedRoute><AskQuestionPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute adminOnly><AdminProfile /></ProtectedRoute>} />

        <Route path="/history" element={<HistoryPage />} />

      </Routes>
              <Footer />

    </BrowserRouter>
  );
}


export default App;
