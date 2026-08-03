import type { Status, Task } from "../types";

export function renumberOrders(tasks: Task[]): Task[] {
  return tasks.map((t, i) => ({ ...t, order: i }));
}

/**
 * Moves `taskId` to `destStatus` at `destIndex` within the given board's tasks,
 * renumbering `order` in both the source and destination status buckets.
 * Handles same-column reorders when destStatus === the task's current status.
 */
export function applyMove(
  boardTasks: Task[],
  taskId: string,
  destStatus: Status,
  destIndex: number
): Task[] {
  const moving = boardTasks.find((t) => t.id === taskId);
  if (!moving) return boardTasks;

  const sourceStatus = moving.status;
  const others = boardTasks.filter((t) => t.id !== taskId);

  const destBucket = others
    .filter((t) => t.status === destStatus)
    .sort((a, b) => a.order - b.order);

  const now = new Date().toISOString();
  const updatedMoving: Task = {
    ...moving,
    status: destStatus,
    updatedAt: now,
    completedAt: destStatus === "done" ? moving.completedAt ?? now : undefined,
  };

  const clampedIndex = Math.max(0, Math.min(destIndex, destBucket.length));
  destBucket.splice(clampedIndex, 0, updatedMoving);
  const renumberedDest = renumberOrders(destBucket);

  let renumberedSource: Task[] = [];
  if (sourceStatus !== destStatus) {
    const sourceBucket = others
      .filter((t) => t.status === sourceStatus)
      .sort((a, b) => a.order - b.order);
    renumberedSource = renumberOrders(sourceBucket);
  }

  const untouched = others.filter(
    (t) => t.status !== destStatus && t.status !== sourceStatus
  );

  return [...untouched, ...renumberedSource, ...renumberedDest];
}
