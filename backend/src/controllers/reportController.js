const Report = require("../models/Report");

const {
    generatePDF,
} = require("../services/pdfService");

const {
    generateExcel,
} = require("../services/excelService");

const {
    generatePresentation,
} = require("../services/pptService");


exports.createReport = async (req, res) => {
    try {

        const {
            title,
            category,
            description,
        } = req.body;

        const report = await Report.create({

            title,

            category,

            description,

            createdBy: req.user.id,

            status: "Generated",

            summary: `${title} generated successfully.`

        });

        res.status(201).json({

            success: true,

            report

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to create report."

        });

    }
};

/* =========================================
   GET ALL REPORTS
========================================= */

exports.getReports = async (req, res) => {

    try {

        const reports = await Report.find()

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            reportCount: reports.length,

            reports,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch reports.",

        });

    }

};

/* =========================================
   GET SINGLE REPORT
========================================= */

exports.getReportById = async (req, res) => {

    try {

        const report = await Report.findById(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found.",

            });

        }

        res.status(200).json({

            success: true,

            report,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch report.",

        });

    }

};

/* =========================================
   DOWNLOAD PDF
========================================= */

exports.downloadPDF = async (req, res) => {

    try {

        const report = await Report.findById(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found.",

            });

        }

        const pdfBuffer = await generatePDF(

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

        res.send(pdfBuffer);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to generate PDF.",

        });

    }

};

/* =========================================
   DOWNLOAD EXCEL
========================================= */

exports.downloadExcel = async (

    req,

    res

) => {

    try {

        const report = await Report.findById(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found.",

            });

        }

        const excelBuffer =

            await generateExcel(report);

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${report.title}.xlsx"`

        );

        res.send(excelBuffer);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to generate Excel file.",

        });

    }

};

/* =========================================
   DOWNLOAD POWERPOINT
========================================= */

exports.downloadPresentation = async (

    req,

    res

) => {

    try {

        const report = await Report.findById(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found.",

            });

        }

        const pptBuffer =

            await generatePresentation(report);

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.presentationml.presentation"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${report.title}.pptx"`

        );

        res.send(pptBuffer);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to generate presentation.",

        });

    }

};

/* =========================================
   DELETE REPORT
========================================= */

exports.deleteReport = async (req, res) => {

    try {

        const report = await Report.findByIdAndDelete(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        res.json({

            success: true,

            message: "Report deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* =========================================
   ARCHIVE REPORT
========================================= */

exports.archiveReport = async (req, res) => {

    try {

        const report = await Report.findById(

            req.params.id

        );

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        report.status = "Archived";

        await report.save();

        res.json({

            success: true,

            report,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};