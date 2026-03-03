"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/constructors", label: "Constructors" },
  { href: "/races", label: "Races" },
  { href: "/predictions", label: "Predictions" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-b from-black/40 to-black/5 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl">
            Apex<span className="text-red-500">F1</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-white transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-white/70">
            <button className="p-2 rounded-lg hover:bg-white/5 transition" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition md:hidden" aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}