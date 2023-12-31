import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import menuStyles from "components/BottomSheetMenuList/bottomSheetMenuList.module.css";

const WithdrawalPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <InnerPageLayout title="Перевести" backURL="/wallets">
      <div className={formStyles.wrapper}>
      <form className={formStyles.form}>
        <div className={formStyles.header}>
          <h1>Куда хотите отправить перевод?</h1>
        </div>
        <ul className={menuStyles.menu}>
          <li>
            <Link to="/withdrawal/to/wallet">
              На другой кошелёк
            </Link>
          </li>
          <li>
            <Link to="/withdrawal/to/card">
              На карту банка
            </Link>
          </li>
        </ul>
      </form>
      </div>
    </InnerPageLayout>
  );
};

export default WithdrawalPage;