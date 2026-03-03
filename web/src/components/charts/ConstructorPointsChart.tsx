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

export default function ConstructorPointsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={constructorPoints} margin={{ left: 10, right: 10 }}>
        <XAxis
          dataKey="team"
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
          interval={0}
          angle={0}
        />
        <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
        <Tooltip
          contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.1)" }}
          labelStyle={{ color: "rgba(255,255,255,0.7)" }}
        />
        <Bar dataKey="points" fill="#9ca3af" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}