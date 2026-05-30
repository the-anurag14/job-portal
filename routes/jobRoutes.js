const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  postJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  searchJobs,
  applyJob,
  getMyApplications,
  getApplicants,
  matchResume,
} = require("../controllers/jobController");

router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.post("/", protect, postJob);
router.get("/my-applications", protect, getMyApplications);
router.get("/my-jobs", protect, getMyJobs);
router.get("/applicants/:jobId", protect, getApplicants);
router.post("/match", protect, matchResume);
router.get("/:jobId", getJobById);
router.post("/:jobId/apply", protect, applyJob);

module.exports = router;
