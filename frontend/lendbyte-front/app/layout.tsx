import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AuthProvider } from "../providers/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Level Byte - Easy articles for technology students",
    template: "%s | Level Byte",
  },
  description:
    "Notícias reais de tecnologia reescritas em 2 níveis: Basic (iniciante) e Advanced (intermediário/avançado). Código comentado, áudio, exercícios e glossário todos os dias. O Duolingo + Hacker News que todo programador precisava.",

  keywords: [
    "aprender programação",
  "aprender a programar do zero",
  "programação para iniciantes",
  "curso de programação grátis",
  "aprender código lendo notícias",

  "inglês para programadores",
  "inglês técnico programação",
  "ler notícias de tecnologia em inglês",
  "hacker news em português",
  "hacker news simplificado",

  "duolingo para programadores",
  "duolingo da programação",
  "duolingo de código",
  "notícias em níveis programação",
  "news in levels código",

  "aprender React 2025",
  "Tailwind CSS tutorial",
  "Rust para iniciantes",
  "TypeScript explicada",
  "Next.js do zero",

  "notícias tech com código comentado",
  "exercícios de programação diários",
  "áudio de notícias de tecnologia",
  "glossário de programação",

  "level byte",
  "levelbyte",
  "levelbyte programação",
  ],
  openGraph: { 
    title: "Level Byte - Easy articles for technology students",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`]
  },
  robots:{
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    }
  },
  applicationName: "Level Byte",    
  authors: [{ name: "Level Byte Team" }],
  creator: "Level Byte",
  publisher: "Level Byte",
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
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
