"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { constructorPoints } from "@/data/mock/dashboard";
import { useThemeColors } from "@/lib/useThemeColors";

export default function ConstructorPointsChart() {
  const { text, surface } = useThemeColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={constructorPoints} margin={{ left: 10, right: 10 }}>
        <XAxis
          dataKey="team"
          tick={{ fill: text, opacity: 0.55, fontSize: 10 }}
          interval={0}
        />

        <YAxis
          tick={{ fill: text, opacity: 0.55, fontSize: 12 }}
        />

        <Tooltip
          contentStyle={{
            background: surface,
            border: `1px solid ${text}22`,
            borderRadius: 10,
          }}
          labelStyle={{ color: text }}
          itemStyle={{ color: text }}
        />

        <Bar
          dataKey="points"
          fill="#9ca3af"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}