import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && role !== 'ADMIN') {
    return <Navigate to="/ask" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
