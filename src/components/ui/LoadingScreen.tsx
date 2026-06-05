import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Build", "Analyze", "Create"];

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2700;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * 100), 100);
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(animate);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-bg flex flex-col justify-between p-6 md:p-12"
    >
      <div className="flex justify-between items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          Portfolio
        </motion.span>
      </div>

      <div className="flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end gap-4">
        <span className="text-6xl md:text-[6rem] font-display tabular-nums text-text-primary">
          {count.toString().padStart(3, "0")}
        </span>
        <div className="w-full h-[3px] bg-stroke/50 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full accent-gradient"
            style={{ 
              width: `${count}%`,
              boxShadow: "0 0 8px rgba(137,170,204,0.35)"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
