import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  const signIn = (isAuth, cb) => {
    setIsAuth(isAuth);
    localStorage.setItem('auth', 'true');
    cb();
  };

  const signOut = (cb) => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    cb();
  };

  const value = { isAuth, setIsAuth, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
