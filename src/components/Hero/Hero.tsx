import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(0);

  const gradients = [
    "linear-gradient(90deg, #8a2be2, #ff7e5f)",
    "linear-gradient(90deg, #8a2be2, #8a2be2)",
    "linear-gradient(90deg, #8a2be2, #9954da)",
  ];

  const handleAnimationComplete = useCallback(() => {
    setCurrentGradient((prev) => (prev + 1) % gradients.length);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`wave wave${i + 1}`}></div>
        ))}
      </div>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Empower Your Business</h1>
          <p>Join millions of businesses using Pulse to simplify their payments</p>
          <motion.button
            className="animated-button"
            style={{ background: gradients[currentGradient] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{
              scale: hovered ? 1.15 : 1,
              boxShadow: hovered
                ? "0px 8px 20px rgba(0, 0, 0, 0.3)"
                : "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.8 }}
            onAnimationComplete={handleAnimationComplete}
          >
            Get Started
          </motion.button>
        </motion.div>
        <div className="hero-image-container">
          <img src={`${process.env.PUBLIC_URL}/icons/HeroFoto.png`} alt="Hero" className="hero-image" />
        </div>
      </div>
    </section>
  );
}
