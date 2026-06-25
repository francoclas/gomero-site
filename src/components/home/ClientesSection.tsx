import { getTranslations } from "next-intl/server";
import clientesData from "../../../data/clientes.json";

type Cliente = {
  nombre: string;
  rubro: string;
  logo?: string;
  testimonio?: string;
  url?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default async function ClientesSection() {
  const clientes = clientesData.clientes as Cliente[];

  if (!clientes || clientes.length === 0) return null;

  const t = await getTranslations("clientes");

  return (
    <section
      id="clientes"
      className="
        clientes-section
        py-16 px-4
        bg-white text-black
        dark:bg-[#0b0b0b] dark:text-white
      "
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">{t("title")}</h2>
          <p className="text-base opacity-70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <div
              key={cliente.nombre}
              className="
                h-full flex flex-col gap-4 p-6 rounded-2xl
                bg-white/60 backdrop-blur-md dark:bg-white/5
                border border-black/10 dark:border-white/10
                transition-shadow duration-250 ease-out hover:shadow-lg
              "
            >
              <div className="flex items-center gap-3">
                {cliente.logo ? (
                  <img
                    src={cliente.logo}
                    alt={cliente.nombre}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm bg-[#e05252]"
                  >
                    {getInitials(cliente.nombre)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-base leading-tight">{cliente.nombre}</p>
                  <p className="text-xs opacity-60">{cliente.rubro}</p>
                </div>
              </div>

              {cliente.testimonio && (
                <p className="text-sm opacity-75 leading-relaxed italic">
                  “{cliente.testimonio}”
                </p>
              )}

              {cliente.url && (
                <a
                  href={cliente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#e05252] hover:opacity-80 transition-opacity duration-200 ease-out mt-auto"
                >
                  {t("visitSite")} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
