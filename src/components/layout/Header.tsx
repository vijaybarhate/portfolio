import React, { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import MenuOverlay from "./MenuOverlay";
import { useMotionPreference } from "./MotionContext";

const links = [
  { name: "Work", href: "#work", num: "01" },
  { name: "About", href: "#about", num: "02" },
  { name: "Contact", href: "#contact", num: "05" },
];

const Header: React.FC = () => {
  const [time, setTime] = useState("");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { reduceMotion } = useMotionPreference();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !menuOpen);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[140] border-b border-line bg-paper/80 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-14 md:h-16">
          <a href="#top" className="font-mono text-xs md:text-sm font-medium tracking-tight">
            VB<span className="text-accent-deep">.</span>
            <span className="hidden sm:inline text-muted ml-3">Vijay Barhate</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="link-sweep font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-ink/70 hover:text-ink"
              >
                <span className="text-accent-deep mr-1.5">{link.num}</span>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5 md:gap-8">
            <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 ${reduceMotion ? "" : "animate-ping"}`} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-muted">IST</span>
              <span className="tabular-nums">{time}</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-cursor="Menu"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="group flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em]"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-6 bg-ink transition-all duration-300 group-hover:w-4 group-hover:bg-accent" />
                <span className="block h-px w-6 bg-ink transition-all duration-300 group-hover:bg-accent" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
