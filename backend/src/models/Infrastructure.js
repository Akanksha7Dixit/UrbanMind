const mongoose = require("mongoose");

const infrastructureSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Operational",
      },

      latitude: Number,

      longitude: Number,

      sector: String,

      utilization: Number,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Infrastructure",
    infrastructureSchema
  );