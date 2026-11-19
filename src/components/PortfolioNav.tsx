"use client";

import Link from "next/link";
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
  window.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener);
  return () => {
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
  };
}

function getSection() {
  const threshold = Math.min(window.innerHeight * 0.46, 350);
  return sectionsFromBottom.find(({ id }) => {
    const element = document.getElementById(id);
    return element && element.getBoundingClientRect().top <= threshold;
  })?.id ?? "home";
}

export default function PortfolioNav() {
  const pathname = usePathname();
  const section = useSyncExternalStore(subscribe, getSection, () => "home");
  const active = pathname === "/" ? section : pathname.slice(1);

  return (
    <header className="site-header" data-section={active}>
      <nav aria-label="Main navigation">
        <span className="nav-active-track" aria-hidden="true"><span className="nav-sprite" /></span>
        {links.map(({ label, id }) => {
          const current = active === id ? "location" : undefined;
          return pathname === "/" ? (
            <a key={id} href={`#${id}`} aria-current={current}>{label}</a>
          ) : (
            <Link key={id} href={`/#${id}`} aria-current={current}>{label}</Link>
          );
        })}
      </nav>
    </header>
  );
}
