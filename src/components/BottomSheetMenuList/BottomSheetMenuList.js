import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sheet from 'react-modal-sheet';
import styles from "./bottomSheetMenuList.module.css";

import closeIcon from "./close.svg";
import arrowIcon from "./arrow-right.svg";

const MenuListItem = ({ label, Icon = false, onClick, to }) => {
    return (
        <li>
            <Link onClick={onClick} to={to}>
                {Icon !== false && <Icon className={styles.icon} />}
                {label}
                <img src={arrowIcon} className={styles.arrow} />
            </Link>
        </li>
    );
};
const mapMenu = (item, index) => <MenuListItem key={index} {...item} />;


const BottomSheetMenuList = ({ isOpen, title, items = [], onClick }) => {

    // Отменяем действие ссылки с пунктом "Отмена", чтобы не триггерить 
    // анимацию перерисовки всей страницы
    const cancelClick = event => {
        event.preventDefault();
        onClick();
    }

    // Вешаем обработку клика на каждом пункте меню
    const fixedItems = items && items.length > 0 ?
        items.map(item => ({ ...item, onClick }))
        :
        [];


    return (
        <>
            <Sheet isOpen={isOpen} detent="content-height" onClose={onClick}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className={styles.title}>{title}</div>
                        <ul className={styles.menu}>
                            {/* Здесь выводим пункты меню из того, что получили в пропсы */}
                            {fixedItems.length > 0 && fixedItems.map(mapMenu)}
                            
                            {/* Кнопка отмены общая для всех */}
                            <li>
                                <Link onClick={cancelClick}>
                                    Отмена
                                    <img src={closeIcon} className={styles.close} />
                                </Link>
                            </li>
                        </ul>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    )
};

export default BottomSheetMenuList;