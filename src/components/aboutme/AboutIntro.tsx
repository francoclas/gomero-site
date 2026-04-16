'use client'

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const tagsContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const STATUS_KEYS = ["Mode", "State", "Focus", "Level"] as const;

export default function AboutIntro() {
  const t = useTranslations("aboutme");

  return (
    <section className="w-full max-w-3xl mx-auto mb-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        whileHover={{ y: -4, scale: 1.01 }}
        viewport={{ once: true, margin: "-80px" }}
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-black/10 dark:border-white/10
          p-8 md:p-12
          shadow-lg hover:shadow-xl
          transition-shadow duration-300
          cursor-default
        "
      >
        {/* Párrafos */}
        <div className="flex flex-col gap-5 mb-10">
          <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed opacity-85">
            {t("introP1")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed opacity-85">
            {t("introP2")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed opacity-85">
            {t("introP3")}
          </motion.p>
        </div>

        {/* Separador + Modo actual */}
        <motion.div
          variants={itemVariants}
          className="border-t border-black/10 dark:border-white/10 pt-7"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <span className="
              inline-block w-2 h-2 rounded-full
              bg-emerald-400
              shadow-[0_0_8px_rgba(52,211,153,0.7)]
              animate-pulse
            " />
            <span className="text-xs font-semibold uppercase tracking-widest opacity-40">
              {t("statusLabel")}
            </span>
          </div>

          {/* Grid de estados */}
          <motion.div
            variants={tagsContainerVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {STATUS_KEYS.map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="
                  flex flex-col gap-1.5
                  p-3 rounded-xl
                  bg-black/[0.04] dark:bg-white/[0.04]
                  border border-black/[0.06] dark:border-white/[0.06]
                "
              >
                <span className="text-[10px] uppercase tracking-widest opacity-40 font-semibold">
                  {t(`status${key}Row`)}
                </span>
                <span className="text-sm font-medium leading-tight">
                  {t(`status${key}Val`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
