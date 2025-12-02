"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./GameCard.module.scss";

export type Game = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/game/${game.id}`);
  };

  return (
    <article className={styles.card} onClick={goToDetails}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <Image
          src={game.image}
          alt={game.title}
          fill
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      {/* BODY */}
      <div className={styles.body}>
        <h3>{game.title}</h3>
        <p>{game.description}</p>

        <button
          type="button"
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
        >
          Ver mais
        </button>
      </div>
    </article>
  );
}