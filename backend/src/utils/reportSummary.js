function generateSummary({
    healthScore,
    totalInfrastructure,
    totalIssues,
    recommendations,
}) {
    const infrastructureCount =
        Number.isFinite(totalInfrastructure)
            ? totalInfrastructure
            : 0;

    const issueCount =
        Number.isFinite(totalIssues)
            ? totalIssues
            : 0;

    const recommendationCount =
        Array.isArray(recommendations)
            ? recommendations.length
            : 0;

    const summaryParts = [];

    if (typeof healthScore === "number") {
        summaryParts.push(
            `The current AI-assessed city health score is ${healthScore}%.`
        );
    } else {
        summaryParts.push(
            "An AI-assessed city health score was not available for this report."
        );
    }

    summaryParts.push(
        `${infrastructureCount} infrastructure assets are included in the current dataset.`
    );

    summaryParts.push(
        `${issueCount} citizen issues are included in the current dataset.`
    );

    summaryParts.push(
        `${recommendationCount} AI recommendations were generated from the current city data.`
    );

    return summaryParts.join(" ");
}

module.exports = {
    generateSummary,
};