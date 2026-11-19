"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const oldGalleryLinks = new Set(["#projects", "#certificates", "#cv", "#contact"]);
const galleryUrl = "/portfolio/#projects";
const introUrl = "/#portfolio-intro";

function RouteAnimation({ reverse, onFinish }: { reverse: boolean; onFinish: () => void }) {
  const word = useRef<HTMLSpanElement>(null);
  const letter = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!word.current || !letter.current) return;
    const stem = letter.current.offsetLeft + letter.current.offsetWidth * .19;
    word.current.style.setProperty("--letter-origin", `${stem}px`);
    word.current.style.setProperty("--letter-shift", `${word.current.offsetWidth / 2 - stem}px`);
  }, []);

  return (
    <div className="portfolio-route-transition contours" data-direction={reverse ? "up" : "down"} aria-hidden="true">
      <span ref={word} className="portfolio-route-word" onAnimationEnd={onFinish}>
        Po<b ref={letter}>r</b>tfolio
      </span>
    </div>
  );
}

export default function PortfolioTransition({ reverse = false }: { reverse?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const destination = useRef<string | null>(null);
  const navigating = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-transition"));
  }, [playing]);

  function openDestination() {
    if (!destination.current || navigating.current) return;
    navigating.current = true;
    window.location.assign(destination.current);
  }

  useEffect(() => {
    const hash = window.location.hash;
    if (!reverse && oldGalleryLinks.has(hash)) {
      window.location.replace(`/portfolio/${hash}`);
      return;
    }

    let timer: number | undefined;
    let armed = false;
    let lastScroll = window.scrollY;
    let touchTop: number | undefined;

    function start(href: string) {
      if (destination.current) return;
      destination.current = href;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        openDestination();
        return;
      }
      setPlaying(true);
      timer = window.setTimeout(openDestination, 1450);
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
      const goingDown = next > lastScroll;
      lastScroll = next;
      if (armed && goingDown && section.current &&
          section.current.getBoundingClientRect().top <= window.innerHeight * .12) {
        start(galleryUrl);
      }
    }

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey) return;
      if (reverse) {
        if (window.scrollY <= 2 && event.deltaY < 0 && -event.deltaY > Math.abs(event.deltaX)) start(introUrl);
      } else if (event.deltaY > 0) {
        armed = true;
      }
    }

    function onTouchStart(event: TouchEvent) {
      if (reverse && window.scrollY <= 2 && event.touches.length === 1) {
        touchTop = event.touches[0].clientY;
      }
    }

    function onTouchMove(event: TouchEvent) {
      if (!reverse) {
        armed = true;
      } else if (touchTop !== undefined && event.touches.length === 1 &&
                 window.scrollY <= 2 && event.touches[0].clientY - touchTop > 48) {
        start(introUrl);
      }
    }

    function clearTouch() {
      touchTop = undefined;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
          (event.target instanceof Element && event.target.closest("input, textarea, select, button, [contenteditable]"))) return;
      if (reverse) {
        const goingUp = ["ArrowUp", "PageUp", "Home"].includes(event.key) || (event.key === " " && event.shiftKey);
        if (goingUp && window.scrollY <= 2) start(introUrl);
      } else if (["ArrowDown", "PageDown", "End"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
        armed = true;
      }
    }

    function resetOnReturn(event: PageTransitionEvent) {
      if (!event.persisted) return;
      destination.current = null;
      navigating.current = false;
      armed = false;
      lastScroll = window.scrollY;
      clearTouch();
      window.clearTimeout(timer);
      setPlaying(false);
    }

    if (!reverse) {
      document.addEventListener("click", onClick);
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", clearTouch);
    window.addEventListener("touchcancel", clearTouch);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pageshow", resetOnReturn);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", clearTouch);
      window.removeEventListener("touchcancel", clearTouch);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pageshow", resetOnReturn);
    };
  }, [reverse]);

  return (
    <>
      {!reverse && (
        <section ref={section} id="portfolio-intro" className="portfolio-transition contours">
          <a href={galleryUrl} data-portfolio-entry className="portfolio-transition-title">Portfolio</a>
        </section>
      )}
      {playing && <RouteAnimation reverse={reverse} onFinish={openDestination} />}
    </>
  );
}
