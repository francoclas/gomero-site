"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export type ServiceModalData = {
  title: string;
  description: string;
  price: string;
  whatsappUrl: string;
  ctaLabel: string;
};

export default function ServiceModal({
  service,
  onClose,
  closeLabel,
}: {
  service: ServiceModalData | null;
  onClose: () => void;
  closeLabel: string;
}) {
  useEffect(() => {
    if (!service) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key="service-modal-overlay"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            key="service-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-5 top-5 text-black/40 hover:text-black/70 transition-colors duration-200 ease-out"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-black mb-3 pr-6">{service.title}</h3>
            <p className="text-base text-gray-500 leading-relaxed mb-5">{service.description}</p>
            <p className="text-sm font-semibold mb-6 text-[#e05252]">{service.price}</p>

            <a
              href={service.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center w-full px-5 py-3 rounded-xl
                bg-[#e05252] text-white font-semibold text-sm
                hover:opacity-90 transition-opacity duration-200 ease-out
              "
            >
              {service.ctaLabel}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
