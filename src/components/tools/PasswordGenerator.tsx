"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Copy, Check } from "lucide-react";
import ToolCardShell from "./ToolCardShell";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(length: number, useUpper: boolean, useNumbers: boolean, useSymbols: boolean) {
  let charset = LOWER;
  if (useUpper) charset += UPPER;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

export default function PasswordGenerator() {
  const t = useTranslations("tools.passwordGenerator");

  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPassword(generatePassword(length, useUpper, useNumbers, useSymbols));
  }, [length, useUpper, useNumbers, useSymbols]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
  }, []);

  const toggles: { label: string; value: boolean; set: (v: boolean) => void }[] = [
    { label: t("uppercase"), value: useUpper, set: setUseUpper },
    { label: t("numbers"), value: useNumbers, set: setUseNumbers },
    { label: t("symbols"), value: useSymbols, set: setUseSymbols },
  ];

  return (
    <ToolCardShell icon={<KeyRound size={20} />} title={t("title")}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs opacity-60">
          <span>{t("lengthLabel")}</span>
          <span className="font-mono">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-red-500"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {toggles.map(({ label, value, set }) => (
          <button
            key={label}
            type="button"
            onClick={() => set(!value)}
            aria-pressed={value}
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold transition-all
              ${value
                ? "bg-red-500/20 text-red-400 border border-red-400/40"
                : "bg-white/5 opacity-50 hover:opacity-80 border border-transparent"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="
          flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl
          bg-white dark:bg-[#1a1a1a]
          border border-black/15 dark:border-white/15
        "
      >
        <span className="font-mono text-sm break-all">{password}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="
            flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            text-xs font-semibold
            bg-red-500 text-white
            hover:bg-red-600 transition-colors
          "
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? t("copied") : t("copy")}
        </button>
      </div>
    </ToolCardShell>
  );
}
