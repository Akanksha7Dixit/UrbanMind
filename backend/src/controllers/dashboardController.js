const User = require("../models/User");
const Issue = require("../models/Issue");

exports.getDashboardStats =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalIssues =
        await Issue.countDocuments();

      const pendingIssues =
        await Issue.countDocuments({
          status: "Pending",
        });

      const resolvedIssues =
        await Issue.countDocuments({
          status: "Resolved",
        });

      res.json({
        success: true,
        stats: {
          totalUsers,
          totalIssues,
          pendingIssues,
          resolvedIssues,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };