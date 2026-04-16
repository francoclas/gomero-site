import { getTranslations } from "next-intl/server";
import { Construction } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("portfolio");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">

      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg opacity-70">
          {t("subtitle")}
        </p>
      </div>

      {/* Coming Soon placeholder */}
      <div className="
        w-full max-w-xl
        rounded-2xl
        bg-white/5
        backdrop-blur-xl
        border border-black/10 dark:border-white/10
        p-12
        flex flex-col items-center gap-6
        text-center
        shadow-lg
      ">
        <Construction size={48} className="opacity-40" />
        <h2 className="text-2xl font-semibold">{t("comingSoon")}</h2>
        <p className="opacity-60 text-base leading-relaxed">{t("comingSoonDesc")}</p>
      </div>

    </main>
  );
}
