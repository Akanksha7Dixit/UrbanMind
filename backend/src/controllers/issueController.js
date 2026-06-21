const Issue = require("../models/Issue");

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