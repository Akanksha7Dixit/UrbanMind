import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const populationData = [
  { year: "2024", value: 1200 },
  { year: "2025", value: 1320 },
  { year: "2026", value: 1450 },
  { year: "2027", value: 1600 },
  { year: "2028", value: 1780 },
  { year: "2029", value: 1920 },
  { year: "2030", value: 2100 },
];

const infrastructureData = [
  { sector: "Healthcare", value: 67 },
  { sector: "Education", value: 82 },
  { sector: "Transport", value: 74 },
  { sector: "Utilities", value: 89 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Analytics Center
        </h1>

        <p className="mt-2 text-slate-400">
          City intelligence, forecasting and performance analytics.
        </p>
      </div>

      {/* KPI SECTION */}

      <section>
        <div className="grid gap-6 lg:grid-cols-4">

          <div className="analytics-card">
            <p className="text-slate-400">
              Population
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              1.8M
            </h2>

            <p className="mt-2 text-emerald-400">
              +18%
            </p>
          </div>

          <div className="analytics-card">
            <p className="text-slate-400">
              Traffic Index
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              82
            </h2>

            <p className="mt-2 text-cyan-400">
              Stable
            </p>
          </div>

          <div className="analytics-card">
            <p className="text-slate-400">
              AQI
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              67
            </h2>

            <p className="mt-2 text-emerald-400">
              Improved
            </p>
          </div>

          <div className="analytics-card">
            <p className="text-slate-400">
              Budget Usage
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              74%
            </h2>

            <p className="mt-2 text-amber-400">
              Active
            </p>
          </div>

        </div>
      </section>

      {/* POPULATION TREND */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          p-6
        "
      >
        <h2 className="text-2xl font-semibold">
          Population Growth Forecast
        </h2>

        <div className="mt-8 h-[450px]">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                fill="#0891b2"
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>
      </section>

      {/* TRAFFIC + INFRASTRUCTURE */}

      <section>
        <div className="grid gap-6 lg:grid-cols-2">

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >
            <h2 className="text-2xl font-semibold">
              Traffic Analysis
            </h2>

            <div className="mt-8 h-[350px]">

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="#15803d"
                  />
                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >
            <h2 className="text-2xl font-semibold">
              Infrastructure Coverage
            </h2>

            <div className="mt-8 h-[350px]">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={infrastructureData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="sector" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#06b6d4"
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>

        </div>
      </section>

      {/* AI FORECAST */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          AI Forecast
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div
            className="
              rounded-3xl
              border border-cyan-500/20
              bg-cyan-500/5
              p-6
            "
          >
            <p className="text-cyan-400">
              Population 2030
            </p>

            <h3 className="mt-3 text-5xl font-bold">
              2.1M
            </h3>

            <p className="mt-4 text-slate-400">
              Expected growth based on
              current urban expansion.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/10
              p-6
            "
          >
            <p className="text-slate-400">
              Healthcare Demand
            </p>

            <h3 className="mt-3 text-5xl font-bold">
              +31%
            </h3>

            <p className="mt-4 text-slate-400">
              Demand increase forecast.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/10
              p-6
            "
          >
            <p className="text-slate-400">
              Traffic Growth
            </p>

            <h3 className="mt-3 text-5xl font-bold">
              +22%
            </h3>

            <p className="mt-4 text-slate-400">
              Peak corridor utilization.
            </p>
          </div>

        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-cyan-950/20
          via-slate-950
          to-indigo-950/20
          p-8
        "
      >
        <p className="text-cyan-400">
          Executive Insight
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Healthcare Infrastructure Expansion Recommended
        </h2>

        <p className="mt-6 max-w-4xl text-slate-400">
          Current population projections indicate growing
          demand in high-density districts. AI forecasting
          suggests expanding healthcare coverage before
          2028 to avoid service bottlenecks.
        </p>
      </section>

    </div>
  );
}