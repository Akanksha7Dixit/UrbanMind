const axios = require("axios");

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
  },
});

const generateRecommendations = async (infrastructure, issues) => {
  try {
    const response = await aiClient.post("/recommendations", {
      infrastructure,
      issues,
    });

    return response.data;
  } catch (error) {
    console.error(
      "AI Recommendation Service Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.detail ||
        "Unable to connect to UrbanMind AI service."
    );
  }
};

const chatWithAI = async (message, infrastructure, issues, history = []) => {
  try {
    const response = await aiClient.post("/chat", {
      message,
      infrastructure,
      issues,
      history,
    });

    return response.data;
  } catch (error) {
    console.error(
      "AI Chat Service Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.detail ||
        "Unable to connect to UrbanMind AI service."
    );
  }
};

const checkAIHealth = async () => {
  try {
    const response = await aiClient.get("/health");
    return response.data;
  } catch (error) {
    return {
      success: false,
      ollama: false,
      modelAvailable: false,
      error: error.message,
    };
  }
};

module.exports = {
  generateRecommendations,
  chatWithAI,
  checkAIHealth,
};