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
  const [fetchingWallets, setFetchingWallets] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const { user, wallets, setWallets } = useUser();
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("WalletsPage", user)
    if (token && user && user.id) {
      if (wallets.length === 0) {
        console.log("Wallets: fetch wallets for", user.agent?.full_name);
        fetchWallets();
      } else {
        console.log("Wallets:", wallets.length ," wallets for", user.agent?.full_name);
      }
    }
  }, [token, user]);

  const fetchWallets = async () => {
    setFetchingWallets(true);
    try {
      const walletsData = await getWallets(token);
      setWallets(walletsData);
    } catch (error) {
      setError(error.response?.data?.error_code);
    }
    setFetchingWallets(false);
  };

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

          <Wallets list={wallets} />
        </div>
        <ControlPanel userStatus={user?.agent?.status} />
      </div>
    </InnerPageLayout>
  );
};

export default WalletsPage;