"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

const categories = ["Projects", "Certificates", "CV"] as const;
type Category = (typeof categories)[number];

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

function getCategory(): Category {
  if (window.location.hash === "#certificates") return "Certificates";
  if (window.location.hash === "#cv") return "CV";
  return "Projects";
}

export default function PortfolioGallery({
  projects,
  certificates,
  cv,
}: { projects: ReactNode; certificates: ReactNode; cv: ReactNode }) {
  const current = useSyncExternalStore(subscribe, getCategory, () => "Projects");
  const carousel = useRef<HTMLDivElement>(null);

  function moveCarousel(direction: number) {
    const track = carousel.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap) });
  }

  function focusTab(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? categories.length - 1 :
      (index + (event.key === "ArrowLeft" ? -1 : 1) + categories.length) % categories.length;
    const tab = event.currentTarget.parentElement?.querySelectorAll("a")[next];
    tab?.focus();
    tab?.click();
  }

  return (
    <>
      <div className="gallery-tabs" role="tablist" aria-label="Portfolio categories" data-category={current}>
        <span className="gallery-tab-track" aria-hidden="true" />
        {categories.map((category, index) => (
          <a
            key={category}
            id={`tab-${category.toLowerCase()}`}
            href={`#${category.toLowerCase()}`}
            role="tab"
            aria-selected={current === category}
            aria-controls="gallery-panel"
            tabIndex={current === category ? 0 : -1}
            onKeyDown={(event) => focusTab(event, index)}
          >
            <span aria-hidden="true">{["‹/›", "▤", "▱"][index]}</span>
            {category}
          </a>
        ))}
      </div>
      <div key={current} id="gallery-panel" className="gallery-panel" role="tabpanel" aria-labelledby={`tab-${current.toLowerCase()}`}>
        {current !== "CV" ? (
          <>
            <button className="carousel-arrow previous" type="button" aria-label={`Previous in ${current}`} onClick={() => moveCarousel(-1)}>‹</button>
            <div className="project-grid" ref={carousel} tabIndex={0} aria-label={current}>{current === "Projects" ? projects : certificates}</div>
            <button className="carousel-arrow next" type="button" aria-label={`Next in ${current}`} onClick={() => moveCarousel(1)}>›</button>
          </>
        ) : cv}
      </div>
    </>
  );
}
