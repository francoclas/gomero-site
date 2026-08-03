'use client'

import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { featuredProject } from "../../../data/featuredProject";

export default function FeaturedProjectCard() {
  const t = useTranslations("tools");
  const locale = useLocale() as "es" | "en";
  const desc = featuredProject.desc[locale] ?? featuredProject.desc.es;

  return (
    <Link
      href={featuredProject.href}
      className="
        group flex flex-col gap-5
        rounded-2xl p-7 md:p-8
        bg-white/5 backdrop-blur-xl
        border border-red-400/20
        shadow-lg
        hover:border-red-400/50
        hover:shadow-[0_0_32px_rgba(239,68,68,0.12)]
        hover:scale-[1.01]
        transition-all duration-250
        no-underline
        w-full
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-400/20 flex-shrink-0">
            <CheckSquare size={32} className="text-red-400" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-xl text-black dark:text-white leading-tight">
              {featuredProject.name}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-red-500/15 text-red-400 border border-red-400/30">
              {t("featured.badge")}
            </span>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-sm font-semibold text-red-400 group-hover:gap-2 transition-all">
          {t("open")}
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </div>

      {/* Desc */}
      <p className="text-sm opacity-70 leading-relaxed max-w-3xl">{desc}</p>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap pt-3 border-t border-black/8 dark:border-white/8">
        {featuredProject.tags.map((tag) => (
          <span
            key={tag.es}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 opacity-70"
          >
            {tag[locale] ?? tag.es}
          </span>
        ))}
      </div>
    </Link>
  );
}
