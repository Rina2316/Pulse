"use client";

import React from "react";
import { motion } from "framer-motion";
import "./AnimatedBO.css";

const AnimatedBarOne: React.FC = () => {
  return (
    <div className="curved-container">
      <motion.svg
        className="line"
        width="500"
        height="300"
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#54a0ff">
              <animate
                attributeName="stop-color"
                values="#54a0ff;#1dd1a1;#ff6b6b;#54a0ff"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#1dd1a1">
              <animate
                attributeName="stop-color"
                values="#1dd1a1;#ff6b6b;#54a0ff;#1dd1a1"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M0 0 Q200 150 500 50"
          stroke="url(#gradient1)"
          strokeWidth="5"
          fill="transparent"
          style={{ filter: "url(#glow)" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.svg
        className="line"
        width="500"
        height="300"
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b">
              <animate
                attributeName="stop-color"
                values="#ff6b6b;#1dd1a1;#54a0ff;#ff6b6b"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#1dd1a1">
              <animate
                attributeName="stop-color"
                values="#1dd1a1;#54a0ff;#ff6b6b;#1dd1a1"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <motion.path
          d="M550 250 Q350 100 0 250"
          stroke="url(#gradient2)"
          strokeWidth="5"
          fill="transparent"
          style={{ filter: "url(#glow)" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.svg>

      <motion.div
        className="square square-1"
        
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
          <img src="/icons/blockcheain.jpg" alt="Blockchain" width={200} height={200} />
       
      </motion.div>

      <motion.div
        className="square square-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 1.2,
        }}
      >
          <img src="/icons/card.jpg"   alt="Card" width={200} height={200} />
      </motion.div>
    </div>
  );
};

export default AnimatedBarOne;
