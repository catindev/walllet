import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { errors } from "../api";
import InnerPageLayout from "./InnerPageLayout/InnerPageLayout";
import Alert from "./Alert/Alert";

const SignInPage = () => {
  const { isAuthenticated, SignIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await SignIn({ username, password });
      if (!response.token) setError(0);
    } catch (error) {
      setError(error.response?.data?.error_code);
    }
  };

  return (
    <InnerPageLayout title="Войти в кошелек" backURL="/">
      <div className="Form__wrapper">
        <form className="Form" onSubmit={handleSubmit}>
          <div className="Form__header">
            <h1>Представьтесь</h1>
          </div>
          {error && <Alert title={errors[error].title} message={errors[error].message} type="danger"/>}
          <div className="Form__group">
            <label htmlFor="login">Логин</label>
            <input type="text" 
              id="login"
              placeholder="Номер телефона или эл. почта" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="Form__group">
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div className="Form__footer">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default SignInPage;