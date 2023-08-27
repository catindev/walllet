import React from 'react';
import { Link } from 'react-router-dom';
import buttonsStyles from "./buttons.module.css";

import styles from "./withdrawal.module.css";
import icon from "./icons/control-panel-withdrawal-mobile.svg"

import disabledStyles from "./noWithdrawal.module.css";
import disabledIcon from "./icons/control-panel-no-withdrawal-mobile.svg"

const Withdrawal = () => (
    <Link to="/withdrawal" className={[buttonsStyles.button,styles.button].join(" ")}>
        <div className={styles.title}>Перевести</div>
        <img className={styles.icon} src={icon} />
    </Link>
);


const NoWithdrawal = () => (
    <Link to="/identity" className={[buttonsStyles.button,disabledStyles.button].join(" ")}>
        <div className={disabledStyles.text}>
            <div className={disabledStyles.title}>Для переводов</div>
            <div className={disabledStyles.subtitle}>пройдите идентификацию вашей личности</div>
        </div>
        <img className={disabledStyles.icon} src={disabledIcon} />
    </Link>
);

export default ({ disabled = false }) => {
    if (disabled) return <NoWithdrawal />;
    return <Withdrawal />;
};