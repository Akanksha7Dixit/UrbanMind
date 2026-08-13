const Issue = require("../models/Issue");

// ======================================================
// CREATE ISSUE
// ======================================================

exports.createIssue = async (req, res) => {
  try {
    const issue = await Issue.create({
      ...req.body,
      createdBy: req.user?._id || req.user?.id || null,
    });

    const populatedIssue = await Issue.findById(issue._id).populate(
      "createdBy",
      "name email role"
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      issue: populatedIssue,
    });
  } catch (error) {
    console.error("Create issue error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// GET ALL ISSUES
// ======================================================

exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      issues,
    });
  } catch (error) {
    console.error("Get issues error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// GET SINGLE ISSUE
// ======================================================

exports.getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      issue,
    });
  } catch (error) {
    console.error("Get issue error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// UPDATE ISSUE STATUS
// ======================================================

exports.updateIssueStatus = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    issue.status = req.body.status;

    await issue.save();

    const populatedIssue = await Issue.findById(issue._id).populate(
      "createdBy",
      "name email role"
    );

    res.json({
      success: true,
      message: "Issue status updated successfully",
      issue: populatedIssue,
    });
  } catch (error) {
    console.error("Update issue status error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// UPDATE COMPLETE ISSUE
// ======================================================

exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "createdBy",
      "name email role"
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      message: "Issue updated successfully",
      issue,
    });
  } catch (error) {
    console.error("Update issue error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// DELETE ISSUE
// ======================================================

exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error("Delete issue error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};