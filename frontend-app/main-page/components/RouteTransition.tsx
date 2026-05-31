"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type Direction = "down" | "right" | "up" | "left";

type RouteTransitionProps = {
  direction: Direction;
  nextKicker?: string;
  nextTitle?: string;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export default function RouteTransition({ direction, nextKicker, nextTitle }: RouteTransitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const metricsRef = useRef({
    activationEnd: 0,
    activationStart: 0,
    distance: 1,
    start: 0
  });
  const lastStyleRef = useRef({
    coverScale: "",
    nextOpacity: "",
    nextTilt: "",
    nextX: "",
    trackTransform: "",
    transform: ""
  });
  const isSideways = direction === "right" || direction === "left";

  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const offsetTop = section.offsetTop;
      const distance = Math.max(section.offsetHeight, 1);

      metricsRef.current = {
        activationEnd: offsetTop + distance + viewportHeight * 0.45,
        activationStart: offsetTop - viewportHeight * 1.35,
        distance,
        start: offsetTop - viewportHeight
      };
    };

    const updateProgress = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      const line = lineRef.current;

      if (!section || !sticky || !track || !line) {
        return;
      }

      const { activationEnd, activationStart, distance, start } = metricsRef.current;
      const scrollY = window.scrollY;
      const nextSection = isSideways ? (section.nextElementSibling as HTMLElement | null) : null;

      if (scrollY < activationStart || scrollY > activationEnd) {
        if (scrollY > activationEnd && nextSection) {
          nextSection.style.setProperty("--cube-enter-x", "0vw");
          nextSection.style.setProperty("--cube-enter-tilt", "0deg");
          nextSection.style.setProperty("--cube-enter-opacity", "1");
        }

        return;
      }

      const progress = clamp((scrollY - start) / distance);
      const lineProgress = progress;
      const horizontalPan =
        direction === "right" || direction === "left"
          ? 0
          : direction === "up"
            ? (progress - 0.5) * 12
            : 0;
      const verticalPan =
        direction === "down" ? (0.5 - progress) * 22 : direction === "up" ? (progress - 0.5) * 22 : 0;
      const transform = `translate3d(${Math.round(horizontalPan * 10) / 10}vw, ${
        Math.round(verticalPan * 10) / 10
      }svh, 0)`;
      const trackOffset =
        direction === "right" ? -progress * 100 : direction === "left" ? progress * 100 : 0;
      const trackTransform = `translate3d(${Math.round(trackOffset * 10) / 10}vw, 0, 0)`;
      const coverScale = `${Math.round((1 - lineProgress) * 1000) / 1000}`;
      const transitionBottom = start + window.innerHeight + distance;
      const nextEnterStart = transitionBottom - window.innerHeight * 0.94;
      const nextEnterDistance = window.innerHeight * 0.62;
      const enterProgress = isSideways ? clamp((scrollY - nextEnterStart) / nextEnterDistance) : 1;
      const nextX = `${Math.round((1 - enterProgress) * 24 * 10) / 10}vw`;
      const nextTilt = "0deg";
      const nextOpacity = `${Math.round((0.84 + enterProgress * 0.16) * 100) / 100}`;

      if (lastStyleRef.current.transform !== transform) {
        sticky.style.transform = transform;
        lastStyleRef.current.transform = transform;
      }

      if (lastStyleRef.current.coverScale !== coverScale) {
        line.style.setProperty("--route-line-cover-scale", coverScale);
        lastStyleRef.current.coverScale = coverScale;
      }

      if (lastStyleRef.current.trackTransform !== trackTransform) {
        track.style.transform = trackTransform;
        lastStyleRef.current.trackTransform = trackTransform;
      }

      if (nextSection && lastStyleRef.current.nextX !== nextX) {
        nextSection.style.setProperty("--cube-enter-x", nextX);
        lastStyleRef.current.nextX = nextX;
      }

      if (nextSection && lastStyleRef.current.nextTilt !== nextTilt) {
        nextSection.style.setProperty("--cube-enter-tilt", nextTilt);
        lastStyleRef.current.nextTilt = nextTilt;
      }

      if (nextSection && lastStyleRef.current.nextOpacity !== nextOpacity) {
        nextSection.style.setProperty("--cube-enter-opacity", nextOpacity);
        lastStyleRef.current.nextOpacity = nextOpacity;
      }
    };

    const requestUpdate = () => {
      const { activationEnd, activationStart } = metricsRef.current;
      const scrollY = window.scrollY;

      if (scrollY < activationStart || scrollY > activationEnd) {
        return;
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress);
      }
    };

    const measureAndUpdate = () => {
      measure();
      updateProgress();
    };

    measure();
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measureAndUpdate);
    window.addEventListener("load", measureAndUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measureAndUpdate);
      window.removeEventListener("load", measureAndUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [direction, isSideways]);

  return (
    <section
      aria-hidden="true"
      className={`route-transition route-transition--${direction}${isSideways ? " route-transition--sideways" : ""}`}
      ref={sectionRef}
      style={
        {
          "--route-line-cover-scale": "1",
          "--route-progress": "0%"
        } as CSSProperties
      }
    >
      <div className="route-transition__sticky" ref={stickyRef}>
        <div className="route-transition__track" ref={trackRef}>
          <div className="route-transition__face route-transition__face--line">
            <span className="route-transition__line" ref={lineRef} />
          </div>

          {isSideways ? (
            <div className="route-transition__face route-transition__face--next">
              <div className="route-transition__next-panel">
                {nextKicker ? <span>{nextKicker}</span> : null}
                {nextTitle ? <strong>{nextTitle}</strong> : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
