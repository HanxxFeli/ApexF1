export type Race = {
  year: number;
  round: number;
  name: string;
  date: string; 
  country: string;
  circuit: string;
};

export const racesMock: Race[] = [
  { year: 2025, round: 1, name: "Bahrain Grand Prix", date: "2025-03-02", country: "Bahrain", circuit: "Bahrain International Circuit" },
  { year: 2025, round: 2, name: "Saudi Arabian Grand Prix", date: "2025-03-09", country: "Saudi Arabia", circuit: "Jeddah Corniche Circuit" },
  { year: 2025, round: 3, name: "Australian Grand Prix", date: "2025-03-23", country: "Australia", circuit: "Albert Park Circuit" },
  { year: 2025, round: 4, name: "Japanese Grand Prix", date: "2025-04-06", country: "Japan", circuit: "Suzuka Circuit" },
  { year: 2024, round: 1, name: "Bahrain Grand Prix", date: "2024-03-02", country: "Bahrain", circuit: "Bahrain International Circuit" },
  { year: 2024, round: 2, name: "Saudi Arabian Grand Prix", date: "2024-03-09", country: "Saudi Arabia", circuit: "Jeddah Corniche Circuit" },
];