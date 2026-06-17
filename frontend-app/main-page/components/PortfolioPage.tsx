import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { profile, projects } from "@/data/portfolio";
import ProjectCarousel from "@/components/ProjectCarousel";
import SiteTopBar from "@/components/SiteTopBar";

type ProjectWithImages = (typeof projects)[number] & {
  images: string[];
};

type ProjectImageCandidate = {
  slug: string;
  src: string;
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

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function resolveProjectImages(
  title: string,
  candidates: ProjectImageCandidate[]
) {
  const slug = normalizeSlug(title);
const exactMatches = candidates.filter(
    (item) => item.slug === slug || item.slug.startsWith(`${slug}-`) || item.slug.startsWith(`${slug}_`)
  );

  if (exactMatches.length > 0) {
    return exactMatches.map((item) => item.src);
  }

  const titleTokens = slug.split("-");
  return candidates.filter((item) =>
    titleTokens.every((token) => item.slug.includes(token))
  ).map((item) => item.src);
}

async function loadProjectImages(): Promise<ProjectImageCandidate[]> {
  const imagesRoot = path.join(process.cwd(), "public", "images", "projects");

  try {
    const imageEntries = await fs.readdir(imagesRoot);
    const supportedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

    return imageEntries
      .filter((fileName) => supportedExt.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => ({
        slug: normalizeSlug(path.basename(fileName, path.extname(fileName))),
        src: `/images/projects/${fileName}`
      }));
  } catch {
    return [];
  }
}

const primaryNavItems = [{ label: "Photography", href: "/travel" }, { label: "Blog", href: "/blog" }];

function SectionHeader({
  id,
  kicker,
  title,
  subtitle
}: {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="section-header">
      <p className="section-kicker" id={id}>
        {kicker}
      </p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
}

export default async function PortfolioPage() {
  const projectImages = await loadProjectImages();
  const projectsWithImages = projects.map((project) => ({
    ...project,
    images: resolveProjectImages(project.title, projectImages)
  })) as ProjectWithImages[];

  const portfolioProjects = projectsWithImages.filter(
    (project) => project.title !== "Arthrex DevOps Validator"
  );
  const experienceProjects = projectsWithImages.filter(
    (project) => project.title === "Arthrex DevOps Validator"
  );

  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={primaryNavItems} />

      <main id="top">
        <section className="hero section-shell">
          <p className="hero-kicker">Senior Software Engineer | AI/LLM Systems</p>
          <h1>Building reliable software and practical AI products.</h1>
        </section>

        <section className="section-shell section-shell--muted" id="about">
          <SectionHeader
            id="about-title"
            kicker="About me"
            title="MSCS and Computer Engineering from UC Irvine"
            subtitle="I have an MSCS and a Computer Engineering degree from UC Irvine. I like building applications."
          />
          <p className="section-lead">
            I focus on shipping end-to-end product experiences and reliable systems, from architecture to
            implementation.
          </p>
        </section>

        <section className="section-shell" id="projects">
          <SectionHeader
            id="projects-title"
            kicker="Projects"
            title="Selected project work"
            subtitle="I keep these experiences concise and focused, with practical outcomes."
          />
          <ProjectCarousel projects={portfolioProjects} />
        </section>

        <section className="section-shell section-shell--muted" id="experience">
          <SectionHeader
            id="experience-title"
            kicker="Experience"
            title="Arthrex"
            subtitle="Professional work focused on platform reliability and deployment safety."
          />
          <div className="project-grid project-grid--compact">
            {experienceProjects.map((project) => (
              <article key={project.title} className="project-card project-card--compact">
                <header className="project-card__header">
                  <div className="project-card__meta">
                    <span className="project-kicker project-kicker--subtle">{project.timeline}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-strapline">{project.eyebrow}</p>
                  <p>{project.description}</p>
                </header>
                <div className="project-story project-story--compact">
                  <p className="story-inline">
                    <span className="story-label-inline">Result:</span>
                    {project.results[0]}
                  </p>
                  <div className="story-stack-block">
                    <p className="story-label-inline">Technologies:</p>
                    <div className="story-content">
                      {project.stack.map((item) => (
                        <span className="pill" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {project.links.filter((link) => isConfiguredLink(link.href)).length > 0 ? (
                  <div className="project-links">
                    {project.links
                      .filter((link) => isConfiguredLink(link.href))
                      .map((link) => (
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
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
