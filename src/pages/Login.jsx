import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MyButton from '../components/UI/button/MyButton.jsx';
import MyInput from '../components/UI/input/MyInput.jsx';
import { useAuth } from '../hooks/useAuth';

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
    <div style={{ width: '400px', margin: '0 auto' }}>
      <h1>Login Page</h1>
      <form className="form-login" onSubmit={handlerSubmit}>
        <MyInput type="text" name="username" placeholder="login" />
        <MyInput type="password" name="password" placeholder="password" />
        <MyButton className="form-login__btn" type="submit">
          Login
        </MyButton>
      </form>
    </div>
  );
};

export default Login;
