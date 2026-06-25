"use client";

import { useCallback, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Sparkles, Copy, Check, Instagram } from "lucide-react";
import ToolCardShell from "./ToolCardShell";

const MAX_LENGTH = 150;

function truncate(text: string) {
  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH - 1)}…` : text;
}

function buildBios(what: string, who: string, offer: string, locale: string) {
  const templates =
    locale === "en"
      ? [
          `✨ ${what}\n💡 Helping ${who}\n🚀 ${offer}`,
          `${what}. I work with ${who} to ${offer}.`,
          `📍 ${who}\n✨ ${offer}\n${what}`,
        ]
      : [
          `✨ ${what}\n💡 Ayudo a ${who}\n🚀 ${offer}`,
          `${what}. Trabajo con ${who} para ${offer}.`,
          `📍 ${who}\n✨ ${offer}\n${what}`,
        ];

  return templates.map(truncate);
}

export default function BioGenerator() {
  const t = useTranslations("tools.bioGenerator");
  const locale = useLocale();

  const [what, setWhat] = useState("");
  const [who, setWho] = useState("");
  const [offer, setOffer] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const canGenerate = what.trim() && who.trim() && offer.trim();

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return;
    setBios(buildBios(what.trim(), who.trim(), offer.trim(), locale));
  }, [what, who, offer, locale, canGenerate]);

  const handleCopy = useCallback((bio: string, index: number) => {
    navigator.clipboard.writeText(bio);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex((curr) => (curr === index ? null : curr)), 2000);
  }, []);

  const fields: { label: string; placeholder: string; value: string; set: (v: string) => void }[] = [
    { label: t("whatLabel"), placeholder: t("whatPlaceholder"), value: what, set: setWhat },
    { label: t("whoLabel"), placeholder: t("whoPlaceholder"), value: who, set: setWho },
    { label: t("offerLabel"), placeholder: t("offerPlaceholder"), value: offer, set: setOffer },
  ];

  return (
    <ToolCardShell icon={<Instagram size={20} />} title={t("title")}>
      <div className="flex flex-col gap-3">
        {fields.map(({ label, placeholder, value, set }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-xs opacity-60">{label}</span>
            <input
              type="text"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              maxLength={80}
              className="
                w-full px-3 py-2 rounded-xl text-sm
                bg-white dark:bg-[#1a1a1a]
                border border-black/15 dark:border-white/15
                text-black dark:text-white
                placeholder:opacity-40
                focus:outline-none focus:ring-2 focus:ring-red-400/50
              "
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="
          flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl
          bg-red-500 text-white text-sm font-semibold
          hover:bg-red-600 transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        <Sparkles size={16} />
        {t("generate")}
      </button>

      {bios.length === 0 ? (
        <p className="text-xs opacity-40 text-center">{t("emptyHint")}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {bios.map((bio, i) => (
            <div
              key={i}
              className="
                flex items-start justify-between gap-2 px-3 py-2.5 rounded-xl
                bg-white dark:bg-[#1a1a1a]
                border border-black/15 dark:border-white/15
              "
            >
              <span className="text-xs whitespace-pre-line leading-relaxed flex-1">{bio}</span>
              <button
                type="button"
                onClick={() => handleCopy(bio, i)}
                className="
                  flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg
                  text-[11px] font-semibold
                  bg-red-500/10 text-red-400
                  hover:bg-red-500/20 transition-colors
                "
              >
                {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                {copiedIndex === i ? t("copied") : t("copy")}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolCardShell>
  );
}
