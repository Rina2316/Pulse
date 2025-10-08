import styles from "./CompanyLogos.module.css";

const logos = [
  { src: `${process.env.PUBLIC_URL}/icons/1.png`, alt: "OpenAI" },
  { src: `${process.env.PUBLIC_URL}/icons/2.png`, alt: "Amazon" },
  { src: `${process.env.PUBLIC_URL}/icons/3.png`, alt: "Google" },
  { src: `${process.env.PUBLIC_URL}/icons/4.png`, alt: "Anthropic" },
  { src: `${process.env.PUBLIC_URL}/icons/5.png`, alt: "Marriott" },
  { src: `${process.env.PUBLIC_URL}/icons/6.png`, alt: "Shopify" },
  { src: `${process.env.PUBLIC_URL}/icons/7.png`, alt: "Airbnb" },
  { src: `${process.env.PUBLIC_URL}/icons/8.png`, alt: "URBN" },
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
