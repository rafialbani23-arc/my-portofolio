"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const oldGalleryLinks = new Set(["#projects", "#certificates", "#cv", "#contact"]);
const galleryUrl = "/portfolio/#projects";
const introUrl = "/#portfolio-intro";

function RouteAnimation({ reverse, revealing, onFinish }: { reverse: boolean; revealing: boolean; onFinish: () => void }) {
  const word = useRef<HTMLSpanElement>(null);
  const letter = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!word.current || !letter.current) return;
    const stem = letter.current.offsetLeft + letter.current.offsetWidth * .19;
    word.current.style.setProperty("--letter-origin", `${stem}px`);
    word.current.style.setProperty("--letter-shift", `${word.current.offsetWidth / 2 - stem}px`);
  }, []);

  return (
    <div className="portfolio-route-transition contours" data-direction={reverse ? "up" : "down"} data-revealing={revealing} aria-hidden="true">
      <span ref={word} className="portfolio-route-word" onAnimationEnd={onFinish}>
        Po<b ref={letter}>r</b>tfolio
      </span>
    </div>
  );
}

export default function PortfolioTransition() {
  const router = useRouter();
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const reverse = pathname === "/portfolio";
  const destination = useRef<URL | null>(null);
  const navigationFallback = useRef<number | undefined>(undefined);
  const [animation, setAnimation] = useState<{ reverse: boolean; revealing: boolean } | null>(null);

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-transition"));
  }, [animation]);

  const openDestination = useCallback(() => {
    const target = destination.current;
    if (!target || navigationFallback.current !== undefined || target.pathname === window.location.pathname) return;
    router.push(target.pathname + target.hash, { scroll: false });
    navigationFallback.current = window.setTimeout(() => window.location.assign(target.href), 3200);
  }, [router]);

  useLayoutEffect(() => {
    const target = destination.current;
    if (!target || !animation || animation.revealing ||
        (target.pathname.replace(/\/$/, "") || "/") !== pathname) return;

    window.clearTimeout(navigationFallback.current);
    navigationFallback.current = undefined;
    const anchor = document.getElementById(target.hash.slice(1));
    if (anchor) {
      const top = anchor.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "instant" });
    }
    let revealFrame = 0;
    const paintFrame = window.requestAnimationFrame(() => {
      revealFrame = window.requestAnimationFrame(() => setAnimation({ ...animation, revealing: true }));
    });
    return () => {
      window.cancelAnimationFrame(paintFrame);
      window.cancelAnimationFrame(revealFrame);
    };
  }, [animation, pathname]);

  useEffect(() => {
    if (!animation?.revealing) return;
    const timer = window.setTimeout(() => {
      destination.current = null;
      setAnimation(null);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [animation]);

  useEffect(() => {
    if (pathname !== "/" && !reverse) return;
    router.prefetch(reverse ? "/" : "/portfolio/");
    const hash = window.location.hash;
    if (!reverse && oldGalleryLinks.has(hash)) {
      window.location.replace(`/portfolio/${hash}`);
      return;
    }

    let timer: number | undefined;
    let armed = false;
    let lastScroll = window.scrollY;
    let touchTop: number | undefined;
    const section = document.getElementById("portfolio-intro");

    function start(href: string) {
      if (destination.current) return;
      const target = new URL(href, window.location.href);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.location.assign(target.href);
        return;
      }
      destination.current = target;
      setAnimation({ reverse, revealing: false });
      timer = window.setTimeout(openDestination, 1120);
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
      if (armed && goingDown && section &&
          section.getBoundingClientRect().top <= window.innerHeight * .12) {
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
      window.clearTimeout(navigationFallback.current);
      navigationFallback.current = undefined;
      armed = false;
      lastScroll = window.scrollY;
      clearTouch();
      window.clearTimeout(timer);
      setAnimation(null);
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
  }, [openDestination, pathname, reverse, router]);

  return animation && <RouteAnimation {...animation} onFinish={openDestination} />;
}
