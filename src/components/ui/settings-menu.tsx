"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions/languageAction"; // <-- Tu acción real

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const changeLang = async (lang: string) => {
    await setLocale(lang); // <-- Se encarga del idioma y su persistencia
    router.refresh();      // <-- Para recargar la UI
  };

  return (
    <div className="relative">
      {/* BOTÓN PREMIUM (estilo #3) */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative flex items-center justify-center
          w-10 h-10 rounded-lg
          bg-neutral-200 dark:bg-neutral-800
          hover:bg-neutral-300 dark:hover:bg-neutral-700
          transition-all duration-300
          overflow-hidden
        "
      >
        <Settings
          size={20}
          className={`
            transition-transform duration-300
            ${open ? "rotate-90" : "rotate-0"}
          `}
        />
      </button>

      {/* DROPDOWN */}
      <ul
        className={`
          absolute right-0 mt-2 w-36 
          bg-white dark:bg-neutral-900 
          border border-neutral-200 dark:border-neutral-700
          rounded-lg shadow-lg overflow-hidden
          transition-all duration-200 origin-top-right
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        <li
          onClick={() => {
            changeLang("es");
            setOpen(false);
          }}
          className="
            px-4 py-2 cursor-pointer 
            hover:bg-neutral-100 dark:hover:bg-neutral-800 
            transition flex items-center gap-2
          "
        >
          🇺🇾 Español
        </li>

        <li
          onClick={() => {
            changeLang("en");
            setOpen(false);
          }}
          className="
            px-4 py-2 cursor-pointer 
            hover:bg-neutral-100 dark:hover:bg-neutral-800 
            transition flex items-center gap-2
          "
        >
          🇺🇸 English
        </li>
      </ul>
    </div>
  );
}
