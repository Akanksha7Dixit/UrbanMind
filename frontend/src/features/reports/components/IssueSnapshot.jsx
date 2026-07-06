import {
  AlertTriangle,
  Calendar,
  User,
  Clock,
} from "lucide-react";

export default function IssueSnapshot({ report }) {

  const issues = report.issues || [];

  const statusStyles = {
    Pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    "In Progress":
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

    Resolved:
      "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const priorityStyles = {
    High:
      "bg-red-500/10 text-red-400",

    Medium:
      "bg-orange-500/10 text-orange-400",

    Low:
      "bg-green-500/10 text-green-400",
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

            Citizen Issues

          </h2>

          <p className="mt-2 text-slate-400">

            Issues captured at the time this
            report was generated.

          </p>

        </div>

        <div
          className="
          rounded-2xl
          bg-red-500/10
          p-4
        "
        >
          <AlertTriangle
            className="text-red-400"
            size={28}
          />
        </div>

      </div>

      {issues.length === 0 && (

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
          No citizen issues recorded.
        </div>

      )}

      {issues.length > 0 && (

        <div className="space-y-5">

          {issues.map((issue) => (

            <div
              key={issue._id}
              className="
              rounded-2xl
              border
              border-white/10
              bg-slate-950/40
              p-6
              transition
              hover:border-cyan-500/20
            "
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                <div>

                  <h3 className="text-xl font-semibold">

                    {issue.title}

                  </h3>

                  <p className="mt-3 text-slate-400">

                    {issue.description}

                  </p>

                </div>

                <div className="flex flex-wrap gap-3">

                  <span
                    className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-sm

                    ${statusStyles[issue.status]}
                  `}
                  >
                    {issue.status}
                  </span>

                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-sm

                    ${priorityStyles[issue.priority]}
                  `}
                  >
                    {issue.priority}
                  </span>

                </div>

              </div>

              <div
                className="
                mt-6
                grid
                gap-5
                md:grid-cols-3
                text-sm
                text-slate-400
              "
              >

                <div className="flex items-center gap-2">

                  <User size={16} />

                  {issue.department ||
                    "Urban Department"}

                </div>

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  {new Date(
                    issue.createdAt
                  ).toLocaleDateString()}

                </div>

                <div className="flex items-center gap-2">

                  <Clock size={16} />

                  {issue.updatedAt
                    ? `Updated ${new Date(
                        issue.updatedAt
                      ).toLocaleDateString()}`
                    : "Not Updated"}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}