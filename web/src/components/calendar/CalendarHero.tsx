import Link from "next/link";

interface CalendarHeroProps {
  season: string;
}

// Hero header for the calendar page — shows season title and breadcrumb back to home
export default function CalendarHero({ season }: CalendarHeroProps) {
  return (
    <div className="relative mb-8">

      {/* Faint watermark numeral behind the title */}
      <span
        className="absolute right-0 top-0 text-white/[0.02] font-semibold leading-none pointer-events-none select-none"
        style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
        aria-hidden
      >
        F1
      </span>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-xs text-white/30 tracking-widest uppercase hover:text-white/60 transition-colors"
      >
        ← Home
      </Link>

      <p className="text-xs text-red-500 tracking-widest uppercase mb-2">
        Formula 1 · Race Schedule
      </p>

      <h1 className="text-4xl font-semibold text-white">
        {season} <span className="text-red-500">Calendar</span>
      </h1>

      <p className="text-sm text-white/50 mt-2">
        Complete Formula 1 season schedule with results and countdown.
      </p>

    </div>
  );
}