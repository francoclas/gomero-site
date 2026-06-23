"use client";

import { useState } from "react";
import { Code2, Workflow, Bot, BarChart3, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const services = [
  { key: "webApps", icon: Code2 },
  { key: "automation", icon: Workflow },
  { key: "ai", icon: Bot },
  { key: "dashboards", icon: BarChart3 },
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="
        services-section
        py-16 px-4
        bg-white text-black
        dark:bg-[#0b0b0b] dark:text-white
      "
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">{t("title")}</h2>
          <p className="text-base opacity-70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ key, icon: Icon }, i) => {
            const isActive = active === i;
            const isDimmed = active !== null && !isActive;

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((prev) => (prev === i ? null : prev))}
                onClick={() => setActive((prev) => (prev === i ? null : i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive((prev) => (prev === i ? null : i));
                  }
                }}
                className={cn(
                  "cursor-pointer transition-all duration-300 ease-out",
                  isActive && "scale-105",
                  isDimmed && "opacity-60"
                )}
              >
                <Card
                  className={cn(
                    "h-full transition-shadow duration-300 ease-out",
                    "bg-white/60 backdrop-blur-md dark:bg-white/5",
                    "border-black/10 dark:border-white/10",
                    isActive && "shadow-xl shadow-black/10 dark:shadow-black/40"
                  )}
                >
                  <CardHeader>
                    <div
                      className="
                        w-12 h-12 mb-2 rounded-lg
                        flex items-center justify-center
                        bg-red-500/10 text-red-500
                      "
                    >
                      <Icon size={24} />
                    </div>
                    <CardTitle className="text-xl">
                      {t(`${key}.title`)}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {t(`${key}.short`)}
                    </CardDescription>
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? "auto" : 0,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <CardDescription className="text-sm leading-relaxed pt-2 opacity-80">
                        {t(`${key}.description`)}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium mb-4">{t("ctaText")}</p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-red-500 text-white font-semibold text-sm
              shadow-[0_0_20px_rgba(239,68,68,0.35)]
              hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]
              transition-colors duration-200
            "
          >
            {t("ctaButton")}
            <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
