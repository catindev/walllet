import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./payments.module.css";
import buttonsStyles from "../buttons.module.css";
import icon from "./control-panel-payment-mobile.svg";

// Меню вариантов перевода рисуется общим компонентом
import BottomSheetMenuList from "components/BottomSheetMenuList/BottomSheetMenuList";
import { PaymentsIcon, InvoiceIcon } from './PaymentsMenuIcons';
const menu = {
    title: "Оплатить",
    items: [
        { label: "Платежи", to: "/payments/catalog", Icon: PaymentsIcon },
        { label: "По номеру счёта", to: "/invoice", Icon: InvoiceIcon },
    ]
};

export default () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    // Для ноутов показываем меню в отдельном роуте (PaymentsPage)
    const click = () => {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 800) setShowMenu(true)
        else navigate('/payments');
    };

    return (
        <>
            <div onClick={click} className={[buttonsStyles.button, styles.button].join(" ")}>
                <img className={styles.icon} src={icon} />
                <div className={styles.text}>
                    <div className={styles.title}>Оплатить</div>
                    <div className={styles.description}>
                        Оплачивайте услуги или покупки у наших партнеров по реквизитам счета
                    </div>
                </div>
            </div>
            <BottomSheetMenuList 
                isOpen={showMenu} 
                title={menu.title} 
                items={menu.items} 
                onClick={() => setShowMenu(false)}/>            
        </>
    );
}