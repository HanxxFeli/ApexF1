import Link from "next/link";
/**
 * Footer component displayed on all pages
 * 
 * Purpose:
 * - Provides project content and external resources
 * - Links to GitHub repo
 * - Displays copyright and branding
 */
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="mx-auto max-w-300 px-12 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Project Description */}
          <div>
            <p className="text-sm font-semibold text-white/90">
              ApexF1 Analytics Platform
            </p>

            <p className="mt-2 text-xs text-white/45 max-w-sm">
              Formula 1 race data visualization and predictive insights built
              using modern web technologies.
            </p>
          </div>

          {/* Resource/Nav links */}
          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link 
              href="/about"
              className="hover:text-red-400 transition-colors"
            >
              Data Source
            </Link>

            <a
              href="https://github.com/HanxxFeli/ApexF1"
              className="hover:text-red-400 transition-colors"
            >
              GitHub
            </a>

            <Link 
              href="/about"
              className="hover:text-red-400 transition-colors"
            >
              About
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs text-white/35">
          © 2026 ApexF1 Analytics. All rights reserved.
        </div>

      </div>
    </footer>
  );
}