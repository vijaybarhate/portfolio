export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL (MySQL)", "Java", "HTML", "CSS", "JavaScript"]
  },
  {
    title: "Libraries & Tools",
    skills: ["Pandas", "Matplotlib", "Seaborn", "Git", "GitHub", "VS Code", "MySQL Workbench"]
  },
  {
    title: "Concepts",
    skills: ["Data Analysis", "Data Visualization", "CRUD Applications", "DSA", "Agile", "OOP"]
  }
];
