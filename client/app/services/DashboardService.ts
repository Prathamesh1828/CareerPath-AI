// services/dashboardService.js

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const dashboardService = {
  // Get user dashboard data
  async getDashboardData(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },

  // Get user's career progress
  async getCareerProgress(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch career progress");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching career progress:", error);
      throw error;
    }
  },

  // Update career progress
  async updateCareerProgress(userId, progressData) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        throw new Error("Failed to update career progress");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating career progress:", error);
      throw error;
    }
  },

  // Get user statistics
  async getUserStats(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user statistics");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      throw error;
    }
  },

  // Get recent activities
  async getRecentActivities(userId, limit = 10) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/activities?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recent activities");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      throw error;
    }
  },

  // Get learning streak
  async getLearningStreak(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/streak`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch learning streak");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching learning streak:", error);
      throw error;
    }
  },

  // Get achievements
  async getAchievements(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/achievements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching achievements:", error);
      throw error;
    }
  },

  // Get upcoming milestones
  async getUpcomingMilestones(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/milestones`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming milestones");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching upcoming milestones:", error);
      throw error;
    }
  },

  // Get ATS score from localStorage (stored during resume analysis)
  getATSScore() {
    try {
      const atsScore = localStorage.getItem("atsScore");
      return atsScore ? JSON.parse(atsScore) : null;
    } catch (error) {
      console.error("Error getting ATS score:", error);
      return null;
    }
  },

  // Store ATS score to localStorage
  setATSScore(scoreData) {
    try {
      localStorage.setItem("atsScore", JSON.stringify(scoreData));
    } catch (error) {
      console.error("Error setting ATS score:", error);
    }
  },

  // Get skill progress
  async getSkillProgress(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/skills`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch skill progress");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching skill progress:", error);
      throw error;
    }
  },

  // Get recommended next steps
  async getRecommendedNextSteps(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/dashboard/${userId}/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommended next steps");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching recommended next steps:", error);
      throw error;
    }
  },
};

export default dashboardService;
