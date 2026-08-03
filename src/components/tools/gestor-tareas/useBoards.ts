import { useCallback } from "react";
import { useAppStateSubscription, setState } from "./useAppState";
import { useLabels } from "./useLabels";
import type { AppState, Board, Label, Task } from "./types";

function mergeLabelsById(existing: Label[], incoming: Label[]): Label[] {
  const byNameColor = new Map(existing.map((l) => [`${l.name}::${l.color}`, l]));
  const merged = [...existing];
  for (const label of incoming) {
    const key = `${label.name}::${label.color}`;
    if (!byNameColor.has(key)) {
      merged.push(label);
      byNameColor.set(key, label);
    }
  }
  return merged;
}

export function useBoards() {
  const state = useAppStateSubscription();

  const boards = state.boards.slice().sort((a, b) => a.order - b.order);

  const createBoard = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      boards: [
        ...prev.boards,
        { id: crypto.randomUUID(), name: trimmed, createdAt: new Date().toISOString(), order: prev.boards.length },
      ],
    }));
  }, []);

  const renameBoard = useCallback((boardId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      boards: prev.boards.map((b) => (b.id === boardId ? { ...b, name: trimmed } : b)),
    }));
  }, []);

  const deleteBoard = useCallback((boardId: string) => {
    setState((prev) => ({
      ...prev,
      boards: prev.boards.filter((b) => b.id !== boardId),
      tasks: prev.tasks.filter((t) => t.boardId !== boardId),
    }));
  }, []);

  const importFullBackup = useCallback((data: AppState) => {
    setState(() => data);
  }, []);

  const importSingleBoard = useCallback(
    (data: { board: Board; tasks: Task[]; labels: Label[] }) => {
      setState((prev) => {
        const newBoardId = crypto.randomUUID();
        const remappedTasks: Task[] = data.tasks.map((t) => ({
          ...t,
          id: crypto.randomUUID(),
          boardId: newBoardId,
        }));
        return {
          ...prev,
          boards: [
            ...prev.boards,
            { ...data.board, id: newBoardId, order: prev.boards.length },
          ],
          tasks: [...prev.tasks, ...remappedTasks],
          labels: mergeLabelsById(prev.labels, data.labels),
        };
      });
    },
    []
  );

  const labelsApi = useLabels(state.labels);

  return {
    boards,
    createBoard,
    renameBoard,
    deleteBoard,
    importFullBackup,
    importSingleBoard,
    allTasks: state.tasks,
    appState: state,
    ...labelsApi,
  };
}
