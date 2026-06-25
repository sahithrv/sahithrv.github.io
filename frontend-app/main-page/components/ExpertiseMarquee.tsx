const expertiseLabels = [
  "AI/LLM Systems",
  "RAG",
  "Agentic Workflows",
  "Computer Vision",
  "Distributed Training",
  "Next.js",
  "FastAPI",
  "Observability",
  "Deployment Safety",
  "Product Engineering"
];

export default function ExpertiseMarquee() {
  const loopedLabels = [...expertiseLabels, ...expertiseLabels];

  return (
    <section className="expertise-marquee-shell" aria-label="Expertise ribbon">
      <p className="eyebrow expertise-marquee__header">Expertise signals</p>
      <ul className="sr-only">
        {expertiseLabels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div className="expertise-marquee" aria-hidden="true">
        <div className="expertise-marquee__track">
          {loopedLabels.map((label, index) => (
            <span className="expertise-marquee__chip" key={`${label}-${index}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="expertise-marquee__fallback" aria-hidden="true">
        {expertiseLabels.map((label) => (
          <span className="expertise-marquee__chip" key={label}>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
