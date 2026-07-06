export default function ReportSkeleton() {
  return (
    <div
      className="
      animate-pulse
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      p-6
    "
    >
      {/* Header */}

      <div className="flex gap-4">

        <div
          className="
          h-14
          w-14
          rounded-2xl
          bg-slate-700
        "
        />

        <div className="flex-1">

          <div
            className="
            h-6
            w-2/3
            rounded
            bg-slate-700
          "
          />

          <div className="mt-4 flex gap-2">

            <div
              className="
              h-7
              w-20
              rounded-full
              bg-slate-700
            "
            />

            <div
              className="
              h-7
              w-24
              rounded-full
              bg-slate-700
            "
            />

          </div>

        </div>

      </div>

      {/* Description */}

      <div className="mt-8 space-y-3">

        <div className="h-4 rounded bg-slate-700" />

        <div className="h-4 rounded bg-slate-700" />

        <div className="h-4 w-4/5 rounded bg-slate-700" />

      </div>

      {/* Metadata */}

      <div className="mt-8 space-y-4">

        <div
          className="
          h-4
          w-40
          rounded
          bg-slate-700
        "
        />

        <div
          className="
          h-4
          w-32
          rounded
          bg-slate-700
        "
        />

        <div
          className="
          h-4
          w-36
          rounded
          bg-slate-700
        "
        />

      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-3">

        <div
          className="
          h-12
          flex-1
          rounded-xl
          bg-slate-700
        "
        />

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-slate-700
        "
        />

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-slate-700
        "
        />

      </div>

    </div>
  );
}