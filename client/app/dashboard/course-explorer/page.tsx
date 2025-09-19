"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Star,
  ExternalLink,
  Bookmark,
  Search,
  Loader2,
  Users,
  Filter,
  RefreshCw,
  Brain,
  Target,
  Sparkles,
  ChevronDown,
  X,
  TrendingUp,
  Award,
  Play,
  BookOpen,
  Zap,
  ArrowUpRight,
  Grid3X3,
  List,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

// User Profile for AI Recommendations (can be customized based on user selection)
const userProfile = {
  currentRole: "Frontend Developer",
  experience: "Intermediate",
  skills: ["React", "JavaScript", "CSS", "HTML"],
  careerGoals: ["Full Stack Development", "React Native", "Node.js"],
  preferredPlatforms: ["Udemy", "Coursera"],
  budget: "medium",
  timeCommitment: "part-time",
  learningStyle: "project-based",
};

// Comprehensive mock course data for all developer types
const mockCourses = [
  // Frontend Development Courses
  {
    id: 1,
    title: "The Complete React Developer Course (w/ Hooks and Redux)",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.7,
    reviewCount: 47285,
    duration: "39 hours",
    level: "Intermediate",
    price: 84.99,
    originalPrice: 199.99,
    discount: 58,
    currency: "USD",
    skills: ["React", "Redux", "JavaScript", "Hooks", "Context API"],
    description:
      "Learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-11-01",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
    courseUrl: "https://www.udemy.com/course/react-2nd-edition/",
    students: 176543,
    projects: 8,
    aiScore: 95,
  },
  {
    id: 2,
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    reviewCount: 59847,
    duration: "28 hours",
    level: "Advanced",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: [
      "CSS3",
      "Sass",
      "Flexbox",
      "Grid",
      "Animations",
      "Responsive Design",
    ],
    description:
      "The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more.",
    isBookmarked: true,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-10-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1026604_790b_2.jpg",
    courseUrl: "https://www.udemy.com/course/advanced-css-and-sass/",
    students: 298756,
    projects: 6,
    aiScore: 92,
  },
  {
    id: 3,
    title: "Docker Mastery: with Kubernetes + Swarm from a Docker Captain",
    platform: "Udemy",
    instructor: "Bret Fisher",
    rating: 4.8,
    reviewCount: 139000,
    duration: "21.5 hours",
    level: "All Levels",
    price: 24.99,
    originalPrice: 129.99,
    discount: 80,
    currency: "USD",
    skills: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Swarm",
      "Containerization",
      "CI/CD Integration",
      "DevOps",
    ],
    description:
      "Master Docker from scratch with hands-on projects. Learn to build, ship, and run containers using Docker, Docker Compose, and Kubernetes. Ideal for developers and DevOps engineers.",
    isBookmarked: true,
    isRecommended: true,
    category: "DevOps / Backend Development",
    language: "English",
    lastUpdated: "2024-11-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1035004_6c3b_2.jpg",
    courseUrl: "https://www.udemy.com/course/docker-mastery/",
    students: 250000,
    projects: 7,
    aiScore: 90,
  },
  {
    id: 39,
    title: "TypeScript for Beginners",
    platform: "FreeCodeCamp",
    instructor: "Hitesh Choudhary",
    rating: 4.8,
    reviewCount: 67890,
    duration: "5 hours",
    level: "Beginner",
    price: 0,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: ["TypeScript", "JavaScript", "Static Typing", "Node.js"],
    description:
      "Learn TypeScript from scratch in this comprehensive free course. Perfect for JavaScript developers.",
    isBookmarked: true,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-10-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=30LWjhZzg50",
    students: 234567,
    projects: 3,
    aiScore: 93,
  },
];

// AI Recommendation Engine
class AIRecommendationEngine {
  constructor(userProfile, courses) {
    this.userProfile = userProfile;
    this.courses = courses;
    this.weights = {
      skillMatch: 0.25,
      careerGoalAlignment: 0.2,
      levelMatch: 0.15,
      platformPreference: 0.1,
      budgetFit: 0.15,
      popularityScore: 0.1,
      freshnessScore: 0.05,
    };
  }

