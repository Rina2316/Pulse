import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BurgerMenu.module.css";

interface BurgerMenuProps {
  className?: string;
}

export default function BurgerMenu({ className }: BurgerMenuProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubmenuOpen(null);
  };

  const openSubmenu = (menu: string) => {
    setSubmenuOpen(menu);
  };

  const closeSubmenu = () => {
    setSubmenuOpen(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setSubmenuOpen(null);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className={className}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        ☰
      </button>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.menuContainer}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
          >
            {!submenuOpen ? (
              <ul className={styles.menuList}>
                <li>
                  <button className={styles.menuItem} onClick={() => openSubmenu("features")}>Features</button>
                </li>
                <li>
                  <button className={styles.menuItem} onClick={() => openSubmenu("pricing")}>Pricing</button>
                </li>
                <li>
                  <button className={styles.menuItem} onClick={() => openSubmenu("contact")}>Contact</button>
                </li>
                <li>
                  <button className={styles.menuItem}>Login</button>
                </li>
                <li>
                  <button className={styles.signUpButton}>Sign Up</button>
                </li>
              </ul>
            ) : (
              <motion.div
                className={styles.submenuContainer}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <button className={styles.backButton} onClick={closeSubmenu}>← Back</button>
                <ul className={styles.menuList}>
                  {submenuOpen === "features" && (
                    <>
                      <li className={styles.menuItem}>Feature 1</li>
                      <li className={styles.menuItem}>Feature 2</li>
                      <li className={styles.menuItem}>Feature 3</li>
                    </>
                  )}
                  {submenuOpen === "pricing" && (
                    <>
                      <li className={styles.menuItem}>Basic Plan</li>
                      <li className={styles.menuItem}>Pro Plan</li>
                      <li className={styles.menuItem}>Enterprise Plan</li>
                    </>
                  )}
                  {submenuOpen === "contact" && (
                    <>
                      <li className={styles.menuItem}>Email Us</li>
                      <li className={styles.menuItem}>Support</li>
                      <li className={styles.menuItem}>FAQ</li>
                    </>
                  )}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
