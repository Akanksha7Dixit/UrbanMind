import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Download,
  Share2,
  Printer,
  Archive,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function ReportHeader({
  report,
  onDownload,
  onShare,
  onPrint,
  onArchive,
  onDelete,
}) {
  const navigate = useNavigate();

  const statusStyles = {
    Generated:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",

    Draft:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    Archived:
      "bg-slate-500/15 text-slate-300 border border-slate-500/20",
  };

  const categoryStyles = {
    Health: "bg-cyan-500/15 text-cyan-400",
    Infrastructure: "bg-indigo-500/15 text-indigo-400",
    Environment: "bg-green-500/15 text-green-400",
    Simulation: "bg-orange-500/15 text-orange-400",
  };

  return (
    <header className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8">

      {/* Top Row */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        {/* Left */}

        <div>

          <button
            onClick={() => navigate("/reports")}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-400"
          >
            <ArrowLeft size={16} />
            Back to Reports
          </button>

          <h1 className="text-4xl font-bold tracking-tight">
            {report.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-3">

            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                categoryStyles[report.category] ||
                "bg-slate-700 text-white"
              }`}
            >
              {report.category}
            </span>

            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                statusStyles[report.status] ||
                "bg-slate-700 text-white"
              }`}
            >
              {report.status}
            </span>

          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-400">

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(report.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              Updated{" "}
              {new Date(report.updatedAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <User size={16} />
              Urban Planner
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap justify-start gap-3 lg:justify-end">

          <button
            onClick={() => onDownload(report)}
            className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Download
            </div>
          </button>

          <button
            onClick={() => onShare(report)}
            className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <Share2 size={18} />
              Share
            </div>
          </button>

          <button
            onClick={() => onPrint(report)}
            className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <Printer size={18} />
              Print
            </div>
          </button>

          <button
            onClick={() => onArchive(report)}
            className="rounded-xl border border-yellow-500/20 px-5 py-3 text-yellow-400 transition hover:bg-yellow-500/10"
          >
            <div className="flex items-center gap-2">
              <Archive size={18} />
              Archive
            </div>
          </button>

          <button
            onClick={() => onDelete(report)}
            className="rounded-xl border border-red-500/20 px-5 py-3 text-red-400 transition hover:bg-red-500/10"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </div>
          </button>

        </div>

      </div>

    </header>
  );
}