"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

// Full driver detail type — mirrors Supabase drivers table
type Driver = {
  driver_id: number;
  given_name: string;
  family_name: string;
  nationality?: string;
  code?: string;
  dob?: string;
};

/**
 * DriverDetailPage
 *
 * Fetches a single driver by ID from /api/drivers/[id] and
 * displays their details. Navigates back to /drivers on back button.
 */
export default function DriverDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the driver by ID from the API on mount
  useEffect(() => {
    if (!id) return;

    async function fetchDriver() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/drivers/${id}`);
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to fetch driver");
        }

        setDriver(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDriver();
  }, [id]);

  // Format ISO date string to readable format e.g. "1 January 1990"
  function formatDate(dateStr?: string) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="mx-auto max-w-300 px-12 py-16">

      {/* Back navigation */}
      <button
        onClick={() => router.push("/drivers")}
        className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        All Drivers
      </button>

      {/* Loading spinner — matches CalendarPage loading style */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="
            w-8 h-8 rounded-full mb-4
            border-2 border-red-500 border-t-transparent
            animate-spin
          " />
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Loading Driver...
          </p>
        </div>
      ) : error ? (

        /* Error state */
        <p className="text-sm text-red-400">{error}</p>

      ) : driver ? (
        <>
          {/* Page header */}
          <h1 className="text-3xl font-semibold">
            {driver.given_name}{" "}
            <span className="text-white/50">{driver.family_name}</span>
          </h1>

          <p className="text-sm text-white/50 mt-2">
            {driver.nationality ?? "Unknown nationality"}
            {driver.code && (
              <span className="ml-3 font-mono text-white/30">{driver.code}</span>
            )}
          </p>

          {/* Detail stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            {/* Nationality */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Nationality
              </p>
              <p className="text-lg font-semibold">
                {driver.nationality ?? "—"}
              </p>
            </Card>

            {/* Date of birth */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Date of Birth
              </p>
              <p className="text-lg font-semibold">{formatDate(driver.dob)}</p>
            </Card>

            {/* Driver code */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Driver Code
              </p>
              <p className="text-lg font-semibold font-mono">
                {driver.code ?? "—"}
              </p>
            </Card>

          </div>
        </>
      ) : null}

    </div>
  );
}