import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "AuthContext";
import styles from "./landing.module.css";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  return (
    <div className={[styles.landing, "full-height"].join(" ")}>
      <div className={[styles.container, "full-height"].join(" ")}>
        <div className={styles.image}></div>
        <div className={styles.info}>
          <h1 className={styles.title}>Все ваши финансы</h1>
          <div className={styles.subtitle}>в одном приложении</div>
          <div className={styles.buttons}>
            <Link to="/signin" className={styles.button}>
              <div>Войти в кошелёк</div>
              <img src="/static/dot-icon-dark.svg" alt=""/>          
            </Link>
            <Link to="/signup" className={styles.buttonOutline}>
              <div>Создать кошелёк</div>       
            </Link>          
          </div>
        </div>
      </div>
    </div>  
  );
};

export default LandingPage;