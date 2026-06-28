import { Layers3, Filter, Pencil, Ruler, Download, Share2, Sparkles, } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, } from "react-leaflet";
import AIAssistantDrawer from "../../components/ai/AIAssistantDrawer";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  getInfrastructure,
} from "../../services/infrastructureService";

export default function GISWorkspace() {
  const [aiOpen, setAiOpen] = useState(false);

  const token =
  useAuthStore(
    (state) => state.token
  );

const [
  infrastructure,
  setInfrastructure,
] = useState([]);


useEffect(() => {

  const fetchInfrastructure =
    async () => {

      try {

        const data =
          await getInfrastructure(
            token
          );

        setInfrastructure(
          data.infrastructure
        );

      } catch (error) {

        console.error(error);

      }

    };

  if (token) {
    fetchInfrastructure();
  }

}, [token]);

  return (
<div className="w-full flex flex-col">
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
              onClick={() => setAiOpen(true)}
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

      <div className="flex flex-1 ">

        {/* LEFT PANEL */}

        {/* MAIN */}

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1600px] px-8 xl:px-14 py-10">
            {/* HEADER */}

            <div className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight">
                GIS Command Center
              </h1>

              <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-400">
                Urban infrastructure, mobility,
                healthcare and population intelligence
                platform.
              </p>
            </div>

            {/* MAP SECTION */}

            <section
              className="
    rounded-3xl
    border border-white/10
    bg-white/[0.02]
    p-8
    mb-16
  "
            >
              <div className="mb-8">
                <h2 className="text-3xl font-semibold">
                  Live City Operations Map
                </h2>

                <p className="mt-2 text-slate-400">
                  Real-time spatial intelligence
                  workspace.
                </p>
              </div>

              <div
                className="
    relative
    overflow-hidden
    rounded-3xl
    border border-white/10
    h-[650px] xl:h-[800px]
  "
              >
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

                <div
                  className="
    absolute
    right-6
    top-6
    z-[1000]
    grid
    gap-4
  "
                >
                  <div className="rounded-2xl bg-slate-950/90 p-4 backdrop-blur-xl">
                    <p className="text-xs text-slate-400">
                      Population
                    </p>

                    <p className="text-2xl font-bold">
                      1.2M
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/90 p-4 backdrop-blur-xl">
                    <p className="text-xs text-slate-400">
                      Coverage
                    </p>

                    <p className="text-2xl font-bold">
                      91%
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* AI SECTION */}

            <section className="mt-12">

              <h2 className="mb-6 text-2xl font-semibold">
                AI Intelligence Center
              </h2>

              <div
                className="
          grid
          gap-6
          lg:grid-cols-3
        "
              >

                <div
                  className="
            lg:col-span-2
            rounded-3xl
            border border-cyan-500/20
            bg-cyan-500/5
            p-8
          "
                >
                  <p className="text-cyan-400">
                    Recommendation
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold">
                    Build Hospital
                  </h3>

                  <p className="mt-4 text-lg text-slate-400">
                    Sector 12 has low healthcare
                    coverage and increasing population.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-8">
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
    bg-white/[0.02]
    p-8
    transition-all
    duration-300
    hover:border-cyan-500/20
  "
                >
                  <p className="text-slate-500">
                    Selected Asset
                  </p>

                  <h3 className="mt-4 text-4xl font-bold">
                    Hospital
                  </h3>

                  <div className="mt-8 space-y-6">

                    <div>
                      <p className="text-slate-500">
                        Population
                      </p>

                      <p className="text-3xl font-bold">
                        120K
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Coverage
                      </p>

                      <p className="text-3xl font-bold">
                        67%
                      </p>
                    </div>

                  </div>
                </div>

              </div>

            </section>

            {/* METRICS */}

            <section className="mt-12">

              <h2 className="mb-6 text-2xl font-semibold">
                Urban Metrics
              </h2>

              <div
                className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
              >

                <div className="rounded-3xl border border-white/10 p-8">
                  <p className="text-slate-500">Population</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    1.2M
                  </h3>
                </div>

                <div className="rounded-3xl border border-white/10 p-8">
                  <p className="text-slate-500">Coverage</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    91%
                  </h3>
                </div>

                <div className="rounded-3xl border border-white/10 p-8">
                  <p className="text-slate-500">Hospitals</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    12
                  </h3>
                </div>

                <div className="rounded-3xl border border-white/10 p-8">
                  <p className="text-slate-500">Road Network</p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    64 km
                  </h3>
                </div>

              </div>

            </section>

            <section className="mt-16">

              <h2 className="mb-8 text-2xl font-semibold">
                Infrastructure Assets
              </h2>

              <div
                className="
      rounded-3xl
      border border-white/10
      bg-white/[0.02]
      overflow-hidden
    "
              >

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-6 text-left">Asset</th>
                      <th className="p-6 text-left">Type</th>
                      <th className="p-6 text-left">Coverage</th>
                      <th className="p-6 text-left">Status</th>
                    </tr>
                  </thead>

                 <tbody>

  {infrastructure.map((item) => (

    <tr
      key={item._id}
      className="border-b border-white/5"
    >

      <td className="p-6">
        {item.name}
      </td>

      <td className="p-6">
        {item.type}
      </td>

      <td className="p-6">
        {item.utilization}%
      </td>

      <td
        className={`p-6

        ${
          item.status === "Operational"
            ? "text-emerald-400"

            : "text-yellow-400"
        }`}
      >
        {item.status}
      </td>

    </tr>

  ))}