  calculateRecommendationScore(course) {
    let score = 0;

    const userSkills = this.userProfile.skills || [];
    const userGoals = this.userProfile.careerGoals || [];
    const preferredPlatforms = this.userProfile.preferredPlatforms || [];

    // Skill Match Score (25%)
    const skillMatches = course.skills.filter((skill) =>
      userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ).length;

    const skillScore =
      skillMatches > 0 ? (skillMatches / course.skills.length) * 100 : 20;
    score += skillScore * this.weights.skillMatch;

    // Career Goal Alignment (20%)
    const goalMatches = userGoals.filter(
      (goal) =>
        course.category.toLowerCase().includes(goal.toLowerCase()) ||
        course.skills.some((skill) =>
          goal.toLowerCase().includes(skill.toLowerCase())
        ) ||
        course.title.toLowerCase().includes(goal.toLowerCase())
    ).length;

    const goalScore = goalMatches > 0 ? 100 : 30;
    score += goalScore * this.weights.careerGoalAlignment;

    // Level Match (15%)
    const levelScore = this.getLevelScore(course.level);
    score += levelScore * this.weights.levelMatch;

    // Platform Preference (10%)
    const platformScore = preferredPlatforms.includes(course.platform)
      ? 100
      : 60;
    score += platformScore * this.weights.platformPreference;

    // Budget Fit (15%)
    const budgetScore = this.getBudgetScore(course.price);
    score += budgetScore * this.weights.budgetFit;

    // Popularity Score (10%)
    const ratingScore = (course.rating / 5) * 50;
    const studentScore = Math.min((course.students / 50000) * 50, 50);
    const popularityScore = ratingScore + studentScore;
    score += popularityScore * this.weights.popularityScore;

    // Freshness Score (5%)
    const daysSinceUpdate = this.getDaysSinceUpdate(course.lastUpdated);
    const freshnessScore = Math.max(100 - (daysSinceUpdate / 30) * 10, 0);
    score += freshnessScore * this.weights.freshnessScore;

    return Math.round(score);
  }

  getLevelScore(courseLevel) {
    const levelMap = {
      Beginner: { Beginner: 100, Intermediate: 80, Advanced: 40 },
      Intermediate: { Beginner: 60, Intermediate: 100, Advanced: 80 },
      Advanced: { Beginner: 20, Intermediate: 70, Advanced: 100 },
    };
    return levelMap[this.userProfile.experience]?.[courseLevel] || 50;
  }

  getBudgetScore(price) {
    switch (this.userProfile.budget) {
      case "low":
        return price === 0 ? 100 : price < 50 ? 80 : price < 100 ? 40 : 20;
      case "medium":
        return price === 0 ? 100 : price < 100 ? 90 : price < 200 ? 70 : 40;
      case "high":
        return 100;
      default:
        return 50;
    }
  }

  getDaysSinceUpdate(lastUpdated) {
    const updateDate = new Date(lastUpdated);
    const today = new Date();
    const diffTime = Math.abs(today - updateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getRecommendations(limit = 10) {
    const coursesWithScores = this.courses.map((course) => ({
      ...course,
      aiScore: this.calculateRecommendationScore(course),
      recommendationReason: this.getRecommendationReason(course),
    }));

    return coursesWithScores
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, limit);
  }

  getRecommendationReason(course) {
    const reasons = [];
    const userSkills = this.userProfile.skills || [];
    const userGoals = this.userProfile.careerGoals || [];

    // Skill matches
    const skillMatches = course.skills.filter((skill) =>
      userSkills.some((userSkill) =>
        userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    if (skillMatches.length > 0) {
      reasons.push(
        `Matches your ${skillMatches.slice(0, 2).join(", ")} skills`
      );
    }

    // Career goals
    const goalMatches = userGoals.filter(
      (goal) =>
        course.category.toLowerCase().includes(goal.toLowerCase()) ||
        course.title.toLowerCase().includes(goal.toLowerCase())
    );
    if (goalMatches.length > 0) {
      reasons.push(`Perfect for ${goalMatches[0]}`);
    }

    // Level appropriateness
    if (course.level === this.userProfile.experience) {
      reasons.push(`Ideal for ${this.userProfile.experience} level`);
    }

    // Highly rated
    if (course.rating >= 4.7) {
      reasons.push(`Highly rated (${course.rating}★)`);
    }

    // Popular
    if (course.students > 100000) {
      reasons.push(
        `Popular choice (${Math.floor(course.students / 1000)}k+ students)`
      );
    }

    // Free
    if (course.price === 0) {
      reasons.push(`Free course`);
    }

    // Many projects
    if (course.projects > 10) {
      reasons.push(`${course.projects} hands-on projects`);
    }

    return reasons.slice(0, 2).join(" • ") || "Recommended for you";
  }
}

export default function CourseExplorerPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("ai-recommended");
  const [bookmarkedCourses, setBookmarkedCourses] = useState(
    new Set([2, 5, 12, 19, 26, 35, 38, 39])
  );
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    currentRole: "",
    experience: "",
    careerGoals: [],
    preferredPlatforms: [],
    budget: "",
    timeCommitment: "",
    learningStyle: "",
    skills: [],
  });

