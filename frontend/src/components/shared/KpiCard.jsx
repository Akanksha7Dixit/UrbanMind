import GlassPanel from "../ui/GlassPanel";

export default function KpiCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  return (
    <GlassPanel
      className="
        p-6
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:border-cyan-500/20
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h3 className="mt-4 text-5xl font-bold tracking-tight">
            {value}
          </h3>

          <p
            className={`
              mt-4 text-xl font-medium
              ${
                change.startsWith("-")
                  ? "text-red-400"
                  : "text-emerald-400"
              }
            `}
          >
            {change}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Forecast Updated
          </p>
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            border border-cyan-500/20
          "
        >
          <Icon
            size={24}
            className="text-cyan-400"
          />
        </div>
      </div>
    </GlassPanel>
  );
}