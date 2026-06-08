import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Basic section tracking
      const sections = ["projects", "resume"];
      let current = "Home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section.charAt(0).toUpperCase() + section.slice(1);
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
  ];

  return (
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5 
        }}
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-stroke transition-colors duration-500 overflow-hidden ${
          isScrolled ? "bg-surface/80 backdrop-blur-xl" : "bg-surface/40 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="#" className="relative group mr-1 md:mr-2">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stroke flex items-center justify-center overflow-hidden relative"
          >
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="font-display italic text-[12px] md:text-[14px] relative z-10 text-text-primary group-hover:text-bg transition-colors">VB</span>
          </motion.div>
        </a>

        {/* Links */}
        <ul className="flex items-center gap-1 md:gap-2 hidden sm:flex">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <a
                href={link.href}
                className={`px-3 md:px-4 py-2 text-xs transition-colors relative z-10 ${
                  activeSection === link.name ? "text-text-primary" : "text-muted hover:text-text-primary"
                }`}
              >
                {link.name}
              </a>
              {activeSection === link.name && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-stroke/40 rounded-full -z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="w-px h-4 md:h-5 bg-stroke mx-1 md:mx-2 opacity-50 hidden sm:block" />

        {/* CTA */}
        <motion.a
          href="mailto:barhatevinay7777@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-5 py-2 text-[10px] md:text-xs bg-text-primary text-bg rounded-full hover:accent-gradient hover:text-text-primary transition-all duration-300 flex items-center gap-1 md:gap-2 font-medium"
        >
          Say hi 
          <span className="text-[8px] md:text-[10px] opacity-70">↗</span>
        </motion.a>
      </motion.div>
    </nav>
  );
};

export default Navbar;
