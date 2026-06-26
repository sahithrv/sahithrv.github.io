import Link from "next/link";
import { type HomepageContent, type HomepageLink } from "@/data/portfolio";

type HeroWorkbenchProps = {
  hero: HomepageContent["hero"];
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

export default function HeroWorkbench({ hero }: HeroWorkbenchProps) {
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
    </div>
  );
}
