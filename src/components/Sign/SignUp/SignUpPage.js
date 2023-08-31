import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useSign } from '../SignContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";
import { errors, Verify } from "api";

const SignUpPage = () => {
  const [phone, setPhone] = useState();
  const { isAuthenticated } = useAuth();
  const { step, setStep, phoneNumber, setPhoneNumber } = useSign();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (phoneNumber) setPhone(phoneNumber);
    if (step === 2) navigate('/signup/code');
  }, [step, phoneNumber]);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPhoneNumber(phone);
    try {
      const response = await Verify({ phone });
      console.log("response", response)
      setStep(2);
    } catch (error) {
      console.log("error", error)
      setError(error.response?.data?.error_code || 0);
    }
  };

  return (
    <InnerPageLayout title="Создать кошелек" backURL="/">
      <div className={formStyles.wrapper}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.header}>
            <h1>Зарегистрируйтесь</h1>
            <h2>Введите номер вашего телефона</h2>
          </div>

          {error !== null && <Alert
            title={errors[error].title}
            message={errors[error].message} type="danger" />}

          <div className={formStyles.group}>
            <label htmlFor="login">Телефон</label>
            <input
              type="text"
              placeholder="Без +7. Только цифры"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={formStyles.footer}>
            <button type="submit">Отправить SMS</button>
          </div>
          <div className={formStyles.footer}>
            <div><span>У вас уже есть кошелек?</span> <Link to="/signin">Войдите</Link></div>
          </div>
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default SignUpPage;