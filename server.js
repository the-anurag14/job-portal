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


// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log(err);
});


// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});