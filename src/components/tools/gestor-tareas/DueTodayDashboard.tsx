"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CalendarClock, ChevronRight } from "lucide-react";
import type { Board, Label, Task } from "./types";
import { isDueTodayOrOverdue, isOverdue, formatDueDate } from "./utils/dates";
import { PRIORITY_DOT } from "./utils/priority";
import LabelChip from "./labels/LabelChip";

export default function DueTodayDashboard({
  boards,
  allTasks,
  allLabels,
  onNavigateToBoard,
}: {
  boards: Board[];
  allTasks: Task[];
  allLabels: Label[];
  onNavigateToBoard: (boardId: string) => void;
}) {
  const t = useTranslations("tools.taskManager");
  const locale = useLocale();

  const groups = useMemo(() => {
    return boards
      .map((board) => ({
        board,
        tasks: allTasks
          .filter((task) => task.boardId === board.id && isDueTodayOrOverdue(task.dueDate, task.status))
          .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? "")),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [boards, allTasks]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center gap-2 px-1">
        <CalendarClock size={18} className="text-kanban-accent" />
        <h2 className="font-bold text-lg tracking-tight">{t("dashboard.title")}</h2>
      </div>

      {groups.length === 0 ? (
        <p className="text-center py-16 opacity-35 text-sm">{t("dashboard.empty")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(({ board, tasks }) => (
            <div
              key={board.id}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden"
            >
              <button
                onClick={() => onNavigateToBoard(board.id)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-sm">{board.name}</span>
                <span className="flex items-center gap-1 text-xs opacity-50">
                  {tasks.length}
                  <ChevronRight size={14} />
                </span>
              </button>

              <div className="flex flex-col gap-1.5 px-3 pb-3">
                {tasks.map((task) => {
                  const overdue = isOverdue(task.dueDate, task.status);
                  const taskLabels = allLabels.filter((l) => task.labels.includes(l.id));
                  return (
                    <button
                      key={task.id}
                      onClick={() => onNavigateToBoard(board.id)}
                      className="text-left flex items-start gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${PRIORITY_DOT[task.priority]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{task.title}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {taskLabels.map((l) => (
                            <LabelChip key={l.id} label={l} />
                          ))}
                          {task.dueDate && (
                            <span
                              className={`text-[11px] ${overdue ? "text-kanban-accent font-medium" : "opacity-45"}`}
                            >
                              {formatDueDate(task.dueDate, locale)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
