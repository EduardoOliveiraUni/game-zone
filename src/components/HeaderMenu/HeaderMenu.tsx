"use client";

import Link from "next/link";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./HeaderMenu.module.scss";

type Props = {
  githubUrl: string;
};

export default function HeaderMenu({ githubUrl }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href="/" className={styles.logo} aria-label="Voltar para Home">
          <Image
            src="/logo/logo-gzone.png"
            alt="GameZone"
            width={65}
            height={46}
            priority
          />
        </Link>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
            aria-label="Repositório no GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}