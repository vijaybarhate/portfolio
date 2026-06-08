import React from "react";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { Section } from "../layout/Section";

const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Featured Work" subtitle="Selected Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`${index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"}`}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
