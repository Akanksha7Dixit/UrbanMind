import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FileText,
    FileCheck2,
    Download,
    Share2,
    Plus,
    Search,
    Filter,
    Clock3,
    FileClock,
    Archive,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import ReportsGrid from "../components/ReportsGrid";

import CreateReportModal from "../components/CreateReportModal";

import ExportCard from "../components/ExportCard";

import {
    useReports,
} from "../hooks/useReports";

import {
    useCreateReport,
    useDeleteReport,
} from "../hooks/useReportMutations";

import {
    downloadPDF,
    downloadExcel,
    downloadPresentation,
} from "../services/reportService";

import {
    latestReport,
} from "../utils/reportHelpers";


export default function ReportsPage() {

    const navigate = useNavigate();


    /* =========================================================
       REPORT DATA
    ========================================================= */

    const {
        data,
        isLoading,
        error,
    } = useReports();


    const createMutation =
        useCreateReport();


    const deleteMutation =
        useDeleteReport();


    const reports =
        data?.reports || [];


    /* =========================================================
       STATE
    ========================================================= */

    const [
        isCreateModalOpen,
        setIsCreateModalOpen,
    ] = useState(false);


    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState("Health");


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        categoryFilter,
        setCategoryFilter,
    ] = useState("All");


    const [
        statusFilter,
        setStatusFilter,
    ] = useState("All");


    /*
       This is the important state for Export Center.

       It stores the ID of the report selected
       in the Export Center dropdown.
    */

    const [
        selectedExportReportId,
        setSelectedExportReportId,
    ] = useState("");


    /* =========================================================
       LATEST REPORT
    ========================================================= */

    const latest =
        latestReport(reports);


    /* =========================================================
       AUTOMATICALLY SELECT LATEST REPORT
    ========================================================= */

    useEffect(() => {

        if (
            reports.length > 0 &&
            !selectedExportReportId
        ) {

            const latestReportData =
                latestReport(reports);

            if (latestReportData?._id) {

                setSelectedExportReportId(
                    latestReportData._id
                );

            }

        }

    }, [
        reports,
        selectedExportReportId,
    ]);


    /* =========================================================
       SELECTED EXPORT REPORT
    ========================================================= */

    const selectedExportReport =
        reports.find(
            (report) =>
                report._id ===
                selectedExportReportId
        );


    /* =========================================================
       FILTER REPORTS
    ========================================================= */

    const filteredReports =
        useMemo(() => {

            return reports.filter(
                (report) => {

                    const searchText =
                        search
                            .trim()
                            .toLowerCase();


                    const matchesSearch =
                        !searchText ||
                        report.title
                            ?.toLowerCase()
                            .includes(
                                searchText
                            ) ||
                        report.description
                            ?.toLowerCase()
                            .includes(
                                searchText
                            ) ||
                        report.category
                            ?.toLowerCase()
                            .includes(
                                searchText
                            );


                    const matchesCategory =
                        categoryFilter === "All" ||
                        report.category ===
                            categoryFilter;


                    const matchesStatus =
                        statusFilter === "All" ||
                        report.status ===
                            statusFilter;


                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesStatus
                    );

                }
            );

        }, [
            reports,
            search,
            categoryFilter,
            statusFilter,
        ]);


    /* =========================================================
       STATISTICS
    ========================================================= */

    const statistics =
        useMemo(() => {

            return {

                total:
                    reports.length,

                generated:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Generated"
                    ).length,

                draft:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Draft"
                    ).length,

                archived:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Archived"
                    ).length,

            };

        }, [reports]);


    /* =========================================================
       OPEN CREATE MODAL
    ========================================================= */

    const openCreateModal = (
        category = "Health"
    ) => {

        setSelectedCategory(
            category
        );

        setIsCreateModalOpen(
            true
        );

    };


    /* =========================================================
       CREATE REPORT
    ========================================================= */

    const handleCreateReport =
        async (form) => {

            try {

                console.log(
                    "PAGE RECEIVED:",
                    form
                );


                const result =
                    await createMutation
                        .mutateAsync(
                            form
                        );


                console.log(
                    "REPORT CREATED:",
                    result
                );


                toast.success(
                    "Report generated successfully."
                );


                setIsCreateModalOpen(
                    false
                );


                /*
                   After a new report is created,
                   automatically select it in
                   Export Center.
                */

                if (
                    result?.report?._id
                ) {

                    setSelectedExportReportId(
                        result.report._id
                    );

                }

            } catch (error) {

                console.error(
                    "CREATE REPORT ERROR:",
                    error
                );


                const message =
                    error?.response?.data
                        ?.message ||
                    error?.message ||
                    "Unable to generate report.";


                toast.error(
                    message
                );

            }

        };


    /* =========================================================
       VIEW REPORT
    ========================================================= */

    const handleView =
        (report) => {

            if (!report?._id) {

                toast.error(
                    "Invalid report."
                );

                return;

            }


            navigate(
                `/reports/${report._id}`
            );

        };


    /* =========================================================
       SAVE DOWNLOADED FILE
    ========================================================= */

    const saveBlob = (
        blob,
        filename
    ) => {

        if (!blob) {

            throw new Error(
                "No file received from server."
            );

        }


        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            filename;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        window.URL.revokeObjectURL(
            url
        );

    };


    /* =========================================================
       DOWNLOAD PDF
    ========================================================= */

    const handleDownloadPDF =
        async (report) => {

            if (!report?._id) {

                toast.error(
                    "Please select a report first."
                );

                return;

            }


            try {

                console.log(
                    "PDF Export:",
                    report._id
                );


                const blob =
                    await downloadPDF(
                        report._id
                    );


                saveBlob(
                    blob,
                    `${report.title}.pdf`
                );


                toast.success(
                    "PDF downloaded successfully."
                );

            } catch (error) {

                console.error(
                    "PDF DOWNLOAD ERROR:",
                    error
                );


                const message =
                    error?.response?.data
                        ?.message ||
                    "Unable to download PDF.";


                toast.error(
                    message
                );

            }

        };


    /* =========================================================
       DOWNLOAD EXCEL
    ========================================================= */

    const handleDownloadExcel =
        async (report) => {

            if (!report?._id) {

                toast.error(
                    "Please select a report first."
                );

                return;

            }


            try {

                console.log(
                    "Excel Export:",
                    report._id
                );


                const blob =
                    await downloadExcel(
                        report._id
                    );


                saveBlob(
                    blob,
                    `${report.title}.xlsx`
                );


                toast.success(
                    "Excel downloaded successfully."
                );

            } catch (error) {

                console.error(
                    "EXCEL DOWNLOAD ERROR:",
                    error
                );


                const message =
                    error?.response?.data
                        ?.message ||
                    "Unable to download Excel.";


                toast.error(
                    message
                );

            }

        };


    /* =========================================================
       DOWNLOAD POWERPOINT
    ========================================================= */

    const handleDownloadPPT =
        async (report) => {

            if (!report?._id) {

                toast.error(
                    "Please select a report first."
                );

                return;

            }


            try {

                console.log(
                    "PowerPoint Export:",
                    report._id
                );


                const blob =
                    await downloadPresentation(
                        report._id
                    );


                saveBlob(
                    blob,
                    `${report.title}.pptx`
                );


                toast.success(
                    "PowerPoint downloaded successfully."
                );

            } catch (error) {

                console.error(
                    "PPT DOWNLOAD ERROR:",
                    error
                );


                const message =
                    error?.response?.data
                        ?.message ||
                    "Unable to download PowerPoint.";


                toast.error(
                    message
                );

            }

        };


    /* =========================================================
       REPORT CARD DOWNLOAD
    ========================================================= */

    const handleDownload =
        async (report) => {

            await handleDownloadPDF(
                report
            );

        };


    /* =========================================================
       DELETE REPORT
    ========================================================= */

    const handleDelete =
        async (report) => {

            if (!report?._id) {

                toast.error(
                    "Invalid report."
                );

                return;

            }


            const confirmed =
                window.confirm(
                    `Are you sure you want to delete "${report.title}"?`
                );


            if (!confirmed) {
                return;
            }


            try {

                await deleteMutation
                    .mutateAsync(
                        report._id
                    );


                /*
                   If deleted report was selected
                   for export, clear the selection.
                */

                if (
                    selectedExportReportId ===
                    report._id
                ) {

                    setSelectedExportReportId(
                        ""
                    );

                }


                toast.success(
                    "Report deleted successfully."
                );

            } catch (error) {

                console.error(
                    "DELETE REPORT ERROR:",
                    error
                );


                const message =
                    error?.response?.data
                        ?.message ||
                    "Unable to delete report.";


                toast.error(
                    message
                );

            }

        };


    /* =========================================================
       DOWNLOAD LATEST REPORT
    ========================================================= */

    const handleDownloadLatest =
        async () => {

            if (!latest) {

                toast.error(
                    "No reports available."
                );

                return;

            }


            await handleDownloadPDF(
                latest
            );

        };


    /* =========================================================
       SHARE REPORT
    ========================================================= */

    const handleShare =
        async () => {

            if (!latest?._id) {

                toast.error(
                    "No report available to share."
                );

                return;

            }


            try {

                const url =
                    `${window.location.origin}/reports/${latest._id}`;


                await navigator.clipboard
                    .writeText(
                        url
                    );


                toast.success(
                    "Report link copied."
                );

            } catch (error) {

                console.error(
                    "SHARE ERROR:",
                    error
                );


                toast.error(
                    "Unable to copy report link."
                );

            }

        };


    /* =========================================================
       ERROR STATE
    ========================================================= */

    if (error) {

        return (

            <div className="p-8">

                <div
                    className="
                    rounded-3xl
                    border
                    border-red-500/20
                    bg-red-500/5
                    p-8
                    text-center
                    "
                >

                    <h2
                        className="
                        text-xl
                        font-semibold
                        text-red-400
                        "
                    >
                        Unable to load reports
                    </h2>


                    <p
                        className="
                        mt-2
                        text-slate-400
                        "
                    >
                        Please refresh the page and
                        try again.
                    </p>

                </div>

            </div>

        );

    }


    /* =========================================================
       MAIN UI
    ========================================================= */

    return (

        <div
            className="
            min-h-screen
            space-y-8
            p-6
            md:p-8
            "
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <section
                className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-500/20
                bg-gradient-to-br
                from-cyan-950/70
                via-slate-950
                to-indigo-950/60
                p-8
                "
            >

                <div
                    className="
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                    "
                />


                <div
                    className="
                    relative
                    flex
                    flex-col
                    gap-8
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    "
                >

                    <div>

                        <div
                            className="
                            flex
                            items-center
                            gap-3
                            text-cyan-400
                            "
                        >

                            <FileCheck2
                                size={24}
                            />

                            <span
                                className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                "
                            >
                                Executive Intelligence
                            </span>

                        </div>


                        <h1
                            className="
                            mt-4
                            text-4xl
                            font-bold
                            tracking-tight
                            text-white
                            md:text-5xl
                            "
                        >
                            Urban Health Report
                        </h1>


                        <p
                            className="
                            mt-4
                            max-w-3xl
                            text-base
                            leading-7
                            text-slate-400
                            "
                        >
                            Generate executive planning reports,
                            infrastructure assessments, analytics
                            summaries and AI-powered recommendations
                            for your city.
                        </p>


                        <div
                            className="
                            mt-6
                            flex
                            flex-wrap
                            gap-3
                            "
                        >

                            <span
                                className="
                                rounded-full
                                bg-cyan-500/10
                                px-4
                                py-2
                                text-sm
                                text-cyan-400
                                "
                            >
                                Total Reports:{" "}
                                {statistics.total}
                            </span>


                            <span
                                className="
                                rounded-full
                                bg-emerald-500/10
                                px-4
                                py-2
                                text-sm
                                text-emerald-400
                                "
                            >
                                Generated
                            </span>

                        </div>

                    </div>


                    {/* HEADER BUTTONS */}

                    <div
                        className="
                        flex
                        w-full
                        flex-col
                        gap-3
                        xl:w-64
                        "
                    >

                        <button
                            onClick={() =>
                                openCreateModal(
                                    "Health"
                                )
                            }
                            disabled={
                                createMutation.isPending
                            }
                            className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            bg-cyan-500
                            px-6
                            py-4
                            font-semibold
                            text-slate-950
                            transition
                            hover:bg-cyan-400
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            "
                        >

                            <Plus size={20} />

                            {createMutation.isPending
                                ? "Generating..."
                                : "Generate Report"}

                        </button>


                        <button
                            onClick={
                                handleDownloadLatest
                            }
                            disabled={!latest}
                            className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            border
                            border-white/10
                            px-6
                            py-4
                            font-medium
                            text-white
                            transition
                            hover:bg-white/5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            "
                        >

                            <Download
                                size={20}
                            />

                            Download Latest

                        </button>


                        <button
                            onClick={
                                handleShare
                            }
                            disabled={!latest}
                            className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            border
                            border-white/10
                            px-6
                            py-4
                            font-medium
                            text-white
                            transition
                            hover:bg-white/5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            "
                        >

                            <Share2
                                size={20}
                            />

                            Share Report

                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                SEARCH + FILTER
            ===================================================== */}

            <section
                className="
                rounded-3xl
                border
                border-white/10
                bg-slate-900/40
                p-5
                backdrop-blur-xl
                "
            >

                <div
                    className="
                    flex
                    flex-col
                    gap-4
                    xl:flex-row
                    "
                >

                    <div
                        className="
                        relative
                        flex-1
                        "
                    >

                        <Search
                            size={20}
                            className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                            "
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
                            w-full
                            rounded-2xl
                            border
                            border-white/10
                            bg-slate-950/60
                            py-4
                            pl-12
                            pr-4
                            text-white
                            outline-none
                            placeholder:text-slate-500
                            focus:border-cyan-500/50
                            "
                        />

                    </div>


                    <div
                        className="
                        hidden
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/10
                        px-5
                        text-slate-400
                        xl:flex
                        "
                    >

                        <Filter size={20} />

                    </div>


                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                        className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-950/60
                        px-5
                        py-4
                        text-white
                        outline-none
                        focus:border-cyan-500/50
                        "
                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Health">
                            Health
                        </option>

                        <option value="Infrastructure">
                            Infrastructure
                        </option>

                        <option value="Environment">
                            Environment
                        </option>

                        <option value="Simulation">
                            Simulation
                        </option>

                        <option value="Analytics">
                            Analytics
                        </option>

                    </select>


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-950/60
                        px-5
                        py-4
                        text-white
                        outline-none
                        focus:border-cyan-500/50
                        "
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Generated">
                            Generated
                        </option>

                        <option value="Draft">
                            Draft
                        </option>

                        <option value="Archived">
                            Archived
                        </option>

                    </select>


                    <button
                        onClick={() =>
                            openCreateModal(
                                "Health"
                            )
                        }
                        className="
                        flex
                        items-center
                        justify-center
                        gap-2
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

                        Generate

                    </button>

                </div>

            </section>


            {/* =====================================================
                GENERATED REPORTS
            ===================================================== */}

            <section>

                <div
                    className="
                    mb-6
                    flex
                    flex-col
                    gap-2
                    md:flex-row
                    md:items-end
                    md:justify-between
                    "
                >

                    <div>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-white
                            "
                        >
                            Generated Reports
                        </h2>


                        <p
                            className="
                            mt-2
                            text-slate-400
                            "
                        >
                            {filteredReports.length}{" "}
                            report
                            {filteredReports.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
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


            {/* =====================================================
                REPORT TEMPLATES
            ===================================================== */}

            <section>

                <div className="mb-6">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        text-white
                        "
                    >
                        Report Templates
                    </h2>


                    <p
                        className="
                        mt-2
                        text-slate-400
                        "
                    >
                        Quickly generate reports using
                        predefined templates.
                    </p>

                </div>


                <div
                    className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                    "
                >

                    <TemplateCard
                        title="Urban Health"
                        description="Comprehensive health and planning report."
                        icon={
                            <FileText
                                size={28}
                            />
                        }
                        onClick={() =>
                            openCreateModal(
                                "Health"
                            )
                        }
                    />


                    <TemplateCard
                        title="Infrastructure"
                        description="Infrastructure condition assessment."
                        icon={
                            <FileCheck2
                                size={28}
                            />
                        }
                        onClick={() =>
                            openCreateModal(
                                "Infrastructure"
                            )
                        }
                    />


                    <TemplateCard
                        title="Environment"
                        description="Environmental sustainability report."
                        icon={
                            <FileText
                                size={28}
                            />
                        }
                        onClick={() =>
                            openCreateModal(
                                "Environment"
                            )
                        }
                    />


                    <TemplateCard
                        title="Simulation"
                        description="Scenario comparison report."
                        icon={
                            <FileText
                                size={28}
                            />
                        }
                        onClick={() =>
                            openCreateModal(
                                "Simulation"
                            )
                        }
                    />

                </div>

            </section>


            {/* =====================================================
                EXPORT CENTER
            ===================================================== */}

            <section>

                <div className="mb-6">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        text-white
                        "
                    >
                        Export Center
                    </h2>


                    <p
                        className="
                        mt-2
                        text-slate-400
                        "
                    >
                        Select a report and export it
                        in your preferred format.
                    </p>

                </div>


                {/* REPORT SELECTOR */}

                <div
                    className="
                    mb-6
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900/40
                    p-5
                    backdrop-blur-xl
                    "
                >

                    <label
                        className="
                        mb-3
                        block
                        text-sm
                        font-medium
                        text-slate-400
                        "
                    >
                        Select Report to Export
                    </label>


                    <select
                        value={
                            selectedExportReportId
                        }
                        onChange={(e) =>
                            setSelectedExportReportId(
                                e.target.value
                            )
                        }
                        disabled={
                            reports.length === 0
                        }
                        className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-950
                        px-5
                        py-4
                        text-white
                        outline-none
                        focus:border-cyan-500/50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        "
                    >

                        {reports.length === 0 ? (

                            <option value="">
                                No reports available
                            </option>

                        ) : (

                            reports.map(
                                (report) => (

                                    <option
                                        key={
                                            report._id
                                        }
                                        value={
                                            report._id
                                        }
                                    >
                                        {report.title}{" "}
                                        —{" "}
                                        {report.category}{" "}
                                        —{" "}
                                        {report.status}
                                    </option>

                                )
                            )

                        )}

                    </select>


                    {/* SELECTED REPORT INFO */}

                    {selectedExportReport && (

                        <div
                            className="
                            mt-4
                            rounded-2xl
                            border
                            border-cyan-500/10
                            bg-cyan-500/5
                            p-4
                            "
                        >

                            <div
                                className="
                                flex
                                flex-col
                                gap-2
                                md:flex-row
                                md:items-center
                                md:justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-slate-500
                                        "
                                    >
                                        Selected Report
                                    </p>


                                    <p
                                        className="
                                        mt-1
                                        font-semibold
                                        text-white
                                        "
                                    >
                                        {
                                            selectedExportReport.title
                                        }
                                    </p>

                                </div>


                                <div
                                    className="
                                    flex
                                    gap-2
                                    "
                                >

                                    <span
                                        className="
                                        rounded-full
                                        bg-cyan-500/10
                                        px-3
                                        py-1
                                        text-xs
                                        text-cyan-400
                                        "
                                    >
                                        {
                                            selectedExportReport.category
                                        }
                                    </span>


                                    <span
                                        className="
                                        rounded-full
                                        bg-emerald-500/10
                                        px-3
                                        py-1
                                        text-xs
                                        text-emerald-400
                                        "
                                    >
                                        {
                                            selectedExportReport.status
                                        }
                                    </span>

                                </div>

                            </div>

                        </div>

                    )}

                </div>


                {/* EXPORT CARDS */}

                <div
                    className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-3
                    "
                >

                    <ExportCard
                        title="PDF Export"
                        description="Professional printable report."
                        icon="pdf"
                        color="
                        bg-red-500/20
                        text-red-400
                        "
                        onClick={() => {

                            if (
                                !selectedExportReport
                            ) {

                                toast.error(
                                    "Please select a report first."
                                );

                                return;

                            }


                            handleDownloadPDF(
                                selectedExportReport
                            );

                        }}
                    />


                    <ExportCard
                        title="Excel Export"
                        description="Spreadsheet with analytics."
                        icon="excel"
                        color="
                        bg-green-500/20
                        text-green-400
                        "
                        onClick={() => {

                            if (
                                !selectedExportReport
                            ) {

                                toast.error(
                                    "Please select a report first."
                                );

                                return;

                            }


                            handleDownloadExcel(
                                selectedExportReport
                            );

                        }}
                    />


                    <ExportCard
                        title="Presentation"
                        description="PowerPoint executive briefing."
                        icon="ppt"
                        color="
                        bg-orange-500/20
                        text-orange-400
                        "
                        onClick={() => {

                            if (
                                !selectedExportReport
                            ) {

                                toast.error(
                                    "Please select a report first."
                                );

                                return;

                            }


                            handleDownloadPPT(
                                selectedExportReport
                            );

                        }}
                    />

                </div>

            </section>


            {/* =====================================================
                RECENT ACTIVITY
            ===================================================== */}

            <section>

                <div className="mb-6">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        text-white
                        "
                    >
                        Recent Activity
                    </h2>

                </div>


                <div
                    className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900/40
                    "
                >

                    {reports.length === 0 ? (

                        <div
                            className="
                            p-10
                            text-center
                            text-slate-400
                            "
                        >
                            No recent activity.
                        </div>

                    ) : (

                        reports
                            .slice(0, 5)
                            .map(
                                (report) => (

                                    <div
                                        key={
                                            report._id
                                        }
                                        className="
                                        flex
                                        flex-col
                                        gap-4
                                        border-b
                                        border-white/5
                                        p-6
                                        last:border-b-0
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                        "
                                    >

                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-4
                                            "
                                        >

                                            <div
                                                className="
                                                rounded-2xl
                                                bg-cyan-500/10
                                                p-3
                                                "
                                            >

                                                <Clock3
                                                    size={22}
                                                    className="
                                                    text-cyan-400
                                                    "
                                                />

                                            </div>


                                            <div>

                                                <h3
                                                    className="
                                                    font-semibold
                                                    text-white
                                                    "
                                                >
                                                    {
                                                        report.title
                                                    }
                                                </h3>


                                                <p
                                                    className="
                                                    mt-1
                                                    text-sm
                                                    text-slate-500
                                                    "
                                                >
                                                    {report.createdAt
                                                        ? new Date(
                                                            report.createdAt
                                                        ).toLocaleString()
                                                        : "Recently"}
                                                </p>

                                            </div>

                                        </div>


                                        <span
                                            className="
                                            w-fit
                                            rounded-full
                                            bg-cyan-500/10
                                            px-4
                                            py-2
                                            text-sm
                                            text-cyan-400
                                            "
                                        >
                                            {
                                                report.status
                                            }
                                        </span>

                                    </div>

                                )
                            )

                    )}

                </div>

            </section>


            {/* =====================================================
                REPORT STATISTICS
            ===================================================== */}

            <section>

                <div className="mb-6">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        text-white
                        "
                    >
                        Report Statistics
                    </h2>


                    <p
                        className="
                        mt-2
                        text-slate-400
                        "
                    >
                        Overall reporting performance.
                    </p>

                </div>


                <div
                    className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                    "
                >

                    <StatCard
                        title="Total Reports"
                        value={
                            statistics.total
                        }
                        icon={
                            <FileText
                                size={22}
                            />
                        }
                        valueClass="
                        text-cyan-400
                        "
                    />


                    <StatCard
                        title="Generated"
                        value={
                            statistics.generated
                        }
                        icon={
                            <FileCheck2
                                size={22}
                            />
                        }
                        valueClass="
                        text-emerald-400
                        "
                    />


                    <StatCard
                        title="Draft"
                        value={
                            statistics.draft
                        }
                        icon={
                            <FileClock
                                size={22}
                            />
                        }
                        valueClass="
                        text-yellow-400
                        "
                    />


                    <StatCard
                        title="Archived"
                        value={
                            statistics.archived
                        }
                        icon={
                            <Archive
                                size={22}
                            />
                        }
                        valueClass="
                        text-red-400
                        "
                    />

                </div>

            </section>


            {/* =====================================================
                URBANMIND INSIGHTS
            ===================================================== */}

            <section
                className="
                rounded-3xl
                border
                border-cyan-500/20
                bg-cyan-950/20
                p-8
                "
            >

                <h2
                    className="
                    text-3xl
                    font-bold
                    text-white
                    "
                >
                    UrbanMind Insights
                </h2>


                <div
                    className="
                    mt-8
                    grid
                    gap-8
                    md:grid-cols-3
                    "
                >

                    <div>

                        <p
                            className="
                            text-sm
                            font-semibold
                            text-slate-400
                            "
                        >
                            Most Active Category
                        </p>


                        <p
                            className="
                            mt-3
                            text-2xl
                            font-semibold
                            text-cyan-400
                            "
                        >
                            {
                                getMostActiveCategory(
                                    reports
                                )
                            }
                        </p>

                    </div>


                    <div>

                        <p
                            className="
                            text-sm
                            font-semibold
                            text-slate-400
                            "
                        >
                            Latest Report
                        </p>


                        <p
                            className="
                            mt-3
                            text-2xl
                            font-semibold
                            text-cyan-400
                            "
                        >
                            {
                                latest?.title ||
                                "No reports yet"
                            }
                        </p>

                    </div>


                    <div>

                        <p
                            className="
                            text-sm
                            font-semibold
                            text-slate-400
                            "
                        >
                            System Status
                        </p>


                        <p
                            className="
                            mt-3
                            text-2xl
                            font-semibold
                            text-emerald-400
                            "
                        >
                            Operational
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CREATE REPORT MODAL
            ===================================================== */}

            <CreateReportModal
                open={
                    isCreateModalOpen
                }
                onClose={() =>
                    setIsCreateModalOpen(
                        false
                    )
                }
                onSubmit={
                    handleCreateReport
                }
                initialCategory={
                    selectedCategory
                }
            />

        </div>

    );

}


