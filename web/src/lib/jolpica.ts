const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export interface ApiResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    [key: string]: any;
  } & T;
}
async function fetchFromAPI<T>(endpoint: string, noCache = false): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: noCache ? undefined : { revalidate: 300 },
      cache: noCache ? "no-store" : undefined,
    });

    if (!response.ok) {
      return null as T;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null as T;
  }
}

export async function getRaceSchedule(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}.json`);
  return data?.MRData?.RaceTable?.Races ?? [];
}