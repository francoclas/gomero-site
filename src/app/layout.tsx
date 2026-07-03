import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://gomero.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Desarrollador Web Freelance en Uruguay | Gomero.dev",
    template: "%s | Gomero.dev",
  },

  description:
    "Desarrollador web freelance en Uruguay. Landing pages, apps a medida y automatizaciones para negocios. Sin agencias, sin intermediarios.",

  authors: [{ name: "Franco Gómez", url: BASE_URL }],
  creator: "Franco Gómez",
  publisher: "Gomero.dev",

  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-UY": BASE_URL,
      "en-US": `${BASE_URL}/en`,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_UY",
    url: BASE_URL,
    siteName: "Gomero.dev",
    title: "Desarrollador Web Freelance en Uruguay | Gomero.dev",
    description:
      "Landing pages, apps a medida y automatizaciones para negocios en Uruguay. Sin agencias, sin intermediarios.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gomero.dev — Desarrollador Web Freelance en Uruguay",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Desarrollador Web Freelance en Uruguay | Gomero.dev",
    description:
      "Landing pages, apps a medida y automatizaciones para negocios en Uruguay. Sin agencias, sin intermediarios.",
    images: ["/og-image.png"],
    creator: "@gomerodev",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}