import React from 'react';
import '../../styles/auth.css'; // אם אותו CSS משותף
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const UserProfile = () => {
  const { phone } = useSelector((state: RootState) => state.user);

  return (
    <div className="auth-outer-wrapper">
      <div className="auth-container">
        <div className="auth-image"></div>

        <div className="admin-profile-content">
          <h2>Welcome Back 👋</h2>
          <p><strong>Phone:</strong> {phone}</p>
          <p className="admin-quote">"Keep asking, keep learning, keep growing."</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
