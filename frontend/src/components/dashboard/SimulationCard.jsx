import GlassPanel from "../ui/GlassPanel";

export default function SimulationCard({
  title,
  coverage,
  impact,
}) {
  return (
    <GlassPanel className="p-4">
      <h4 className="font-semibold">
        {title}
      </h4>

      <div className="mt-4 flex justify-between">

        <div>
          <p className="text-slate-400">
            Coverage
          </p>

          <p className="text-emerald-400">
            {coverage}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Impact
          </p>

          <p className="text-cyan-400">
            {impact}
          </p>
        </div>

      </div>
    </GlassPanel>
  );
}