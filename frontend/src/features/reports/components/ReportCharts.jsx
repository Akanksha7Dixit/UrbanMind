import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function ReportCharts({
  report,
}) {

  const analytics =
    report.analytics || {};

  const infrastructureData = [

    {
      name: "Operational",
      value:
        analytics.operationalInfrastructure || 0,
    },

    {
      name: "Maintenance",
      value:
        analytics.maintenanceInfrastructure || 0,
    },

    {
      name: "Construction",
      value:
        analytics.constructionInfrastructure || 0,
    },

  ];

  const issueData = [

    {
      name: "Pending",
      value:
        analytics.pendingIssues || 0,
    },

    {
      name: "In Progress",
      value:
        analytics.inProgressIssues || 0,
    },

    {
      name: "Resolved",
      value:
        analytics.resolvedIssues || 0,
    },

  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (

    <section className="space-y-8">

      <div>

        <h2 className="text-2xl font-bold">

          Analytics Snapshot

        </h2>

        <p className="mt-2 text-slate-400">

          Visual representation of the city
          state captured when this report
          was generated.

        </p>

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Infrastructure */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-slate-900/40
          backdrop-blur-xl
          p-6
        "
        >

          <h3 className="mb-6 text-xl font-semibold">

            Infrastructure Status

          </h3>

          <div className="h-96">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={infrastructureData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  innerRadius={70}
                >

                  {infrastructureData.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Issues */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-slate-900/40
          backdrop-blur-xl
          p-6
        "
        >

          <h3 className="mb-6 text-xl font-semibold">

            Citizen Issues

          </h3>

          <div className="h-96">

            <ResponsiveContainer>

              <BarChart
                data={issueData}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#06b6d4"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Health Card */}

      <div
        className="
        rounded-3xl
        border
        border-cyan-500/20
        bg-cyan-500/5
        p-8
      "
      >

        <h3 className="text-2xl font-bold">

          Overall Health Score

        </h3>

        <div className="mt-6 flex items-center gap-8">

          <div className="text-7xl font-bold text-cyan-400">

            {analytics.healthScore || 0}%

          </div>

          <div>

            <p className="text-slate-400 leading-8">

              UrbanMind evaluates the
              infrastructure network,
              operational assets,
              issue resolution rate and
              AI planning insights to
              generate an overall
              city health score.

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}