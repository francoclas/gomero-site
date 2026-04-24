export type Game = {
  id: string;
  name: string;
  year: number;
  genre: { es: string; en: string };
  desc:  { es: string; en: string };
  iframeUrl: string;
  aspectRatio?: string;
};

export const games: Game[] = [
  {
    id: "2048",
    name: "2048",
    year: 2014,
    genre: { es: "Puzzle", en: "Puzzle" },
    desc: {
      es: "Combiná fichas para llegar al 2048. Simple de entender, difícil de dominar.",
      en: "Combine tiles to reach 2048. Easy to learn, hard to master.",
    },
    iframeUrl: "/games/2048/",
    aspectRatio: "3/4",
  },
  {
    id: "chess",
    name: "Chess",
    year: 0,
    genre: { es: "Estrategia", en: "Strategy" },
    desc: {
      es: "Ajedrez clásico contra una IA. Jugás de blancas, la IA de negras.",
      en: "Classic chess against an AI. You play White, the AI plays Black.",
    },
    iframeUrl: "/games/chess/",
    aspectRatio: "4/5",
  },
];
