import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
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
<h1 className="logo">📚 Learning Platform</h1>
<ul className="nav-links">
<li><Link to="/">Home</Link></li>

        {!isLoggedIn && (
          <>
            <li><Link to="/register">Register</Link></li>
            
            <li><Link to="/login">Login</Link></li>
          </>
        )}
          {isLoggedIn && (
          <>
          
          <li><Link to="/ask">Ask AI</Link></li>
            {role === 'ADMIN' && (
              <li><Link to="/admin">Admin Dashboard</Link></li>
           
            )}
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            <li className="user-info">👤 {phone}</li>
          </>
        )}
      </ul>
    </nav>
  );
}


export default Navbar;

