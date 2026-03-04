"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { driverForm } from "@/data/mock/dashboard";
import { useThemeColors } from "@/lib/useThemeColors";

export default function DriverFormChart() {
  const { text, surface } = useThemeColors();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={driverForm} margin={{ left: 10, right: 10 }}>
        <XAxis
          dataKey="race"
          tick={{ fill: text, opacity: 0.55, fontSize: 12 }}
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

        <Line
          type="monotone"
          dataKey="avgFinish"
          strokeWidth={2}
          stroke="#ef4444"
          dot={{ r: 3, stroke: "#ef4444", fill: "#ef4444" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}