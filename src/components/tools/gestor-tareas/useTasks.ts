import { useCallback, useMemo } from "react";
import { useAppStateSubscription, setState } from "./useAppState";
import { applyMove } from "./utils/order";
import type { Priority, Status, Task } from "./types";

export interface NewTaskInput {
  title: string;
  description?: string;
  priority: Priority;
  labels: string[];
  dueDate?: string;
}

export function useTasks(boardId: string | null) {
  const state = useAppStateSubscription();

  const tasks = useMemo(
    () => (boardId ? state.tasks.filter((t) => t.boardId === boardId) : []),
    [state.tasks, boardId]
  );

  const addTask = useCallback(
    (input: NewTaskInput) => {
      if (!boardId) return;
      const title = input.title.trim();
      if (!title) return;
      setState((prev) => {
        const now = new Date().toISOString();
        const columnTasks = prev.tasks.filter((t) => t.boardId === boardId && t.status === "todo");
        const task: Task = {
          id: crypto.randomUUID(),
          boardId,
          title,
          description: input.description?.trim() || undefined,
          status: "todo",
          priority: input.priority,
          labels: input.labels,
          dueDate: input.dueDate,
          createdAt: now,
          updatedAt: now,
          order: columnTasks.length,
        };
        return { ...prev, tasks: [...prev.tasks, task] };
      });
    },
    [boardId]
  );

  const updateTask = useCallback((taskId: string, patch: Partial<Task>) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t
      ),
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== taskId) }));
  }, []);

  const setStatus = useCallback(
    (taskId: string, status: Status) => {
      updateTask(taskId, {
        status,
        completedAt: status === "done" ? new Date().toISOString() : undefined,
      });
    },
    [updateTask]
  );

  const moveTask = useCallback(
    (taskId: string, destStatus: Status, destIndex: number) => {
      if (!boardId) return;
      setState((prev) => {
        const boardTasks = prev.tasks.filter((t) => t.boardId === boardId);
        const otherTasks = prev.tasks.filter((t) => t.boardId !== boardId);
        const updated = applyMove(boardTasks, taskId, destStatus, destIndex);
        return { ...prev, tasks: [...otherTasks, ...updated] };
      });
    },
    [boardId]
  );

  return { tasks, addTask, updateTask, deleteTask, setStatus, moveTask };
}
