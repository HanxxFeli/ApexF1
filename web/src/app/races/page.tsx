"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/states/EmptyState";
import { racesMock } from "@/data/mock/races";
import { formatDate } from "@/lib/format";
import * as React from "react";

export default function RacesPage() {
  const seasons = React.useMemo(() => {
    const set = new Set(racesMock.map((r) => r.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  const [season, setSeason] = React.useState(seasons[0] ?? 2025);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const pageSize = 6;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return racesMock
      .filter((r) => r.year === season)
      .filter((r) => {
        if (!q) return true;
        return (
          r.name.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.circuit.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.round - b.round);
  }, [season, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [season, query]);

  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <header className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Races</h1>
          <p className="mt-1 text-dim text-sm">
            Browse the season calendar and open race details.
          </p>
        </div>

        <FilterBar
          season={season}
          seasons={seasons}
          onSeasonChange={setSeason}
          query={query}
          onQueryChange={setQuery}
        />
      </header>

      <section className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <Card className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-surface flex items-center justify-between">
              <p className="text-sm font-semibold">{season} Season Calendar</p>
              <div className="w-[220px]">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[720px]">
                <thead className="text-dim">
                  <tr className="border-b border-surface">
                    <th className="px-5 py-3 font-medium">Round</th>
                    <th className="px-5 py-3 font-medium">Race</th>
                    <th className="px-5 py-3 font-medium">Circuit</th>
                    <th className="px-5 py-3 font-medium">Country</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pageRows.map((r) => (
                    <tr
                      key={`${r.year}-${r.round}`}
                      className="border-b border-surface hover:bg-surface transition"
                    >
                      <td className="px-5 py-4 text-muted">{r.round}</td>
                      <td className="px-5 py-4 font-medium">{r.name}</td>
                      <td className="px-5 py-4 text-muted">{r.circuit}</td>
                      <td className="px-5 py-4 text-muted">{r.country}</td>
                      <td className="px-5 py-4 text-muted">{formatDate(r.date)}</td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/races/${r.round}`}
                          className="text-red-500 hover:text-red-400 transition font-medium"
                        >
                          View details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}