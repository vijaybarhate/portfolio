import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Python Developer", "Data Analyst", "Student Builder", "SQL Enthusiast"];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
        ease: "power4.out",
      });
      gsap.to(".blur-in", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-bg"
    >
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,170,204,0.05),transparent_70%)] animate-gradient-shift" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="blur-in inline-block text-xs text-muted uppercase tracking-[0.3em] mb-8">
          PORTFOLIO '26
        </span>
        
        <h1 className="name-reveal text-6xl md:text-[6rem] font-display italic leading-[0.9] tracking-tight mb-6 text-text-primary">
          Vijay Barhate
        </h1>

        <div className="blur-in h-12 md:h-16 flex items-center justify-center mb-6">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-text-primary/90">
            A{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display italic text-accent"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>{" "}
            based in India.
          </p>
        </div>

        <p className="blur-in max-w-2xl mx-auto text-muted text-base md:text-lg mb-10 leading-relaxed">
          Building practical, data-driven applications that solve real problems with clean, efficient code.
        </p>

        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 bg-text-primary text-bg hover:bg-bg hover:text-text-primary overflow-hidden"
          >
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <div className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            See Projects
          </a>
          <a
            href="mailto:barhatevinay7777@gmail.com"
            className="px-7 py-3.5 rounded-full text-sm font-medium border-2 border-stroke bg-bg hover:border-accent transition-all duration-300 hover:scale-105"
          >
            Reach out
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
