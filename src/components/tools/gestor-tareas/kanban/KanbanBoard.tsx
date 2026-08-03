"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Label, Status, Task } from "../types";
import { STATUSES } from "../types";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";

export default function KanbanBoard({
  tasks,
  allLabels,
  onMove,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  allLabels: Label[];
  onMove: (taskId: string, destStatus: Status, destIndex: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnTasks = useMemo(() => {
    const map: Record<Status, Task[]> = { todo: [], in_progress: [], review: [], done: [] };
    for (const task of tasks) map[task.status].push(task);
    for (const status of STATUSES) map[status].sort((a, b) => a.order - b.order);
    return map;
  }, [tasks]);

  function handleDragStart(e: DragStartEvent) {
    setActiveTask(tasks.find((t) => t.id === e.active.id) ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const overIsColumn = (STATUSES as string[]).includes(overId);
    const destStatus = overIsColumn ? (overId as Status) : tasks.find((t) => t.id === overId)?.status;
    if (!destStatus) return;

    const destList = columnTasks[destStatus].filter((t) => t.id !== activeId);
    const destIndex = overIsColumn ? destList.length : destList.findIndex((t) => t.id === overId);

    onMove(activeId, destStatus, destIndex === -1 ? destList.length : destIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={columnTasks[status]}
            allLabels={allLabels}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>{activeTask && <KanbanCard task={activeTask} allLabels={allLabels} isOverlay />}</DragOverlay>
    </DndContext>
  );
}
