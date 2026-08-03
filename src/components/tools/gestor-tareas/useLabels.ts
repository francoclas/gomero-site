import { useCallback } from "react";
import { setState } from "./useAppState";
import type { Label } from "./types";

export function useLabels(labels: Label[]) {
  const addLabel = useCallback((name: string, color: string) => {
    setState((prev) => ({
      ...prev,
      labels: [...prev.labels, { id: crypto.randomUUID(), name: name.trim(), color }],
    }));
  }, []);

  const updateLabel = useCallback((labelId: string, patch: Partial<Pick<Label, "name" | "color">>) => {
    setState((prev) => ({
      ...prev,
      labels: prev.labels.map((l) => (l.id === labelId ? { ...l, ...patch } : l)),
    }));
  }, []);

  const deleteLabel = useCallback((labelId: string) => {
    setState((prev) => ({
      ...prev,
      labels: prev.labels.filter((l) => l.id !== labelId),
      tasks: prev.tasks.map((t) =>
        t.labels.includes(labelId) ? { ...t, labels: t.labels.filter((id) => id !== labelId) } : t
      ),
    }));
  }, []);

  return { labels, addLabel, updateLabel, deleteLabel };
}
