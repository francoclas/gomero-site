import { PRIORITIES, STATUSES, type AppState, type Board, type Label, type Task } from "./types";

export type ParsedImport =
  | { kind: "full-backup"; data: AppState }
  | { kind: "single-board"; data: { board: Board; tasks: Task[]; labels: Label[] } };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isValidLabel(v: unknown): v is Label {
  return isRecord(v) && typeof v.id === "string" && typeof v.name === "string" && typeof v.color === "string";
}

function isValidBoard(v: unknown): v is Board {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.createdAt === "string" &&
    typeof v.order === "number"
  );
}

function isValidTask(v: unknown): v is Task {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.boardId === "string" &&
    typeof v.title === "string" &&
    typeof v.status === "string" &&
    (STATUSES as string[]).includes(v.status) &&
    typeof v.priority === "string" &&
    (PRIORITIES as string[]).includes(v.priority) &&
    Array.isArray(v.labels) &&
    typeof v.order === "number"
  );
}

function sanitizeTasks(tasks: unknown[]): Task[] {
  return tasks.filter(isValidTask);
}

function sanitizeLabels(labels: unknown[]): Label[] {
  return labels.filter(isValidLabel);
}

export function parseImportedFile(raw: string): ParsedImport {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("invalid-json");
  }

  if (!isRecord(parsed)) throw new Error("invalid-shape");

  if (parsed.exportType === "full-backup" && isRecord(parsed.data)) {
    const data = parsed.data;
    if (!Array.isArray(data.boards) || !Array.isArray(data.tasks) || !Array.isArray(data.labels)) {
      throw new Error("invalid-shape");
    }
    return {
      kind: "full-backup",
      data: {
        boards: (data.boards as unknown[]).filter(isValidBoard),
        tasks: sanitizeTasks(data.tasks as unknown[]),
        labels: sanitizeLabels(data.labels as unknown[]),
      },
    };
  }

  if (parsed.exportType === "single-board" && isRecord(parsed.data)) {
    const data = parsed.data;
    if (!isValidBoard(data.board) || !Array.isArray(data.tasks) || !Array.isArray(data.labels)) {
      throw new Error("invalid-shape");
    }
    return {
      kind: "single-board",
      data: {
        board: data.board,
        tasks: sanitizeTasks(data.tasks as unknown[]),
        labels: sanitizeLabels(data.labels as unknown[]),
      },
    };
  }

  // Fallback heuristic for files without our discriminator.
  if (Array.isArray(parsed.boards) && Array.isArray(parsed.tasks) && Array.isArray(parsed.labels)) {
    return {
      kind: "full-backup",
      data: {
        boards: (parsed.boards as unknown[]).filter(isValidBoard),
        tasks: sanitizeTasks(parsed.tasks as unknown[]),
        labels: sanitizeLabels(parsed.labels as unknown[]),
      },
    };
  }
  if (isValidBoard(parsed.board) && Array.isArray(parsed.tasks)) {
    return {
      kind: "single-board",
      data: {
        board: parsed.board,
        tasks: sanitizeTasks(parsed.tasks as unknown[]),
        labels: Array.isArray(parsed.labels) ? sanitizeLabels(parsed.labels as unknown[]) : [],
      },
    };
  }

  throw new Error("unrecognized-format");
}
