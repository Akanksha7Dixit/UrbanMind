import GlassPanel from "../ui/GlassPanel";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

import {
  Activity,
} from "lucide-react";

const chartData = [
  { value: 62 },
  { value: 65 },
  { value: 68 },
  { value: 72 },
  { value: 76 },
  { value: 81 },
  { value: 84 },
];

export default function UrbanHealthHero() {
  return (
    <GlassPanel
      className="
        relative
        overflow-hidden
        p-8
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-cyan-500/5
          via-transparent
          to-purple-500/10
        "
      />

      {/* Status Badge */}

      <div
        className="
          absolute
          right-8
          top-8
        "
      >
        <span
          className="
            rounded-full
            border border-emerald-500/20
            bg-emerald-500/10
            px-3
            py-1
            text-sm
            text-emerald-400
          "
        >
          Healthy
        </span>
      </div>

      <div className="relative grid grid-cols-2 gap-8">

        {/* Left Side */}

        <div>

          <div className="flex items-center gap-3">

            <Activity
              size={24}
              className="text-cyan-400"
            />

            <p className="text-xl text-slate-400">
              Urban Health Score
            </p>

          </div>

          <h1
            className="
              mt-6
              text-8xl
              font-bold
              tracking-tight
            "
          >
            84
          </h1>

          <p
            className="
              mt-6
              max-w-xl
              text-xl
              text-slate-400
            "
          >
            City operations are performing
            above regional averages.
            Population growth and
            infrastructure coverage remain healthy.
          </p>

          <div
            className="
              mt-10
              grid
              grid-cols-3
              gap-6
            "
          >

            <div>
              <p className="text-slate-500">
                Population Growth
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                +5.4%
              </h3>
            </div>

            <div>
              <p className="text-slate-500">
                Coverage
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                91%
              </h3>
            </div>

            <div>
              <p className="text-slate-500">
                AQI
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                67
              </h3>
            </div>

          </div>
        </div>

        {/* Right Side */}

        <div className="h-[300px]">

          <h3
            className="
              mb-4
              text-2xl
              font-semibold
            "
          >
            City Health Trend
          </h3>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="heroFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#22d3ee"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={3}
                fill="url(#heroFill)"
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>

      </div>
    </GlassPanel>
  );
}