import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/user/userSlice';
import '../styles/Navbar.css';
import { useLocation } from 'react-router-dom';



const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';
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
          <Link to="/ask">Ask AI</Link>



          {role === 'ADMIN' && (
            <>
              <Link to="/admin/profile">Profile</Link>
              <Link to="/admin">Dashboard</Link>
            </>
          )}
          {role !== 'ADMIN' && (
            <Link to="/user/profile">Profile</Link>
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
          !isHome && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
