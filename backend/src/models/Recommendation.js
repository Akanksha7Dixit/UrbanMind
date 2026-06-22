const mongoose = require("mongoose");

const recommendationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      confidence: {
        type: Number,
        default: 80,
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
        ],
        default: "Medium",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Recommendation",
    recommendationSchema
  );