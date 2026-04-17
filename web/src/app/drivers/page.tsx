"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

// Driver type — matches Jolpica / Ergast API response
type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality?: string;
  code?: string;
  dateOfBirth?: string;
};

// Used to determine if a driver is on the current 2026 F1 grid
const CURRENT_GRID = [
  "Alexander Albon", "Fernando Alonso", "Kimi Antonelli", "Oliver Bearman",
  "Gabriel Bortoleto", "Valtteri Bottas", "Franco Colapinto", "Pierre Gasly",
  "Isack Hadjar", "Lewis Hamilton", "Nico Hülkenberg", "Liam Lawson",
  "Charles Leclerc", "Arvid Lindblad", "Lando Norris", "Esteban Ocon",
  "Sergio Pérez", "Oscar Piastri", "George Russell", "Carlos Sainz",
  "Lance Stroll", "Max Verstappen",
];

/**
 * DriversPage
 *
 * Fetches all drivers from /api/drivers and renders them as a
 * searchable, filterable grid of cards. Each card navigates to
 * the driver detail page at /drivers/[id].
 */
export default function DriversPage() {
  const router = useRouter();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "current" | "past">("all");

  // Fetch all drivers from the API on mount
  useEffect(() => {
    async function fetchDrivers() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/drivers");
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to fetch drivers");
        }

        setDrivers(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDrivers();
  }, []);

  // Apply search + current/past filter to drivers list
  const filteredDrivers = drivers.filter((driver) => {
    const fullName = `${driver.givenName} ${driver.familyName}`;
    const matchesSearch = fullName.toLowerCase().includes(search.toLowerCase());
    const isCurrent = CURRENT_GRID.includes(fullName);

    if (filter === "current") return matchesSearch && isCurrent;
    if (filter === "past") return matchesSearch && !isCurrent;
    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-300 px-12 py-16">

      {/* Page header */}
      <h1 className="text-3xl font-semibold">Drivers</h1>
      <p className="text-sm text-white/50 mt-2">
        Explore current and historical Formula 1 drivers.
      </p>

      {/* Search + filter controls */}
      <div className="mt-8 flex gap-3 flex-wrap items-center">

        {/* Search input */}
        <input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1D1D27] border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-red-500/60 transition-colors w-52"
        />

        {/* Filter toggle */}
        <div className="flex rounded-md border border-white/10 overflow-hidden text-sm">
          {(["all", "current", "past"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 capitalize transition-colors ${
                filter === option
                  ? "bg-red-500/20 text-red-400"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-8 h-8 rounded-full mb-4 border-2 border-red-500 border-t-transparent animate-spin" />
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Loading Drivers...
          </p>
        </div>
      ) : error ? (

        /* Error state */
        <p className="text-sm text-red-400 mt-10">Error: {error}</p>

      ) : (

        <>
          {/* Result count */}
          <p className="text-xs text-white/30 mt-6 mb-4">
            {filteredDrivers.length} drivers found
          </p>

          {/* Driver cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => {
              const fullName = `${driver.givenName} ${driver.familyName}`;
              const isCurrent = CURRENT_GRID.includes(fullName);

              return (
                <div
                  key={driver.driverId}
                  onClick={() => router.push(`/drivers/${driver.driverId}`)}
                  className="cursor-pointer"
                >
                  <Card className="relative p-6 group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] hover:border-red-500/20">

                    {/* Current grid badge */}
                    {isCurrent && (
                      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-400/70 font-medium">
                        2026 Grid
                      </span>
                    )}

                    {/* Nationality */}
                    <p className="text-sm text-white/40">
                      {driver.nationality ?? "Unknown"}
                    </p>

                    {/* Full name */}
                    <h3 className="text-lg font-semibold mt-1 group-hover:text-white transition-colors">
                      {fullName}
                    </h3>

                    {/* Driver code */}
                    {driver.code && (
                      <p className="text-xs text-white/30 mt-1 font-mono">
                        {driver.code}
                      </p>
                    )}

                  </Card>
                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}