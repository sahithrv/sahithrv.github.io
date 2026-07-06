export type NbaPrediction = {
  category: string;
  pick: string;
  note: string;
};

type NbaPredictionsBoardProps = {
  predictions: NbaPrediction[];
  badge?: string;
};

export default function NbaPredictionsBoard({ predictions, badge = "2026 edition" }: NbaPredictionsBoardProps) {
  return (
    <article className="nba-predictions-card glass-card" aria-labelledby="basketball-title">
      <div className="nba-predictions__header">
        <div className="nba-predictions__heading">
          <p className="section-kicker">Basketball</p>
          <h2 id="basketball-title">NBA Super-Early Predictions</h2>
          <p>A tiny forecast board for takes I may have to defend later.</p>
        </div>
        <span className="nba-predictions__badge">{badge}</span>
      </div>

      <ol className="nba-predictions__grid" aria-label="NBA super-early predictions">
        {predictions.map((prediction) => (
          <li className="nba-prediction" key={prediction.category}>
            <p className="nba-prediction__category">{prediction.category}</p>
            <p className="nba-prediction__pick">{prediction.pick}</p>
            <p className="nba-prediction__note">{prediction.note}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
