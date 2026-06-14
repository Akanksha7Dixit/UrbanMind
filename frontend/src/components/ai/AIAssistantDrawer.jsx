import { X, Sparkles } from "lucide-react";

export default function AIAssistantDrawer({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-y-0
        right-0
        z-[9999]
        w-[500px]
        border-l
        border-white/10
        bg-slate-950
      "
    >
      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <div className="flex items-center gap-3">
          <Sparkles className="text-cyan-400" />
          <h2 className="text-xl font-semibold">
            UrbanMind AI
          </h2>
        </div>

        <button onClick={onClose}>
          <X />
        </button>

      </div>

      <div className="p-6">
        <input
          placeholder="Ask UrbanMind..."
          className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-3
            outline-none
          "
        />

        <div className="mt-6 space-y-3">

          <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
            Find underserved healthcare zones
          </button>

          <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
            Analyze traffic congestion
          </button>

          <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
            Suggest hospital placement
          </button>

          <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
            Generate planning report
          </button>

        </div>
      </div>
    </div>
  );
}