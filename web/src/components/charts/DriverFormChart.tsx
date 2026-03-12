"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/**
 * Mock driver form data
 */
const data = [
  { race: "AUS", position: 2 },
  { race: "JPN", position: 3 },
  { race: "CHN", position: 1 },
  { race: "BHR", position: 4 },
  { race: "SAU", position: 2 },
  { race: "MIA", position: 1 },
];

export default function DriverFormChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        {/* Subtle Grid */}
        <CartesianGrid stroke="#2a2a36" strokeDasharray="3 3" />

        {/* X Axis */}
        <XAxis
          dataKey="race"
          stroke="#888"
          tick={{ fill: "#888", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y Axis */}
        <YAxis
          stroke="#888"
          tick={{ fill: "#888", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            background: "#1D1D27",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            color: "white",
          }}
          cursor={{ stroke: "#ef4444", strokeWidth: 1 }}
        />

        {/* F1 red line */}
        <Line
          type="monotone"
          dataKey="position"
          stroke="#ef4444"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#ef4444" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}