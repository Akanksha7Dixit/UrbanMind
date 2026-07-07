const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {

    getReports,
    getReportById,

    downloadPDF,
    downloadExcel,
    downloadPresentation,

    deleteReport,
    archiveReport,

    createReport, 

} = require("../controllers/reportController");

/* =========================================
   REPORTS
========================================= */
router.post(
    "/",
    protect,
    createReport
);

router.get(
    "/",
    protect,
    getReports
);

router.get(
    "/:id",
    protect,
    getReportById
);

/* =========================================
   EXPORTS
========================================= */

router.get(
    "/:id/pdf",
    protect,
    downloadPDF
);

router.get(
    "/:id/excel",
    protect,
    downloadExcel
);

router.get(
    "/:id/ppt",
    protect,
    downloadPresentation
);

router.delete(
    "/:id",
    protect,
    deleteReport
);

router.patch(
    "/:id/archive",
    protect,
    archiveReport
);


module.exports = router;