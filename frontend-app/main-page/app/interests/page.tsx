import AnimatedPixelBackground from "@/components/AnimatedPixelBackground";
import FooterCTA from "@/components/FooterCTA";
import GameRecommendationList, { type GameRecommendation } from "@/components/GameRecommendationList";
import NbaPredictionsBoard, { type NbaPrediction } from "@/components/NbaPredictionsBoard";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { homepageContent } from "@/data/portfolio";
import arcadeBackground from "../../../assets/arcade_background.png";

const nbaPredictions: NbaPrediction[] = [
  {
    category: "MVP",
    pick: "Luka Dončić",
    note: "The narrative plus the numbers finally line up."
  },
  {
    category: "Champions",
    pick: "Lakers",
    note: "Biased? Maybe. Defending it anyway."
  },
  {
    category: "Finals Matchup",
    pick: "Lakers vs Celtics",
    note: "Maximum drama, maximum discourse."
  },
  {
    category: "Breakout Team",
    pick: "Rockets",
    note: "Young, annoying, and built for regular-season chaos."
  },
  {
    category: "Player I'll Irrationally Defend",
    pick: "Austin Reaves",
    note: "The agenda survives all slumps."
  },
  {
    category: "Most Fun League Pass Team",
    pick: "Spurs",
    note: "Wemby makes every possession feel fake."
  },
  {
    category: "Take I May Regret",
    pick: "Lakers top 3 seed",
    note: "Saving this so people can roast me later."
  }
];

const mustPlayGames: GameRecommendation[] = [
  { title: "Breath of the Wild", tag: "Open-world comfort" },
  { title: "Persona 5 Royal", tag: "Style overload" },
  { title: "GTA V", tag: "Chaos sandbox" },
  { title: "Overwatch", tag: "Painfully fun" },
  { title: "Baldur's Gate 3", tag: "Party drama" },
  { title: "Super Mario Galaxy", tag: "Pure joy" },
  { title: "Red Dead Redemption 2", tag: "Cinematic western" },
  { title: "Super Smash Brothers Ultimate", tag: "Couch chaos" }
];

export default function InterestsPage() {
  return (
    <div className="portfolio-shell portfolio-shell--pixel pixel-polished-theme pixel-page-bg subpage-shell subpage-shell--interests">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={homepageContent.navItems} variant="pixel" />
      <main id="top">
        <div className="interests-page-backdrop">
          <AnimatedPixelBackground
            baseSrc={arcadeBackground}
            className="animated-pixel-background--arcade"
            layers={[]}
          />
          <SubpageHero title="Interests" variant="interests" />

          <section
            className="section-shell section-frame section-stack subpage-panel interests-compact-section interest-section"
            aria-labelledby="basketball-title"
          >
            <div className="interests-compact-grid">
              <NbaPredictionsBoard predictions={nbaPredictions} />
              <GameRecommendationList games={mustPlayGames} />
            </div>
          </section>
        </div>

        <FooterCTA />
      </main>
    </div>
  );
}
