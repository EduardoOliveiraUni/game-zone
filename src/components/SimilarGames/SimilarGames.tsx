"use client";

import GameCard from "@/components/GameCard/GameCard";
import type { Game } from "@/components/GameCard/GameCard";
import styles from "./SimilarGames.module.scss";

type Props = {
  games: Game[];
};

export default function SimilarGames({ games }: Props) {
  return (
    <section className={styles.section}>
      <h2>Jogos parecidos</h2>

      <div className={styles.grid}>
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </section>
  );
}