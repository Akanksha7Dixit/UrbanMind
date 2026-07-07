const Infrastructure = require("../models/Infrastructure");
const Issue = require("../models/Issue");
const Recommendation = require("../models/Recommendation");
const Report = require("../models/Report");

async function generateReport(data, userId) {

    const infrastructure =
        await Infrastructure.find();

    const issues =
        await Issue.find();

    const recommendations =
        await Recommendation.find();

    const totalInfrastructure =
        infrastructure.length;

    const totalIssues =
        issues.length;

    const operationalInfrastructure =
        infrastructure.filter(
            i => i.status === "Operational"
        ).length;

    const maintenanceInfrastructure =
        infrastructure.filter(
            i => i.status === "Maintenance"
        ).length;

    const constructionInfrastructure =
        infrastructure.filter(
            i => i.status === "Construction"
        ).length;

    const resolvedIssues =
        issues.filter(
            i => i.status === "Resolved"
        ).length;

    const pendingIssues =
        issues.filter(
            i => i.status === "Pending"
        ).length;

    const inProgressIssues =
        issues.filter(
            i => i.status === "In Progress"
        ).length;

    const healthScore = Math.max(
        0,
        Math.round(
            (
                (operationalInfrastructure /
                    Math.max(totalInfrastructure, 1)) * 70
            ) +
            (
                (resolvedIssues /
                    Math.max(totalIssues, 1)) * 30
            )
        )
    );

    const report = await Report.create({

        title: data.title,

        category: data.category,

        description: data.description,

        status: "Generated",

        createdBy: userId,

        analytics: {

            healthScore,

            totalInfrastructure,

            totalIssues,

            operationalInfrastructure,

            maintenanceInfrastructure,

            constructionInfrastructure,

            resolvedIssues,

            pendingIssues,

            inProgressIssues,

        },

        infrastructure,

        issues,

        recommendations,

    });

const {

generateSummary,

}=require("../utils/reportSummary");

const summary=

generateSummary({

healthScore,

totalInfrastructure,

totalIssues,

recommendations,

});

report.summary=summary;

await report.save();

return report;

}


module.exports = {

    generateReport,

};