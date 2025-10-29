import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/UserRoutes.js";
import SkillRoutes from "./routes/SkillRoutes.js";
import progressRoutes from "./routes/courseprogressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import courseRoutes from "./routes/courseprogressRoutes.js"; // ADD THIS LINE

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Health Check Route with more info
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skill", SkillRoutes);
// app.use("/api/progress", progressRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/courses", courseRoutes); // ADD THIS LINE

// 404 Handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path,
    method: req.method,
    availableRoutes: [
      "/api/auth",
      "/api/skill",
      "/api/progress",
      "/api/reviews",
      "/api/metrics",
      "/api/courses", // ADDED
    ],
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke!",
    error: err.message,
  });
});

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;

// Function to check database after connection
async function checkDatabase() {
  try {
    const Roadmap = (await import("./models/roadmapModel.js")).default;
    const count = await Roadmap.countDocuments();
    console.log(`📊 Database has ${count} roadmaps`);

    if (count === 0) {
      console.warn("⚠️  Warning: Database is empty! Run: npm run seed");
    } else {
      const roadmaps = await Roadmap.find({}).select("careerPath selectedPath");
      console.log("📋 Available career paths:");
      roadmaps.forEach((r) => {
        console.log(`   - ${r.careerPath}: ${r.selectedPath}`);
      });
    }
  } catch (error) {
    console.error("Error checking database:", error.message);
  }
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`📍 Database: ${mongoose.connection.name}`);

    // Check database content
    checkDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
      console.log(`📚 Courses API: http://localhost:${PORT}/api/courses`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
