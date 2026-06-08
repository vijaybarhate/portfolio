import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const words = ["Build", "Analyze", "Create"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1600; // Accelerated for better UX (recruiter-friendly)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);
      
      // Hyper-tactile easing: very rapid start
      const easedT = 1 - Math.pow(1 - t, 4); 
      const currentCount = Math.floor(easedT * 100);
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 200); // Shorter pause before handoff
      }
    };

    requestAnimationFrame(animate);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 500); // Faster word cycle

    return () => clearInterval(wordInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
      }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col justify-between p-8 md:p-16"
    >
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <span className="text-[10px] text-muted uppercase tracking-[0.4em]">
            Vijay Barhate
          </span>
          <div className="w-8 h-px bg-stroke opacity-30" />
          <span className="text-[10px] text-muted uppercase tracking-[0.4em]">
            Engineering Portfolio
          </span>
        </motion.div>
      </div>

      <div className="flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.23, 1, 0.32, 1]
            }}
            className="text-5xl md:text-7xl font-display italic text-text-primary"
          >
            {words[wordIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end gap-6">
        <div className="overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="block text-7xl md:text-[8rem] font-display tabular-nums text-text-primary leading-none"
          >
            {count.toString().padStart(3, "0")}
          </motion.span>
        </div>
        <div className="w-full h-px bg-stroke relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full accent-gradient"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
