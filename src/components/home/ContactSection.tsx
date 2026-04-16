"use client";

import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import "@/styles/home/contact-Section.css";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      className="
        contact-section
        py-16
        bg-white text-black
        dark:bg-[#0b0b0b] dark:text-white
      "
      id="contacto"
    >
      <h2 className="contact-title text-black dark:text-white text-3xl font-semibold text-center mb-10">
        {t("title")} 😊
      </h2>

      <div className="contact-container flex flex-col md:flex-row gap-8 md:gap-10">

        {/* PANEL IZQUIERDO — LinkedIn + GitHub */}
        <div
          className="
            glass-box social-panel
            rounded-xl p-6 flex-1
            bg-white/60 backdrop-blur-md
            dark:bg-white/5
            border border-black/10 dark:border-white/10
          "
        >
          <h3 className="social-title text-xl mb-6 font-medium">
            {t("socialTitle")}
          </h3>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/francogomezuy/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                icon-wrapper
                p-3 rounded-lg flex items-center justify-center
                hover:bg-black/10 dark:hover:bg-white/10
                transition
              "
            >
              <Linkedin size={28} />
            </a>

            <a
              href="https://github.com/francoclas"
              target="_blank"
              rel="noopener noreferrer"
              className="
                icon-wrapper p-3 rounded-lg flex items-center justify-center
                hover:bg-black/10 dark:hover:bg-white/10 transition
              "
            >
              <Github size={28} />
            </a>
          </div>
        </div>

        {/* PANEL DERECHO — CTA */}
        <div
          className="
            glass-box form-panel
            rounded-xl p-8 flex-1
            bg-white/60 backdrop-blur-md
            dark:bg-white/5
            border border-black/10 dark:border-white/10
            flex flex-col justify-center
          "
        >
          <p className="text-base opacity-80 leading-relaxed mb-8">
            {t("ctaText")}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center gap-4">

            {/* Botón Email */}
            <motion.a
              href="mailto:gomero.dev@gmail.com"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                flex items-center justify-center gap-2
                px-5 py-3 rounded-xl
                bg-red-500 text-white font-semibold text-sm
                shadow-[0_0_20px_rgba(239,68,68,0.35)]
                hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]
                transition-colors duration-200
              "
            >
              <Mail size={18} />
              {t("emailBtn")}
            </motion.a>

            {/* Botón Instagram */}
            <motion.a
              href="https://www.instagram.com/gomerodev/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                flex items-center justify-center gap-2
                px-5 py-3 rounded-xl
                bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
                text-white font-semibold text-sm
                shadow-[0_0_20px_rgba(236,72,153,0.3)]
                hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
                transition-shadow duration-200
              "
            >
              <Instagram size={18} />
              {t("instagramBtn")}
            </motion.a>

          </div>
        </div>

      </div>
    </section>
  );
}
