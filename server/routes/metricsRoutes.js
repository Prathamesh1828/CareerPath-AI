import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import UserMetrics from "../models/userMetricsModel.js";

const router = express.Router();

// GET user metrics
router.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    let metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      metrics = await UserMetrics.create({
        userId,
        careerRoadmapTime: {
          totalMinutes: 0,
          sessions: [],
        },
        learningStreak: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
        },
        profileCompleteness: {
          score: 0,
        },
      });
    }

    res.json({
      success: true,
      data: {
        careerRoadmapTime: {
          totalMinutes: metrics.careerRoadmapTime?.totalMinutes || 0,
          totalHours: Math.floor(
            (metrics.careerRoadmapTime?.totalMinutes || 0) / 60
          ),
        },
        learningStreak: {
          currentStreak: metrics.learningStreak?.currentStreak || 0,
          longestStreak: metrics.learningStreak?.longestStreak || 0,
          lastActiveDate: metrics.learningStreak?.lastActiveDate || null,
        },
        profileCompleteness: {
          score: metrics.profileCompleteness?.score || 0,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST start session
router.post("/start-session", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("🚀 Starting session for user:", userId);

    let metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      console.log("📝 Creating new metrics document");
      metrics = new UserMetrics({
        userId,
        careerRoadmapTime: {
          totalMinutes: 0,
          sessions: [],
        },
        learningStreak: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
        },
        profileCompleteness: {
          score: 0,
        },
      });
    }

    // Ensure sessions array exists
    if (!metrics.careerRoadmapTime) {
      metrics.careerRoadmapTime = { totalMinutes: 0, sessions: [] };
    }
    if (!metrics.careerRoadmapTime.sessions) {
      metrics.careerRoadmapTime.sessions = [];
    }

    // Add new session with only startTime
    metrics.careerRoadmapTime.sessions.push({
      startTime: new Date(),
      endTime: null,
      durationMinutes: 0,
    });

    await metrics.save();

    console.log("✅ Session started successfully");

    res.json({
      success: true,
      message: "Session started",
      sessionIndex: metrics.careerRoadmapTime.sessions.length - 1,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST end session
router.post("/end-session", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { durationMinutes } = req.body;

    console.log(
      "⏹️ Ending session for user:",
      userId,
      "Duration:",
      durationMinutes
    );

    let metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      return res.status(404).json({
        success: false,
        error: "Metrics not found. Please start a session first.",
      });
    }

    // Validate duration
    const validDuration = Math.max(0, Math.round(durationMinutes || 0));

    // Update total time
    if (!metrics.careerRoadmapTime) {
      metrics.careerRoadmapTime = { totalMinutes: 0, sessions: [] };
    }
    metrics.careerRoadmapTime.totalMinutes =
      (metrics.careerRoadmapTime.totalMinutes || 0) + validDuration;

    // Update last session
    if (
      metrics.careerRoadmapTime.sessions &&
      metrics.careerRoadmapTime.sessions.length > 0
    ) {
      const lastSession =
        metrics.careerRoadmapTime.sessions[
          metrics.careerRoadmapTime.sessions.length - 1
        ];
      lastSession.endTime = new Date();
      lastSession.durationMinutes = validDuration;
    }

    // Update learning streak
    const today = new Date().toDateString();
    const lastActive = metrics.learningStreak?.lastActiveDate
      ? new Date(metrics.learningStreak.lastActiveDate).toDateString()
      : null;

    if (!metrics.learningStreak) {
      metrics.learningStreak = {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastActive === yesterdayStr) {
        metrics.learningStreak.currentStreak += 1;
      } else if (!lastActive || new Date(lastActive) < yesterday) {
        metrics.learningStreak.currentStreak = 1;
      }

      if (
        metrics.learningStreak.currentStreak >
        metrics.learningStreak.longestStreak
      ) {
        metrics.learningStreak.longestStreak =
          metrics.learningStreak.currentStreak;
      }

      metrics.learningStreak.lastActiveDate = new Date();
    }

    await metrics.save();

    console.log("✅ Session ended successfully");

    res.json({
      success: true,
      message: "Session ended",
      data: {
        totalMinutes: metrics.careerRoadmapTime.totalMinutes,
        totalHours: Math.floor(metrics.careerRoadmapTime.totalMinutes / 60),
        currentStreak: metrics.learningStreak.currentStreak,
        longestStreak: metrics.learningStreak.longestStreak,
      },
    });
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET total learning time stats
router.get("/learning-time", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      return res.json({
        success: true,
        data: {
          totalMinutes: 0,
          totalHours: 0,
          sessionsCount: 0,
        },
      });
    }

    const totalMinutes = metrics.careerRoadmapTime?.totalMinutes || 0;
    const totalHours = Math.floor(totalMinutes / 60);
    const sessionsCount = metrics.careerRoadmapTime?.sessions?.length || 0;

    res.json({
      success: true,
      data: {
        totalMinutes,
        totalHours,
        sessionsCount,
        averageSessionMinutes:
          sessionsCount > 0 ? Math.round(totalMinutes / sessionsCount) : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching learning time:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET learning streak
router.get("/streak", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      return res.json({
        success: true,
        data: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
        },
      });
    }

    res.json({
      success: true,
      data: {
        currentStreak: metrics.learningStreak?.currentStreak || 0,
        longestStreak: metrics.learningStreak?.longestStreak || 0,
        lastActiveDate: metrics.learningStreak?.lastActiveDate || null,
      },
    });
  } catch (error) {
    console.error("Error fetching streak:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
