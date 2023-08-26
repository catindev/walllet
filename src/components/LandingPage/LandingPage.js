import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

import "./landing.css";


const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  return (
    <div className="index-page full-height">
      <div className="index-container full-height">
        <div className="index-hero-image"></div>
        <div className="index-info">
          <h1 className="index-title">Все ваши финансы</h1>
          <div className="index-subtitle">в одном приложении</div>
          <div className="index-buttons">
            <Link to="/signin" className="index-button">
              <div>Войти в кошелёк</div>
              <img src="/static/dot-icon-dark.svg" alt=""/>          
            </Link>
            <Link to="/signup" className="index-button-outline">
              <div>Создать кошелёк</div>       
            </Link>          
          </div>
        </div>
      </div>
    </div>  
  );
};

export default LandingPage;