import GlassPanel from "../ui/GlassPanel";

export default function RecommendationCard() {
  return (
    <GlassPanel
      className="
        p-6
        border-cyan-500/20
      "
    >
      <p className="text-cyan-400">
        Recommended Action
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        Build Hospital in Sector 12
      </h3>

      <p className="mt-4 text-slate-400">
        Infrastructure coverage
        can improve by 18%.
      </p>

      <div className="mt-6 flex gap-4">

        <span className="text-emerald-400">
          Confidence 91%
        </span>

        <span className="text-cyan-400">
          ROI High
        </span>

      </div>
    </GlassPanel>
  );
}