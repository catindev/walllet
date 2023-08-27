import React from 'react';
import { Link  } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import "./page.css";
import "./form.css";

const InnerHeader = ({ title, backURL }) => {
  return (
    <div className="appPage__header">
      <div className="appPage__container Header">
        <Link to={backURL} className="Header__iconLink">
          <img src="static/back-button.svg" alt="Back Button" />
        </Link>
        <div className="Header__text">{title}</div>
      </div>
    </div>
  );
}

const MainHeader = ({ name }) => {
  const { SignOut } = useAuth();
  
  return (
    <div className="appPage__container Header">
        <div className="Userbar">
          <img src="static/userpic.svg"/>
          <div className="Userbar__name">{name}</div>
        </div>
        {/*  to="/settings" */}
        <Link onClick={SignOut} className="Header__iconLink">
          <img src="static/settings-button.svg" />
        </Link>
    </div>
  );
}


const InnerPageLayout = ({ title, backURL, type = "inner", user = "", showPreloader = false, children }) => {
  
  return (
    <div className="appPage full-height">
      <div className="appPage__header">
        {type === "inner" && <InnerHeader title={title} backURL={backURL}/>}
        {type === "home" && <MainHeader name={user}/>}
      </div>
      <div className="appPage__container full-height">
        {showPreloader && <div className="appPage__preloader"></div>}
        {!showPreloader && children}
      </div>
    </div>
  );
}

export default InnerPageLayout;