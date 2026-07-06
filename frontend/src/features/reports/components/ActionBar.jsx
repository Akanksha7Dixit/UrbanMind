import {
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  Printer,
  Share2,
  Archive,
  Trash2,
} from "lucide-react";

export default function ActionBar({
  report,
  onDownloadPDF,
  onDownloadExcel,
  onDownloadPPT,
  onPrint,
  onShare,
  onArchive,
  onDelete,
}) {
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
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Report Actions
          </h2>

          <p className="mt-2 text-slate-400">
            Export, print or manage this report.
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* PDF */}

        <button
          onClick={() => onDownloadPDF(report)}
          className="
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/10
          p-6
          transition
          hover:bg-cyan-500/20
        "
        >

          <FileText
            className="text-cyan-400"
            size={28}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Download PDF

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Executive report

          </p>

        </button>

        {/* Excel */}

        <button
          onClick={() => onDownloadExcel(report)}
          className="
          rounded-2xl
          border
          border-green-500/20
          bg-green-500/10
          p-6
          transition
          hover:bg-green-500/20
        "
        >

          <FileSpreadsheet
            className="text-green-400"
            size={28}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Export Excel

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Spreadsheet

          </p>

        </button>

        {/* PPT */}

        <button
          onClick={() => onDownloadPPT(report)}
          className="
          rounded-2xl
          border
          border-orange-500/20
          bg-orange-500/10
          p-6
          transition
          hover:bg-orange-500/20
        "
        >

          <Presentation
            className="text-orange-400"
            size={28}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Presentation

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            PowerPoint

          </p>

        </button>

        {/* Print */}

        <button
          onClick={() => onPrint(report)}
          className="
          rounded-2xl
          border
          border-white/10
          p-6
          transition
          hover:bg-white/5
        "
        >

          <Printer
            size={28}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Print Report

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Printer friendly

          </p>

        </button>

      </div>

      {/* Bottom Actions */}

      <div className="mt-8 flex flex-wrap gap-4">

        <button
          onClick={() => onShare(report)}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          px-5
          py-3
          hover:bg-white/5
        "
        >

          <Share2 size={18} />

          Share

        </button>

        <button
          onClick={() => onArchive(report)}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-yellow-500/20
          px-5
          py-3
          text-yellow-400
          hover:bg-yellow-500/10
        "
        >

          <Archive size={18} />

          Archive

        </button>

        <button
          onClick={() => onDelete(report)}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-red-500/20
          px-5
          py-3
          text-red-400
          hover:bg-red-500/10
        "
        >

          <Trash2 size={18} />

          Delete

        </button>

      </div>

    </section>
  );
}