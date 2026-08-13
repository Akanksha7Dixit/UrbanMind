const Scenario = require("../models/Scenario");

// GET ALL SCENARIOS
exports.getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      scenarios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE SCENARIO
exports.getScenario = async (req, res) => {
  try {
    const scenario = await Scenario.findById(
      req.params.id
    );

    if (!scenario) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      scenario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE SCENARIO
exports.createScenario = async (req, res) => {
  try {
    const scenario = await Scenario.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Scenario created successfully",
      scenario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SCENARIO
exports.updateScenario = async (req, res) => {
  try {
    const scenario =
      await Scenario.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!scenario) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      message: "Scenario updated successfully",
      scenario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SCENARIO
exports.deleteScenario = async (req, res) => {
  try {
    const scenario =
      await Scenario.findByIdAndDelete(
        req.params.id
      );

    if (!scenario) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found",
      });
    }

    res.json({
      success: true,
      message: "Scenario deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};