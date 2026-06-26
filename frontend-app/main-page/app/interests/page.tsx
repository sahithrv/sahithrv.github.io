import FooterCTA from "@/components/FooterCTA";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { homepageContent } from "@/data/portfolio";

const basketballPlayerSlots = Array.from({ length: 10 }, (_, index) => ({
  rank: String(index + 1).padStart(2, "0"),
  name: `Player ${String(index + 1).padStart(2, "0")}`,
  note: "Add why this player belongs in your current best-player list."
}));

const mustPlayGames = Array.from({ length: 10 }, (_, index) => ({
  rank: String(index + 1).padStart(2, "0"),
  title: `Must-play game ${String(index + 1).padStart(2, "0")}`,
  description: "Add the game title and your reason for recommending it."
}));

function InterestPixelIcon() {
  return (
    <span className="interest-card__pixel-icon" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function RankedPlayerList() {
  return (
    <article className="interest-list-panel glass-card">
      <div className="interest-panel-header">
        <p className="section-kicker">Current ranking</p>
        <h3>Best players right now</h3>
        <p>This is the list area for your current player rankings and short reasoning.</p>
      </div>
      <ol className="rank-list">
        {basketballPlayerSlots.map((player) => (
          <li key={player.rank}>
            <span className="rank-list__number">{player.rank}</span>
            <div>
              <h4>{player.name}</h4>
              <p>{player.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

function GameRecommendationList() {
  return (
    <ol className="game-list" aria-label="Must-play game recommendations">
      {mustPlayGames.map((game) => (
        <li className="game-card glass-card interactive-card" key={game.rank}>
          <span className="game-card__rank">{game.rank}</span>
          <h3>{game.title}</h3>
          <p>{game.description}</p>
        </li>
      ))}
    </ol>
  );
}

export default function InterestsPage() {
  return (
    <div className="portfolio-shell portfolio-shell--pixel pixel-polished-theme pixel-page-bg subpage-shell subpage-shell--interests">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={homepageContent.navItems} variant="pixel" />
      <main id="top">
        <SubpageHero
          kicker="Interests"
          title="Basketball and gaming notes"
          description="A personal index for the teams, players, and games I want to keep track of and expand with longer notes over time."
          variant="interests"
          meta={["Basketball", "Gaming", "Ranked lists"]}
        />

        <section
          className="section-shell section-frame section-stack subpage-panel interests-basketball-section interest-section"
          aria-labelledby="basketball-title"
        >
          <div className="section-header">
            <p className="section-kicker">Basketball</p>
            <h2 id="basketball-title">Team notes and current player rankings</h2>
            <p className="section-lead">
              This section is ready for your favorite team notes, favorite players, and current best-player list.
            </p>
          </div>

          <div className="interest-layout interest-layout--basketball">
            <article className="interest-feature-card glass-card interactive-card">
              <InterestPixelIcon />
              <p className="section-kicker">Favorite team</p>
              <h3>Favorite team to add</h3>
              <p>
                Use this space to explain the team you follow, what drew you to them, and the players or moments that
                made the team matter to you.
              </p>
              <div className="interest-prompt-row" aria-label="Favorite team note prompts">
                <span className="chip">Team identity</span>
                <span className="chip">Favorite era</span>
                <span className="chip">Key players</span>
              </div>
            </article>

            <RankedPlayerList />
          </div>
        </section>

        <section
          className="section-shell section-frame section-stack subpage-panel interests-gaming-section interest-section"
          aria-labelledby="gaming-title"
        >
          <div className="section-header">
            <p className="section-kicker">Gaming</p>
            <h2 id="gaming-title">Must-play game recommendations</h2>
            <p className="section-lead">
              Ten recommendation slots for games you consider essential, with room for the descriptions you plan to add.
            </p>
          </div>

          <GameRecommendationList />
        </section>

        <FooterCTA />
      </main>
    </div>
  );
}
