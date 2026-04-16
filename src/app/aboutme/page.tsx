import { getTranslations } from "next-intl/server";
import AboutIntro from "@/components/aboutme/AboutIntro";
import AboutGaming from "@/components/aboutme/AboutGaming";
import AboutGym from "@/components/aboutme/AboutGym";
import AboutMusic from "@/components/aboutme/AboutMusic";

export async function generateMetadata() {
  const t = await getTranslations("aboutme");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function AboutMePage() {
  const t = await getTranslations("aboutme");

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

      {/* Intro — full width */}
      <div className="w-full max-w-3xl">
        <AboutIntro />
      </div>

      {/* Gaming + Gym — dos columnas en desktop */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <AboutGaming />
        <AboutGym />
      </div>

      {/* Música — full width */}
      <div className="w-full max-w-3xl mt-6">
        <AboutMusic />
      </div>

    </main>
  );
}
