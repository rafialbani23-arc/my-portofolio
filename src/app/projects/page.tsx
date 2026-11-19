import ProjectCard from "../../components/ProjectCard";
import StrokeText from "../../components/StrokeText";

import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 pb-24 pt-40 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-lime-400">
            03 / Selected Work
          </p>

          {/* Animated Heading */}
          <h1 className="relative mb-8 max-w-full text-left">
            <StrokeText
              text="Featured Projects"
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
            A collection of projects where I explore software
            engineering, creative design, and modern web technologies.
          </p>

        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 border-t border-white/10 pt-10">

          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            More to Come
          </p>

          <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-snug md:text-5xl">
            Always exploring.
            <span className="text-lime-400"> Always building.</span>
          </h2>

        </div>

      </div>
    </main>
  );
}