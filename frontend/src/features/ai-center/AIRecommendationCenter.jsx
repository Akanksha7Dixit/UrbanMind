import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function AIRecommendationCenter() {
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
            UrbanMind AI Summary
          </p>
        </div>

        <h2 className="mt-4 text-4xl font-bold">
          Healthcare Expansion Recommended
        </h2>

        <p className="mt-6 max-w-4xl text-slate-400">
          Analysis indicates critical healthcare demand
          growth in Sector 12. Expansion is projected
          to improve city-wide coverage while maintaining
          strong ROI and reducing future service pressure.
        </p>
      </section>

      {/* HIGH PRIORITY */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          High Priority Recommendations
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="ai-card">
            <AlertTriangle className="text-red-400" />

            <h3 className="mt-4 text-xl font-semibold">
              Build Hospital in Sector 12
            </h3>

            <p className="mt-3 text-slate-400">
              Healthcare coverage below threshold.
            </p>

            <span className="mt-4 inline-block text-cyan-400">
              Confidence 91%
            </span>
          </div>

          <div className="ai-card">
            <Building2 className="text-amber-400" />

            <h3 className="mt-4 text-xl font-semibold">
              Expand Metro Corridor
            </h3>

            <p className="mt-3 text-slate-400">
              Reduce congestion in growth districts.
            </p>

            <span className="mt-4 inline-block text-cyan-400">
              Confidence 88%
            </span>
          </div>

        </div>
      </section>

      {/* MEDIUM PRIORITY */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Medium Priority Recommendations
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="ai-card">
            <TrendingUp className="text-cyan-400" />

            Green Corridor Development
          </div>

          <div className="ai-card">
            <Building2 className="text-cyan-400" />

            Smart Parking Infrastructure
          </div>

        </div>
      </section>

      {/* LOW PRIORITY */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Low Priority Recommendations
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="ai-card">
            Waterfront Beautification
          </div>

          <div className="ai-card">
            Tourism Promotion Zones
          </div>

        </div>
      </section>

      {/* IMPACT ANALYSIS */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Impact Analysis
        </h2>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="ai-card">
            <p className="text-slate-400">
              Coverage
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              +14%
            </h3>
          </div>

          <div className="ai-card">
            <p className="text-slate-400">
              Traffic
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              -8%
            </h3>
          </div>

          <div className="ai-card">
            <p className="text-slate-400">
              AQI
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              +6%
            </h3>
          </div>

          <div className="ai-card">
            <p className="text-slate-400">
              ROI
            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              High
            </h3>
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

        <p className="mt-6 text-slate-400 leading-8">
          Recommendation generated using projected
          population growth, healthcare demand,
          accessibility analysis, infrastructure
          coverage and expected investment return.
        </p>
      </section>

      {/* CONFIDENCE MATRIX */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Confidence Matrix
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="ai-card">
            <CheckCircle2 className="text-emerald-400" />

            <h3 className="mt-4 font-semibold">
              Healthcare Expansion
            </h3>

            <p className="mt-2 text-cyan-400">
              91%
            </p>
          </div>

          <div className="ai-card">
            <ShieldCheck className="text-cyan-400" />

            <h3 className="mt-4 font-semibold">
              Metro Expansion
            </h3>

            <p className="mt-2 text-cyan-400">
              88%
            </p>
          </div>

          <div className="ai-card">
            <TrendingUp className="text-cyan-400" />

            <h3 className="mt-4 font-semibold">
              Green Corridor
            </h3>

            <p className="mt-2 text-cyan-400">
              79%
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}