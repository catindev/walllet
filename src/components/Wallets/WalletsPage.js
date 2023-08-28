import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { errors, getWallets } from '../../api';
import InnerPageLayout from "../InnerPageLayout/InnerPageLayout";
import Wallets from "./Wallets";
import ControlPanel from "./ControlPanel/ControlPanel";
import Alert from "../Alert/Alert";

import styles from "./wallets.module.css";

const WalletsPage = () => {
  const [fetchingWallets, setFetchingWallets] = useState(false);
  const [wallets, setWallets] = useState([]);
  const { isAuthenticated, user, token } = useAuth();
  const [error, setError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    if (token && user.id) {
      console.log("Wallets: fetch wallets for", user.agent.full_name);
      fetchWallets();
    }
  }, [token, user]);

  const handleClick = async (event) => {
    event.preventDefault();
    setShowMenu(true)
  };

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
    <InnerPageLayout type="home" user={user.agent?.full_name} showPreloader={fetchingWallets}>
      <div className={[styles.container,"full-height"].join(" ")}>
        <div className={styles.wallets}>
          {error && <Alert title={errors[error].title} message={errors[error].message} type="danger"/>}
          <Wallets list={wallets}/>
        </div>
        <ControlPanel userStatus={user.agent?.status} onWithdrawalClick={handleClick}/>
      </div>   
    </InnerPageLayout>
  );
};

export default WalletsPage;