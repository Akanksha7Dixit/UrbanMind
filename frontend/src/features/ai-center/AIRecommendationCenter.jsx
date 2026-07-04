import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  getRecommendations,
} from "../../services/recommendationService";

export default function AIRecommendationCenter() {

  const token =
    useAuthStore(
      (state) => state.token
    );

  const [recommendations, setRecommendations] =
    useState([]);

  const [healthScore, setHealthScore] =
    useState(0);

  const [totalInfrastructure, setTotalInfrastructure] =
    useState(0);

  const [totalIssues, setTotalIssues] =
    useState(0);

  useEffect(() => {
    const fetchRecommendations =
      async () => {
        try {
          const data =
            await getRecommendations(
              token
            );

          setRecommendations(
            data.recommendations
          );

          setHealthScore(
            data.healthScore
          );

          setTotalInfrastructure(
            data.totalInfrastructure
          );

          setTotalIssues(
            data.totalIssues
          );

        } catch (error) {
          console.error(error);
        }
      };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          AI Recommendation Center
        </h1>

        <p className="mt-2 text-slate-400">
          AI-powered urban planning insights and strategic recommendations.
        </p>
      </div>

      {/* AI SUMMARY */}

      <section
        className="
          rounded-3xl
          border border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >
        <div className="flex items-center gap-3">
          <Brain className="text-cyan-400" />
          <p className="text-cyan-400">
            AI Decision Intelligence
          </p>
        </div>

        <h2 className="mt-4 text-5xl font-bold text-cyan-400">
          {healthScore}%
        </h2>

        <p className="mt-4 text-slate-400">
          UrbanMind continuously evaluates infrastructure utilization,
maintenance status and citizen complaints to recommend
priority actions for planners and administrators.
        </p>
      </section>

      {/* HIGH PRIORITY */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          AI Recommendations
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          {recommendations.map((item) => (

            <div
              key={item._id}
              className="ai-card"
            >

              <AlertTriangle className="text-cyan-400" />

              <h3 className="mt-4 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {item.recommendation}
              </p>

              <div className="mt-5 flex gap-3">

                <span
                  className={`
              rounded-full
              px-3
              py-1

              ${item.priority === "High"
                      ? "bg-red-500/20 text-red-400"

                      : item.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"

                        : "bg-green-500/20 text-green-400"
                    }
            `}
                >
                  {item.priority}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* IMPACT ANALYSIS */}
{/* ================= CITY STATISTICS ================= */}

<section>

  <h2 className="mb-6 text-2xl font-semibold">
    City Statistics
  </h2>

  <div className="grid gap-6 lg:grid-cols-4">

    <div className="ai-card">

      <Building2 className="text-cyan-400" />

      <p className="mt-4 text-slate-400">
        Infrastructure
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {totalInfrastructure}
      </h2>

    </div>

    <div className="ai-card">

      <AlertTriangle className="text-red-400" />

      <p className="mt-4 text-slate-400">
        Citizen Issues
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {totalIssues}
      </h2>

    </div>

    <div className="ai-card">

      <Brain className="text-cyan-400" />

      <p className="mt-4 text-slate-400">
        AI Recommendations
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {recommendations.length}
      </h2>

    </div>

    <div className="ai-card">

      <TrendingUp className="text-green-400" />

      <p className="mt-4 text-slate-400">
        Urban Health
      </p>

      <h2 className="mt-3 text-5xl font-bold text-cyan-400">
        {healthScore}%
      </h2>

    </div>

  </div>

</section>

      {/* AI REASONING */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          AI Reasoning
        </h2>

        <p className="mt-6 leading-8 text-slate-400">

UrbanMind Recommendation Engine evaluates:

<br /><br />

• Infrastructure utilization

<br />

• Infrastructure maintenance status

<br />

• Citizen issue trends

<br />

• Urban planning rules

<br />

• City health indicators

<br /><br />

Based on these factors, the platform automatically
prioritizes investments, maintenance and future
development projects.

</p>
      </section>

      {/* CONFIDENCE MATRIX */}
<section>

  <h2 className="mb-6 text-2xl font-semibold">
    Recommendation Priorities
  </h2>

  <div className="space-y-5">
{recommendations.length === 0 ? (

  <div className="ai-card col-span-2">

    <Brain
      className="mb-4 text-cyan-400"
      size={40}
    />

    <h2 className="text-2xl font-bold">
      No Recommendations
    </h2>

    <p className="mt-3 text-slate-400">
      UrbanMind AI analyzed the city and found
      no critical issues requiring immediate action.
    </p>

  </div>

) : (

  recommendations.map((item, index) => (

    <div
      key={index}
      className="ai-card"
    >

      <AlertTriangle
        className="text-cyan-400"
      />

      <h3 className="mt-4 text-xl font-semibold">
        {item.title}
      </h3>

      <p className="mt-3 text-slate-400">
        {item.recommendation}
      </p>

      <span
        className={`mt-5 inline-block rounded-full px-3 py-1

        ${
          item.priority === "Critical"
            ? "bg-red-500/20 text-red-400"

            : item.priority === "High"
            ? "bg-orange-500/20 text-orange-400"

            : item.priority === "Medium"
            ? "bg-yellow-500/20 text-yellow-400"

            : "bg-green-500/20 text-green-400"
        }`}
      >

        {item.priority}

      </span>

    </div>

  ))

)}

  </div>

</section>

<section className="ai-card">

  <div className="flex items-center gap-4">

    <Brain
      size={36}
      className="text-cyan-400"
    />

    <div>

      <h2 className="text-2xl font-bold">
        UrbanMind AI Engine
      </h2>

      <p className="mt-2 text-slate-400">

        Recommendations are generated
        dynamically using infrastructure,
        citizen complaints and city health
        indicators.

      </p>

    </div>

  </div>

</section>

    </div>
  );
}