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
    title: "SONIVIO Music Player",
    description: "A modern, futuristic music streaming web app using YouTube Data API v3 with glassmorphism design.",
    longDescription: "SONIVIO is a modern, fast, and beautiful music streaming web app that uses the YouTube Data API v3 to search and play music. Built with React, TypeScript, and Tailwind CSS, it focuses on smooth animations, responsive design, and excellent performance.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Axios"],
    features: [
      "YouTube API Integration",
      "Search & Stream Music",
      "Persistent Playback Queue",
      "Play/Pause/Skip Controls",
      "Volume & Seek Bar",
      "Smooth Animations",
      "Glassmorphism Design",
      "Mobile Responsive"
    ],
    githubUrl: "https://github.com/vijaybarhate/SONIVIO-Music-Player",
    liveUrl: "https://vijaybarhate.github.io/SONIVIO-Music-Player/"
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker with SQL",
    description: "CLI expense management application with MySQL integration and monthly summaries.",
    longDescription: "Developed a CLI expense tracking app with full CRUD operations, category-wise breakdown, monthly summaries, and persistent MySQL storage.",
    stack: ["Python", "MySQL"],
    features: [
      "Full CRUD Operations",
      "Category Filtering",
      "Monthly Reports",
      "Persistent MySQL Storage",
      "Formatted Table Output",
      "Search Functionality"
    ],
    githubUrl: "https://github.com/vijaybarhate/Expense-Tracker-SQL"
  },
  {
    id: "result-analyzer",
    title: "Student Result Analyzer",
    description: "Python-based data analysis project generating visual charts and statistical insights.",
    longDescription: "Built a data analysis pipeline generating and analyzing 50+ student records with grades, pass/fail ratio, and subject averages.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    features: [
      "Data Analysis Pipeline",
      "Grade Distribution Charts",
      "Pass/Fail Analytics",
      "Subject Average Analysis",
      "Data Visualization",
      "CLI Support"
    ],
    githubUrl: "https://github.com/vijaybarhate/Student-Result-Analyzer"
  },
  {
    id: "fee-management",
    title: "School Fee Management System",
    description: "School admin CLI tool for managing student records and fee transactions using MySQL.",
    longDescription: "Built a school admin CLI tool managing student records and fees across 2 relational MySQL tables with JOIN queries and fee summary per student.",
    stack: ["Python", "MySQL", "Tabulate"],
    features: [
      "Student Record Management",
      "Fee Tracking",
      "JOIN Queries",
      "Validation System",
      "Duplicate Prevention",
      "Error Handling"
    ],
    githubUrl: "https://github.com/vijaybarhate/School-Fee-Management"
  }
];
