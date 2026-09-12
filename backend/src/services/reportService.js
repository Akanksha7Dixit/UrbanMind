const Infrastructure =
    require("../models/Infrastructure");

const Issue =
    require("../models/Issue");

const Report =
    require("../models/Report");

const {
    generateRecommendations,
} = require("./aiService");

const {
    generateSummary,
} = require("../utils/reportSummary");


async function generateReport(data, userId) {

    // Fetch the latest live urban data
    const infrastructure =
        await Infrastructure.find();

    const issues =
        await Issue.find();


    // Generate recommendations from the
    // same live data using UrbanMind AI / Qwen
    const aiResult =
        await generateRecommendations(
            infrastructure,
            issues
        );


    const recommendations =
        Array.isArray(
            aiResult.recommendations
        )
            ? aiResult.recommendations
            : [];


    const totalInfrastructure =
        infrastructure.length;

    const totalIssues =
        issues.length;


    const operationalInfrastructure =
        infrastructure.filter(
            i =>
                i.status === "Operational"
        ).length;


    const maintenanceInfrastructure =
        infrastructure.filter(
            i =>
                i.status === "Maintenance"
        ).length;


    const constructionInfrastructure =
        infrastructure.filter(
            i =>
                i.status === "Under Construction"
        ).length;


    const resolvedIssues =
        issues.filter(
            i =>
                i.status === "Resolved"
        ).length;


    const pendingIssues =
        issues.filter(
            i =>
                i.status === "Pending"
        ).length;


    const inProgressIssues =
        issues.filter(
            i =>
                i.status === "In Progress"
        ).length;


    /*
     * Use the AI health score when the AI
     * provides a valid score.
     *
     * Otherwise keep it unavailable rather
     * than inventing a value.
     */
    const healthScore =
        typeof aiResult.healthScore === "number"
            ? aiResult.healthScore
            : null;


    /*
     * Create the report using the same live
     * infrastructure, issues and AI results.
     */
    const report =
        await Report.create({

            title:
                data.title,

            category:
                data.category,

            description:
                data.description,

            status:
                "Generated",

            createdBy:
                userId,

            analytics: {

                healthScore,

                totalInfrastructure,

                operationalInfrastructure,

                maintenanceInfrastructure,

                constructionInfrastructure,

                totalIssues,

                pendingIssues,

                inProgressIssues,

                resolvedIssues,

            },

            infrastructure,

            issues,

            recommendations,

        });


    /*
     * Generate the report summary from
     * the actual current data.
     */
    const summary =
        generateSummary({

            healthScore,

            totalInfrastructure,

            totalIssues,

            recommendations,

        });


    report.summary =
        summary;


    await report.save();


    return report;
}


module.exports = {

    generateReport,

};