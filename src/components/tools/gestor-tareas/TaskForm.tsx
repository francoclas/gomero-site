"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import type { Label, Priority } from "./types";
import { PRIORITIES } from "./types";
import LabelPicker from "./labels/LabelPicker";

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  labels: string[];
  dueDate: string;
}

const EMPTY: TaskFormValues = { title: "", description: "", priority: "medium", labels: [], dueDate: "" };

export default function TaskForm({
  allLabels,
  initialValue,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  allLabels: Label[];
  initialValue?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
  submitLabel: string;
}) {
  const t = useTranslations("tools.taskManager");
  const [values, setValues] = useState<TaskFormValues>({ ...EMPTY, ...initialValue });

  const isEdit = !!onCancel;

  const submit = () => {
    if (!values.title.trim()) return;
    onSubmit(values);
    if (!isEdit) setValues(EMPTY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && (e.target as HTMLElement).tagName !== "TEXTAREA") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10">
      <input
        type="text"
        value={values.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        onKeyDown={handleKeyDown}
        placeholder={t("form.titlePlaceholder")}
        maxLength={100}
        className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 text-black dark:text-white placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
      />
      <input
        type="text"
        value={values.description}
        onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
        onKeyDown={handleKeyDown}
        placeholder={t("form.descPlaceholder")}
        maxLength={200}
        className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 text-black dark:text-white placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
      />

      <div className="flex flex-wrap gap-2">
        <select
          value={values.priority}
          onChange={(e) => setValues((v) => ({ ...v, priority: e.target.value as Priority }))}
          className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {t(`priority.${p}`)}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={values.dueDate}
          onChange={(e) => setValues((v) => ({ ...v, dueDate: e.target.value }))}
          className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
        />
      </div>

      <LabelPicker
        allLabels={allLabels}
        selectedIds={values.labels}
        onChange={(labels) => setValues((v) => ({ ...v, labels }))}
        emptyMessage={t("form.noLabelsAvailable")}
      />

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium opacity-60 hover:opacity-90 transition-opacity"
          >
            {t("form.cancelBtn")}
          </button>
        )}
        <button
          onClick={submit}
          disabled={!values.title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-kanban-accent text-kanban-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!isEdit && <Plus size={16} />}
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
