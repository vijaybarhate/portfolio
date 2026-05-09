import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { skillCategories } from '../../data/skills';
import { Code2, Wrench, Lightbulb } from 'lucide-react';

const icons = [Code2, Wrench, Lightbulb];

export const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Technical Expertise" subtitle="Skills & Tools">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 rounded-[15px] hover:border-magenta/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 group-hover:bg-magenta group-hover:text-white group-hover:border-magenta transition-all duration-300">
                <Icon size={24} />
              </div>

              <h3 className="text-2xl font-display font-bold mb-6 text-white">{category.title}</h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-body rounded-xl bg-surface-light border border-border text-text-muted hover:text-magenta hover:border-magenta/50 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};