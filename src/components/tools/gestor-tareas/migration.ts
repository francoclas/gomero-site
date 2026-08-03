import { LEGACY_STORAGE_KEY, STORAGE_KEY } from "./storage";
import {
  SCHEMA_VERSION,
  type AppState,
  type Board,
  type PersistedState,
  type Task,
} from "./types";
import { renumberOrders } from "./utils/order";

const DEFAULT_BOARD_NAME = "Mis tareas";

interface LegacyTask {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  createdAt: number;
}

function buildMigratedState(legacyTasks: LegacyTask[]): AppState {
  const now = new Date().toISOString();
  const boardId = crypto.randomUUID();

  const board: Board = {
    id: boardId,
    name: DEFAULT_BOARD_NAME,
    createdAt: now,
    order: 0,
  };

  const rawTasks: Task[] = legacyTasks.map((lt) => ({
    id: crypto.randomUUID(),
    boardId,
    title: lt.titulo,
    description: lt.descripcion || undefined,
    status: lt.completada ? "done" : "todo",
    priority: "medium",
    labels: [],
    dueDate: undefined,
    createdAt: lt.createdAt ? new Date(lt.createdAt).toISOString() : now,
    updatedAt: now,
    completedAt: lt.completada ? now : undefined,
    order: 0,
  }));

  const todoTasks = renumberOrders(rawTasks.filter((t) => t.status === "todo"));
  const doneTasks = renumberOrders(rawTasks.filter((t) => t.status === "done"));

  return { boards: [board], tasks: [...todoTasks, ...doneTasks], labels: [] };
}

/**
 * One-shot migration from the legacy flat `gomero-tasks` array into the
 * new versioned multi-board schema. Returns the migrated AppState if a
 * migration happened, or null if there was nothing to migrate (either
 * already migrated, or no legacy data present/parseable).
 */
export function migrateLegacyIfNeeded(): AppState | null {
  if (typeof window === "undefined") return null;

  const alreadyMigrated = localStorage.getItem(STORAGE_KEY) !== null;
  if (alreadyMigrated) return null;

  const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyRaw) return null;

  let legacyTasks: LegacyTask[];
  try {
    const parsed = JSON.parse(legacyRaw);
    if (!Array.isArray(parsed)) throw new Error("not an array");
    legacyTasks = parsed;
  } catch {
    return null;
  }

  const appState = buildMigratedState(legacyTasks);

  const persisted: PersistedState = { schemaVersion: SCHEMA_VERSION, data: appState };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));

  const verifyRaw = localStorage.getItem(STORAGE_KEY);
  let writeOk = false;
  if (verifyRaw) {
    try {
      const verified = JSON.parse(verifyRaw) as PersistedState;
      writeOk = verified.data.tasks.length === appState.tasks.length;
    } catch {
      writeOk = false;
    }
  }

  if (writeOk) {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } else {
    // Leave legacy data intact and drop the incomplete write so the next
    // load retries the migration cleanly. Still return the in-memory
    // state so this session isn't left empty.
    localStorage.removeItem(STORAGE_KEY);
  }

  return appState;
}
