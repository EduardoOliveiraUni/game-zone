"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import GameDetails from "@/components/GameDetails/GameDetails";
import SimilarGames from "@/components/SimilarGames/SimilarGames";
import type { GameBase, GameDetail } from "@/types/Game";

export default function GameDetailPage() {
  const params = useParams();
  const rawId = (params as any)?.id;
  const id = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const [game, setGame] = useState<GameDetail | null>(null);
  const [similarGames, setSimilarGames] = useState<GameBase[]>([]);
  const [popularFallback, setPopularFallback] = useState<GameBase[]>([]);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(id)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setShowFallbackMessage(false);

        const [detailRes, similarRes] = await Promise.all([
          fetch(`/api/games/${id}`, { cache: "no-store" }),
          fetch(`/api/games/${id}/similar`, { cache: "no-store" }),
        ]);

        if (detailRes.status === 404) {
          if (!alive) return;
          setNotFound(true);
          setGame(null);
          setSimilarGames([]);
          setPopularFallback([]);
          return;
        }

        if (!detailRes.ok) {
          throw new Error(`Falha ao buscar detalhes: ${detailRes.status}`);
        }

        const detail = (await detailRes.json()) as GameDetail;

        let similar: GameBase[] = [];
        if (similarRes.ok) {
          similar = (await similarRes.json()) as GameBase[];
        }

        if (!alive) return;

        setGame(detail);
        setSimilarGames(similar);

        if (!similar || similar.length === 0) {
          setShowFallbackMessage(true);

          const popRes = await fetch("/api/games", { cache: "no-store" });
          if (popRes.ok) {
            const all = (await popRes.json()) as GameBase[];
            const top = [...all]
              .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
              .slice(0, 6);

            if (!alive) return;
            setPopularFallback(top);
          } else {
            setPopularFallback([]);
          }
        } else {
          setPopularFallback([]);
        }
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Erro ao buscar jogo");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  const gamesToShow = useMemo(() => {
    if (similarGames.length > 0) return similarGames;
    return popularFallback;
  }, [similarGames, popularFallback]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Opa! Deu erro</h1>
          <p className={styles.errorText}>{error}</p>
          <a href="/" className={styles.backButton}>
            Voltar à Home
          </a>
        </div>
      </div>
    );
  }

  if (notFound || !game) {
    return (
      <div className={styles.notFound}>
        <h1>Jogo não encontrado</h1>
        <a href="/" className={styles.backButton}>
          Voltar à Home
        </a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <GameDetails game={game} />

      {showFallbackMessage && (
        <div className={styles.similarFallback}>
          <p className={styles.similarFallbackTitle}>Não encontramos jogos similares 😕</p>
          <p className={styles.similarFallbackText}>
            Mas aqui vão algumas recomendações populares pra você explorar.
          </p>
        </div>
      )}

      <SimilarGames
        games={gamesToShow}
        isFallback={showFallbackMessage}
      />
    </div>
  );
}