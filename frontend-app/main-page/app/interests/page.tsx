import Image from "next/image";
import Link from "next/link";
import TravelGallery from "@/components/TravelGallery";
import { travelPhotos } from "@/data/portfolio";

const basketballNotes = [
  {
    title: "Pickup Rhythm",
    body: "Fast reads, clean spacing, and the small adjustments that make a run feel locked in."
  },
  {
    title: "NBA Storylines",
    body: "Following team identity, player development, late-game decisions, and playoff pressure."
  },
  {
    title: "Hoop IQ",
    body: "The tactics side: pace, mismatches, defensive coverages, and how one possession changes a game."
  }
];

const gamingNotes = [
  {
    title: "Competitive Edge",
    body: "Games with mechanics to master, strategy to refine, and enough pressure to make every round matter."
  },
  {
    title: "Co-op Nights",
    body: "The best sessions are still the ones where the squad is laughing while somehow making the plan work."
  },
  {
    title: "Clip Review",
    body: "I like the feedback loop: review the moment, find the habit, adjust the next match."
  }
];

const travelStats = [
  { label: "Cities", value: "Night walks" },
  { label: "Food", value: "Local first" },
  { label: "Camera roll", value: "Always full" }
];

export const metadata = {
  title: "Sahith | Interests",
  description: "Basketball, gaming, and travel interests from Sahith's portfolio."
};

export default function InterestsPage() {
  return (
    <main className="interests-page">
      <header className="interests-nav" aria-label="Interests navigation">
        <Link className="interests-nav__brand" href="/">
          Sahith&apos;s Den
        </Link>
        <nav className="interests-nav__links" aria-label="Interest sections">
          <a href="#basketball">Basketball</a>
          <a href="#gaming">Gaming</a>
          <a href="#travel">Travel</a>
        </nav>
      </header>

      <section className="interests-hero" aria-labelledby="interests-title">
        <div className="interests-hero__backdrop" aria-hidden="true">
          <div className="interests-hero__image interests-hero__image--one">
            <Image
              src="/images/travel/neon-crossing.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 800px) 65vw, 34vw"
              unoptimized
            />
          </div>
          <div className="interests-hero__image interests-hero__image--two">
            <Image
              src="/images/travel/ridge-line.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 800px) 62vw, 30vw"
              unoptimized
            />
          </div>
          <div className="interests-hero__image interests-hero__image--three">
            <Image
              src="/images/travel/market-bite.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 800px) 55vw, 24vw"
              unoptimized
            />
          </div>
        </div>

        <div className="interests-hero__content">
          <span className="interest-kicker">Off the build log</span>
          <h1 id="interests-title">Interests</h1>
          <p>
            Basketball rhythm, competitive games, and the travel memories that deserve their own
            corner of the site.
          </p>
          <div className="interest-tabs" aria-label="Jump to interest">
            <a className="interest-tab interest-tab--basketball" href="#basketball">
              Basketball
            </a>
            <a className="interest-tab interest-tab--gaming" href="#gaming">
              Gaming
            </a>
            <a className="interest-tab interest-tab--travel" href="#travel">
              Travel
            </a>
          </div>
        </div>
      </section>

      <section
        className="interest-section interest-section--basketball"
        id="basketball"
        aria-labelledby="basketball-title"
      >
        <div className="interest-section__header">
          <span className="interest-kicker">Section 01</span>
          <h2 id="basketball-title">Basketball</h2>
          <p>
            The sport I come back to for pace, creativity, and that perfect blend of instinct and
            structure.
          </p>
        </div>

        <div className="basketball-layout">
          <div className="basketball-court" aria-hidden="true">
            <span className="basketball-court__rim" />
            <span className="basketball-court__paint" />
            <span className="basketball-court__arc" />
            <span className="basketball-court__ball" />
          </div>

          <div className="interest-card-grid">
            {basketballNotes.map((note) => (
              <article className="interest-card" key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="interest-section interest-section--gaming"
        id="gaming"
        aria-labelledby="gaming-title"
      >
        <div className="interest-section__header">
          <span className="interest-kicker">Section 02</span>
          <h2 id="gaming-title">Gaming</h2>
          <p>
            A mix of competitive focus, squad chaos, and the kind of systems thinking that sneaks
            into every good game.
          </p>
        </div>

        <div className="gaming-layout">
          <div className="gaming-panel" aria-hidden="true">
            <div className="gaming-panel__screen">
              <span>GG</span>
              <strong>Ready</strong>
            </div>
            <div className="gaming-panel__keys">
              <span>W</span>
              <span>A</span>
              <span>S</span>
              <span>D</span>
            </div>
          </div>

          <div className="interest-card-grid">
            {gamingNotes.map((note) => (
              <article className="interest-card interest-card--glass" key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="interest-section interest-section--travel"
        id="travel"
        aria-labelledby="travel-title"
      >
        <div className="interest-section__header interest-section__header--split">
          <div>
            <span className="interest-kicker">Section 03</span>
            <h2 id="travel-title">Travel</h2>
            <p>
              The photo wall lives here now: cities, food, nature, and friends collected away from
              the main portfolio flow.
            </p>
          </div>
          <dl className="travel-stat-grid" aria-label="Travel notes">
            {travelStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <TravelGallery photos={travelPhotos} />
      </section>
    </main>
  );
}
