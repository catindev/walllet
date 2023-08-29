import React  from 'react';
import {  Link } from 'react-router-dom';

import styles from "./wallet.module.css";

export default ({ id, amount, currency }) => {
  const bgImage = { backgroundImage: 'url(static/wallet-avatar-32.svg)' };
  const description = "Ваш основной счет";

  return (
    <Link to={`/wallet/${id}`} className={[styles.wallet, styles.link].join(" ")}>
      <div className={styles.container}>
        <div className={styles.avatar} style={bgImage}></div>
        <div className={styles.info}>
          <div className={styles.description}>{description}</div>
          <div className={styles.amount}>
            <div className={styles.value}>{amount}</div>
            <div className={styles.currency}>{currency}</div>
          </div>
        </div>
      </div>
      <div className={styles.historyButton}>
        <img src="static/wallet-history-button.svg" className={styles.historyImage} />
      </div>
    </Link>
  );
}