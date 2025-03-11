import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDropdown = (menu: string) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
         <BurgerMenu className="menu-burger"/>
        <div className="logo">Pulse</div>
        <nav ref={menuRef}>
          <ul className="menu">
            <li>
              <button className="menu-item" onClick={() => handleDropdown("features")}>
                Features
              </button>
              <AnimatePresence>
                {dropdownOpen === "features" && (
                  <motion.ul
                    className="dropdown active"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <button className="menu-item" onClick={() => handleDropdown("pricing")}>
                Pricing
              </button>
              <AnimatePresence>
                {dropdownOpen === "pricing" && (
                  <motion.ul
                    className="dropdown active"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>Basic Plan</li>
                    <li>Pro Plan</li>
                    <li>Enterprise Plan</li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <button className="menu-item" onClick={() => handleDropdown("contact")}>
                Contact
              </button>
              <AnimatePresence>
                {dropdownOpen === "contact" && (
                  <motion.ul
                    className="dropdown active"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>Email Us</li>
                    <li>Support</li>
                    <li>FAQ</li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <button className="menu-item" onClick={() => openModal("login")}>
                Login
              </button>
            </li>
            <li>
            <button className="sign-up-btn" onClick={() => openModal("signup")}>
  <span>Sign Up</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M13.172 12l-4.95-4.95a1 1 0 111.414-1.414l6.364 6.364a1 1 0 010 1.414l-6.364 6.364a1 1 0 01-1.414-1.414L13.172 12z" />
  </svg>
</button>


            </li>
          </ul>
        </nav>
      </motion.header>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              ref={modalRef}
            >
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              {modalType === "login" ? (
                <>
                  <h2>Login</h2>
                  <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <p className="demo-info">This is a demo version</p>
                    <button type="submit">Login</button>
                  </form>
                </>
              ) : (
                <>
                  <h2>Sign Up</h2>
                  <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <p className="demo-info">This is a demo version</p>
                    <button type="submit">Sign Up</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
