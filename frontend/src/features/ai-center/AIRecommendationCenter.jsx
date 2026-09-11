import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Building2,
  RefreshCw,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { getRecommendations } from "../../services/recommendationService";
import { useAuthStore } from "../../store/authStore";

export default function AIRecommendationCenter() {
  const token = useAuthStore((state) => state.token);

  const [recommendations, setRecommendations] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [overview, setOverview] = useState("");
  const [totalInfrastructure, setTotalInfrastructure] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestInProgress = useRef(false);

  const loadRecommendations = async () => {
    if (!token) {
      setError("Authentication token is not available.");
      setLoading(false);
      return;
    }

    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;

    try {
      setLoading(true);
      setError("");

      const data = await getRecommendations(token);

      console.log(
        "URBANMIND AI RESPONSE:",
        data
      );

      if (!data || data.success !== true) {
        throw new Error(
          data?.message ||
            "AI recommendation request failed."
        );
      }

      setHealthScore(
        Number(data.healthScore ?? 0)
      );

      setOverview(
        typeof data.overview === "string"
          ? data.overview
          : ""
      );

      setTotalInfrastructure(
        Number(
          data.totalInfrastructure ?? 0
        )
      );

      setTotalIssues(
        Number(data.totalIssues ?? 0)
      );

      setRecommendations(
        Array.isArray(data.recommendations)
          ? data.recommendations
          : []
      );
    } catch (err) {
      console.error(
        "UrbanMind AI Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          err.message ||
          "Unable to load AI recommendations."
      );
    } finally {
      setLoading(false);
      requestInProgress.current = false;
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [token]);

  return (
    <div className="space-y-8 p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            AI Recommendation Center
          </h1>

          <p className="mt-2 text-slate-400">
            Dynamic AI analysis of the current
            urban data.
          </p>
        </div>

        <button
          type="button"
          onClick={loadRecommendations}
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-cyan-500/30
            bg-cyan-500/10
            px-4
            py-2
            text-cyan-400
            transition
            hover:bg-cyan-500/20
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={18}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          {loading
            ? "Analyzing..."
            : "Refresh AI"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            p-5
            text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* AI SUMMARY */}
      <section
        className="
          rounded-3xl
          border
          border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Brain
            className="text-cyan-400"
          />

          <p
            className="
              font-medium
              text-cyan-400
            "
          >
            UrbanMind AI Analysis
          </p>
        </div>

        {loading ? (
          <div className="mt-6">
            <p className="text-slate-400">
              AI is analyzing current city
              data...
            </p>

            <div
              className="
                mt-4
                h-2
                w-full
                overflow-hidden
                rounded-full
                bg-white/5
              "
            >
              <div
                className="
                  h-full
                  w-1/3
                  animate-pulse
                  rounded-full
                  bg-cyan-400/60
                "
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className="
                mt-5
                flex
                items-end
                gap-2
              "
            >
              <span
                className="
                  text-5xl
                  font-bold
                  text-cyan-400
                "
              >
                {healthScore}
              </span>

              <span
                className="
                  mb-1
                  text-2xl
                  text-cyan-400
                "
              >
                %
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              AI-assessed city health score
            </p>

            {overview && (
              <p
                className="
                  mt-6
                  max-w-5xl
                  leading-7
                  text-slate-400
                "
              >
                {overview}
              </p>
            )}
          </>
        )}
      </section>

      {/* CITY STATISTICS */}
      <section>
        <h2
          className="
            mb-6
            text-2xl
            font-semibold
          "
        >
          Current City Data
        </h2>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          {/* INFRASTRUCTURE */}
          <div className="ai-card">
            <Building2
              className="text-cyan-400"
            />

            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Infrastructure
            </p>

            <h2
              className="
                mt-3
                text-5xl
                font-bold
              "
            >
              {loading
                ? "..."
                : totalInfrastructure}
            </h2>
          </div>

          {/* ISSUES */}
          <div className="ai-card">
            <AlertTriangle
              className="text-red-400"
            />

            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Citizen Issues
            </p>

            <h2
              className="
                mt-3
                text-5xl
                font-bold
              "
            >
              {loading
                ? "..."
                : totalIssues}
            </h2>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="ai-card">
            <TrendingUp
              className="text-green-400"
            />

            <p
              className="
                mt-4
                text-slate-400
              "
            >
              AI Recommendations
            </p>

            <h2
              className="
                mt-3
                text-5xl
                font-bold
              "
            >
              {loading
                ? "..."
                : recommendations.length}
            </h2>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section>
        <h2
          className="
            mb-6
            text-2xl
            font-semibold
          "
        >
          AI Recommendations
        </h2>

        {loading ? (
          <div className="ai-card">
            <div
              className="
                flex
                items-center
                gap-3
                text-slate-400
              "
            >
              <RefreshCw
                size={18}
                className="animate-spin"
              />

              <span>
                Generating recommendations...
              </span>
            </div>
          </div>
        ) : recommendations.length ===
          0 ? (
          <div className="ai-card">
            <Brain
              className="
                mb-4
                text-cyan-400
              "
              size={40}
            />

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              No Recommendations
            </h2>

            <p
              className="
                mt-3
                text-slate-400
              "
            >
              The AI did not identify a
              sufficiently supported
              recommendation from the current
              data.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            {recommendations.map(
              (item, index) => (
                <div
                  key={
                    item.id ||
                    item._id ||
                    index
                  }
                  className="ai-card"
                >
                  <AlertTriangle
                    className="text-cyan-400"
                  />

                  <h3
                    className="
                      mt-4
                      text-xl
                      font-semibold
                    "
                  >
                    {item.title ||
                      "AI Recommendation"}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    {item.recommendation ||
                      item.description ||
                      ""}
                  </p>

                  {item.reason && (
                    <p
                      className="
                        mt-4
                        text-sm
                        text-slate-500
                      "
                    >
                      <span className="font-medium text-slate-400">
                        Reason:
                      </span>{" "}
                      {item.reason}
                    </p>
                  )}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    "
                  >
                    {item.category && (
                      <span
                        className="
                          rounded-full
                          bg-white/5
                          px-3
                          py-1
                          text-sm
                        "
                      >
                        {item.category}
                      </span>
                    )}

                    {item.priority && (
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-sm

                          ${
                            item.priority ===
                            "Critical"
                              ? "bg-red-500/20 text-red-400"
                              : item.priority ===
                                "High"
                              ? "bg-orange-500/20 text-orange-400"
                              : item.priority ===
                                "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }
                        `}
                      >
                        {item.priority}
                      </span>
                    )}

                    {typeof item.confidence ===
                      "number" && (
                      <span
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        {item.confidence}%
                        confidence
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}