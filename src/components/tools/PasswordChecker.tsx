"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Eye, EyeOff, Check, X } from "lucide-react";
import ToolCardShell from "./ToolCardShell";

const STRENGTH = [
  { labelKey: "strengthWeak", color: "bg-red-500", percent: 25 },
  { labelKey: "strengthFair", color: "bg-amber-500", percent: 50 },
  { labelKey: "strengthGood", color: "bg-sky-500", percent: 75 },
  { labelKey: "strengthStrong", color: "bg-emerald-500", percent: 100 },
] as const;

export default function PasswordChecker() {
  const t = useTranslations("tools.passwordChecker");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const criteria = [
    { key: "criteriaLength", met: password.length >= 8 },
    { key: "criteriaUppercase", met: /[A-Z]/.test(password) },
    { key: "criteriaNumber", met: /[0-9]/.test(password) },
    { key: "criteriaSymbol", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = criteria.filter((c) => c.met).length;
  const strength = STRENGTH[Math.max(score - 1, 0)];

  return (
    <ToolCardShell icon={<ShieldCheck size={20} />} title={t("title")}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("placeholder")}
          className="
            w-full px-4 py-2.5 pr-11 rounded-xl text-sm
            bg-white dark:bg-[#1a1a1a]
            border border-black/15 dark:border-white/15
            text-black dark:text-white
            placeholder:opacity-40
            focus:outline-none focus:ring-2 focus:ring-red-400/50
          "
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? t("hide") : t("show")}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${password ? strength.color : ""}`}
            style={{ width: password ? `${strength.percent}%` : "0%" }}
          />
        </div>
        {password && (
          <span className="text-xs font-semibold opacity-70">{t(strength.labelKey)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {criteria.map(({ key, met }) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            {met ? (
              <Check size={14} className="text-emerald-400 flex-shrink-0" />
            ) : (
              <X size={14} className="opacity-30 flex-shrink-0" />
            )}
            <span className={met ? "opacity-80" : "opacity-40"}>{t(key)}</span>
          </div>
        ))}
      </div>
    </ToolCardShell>
  );
}
