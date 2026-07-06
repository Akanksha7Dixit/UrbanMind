import {
    useParams,
    useNavigate,
} from "react-router-dom";

import { toast } from "react-hot-toast";

import {
    downloadPDF,
    downloadExcel,
    downloadPresentation,
} from "../services/reportService";

import {
    useDeleteReport,
    useArchiveReport,
} from "../hooks/useReportMutations";

import ReportHeader from "../components/ReportHeader";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ReportStatistics from "../components/ReportStatistics";
import InfrastructureSnapshot from "../components/InfrastructureSnapshot";
import IssueSnapshot from "../components/IssueSnapshot";
import RecommendationList from "../components/RecommendationList";
import ReportCharts from "../components/ReportCharts";
import ActionBar from "../components/ActionBar";

import ReportSkeleton from "../components/ReportSkeleton";
import EmptyReports from "../components/EmptyReports";

import { useReport } from "../hooks/useReport";

export default function ReportViewerPage() {

    const { id } = useParams();

    const navigate = useNavigate();

const deleteMutation =
    useDeleteReport();

const archiveMutation =
    useArchiveReport();

    const {

        data,

        isLoading,

        error,

    } = useReport(id);

    if (isLoading) {

        return <ReportSkeleton />;

    }

    if (error || !data?.report) {

        return (

            <EmptyReports

                title="Unable to load report"

                description="The requested report could not be loaded."

            />

        );

    }

    const report = data.report;

    /* ===========================
       Action Handlers
    =========================== */

    const handleDownloadPDF = async () => {

    try {

        const blob = await downloadPDF(id);

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${report.title}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success("PDF downloaded.");

    }

    catch {

        toast.error(
            "Unable to download PDF."
        );

    }

};

    const handleDownloadExcel = async () => {

    try {

        const blob =
            await downloadExcel(id);

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${report.title}.xlsx`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success("Excel downloaded.");

    }

    catch {

        toast.error(
            "Unable to download Excel."
        );

    }

};

    const handleDownloadPPT = async () => {

    try {

        const blob =
            await downloadPresentation(id);

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${report.title}.pptx`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success(
            "Presentation downloaded."
        );

    }

    catch {

        toast.error(
            "Unable to download presentation."
        );

    }

};

    const handlePrint = () => {

    window.print();

};

    const handleShare = async () => {

    try {

        await navigator.clipboard.writeText(

            window.location.href

        );

        toast.success(

            "Link copied."

        );

    }

    catch {

        toast.error(

            "Unable to copy link."

        );

    }

};

   const handleArchive = async () => {

    try {

        await archiveMutation.mutateAsync(id);

        toast.success(

            "Report archived."

        );

    }

    catch {

        toast.error(

            "Archive failed."

        );

    }

};
const handleDelete = async () => {

    if (

        !window.confirm(

            "Delete this report?"

        )

    ) return;

    try {

        await deleteMutation.mutateAsync(id);

        toast.success(

            "Report deleted."

        );

        navigate("/reports");

    }

    catch {

        toast.error(

            "Delete failed."

        );

    }

};

        return (

        <div className="space-y-8 p-8">

            {/* ================= HEADER ================= */}

            <ReportHeader

                report={report}

                onDownload={handleDownloadPDF}

                onShare={handleShare}

                onPrint={handlePrint}

                onArchive={handleArchive}

                onDelete={handleDelete}

            />

            {/* ================= AI SUMMARY ================= */}

            <ExecutiveSummary

                report={report}

            />

            {/* ================= KPI ================= */}

            <ReportStatistics

                report={report}

            />

            {/* ================= CHARTS ================= */}

            <ReportCharts

                report={report}

            />

            {/* ================= INFRASTRUCTURE ================= */}

            <InfrastructureSnapshot

                report={report}

            />

            {/* ================= ISSUES ================= */}

            <IssueSnapshot

                report={report}

            />

            {/* ================= AI RECOMMENDATIONS ================= */}

            <RecommendationList

                report={report}

            />

            {/* ================= ACTIONS ================= */}

            <ActionBar

                report={report}

                onDownloadPDF={handleDownloadPDF}

                onDownloadExcel={handleDownloadExcel}

                onDownloadPPT={handleDownloadPPT}

                onPrint={handlePrint}

                onShare={handleShare}

                onArchive={handleArchive}

                onDelete={handleDelete}

            />

        </div>

    );

}