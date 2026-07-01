"use client";

import { useMemo, useState } from "react";

export type HooperLineupRole = "PG" | "SG" | "SF" | "PF" | "C" | "6th Man";

export type HooperPlayer = {
  id: string;
  name: string;
  rank: number;
  archetype: string;
  tags: string[];
  shortNote: string;
  revealHint: string;
  lineupRole?: HooperLineupRole;
  jerseyNumber?: number;
  eraLabel?: string;
};

type BasketballTopTenGameProps = {
  players: HooperPlayer[];
};

type StartingFiveSlot = {
  role: HooperLineupRole;
  player: HooperPlayer;
};

const lineupRoles: HooperLineupRole[] = ["PG", "SG", "SF", "PF", "C", "6th Man"];

function formatRank(rank: number) {
  return String(rank).padStart(2, "0");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getTopTags(players: HooperPlayer[]) {
  const tagCounts = new Map<string, number>();

  for (const player of players) {
    for (const tag of player.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([tag]) => tag);
}

function HooperCard({
  player,
  isRevealed,
  onReveal
}: {
  player: HooperPlayer;
  isRevealed: boolean;
  onReveal: () => void;
}) {
  const jerseyLabel = typeof player.jerseyNumber === "number" ? `#${player.jerseyNumber}` : getInitials(player.name);

  return (
    <button
      aria-label={isRevealed ? `${player.name} card revealed` : `Reveal ${player.name} card`}
      aria-pressed={isRevealed}
      className={`hooper-card ${isRevealed ? "is-revealed" : ""}`}
      onClick={onReveal}
      type="button"
    >
      <span className="hooper-card__glow" aria-hidden="true" />
      <span className="hooper-card__topline">
        <span className="hooper-card__rank">#{formatRank(player.rank)}</span>
        <span className="hooper-card__state">{isRevealed ? "Revealed" : "Scouting clue"}</span>
      </span>

      <span className="hooper-card__jersey" aria-hidden="true">
        {isRevealed ? jerseyLabel : "??"}
      </span>

      {isRevealed ? (
        <span className="hooper-card__revealed">
          <span className="hooper-card__name">{player.name}</span>
          <span className="hooper-card__archetype">{player.archetype}</span>
          <span className="hooper-card__note">{player.shortNote}</span>
          <span className="hooper-card__tags" aria-label={`${player.name} taste tags`}>
            {player.tags.map((tag) => (
              <span className="hooper-card__tag" key={`${player.id}-${tag}`}>
                {tag}
              </span>
            ))}
          </span>
          <span className="hooper-card__meta">
            {[player.lineupRole, player.eraLabel].filter(Boolean).join(" | ")}
          </span>
        </span>
      ) : (
        <span className="hooper-card__locked">
          <span className="hooper-card__hint">{player.revealHint}</span>
          <span className="hooper-card__prompt">Tap to reveal</span>
        </span>
      )}
    </button>
  );
}

function HooperBoardControls({
  isLineupVisible,
  onRevealAll,
  onReset,
  onToggleLineup
}: {
  isLineupVisible: boolean;
  onRevealAll: () => void;
  onReset: () => void;
  onToggleLineup: () => void;
}) {
  return (
    <div className="hooper-board__controls" aria-label="Hooper board controls">
      <button className="hooper-board__button" onClick={onRevealAll} type="button">
        Reveal all
      </button>
      <button className="hooper-board__button hooper-board__button--soft" onClick={onReset} type="button">
        Reset board
      </button>
      <button
        aria-controls="starting-five-board"
        aria-expanded={isLineupVisible}
        className="hooper-board__button hooper-board__button--accent"
        onClick={onToggleLineup}
        type="button"
      >
        {isLineupVisible ? "Hide Sahith's Starting Five" : "Reveal Sahith's Starting Five"}
      </button>
    </div>
  );
}

function StartingFiveLineup({ slots, isVisible }: { slots: StartingFiveSlot[]; isVisible: boolean }) {
  return (
    <section
      className={`starting-five-board ${isVisible ? "is-unlocked" : "is-locked"}`}
      id="starting-five-board"
      aria-labelledby="starting-five-title"
    >
      <div className="starting-five-board__header">
        <p className="section-kicker">Lineup</p>
        <h3 id="starting-five-title">Build Sahith&apos;s Starting Five</h3>
        <p>{isVisible ? "The current fantasy lineup from this board." : "A locked lineup board, ready when you are."}</p>
      </div>

      <div className="starting-five-court" aria-live="polite">
        {slots.map(({ role, player }) => (
          <div className="starting-five-slot" data-role={role} key={role}>
            <span className="starting-five-slot__role">{role}</span>
            {isVisible ? (
              <>
                <span className="starting-five-slot__player">{player.name}</span>
                <span className="starting-five-slot__type">{player.archetype}</span>
              </>
            ) : (
              <>
                <span className="starting-five-slot__player">Locked</span>
                <span className="starting-five-slot__type">Reveal the lineup</span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BasketballTasteDNA({ tags }: { tags: string[] }) {
  return (
    <section className="basketball-dna" aria-labelledby="basketball-dna-title">
      <div>
        <p className="section-kicker">Basketball Taste DNA</p>
        <h3 id="basketball-dna-title">What keeps showing up</h3>
      </div>
      <div className="basketball-dna__chips" aria-label="Recurring basketball taste traits">
        {tags.map((tag) => (
          <span className="basketball-dna__chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function BasketballTopTenGame({ players }: BasketballTopTenGameProps) {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [isLineupVisible, setIsLineupVisible] = useState(false);
  const revealedSet = useMemo(() => new Set(revealedIds), [revealedIds]);
  const revealedCount = players.filter((player) => revealedSet.has(player.id)).length;
  const topTags = useMemo(() => getTopTags(players), [players]);
  const lineupSlots = useMemo(
    () =>
      lineupRoles
        .map((role) => ({ role, player: players.find((player) => player.lineupRole === role) }))
        .filter((slot): slot is StartingFiveSlot => Boolean(slot.player)),
    [players]
  );

  function revealPlayer(playerId: string) {
    setRevealedIds((currentIds) => (currentIds.includes(playerId) ? currentIds : [...currentIds, playerId]));
  }

  function revealAll() {
    setRevealedIds(players.map((player) => player.id));
  }

  function resetBoard() {
    setRevealedIds([]);
    setIsLineupVisible(false);
  }

  return (
    <article className="hooper-board-card glass-card">
      <div className="hooper-board__header">
        <div>
          <p className="section-kicker">Basketball</p>
          <h2 id="basketball-title">My Hooper Board</h2>
          <p>10 players I love watching, arguing about, and irrationally defending.</p>
        </div>
        <p className="hooper-board__progress" aria-live="polite">
          <span>{revealedCount}</span> / {players.length} revealed
        </p>
      </div>

      <HooperBoardControls
        isLineupVisible={isLineupVisible}
        onReset={resetBoard}
        onRevealAll={revealAll}
        onToggleLineup={() => setIsLineupVisible((currentValue) => !currentValue)}
      />

      <ol className="hooper-board__grid" aria-label="Favorite basketball player reveal board">
        {players.map((player) => (
          <li className="hooper-board__item" key={player.id}>
            <HooperCard player={player} isRevealed={revealedSet.has(player.id)} onReveal={() => revealPlayer(player.id)} />
          </li>
        ))}
      </ol>

      <StartingFiveLineup isVisible={isLineupVisible} slots={lineupSlots} />
      <BasketballTasteDNA tags={topTags} />
    </article>
  );
}
