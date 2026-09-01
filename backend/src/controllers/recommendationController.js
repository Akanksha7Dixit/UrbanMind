const Infrastructure =
    require("../models/Infrastructure");

const Issue =
    require("../models/Issue");

const {
    generateAIRecommendations,
} = require("../services/aiService");


/* =========================================
   GET AI RECOMMENDATIONS
========================================= */

exports.getRecommendations =
    async (req, res) => {

        try {

            const infrastructure =
                await Infrastructure
                    .find()
                    .lean();

            const issues =
                await Issue
                    .find()
                    .lean();


            const result =
                await generateAIRecommendations({

                    infrastructure,

                    issues,

                });


            res.status(200).json({

                success: true,

                healthScore:
                    result.healthScore,

                overview:
                    result.overview,

                totalInfrastructure:
                    result.totalInfrastructure,

                totalIssues:
                    result.totalIssues,

                recommendations:
                    result.recommendations,

            });


        } catch (error) {

            console.error(
                "AI Recommendation Error:",
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
                    "Unable to generate AI recommendations.",

            });

        }

    };