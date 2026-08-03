"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { AppState, Board, Label, Status, Task } from "./types";
import { useTasks } from "./useTasks";
import ViewToggle, { type ViewMode } from "./ViewToggle";
import FilterBar, { EMPTY_FILTERS, type TaskFilters } from "./FilterBar";
import { filterTasks } from "./utils/filterTasks";
import TaskForm from "./TaskForm";
import TaskFormDialog from "./TaskFormDialog";
import KanbanBoard from "./kanban/KanbanBoard";
import ListView from "./list/ListView";
import LabelManager from "./labels/LabelManager";
import ExportMenu from "./export-import/ExportMenu";

export default function BoardView({
  board,
  allLabels,
  addLabel,
  deleteLabel,
  appState,
}: {
  board: Board;
  allLabels: Label[];
  addLabel: (name: string, color: string) => void;
  deleteLabel: (id: string) => void;
  appState: AppState;
}) {
  const t = useTranslations("tools.taskManager");
  const { tasks, addTask, updateTask, deleteTask, setStatus, moveTask } = useTasks(board.id);

  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [filters, setFilters] = useState<TaskFilters>(EMPTY_FILTERS);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-lg tracking-tight">{board.name}</h2>
        <div className="flex items-center gap-2">
          <LabelManager labels={allLabels} addLabel={addLabel} deleteLabel={deleteLabel} />
          <ExportMenu appState={appState} boardId={board.id} />
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <TaskForm
        allLabels={allLabels}
        onSubmit={(values) =>
          addTask({
            title: values.title,
            description: values.description,
            priority: values.priority,
            labels: values.labels,
            dueDate: values.dueDate || undefined,
          })
        }
        submitLabel={t("form.addBtn")}
      />

      <FilterBar filters={filters} onChange={setFilters} allLabels={allLabels} />

      {viewMode === "kanban" ? (
        <KanbanBoard
          tasks={filteredTasks}
          allLabels={allLabels}
          onMove={(taskId, destStatus: Status, destIndex) => moveTask(taskId, destStatus, destIndex)}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      ) : (
        <ListView
          tasks={filteredTasks}
          allLabels={allLabels}
          emptyMessage={t("emptyBoard")}
          onSetStatus={setStatus}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      )}

      {editingTask && (
        <TaskFormDialog
          task={editingTask}
          allLabels={allLabels}
          onSave={(values) => {
            updateTask(editingTask.id, {
              title: values.title.trim(),
              description: values.description.trim() || undefined,
              priority: values.priority,
              labels: values.labels,
              dueDate: values.dueDate || undefined,
            });
            setEditingTask(null);
          }}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
