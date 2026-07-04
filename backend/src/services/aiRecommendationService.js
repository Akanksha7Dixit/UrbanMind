const generateRecommendations = (
  infrastructure,
  issues
) => {

  const recommendations = [];

  // Rule 1
  infrastructure.forEach((item) => {

    if (item.utilization >= 90) {

      recommendations.push({
        title: "High Utilization",
        category: "Infrastructure",
        priority: "High",
        recommendation: `${item.name} is operating above 90% capacity. Expand infrastructure.`,
      });

    }

    if (item.status === "Maintenance") {

      recommendations.push({
        title: "Maintenance Required",
        category: "Infrastructure",
        priority: "Medium",
        recommendation: `${item.name} requires maintenance.`,
      });

    }

  });

  // Rule 2
  const pending = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  if (pending > 10) {

    recommendations.push({
      title: "Citizen Issues",
      category: "Governance",
      priority: "High",
      recommendation: `There are ${pending} unresolved issues. Increase maintenance workforce.`,
    });

  }

  // Rule 3
  const hospitals = infrastructure.filter(
    (item) => item.type === "Hospital"
  );

  if (hospitals.length < 2) {

    recommendations.push({
      title: "Healthcare",
      category: "Planning",
      priority: "Critical",
      recommendation: "Healthcare infrastructure is insufficient. Build another hospital.",
    });

  }

  return recommendations;

};

module.exports = {
  generateRecommendations,
};