import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BottomSheet from "../../../BottomSheet";
import buttonsStyles from "../buttons.module.css";

import styles from "./withdrawal.module.css";
import icon from "../icons/control-panel-withdrawal-mobile.svg"

import disabledStyles from "./noWithdrawal.module.css";
import disabledIcon from "../icons/control-panel-no-withdrawal-mobile.svg";

import menuStyles from "./menu.module.css";

const Withdrawal = ({ onClick }) => (
    <div onClick={onClick} className={[buttonsStyles.button, styles.button].join(" ")}>
        <div className={styles.title}>Перевести</div>
        <img className={styles.icon} src={icon} />
    </div>
);

// Кнопка для пользователя без идентификации
const NoWithdrawal = () => (
    <Link to="/identity" className={[buttonsStyles.button, disabledStyles.button].join(" ")}>
        <div className={disabledStyles.text}>
            <div className={disabledStyles.title}>Для переводов</div>
            <div className={disabledStyles.subtitle}>пройдите идентификацию вашей личности</div>
        </div>
        <img className={disabledStyles.icon} src={disabledIcon} />
    </Link>
);



// Основной компонент
export default ({ disabled = true }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    // Для ноутов меню в отдельном роуте (WithdrawalPage)
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
                <ul className={menuStyles.menu}>
                    <li>
                        <Link onClick={() => setShowMenu(false)} to="/withdrawal/to/wallet">
                            {/* <img src="icon.svg" className={menuStyles.icon} /> */}
                            На другой кошелёк
                            {/* <img src="arrow-right.svg" alt="Arrow" className={menuStyles.arrow}/> */}
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setShowMenu(false)} to="/withdrawal/to/wallet">
                            {/* <img src="icon.svg" className={menuStyles.icon} /> */}
                            На карту
                            {/* <img src="arrow-right.svg" className={menuStyles.arrow}/> */}
                        </Link>
                    </li>
                </ul>
            </BottomSheet>
        </>
    )
};