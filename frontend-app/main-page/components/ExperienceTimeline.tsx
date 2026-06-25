import { type Project } from "@/data/portfolio";

type ExperienceTimelineProps = {
  badge?: string;
  items: Project[];
};

function getTimelineYear(value: string) {
  const match = value.match(/\d{4}/);
  return match?.[0] ?? value;
}

function getTitleId(title: string) {
  return `experience-${title.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase()}`;
}

function PixelTimelineAccent() {
  return (
    <span className="experience-pixel-accent" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function ExperienceTimeline({ badge = "DEPLOYMENT SAFETY + RELIABILITY", items }: ExperienceTimelineProps) {
  if (items.length === 0) {
    return <p className="photo-list-empty">Experience details will be added soon.</p>;
  }

  return (
    <ol className="experience-timeline experience-timeline--professional" aria-label="Professional experience timeline">
      {items.map((item) => {
        const titleId = getTitleId(item.title);

        return (
          <li className="experience-timeline__item" key={item.title}>
            <div className="experience-timeline__rail" aria-hidden="true">
              <span className="experience-timeline__marker" />
            </div>

            <article className="experience-timeline__card" aria-labelledby={titleId}>
              <div className="experience-timeline__top">
                <div className="experience-timeline__year-block">
                  <span className="experience-timeline__year">{getTimelineYear(item.timeline)}</span>
                  <span className="experience-timeline__year-label">Production work</span>
                </div>
                <span className="experience-timeline__badge">{badge}</span>
              </div>

              <div className="experience-timeline__body">
                <div className="experience-timeline__copy">
                  <p className="experience-timeline__role">{item.role}</p>
                  <h3 id={titleId}>{item.title}</h3>
                  <p className="experience-timeline__description">{item.description}</p>
                </div>
                <PixelTimelineAccent />
              </div>

              <div className="experience-timeline__details">
                <section className="experience-timeline__panel" aria-labelledby={`${titleId}-impact`}>
                  <h4 id={`${titleId}-impact`}>Impact</h4>
                  <ul className="experience-timeline__impact-list">
                    {item.results.slice(0, 3).map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </section>

                <section className="experience-timeline__panel experience-timeline__panel--stack" aria-labelledby={`${titleId}-stack`}>
                  <h4 id={`${titleId}-stack`}>Stack</h4>
                  <div className="experience-timeline__stack" aria-label={`${item.title} technology stack`}>
                    {item.stack.map((tech) => (
                      <span className="experience-timeline__pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
