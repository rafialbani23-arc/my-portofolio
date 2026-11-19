import SkillCard from "../../components/SkillCard";
import StrokeText from "../../components/StrokeText";

const skills = [
  {
    name: "HTML5",
    category: "Frontend Development",
    description: "Building structured and accessible web pages.",
    icon: "🌐",
    className: "md:col-span-2",
  },
  {
    name: "CSS3",
    category: "Frontend Development",
    description: "Creating responsive layouts and modern visual experiences.",
    icon: "🎨",
    className: "",
  },
  {
    name: "JavaScript",
    category: "Programming Language",
    description: "Developing interactive and dynamic web applications.",
    icon: "⚡",
    className: "",
  },
  {
    name: "Laravel",
    category: "Backend Framework",
    description: "Building web applications using PHP and Laravel.",
    icon: "🔴",
    className: "md:col-span-2",
  },
  {
    name: "PHP",
    category: "Backend Development",
    description: "Developing server-side functionality for web applications.",
    icon: "🐘",
    className: "",
  },
  {
    name: "React",
    category: "Frontend Library",
    description: "Learning component-based user interfaces.",
    icon: "⚛️",
    className: "",
  },
  {
    name: "Next.js",
    category: "Fullstack Framework",
    description: "Exploring modern React applications with Next.js.",
    icon: "▲",
    className: "md:col-span-2",
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 pb-24 pt-40 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-lime-400">
            02 / My Expertise
          </p>

          {/* Animated Heading */}
          <h1 className="relative mb-8 max-w-full text-left">
            <StrokeText
              text="Skills & Technologies."
              fontSize={100}
              fontWeight={800}
              strokeColor="#A3E635"
              fillColor="#FFFFFF"
              strokeWidth={1.5}
              drawDuration={1.8}
              fillDelay={0.2}
              stagger={0.05}
              trigger="scroll"
              fillMode="wipe"
            />
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Technologies I use and explore to build modern,
            functional, and visually engaging digital experiences.
          </p>

        </div>

        {/* Interactive Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              category={skill.category}
              description={skill.description}
              icon={skill.icon}
              className={skill.className}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 border-t border-white/10 pt-10">

          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Always Learning
          </p>

          <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-snug md:text-5xl">
            Every line of code is an opportunity to
            <span className="text-lime-400"> grow.</span>
          </h2>

        </div>

      </div>
    </main>
  );
}