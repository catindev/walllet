import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { getWallets } from '../../api';
import InnerPageLayout from "../InnerPageLayout/InnerPageLayout";
import Wallets from "./Wallets";

import styles from "./wallets.module.css";

const WalletsPage = () => {
  const [fetchingWallets, setFetchingWallets] = useState(false);
  const [wallets, setWallets] = useState([]);
  const { isAuthenticated, user, SignOut, token } = useAuth();

  useEffect(() => {
    if (token && user.id) {
      console.log("Wallets: fetch wallets for", user.agent.full_name);
      fetchWallets();
    }
  }, [token, user]);

  const fetchWallets = async () => {
    setFetchingWallets(true);
    try {
      const walletsData = await getWallets(token);
      setWallets(walletsData);
    } catch (error) {
      console.error(error);
    }
    setFetchingWallets(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <InnerPageLayout type="home" user={user.agent?.full_name} showPreloader={fetchingWallets}>
      <div className={styles.wallets}>
        <Wallets list={wallets}/>
      </div>
    </InnerPageLayout>
  );
};

export default WalletsPage;