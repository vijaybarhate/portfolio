export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "sonivio",
    title: "SONIVIO Music Streaming Platform",
    description: "Architected a music streaming platform integrating YouTube Data API v3, featuring a persistent playback state and custom glassmorphic UI.",
    longDescription: "Architected a full-featured music streaming platform using React and TypeScript. Integrated YouTube Data API v3 for real-time search/streaming and implemented Zustand for robust playback state management and persistent queues.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Axios"],
    features: [
      "Real-time API Integration",
      "Persistent State Management",
      "Dynamic Playback Controls",
      "High-Performance UI Engine",
      "Mobile-First Architecture",
      "Responsive Layout System"
    ],
    githubUrl: "https://github.com/vijaybarhate/SONIVIO-Music-Player",
    liveUrl: "https://vijaybarhate.github.io/SONIVIO-Music-Player/"
  },
  {
    id: "result-analyzer",
    title: "Student Result Analyzer",
    description: "Developed a Python-driven analysis suite for 50+ academic records, generating automated statistical insights and performance charts.",
    longDescription: "Developed a comprehensive data analysis pipeline using Pandas and Matplotlib to analyze 50+ academic records. Automated the generation of pass/fail ratios, grade distributions, and subject averages for efficient institutional reporting.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    features: [
      "Automated Analysis Pipeline",
      "Statistical Insight Generation",
      "Data-Driven Visualization",
      "Trend Tracking Systems",
      "Performance Benchmarking",
      "CLI Data Processing"
    ],
    githubUrl: "https://github.com/vijaybarhate/Student-Result-Analyzer"
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker CLI",
    description: "Built a CLI financial management system with MySQL integration, featuring relational table JOINs and automated monthly summaries.",
    longDescription: "Engineered a persistent CLI application for financial management. Optimized MySQL query structures including JOINs for category-wise breakdown and implemented full CRUD operations with input validation and automated reporting.",
    stack: ["Python", "MySQL"],
    features: [
      "Relational Database Design",
      "Optimized SQL Queries",
      "Automated Reporting Engine",
      "Full CRUD Workflows",
      "Data Integrity Validation",
      "Formatted Data Export"
    ],
    githubUrl: "https://github.com/vijaybarhate/Expense-Tracker-SQL"
  },
  {
    id: "fee-management",
    title: "School Fee Management System",
    description: "Engineered a school administration engine managing student/fee transactions across normalized MySQL schemas with transactional integrity.",
    longDescription: "Engineered a school administration engine using Python and MySQL. Managed normalized relational schemas, implemented JOIN queries for complex fee summaries, and integrated a validation system to prevent data duplication.",
    stack: ["Python", "MySQL", "Tabulate"],
    features: [
      "Normalized Schema Design",
      "Relational Data Integrity",
      "Complex JOIN Workflows",
      "Admin Transaction Logic",
      "Input Sanitization System",
      "Data Reporting Layer"
    ],
    githubUrl: "https://github.com/vijaybarhate/School-Fee-Management"
  }
];
