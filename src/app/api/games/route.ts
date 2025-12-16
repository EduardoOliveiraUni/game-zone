import { NextResponse } from "next/server";
import { games } from "@/mocks/games";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limitParam = searchParams.get("limit");
  const searchParam = searchParams.get("search");

  let result = [...games];

  if (searchParam) {
    const q = searchParam.toLowerCase();
    result = result.filter((g) =>
      `${g.title} ${g.description}`.toLowerCase().includes(q)
    );
  }

  result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

  if (limitParam) {
    const limit = Number(limitParam);
    if (Number.isFinite(limit) && limit > 0) {
      result = result.slice(0, limit);
    }
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}