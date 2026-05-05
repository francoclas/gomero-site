import { getTranslations } from "next-intl/server";
import ToolsCatalog from "@/components/tools/ToolsCatalog";

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

      <div className="w-full max-w-4xl">
        <ToolsCatalog />
      </div>

    </main>
  );
}
