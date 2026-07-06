import {
  Brain,
  ArrowRight,
  TrendingUp,
  CircleCheckBig,
} from "lucide-react";

export default function RecommendationList({
  report,
}) {

  const recommendations =
    report.recommendations || [];

  const priorityStyle = {

    High:
      "bg-red-500/10 text-red-400 border-red-500/20",

    Medium:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    Low:
      "bg-green-500/10 text-green-400 border-green-500/20",

  };

  return (

    <section
      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      backdrop-blur-xl
      p-8
    "
    >

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            AI Recommendations

          </h2>

          <p className="mt-2 text-slate-400">

            Automatically generated planning
            recommendations based on analytics,
            infrastructure and citizen issues.

          </p>

        </div>

        <div
          className="
          rounded-2xl
          bg-cyan-500/10
          p-4
        "
        >

          <Brain
            className="text-cyan-400"
            size={28}
          />

        </div>

      </div>

      {/* Empty */}

      {recommendations.length === 0 && (

        <div
          className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          p-10
          text-center
          text-slate-400
        "
        >
          No AI recommendations available.
        </div>

      )}

      {/* Cards */}

      {recommendations.length > 0 && (

        <div className="space-y-5">

          {recommendations.map((recommendation) => (

            <div
              key={recommendation._id}
              className="
              rounded-2xl
              border
              border-white/10
              bg-slate-950/40
              p-6
              transition-all
              duration-300
              hover:border-cyan-500/30
            "
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <CircleCheckBig
                      className="text-cyan-400"
                      size={22}
                    />

                    <h3 className="text-xl font-semibold">

                      {recommendation.title}

                    </h3>

                  </div>

                  <p className="mt-4 leading-7 text-slate-400">

                    {recommendation.description}

                  </p>

                </div>

                <div className="flex flex-col gap-3">

                  <span
                    className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-center
                    text-sm

                    ${priorityStyle[
                      recommendation.priority
                    ]}
                  `}
                  >
                    {recommendation.priority}
                  </span>

                  <div
                    className="
                    rounded-xl
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-center
                    text-cyan-400
                  "
                  >
                    {recommendation.confidence ?? 90}%
                    Confidence
                  </div>

                </div>

              </div>

              {/* Footer */}

              <div
                className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
              "
              >

                <div className="flex gap-4 text-sm text-slate-400">

                  <div className="flex items-center gap-2">

                    <TrendingUp size={16} />

                    Impact

                    <span className="font-semibold text-white">

                      {recommendation.impact ??
                        "High"}

                    </span>

                  </div>

                  <div>

                    Category

                    <span className="ml-2 font-semibold text-white">

                      {recommendation.category ??
                        "Urban"}

                    </span>

                  </div>

                </div>

                <button
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-cyan-500/20
                  px-4
                  py-2
                  text-cyan-400
                  transition
                  hover:bg-cyan-500/10
                "
                >
                  View Details

                  <ArrowRight size={16} />

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}