'use client'

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  type Variants,
} from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Music, ExternalLink } from "lucide-react";
import artists from "../../../data/artists.json";

// ─── Tipos ───────────────────────────────────────────────────────────────────
type Artist = {
  name: string;
  desc: { es: string; en: string };
  image: string;
  url: string;
};

// ─── Constantes de carrusel ───────────────────────────────────────────────────
const CARD_WIDTH = 210;
const CARD_GAP   = 16;
const SPEED      = 38; // px/s
const LOOP_WIDTH = artists.length * (CARD_WIDTH + CARD_GAP);
const duplicated: Artist[] = [...artists, ...artists];

// ─── Variantes de Motion ─────────────────────────────────────────────────────
const sectionVariants: Variants = {
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ─── Sub-componente: Card de artista ─────────────────────────────────────────
function ArtistCard({
  artist,
  listenLabel,
  locale,
}: {
  artist: Artist;
  listenLabel: string;
  locale: string;
}) {
  const desc = artist.desc[locale as "es" | "en"] ?? artist.desc.es;
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-black/10 dark:border-white/10 shadow-md select-none"
      style={{ width: CARD_WIDTH }}
    >
      {/* Imagen */}
      <div
        className="relative overflow-hidden"
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
      >
        {artist.image ? (
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="210px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            draggable={false}
          />
        ) : (
          /* Fallback para artistas sin imagen */
          <div className="w-full h-full bg-gradient-to-br from-violet-900/60 to-slate-800/80 flex items-center justify-center">
            <Music size={44} className="opacity-25 text-white" />
          </div>
        )}

        {/* Overlay oscuro en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Botón "Escuchar" — aparece sobre la imagen en hover */}
        {artist.url && (
          <a
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              absolute bottom-3 left-1/2 -translate-x-1/2
              flex items-center gap-1.5
              px-3 py-1.5 rounded-full
              bg-white/90 text-black
              text-xs font-semibold whitespace-nowrap
              opacity-0 translate-y-2
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-200
            "
          >
            {listenLabel}
            <ExternalLink size={10} />
          </a>
        )}
      </div>

      {/* Nombre + descripción */}
      <div className="p-3 flex flex-col gap-1">
        <span className="font-semibold text-sm leading-snug">{artist.name}</span>
        <p className="text-xs opacity-55 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AboutMusic() {
  const t          = useTranslations("aboutme");
  const locale     = useLocale();
  const x          = useMotionValue(0);
  const isDragging = useRef(false);
  const isPaused   = useRef(false);

  // Auto-scroll continuo
  useAnimationFrame((_, delta) => {
    if (isDragging.current || isPaused.current) return;
    const next = x.get() - (SPEED * delta / 1000);
    x.set(next <= -LOOP_WIDTH ? next + LOOP_WIDTH : next);
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
      className="
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-black/10 dark:border-white/10
        pt-8 px-8 pb-6
        shadow-lg overflow-hidden
      "
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-400/20">
          <Music size={22} className="text-red-400" />
        </div>
        <h2 className="text-xl font-semibold">{t("musicTitle")}</h2>
      </motion.div>

      {/* Texto intro */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-8">
        <p className="text-sm md:text-base leading-relaxed opacity-80">
          {t("musicP1")}
        </p>
        <p className="text-sm md:text-base leading-relaxed opacity-80">
          {t("musicP2")}
        </p>
      </motion.div>

      {/* Carrusel */}
      <motion.div variants={itemVariants} className="-mx-8">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          {/* Fade bordes — usa el color de fondo de la página */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-14 z-10 bg-gradient-to-r from-white dark:from-[#0b0b0b] to-transparent" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-14 z-10 bg-gradient-to-l from-white dark:from-[#0b0b0b] to-transparent" />

          {/* Track arrastrable */}
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -LOOP_WIDTH, right: 0 }}
            dragElastic={0.04}
            dragMomentum={false}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => {
              // pequeño delay para que el spring de dragElastic complete
              setTimeout(() => { isDragging.current = false; }, 80);
            }}
            className="flex px-8 py-3 gap-4 cursor-grab active:cursor-grabbing"
          >
            {duplicated.map((artist, i) => (
              <ArtistCard
                key={`${artist.name}-${i}`}
                artist={artist}
                listenLabel={t("musicListen")}
                locale={locale}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
