import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//NextInt idiomas
import { NextIntlClientProvider } from 'next-intl';
//Paginas
import AboutMe from "../app/aboutme";
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

export const metadata: Metadata = {
  title: "Gomero.Dev",
  description: "Pagina de GomeroDev, desarrollos profesional y personales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
        <Nav></Nav>
        {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
