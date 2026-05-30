const Job = require("../models/Job");
const Application = require("../models/Application");
const axios = require("axios");


// ================== AI MATCH ==================
exports.matchResume = async (req, res) => {
  try {
    const { resumeText, jobId } = req.body;

    if (!resumeText || !jobId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const response = await axios.post("http://localhost:8001/match", {
      resume: resumeText,
      job_description: job.description + " " + job.skills.join(" "),
    });

    const resumeLower = resumeText.toLowerCase();
    const matchedSkills = (job.skills || []).filter((skill) =>
      resumeLower.includes(skill.toLowerCase())
    );
    const missingSkills = (job.skills || []).filter(
      (skill) => !matchedSkills.includes(skill)
    );
    const score = response.data.match_score;

    let recommendation = "Consider strengthening your profile for this role.";
    if (score >= 75) {
      recommendation = "Strong match — this role aligns well with your resume.";
    } else if (score >= 50) {
      recommendation = "Moderate match — highlight relevant skills and experience.";
    }

    res.status(200).json({
      job: {
        id: job._id,
        title: job.title,
        company: job.company,
      },
      score,
      matchedSkills,
      missingSkills,
      recommendation,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "AI Service Error" });
  }
};


// ================== POST JOB ==================
exports.postJob = async (req, res) => {
  try {
    const { title, company, location, description, salary, skills } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      skills,
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== GET JOB BY ID ==================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate(
      "recruiter",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== RECRUITER JOBS ==================
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== GET ALL JOBS ==================
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      total: jobs.length,
      jobs,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== SEARCH JOBS ==================
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
      jobs,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== APPLY JOB ==================
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== MY APPLICATIONS ==================
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job", "title company location");

    res.status(200).json({
      totalApplied: applications.length,
      applications,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================== VIEW APPLICANTS ==================
exports.getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .populate("job", "title company");

    res.status(200).json({
      totalApplicants: applications.length,
      applications,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};