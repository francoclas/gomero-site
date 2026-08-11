import Link from "next/link";
import { Users, Dumbbell, CreditCard, ArrowRight } from "lucide-react";
import { FISICO_APP } from "../../data/fisicoAppProject";

// ── Datos estáticos ───────────────────────────────────────────────────────────
const pills = [
  { icon: Users,      label: "Gestión de clientes"   },
  { icon: Dumbbell,   label: "Rutinas & seguimiento"  },
  { icon: CreditCard, label: "MercadoPago nativo"     },
] as const;

const stack = ["ASP.NET Core", "React", "PostgreSQL", "MercadoPago"] as const;

// ── Mock dashboard (decorativo) ───────────────────────────────────────────────
const metrics = [
  { label: "Clientes", value: 12 },
  { label: "Sesiones", value: 8  },
  { label: "Rutinas",  value: 3  },
] as const;

const mockClients = [
  { initials: "JG", name: "Juan García",   status: "Activo",  active: true  },
  { initials: "ML", name: "María López",   status: "Activo",  active: true  },
  { initials: "CP", name: "Carlos Pérez",  status: "Pausado", active: false },
] as const;

// ── Componente ────────────────────────────────────────────────────────────────
export default function FisicoAppCard() {
  return (
    <div className="
      w-full rounded-2xl overflow-hidden
      border border-white/8
      bg-[#1E1E1C]
      transition-all duration-300
      hover:border-[#D85A30]/40
      hover:shadow-[0_0_40px_rgba(216,90,48,0.1)]
    ">
      <div className="flex flex-col lg:flex-row">

        {/* ── Panel izquierdo — info ────────────────────────────────────── */}
        <div className="flex-1 p-7 flex flex-col gap-5">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#D85A30] text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wide">
              🚧 Trabajando en esto ahora
            </span>
          </div>

          {/* Wordmark */}
          <div className="leading-none">
            <span className="text-4xl font-bold tracking-tight text-[#D85A30]">{FISICO_APP.nameAccent}</span>
            <span className="text-4xl font-bold tracking-tight text-white">{FISICO_APP.nameRest}</span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/55 leading-relaxed max-w-xs">
            {FISICO_APP.cardTagline}
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {pills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="
                  inline-flex items-center gap-1.5
                  px-3 py-1.5 rounded-full
                  text-xs font-medium
                  bg-white/5 text-white/65
                  border border-white/8
                "
              >
                <Icon size={11} className="text-[#D85A30]" />
                {label}
              </span>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5">
            {stack.map(s => (
              <span
                key={s}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-white/35 bg-white/4 border border-white/6"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/6">
            <Link
              href={FISICO_APP.href}
              className="
                inline-flex items-center gap-2
                text-sm font-semibold text-[#D85A30]
                hover:gap-3 transition-all duration-200
              "
            >
              Ver proyecto
              <ArrowRight size={15} />
            </Link>
            <span className="text-[10px] text-white/25 font-mono">
              Lanzamiento 2025 · En construcción
            </span>
          </div>
        </div>

        {/* ── Panel derecho — mock dashboard ───────────────────────────── */}
        <div className="
          lg:w-[340px] flex-shrink-0
          bg-black/40
          border-t border-white/5 lg:border-t-0 lg:border-l
          p-5 flex flex-col gap-4
        ">

          {/* Header del panel */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D85A30] animate-pulse" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Dashboard · Vista previa
            </span>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-3 gap-3">
            {metrics.map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/4 border border-white/6 rounded-xl p-3 text-center"
              >
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-[10px] text-white/35 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Clientes recientes */}
          <div>
            <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2.5">
              Clientes recientes
            </div>
            <div className="flex flex-col gap-2">
              {mockClients.map(({ initials, name, status, active }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/3 border border-white/5"
                >
                  {/* Avatar con iniciales */}
                  <div className="
                    w-8 h-8 rounded-lg flex-shrink-0
                    flex items-center justify-center
                    text-[10px] font-bold text-white/80
                    bg-[#D85A30]/20 border border-[#D85A30]/20
                  ">
                    {initials}
                  </div>
                  <span className="flex-1 text-xs text-white/60 truncate">{name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    active
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-white/5 text-white/30"
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Barra de actividad ficticia */}
          <div>
            <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">
              Actividad semanal
            </div>
            <div className="flex items-end gap-1 h-10">
              {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-[#D85A30]/30 hover:bg-[#D85A30]/50 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {["L","M","X","J","V","S","D"].map(d => (
                <span key={d} className="text-[9px] text-white/20 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
