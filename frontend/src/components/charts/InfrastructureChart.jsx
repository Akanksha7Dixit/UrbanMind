import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    sector: "North",
    score: 91,
  },
  {
    sector: "East",
    score: 84,
  },
  {
    sector: "South",
    score: 77,
  },
  {
    sector: "West",
    score: 89,
  },
];

export default function InfrastructureChart() {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.02]
        p-6
      "
    >
      <h3 className="mb-6 text-lg font-medium">
        Infrastructure Health
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}