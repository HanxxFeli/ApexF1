"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/constructors", label: "Constructors" },
  { href: "/races", label: "Races" },
  { href: "/predictions", label: "Predictions" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  // Optional: close on Escape
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-md border-b border-surface bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-extrabold tracking-tight text-xl"
            onClick={() => setOpen(false)}
          >
            Apex<span className="text-red-500">F1</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-primary transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 text-muted">
            <ThemeToggle />

            <button
              className="p-2 rounded-lg hover:bg-surface transition"
              aria-label="Search"
              type="button"
            >
              <Search size={18} />
            </button>

            <button
              className="p-2 rounded-lg hover:bg-surface transition md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              type="button"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="md:hidden">
            {/* overlay click to close */}
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/30"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />

            <div
              id="mobile-nav"
              className="relative z-50 mx-auto max-w-6xl px-5 pb-4"
            >
              <div className="rounded-2xl border border-surface bg-surface p-3">
                <nav className="flex flex-col">
                  {nav.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="px-3 py-3 rounded-xl text-sm text-primary hover:bg-surface transition"
                      onClick={() => setOpen(false)}
                    >
                      {i.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}