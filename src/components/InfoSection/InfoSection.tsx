import React from "react";
import styles from "./InfoSection.module.css"; 
import { Scene } from "../../components/Globus/Scene";

const InfoSection = () => {
  return (
    <section className={styles["info-section"]}>
      <div className={styles["info-container"]}>
        <h1 className={styles["title"]}>
          The backbone for <br /> global commerce
        </h1>
        <p className={styles["info-description"]}>
          Our cutting-edge payment network facilitates seamless transactions across the globe. <br/>
          With a robust infrastructure spanning multiple countries,<br/> we empower businesses to scale effortlessly while maintaining security and efficiency.
        </p>
        <div className={styles["stats"]}>
          <div>
            <h2 className={styles["stat-number"]}>500M+</h2>
            <p className={styles["stat-text"]}>API requests per day</p>
          </div>
          <div>
            <h2 className={styles["stat-number"]}>99.999%</h2>
            <p className={styles["stat-text"]}>
              historical uptime for <span className={styles["highlight"]}>Pulse services</span>.
            </p>
          </div>
          <div>
            <h2 className={styles["stat-number"]}>47+</h2>
            <p className={styles["stat-text"]}>countries with local acquiring</p>
          </div>
        </div>
      </div>

      <div className={styles["planet-container"]}>
        <Scene />
      </div>
    </section>
  );
};

export default InfoSection;
