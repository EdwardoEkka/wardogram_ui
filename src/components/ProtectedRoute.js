import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Startup from './Startup';

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading) {
    return <div><Startup/></div>;
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
