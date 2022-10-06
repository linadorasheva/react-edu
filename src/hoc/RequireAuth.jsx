import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth && !localStorage.getItem('auth')) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequireAuth;
