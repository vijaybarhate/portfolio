import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Projects Built" },
  { value: "3+", label: "Certs Earned" },
  { value: "2026", label: "Expected Grad" },
];

const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center md:text-left flex flex-col items-center md:items-start"
            >
              <span className="text-6xl md:text-[6rem] font-display italic text-text-primary mb-4 block">
                {stat.value}
              </span>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
