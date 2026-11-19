export type Project = {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    title: "MasjidKu",
    image: "/images/projects/masjidku.webp",
    description: "A mosque finance app for recording income and expenses, managing mosque profiles, and downloading monthly reports.",
    technologies: ["Laravel", "Inertia.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "DuitKita",
    image: "/images/projects/duitkita.webp",
    description: "A personal finance app for tracking income and expenses, setting budgets, and viewing spending statistics. Data is saved in the browser.",
    technologies: ["HTML", "CSS", "JavaScript", "localStorage"],
  },
  {
    title: "E-Library",
    image: "/images/projects/e-library.webp",
    description: "A school library app where students browse books, save favorites, and track loans. Administrators manage the catalog and borrowing records.",
    technologies: ["Laravel", "Livewire", "Blade", "Tailwind CSS"],
  },
  {
    title: "E-Report",
    image: "/images/projects/e-report.webp",
    description: "A public reporting platform where residents submit reports and track their status. Administrators review reports and manage user accounts.",
    technologies: ["Laravel", "Blade", "Tailwind CSS"],
  },
  {
    title: "Laravel Blog",
    image: "/images/projects/laravel-blog.webp",
    description: "A blogging platform for reading and publishing articles, with an admin panel for managing posts and users.",
    technologies: ["Laravel", "Livewire", "Tailwind CSS"],
  },
  {
    title: "Apex Todo",
    image: "/images/projects/apex-todo.webp",
    description: "A task manager for creating, editing, and organizing tasks, with a dashboard that tracks completion.",
    technologies: ["Laravel", "Blade", "Tailwind CSS", "SQLite"],
  },
  {
    title: "KampusKit",
    image: "/images/projects/kampuskit.png",
    description: "A student productivity platform for managing tasks, class schedules, notes, deadline reminders, and academic targets.",
    technologies: ["Laravel", "Blade", "Tailwind CSS"],
  },
  {
    title: "My-Properti",
    image: "/images/projects/my-properti.webp",
    description: "A real estate website for buying, selling, and renting property, with a filterable catalog and an inquiry form that opens an email draft.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];
