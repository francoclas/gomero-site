"use client";

import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import "@/styles/home/contact-Section.css";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section className="contact-section" id="contacto">
      <h2 className="contact-title">{t("title")}</h2>

      <div className="contact-container">

        {/* PANEL IZQUIERDO */}
        <div className="glass-box social-panel">
          <h3 className="social-title">{t("socialTitle")}</h3>

          <div className="icon-grid">
            <a href="https://linkedin.com" target="_blank" className="icon-wrapper">
              <Linkedin size={28} />
            </a>

            <a href="https://instagram.com" target="_blank" className="icon-wrapper">
              <Instagram size={28} />
            </a>

            <a href="https://github.com" target="_blank" className="icon-wrapper">
              <Github size={28} />
            </a>

            <a href="#" className="icon-wrapper">
              <Mail size={28} />
            </a>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="glass-box form-panel">
          <form action="/api/contact" method="POST" className="contact-form">

            <div className="input-group">
              <label>{t("name")}</label>
              <input type="text" name="name" required />
            </div>

            <div className="input-group">
              <label>{t("email")}</label>
              <input type="email" name="email" required />
            </div>

            <div className="input-group">
              <label>{t("message")}</label>
              <textarea name="message" rows={5} required></textarea>
            </div>

            <button type="submit" className="submit-btn">
              {t("send")}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
