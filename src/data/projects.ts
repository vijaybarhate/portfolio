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
    id: "jamify",
    title: "Jamify Music Player",
    description: "A modern web-based music player with dark mode UI and YouTube integration.",
    longDescription: "Designed a web-based music player with dark mode UI, favorites system, recent searches, track info display, and YouTube link integration.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Dark Mode Interface",
      "Favorites System",
      "Recent Searches",
      "Track Info Display",
      "YouTube Integration",
      "Responsive Design"
    ],
    githubUrl: "https://github.com/vijaybarhate/Jamify-Music-Player", // Placeholder, adjust if needed
    liveUrl: "#"
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
