import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useUser } from 'UserContext';
import { errors, getWallets } from 'api';
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import Wallets from "./Wallets";
import ControlPanel from "./ControlPanel/ControlPanel";
import Alert from "components/Alert/Alert";

import styles from "./wallets.module.css";

const WalletsPage = () => {
  const { isAuthenticated, token } = useAuth();
  const { user, wallets, fetchingWallets } = useUser();
  const [error, setError] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <InnerPageLayout type="home" user={user?.agent?.full_name} showPreloader={(!user || fetchingWallets)}>
      <div className={[styles.container, "full-height"].join(" ")}>
        <div className={styles.wallets}>

          {error && <Alert
            type="danger"
            title={errors[error].title}
            message={errors[error].message} />}

          {wallets.length === 0 && <Alert
            type="danger"
            title="Кошельки не найдены"
            message="Сделайте скриншот и отправьте в нашу тех. поддержку" />}

          <Wallets list={wallets} />
        </div>
        <ControlPanel userStatus={user?.agent?.status} />
      </div>
    </InnerPageLayout>
  );
};

export default WalletsPage;