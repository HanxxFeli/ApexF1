"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { righteous } from "../../app/font";
/**
 * Navigation links displayed in the top navigation bar
 * Routes to the main sections of the ApexF1 dashboard
 */
const links = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/constructors", label: "Constructors" },
  { href: "/calendar", label: "Calendar" },
  { href: "/predictions", label: "Predictions" },
];

/**
 * Main navigation bar component
 * 
 * Features:
 * - Brand logo styles with Righteous font
 * - Primary navigation links with hover flow + animated underline
 * - Search and menu icons for future functionality
 */
export default function Navigation() {
  return (
    <nav className="w-full border-b border-white/10 bg-[#15151E] px-8 py-4 relative">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        {/* Logo */}
        <div className={`${righteous.className} text-xl font-bold text-white`}>
          Apex<span className="text-red-500">F1</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10 text-sm text-white/70 font-(--font-fira)">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group transition-colors duration-300"
          >
            {/* Text */}
            <span className="group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300">
              {link.label}
            </span>
            
            {/* Red Underline */}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white/60">
          <button className="group transition-all duration-300">
            <Search
              size={18}
              className="group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300"
            />
          </button>

          <button className="group transition-all duration-300">
            <Menu
              size={18}
              className="group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300"
            />
          </button>
        </div>
    </div>
  </nav>
  );
}