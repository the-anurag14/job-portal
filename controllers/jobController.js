const Job = require("../models/Job");
const Application = require("../models/Application");

// POST JOB
exports.postJob = async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      recruiter: req.user.id
    });

    res.status(201).json({
      message: "Job posted successfully",
      job
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ALL JOBS
exports.getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find().populate("recruiter", "name email");

    res.status(200).json({
      total: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { keyword, location, skill } = req.query;

    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (skill) {
      query.skills = { $regex: skill, $options: "i" };
    }

    const jobs = await Job.find(query);

    res.status(200).json({
      total: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// APPLY JOB
exports.applyJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only job seekers can apply"
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};