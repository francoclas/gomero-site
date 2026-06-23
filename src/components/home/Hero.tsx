import HeroBackground from "@/components/home/HeroBackground";
import GButton from "@/components/ui/gbutton";
import "@styles/home/background-marquee.css";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="hero-section">
      <HeroBackground />

      <div className="hero-content">
        <h1>{t("headline")}</h1>
        <p>{t("subtitle")}</p>

        <div className="hero-ctas">
          <GButton href="/projects">{t("ctaProjects")}</GButton>
          <GButton
            href="#contacto"
            className="
              text-current border-black/20 bg-black/5 text-black
              hover:bg-black/10 hover:text-black hover:border-black/30
              dark:text-white dark:border-white/20 dark:bg-white/5
              dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/30
            "
          >
            {t("ctaContact")}
          </GButton>
        </div>
      </div>
    </section>
  );
}
