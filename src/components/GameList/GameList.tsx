"use client";

import GameCard from "@/components/GameCard/GameCard";
import type { GameBase } from "@/types/Game";
import styles from "./GameList.module.scss";

type Props = {
  games: GameBase[];
};

export default function GameList({ games }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {games.map((game, i) => (
          <div key={game.id} style={{ "--index": i } as React.CSSProperties}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
}