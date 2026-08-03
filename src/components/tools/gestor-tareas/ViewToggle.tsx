"use client";

import { useTranslations } from "next-intl";
import { Kanban, List } from "lucide-react";

export type ViewMode = "kanban" | "list";

export default function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  const t = useTranslations("tools.taskManager");

  return (
    <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-black/10 dark:border-white/10">
      {([
        { mode: "kanban" as const, icon: Kanban, label: t("view.kanban") },
        { mode: "list" as const, icon: List, label: t("view.list") },
      ]).map(({ mode: m, icon: Icon, label }) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === m ? "bg-kanban-accent text-kanban-accent-foreground" : "opacity-50 hover:opacity-80"
          }`}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
}
