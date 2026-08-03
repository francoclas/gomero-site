"use client";

import { useTranslations } from "next-intl";
import type { Label, Task } from "./types";
import TaskForm, { type TaskFormValues } from "./TaskForm";

export default function TaskFormDialog({
  task,
  allLabels,
  onSave,
  onClose,
}: {
  task: Task;
  allLabels: Label[];
  onSave: (values: TaskFormValues) => void;
  onClose: () => void;
}) {
  const t = useTranslations("tools.taskManager");

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 px-1">
          <h2 className="text-sm font-semibold opacity-70">{t("form.editTitle")}</h2>
        </div>
        <TaskForm
          allLabels={allLabels}
          initialValue={{
            title: task.title,
            description: task.description ?? "",
            priority: task.priority,
            labels: task.labels,
            dueDate: task.dueDate ?? "",
          }}
          onSubmit={onSave}
          onCancel={onClose}
          submitLabel={t("form.saveBtn")}
        />
      </div>
    </div>
  );
}
