import React from 'react';
import '../../styles/auth.css'; // אם אותו CSS משותף

const AdminProfile = () => {
  const adminName = 'Tammy';
  const phone = '058-328-7926';

  return (
    <div className="auth-outer-wrapper">
      <div className="auth-container">
        <div className="auth-image"></div>
        

        <div className="admin-profile-content">
          <h2>Welcome Admin 🎉</h2>
          <p><strong>Name:</strong> {adminName}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p className="admin-quote">"You’re the brain behind the system. Let’s manage it with greatness!"</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
