import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Koachly — Plataforma para personal trainers",
  description: "La plataforma para el PT independiente latinoamericano. En construcción.",
};

export default function KoachlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} font-[family-name:var(--font-jakarta)]`}>
      {children}
    </div>
  );
}
