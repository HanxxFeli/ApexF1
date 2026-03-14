"use client";

import { useState, useEffect } from "react";
import { getRaceSchedule } from "@/lib/jolpica";
import CalendarHero from "@/components/calendar/CalendarHero";
import SeasonSelector from "@/components/calendar/SeasonSelector";
import RaceGrid from "@/components/calendar/RaceGrid";
import CountdownBanner from "@/components/calendar/CountdownBanner";

export default function CalendarPage() {
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear.toString());
  const [races, setRaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRaces() {
      setIsLoading(true);
      try {
        const data = await getRaceSchedule(season);
        setRaces(data || []);
      } catch {
        setRaces([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRaces();
  }, [season]);

  const now = new Date();
  const isCurrentSeason = season === currentYear.toString();
  const nextRace = isCurrentSeason
    ? races.find((r) => new Date(r.date) > now)
    : null;

  return (
    <div className="mx-auto max-w-300 px-12 py-16">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold">Calendar</h1>

      <p className="text-sm text-white/50 mt-2">
        Browse the Formula 1 race schedule by season.
      </p>

      <CalendarHero season={season} />

      {!isLoading && nextRace && <CountdownBanner race={nextRace} />}

      <SeasonSelector season={season} onSeasonChange={setSeason} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="
            w-8 h-8 rounded-full mb-4
            border-2 border-red-500 border-t-transparent
            animate-spin
          " />
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Loading Schedule...
          </p>
        </div>
      ) : (
        <RaceGrid races={races} season={season} currentYear={currentYear} />
      )}

    </div>
  );
}