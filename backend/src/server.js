const express = require("express");
const cors = require("cors");
require("dotenv").config();

const issueRoutes =
  require("./routes/issueRoutes");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes =require("./routes/userRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const recommendationRoutes =
  require(
    "./routes/recommendationRoutes"
  );

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UrbanMind API Running",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);
//user routes
app.use(
  "/api/users",
  userRoutes
);
// Issue Routes
app.use(
  "/api/issues",
  issueRoutes
);
// Dashboard Routes
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/recommendations",
  recommendationRoutes
);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});