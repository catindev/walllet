import React  from 'react';
import styles from "./wallet.module.css";

export default ({ amount, currency, index  }) => {
  const bgImage = { backgroundImage: 'url(static/wallet-avatar-32.svg)' };
  const description = index === 0? "Основной счёт" : "Ещё один кошелёк";

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