import {
  FileText,
  Download,
  Share2,
  FileBarChart,
  Clock,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Reports Center
        </h1>

        <p className="mt-2 text-slate-400">
          Generate, export and share urban intelligence reports.
        </p>
      </div>

      {/* HERO */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-cyan-950/20
          via-slate-950
          to-indigo-950/20
          p-8
        "
      >
        <p className="text-cyan-400">
          Executive Briefing
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          City Health Assessment 2030
        </h2>

        <p className="mt-4 max-w-3xl text-slate-400">
          Comprehensive assessment covering
          population growth, infrastructure,
          environment, mobility and healthcare.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <button className="report-btn">
            <Download size={18} />
            Download PDF
          </button>

          <button className="report-btn">
            <Share2 size={18} />
            Share Report
          </button>

        </div>
      </section>

      {/* REPORT CARDS */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Generated Reports
        </h2>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="report-card">
            <FileText />
            <h3 className="mt-4 font-semibold">
              Urban Health Report
            </h3>
          </div>

          <div className="report-card">
            <FileBarChart />
            <h3 className="mt-4 font-semibold">
              Infrastructure Report
            </h3>
          </div>

          <div className="report-card">
            <FileText />
            <h3 className="mt-4 font-semibold">
              Environmental Report
            </h3>
          </div>

          <div className="report-card">
            <FileBarChart />
            <h3 className="mt-4 font-semibold">
              Simulation Report
            </h3>
          </div>

        </div>
      </section>

      {/* TEMPLATES */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Report Templates
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="report-card">
            Planning Template
          </div>

          <div className="report-card">
            Smart City Template
          </div>

          <div className="report-card">
            Infrastructure Template
          </div>

        </div>
      </section>

      {/* EXPORT CENTER */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          Export Center
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="report-card">
            PDF Export
          </div>

          <div className="report-card">
            Excel Export
          </div>

          <div className="report-card">
            Presentation Export
          </div>

        </div>
      </section>

      {/* ACTIVITY */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          Recent Activity
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3">
            <Clock size={18} />
            Urban Health Report generated
          </div>

          <div className="flex items-center gap-3">
            <Clock size={18} />
            Simulation Report exported
          </div>

          <div className="flex items-center gap-3">
            <Clock size={18} />
            Infrastructure Report shared
          </div>

        </div>
      </section>

    </div>
  );
}