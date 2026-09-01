const Infrastructure = require("../models/Infrastructure");
const Issue = require("../models/Issue");
const {
  chatWithAI,
  checkAIHealth,
} = require("../services/aiService");

const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "A message is required.",
      });
    }

    // Always fetch fresh data from MongoDB
    const infrastructure = await Infrastructure.find({})
      .sort({ createdAt: -1 })
      .lean();

    const issues = await Issue.find({})
      .sort({ createdAt: -1 })
      .lean();

    const safeHistory = Array.isArray(history)
      ? history.slice(-8)
      : [];

    const result = await chatWithAI(
      message.trim(),
      infrastructure,
      issues,
      safeHistory
    );

    return res.status(200).json({
      success: true,
      answer: result.answer || "",
    });
  } catch (error) {
    console.error(
      "AI Chat Controller Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to process AI request.",
      error: error.message,
    });
  }
};

const health = async (req, res) => {
  try {
    const result = await checkAIHealth();

    return res.status(
      result.success ? 200 : 503
    ).json(result);
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "AI service is unavailable.",
      error: error.message,
    });
  }
};

module.exports = {
  chat,
  health,
};