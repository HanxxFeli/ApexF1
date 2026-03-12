import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { righteous } from "@/app/font";
import DriverFormChart from "@/components/charts/DriverFormChart";

/**
 * Home/Dashboard Page
 * 
 * Purposes:
 * - Introduces ApexF1 with a full-width hero section
 * - Displays stats, chart (placeholders for now) and an ML insight card (all has mock data for now) 
*/
export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO: Full-width header with background car image and layered fades */}
      <section className="relative w-full py-16">

        {/* Background car layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Base background */}
          <div className="absolute inset-0 bg-[#15151E]" />

          {/* Car image with masked edges for a smooth blend into the background */}
          <img
            src="/f1car.png"
            alt="F1 car"
            className="
              absolute right-[-25px] top-1/2 -translate-y-1/2
              h-[320px] w-auto opacity-95
              blur-[0.2px] saturate-[1.8]
              [mask-image:radial-gradient(ellipse_at_70%_50%,black_55%,transparent_72%)]
              [-webkit-mask-image:radial-gradient(ellipse_at_70%_50%,black_55%,transparent_72%)]
            "
          />
          
          {/* Dark-to-transparent fade (keeps title side dark but still readable) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#15151E] via-[#15151E]/90 to-transparent" />

          {/* Right-side glow to */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(255,255,255,0.06),transparent_60%)]" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-linear-to-b from-[#15151E]/30 via-transparent to-[#15151E]/70" />
        </div>

        {/* Hero content (constrained to dashboard width) */}
        <div className="relative z-10 mx-auto max-w-300 px-12">

          {/* Brand Headline */}
          <h1 className={`${righteous.className} text-4xl font-medium tracking-tight leading-[1.05]`}
          >
            ApexF1 Analytics Platform
          </h1>

          <p className="mt-6 max-w-xl text-white/55"
          >
            Transforming Formula 1 race data into predictive insights.
          </p>

          {/* Buttons to route to other dashboard areas */}
          <div className="mt-8 flex gap-6">
            <Button href="/drivers" variant="primary">
              Explore Drivers
            </Button>
            <Button href="/predictions" variant="secondary">
              View Predictions
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-300 px-12 pb-20 space-y-10">

        {/* Stat Cards (mock data for now) */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-7">
          <StatCard label="Total Races" value="1149" helper="Since 1950" />
          <StatCard label="Active Drivers" value="22" helper="Upcoming 2026 season" />
          <StatCard label="Constructors" value="11" helper="Current Grid" />
          
          {/* Text variant to prevent long names from looking too big */}
          <StatCard
            label="2025 Leader"
            value="Lando Norris"
            helper="McLaren"
            variant="text"
          />
        </section>

        {/* Charts placeholder */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          <ChartCard
            title="Driver Form (Last 10 Races)"
            subtitle="Rolling average finish position."
          >
            <DriverFormChart/>
          </ChartCard>

          <ChartCard
            title="Constructor Points Comparison"
            subtitle="Current season points by team."
          >
            {/* Placeholder chart area */}
            <DriverFormChart/>
          </ChartCard>
        </section>

        {/* ML Insight + Probability */}
        <Card
          className="
            p-8 transition-all duration-300 ease-out
            hover:-translate-y-[2px]
          hover:border-red-500/30
            hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]
          "
        >
          <div className="flex items-center gap-10">

            {/* Left side: Model insight text */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white/90">
                ML Prediction Insight
              </h3>

              <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-lg"
              >
                Based on historical performance and track-specific metrics, the model predicts
                Red Bull having a 69% probability of winning the upcoming race.
              </p>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-white/10"></div>

            {/* Right side: Probability + Progress bar */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white/90"
                >
                  Bahrain Grand Prix
                </h3>
                <span className="text-2xl font-semibold text-white">69%</span>
              </div>

              <div className="mt-4">
                <ProgressBar value={69} />
              </div>

              <p className="mt-3 text-xs text-white/45"
              >
                Red Bull Win Probability: 69%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}