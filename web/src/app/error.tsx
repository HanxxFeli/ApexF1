"use client";

import ErrorState from "@/components/states/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <ErrorState
        title="App crashed"
        description={error.message || "Unknown error"}
        onRetry={reset}
      />
    </main>
  );
}