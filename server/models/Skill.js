import mongoose from "mongoose";

const SkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  verified: { type: Boolean, default: false },
});

const SkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      type: [SkillItemSchema],
      default: [],
    },
    careerGoals: {
      type: [String], // store as array
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
      type: [String], // allow multiple styles
      default: [],
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
