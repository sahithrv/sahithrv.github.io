"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { type BlogPost } from "@/data/portfolio";

type BlogIndexProps = {
  posts: BlogPost[];
};

function isConfiguredLink(value: string) {
  const normalized = value.trim();
  return (
    Boolean(normalized) &&
    normalized !== "#" &&
    !normalized.includes("your-") &&
    !normalized.includes("TODO") &&
    !normalized.includes("placeholder")
  );
}

function uniqueText(value: string | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

function isUnoptimizedImage(value: string) {
  const cleanValue = value.split("?")[0].toLowerCase();
  return cleanValue.endsWith(".gif");
}

function BlogCard({
  post,
  onOpen,
  registerRef
}: {
  post: BlogPost;
  onOpen: (post: BlogPost) => void;
  registerRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      type="button"
      ref={registerRef}
      className="blog-card glass-card interactive-card blog-card__open"
      onClick={() => onOpen(post)}
      aria-label={`Open ${post.title}`}
    >
      {uniqueText(post.coverImage) ? (
        <div className="blog-card__cover-wrap">
          <Image
            alt={post.title}
            className="blog-card__cover"
            fill
            sizes="(min-width: 1100px) 360px, (min-width: 760px) 320px, 92vw"
            src={post.coverImage ?? ""}
            unoptimized={isUnoptimizedImage(post.coverImage ?? "")}
          />
        </div>
      ) : null}
      <div className="blog-card__content">
        <p className="blog-post__topic">{post.topic}</p>
        <h4 className="blog-card__title" id={`blog-card-title-${post.slug}`}>
          {post.title}
        </h4>
        <p className="blog-post__date">
          {post.date}
          {post.readTime ? ` | ${post.readTime}` : ""}
        </p>
        <p>{post.excerpt}</p>
        <div className="tag-row" aria-label="Post tags">
          {post.tags.map((tag) => (
            <span className="chip" key={`${post.title}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function BlogModal({
  post,
  onClose,
  reducedMotion
}: {
  post: BlogPost;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  const displayedMedia = useMemo(() => {
    const media = post.media ?? [];
    if (media.length === 0) {
      return [];
    }
    const seen = new Set<string>();
    const unique: (typeof media)[number][] = [];

    for (const item of media) {
      if (!item.src) continue;
      if (post.coverImage && item.src === post.coverImage) continue;
      if (seen.has(item.src)) continue;
      seen.add(item.src);
      unique.push(item);
    }

    return unique;
  }, [post.coverImage, post.media]);

  useEffect(() => {
    const modalBodyElement = modalBodyRef.current;
    const onScroll = () => {
      if (!modalBodyElement) {
        return;
      }
      const maxOffset = Math.max(modalBodyElement.scrollHeight - modalBodyElement.clientHeight, 1);
      const nextProgress = Math.round((modalBodyElement.scrollTop / maxOffset) * 100);
      setReadingProgress(nextProgress);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    onScroll();
    modalBodyElement?.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      modalBodyElement?.removeEventListener("scroll", onScroll);
    };
  }, [onClose]);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.article
      className="blog-modal-shell"
      initial={reducedMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={reducedMotion ? { duration: 0.01 } : { duration: 0.15 }}
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        className="blog-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`blog-modal-${post.slug}`}
        initial={reducedMotion ? undefined : { opacity: 0.25, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="blog-modal__close"
          onClick={onClose}
          aria-label="Close note"
          ref={closeButtonRef}
        >
          Close
        </button>

        <div
          className="blog-modal__progress"
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={readingProgress}
        >
          <span style={{ width: `${readingProgress}%` }} />
        </div>

        <div className="blog-modal__body" ref={modalBodyRef}>
          <p className="blog-post__topic">{post.topic}</p>
          <h2 className="blog-modal__title" id={`blog-modal-${post.slug}`}>
            {post.title}
          </h2>
          <p className="blog-post__date">
            {post.date}
            {post.readTime ? ` | ${post.readTime}` : ""}
          </p>

          {post.coverImage ? (
            <div className="blog-modal__cover-wrap">
              <Image
                alt={post.title}
                className="blog-modal__cover"
                fill
                sizes="(min-width: 1100px) 860px, (max-width: 1099px) 94vw, 94vw"
                src={post.coverImage}
                unoptimized={isUnoptimizedImage(post.coverImage)}
              />
            </div>
          ) : null}

          <p className="blog-modal__excerpt">{post.excerpt}</p>

          <div className="tag-row" aria-label="Post tags">
            {post.tags.map((tag) => (
              <span className="chip" key={`${post.title}-${tag}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="blog-modal__story">
            {post.content.map((paragraph, index) => (
              <p className="blog-modal__paragraph" key={`${post.title}-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {displayedMedia.length > 0 ? (
            <div className="photo-grid">
              {displayedMedia.map((media, index) => (
                <figure className="photo-card glass-card interactive-card" key={`${post.slug}-${index}`}>
                  <div className="photo-image-wrap">
                    <Image
                      alt={media.alt}
                      className="photo-image"
                      fill
                      sizes="(min-width: 1100px) 420px, (min-width: 760px) 44vw, 88vw"
                      src={media.src}
                      unoptimized={isUnoptimizedImage(media.src)}
                    />
                  </div>
                  {media.caption ? <p className="photo-caption">{media.caption}</p> : null}
                </figure>
              ))}
            </div>
          ) : null}

          {post.links && post.links.some((link) => isConfiguredLink(link.href)) ? (
            <div className="project-links blog-modal__links">
              {post.links
                .filter((link) => isConfiguredLink(link.href))
                .map((link) => (
                  <a
                    key={`${post.title}-${link.label}`}
                    className="project-link"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const reducedMotion = useReducedMotion();
  const reducedMotionBoolean = reducedMotion === true;
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const lastFocusedSlug = useRef<string | null>(null);

  const sortedPosts = useMemo(() => [...posts], [posts]);
  const activePost = sortedPosts.find((post) => post.slug === activeSlug) ?? null;

  const filterOptions = useMemo(() => {
    const values = new Set<string>(["All"]);
    for (const post of sortedPosts) {
      values.add(post.topic);
      for (const tag of post.tags) {
        values.add(tag);
      }
    }
    return ["All", ...Array.from(values).filter((value) => value !== "All").sort()];
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") {
      return sortedPosts;
    }
    return sortedPosts.filter((post) => post.topic === activeFilter || post.tags.includes(activeFilter));
  }, [activeFilter, sortedPosts]);

  useEffect(() => {
    if (!activePost) {
      return;
    }
    const existingOverflow = document.body.style.overflow;
    const existingPaddingRight = document.body.style.paddingRight;
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollWidth > 0) {
      document.body.style.paddingRight = `${scrollWidth}px`;
    }

    return () => {
      document.body.style.overflow = existingOverflow;
      document.body.style.paddingRight = existingPaddingRight;
    };
  }, [activePost]);

  const closePost = () => {
    const slugToRestore = lastFocusedSlug.current;
    setActiveSlug(null);

    requestAnimationFrame(() => {
      const trigger = slugToRestore ? cardRefs.current.get(slugToRestore) : null;
      trigger?.focus();
    });
    lastFocusedSlug.current = null;
  };

  return (
    <>
      <div className="blog-filters" role="tablist" aria-label="Blog filters">
        {filterOptions.map((filter) => (
          <button
            type="button"
            className={`blog-filters__chip ${activeFilter === filter ? "is-active" : ""}`}
            role="tab"
            aria-selected={activeFilter === filter}
            aria-controls="blog-grid"
            onClick={() => setActiveFilter(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="blog-grid" id="blog-grid" role="region" aria-label="Blog posts">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            onOpen={(postToOpen) => {
              lastFocusedSlug.current = postToOpen.slug;
              setActiveSlug(postToOpen.slug);
            }}
            registerRef={(node) => {
              if (node) {
                cardRefs.current.set(post.slug, node);
              } else {
                cardRefs.current.delete(post.slug);
              }
            }}
          />
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="photo-list-empty">No matching notes are available yet. Update the blog data and try another filter.</p>
      ) : null}

      <AnimatePresence>
        {activePost ? (
          <BlogModal
            key={activePost.slug}
            post={activePost}
            onClose={closePost}
            reducedMotion={reducedMotionBoolean}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
