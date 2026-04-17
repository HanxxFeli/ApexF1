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

// Generic fetch helper
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Get all drivers
export async function getDrivers(
  season: string = "current"
): Promise<Driver[]> {
  const data = await fetchFromAPI<
    ApiResponse<{ DriverTable: { Drivers: Driver[] } }>
  >(`/${season}/drivers.json`);

  return data?.MRData?.DriverTable?.Drivers ?? [];
}

// Get one driver
export async function getDriver(driverId: string): Promise<Driver | null> {
  const data = await fetchFromAPI<
    ApiResponse<{ DriverTable: { Drivers: Driver[] } }>
  >(`/drivers/${driverId}.json`);

  const drivers = data?.MRData?.DriverTable?.Drivers ?? [];
  return drivers[0] ?? null;
}