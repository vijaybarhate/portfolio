import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface MarqueeProps {
  items: string[];
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, className = "" }) => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 32, mass: 0.6 });
  const skew = useTransform(smooth, [-2000, 2000], [-7, 7], { clamp: true });

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
      <motion.div style={{ skewX: skew }} className="flex w-max animate-marquee will-change-transform">
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
};

export default Marquee;
