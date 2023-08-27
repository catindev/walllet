import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./topUp.module.css";
import buttonsStyles from "./buttons.module.css";
import icon from "./icons/control-panel-top-up-mobile.svg";

export default () => (
    <Link to="/topup" className={[buttonsStyles.button,styles.button].join(" ")}>
        <img className={styles.icon} src={icon} />
        <div className={styles.text}>
            <div className={styles.title}>Пополнить</div>
            <div className={styles.subtitle}>кошелек</div>
        </div>
    </Link>
);