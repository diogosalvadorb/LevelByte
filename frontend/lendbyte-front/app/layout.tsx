import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/Header";
import { AuthProvider } from "../providers/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Level Byte - Easy articles for technology students",
    template: "%s | Level Byte",
  },
  description:
    "Learn English naturally while staying updated with the latest in technology. Real tech news rewritten in two levels: Basic for beginners and Advanced for professionals. Your path to tech English fluency starts here.",

  keywords: [
    "learn programming English",
    "tech English learning",
    "programming for beginners",
    "read tech news in English",
    "English for developers",
    "technical English programming",
    "hacker news simplified",
    "English learning platform",
    "technology English courses",
    "developer English training",
    "level byte",
    "levelbyte",
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
  ],
  openGraph: { 
    title: "Level Byte - Easy articles for technology students",
    description: "Learn English naturally while staying updated with tech news. Two difficulty levels, daily content, and real-world practice.",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`],
    type: "website",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-gray-900`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">Level Byte</h3>
                  <p className="text-sm text-gray-400">
                    Master English through technology. Learn naturally with real tech content adapted to your level.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link></li>
                    <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition">About</Link></li>
                    <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">Learning Levels</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-400">🟢 Basic - For beginners</li>
                    <li className="text-gray-400">🔵 Advanced - For professionals</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Level Byte. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}