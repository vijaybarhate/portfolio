import React from 'react';
import { Section } from '../layout/Section';
import { projects } from '../../data/projects';
import { ProjectCard } from '../ui/ProjectCard';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Code & Development">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};
