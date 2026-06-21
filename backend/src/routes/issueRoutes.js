const express =
  require("express");

const {
  createIssue,
  getIssues,
  updateIssueStatus,
} = require(
  "../controllers/issueController"
);

const {
  authorize,
} = require(
  "../middleware/roleMiddleware"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/",
  protect,
  createIssue
);

router.get(
  "/",
  protect,
  getIssues
);

router.patch(
  "/:id",
  protect,
  authorize(
    "admin",
    "planner"
  ),
  updateIssueStatus
);

module.exports = router;