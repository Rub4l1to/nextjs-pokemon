import { FC, ReactNode } from "react";

import Head from "next/head";

//* Components
import { Navbar } from "../ui";
import { useRouter } from "next/router";

interface MainLayoutProps {
  children: ReactNode | ReactNode[];
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Adrián Pérez" />
        <meta
          name="description"
          content={`Información sobre el pokemón ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta
          property="og:title"
          content={`Información sobre el pokemón ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />
      <main
        style={{
          padding: "0 24px",
        }}
      >
        {children}
      </main>
    </>
  );
};
