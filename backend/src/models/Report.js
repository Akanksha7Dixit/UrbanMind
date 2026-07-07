const mongoose = require("mongoose");

/* =====================================================
   Infrastructure Schema
===================================================== */

const infrastructureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    capacity: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Operational",
    },
  },
  {
    _id: false,
  }
);

/* =====================================================
   Issue Schema
===================================================== */

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
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

    department: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

/* =====================================================
   Recommendation Schema
===================================================== */

const recommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
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

    impact: {
      type: String,
      default: "",
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

/* =====================================================
   Analytics Schema
===================================================== */

const analyticsSchema = new mongoose.Schema(
  {
    healthScore: {
      type: Number,
      default: 0,
    },

    totalInfrastructure: {
      type: Number,
      default: 0,
    },

    operationalInfrastructure: {
      type: Number,
      default: 0,
    },

    maintenanceInfrastructure: {
      type: Number,
      default: 0,
    },

    constructionInfrastructure: {
      type: Number,
      default: 0,
    },

    totalIssues: {
      type: Number,
      default: 0,
    },

    pendingIssues: {
      type: Number,
      default: 0,
    },

    resolvedIssues: {
      type: Number,
      default: 0,
    },

    inProgressIssues: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

/* =====================================================
   Dashboard Snapshot
===================================================== */

const dashboardSchema = new mongoose.Schema(
  {
    population: {
      type: Number,
      default: 0,
    },

    budget: {
      type: Number,
      default: 0,
    },

    pollutionIndex: {
      type: Number,
      default: 0,
    },

    trafficIndex: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

/* =====================================================
   Report Schema
===================================================== */

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Health",
        "Infrastructure",
        "Environment",
        "Simulation",
        "Analytics",
      ],
    },

    description: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Generated",
        "Draft",
        "Archived",
      ],
      default: "Generated",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    analytics: {
      type: analyticsSchema,
      default: () => ({}),
    },

    dashboard: {
      type: dashboardSchema,
      default: () => ({}),
    },

    infrastructure: {
      type: [infrastructureSchema],
      default: [],
    },

    issues: {
      type: [issueSchema],
      default: [],
    },

    recommendations: {
      type: [recommendationSchema],
      default: [],
    },

    fileUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* =====================================================
   Indexes
===================================================== */

reportSchema.index({
  title: "text",
  description: "text",
});

reportSchema.index({
  category: 1,
});

reportSchema.index({
  status: 1,
});

reportSchema.index({
  createdAt: -1,
});

/* =====================================================
   Export
===================================================== */

module.exports = mongoose.model(
  "Report",
  reportSchema
);