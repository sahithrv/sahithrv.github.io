"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { TravelCategory, TravelPhoto } from "@/data/portfolio";
import { travelCategories } from "@/data/portfolio";

export default function TravelGallery({ photos }: { photos: TravelPhoto[] }) {
  const [activeCategory, setActiveCategory] = useState<TravelCategory>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<TravelPhoto | null>(null);

  const visiblePhotos = useMemo(() => {
    if (activeCategory === "All") {
      return photos;
    }

    return photos.filter((photo) => photo.category === activeCategory);
  }, [activeCategory, photos]);

  return (
    <div className="travel-board reveal-up">
      <div className="filter-strip" aria-label="Travel photo filters">
        {travelCategories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className="filter-button"
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {visiblePhotos.map((photo, index) => (
          <button
            className="photo-tile"
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            style={{ "--photo-index": index } as CSSProperties}
            type="button"
          >
            <Image
              src={photo.src}
              alt={`${photo.title} placeholder travel scene`}
              fill
              sizes="(max-width: 980px) 100vw, 33vw"
              unoptimized
            />
            <span className="photo-tile__caption">
              <strong>{photo.title}</strong>
              <small>{photo.location}</small>
            </span>
          </button>
        ))}
      </div>

      {selectedPhoto ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.title}>
          <button
            className="lightbox__backdrop"
            onClick={() => setSelectedPhoto(null)}
            type="button"
            aria-label="Close photo preview"
          />
          <div className="lightbox__panel">
            <button
              className="lightbox__close"
              onClick={() => setSelectedPhoto(null)}
              type="button"
              aria-label="Close"
            >
              X
            </button>
            <Image
              src={selectedPhoto.src}
              alt={`${selectedPhoto.title} enlarged placeholder`}
              width={1200}
              height={800}
              sizes="(max-width: 980px) 100vw, 62vw"
              unoptimized
            />
            <div>
              <span className="sticker-label">{selectedPhoto.category}</span>
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.caption}</p>
              <small>{selectedPhoto.location}</small>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
