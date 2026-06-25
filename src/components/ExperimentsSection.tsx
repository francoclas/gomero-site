const experiments = [
  { name: "MetaGym", descKey: "metaGymDesc", stack: ["JavaScript"] },
  { name: "GestionTicket", descKey: "gestionTicketDesc", stack: ["C#", "Blazor"] },
] as const;

export default function ExperimentsSection({
  title,
  subtitle,
  pausedLabel,
  descriptions,
}: {
  title: string;
  subtitle: string;
  pausedLabel: string;
  descriptions: Record<string, string>;
}) {
  return (
    <section className="w-full max-w-4xl">
      <h2 className="text-sm font-semibold uppercase tracking-wide opacity-45 mb-2">
        {title}
      </h2>
      <p className="text-sm opacity-50 mb-6 max-w-xl">{subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiments.map((exp) => (
          <div
            key={exp.name}
            className="
              flex flex-col gap-3 p-5 rounded-xl
              border border-black/8 dark:border-white/6
              bg-white/40 dark:bg-white/[0.02]
            "
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-sm opacity-80">{exp.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/5 dark:bg-white/8 text-black/40 dark:text-white/40">
                {pausedLabel}
              </span>
            </div>

            <p className="text-xs opacity-50 leading-relaxed">
              {descriptions[exp.descKey]}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded text-[10px] font-mono opacity-40 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
