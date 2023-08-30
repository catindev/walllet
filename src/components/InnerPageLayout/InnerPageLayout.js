import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "AuthContext";
import pageStyles from "./page.module.css";
import backIcon from "./back-button.svg";
import logoutIcon from "./logout-button.svg";

const InnerPageLayout = ({ title, backURL, backFn = false, type = "inner", user = "", showPreloader = false, children }) => {
  
  return (
    <div className={`${pageStyles.page} full-height`}>
      {type === "inner" && (backFn !== false ? <InnerHeader title={title} backFn={backFn} /> : <InnerHeaderLink title={title} backURL={backURL} />)}
      {type === "home" && <MainHeader name={user} />}
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

const MainHeader = ({ name }) => {
  const { SignOut } = useAuth();

  return (
    <div className={pageStyles.header}>
      <div className={`${pageStyles.container} ${pageStyles.headerContainer}`}>
        <div className={pageStyles.userbar}>
          <img src="static/userpic.svg" />
          <div className={pageStyles.name}>{name}</div>
        </div>
        {/*  to="/settings" */}
        <Link onClick={SignOut} className={pageStyles.iconLink}>
          <img src={logoutIcon} />
        </Link>
      </div>
    </div>
  );
}