"use client";

type Props = {
  season: number;
  seasons: number[];
  onSeasonChange: (year: number) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

export default function FilterBar({
  season,
  seasons,
  onSeasonChange,
  query,
  onQueryChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <select
        value={season}
        onChange={(e) => onSeasonChange(Number(e.target.value))}
        className="h-10 rounded-xl bg-surface border border-surface px-3 text-sm outline-none focus:ring-2 focus:ring-red-500/40"
      >
        {seasons.map((y) => (
          <option key={y} value={y} className="bg-[#0b0b10]">
            {y}
          </option>
        ))}
      </select>

      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search races..."
        className="h-10 w-full sm:w-72 rounded-xl bg-surface border border-surface px-3 text-sm outline-none focus:ring-2 focus:ring-red-500/40"
      />
    </div>
  );
}