import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
