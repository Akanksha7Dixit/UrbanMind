export default function GISWorkspace() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        GIS Workspace
      </h1>

      <p className="mt-2 text-slate-400">
        Geospatial Planning Environment
      </p>

      <div
        className="
          mt-8
          relative
          h-[700px]
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-slate-950
        "
      >

        {/* GRID */}

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

        {/* AI INSIGHT */}

        <div
          className="
            absolute
            left-6
            top-6
            w-80
            rounded-2xl
            border border-white/10
            bg-slate-900/90
            p-5
          "
        >
          <h3 className="font-semibold">
            AI Insight
          </h3>

          <p className="mt-3 text-cyan-400">
            Coverage Gap Detected
          </p>

          <p className="mt-2 text-slate-400">
            Sector 12 requires additional
            healthcare infrastructure.
          </p>

          <p className="mt-4 text-sm text-emerald-400">
            Confidence: 91%
          </p>
        </div>

        {/* CONTROLS */}

        <div
          className="
            absolute
            right-6
            top-6
            flex gap-3
          "
        >
          <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2">
            +
          </button>

          <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2">
            -
          </button>

          <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2">
            Layers
          </button>

          <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2">
            Heatmap
          </button>
        </div>

        {/* CENTER LABEL */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <h2
            className="
              text-5xl
              font-bold
              text-slate-700
            "
          >
            CITY MAP PREVIEW
          </h2>
        </div>

      </div>
    </div>
  );
}