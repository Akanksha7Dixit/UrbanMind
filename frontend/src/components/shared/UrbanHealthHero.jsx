import { Activity } from "lucide-react";

export default function UrbanHealthHero() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-r
        from-blue-500/10
        via-cyan-500/5
        to-purple-500/10
        p-8
      "
    >
      <div className="flex items-center gap-3">
        <Activity className="h-5 w-5 text-cyan-400" />

        <span className="text-sm text-slate-400">
          Urban Health Score
        </span>
      </div>

      <h2 className="mt-4 text-6xl font-bold">
        84
      </h2>

      <p className="mt-4 max-w-xl text-slate-400">
        City operations are performing above
        regional averages. Population growth and
        infrastructure coverage remain healthy.
      </p>

      <div className="mt-8 flex gap-8">
        <div>
          <p className="text-slate-500 text-sm">
            Active Simulations
          </p>

          <h3 className="text-2xl font-semibold">
            3
          </h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            AI Recommendations
          </p>

          <h3 className="text-2xl font-semibold">
            7
          </h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Population Growth
          </p>

          <h3 className="text-2xl font-semibold">
            +5.4%
          </h3>
        </div>
      </div>
    </div>
  );
}