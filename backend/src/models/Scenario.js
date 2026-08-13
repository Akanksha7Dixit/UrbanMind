const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    targetYear: {
      type: Number,
      required: true,
    },

    populationGrowth: {
      type: Number,
      default: 0,
    },

    housingExpansion: {
      type: Number,
      default: 0,
    },

    greenInvestment: {
      type: Number,
      default: 0,
    },

    infrastructureBudget: {
      type: Number,
      default: 0,
    },

    newHospitals: {
      type: Number,
      default: 0,
    },

    newSchools: {
      type: Number,
      default: 0,
    },

    metroExpansion: {
      type: Number,
      default: 0,
    },

    roadExpansion: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Active",
        "Completed",
        "Archived",
      ],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    simulationResults: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Scenario",
  scenarioSchema
);