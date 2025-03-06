"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from"./ContentSwitcher.module.css";

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
  const [isFastScroll, setIsFastScroll] = useState(false);
  let lastScrollY = useRef(window.scrollY);

  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      setIsFastScroll(Math.abs(currentScrollY - lastScrollY.current) > 100);
      lastScrollY.current = currentScrollY;

      const visibleSection = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });
      setActiveSection(visibleSection ? visibleSection.id : null);
    }, 10),
    [sections]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const activeContent = sections.find((section) => section.id === activeSection);

  useEffect(() => {
    if (activeContent) {
      lastActiveContent.current = activeContent.content;
    }
  }, [activeContent]);

  if (!activeSection) return null;

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div
          key={activeSection}
          className={styles.switcher}
          style={{
            zIndex: 0,
            position: "fixed",
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: isFastScroll ? 0 : 0.2 } }} 
          transition={{ duration: isFastScroll ? 0 : 0.3 }}
        >
          <motion.div
        className={styles.switcherContent}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: isFastScroll ? 0 : 0.2 } }}
            transition={{ duration: isFastScroll ? 0 : 0.3 }}
          >
            {activeContent ? activeContent.content : lastActiveContent.current}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentSwitcher;
