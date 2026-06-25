import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata() {
  const t = await getTranslations("tools.comingSoon");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function PresupuestoPage() {
  const t = await getTranslations("tools");
  const tc = await getTranslations("tools.comingSoon");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">
      <div className="w-full max-w-2xl mb-8 self-start">
        <Link href="/tools" className="text-sm opacity-50 hover:opacity-80 transition-opacity">
          {t("back")}
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight">{tc("title")}</h1>
        <p className="text-base opacity-60">{tc("desc")}</p>
      </div>
    </main>
  );
}
