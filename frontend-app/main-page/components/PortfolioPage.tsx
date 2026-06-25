import { promises as fs } from "node:fs";
import path from "node:path";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import FooterCTA from "@/components/FooterCTA";
import HeroWorkbench from "@/components/HeroWorkbench";
import ProjectShowcase from "@/components/ProjectShowcase";
import SiteTopBar from "@/components/SiteTopBar";
import { homepageContent, projects } from "@/data/portfolio";
import { type Project } from "@/data/portfolio";

type ProjectWithImages = Project & {
  images: string[];
};

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function resolveProjectImages(title: string, candidates: { slug: string; src: string }[]) {
  const slug = normalizeSlug(title);
  const exactMatches = candidates.filter(
    (item) => item.slug === slug || item.slug.startsWith(`${slug}-`) || item.slug.startsWith(`${slug}_`)
  );

  if (exactMatches.length > 0) {
    return exactMatches.map((item) => item.src);
  }

  const titleTokens = slug.split("-");
  return candidates
    .filter((item) => titleTokens.every((token) => item.slug.includes(token)))
    .map((item) => item.src);
}

async function loadProjectImages(): Promise<{ slug: string; src: string }[]> {
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

function isProjectWithImages(project: ProjectWithImages | undefined): project is ProjectWithImages {
  return Boolean(project);
}

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
      <p className="section-kicker eyebrow" id={id}>
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

  const projectsByTitle = new Map(projectsWithImages.map((project) => [project.title, project]));
  const portfolioProjects = homepageContent.projectCardTitles
    .map((title) => projectsByTitle.get(title))
    .filter(isProjectWithImages);
  const experienceProject = projectsByTitle.get(homepageContent.experienceTimelineTitle);
  const experienceProjects: Project[] = experienceProject ? [experienceProject] : [homepageContent.experienceFallback];

  return (
    <div className="portfolio-shell portfolio-shell--pixel pixel-polished-theme pixel-page-bg">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={homepageContent.navItems} sectionAnchors={homepageContent.sectionAnchors} variant="pixel" />

      <main id="top">
        <section className="hero hero--pixel section-shell section-stack" id="about">
          <HeroWorkbench hero={homepageContent.hero} workbenchItems={homepageContent.workbenchItems} />
        </section>

        <section className="section-shell section-frame section-stack project-deck-section" id="projects">
          <SectionHeader
            id="projects-title"
            kicker={homepageContent.projectsSection.kicker}
            title={homepageContent.projectsSection.title}
            subtitle={homepageContent.projectsSection.subtitle}
          />
          <ProjectShowcase projects={portfolioProjects} />
        </section>

        <section className="section-shell section-frame section-stack experience-section" id="experience">
          <div className="experience-section__layout">
            <SectionHeader
              id="experience-title"
              kicker={homepageContent.experienceSection.kicker}
              title={homepageContent.experienceSection.title}
              subtitle={homepageContent.experienceSection.subtitle}
            />
            <ExperienceTimeline badge={homepageContent.experienceBadge} items={experienceProjects} />
          </div>
        </section>

        <FooterCTA content={homepageContent.footerCta} />
      </main>
    </div>
  );
}
