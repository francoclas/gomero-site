'use client'

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { Dumbbell } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const tagsContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const GYM_TAGS = [
  "gymTag1",
  "gymTag2",
  "gymTag3",
  "gymTag4",
  "gymTag5",
] as const;

export default function AboutGym() {
  const t = useTranslations("aboutme");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="
        flex flex-col gap-6
        rounded-2xl
        bg-white/5
        backdrop-blur-xl
        border border-black/10 dark:border-white/10
        p-8
        shadow-lg hover:shadow-xl
        transition-shadow duration-300
        h-full
        cursor-default
      "
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-400/20">
          <Dumbbell size={22} className="text-red-400" />
        </div>
        <h2 className="text-xl font-semibold">{t("gymTitle")}</h2>
      </motion.div>

      {/* Texto */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <p className="text-sm md:text-base leading-relaxed opacity-80">
          {t("gymP1")}
        </p>
        <p className="text-sm md:text-base leading-relaxed opacity-80">
          {t("gymP2")}
        </p>
      </motion.div>

      {/* Tags */}
      <motion.div
        variants={tagsContainerVariants}
        className="mt-auto flex flex-wrap gap-2"
      >
        {GYM_TAGS.map((key) => (
          <motion.span
            key={key}
            variants={tagVariants}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="
              px-3 py-1.5 rounded-full
              text-xs font-medium
              bg-red-500/10 text-red-400/90
              border border-red-400/20
              hover:bg-red-500/20 hover:border-red-400/40
              transition-colors duration-200
              cursor-default select-none
            "
          >
            {t(key)}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
