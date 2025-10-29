import Course from "../models/CourseProgressModel.js";
import UserCourseProgress from "../models/CourseProgressModel.js";

// Helper function to calculate total lectures
const calculateTotalLectures = (course) => {
  if (!course) return 0;

  if (course.totalLectures && course.totalLectures > 0) {
    return course.totalLectures;
  }

  if (course.sections && Array.isArray(course.sections)) {
    return course.sections.reduce((total, section) => {
      return total + (section.lectures?.length || 0);
    }, 0);
  }

  return 0;
};

// Mark lecture as completed
export const markLectureComplete = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    console.log("📥 Received request to mark lecture complete:", {
      userId,
      courseId,
      lectureId,
    });

    if (!userId || !courseId || !lectureId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: userId, courseId, lectureId",
      });
    }

    let progress = await UserCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new UserCourseProgress({
        userId,
        courseId,
        completedLectures: [],
        progressPercent: 0,
        completed: false,
      });
    }

    // Check if lecture is already completed
    const alreadyCompleted = progress.completedLectures.some((lecture) => {
      const existingLectureId =
        typeof lecture === "string"
          ? lecture
          : lecture.lectureId?.toString() || lecture.toString();

      return existingLectureId === lectureId.toString();
    });

    if (!alreadyCompleted) {
      progress.completedLectures.push({
        lectureId: lectureId.toString(),
        completedAt: new Date(),
      });

      console.log("✅ Lecture added to completed list");
    } else {
      console.log("⚠️ Lecture already completed");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    const totalLectures = calculateTotalLectures(course);

    console.log("📊 Calculating progress:", {
      completedCount: progress.completedLectures.length,
      totalLectures,
      courseName: course.name,
    });

    progress.progressPercent =
      totalLectures > 0
        ? Math.round((progress.completedLectures.length / totalLectures) * 100)
        : 0;

    progress.completed = progress.progressPercent === 100;

    if (progress.completed && !progress.completedAt) {
      progress.completedAt = new Date();
    }

    await progress.save();

    console.log("✅ Progress saved:", {
      progressPercent: progress.progressPercent,
      completed: progress.completed,
    });

    res.json({
      success: true,
      data: {
        progressPercent: progress.progressPercent,
        completed: progress.completed,
        completedLectures: progress.completedLectures,
        totalLectures,
      },
    });
  } catch (err) {
    console.error("❌ Error marking lecture complete:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Unmark lecture
export const unmarkLectureComplete = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    console.log("📥 Received request to unmark lecture:", {
      userId,
      courseId,
      lectureId,
    });

    if (!userId || !courseId || !lectureId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const progress = await UserCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        error: "Progress not found",
      });
    }

    // Filter out the lecture properly
    progress.completedLectures = progress.completedLectures.filter(
      (lecture) => {
        const existingLectureId =
          typeof lecture === "string"
            ? lecture
            : lecture.lectureId?.toString() || lecture.toString();

        return existingLectureId !== lectureId.toString();
      }
    );

    const course = await Course.findById(courseId);
    const totalLectures = calculateTotalLectures(course);

    progress.progressPercent =
      totalLectures > 0
        ? Math.round((progress.completedLectures.length / totalLectures) * 100)
        : 0;

    progress.completed = progress.progressPercent === 100;

    if (progress.progressPercent < 100) {
      progress.completedAt = null;
    }

    await progress.save();

    console.log("✅ Lecture unmarked:", {
      progressPercent: progress.progressPercent,
      completedLectures: progress.completedLectures.length,
    });

    res.json({
      success: true,
      data: {
        progressPercent: progress.progressPercent,
        completed: progress.completed,
        completedLectures: progress.completedLectures,
        totalLectures,
      },
    });
  } catch (err) {
    console.error("❌ Error unmarking lecture:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get course progress
export const getCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        error: "Missing userId or courseId",
      });
    }

    const progress = await UserCourseProgress.findOne({
      userId,
      courseId,
    }).populate("courseId");

    const course = await Course.findById(courseId);
    const totalLectures = calculateTotalLectures(course);

    if (!progress) {
      return res.json({
        success: true,
        data: {
          progressPercent: 0,
          completed: false,
          completedLectures: [],
          totalLectures,
        },
      });
    }

    res.json({
      success: true,
      data: {
        progressPercent: progress.progressPercent,
        completed: progress.completed,
        completedLectures: progress.completedLectures,
        totalLectures,
        completedAt: progress.completedAt,
        certificateUrl: progress.certificateUrl,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching course progress:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get all progress for a user
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "Missing userId",
      });
    }

    const allProgress = await UserCourseProgress.find({ userId }).populate(
      "courseId"
    );

    const enrichedProgress = await Promise.all(
      allProgress.map(async (prog) => {
        const course = await Course.findById(prog.courseId);
        const totalLectures = calculateTotalLectures(course);

        return {
          courseId: prog.courseId,
          courseName: course?.name || "Unknown Course",
          progressPercent: prog.progressPercent || 0,
          completed: prog.completed || false,
          completedLectures: prog.completedLectures || [],
          totalLectures,
          completedAt: prog.completedAt,
        };
      })
    );

    res.json({
      success: true,
      data: enrichedProgress,
    });
  } catch (err) {
    console.error("❌ Error fetching user progress:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
