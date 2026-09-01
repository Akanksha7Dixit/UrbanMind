const Infrastructure = require("../models/Infrastructure");
const Issue = require("../models/Issue");
const {
  generateRecommendations,
} = require("../services/aiService");

const getRecommendations = async (req, res) => {
  try {
    // Fetch the latest data directly from MongoDB
    const infrastructure = await Infrastructure.find({})
      .sort({ createdAt: -1 })
      .lean();

    const issues = await Issue.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Send only live database data to the AI service
    const aiResult = await generateRecommendations(
      infrastructure,
      issues
    );

    return res.status(200).json({
      success: true,
      healthScore:
        typeof aiResult.healthScore === "number"
          ? aiResult.healthScore
          : null,

      overview: aiResult.overview || "",

      totalInfrastructure: infrastructure.length,
      totalIssues: issues.length,

      recommendations: Array.isArray(aiResult.recommendations)
        ? aiResult.recommendations
        : [],
    });
  } catch (error) {
    console.error(
      "Get Recommendations Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI recommendations.",
      error: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
};