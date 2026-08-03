"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, X, CalendarClock } from "lucide-react";
import type { Board } from "./types";

export default function BoardTabs({
  boards,
  activeBoardId,
  onSelectDashboard,
  onSelectBoard,
  createBoard,
  renameBoard,
  deleteBoard,
}: {
  boards: Board[];
  activeBoardId: string | null;
  onSelectDashboard: () => void;
  onSelectBoard: (boardId: string) => void;
  createBoard: (name: string) => void;
  renameBoard: (boardId: string, name: string) => void;
  deleteBoard: (boardId: string) => void;
}) {
  const t = useTranslations("tools.taskManager");
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const submitCreate = () => {
    if (newName.trim()) createBoard(newName);
    setNewName("");
    setCreating(false);
  };

  const submitRename = (boardId: string) => {
    if (renameValue.trim()) renameBoard(boardId, renameValue);
    setRenamingId(null);
  };

  const boardToDelete = boards.find((b) => b.id === confirmDeleteId);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onSelectDashboard}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          activeBoardId === null
            ? "bg-kanban-accent text-kanban-accent-foreground"
            : "bg-white/5 opacity-50 hover:opacity-80"
        }`}
      >
        <CalendarClock size={13} />
        {t("dashboard.tabLabel")}
      </button>

      {boards.map((board) => (
        <div key={board.id} className="group relative">
          {renamingId === board.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitRename(board.id)}
              onBlur={() => submitRename(board.id)}
              className="px-3 py-1.5 rounded-full text-xs bg-white dark:bg-[#1a1a1a] border border-kanban-accent/50 focus:outline-none"
            />
          ) : (
            <button
              onClick={() => onSelectBoard(board.id)}
              onDoubleClick={() => {
                setRenamingId(board.id);
                setRenameValue(board.name);
              }}
              aria-label={t("boards.renameAriaLabel")}
              className={`flex items-center gap-1.5 pl-3 pr-6 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeBoardId === board.id
                  ? "bg-kanban-accent text-kanban-accent-foreground"
                  : "bg-white/5 opacity-50 hover:opacity-80"
              }`}
            >
              {board.name}
            </button>
          )}
          {renamingId !== board.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDeleteId(board.id);
              }}
              aria-label={t("boards.deleteAriaLabel")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}

      {creating ? (
        <input
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitCreate()}
          onBlur={submitCreate}
          placeholder={t("boards.newBoardPlaceholder")}
          maxLength={40}
          className="px-3 py-1.5 rounded-full text-xs bg-white dark:bg-[#1a1a1a] border border-kanban-accent/50 focus:outline-none"
        />
      ) : (
        <button
          onClick={() => setCreating(true)}
          aria-label={t("boards.newBoardAriaLabel")}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white/10 transition-colors"
        >
          <Plus size={13} />
        </button>
      )}

      {boardToDelete && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="w-full max-w-sm p-5 rounded-2xl bg-kanban-surface backdrop-blur-xl border border-black/10 dark:border-white/10 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold">{t("boards.deleteConfirmTitle")}</h3>
            <p className="text-xs opacity-60 leading-relaxed">{t("boards.deleteConfirmBody", { name: boardToDelete.name })}</p>
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium opacity-60 hover:opacity-90 transition-opacity"
              >
                {t("boards.deleteConfirmCancel")}
              </button>
              <button
                onClick={() => {
                  deleteBoard(boardToDelete.id);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-kanban-accent text-kanban-accent-foreground hover:opacity-90 transition-opacity"
              >
                {t("boards.deleteConfirmConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
