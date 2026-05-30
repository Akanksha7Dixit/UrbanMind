export default function ScenarioCard({
  title,
}) {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/3
        p-6
      "
    >
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        Infrastructure Planning Scenario
      </p>
    </div>
  );
}