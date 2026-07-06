import {
  Building2,
  MapPin,
  Activity,
  Wrench,
  Hammer,
} from "lucide-react";

export default function InfrastructureSnapshot({
  report,
}) {

  const infrastructure =
    report.infrastructure || [];

  const statusStyles = {

    Operational:
      "bg-green-500/10 text-green-400 border-green-500/20",

    Maintenance:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    Construction:
      "bg-red-500/10 text-red-400 border-red-500/20",

  };

  const statusIcon = {

    Operational: Activity,

    Maintenance: Wrench,

    Construction: Hammer,

  };

  return (

    <section
      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      backdrop-blur-xl
      p-8
    "
    >

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Infrastructure Snapshot

          </h2>

          <p className="mt-2 text-slate-400">

            Infrastructure assets captured when this
            report was generated.

          </p>

        </div>

        <div
          className="
          rounded-2xl
          bg-cyan-500/10
          p-4
        "
        >
          <Building2
            className="text-cyan-400"
            size={28}
          />
        </div>

      </div>

      {/* Empty State */}

      {infrastructure.length === 0 && (

        <div
          className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          p-10
          text-center
          text-slate-400
        "
        >
          No infrastructure data available.
        </div>

      )}

      {/* Table */}

      {infrastructure.length > 0 && (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
                border-b
                border-white/10
                text-left
                text-sm
                text-slate-400
              "
              >

                <th className="pb-4">
                  Asset
                </th>

                <th className="pb-4">
                  Type
                </th>

                <th className="pb-4">
                  Location
                </th>

                <th className="pb-4">
                  Capacity
                </th>

                <th className="pb-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {infrastructure.map((item) => {

                const Icon =
                  statusIcon[item.status] ||
                  Activity;

                return (

                  <tr
                    key={item._id}
                    className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition
                  "
                  >

                    <td className="py-5 font-medium">

                      {item.name}

                    </td>

                    <td className="py-5">

                      {item.type || "-"}

                    </td>

                    <td className="py-5">

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={15}
                          className="text-slate-500"
                        />

                        {item.location || "-"}

                      </div>

                    </td>

                    <td className="py-5">

                      {item.capacity || "-"}

                    </td>

                    <td className="py-5">

                      <span
                        className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1
                        text-sm

                        ${statusStyles[item.status]}
                      `}
                      >

                        <Icon size={14} />

                        {item.status}

                      </span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </section>

  );

}