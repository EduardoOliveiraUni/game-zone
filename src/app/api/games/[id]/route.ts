import { NextResponse } from "next/server";
import { games } from "@/mocks/games";

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const game = games.find((g) => g.id === numericId);

  if (!game) {
    return NextResponse.json({ message: "Jogo não encontrado" }, { status: 404 });
  }

  return NextResponse.json(game, {
    headers: { "Cache-Control": "no-store" },
  });
}