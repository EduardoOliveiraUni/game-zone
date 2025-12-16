"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import GameList from "@/components/GameList/GameList";
import Footer from "@/components/Footer/Footer";
import type { GameBase } from "@/types/Game";
import styles from "./page.module.scss";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomePage() {
  const [games, setGames] = useState<GameBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const randomSeedRef = useRef(Math.random());

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/games", { cache: "no-store" });
        if (!res.ok) throw new Error(`Falha ao buscar jogos: ${res.status}`);

        const data = (await res.json()) as GameBase[];
        if (!alive) return;

        setGames(data);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Erro ao buscar jogos");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  function handleSearch(value: string) {
    setSearchQuery(value ?? "");
  }

  const query = (searchQuery ?? "").trim();
  const hasQuery = query.length > 0;

  const filteredGames = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();
    return games.filter((g) => {
      const hay = `${g.title} ${g.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [games, query]);

  const popularPool = useMemo(() => {
    const sorted = [...games].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );

    const topOnly = sorted.filter((g) => (g.popularity ?? 0) >= 9);

    return topOnly.length >= 6 ? topOnly : sorted.slice(0, 12);
  }, [games]);

  const randomPopularSix = useMemo(() => {
    if (popularPool.length <= 6) return popularPool;

    const shuffled = shuffle(popularPool);
    return shuffled.slice(0, 6);
  }, [popularPool]);

  const hasNoResults =
    !loading && !error && hasQuery && filteredGames.length === 0;

  const gamesToShow = useMemo(() => {
    return hasQuery ? filteredGames : randomPopularSix;
  }, [hasQuery, filteredGames, randomPopularSix]);

  return (
    <div className={styles.page}>
      <HomeHeader
        value={searchQuery}
        onSearch={handleSearch}
      />

      <main className={styles.main}>
        {loading && (
          <div className={styles.state}>
            <p className={styles.stateText}>Carregando jogos...</p>
          </div>
        )}

        {error && (
          <div className={styles.state}>
            <p className={styles.stateError}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* HEADER DINÂMICO */}
            {hasQuery ? (
              <div className={styles.resultsHeader}>
                {hasNoResults ? null :
                  <h2 className={styles.resultsTitle}>
                    Resultados para{" "}
                    <span className={styles.resultsQuery}>
                      &quot;{query}&quot;
                    </span>
                  </h2>
                }
              </div>
            ) : (
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Jogos populares</h2>
              </div>
            )}

            {/* ESTADO VAZIO */}
            {hasNoResults ? (
              <>
                <div className={styles.empty}>
                  <p className={styles.emptyTitle}>Nenhum jogo encontrado</p>
                  <p className={styles.emptyText}>
                    Não encontramos resultados para{" "}
                    <strong>&quot;{searchQuery.trim()}&quot;</strong>.
                  </p>

                  <button
                    type="button"
                    className={styles.emptyButton}
                    onClick={() => handleSearch("")}
                  >
                    Limpar busca
                  </button>
                </div>

                <div className={styles.recommendations}>
                  <h2 className={styles.recommendationsTitle}>
                    Ou então aqui vão algumas recomendações populares
                  </h2>

                  <GameList games={randomPopularSix} />
                </div>
              </>
            ) : (
              <GameList games={gamesToShow} />
            )}

          </>
        )}
      </main>

      <Footer />
    </div>
  );
}