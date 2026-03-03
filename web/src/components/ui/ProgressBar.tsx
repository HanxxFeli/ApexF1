import Card from "./Card";

type Props = {
  title: string;
  label: string;
  value: number; // 0-100
};

export default function ProgressBar({ title, label, value }: Props) {
  const v = Math.max(0, Math.min(100, value));

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-white/50">{label}: {v}%</p>
        </div>
        <p className="text-2xl font-semibold">{v}%</p>
      </div>

      <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400"
          style={{ width: `${v}%` }}
        />
      </div>
    </Card>
  );
}