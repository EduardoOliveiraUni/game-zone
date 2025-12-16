import { NextResponse } from "next/server";
import { games } from "@/mocks/games";
import type { GameBase, GameDetail } from "@/types/Game";

function toBase(g: GameDetail): GameBase {
  return {
    id: g.id,
    title: g.title,
    description: g.description,
    image: g.image,
    popularity: g.popularity,
  };
}

function rankSimilarGames(base: GameDetail, all: GameDetail[], limit = 6) {
  if (base.similarIds?.length) {
    const manual = base.similarIds
      .map((id) => all.find((g) => g.id === id))
      .filter(Boolean) as GameDetail[];

    return manual.slice(0, limit);
  }

  const MIN_SCORE = 5;

  const baseTags = new Set((base.tags ?? []).map((t) => t.toLowerCase()));
  const baseGenre = (base.genre ?? "").toLowerCase();

  const scored = all
    .filter((g) => g.id !== base.id)
    .map((g) => {
      let score = 0;

      for (const t of g.tags ?? []) {
        if (baseTags.has(t.toLowerCase())) score += 2;
      }

      if (g.genre?.toLowerCase() === baseGenre) score += 3;

      const yearDiff = Math.abs(g.releaseYear - base.releaseYear);
      if (yearDiff <= 2) score += 1;

      return { game: g, score };
    })
    .filter((x) => x.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.game);

  return scored.slice(0, limit);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const gameId = Number(id);

  if (!Number.isFinite(gameId)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const all = games as GameDetail[];

  const base = all.find((g) => g.id === gameId);
  if (!base) {
    return NextResponse.json({ message: "Jogo não encontrado" }, { status: 404 });
  }

  const similar = rankSimilarGames(base, all).map(toBase);

  return NextResponse.json(similar, {
    headers: { "Cache-Control": "no-store" },
  });
}