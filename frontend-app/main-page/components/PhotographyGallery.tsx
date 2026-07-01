"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type TravelPhoto } from "@/data/portfolio";

type PhotographyGalleryProps = {
  photos: GalleryPhoto[];
};

type GalleryPhoto = TravelPhoto & {
  thumbnailSrc?: string;
};

function safeText(value: string) {
  return value.trim().length > 0 ? value : "Unknown";
}

function isUnoptimizedImage(value: string) {
  const cleanValue = value.split("?")[0].toLowerCase();
  return cleanValue.endsWith(".gif");
}

function shouldUseDirectImage(value: string) {
  return (
    isUnoptimizedImage(value) ||
    value.startsWith("/images/") ||
    value.includes("/images/photography-display/") ||
    value.includes("/images/photography-thumbs/")
  );
}

function formatCounter(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const safePhotos = useMemo(() => photos.filter(Boolean), [photos]);
  const total = safePhotos.length;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  const selectPhoto = (index: number) => {
    setFeaturedIndex(index);
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
    <div className="photography-gallery photography-viewer photography-viewer--gallery">
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
              priority={featuredIndex === 0}
              sizes="(min-width: 1180px) 720px, (min-width: 768px) 72vw, 92vw"
              src={featuredPhoto.src}
              unoptimized={shouldUseDirectImage(featuredPhoto.src)}
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

      <ol className="photography-viewer__thumb-grid" aria-label="Photography thumbnails">
        {safePhotos.map((photo, index) => {
          const title = safeText(photo.title);

          return (
            <li key={`${photo.src}-${index}`}>
              <button
                type="button"
                className={`photography-viewer__thumb-card ${index === featuredIndex ? "is-active" : ""}`}
                onClick={() => selectPhoto(index)}
                aria-label={`Show ${title}`}
                aria-pressed={index === featuredIndex}
              >
                <span className="photography-viewer__thumb-media">
                  <Image
                    alt=""
                    className="photography-viewer__thumb-image"
                    fill
                    sizes="(min-width: 760px) 130px, 28vw"
                    src={photo.thumbnailSrc ?? photo.src}
                    unoptimized={shouldUseDirectImage(photo.thumbnailSrc ?? photo.src)}
                  />
                </span>
                <span className="photography-viewer__thumb-title">{title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {lightboxIndex !== null ? (
        <div className="travel-lightbox-backdrop" role="presentation" onClick={closeLightbox}>
          <article
            className="travel-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.title} photo details`}
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
                sizes="100vw"
                src={activePhoto.src}
                unoptimized={shouldUseDirectImage(activePhoto.src)}
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
          </article>
        </div>
      ) : null}
    </div>
  );
}
