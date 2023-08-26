import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import InnerPageLayout from "./InnerPageLayout/InnerPageLayout";

const SignInPage = () => {
  const { isAuthenticated, SignIn, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SignIn({ username, password });
    } catch (e) {
      setError(e.error);
    }
  };

  return (
    <InnerPageLayout title="Войти в кошелек" backURL="/">
      <div className="Form__wrapper">
        <form className="Form" onSubmit={handleSubmit}>
          <div className="Form__header">
            <h1>Представьтесь</h1>
            {error && <h2>{error}</h2>}
          </div>
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