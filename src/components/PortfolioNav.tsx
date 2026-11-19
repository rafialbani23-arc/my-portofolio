"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Portfolio", id: "projects" },
  { label: "Contact", id: "contact" },
];
const sectionsFromBottom = links.slice().reverse();

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  window.addEventListener("portfolio-transition", listener);
  window.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener);
  return () => {
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("portfolio-transition", listener);
    window.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
  };
}

function getSection() {
  if (document.querySelector(".portfolio-route-transition")) return "projects";
  const threshold = Math.min(window.innerHeight * 0.46, 350);
  const intro = document.getElementById("portfolio-intro");
  if (intro && intro.getBoundingClientRect().top <= threshold) return "projects";
  return sectionsFromBottom.find(({ id }) => {
    const element = document.getElementById(id);
    return element && element.getBoundingClientRect().top <= threshold;
  })?.id ?? "home";
}

export default function PortfolioNav() {
  const pathname = usePathname();
  const section = useSyncExternalStore(subscribe, getSection, () => "home");
  const isPortfolio = pathname.replace(/\/$/, "") === "/portfolio";
  const active = isPortfolio
    ? (section === "contact" ? "contact" : "projects")
    : pathname === "/"
      ? section
      : pathname.slice(1);

  return (
    <header className="site-header" data-section={active} data-surface={isPortfolio || pathname.startsWith("/contact") ? "light" : undefined}>
      <nav aria-label="Main navigation">
        <span className="nav-active-track" aria-hidden="true"><span className="nav-sprite" /></span>
        {links.map(({ label, id }) => {
          const current = active === id ? "location" : undefined;
          if (id === "projects" || id === "contact") {
            const href = isPortfolio ? `#${id}` : `/portfolio/#${id}`;
            return <a key={id} href={href} data-portfolio-entry={id === "projects" && pathname === "/" ? true : undefined} aria-current={current}>{label}</a>;
          }
          const href = `${pathname === "/" ? "" : "/"}#${id}`;
          return <a key={id} href={href} aria-current={current}>{label}</a>;
        })}
      </nav>
    </header>
  );
}
