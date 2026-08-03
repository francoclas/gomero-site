import type { Label } from "../types";

export default function LabelChip({ label }: { label: Label }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ backgroundColor: `${label.color}22`, color: label.color, border: `1px solid ${label.color}55` }}
    >
      {label.name}
    </span>
  );
}
