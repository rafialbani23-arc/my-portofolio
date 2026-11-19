"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";

type SkillCardProps = {
  name: string;
  category: string;
  description: string;
  icon: string;
  className?: string;
};

export default function SkillCard({
  name,
  category,
  description,
  icon,
  className = "",
}: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - y) * 12,
      y: (x - 0.5) * 12,
    });

    setGlow({
      x: x * 100,
      y: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`group relative min-h-[240px] ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#141414] p-8 transition-[transform,border-color] duration-200 ease-out hover:border-lime-400/40"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Cursor Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(
              350px circle at ${glow.x}% ${glow.y}%,
              rgba(163,230,53,0.15),
              transparent 70%
            )`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-8 text-5xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          <div className="mt-auto">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-lime-400">
              {category}
            </p>

            <h3 className="text-2xl font-semibold text-white">
              {name}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}