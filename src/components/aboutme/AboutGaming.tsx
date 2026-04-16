'use client'

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { Gamepad2, ExternalLink } from "lucide-react";

// ── Configura tu perfil de Steam aquí ──────────────────────────────────────
const STEAM_PROFILE_URL = "https://steamcommunity.com/id/GMFrann";
const STEAM_USERNAME = "gomero";
// ────────────────────────────────────────────────────────────────────────────

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

const widgetChildVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function AboutGaming() {
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
        <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-400/20">
          <Gamepad2 size={22} className="text-violet-400" />
        </div>
        <h2 className="text-xl font-semibold">{t("gamingTitle")}</h2>
      </motion.div>

      {/* Texto */}
      <motion.p variants={itemVariants} className="text-sm md:text-base leading-relaxed opacity-80">
        {t("gamingText")}
      </motion.p>

      {/* Steam widget */}
      <motion.div variants={itemVariants} className="mt-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="
            rounded-xl
            bg-black/5 dark:bg-white/5
            border border-black/10 dark:border-white/10
            p-4
            flex items-center gap-4
            hover:border-violet-400/30 hover:bg-violet-500/[0.04]
            transition-colors duration-200
          "
        >
          {/* Avatar con micro-interacción */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.75 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
            }}
            whileHover={{ rotate: -8, scale: 1.12 }}
            transition={{ type: "spring", stiffness: 350, damping: 14 }}
            className="
              w-12 h-12 rounded-xl flex-shrink-0
              bg-gradient-to-br from-violet-600 to-slate-700
              flex items-center justify-center
              shadow-md
            "
          >
            <Gamepad2 size={20} className="text-white/80" />
          </motion.div>

          {/* Info con slide */}
          <motion.div
            variants={widgetChildVariants}
            className="flex flex-col gap-0.5 flex-1 min-w-0"
          >
            <span className="font-semibold text-sm truncate">{STEAM_USERNAME}</span>
            <span className="text-xs opacity-50 font-mono">Steam</span>
          </motion.div>

          {/* Botón */}
          <motion.a
            href={STEAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variants={widgetChildVariants}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="
              flex items-center gap-1.5
              px-3 py-1.5 rounded-lg text-xs font-medium
              bg-violet-500/15 text-violet-400
              border border-violet-400/25
              hover:bg-violet-500/25 hover:border-violet-400/50
              transition-colors duration-200
              whitespace-nowrap
            "
          >
            {t("steamBtn")}
            <ExternalLink size={12} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
