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

export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const safePhotos = useMemo(() => photos.filter(Boolean), [photos]);
  const total = safePhotos.length;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const tileRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const lightboxCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusIndex = useRef(0);
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
    setLightboxIndex((current) => {
      if (current === null) return 0;
      return (current - 1 + total) % total;
    });
  }, [total]);

  const goToNext = useCallback(() => {
    if (total <= 1) {
      return;
    }
    setLightboxIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % total;
    });
  }, [total]);

  const openPhoto = (index: number) => {
    if (index < 0 || index >= total) {
      return;
    }
    didOpenLightbox.current = true;
    lastFocusIndex.current = index;
    setFeaturedIndex(index);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    if (lightboxIndex === null) {
      if (!didOpenLightbox.current) {
        return;
      }
      const previousFocus = tileRefs.current.get(lastFocusIndex.current) ?? null;
      if (previousFocus) {
        requestAnimationFrame(() => {
          previousFocus.focus();
        });
      }
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
    <div className="photography-gallery">
      <section className="photography-gallery__featured" aria-live="polite">
        <button
          type="button"
          className="travel-photo-card travel-photo-card--hero glass-card interactive-card"
          onClick={() => openPhoto(featuredIndex)}
          aria-label={`Open ${featuredTitle}`}
        >
          <div className="travel-photo-card__media">
            <Image
              alt={featuredTitle}
              className="travel-photo-card__image"
              fill
              sizes="(min-width: 1200px) 84vw, (min-width: 768px) 90vw, 95vw"
              src={featuredPhoto.src}
              unoptimized={isUnoptimizedImage(featuredPhoto.src)}
            />
          </div>
          <div className="travel-photo-card__caption">
            <p className="eyebrow">Featured</p>
            <h3>{featuredTitle}</h3>
            <p className="story-inline">{featuredCaption}</p>
            <div className="photo-meta">
              <span>{featuredLocation}</span>
              <span>{featuredDate}</span>
            </div>
            <p className="story-label-inline">Tap a tile to open full-screen lightbox</p>
          </div>
        </button>
      </section>

      <section className="photography-gallery__grid" aria-label="Photostream">
        {safePhotos.map((photo, index) => {
          const isPrimary = index === featuredIndex;
          const isTall = index % 5 === 1;
          const title = safeText(photo.title);
          const location = safeText(photo.location);

          return (
            <button
              type="button"
              className={`travel-photo-card glass-card interactive-card ${isPrimary ? "is-featured" : ""}`}
              key={`${photo.src}-${photo.title}-${index}`}
              onClick={() => openPhoto(index)}
              onFocus={() => setFeaturedIndex(index)}
              ref={(node) => {
                if (node) {
                  tileRefs.current.set(index, node);
                } else {
                  tileRefs.current.delete(index);
                }
              }}
              aria-label={`Open ${title}`}
            >
              <div className={`travel-photo-card__media travel-photo-card__media--${isTall ? "tall" : "wide"}`}>
                <Image
                  alt={title}
                  className="travel-photo-card__image"
                  fill
                  sizes="(min-width: 1400px) 320px, (min-width: 1024px) 29vw, (min-width: 760px) 46vw, 90vw"
                  src={photo.src}
                  unoptimized={isUnoptimizedImage(photo.src)}
                />
              </div>
              <p className="story-label-inline">{title}</p>
              <p className="photo-caption">{safeText(photo.caption)}</p>
              <p className="photo-meta">{location}</p>
              <span className="story-label-inline">{safeText(photo.date)}</span>
            </button>
          );
        })}
      </section>

      <section className="photography-gallery__strip" aria-label="Photo index">
        {safePhotos.map((photo, index) => {
          const isActive = index === featuredIndex;
          const title = safeText(photo.title);

          return (
            <button
              type="button"
              key={`${photo.src}-thumb-${index}`}
              className={`photography-gallery__thumb ${isActive ? "is-active" : ""}`}
              onClick={() => openPhoto(index)}
              aria-label={`Jump to ${title}`}
            >
              <Image
                alt={title}
                className="photography-gallery__thumb-image"
                fill
                sizes="90px"
                src={photo.src}
                unoptimized={isUnoptimizedImage(photo.src)}
              />
            </button>
          );
        })}
      </section>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            key={`travel-lightbox-${lightboxIndex}`}
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
                  {`${(lightboxIndex ?? 0) + 1} / ${total}`}
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
