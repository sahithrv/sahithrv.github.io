import Link from "next/link";
import { homepageContent, type HomepageContent, type HomepageLink } from "@/data/portfolio";

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
  return `footer-cta__button footer-cta__button--${variant}`;
}

function isRoutableHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function FooterPixelScene({ ambient }: { ambient: boolean }) {
  return (
    <div className="footer-cta__scene" aria-hidden="true">
      <span className="footer-cta__star footer-cta__star--one" />
      <span className="footer-cta__star footer-cta__star--two" />
      {ambient ? (
        <>
          <span className="footer-cta__shooting-star footer-cta__shooting-star--one" />
          <span className="footer-cta__shooting-star footer-cta__shooting-star--two" />
        </>
      ) : null}
      <span className="footer-cta__city footer-cta__city--left" />
      <span className="footer-cta__city footer-cta__city--right" />
    </div>
  );
}

function PixelHeart() {
  return (
    <span className="footer-cta__pixel-heart" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function FooterActionLink({ action }: { action: HomepageLink }) {
  if (isRoutableHref(action.href)) {
    return (
      <Link className={buttonClassName(action.variant)} href={action.href}>
        {action.label}
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
      {action.label}
    </a>
  );
}

export default function FooterCTA({
  content = homepageContent.footerCta,
  ambient = false
}: {
  content?: HomepageContent["footerCta"];
  ambient?: boolean;
}) {
  const actions = content.links.filter((action) => isConfiguredLink(action.href));

  return (
    <footer
      className={`footer-cta footer-cta--pixel${ambient ? " footer-cta--ambient" : ""}`}
      aria-labelledby="footer-cta-title"
    >
      <FooterPixelScene ambient={ambient} />
      <div className="footer-cta__inner">
        <div className="footer-cta__copy">
          <p className="footer-cta__kicker">
            {content.kicker}
            <PixelHeart />
          </p>
          <h2 id="footer-cta-title">{content.headline}</h2>
          <p className="footer-cta__description">{content.description}</p>
        </div>

        {actions.length > 0 ? (
          <nav className="footer-cta__actions" aria-label="Footer contact links">
            {actions.map((action) => (
              <FooterActionLink action={action} key={action.label} />
            ))}
          </nav>
        ) : null}

        <p className="footer-cta__meta">{content.note}</p>
      </div>
    </footer>
  );
}
