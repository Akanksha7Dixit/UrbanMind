const Infrastructure = require("../models/Infrastructure");

// GET ALL
exports.getInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.find();

    res.json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE
exports.createInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.create(req.body);

    res.status(201).json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.updateInfrastructure = async (req, res) => {
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
        message: "Infrastructure not found",
      });
    }

    res.json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deleteInfrastructure = async (req, res) => {
  try {
    const infrastructure =
      await Infrastructure.findByIdAndDelete(
        req.params.id
      );

    if (!infrastructure) {
      return res.status(404).json({
        message: "Infrastructure not found",
      });
    }

    res.json({
      success: true,
      message: "Infrastructure deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};