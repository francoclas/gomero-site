'use client'

import Link from "next/link";
import { ClipboardCheck, Calculator } from "lucide-react";
import { tools } from "../../../data/tools";
import { useTranslations, useLocale } from "next-intl";

function ToolIcon({ icon }: { icon: string }) {
  if (icon === "checklist") return <ClipboardCheck size={22} className="text-red-400" />;
  if (icon === "budget") return <Calculator size={22} className="text-red-400" />;
  return null;
}

export default function ToolsCatalog() {
  const t      = useTranslations("tools");
  const locale = useLocale();

  return (
    <div className="flex flex-wrap justify-center gap-5 w-full">
      {tools.map(tool => {
        const desc = tool.desc[locale as "es" | "en"] ?? tool.desc.es;
        return (
          <Link
            key={tool.id}
            href={tool.href}
            className="
              group flex flex-col gap-4
              w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]
              rounded-2xl p-6
              bg-white/5 backdrop-blur-xl
              border border-black/10 dark:border-white/10
              shadow-lg
              hover:border-red-400/40
              hover:shadow-[0_0_24px_rgba(239,68,68,0.08)]
              hover:scale-[1.02]
              transition-all duration-250
              no-underline
            "
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-400/20">
                <ToolIcon icon={tool.icon} />
              </div>
              <h3 className="font-semibold text-base text-black dark:text-white leading-tight">
                {tool.name}
              </h3>
            </div>

            {/* Desc */}
            <p className="text-sm opacity-65 leading-relaxed flex-1">{desc}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-black/8 dark:border-white/8">
              <div className="flex gap-1.5 flex-wrap">
                {tool.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono opacity-40 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-red-400 group-hover:gap-2 flex items-center gap-1.5 transition-all">
                {t("open")}
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
