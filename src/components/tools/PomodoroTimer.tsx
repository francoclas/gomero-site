"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import ToolCardShell from "./ToolCardShell";

const DURATIONS = { work: 25 * 60, break: 5 * 60 } as const;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const t = useTranslations("tools.pomodoro");
  const [mode, setMode] = useState<"work" | "break">("work");
  const [secondsLeft, setSecondsLeft] = useState<number>(DURATIONS.work);
  const [running, setRunning] = useState(false);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        const nextMode = modeRef.current === "work" ? "break" : "work";
        modeRef.current = nextMode;
        setMode(nextMode);
        return DURATIONS[nextMode];
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const handleReset = useCallback(() => {
    setRunning(false);
    setMode("work");
    setSecondsLeft(DURATIONS.work);
  }, []);

  const total = DURATIONS[mode];
  const dashOffset = CIRCUMFERENCE * (secondsLeft / total);
  const isWork = mode === "work";

  return (
    <ToolCardShell icon={<Timer size={20} />} title={t("title")}>
      <div className="flex flex-col items-center gap-4">
        <span
          className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-500 ${
            isWork ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {isWork ? t("work") : t("break")}
        </span>

        <div className="relative w-36 h-36">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              strokeWidth="8"
              fill="none"
              className="stroke-black/10 dark:stroke-white/10"
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className={`transition-all duration-700 ease-linear ${
                isWork ? "stroke-red-500" : "stroke-emerald-500"
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold font-mono tabular-nums">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="
              flex items-center gap-1.5 px-4 py-2 rounded-xl
              bg-red-500 text-white text-sm font-semibold
              hover:bg-red-600 transition-colors
            "
          >
            {running ? <Pause size={16} /> : <Play size={16} />}
            {running ? t("pause") : t("start")}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="
              flex items-center gap-1.5 px-4 py-2 rounded-xl
              bg-white/5 text-sm font-semibold
              border border-black/10 dark:border-white/10
              hover:bg-white/10 transition-colors
            "
          >
            <RotateCcw size={16} />
            {t("reset")}
          </button>
        </div>
      </div>
    </ToolCardShell>
  );
}
