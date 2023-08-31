import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useSign } from '../SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";
import { errors, registration } from "api";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated } = useAuth();
  const { step, setStep, regToken } = useSign();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Step from RegistrationPage", step);
    if (step === 1) navigate('/signup');
    if (step === 4) navigate('/signin');
  }, [step]);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleBack = event => {
    event.preventDefault();
    setName("");
    setPassword("");
    setStep(1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("name", name, "password", password);
    try {
      const response = await registration({ name, password, token: regToken });
      setPassword("");
      setStep(4);
    } catch (error) {
      console.log("error", error)
      setError(error.response?.data?.error_code || 0);
    }
  };

  return (
    <InnerPageLayout title="Создать кошелек" backFn={handleBack}>
      <div className={formStyles.wrapper}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.header}>
            <h1>Зарегистрируйтесь</h1>
            <h2>Последний шаг. Заполните данные о себе и пароль</h2>
          </div>

          {error !== null && <Alert
            title={errors[error].title}
            message={errors[error].message} type="danger" />}

          <div className={formStyles.group}>
            <label htmlFor="name">Ваше имя</label>
            <input
              type="text"
              id="name"
              placeholder="Ex: Ivan Petrov"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={formStyles.group}>
            <label htmlFor="name">Пароль</label>
            <input
              type="text"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={formStyles.footer}>
            <button type="submit">Проверить код</button>
          </div>
          <div className={formStyles.footer}>
            <div><span>У вас уже есть кошелек?</span> <Link to="/signin">Войдите</Link></div>
          </div>
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default RegistrationPage;