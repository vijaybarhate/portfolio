import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "./MotionContext";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const MESSAGE = "$ whoami → vijay: python-dev & data-analyst — psst, press ⌘K";

const KonamiTerminal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState(0);
  const buffer = useRef<string[]>([]);
  const { reduceMotion } = useMotionPreference();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      buffer.current = [...buffer.current, e.key].slice(-SEQUENCE.length);
      if (SEQUENCE.every((k, i) => buffer.current[i] === k)) {
        buffer.current = [];
        setTyped(0);
        setVisible(true);
      } else if (e.key === "Escape") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Typewriter (instant under reduced motion)
  useEffect(() => {
    if (!visible) return;
    if (reduceMotion) {
      setTyped(MESSAGE.length);
      return;
    }
    if (typed >= MESSAGE.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), 26);
    return () => clearTimeout(t);
  }, [visible, typed, reduceMotion]);

  // Auto-dismiss
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 9000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="konami"
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:right-auto z-[165] sm:max-w-md"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-sm border border-paper/15 bg-ink text-paper shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
              <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/70">
                konami — accepted
              </span>
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss easter egg"
                data-cursor="Close"
                className="ml-auto font-mono text-[10px] uppercase tracking-[0.15em] text-paper/70 hover:text-accent"
              >
                ×
              </button>
            </div>
            <p className="px-3 py-3 font-mono text-[11px] md:text-xs leading-relaxed text-paper/85">
              <span className="text-accent">$ </span>
              {MESSAGE.slice(2, typed)}
              {!reduceMotion && typed < MESSAGE.length && (
                <span aria-hidden className="ml-0.5 inline-block h-3 w-[7px] translate-y-[2px] animate-pulse bg-accent" />
              )}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiTerminal;
