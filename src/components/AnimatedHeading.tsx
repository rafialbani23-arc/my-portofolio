"use client";

import { useEffect, useId, useRef, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  fontSize?: number;
}

export default function AnimatedHeading({
  text,
  className = "",
  fontSize = 100,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [textWidth, setTextWidth] = useState(1200);

  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gradientId = `shine-gradient-${id}`;

  // Mengukur panjang teks agar SVG tidak mengubah ukuran huruf.
  useEffect(() => {
    const measure = () => {
      if (!textRef.current) return;

      const width = textRef.current.getComputedTextLength();

      if (width > 0) {
        setTextWidth(width + 8);
      }
    };

    measure();

    document.fonts?.ready.then(measure);

    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [text, fontSize]);

  // Animasi dimulai saat heading terlihat.
  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-heading ${className}`}
      style={
        {
          "--heading-font-size": `${fontSize}px`,
        } as React.CSSProperties
      }
    >
      <svg
        className="animated-heading-svg"
        viewBox={`0 0 ${textWidth} ${fontSize * 1.25}`}
        role="img"
        aria-label={text}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="42%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#A3E635" />
            <stop offset="58%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />

            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0;1 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Lapisan 1: menggambar garis huruf */}
        <text
          ref={textRef}
          x="4"
          y={fontSize}
          className={`heading-stroke ${
            isVisible ? "start" : ""
          }`}
        >
          {text}
        </text>

        {/* Lapisan 2: mengisi huruf dengan warna putih */}
        <text
          x="4"
          y={fontSize}
          className={`heading-fill ${
            isVisible ? "start" : ""
          }`}
        >
          {text}
        </text>

        {/* Lapisan 3: cahaya menyapu tulisan */}
        <text
          x="4"
          y={fontSize}
          fill={`url(#${gradientId})`}
          className={`heading-shine ${
            isVisible ? "start" : ""
          }`}
        >
          {text}
        </text>
      </svg>

      <style jsx>{`
        .animated-heading {
          display: block;
          width: fit-content;
          max-width: 100%;
        }

        .animated-heading-svg {
          display: block;
          width: auto;
          max-width: 100%;
          height: auto;
          overflow: visible;
        }

        .animated-heading-svg text {
          font-family: inherit;
          font-size: var(--heading-font-size);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .heading-stroke {
          fill: transparent;
          stroke: #a3e635;
          stroke-width: 1.5;
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
        }

        .heading-stroke.start {
          animation: draw-stroke 1.8s ease forwards;
        }

        .heading-fill {
          fill: #ffffff;
          opacity: 0;
        }

        .heading-fill.start {
          animation: reveal-fill 0.8s ease 1.8s forwards;
        }

        .heading-shine {
          opacity: 0;
        }

        .heading-shine.start {
          animation: reveal-shine 0.3s ease 2.6s forwards;
        }

        @keyframes draw-stroke {
          from {
            stroke-dashoffset: 2200;
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes reveal-fill {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes reveal-shine {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heading-stroke {
            stroke-dashoffset: 0;
          }

          .heading-fill {
            opacity: 1;
          }

          .heading-shine {
            opacity: 0;
          }

          .heading-stroke.start,
          .heading-fill.start,
          .heading-shine.start {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}