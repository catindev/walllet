import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signIn } from 'api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const $BEARER = localStorage.getItem("Bearer");
  const [isAuthenticated, setIsAuthenticated] = useState(!!$BEARER);
  const [token, setToken] = useState($BEARER);

  const SignIn = async (credentials) => {
    try {
      const data = await signIn(credentials);
      localStorage.setItem("Bearer", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const SignOut = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("Bearer");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, SignOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