/* ================================================================
   TEMPLATE CARD
================================================================ */

function TemplateCard({
    title,
    description,
    icon,
    onClick,
}) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900/40
            p-6
            backdrop-blur-xl
            transition
            duration-300
            hover:-translate-y-1
            hover:border-cyan-500/30
            "
        >

            <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-cyan-500/10
                text-cyan-400
                "
            >
                {icon}
            </div>


            <h3
                className="
                mt-6
                text-xl
                font-bold
                text-white
                "
            >
                {title}
            </h3>


            <p
                className="
                mt-4
                min-h-[56px]
                leading-7
                text-slate-400
                "
            >
                {description}
            </p>


            <button
                onClick={onClick}
                className="
                mt-6
                rounded-xl
                bg-cyan-500
                px-6
                py-3
                font-semibold
                text-slate-950
                transition
                hover:bg-cyan-400
                "
            >
                Use Template
            </button>

        </div>

    );

}


/* ================================================================
   STAT CARD
================================================================ */

function StatCard({
    title,
    value,
    icon,
    valueClass,
}) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900/40
            p-6
            "
        >

            <div
                className="
                flex
                items-center
                justify-between
                "
            >

                <span
                    className="
                    text-slate-400
                    "
                >
                    {title}
                </span>


                <span
                    className="
                    text-slate-500
                    "
                >
                    {icon}
                </span>

            </div>


            <p
                className={`
                mt-6
                text-4xl
                font-bold
                ${valueClass}
                `}
            >
                {value}
            </p>

        </div>

    );

}


/* ================================================================
   MOST ACTIVE CATEGORY
================================================================ */

function getMostActiveCategory(
    reports
) {

    if (!reports.length) {
        return "None";
    }


    const counts = {};


    reports.forEach(
        (report) => {

            const category =
                report.category ||
                "Other";


            counts[category] =
                (
                    counts[category] ||
                    0
                ) + 1;

        }
    );


    return Object.entries(
        counts
    ).sort(
        (a, b) =>
            b[1] - a[1]
    )[0][0];

}