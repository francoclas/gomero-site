"use client";

import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
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

        {/* PANEL IZQUIERDO */}
        <div
          className="
            glass-box social-panel 
            rounded-xl p-6 flex-1 
            bg-white/60 backdrop-blur-md 
            dark:bg-white/5
            border border-black/10 dark:border-white/10
          "
        >
          <h3 className="social-title text-xl mb-4 font-medium">
            {t("socialTitle")}
          </h3>

          <div className="icon-grid grid grid-cols-4 gap-4">
            <a
              href="https://www.linkedin.com/in/francogomezuy/"
              target="_blank"
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
              href="https://www.instagram.com/gomerodev/"
              target="_blank"
              className="
                icon-wrapper p-3 rounded-lg flex items-center justify-center
                hover:bg-black/10 dark:hover:bg-white/10 transition
              "
            >
              <Instagram size={28} />
            </a>

            <a
              href="https://github.com/francoclas"
              target="_blank"
              className="
                icon-wrapper p-3 rounded-lg flex items-center justify-center
                hover:bg-black/10 dark:hover:bg-white/10 transition
              "
            >
              <Github size={28} />
            </a>

            <a
              href="#"
              className="
                icon-wrapper p-3 rounded-lg flex items-center justify-center
                hover:bg-black/10 dark:hover:bg-white/10 transition
              "
            >
              <Mail size={28} />
            </a>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div
          className="
            glass-box form-panel 
            rounded-xl p-6 flex-1 
            bg-white/60 backdrop-blur-md 
            dark:bg-white/5
            border border-black/10 dark:border-white/10
          "
        >
          <form
            action="/api/contact"
            method="POST"
            className="contact-form flex flex-col gap-5"
          >
            <div className="input-group flex flex-col gap-1">
              <label className="text-sm font-medium">{t("name")}</label>
              <input
                type="text"
                name="name"
                required
                className="
                  p-2 rounded-lg border border-black/20 
                  dark:border-white/20
                  bg-white dark:bg-[#1a1a1a]
                  text-black dark:text-white
                  focus:outline-none focus:ring-2 
                  focus:ring-red-400 dark:focus:ring-red-500
                "
              />
            </div>

            <div className="input-group flex flex-col gap-1">
              <label className="text-sm font-medium">{t("email")}</label>
              <input
                type="email"
                name="email"
                required
                className="
                  p-2 rounded-lg border border-black/20 
                  dark:border-white/20
                  bg-white dark:bg-[#1a1a1a]
                  text-black dark:text-white
                  focus:outline-none focus:ring-2 
                  focus:ring-red-400 dark:focus:ring-red-500
                "
              />
            </div>

            <div className="input-group flex flex-col gap-1">
              <label className="text-sm font-medium">{t("message")}</label>
              <textarea
                name="message"
                rows={5}
                required
                className="
                  p-2 rounded-lg border border-black/20 
                  dark:border-white/20
                  bg-white dark:bg-[#1a1a1a]
                  text-black dark:text-white
                  focus:outline-none focus:ring-2 
                  focus:ring-red-400 dark:focus:ring-red-500
                "
              ></textarea>
            </div>

            <button
              type="submit"
              className="
                submit-btn mt-2 py-2 px-4 rounded-lg
                bg-red-500 text-white font-semibold
                hover:bg-red-600 transition
                dark:bg-red-600 dark:hover:bg-red-700
              "
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
