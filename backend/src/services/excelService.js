const ExcelJS = require("exceljs");

async function generateExcel(report) {

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "UrbanMind";
    workbook.company = "UrbanMind";
    workbook.subject = "Urban Planning Report";
    workbook.title = report.title;

    /* ======================================
       SUMMARY SHEET
    ====================================== */

    const summary = workbook.addWorksheet("Summary");

    summary.columns = [
        { header: "Field", key: "field", width: 30 },
        { header: "Value", key: "value", width: 50 },
    ];

    summary.addRows([
        {
            field: "Title",
            value: report.title,
        },
        {
            field: "Category",
            value: report.category,
        },
        {
            field: "Status",
            value: report.status,
        },
        {
            field: "Generated",
            value: new Date(
                report.createdAt
            ).toLocaleString(),
        },
        {
            field: "Description",
            value: report.description,
        },
        {
            field: "Executive Summary",
            value: report.summary || "",
        },
    ]);

    summary.getRow(1).font = {
        bold: true,
    };

    /* ======================================
       ANALYTICS SHEET
    ====================================== */

    const analyticsSheet =
        workbook.addWorksheet("Analytics");

    analyticsSheet.columns = [
        {
            header: "Metric",
            key: "metric",
            width: 35,
        },
        {
            header: "Value",
            key: "value",
            width: 20,
        },
    ];

    const analytics =
        report.analytics || {};

    analyticsSheet.addRows([
        {
            metric: "Health Score",
            value:
                analytics.healthScore || 0,
        },
        {
            metric:
                "Total Infrastructure",
            value:
                analytics.totalInfrastructure || 0,
        },
        {
            metric:
                "Operational Infrastructure",
            value:
                analytics.operationalInfrastructure || 0,
        },
        {
            metric:
                "Maintenance Infrastructure",
            value:
                analytics.maintenanceInfrastructure || 0,
        },
        {
            metric:
                "Construction Infrastructure",
            value:
                analytics.constructionInfrastructure || 0,
        },
        {
            metric: "Total Issues",
            value:
                analytics.totalIssues || 0,
        },
        {
            metric:
                "Pending Issues",
            value:
                analytics.pendingIssues || 0,
        },
        {
            metric:
                "Resolved Issues",
            value:
                analytics.resolvedIssues || 0,
        },
        {
            metric:
                "In Progress Issues",
            value:
                analytics.inProgressIssues || 0,
        },
    ]);

    analyticsSheet.getRow(1).font = {
        bold: true,
    };

    /* ======================================
       INFRASTRUCTURE
    ====================================== */

    const infrastructureSheet =
        workbook.addWorksheet(
            "Infrastructure"
        );

    infrastructureSheet.columns = [
        {
            header: "Name",
            key: "name",
            width: 30,
        },
        {
            header: "Type",
            key: "type",
            width: 20,
        },
        {
            header: "Location",
            key: "location",
            width: 30,
        },
        {
            header: "Capacity",
            key: "capacity",
            width: 20,
        },
        {
            header: "Status",
            key: "status",
            width: 20,
        },
    ];

    (report.infrastructure || []).forEach(
        (item) => {

            infrastructureSheet.addRow({

                name: item.name,

                type: item.type,

                location:
                    item.location,

                capacity:
                    item.capacity,

                status: item.status,

            });

        }
    );

    infrastructureSheet.getRow(1).font = {
        bold: true,
    };

    /* ======================================
       ISSUES
    ====================================== */

    const issuesSheet =
        workbook.addWorksheet("Issues");

    issuesSheet.columns = [
        {
            header: "Title",
            key: "title",
            width: 35,
        },
        {
            header: "Priority",
            key: "priority",
            width: 20,
        },
        {
            header: "Status",
            key: "status",
            width: 20,
        },
        {
            header: "Department",
            key: "department",
            width: 25,
        },
    ];

    (report.issues || []).forEach(
        (issue) => {

            issuesSheet.addRow({

                title:
                    issue.title,

                priority:
                    issue.priority,

                status:
                    issue.status,

                department:
                    issue.department,

            });

        }
    );

    issuesSheet.getRow(1).font = {
        bold: true,
    };

    /* ======================================
       AI RECOMMENDATIONS
    ====================================== */

    const recommendationSheet =
        workbook.addWorksheet(
            "Recommendations"
        );

    recommendationSheet.columns = [
        {
            header: "Title",
            key: "title",
            width: 35,
        },
        {
            header: "Priority",
            key: "priority",
            width: 20,
        },
        {
            header: "Impact",
            key: "impact",
            width: 20,
        },
        {
            header: "Confidence",
            key: "confidence",
            width: 20,
        },
    ];

    (report.recommendations || []).forEach(
        (rec) => {

            recommendationSheet.addRow({

                title:
                    rec.title,

                priority:
                    rec.priority,

                impact:
                    rec.impact,

                confidence:
                    rec.confidence,

            });

        }
    );

    recommendationSheet.getRow(1).font = {
        bold: true,
    };
    return workbook.xlsx.writeBuffer();

}

module.exports = {

    generateExcel,

};