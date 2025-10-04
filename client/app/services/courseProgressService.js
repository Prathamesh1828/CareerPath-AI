const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class CourseProgressService {
  /**
   * Fetch course progress for a specific user and course
   */
  async fetchCourseProgress(userId, courseId) {
    try {
      if (!userId || !courseId) {
        console.error("❌ Missing userId or courseId");
        return {
          success: false,
          error: "Missing userId or courseId",
        };
      }

      const response = await fetch(
        `${API_URL}/api/course-progress/${userId}/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Course progress fetched:", result);
      return result;
    } catch (error) {
      console.error("❌ Error fetching course progress:", error);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  }

  /**
   * Mark a lecture as complete
   */
  async markLectureComplete(userId, courseId, lectureId) {
    try {
      if (!userId) {
        console.error("❌ userId is undefined");
        return {
          success: false,
          error: "userId is required",
        };
      }

      if (!courseId) {
        console.error("❌ courseId is undefined");
        return {
          success: false,
          error: "courseId is required",
        };
      }

      if (!lectureId) {
        console.error("❌ lectureId is undefined");
        return {
          success: false,
          error: "lectureId is required",
        };
      }

      console.log("🔄 Marking lecture complete:", {
        userId,
        courseId,
        lectureId,
      });

      const response = await fetch(`${API_URL}/api/mark-lecture-complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.toString(),
          courseId: courseId.toString(),
          lectureId: lectureId.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("✅ Lecture marked complete:", result);

      if (result.success) {
        this.invalidateLocalCache(courseId);
      }

      return result;
    } catch (error) {
      console.error("❌ Error marking lecture complete:", error);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  }

  /**
   * Unmark a lecture as complete
   */
  async unmarkLectureComplete(userId, courseId, lectureId) {
    try {
      if (!userId) {
        console.error("❌ userId is undefined");
        return {
          success: false,
          error: "userId is required",
        };
      }

      if (!courseId) {
        console.error("❌ courseId is undefined");
        return {
          success: false,
          error: "courseId is required",
        };
      }

      if (!lectureId) {
        console.error("❌ lectureId is undefined");
        return {
          success: false,
          error: "lectureId is required",
        };
      }

      console.log("🔄 Unmarking lecture:", {
        userId,
        courseId,
        lectureId,
      });

      const response = await fetch(`${API_URL}/api/unmark-lecture-complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.toString(),
          courseId: courseId.toString(),
          lectureId: lectureId.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("✅ Lecture unmarked:", result);

      if (result.success) {
        this.invalidateLocalCache(courseId);
      }

      return result;
    } catch (error) {
      console.error("❌ Error unmarking lecture:", error);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  }

  /**
   * Fetch all progress for a user across all courses
   */
  async fetchUserProgress(userId) {
    try {
      if (!userId) {
        console.error("❌ userId is undefined");
        return {
          success: false,
          error: "userId is required",
        };
      }

      const response = await fetch(`${API_URL}/api/user-progress/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ User progress fetched:", result);
      return result;
    } catch (error) {
      console.error("❌ Error fetching user progress:", error);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  }

  /**
   * Calculate overall career progress percentage
   */
  calculateCareerProgress(userProgressData) {
    if (!userProgressData || !Array.isArray(userProgressData)) {
      return 0;
    }

    if (userProgressData.length === 0) return 0;

    const totalProgress = userProgressData.reduce((sum, course) => {
      return sum + (course.progressPercent || 0);
    }, 0);

    return Math.round(totalProgress / userProgressData.length);
  }

  /**
   * Get completed courses count
   */
  getCompletedCoursesCount(userProgressData) {
    if (!userProgressData || !Array.isArray(userProgressData)) {
      return 0;
    }

    return userProgressData.filter((course) => course.completed).length;
  }

  /**
   * Get total lectures completed
   */
  getTotalLecturesCompleted(userProgressData) {
    if (!userProgressData || !Array.isArray(userProgressData)) {
      return 0;
    }

    return userProgressData.reduce((sum, course) => {
      return sum + (course.completedLectures?.length || 0);
    }, 0);
  }

  /**
   * Get total lectures across all courses
   */
  getTotalLectures(userProgressData) {
    if (!userProgressData || !Array.isArray(userProgressData)) {
      return 0;
    }

    return userProgressData.reduce((sum, course) => {
      return sum + (course.totalLectures || 0);
    }, 0);
  }

  /**
   * Save course progress to local storage
   */
  saveCourseProgressLocally(courseId, progressData) {
    try {
      if (typeof window === "undefined") return;

      localStorage.setItem(
        `course_progress_${courseId}`,
        JSON.stringify({
          ...progressData,
          timestamp: new Date().toISOString(),
        })
      );

      console.log("💾 Progress saved locally for course:", courseId);
    } catch (error) {
      console.error("❌ Error saving course progress locally:", error);
    }
  }

  /**
   * Get course progress from local storage
   */
  getCourseProgressLocally(courseId) {
    try {
      if (typeof window === "undefined") return null;

      const cached = localStorage.getItem(`course_progress_${courseId}`);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      const cacheAge = Date.now() - new Date(parsed.timestamp).getTime();

      // Cache valid for 5 minutes
      if (cacheAge > 5 * 60 * 1000) {
        localStorage.removeItem(`course_progress_${courseId}`);
        console.log("🗑️ Cache expired for course:", courseId);
        return null;
      }

      console.log("📦 Using cached progress for course:", courseId);
      return parsed;
    } catch (error) {
      console.error("❌ Error reading course progress locally:", error);
      return null;
    }
  }

  /**
   * Invalidate local cache for a course
   */
  invalidateLocalCache(courseId) {
    try {
      if (typeof window === "undefined") return;

      localStorage.removeItem(`course_progress_${courseId}`);
      console.log("🗑️ Cache invalidated for course:", courseId);
    } catch (error) {
      console.error("❌ Error invalidating cache:", error);
    }
  }

  /**
   * Clear all course progress cache
   */
  clearAllCache() {
    try {
      if (typeof window === "undefined") return;

      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("course_progress_")) {
          localStorage.removeItem(key);
        }
      });

      console.log("🗑️ All course progress cache cleared");
    } catch (error) {
      console.error("❌ Error clearing all cache:", error);
    }
  }
}

const courseProgressService = new CourseProgressService();
export default courseProgressService;
