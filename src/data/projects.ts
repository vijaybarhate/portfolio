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
    description: "Premium music streaming platform built with Astro Islands architecture, Zustand state management, and a secure YouTube API proxy supporting persistent playback, playlists, favorites, and listening history.",
    longDescription: "Architected a premium music streaming platform utilizing Astro Islands (partial hydration) and View Transitions to ensure continuous, persistent audio playback during page navigation. Designed a secure serverless API proxy on Cloudflare Pages to query YouTube Data API v3 without exposing developer keys, and built decoupled Zustand global stores with virtual list scrolling.",
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    features: [
      "Astro Islands & SSR Mode",
      "Continuous Playback System",
      "Secure Serverless API Proxy",
      "Decoupled Zustand Architecture",
      "Virtual List Scrolling (60FPS)",
      "Time-Based Dynamic Greetings"
    ],
    githubUrl: "https://github.com/vijaybarhate/SONIVIO-Music-Player",
    liveUrl: "https://vijaybarhate.github.io/SONIVIO-Music-Player/"
  },
  {
    id: "result-analyzer",
    title: "Student Result Analyzer",
    description: "Python-based academic data analysis suite that automatically generates realistic student records and produces publication-ready visualization charts and reports.",
    longDescription: "Developed a Python data analysis pipeline utilizing Pandas to process multi-subject academic records. Integrates Matplotlib and Seaborn to automatically generate grade distributions, pass/fail ratios, and performance metrics, exporting them as high-quality PNG reports.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    features: [
      "Synthetic Dataset Generator",
      "Statistical Analysis Engine",
      "Multi-Chart Visual Report (PNG)",
      "Academic Performance Tracking",
      "Grade Distribution Analysis",
      "CLI Report Automation"
    ],
    githubUrl: "https://github.com/vijaybarhate/Student-Result-Analyzer"
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker CLI",
    description: "Command-line expense management application built with Python and MySQL, featuring paginated data grids, monthly budget threshold alerts, and CSV exports.",
    longDescription: "Engineered a terminal financial tracker using Python and a persistent MySQL database. Features a robust CRUD workflow, custom SQL JOIN queries for category-wise breakdowns, paginated tabulate layouts, budget threshold warnings, and automated CSV backups.",
    stack: ["Python", "MySQL", "Tabulate", "Dotenv"],
    features: [
      "Full CRUD Transaction Operations",
      "Paginated Terminal Output",
      "Monthly Budget Alert System",
      "Category & Date Range Filtering",
      "Automated CSV Export Engine",
      "Optimized Relational Queries"
    ],
    githubUrl: "https://github.com/vijaybarhate/Expense-Tracker-SQL"
  },
  {
    id: "fee-management",
    title: "School Fee Management System",
    description: "School fee administration CLI engine built with Python and MySQL that manages student enrollment and logs month-based payment transactions.",
    longDescription: "Developed a command-line administration system managing student profile records and financial transactions. Utilizes Python and MySQL to handle normalized database tables, advanced multi-criteria searches, payment duplicate checks, and structured tabulated reports.",
    stack: ["Python", "MySQL", "Tabulate", "Pyfiglet"],
    features: [
      "Multi-Criteria Student Search",
      "Normalized Database Transactions",
      "Payment Duplicate Prevention",
      "Month-Based Fee Tracking",
      "Input Validation & Safety Prompts",
      "Tabulated Administration Console"
    ],
    githubUrl: "https://github.com/vijaybarhate/School-Fee-Management"
  }
];
