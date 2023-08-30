import React from "react";
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import styles from "components/Form/form.module.css";
import image from "./plug-icon.svg";
import is from "./plug.module.css";

const PlugPage = () => {
  return (
    <InnerPageLayout title="В разработке" backURL="/wallets">
      <div className={styles.wrapper}>
        <form className={styles.form} style={{ backgroundImage: `url()` }}>
          <div className={styles.header}>
            <h1>Функция в разработке</h1>
            <h2>и будет доступна в одном из ближайших релизов</h2>
            <img className={is.image} src={image}/>
          </div>
        </form>
      </div>
    </InnerPageLayout> 
  );
};

export default PlugPage;