import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useMotionPreference } from "./MotionContext";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Calm crawl speed — velocity adds up to 4× on fast flings. */
const BASE_PX_PER_SEC = 60;

const Marquee: React.FC<MarqueeProps> = ({ items, className = "" }) => {
  const { reduceMotion: reduce } = useMotionPreference();
  const { scrollY } = useScroll();
  const rawVel = useVelocity(scrollY);
  const smooth = useSpring(rawVel, { damping: 50, stiffness: 400 });
  // Clamp extreme flings: ±2500px/s → ±8deg skew, subtle scale kick
  const skewX = useTransform(smooth, [-2500, 2500], [-8, 8]);
  const scaleX = useTransform(smooth, [-2500, 2500], [0.985, 1.015]);

  // Live velocity for the loop (refs, never state, in the hot path)
  const velRef = useRef(0);
  useEffect(() => {
    const unsub = smooth.on("change", (v: number) => {
      velRef.current = typeof v === "number" ? v : 0;
    });
    return unsub;
  }, [smooth]);

  // JS-driven loop on its OWN element — no fight with the skew transform above,
  // and gating follows the effective preference (OS + Full/Calm override),
  // not the CSS media query (which a Full override could never re-enable).
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) halfRef.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    const t = setTimeout(measure, 500);
    const fonts = (document as Document).fonts;
    if (fonts?.ready) fonts.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (reduce) {
      if (x.get() !== 0) x.set(0);
      return;
    }
    const half = halfRef.current;
    if (!half) return;
    const dt = Math.min(delta, 64) / 1000;
    const boost = 1 + Math.min(Math.abs(velRef.current) / 2500, 3);
    let next = x.get() - BASE_PX_PER_SEC * boost * dt;
    if (next <= -half) next += half;
    x.set(next);
  });

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center">
          <span className="font-display font-bold uppercase tracking-tight text-lg md:text-2xl px-6 md:px-10 whitespace-nowrap">
            {item}
          </span>
          <span className="inline-block h-2 w-2 rotate-45 bg-accent shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-line py-4 md:py-5 select-none ${className}`}
    >
      <motion.div
        style={reduce ? undefined : { skewX, scaleX }}
        className="will-change-transform"
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Marquee;
