import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { certifications, activities } from '../../data/certifications';
import { Award, Briefcase, CheckCircle2 } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <Section id="certifications" title="Achievements" subtitle="Growth & Recognition">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Certifications List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
            <Award className="text-accent" />
            Certifications & Courses
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass p-5 rounded-2xl flex items-start gap-4 hover:border-accent/30 transition-colors"
              >
                <div className="mt-1">
                  <CheckCircle2 size={18} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text mb-1">{cert.title}</h4>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{cert.issuer}</p>
                  <p className="text-[10px] text-accent font-bold uppercase">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
            <Briefcase className="text-accent-secondary" />
            Extracurricular Activities
          </h3>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.organization}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-accent-secondary/30 group"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-secondary/20 border border-accent-secondary/50 group-hover:bg-accent-secondary transition-colors" />
                <h4 className="text-xl font-bold mb-1">{activity.role}</h4>
                <p className="text-sm font-bold text-accent-secondary/80 mb-2 uppercase tracking-wide">
                  {activity.organization}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {activity.focus}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
