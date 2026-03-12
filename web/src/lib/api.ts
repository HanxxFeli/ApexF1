export type Driver = {
  driver_id: number;
  forename?: string;
  surname?: string;
  nationality?:string;
  code?: string;
  number?: number | null;
};

export async function getDrivers() {
  const res = await fetch("/api/drivers", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch drivers");
  }

  const json = await res.json();

  return json.data as Driver[];
}