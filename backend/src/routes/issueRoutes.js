const express =
  require("express");

const {
  createIssue,
  getIssues,
  updateIssueStatus,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");


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

router.put(
  "/:id",
  protect,
  authorize(
    "admin",
    "planner"
  ),
  updateIssue
);

router.delete(
  "/:id",
  protect,
  authorize(
    "admin",
    "planner"
  ),
  deleteIssue
);

module.exports = router;