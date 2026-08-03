"use client";

import { useTranslations } from "next-intl";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Label, Status, Task } from "../types";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({
  status,
  tasks,
  allLabels,
  onEdit,
  onDelete,
}: {
  status: Status;
  tasks: Task[];
  allLabels: Label[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const t = useTranslations("tools.taskManager");
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wide opacity-60">{t(`columns.${status}`)}</h3>
        <span className="text-[11px] opacity-40">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 p-2 rounded-xl min-h-[120px] border transition-colors ${
          isOver ? "border-kanban-accent/40 bg-kanban-accent/5" : "border-transparent"
        }`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <p className="text-center py-6 text-xs opacity-30">{t("card.emptyColumn")}</p>
          ) : (
            tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                allLabels={allLabels}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task.id)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
