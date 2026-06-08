import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { GraduationCap, MapPin } from 'lucide-react';

const education = [
  {
    degree: "B.E. Computer Engineering",
    school: "Saraswati College of Engineering, Kharghar",
    university: "University of Mumbai",
    period: "2023 - 2027",
    details: "Passionate about building practical and data-driven applications."
  },
  {
    degree: "Class XII - CBSE",
    school: "Ambuja Vidya Niketan, Chandrapur",
    period: "2023",
    details: "Computer Science: 89/100"
  },
  {
    degree: "Class X - CBSE",
    school: "Manikgarh Cement Eng. School",
    period: "2021",
    details: "Information Technology: 91/100 | Percentage: 81.8%"
  }
];

export const About: React.FC = () => {
  return (
    <Section id="about" title="About & Education" subtitle="Biography">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="space-y-8 text-muted text-lg md:text-xl leading-relaxed font-body"
        >
          <p>
            I am a <span className="text-text-primary font-display italic">B.E. Computer Engineering student</span> at Saraswati College of Engineering, Mumbai University,
            dedicated to crafting practical, data-centric solutions.
          </p>
          <p>
            With a strong foundation in <span className="text-text-primary">Python and SQL</span>, I build applications that bridge the gap between complex data and intuitive user experiences. My focus lies in automation, analysis, and clean architecture.
          </p>
          <p>
            Currently expanding my expertise in software engineering and problem-solving, I aim to create technology that feels as good as it functions.
          </p>
        </motion.div>

        <div className="space-y-12">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-stroke group"
            >
              <div className="absolute -left-[1px] top-0 w-px h-0 group-hover:h-full bg-accent transition-all duration-700 ease-in-out" />
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-stroke group-hover:bg-accent group-hover:scale-125 transition-all duration-300" />

              <div className="flex flex-col mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                  {item.period}
                </span>
                <h3 className="text-2xl font-display italic text-text-primary group-hover:translate-x-2 transition-transform duration-300">
                  {item.degree}
                </h3>
              </div>

              <div className="flex flex-col gap-2 text-sm text-muted mb-4 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="opacity-50" />
                  <span>{item.school}</span>
                </div>
                {item.university && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="opacity-50" />
                    <span>{item.university}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted leading-relaxed group-hover:translate-x-2 transition-transform duration-300 delay-100">
                {item.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};