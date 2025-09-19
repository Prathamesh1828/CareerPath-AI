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
import {
  BarChart3,
  BookOpen,
  FileText,
  Map,
  Zap,
  Target,
  TrendingUp,
  Award,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    skillsMatched: 0,
    coursesCompleted: 0,
    careerProgress: 0,
  });

  // Fetch Logged-in User Profile
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Unauthorized",
        description: "No token found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Failed to Fetch User",
          description: data.message || "Unable to fetch user details.",
          variant: "destructive",
        });
        return;
      }

      setUser(data.user);
      toast({
        title: "Welcome!",
        description: `Hello ${data.user.name}`,
      });
    } catch (error) {
      console.error("Fetch User Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong while fetching user details.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
    setIsVisible(true);

    const timer = setTimeout(() => {
      setAnimatedValues({
        resumeScore: 85,
        skillsMatched: 80,
        coursesCompleted: 8,
        careerProgress: 65,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section - Enhanced Mobile Layout */}
        <div
          className={`gradient-animation rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white hover-lift shadow-lg ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3">
                Welcome back, {user ? user.name : "..."}! 🚀
              </h1>
              <p className="text-purple-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                Ready to take the next step in your career journey? Let's see
                what's new today and discover exciting opportunities.
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
              <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-300" />
              <span className="text-xs lg:text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Quick Stats - Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[
            {
              title: "Resume Score",
              value: animatedValues.resumeScore,
              change: "+5% from last update",
              icon: FileText,
              color: "text-[#6C63FF]",
              bgColor: "bg-purple-50",
              gradientColor: "from-purple-500 to-indigo-600",
              trend: "up",
            },
            {
              title: "Skills Matched",
              value: `${animatedValues.skillsMatched}%`,
              change: "3 skills to improve",
              icon: Target,
              color: "text-green-600",
              bgColor: "bg-green-50",
              gradientColor: "from-green-500 to-emerald-600",
              trend: "up",
            },
            {
              title: "Courses Completed",
              value: animatedValues.coursesCompleted,
              change: "2 in progress",
              icon: BookOpen,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              gradientColor: "from-blue-500 to-cyan-600",
              trend: "neutral",
            },
            {
              title: "Career Progress",
              value: `${animatedValues.careerProgress}%`,
              change: "Frontend Developer path",
              icon: Map,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
              gradientColor: "from-orange-500 to-red-600",
              trend: "up",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`group hover-lift transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-md ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-5">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 truncate">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" && (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    )}
                    <span className="text-xs text-green-600 font-medium">
                      {stat.trend === "up" ? "↗" : "→"}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-2 sm:p-2.5 lg:p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${stat.color}`}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-5 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  <div
                    className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${stat.color} flex items-center gap-2`}
                  >
                    {stat.value}
                    {stat.title === "Resume Score" && (
                      <span className="text-xs sm:text-sm text-gray-500 font-normal">
                        /100
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {stat.change}
                  </p>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Progress
                      value={
                        typeof stat.value === "string"
                          ? Number.parseInt(stat.value)
                          : stat.value
                      }
                      className="h-1.5 sm:h-2 lg:h-2.5"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>
                        {stat.title === "Resume Score" ? "100" : "100%"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & AI Recommendations - Enhanced Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Recent Activity Card */}
          <Card
            className={`hover-lift shadow-md border-0 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="p-4 sm:p-6 lg:p-7 pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 bg-[#6C63FF]/10 rounded-lg">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#6C63FF]" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Your latest career development activities
                    </CardDescription>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-7 pt-0">
              {[
                {
                  activity: "Resume analyzed",
                  description: "ATS compatibility improved",
                  time: "2 hours ago",
                  badge: "+5 points",
                  color: "bg-[#6C63FF]",
                  icon: FileText,
                },
                {
                  activity: "Completed React Fundamentals",
                  description: "Certificate earned",
                  time: "1 day ago",
                  badge: "Certificate",
                  color: "bg-green-600",
                  icon: Award,
                },
                {
                  activity: "Updated career roadmap",
                  description: "3 new milestones added",
                  time: "3 days ago",
                  badge: "Progress",
                  color: "bg-blue-600",
                  icon: Map,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color} rounded-lg flex items-center justify-center`}
                    >
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {item.activity}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="animate-pulse-custom text-xs whitespace-nowrap bg-white border border-gray-200 group-hover:border-gray-300"
                      >
                        {item.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations Card */}
          <Card
            className={`hover-lift shadow-md border-0 ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <CardHeader className="p-4 sm:p-6 lg:p-7 pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                      AI Recommendations
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Personalized suggestions for your career growth
                    </CardDescription>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-purple-700">
                    AI
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-7 pt-0">
              {[
                {
                  type: "Skill Gap Alert",
                  message:
                    "Consider learning TypeScript to match 90% of Frontend Developer job requirements",
                  bgColor: "bg-gradient-to-r from-purple-50 to-purple-100",
                  borderColor: "border-purple-200",
                  textColor: "text-purple-900",
                  subTextColor: "text-purple-700",
                  icon: Target,
                  priority: "High",
                },
                {
                  type: "Course Recommendation",
                  message:
                    '"Advanced React Patterns" course aligns with your career goals',
                  bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
                  borderColor: "border-blue-200",
                  textColor: "text-blue-900",
                  subTextColor: "text-blue-700",
                  icon: BookOpen,
                  priority: "Medium",
                },
                {
                  type: "Resume Tip",
                  message:
                    "Add more quantifiable achievements to boost your ATS score",
                  bgColor: "bg-gradient-to-r from-green-50 to-green-100",
                  borderColor: "border-green-200",
                  textColor: "text-green-900",
                  subTextColor: "text-green-700",
                  icon: FileText,
                  priority: "Low",
                },
              ].map((rec, index) => (
                <div
                  key={index}
                  className={`group p-3 sm:p-4 ${rec.bgColor} rounded-lg sm:rounded-xl border ${rec.borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className={`p-1.5 sm:p-2 ${rec.bgColor} rounded-lg border ${rec.borderColor}`}
                    >
                      <rec.icon
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${rec.textColor}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p
                          className={`text-xs sm:text-sm font-semibold ${rec.textColor}`}
                        >
                          {rec.type}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs px-1.5 py-0.5 ${
                            rec.priority === "High"
                              ? "border-red-300 text-red-700"
                              : rec.priority === "Medium"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-green-300 text-green-700"
                          }`}
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p
                        className={`text-xs sm:text-sm ${rec.subTextColor} line-clamp-3 leading-relaxed`}
                      >
                        {rec.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights - New Section */}
        <Card
          className={`hover-lift shadow-md border-0 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
          style={{ animationDelay: "0.8s" }}
        >
          <CardHeader className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  Performance Insights
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 mt-1">
                  Your career development metrics at a glance
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live data</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  metric: "Profile Views",
                  value: "247",
                  change: "+12%",
                  period: "This week",
                  color: "text-blue-600",
                },
                {
                  metric: "Applications Sent",
                  value: "23",
                  change: "+8%",
                  period: "This month",
                  color: "text-purple-600",
                },
                {
                  metric: "Interview Invites",
                  value: "5",
                  change: "+25%",
                  period: "Last 30 days",
                  color: "text-green-600",
                },
                {
                  metric: "Learning Streak",
                  value: "15 days",
                  change: "Current",
                  period: "Best: 28 days",
                  color: "text-orange-600",
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold ${insight.color} mb-1`}
                  >
                    {insight.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                    {insight.metric}
                  </div>
                  <div className="text-xs text-green-600 font-medium mb-1">
                    {insight.change}
                  </div>
                  <div className="text-xs text-gray-500">{insight.period}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
