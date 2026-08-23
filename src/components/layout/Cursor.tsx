import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 24, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 250, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") || "" : "");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[160] pointer-events-none"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[159] pointer-events-none"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40"
          animate={{
            width: label ? 84 : 36,
            height: label ? 84 : 36,
            scale: pressed ? 0.85 : 1,
            backgroundColor: label ? "rgba(20,20,19,0.94)" : "rgba(20,20,19,0)",
            borderColor: label ? "rgba(20,20,19,0)" : "rgba(20,20,19,0.4)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {label && (
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cursor;
