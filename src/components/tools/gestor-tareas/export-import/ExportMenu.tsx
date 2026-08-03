"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import type { AppState } from "../types";
import { buildCsvExport, buildJsonExport, buildMarkdownExport, downloadFile } from "../export";

export default function ExportMenu({ appState, boardId }: { appState: AppState; boardId?: string }) {
  const t = useTranslations("tools.taskManager");
  const [open, setOpen] = useState(false);

  const board = boardId ? appState.boards.find((b) => b.id === boardId) : undefined;

  const exportBoardJson = () => {
    if (!boardId) return;
    downloadFile(buildJsonExport("single", appState, boardId), `${board?.name ?? "board"}.json`, "application/json");
  };
  const exportAllJson = () => {
    downloadFile(buildJsonExport("full", appState), "gomero-tareas-backup.json", "application/json");
  };
  const exportBoardCsv = () => {
    if (!boardId) return;
    const tasks = appState.tasks.filter((t) => t.boardId === boardId);
    downloadFile(buildCsvExport(tasks, appState.labels), `${board?.name ?? "board"}.csv`, "text/csv");
  };
  const exportAllCsv = () => {
    downloadFile(
      buildCsvExport(appState.tasks, appState.labels, true, appState.boards),
      "gomero-tareas.csv",
      "text/csv"
    );
  };
  const exportBoardMarkdown = () => {
    if (!boardId) return;
    const tasks = appState.tasks.filter((t) => t.boardId === boardId);
    downloadFile(buildMarkdownExport([{ tasks }]), `${board?.name ?? "board"}.md`, "text/markdown");
  };
  const exportAllMarkdown = () => {
    const grouped = appState.boards.map((b) => ({
      boardName: b.name,
      tasks: appState.tasks.filter((t) => t.boardId === b.id),
    }));
    downloadFile(buildMarkdownExport(grouped), "gomero-tareas.md", "text/markdown");
  };

  const item = (label: string, onClick: () => void) => (
    <button
      onClick={() => {
        onClick();
        setOpen(false);
      }}
      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-colors"
    >
      {label}
    </button>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white/10 transition-colors"
      >
        <Download size={13} />
        {t("export.menuLabel")}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-kanban-surface backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg z-20 flex flex-col gap-1">
          {boardId && (
            <>
              <p className="px-3 pt-1 text-[10px] uppercase tracking-wide opacity-40">{t("export.thisBoard")}</p>
              {item(t("export.json"), exportBoardJson)}
              {item(t("export.csv"), exportBoardCsv)}
              {item(t("export.markdown"), exportBoardMarkdown)}
              <div className="my-1 border-t border-black/10 dark:border-white/10" />
            </>
          )}
          <p className="px-3 pt-1 text-[10px] uppercase tracking-wide opacity-40">{t("export.allBoards")}</p>
          {item(t("export.json"), exportAllJson)}
          {item(t("export.csv"), exportAllCsv)}
          {item(t("export.markdown"), exportAllMarkdown)}
        </div>
      )}
    </div>
  );
}
