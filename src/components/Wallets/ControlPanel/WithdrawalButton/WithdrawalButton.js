import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import BottomSheet from "../../../BottomSheet";
import buttonsStyles from "../buttons.module.css";

import styles from "./withdrawal.module.css";
import icon from "./control-panel-withdrawal-mobile.svg"

import disabledStyles from "./noWithdrawal.module.css";
import disabledIcon from "./control-panel-no-withdrawal-mobile.svg";

import WithdrawalMenu from "./WithdrawalMenu/WithdrawalMenu";

// Основной компонент
export default ({ disabled = true }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    // Для ноутов показываем меню в отдельном роуте (WithdrawalPage)
    const click = () => {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 600) setShowMenu(true)
        else navigate('/withdrawal');
    };

    const component = disabled ? <NoWithdrawal /> : <Withdrawal onClick={click} />;
    return (
        <>
            {component}
            <BottomSheet isOpen={showMenu} onClose={() => setShowMenu(false)}>
                <WithdrawalMenu onClick={() => setShowMenu(false)}/>
            </BottomSheet>
        </>
    )
};

// Кнопка переводов для идентифицированных пользователей
const Withdrawal = ({ onClick }) => (
    <div onClick={onClick} className={[buttonsStyles.button, styles.button].join(" ")}>
        <div className={styles.title}>Перевести</div>
        <img className={styles.icon} src={icon} />
    </div>
);

// Кнопка для тех, то без идентификации
const NoWithdrawal = () => (
    <Link to="/identity" className={[buttonsStyles.button, disabledStyles.button].join(" ")}>
        <div className={disabledStyles.text}>
            <div className={disabledStyles.title}>Для переводов</div>
            <div className={disabledStyles.subtitle}>пройдите идентификацию вашей личности</div>
        </div>
        <img className={disabledStyles.icon} src={disabledIcon} />
    </Link>
);