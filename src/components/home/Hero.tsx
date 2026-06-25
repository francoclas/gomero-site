import HeroBackground from "@/components/home/HeroBackground";
import Link from "next/link";
import "@styles/home/background-marquee.css";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="hero-section">
      <HeroBackground />

      <div className="hero-content">
        <p className="hero-eyebrow">{t("eyebrow")}</p>

        <h1 className="hero-title">
          <span className="block">{t("headlineLine1")}</span>
          <span className="block">
            {t("headlineLine2Pre")}
            <span className="hero-title-accent">{t("headlineWord")}</span>
            {t("headlineLine2Post")}
          </span>
          <span className="block">{t("headlineLine3")}</span>
        </h1>

        <p className="hero-subtitle">{t("subtitle")}</p>

        <div className="hero-ctas">
          <Link href="#contacto" className="hero-cta-primary">
            {t("ctaPrimary")}
          </Link>
          <Link href="/projects" className="hero-cta-secondary">
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
