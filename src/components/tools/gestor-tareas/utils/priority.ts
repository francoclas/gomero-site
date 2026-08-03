import type { Priority } from "../types";

export const PRIORITY_ORDER: Priority[] = ["urgent", "high", "medium", "low"];

export const PRIORITY_DOT: Record<Priority, string> = {
  low: "bg-neutral-400",
  medium: "bg-blue-400",
  high: "bg-amber-400",
  urgent: "bg-kanban-accent",
};

export const PRIORITY_TEXT: Record<Priority, string> = {
  low: "text-neutral-400",
  medium: "text-blue-400",
  high: "text-amber-400",
  urgent: "text-kanban-accent",
};

export const PRIORITY_BORDER: Record<Priority, string> = {
  low: "border-neutral-400/40",
  medium: "border-blue-400/40",
  high: "border-amber-400/40",
  urgent: "border-kanban-accent/50",
};
