const Report = require("../models/Report");

const {
    generateReport,
} = require("../services/reportService");

const {
    generatePDF,
} = require("../services/pdfService");

const {
    generateExcel,
} = require("../services/excelService");

const {
    generatePresentation,
} = require("../services/pptService");


/* =========================================================
   CREATE / GENERATE REPORT
========================================================= */

exports.createReport = async (req, res) => {

    try {

        const {
            title,
            category,
            description,
        } = req.body;


        /* ===============================
           VALIDATION
        =============================== */

        if (!title || !title.trim()) {

            return res.status(400).json({
                success: false,
                message: "Report title is required.",
            });

        }


        if (!category) {

            return res.status(400).json({
                success: false,
                message: "Report category is required.",
            });

        }


        if (!description || !description.trim()) {

            return res.status(400).json({
                success: false,
                message: "Report description is required.",
            });

        }


        /* ===============================
           GENERATE FULL REPORT
        =============================== */

        const report = await generateReport(
            {
                title: title.trim(),
                category,
                description: description.trim(),
            },
            req.user.id
        );


        /* ===============================
           RESPONSE
        =============================== */

        return res.status(201).json({

            success: true,

            message: "Report generated successfully.",

            report,

        });

    }

    catch (error) {

        console.error(
            "CREATE REPORT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to generate report.",

        });

    }

};


/* =========================================================
   GET ALL REPORTS
========================================================= */

exports.getReports = async (req, res) => {

    try {

        const reports =
            await Report.find()
                .populate(
                    "createdBy",
                    "name email role"
                )
                .sort({
                    createdAt: -1,
                });


        return res.status(200).json({

            success: true,

            reportCount:
                reports.length,

            reports,

        });

    }

    catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch reports.",

        });

    }

};


/* =========================================================
   GET SINGLE REPORT
========================================================= */

exports.getReportById = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            )
            .populate(
                "createdBy",
                "name email role"
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        return res.status(200).json({

            success: true,

            report,

        });

    }

    catch (error) {

        console.error(
            "GET REPORT BY ID ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch report.",

        });

    }

};


/* =========================================================
   DOWNLOAD PDF
========================================================= */

exports.downloadPDF = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        const pdfBuffer =
            await generatePDF(
                report
            );


        res.setHeader(
            "Content-Type",
            "application/pdf"
        );


        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${report.title}.pdf"`
        );


        return res.send(
            pdfBuffer
        );

    }

    catch (error) {

        console.error(
            "PDF DOWNLOAD ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to generate PDF.",

        });

    }

};


/* =========================================================
   DOWNLOAD EXCEL
========================================================= */

exports.downloadExcel = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        const excelBuffer =
            await generateExcel(
                report
            );


        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );


        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${report.title}.xlsx"`
        );


        return res.send(
            excelBuffer
        );

    }

    catch (error) {

        console.error(
            "EXCEL DOWNLOAD ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to generate Excel file.",

        });

    }

};


/* =========================================================
   DOWNLOAD POWERPOINT
========================================================= */

exports.downloadPresentation = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        const pptBuffer =
            await generatePresentation(
                report
            );


        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        );


        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${report.title}.pptx"`
        );


        return res.send(
            pptBuffer
        );

    }

    catch (error) {

        console.error(
            "PPT DOWNLOAD ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to generate presentation.",

        });

    }

};


/* =========================================================
   DELETE REPORT
========================================================= */

exports.deleteReport = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        await Report.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Report deleted successfully.",

        });

    }

    catch (error) {

        console.error(
            "DELETE REPORT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to delete report.",

        });

    }

};


/* =========================================================
   ARCHIVE REPORT
========================================================= */

exports.archiveReport = async (
    req,
    res
) => {

    try {

        const report =
            await Report.findById(
                req.params.id
            );


        if (!report) {

            return res.status(404).json({

                success: false,

                message:
                    "Report not found.",

            });

        }


        report.status =
            "Archived";


        await report.save();


        return res.status(200).json({

            success: true,

            message:
                "Report archived successfully.",

            report,

        });

    }

    catch (error) {

        console.error(
            "ARCHIVE REPORT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to archive report.",

        });

    }

};