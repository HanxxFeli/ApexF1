"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface RaceGridProps {
  races: any[];
  season: string;
  currentYear: number;
}

// Counts down to a target date, updating every second
function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const target = targetDate.getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate?.getTime()]);

  return timeLeft;
}

function RaceCard({ race, season, isNext, isPast }: { race: any; season: string; isNext: boolean; isPast: boolean }) {
  const raceDate = new Date(race.date);
  const fp1Date = race.FirstPractice?.date ? new Date(race.FirstPractice.date) : null;
  const qualiDate = race.Qualifying?.date ? new Date(race.Qualifying.date) : null;

  // Build a weekend date range
  const weekendStart = fp1Date || raceDate;
  const sameMonth = weekendStart.getMonth() === raceDate.getMonth();
  const weekendLabel = sameMonth
    ? `${weekendStart.getDate()}–${raceDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`
    : `${weekendStart.toLocaleDateString("en-US", { day: "numeric", month: "short" })} – ${raceDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`;

  // Only run the countdown timer for the next upcoming race
  const countdown = useCountdown(isNext ? raceDate : null);

  const cardContent = (
    <div
      className={`
        relative overflow-hidden h-full p-6
        bg-[#1D1D27] border border-white/10
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
        hover:border-red-500/20
        ${isNext ? "border-t-red-500 border-t-2" : ""}
        ${isPast ? "opacity-70 hover:opacity-100" : ""}
      `}
    >
      {/* round number watermark */}
      <span
        className="absolute top-3 right-4 text-white/[0.03] font-semibold leading-none pointer-events-none select-none text-8xl"
        aria-hidden
      >
        {race.round}
      </span>

      {/* Round badge — highlighted red for the next race */}
      <div
        className={`
          inline-flex items-center mb-4 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-sm
          ${isNext ? "bg-red-500/10 border border-red-500/25 text-red-500" : "bg-white/5 border border-white/10 text-white/30"}
        `}
      >
        {isNext ? "▶ Next · " : ""}Round {race.round}
      </div>

      {/* Race name and circuit location */}
      <h3 className="text-base font-semibold text-white leading-tight">
        {race.raceName}
      </h3>
      <p className="text-xs text-white/40 mt-0.5 mb-4">
        {race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country}
      </p>

      <div className="h-px bg-white/10 mb-4" />

      {/* Weekend date range, race day, and qualifying day */}
      <div className={isNext ? "mb-4" : ""}>
        <p className="text-[10px] text-white/25 tracking-widest uppercase mb-1">Race Weekend</p>
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">{weekendLabel}</p>
        <p className="text-xs text-white/25 mt-0.5">
          Race: {raceDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </p>
        {qualiDate && (
          <p className="text-xs text-white/20 mt-0.5">
            Qualifying: {qualiDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
        )}
      </div>

      {/* Live countdown grid — only rendered for the next race */}
      {isNext && (
        <div className="grid grid-cols-4 gap-px bg-white/10 mt-2">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hrs", value: countdown.hours },
            { label: "Min", value: countdown.minutes },
            { label: "Sec", value: countdown.seconds },
          ].map((t) => (
            <div key={t.label} className="bg-[#1D1D27] py-2 text-center">
              <p className="text-xl font-semibold text-red-500 leading-none tabular-nums">
                {String(t.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1">{t.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Past races show a results link */}
      {isPast && (
        <div className="flex justify-end mt-4">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-red-500">
            Results →
          </span>
        </div>
      )}
    </div>
  );

  // Past races are wrapped in a Link; upcoming races are not yet clickable
  return isPast ? (
    <Link href={`/races/${season}/${race.round}`} className="block h-full no-underline">
      {cardContent}
    </Link>
  ) : (
    <div className="h-full">{cardContent}</div>
  );
}

export default function RaceGrid({ races, season, currentYear }: RaceGridProps) {
  const now = new Date();
  const isCurrentSeason = season === currentYear.toString();
  const nextRaceIndex = isCurrentSeason ? races.findIndex((r) => new Date(r.date) > now) : -1;

  if (races.length === 0) {
    return (
      <div className="py-20 text-center border border-white/10 bg-[#1D1D27] rounded-md mt-6">
        <p className="text-sm text-white/30 tracking-widest uppercase">
          No races scheduled for {season}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Result count mirrors the drivers page pattern */}
      <p className="text-xs text-white/40 mt-6 mb-4">{races.length} races this season</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {races.map((race: any, index: number) => {
          const isPast = new Date(race.date) < now || !isCurrentSeason;
          const isNext = index === nextRaceIndex;
          return (
            <RaceCard key={race.round} race={race} season={season} isNext={isNext} isPast={isPast} />
          );
        })}
      </div>
    </>
  );
}