const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Road",
        "Water",
        "Electricity",
        "Garbage",
        "Sanitation",
        "Traffic",
        "Infrastructure",
        "Other",
      ],
      default: "Infrastructure",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    latitude: {
      type: Number,
      min: -90,
      max: 90,
      default: null,
    },

    longitude: {
      type: Number,
      min: -180,
      max: 180,
      default: null,
    },

    resolution: {
      type: String,
      default: "",
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Issue",
  issueSchema
);