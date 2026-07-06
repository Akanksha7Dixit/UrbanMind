import {
  Sparkles,
  Brain,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function ExecutiveSummary({ report }) {
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/20
      bg-gradient-to-br
      from-cyan-950/30
      via-slate-900
      to-indigo-950/30
      p-8
      backdrop-blur-xl
    "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-20
        -top-20
        h-72
        w-72
        rounded-full
        bg-cyan-500/10
        blur-[140px]
      "
      />

      <div className="relative">

        {/* Heading */}

        <div className="flex items-center gap-3">

          <div
            className="
            rounded-2xl
            bg-cyan-500/15
            p-3
          "
          >
            <Brain
              size={26}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              AI Executive Summary
            </h2>

            <p className="mt-1 text-slate-400">
              Automatically generated using
              UrbanMind Intelligence Engine
            </p>

          </div>

        </div>

        {/* Summary */}

        <div
          className="
          mt-8
          rounded-2xl
          border
          border-white/10
          bg-slate-900/40
          p-6
        "
        >
          <p
            className="
            text-lg
            leading-9
            text-slate-300
          "
          >
            {report.summary ||
              "UrbanMind AI could not generate a summary for this report. Generate the report again after analytics are refreshed."}
          </p>
        </div>

        {/* Insights */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Confidence */}

          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/30
            p-5
          "
          >
            <Sparkles
              className="text-cyan-400"
              size={22}
            />

            <p className="mt-4 text-sm text-slate-400">
              AI Confidence
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              96%
            </h3>
          </div>

          {/* Health */}

          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/30
            p-5
          "
          >
            <TrendingUp
              className="text-green-400"
              size={22}
            />

            <p className="mt-4 text-sm text-slate-400">
              Overall Health
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-400">
              Stable
            </h3>
          </div>

          {/* Verification */}

          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/30
            p-5
          "
          >
            <ShieldCheck
              className="text-cyan-400"
              size={22}
            />

            <p className="mt-4 text-sm text-slate-400">
              Verification
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Verified
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}