import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onDone: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    let done = false;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        setTimeout(onDone, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink text-paper px-5 md:px-10 pt-24 md:pt-32 pb-6"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-paper/50 border-b border-paper/15 pb-4">
        <span>Vijay Barhate</span>
        <span>Portfolio © 2026</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 mb-4 hidden sm:block">
          Loading experience
        </p>
        <span className="font-display font-extrabold leading-none tracking-[-0.03em] text-[clamp(4rem,18vw,14rem)] tabular-nums">
          {count}
          <span className="text-accent">%</span>
        </span>
      </div>

      <div className="h-px w-full bg-paper/15 relative overflow-hidden mt-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
