import { promises as fs } from "node:fs";
import path from "node:path";
import AnimatedPixelBackground from "@/components/AnimatedPixelBackground";
import ProjectIndex from "@/components/ProjectIndex";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { homepageContent, projects, type Project } from "@/data/portfolio";
import projectsBackground from "../../../assets/projects_background.png";

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

export default async function ProjectsPage() {
  const projectImages = await loadProjectImages();
  const projectsWithImages = projects
    .filter((project) => project.title !== "Arthrex DevOps Validator")
    .map((project) => ({
      ...project,
      images: resolveProjectImages(project.title, projectImages)
    })) as ProjectWithImages[];

  return (
    <div className="portfolio-shell portfolio-shell--pixel pixel-polished-theme pixel-page-bg subpage-shell subpage-shell--projects">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={homepageContent.navItems} variant="pixel" />

      <main id="top">
        <div className="projects-page-backdrop">
          <AnimatedPixelBackground
            baseSrc={projectsBackground}
            className="animated-pixel-background--projects"
            layers={[]}
          />
          <SubpageHero
            kicker="Projects"
            title="Project deep dives"
            description="A project-focused index for longer writeups about what I built, what was hard, and how each system was designed."
            variant="projects"
          />

          <section
            className="section-shell section-frame section-stack subpage-panel projects-index-section"
            aria-label="Project index"
          >
            <ProjectIndex projects={projectsWithImages} />
          </section>
        </div>
      </main>
    </div>
  );
}
