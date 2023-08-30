import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import buttonsStyles from "../buttons.module.css";

import styles from "./withdrawal.module.css";
import icon from "./control-panel-withdrawal-mobile.svg"

import disabledStyles from "./noWithdrawal.module.css";
import disabledIcon from "./control-panel-no-withdrawal-mobile.svg";

// Меню вариантов перевода рисуется общим компонентом
import BottomSheetMenuList from "components/BottomSheetMenuList/BottomSheetMenuList";
import { WalletIcon, CardIcon } from './WithdrawalMenuIcons';
const menu = {
    title: "Перевести",
    items: [
        { label: "На другой кошелёк", to:"/withdrawal/to/wallet", Icon: WalletIcon },
        { label: "На карту банка", to:"/withdrawal/to/card", Icon: CardIcon },
    ]
};


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
            <BottomSheetMenuList 
                isOpen={showMenu} 
                title={menu.title} 
                items={menu.items} 
                onClick={() => setShowMenu(false)}/>
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