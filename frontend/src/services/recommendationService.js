import axiosInstance
    from "../api/axiosInstance";


/* =========================================
   GET AI RECOMMENDATIONS
========================================= */

export const getRecommendations =
    async () => {

        const {
            data
        } = await axiosInstance.get(
            "/recommendations"
        );

        return data;

    };


/* =========================================
   ASK URBANMIND AI
========================================= */

export const askUrbanMind =
    async ({
        message,
        history = [],
    }) => {

        const {
            data
        } = await axiosInstance.post(
            "/ai/chat",
            {
                message,
                history,
            }
        );

        return data;

    };


/* =========================================
   AI HEALTH
========================================= */

export const getAIHealth =
    async () => {

        const {
            data
        } = await axiosInstance.get(
            "/ai/health"
        );

        return data;

    };