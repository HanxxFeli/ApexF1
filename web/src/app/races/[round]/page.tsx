import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/states/EmptyState";
import { racesMock } from "@/data/mock/races";
import { formatDate } from "@/lib/format";

export default async function RaceDetailPage({
  params,
}: {
  params: Promise<{ round: string }>;
}) {
  const { round } = await params;
  const roundNumber = Number(round);

  // Guard: invalid URL param
  if (!Number.isFinite(roundNumber)) {
    return (
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <header className="mt-8">
          <Link
            href="/races"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            ← Back to races
          </Link>
        </header>

        <section className="mt-6">
          <EmptyState
            title="Invalid race round"
            description="The URL round is not a number."
          />
        </section>
      </main>
    );
  }

  // Finds latest year for this round (works with mock data)
  const race = racesMock
    .filter((r) => Number((r as any).round) === roundNumber)
    .sort((a, b) => Number((b as any).year) - Number((a as any).year))[0];

  if (!race) {
    return (
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <header className="mt-8">
          <Link
            href="/races"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            ← Back to races
          </Link>
        </header>

        <section className="mt-6">
          <EmptyState
            title="Race not found"
            description="Try going back and selecting a race again."
          />
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <header className="mt-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/55">
            Race Details
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{race.name}</h1>
          <p className="mt-1 text-sm text-white/55">
            {race.year} • Round {race.round} • {race.country}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/races">
            <Button variant="secondary">← Back</Button>
          </Link>
          <Button variant="primary">Predict</Button>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <p className="text-sm font-semibold">Overview</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/55">Date</p>
              <p className="mt-1 text-sm font-medium">{formatDate(race.date)}</p>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/55">Circuit</p>
              <p className="mt-1 text-sm font-medium">{race.circuit}</p>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/55">Country</p>
              <p className="mt-1 text-sm font-medium">{race.country}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
            Replace these placeholders later with: qualifying table, results
            table, and predictions.
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">Prediction</p>
          <p className="mt-2 text-sm text-white/60">Win probability (mock).</p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Red Bull</span>
              <span className="font-semibold">69%</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400"
                style={{ width: "69%" }}
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <p className="text-sm font-semibold">Qualifying</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
            Coming soon
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">Results</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
            Coming soon
          </div>
        </Card>
      </section>
    </main>
  );
}