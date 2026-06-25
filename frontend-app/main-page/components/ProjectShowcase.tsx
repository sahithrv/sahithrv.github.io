import Link from "next/link";
import { type Project } from "@/data/portfolio";

type ProjectWithImages = Project & {
  images?: string[];
};

type ProjectShowcaseProps = {
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

function shortenText(value: string, max = 116) {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max).trimEnd()}...`;
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function isRoutableHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
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
      <Link className="project-deck-card__link" href={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className="project-deck-card__link" href={href} rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const safeProjects = projects.filter((project) => Boolean(project && project.title));

  if (safeProjects.length === 0) {
    return <p className="photo-list-empty">No projects are available to display right now.</p>;
  }

  return (
    <div className="project-showcase project-showcase--deck">
      <div className="project-deck__toolbar" aria-hidden="true">
        <button className="project-deck__control project-deck__control--prev" type="button" tabIndex={-1} disabled>
          <span className="project-deck__control-glyph" />
        </button>
        <button className="project-deck__control project-deck__control--next" type="button" tabIndex={-1} disabled>
          <span className="project-deck__control-glyph" />
        </button>
      </div>

      <div className="project-deck__grid" role="list" aria-label="Featured projects">
        {safeProjects.map((project, index) => {
          const activeLinks = project.links.filter((link) => isConfiguredLink(link.href));
          const primaryLink = activeLinks[0];

          return (
            <article
              className={`project-deck-card ${index === 0 ? "is-selected" : ""}`}
              key={`${project.title}-${index}`}
              role="listitem"
            >
              <div className="project-deck-card__topline">
                <span className="project-deck-card__index">{formatIndex(index)}</span>
                <ProjectPixelIcon icon={project.icon} />
              </div>

              <div className="project-deck-card__copy">
                <h3>{project.title}</h3>
                <p className="project-deck-card__meta">{project.timeline}</p>
                <p className="project-deck-card__description">{shortenText(project.description)}</p>
              </div>

              <div className="project-deck-card__footer">
                <span>{project.role}</span>
                {primaryLink ? <ProjectLink href={primaryLink.href} label={primaryLink.label} /> : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
