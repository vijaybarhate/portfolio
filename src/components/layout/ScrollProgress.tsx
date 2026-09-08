import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionPreference } from "./MotionContext";

const ScrollProgress: React.FC = () => {
  const { reduceMotion } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[145] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
