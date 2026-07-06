const PDFDocument = require("pdfkit");

const generatePDF = (report) => {

    const doc = new PDFDocument({

        size: "A4",

        margin: 50,

    });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    return new Promise((resolve) => {

        doc.on("end", () => {

            resolve(Buffer.concat(buffers));

        });

        /* ===========================
           HEADER
        =========================== */

        doc
            .fontSize(26)
            .fillColor("#0891b2")
            .text("UrbanMind", {

                align: "center",

            });

        doc
            .moveDown(0.5);

        doc
            .fontSize(18)
            .fillColor("black")
            .text(report.title, {

                align: "center",

            });

        doc
            .moveDown();

        /* ===========================
           BASIC DETAILS
        =========================== */

        doc
            .fontSize(12)
            .text(`Category : ${report.category}`);

        doc
            .text(`Status : ${report.status}`);

        doc
            .text(

                `Generated : ${new Date(

                    report.createdAt

                ).toLocaleString()}`

            );

        doc.moveDown();

        /* ===========================
           DESCRIPTION
        =========================== */

        doc

            .fontSize(16)

            .fillColor("#0891b2")

            .text("Description");

        doc

            .moveDown(.4);

        doc

            .fontSize(12)

            .fillColor("black")

            .text(report.description);

        doc.moveDown();

        /* ===========================
           EXECUTIVE SUMMARY
        =========================== */

        doc

            .fontSize(16)

            .fillColor("#0891b2")

            .text("Executive Summary");

        doc

            .moveDown(.4);

        doc

            .fontSize(12)

            .fillColor("black")

            .text(

                report.summary ||

                "Summary unavailable."

            );

        doc.moveDown();

        /* ===========================
           ANALYTICS
        =========================== */

        const analytics =

            report.analytics || {};

        doc

            .fontSize(16)

            .fillColor("#0891b2")

            .text("City Statistics");

        doc.moveDown(.4);

        doc

            .fontSize(12)

            .fillColor("black");

        doc.text(

            `Health Score : ${analytics.healthScore || 0}%`

        );

        doc.text(

            `Infrastructure : ${analytics.totalInfrastructure || 0}`

        );

        doc.text(

            `Citizen Issues : ${analytics.totalIssues || 0}`

        );

        doc.text(

            `Operational : ${analytics.operationalInfrastructure || 0}`

        );

        doc.text(

            `Maintenance : ${analytics.maintenanceInfrastructure || 0}`

        );

        doc.text(

            `Construction : ${analytics.constructionInfrastructure || 0}`

        );

        doc.moveDown();

        /* ===========================
           AI RECOMMENDATIONS
        =========================== */

        doc

            .fontSize(16)

            .fillColor("#0891b2")

            .text("AI Recommendations");

        doc.moveDown(.5);

        if (

            report.recommendations?.length

        ) {

            report.recommendations.forEach(

                (

                    recommendation,

                    index

                ) => {

                    doc

                        .fontSize(12)

                        .fillColor("black")

                        .text(

                            `${index + 1}. ${recommendation.title}`

                        );

                    doc

                        .fillColor("gray")

                        .text(

                            recommendation.description

                        );

                    doc.moveDown(.5);

                }

            );

        }

        else {

            doc.text(

                "No recommendations available."

            );

        }

        /* ===========================
           FOOTER
        =========================== */

        doc.moveDown();

        doc

            .fontSize(10)

            .fillColor("gray")

            .text(

                "Generated automatically by UrbanMind Smart City Decision Intelligence Platform.",

                {

                    align: "center",

                }

            );

        doc.end();

    });

};

module.exports = {

    generatePDF,

};