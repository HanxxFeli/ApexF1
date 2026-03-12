import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PredictionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <header className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight">Predictions</h1>
        <p className="mt-1 text-dim text-sm">
          Placeholder UI until the ML service is connected.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <p className="text-sm font-semibold">Race Prediction</p>
          <p className="mt-2 text-sm text-dim">
            Select a race and generate top-10 predictions (mock for now).
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select className="h-10 rounded-xl bg-surface border border-surface px-3 text-sm outline-none focus:ring-2 focus:ring-red-500/40">
              <option className="bg-[#0b0b10]">Bahrain GP (2025)</option>
              <option className="bg-[#0b0b10]">Saudi Arabian GP (2025)</option>
            </select>

            <Button variant="primary">Generate</Button>
          </div>

          <div className="mt-5 rounded-xl border border-surface bg-surface p-4 text-sm text-dim">
            Prediction results table goes here.
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">Model Status</p>
          <p className="mt-2 text-sm text-dim">
            Waiting for ML integration.
          </p>
          <div className="mt-4 rounded-xl border border-surface bg-surface p-4 text-sm text-dim">
            RandomForest (Coming soon)
          </div>
        </Card>
      </section>
    </main>
  );
}