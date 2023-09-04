import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "AuthContext";
import { useUser } from "UserContext";
import pageStyles from "./page.module.css";
import backIcon from "./back-button.svg";
import logoutIcon from "./logout-button.svg";
import refreshButton from "./refresh-button.svg"

const InnerPageLayout = ({
  title, backURL, backFn = false, type = "inner", showPreloader = false, children
}) => {
  return (
    <div className={`${pageStyles.page} full-height`}>
      {type === "inner" && (backFn !== false ? <InnerHeader title={title} backFn={backFn} /> : <InnerHeaderLink title={title} backURL={backURL} />)}
      {type === "home" && <MainHeader/>}
      <div className={`${pageStyles.container} full-height`}>
        {showPreloader && <div className={pageStyles.preloader}></div>}
        {!showPreloader && children}
      </div>
    </div>
  );
}

export default InnerPageLayout;

// Headers

const InnerHeaderLink = ({ title, backURL }) => {
  return (
    <div className={pageStyles.header}>
      <div className={`${pageStyles.container} ${pageStyles.headerContainer}`}>
        <Link to={backURL} className={pageStyles.iconLink}>
          <img src={backIcon} alt="Back Button" />
        </Link>
        <div className={pageStyles.text}>{title}</div>
      </div>
    </div>
  );
}

const InnerHeader = ({ title, backFn }) => {
  return (
    <div className={pageStyles.header}>
      <div className={`${pageStyles.container} ${pageStyles.headerContainer}`}>
        <div onClick={backFn} className={pageStyles.iconLink}>
          <img src={backIcon} alt="Back Button" />
        </div>
        <div className={pageStyles.text}>{title}</div>
      </div>
    </div>
  );
}

const MainHeader = () => {
  const { SignOut } = useAuth();
  const { user, setUser, setWallets } = useUser();

  const logOut = () => {
    setUser(null);
    setWallets([]);
    SignOut();
  }

  const refresh = event => {
    event.preventDefault();
    setUser(null);
    setWallets([]);
  }

  return (
    <div className={pageStyles.header}>
      <div className={`${pageStyles.container} ${pageStyles.headerContainer}`}>
        <div className={pageStyles.userbar}>
          <img src="static/userpic.svg" />
          <div className={pageStyles.name}>{user?.agent?.full_name}</div>
        </div>
        {/*  to="/settings" */}
        <div className={pageStyles.icons}>
        <Link onClick={refresh} className={pageStyles.iconLink}>
          <img src={refreshButton} />
        </Link>
        <Link onClick={logOut} className={pageStyles.iconLink}>
          <img src={logoutIcon} />
        </Link>          
        </div>      
      </div>
    </div>
  );
}