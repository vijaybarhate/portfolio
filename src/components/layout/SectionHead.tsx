import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

interface SectionHeadProps {
  num: string;
  label: string;
  meta?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({ num, label, meta }) => (
  <Reveal>
    <div className="relative flex items-baseline justify-between gap-4 border-b border-line pb-4 mb-10 md:mb-16">
      <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
        <span className="text-accent mr-3">{num}</span>
        {label}
      </h2>
      {meta && (
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-muted whitespace-nowrap">
          {meta}
        </span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[-1px] left-0 h-px w-full bg-accent origin-left"
        aria-hidden
      />
    </div>
  </Reveal>
);

export default SectionHead;
