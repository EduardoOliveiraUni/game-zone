import type { Metadata } from "next";
import "./globals.css";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";

export const metadata: Metadata = {
  title: "Game Zone",
  description: "Descubra jogos similares com os que você já jogou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="layoutWrapper">
          <HeaderMenu githubUrl="https://github.com/EduardoOliveiraUni/game-zone"/>
          {children}
        </div>
      </body>
    </html>
  );
}