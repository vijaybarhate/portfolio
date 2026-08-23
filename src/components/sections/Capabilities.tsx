import React from "react";
import { skillCategories } from "../../data/skills";
import SectionHead from "../layout/SectionHead";
import Reveal from "../layout/Reveal";

const Capabilities: React.FC = () => (
  <section id="capabilities" className="px-5 md:px-10 py-24 md:py-36 border-t border-line">
    <SectionHead num="03" label="Capabilities" meta="(Spec Sheet)" />

    <div>
      {skillCategories.map((category, i) => (
        <Reveal key={category.title} delay={i * 0.05}>
          <div className="group grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-x-8 gap-y-3 border-b border-line py-6 md:py-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted pt-1 group-hover:text-accent transition-colors duration-300">
              <span className="text-accent mr-3">0{i + 1}</span>
              {category.title}
            </span>
            <p className="text-lg md:text-2xl font-medium leading-relaxed tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
              {category.skills.join(" · ")}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Capabilities;
