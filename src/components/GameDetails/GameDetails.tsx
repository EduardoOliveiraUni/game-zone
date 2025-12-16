"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./GameDetails.module.scss";
import type { GameDetail } from "@/types/Game";

type Props = {
  game: GameDetail;
};

export default function GameDetails({ game }: Props) {
  const router = useRouter();

  return (
    <section className={styles.section}>
      {/* BOTÃO VOLTAR */}
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Voltar
      </button>

      {/* WRAPPER DO CONTEÚDO */}
      <div className={styles.wrapper}>
        {/* IMAGEM */}
        <div className={styles.imageWrapper}>
          <Image
            src={game.image}
            alt={game.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* INFOS */}
        <div className={styles.info}>
          <div className={styles.meta}>
            <span className={styles.genre}>{game.genre}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.year}>{game.releaseYear}</span>
          </div>

          <h1 className={styles.title}>{game.title}</h1>

          <p className={styles.description}>{game.fullDescription}</p>
        </div>
      </div>
    </section>
  );
}