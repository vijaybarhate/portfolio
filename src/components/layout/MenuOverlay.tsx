import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { name: "Work", href: "#work", num: "01" },
  { name: "About", href: "#about", num: "02" },
  { name: "Contact", href: "#contact", num: "03" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/vijaybarhate" },
  { name: "LinkedIn", href: "https://linkedin.com/in/vijay-barhate" },
  { name: "Resume", href: "/portfolio/resume/vijay_resume.pdf" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-ink text-paper px-5 md:px-10 pt-20 md:pt-24 pb-6"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-paper/50 border-b border-paper/15 pb-4">
            <span>Navigation</span>
            <button
              type="button"
              onClick={onClose}
              data-cursor="Close"
              aria-label="Close menu"
              className="group flex items-center gap-2 uppercase tracking-[0.2em] text-paper/70 hover:text-paper transition-colors"
            >
              Close
              <span className="relative block h-3 w-3">
                <span className="absolute top-1/2 left-0 h-px w-full bg-current rotate-45 transition-colors group-hover:bg-accent" />
                <span className="absolute top-1/2 left-0 h-px w-full bg-current -rotate-45 transition-colors group-hover:bg-accent" />
              </span>
            </button>
          </div>

          <nav aria-label="Menu" className="flex flex-col gap-1 md:gap-2 py-8">
            {links.map((link, i) => (
              <div key={link.name} className="overflow-hidden">
                <motion.a
                  href={link.href}
                  onClick={onClose}
                  data-cursor="Go"
                  className="group flex items-baseline gap-4 md:gap-6 font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2.75rem,11vw,8rem)] text-paper transition-colors duration-300 hover:text-accent"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%", transition: { duration: 0.35, ease: EASE, delay: 0 } }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
                >
                  <span className="font-mono text-xs md:text-sm font-medium tracking-normal text-accent translate-y-[-0.5em]">
                    {link.num}
                  </span>
                  <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-4">
                    {link.name}
                  </span>
                </motion.a>
              </div>
            ))}
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-paper/15 pt-4">
            <a
              href="mailto:barhatevinay7777@gmail.com"
              data-cursor="Mail"
              className="link-sweep font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-paper/60 hover:text-paper"
            >
              barhatevinay7777@gmail.com
            </a>
            <div className="flex items-center gap-5 md:gap-8">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  data-cursor="Open"
                  className="link-sweep font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-paper/60 hover:text-paper"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
