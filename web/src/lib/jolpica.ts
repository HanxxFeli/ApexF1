const BASE_URL = "https://api.jolpi.ca/ergast/f1";

// Type Definitions

export interface ApiResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & T;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  FirstPractice?: { date: string; time: string };
  SecondPractice?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
}

export interface Driver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: { millis: string; time: string };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: { time: string };
    AverageSpeed: { units: string; speed: string };
  };
}

export interface StandingEntry {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver?: Driver;
  Constructor?: Constructor;
  Constructors?: Constructor[];
}

// API Functions
async function fetchFromAPI<T>(
  endpoint: string,
  noCache = false,
): Promise<T | null> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: noCache ? undefined : { revalidate: 300 },
      cache: noCache ? "no-store" : undefined,
    });

    if (!response.ok) {
      console.error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
}

// Race Schedule
export async function getRaceSchedule(
  season: string = "current",
): Promise<Race[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ RaceTable: { Races: Race[] } }>
  >(`/${season}.json`);
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function getRaceByRound(
  season: string,
  round: string,
): Promise<Race | null> {
  const data = await fetchFromAPI<
    ApiResponse<{ RaceTable: { Races: Race[] } }>
  >(`/${season}/${round}.json`);
  const races = data?.MRData?.RaceTable?.Races ?? [];
  return races[0] ?? null;
}

// Race Results
export async function getRaceResults(
  season: string,
  round: string,
): Promise<RaceResult[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ RaceTable: { Races: Array<{ Results: RaceResult[] }> } }>
  >(`/${season}/${round}/results.json`);
  const races = data?.MRData?.RaceTable?.Races ?? [];
  return races[0]?.Results ?? [];
}

// Standings
export async function getDriverStandings(
  season: string = "current",
): Promise<StandingEntry[]> {
  const data = await fetchFromAPI<
    ApiResponse<{
      StandingsTable: {
        StandingsLists: Array<{ DriverStandings: StandingEntry[] }>;
      };
    }>
  >(`/${season}/driverStandings.json`);
  const standings = data?.MRData?.StandingsTable?.StandingsLists ?? [];
  return standings[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(
  season: string = "current",
): Promise<StandingEntry[]> {
  const data = await fetchFromAPI<
    ApiResponse<{
      StandingsTable: {
        StandingsLists: Array<{ ConstructorStandings: StandingEntry[] }>;
      };
    }>
  >(`/${season}/constructorStandings.json`);
  const standings = data?.MRData?.StandingsTable?.StandingsLists ?? [];
  return standings[0]?.ConstructorStandings ?? [];
}

// Drivers
export async function getAllDrivers(
  season: string = "current",
): Promise<Driver[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ DriverTable: { Drivers: Driver[] } }>
  >(`/${season}/drivers.json`);
  return data?.MRData?.DriverTable?.Drivers ?? [];
}

export async function getDriverInfo(driverId: string): Promise<Driver | null> {
  const data = await fetchFromAPI<
    ApiResponse<{ DriverTable: { Drivers: Driver[] } }>
  >(`/drivers/${driverId}.json`);
  const drivers = data?.MRData?.DriverTable?.Drivers ?? [];
  return drivers[0] ?? null;
}

// Constructors
export async function getAllConstructors(
  season: string = "current",
): Promise<Constructor[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ ConstructorTable: { Constructors: Constructor[] } }>
  >(`/${season}/constructors.json`);
  return data?.MRData?.ConstructorTable?.Constructors ?? [];
}

export async function getConstructorInfo(
  constructorId: string,
): Promise<Constructor | null> {
  const data = await fetchFromAPI<
    ApiResponse<{ ConstructorTable: { Constructors: Constructor[] } }>
  >(`/constructors/${constructorId}.json`);
  const constructors = data?.MRData?.ConstructorTable?.Constructors ?? [];
  return constructors[0] ?? null;
}

// Qualifying
export async function getQualifyingResults(
  season: string,
  round: string,
): Promise<any[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ RaceTable: { Races: Array<{ QualifyingResults: any[] }> } }>
  >(`/${season}/${round}/qualifying.json`);
  const races = data?.MRData?.RaceTable?.Races ?? [];
  return races[0]?.QualifyingResults ?? [];
}

// Circuits
export async function getAllCircuits(
  season: string = "current",
): Promise<Circuit[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ CircuitTable: { Circuits: Circuit[] } }>
  >(`/${season}/circuits.json`);
  return data?.MRData?.CircuitTable?.Circuits ?? [];
}
