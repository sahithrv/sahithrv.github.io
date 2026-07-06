export type GameRecommendation = {
  title: string;
  tag: string;
};

type GameRecommendationListProps = {
  games: GameRecommendation[];
};

function formatRank(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function GameRecommendationList({ games }: GameRecommendationListProps) {
  return (
    <article className="interest-games-card glass-card">
      <div className="interest-panel-header">
        <p className="section-kicker">Games</p>
        <h2 id="gaming-title">Sahith&apos;s Game Shelf</h2>
      </div>
      <ol className="game-shelf" aria-label="Sahith's game shelf">
        {games.map((game, index) => (
          <li className="game-shelf__item" key={game.title}>
            <span className="game-shelf__rank">{formatRank(index)}</span>
            <span className="game-shelf__title">{game.title}</span>
            <span className="game-shelf__tag">{game.tag}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
