import ReportCard from "./ReportCard";
import EmptyReports from "./EmptyReports";
import ReportSkeleton from "./ReportSkeleton";

export default function ReportsGrid({

  reports,

  isLoading,

  onView,

  onDownload,

  onDelete,

}) {

  if (isLoading) {

    return (

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 6 }).map((_, index) => (

          <ReportSkeleton key={index} />

        ))}

      </div>

    );

  }

  if (!reports.length) {

    return (

      <EmptyReports />

    );

  }

  return (

    <div
      className="
      grid
      gap-6

      md:grid-cols-2

      xl:grid-cols-3
    "
    >

      {reports.map((report) => (

        <ReportCard

          key={report._id}

          report={report}

          onView={onView}

          onDownload={onDownload}

          onDelete={onDelete}

        />

      ))}

    </div>

  );

}