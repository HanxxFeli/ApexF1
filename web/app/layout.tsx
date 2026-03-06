import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { firaCode } from "./font";
import { Roboto_Mono } from "next/font/google";

/**
 * Global metadata for the application
 * Used by Next.js to populate page title and description
 */
export const metadata: Metadata = {
  title: "ApexF1",
  description: "Formula 1 analytics dashboard",
};

// Primary body font used across the application
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/**
 * Root layout component for the application
 * 
 * Wraps all pages and provides:
 * - Global navigation bar (header)
 * - Page styling
 * - Footer displayed
 * 
 * The children prop represents the active page content
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} ${firaCode.variable} antialiased bg-[#15151E] text-white`}
      >
        {/* Header */}
        <Navigation />

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}