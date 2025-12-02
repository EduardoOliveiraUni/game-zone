"use client";

import { useState, KeyboardEvent } from "react";
import styles from "./SearchInput.module.scss";

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
  buttonLabel?: string;
};

export default function SearchInput({
  onSearch,
  placeholder = "Digite o nome de um jogo...",
  buttonLabel = "Buscar",
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className={styles.button}
        onClick={() => onSearch(searchQuery)}
      >
        {buttonLabel}
      </button>
    </div>
  );
}