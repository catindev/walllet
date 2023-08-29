import React, { useState } from 'react';
import TopUpButton from "./TopUpButton/TopUpButton";
import WithdrawalButton from "./WithdrawalButton/WithdrawalButton";
import PaymentButton from "./PaymentsButton/PaymentsButton";
import styles from "./buttons.module.css";

const ControlPanel = ({ userStatus = 0 }) => {
    const disabled = userStatus < 3;

    return (
        <div className={styles.panel}>
            <div className={styles.topGroup}>
                <TopUpButton />
                <WithdrawalButton disabled={disabled}/>
            </div>
            <PaymentButton />
        </div>       
    )
};

export default ControlPanel;
