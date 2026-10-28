const express = require("express");
const router = express.Router();

const {
  postJob,
  getAllJobs,
  searchJobs,
  applyJob
} = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");

// Job Routes
router.post("/", protect, postJob);
router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.post("/apply", protect, applyJob);

module.exports = router;
