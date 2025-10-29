// services/courseService.ts

// Type definitions
export interface Lecture {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
  completed: boolean;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  platform: string;
  duration: number;
  rating: number;
  reviews: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  thumbnail?: string;
  url: string;
  lectures?: Lecture[];
  totalLectures?: number;
  completedLectures?: number;
  progress?: number;
  enrolled?: boolean;
  category?: string;
  price?: number;
  isFree?: boolean;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  progress: number;
  completedLectures: number;
  totalLectures: number;
  lastAccessedAt: Date;
  startedAt: Date;
  completedAt?: Date;
  lectures: {
    lectureId: string;
    completed: boolean;
    completedAt?: Date;
  }[];
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollment?: {
    userId: string;
    courseId: string;
    enrolledAt: Date;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface SearchFilters {
  level?: string;
  platform?: string;
  skills?: string[];
  minRating?: number;
  isFree?: boolean;
  category?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const courseService = {
  // Get all courses
  async getAllCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get course by ID
  async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },

  // Get courses by skill/topic
  async getCoursesBySkill(skill: string): Promise<ApiResponse<Course[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/skill/${skill}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses by skill");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses by skill:", error);
      throw error;
    }
  },

  // Get course progress for a user
  async getCourseProgress(
    userId: string,
    courseId: string
  ): Promise<ApiResponse<CourseProgress>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress/${userId}/course/${courseId}`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch course progress");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching course progress:", error);
      throw error;
    }
  },

  // Update lecture completion
  async updateLectureCompletion(
    userId: string,
    courseId: string,
    lectureId: string,
    completed: boolean
  ): Promise<ApiResponse<CourseProgress>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress/${userId}/course/${courseId}/lecture/${lectureId}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ completed }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lecture completion");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating lecture completion:", error);
      throw error;
    }
  },

  // Mark course as completed
  async completeCourse(
    userId: string,
    courseId: string
  ): Promise<ApiResponse<CourseProgress>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress/${userId}/course/${courseId}/complete`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark course as completed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error completing course:", error);
      throw error;
    }
  },

  // Enroll in a course
  async enrollCourse(
    userId: string,
    courseId: string
  ): Promise<ApiResponse<EnrollmentResponse>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error enrolling in course:", error);
      throw error;
    }
  },

  // Get user's enrolled courses
  async getEnrolledCourses(userId: string): Promise<ApiResponse<Course[]>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/user/${userId}/enrolled`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch enrolled courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      throw error;
    }
  },

  // Search courses
  async searchCourses(
    query: string,
    filters: SearchFilters = {}
  ): Promise<ApiResponse<Course[]>> {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        ...(filters.level && { level: filters.level }),
        ...(filters.platform && { platform: filters.platform }),
        ...(filters.minRating && { minRating: filters.minRating.toString() }),
        ...(filters.isFree !== undefined && {
          isFree: filters.isFree.toString(),
        }),
        ...(filters.category && { category: filters.category }),
        ...(filters.skills && { skills: filters.skills.join(",") }),
      });

      const response = await fetch(
        `${API_BASE_URL}/courses/search?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Failed to search courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching courses:", error);
      throw error;
    }
  },

  // Get recommended courses based on user profile

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<ApiResponse<Course[]>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/category/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses by category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses by category:", error);
      throw error;
    }
  },

  // Get user's course statistics
  async getUserCourseStats(userId: string): Promise<
    ApiResponse<{
      totalEnrolled: number;
      totalCompleted: number;
      totalInProgress: number;
      totalLearningHours: number;
    }>
  > {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/user/${userId}/stats`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user course statistics");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user course stats:", error);
      throw error;
    }
  },

  // Get recommended courses based on user profile
  async getRecommendedCourses(userId: string): Promise<ApiResponse<Course[]>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/user/${userId}/recommended`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommended courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
      throw error;
    }
  },

  // ADD THIS NEW METHOD - Get courses by career path
  async fetchCoursesByCareerPath(careerPath: string): Promise<{
    success: boolean;
    courses: Course[];
    message?: string;
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/career-path/${careerPath}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses by career path");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses by career path:", error);
      return {
        success: false,
        courses: [],
        message: "Failed to load courses for this career path",
      };
    }
  },
};

export default courseService;