  // Fetch courses with AI scoring
  const fetchCoursesWithAI = async () => {
    setLoading(true);
    try {
      const filteredCourses = [...mockCourses];

      const aiEngine = new AIRecommendationEngine(formData, filteredCourses);
      const coursesWithAI = aiEngine.getRecommendations(filteredCourses.length);

      setCourses(coursesWithAI);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Load courses
  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetchCoursesWithAI();

    setLoading(false);
  }, [searchTerm, selectedLevel, selectedPlatform, sortBy]);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Fetched Profile:", data);

        if (!res.ok) {
          return toast({
            title: "Error",
            description: data.message || "Failed to fetch profile.",
            variant: "destructive",
          });
        }

        setFormData({
          currentRole: data.currentRole || "",
          experience: data.experience || "",
          careerGoals: data.careerGoals || [],
          preferredPlatforms: data.preferredPlatforms || [],
          budget: data.budget || "",
          timeCommitment: data.timeCommitment || "",
          learningStyle: data.learningStyle || "",
          skills: data.skills || [],
        });

        setSkills(data.skills || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast({
          title: "Error",
          description: "Something went wrong while fetching profile.",
          variant: "destructive",
        });
      }
    };

    fetchSkills();
  }, []);

  // Fetch on mount or when formData changes
  useEffect(() => {
    fetchCoursesWithAI();
  }, [formData]);

  // Initial load
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Refresh courses
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCourses();
    setRefreshing(false);
  };

  // Toggle bookmark
  const toggleBookmark = (courseId) => {
    setBookmarkedCourses((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(courseId)) {
        newBookmarks.delete(courseId);
      } else {
        newBookmarks.add(courseId);
      }
      return newBookmarks;
    });
  };

  // Filter courses for tabs
  const filteredCourses = courses;
  const recommendedCourses = courses.filter((course) => course.isRecommended);
  const bookmarkedCoursesData = courses.filter((course) =>
    bookmarkedCourses.has(course.id)
  );

  // Format price
  const formatPrice = (price, currency = "USD") => {
    if (price === 0) return "Free";

    // Convert USD to INR (approximate rate: 1 USD = 83 INR)
    const priceInINR = currency === "USD" ? price * 83 : price;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(priceInINR);
  };

  // Get category stats
  const categoryStats = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Enhanced Header - Mobile Optimized */}
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Course Explorer
            </h1>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered course recommendations tailored for developers
          </p>
        </div>

        {/* AI Personalization Card - Enhanced Mobile Layout */}
        <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h3 className="font-medium sm:font-semibold text-blue-900 text-sm sm:text-base">
                      AI Personalization Active
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 text-xs w-fit"
                    >
                      {formData.experience} {formData.currentRole}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-blue-700 truncate">
                      <span className="font-medium">Skills:</span>{" "}
                      {formData.skills.slice(0, 3).join(", ")}
                      {formData.skills.length > 3 && "..."}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 truncate">
                      <span className="font-medium">Goals:</span>{" "}
                      {(formData?.careerGoals || []).slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-purple-600">
                    {recommendedCourses.length}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600">
                    AI Matches
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">
                    {courses.filter((c) => c.price === 0).length}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600">
                    Free Courses
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-orange-600">
                    {Math.round(
                      courses.reduce((sum, c) => sum + c.rating, 0) /
                        courses.length || 0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-orange-600">
                    Avg Rating
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filters - Mobile First Design */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Search & Filter Courses
              </CardTitle>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="gap-2 w-full sm:w-auto"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 w-full sm:w-auto sm:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs self-center"
                >
                  {courses.length}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-3 sm:p-6 pt-0">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                <Input
                  placeholder="Search courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 sm:h-12 text-sm sm:text-base w-full"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div
              className={`space-y-3 sm:space-y-0 ${
                showFilters ? "block" : "hidden"
              } sm:block`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Level Select */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                {/* Platform Select */}
                <Select
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="udemy">Udemy</SelectItem>
                    <SelectItem value="coursera">Coursera</SelectItem>
                    <SelectItem value="freecodecamp">FreeCodeCamp</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Select */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-recommended">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                        AI Recommended
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="projects">Most Projects</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode (Desktop Only) */}
                <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="pt-3 sm:pt-4 border-t">
                <div className="flex flex-wrap gap-2 justify-start sm:justify-center">
                  {Object.entries(categoryStats)
                    .slice(0, 6)
                    .map(([category, count]) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 text-xs transition-colors duration-200"
                        onClick={() => setSearchTerm(category)}
                      >
                        {category} ({count})
                      </Badge>
                    ))}
                </div>
              </div>

              {/* Search Stats */}
              {!loading && (
                <div className="pt-3 sm:pt-4 border-t flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-600 text-center">
                  <span>Found {courses.length} courses</span>
                  {searchTerm && (
                    <span className="text-blue-600">
                      Searching for "{searchTerm}"
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 mt-3">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-red-600">
                <ExternalLink className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="flex-1 text-sm sm:text-base">{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCourses}
                  className="ml-auto text-xs w-full sm:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Mobile-First Tabs */}
        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 h-12 sm:h-14 bg-white shadow-sm min-w-[300px]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>All ({filteredCourses.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                  <span>AI ({recommendedCourses.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="bookmarked"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Saved ({bookmarkedCoursesData.length})</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin mx-auto text-blue-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  AI is analyzing courses for personalized recommendations...
                </p>
              </div>
            </div>
          )}

          {/* All Courses Tab */}
          <TabsContent value="all" className="space-y-4">
            <CourseGrid
              courses={filteredCourses}
              bookmarkedCourses={bookmarkedCourses}
              onToggleBookmark={toggleBookmark}
              loading={loading}
              formatPrice={formatPrice}
              viewMode={viewMode}
            />
          </TabsContent>

          {/* Recommended Courses Tab */}
          <TabsContent value="recommended" className="space-y-4">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium sm:font-semibold text-purple-900 text-sm sm:text-base">
                        AI-Powered Recommendations
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-700 mt-0.5">
                        Personally selected based on your skills, goals, and
                        preferences.
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-purple-600 text-white text-xs sm:text-sm">
                      {Math.round(
                        recommendedCourses.reduce(
                          (sum, course) => sum + course.aiScore,
                          0
                        ) / recommendedCourses.length || 0
                      )}
                      % Match
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CourseGrid
              courses={recommendedCourses}
              bookmarkedCourses={bookmarkedCourses}
              onToggleBookmark={toggleBookmark}
              loading={loading}
              formatPrice={formatPrice}
              showAIScore={true}
              viewMode={viewMode}
            />
          </TabsContent>

          {/* Bookmarked Courses Tab */}
          <TabsContent value="bookmarked" className="space-y-4">
            {bookmarkedCoursesData.length === 0 && !loading ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="py-12 sm:py-20 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Bookmark className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No Bookmarked Courses
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                    Start bookmarking courses you're interested in to access
                    them quickly!
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = document.querySelector('[value="all"]');
                      tabs?.click();
                    }}
                    className="gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <CourseGrid
                courses={bookmarkedCoursesData}
                bookmarkedCourses={bookmarkedCourses}
                onToggleBookmark={toggleBookmark}
                loading={loading}
                formatPrice={formatPrice}
                viewMode={viewMode}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Enhanced Course Grid Component - Mobile First
function CourseGrid({
  courses,
  bookmarkedCourses,
  onToggleBookmark,
  loading,
  formatPrice,
  showAIScore = false,
  viewMode = "grid",
}) {
  if (loading) {
    return (
      <div
        className={`grid gap-4 sm:gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <CourseCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="py-12 sm:py-20 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            No Courses Found
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {courses.map((course) => (
        <EnhancedCourseCard
          key={course.id}
          course={course}
          isBookmarked={bookmarkedCourses.has(course.id)}
          onToggleBookmark={() => onToggleBookmark(course.id)}
          formatPrice={formatPrice}
          showAIScore={showAIScore}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

// Enhanced Course Card Component - Mobile Optimized
function EnhancedCourseCard({
  course,
  isBookmarked,
  onToggleBookmark,
  formatPrice,
  showAIScore = false,
  viewMode = "grid",
}) {
  const discountBadge =
    course.originalPrice && course.originalPrice > course.price
      ? `${Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )}% OFF`
      : null;

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-[1.01]">
        <div className="flex flex-col sm:flex-row">
          {/* Course Image */}
          <div className="relative sm:w-48 lg:w-56 flex-shrink-0">
            <div className="aspect-video sm:aspect-square relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const colors = {
                    Udemy: "A435F0",
                    Coursera: "0056D3",
                    FreeCodeCamp: "0A0A23",
                  };
                  const color = colors[course.platform] || "6366F1";
                  e.target.src = `https://via.placeholder.com/400x225/${color}/white?text=${encodeURIComponent(
                    course.platform
                  )}`;
                }}
              />

              {/* Bookmark Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleBookmark();
                }}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg h-8 w-8 p-0"
              >
                <Bookmark
                  className={`h-3 w-3 ${
                    isBookmarked
                      ? "fill-blue-600 text-blue-600"
                      : "text-gray-600"
                  }`}
                />
              </Button>

              {/* Badges */}
              {discountBadge && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white font-semibold text-xs">
                  {discountBadge}
                </Badge>
              )}
            </div>
          </div>

          {/* Course Content */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                  {course.title}
                </h3>
                {course.isRecommended && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs shrink-0">
                    🤖 AI
                  </Badge>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600">
                by {course.instructor}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {course.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats and Price */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{(course.students / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right">
                  <span
                    className={`text-base sm:text-lg font-bold ${
                      course.price === 0 ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {formatPrice(course.price, course.currency)}
                  </span>
                  {course.originalPrice &&
                    course.originalPrice > course.price && (
                      <div className="text-xs text-gray-500 line-through">
                        {formatPrice(course.originalPrice, course.currency)}
                      </div>
                    )}
                </div>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  onClick={() => window.open(course.courseUrl, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Enroll</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-[1.02] h-full flex flex-col">
      <div className="relative overflow-hidden">
        {/* Course Image */}
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const colors = {
                Udemy: "A435F0",
                Coursera: "0056D3",
                FreeCodeCamp: "0A0A23",
              };
              const color = colors[course.platform] || "6366F1";
              e.target.src = `https://via.placeholder.com/400x225/${color}/white?text=${encodeURIComponent(
                course.platform
              )}`;
            }}
          />

          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark();
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <Bookmark
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-600"
              }`}
            />
          </Button>

          {/* Discount Badge */}
          {discountBadge && (
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white font-semibold text-xs">
              {discountBadge}
            </Badge>
          )}

          {/* AI Score Badge */}
          {showAIScore && course.aiScore > 80 && (
            <Badge className="absolute top-10 sm:top-12 left-2 sm:left-3 bg-purple-500 text-white font-semibold text-xs">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
              {course.aiScore}%
            </Badge>
          )}

          {/* Platform Badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium text-xs"
          >
            {course.platform}
          </Badge>
        </div>

        {/* Course Content */}
        <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                {course.title}
              </h3>
              {course.isRecommended && (
                <Badge className="bg-purple-100 text-purple-800 text-xs shrink-0">
                  🤖 AI
                </Badge>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              by {course.instructor}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* AI Recommendation Reason */}
          {course.recommendationReason && showAIScore && (
            <div className="bg-purple-50 p-2 sm:p-3 rounded-md border border-purple-200">
              <p className="text-xs text-purple-700">
                <Target className="h-3 w-3 inline mr-1" />
                {course.recommendationReason}
              </p>
            </div>
          )}

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{course.skills.length - 4}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{(course.students / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{course.duration}</span>
              </div>
              {course.projects > 0 && (
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{course.projects} projects</span>
                </div>
              )}
            </div>
            {course.certificateOffered && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-2 w-2 mr-1" />
                Cert
              </Badge>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t mt-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg lg:text-xl font-bold ${
                    course.price === 0 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {formatPrice(course.price, course.currency)}
                </span>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {formatPrice(course.originalPrice, course.currency)}
                    </span>
                  )}
              </div>
              {course.platform === "Coursera" && course.price > 0 && (
                <p className="text-xs text-gray-500">Monthly subscription</p>
              )}
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
              onClick={() => window.open(course.courseUrl, "_blank")}
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Enroll</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Loading Skeleton Component - Mobile Optimized
function CourseCardSkeleton({ viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 lg:w-56 aspect-video sm:aspect-square bg-gray-200 animate-pulse" />
          <div className="p-4 sm:p-6 flex-1 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm h-full">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
