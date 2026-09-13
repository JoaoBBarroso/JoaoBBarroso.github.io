import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const description =
  "Front-end developer since 2018 — React, Next.js and TypeScript for proptech, fintech, banking and telecom; now Ember.js and Ruby at Salsify.";

export const metadata: Metadata = {
  metadataBase: new URL("https://joaobbarroso.github.io"),
  title: "João Barroso — Front-end Developer",
  description,
  openGraph: { title: "João Barroso — Front-end Developer", description, images: ["/profile.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
