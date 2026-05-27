import HeroCommandMap from "@/components/HeroCommandMap";
import RouteTransition from "@/components/RouteTransition";
import TravelGallery from "@/components/TravelGallery";
import type { CSSProperties, ReactNode } from "react";
import {
  educationItems,
  profile,
  projects,
  skillGroups,
  travelPhotos
} from "@/data/portfolio";

function SectionHeader({
  id,
  kicker,
  title,
  children
}: {
  id: string;
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-header reveal-up">
      <span className="sticker-label">{kicker}</span>
      <h2 id={id}>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className="project-card reveal-up" style={{ "--card-index": index } as CSSProperties}>
      <div className="project-card__top">
        <span>{project.eyebrow}</span>
        <strong>{String(index + 1).padStart(2, "0")}</strong>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row" aria-label={`${project.title} technology stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-card__links">
        {project.links.map((link) => (
          <a key={link.label} href={link.href} aria-label={`${project.title} ${link.label} link`}>
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <main>
      <section className="hero-shell" id="top" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <span className="slash slash-one" />
          <span className="slash slash-two" />
          <span className="slash slash-three" />
          <span className="dot-field dot-field-one" />
          <span className="dot-field dot-field-two" />
        </div>

        <div className="hero-content hero-content--den reveal-up">
          <h1 id="hero-title">Sahith&apos;s Den</h1>
        </div>

        <div className="hero-route-panel">
          <HeroCommandMap />
        </div>
      </section>

      <RouteTransition direction="down" />

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <SectionHeader id="about-title" kicker="Case file" title="About">
          Software engineering with a taste for systems that feel sharp, useful, and alive.
        </SectionHeader>
        <div className="case-file reveal-up">
          <div className="case-file__stamp">Open profile</div>
          <div>
            <h3>I build products where AI meets practical engineering.</h3>
            <p>
              I am focused on software engineering, ML engineering, agentic systems, computer
              vision, and fullstack products. I like work that crosses boundaries: frontends that
              make complex tools approachable, backends that stay dependable under pressure, and
              ML systems that do more than look impressive in a notebook.
            </p>
          </div>
          <dl className="case-file__facts" aria-label="Profile facts">
            <div>
              <dt>Mode</dt>
              <dd>Builder</dd>
            </div>
            <div>
              <dt>Strength</dt>
              <dd>End-to-end systems</dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd>Useful AI</dd>
            </div>
          </dl>
        </div>
      </section>

      <RouteTransition direction="right" />

      <section className="section projects-section" id="projects" aria-labelledby="projects-title">
        <SectionHeader id="projects-title" kicker="Selected work" title="Projects">
          Four builds with the kind of sharp edges that make the portfolio feel earned.
        </SectionHeader>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <RouteTransition direction="down" />

      <section className="section education-section" id="education" aria-labelledby="education-title">
        <SectionHeader id="education-title" kicker="Training file" title="Education">
          The academic lane behind the engineering work: systems, product building, and applied AI.
        </SectionHeader>
        <div className="education-grid">
          {educationItems.map((item) => (
            <article className="education-card reveal-up" key={item.school}>
              <div>
                <span>{item.school}</span>
                <h3>{item.program}</h3>
                <p>{item.detail}</p>
              </div>
              <div className="tag-row tag-row--skills" aria-label={`${item.school} highlights`}>
                {item.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <RouteTransition direction="right" />

      <section className="section skills-section" id="skills" aria-labelledby="skills-title">
        <SectionHeader id="skills-title" kicker="Loadout" title="Skills">
          A compact map of the tools I reach for across product, infra, and machine learning.
        </SectionHeader>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-panel reveal-up" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tag-row tag-row--skills">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <RouteTransition direction="down" />

      <section className="section travel-section" id="travel" aria-labelledby="travel-title">
        <SectionHeader id="travel-title" kicker="Memory wall" title="Travel Photos">
          A local gallery for cities, food, nature, and people. Drop real images into
          <code> public/images/travel/</code> and update the metadata when you are ready.
        </SectionHeader>
        <TravelGallery photos={travelPhotos} />
      </section>

      <RouteTransition direction="right" />

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-panel reveal-up">
          <span className="sticker-label sticker-label--yellow">Final note</span>
          <h2 id="contact-title">Let&apos;s build something with a pulse.</h2>
          <p>
            I am always up for ambitious software, AI systems that earn their keep, and products
            that make people move faster.
          </p>
          <div className="contact-actions">
            <a className="action-button action-button--primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="action-button" href={profile.linkedinHref}>
              LinkedIn
            </a>
            <a className="action-button" href={profile.githubHref}>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
