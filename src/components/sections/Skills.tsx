import React from "react";
import { motion } from "framer-motion";

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
    <section id="skills" className="bg-bg py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em] block mb-4">
            EXPERTISE
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary">
            Tech <span className="text-muted">*stack*</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <h3 className="text-sm text-muted uppercase tracking-widest mb-6 pb-2 border-b border-stroke">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-surface border border-stroke px-4 py-2 text-sm text-muted hover:text-text-primary hover:border-muted/50 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
