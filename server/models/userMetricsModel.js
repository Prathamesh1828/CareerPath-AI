import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: false,
    default: null,
  },
  durationMinutes: {
    type: Number,
    required: false,
    default: 0,
  },
});

const userMetricsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    careerRoadmapTime: {
      totalMinutes: {
        type: Number,
        default: 0,
      },
      sessions: {
        type: [sessionSchema],
        default: [],
      },
    },
    learningStreak: {
      currentStreak: {
        type: Number,
        default: 0,
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastActiveDate: {
        type: Date,
        default: null,
      },
    },
    profileCompleteness: {
      score: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserMetrics = mongoose.model("UserMetrics", userMetricsSchema);
export default UserMetrics;
