import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import MyButton from '../UI/button/MyButton.jsx';

const AuthNav = () => {
  const { isAuth, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-navigation">
      {isAuth ? (
        <MyButton
          onClick={() => {
            signOut(() => navigate('/'));
          }}
          className="auth-navigation__btn"
        >
          Logout
        </MyButton>
      ) : (
        <MyButton className="auth-navigation__btn auth-navigation__btn--green">
          Login
        </MyButton>
      )}
    </div>
  );
};

export default AuthNav;