</tbody>
                </table>

                <section className="mt-16">

                  <h2 className="mb-8 text-2xl font-semibold">
                    Demand Forecast
                  </h2>

                  <div
                    className="
      grid
      gap-6
      lg:grid-cols-3
    "
                  >

                    <div className="rounded-3xl border border-white/10 p-8">
                      <p className="text-slate-500">
                        Healthcare Demand
                      </p>

                      <h3 className="mt-4 text-3xl font-semibold">
                        +18%
                      </h3>
                    </div>

                    <div className="rounded-3xl border border-white/10 p-8">
                      <p className="text-slate-500">
                        Transit Demand
                      </p>

                      <h3 className="mt-4 text-3xl font-semibold">
                        +12%
                      </h3>
                    </div>

                    <div className="rounded-3xl border border-white/10 p-8">
                      <p className="text-slate-500">
                        Population Growth
                      </p>

                      <h3 className="mt-4 text-3xl font-semibold">
                        +9%
                      </h3>
                    </div>

                  </div>

                </section>

                <section className="mt-16">
                  <h2 className="mb-6 text-2xl font-semibold">
                    Network Health
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-sm text-slate-500">Road Network</p>
                      <h3 className="mt-3 text-3xl font-semibold">94%</h3>
                      <p className="mt-2 text-emerald-400">Healthy</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-sm text-slate-500">Metro Network</p>
                      <h3 className="mt-3 text-3xl font-semibold">91%</h3>
                      <p className="mt-2 text-cyan-400">Stable</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-sm text-slate-500">Healthcare</p>
                      <h3 className="mt-3 text-3xl font-semibold">67%</h3>
                      <p className="mt-2 text-yellow-400">Needs Attention</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-sm text-slate-500">Education</p>
                      <h3 className="mt-3 text-3xl font-semibold">82%</h3>
                      <p className="mt-2 text-emerald-400">Good</p>
                    </div>

                  </div>
                </section>

                <section className="mt-16">
                  <h2 className="mb-6 text-2xl font-semibold">
                    Scenario Opportunities
                  </h2>

                  <div className="grid gap-6 xl:grid-cols-2">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                      <p className="text-cyan-400 text-sm">
                        Opportunity #1
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold">
                        Hospital Expansion
                      </h3>

                      <p className="mt-4 text-slate-400">
                        Increase healthcare coverage by 18% in Sector 12.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                      <p className="text-cyan-400 text-sm">
                        Opportunity #2
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold">
                        Metro Extension
                      </h3>

                      <p className="mt-4 text-slate-400">
                        Reduce congestion by approximately 12%.
                      </p>
                    </div>

                  </div>
                </section>

              </div>

            </section>

          </div>
        </main>

        <AIAssistantDrawer
          open={aiOpen}
          onClose={() => setAiOpen(false)}
        />

      </div>

    </div>
  );
}