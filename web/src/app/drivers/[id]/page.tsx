"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

// Full driver detail type — mirrors API response
type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality?: string;
  code?: string;
  dateOfBirth?: string;
  permanentNumber?: string;
  url?: string;
};

/**
 * DriverDetailPage
 *
 * Fetches a single driver by ID from /api/drivers/[id] and
 * displays their details. Navigates back to /drivers on back button.
 */
export default function DriverDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the driver by ID from the API on mount
  useEffect(() => {
    if (!id) return;

    async function fetchDriver() {
      setIsLoading(true);
      setError(null);

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

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-8 h-8 rounded-full mb-4 border-2 border-red-500 border-t-transparent animate-spin" />
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
            {driver.givenName}{" "}
            <span className="text-white/50">{driver.familyName}</span>
          </h1>

          <p className="text-sm text-white/50 mt-2">
            {driver.nationality ?? "Unknown nationality"}
            {driver.code && (
              <span className="ml-3 font-mono text-white/30">{driver.code}</span>
            )}
          </p>

          {/* Wikipedia link */}
          {driver.url && (
            <a
              href={driver.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              View on Wikipedia →
            </a>
          )}

          {/* Detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            {/* Permanent number */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Number
              </p>
              <p className="text-3xl font-bold text-red-500">
                #{driver.permanentNumber ?? "—"}
              </p>
            </Card>

            {/* Given name */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Given Name
              </p>
              <p className="text-lg font-semibold">
                {driver.givenName ?? "—"}
              </p>
            </Card>

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
              <p className="text-lg font-semibold">
                {formatDate(driver.dateOfBirth)}
              </p>
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

            {/* Driver ID */}
            <Card className="p-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Driver ID
              </p>
              <p className="text-lg font-semibold font-mono">
                {driver.driverId}
              </p>
            </Card>

          </div>
        </>
      ) : null}

    </div>
  );
}