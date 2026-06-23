import { getLocale } from "next-intl/server";
import { obtenerFrase } from "services/frases.js";
import "@styles/home/quote-section.css";

export default async function QuoteSection() {
  const locale = await getLocale();
  const { frase, autor } = await obtenerFrase(locale);

  return (
    <section className="quote-section">
      <p className="quote-text">
        “{frase}” <span className="quote-author">— {autor}</span>
      </p>
    </section>
  );
}
