import {
  FileText,
  Calendar,
  User,
  Eye,
  Download,
  Trash2,
  Folder,
} from "lucide-react";

import { format } from "date-fns";

export default function ReportCard({
  report,
  onView,
  onDownload,
  onDelete,
}) {
  const statusColor = {
    Generated:
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",

    Draft:
      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",

    Archived:
      "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  };

  const categoryColor = {
    Health:
      "bg-cyan-500/20 text-cyan-400",

    Infrastructure:
      "bg-indigo-500/20 text-indigo-400",

    Environment:
      "bg-green-500/20 text-green-400",

    Simulation:
      "bg-orange-500/20 text-orange-400",
  };

  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:border-cyan-500/30
      hover:-translate-y-1
      hover:shadow-2xl
      hover:shadow-cyan-500/10
    "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div
            className="
            rounded-2xl
            bg-cyan-500/10
            p-3
          "
          >
            <FileText
              className="text-cyan-400"
              size={24}
            />
          </div>

          <div>

            <h2 className="text-xl font-bold">

              {report.title}

            </h2>

            <div className="mt-2 flex gap-2">

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium

                  ${categoryColor[report.category]}
                `}
              >
                {report.category}
              </span>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium

                  ${statusColor[report.status]}
                `}
              >
                {report.status}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Description */}

      <p className="mt-6 text-slate-400 leading-7">

        {report.description}

      </p>

      {/* Metadata */}

      <div className="mt-8 space-y-3">

        <div className="flex items-center gap-3 text-slate-400">

          <Calendar size={16} />

          <span>

            {format(
              new Date(report.createdAt),
              "dd MMM yyyy"
            )}

          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-400">

          <Folder size={16} />

          <span>

            {report.category}

          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-400">

          <User size={16} />

          <span>

            UrbanMind Planner

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex gap-3">

        <button
          onClick={() => onView(report)}
          className="
          flex-1
          rounded-xl
          bg-cyan-500/10
          py-3
          font-medium
          text-cyan-400
          transition
          hover:bg-cyan-500/20
        "
        >
          <div className="flex items-center justify-center gap-2">

            <Eye size={18} />

            View

          </div>
        </button>

        <button
          onClick={() => onDownload(report)}
          className="
          rounded-xl
          border
          border-white/10
          px-4
          transition
          hover:bg-white/5
        "
        >
          <Download size={18} />
        </button>

        <button
          onClick={() => onDelete(report)}
          className="
          rounded-xl
          border
          border-red-500/20
          px-4
          text-red-400
          transition
          hover:bg-red-500/10
        "
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}