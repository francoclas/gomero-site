"use client";

import type { Label, Status, Task } from "../types";
import { STATUSES } from "../types";
import ListItem from "./ListItem";

export default function ListView({
  tasks,
  allLabels,
  emptyMessage,
  onSetStatus,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  allLabels: Label[];
  emptyMessage: string;
  onSetStatus: (taskId: string, status: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  if (tasks.length === 0) {
    return <p className="text-center py-10 opacity-35 text-sm">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          allLabels={allLabels}
          onCycleStatus={() => {
            const nextIndex = (STATUSES.indexOf(task.status) + 1) % STATUSES.length;
            onSetStatus(task.id, STATUSES[nextIndex]);
          }}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}
