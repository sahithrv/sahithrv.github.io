"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useRef } from "react";

type RouteItem = {
  href: string;
  label: string;
  prompt: string;
  image: string;
  className: string;
};

const commandRoutes: RouteItem[] = [
  {
    href: "#about",
    label: "About",
    prompt: "Case file",
    image: "/images/graphics/landingPageButton1.svg",
    className: "command-button--up"
  },
  {
    href: "#projects",
    label: "Projects",
    prompt: "Build log",
    image: "/images/graphics/landingPageButton2.svg",
    className: "command-button--right"
  },
  {
    href: "#education",
    label: "Education",
    prompt: "Training file",
    image: "/images/graphics/landingPageButton3.svg",
    className: "command-button--down"
  },
  {
    href: "#skills",
    label: "Skills",
    prompt: "Loadout",
    image: "/images/graphics/landingPageButton4.svg",
    className: "command-button--down-left"
  },
  {
    href: "#travel",
    label: "Travel",
    prompt: "Memory wall",
    image: "/images/graphics/landingPageButton1.svg",
    className: "command-button--left"
  },
  {
    href: "#contact",
    label: "Contact",
    prompt: "Final note",
    image: "/images/graphics/landingPageButton2.svg",
    className: "command-button--right"
  }
];

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export default function HeroCommandMap() {
  const scrollAnimationRef = useRef<number | null>(null);

  function animateScrollTo(targetTop: number) {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = Math.min(3600, Math.max(900, Math.abs(distance) * 0.42));
    let startTime = 0;

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const step = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = clamp(elapsed / duration);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startTop + distance * easedProgress);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  }

  function handleRouteClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, "", href);

    if (prefersReducedMotion) {
      window.scrollTo(0, top);
      return;
    }

    animateScrollTo(top);
  }

  return (
    <div className="command-map reveal-pop" aria-label="Portfolio section routes">
      {commandRoutes.map((route, index) => (
        <a
          className={`command-button ${route.className}`}
          href={route.href}
          key={route.href}
          onClick={(event) => handleRouteClick(event, route.href)}
          style={
            {
              "--button-image": `url("${route.image}")`,
              "--command-index": index
            } as CSSProperties
          }
        >
          <span className="command-button__prompt">{route.prompt}</span>
          <strong>{route.label}</strong>
        </a>
      ))}
    </div>
  );
}
