import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import PopulationChart from "../../components/charts/PopulationChart";
import InfrastructureChart from "../../components/charts/InfrastructureChart";

const populationData = [
  { year: "2025", value: 105 },
  { year: "2026", value: 112 },
  { year: "2027", value: 118 },
  { year: "2028", value: 126 },
  { year: "2029", value: 134 },
];

const mobilityData = [
  { name: "Metro", value: 84 },
  { name: "Roads", value: 72 },
  { name: "Bus", value: 65 },
  { name: "Rail", value: 91 },
];

const infraData = [
  { name: "Hospitals", value: 91 },
  { name: "Roads", value: 86 },
  { name: "Utilities", value: 94 },
  { name: "Schools", value: 88 },
];

const COLORS = [
  "#06b6d4",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}

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
          Executive Overview
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            City Performance Analytics
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">
          Analyze urban growth, infrastructure
          performance and operational efficiency
          across the city.
        </p>
      </section>

      {/* KPI CARDS */}

      <div
  className="
    grid
    gap-6
    xl:grid-cols-2
  "
>
  <PopulationChart />

  <InfrastructureChart />
</div>

      {/* KPI ROWS*/}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-3xl border border-white/10 p-6">
    <p className="text-sm text-slate-500">
      Population
    </p>

    <h3 className="mt-2 text-3xl font-semibold">
      1.2M
    </h3>
  </div>

  <div className="rounded-3xl border border-white/10 p-6">
    <p className="text-sm text-slate-500">
      Coverage
    </p>

    <h3 className="mt-2 text-3xl font-semibold">
      91%
    </h3>
  </div>

  <div className="rounded-3xl border border-white/10 p-6">
    <p className="text-sm text-slate-500">
      Hospitals
    </p>

    <h3 className="mt-2 text-3xl font-semibold">
      12
    </h3>
  </div>

  <div className="rounded-3xl border border-white/10 p-6">
    <p className="text-sm text-slate-500">
      Transit Score
    </p>

    <h3 className="mt-2 text-3xl font-semibold">
      88
    </h3>
  </div>

</div>



      
      {/* CHARTS */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* MOBILITY */}

        <section
          className="
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            p-6
          "
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Mobility Analysis
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mobilityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#06b6d4"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* INFRA */}

      </div>

      {/* AI INSIGHTS */}

      <section>
        <h2 className="mb-6 text-3xl font-semibold">
          AI Insights
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
              Growth Opportunity
            </p>

            <h3 className="mt-4 text-xl font-semibold">
              Sector 12 Expansion
            </h3>

            <p className="mt-3 text-slate-400">
              Population density expected
              to increase significantly.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              border border-amber-500/20
              bg-amber-500/5
              p-6
            "
          >
            <p className="text-amber-400">
              Infrastructure Alert
            </p>

            <h3 className="mt-4 text-xl font-semibold">
              Road Network Capacity
            </h3>

            <p className="mt-3 text-slate-400">
              Major corridors approaching
              utilization limits.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              border border-emerald-500/20
              bg-emerald-500/5
              p-6
            "
          >
            <p className="text-emerald-400">
              Recommendation
            </p>

            <h3 className="mt-4 text-xl font-semibold">
              Expand Healthcare
            </h3>

            <p className="mt-3 text-slate-400">
              Additional hospital capacity
              recommended for Sector 12.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}