import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css"; // Импортируем как объект

export default function Footer() {
  const fadeInAnimation = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  }), []);

  return (
    <div className={styles.footerWrapper}>
      <motion.footer className={styles.footer} {...fadeInAnimation}>
        <div className={styles.footerBackground}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${styles.wave} ${styles[`wave${i + 1}`]}`}></div>
          ))}
        </div>

        <motion.div
          className={styles.footerLogo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.15 }}
        >
          Pulse
        </motion.div>

        <motion.div
          className={styles.footerSlogan}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Finance at Your Fingertips
        </motion.div>
      </motion.footer>
    </div>
  );
}
