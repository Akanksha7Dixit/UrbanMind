import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function PopulationChart({ data = [] }) {
  const validData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item &&
          item.year !== undefined &&
          Number.isFinite(Number(item.population))
      )
    : [];

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

      {validData.length > 0 ? (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={validData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="population"
                stroke="#22d3ee"
                fill="#22d3ee22"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[320px] items-center justify-center">
          <div className="max-w-md rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center">
            <p className="font-medium text-slate-200">
              Population data unavailable
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Population growth will be displayed when a verified
              population dataset is connected to UrbanMind.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
