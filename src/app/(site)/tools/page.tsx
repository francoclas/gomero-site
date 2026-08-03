import { getTranslations } from "next-intl/server";
import ToolsCatalog from "@/components/tools/ToolsCatalog";
import FeaturedProjectCard from "@/components/tools/FeaturedProjectCard";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import PasswordChecker from "@/components/tools/PasswordChecker";
import BioGenerator from "@/components/tools/BioGenerator";
import PomodoroTimer from "@/components/tools/PomodoroTimer";

export async function generateMetadata() {
  const t = await getTranslations("tools");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function ToolsPage() {
  const t = await getTranslations("tools");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">

      <div className="text-center mb-14 max-w-2xl w-full">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
        <p className="text-lg opacity-60">{t("subtitle")}</p>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-12">

        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-45">
            {t("sections.featured")}
          </h2>
          <FeaturedProjectCard />
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-45">
            {t("sections.quick")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordGenerator />
            <PasswordChecker />
            <BioGenerator />
            <PomodoroTimer />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-45">
            {t("sections.apps")}
          </h2>
          <ToolsCatalog />
        </section>

      </div>

    </main>
  );
}
