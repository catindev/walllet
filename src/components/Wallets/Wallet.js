import React  from 'react';
import styles from "./wallet.module.css";

export default ({ amount, currency }) => {
  const bgImage = { backgroundImage: 'url(static/wallet-avatar.svg)' };
  const description = "Ваш основной счет";

  return (
    <div className={styles.wallet}>
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
    </div>
  );
}