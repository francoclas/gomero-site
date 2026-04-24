'use client'

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Gamepad2, X, Maximize2, Play } from "lucide-react";
import { games, type Game } from "../../../data/games";

// ── Variantes ─────────────────────────────────────────────────────────────────
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// ── Card individual ───────────────────────────────────────────────────────────
function GameCard({
  game,
  onPlay,
  playLabel,
  locale,
}: {
  game: Game;
  onPlay: (g: Game) => void;
  playLabel: string;
  locale: string;
}) {
  const desc  = game.desc[locale  as "es" | "en"] ?? game.desc.es;
  const genre = game.genre[locale as "es" | "en"] ?? game.genre.es;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="
        group flex flex-col gap-4
        rounded-2xl p-6
        bg-white/5 backdrop-blur-xl
        border border-black/10 dark:border-white/10
        shadow-lg hover:shadow-xl
        transition-shadow duration-300
        cursor-default
      "
    >
      {/* Ícono + header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-400/20">
          <Gamepad2 size={22} className="text-red-400" />
        </div>
        <div>
          <h3 className="font-semibold text-base leading-tight">{game.name}</h3>
          <span className="text-xs opacity-40">{game.year}</span>
        </div>
        <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/10 opacity-70">
          {genre}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-sm leading-relaxed opacity-70 flex-1">{desc}</p>

      {/* Botón jugar */}
      <motion.button
        onClick={() => onPlay(game)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="
          flex items-center justify-center gap-2
          w-full py-2.5 rounded-xl
          bg-red-500 text-white font-semibold text-sm
          shadow-[0_0_18px_rgba(239,68,68,0.3)]
          hover:bg-red-600 hover:shadow-[0_0_28px_rgba(239,68,68,0.45)]
          transition-colors duration-200
        "
      >
        <Play size={15} />
        {playLabel}
      </motion.button>
    </motion.div>
  );
}

// ── Modal con iframe ──────────────────────────────────────────────────────────
function GameModal({
  game,
  onClose,
  closeLabel,
  locale,
}: {
  game: Game;
  onClose: () => void;
  closeLabel: string;
  locale: string;
}) {
  return (
    <motion.div
      key="game-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="
        fixed inset-0 z-[1000]
        flex flex-col items-center justify-center
        p-4
        backdrop-blur-2xl bg-black/80
      "
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-[860px]
          flex flex-col gap-3
        "
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between px-1">
          <span className="font-semibold text-white text-lg tracking-tight">
            {game.name}
            <span className="ml-2 text-sm font-normal opacity-40">{game.year}</span>
          </span>
          <button
            onClick={onClose}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              text-white/70 text-sm
              hover:bg-white/10 transition
            "
          >
            <X size={16} />
            {closeLabel}
          </button>
        </div>

        {/* Iframe — ratio 4:3 para juegos DOS clásicos */}
        <div
          className="
            w-full rounded-xl overflow-hidden
            border border-white/10
            shadow-[0_0_60px_rgba(0,0,0,0.6)]
          "
          style={{ aspectRatio: game.aspectRatio ?? "4/3", maxHeight: "75vh" }}
        >
          <iframe
            src={game.iframeUrl}
            className="w-full h-full"
            allowFullScreen
            title={game.name}
          />
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-white/30">
          Click fuera del juego para cerrar · ESC para salir de pantalla completa
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function GameCatalog() {
  const t      = useTranslations("games");
  const locale = useLocale();
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  return (
    <>
      {/* Grid de juegos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={gridVariants}
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-5
          w-full
        "
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={setActiveGame}
            playLabel={t("play")}
            locale={locale}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeGame && (
          <GameModal
            game={activeGame}
            onClose={() => setActiveGame(null)}
            closeLabel={t("close")}
            locale={locale}
          />
        )}
      </AnimatePresence>
    </>
  );
}
