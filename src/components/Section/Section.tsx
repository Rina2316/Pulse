"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Section.css";

interface SectionWithTextProps {
  id: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Section: React.FC<SectionWithTextProps> = ({
  id,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  const [hovered, setHovered] = useState(false);

  
  const gradients = [
    "linear-gradient(90deg, #8a2be2, #ff7e5f)",
    "linear-gradient(90deg, #ff7e5f, #8a2be2)",
    "linear-gradient(90deg, #8a2be2, #9954da)",
  ];

  
  const [currentGradient, setCurrentGradient] = useState(0);

  
  const handleAnimationComplete = () => {
    setCurrentGradient((prev) => (prev + 1) % gradients.length);
  };

  return (
    <motion.section
      id={id}
      className="section"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-border"></div>
      <div className="section-content">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="section-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>

        {buttonText && (
          <motion.div
            className="button-wrapper"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            <motion.button
              className="animated-button"
              style={{
                background: gradients[currentGradient],
              }}
              whileHover={{ scale: 1.15, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.8,
              }}
              onClick={onButtonClick}
              onAnimationComplete={handleAnimationComplete} 
            >
              {buttonText}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Section;
