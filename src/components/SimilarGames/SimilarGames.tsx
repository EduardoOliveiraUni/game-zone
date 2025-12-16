"use client";

import GameCard from "@/components/GameCard/GameCard";
import type { GameBase } from "@/types/Game";
import styles from "./SimilarGames.module.scss";

type Props = {
  games: GameBase[];
  isFallback?: boolean;
};

export default function SimilarGames({ games, isFallback = false }: Props) {
  if (!games.length) return null;

  return (
    <section className={styles.section}>
      {!isFallback && <h2>Jogos similares</h2>}

      <div className={styles.grid}>
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </section>
  );
}