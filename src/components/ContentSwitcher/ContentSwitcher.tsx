"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContentSwitcher.css";

interface ContentSwitcherProps {
  sections: Array<{
    id: string;
    content: React.ReactNode;
  }>;
}

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = () => {
    const visibleSection = sections.find((section) => {
      const element = document.getElementById(section.id);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      // Условие: секция считается видимой, если её верхний край в пределах окна просмотра
      return rect.top >= 4 && rect.top <= window.innerHeight / 4;
    });

    // Если видимая секция найдена, установить её как активную
    if (visibleSection) {
      setActiveSection(visibleSection.id);
    } else {
      // Если никакая секция не видна, очищаем активную секцию
      setActiveSection(null);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeContent = sections.find((section) => section.id === activeSection);

  return (
    <motion.div
      className="switcher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {activeContent ? (
          <motion.div
            key={activeSection}
            className="switcher-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {activeContent.content}
          </motion.div>
        ) : (
          // Пустой блок для скрытия контента, если нет активной секции
          <motion.div
            key="empty"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentSwitcher;
