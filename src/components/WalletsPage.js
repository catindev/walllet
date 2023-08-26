import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getWallets } from '../api';

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const { isAuthenticated, user, SignOut, token } = useAuth();

  useEffect(() => {
    if (token && user.id) {
        console.log("Wallets: fetch wallets for", user.agent.full_name);
        fetchWallets();
    }
  }, [token, user]);

  const fetchWallets = async () => {
    try {
      const walletsData = await getWallets(token);
      setWallets(walletsData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      Welcome, {user.agent?.full_name}! You are signed in.
  
      <div>Wallets: {wallets.length}</div>
      <button onClick={SignOut}>Logout</button>
    </div>
  );
};

export default WalletsPage;