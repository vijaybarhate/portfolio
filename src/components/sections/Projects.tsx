import React from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-bg py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em] block mb-4">
            SELECTED WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary">
            Featured <span className="text-muted">*projects*</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => {
            const colSpan = index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";
            const gradientClass = 
              index === 0 ? "from-[#1a1a1a] to-[#4E85BF]" :
              index === 1 ? "from-[#1a1a1a] to-[#2ecc71]" :
              index === 2 ? "from-[#1a1a1a] to-[#f1c40f]" :
              "from-[#1a1a1a] to-[#e74c3c]";

            return (
              <motion.a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${colSpan} group relative bg-surface border border-stroke rounded-3xl overflow-hidden h-[400px] flex flex-col`}
              >
                {/* Background Gradient Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/40 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 z-10 flex items-center justify-center">
                  <div className="px-6 py-2 rounded-full bg-text-primary text-bg text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-display italic">
                    View — *{project.title}*
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-20 mt-auto p-8 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] uppercase tracking-wider text-muted px-2 py-1 rounded-full border border-stroke bg-bg/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2 max-w-md">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
