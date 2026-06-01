import PageHeader from "../../components/shared/PageHeader";
import KpiCard from "../../components/shared/KpiCard";
import UrbanHealthHero from "../../components/shared/UrbanHealthHero";
import StatusCard from "../../components/shared/StatusCard";

import {
  Users,
  Car,
  Wind,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <PageHeader
        title="Good Morning, Planner"
        description="Urban Intelligence Overview"
      />

      {/* Hero */}
      <UrbanHealthHero />

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatusCard
          title="Active Simulations"
          value="03"
        />

        <StatusCard
          title="AI Alerts"
          value="07"
        />

        <StatusCard
          title="Infrastructure Coverage"
          value="91%"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard
          title="Population"
          value="1.2M"
          change="+5.4%"
          icon={Users}
        />

        <KpiCard
          title="Traffic Score"
          value="82"
          change="+2%"
          icon={Car}
        />

        <KpiCard
          title="AQI"
          value="67"
          change="-4%"
          icon={Wind}
        />

        <KpiCard
          title="Budget"
          value="$420M"
          change="+8%"
          icon={Wallet}
        />
      </div>

      {/* GIS Preview */}

<div
  className="
    rounded-3xl
    border border-white/10
    bg-white/[0.03]
    p-6
    h-[550px]
  "
>
  <h3 className="mb-6 text-xl font-semibold">
    City Operations Map Preview
  </h3>

  <div
    className="
      relative
      h-full
      overflow-hidden
      rounded-2xl
      bg-slate-950
    "
  >

    {/* Grid Overlay */}

    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,.05) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,.05) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "40px 40px",
      }}
    />

    {/* AI Insight Card */}

    <div className="absolute left-6 top-6 z-30">
      <div
        className="
          rounded-xl
          border border-white/10
          bg-slate-900/90
          p-4
          backdrop-blur-xl
        "
      >
        <p className="text-cyan-400">
          Coverage Gap
        </p>

        <p className="mt-2 font-medium">
          Sector 12
        </p>

        <p className="text-sm text-slate-400">
          Confidence 91%
        </p>
      </div>
    </div>

    {/* Layer Panel */}

    <div
      className="
        absolute
        left-6
        top-32
        z-20
        w-56
        rounded-2xl
        border border-white/10
        bg-slate-900/80
        p-4
        backdrop-blur-xl
      "
    >
      <p className="mb-4 font-medium">
        Map Layers
      </p>

      <div className="space-y-3 text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Roads
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Hospitals
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Schools
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Metro
        </label>

      </div>
    </div>

    {/* Map Stats */}

    <div
      className="
        absolute
        right-6
        top-6
        z-20
        flex
        gap-3
      "
    >
      <div
        className="
          rounded-xl
          border border-white/10
          bg-slate-900/80
          px-4
          py-2
        "
      >
        <p className="text-xs text-slate-400">
          Hospitals
        </p>

        <p className="font-semibold">
          12
        </p>
      </div>

      <div
        className="
          rounded-xl
          border border-white/10
          bg-slate-900/80
          px-4
          py-2
        "
      >
        <p className="text-xs text-slate-400">
          Roads
        </p>

        <p className="font-semibold">
          64 km
        </p>
      </div>

      <div
        className="
          rounded-xl
          border border-white/10
          bg-slate-900/80
          px-4
          py-2
        "
      >
        <p className="text-xs text-slate-400">
          Coverage
        </p>

        <p className="font-semibold text-emerald-400">
          91%
        </p>
      </div>
    </div>

    {/* Main Roads */}

    <div
      className="
        absolute
        left-0
        top-1/2
        h-[2px]
        w-full
        bg-cyan-500/20
      "
    />

    <div
      className="
        absolute
        left-1/2
        top-0
        h-full
        w-[2px]
        bg-cyan-500/20
      "
    />

    <div
      className="
        absolute
        left-[28%]
        top-[42%]
        h-[2px]
        w-[35%]
        bg-cyan-500/20
      "
    />

    <div
      className="
        absolute
        left-[45%]
        top-[35%]
        h-[25%]
        w-[2px]
        bg-cyan-500/20
      "
    />

    <div
      className="
        absolute
        left-[60%]
        top-[50%]
        h-[2px]
        w-[18%]
        bg-cyan-500/20
      "
    />

    {/* Infrastructure Nodes */}

    <div className="absolute left-40 top-32 h-4 w-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
    <div className="absolute left-72 top-48 h-4 w-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
    <div className="absolute left-[55%] top-[35%] h-4 w-4 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50" />
    <div className="absolute right-40 top-40 h-4 w-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-500/50" />
    <div className="absolute right-80 bottom-24 h-4 w-4 rounded-full bg-red-400 shadow-lg shadow-red-500/50" />
    <div className="absolute left-[70%] top-[60%] h-4 w-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
    <div className="absolute left-[45%] top-[65%] h-4 w-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
    <div className="absolute left-[30%] top-[55%] h-4 w-4 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" />
    <div className="absolute left-[75%] top-[30%] h-4 w-4 rounded-full bg-pink-400 shadow-lg shadow-pink-500/50" />
    <div className="absolute left-[60%] top-[75%] h-4 w-4 rounded-full bg-orange-400 shadow-lg shadow-orange-500/50" />

    {/* Watermark */}

    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
      "
    >
      <span
        className="
          text-7xl
          font-bold
          tracking-widest
          text-slate-800
        "
      >
        URBAN GIS
      </span>
    </div>

  </div>
</div>

      {/* Simulations + AI */}
      <div className="grid grid-cols-12 gap-6">

        {/* Active Simulations */}
        <div
          className="
            col-span-7
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            p-6
            h-80
          "
        >
          <h3 className="mb-6 text-xl font-semibold">
            Active Simulations
          </h3>

          <div className="space-y-4">

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <h4 className="font-medium">
                Metro Expansion
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Coverage +12%
              </p>

              <p className="text-sm text-emerald-400">
                Traffic -8%
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <h4 className="font-medium">
                Hospital Expansion
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Population Served +18%
              </p>

              <p className="text-sm text-cyan-400">
                Budget $12M
              </p>
            </div>

          </div>
        </div>

        {/* AI Recommendations */}
        <div
          className="
            col-span-5
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            p-6
            h-80
          "
        >
          <h3 className="mb-6 text-xl font-semibold">
            AI Recommendations
          </h3>

          <div
            className="
rounded-2xl
border border-cyan-500/20
bg-cyan-500/5
p-5
shadow-[0_0_30px_rgba(34,211,238,0.08)]
"
          >
            <p className="text-sm text-cyan-400">
              Recommended Action
            </p>

            <h4 className="mt-2 text-xl font-semibold">
              Build Hospital in Sector 12
            </h4>

            <p className="mt-4 text-slate-400">
              Infrastructure coverage can improve
              by approximately 18%.
            </p>

            <div className="mt-5 flex gap-4">
              <span className="text-emerald-400">
                Confidence 91%
              </span>

              <span className="text-cyan-400">
                ROI High
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}