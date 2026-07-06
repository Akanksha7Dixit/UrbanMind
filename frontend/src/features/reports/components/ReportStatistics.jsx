import {
  Activity,
  Building2,
  AlertTriangle,
  Brain,
  TrendingUp,
  Leaf,
} from "lucide-react";

export default function ReportStatistics({ report }) {

  const analytics = report.analytics || {};

  const cards = [

    {
      title: "Health Score",
      value: `${analytics.healthScore ?? 0}%`,
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },

    {
      title: "Infrastructure",
      value: analytics.totalInfrastructure ?? 0,
      icon: Building2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },

    {
      title: "Citizen Issues",
      value: analytics.totalIssues ?? 0,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },

    {
      title: "AI Recommendations",
      value:
        report.recommendations?.length ?? 0,
      icon: Brain,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },

    {
      title: "Operational",
      value:
        analytics.operationalInfrastructure ?? 0,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },

    {
      title: "Environment",
      value: "Good",
      icon: Leaf,
      color: "text-lime-400",
      bg: "bg-lime-500/10",
    },

  ];

  return (

    <section>

      <div className="mb-8">

        <h2 className="text-3xl font-bold">

          City Statistics

        </h2>

        <p className="mt-2 text-slate-400">

          Snapshot captured when this report
          was generated.

        </p>

      </div>

      <div
        className="
        grid
        gap-6

        sm:grid-cols-2

        xl:grid-cols-3
      "
      >

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="
              rounded-3xl
              border
              border-white/10
              bg-slate-900/40
              backdrop-blur-xl
              p-6
              transition-all
              duration-300
              hover:border-cyan-500/20
              hover:-translate-y-1
            "
            >

              <div
                className={`
                inline-flex
                rounded-2xl
                p-3

                ${card.bg}
              `}
              >
                <Icon
                  className={card.color}
                  size={24}
                />
              </div>

              <p className="mt-6 text-slate-400">

                {card.title}

              </p>

              <h3
                className={`
                mt-2
                text-5xl
                font-bold

                ${card.color}
              `}
              >
                {card.value}
              </h3>

            </div>

          );

        })}

      </div>

    </section>

  );

}