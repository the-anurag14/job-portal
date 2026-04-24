const express = require("express");
const router = express.Router();

const { postJob, getAllJobs, searchJobs } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, postJob);
router.get("/", getAllJobs);
router.get("/search", searchJobs);

module.exports = router;