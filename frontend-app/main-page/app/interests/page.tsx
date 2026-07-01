import BasketballTopTenGame from "@/components/BasketballTopTenGame";
import FooterCTA from "@/components/FooterCTA";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { homepageContent } from "@/data/portfolio";

const basketballPlayers = [
  "Luka Doncic",
  "Lebron James",
  "Austin Reaves",
  "Victor Wembanyama",
  "Stephen Curry",
  "Anthony Edwards",
  "Nikola Jokic",
  "Bam Adebayo",
  "Cade Cunningham",
  "Kevin Durant"
];

const mustPlayGames = [
  "Breath of the Wild",
  "Persona 5 Royal",
  "GTA V",
  "Overwatch",
  "Baldur's Gate",
  "Super Mario Galaxy",
  "Red Dead Redemption 2",
  "Super Smash Brothers Ultimate",
  "CS:GO",
  "NBA 2K"
];

function formatRank(index: number) {
  return String(index + 1).padStart(2, "0");
}

function GameRecommendationList() {
  return (
    <article className="interest-games-card glass-card">
      <div className="interest-panel-header">
        <p className="section-kicker">Games</p>
        <h2 id="gaming-title">Top game recommendations</h2>
      </div>
      <ol className="game-list game-list--compact" aria-label="Top game recommendations">
        {mustPlayGames.map((game, index) => (
          <li className="game-card game-card--compact" key={game}>
            <span className="game-card__rank">{formatRank(index)}</span>
            <h3>{game}</h3>
          </li>
        ))}
      </ol>
    </article>
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
          title="Basketball and games"
          description="A smaller board for the player rankings and games I care about most right now."
          variant="interests"
          meta={["Top 10 game", "Basketball", "Games"]}
        />

        <section
          className="section-shell section-frame section-stack subpage-panel interests-compact-section interest-section"
          aria-labelledby="basketball-title"
        >
          <div className="interests-compact-grid">
            <BasketballTopTenGame players={basketballPlayers} />
            <GameRecommendationList />
          </div>
        </section>

        <FooterCTA />
      </main>
    </div>
  );
}
