import { getTranslations } from "next-intl/server";
import GameCatalog from "@/components/games/GameCatalog";

export async function generateMetadata() {
  const t = await getTranslations("games");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function GamesPage() {
  const t = await getTranslations("games");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">

      {/* Header */}
      <div className="text-center mb-14 max-w-2xl w-full">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg opacity-60">
          {t("subtitle")}
        </p>
      </div>

      {/* Catálogo */}
      <div className="w-full max-w-4xl">
        <GameCatalog />
      </div>

    </main>
  );
}
