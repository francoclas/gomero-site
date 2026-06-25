import type { ReactNode } from "react";

export default function ToolCardShell({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="
        h-full flex flex-col gap-4 p-6
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-black/10 dark:border-white/10
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-400/20 text-red-400">
          {icon}
        </div>
        <h3 className="font-semibold text-base text-black dark:text-white leading-tight">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
