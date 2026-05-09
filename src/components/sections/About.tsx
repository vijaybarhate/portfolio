import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { GraduationCap, MapPin } from 'lucide-react';

const education = [
  {
    degree: "B.E. Computer Engineering",
    school: "Saraswati College of Engineering, Kharghar",
    university: "University of Mumbai",
    period: "2023 – 2027",
    details: "Passionate about building practical and data-driven applications."
  },
  {
    degree: "Class XII — CBSE",
    school: "Ambuja Vidya Niketan, Chandrapur",
    period: "2023",
    details: "Computer Science: 89/100 | Percentage: 69.4%"
  },
  {
    degree: "Class X — CBSE",
    school: "Manikgarh Cement Eng. School",
    period: "2021",
    details: "Information Technology: 91/100 | Percentage: 81.8%"
  }
];

export const About: React.FC = () => {
  return (
    <Section id="about" title="About Me" subtitle="Biography & Education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-text-muted text-lg leading-relaxed"
        >
          <p>
            I am a <span className="text-white font-display font-bold">B.E. Computer Engineering student</span> at Saraswati College of Engineering, Mumbai University,
            passionate about building practical and data-driven applications.
          </p>
          <p>
            I enjoy working with <span className="text-magenta font-medium">Python, SQL</span>, and modern development tools to create systems
            that solve real-world problems. My projects focus on data analysis, CRUD applications, automation, and user-friendly interfaces.
          </p>
          <p>
            Currently, I am strengthening my skills in software development, data analysis, and problem solving through
            hands-on learning and personal projects. I am driven by the desire to turn complex data into meaningful insights
            and functional software.
          </p>
        </motion.div>

        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-border group"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-border group-hover:bg-magenta transition-colors" />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-magenta transition-colors">
                  {item.degree}
                </h3>
                <span className="text-xs font-bold text-cyan bg-cyan/10 px-2 py-1 rounded">
                  {item.period}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm text-text-muted mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>{item.school}</span>
                </div>
                {item.university && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{item.university}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                {item.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};