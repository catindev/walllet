import React, { useState, useEffect, useContext, useCallback } from 'react';
import { getUser, getWallets } from 'api';
import { useAuth } from 'AuthContext';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const [wallets, setWallets] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) return;
        if (token && (!user || !user.id)) {
            console.info("UserProvider: authorized, fetching user...");
            FetchUser();
        } else {
            console.info("UserProvider: authorized, ", user.id);
        }
    }, [token]);

    const FetchUser = useCallback(async () => {
        const userInfo = await getUser(token);
        setUser(userInfo);
    });


    return (
        <UserContext.Provider value={{ user, wallets, setWallets }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
