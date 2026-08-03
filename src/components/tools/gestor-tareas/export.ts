import { SCHEMA_VERSION, type AppState, type Board, type Label, type Task } from "./types";

export type FullBackupExport = {
  exportType: "full-backup";
  schemaVersion: typeof SCHEMA_VERSION;
  exportedAt: string;
  data: AppState;
};

export type SingleBoardExport = {
  exportType: "single-board";
  schemaVersion: typeof SCHEMA_VERSION;
  exportedAt: string;
  data: { board: Board; tasks: Task[]; labels: Label[] };
};

export function buildJsonExport(mode: "single" | "full", appState: AppState, boardId?: string): string {
  const exportedAt = new Date().toISOString();

  if (mode === "full") {
    const payload: FullBackupExport = {
      exportType: "full-backup",
      schemaVersion: SCHEMA_VERSION,
      exportedAt,
      data: appState,
    };
    return JSON.stringify(payload, null, 2);
  }

  const board = appState.boards.find((b) => b.id === boardId);
  if (!board) throw new Error("board not found");

  const boardTasks = appState.tasks.filter((t) => t.boardId === boardId);
  const usedLabelIds = new Set(boardTasks.flatMap((t) => t.labels));
  const usedLabels = appState.labels.filter((l) => usedLabelIds.has(l.id));

  const payload: SingleBoardExport = {
    exportType: "single-board",
    schemaVersion: SCHEMA_VERSION,
    exportedAt,
    data: { board, tasks: boardTasks, labels: usedLabels },
  };
  return JSON.stringify(payload, null, 2);
}

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function buildCsvExport(tasks: Task[], labels: Label[], includeBoardColumn = false, boards?: Board[]): string {
  const labelName = (id: string) => labels.find((l) => l.id === id)?.name ?? id;
  const boardName = (id: string) => boards?.find((b) => b.id === id)?.name ?? id;

  const header = [
    ...(includeBoardColumn ? ["Board"] : []),
    "Title",
    "Description",
    "Status",
    "Priority",
    "Labels",
    "Due Date",
    "Created At",
  ];

  const rows = tasks.map((t) => [
    ...(includeBoardColumn ? [csvEscape(boardName(t.boardId))] : []),
    csvEscape(t.title),
    csvEscape(t.description ?? ""),
    t.status,
    t.priority,
    csvEscape(t.labels.map(labelName).join("; ")),
    t.dueDate ?? "",
    t.createdAt,
  ]);

  return [header, ...rows].map((r) => r.join(",")).join("\n");
}

export function buildMarkdownExport(tasksByBoard: { boardName?: string; tasks: Task[] }[]): string {
  const lines: string[] = [];
  for (const { boardName, tasks } of tasksByBoard) {
    if (boardName) lines.push(`## ${boardName}`, "");
    for (const t of tasks) {
      const checked = t.status === "done" ? "x" : " ";
      const due = t.dueDate ? ` (due ${t.dueDate})` : "";
      lines.push(`- [${checked}] ${t.title}${due}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}

export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
