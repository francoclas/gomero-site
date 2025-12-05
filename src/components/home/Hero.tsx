import BackgroundMarquee from "@/components/home/BackgroundMarquee";
import "@styles/home/background-marquee.css";
import { obtenerFrase } from "services/frases.js";
import { getLocale } from "next-intl/server";
export default async function Hero() {
  const rows = 12;
  const text = " gomero.dev ";
  const locale = await getLocale();
  const { frase, autor } = await obtenerFrase(locale);

  return (
    <section className="hero-section">
      <div className="marquee-wrapper">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="marquee-row"
            style={{
              animationDuration: `${30 + i * 3}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          >
            {text.repeat(10)}
          </div>
        ))}
      </div>

      <div className="hero-content">
       <h1>{frase}</h1>
      <h2>- {autor}</h2>
      </div>
    </section>
  );
}