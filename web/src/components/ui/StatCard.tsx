import Card from "@/components/ui/Card";

/**
 * StatCard Component
 * 
 * Purpose:
 * - Displays key dashboard metrics 
 * 
 * Features:
 * - Reusable card layout 
 * - Supports two display variants
 * - Subtle hover animation and glow effect
 * 
 * Props:
 * - label: metric title 
 * - value: main stat or text value
 * - helper: optional description
 * - variant: styling of value
 */
type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  variant?: "number" | "text"; // number = 1149, text = Lando Norris
};

export default function StatCard({
  label,
  value,
  helper,
  variant = "number",
}: StatCardProps) {
  const isText = variant === "text";

  return (
    <Card
      className="
        h-27 px-7
        flex flex-col items-center justify-center
        rounded-[18px]
        text-center
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
        hover:border-red-500/20
      "
    >
      {/* Metric Label */}
      <p className="text-[11px] text-white/35">{label}</p>

      {/* Main Label */}
      <div
        className={
          isText
            ? "mt-2 text-[18px] font-semibold text-white leading-tight"
            : "mt-2 text-[22px] font-semibold text-white leading-none"
        }
      >
        {value}
      </div>

      {/* Optional Description */}
      {helper && (
        <p className="mt-2 text-[11px] text-white/30">{helper}</p>
      )}
    </Card>
  );
}