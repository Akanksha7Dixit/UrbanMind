const Infrastructure =
    require("../models/Infrastructure");

const Issue =
    require("../models/Issue");

const {
    askAI,
    getAIHealth,
} = require("../services/aiService");


/* =========================================
   AI CHAT
========================================= */

exports.chat =
    async (req, res) => {

        try {

            const {
                message,
                history = [],
            } = req.body;


            if (
                !message ||
                typeof message !== "string" ||
                !message.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Message is required.",

                });

            }


            const infrastructure =
                await Infrastructure
                    .find()
                    .lean();


            const issues =
                await Issue
                    .find()
                    .lean();


            const result =
                await askAI({

                    message:
                        message.trim(),

                    infrastructure,

                    issues,

                    history,

                });


            res.status(200).json({

                success: true,

                answer:
                    result.answer,

            });


        } catch (error) {

            console.error(
                "AI Chat Error:",
                error.response?.data ||
                error.message
            );


            const status =
                error.response?.status ||
                500;


            res.status(status).json({

                success: false,

                message:
                    error.response?.data?.detail ||
                    "Unable to communicate with AI.",

            });

        }

    };


/* =========================================
   AI SERVICE HEALTH
========================================= */

exports.health =
    async (req, res) => {

        try {

            const result =
                await getAIHealth();


            res.status(200).json(
                result
            );


        } catch (error) {

            res.status(503).json({

                success: false,

                message:
                    "AI service unavailable.",

            });

        }

    };