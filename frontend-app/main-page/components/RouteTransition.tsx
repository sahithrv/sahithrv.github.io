"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type Direction = "down" | "right" | "up" | "left";

type RouteTransitionProps = {
  direction: Direction;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export default function RouteTransition({ direction }: RouteTransitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      frameRef.current = null;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const start = section.offsetTop - window.innerHeight;
      const travelDistance = Math.max(section.offsetHeight, 1);
      const progress = clamp((window.scrollY - start) / travelDistance);
      const lineProgress = Math.pow(progress, 0.55);
      const horizontalPan =
        direction === "right" ? (0.5 - progress) * 52 : direction === "left" ? (progress - 0.5) * 52 : 0;
      const verticalPan =
        direction === "down" ? (0.5 - progress) * 22 : direction === "up" ? (progress - 0.5) * 22 : 0;

      section.style.setProperty("--route-progress", `${Math.round(progress * 1000) / 10}%`);
      section.style.setProperty("--route-line-progress", `${Math.round(lineProgress * 1000) / 10}%`);
      section.style.setProperty("--route-pan-x", `${Math.round(horizontalPan * 10) / 10}vw`);
      section.style.setProperty("--route-pan-y", `${Math.round(verticalPan * 10) / 10}svh`);
      section.classList.toggle("is-complete", progress >= 0.985);
      section.classList.toggle("is-active", progress > 0.015 && progress < 0.985);
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [direction]);

  return (
    <section
      aria-hidden="true"
      className={`route-transition route-transition--${direction}`}
      ref={sectionRef}
      style={
        {
          "--route-pan-x": "0vw",
          "--route-pan-y": "0svh",
          "--route-line-progress": "0%",
          "--route-progress": "0%"
        } as CSSProperties
      }
    >
      <div className="route-transition__sticky">
        <span className="route-transition__line" />
      </div>
    </section>
  );
}
