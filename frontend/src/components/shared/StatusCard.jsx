import GlassPanel from "../ui/GlassPanel";

export default function StatusCard({
  title,
  value,
}) {
  return (
    <GlassPanel className="p-5">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="mt-2 text-5xl font-bold">
        {value}
      </h3>
    </GlassPanel>
  );
}