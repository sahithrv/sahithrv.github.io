import Link from "next/link";
import {
  educationItems,
  productsHeader,
  projects,
  profile,
  skillGroups
} from "@/data/portfolio";

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

function isUsefulLink(value: string) {
  return isConfiguredLink(value);
}

function AppNav() {
  const primaryNavItems = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Architecture", href: "#architecture" },
    { label: "Travel", href: "/travel" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
    { label: "Notes", href: "/interests" }
  ];

  return (
    <header className="site-nav">
      <Link href="/" className="brand">
        <span className="brand__name">Sahith</span>
        <p className="brand__role">{profile.role}</p>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {primaryNavItems.map((item) =>
          item.href.startsWith("#") ? (
            <a className="nav-link" href={item.href} key={item.label}>
              {item.label}
            </a>
          ) : (
            <Link className="nav-link" href={item.href} key={item.label}>
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
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
      <p className="section-kicker" id={id}>
        {kicker}
      </p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
}

function MetricTile({
  label,
  value,
  highlight
}: {
  label: string;
  value: string;
  highlight: string;
}) {
  return (
    <article className="metric-tile">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{highlight}</span>
    </article>
  );
}

function StoryLine({
  label,
  value,
  compact
}: {
  label: string;
  value: string[] | string;
  compact: boolean;
}) {
  const text =
    typeof value === "string"
      ? value
      : compact
        ? value.slice(0, 2).join(" · ")
        : value.join(" · ");

  return (
    <p className="story-inline">
      <span className="story-label-inline">{label}:</span>
      {text}
    </p>
  );
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

function ProjectCard({
  project,
  compact = false,
  featured = false
}: {
  project: (typeof projects)[number];
  compact?: boolean;
  featured?: boolean;
}) {
  const links = project.links.filter((link) => isUsefulLink(link.href));

  return (
    <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
      <header className="project-card__header">
        <div className="project-card__meta">
          {featured ? <span className="project-kicker">Flagship product</span> : null}
          <span className="project-kicker project-kicker--subtle">{project.timeline}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-strapline">{project.eyebrow}</p>
        <p className="project-role">{project.role}</p>
        <p>{project.description}</p>
      </header>

      <div className={`project-story ${compact ? "project-story--compact" : ""}`}>
        <p className="project-story__summary">
          {project.problem}
        </p>
        <div className="story-block">
          <StoryLine
            label="Technical challenges"
            value={project.technicalChallenges}
            compact={compact}
          />
          <StoryLine label="Architecture" value={project.architecture} compact={compact} />
          <StoryLine label="Results" value={project.results} compact={compact} />
          <div className="story-stack-block">
            <p className="story-label-inline">Technologies used:</p>
            <div className="story-content">{renderTagRow(project.stack)}</div>
          </div>
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
    </article>
  );
}

function CompactListCard({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="compact-card">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

const architectureSignals = [
  "Own the system boundary first, then optimize the components that sit inside it.",
  "Model-driven design over ad hoc logic to reduce cognitive load across teams.",
  "Every product decision is validated by observable behavior and failure analysis."
];

const processSignals = [
  "Problem framing with explicit success metrics before implementation.",
  "Architectural contracts before code: data shape, states, failure modes.",
  "Production confidence checks: retries, idempotency, and traceability."
];

export default function PortfolioPage() {
  const flagshipProjects = projects.filter((project) => project.featured);
  const supportingProjects = projects.filter((project) => !project.featured);

  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <AppNav />

      <main id="top">
        <section className="hero section-shell">
          <p className="hero-kicker">Senior Software Engineer | AI/LLM Systems</p>
          <h1>Portfolio shaped for hiring managers and founders.</h1>
          <p className="hero-copy">
            I build production-minded software and AI products with clear architecture boundaries,
            measurable outcomes, and practical execution that survives handoff and scale.
          </p>
          <div className="hero-actions">
            <a className="btn btn--solid" href="#products">
              See flagship products
            </a>
            <a className="btn btn--soft" href="#architecture">
              Review system design
            </a>
            <a className="btn btn--outline" href="#contact">
              Reach out
            </a>
            <Link className="btn btn--soft" href="/travel">
              Travel photos
            </Link>
            <Link className="btn btn--outline" href="/blog">
              Read latest notes
            </Link>
          </div>
          <div className="metric-grid">
            {productsHeader.map((metric) => (
              <MetricTile
                key={metric.label}
                label={metric.label}
                value={metric.value}
                highlight={metric.emphasis}
              />
            ))}
          </div>
        </section>

        <section className="section-shell section-shell--muted" id="about">
          <SectionHeader
            id="about-title"
            kicker="About me"
            title="From AI experiments to production products"
            subtitle={profile.tagline}
          />
          <p className="section-lead">
            I focus on end-to-end product value: defining outcome-oriented systems, building reliable
            execution layers, and leaving behind clear handoff and observability.
          </p>
          <div className="architecture-cards">
            <CompactListCard title="Core engineering signals" items={architectureSignals} />
            <CompactListCard title="Delivery process" items={processSignals} />
          </div>
        </section>

        <section className="section-shell" id="products">
          <SectionHeader
            id="products-title"
            kicker="Flagship products"
            title="Model-first. Outcome-led. Iteration-safe."
            subtitle="Each flagship is presented as a product case study with architecture, trade-offs, and results."
          />
          <div className="project-grid project-grid--feature">
            {flagshipProjects.map((project) => (
              <ProjectCard key={project.title} featured project={project} />
            ))}
          </div>
        </section>

        <section className="section-shell section-shell--muted" id="architecture">
          <SectionHeader
            id="architecture-title"
            kicker="System design"
            title="How I build reliable AI products"
            subtitle="Pattern set used across flagship products and production features."
          />
          <div className="feature-grid">
            <div className="feature-tile">
              <h3>Problem framing</h3>
              <p>
                I define user outcomes, failure modes, and rollout constraints before choosing frameworks.
                This reduces rework and keeps teams focused on measurable change.
              </p>
            </div>
            <div className="feature-tile">
              <h3>Product architecture</h3>
              <p>
                I split systems by responsibility: orchestration, execution, storage, telemetry, and
                review-facing presentation. Each layer has strict input/output contracts.
              </p>
            </div>
            <div className="feature-tile">
              <h3>Production reliability</h3>
              <p>
                Retries, idempotency, replayability, and operational telemetry are default behaviors,
                not post-launch add-ons.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell" id="projects">
          <SectionHeader
            id="all-projects-title"
            kicker="Supporting portfolio"
            title="Additional high-signal projects"
            subtitle="These products reinforce the same disciplined engineering approach."
          />
          <div className="project-grid project-grid--compact">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.title} compact project={project} />
            ))}
          </div>
        </section>

        <section className="section-shell section-shell--muted" id="skills">
          <SectionHeader
            id="skills-title"
            kicker="Capabilities"
            title="Engineering stack"
            subtitle="Tooling and disciplines for shipping complex software systems end to end."
          />
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="compact-card" key={group.title}>
                <h4>{group.title}</h4>
                <div className="tag-row">
                  {group.skills.map((skill) => (
                    <span className="pill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="education">
          <SectionHeader
            id="education-title"
            kicker="Education"
            title="Depth and discipline"
            subtitle="Foundational training behind hands-on product engineering leadership."
          />
          <div className="education-list">
            {educationItems.map((education) => (
              <article className="compact-card" key={education.school}>
                <h4>{education.school}</h4>
                <p>{education.program}</p>
                <p>{education.detail}</p>
                <ul>
                  {education.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section-shell--last" id="contact">
          <SectionHeader
            id="contact-title"
            kicker="Get in touch"
            title="Open to senior engineering and founder-facing collaboration."
            subtitle="If you're hiring for AI platform, product engineering, or end-to-end execution roles."
          />
          <div className="contact-actions">
            <a
              href={`mailto:${profile.email}`}
              className="btn btn--solid"
              aria-label="Email Sahith"
            >
              {profile.email}
            </a>
            {isConfiguredLink(profile.linkedinHref) ? (
              <a
                href={profile.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--soft"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </a>
            ) : null}
            {isConfiguredLink(profile.githubHref) ? (
              <a
                href={profile.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--soft"
                aria-label="GitHub profile"
              >
                GitHub
              </a>
            ) : null}
            {isConfiguredLink(profile.resumeHref) ? (
              <a href={profile.resumeHref} className="btn btn--outline" aria-label="Download resume">
                Resume
              </a>
            ) : null}
            <Link href="/interests" className="btn btn--outline">
              Founder notes
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
