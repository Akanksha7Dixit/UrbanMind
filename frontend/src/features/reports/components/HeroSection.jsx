import {
  FileText,
  Download,
  Share2,
  Sparkles,
  Plus,
} from "lucide-react";

export default function HeroSection({
  latestReport,
  totalReports,
  onGenerate,
  onDownload,
  onShare,
}) {
  return (
    <section
      className="
      rounded-3xl
      border border-cyan-500/20
      bg-gradient-to-r
      from-cyan-950/20
      via-slate-950
      to-indigo-950/20
      p-8
    "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-400" />

            <p className="font-medium text-cyan-400">
              Executive Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-5xl font-bold">
            {latestReport
              ? latestReport.title
              : "UrbanMind Reports"}
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            Generate executive planning reports,
            infrastructure assessments,
            analytics summaries and AI-powered
            recommendations for your city.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
              Total Reports : {totalReports}
            </span>

            {latestReport && (
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-400">
                {latestReport.status}
              </span>
            )}

          </div>

        </div>

        <div className="grid gap-4">

          <button
            onClick={onGenerate}
            className="
            flex items-center gap-3
            rounded-2xl
            bg-cyan-500
            px-6
            py-4
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
          "
          >
            <Plus size={20} />

            Generate Report

          </button>

          <button
            onClick={onDownload}
            className="
            flex items-center gap-3
            rounded-2xl
            border border-white/10
            px-6
            py-4
            transition
            hover:bg-white/5
          "
          >
            <Download size={20} />

            Download Latest

          </button>

          <button
            onClick={onShare}
            className="
            flex items-center gap-3
            rounded-2xl
            border border-white/10
            px-6
            py-4
            transition
            hover:bg-white/5
          "
          >
            <Share2 size={20} />

            Share Report

          </button>

        </div>

      </div>
    </section>
  );
}