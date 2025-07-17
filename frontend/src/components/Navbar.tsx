import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/user/userSlice';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phone, role, token } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isLoggedIn = !!token;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">AI Learning</Link>

      {isLoggedIn && (
        <div className="nav-center">
          <Link to="/history">History</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/ask">Ask AI</Link>
         


{role === 'ADMIN' && (
  <>
    <Link to="/admin/profile">Admin</Link>
    <Link to="/admin">Dashboard</Link>
  </>
)}
        </div>
      )}

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span className="user-info">👤 {phone}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
