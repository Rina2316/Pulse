import React from "react";
import styles from "./CompanyLogos.module.css";

const logos = [
  { src: "/icons/1.png", alt: "OpenAI" },
  { src: "/icons/2.png", alt: "Amazon" },
  { src: "/icons/3.png", alt: "Google" },
  { src: "/icons/4.png", alt: "Anthropic" },
  { src: "/icons/5.png", alt: "Marriott" },
  { src: "/icons/6.png", alt: "Shopify" },
  { src: "/icons/7.png", alt: "Airbnb" },
  { src: "/icons/8.png", alt: "URBN" },
];

export default function CompanyLogos() {
  return (
    <div className={styles.logoSection}>
      <div className={styles.logoGrid}>
        {logos.map((logo, index) => (
          <div key={index} className={styles.logoItem}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
      <p className={styles.description}>
        Millions of businesses trust <strong>Pulse</strong> to manage payments, integrate financial services, and optimize their revenue models for a more successful business.
      </p>
    </div>
  );
}
