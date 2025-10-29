// models/CourseProgressModel.js
import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
  lectureId: {
    type: String,
    required: true,
  },
  lectureTitle: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
});

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLectures: {
      type: Number,
      default: 0,
    },
    totalLectures: {
      type: Number,
      required: true,
    },
    lectures: [lectureProgressSchema],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    careerPath: {
      type: String,
      required: true,
    },
    phase: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
courseProgressSchema.index({ userId: 1, careerPath: 1 });

// Method to calculate and update progress
courseProgressSchema.methods.updateProgress = function () {
  if (this.totalLectures > 0) {
    this.progress = Math.round(
      (this.completedLectures / this.totalLectures) * 100
    );
    this.isCompleted = this.progress === 100;
    if (this.isCompleted && !this.completedAt) {
      this.completedAt = new Date();
    }
  }
  this.lastAccessedAt = new Date();
};

// Static method to get user's overall progress for a career path
courseProgressSchema.statics.getCareerPathProgress = async function (
  userId,
  careerPath
) {
  const courses = await this.find({ userId, careerPath });

  if (courses.length === 0) {
    return { totalProgress: 0, completedCourses: 0, totalCourses: 0 };
  }

  const totalProgress = courses.reduce(
    (sum, course) => sum + course.progress,
    0
  );
  const completedCourses = courses.filter(
    (course) => course.isCompleted
  ).length;

  return {
    totalProgress: Math.round(totalProgress / courses.length),
    completedCourses,
    totalCourses: courses.length,
    courses: courses,
  };
};

// Static method to mark lecture as complete
courseProgressSchema.statics.completeLecture = async function (
  userId,
  courseId,
  lectureId
) {
  const courseProgress = await this.findOne({ userId, courseId });

  if (!courseProgress) {
    throw new Error("Course progress not found");
  }

  const lecture = courseProgress.lectures.find(
    (l) => l.lectureId === lectureId
  );

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  if (!lecture.completed) {
    lecture.completed = true;
    lecture.completedAt = new Date();
    courseProgress.completedLectures += 1;
    courseProgress.updateProgress();
    await courseProgress.save();
  }

  return courseProgress;
};

// Static method to mark lecture as incomplete
courseProgressSchema.statics.incompleteLecture = async function (
  userId,
  courseId,
  lectureId
) {
  const courseProgress = await this.findOne({ userId, courseId });

  if (!courseProgress) {
    throw new Error("Course progress not found");
  }

  const lecture = courseProgress.lectures.find(
    (l) => l.lectureId === lectureId
  );

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  if (lecture.completed) {
    lecture.completed = false;
    lecture.completedAt = null;
    courseProgress.completedLectures -= 1;
    courseProgress.updateProgress();
    await courseProgress.save();
  }

  return courseProgress;
};

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

export default CourseProgress;
