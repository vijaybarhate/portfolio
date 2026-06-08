import React from "react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";

const stats = [
  { value: "05+", label: "Projects Built" },
  { value: "03+", label: "Certs Earned" },
  { value: "2027", label: "Graduation" },
];

const Stats: React.FC = () => {
  return (
    <Section id="stats" className="bg-bg py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className={`flex flex-col ${
              index === 1 ? "md:items-center" : 
              index === 2 ? "md:items-end" : 
              "md:items-start"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-5xl md:text-7xl font-display italic text-text-primary leading-none tabular-nums tracking-tighter">
                {stat.value}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-accent opacity-50" />
                <span className="text-[10px] text-muted uppercase tracking-[0.3em] whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Stats;
