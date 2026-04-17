"use client";

import { useState, useEffect } from "react";

interface Props {
  race: any;
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

// Sticky banner shown at the top of the calendar page for the current season's next race
export default function CountdownBanner({ race }: Props) {
  const raceDate = race?.date ? new Date(race.date) : null;
  const countdown = useCountdown(raceDate);

  if (!race || !raceDate) return null;

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div className="relative border-b border-white/10 bg-[#1D1D27] overflow-hidden mb-8 rounded-md">

      {/* Red left edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600" />

      <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 pl-8">

        {/* Race name, location, and date */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
            Next Race
          </span>
          <div className="w-px h-5 bg-white/10" />
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide leading-none">
              {race.raceName}
            </p>
            <p className="text-xs text-white/40 mt-0.5">
              {race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country} · Round {race.round}
            </p>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <p className="text-xs text-white/35">
            {raceDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
        </div>

        {/* Countdown blocks */}
        <div className="flex items-center gap-px">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center">
              <div className="bg-black/30 border border-white/10 px-3 py-2 text-center min-w-[52px]">
                <p className="text-xl font-semibold text-red-500 leading-none tabular-nums">
                  {String(u.value).padStart(2, "0")}
                </p>
                <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1">
                  {u.label}
                </p>
              </div>
              {i < units.length - 1 && (
                <span className="text-white/20 text-sm px-1">:</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}