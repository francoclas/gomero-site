export type Tool = {
  id: string;
  name: string;
  desc: { es: string; en: string };
  tags: string[];
  href: string;
  icon: "tasks";
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
];
