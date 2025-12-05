"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeSwap() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-neutral-200 dark:bg-neutral-800
        hover:bg-neutral-300 dark:hover:bg-neutral-700
        transition-all duration-300
        overflow-hidden
      "
    >
      <Sun
        size={20}
        className={`
          absolute transition-all duration-500
          ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}
        `}
      />
      <Moon
        size={20}
        className={`
          absolute transition-all duration-500
          ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"}
        `}
      />
    </button>
  );
}
