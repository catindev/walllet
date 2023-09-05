import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import menuStyles from "components/BottomSheetMenuList/bottomSheetMenuList.module.css";

const PaymentsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <InnerPageLayout title="Оплатить" backURL="/wallets">
      <div className={formStyles.wrapper}>
      <form className={formStyles.form}>
        <div className={formStyles.header}>
          <h1>Оплатить</h1>
          <h2>Оплачивайте услуги или покупки у наших партнеров по реквизитам счета</h2>
        </div>
        <ul className={menuStyles.menu}>
          <li>
            <Link to="/withdrawal/to/wallet">
              Платежи
            </Link>
          </li>
          <li>
            <Link to="/withdrawal/to/card">
              Оплата по номеру счёта
            </Link>
          </li>
        </ul>
      </form>
      </div>
    </InnerPageLayout>
  );
};

export default PaymentsPage;