import { getTranslations } from "next-intl/server";
import Link from "next/link";
import TaskManager from "@/components/tools/TaskManager";

export async function generateMetadata() {
  const t = await getTranslations("tools.taskManager");
  return { title: `${t("title")} — Gomero.Dev` };
}

export default async function GestorTareasPage() {
  const t = await getTranslations("tools.taskManager");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-24 bg-white dark:bg-[#0b0b0b] text-black dark:text-white">

      {/* Back link */}
      <div className="w-full max-w-2xl mb-8">
        <Link
          href="/tools"
          className="text-sm opacity-50 hover:opacity-80 transition-opacity"
        >
          {t("back")}
        </Link>
      </div>

      <TaskManager />

    </main>
  );
}
