"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type GameRecommendation = {
  title: string;
  explanation: string;
};

type GameRecommendationListProps = {
  games: GameRecommendation[];
};

function formatRank(index: number) {
  return String(index + 1).padStart(2, "0");
}

function gameId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function GameDetailModal({
  game,
  index,
  onClose
}: {
  game: GameRecommendation;
  index: number;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = `game-modal-${gameId(game.title)}`;
  const descriptionId = `${titleId}-description`;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="game-detail-modal-shell" role="presentation" onClick={onClose}>
      <article
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="game-detail-modal"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close game explanation"
          className="game-detail-modal__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          Close
        </button>
        <p className="game-detail-modal__rank">Game {formatRank(index)}</p>
        <h2 id={titleId}>{game.title}</h2>
        <p id={descriptionId}>{game.explanation}</p>
      </article>
    </div>
  );
}

export default function GameRecommendationList({ games }: GameRecommendationListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const lastFocusedGame = useRef<string | null>(null);
  const activeGame = activeIndex === null ? null : games[activeIndex] ?? null;

  useEffect(() => {
    if (!activeGame) {
      return;
    }

    const existingOverflow = document.body.style.overflow;
    const existingPaddingRight = document.body.style.paddingRight;
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollWidth > 0) {
      document.body.style.paddingRight = `${scrollWidth}px`;
    }

    return () => {
      document.body.style.overflow = existingOverflow;
      document.body.style.paddingRight = existingPaddingRight;
    };
  }, [activeGame]);

  function closeGame() {
    const titleToRestore = lastFocusedGame.current;
    setActiveIndex(null);

    requestAnimationFrame(() => {
      const trigger = titleToRestore ? triggerRefs.current.get(titleToRestore) : null;
      trigger?.focus();
    });
    lastFocusedGame.current = null;
  }

  return (
    <article className="interest-games-card glass-card">
      <div className="interest-panel-header">
        <p className="section-kicker">Games</p>
        <h2 id="gaming-title">Top game recommendations</h2>
      </div>
      <ol className="game-list game-list--compact" aria-label="Top game recommendations">
        {games.map((game, index) => (
          <li className="game-list__item" key={game.title}>
            <button
              aria-label={`Open explanation for ${game.title}`}
              className="game-card game-card--compact"
              onClick={() => {
                lastFocusedGame.current = game.title;
                setActiveIndex(index);
              }}
              ref={(node) => {
                if (node) {
                  triggerRefs.current.set(game.title, node);
                } else {
                  triggerRefs.current.delete(game.title);
                }
              }}
              type="button"
            >
              <span className="game-card__rank">{formatRank(index)}</span>
              <h3>{game.title}</h3>
            </button>
          </li>
        ))}
      </ol>

      {activeGame
        ? createPortal(<GameDetailModal game={activeGame} index={activeIndex ?? 0} onClose={closeGame} />, document.body)
        : null}
    </article>
  );
}
