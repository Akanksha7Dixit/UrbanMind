const User = require("../models/User");
const Issue = require("../models/Issue");
const Infrastructure = require("../models/Infrastructure");


const getDashboardStats = async (req, res) => {
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


    const totalInfrastructure =
      await Infrastructure.countDocuments();


    res.json({

      totalUsers,

      totalIssues,

      pendingIssues,

      resolvedIssues,

      totalInfrastructure,

    });

  } catch (err) {

    console.error(
      "Dashboard Stats Error:",
      err.message
    );


    res.status(500).json({

      message: err.message,

    });

  }
};


module.exports = {
  getDashboardStats,
};