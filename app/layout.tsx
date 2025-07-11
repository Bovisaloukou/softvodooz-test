import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bibliothèque - Votre collection réinventée",
  description:
    "Découvrez, organisez et explorez votre collection de livres avec une interface moderne et intuitive",
  keywords: "bibliothèque, livres, lecture, collection, organisation",
  authors: [{ name: "Bibliothèque Team" }],
};

export const viewport =   "width=device-width, initial-scale=1"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
