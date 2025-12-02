"use client";

import HomeHeader from "@/components/HomeHeader/HomeHeader";
import GameList from "@/components/GameList/GameList";
import Footer from "@/components/Footer/Footer";
import type { Game } from "@/components/GameCard/GameCard";

// 🔥 MOCK TEMPORÁRIO (você remove quando integrar API)
const popularGames: Game[] = [
  {
    id: 1,
    title: "Call of Duty",
    description: "Combates intensos e ação tática em missões militares.",
    image: "/cod.jpg",
  },
  {
    id: 2,
    title: "Counter-Strike",
    description: "FPS competitivo e estratégico com equipes táticas.",
    image: "/cs.jpg",
  },
  {
    id: 3,
    title: "Fifa",
    description: "Simulação de futebol com jogabilidade realista.",
    image: "/fifa.jpg",
  },
  {
    id: 4,
    title: "GTA",
    description: "Mundo aberto, crimes e liberdade total de exploração.",
    image: "/gta.jpg",
  },
  {
    id: 5,
    title: "Minecraft",
    description: "Criatividade, blocos e sobrevivência em mundos infinitos.",
    image: "/mine.jpg",
  },
  {
    id: 6,
    title: "The Last of Us",
    description: "Drama, sobrevivência e narrativa emocional profunda.",
    image: "/tlos.jpg",
  },
];

export default function HomePage() {
  function handleSearch(query: string) {
    console.log("Buscar jogos parecidos com:", query);
    // Aqui depois você integra a busca real
  }

  return (
    <>
      <HomeHeader onSearch={handleSearch} />
      <GameList games={popularGames} />
      <Footer />
    </>
  );
}