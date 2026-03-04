import Card from "./Card";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
};

export default function StatCard({ title, value, subtitle, highlight }: Props) {
  return (
    <Card className="p-5">
      <p className="text-xs tracking-widest text-dim uppercase">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {highlight ? (
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
        ) : null}
      </div>
      {subtitle ? (
        <p className="mt-2 text-xs text-dim">{subtitle}</p>
      ) : null}
    </Card>
  );
}