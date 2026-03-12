import Card from "./Card";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, subtitle, children }: Props) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">{title}</p>
        {subtitle ? <p className="text-xs text-dim mt-1">{subtitle}</p> : null}
      </div>
      <div className="h-[210px]">{children}</div>
    </Card>
  );
}