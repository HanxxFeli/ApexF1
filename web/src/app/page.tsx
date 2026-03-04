import Link from "next/link";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import ProgressBar from "@/components/ui/ProgressBar";
import DriverFormChart from "@/components/charts/DriverFormChart";
import ConstructorPointsChart from "@/components/charts/ConstructorPointsChart";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      {/* Hero */}
      <section className="relative mt-6 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_15%,rgba(239,68,68,0.16),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              ApexF1 Analytics Platform
            </h1>
            <p className="mt-3 text-primary text-sm md:text-base max-w-md">
              Transforming Formula 1 race data into predictive insights.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/drivers">
                <Button variant="primary">Explore Drivers</Button>
              </Link>
              <Link href="/predictions">
                <Button variant="secondary">View Predictions</Button>
              </Link>
            </div>
          </div>

          {/* Right side visual placeholder (swap to Image later) */}
          <div className="hidden md:block">
            <div className="h-full w-full rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.02]" />
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Races" value={1149} subtitle="Since 1950" />
        <StatCard title="Active Drivers" value={22} subtitle="Upcoming 2026 season" />
        <StatCard title="Constructors" value={11} subtitle="Current Grid" />
        <StatCard title="2025 Leader" value="Lando Norris" subtitle="McLaren" />
      </section>

      {/* Charts */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard
          title="Driver Form (Last 10 Races)"
          subtitle="Rolling average finish position."
        >
          <DriverFormChart />
        </ChartCard>

        <ChartCard title="Constructor Points Comparison">
          <ConstructorPointsChart />
        </ChartCard>
      </section>

      {/* ML prediction insight */}
      <section className="mt-6">
        <ProgressBar
          title="Bahrain Grand Prix"
          label="Red Bull Win Probability"
          value={69}
        />
      </section>
    </main>
  );
}