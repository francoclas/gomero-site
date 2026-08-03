"use client";

import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, Circle, CircleDot, CircleDashed, Trash2, Pencil, CalendarClock } from "lucide-react";
import type { Label, Task } from "../types";
import { STATUSES } from "../types";
import { isOverdue, formatDueDate } from "../utils/dates";
import { PRIORITY_DOT } from "../utils/priority";
import LabelChip from "../labels/LabelChip";

const STATUS_ICON = {
  todo: Circle,
  in_progress: CircleDot,
  review: CircleDashed,
  done: CheckCircle2,
};

export default function ListItem({
  task,
  allLabels,
  onCycleStatus,
  onEdit,
  onDelete,
}: {
  task: Task;
  allLabels: Label[];
  onCycleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("tools.taskManager");
  const locale = useLocale();
  const Icon = STATUS_ICON[task.status];
  const done = task.status === "done";
  const overdue = isOverdue(task.dueDate, task.status);
  const taskLabels = allLabels.filter((l) => task.labels.includes(l.id));

  return (
    <div
      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        done
          ? "bg-white/2 dark:bg-white/[0.015] border-black/5 dark:border-white/5 opacity-55"
          : overdue
          ? "bg-white/5 border-kanban-accent/40"
          : "bg-white/5 border-black/8 dark:border-white/8 hover:border-kanban-accent/25"
      }`}
    >
      <button
        onClick={onCycleStatus}
        className="flex-shrink-0 mt-0.5 text-black/40 dark:text-white/40 hover:text-kanban-accent transition-colors"
        aria-label={t(`columns.${STATUSES[(STATUSES.indexOf(task.status) + 1) % STATUSES.length]}`)}
        title={t(`columns.${task.status}`)}
      >
        <Icon size={18} className={done ? "text-emerald-400" : ""} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIORITY_DOT[task.priority]}`} />
          <p className={`text-sm font-medium leading-snug ${done ? "line-through opacity-60" : ""}`}>{task.title}</p>
        </div>
        {task.description && <p className="text-xs opacity-45 mt-0.5 leading-relaxed">{task.description}</p>}

        {(taskLabels.length > 0 || task.dueDate) && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {taskLabels.map((l) => (
              <LabelChip key={l.id} label={l} />
            ))}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full ${
                  overdue ? "text-kanban-accent bg-kanban-accent/10" : "opacity-45"
                }`}
              >
                <CalendarClock size={11} />
                {formatDueDate(task.dueDate, locale)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={onEdit}
          aria-label={t("card.editLabel")}
          className="text-black/30 dark:text-white/30 hover:text-kanban-accent p-1 rounded"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          aria-label={t("deleteLabel")}
          className="text-black/30 dark:text-white/30 hover:text-kanban-accent p-1 rounded"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
