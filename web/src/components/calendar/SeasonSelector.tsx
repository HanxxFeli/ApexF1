import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeasonSelectorProps {
  season: string;
  onSeasonChange: (season: string) => void;
}

// Dropdown for switching between F1 championship years, from 1950 to the current year
export default function SeasonSelector({ season, onSeasonChange }: SeasonSelectorProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="flex items-center gap-4 mt-8 mb-6 flex-wrap">

      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest">Season</p>
        <p className="text-xs text-white/25 mt-0.5">Select a championship year</p>
      </div>

      <div className="ml-auto min-w-[200px]">
        <Select value={season} onValueChange={onSeasonChange}>
          <SelectTrigger className="h-10 bg-[#1D1D27] border-white/10 text-sm text-white focus:ring-0 focus:ring-offset-0 rounded-md">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent className="bg-[#1D1D27] border-white/10 max-h-[360px]">
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="text-white text-sm focus:bg-white/10 focus:text-white"
              >
                {year} Season
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  );
}