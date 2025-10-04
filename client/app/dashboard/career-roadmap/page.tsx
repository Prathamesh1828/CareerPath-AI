"use client";

import React, { useState, useEffect } from "react";
import CourseSection from "@/components/courseSection";
import { courseService } from "@/app/services/courseService";
import { BookOpen, TrendingUp, Target, Loader } from "lucide-react";

interface Course {
  _id: string;
  name: string;
  platform: string;
  duration: string;
  rating: number;
  url: string;
  completed: boolean;
  careerPath: string;
  phaseId: number;
  phaseTitle: string;
  sections: Section[];
  totalLectures: number;
}

interface Section {
  _id: string;
  title: string;
  description: string;
  lectures: Lecture[];
  order: number;
}

interface Lecture {
  _id: string;
  title: string;
  duration: string;
  description: string;
  order: number;
}

interface Phase {
  id: number;
  title: string;
  courses: Course[];
}

interface CareerPathInfo {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const CareerRoadmapPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] =
    useState<string>("frontend");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Fetch user data FIRST
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No token found");
          setError("Please sign in to continue");
          setUserLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("✅ Fetched User Profile:", data);

        if (!res.ok) {
          console.error("❌ Failed to fetch profile");
          setError("Failed to load user profile");
          setUserLoading(false);
          return;
        }

        const fetchedUserId =
          data.user?.id || data.user?._id || data.userId || "";

        if (!fetchedUserId) {
          console.error("❌ No userId in response");
          setError("User ID not found");
          setUserLoading(false);
          return;
        }

        if (fetchedUserId.length !== 24) {
          console.error("❌ Invalid userId format:", fetchedUserId);
          setError("Invalid user ID format");
          setUserLoading(false);
          return;
        }

        setUserId(fetchedUserId);
        console.log("✅ UserId set successfully:", fetchedUserId);
      } catch (error) {
        console.error("❌ Fetch Error:", error);
        setError("Failed to load user data");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch courses ONLY after userId is loaded
  useEffect(() => {
    if (userId && selectedCareerPath && !userLoading) {
      fetchCourses();
    }
  }, [selectedCareerPath, userId, userLoading]);

  // Start session when component mounts
  useEffect(() => {
    const startTimeSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log("🚀 Starting learning session...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/metrics/start-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setSessionStartTime(new Date());
          console.log(
            "✅ Session started at:",
            new Date().toLocaleTimeString()
          );
        }
      } catch (error) {
        console.error("❌ Failed to start session:", error);
      }
    };

    startTimeSession();

    return () => {
      if (sessionStartTime) {
        endTimeSession();
      }
    };
  }, []);

  // End session function
  const endTimeSession = async () => {
    if (!sessionStartTime) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const durationMinutes = Math.round(
      (new Date().getTime() - sessionStartTime.getTime()) / 60000
    );

    console.log("⏹️ Ending session. Duration:", durationMinutes, "minutes");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/metrics/end-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ durationMinutes }),
        }
      );

      const data = await response.json();
      console.log("✅ Session ended successfully:", data);
    } catch (error) {
      console.error("❌ Failed to end session:", error);
    }
  };

  // Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && sessionStartTime) {
        console.log("⏸️ Page hidden - pausing session");
        endTimeSession();
        setSessionStartTime(null);
      } else if (!document.hidden && !sessionStartTime) {
        console.log("▶️ Page visible - resuming session");
        const token = localStorage.getItem("token");
        if (token) {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/start-session`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then(() => setSessionStartTime(new Date()));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sessionStartTime]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📥 Fetching courses for career path:", selectedCareerPath);

      const response = await courseService.fetchCoursesByCareerPath(
        selectedCareerPath
      );

      if (response.success) {
        setCourses(response.courses);

        const phaseMap: { [key: number]: Phase } = {};

        response.courses.forEach((course: Course) => {
          const phaseKey = course.phaseId;
          if (!phaseMap[phaseKey]) {
            phaseMap[phaseKey] = {
              id: course.phaseId,
              title: course.phaseTitle,
              courses: [],
            };
          }
          phaseMap[phaseKey].courses.push(course);
        });

        const phasesArray = Object.values(phaseMap).sort((a, b) => a.id - b.id);
        setPhases(phasesArray);

        if (phasesArray.length > 0) {
          setSelectedPhase(phasesArray[0].id);
        }

        console.log("✅ Courses loaded:", response.courses.length);
      }
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Callback function to handle progress updates
  const handleProgressUpdate = () => {
    console.log("🔔 Progress update received in CareerRoadmapPage");

    setRefreshTrigger((prev) => prev + 1);
    localStorage.setItem("careerProgressUpdated", Date.now().toString());

    console.log("✅ Progress update notification sent");
  };

  const careerPaths = [
    { id: "frontend", name: "Frontend Developer" },
    { id: "backend", name: "Backend Developer" },
    { id: "fullstack", name: "Full Stack Developer" },
    { id: "data-scientist", name: "Data Scientist" },
    { id: "mobile-developer", name: "Mobile Developer" },
    { id: "ml-engineer", name: "ML Engineer" },
    { id: "devops-engineer", name: "DevOps Engineer" },
    { id: "cloud-engineer", name: "Cloud Engineer" },
    { id: "ai-engineer", name: "AI Engineer" },
    { id: "cybersecurity-analyst", name: "Cybersecurity Analyst" },
    { id: "game-developer", name: "Game Developer" },
    { id: "blockchain-developer", name: "Blockchain Developer" },
    { id: "embedded-systems-engineer", name: "Embedded Systems Engineer" },
    { id: "ui-ux-designer", name: "UI/UX Designer" },
    { id: "product-manager-tech", name: "Technical Product Manager" },
    { id: "business-analyst", name: "Business Analyst" },
    { id: "project-manager", name: "Project Manager" },
    { id: "product-manager", name: "Product Manager" },
    { id: "operations-manager", name: "Operations Manager" },
    { id: "hr-specialist", name: "HR Specialist" },
    { id: "financial-analyst", name: "Financial Analyst" },
    { id: "investment-banker", name: "Investment Banker" },
    { id: "accountant", name: "Accountant" },
    { id: "economist", name: "Economist" },
    { id: "actuary", name: "Actuary" },
    { id: "counselor", name: "Counselor" },
    { id: "psychologist", name: "Psychologist" },
    { id: "nutritionist", name: "Nutritionist" },
    { id: "fitness-trainer", name: "Fitness Trainer" },
    { id: "public-health-specialist", name: "Public Health Specialist" },
    { id: "teacher", name: "Teacher" },
    { id: "educational-consultant", name: "Educational Consultant" },
    { id: "research-scientist", name: "Research Scientist" },
    { id: "career-coach", name: "Career Coach" },
    { id: "corporate-trainer", name: "Corporate Trainer" },
    { id: "graphic-designer", name: "Graphic Designer" },
    { id: "digital-marketer", name: "Digital Marketer" },
    { id: "content-writer", name: "Content Writer" },
    { id: "video-editor", name: "Video Editor" },
    { id: "photographer", name: "Photographer" },
    { id: "lawyer", name: "Lawyer" },
    { id: "paralegal", name: "Paralegal" },
    { id: "policy-analyst", name: "Policy Analyst" },
    { id: "compliance-officer", name: "Compliance Officer" },
    { id: "entrepreneur", name: "Entrepreneur" },
    { id: "sales-executive", name: "Sales Executive" },
    { id: "customer-success-manager", name: "Customer Success Manager" },
    { id: "supply-chain-analyst", name: "Supply Chain Analyst" },
    { id: "journalist", name: "Journalist" },
  ];

  const getCareerPathInfo = (path: string): CareerPathInfo => {
    const pathInfo: { [key: string]: CareerPathInfo } = {
      frontend: {
        name: "Frontend Developer",
        description: "Build user interfaces and web experiences",
        icon: "🎨",
        color: "from-blue-500 to-cyan-500",
      },
      backend: {
        name: "Backend Developer",
        description: "Develop server-side applications and APIs",
        icon: "⚙️",
        color: "from-green-500 to-emerald-500",
      },
      fullstack: {
        name: "Full Stack Developer",
        description: "Work on both frontend and backend",
        icon: "🚀",
        color: "from-purple-500 to-pink-500",
      },
      "data-scientist": {
        name: "Data Scientist",
        description: "Analyze data and build ML models",
        icon: "📊",
        color: "from-orange-500 to-red-500",
      },
      "mobile-developer": {
        name: "Mobile Developer",
        description: "Build cross-platform mobile apps",
        icon: "📱",
        color: "from-indigo-500 to-purple-500",
      },
      "ml-engineer": {
        name: "ML Engineer",
        description: "Design and deploy machine learning systems",
        icon: "🤖",
        color: "from-yellow-500 to-orange-500",
      },
      "devops-engineer": {
        name: "DevOps Engineer",
        description: "Automate deployments and manage infrastructure",
        icon: "🛠️",
        color: "from-gray-500 to-slate-500",
      },
      "cloud-engineer": {
        name: "Cloud Engineer",
        description: "Build and manage cloud infrastructure",
        icon: "☁️",
        color: "from-sky-500 to-blue-600",
      },
      "ai-engineer": {
        name: "AI Engineer",
        description: "Develop and optimize artificial intelligence models",
        icon: "🧠",
        color: "from-pink-500 to-rose-500",
      },
      "cybersecurity-analyst": {
        name: "Cybersecurity Analyst",
        description: "Protect systems and networks from cyber threats",
        icon: "🛡️",
        color: "from-red-500 to-rose-600",
      },
      "game-developer": {
        name: "Game Developer",
        description: "Design and build video games",
        icon: "🎮",
        color: "from-teal-500 to-cyan-500",
      },
      "blockchain-developer": {
        name: "Blockchain Developer",
        description: "Develop decentralized applications and smart contracts",
        icon: "⛓️",
        color: "from-violet-500 to-indigo-600",
      },
      "embedded-systems-engineer": {
        name: "Embedded Systems Engineer",
        description: "Build software for hardware and IoT devices",
        icon: "🔌",
        color: "from-lime-500 to-green-600",
      },
      "ui-ux-designer": {
        name: "UI/UX Designer",
        description: "Design user interfaces and experiences",
        icon: "✨",
        color: "from-pink-500 to-fuchsia-600",
      },
      "product-manager-tech": {
        name: "Technical Product Manager",
        description: "Lead product strategy with technical expertise",
        icon: "📦",
        color: "from-amber-500 to-orange-600",
      },
      "business-analyst": {
        name: "Business Analyst",
        description: "Analyze business processes and requirements",
        icon: "📈",
        color: "from-green-500 to-emerald-600",
      },
      "project-manager": {
        name: "Project Manager",
        description: "Plan, execute, and deliver projects",
        icon: "📋",
        color: "from-cyan-500 to-blue-600",
      },
      "product-manager": {
        name: "Product Manager",
        description: "Define product vision and roadmap",
        icon: "🎯",
        color: "from-rose-500 to-pink-600",
      },
      "operations-manager": {
        name: "Operations Manager",
        description: "Oversee day-to-day operations",
        icon: "🏭",
        color: "from-gray-600 to-gray-800",
      },
      "hr-specialist": {
        name: "HR Specialist",
        description: "Manage hiring, employee relations, and HR policies",
        icon: "👥",
        color: "from-purple-500 to-indigo-600",
      },
      "financial-analyst": {
        name: "Financial Analyst",
        description: "Analyze financial data and make investment decisions",
        icon: "💰",
        color: "from-green-500 to-lime-600",
      },
      "investment-banker": {
        name: "Investment Banker",
        description: "Manage investments and corporate finance",
        icon: "🏦",
        color: "from-amber-500 to-yellow-600",
      },
      accountant: {
        name: "Accountant",
        description: "Manage financial records and audits",
        icon: "📑",
        color: "from-sky-500 to-cyan-600",
      },
      economist: {
        name: "Economist",
        description: "Research and analyze economic trends",
        icon: "📉",
        color: "from-red-500 to-orange-600",
      },
      actuary: {
        name: "Actuary",
        description: "Analyze risk and uncertainty with math & statistics",
        icon: "➗",
        color: "from-indigo-500 to-blue-600",
      },
      counselor: {
        name: "Counselor",
        description: "Guide individuals through personal challenges",
        icon: "💬",
        color: "from-teal-500 to-emerald-600",
      },
      psychologist: {
        name: "Psychologist",
        description: "Study and support mental health",
        icon: "🧩",
        color: "from-purple-500 to-pink-600",
      },
      nutritionist: {
        name: "Nutritionist",
        description: "Create diet plans for health and wellness",
        icon: "🥗",
        color: "from-lime-500 to-green-600",
      },
      "fitness-trainer": {
        name: "Fitness Trainer",
        description: "Guide physical training and fitness routines",
        icon: "🏋️",
        color: "from-orange-500 to-red-600",
      },
      "public-health-specialist": {
        name: "Public Health Specialist",
        description: "Promote health policies and community wellness",
        icon: "🏥",
        color: "from-emerald-500 to-green-600",
      },
      teacher: {
        name: "Teacher",
        description: "Educate and inspire students",
        icon: "📚",
        color: "from-blue-500 to-indigo-600",
      },
      "educational-consultant": {
        name: "Educational Consultant",
        description: "Provide guidance on learning methods and curricula",
        icon: "🎓",
        color: "from-cyan-500 to-teal-600",
      },
      "research-scientist": {
        name: "Research Scientist",
        description: "Conduct experiments and push scientific boundaries",
        icon: "🔬",
        color: "from-violet-500 to-purple-600",
      },
      "career-coach": {
        name: "Career Coach",
        description: "Guide individuals in career decisions",
        icon: "🗺️",
        color: "from-fuchsia-500 to-pink-600",
      },
      "corporate-trainer": {
        name: "Corporate Trainer",
        description: "Train employees in professional skills",
        icon: "🏢",
        color: "from-slate-500 to-gray-600",
      },
      "graphic-designer": {
        name: "Graphic Designer",
        description: "Design visuals for digital and print media",
        icon: "🎨",
        color: "from-pink-500 to-rose-600",
      },
      "digital-marketer": {
        name: "Digital Marketer",
        description: "Promote brands through digital channels",
        icon: "📢",
        color: "from-yellow-500 to-orange-600",
      },
      "content-writer": {
        name: "Content Writer",
        description: "Write engaging and informative content",
        icon: "✍️",
        color: "from-blue-500 to-cyan-600",
      },
      "video-editor": {
        name: "Video Editor",
        description: "Edit and create compelling video content",
        icon: "🎬",
        color: "from-red-500 to-rose-600",
      },
      photographer: {
        name: "Photographer",
        description: "Capture and edit high-quality photos",
        icon: "📷",
        color: "from-purple-500 to-indigo-600",
      },
      lawyer: {
        name: "Lawyer",
        description: "Provide legal advice and representation",
        icon: "⚖️",
        color: "from-gray-500 to-slate-600",
      },
      paralegal: {
        name: "Paralegal",
        description: "Assist lawyers in case preparation",
        icon: "📜",
        color: "from-amber-500 to-orange-600",
      },
      "policy-analyst": {
        name: "Policy Analyst",
        description: "Evaluate and recommend public policies",
        icon: "📕",
        color: "from-blue-500 to-indigo-600",
      },
      "compliance-officer": {
        name: "Compliance Officer",
        description: "Ensure regulatory and legal compliance",
        icon: "✔️",
        color: "from-green-500 to-emerald-600",
      },
      entrepreneur: {
        name: "Entrepreneur",
        description: "Build and scale new businesses",
        icon: "💡",
        color: "from-pink-500 to-purple-600",
      },
      "sales-executive": {
        name: "Sales Executive",
        description: "Drive business growth through sales",
        icon: "💼",
        color: "from-indigo-500 to-sky-600",
      },
      "customer-success-manager": {
        name: "Customer Success Manager",
        description: "Ensure client satisfaction and retention",
        icon: "🤝",
        color: "from-green-500 to-emerald-600",
      },
      "supply-chain-analyst": {
        name: "Supply Chain Analyst",
        description: "Optimize supply chain and logistics",
        icon: "🚚",
        color: "from-yellow-500 to-orange-600",
      },
      journalist: {
        name: "Journalist",
        description: "Research and report news stories",
        icon: "📰",
        color: "from-sky-500 to-blue-600",
      },
    };

    return (
      pathInfo[path] || {
        name: "Career Path",
        description: "Explore this career path",
        icon: "🎯",
        color: "from-gray-500 to-slate-500",
      }
    );
  };

  // Show loading while fetching user data
  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  // Show error if user data failed to load
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading while fetching courses
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your career roadmap...</p>
        </div>
      </div>
    );
  }

  const pathInfo = getCareerPathInfo(selectedCareerPath);
  const currentPhase = phases.find((p) => p.id === selectedPhase);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
              Career Roadmap
            </h1>
            <p className="text-gray-600">Your personalized learning journey</p>
          </div>

          {/* Career Path Selector */}
          <select
            value={selectedCareerPath}
            onChange={(e) => setSelectedCareerPath(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white text-gray-900 font-medium transition-all hover:border-gray-300"
          >
            {careerPaths.map((path) => (
              <option key={path.id} value={path.id}>
                {path.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-md flex items-center justify-center text-5xl sm:text-6xl flex-shrink-0">
              {pathInfo.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {pathInfo.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {pathInfo.description}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {courses.length}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Total Courses
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {phases.length}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Learning Phases
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {courses.reduce((sum, c) => sum + c.totalLectures, 0)}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Total Lectures
              </div>
            </div>
          </div>
        </div>

        {/* Phase Navigation */}
        {phases.length > 0 && (
          <div className="bg-white border-2 border-gray-100 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">
                Learning Phases
              </h3>
              <span className="text-sm font-medium text-gray-500">
                {phases.length} phases available
              </span>
            </div>

            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {phases.map((phase, index) => (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`relative flex-shrink-0 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                      selectedPhase === phase.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200 scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          selectedPhase === phase.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="text-left">
                        <div className="text-base font-semibold">
                          {phase.title}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            selectedPhase === phase.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {phase.courses.length} courses
                        </div>
                      </div>
                    </div>

                    {selectedPhase === phase.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Course Content */}
        {currentPhase && currentPhase.courses.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentPhase.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {currentPhase.courses.length} courses in this phase
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-100 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">
                  In Progress
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {currentPhase.courses.map((course) => (
                <CourseSection
                  key={course.id}
                  course={course}
                  userId={userId}
                  onProgressUpdate={handleProgressUpdate}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No courses available
              </h3>
              <p className="text-gray-600 mb-6">
                There are no courses available for this phase yet. Check back
                later or try a different phase.
              </p>
              <button
                onClick={fetchCourses}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Refresh Courses
              </button>
            </div>
          </div>
        )}

        {courses.length === 0 && (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center mt-8">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No roadmap data available
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any courses for this career path. Try
                refreshing or selecting a different path.
              </p>
              <button
                onClick={fetchCourses}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRoadmapPage;
