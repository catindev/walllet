import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { errors } from "api";
import { useSign } from './SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";

const SignInPage = () => {
  const { isAuthenticated, SignIn } = useAuth();
  const { phone, setPhone, password, setPassword, step, resetSign } = useSign();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (step === 3) resetSign();
  });

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await SignIn({ username: phone, password });
      if (!response.token) setError(0);
    } catch (error) {
      setError(error.response?.data?.error_code || 0);
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

          {error !== null && <Alert
            title={errors[error].title}
            message={errors[error].message} type="danger" />}

          <div className={formStyles.group}>
            <label htmlFor="login">Логин</label>
            <input type="text"
              id="login"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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