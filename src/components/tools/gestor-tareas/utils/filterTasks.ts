import type { Task } from "../types";
import type { TaskFilters } from "../FilterBar";
import { isOverdue, todayISODate } from "./dates";

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const search = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    if (search) {
      const haystack = `${task.title} ${task.description ?? ""}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    if (filters.priority !== "all" && task.priority !== filters.priority) return false;

    if (filters.labelId !== "all" && !task.labels.includes(filters.labelId)) return false;

    if (filters.due === "overdue" && !isOverdue(task.dueDate, task.status)) return false;
    if (filters.due === "today" && task.dueDate !== todayISODate()) return false;
    if (filters.due === "none" && task.dueDate) return false;

    return true;
  });
}
