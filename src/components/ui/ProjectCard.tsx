import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/projects';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reduced tilt from 10 -> 4 for technical maturity
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative p-px rounded-[20px] overflow-hidden bg-stroke/50 hover:bg-transparent transition-colors duration-500"
    >
      {/* Gradient Border Reveal */}
      <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full bg-surface rounded-[19px] p-5 md:p-8 flex flex-col z-10 overflow-hidden">
        {/* Decorative Background Icon */}
        <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none hidden sm:block">
          <Github size={120} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-bg border border-stroke text-muted group-hover:text-text-primary group-hover:border-accent/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-xl md:text-3xl font-display italic mb-3 md:mb-4 text-text-primary group-hover:accent-gradient-text transition-all duration-300 line-clamp-2">
            {project.title}
          </h3>

          <p className="text-muted text-xs md:text-sm mb-6 md:mb-8 leading-relaxed max-w-[90%] line-clamp-4 md:line-clamp-none">
            {project.longDescription || project.description}
          </p>

          <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Technical Focus</h4>
            <ul className="grid grid-cols-1 gap-y-2 md:gap-y-3">
              {project.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 md:gap-3 text-[11px] md:text-xs text-muted group-hover:text-text-primary/80 transition-colors">
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-auto">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="w-full gap-2 bg-text-primary text-bg hover:accent-gradient hover:text-text-primary border-none rounded-full px-6 flex items-center justify-center"
              >
                <Github size={16} />
                GitHub
              </Button>
            </motion.div>
            {project.liveUrl && project.liveUrl !== '#' && (
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="w-full gap-2 border-stroke hover:border-text-primary rounded-full px-6 flex items-center justify-center"
                >
                  <ExternalLink size={16} />
                  Demo
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};