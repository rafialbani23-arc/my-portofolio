"use client";

import { useEffect, useRef, useState } from "react";

const sectionLinks = new Set(["#projects", "#certificates", "#cv", "#contact"]);
const portfolioUrl = "/portfolio/#projects";

export default function PortfolioTransition() {
  const section = useRef<HTMLElement>(null);
  const destination = useRef<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const navigating = useRef(false);

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-transition"));
  }, [playing]);

  function openPortfolio() {
    if (!destination.current || navigating.current) return;
    navigating.current = true;
    window.location.assign(destination.current);
  }

  useEffect(() => {
    const hash = window.location.hash;
    if (sectionLinks.has(hash)) {
      window.location.replace(`/portfolio/${hash}`);
      return;
    }

    let timer: number | undefined;
    let armed = false;
    let lastScroll = window.scrollY;

    function start(href: string) {
      if (destination.current) return;
      destination.current = href;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        openPortfolio();
        return;
      }
      setPlaying(true);
      timer = window.setTimeout(openPortfolio, 1550);
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element && event.target.closest<HTMLAnchorElement>("a[data-portfolio-entry]");
      if (!link || link.target) return;
      event.preventDefault();
      start(link.href);
    }

    function onScroll() {
      const next = window.scrollY;
      const enteringFromAbove = next > lastScroll &&
        section.current && section.current.getBoundingClientRect().top <= window.innerHeight * .12;
      lastScroll = next;
      if (armed && enteringFromAbove) start(portfolioUrl);
    }

    function armFromKeyboard(event: KeyboardEvent) {
      if (!event.defaultPrevented && ["ArrowDown", "PageDown", "End", " "].includes(event.key)) armed = true;
    }

    function armFromPointer() {
      armed = true;
    }

    function resetOnReturn(event: PageTransitionEvent) {
      if (!event.persisted) return;
      destination.current = null;
      navigating.current = false;
      armed = false;
      lastScroll = window.scrollY;
      window.clearTimeout(timer);
      setPlaying(false);
    }

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", armFromPointer, { passive: true });
    window.addEventListener("touchmove", armFromPointer, { passive: true });
    window.addEventListener("keydown", armFromKeyboard);
    window.addEventListener("pageshow", resetOnReturn);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", armFromPointer);
      window.removeEventListener("touchmove", armFromPointer);
      window.removeEventListener("keydown", armFromKeyboard);
      window.removeEventListener("pageshow", resetOnReturn);
    };
  }, []);

  return (
    <>
      <section ref={section} id="portfolio-intro" className="portfolio-transition contours">
        <a href={portfolioUrl} data-portfolio-entry className="portfolio-transition-title">Portfolio</a>
      </section>
      {playing && (
        <div className="portfolio-route-transition contours" aria-hidden="true">
          <span onAnimationEnd={openPortfolio}>Portfolio</span>
        </div>
      )}
    </>
  );
}
