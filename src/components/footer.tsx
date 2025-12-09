"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
export default function Footer() {
  const [show, setShow] = useState(false);
  const t = useTranslations("footer");
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer
      className={`
        w-full mt-24 pb-10 flex flex-col items-center gap-6 text-center 
        transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {/* Glass Card */}
      <div className="
        px-6 py-8 rounded-2xl
        backdrop-blur-md
        bg-white/50 dark:bg-white/5
        border border-black/10 dark:border-white/10
        shadow-lg max-w-xl w-[90%]
        transition
      ">
        <h3 className="text-xl font-semibold">gomero.dev</h3>
        <p className="opacity-80 mt-1 text-sm">
          {t("footerDesc")}
        </p>


        <div className="flex items-center justify-center gap-6 mt-6">
          <IconLink href="https://www.linkedin.com/in/francogomezuy/">
            <Linkedin size={22} />
          </IconLink>

          <IconLink href="https://github.com/francoclas">
            <Github size={22} />
          </IconLink>

          <IconLink href="https://www.instagram.com/gomerodev/">
            <Instagram size={22} />
          </IconLink>
        </div>
      </div>

      <p className="text-xs opacity-60 select-none">
        © {new Date().getFullYear()} gomero.dev — {t("footerRec")}
      </p>
    </footer>
  );
}

function IconLink({ href, children }: any) {
  return (
    <a
      href={href}
      target="_blank"
      className="
        transition-transform duration-200 
        hover:scale-125 hover:text-red-400
      "
    >
      {children}
    </a>
  );
}
