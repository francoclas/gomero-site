"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
import type { AppState, Board, Label, Task } from "../types";
import { parseImportedFile, type ParsedImport } from "../import";

export default function ImportButton({
  importFullBackup,
  importSingleBoard,
}: {
  importFullBackup: (data: AppState) => void;
  importSingleBoard: (data: { board: Board; tasks: Task[]; labels: Label[] }) => void;
}) {
  const t = useTranslations("tools.taskManager");
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFullBackup, setPendingFullBackup] = useState<AppState | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setMessage(null);
    try {
      const raw = await file.text();
      const result: ParsedImport = parseImportedFile(raw);
      if (result.kind === "full-backup") {
        setPendingFullBackup(result.data);
      } else {
        importSingleBoard(result.data);
        setMessage(t("import.successSingle"));
      }
    } catch {
      setMessage(t("import.errorInvalid"));
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white/10 transition-colors"
      >
        <Upload size={13} />
        {t("import.buttonLabel")}
      </button>

      {message && <span className="text-[11px] opacity-60">{message}</span>}

      {pendingFullBackup && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setPendingFullBackup(null)}
        >
          <div
            className="w-full max-w-sm p-5 rounded-2xl bg-kanban-surface backdrop-blur-xl border border-black/10 dark:border-white/10 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold">{t("import.confirmReplaceAllTitle")}</h3>
            <p className="text-xs opacity-60 leading-relaxed">{t("import.confirmReplaceAllBody")}</p>
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => setPendingFullBackup(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium opacity-60 hover:opacity-90 transition-opacity"
              >
                {t("import.confirmReplaceAllCancel")}
              </button>
              <button
                onClick={() => {
                  importFullBackup(pendingFullBackup);
                  setPendingFullBackup(null);
                  setMessage(t("import.successFull"));
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-kanban-accent text-kanban-accent-foreground hover:opacity-90 transition-opacity"
              >
                {t("import.confirmReplaceAllConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
