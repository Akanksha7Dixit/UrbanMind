const axios = require("axios");

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL ||
    "http://127.0.0.1:8000";


const aiClient = axios.create({

    baseURL: AI_SERVICE_URL,

    timeout: 180000,

    headers: {
        "Content-Type": "application/json",
    },

});


/* =========================================
   GENERATE AI RECOMMENDATIONS
========================================= */

const generateAIRecommendations =
    async ({
        infrastructure,
        issues,
    }) => {

        const response =
            await aiClient.post(
                "/recommendations",
                {
                    infrastructure,
                    issues,
                }
            );

        return response.data;

    };


/* =========================================
   AI CHAT
========================================= */

const askAI =
    async ({
        message,
        infrastructure,
        issues,
        history = [],
    }) => {

        const response =
            await aiClient.post(
                "/chat",
                {
                    message,
                    infrastructure,
                    issues,
                    history,
                }
            );

        return response.data;

    };


/* =========================================
   AI HEALTH
========================================= */

const getAIHealth =
    async () => {

        const response =
            await aiClient.get(
                "/health"
            );

        return response.data;

    };


module.exports = {

    generateAIRecommendations,

    askAI,

    getAIHealth,

};