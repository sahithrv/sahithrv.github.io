"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type Project } from "@/data/portfolio";

type ProjectWithImages = Project & { images: string[] };

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

function shortenText(value: string, max = 170) {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max).trimEnd()}...`;
}

function renderTagRow(items: string[]) {
  return (
    <div className="tag-row" aria-label="Technology stack">
      {items.map((item) => (
        <span className="pill" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectSlide({
  project
}: {
  project: ProjectWithImages;
}) {
  const links = project.links.filter((link) => isConfiguredLink(link.href));

  return (
    <article className="project-viewer__panel">
      <div className="project-viewer__text">
        <header className="project-card__header">
          <div className="project-card__meta">
            <span className="project-kicker project-kicker--subtle">{project.timeline}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="project-strapline">{project.eyebrow}</p>
          <p className="project-role">{project.role}</p>
          <p>{shortenText(project.description, 170)}</p>
        </header>

        <div className="project-story project-story--compact project-viewer__story">
          <p className="story-inline">
            <span className="story-label-inline">Result:</span>
            {project.results[0]}
          </p>

          <div className="story-stack-block">
            <p className="story-label-inline">Technologies:</p>
            <div className="story-content">{renderTagRow(project.stack)}</div>
          </div>
        </div>

        {links.length > 0 ? (
          <div className="project-links">
            {links.map((link) => (
              <Link
                className="project-link"
                href={link.href}
                key={`${project.title}-${link.label}`}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <figure className="project-viewer__figure">
        {project.images[0] ? (
          <img
            className="project-viewer__media"
            src={project.images[0]}
            alt={`${project.title} project preview`}
            loading="eager"
          />
        ) : (
          <div className="project-viewer__media-empty">Project image placeholder</div>
        )}
      </figure>
    </article>
  );
}

export default function ProjectCarousel({
  projects
}: {
  projects: ProjectWithImages[];
}) {
  const safeProjects = useMemo(() => projects.filter(Boolean), [projects]);
  const total = safeProjects.length;
  const [index, setIndex] = useState(0);

  if (total === 0) {
    return <p className="photo-list-empty">No projects are available to display right now.</p>;
  }

  const hasMultiple = total > 1;

  const nextProject = () => {
    if (!hasMultiple) return;
    setIndex((current) => (current + 1) % total);
  };

  const previousProject = () => {
    if (!hasMultiple) return;
    setIndex((current) => (current - 1 + total) % total);
  };

  return (
    <div className="project-carousel">
      <div className="project-carousel__viewer">
        <button
          type="button"
          className="photography-arrow"
          aria-label="Previous project"
          onClick={previousProject}
          disabled={!hasMultiple}
        >
          {"<"}
        </button>

        <div className="project-carousel__viewport">
          <div
            className="project-carousel__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {safeProjects.map((project) => (
              <div className="project-carousel__slide" key={project.title}>
                <ProjectSlide project={project} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="photography-arrow"
          aria-label="Next project"
          onClick={nextProject}
          disabled={!hasMultiple}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
