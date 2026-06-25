import Link from "next/link";
import { type HomepageContent, type HomepageLink, type WorkbenchItem } from "@/data/portfolio";

type HeroWorkbenchProps = {
  hero: HomepageContent["hero"];
  workbenchItems: WorkbenchItem[];
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

function buttonClassName(variant: HomepageLink["variant"]) {
  return `btn btn--${variant}`;
}

function isRoutableHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function HeroActionLink({ action }: { action: HomepageLink }) {
  if (!isConfiguredLink(action.href)) {
    return null;
  }

  if (isRoutableHref(action.href)) {
    return (
      <Link className={buttonClassName(action.variant)} href={action.href}>
        <span>{action.label}</span>
      </Link>
    );
  }

  return (
    <a
      className={buttonClassName(action.variant)}
      href={action.href}
      rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={action.href.startsWith("http") ? "_blank" : undefined}
    >
      <span>{action.label}</span>
    </a>
  );
}

function PixelHeroScene() {
  return (
    <div className="hero-pixel-scene" aria-hidden="true">
      <span className="pixel-grid-texture" />
      <span className="pixel-cloud hero-cloud hero-cloud--one float-subtle" />
      <span className="pixel-cloud pixel-cloud--small hero-cloud hero-cloud--two float-subtle float-subtle--delay" />
      <span className="pixel-city hero-city hero-city--left" />
      <span className="pixel-city hero-city hero-city--right" />
      <span className="pixel-sparkle hero-sparkle hero-sparkle--one" />
      <span className="pixel-sparkle pixel-sparkle--cyan hero-sparkle hero-sparkle--two" />
      <span className="pixel-sparkle pixel-sparkle--violet hero-sparkle hero-sparkle--three" />
    </div>
  );
}

function PixelWorkbenchDiorama() {
  return (
    <div className="pixel-workstation float-subtle float-subtle--slow" aria-hidden="true">
      <div className="pixel-workstation__base" />
      <div className="pixel-workstation__screen">
        <span />
        <span />
        <span />
      </div>
      <div className="pixel-workstation__desk" />
      <div className="pixel-workstation__plant" />
      <div className="pixel-workstation__person" />
      <div className="pixel-workstation__chair" />
      <div className="pixel-workstation__tower" />
      <div className="pixel-workstation__shadow" />
    </div>
  );
}

function WorkbenchRowIcon({ icon }: { icon: WorkbenchItem["icon"] }) {
  return (
    <span className="workbench-row__icon" data-icon={icon} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function HeroWorkbench({ hero, workbenchItems }: HeroWorkbenchProps) {
  const heroActions = hero.ctas.filter((action) => isConfiguredLink(action.href));

  return (
    <div className="hero-workbench">
      <PixelHeroScene />

      <div className="hero-workbench__copy">
        <p className="hero-kicker eyebrow">{hero.kicker}</p>
        <h1 className="hero-title">
          {hero.headlinePrefix} <span className="pixel-gradient-text">{hero.headlineReliable}</span>{" "}
          <span className="pixel-gradient-text pixel-gradient-text--alt">{hero.headlineProduct}</span>{" "}
          {hero.headlineSuffix}
        </h1>
        <p className="hero-copy">{hero.tagline}</p>

        {heroActions.length > 0 ? (
          <div className="hero-actions">
            {heroActions.map((action) => (
              <HeroActionLink action={action} key={action.label} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="hero-workbench__station">
        <PixelWorkbenchDiorama />
      </div>

      <div className="hero-workbench__visual">
        <section className="workbench-console" aria-labelledby="workbench-title">
          <div className="workbench-console__header">
            <p className="eyebrow workbench-console__title" id="workbench-title">
              Product system workbench
            </p>
            <span className="workbench-console__signal" aria-hidden="true" />
          </div>

          <div className="workbench-console__panel">
            {workbenchItems.map((system) => (
              <article className="workbench-row" data-icon={system.icon} key={system.title}>
                <div className="workbench-row__copy">
                  <div className="workbench-row__head">
                    <span className="status-dot" aria-hidden="true" />
                    <p className="workbench-row__title">{system.title}</p>
                  </div>
                  <p className="workbench-row__status">{system.status}</p>
                  <p className="workbench-row__detail">{system.detail}</p>
                </div>
                <WorkbenchRowIcon icon={system.icon} />
              </article>
            ))}
          </div>

          <div className="workbench-console__progress" aria-hidden="true">
            <div className="workbench-console__rail">
              <span className="workbench-progress" />
              <span className="workbench-progress-shimmer" />
              <span className="workbench-progress-marker" />
              <span className="workbench-progress-node workbench-progress-node--start" />
              <span className="workbench-progress-node workbench-progress-node--mid" />
              <span className="workbench-progress-node workbench-progress-node--end" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
