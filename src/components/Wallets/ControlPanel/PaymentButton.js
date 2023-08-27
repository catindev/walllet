import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./payments.module.css";
import buttonsStyles from "./buttons.module.css";
import icon from "./icons/control-panel-payment-mobile.svg";

export default () => (
    <Link to="/payments" className={[buttonsStyles.button,styles.button].join(" ")}>
        <img className={styles.icon} src={icon}/>
        <div className={styles.text}>
            <div className={styles.title}>Оплатить</div>
            <div className={styles.description}>
                Оплачивайте услуги или покупки у наших партнеров по реквизитам счета
            </div>
        </div>
    </Link>
);