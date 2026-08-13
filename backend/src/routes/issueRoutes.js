const express = require("express");

const {
  createIssue,
  getIssues,
  getIssue,
  updateIssueStatus,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();


// GET ALL ISSUES
router.get(
  "/",
  protect,
  getIssues
);


// GET SINGLE ISSUE
router.get(
  "/:id",
  protect,
  getIssue
);


// CREATE ISSUE
router.post(
  "/",
  protect,
  createIssue
);


// UPDATE STATUS
router.patch(
  "/:id",
  protect,
  authorize("admin", "planner"),
  updateIssueStatus
);


// UPDATE COMPLETE ISSUE
router.put(
  "/:id",
  protect,
  authorize("admin", "planner"),
  updateIssue
);


// DELETE ISSUE
router.delete(
  "/:id",
  protect,
  authorize("admin", "planner"),
  deleteIssue
);


module.exports = router;