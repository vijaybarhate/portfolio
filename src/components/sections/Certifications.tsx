import React from "react";
import { motion } from "framer-motion";
import { certifications } from "../../data/certifications";
import { Section } from "../layout/Section";

const Certifications: React.FC = () => {
  return (
    <Section id="certifications" title="Certs & Courses" subtitle="Recognitions">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="group relative p-6 rounded-[24px] bg-surface border border-stroke hover:border-accent/30 transition-all duration-500 flex flex-col justify-between aspect-[4/3] md:aspect-square lg:aspect-[4/3]"
          >
            <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-stroke flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] accent-gradient-text">↗</span>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                {cert.issuer}
              </span>
              <h3 className="text-xl md:text-2xl font-display italic text-text-primary leading-tight group-hover:accent-gradient-text transition-all duration-300">
                {cert.title}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted">
                {cert.date}
              </span>
              <div className="w-12 h-px bg-stroke group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Certifications;
