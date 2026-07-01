import AnimatedPixelBackground from "@/components/AnimatedPixelBackground";
import BasketballTopTenGame, { type HooperPlayer } from "@/components/BasketballTopTenGame";
import FooterCTA from "@/components/FooterCTA";
import GameRecommendationList, { type GameRecommendation } from "@/components/GameRecommendationList";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { homepageContent } from "@/data/portfolio";

const basketballPlayers: HooperPlayer[] = [
  {
    id: "luka-doncic",
    name: "Luka Doncic",
    rank: 1,
    archetype: "Pace-bending creator",
    tags: ["Pace", "Playmaking", "Tough shots"],
    shortNote: "Editable placeholder: the player who makes impossible angles feel routine.",
    revealHint: "The stepback conductor.",
    lineupRole: "PG",
    jerseyNumber: 77,
    eraLabel: "Mavericks"
  },
  {
    id: "lebron-james",
    name: "Lebron James",
    rank: 2,
    archetype: "All-court engine",
    tags: ["Control", "Power", "Basketball IQ"],
    shortNote: "Editable placeholder: the forever benchmark for seeing every option on the floor.",
    revealHint: "The chessboard pick.",
    lineupRole: "SF",
    jerseyNumber: 23,
    eraLabel: "Lakers"
  },
  {
    id: "austin-reaves",
    name: "Austin Reaves",
    rank: 3,
    archetype: "Crafty connector",
    tags: ["Feel", "Underdog", "Big moments"],
    shortNote: "Editable placeholder: the sneaky-good guard I keep finding reasons to defend.",
    revealHint: "The irrationally defended favorite.",
    lineupRole: "6th Man",
    jerseyNumber: 15,
    eraLabel: "Lakers"
  },
  {
    id: "victor-wembanyama",
    name: "Victor Wembanyama",
    rank: 4,
    archetype: "Alien rim guardian",
    tags: ["Alien tools", "Defense", "Upside"],
    shortNote: "Editable placeholder: the future-facing player who makes normal basketball geometry look outdated.",
    revealHint: "The impossible build.",
    lineupRole: "C",
    jerseyNumber: 1,
    eraLabel: "Spurs"
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    rank: 5,
    archetype: "Gravity machine",
    tags: ["Movement", "Range", "Joy"],
    shortNote: "Editable placeholder: the player who turns spacing, rhythm, and audacity into a whole aesthetic.",
    revealHint: "The half-court threat.",
    lineupRole: "SG",
    jerseyNumber: 30,
    eraLabel: "Warriors"
  },
  {
    id: "anthony-edwards",
    name: "Anthony Edwards",
    rank: 6,
    archetype: "Downhill shot maker",
    tags: ["Explosiveness", "Confidence", "Shot making"],
    shortNote: "Editable placeholder: the burst, bravado, and highlight energy pick.",
    revealHint: "The poster-ready spark.",
    jerseyNumber: 5,
    eraLabel: "Timberwolves"
  },
  {
    id: "nikola-jokic",
    name: "Nikola Jokic",
    rank: 7,
    archetype: "Passing hub genius",
    tags: ["Passing", "Touch", "Control"],
    shortNote: "Editable placeholder: the player who makes simple reads feel like secret code.",
    revealHint: "The casual genius.",
    jerseyNumber: 15,
    eraLabel: "Nuggets"
  },
  {
    id: "bam-adebayo",
    name: "Bam Adebayo",
    rank: 8,
    archetype: "Switch-everything anchor",
    tags: ["Defense", "Switchability", "Glue guy"],
    shortNote: "Editable placeholder: the defensive taste pick, built on versatility and trust.",
    revealHint: "The defensive glue.",
    jerseyNumber: 13,
    eraLabel: "Heat"
  },
  {
    id: "cade-cunningham",
    name: "Cade Cunningham",
    rank: 9,
    archetype: "Big guard organizer",
    tags: ["Pace", "Size", "Playmaking"],
    shortNote: "Editable placeholder: the smooth, patient creator whose game keeps aging well.",
    revealHint: "The calm table-setter.",
    jerseyNumber: 2,
    eraLabel: "Pistons"
  },
  {
    id: "kevin-durant",
    name: "Kevin Durant",
    rank: 10,
    archetype: "Mismatch scorer",
    tags: ["Shot making", "Length", "Mismatch"],
    shortNote: "Editable placeholder: the pure bucket-getter slot for effortless scoring taste.",
    revealHint: "The unfair jumper.",
    lineupRole: "PF",
    jerseyNumber: 35,
    eraLabel: "Suns"
  }
];

const mustPlayGames: GameRecommendation[] = [
  {
    title: "Breath of the Wild",
    explanation:
      "Placeholder: A note for why this game belongs here, likely about exploration, freedom, and the feeling of discovering things at my own pace."
  },
  {
    title: "Persona 5 Royal",
    explanation:
      "Placeholder: A note for why this game belongs here, probably covering the style, music, character arcs, and how much personality the whole game has."
  },
  {
    title: "GTA V",
    explanation:
      "Placeholder: A note for why this game belongs here, with room to talk about the open world, the missions, and how replayable Los Santos feels."
  },
  {
    title: "Overwatch",
    explanation:
      "Placeholder: A note for why this game belongs here, especially the team moments, hero designs, and the matches that felt chaotic in the best way."
  },
  {
    title: "Baldur's Gate",
    explanation:
      "Placeholder: A note for why this game belongs here, likely about choices, party dynamics, role-playing, and stories that can go sideways fast."
  },
  {
    title: "Super Mario Galaxy",
    explanation:
      "Placeholder: A note for why this game belongs here, probably about the creativity, movement, music, and pure platforming joy."
  },
  {
    title: "Red Dead Redemption 2",
    explanation:
      "Placeholder: A note for why this game belongs here, with space for the world, pacing, characters, and the quiet moments between big story beats."
  },
  {
    title: "Super Smash Brothers Ultimate",
    explanation:
      "Placeholder: A note for why this game belongs here, especially the couch-competition energy, giant roster, and ridiculous comeback moments."
  },
  {
    title: "CS:GO",
    explanation:
      "Placeholder: A note for why this game belongs here, probably about precision, tension, teamwork, and how every round can turn on one decision."
  },
  {
    title: "NBA 2K",
    explanation:
      "Placeholder: A note for why this game belongs here, with room to explain the basketball feel, favorite modes, and why it stays in the rotation."
  }
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
          <AnimatedPixelBackground baseSrc="/images/backgrounds/background2.png" layers={[]} />
          <SubpageHero title="Interests" variant="interests" />

          <section
            className="section-shell section-frame section-stack subpage-panel interests-compact-section interest-section"
            aria-labelledby="basketball-title"
          >
            <div className="interests-compact-grid">
              <BasketballTopTenGame players={basketballPlayers} />
              <GameRecommendationList games={mustPlayGames} />
            </div>
          </section>
        </div>

        <FooterCTA />
      </main>
    </div>
  );
}
