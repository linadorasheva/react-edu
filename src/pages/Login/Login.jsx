import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MyButton from '../../components/UI/button/MyButton.jsx';
import MyInput from '../../components/UI/input/MyInput.jsx';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const handlerSubmit = (evt) => {
    evt.preventDefault();

    signIn(true, () => navigate(fromPage, { replace: true }));
  };

  return (
    <div className="login-page page">
      <div className="container">
        <h1 className="login-page__title page__title">Login Page</h1>
        <form className="login-page__form" onSubmit={handlerSubmit}>
          <MyInput type="text" name="username" placeholder="login" />
          <MyInput type="password" name="password" placeholder="password" />
          <MyButton className="login-page__btn" type="submit">
            Login
          </MyButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
