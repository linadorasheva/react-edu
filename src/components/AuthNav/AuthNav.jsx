import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import MyButton from '../UI/button/MyButton.jsx';


const AuthNav = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <ul className="auth-navigation">
      <li className="auth-navigation__item">
        <MyButton className="auth-navigation__link">Login</MyButton>
      </li>
      <li className="auth-navigation__item">
        <MyButton
          onClick={() => {
            signOut(() => navigate('/'));
          }}
          className="auth-navigation__link"
        >
          Logout
        </MyButton>
      </li>
    </ul>
  );
};

export default AuthNav;
