import {
  useMemo,
  useState,
} from "react";

import {
  Search,
  Filter,
  Plus,
} from "lucide-react";

import HeroSection from "../components/HeroSection";
import ReportsGrid from "../components/ReportsGrid";
import ExportCard from "../components/ExportCard";
import TemplateCard from "../components/TemplateCard";
import ActivityItem from "../components/ActivityItem";

import { useReports } from "../hooks/useReports";

import {
  latestReport,
} from "../utils/reportHelpers";

export default function ReportsPage() {

  const {
  data,
  isLoading,
} = useReports();

const reports = data?.reports || [];

  const [

    search,

    setSearch,

  ] = useState("");

  const [

    category,

    setCategory,

  ] = useState("All");

  const [

    status,

    setStatus,

  ] = useState("All");

  const report = latestReport(reports);

  const filteredReports = useMemo(() => {

    return reports.filter((item) => {

      const matchesSearch =

        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        category === "All"

          ? true

          : item.category === category;

      const matchesStatus =

        status === "All"

          ? true

          : item.status === status;

      return (

        matchesSearch &&

        matchesCategory &&

        matchesStatus

      );

    });

  }, [

    reports,

    search,

    category,

    status,

  ]);

  const handleGenerate = () => {

    console.log(
      "Generate Report"
    );

  };

  const handleDownload = (

    report

  ) => {

    console.log(

      "Download",

      report

    );

  };

  const handleShare = (

    report

  ) => {

    console.log(

      "Share",

      report

    );

  };

  const handleDelete = (

    report

  ) => {

    console.log(

      "Delete",

      report

    );

  };

  const handleView = (

    report

  ) => {

    console.log(

      "View",

      report

    );

  };

  return (

    <div className="space-y-10 p-8">

      <HeroSection

        latestReport={report}

        totalReports={reports.length}

        onGenerate={handleGenerate}

        onDownload={() =>

          handleDownload(report)

        }

        onShare={() =>

          handleShare(report)

        }

      />

      {/* Search */}

      <section
        className="
        rounded-3xl
        border
        border-white/10
        bg-slate-900/40
        p-6
      "
      >

        <div className="flex flex-col gap-5 lg:flex-row">

          <div
            className="
            flex
            flex-1
            items-center
            gap-3

            rounded-2xl

            border
            border-white/10

            px-4
          "
          >

            <Search
              className="text-slate-400"
            />

            <input

              value={search}

              onChange={(e) =>

                setSearch(
                  e.target.value
                )

              }

              placeholder="Search reports..."

              className="
              h-14
              w-full
              bg-transparent
              outline-none
            "

            />

          </div>

          <div
            className="
            flex
            items-center
            gap-3
          "
          >

            <Filter />

            <select

              value={category}

              onChange={(e) =>

                setCategory(
                  e.target.value
                )

              }

              className="
              rounded-xl
              bg-slate-900
              px-4
              py-3
            "

            >

              <option>

                All

              </option>

              <option>

                Health

              </option>

              <option>

                Infrastructure

              </option>

              <option>

                Environment

              </option>

              <option>

                Simulation

              </option>

            </select>

            <select

              value={status}

              onChange={(e) =>

                setStatus(
                  e.target.value
                )

              }

              className="
              rounded-xl
              bg-slate-900
              px-4
              py-3
            "

            >

              <option>

                All
              </option>
              <option>
                Generated
              </option>
              <option>
                Draft
              </option>
              <option>
                Archived
              </option>
            </select>
            <button
              onClick={
                handleGenerate
              }
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              font-semibold
              text-slate-950
            "
            >
              <Plus size={18} />
              Generate
            </button>
          </div>
        </div>
      </section>

      {/* Reports */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">

              Generated Reports

            </h2>

            <p className="mt-2 text-slate-400">

              {filteredReports.length} report(s) found

            </p>

          </div>

        </div>

        <ReportsGrid

          reports={filteredReports}

          isLoading={isLoading}

          onView={handleView}

          onDownload={handleDownload}

          onDelete={handleDelete}

        />

      </section>

      {/* Templates */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Report Templates
          </h2>
          <p className="mt-2 text-slate-400">
            Quickly generate reports using predefined templates.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <TemplateCard
            title="Urban Health"
            description="Comprehensive health and planning report."
            onUse={handleGenerate}
          />
          <TemplateCard
            title="Infrastructure"
            description="Infrastructure condition assessment."
            onUse={handleGenerate}
          />
          <TemplateCard
            title="Environment"
            description="Environmental sustainability report."
            onUse={handleGenerate}
          />
          <TemplateCard
            title="Simulation"
            description="Scenario comparison report."
            onUse={handleGenerate}
          />
        </div>
      </section>

      {/* Export Center */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Export Center
          </h2>
          <p className="mt-2 text-slate-400">
            Export reports in multiple professional formats.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <ExportCard
            title="PDF Export"
            description="Professional printable report."
            icon="pdf"
            color="bg-red-500/20 text-red-400"
            onClick={() =>
              console.log("PDF Export")
            }
          />
          <ExportCard
            title="Excel Export"
            description="Spreadsheet with analytics."
            icon="excel"
            color="bg-green-500/20 text-green-400"
            onClick={() =>
              console.log("Excel Export")
            }
          />
          <ExportCard
            title="Presentation"
            description="PowerPoint executive briefing."
            icon="ppt"
            color="bg-orange-500/20 text-orange-400"
            onClick={() =>
              console.log("PowerPoint Export")
            }
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Recent Activity
          </h2>
        </div>
        <div className="space-y-5">
          {reports
            .slice(0, 5)
            .map((report) => (
              <ActivityItem
                key={report._id}
                activity={{
                  title: report.title,
                  time: new Date(
                    report.createdAt
                  ).toLocaleString(),
                  action: report.status,
                }}
              />
            ))}
        </div>
      </section>

            {/* Report Statistics */}

      <section>

        <div className="mb-6">

          <h2 className="text-3xl font-bold">

            Report Statistics

          </h2>

          <p className="mt-2 text-slate-400">

            Overall reporting performance.

          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="report-card">

            <p className="text-slate-400">

              Total Reports

            </p>

            <h2 className="mt-4 text-5xl font-bold text-cyan-400">

              {reports.length}

            </h2>

          </div>

          <div className="report-card">

            <p className="text-slate-400">

              Generated

            </p>

            <h2 className="mt-4 text-5xl font-bold text-green-400">

              {

                reports.filter(

                  r => r.status === "Generated"

                ).length

              }

            </h2>

          </div>

          <div className="report-card">

            <p className="text-slate-400">

              Draft

            </p>

            <h2 className="mt-4 text-5xl font-bold text-yellow-400">

              {

                reports.filter(

                  r => r.status === "Draft"

                ).length

              }

            </h2>

          </div>

          <div className="report-card">

            <p className="text-slate-400">

              Archived

            </p>

            <h2 className="mt-4 text-5xl font-bold text-red-400">

              {

                reports.filter(

                  r => r.status === "Archived"

                ).length

              }

            </h2>

          </div>

        </div>

      </section>

      {/* Quick Insights */}

      <section
        className="
        rounded-3xl
        border
        border-cyan-500/20
        bg-cyan-500/5
        p-8
      "
      >

        <h2 className="text-3xl font-bold">

          UrbanMind Insights

        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div>

            <h3 className="font-semibold">

              Most Active Category

            </h3>

            <p className="mt-3 text-cyan-400 text-2xl">

              {reports.length
                ? latestReport(reports)?.category
                : "-"}

            </p>

          </div>

          <div>

            <h3 className="font-semibold">

              Latest Report

            </h3>

            <p className="mt-3 text-cyan-400 text-2xl">

              {report
                ? report.title
                : "No Reports"}

            </p>

          </div>

          <div>

            <h3 className="font-semibold">

              System Status

            </h3>

            <p className="mt-3 text-green-400 text-2xl">

              Operational

            </p>

          </div>

        </div>

      </section>

    </div>

  );

}