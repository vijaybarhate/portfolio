import React from "react";
import { motion } from "framer-motion";
import { certifications } from "../../data/certifications";

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="bg-bg py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em] block mb-4">
            RECOGNITIONS
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary">
            Certs & <span className="text-muted">*courses*</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-surface border border-stroke hover:border-muted/50 transition-all duration-300 group cursor-default"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-primary group-hover:accent-gradient-text transition-all duration-300">
                  {cert.title}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  {cert.issuer} · {cert.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
