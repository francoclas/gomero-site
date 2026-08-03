export type FeaturedProject = {
  id: string;
  name: string;
  desc: { es: string; en: string };
  tags: { es: string; en: string }[];
  href: string;
};

export const featuredProject: FeaturedProject = {
  id: "gestor-tareas",
  name: "Gestor de Tareas",
  desc: {
    es: "Un gestor de tareas estilo Kanban con múltiples boards, arrastrar y soltar entre columnas, prioridades y etiquetas personalizables, y fechas límite con un panel de \"Vence hoy\". Todo corre 100% en tu navegador, con exportación e importación para no perder tus datos.",
    en: "A Kanban-style task manager with multiple boards, drag-and-drop between columns, custom priorities and labels, and due dates with a \"Due Today\" dashboard. Everything runs 100% in your browser, with export/import so you never lose your data.",
  },
  tags: [
    { es: "Multi-board", en: "Multi-board" },
    { es: "Kanban & Drag and Drop", en: "Kanban & Drag and Drop" },
    { es: "Prioridades", en: "Priorities" },
    { es: "Etiquetas", en: "Labels" },
    { es: "Fechas límite", en: "Due dates" },
    { es: "Export / Import", en: "Export / Import" },
  ],
  href: "/tools/gestor-tareas",
};
