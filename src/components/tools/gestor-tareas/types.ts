export type Status = "todo" | "in_progress" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "urgent";

export const STATUSES: Status[] = ["todo", "in_progress", "review", "done"];

export const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  labels: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  order: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Board {
  id: string;
  name: string;
  createdAt: string;
  order: number;
}

export interface AppState {
  boards: Board[];
  tasks: Task[];
  labels: Label[];
}

export const SCHEMA_VERSION = 2 as const;

export interface PersistedState {
  schemaVersion: typeof SCHEMA_VERSION;
  data: AppState;
}

export function createEmptyAppState(): AppState {
  return { boards: [], tasks: [], labels: [] };
}
