"use client";

import { useState } from "react";
import { LayoutTemplate, Code2, Workflow, BarChart3, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ServiceModal from "./ServiceModal";

const WHATSAPP_NUMBER = "59892779541";

const services = [
  { key: "landingPages", icon: LayoutTemplate },
  { key: "customDev", icon: Code2 },
  { key: "automation", icon: Workflow },
  { key: "dashboards", icon: BarChart3 },
] as const;

type ServiceKey = (typeof services)[number]["key"];

export default function ServicesSection() {
  const t = useTranslations("services");
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null);

  const modalData = openKey
    ? {
        title: t(`${openKey}.title`),
        description: t(`${openKey}.description`),
        price: t(`${openKey}.price`),
        ctaLabel: t("modalCta"),
        whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          t("whatsappMessage", { service: t(`${openKey}.title`) })
        )}`,
      }
    : null;

  return (
    <section
      id="services"
      className="
        services-section
        py-16 px-4
        bg-white text-black
        dark:bg-[#0b0b0b] dark:text-white
      "
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">{t("title")}</h2>
          <p className="text-base opacity-70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ key, icon: Icon }) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => setOpenKey(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenKey(key);
                }
              }}
              className="cursor-pointer transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <Card
                className="
                  h-full
                  transition-shadow duration-250 ease-out
                  hover:shadow-lg
                  bg-white/60 backdrop-blur-md
                  dark:bg-white/5
                  border-black/10 dark:border-white/10
                "
              >
                <CardHeader>
                  <div
                    className="
                      w-12 h-12 mb-2 rounded-lg
                      flex items-center justify-center
                      bg-red-500/10 text-red-500
                    "
                  >
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`${key}.title`)}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t(`${key}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium mb-4">{t("ctaText")}</p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-red-500 text-white font-semibold text-sm
              shadow-[0_0_20px_rgba(239,68,68,0.35)]
              hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]
              transition-colors duration-200
            "
          >
            {t("ctaButton")}
            <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>

      <ServiceModal
        service={modalData}
        onClose={() => setOpenKey(null)}
        closeLabel={t("closeLabel")}
      />
    </section>
  );
}
