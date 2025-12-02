"use client";

import GameCard, { Game } from "@/components/GameCard/GameCard";
import styles from "./GameList.module.scss";

type Props = {
    games: Game[];
};

export default function GameList({ games }: Props) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>Ou escolha um jogo popular para começar</h2>
            </div>

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