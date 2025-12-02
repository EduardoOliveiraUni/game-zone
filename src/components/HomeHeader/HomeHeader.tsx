"use client";

import { useState, KeyboardEvent } from "react";
import styles from "./HomeHeader.module.scss";

type Props = {
  onSearch: (query: string) => void;
};

export default function HomeHeader({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Descubra jogos parecidos</h1>
        <p>com os que você já jogou</p>

        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Digite o nome de um jogo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />

          <button
            className={styles.button}
            onClick={() => onSearch(searchQuery)}
          >
            Encontrar jogos parecidos
          </button>
        </div>
      </div>
    </header>
  );
}