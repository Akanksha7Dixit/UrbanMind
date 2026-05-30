import {
  Layers3,
  Filter,
  Sparkles,
  Search,
} from "lucide-react";

export default function GISWorkspace() {
  return (
    <div className="h-full p-6">
      <div className="flex h-full gap-6">

        {/* Left Panel */}
        <aside
          className="
            w-80
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
          "
        >
          <div className="flex items-center gap-3">
            <Layers3 size={20} />

            <h2 className="font-semibold">
              Layers
            </h2>
          </div>

          <div className="mt-8 space-y-4">

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Roads
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Hospitals
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Schools
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Parks
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Metro Stations
            </label>

          </div>
        </aside>

        {/* Main Workspace */}
        <div className="flex flex-1 flex-col gap-6">

          {/* GIS Toolbar */}
          <div
            className="
              flex
              h-16
              items-center
              justify-between
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-6
            "
          >
            <div className="flex items-center gap-4">
              <Search size={18} />

              <span className="text-slate-400">
                Search infrastructure...
              </span>
            </div>

            <div className="flex gap-3">
              <button className="rounded-xl border border-white/10 px-4 py-2">
                <Filter size={16} />
              </button>

              <button className="rounded-xl border border-white/10 px-4 py-2">
                Layers
              </button>
            </div>
          </div>

          {/* Map Canvas */}
          <div
            className="
              relative
              flex-1
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-gradient-to-br
              from-slate-900
              via-slate-950
              to-slate-900
            "
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">

                <h2 className="text-3xl font-bold">
                  GIS Map Canvas
                </h2>

                <p className="mt-2 text-slate-400">
                  Leaflet Map Will Render Here
                </p>

              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div
            className="
              h-52
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >
            <div className="flex items-center gap-3">

              <Sparkles
                className="text-cyan-400"
                size={18}
              />

              <h3 className="font-semibold">
                AI Insights
              </h3>

            </div>

            <div className="mt-6">
              Coverage gap detected in Sector 12.

              Recommended:
              Build Hospital

              Confidence:
              91%
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}