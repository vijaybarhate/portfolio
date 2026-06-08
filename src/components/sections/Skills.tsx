import React from "react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "SQL (MySQL)", "Java", "TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Libraries",
    skills: ["Pandas", "Matplotlib", "Seaborn", "Tabulate", "React", "Framer Motion", "Zustand"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "MySQL Workbench", "Vite"],
  },
  {
    title: "Concepts",
    skills: ["Data Analysis", "Data Visualization", "CRUD Applications", "DSA", "Agile"],
  },
];

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Expertise & Stack" subtitle="Capability">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 md:gap-y-24">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className={`${
              idx === 0 ? "md:col-span-7" : 
              idx === 1 ? "md:col-span-5" : 
              idx === 2 ? "md:col-span-4" : 
              "md:col-span-8"
            }`}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted whitespace-nowrap">
                {category.title}
              </h3>
              <div className="w-full h-px bg-stroke" />
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3">
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, borderColor: "rgba(137, 170, 204, 0.4)" }}
                  className="rounded-full bg-surface/50 backdrop-blur-sm border border-stroke px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm text-muted hover:text-text-primary transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
