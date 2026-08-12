const mongoose = require("mongoose");

const infrastructureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "Hospital",
        "School",
        "Police",
        "Transport",
        "Emergency",
        "Park",
        "Road",
        "Metro",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: [
        "Operational",
        "Under Construction",
        "Maintenance",
      ],
      default: "Operational",
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    sector: {
      type: String,
      required: true,
      trim: true,
    },

    utilization: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    capacity: {
      type: Number,
      min: 0,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Infrastructure",
  infrastructureSchema
);