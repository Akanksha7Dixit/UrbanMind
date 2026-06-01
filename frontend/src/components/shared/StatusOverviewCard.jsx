export default function StatusOverviewCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            {value}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <Icon
          size={24}
          className="text-cyan-400"
        />

      </div>
    </GlassPanel>
  );
}