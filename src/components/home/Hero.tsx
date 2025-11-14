import BackgroundMarquee from "@/components/home/BackgroundMarquee";
import "@styles/home/background-marquee.css";
export default function Hero() {
  const rows = 6;
  const text = "gomero.dev • gomero.dev • gomero.dev • ";

  return (
    <section className="hero-section">
      <div className="marquee-wrapper">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="marquee-row"
            style={{
              animationDuration: `${20 + i * 3}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          >
            {text.repeat(10)}
          </div>
        ))}
      </div>

      <div className="hero-content">
        <h1>FRASE PRESENTACIÓN O ESLOGAN</h1>
      </div>
    </section>
  );
}