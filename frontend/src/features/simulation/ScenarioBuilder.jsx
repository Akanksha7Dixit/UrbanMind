import {
  TrendingUp,
  Building2,
  Trees,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function ScenarioBuilder() {
  return (
    <div className="p-8 space-y-8">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Scenario Builder
        </h1>

        <p className="mt-2 text-slate-400">
          Create and evaluate future urban development scenarios.
        </p>
      </div>

      {/* HERO */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-cyan-950/30
          via-slate-950
          to-indigo-950/30
          p-10
          h-[320px]
          flex
          flex-col
          justify-between
        "
      >
        <div>
          <p className="text-cyan-400">
            ACTIVE SCENARIO
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            Urban Expansion 2030
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Long-term infrastructure investment plan focused on
            healthcare, transport and sustainable development.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <div>
            <p className="text-slate-400">Population</p>
            <h3 className="mt-2 text-3xl font-bold">
              1.8M
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Investment</p>
            <h3 className="mt-2 text-3xl font-bold">
              $180M
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Coverage</p>
            <h3 className="mt-2 text-3xl font-bold">
              +14%
            </h3>
          </div>

          <div>
            <p className="text-slate-400">ROI</p>
            <h3 className="mt-2 text-3xl font-bold text-cyan-400">
              High
            </h3>
          </div>

        </div>
      </section>

      {/* CONFIGURATION */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Scenario Configuration
        </h2>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-slate-400">
              Population Growth
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              +18%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-slate-400">
              Infrastructure Budget
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              $180M
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-slate-400">
              Housing Expansion
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              45%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-slate-400">
              Green Investment
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              72%
            </h3>
          </div>

        </div>
      </section>

      {/* DIGITAL TWIN */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Digital Twin Preview
        </h2>

        <div
          className="
            relative
            h-[550px]
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-gradient-to-br
            from-cyan-950/20
            via-slate-950
            to-indigo-950/20
          "
        >

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute left-24 top-24 h-4 w-4 rounded-full bg-cyan-400" />
          <div className="absolute left-[40%] top-[35%] h-4 w-4 rounded-full bg-emerald-400" />
          <div className="absolute right-32 top-32 h-4 w-4 rounded-full bg-yellow-400" />
          <div className="absolute right-[20%] bottom-[25%] h-4 w-4 rounded-full bg-purple-400" />
          <div className="absolute left-[60%] bottom-[20%] h-4 w-4 rounded-full bg-red-400" />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <span className="text-7xl font-bold text-white/5">
              DIGITAL TWIN
            </span>
          </div>

        </div>
      </section>

      {/* AI FORECAST */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          AI Forecast
        </h2>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="rounded-3xl border border-white/10 p-6">
            <TrendingUp size={20} />
            <p className="mt-4 text-slate-400">
              Coverage Impact
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              +14%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <Building2 size={20} />
            <p className="mt-4 text-slate-400">
              Traffic Impact
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              -8%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <Trees size={20} />
            <p className="mt-4 text-slate-400">
              AQI Impact
            </p>
            <h3 className="mt-2 text-4xl font-bold">
              +6%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <DollarSign size={20} />
            <p className="mt-4 text-slate-400">
              ROI
            </p>
            <h3 className="mt-2 text-4xl font-bold text-cyan-400">
              High
            </h3>
          </div>

        </div>
      </section>

      {/* TIMELINE */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Implementation Timeline
        </h2>

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-cyan-400">2025</p>
            <h3 className="mt-3 font-semibold">
              Hospital Construction
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-cyan-400">2026</p>
            <h3 className="mt-3 font-semibold">
              Metro Expansion
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-cyan-400">2027</p>
            <h3 className="mt-3 font-semibold">
              Road Upgrades
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-cyan-400">2028</p>
            <h3 className="mt-3 font-semibold">
              Project Completion
            </h3>
          </div>

        </div>
      </section>

      {/* AI RECOMMENDATION */}

      <section
        className="
          rounded-3xl
          border border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >
        <p className="text-cyan-400">
          AI Recommendation Engine
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Build Hospital in Sector 12
        </h2>

        <p className="mt-6 max-w-3xl text-slate-400">
          Population growth and healthcare demand projections
          indicate a service deficit in Sector 12. Investment
          is expected to improve infrastructure coverage by
          14% while maintaining strong ROI.
        </p>

        <div className="mt-8 flex gap-8">

          <span className="text-emerald-400">
            Confidence 91%
          </span>

          <span className="text-cyan-400">
            High ROI
          </span>

        </div>
      </section>

      {/* RISK ANALYSIS */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Risk Analysis
        </h2>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="rounded-3xl border border-white/10 p-6">
            <AlertTriangle />
            <h3 className="mt-4 font-semibold">
              Budget Risk
            </h3>
            <p className="mt-2 text-amber-400">
              Medium
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <ShieldCheck />
            <h3 className="mt-4 font-semibold">
              Environmental Risk
            </h3>
            <p className="mt-2 text-emerald-400">
              Low
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <Activity />
            <h3 className="mt-4 font-semibold">
              Traffic Risk
            </h3>
            <p className="mt-2 text-emerald-400">
              Low
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <AlertTriangle />
            <h3 className="mt-4 font-semibold">
              Political Risk
            </h3>
            <p className="mt-2 text-amber-400">
              Medium
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}