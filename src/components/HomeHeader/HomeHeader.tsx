"use client";

import SearchInput from "@/components/SearchInput/SearchInput";
import styles from "./HomeHeader.module.scss";

type Props = {
  value: string;
  onSearch: (query: string) => void;
};

export default function HomeHeader({ value, onSearch }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Descubra jogos similares</h1>
        <p>com os que você já jogou</p>

        <div className={styles.searchRow}>
          <SearchInput
            value={value}
            onChange={onSearch}
            onDebouncedChange={onSearch}
            debounceMs={250}
            placeholder="Digite o nome de um jogo"
          />
        </div>
      </div>
    </header>
  );
}