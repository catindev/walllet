import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useSign } from '../SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";
import { errors, fakeSignIn } from "api";

const Registration = () => {
  const { isAuthenticated } = useAuth();
  const { step, setStep, name, setName, password, setPassword } = useSign();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(step);
    if (step === 1) navigate('/signup');
    if (step === 4) navigate('/signin');
  }, [step]);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleBack = event => {
    event.preventDefault();
    setStep(2);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("name", name, "password", password);
    if(name === "Wow") {
        setPassword("")
        setStep(4);
    }

    // try {
    //   const response = await fakeSignIn({});
    //   console.log("response", response)
    //   if (!response.token) setError(0);
    // } catch (error) {
    //   console.log("error", error)
    //   setError(error.response?.data?.error_code || 0);
    // }
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
          </form>
        </div>
      </InnerPageLayout>
  );
};

export default Registration;