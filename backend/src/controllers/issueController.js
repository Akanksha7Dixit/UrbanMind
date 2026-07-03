const Issue = require("../models/Issue");

// CREATE ISSUE
exports.createIssue = async (
  req,
  res
) => {
  try {
    const issue =
      await Issue.create({
        ...req.body,
        createdBy: req.user.id,
      });

    res.status(201).json({
      success: true,
      issue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ISSUES
exports.getIssues = async (
  req,
  res
) => {
  try {
    const issues =
      await Issue.find()
        .populate(
          "createdBy",
          "name email"
        );

    res.json({
      success: true,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ISSUE STATUS
exports.updateIssueStatus = async (
  req,
  res
) => {
  try {
    const issue =
      await Issue.findById(
        req.params.id
      );

    if (!issue) {
      return res.status(404).json({
        message:
          "Issue not found",
      });
    }

    issue.status =
      req.body.status;

    await issue.save();

    res.json({
      success: true,
      issue,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// UPDATE COMPLETE ISSUE
exports.updateIssue = async (
  req,
  res
) => {
  try {

    const issue =
      await Issue.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!issue) {
      return res.status(404).json({
        message:
          "Issue not found",
      });
    }

    res.json({
      success: true,
      issue,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// DELETE ISSUE
exports.deleteIssue = async (
  req,
  res
) => {
  try {

    const issue =
      await Issue.findByIdAndDelete(
        req.params.id
      );

    if (!issue) {
      return res.status(404).json({
        message:
          "Issue not found",
      });
    }

    res.json({
      success: true,
      message:
        "Issue deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};