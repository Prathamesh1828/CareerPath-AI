import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional, if you have a User model
      required: true,
    },
    currentRole: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    careerGoals: {
      type: [String],
      default: [],
    },
    preferredPlatforms: {
      type: [String],
      default: [],
    },
    budget: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    timeCommitment: {
      type: String,
      enum: ["part-time", "full-time", "flexible"],
      required: true,
    },
    learningStyle: {
      type: String,
      enum: [
        "theoretical",
        "project-based",
        "mixed",
        "Project-based",
        "Hybrid",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
