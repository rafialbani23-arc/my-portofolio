"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#141414] transition-all duration-500 hover:border-lime-400/40"
    >
      <div className="relative h-64 overflow-hidden bg-neutral-900 md:h-80">
        {image ? (
          <Image
            src={image}
            alt={`Preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-transform duration-700 ${
              hovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-sm text-neutral-300">Preview pending</span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-8">
        <h3 className="text-3xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-4 leading-relaxed text-neutral-400">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Live Preview ↗
            </Link>
          )}

          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:border-lime-400"
            >
              GitHub ↗
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}