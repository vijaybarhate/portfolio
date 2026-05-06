export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    title: "Generative AI Certification",
    issuer: "EduBridge (Capgemini × SAP × NSDC)",
    date: "Feb 2026"
  },
  {
    title: "Generative AI Mastery Workshop",
    issuer: "OpenAI Academy × NxtWave",
    date: "Sep 2025"
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "Accenture via Forage",
    date: "Jun 2025"
  },
  {
    title: "Python Basics to Brilliance Masterclass",
    issuer: "Ethan’s Tech Solutions",
    date: "Apr 2025"
  },
  {
    title: "AI for Students: Build Your Own Generative AI Model",
    issuer: "NxtWave",
    date: "Dec 2024"
  },
  {
    title: "Machine Learning Training",
    issuer: "Acmegrade × IIT Bombay Mood Indigo",
    date: "Oct 2024"
  },
  {
    title: "Alpha — DSA with Java",
    issuer: "Apna College",
    date: "2023"
  }
];

export const activities = [
  {
    role: "Core Member",
    organization: "Coding Club, Saraswati College of Engineering",
    focus: "Data Analytics & AI/ML focus"
  },
  {
    role: "Participant",
    organization: "Smart India Hackathon (SIH) 2024",
    focus: "National-level government hackathon"
  },
  {
    role: "NCC Cadet",
    organization: "21 MAH BN NCC Wardha",
    focus: "NCC ‘A’ Certificate with Grade A"
  }
];
