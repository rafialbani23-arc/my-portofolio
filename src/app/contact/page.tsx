
"use client";

import { useEffect, useState } from "react";
import StrokeText from "../../components/StrokeText";
import { socials } from "../../data/socials";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const github = socials.github.href;

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyGithub = async () => {
    try {
      await navigator.clipboard.writeText(github);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy GitHub URL:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] px-6 pb-24 pt-36 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
            <span className="text-xs uppercase tracking-widest text-white/60">
              Available for Collaboration
            </span>
          </div>

          {/* ANIMATED HEADING */}
          <h1 className="max-w-5xl">
            <span className="block">
              <StrokeText
                text="Let's Build"
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
            </span>

            <span className="mt-2 block">
              <StrokeText
                text="Something Great."
                fontSize={100}
                fontWeight={800}
                strokeColor="#FFFFFF"
                fillColor="#A3E635"
                shineColor="#FFFFFF"
                strokeWidth={1.5}
                drawDuration={1.8}
                fillDelay={0.2}
                stagger={0.05}
                trigger="scroll"
                fillMode="wipe"
              />
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/45">
            Have an exciting project, creative idea, or opportunity?
            I&apos;m always interested in building meaningful digital
            experiences and connecting with passionate people.
          </p>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* GITHUB */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-9 transition-all duration-500 hover:border-lime-400/40 hover:bg-[#151515]"
          >
            <div className="mb-16 flex items-center justify-between">
              <span className="text-sm text-white/40">
                01 / GitHub
              </span>

              <span className="text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </div>

            <h2 className="text-4xl font-medium tracking-tight">
              Explore My Code.
            </h2>

            <p className="mt-4 text-sm text-white/40">
              Discover my projects, experiments, and development journey.
            </p>

            <div className="mt-10 text-sm text-lime-400">
              {socials.github.display}
            </div>
          </a>

          {/* COLLABORATION */}
          <div className="group relative overflow-hidden rounded-3xl border border-lime-400/20 bg-lime-400 p-9 text-black transition-all duration-500 hover:bg-lime-300">
            <div className="mb-16 flex items-center justify-between">
              <span className="text-sm text-black/50">
                02 / Collaboration
              </span>

              <span className="text-3xl">✳</span>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight">
              Have an Idea?
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
              Great things start with a conversation.
              Let&apos;s connect and create something extraordinary.
            </p>

            <button
              type="button"
              onClick={copyGithub}
              className="mt-10 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
            >
              {copied
                ? "Copied Successfully ✓"
                : "Copy GitHub Profile ↗"}
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[socials.instagram, socials.whatsapp].map(({ label, display, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="rounded-3xl border border-white/10 bg-[#111111] px-9 py-6 transition-colors hover:border-lime-400/40">
              <span className="block font-medium">{label}</span>
              <span className="mt-2 block text-sm text-lime-400">{display}</span>
            </a>
          ))}
        </div>

        {/* FOOTER SECTION */}
        <div className="mt-24 flex flex-col justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">
              The Next Chapter
            </p>

            <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
              Your idea. My code.
              <br />
              <span className="text-white/30">
                Our next project.
              </span>
            </h3>
          </div>

          <div className="text-sm text-white/30">
            © 2026 Rafi Albani. All rights reserved.
            <br />
            Designed &amp; Built with Passion.
          </div>
        </div>
      </div>
    </main>
  );
}
