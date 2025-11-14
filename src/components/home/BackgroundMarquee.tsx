import "@styles/home/background-marquee.css"
export default function BackgroundMarquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-content">
        {"gomero.dev • gomero.dev • gomero.dev • gomero.dev • ".repeat(12)}
      </div>
    </div>
  );
}