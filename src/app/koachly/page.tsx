import Link from "next/link";
import { Users, BarChart2, CreditCard, ArrowLeft, Dumbbell } from "lucide-react";

// ── Datos ──────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Users,
    title: "Gestioná clientes",
    desc: "Registrá tu base de clientes, seguí su historial y mantené todo en un mismo lugar.",
  },
  {
    icon: BarChart2,
    title: "Seguí el progreso",
    desc: "Cargá rutinas, métricas y evolución. Que cada cliente vea cuánto avanzó.",
  },
  {
    icon: CreditCard,
    title: "Cobrá con MercadoPago",
    desc: "Generá cobros y gestioná pagos integrados. Sin plataformas externas.",
  },
] as const;

// ── Nav ────────────────────────────────────────────────────────────────────
function KoachlyNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1E1E1C]/90 backdrop-blur-md border-b border-white/6">
      <div className="text-lg font-bold tracking-tight">
        <span className="text-[#D85A30]">Koach</span>
        <span className="text-white">ly</span>
      </div>
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        gomero.dev
      </Link>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen bg-[#1E1E1C] flex flex-col items-center justify-center text-center px-6 pt-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D85A30]/30 bg-[#D85A30]/8 mb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D85A30] animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D85A30]">
          Lanzamiento próximo · En construcción
        </span>
      </div>

      {/* Wordmark */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none mb-6">
        <span className="text-[#D85A30]">Koach</span>
        <span className="text-white">ly</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed">
        La plataforma para el PT independiente latinoamericano
      </p>

      {/* Scroll hint */}
      <div className="mt-16 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-white/40" />
        <span className="text-xs tracking-widest text-white uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ── Features ───────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="bg-[#F5F3EC] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1C] mb-3">
            ¿Qué es Koachly?
          </h2>
          <p className="text-[#1E1E1C]/55 text-base max-w-md mx-auto">
            Todo lo que necesitás para gestionar tu trabajo como personal trainer, en una sola app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-[#1E1E1C]/6 hover:border-[#D85A30]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/10 flex items-center justify-center mb-5">
                <Icon size={20} className="text-[#D85A30]" />
              </div>
              <h3 className="font-bold text-[#1E1E1C] mb-2">{title}</h3>
              <p className="text-sm text-[#1E1E1C]/55 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Creator ────────────────────────────────────────────────────────────────
function Creator() {
  return (
    <section className="bg-[#F5F3EC] border-t border-[#1E1E1C]/8 py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">

        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-full bg-[#D85A30]/15 border-2 border-[#D85A30]/30 flex items-center justify-center mx-auto mb-6">
          <Dumbbell size={24} className="text-[#D85A30]" />
        </div>

        <h2 className="text-2xl font-bold text-[#1E1E1C] mb-4">¿Quién lo hace?</h2>

        <p className="text-[#1E1E1C]/60 text-base leading-relaxed mb-6">
          Proyecto en desarrollo por un dev de Uruguay.{" "}
          <Link href="/" className="text-[#D85A30] hover:underline font-medium">
            gomero.dev
          </Link>
          {". "}
          Si sos PT independiente y querés ser beta tester, escribime.
        </p>

        <a
          href="mailto:gomero.dev@gmail.com"
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            bg-[#D85A30] text-white
            text-sm font-semibold
            hover:bg-[#c04f28]
            transition-colors
          "
        >
          Escribime →
        </a>

        {/* Accent violeta */}
        <p className="mt-6 text-xs text-[#7F77DD] font-medium tracking-wide">
          Beta testers con acceso anticipado · Gratis durante el período de prueba
        </p>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1E1E1C] py-8 px-6 text-center">
      <p className="text-xs text-white/25">
        © 2026 Koachly · En construcción ·{" "}
        <Link href="/" className="text-[#D85A30]/70 hover:text-[#D85A30] transition-colors">
          Un proyecto de gomero.dev
        </Link>
      </p>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function KoachlyPage() {
  return (
    <>
      <KoachlyNav />
      <Hero />
      <Features />
      <Creator />
      <Footer />
    </>
  );
}
