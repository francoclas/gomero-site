import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//Temas
import { ThemeProvider } from "next-themes";
import "./globals.css";
//NextInt idiomas
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from "next/headers";
//Paginas
//Componentes
import Nav from "../components/Nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//Lang

export const metadata: Metadata = {
  title: "Gomero.Dev",
  description: "Pagina de GomeroDev, desarrollos profesional y personales.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const preferredLang = cookieStore.get("preferredLang")?.value || "es";
  return (
    <html lang="preferredLang">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider>
        <Nav></Nav>
        {children}
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
