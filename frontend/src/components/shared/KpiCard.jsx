export default function KpiCard({
  title,
  value,
  change,
}) {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/3
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:bg-white/5
        hover:-translate-y-1
      "
    >
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold">
        {value}
      </h3>

      <p className="mt-3 text-emerald-400">
        {change}
      </p>
    </div>
  );
}