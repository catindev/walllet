import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useSign } from '../SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";
import { errors, CheckCode } from "api";

const CheckCodePage = () => {
  const { isAuthenticated } = useAuth();
  const { step, setStep, smsCode, setSmsCode, phone, setRegToken } = useSign();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(step);
    if (step === 1) navigate('/signup');
    if (step === 3) navigate('/signup/finish');
  }, [step]);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleBack = event => {
    event.preventDefault();
    setStep(1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("code", smsCode, "phone", phone);
    // if(smsCode === "010") setStep(3);
    try {
      const response = await CheckCode({ phone, smsCode });
      console.log("response", response)
      if (!response.token) setError(0)
      else {
        setRegToken(response.token);
        setStep(3);
      }
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
              <h2>Подтвердите номер телефона кодом из SMS</h2>
            </div>

            {error !== null && <Alert
              title={errors[error].title}
              message={errors[error].message} type="danger" />}

            <div className={formStyles.group}>
              <label htmlFor="login">Код из SMS</label>
              <input
                type="text"
                placeholder="159753"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
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

export default CheckCodePage;