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

export default function DriverFormChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={driverForm} margin={{ left: 10, right: 10 }}>
        <XAxis dataKey="race" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
        <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
        <Tooltip
          contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.1)" }}
          labelStyle={{ color: "rgba(255,255,255,0.7)" }}
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