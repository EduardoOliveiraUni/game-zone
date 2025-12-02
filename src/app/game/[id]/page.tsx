"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import GameDetails from "@/components/GameDetails/GameDetails";
import SimilarGames from "@/components/SimilarGames/SimilarGames";

// Mock temporário (substituir por API)
const games = [
  {
    id: 1,
    title: "Call of Duty",
    description: "Combates intensos e ação tática em missões militares.",
    fullDescription:
      "Call of Duty oferece uma experiência imersiva de guerra moderna com mecânicas refinadas, missões cinematográficas e multiplayer competitivo. Entre em operações reais e enfrente batalhas de alta intensidade.",
    image: "/cod.jpg",
    genre: "FPS / Ação",
    releaseYear: 2024,
  },
  {
    id: 2,
    title: "Counter-Strike",
    description: "FPS competitivo e estratégico com equipes táticas.",
    fullDescription:
      "Counter-Strike redefine o jogo tático competitivo. Duas equipes se enfrentam em partidas estratégicas, onde cada movimento importa. Habilidade, comunicação e precisão determinam o vencedor.",
    image: "/cs.jpg",
    genre: "FPS Tático",
    releaseYear: 2023,
  },
  {
    id: 3,
    title: "Fifa",
    description: "Simulação de futebol com jogabilidade realista.",
    fullDescription:
      "FIFA traz a mais avançada tecnologia para simulações futebolísticas, com movimentos reais, inteligência artificial refinada e modos competitivos que colocam você no controle da sua equipe favorita.",
    image: "/fifa.jpg",
    genre: "Esporte",
    releaseYear: 2024,
  },
  {
    id: 4,
    title: "GTA",
    description: "Mundo aberto, crimes e liberdade total de exploração.",
    fullDescription:
      "Grand Theft Auto oferece um mundo aberto vibrante com exploração completa, missões cinematográficas e narrativa adulta. Viva aventuras intensas enquanto enfrenta desafios em um universo criminal expansivo.",
    image: "/gta.jpg",
    genre: "Ação / Mundo Aberto",
    releaseYear: 2013,
  },
  {
    id: 5,
    title: "Minecraft",
    description: "Criatividade, blocos e sobrevivência em mundos infinitos.",
    fullDescription:
      "Minecraft é uma experiência única de criação e sobrevivência em mundos totalmente gerados proceduralmente. Construa, explore cavernas profundas, enfrente criaturas e crie seu próprio universo sem limites.",
    image: "/mine.jpg",
    genre: "Aventura / Criativo",
    releaseYear: 2011,
  },
  {
    id: 6,
    title: "The Last of Us",
    description: "Drama, sobrevivência e narrativa emocional profunda.",
    fullDescription:
      "The Last of Us entrega uma história intensa e emocionante, combinando ação furtiva, narrativa profunda e personagens inesquecíveis. Acompanhe Joel e Ellie em uma jornada perigosa em um mundo devastado.",
    image: "/tlos.jpg",
    genre: "Drama / Sobrevivência",
    releaseYear: 2020,
  },
];

export default function GameDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className={styles.notFound}>
        <h1>Jogo não encontrado</h1>
        <a href="/" className={styles.backButton}>Voltar à Home</a>
      </div>
    );
  }

  const similarGames = games.filter((g) => g.id !== id).slice(0, 3);

  return (
    <div className={styles.page}>
      <GameDetails game={game} />
      <SimilarGames games={similarGames} />
    </div>
  );
}