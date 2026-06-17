"use client";

import { useMemo, useState } from "react";
import { type TravelPhoto } from "@/data/portfolio";

type PhotographyGalleryProps = {
  photos: TravelPhoto[];
};

function safeText(value: string) {
  return value.trim().length > 0 ? value : "Unknown";
}

export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const safePhotos = useMemo(() => photos.filter(Boolean), [photos]);
  const [index, setIndex] = useState(0);
  const total = safePhotos.length;

  if (total === 0) {
    return <p className="photo-list-empty">No photos found in your photography gallery yet.</p>;
  }

  const activePhoto = safePhotos[index];
  const hasMultiple = total > 1;

  const nextPhoto = () => {
    if (!hasMultiple) return;
    setIndex((current) => (current + 1) % total);
  };

  const previousPhoto = () => {
    if (!hasMultiple) return;
    setIndex((current) => (current - 1 + total) % total);
  };

  return (
    <div className="photography-gallery">
      <div className="photography-viewer">
        <button
          type="button"
          className="photography-arrow"
          aria-label="Previous photo"
          onClick={previousPhoto}
          disabled={!hasMultiple}
        >
          {"<"}
        </button>

        <div className="photography-gallery__viewport">
          <div
            className="photography-gallery__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {safePhotos.map((photo) => {
              const title = safeText(photo.title);
              const caption = safeText(photo.caption);
              const location = safeText(photo.location);
              const date = safeText(photo.date);
              return (
                <div className="photography-gallery__slide" key={`${photo.src}-${photo.title}`}>
                  <figure className="photography-figure">
                    <img className="photography-viewer__media" src={photo.src} alt={title} loading="eager" />
                    <figcaption className="photography-viewer__caption">
                      <h2>{title}</h2>
                      <p className="photo-caption">{caption}</p>
                      <div className="photo-meta">
                        <span>{location}</span>
                        <span>{date}</span>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="photography-arrow"
          aria-label="Next photo"
          onClick={nextPhoto}
          disabled={!hasMultiple}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
