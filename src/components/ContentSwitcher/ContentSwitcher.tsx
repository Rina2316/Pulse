"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import "./ContentSwitcher.css";

interface ContentSwitcherProps {
  sections: Array<{
    id: string;
    content: React.ReactNode;
  }>;
}

const debounce = (func: (...args: any[]) => void, delay: number): (...args: any[]) => void => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastActiveContent = useRef<React.ReactNode | null>(null);

  const handleScroll = useCallback(
    debounce(() => {
      const visibleSection = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (visibleSection && visibleSection.id !== activeSection) {
        setActiveSection(visibleSection.id);
      } else if (!visibleSection) {
        setActiveSection(null);
      }
    }, 50),
    [sections, activeSection]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const activeContent = sections.find((section) => section.id === activeSection);

  useEffect(() => {
    if (activeContent) {
      lastActiveContent.current = activeContent.content;
    }
  }, [activeContent]);

  return (
    <motion.div
      className="switcher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: activeSection ? "auto" : "none" }}
    >
      <motion.div
        key={activeSection || "last"}
        className="switcher-content"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: activeSection ? "flex" : "none" }}
      >
        {activeContent ? activeContent.content : lastActiveContent.current}
      </motion.div>
    </motion.div>
  );
};

export default ContentSwitcher;