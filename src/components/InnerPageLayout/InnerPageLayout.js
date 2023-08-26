import React from 'react';
import { Link } from 'react-router-dom';
import "./page.css";
import "./form.css";

const InnerPageLayout = ({ title, backURL, children }) => {
    return (
        <div className="appPage full-height">
        <div className="appPage__header">
          <div className="appPage__container Header">
              <Link to={backURL} className="Header__backButton">
                <img src="/static/back-button.svg" alt="Back Button" />
              </Link>          
            <div className="Header__text">{title}</div>
          </div>
        </div>
        <div className="appPage__container full-height">
            {children}
        </div>
      </div>        
    );
}

export default InnerPageLayout;