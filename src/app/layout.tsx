import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Zone",
  description: "Descubra jogos parecidos com os que você já jogou",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="layoutWrapper">
          {children}
        </div>
      </body>
    </html>
  );
}