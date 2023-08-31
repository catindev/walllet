import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { errors } from "api";
import { useSign } from './SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";

const SignInPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, SignIn } = useAuth();

  const { phoneNumber, setPhoneNumber } = useSign();
  const [error, setError] = useState(null);
  const [systemError, setSystemError] = useState(null);

  // Забираем номер из контекста если он там есть
  useEffect(() => {
    if (phoneNumber) setLogin(phoneNumber);
  },[phoneNumber]);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setPhoneNumber(login);
    try {
      const response = await SignIn({ username: login, password });
      if (!response.token) setError(0);
    } catch (error) {
      setError(error.response?.data?.error_code || 0);
      if(error === 0) setSystemError(error.response?.data);
    }
  };

  return (
    <InnerPageLayout title="Войти в кошелек" backURL="/">
      <div className={formStyles.wrapper}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.header}>
            <h1>Представьтесь</h1>
            <h2>Введите логин и пароль</h2>
          </div>

          {error !== null && <Alert type="danger"
            title={errors[error].title}
            message={errors[error].message} 
            systemMessage={systemError} />}

          <div className={formStyles.group}>
            <label htmlFor="login">Логин</label>
            <input type="text"
              id="login"
              placeholder="Номер телефона"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div className={formStyles.group}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className={formStyles.footer}>
            <button type="submit">Войти</button>
          </div>

          <div className={formStyles.footer}>
            <div><span>Впервые здесь?</span> <Link to="/signup">Создайте новый кошелек</Link></div>
            {/* <div><span>Забыли пароль?</span> <Link to="/password/reset">Восстановите</Link></div> */}
          </div>       
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default SignInPage;