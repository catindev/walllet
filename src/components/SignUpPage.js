import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import InnerPageLayout from "./InnerPageLayout/InnerPageLayout";

const SignUpPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ phone });
    } catch (e) {
      setError(e.error);
    }
  };

  return (
    <InnerPageLayout title="Создать кошелек" backURL="/">
      <div className="Form__wrapper">
        <form className="Form" onSubmit={handleSubmit}>
          <div className="Form__header">
            <h1>Зарегистрируйтесь</h1>
            <h2>Введите номер вашего телефона</h2>
            {error && <h2>{error}</h2>}
          </div>
          <div className="Form__group">
            <label htmlFor="login">Номер телефона</label>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="Form__footer">
            <button type="submit">Отправить SMS</button>
          </div>
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default SignUpPage;