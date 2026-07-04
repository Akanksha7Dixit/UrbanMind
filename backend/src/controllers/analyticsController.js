const Infrastructure = require("../models/Infrastructure");
const Issue = require("../models/Issue");

exports.getAnalytics = async (req, res) => {

  try {

    const infrastructure =
      await Infrastructure.find();

    const issues =
      await Issue.find();

    const analytics = {

      totalInfrastructure:
        infrastructure.length,

      operationalInfrastructure:
        infrastructure.filter(
          i => i.status === "Operational"
        ).length,

      maintenanceInfrastructure:
        infrastructure.filter(
          i => i.status === "Maintenance"
        ).length,

      constructionInfrastructure:
        infrastructure.filter(
          i => i.status === "Under Construction"
        ).length,

      totalIssues:
        issues.length,

      pendingIssues:
        issues.filter(
          i => i.status === "Pending"
        ).length,

      inProgressIssues:
        issues.filter(
          i => i.status === "In Progress"
        ).length,

      resolvedIssues:
        issues.filter(
          i => i.status === "Resolved"
        ).length,

    };

    res.json({

      success: true,

      analytics,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};