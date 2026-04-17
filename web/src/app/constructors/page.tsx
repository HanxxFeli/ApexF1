"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

/**
 * Constructor type definition
 */
type Constructor = {
  constructor_id: number;
  name: string;
  nationality?: string;
  constructor_ref?: string;
};

// Temp mock constructor data used until backend integration
const mockConstructors: Constructor[] = [
  {
    constructor_id: 1,
    name: "Red Bull Racing",
    nationality: "Austrian",
    constructor_ref: "red_bull",
  },
  {
    constructor_id: 2,
    name: "Ferrari",
    nationality: "Italian",
    constructor_ref: "ferrari",
  },
  {
    constructor_id: 3,
    name: "Mercedes",
    nationality: "German",
    constructor_ref: "mercedes",
  },
  {
    constructor_id: 4,
    name: "McLaren",
    nationality: "British",
    constructor_ref: "mclaren",
  },
  {
    constructor_id: 5,
    name: "Aston Martin",
    nationality: "British",
    constructor_ref: "aston_martin",
  },
  {
    constructor_id: 6,
    name: "Alpine",
    nationality: "French",
    constructor_ref: "alpine",
  },
  {
    constructor_id: 7,
    name: "Williams",
    nationality: "British",
    constructor_ref: "williams",
  },
  {
    constructor_id: 8,
    name: "Audi",
    nationality: "German",
    constructor_ref: "audi",
  },
  {
    constructor_id: 9,
    name: "Visa Cash App RB",
    nationality: "Italian",
    constructor_ref: "rb",
  },
  {
    constructor_id: 10,
    name: "Haas F1 Team",
    nationality: "American",
    constructor_ref: "haas",
  },
  {
    constructor_id: 11,
    name: "Cadillac",
    nationality: "American",
    constructor_ref: "cadillac",
  },
];

/**
 * 2026 current constructor grid
 * used for frontend filtering
 */
const CURRENT_GRID = [
  "Red Bull Racing",
  "Ferrari",
  "Mercedes",
  "McLaren",
  "Aston Martin",
  "Alpine",
  "Williams",
  "Audi",
  "Visa Cash App RB",
  "Haas F1 Team",
  "Cadillac",
];

/**
 * Constructors Page
 *
 * - Displays a searchable and filterable list of Formula 1 constructors
 * - Uses mock data for now
 */
export default function ConstructorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "current" | "past">("all");

  /**
   * Filters constructors based on:
   * - Search input
   * - current/past team selection
   */
  const filteredConstructors = mockConstructors.filter((constructor) => {
    const matchesSearch = constructor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const isCurrent = CURRENT_GRID.includes(constructor.name);

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
      {/* Page Header */}
      <h1 className="text-3xl font-semibold">Constructors</h1>

      <p className="mt-2 text-sm text-white/50">
        Explore current and historical Formula 1 teams.
      </p>

      {/* Search + Filter Controls */}
      <div className="mt-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search constructors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-white/10 bg-[#1D1D27] px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "current" | "past")
          }
          className="rounded-md border border-white/10 bg-[#1D1D27] px-4 py-2 text-sm"
        >
          <option value="all">All Constructors</option>
          <option value="current">Current Grid</option>
          <option value="past">Past Teams</option>
        </select>
      </div>

      {/* Result Count */}
      <p className="mt-6 text-xs text-white/40">
        {filteredConstructors.length} constructors found
      </p>

      {/* Constructor Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredConstructors.map((constructor) => (
          <Card
            key={constructor.constructor_id}
            className="
              p-6
              transition-all duration-200
              hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
            hover:border-red-500/20
            "
          >
            <p className="text-[11px] uppercase tracking-widest text-white/35">
              Team
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {constructor.name}
            </h3>

            <p className="mt-2 text-sm text-white/50">
              {constructor.nationality ?? "Unknown"} Constructor
            </p>

            <div className="mt-4 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] text-red-300">
              {CURRENT_GRID.includes(constructor.name)
                ? "Current Grid"
                : "Past Team"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
