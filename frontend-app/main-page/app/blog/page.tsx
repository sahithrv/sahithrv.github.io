"use client";

import { useEffect, useMemo, useState } from "react";
import SiteTopBar from "@/components/SiteTopBar";
import { type BlogPost, blogPosts } from "@/data/portfolio";

const navItems = [{ label: "Photography", href: "/travel" }, { label: "Blog", href: "/blog" }];

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

function BlogCard({
  post,
  onOpen
}: {
  post: BlogPost;
  onOpen: (post: BlogPost) => void;
}) {
  return (
    <button
      className="blog-post compact-card blog-card__open"
      onClick={() => onOpen(post)}
      type="button"
      aria-label={`Open ${post.title}`}
    >
      <p className="blog-post__topic">{post.topic}</p>
      <h4>{post.title}</h4>
      <p className="blog-post__date">
        {post.date}
        {post.readTime ? ` | ${post.readTime}` : ""}
      </p>
      <p>{post.excerpt}</p>
      <div className="tag-row" aria-label="Post tags">
        {post.tags.map((tag) => (
          <span className="pill" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function BlogModal({
  post,
  onClose
}: {
  post: BlogPost;
  onClose: () => void;
}) {
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="blog-modal-backdrop" role="presentation" onClick={onClose}>
      <article
        className="blog-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`blog-modal-${post.slug}`}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="blog-modal__close"
          onClick={onClose}
          aria-label="Close post details"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="blog-modal__body">
          <p className="blog-post__topic">{post.topic}</p>
          <h2 className="blog-modal__title" id={`blog-modal-${post.slug}`}>
            {post.title}
          </h2>
          <p className="blog-post__date">
            {post.date}
            {post.readTime ? ` | ${post.readTime}` : ""}
          </p>

          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="blog-modal__cover" loading="eager" />
          ) : null}

          <p className="blog-modal__excerpt">{post.excerpt}</p>

          <div className="tag-row" aria-label="Post tags">
            {post.tags.map((tag) => (
              <span className="pill" key={`${post.title}-${tag}`}>
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
                <figure className="photo-card" key={`${post.slug}-${index}`}>
                  <img className="photo-image" src={media.src} alt={media.alt} loading="lazy" />
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
      </article>
    </div>
  );
}

export default function BlogPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sortedPosts = useMemo(() => [...blogPosts], []);
  const activePost = sortedPosts.find((post) => post.slug === activeSlug) ?? null;

  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={navItems} />

      <main id="top">
        <section className="section-shell">
          <p className="section-kicker">Blog</p>
          <h1>Short engineering notes and working updates</h1>
          <p className="section-lead">
            I share concise writeups on what I am building and the implementation decisions I make along
            the way.
          </p>

          <div className="blog-grid">
            {sortedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                onOpen={(postData) => setActiveSlug(postData.slug)}
              />
            ))}
          </div>

          {sortedPosts.length === 0 ? (
            <p className="photo-list-empty">No blog posts available yet. Add entries in portfolio.ts.</p>
          ) : null}
        </section>
      </main>

      {activePost ? <BlogModal post={activePost} onClose={() => setActiveSlug(null)} /> : null}
    </div>
  );
}
