import { Link } from 'react-router-dom';
import menuStyles from "./menu.module.css";
import arrowRightIcon from "./arrow-right.svg";
import closeIcon from "./close.svg";
import { WalletIcon, CardIcon } from './WithdrawalMenuIcons';

export default ({ onClick }) => {
    const cancelClick = (event) => {
        event.preventDefault();
        onClick();
    }

    return (
        <>
            <div className={menuStyles.title}>Перевести</div>
            <ul className={menuStyles.menu}>
                <li>
                    <Link onClick={onClick} to="/withdrawal/to/wallet">
                        <WalletIcon className={menuStyles.icon} />
                        На другой кошелёк
                        <img src={arrowRightIcon} className={menuStyles.arrow} />
                    </Link>
                </li>
                <li>
                    <Link onClick={onClick} to="/withdrawal/to/wallet">
                        <CardIcon className={menuStyles.icon} />
                        На карту
                        <img src={arrowRightIcon} className={menuStyles.arrow} />
                    </Link>
                </li>
                <li>
                    <Link onClick={cancelClick}>
                        Отмена
                        <img src={closeIcon} className={menuStyles.close} />
                    </Link>
                </li>
            </ul>
        </>
    );
}