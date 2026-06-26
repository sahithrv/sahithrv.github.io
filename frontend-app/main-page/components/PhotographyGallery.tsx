"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type TravelPhoto } from "@/data/portfolio";

type PhotographyGalleryProps = {
  photos: TravelPhoto[];
};

function safeText(value: string) {
  return value.trim().length > 0 ? value : "Unknown";
}

function isUnoptimizedImage(value: string) {
  const cleanValue = value.split("?")[0].toLowerCase();
  return cleanValue.endsWith(".gif");
}

function formatCounter(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const safePhotos = useMemo(() => photos.filter(Boolean), [photos]);
  const total = safePhotos.length;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const mediaButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const didOpenLightbox = useRef(false);

  useEffect(() => {
    if (total === 0) {
      return;
    }
    setFeaturedIndex((previous) => (previous >= total ? 0 : previous));
  }, [total]);

  const goToPrevious = useCallback(() => {
    if (total <= 1) {
      return;
    }
    setFeaturedIndex((current) => (current - 1 + total) % total);
    setLightboxIndex((current) => (current === null ? current : (current - 1 + total) % total));
  }, [total]);

  const goToNext = useCallback(() => {
    if (total <= 1) {
      return;
    }
    setFeaturedIndex((current) => (current + 1) % total);
    setLightboxIndex((current) => (current === null ? current : (current + 1) % total));
  }, [total]);

  const openLightbox = () => {
    if (total === 0) {
      return;
    }
    didOpenLightbox.current = true;
    setLightboxIndex(featuredIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    if (lightboxIndex === null) {
      if (!didOpenLightbox.current) {
        return;
      }
      requestAnimationFrame(() => {
        mediaButtonRef.current?.focus();
      });
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    lightboxCloseButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [goToNext, goToPrevious, lightboxIndex]);

  if (total === 0) {
    return <p className="photo-list-empty">No photos found in your photography gallery yet.</p>;
  }

  const featuredPhoto = safePhotos[featuredIndex] ?? safePhotos[0];
  const featuredTitle = safeText(featuredPhoto.title);
  const featuredCaption = safeText(featuredPhoto.caption);
  const featuredLocation = safeText(featuredPhoto.location);
  const featuredDate = safeText(featuredPhoto.date);
  const activePhoto = safePhotos[lightboxIndex ?? featuredIndex];

  return (
    <div className="photography-gallery photography-viewer photography-viewer--post">
      <header className="photography-viewer__toolbar">
        <div className="photography-viewer__identity">
          <span className="photography-viewer__mark" aria-hidden="true" />
          <div>
            <p className="section-kicker">Gallery</p>
            <h2>{featuredTitle}</h2>
            <p className="photography-viewer__subhead">
              {featuredLocation} / {featuredDate}
            </p>
          </div>
        </div>
        <div className="photography-viewer__controls" aria-label="Photo controls">
          <p className="photography-viewer__counter" aria-live="polite">
            {formatCounter(featuredIndex, total)}
          </p>
          <button
            type="button"
            className="photography-viewer__nav-button"
            onClick={goToPrevious}
            aria-label="Previous photo"
            disabled={total <= 1}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="photography-viewer__nav-button"
            onClick={goToNext}
            aria-label="Next photo"
            disabled={total <= 1}
          >
            {">"}
          </button>
        </div>
      </header>

      <article className="photography-viewer__post" aria-live="polite" aria-label={`${featuredTitle} photo`}>
        <section className="photography-viewer__stage">
          <button
            type="button"
            className="photography-viewer__media-button"
            onClick={openLightbox}
            aria-label={`Open ${featuredTitle} full screen`}
            ref={mediaButtonRef}
          >
            <Image
              alt={featuredTitle}
              className="photography-viewer__image"
              fill
              priority
              sizes="(min-width: 1200px) 860px, (min-width: 768px) 82vw, 94vw"
              src={featuredPhoto.src}
              unoptimized={isUnoptimizedImage(featuredPhoto.src)}
            />
            <span className="photography-viewer__open-label">Open full screen</span>
          </button>
        </section>

        <footer className="photography-viewer__post-footer">
          <p className="photography-viewer__caption-text">
            <span>{featuredTitle}</span>{" "}
            {featuredCaption}
          </p>
          <p className="photography-viewer__meta-row">
            <span>{featuredLocation}</span>
            <span>{featuredDate}</span>
          </p>
        </footer>
      </article>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            key={`photography-lightbox-${lightboxIndex}`}
            className="travel-lightbox-backdrop"
            role="presentation"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.article
              className="travel-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`${activePhoto.title} photo details`}
              initial={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, scale: 0.97, y: 12 }}
              animate={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, scale: 0.97, y: 10 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="travel-lightbox__nav">
                <button
                  type="button"
                  className="travel-lightbox__arrow"
                  onClick={goToPrevious}
                  aria-label="Previous photo"
                  disabled={total <= 1}
                >
                  {"<"}
                </button>

                <p className="travel-lightbox__counter" aria-live="polite">
                  {formatCounter(lightboxIndex, total)}
                </p>

                <button
                  type="button"
                  className="travel-lightbox__arrow"
                  onClick={goToNext}
                  aria-label="Next photo"
                  disabled={total <= 1}
                >
                  {">"}
                </button>

                <button
                  type="button"
                  className="travel-lightbox__close"
                  onClick={closeLightbox}
                  aria-label="Close photo lightbox"
                  ref={lightboxCloseButtonRef}
                >
                  Close
                </button>
              </div>

              <div className="travel-lightbox__media">
                <Image
                  alt={safeText(activePhoto.title)}
                  className="travel-lightbox__image"
                  fill
                  priority
                  sizes="100vw"
                  src={activePhoto.src}
                  unoptimized={isUnoptimizedImage(activePhoto.src)}
                />
              </div>

              <div className="travel-lightbox__details">
                <h3>{safeText(activePhoto.title)}</h3>
                <p className="photo-caption">{safeText(activePhoto.caption)}</p>
                <div className="photo-meta">
                  <span>{safeText(activePhoto.location)}</span>
                  <span>{safeText(activePhoto.date)}</span>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
