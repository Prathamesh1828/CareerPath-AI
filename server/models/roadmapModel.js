import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  platform: String,
  completed: { type: Boolean, default: false },
  duration: String,
  rating: Number,
  url: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  completed: { type: Boolean, default: false },
  difficulty: String,
});

const phaseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  status: String,
  progress: { type: Number, default: 0 },
  duration: String,
  description: String,
  skills: [skillSchema],
  courses: [courseSchema],
  projects: [projectSchema],
});

const roadmapSchema = new mongoose.Schema(
  {
    careerPath: {
      type: String,
      required: true,
      unique: true,
    },
    selectedPath: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    phases: [phaseSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);
