import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-stroke transition-all duration-300 ${
          isScrolled ? "bg-surface/80 backdrop-blur-lg" : "bg-surface/40 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="#" className="relative group">
          <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 relative">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="font-display italic text-[13px] relative z-10 text-text-primary">VB</span>
          </div>
        </a>

        <div className="w-px h-4 bg-stroke mx-1" />

        {/* Links */}
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-xs text-muted hover:text-text-primary transition-colors rounded-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-px h-4 bg-stroke mx-1" />

        {/* CTA */}
        <a
          href="mailto:barhatevinay7777@gmail.com"
          className="px-4 py-1.5 text-xs bg-text-primary text-bg rounded-full hover:accent-gradient hover:text-text-primary transition-all duration-300 flex items-center gap-1"
        >
          Say hi <span className="text-[10px]">↗</span>
        </a>
      </motion.div>
    </nav>
  );
};

export default Navbar;
