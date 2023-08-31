import React, { useState, useEffect, useContext, useCallback } from 'react';
import { getUser, getWallets } from 'api';
import { useAuth } from 'AuthContext';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [fetchingUser, setFetchingUser] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [fetchingWallets, setFetchingWallets] = useState(false);

    useEffect(() => {
        if (!token) return;
        if (token && (!user || !user.id)) {
            console.info("UserProvider: authorized, fetching user...");
            FetchUser();
        } else {
            console.info("UserProvider: authorized, ", user.id);
        }

        if (token && wallets.length === 0) {
            console.info("UserProvider: fetching wallets...");
            fetchWallets();
        } else {
            console.info("UserProvider:", wallets.length, "wallets");
        }
    }, [token, wallets]);


    const FetchUser = useCallback(async () => {
        setFetchingUser(true);
        const userInfo = await getUser(token);
        userInfo && setUser(userInfo);
        setFetchingUser(false);
    });

    const fetchWallets = async () => {
        setFetchingWallets(true);
        const walletsData = await getWallets(token);
        walletsData && setWallets(walletsData);
        setFetchingWallets(false);
      };

    return (
        <UserContext.Provider value={{ 
            user, fetchingUser,
            wallets, fetchingWallets, setWallets   
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
