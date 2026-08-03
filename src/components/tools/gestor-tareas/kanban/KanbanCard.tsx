"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations, useLocale } from "next-intl";
import { Trash2, Pencil, CalendarClock } from "lucide-react";
import type { Label, Task } from "../types";
import { isOverdue, formatDueDate } from "../utils/dates";
import { PRIORITY_DOT } from "../utils/priority";
import LabelChip from "../labels/LabelChip";

export default function KanbanCard({
  task,
  allLabels,
  onEdit,
  onDelete,
  isOverlay = false,
}: {
  task: Task;
  allLabels: Label[];
  onEdit?: () => void;
  onDelete?: () => void;
  isOverlay?: boolean;
}) {
  const t = useTranslations("tools.taskManager");
  const locale = useLocale();
  const overdue = isOverdue(task.dueDate, task.status);
  const taskLabels = allLabels.filter((l) => task.labels.includes(l.id));

  const sortable = useSortable({ id: task.id, disabled: isOverlay });
  const style = isOverlay
    ? undefined
    : { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition };

  return (
    <div
      ref={isOverlay ? undefined : sortable.setNodeRef}
      style={style}
      {...(isOverlay ? {} : sortable.attributes)}
      {...(isOverlay ? {} : sortable.listeners)}
      className={`group flex flex-col gap-2 p-3 rounded-xl border bg-white/5 dark:bg-white/[0.03] transition-shadow ${
        overdue ? "border-kanban-accent/40" : "border-black/8 dark:border-white/8"
      } ${sortable.isDragging ? "opacity-40" : ""} ${isOverlay ? "shadow-2xl rotate-2" : "cursor-grab active:cursor-grabbing"}`}
    >
      <div className="flex items-start gap-2">
        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${PRIORITY_DOT[task.priority]}`} />
        <p className="flex-1 text-sm font-medium leading-snug">{task.title}</p>
      </div>

      {task.description && <p className="text-xs opacity-45 leading-relaxed">{task.description}</p>}

      {(taskLabels.length > 0 || task.dueDate) && (
        <div className="flex flex-wrap items-center gap-1.5">
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

      {!isOverlay && (onEdit || onDelete) && (
        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              aria-label={t("card.editLabel")}
              className="text-black/30 dark:text-white/30 hover:text-kanban-accent p-1 rounded"
            >
              <Pencil size={13} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label={t("deleteLabel")}
              className="text-black/30 dark:text-white/30 hover:text-kanban-accent p-1 rounded"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
