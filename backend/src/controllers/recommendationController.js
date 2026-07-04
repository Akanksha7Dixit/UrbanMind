const Infrastructure = require("../models/Infrastructure");
const Issue = require("../models/Issue");

const {
  generateRecommendations,
} = require("../services/aiRecommendationService");

exports.getRecommendations =
  async (req, res) => {

    try {

      const infrastructure =
        await Infrastructure.find();

      const issues =
        await Issue.find();

      const recommendations =
        generateRecommendations(
          infrastructure,
          issues
        );

      let healthScore = 100;

      healthScore -=
        issues.filter(
          issue =>
            issue.status === "Pending"
        ).length;

      healthScore -=
        infrastructure.filter(
          item =>
            item.status === "Maintenance"
        ).length * 5;

      if (healthScore < 0)
        healthScore = 0;

      res.json({

        success: true,

        healthScore,

        totalInfrastructure:
          infrastructure.length,

        totalIssues:
          issues.length,

        recommendations,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };