const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());




// Test Route
app.get("/", (req, res) => {
  res.send("Backend Working 🚀");
});


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);


const PORT = process.env.PORT || 8000;

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Auth API: http://localhost:${PORT}/api/auth/register`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();