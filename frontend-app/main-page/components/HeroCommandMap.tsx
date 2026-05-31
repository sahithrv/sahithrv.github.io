"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

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
    href: "/interests",
    label: "Interests",
    prompt: "Off-duty",
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
  const router = useRouter();
  const [isLaunchingInterests, setIsLaunchingInterests] = useState(false);
  const launchTimeoutRef = useRef<number | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (launchTimeoutRef.current !== null) {
        window.clearTimeout(launchTimeoutRef.current);
      }
    };
  }, []);

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

    if (!href.startsWith("#")) {
      event.preventDefault();

      if (isLaunchingInterests) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }

      setIsLaunchingInterests(true);
      launchTimeoutRef.current = window.setTimeout(() => {
        router.push(href);
      }, 1460);

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
    <>
      <div className="command-map reveal-pop" aria-label="Portfolio section routes">
        {commandRoutes.map((route, index) => (
          <a
            aria-disabled={route.href === "/interests" && isLaunchingInterests}
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

      {isLaunchingInterests && typeof document !== "undefined" ? createPortal(
        <div className="interest-launch" role="status" aria-live="assertive">
          <span className="sr-only">Opening interests page</span>
          <span className="interest-launch__line interest-launch__line--one" aria-hidden="true" />
          <span className="interest-launch__line interest-launch__line--two" aria-hidden="true" />
          <div className="interest-launch__copy" aria-hidden="true">
            <span>Off-duty route</span>
            <strong>Interests</strong>
          </div>
          <div className="interest-launch__lanes" aria-hidden="true">
            <span className="interest-launch__lane interest-launch__lane--basketball">
              <i />
              <b>Basketball</b>
            </span>
            <span className="interest-launch__lane interest-launch__lane--gaming">
              <i />
              <b>Gaming</b>
            </span>
            <span className="interest-launch__lane interest-launch__lane--travel">
              <i />
              <b>Travel</b>
            </span>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
