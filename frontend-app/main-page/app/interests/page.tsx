import SiteTopBar from "@/components/SiteTopBar";
import { profile } from "@/data/portfolio";

const navItems = [{ label: "Photography", href: "/travel" }, { label: "Blog", href: "/blog" }];

const designNotes = [
  {
    title: "Problem framing before implementation",
    summary:
      "Most failed AI work starts with unclear success criteria. I define measurable outcomes first, then choose tooling.",
    labels: ["Decision quality", "Reliability", "Iteration safety"],
    takeaways: [
      "If a project cannot define what success and failure look like, it is not testable.",
      "Architecture decisions become unambiguous once the failure boundary is explicit.",
      "Autonomous paths need a rollback contract, not just a fallback."
    ]
  },
  {
    title: "Product thinking for teams",
    summary:
      "I design features as owned product units, not isolated demos, so other engineers can continue the work with confidence.",
    labels: ["API clarity", "State contracts", "Team handoff"],
    takeaways: [
      "Readable interfaces matter more than clever implementation.",
      "Observability should answer what changed, why it changed, and what failed.",
      "Teams scale better with explicit boundaries and defaults that protect reliability."
    ]
  },
  {
    title: "AI/LLM systems in production",
    summary:
      "LLM products are production-ready only when deterministic operations exist around inference.",
    labels: ["Agent safety", "Reproducibility", "Evidence trails"],
    takeaways: [
      "Prompting is one layer; data integrity and replayability are the contract layer.",
      "Trace stores with state versioning make model behavior debuggable.",
      "Human review loops must be quick, structured, and auditable."
    ]
  }
];

const portfolioSignals = [
  "Prioritize measurable outcomes over feature counts.",
  "Treat architecture as the default artifact, not documentation afterthought.",
  "Make recovery paths first-class so experiments stay cheap and safe.",
  "Design for explainability when AI behavior affects decisions."
];

function NoteCard({
  title,
  summary,
  labels,
  takeaways
}: {
  title: string;
  summary: string;
  labels: string[];
  takeaways: string[];
}) {
  return (
    <article className="note-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="note-metadata">
        {labels.map((label) => (
          <span className="note-label" key={label}>
            {label}
          </span>
        ))}
      </div>
      <ul className="note-highlights">
        {takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
    </article>
  );
}

function SignalCard({ signal }: { signal: string }) {
  return (
    <article className="compact-card">
      <p>{signal}</p>
    </article>
  );
}

export default function NotesPage() {
  return (
    <div className="portfolio-shell">
      <a href="#notes" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={navItems} />
      <main id="notes-page">
        <section className="section-shell notes-hero" id="notes">
          <p className="section-kicker">Founder notes</p>
          <h1>Engineering principles from real products</h1>
          <p className="hero-copy">
            This page is a practical extension of the portfolio: how I frame problems, design
            production-safe AI systems, and protect teams from avoidable technical drift.
          </p>
        </section>

        <section className="section-shell section-shell--muted">
          <div className="section-header">
            <p className="section-kicker">Signals I optimize for</p>
            <h2>How I keep engineering work reliable and shippable</h2>
          </div>
          <div className="notes-grid">
            {portfolioSignals.map((signal) => (
              <SignalCard key={signal} signal={signal} />
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="section-header">
            <p className="section-kicker">Case-study mindset</p>
            <h2>Practices used in flagship product launches</h2>
            <p className="section-lead">
              Notes derived from ModelExpress, Minecraft AI Agent Studio, and Roasty development.
            </p>
          </div>
          <div className="notes-grid">
            {designNotes.map((note) => (
              <NoteCard
                key={note.title}
                title={note.title}
                summary={note.summary}
                labels={note.labels}
                takeaways={note.takeaways}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
