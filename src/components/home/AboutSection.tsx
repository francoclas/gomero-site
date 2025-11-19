import CarouselStack from "./CarouselStack";
import { CometCard } from "@/components/ui/comet-card";
import { useTranslations } from "next-intl";

export default function AboutSection() {
 const t = useTranslations("aboutHome");

  return (
    <section className="acerca-section">
      <div className="acerca-container">

        <CometCard>
          <div className="acerca-card">
            <h2>{t("aboutProTitle")}</h2>
            <p>{t("aboutProText")}</p>
          </div>
        </CometCard>

        <CometCard>
          <div className="acerca-card">
            <h2>{t("aboutPersonalTitle")}</h2>
            <p>{t("aboutPersonalText")}</p>
          </div>
        </CometCard>

      </div>
    </section>
  );
}

        <CarouselStack></CarouselStack>