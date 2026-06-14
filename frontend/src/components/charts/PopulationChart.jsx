import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { year: "2020", population: 900 },
  { year: "2021", population: 980 },
  { year: "2022", population: 1050 },
  { year: "2023", population: 1120 },
  { year: "2024", population: 1180 },
  { year: "2025", population: 1250 },
];

export default function PopulationChart() {
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
        Population Growth
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />

            <Tooltip />

            <Area
              dataKey="population"
              stroke="#22d3ee"
              fill="#22d3ee22"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}