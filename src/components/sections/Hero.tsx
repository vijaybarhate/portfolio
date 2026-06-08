import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Reduced pull by ~50% (0.35 -> 0.15) for subtle discovery
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Python Developer", "Data Analyst", "Software Engineer", "AI/ML Enthusiast"];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2400);

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
        ease: "expo.out",
      });
      gsap.to(".blur-in", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "expo.out",
      });
    }, heroRef);

    return () => {
      clearInterval(roleInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-bg"
    >
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,170,204,0.06),transparent_70%)] animate-gradient-shift" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] brightness-50 contrast-150 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="blur-in overflow-hidden mb-8">
          <span className="inline-block text-[10px] text-muted uppercase tracking-[0.4em]">
            Vijay Barhate / Computer Engineering
          </span>
        </div>
        
        <Magnetic>
          <h1 className="name-reveal cursor-default text-5xl sm:text-6xl md:text-[8rem] font-display italic leading-[0.85] tracking-tight mb-6 md:mb-8 text-text-primary select-none break-words">
            Vijay Barhate
          </h1>
        </Magnetic>

        <div className="blur-in h-10 md:h-16 flex items-center justify-center mb-6 md:mb-8">
          <p className="text-lg md:text-3xl font-light text-text-primary/90">
            A{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="font-display italic text-accent accent-gradient-text"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>{" "}
            based in India.
          </p>
        </div>

        <p className="blur-in max-w-xl mx-auto text-muted text-sm md:text-lg mb-8 md:mb-12 leading-relaxed font-body px-2">
          B.E. Computer Engineering student at Mumbai University focused on Software Development, Python, and AI-powered applications.
        </p>

        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4">
          <motion.a
            href="/portfolio/resume/vijay_resume.pdf"
            download="Vijay_Barhate_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3.5 md:px-10 md:py-4 rounded-full text-sm font-medium transition-all bg-text-primary text-bg overflow-hidden w-full sm:w-auto flex items-center justify-center"
          >
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">Download Resume</span>
          </motion.a>
          
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 md:px-10 md:py-4 rounded-full text-sm font-medium border border-stroke bg-surface/50 backdrop-blur-sm hover:border-text-primary transition-colors text-text-primary w-full sm:w-auto flex items-center justify-center"
          >
            View Projects
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-12 w-px bg-gradient-to-b from-stroke to-transparent opacity-30" />
    </section>
  );
};

export default Hero;
