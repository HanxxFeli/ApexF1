// components/ui/ChartCard.tsx
import Card from "@/components/ui/Card";
import { ReactNode } from "react";

/**
 * ChartCard Component
 * 
 * Purpose: 
 * - Provides a standardized layout container for charts and data visualization
 * 
 * Features:
 * - Displays a chart title, and optional subtitle
 * - Accepts any chart component via children
 * - Subtle hover animation and glow effect
 * 
 * Props:
 * - title: main heading of chart
 * - subtitle: optional description
 * - children: chart or visualization content rendered inside
 */
type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card
      className="
        p-7
        rounded-[18px]
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
        hover:border-red-500/20
      "
    >
      {/* Chart Title */}
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-1 text-xs text-white/40">{subtitle}</p>
      )}

      {/* Chart Content */}
      <div className="mt-5">{children}</div>
    </Card>
  );
}