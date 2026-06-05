import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Contact: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-content", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="bg-bg pt-24 pb-12 px-6 overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(137,170,204,0.05),transparent_70%)] opacity-50" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Marquee */}
        <div ref={marqueeRef} className="border-y border-stroke py-8 mb-24 overflow-hidden whitespace-nowrap select-none">
          <div className="marquee-content inline-block">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl lg:text-8xl font-display italic text-stroke/40 mx-4">
                BUILDING WITH DATA • 
              </span>
            ))}
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl lg:text-8xl font-display italic text-stroke/40 mx-4">
                BUILDING WITH DATA • 
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display italic text-text-primary mb-10"
          >
            Let's build <span className="text-muted">something</span> together.
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:barhatevinay7777@gmail.com"
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-surface border border-stroke text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              <div className="absolute inset-0 rounded-full border border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              barhatevinay7777@gmail.com
            </a>
            
            <a
              href="/portfolio/resume/vijay_resume.pdf"
              download="Vijay_Barhate_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-bg border-2 border-stroke text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-stroke gap-6">
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/vijay-barhate" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">
              LinkedIn <span className="text-[10px]">→</span>
            </a>
            <a href="https://github.com/vijaybarhate" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">
              GitHub <span className="text-[10px]">→</span>
            </a>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-stroke bg-surface/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted uppercase tracking-widest font-medium">Open to internships</span>
          </div>

          <div className="text-[10px] text-muted uppercase tracking-[0.2em]">
            © 2026 Vijay Barhate
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
