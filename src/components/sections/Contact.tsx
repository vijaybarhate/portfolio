import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Contact: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-content", {
        xPercent: -50,
        duration: 60, // Slower for less distraction
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/vijay-barhate" },
    { name: "GitHub", href: "https://github.com/vijaybarhate" },
  ];

  return (
    <section id="contact" className="bg-bg pt-32 pb-16 px-6 overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(137,170,204,0.08),transparent_70%)] opacity-50" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Marquee */}
        <div ref={marqueeRef} className="border-y border-stroke py-10 mb-32 overflow-hidden whitespace-nowrap select-none opacity-20">
          <div className="marquee-content inline-block">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-5xl md:text-8xl font-display italic text-stroke/30 mx-8">
                BUILDING WITH DATA • 
              </span>
            ))}
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-5xl md:text-8xl font-display italic text-stroke/30 mx-8">
                BUILDING WITH DATA • 
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted mb-8 block">
              GET IN TOUCH
            </span>
            <h2 className="text-5xl md:text-[7rem] font-display italic text-text-primary leading-[0.9] mb-12">
              Let's build <span className="text-muted">something</span> together.
            </h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-4">
            <motion.a
              href="mailto:barhatevinay7777@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 rounded-full bg-surface border border-stroke text-sm md:text-lg font-medium overflow-hidden transition-all duration-300 w-full sm:w-auto"
            >
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10 group-hover:accent-gradient-text">Say hello</span>
            </motion.a>
            
            <motion.a
              href="/portfolio/resume/vijay_resume.pdf"
              download="Vijay_Barhate_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 rounded-full bg-bg border border-stroke text-sm md:text-lg font-medium transition-all duration-300 hover:border-text-primary w-full sm:w-auto"
            >
              Download Resume
            </motion.a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 md:pt-16 border-t border-stroke gap-6 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] md:text-xs uppercase tracking-widest text-muted hover:text-text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2 rounded-full border border-stroke bg-surface/30">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span className="text-[9px] md:text-[10px] text-muted uppercase tracking-[0.2em] font-medium whitespace-nowrap">Available for projects</span>
          </div>

          <div className="text-[10px] text-muted uppercase tracking-[0.3em]">
            VB © 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
