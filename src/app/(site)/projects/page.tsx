import { getTranslations } from "next-intl/server";
import FisicoAppCard from "@/components/FisicoAppCard";
import ExperimentsSection from "@/components/ExperimentsSection";
import GitHubRepos from "@/components/GitHubRepos";

export async function generateMetadata() {
  const t = await getTranslations("portfolio");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function ProjectsPage() {
  const t = await getTranslations("portfolio");

  return (
    <main className="min-h-screen flex flex-col items-center gap-14 px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">

      {/* Header */}
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg opacity-60">
          {t("subtitle")}
        </p>
      </div>

      {/* Hero card — FisicoApp */}
      <div className="w-full max-w-4xl">
        <FisicoAppCard />
      </div>

      {/* Experimentos */}
      <ExperimentsSection
        title={t("experimentsTitle")}
        subtitle={t("experimentsSubtitle")}
        pausedLabel={t("pausedBadge")}
        descriptions={{
          metaGymDesc: t("metaGymDesc"),
          gestionTicketDesc: t("gestionTicketDesc"),
        }}
      />

      {/* Repos de GitHub */}
      <GitHubRepos title={t("otherTitle")} />

    </main>
  );
}
