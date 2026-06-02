import {
  Layers3,
  Filter,
  Pencil,
  Ruler,
  Download,
  Share2,
  Sparkles,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function GISWorkspace() {
  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* TOOLBAR */}

      <div className="border-b border-white/10 bg-slate-950 p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex flex-wrap gap-3">

            <button className="toolbar-btn">
              <Layers3 size={18} />
              Layers
            </button>

            <button className="toolbar-btn">
              <Filter size={18} />
              Filters
            </button>

            <button className="toolbar-btn">
              <Pencil size={18} />
              Draw
            </button>

            <button className="toolbar-btn">
              <Ruler size={18} />
              Measure
            </button>

          </div>

          <div className="flex flex-1 justify-center">
            <input
              placeholder="Search location..."
              className="
                w-full
                max-w-md
                rounded-2xl
                border border-white/10
                bg-white/3
                px-4 py-3
                outline-none
              "
            />
          </div>

          <div className="flex flex-wrap gap-3">

            <button className="toolbar-btn">
              <Download size={18} />
              Export
            </button>

            <button className="toolbar-btn">
              <Share2 size={18} />
              Share
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-2xl
                bg-cyan-500
                px-5 py-3
                font-medium
                text-slate-950
              "
            >
              <Sparkles size={18} />
              AI Analyze
            </button>

          </div>

        </div>
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}

        <aside
          className="
            hidden xl:block
            w-72
            overflow-y-auto
            border-r border-white/10
            bg-slate-950
            p-8
          "
        >
          <h2 className="text-3xl font-semibold">
            Layers
          </h2>

          <div className="mt-10">

            <p className="text-xs tracking-widest text-slate-500 uppercase">
              Infrastructure
            </p>

            <div className="mt-5 space-y-5">

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Roads
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Metro
              </label>

            </div>

          </div>

          <div className="mt-12">

            <p className="text-xs tracking-widest text-slate-500 uppercase">
              Public Services
            </p>

            <div className="mt-5 space-y-5">

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Hospitals
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Schools
              </label>

            </div>

          </div>

          <div className="mt-12">

            <p className="text-xs tracking-widest text-slate-500 uppercase">
              Analytics
            </p>

            <div className="mt-5 space-y-5">

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Population Density
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Traffic Heatmap
              </label>

            </div>

          </div>

          <div
            className="
              mt-12
              rounded-3xl
              border border-cyan-500/20
              bg-cyan-500/5
              p-5
            "
          >
            <p className="text-cyan-400">
              Active Insight
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Coverage Gap
            </h3>

            <p className="mt-3 text-slate-400">
              Sector 12 lacks healthcare infrastructure.
            </p>
          </div>

        </aside>

        {/* MAIN */}

        <main className="flex-1 overflow-y-auto">

          {/* MAP */}

          <div className="h-[700px] border-b border-white/10">

            <MapContainer
              center={[28.6139, 77.209]}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              <Marker position={[28.6139, 77.209]}>
                <Popup>
                  Central Hospital
                </Popup>
              </Marker>

            </MapContainer>

          </div>

          {/* AI INSIGHTS */}

          <section className="p-8">

            <h2 className="text-3xl font-semibold">
              AI Insights
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">

              <div
                className="
                  lg:col-span-2
                  rounded-3xl
                  border border-cyan-500/20
                  bg-cyan-500/5
                  p-6
                "
              >
                <p className="text-cyan-400">
                  Recommendation
                </p>

                <h3 className="mt-4 text-4xl font-bold">
                  Build Hospital
                </h3>

                <p className="mt-4 text-slate-400">
                  Sector 12 has low healthcare
                  coverage and increasing population.
                </p>

                <div className="mt-6 flex gap-6">
                  <span className="text-emerald-400">
                    Confidence 91%
                  </span>

                  <span className="text-cyan-400">
                    High ROI
                  </span>
                </div>
              </div>

              <div
                className="
                  rounded-3xl
                  border border-white/10
                  p-6
                "
              >
                <p className="text-slate-400">
                  Selected Asset
                </p>

                <h3 className="mt-4 text-3xl font-bold">
                  Hospital
                </h3>

                <div className="mt-6 space-y-4">

                  <div>
                    <p className="text-slate-500">
                      Population
                    </p>

                    <p className="text-2xl font-semibold">
                      120K
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Coverage
                    </p>

                    <p className="text-2xl font-semibold">
                      67%
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* FORECAST */}

            <div
              className="
                mt-6
                rounded-3xl
                border border-white/10
                p-6
              "
            >
              <h3 className="text-xl font-semibold">
                Demand Forecast
              </h3>

              <div className="mt-6 grid gap-6 md:grid-cols-3">

                <div>
                  <p className="text-slate-500">
                    Population Growth
                  </p>

                  <p className="mt-2 text-4xl font-bold">
                    +18%
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Healthcare Demand
                  </p>

                  <p className="mt-2 text-4xl font-bold">
                    +24%
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Risk Level
                  </p>

                  <p className="mt-2 text-xl font-semibold text-amber-400">
                    Medium
                  </p>
                </div>

              </div>
            </div>

          </section>

        </main>

      </div>

    </div>
  );
}