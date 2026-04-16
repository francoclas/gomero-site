import { CometCard } from "@/components/ui/comet-card";
import { useTranslations } from "next-intl";
import GButton from "../ui/gbutton";

export default function AboutSection() {
  const t = useTranslations("aboutHome");

  return (
    <section className="w-full flex justify-center py-24 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">

        {/* CARD PROFESIONAL */}
        <CometCard className="flex-1">
          <div className="
            rounded-2xl
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            p-8
            text-inherit
            shadow-lg
            transition-all
            duration-300
          ">
            <h2 className="text-2xl font-semibold mb-4">
              {t("aboutProTitle")}
            </h2>
            <p className="text-base opacity-90 leading-relaxed">
              {t("aboutProText")}
            </p>
            <div className="justify-between">
              <GButton href="/projects">{t("aboutLinkWork")}</GButton>
            </div>
          </div>
        </CometCard>

        {/* CARD PERSONAL */}
        <CometCard className="flex-1 ">
          <div className="
            rounded-2xl
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            p-8
            text-inherit
            shadow-lg
            transition-all
            duration-300
          ">
            <h2 className="text-2xl font-semibold mb-4 ">
              {t("aboutPersonalTitle")}
            </h2>
            <p className="text-base opacity-90 leading-relaxed ">
              {t("aboutPersonalText")}
            </p>
            <GButton href="/aboutme">{t("aboutLinkMe")}</GButton>
          </div>
        </CometCard>

      </div>
    </section>
  );
}
