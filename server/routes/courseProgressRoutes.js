// routes/courseRoutes.js

import express from "express";
import Course from "../models/CourseProgressModel.js";
import Roadmap from "../models/roadmapModel.js";
import {
  markLectureComplete,
  unmarkLectureComplete,
  getCourseProgress,
  getUserProgress,
} from "../controllers/courseProgressController.js";

const router = express.Router();

// Get courses by career path from Roadmap
router.get("/career-path/:careerPath", async (req, res) => {
  try {
    const { careerPath } = req.params;

    console.log(`Fetching courses for career path: ${careerPath}`);

    // Find the roadmap for this career path
    const roadmap = await Roadmap.findOne({ careerPath });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: `Roadmap not found for career path: ${careerPath}`,
        courses: [],
      });
    }

    // Extract all courses from all phases
    const courses = [];

    if (roadmap.phases && roadmap.phases.length > 0) {
      roadmap.phases.forEach((phase, phaseIndex) => {
        if (phase.courses && phase.courses.length > 0) {
          phase.courses.forEach((course, courseIndex) => {
            courses.push({
              id: `${careerPath}-phase${phaseIndex + 1}-course${
                courseIndex + 1
              }`,
              title: course.name || "Untitled Course",
              description: `${phase.description || phase.title}`,
              instructor: "",
              platform: course.platform || "Unknown",
              duration: course.duration || "0 hours",
              rating: course.rating || 0,
              reviews: 0,
              level: phase.title.toLowerCase().includes("foundation")
                ? "Beginner"
                : phase.title.toLowerCase().includes("advanced")
                ? "Advanced"
                : "Intermediate",
              skills: phase.skills
                ? phase.skills.map((s) => (typeof s === "string" ? s : s.name))
                : [],
              thumbnail: "",
              url: course.url || "",
              lectures: [],
              totalLectures: 0,
              completedLectures: 0,
              progress: 0,
              enrolled: course.completed || false,
              category: careerPath,
              price: 0,
              isFree: true,
              phaseTitle: phase.title,
              phaseId: phase.id || phaseIndex + 1,
              phaseStatus: phase.status || "not_started",
            });
          });
        }
      });
    }

    return res.status(200).json({
      success: true,
      courses,
      message: `Found ${courses.length} courses for ${careerPath}`,
      roadmap: {
        selectedPath: roadmap.selectedPath,
        estimatedTime: roadmap.estimatedTime,
        progress: roadmap.progress,
        totalPhases: roadmap.phases.length,
      },
    });
  } catch (error) {
    console.error("Error fetching courses by career path:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      courses: [],
      error: error.message,
    });
  }
});

// Get all courses for a career path (legacy endpoint - keeping for backward compatibility)
router.get("/courses/:careerPath", async (req, res) => {
  try {
    const { careerPath } = req.params;

    // Try to get from Roadmap first
    const roadmap = await Roadmap.findOne({ careerPath });

    if (roadmap) {
      // Extract courses from roadmap
      const courses = [];

      if (roadmap.phases) {
        roadmap.phases.forEach((phase, phaseIndex) => {
          if (phase.courses) {
            phase.courses.forEach((course, courseIndex) => {
              courses.push({
                _id: `${careerPath}-phase${phaseIndex + 1}-course${
                  courseIndex + 1
                }`,
                title: course.name,
                platform: course.platform,
                url: course.url,
                duration: course.duration,
                rating: course.rating,
                completed: course.completed,
                careerPath,
                phaseId: phase.id || phaseIndex + 1,
                phaseTitle: phase.title,
              });
            });
          }
        });
      }

      return res.json({
        success: true,
        courses,
      });
    }

    // Fallback to Course model if no roadmap found
    const courses = await Course.find({ careerPath }).sort({ phaseId: 1 });

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get specific course by ID
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if it's a composite ID (careerPath-phaseX-courseY)
    if (courseId.includes("-phase")) {
      const [careerPath, phaseInfo, courseInfo] = courseId.split("-");
      const phaseIndex = parseInt(phaseInfo.replace("phase", "")) - 1;
      const courseIndex = parseInt(courseInfo.replace("course", "")) - 1;

      const roadmap = await Roadmap.findOne({ careerPath });

      if (
        roadmap &&
        roadmap.phases[phaseIndex] &&
        roadmap.phases[phaseIndex].courses[courseIndex]
      ) {
        const phase = roadmap.phases[phaseIndex];
        const course = phase.courses[courseIndex];

        return res.json({
          success: true,
          course: {
            _id: courseId,
            title: course.name,
            platform: course.platform,
            url: course.url,
            duration: course.duration,
            rating: course.rating,
            completed: course.completed,
            careerPath,
            phaseId: phase.id || phaseIndex + 1,
            phaseTitle: phase.title,
            phaseDescription: phase.description,
            skills: phase.skills,
          },
        });
      }
    }

    // Fallback to Course model
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all roadmaps
router.get("/roadmaps", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({}).select(
      "careerPath selectedPath estimatedTime progress"
    );

    res.json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get specific roadmap by career path
router.get("/roadmap/:careerPath", async (req, res) => {
  try {
    const { careerPath } = req.params;
    const roadmap = await Roadmap.findOne({ careerPath });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: "Roadmap not found",
      });
    }

    res.json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Progress tracking routes
router.post("/mark-lecture-complete", markLectureComplete);
router.post("/unmark-lecture-complete", unmarkLectureComplete);
router.get("/course-progress/:userId/:courseId", getCourseProgress);
router.get("/user-progress/:userId", getUserProgress);

export default router;
