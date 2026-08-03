"use client";

import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import type { Label, Priority } from "./types";
import { PRIORITIES } from "./types";

export type DueFilter = "all" | "overdue" | "today" | "none";

export interface TaskFilters {
  search: string;
  priority: Priority | "all";
  labelId: string | "all";
  due: DueFilter;
}

export const EMPTY_FILTERS: TaskFilters = { search: "", priority: "all", labelId: "all", due: "all" };

export function isFiltersActive(filters: TaskFilters): boolean {
  return (
    filters.search.trim() !== "" || filters.priority !== "all" || filters.labelId !== "all" || filters.due !== "all"
  );
}

export default function FilterBar({
  filters,
  onChange,
  allLabels,
}: {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  allLabels: Label[];
}) {
  const t = useTranslations("tools.taskManager");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t("filters.searchPlaceholder")}
          className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
        />
      </div>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as Priority | "all" })}
        className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
      >
        <option value="all">{t("filters.priorityAll")}</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {t(`priority.${p}`)}
          </option>
        ))}
      </select>

      <select
        value={filters.labelId}
        onChange={(e) => onChange({ ...filters, labelId: e.target.value })}
        className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
      >
        <option value="all">{t("filters.labelAll")}</option>
        {allLabels.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      <select
        value={filters.due}
        onChange={(e) => onChange({ ...filters, due: e.target.value as DueFilter })}
        className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
      >
        <option value="all">{t("filters.dueAll")}</option>
        <option value="overdue">{t("filters.dueOverdue")}</option>
        <option value="today">{t("filters.dueToday")}</option>
        <option value="none">{t("filters.dueNone")}</option>
      </select>

      {isFiltersActive(filters) && (
        <button
          onClick={() => onChange(EMPTY_FILTERS)}
          className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs opacity-60 hover:opacity-100 hover:text-kanban-accent transition"
        >
          <X size={13} />
          {t("filters.clear")}
        </button>
      )}
    </div>
  );
}
