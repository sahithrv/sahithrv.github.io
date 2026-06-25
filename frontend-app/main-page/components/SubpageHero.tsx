type SubpageHeroVariant = "travel" | "blog" | "interests";

type SubpageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  meta?: string[];
  variant: SubpageHeroVariant;
};

function SubpagePixelScene({ variant }: { variant: SubpageHeroVariant }) {
  return (
    <div className={`subpage-pixel-scene subpage-pixel-scene--${variant}`} aria-hidden="true">
      <span className="pixel-grid-texture subpage-pixel-scene__grid" />
      <span className="pixel-cloud pixel-cloud--small subpage-cloud subpage-cloud--one float-subtle" />
      <span className="pixel-cloud pixel-cloud--small subpage-cloud subpage-cloud--two float-subtle float-subtle--delay" />
      <span className="pixel-city subpage-city" />
      <span className="pixel-sparkle subpage-sparkle subpage-sparkle--one" />
      <span className="pixel-sparkle pixel-sparkle--cyan subpage-sparkle subpage-sparkle--two" />
      <span className={`subpage-pixel-icon subpage-pixel-icon--${variant}`}>
        <span />
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

export default function SubpageHero({ kicker, title, description, meta = [], variant }: SubpageHeroProps) {
  const titleId = `${variant}-page-title`;

  return (
    <section
      className={`section-shell section-frame section-stack subpage-hero subpage-hero--${variant}`}
      aria-labelledby={titleId}
    >
      <SubpagePixelScene variant={variant} />
      <div className="subpage-hero__content">
        <p className="section-kicker eyebrow">{kicker}</p>
        <h1 id={titleId}>{title}</h1>
        <p className="section-lead">{description}</p>
        {meta.length > 0 ? (
          <div className="subpage-hero__meta" aria-label={`${kicker} summary`}>
            {meta.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
