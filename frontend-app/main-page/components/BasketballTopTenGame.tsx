"use client";

import { FormEvent, useMemo, useState } from "react";

type BasketballTopTenGameProps = {
  players: string[];
};

function normalizeGuess(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function formatRank(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function BasketballTopTenGame({ players }: BasketballTopTenGameProps) {
  const answerKeys = useMemo(() => players.map((player) => normalizeGuess(player)), [players]);
  const [guess, setGuess] = useState("");
  const [guessedKeys, setGuessedKeys] = useState<string[]>([]);
  const [status, setStatus] = useState("0 of 10 found");

  const guessedSet = new Set(guessedKeys);
  const foundCount = guessedKeys.length;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeGuess(guess);
    const matchIndex = answerKeys.indexOf(normalized);

    if (!normalized) {
      setStatus("Type a name first");
      return;
    }

    if (matchIndex === -1) {
      setStatus("Not on this list");
      setGuess("");
      return;
    }

    if (guessedSet.has(normalized)) {
      setStatus(`${players[matchIndex]} is already in`);
      setGuess("");
      return;
    }

    const nextGuessedKeys = [...guessedKeys, normalized];
    setGuessedKeys(nextGuessedKeys);
    setGuess("");
    setStatus(nextGuessedKeys.length === players.length ? "Full board cleared" : `${players[matchIndex]} found`);
  }

  function resetGame() {
    setGuess("");
    setGuessedKeys([]);
    setStatus("0 of 10 found");
  }

  function revealAnswers() {
    setGuess("");
    setGuessedKeys(answerKeys);
    setStatus("Answers revealed");
  }

  return (
    <article className="basketball-guess-card glass-card">
      <div className="guess-game__header">
        <div>
          <p className="section-kicker">Basketball</p>
          <h2 id="basketball-title">Guess my current top 10</h2>
        </div>
        <span className="guess-game__score">
          {foundCount}/{players.length}
        </span>
      </div>

      <form className="guess-game__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="player-guess">
          Player guess
        </label>
        <input
          autoComplete="off"
          className="guess-game__input"
          id="player-guess"
          onChange={(event) => setGuess(event.target.value)}
          placeholder="Type a player name"
          type="text"
          value={guess}
        />
        <button className="guess-game__button" type="submit">
          Guess
        </button>
        <button className="guess-game__button guess-game__button--soft" onClick={resetGame} type="button">
          Reset
        </button>
        <button className="guess-game__button guess-game__button--soft" onClick={revealAnswers} type="button">
          Reveal
        </button>
      </form>

      <p className="guess-game__status" aria-live="polite">
        {status}
      </p>

      <ol className="guess-game__board" aria-label="Basketball top ten guesses">
        {players.map((player, index) => {
          const isGuessed = guessedSet.has(answerKeys[index]);

          return (
            <li className={`guess-game__slot ${isGuessed ? "is-guessed" : ""}`} key={player}>
              <span className="guess-game__rank">{formatRank(index)}</span>
              <span className="guess-game__name">{isGuessed ? player : "Hidden"}</span>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
