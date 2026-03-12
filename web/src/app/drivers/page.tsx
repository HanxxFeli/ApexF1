"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

/**
 * Driver type definition
 * Mirrors structure that is expected from backend API
 */
type Driver = {
  driver_id: number;
  forename: string;
  surname: string;
  nationality?: string;
  code?: string;
};

/**
 * Temp mock driver data 
 * Will be replaced once backend API endpoints are merged
 */
const mockDrivers: Driver[] = [
  { driver_id: 1, forename: "Max", surname: "Verstappen", nationality: "Dutch", code: "VER" },
  { driver_id: 2, forename: "Lewis", surname: "Hamilton", nationality: "British", code: "HAM" },
  { driver_id: 3, forename: "Charles", surname: "Leclerc", nationality: "Monégasque", code: "LEC" },
  { driver_id: 4, forename: "Lando", surname: "Norris", nationality: "British", code: "NOR" },
  { driver_id: 5, forename: "George", surname: "Russell", nationality: "British", code: "RUS" },
  { driver_id: 6, forename: "Carlos", surname: "Sainz", nationality: "Spanish", code: "SAI" },
  { driver_id: 7, forename: "Fernando", surname: "Alonso", nationality: "Spanish", code: "ALO" },
  { driver_id: 8, forename: "Oscar", surname: "Piastri", nationality: "Australian", code: "PIA" },
  { driver_id: 9, forename: "Sergio", surname: "Perez", nationality: "Mexican", code: "PER" },
  { driver_id: 10, forename: "Pierre", surname: "Gasly", nationality: "French", code: "GAS" },
];

/*
2026 Current F1 Grid
Used for the simple frontend filter.
*/
const CURRENT_GRID = [
  "Alexander Albon",
  "Fernando Alonso",
  "Kimi Antonelli",
  "Oliver Bearman",
  "Gabriel Bortoleto",
  "Valtteri Bottas",
  "Franco Colapinto",
  "Pierre Gasly",
  "Isack Hadjar",
  "Lewis Hamilton",
  "Nico Hülkenberg",
  "Liam Lawson",
  "Charles Leclerc",
  "Arvid Lindblad",
  "Lando Norris",
  "Esteban Ocon",
  "Sergio Pérez",
  "Oscar Piastri",
  "George Russell",
  "Carlos Sainz",
  "Lance Stroll",
  "Max Verstappen",
];

/**
 * DriversPage
 * 
 * Displays a searchable and filterable list of Formula 1 Drivers
 * Page supports:
 * - Search by driver name
 * - Filtering by current grid or past drivers
 * 
 * Is currently using mock data
 */
export default function DriversPage() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "current" | "past">("all");

  // filters based on search input and selected filter
  const filteredDrivers = mockDrivers.filter((driver) => {

    const fullName = `${driver.forename} ${driver.surname}`;
    const matchesSearch =
      fullName.toLowerCase().includes(search.toLowerCase());

    const isCurrent = CURRENT_GRID.includes(fullName);

    if (filter === "current") {
      return matchesSearch && isCurrent;
    }

    if (filter === "past") {
      return matchesSearch && !isCurrent;
    }

    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-300 px-12 py-16">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold">Drivers</h1>

      <p className="text-sm text-white/50 mt-2">
        Explore current and historical Formula 1 drivers.
      </p>

      {/* Search + Filter */}
      <div className="mt-8 flex gap-4 flex-wrap">

        {/* Driver search input */}
        <input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1D1D27] border border-white/10 text-sm focus:outline-none focus:border-red-500"
        />

        {/* Driver filter dropdown */}
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "current" | "past")
          }
          className="px-4 py-2 rounded-md bg-[#1D1D27] border border-white/10 text-sm"
        >
          <option value="all">All Drivers</option>
          <option value="current">Current Grid</option>
          <option value="past">Past Drivers</option>
        </select>

      </div>

      {/* Result Count */}
      <p className="text-xs text-white/40 mt-6">
        {filteredDrivers.length} drivers found
      </p>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {filteredDrivers.map((driver) => {

          const fullName = `${driver.forename} ${driver.surname}`;

          return (
            <Card
              key={driver.driver_id}
              className="
                p-6
                transition-all duration-200
                hover:-translate-y-1
                hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
                hover:border-red-500/20
              "
            >

              <p className="text-sm text-white/40">
                {driver.nationality ?? "Unknown"}
              </p>

              <h3 className="text-lg font-semibold mt-1">
                {fullName}
              </h3>

              {driver.code && (
                <p className="text-xs text-white/40 mt-1">
                  Code: {driver.code}
                </p>
              )}

            </Card>
          );
        })}

      </div>

    </div>
  );
}