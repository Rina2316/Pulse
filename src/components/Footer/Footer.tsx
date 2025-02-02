import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="footer-background">
          <div className="wave"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
          <div className="wave wave5"></div>
          <div className="wave wave6"></div>
        </div>
          <motion.div
            className="footerLogo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.15 }}
          >
            Pulse
          </motion.div>
          <motion.div
            className="footerSlogan"
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
