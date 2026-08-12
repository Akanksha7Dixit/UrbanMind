const Infrastructure = require("../models/Infrastructure");

// ==========================================
// GET ALL INFRASTRUCTURE
// ==========================================

exports.getInfrastructure = async (req, res) => {
  try {
    const infrastructure =
      await Infrastructure.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    console.error(
      "Get infrastructure error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch infrastructure",
    });
  }
};


// ==========================================
// CREATE INFRASTRUCTURE
// ==========================================

exports.createInfrastructure = async (
  req,
  res
) => {
  try {
    const {
      name,
      type,
      status,
      latitude,
      longitude,
      sector,
      utilization,
      capacity,
      description,
    } = req.body;


    const infrastructure =
      await Infrastructure.create({
        name,
        type,
        status,
        latitude,
        longitude,
        sector,
        utilization,
        capacity,
        description,
      });


    res.status(201).json({
      success: true,
      message:
        "Infrastructure created successfully",
      infrastructure,
    });

  } catch (error) {

    console.error(
      "Create infrastructure error:",
      error
    );

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// UPDATE INFRASTRUCTURE
// ==========================================

exports.updateInfrastructure = async (
  req,
  res
) => {
  try {

    const infrastructure =
      await Infrastructure.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );


    if (!infrastructure) {
      return res.status(404).json({
        success: false,
        message:
          "Infrastructure not found",
      });
    }


    res.json({
      success: true,
      message:
        "Infrastructure updated successfully",
      infrastructure,
    });

  } catch (error) {

    console.error(
      "Update infrastructure error:",
      error
    );

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// DELETE INFRASTRUCTURE
// ==========================================

exports.deleteInfrastructure = async (
  req,
  res
) => {
  try {

    const infrastructure =
      await Infrastructure.findByIdAndDelete(
        req.params.id
      );


    if (!infrastructure) {
      return res.status(404).json({
        success: false,
        message:
          "Infrastructure not found",
      });
    }


    res.json({
      success: true,
      message:
        "Infrastructure deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete infrastructure error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete infrastructure",
    });
  }
};