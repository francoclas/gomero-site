"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tags, Plus, Trash2 } from "lucide-react";
import type { Label } from "../types";
import LabelChip from "./LabelChip";

const DEFAULT_COLOR = "#e05252";

export default function LabelManager({
  labels,
  addLabel,
  deleteLabel,
}: {
  labels: Label[];
  addLabel: (name: string, color: string) => void;
  deleteLabel: (id: string) => void;
}) {
  const t = useTranslations("tools.taskManager");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);

  const submit = () => {
    if (!name.trim()) return;
    addLabel(name, color);
    setName("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white/10 transition-colors"
      >
        <Tags size={13} />
        {t("labels.manageButton")}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 p-4 rounded-xl bg-kanban-surface backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg z-20 flex flex-col gap-3">
          <h3 className="text-sm font-semibold">{t("labels.manageTitle")}</h3>

          <div className="flex flex-wrap gap-1.5">
            {labels.length === 0 ? (
              <p className="text-xs opacity-40">{t("labels.noLabels")}</p>
            ) : (
              labels.map((label) => (
                <div key={label.id} className="flex items-center gap-1">
                  <LabelChip label={label} />
                  <button
                    onClick={() => deleteLabel(label.id)}
                    aria-label={t("labels.deleteAriaLabel")}
                    className="opacity-40 hover:opacity-100 hover:text-kanban-accent transition"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-black/10 dark:border-white/10 bg-transparent"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={t("labels.namePlaceholder")}
              maxLength={30}
              className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1a1a1a] border border-black/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-kanban-accent/50"
            />
            <button
              onClick={submit}
              disabled={!name.trim()}
              className="flex-shrink-0 p-1.5 rounded-lg bg-kanban-accent text-kanban-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
