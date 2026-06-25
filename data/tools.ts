export type Tool = {
  id: string;
  name: string;
  desc: { es: string; en: string };
  tags: string[];
  href: string;
  icon: "tasks" | "checklist" | "budget";
};

export const tools: Tool[] = [
  {
    id: "gestor-tareas",
    name: "Gestor de Tareas",
    desc: {
      es: "Organizá tus tareas diarias. Tus datos se guardan en tu navegador.",
      en: "Organize your daily tasks. Your data is saved in your browser.",
    },
    tags: ["React", "localStorage"],
    href: "/tools/gestor-tareas",
    icon: "tasks",
  },
  {
    id: "checklist",
    name: "Checklist de presencia digital",
    desc: {
      es: "Evaluá qué tan visible está tu negocio online y descubrí qué mejorar.",
      en: "Find out how visible your business is online and what to improve.",
    },
    tags: ["React", "Interactivo"],
    href: "/tools/checklist",
    icon: "checklist",
  },
  {
    id: "presupuesto",
    name: "Calculadora de presupuesto web",
    desc: {
      es: "Respondé algunas preguntas y obtené un estimado del costo de tu sitio web.",
      en: "Answer a few questions and get an estimate for your website's cost.",
    },
    tags: ["React", "Interactivo"],
    href: "/tools/presupuesto",
    icon: "budget",
  },
];
