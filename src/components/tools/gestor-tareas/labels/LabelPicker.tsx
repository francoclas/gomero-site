import type { Label } from "../types";
import LabelChip from "./LabelChip";

export default function LabelPicker({
  allLabels,
  selectedIds,
  onChange,
  emptyMessage,
}: {
  allLabels: Label[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  emptyMessage: string;
}) {
  if (allLabels.length === 0) {
    return <p className="text-xs opacity-40">{emptyMessage}</p>;
  }

  const toggle = (id: string) => {
    onChange(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {allLabels.map((label) => {
        const selected = selectedIds.includes(label.id);
        return (
          <button
            type="button"
            key={label.id}
            onClick={() => toggle(label.id)}
            className="transition-opacity"
            style={{ opacity: selected ? 1 : 0.4 }}
          >
            <LabelChip label={label} />
          </button>
        );
      })}
    </div>
  );
}
