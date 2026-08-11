import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FISICO_APP } from "../../../data/fisicoAppProject";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: FISICO_APP.metaTitle,
  description: FISICO_APP.metaDescription,
};

export default function FisicoAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} font-[family-name:var(--font-jakarta)]`}>
      {children}
    </div>
  );
}
