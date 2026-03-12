import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApexF1 — Formula 1 Analytics Platform",
  description:
    "Formula 1 race analytics and machine learning predictions powered by 10 years of historical data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased bg-background text-foreground min-h-screen`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}