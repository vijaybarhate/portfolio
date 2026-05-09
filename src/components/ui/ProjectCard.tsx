import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/projects';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card rounded-[15px] p-6 md:p-8 hover:border-magenta/50 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Github size={80} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-cyan/10 text-magenta border border-magenta/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-magenta transition-colors">
          {project.title}
        </h3>

        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          {project.longDescription || project.description}
        </p>

        <div className="space-y-3 mb-8">
          <h4 className="text-xs uppercase tracking-[0.2em] text-magenta/80 font-bold">Key Features</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-magenta" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4 mt-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="gap-2"
          >
            <Github size={16} />
            GitHub
          </Button>
          {project.liveUrl && project.liveUrl !== '#' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="gap-2"
            >
              <ExternalLink size={16} />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};