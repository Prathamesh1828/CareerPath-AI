import UserMetrics from "../models/userMetricsModel.js";

// @desc    Start time tracking session
// @route   POST /api/metrics/start-session
// @access  Private
export const startSession = async (req, res) => {
  try {
    const userId = req.user.id;

    let metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      metrics = await UserMetrics.create({
        userId,
        careerRoadmapTime: {
          totalMinutes: 0,
          lastSessionStart: new Date(),
          sessions: [],
        },
      });
    } else {
      await UserMetrics.findOneAndUpdate(
        { userId },
        { $set: { "careerRoadmapTime.lastSessionStart": new Date() } }
      );
    }

    const updatedMetrics = await UserMetrics.findOne({ userId });

    res.status(200).json({
      success: true,
      message: "Session started",
      data: updatedMetrics,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start session",
      error: error.message,
    });
  }
};

// @desc    End time tracking session
// @route   POST /api/metrics/end-session
// @access  Private
export const endSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { durationMinutes } = req.body;

    console.log("⏹️ Ending session for user:", userId);
    console.log("⏱️ Duration from client:", durationMinutes, "minutes");

    const metrics = await UserMetrics.findOne({ userId });

    if (!metrics || !metrics.careerRoadmapTime.lastSessionStart) {
      return res.status(400).json({
        success: false,
        message: "No active session found",
      });
    }

    const endTime = new Date();
    const startTime = new Date(metrics.careerRoadmapTime.lastSessionStart);
    let calculatedDuration =
      durationMinutes || Math.round((endTime - startTime) / 60000);

    if (calculatedDuration < 1) {
      calculatedDuration = 1;
    }

    console.log("✅ Final calculated duration:", calculatedDuration, "minutes");

    // USE ATOMIC UPDATE
    const updatedMetrics = await UserMetrics.findOneAndUpdate(
      { userId },
      {
        $inc: { "careerRoadmapTime.totalMinutes": calculatedDuration },
        $push: {
          "careerRoadmapTime.sessions": {
            startTime,
            endTime,
            durationMinutes: calculatedDuration,
          },
        },
        $set: { "careerRoadmapTime.lastSessionStart": null },
      },
      { new: true }
    );

    console.log(
      "📊 New total time:",
      updatedMetrics.careerRoadmapTime.totalMinutes,
      "minutes"
    );

    // Update learning streak
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActivity = updatedMetrics.learningStreak.lastActivityDate
      ? new Date(updatedMetrics.learningStreak.lastActivityDate).setHours(
          0,
          0,
          0,
          0
        )
      : null;

    if (!lastActivity || today > lastActivity) {
      const daysDiff = lastActivity
        ? (today - lastActivity) / (1000 * 60 * 60 * 24)
        : 0;
      let newStreak = updatedMetrics.learningStreak.currentStreak;

      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff > 1 || !lastActivity) {
        newStreak = 1;
      }

      const newLongestStreak = Math.max(
        newStreak,
        updatedMetrics.learningStreak.longestStreak
      );

      await UserMetrics.findOneAndUpdate(
        { userId },
        {
          $set: {
            "learningStreak.currentStreak": newStreak,
            "learningStreak.longestStreak": newLongestStreak,
            "learningStreak.lastActivityDate": new Date(),
          },
        }
      );
    }

    const finalMetrics = await UserMetrics.findOne({ userId });

    res.status(200).json({
      success: true,
      message: "Session ended successfully",
      data: finalMetrics,
    });
  } catch (error) {
    console.error("❌ Error ending session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to end session",
      error: error.message,
    });
  }
};

// @desc    Get user metrics
// @route   GET /api/metrics/me
// @access  Private
export const getUserMetrics = async (req, res) => {
  try {
    const userId = req.user.id;

    let metrics = await UserMetrics.findOne({ userId });

    if (!metrics) {
      metrics = await UserMetrics.create({ userId });
    }

    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch metrics",
      error: error.message,
    });
  }
};

// @desc    Reset metrics (for debugging)
// @route   DELETE /api/metrics/reset
// @access  Private
export const resetMetrics = async (req, res) => {
  try {
    const userId = req.user.id;
    await UserMetrics.findOneAndDelete({ userId });

    res.status(200).json({
      success: true,
      message: "Metrics reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset metrics",
      error: error.message,
    });
  }
};
