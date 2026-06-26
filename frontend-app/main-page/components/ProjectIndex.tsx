"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Project } from "@/data/portfolio";

type ProjectWithImages = Project & {
  images?: string[];
};

type ProjectIndexProps = {
  projects: ProjectWithImages[];
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

function isRoutableHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function isUnoptimizedImage(value: string) {
  const cleanValue = value.split("?")[0].toLowerCase();
  return cleanValue.endsWith(".gif");
}

function projectId(project: Project) {
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ProjectPixelIcon({ icon = "monitor" }: { icon?: Project["icon"] }) {
  return (
    <span className="project-card__pixel-icon" data-icon={icon} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  if (isRoutableHref(href)) {
    return (
      <Link className="project-detail-modal__link" href={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className="project-detail-modal__link" href={href} rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  registerRef
}: {
  project: ProjectWithImages;
  index: number;
  onOpen: (project: ProjectWithImages) => void;
  registerRef: (node: HTMLButtonElement | null) => void;
}) {
  const coverImage = project.images?.[0];

  return (
    <button
      type="button"
      className={`project-index-card ${index === 0 ? "is-selected" : ""}`}
      onClick={() => onOpen(project)}
      aria-label={`Open project details for ${project.title}`}
      ref={registerRef}
    >
      <div className="project-index-card__visual">
        {coverImage ? (
          <Image
            alt={`${project.title} preview`}
            className="project-index-card__image"
            fill
            sizes="(min-width: 1100px) 360px, (min-width: 760px) 44vw, 92vw"
            src={coverImage}
            unoptimized={isUnoptimizedImage(coverImage)}
          />
        ) : (
          <ProjectPixelIcon icon={project.icon} />
        )}
      </div>

      <div className="project-index-card__content">
        <div className="project-index-card__topline">
          <span className="project-deck-card__index">{formatIndex(index)}</span>
          <span className="project-index-card__eyebrow">{project.eyebrow}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-index-card__meta">
          {project.role} | {project.timeline}
        </p>
        <p className="project-index-card__description">{project.description}</p>
        <div className="project-index-card__stack" aria-label={`${project.title} stack`}>
          {project.stack.slice(0, 5).map((item) => (
            <span className="chip" key={`${project.title}-${item}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectDetailSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="project-detail-panel">
      <h3>{title}</h3>
      <ul className="project-detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
  reducedMotion
}: {
  project: ProjectWithImages;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const coverImage = project.images?.[0];
  const activeLinks = project.links.filter((link) => isConfiguredLink(link.href));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.article
      className="project-detail-modal-shell"
      initial={reducedMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={reducedMotion ? { duration: 0.01 } : { duration: 0.15 }}
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        className="project-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-${projectId(project)}`}
        initial={reducedMotion ? undefined : { opacity: 0.25, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-detail-modal__close"
          onClick={onClose}
          aria-label="Close project details"
          ref={closeButtonRef}
        >
          Close
        </button>

        <div className="project-detail-modal__body">
          <p className="project-index-card__eyebrow">{project.eyebrow}</p>
          <h2 className="project-detail-modal__title" id={`project-modal-${projectId(project)}`}>
            {project.title}
          </h2>
          <p className="project-detail-modal__meta">
            {project.role} | {project.timeline}
          </p>

          <div className="project-detail-modal__hero">
            {coverImage ? (
              <Image
                alt={`${project.title} project preview`}
                className="project-detail-modal__image"
                fill
                sizes="(min-width: 1100px) 920px, 94vw"
                src={coverImage}
                unoptimized={isUnoptimizedImage(coverImage)}
              />
            ) : (
              <div className="project-detail-modal__pixel-hero">
                <ProjectPixelIcon icon={project.icon} />
              </div>
            )}
          </div>

          <p className="project-detail-modal__summary">{project.description}</p>

          <div className="project-detail-modal__stack" aria-label={`${project.title} stack`}>
            {project.stack.map((item) => (
              <span className="chip" key={`${project.title}-modal-${item}`}>
                {item}
              </span>
            ))}
          </div>

          {project.problem ? (
            <section className="project-detail-panel project-detail-panel--wide">
              <h3>Problem</h3>
              <p>{project.problem}</p>
            </section>
          ) : null}

          <div className="project-detail-modal__sections">
            <ProjectDetailSection title="Technical challenges" items={project.technicalChallenges} />
            <ProjectDetailSection title="Architecture" items={project.architecture} />
            <ProjectDetailSection title="Results" items={project.results} />
          </div>

          {activeLinks.length > 0 ? (
            <nav className="project-detail-modal__links" aria-label={`${project.title} project links`}>
              {activeLinks.map((link) => (
                <ProjectLink href={link.href} label={link.label} key={`${project.title}-${link.label}`} />
              ))}
            </nav>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
  const reducedMotion = useReducedMotion();
  const reducedMotionBoolean = reducedMotion === true;
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const lastFocusedTitle = useRef<string | null>(null);

  const safeProjects = useMemo(() => projects.filter((project) => Boolean(project && project.title)), [projects]);
  const activeProject = safeProjects.find((project) => project.title === activeTitle) ?? null;

  const filterOptions = useMemo(() => {
    const values = new Set<string>(["All"]);
    for (const project of safeProjects) {
      values.add(project.role);
    }
    return ["All", ...Array.from(values).filter((value) => value !== "All").sort()];
  }, [safeProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return safeProjects;
    }
    return safeProjects.filter((project) => project.role === activeFilter);
  }, [activeFilter, safeProjects]);

  useEffect(() => {
    if (!activeProject) {
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
  }, [activeProject]);

  const closeProject = () => {
    const titleToRestore = lastFocusedTitle.current;
    setActiveTitle(null);

    requestAnimationFrame(() => {
      const trigger = titleToRestore ? cardRefs.current.get(titleToRestore) : null;
      trigger?.focus();
    });
    lastFocusedTitle.current = null;
  };

  if (safeProjects.length === 0) {
    return <p className="photo-list-empty">No projects are available to display right now.</p>;
  }

  return (
    <>
      <div className="project-index__filters" role="tablist" aria-label="Project filters">
        {filterOptions.map((filter) => (
          <button
            type="button"
            className={`project-index__filter ${activeFilter === filter ? "is-active" : ""}`}
            role="tab"
            aria-selected={activeFilter === filter}
            aria-controls="project-index-grid"
            onClick={() => setActiveFilter(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="project-index__grid" id="project-index-grid" role="region" aria-label="Projects">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpen={(projectToOpen) => {
              lastFocusedTitle.current = projectToOpen.title;
              setActiveTitle(projectToOpen.title);
            }}
            registerRef={(node) => {
              if (node) {
                cardRefs.current.set(project.title, node);
              } else {
                cardRefs.current.delete(project.title);
              }
            }}
          />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="photo-list-empty">No projects match this filter yet.</p>
      ) : null}

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal
            key={activeProject.title}
            project={activeProject}
            onClose={closeProject}
            reducedMotion={reducedMotionBoolean}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

