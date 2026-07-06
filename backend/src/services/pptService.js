const pptxgen = require("pptxgenjs");

async function generatePresentation(report) {

    const pptx = new pptxgen();

    pptx.layout = "LAYOUT_WIDE";

    pptx.author = "UrbanMind";

    pptx.company = "UrbanMind";

    pptx.subject = "Urban Planning Report";

    pptx.title = report.title;

    pptx.lang = "en-US";

    /* =====================================
       COVER
    ===================================== */

    let slide = pptx.addSlide();

    slide.addText(

        "UrbanMind",

        {

            x: 0.6,

            y: 0.5,

            w: 5,

            h: 0.6,

            fontSize: 28,

            bold: true,

            color: "0891B2",

        }

    );

    slide.addText(

        report.title,

        {

            x: 0.6,

            y: 1.4,

            w: 10,

            h: 0.6,

            fontSize: 22,

            bold: true,

        }

    );

    slide.addText(

        report.description || "",

        {

            x: 0.6,

            y: 2.3,

            w: 11,

            h: 2,

            fontSize: 14,

        }

    );

    /* =====================================
       EXECUTIVE SUMMARY
    ===================================== */

    slide = pptx.addSlide();

    slide.addText(

        "Executive Summary",

        {

            x: 0.5,

            y: 0.5,

            fontSize: 24,

            bold: true,

            color: "0891B2",

        }

    );

    slide.addText(

        report.summary ||

        "Summary unavailable.",

        {

            x: 0.6,

            y: 1.2,

            w: 11,

            h: 4,

            fontSize: 16,

        }

    );

    /* =====================================
       ANALYTICS
    ===================================== */

    slide = pptx.addSlide();

    slide.addText(

        "Analytics",

        {

            x: 0.5,

            y: 0.5,

            fontSize: 24,

            bold: true,

            color: "0891B2",

        }

    );

    const analytics = report.analytics || {};

    slide.addText(

        [

            {

                text:

                    `Health Score : ${analytics.healthScore || 0}%`

            },

            {

                text:

                    `\nInfrastructure : ${analytics.totalInfrastructure || 0}`

            },

            {

                text:

                    `\nCitizen Issues : ${analytics.totalIssues || 0}`

            },

            {

                text:

                    `\nOperational : ${analytics.operationalInfrastructure || 0}`

            },

            {

                text:

                    `\nMaintenance : ${analytics.maintenanceInfrastructure || 0}`

            },

            {

                text:

                    `\nConstruction : ${analytics.constructionInfrastructure || 0}`

            }

        ],

        {

            x: 0.8,

            y: 1.4,

            w: 5,

            h: 5,

            fontSize: 18,

        }

    );

    /* =====================================
       INFRASTRUCTURE
    ===================================== */

    slide = pptx.addSlide();

    slide.addText(

        "Infrastructure",

        {

            x: 0.5,

            y: 0.5,

            fontSize: 24,

            bold: true,

            color: "0891B2",

        }

    );

    let y = 1.2;

    (report.infrastructure || []).forEach(

        (item) => {

            slide.addText(

                `• ${item.name} (${item.status})`,

                {

                    x: 0.8,

                    y,

                    w: 10,

                    h: 0.3,

                    fontSize: 16,

                }

            );

            y += 0.35;

        }

    );

    /* =====================================
       ISSUES
    ===================================== */

    slide = pptx.addSlide();

    slide.addText(

        "Citizen Issues",

        {

            x: 0.5,

            y: 0.5,

            fontSize: 24,

            bold: true,

            color: "0891B2",

        }

    );

    y = 1.2;

    (report.issues || []).forEach(

        (issue) => {

            slide.addText(

                `• ${issue.title} (${issue.status})`,

                {

                    x: 0.8,

                    y,

                    w: 10,

                    h: 0.3,

                    fontSize: 16,

                }

            );

            y += 0.35;

        }

    );

    /* =====================================
       RECOMMENDATIONS
    ===================================== */

    slide = pptx.addSlide();

    slide.addText(

        "AI Recommendations",

        {

            x: 0.5,

            y: 0.5,

            fontSize: 24,

            bold: true,

            color: "0891B2",

        }

    );

    y = 1.2;

    (report.recommendations || []).forEach(

        (recommendation) => {

            slide.addText(

                `• ${recommendation.title}`,

                {

                    x: 0.8,

                    y,

                    w: 10,

                    h: 0.3,

                    fontSize: 16,

                }

            );

            y += 0.35;

        }

    );

    return pptx.write({

        outputType: "nodebuffer",

    });

}

module.exports = {

    generatePresentation,

};