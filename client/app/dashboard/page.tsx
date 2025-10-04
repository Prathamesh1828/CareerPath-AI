"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Map,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Sparkles,
  AlertTriangle,
  Loader2,
  Star,
  Flame,
  Activity,
  RefreshCw,
  Award,
  CheckCircle2,
  PlayCircle,
  Quote,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Script from "next/script";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface CareerPathProgress {
  careerPath: string;
  careerName: string;
  totalCourses: number;
  completedCourses: number;
  progress: number;
  lastUpdated: string;
}

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    atsScore: 0,
    skillsMatched: 0,
    coursesCompleted: 0,
    careerProgress: 0,
  });

  const [metrics, setMetrics] = useState({
    learningTime: 0,
    learningStreak: 0,
    profileCompleteness: 0,
    longestStreak: 0,
  });

  const [careerProgress, setCareerProgress] = useState<CareerPathProgress[]>(
    []
  );
  const [showCounselorForm, setShowCounselorForm] = useState(false);
  const [counselorForm, setCounselorForm] = useState({
    name: "",
    advisor: "",
    field: "",
    bio: "",
    experience: "",
    email: "",
  });

  const [reviewForm, setReviewForm] = useState({
    name: "",
    position: "",
    review: "",
  });
  const [reviews, setReviews] = useState<
    {
      _id?: string;
      name: string;
      position: string;
      review: string;
      createdAt?: string;
    }[]
  >([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Fetch career progress from localStorage
  // Fetch career progress from localStorage
  const fetchCareerProgress = () => {
    const allKeys = Object.keys(localStorage);
    const courseKeys = allKeys.filter(
      (key) => key.startsWith("course_") && key.endsWith("_completed")
    );

    const progressMap: { [key: string]: CareerPathProgress } = {};
    let totalCompletedCourses = 0;
    let totalCoursesAcrossAllPaths = 0;

    courseKeys.forEach((key) => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || "{}");

        // Extract career path from course data
        // Assuming course IDs are like: "frontend-phase1-course1"
        const courseId = key.replace("course_", "").replace("_completed", "");
        const careerPath = courseId.split("-")[0];

        if (!progressMap[careerPath]) {
          progressMap[careerPath] = {
            careerPath,
            careerName: formatCareerName(careerPath),
            totalCourses: 0,
            completedCourses: 0,
            progress: 0,
            lastUpdated: data.completedAt || new Date().toISOString(),
          };
        }

        progressMap[careerPath].totalCourses++;
        totalCoursesAcrossAllPaths++;

        if (data.completed) {
          progressMap[careerPath].completedCourses++;
          totalCompletedCourses++;
        }

        if (
          data.completedAt &&
          new Date(data.completedAt) >
            new Date(progressMap[careerPath].lastUpdated)
        ) {
          progressMap[careerPath].lastUpdated = data.completedAt;
        }
      } catch (error) {
        console.error("Error parsing course data:", error);
      }
    });

    // Calculate progress percentages for each path
    const progressArray = Object.values(progressMap).map((p) => ({
      ...p,
      progress:
        p.totalCourses > 0
          ? Math.round((p.completedCourses / p.totalCourses) * 100)
          : 0,
    }));

    setCareerProgress(progressArray);

    // Calculate OVERALL progress across ALL courses (not average)
    const overallProgress =
      totalCoursesAcrossAllPaths > 0
        ? Math.round((totalCompletedCourses / totalCoursesAcrossAllPaths) * 100)
        : 0;

    console.log("📊 Overall Progress:", {
      totalCompleted: totalCompletedCourses,
      totalCourses: totalCoursesAcrossAllPaths,
      overallProgress: overallProgress,
    });

    // Update overall career progress
    setAnimatedValues((prev) => ({
      ...prev,
      careerProgress: overallProgress,
      coursesCompleted: totalCompletedCourses,
    }));
  };

  const formatCareerName = (careerPath: string): string => {
    const names: { [key: string]: string } = {
      frontend: "Frontend Developer",
      backend: "Backend Developer",
      fullstack: "Full Stack Developer",
      "data-scientist": "Data Scientist",
      "mobile-developer": "Mobile Developer",
      "ml-engineer": "ML Engineer",
      "devops-engineer": "DevOps Engineer",
      "cloud-engineer": "Cloud Engineer",
    };
    return (
      names[careerPath] ||
      careerPath.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const response = await fetch(
        `${API_URL}/reviews?status=approved&limit=50`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewForm.name || !reviewForm.position || !reviewForm.review) {
      toast({
        title: "Error",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (reviewForm.review.length < 10) {
      toast({
        title: "Error",
        description: "Review must be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewForm),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Review Submitted! ✨",
          description: "Thank you for sharing your feedback!",
        });

        setReviewForm({ name: "", position: "", review: "" });
        await fetchReviews();
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Failed to submit review.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleCounselorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !counselorForm.name ||
      !counselorForm.advisor ||
      !counselorForm.field ||
      !counselorForm.bio ||
      !counselorForm.experience ||
      !counselorForm.email
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Counselor Request Submitted",
      description: `Thanks ${counselorForm.name}, we'll review your request!`,
    });

    setCounselorForm({
      name: "",
      advisor: "",
      field: "",
      bio: "",
      experience: "",
      email: "",
    });
    setShowCounselorForm(false);
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Fetch User Error:", error);
    }
  };

  const fetchMetrics = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found. Skipping metrics fetch.");
      return;
    }

    try {
      console.log("🔄 Fetching metrics...");
      const response = await fetch(`${API_URL}/metrics/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📊 Metrics Response:", data);

      if (data.success) {
        setMetrics({
          learningTime: data.data.careerRoadmapTime?.totalMinutes || 0,
          learningStreak: data.data.learningStreak?.currentStreak || 0,
          longestStreak: data.data.learningStreak?.longestStreak || 0,
          profileCompleteness: data.data.profileCompleteness?.score || 0,
        });
        console.log("✅ Metrics updated");
      }
    } catch (error) {
      console.error("❌ Failed to fetch metrics:", error);
    }
  };

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true);
    await fetchMetrics();
    fetchCareerProgress();
    setTimeout(() => setIsRefreshing(false), 1000);
    toast({
      title: "Refreshed! ✨",
      description: "Metrics updated successfully.",
    });
  };

  useEffect(() => {
    fetchUserDetails();
    fetchReviews();
    fetchMetrics();
    fetchCareerProgress();
    setIsVisible(true);

    // Listen for progress updates from career roadmap page
    const handleStorageChange = () => {
      fetchCareerProgress();
    };

    window.addEventListener("storage", handleStorageChange);

    // Check for updates from same window
    const checkForUpdates = setInterval(() => {
      const lastUpdate = localStorage.getItem("careerProgressUpdated");
      if (lastUpdate) {
        fetchCareerProgress();
        localStorage.removeItem("careerProgressUpdated");
      }
    }, 1000);

    const metricsInterval = setInterval(() => {
      console.log("🔄 Auto-refreshing metrics...");
      fetchMetrics();
      fetchCareerProgress();
    }, 30000);

    const resumeData = localStorage.getItem("resumeAnalysisData");
    let storedResumeScore = 0;
    let storedAtsScore = 0;

    if (resumeData) {
      try {
        const parsedData = JSON.parse(resumeData);
        storedResumeScore = parsedData.resumeScore || 0;
        storedAtsScore = parsedData.atsScore || 0;
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }

    const timer = setTimeout(() => {
      setAnimatedValues({
        resumeScore: storedResumeScore || 85,
        atsScore: storedAtsScore || 78,
        skillsMatched: 80,
        coursesCompleted: careerProgress.reduce(
          (sum, cp) => sum + cp.completedCourses,
          0
        ),
        careerProgress: 65,
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(metricsInterval);
      clearInterval(checkForUpdates);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const formatLearningTime = (minutes: number) => {
    if (minutes === 0) return "0m";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Script
        src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2025/10/03/08/20251003082306-S6S1A804.js"
        strategy="afterinteractive"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
        <div className="space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div
            className={`gradient-animation rounded-lg md:rounded-xl lg:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-white hover-lift shadow-lg ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                  Welcome back, {user ? user.name : "..."}! 🚀
                </h1>
                <p className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed">
                  Ready to take the next step in your career journey?
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 self-start">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-yellow-300" />
                <span className="text-xs md:text-sm font-medium">
                  AI-Powered
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {/* Resume Score */}
            <Card className="group hover-lift transition-all duration-300 hover:shadow-xl border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Resume Score
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-orange-600">
                    {animatedValues.atsScore}
                    <span className="text-sm text-gray-500 font-normal">
                      /100
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compatibility check
                  </p>
                  <Progress value={animatedValues.atsScore} className="h-2.5" />
                </div>
              </CardContent>
            </Card>

            {/* Skills Matched */}
            <Card className="group hover-lift transition-all duration-300 hover:shadow-xl border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Skills Matched
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-green-50 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-green-600">
                    {animatedValues.skillsMatched}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    3 skills to improve
                  </p>
                  <Progress
                    value={animatedValues.skillsMatched}
                    className="h-2.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learning Time */}
            <Card className="group hover-lift transition-all duration-300 hover:shadow-xl border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-700">
                      Learning Time
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefreshMetrics}
                      disabled={isRefreshing}
                      className="h-7 w-7 p-0 hover:bg-blue-50"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 text-blue-600 ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-600">Active</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatLearningTime(metrics.learningTime)}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    {metrics.learningStreak} day streak
                  </p>
                  <div className="bg-blue-50 rounded-lg p-2 text-xs text-blue-700">
                    🏆 Best: {metrics.longestStreak} days
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Progress */}
            <Card className="group hover-lift transition-all duration-300 hover:shadow-xl border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">
                      {animatedValues.coursesCompleted} courses completed
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-pink-50 group-hover:scale-110 transition-transform">
                  <Map className="h-5 w-5 text-pink-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-pink-600">
                    {animatedValues.careerProgress}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {careerProgress.length} career path
                    {careerProgress.length !== 1 ? "s" : ""} started
                  </p>
                  <Progress
                    value={animatedValues.careerProgress}
                    className="h-2.5"
                  />
                  <div className="text-xs text-gray-500">
                    Based on all courses across all paths
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Progress Section - NEW! */}
          {careerProgress.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                      <Map className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        Your Career Paths
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Track your progress across different career paths
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-pink-600">
                        {animatedValues.careerProgress}%
                      </div>
                      <div className="text-xs text-gray-500">Overall</div>
                    </div>
                    <Link href="/dashboard/career-roadmap">
                      <Button variant="outline" size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Overall Progress Bar */}
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Overall Progress
                      </h4>
                      <p className="text-sm text-gray-600">
                        {animatedValues.coursesCompleted} courses completed
                        across all paths
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-pink-600">
                      {animatedValues.careerProgress}%
                    </div>
                  </div>
                  <Progress
                    value={animatedValues.careerProgress}
                    className="h-4"
                  />
                </div>

                {/* Individual Career Paths */}
                <div className="space-y-3">
                  {careerProgress.map((career, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {career.careerName}
                            </h3>
                            {career.progress === 100 && (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {career.completedCourses} / {career.totalCourses}{" "}
                              courses
                            </span>
                            <span className="text-xs text-gray-500">
                              Last updated: {formatDate(career.lastUpdated)}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            career.progress === 100
                              ? "bg-green-100 text-green-700"
                              : career.progress >= 50
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {career.progress}%
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Path Progress</span>
                          <span
                            className={`font-semibold ${
                              career.progress === 100
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            {career.progress}%
                          </span>
                        </div>
                        <Progress value={career.progress} className="h-3" />

                        {career.progress === 100 && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-700 flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              Congratulations! You've completed this career
                              path! 🎉
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/career-roadmap">
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                    <Map className="h-4 w-4 mr-2" />
                    Explore More Career Paths
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* AI Recommendations */}
          <Card className="hover-lift shadow-md border-0">
            <CardHeader className="p-6 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      AI Recommendations
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Personalized suggestions for your career growth
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                  AI
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              {[
                {
                  type: "Skill Gap Alert",
                  message:
                    "Consider learning TypeScript to match 90% of Frontend Developer jobs",
                  bgColor: "bg-purple-50",
                  borderColor: "border-purple-200",
                  textColor: "text-purple-900",
                  icon: Target,
                  priority: "High",
                },
                {
                  type: "Course Recommendation",
                  message:
                    '"Advanced React Patterns" course aligns with your career goals',
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-200",
                  textColor: "text-blue-900",
                  icon: BookOpen,
                  priority: "Medium",
                },
                {
                  type: "Resume Tip",
                  message:
                    "Add more quantifiable achievements to boost your ATS score",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-200",
                  textColor: "text-green-900",
                  icon: FileText,
                  priority: "Low",
                },
              ].map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 ${rec.bgColor} rounded-xl border ${rec.borderColor} hover:shadow-lg transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 ${rec.bgColor} rounded-lg border ${rec.borderColor}`}
                    >
                      <rec.icon className={`h-5 w-5 ${rec.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold ${rec.textColor}`}>
                          {rec.type}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{rec.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Submit a Review
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Share your experience with others 🚀
                  </CardDescription>
                </div>
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  {reviews.length} Reviews
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, name: e.target.value })
                  }
                  disabled={isSubmittingReview}
                  className="h-11"
                  required
                />
                <Input
                  placeholder="Your Position (e.g., Software Engineer at Google)"
                  value={reviewForm.position}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, position: e.target.value })
                  }
                  disabled={isSubmittingReview}
                  className="h-11"
                  required
                />
                <Textarea
                  placeholder="Write your review... (minimum 10 characters)"
                  value={reviewForm.review}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, review: e.target.value })
                  }
                  disabled={isSubmittingReview}
                  className="min-h-[120px] resize-none"
                  required
                  minLength={10}
                  maxLength={2000}
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{reviewForm.review.length}/2000 characters</span>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 h-11"
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">What others say:</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchReviews}
                    disabled={isLoadingReviews}
                  >
                    {isLoadingReviews ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Refresh"
                    )}
                  </Button>
                </div>

                {isLoadingReviews ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No reviews yet. Be the first!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((r, i) => (
                      <div key={r._id || i} className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:shadow-[0_10px_30px_rgba(147,51,234,0.25)] transition-all">
                        <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {r.name}
                              </p>
                              <p className="text-sm text-blue-600 font-medium">
                                {r.position}
                              </p>
                            </div>
                            {r.createdAt && (
                              <Badge variant="secondary" className="text-xs">
                                {formatDate(r.createdAt)}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-800 leading-relaxed">
                            "{r.review}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Counselor Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-6">
              <CardTitle className="text-2xl font-bold">
                Want to be a Counselor?
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Help others by guiding them in their career journey 🌟
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {!showCounselorForm ? (
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 h-11"
                  onClick={() => setShowCounselorForm(true)}
                >
                  Apply Now
                </Button>
              ) : (
                <form onSubmit={handleCounselorSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={counselorForm.name}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        name: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                  <Input
                    placeholder="Advisor"
                    value={counselorForm.advisor}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        advisor: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                  <Input
                    placeholder="Field (e.g., AI, Web Development)"
                    value={counselorForm.field}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        field: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                  <Textarea
                    placeholder="Short Bio"
                    value={counselorForm.bio}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        bio: e.target.value,
                      })
                    }
                    className="min-h-[120px]"
                  />
                  <Input
                    placeholder="Experience (e.g., 5 years)"
                    value={counselorForm.experience}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        experience: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={counselorForm.email}
                    onChange={(e) =>
                      setCounselorForm({
                        ...counselorForm,
                        email: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCounselorForm(false)}
                      className="flex-1 h-11"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 h-11"
                    >
                      Submit Request
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
