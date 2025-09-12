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
import { BarChart3, BookOpen, FileText, Map, Zap, Target } from "lucide-react";
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
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div
        className={`gradient-animation rounded-lg p-4 sm:p-6 text-white hover-lift ${
          isVisible ? "animate-fadeInUp" : "opacity-0"
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Welcome back, {user ? user.name : "..."}! 🚀
        </h1>
        <p className="text-purple-100 text-sm sm:text-base">
          Ready to take the next step in your career journey? Let's see what's
          new today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            title: "Resume Score",
            value: animatedValues.resumeScore,
            change: "+5% from last update",
            icon: FileText,
            color: "text-[#6C63FF]",
            bgColor: "bg-purple-50",
          },
          {
            title: "Skills Matched",
            value: `${animatedValues.skillsMatched}%`,
            change: "3 skills to improve",
            icon: Target,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Courses Completed",
            value: animatedValues.coursesCompleted,
            change: "2 in progress",
            icon: BookOpen,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Career Progress",
            value: `${animatedValues.careerProgress}%`,
            change: "Frontend Developer path",
            icon: Map,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className={`hover-lift transition-all duration-300 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-medium line-clamp-2">
                {stat.title}
              </CardTitle>
              <div
                className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} transition-transform duration-300 hover:scale-110`}
              >
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div
                className={`text-lg sm:text-2xl font-bold ${stat.color} mb-1 sm:mb-2`}
              >
                {stat.value}
                {stat.title === "Resume Score" && "/100"}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {stat.change}
              </p>
              <Progress
                value={
                  typeof stat.value === "string"
                    ? Number.parseInt(stat.value)
                    : stat.value
                }
                className="mt-2 h-1.5 sm:h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card
          className={`hover-lift ${
            isVisible ? "animate-slideInLeft" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#6C63FF]" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm">
              Your latest career development activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {[
              {
                activity: "Resume analyzed",
                time: "2 hours ago",
                badge: "+5 points",
                color: "bg-[#6C63FF]",
              },
              {
                activity: "Completed React Fundamentals",
                time: "1 day ago",
                badge: "Certificate",
                color: "bg-green-600",
              },
              {
                activity: "Updated career roadmap",
                time: "3 days ago",
                badge: "Progress",
                color: "bg-blue-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div
                  className={`w-2 h-2 ${item.color} rounded-full animate-pulse-custom flex-shrink-0`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {item.activity}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="animate-pulse-custom text-xs"
                >
                  {item.badge}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card
          className={`hover-lift ${
            isVisible ? "animate-slideInRight" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#6C63FF]" />
              AI Recommendations
            </CardTitle>
            <CardDescription className="text-sm">
              Personalized suggestions for your career growth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {[
              {
                type: "Skill Gap Alert",
                message:
                  "Consider learning TypeScript to match 90% of Frontend Developer job requirements",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                textColor: "text-purple-900",
                subTextColor: "text-purple-700",
              },
              {
                type: "Course Recommendation",
                message:
                  '"Advanced React Patterns" course aligns with your career goals',
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                textColor: "text-blue-900",
                subTextColor: "text-blue-700",
              },
              {
                type: "Resume Tip",
                message:
                  "Add more quantifiable achievements to boost your ATS score",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                textColor: "text-green-900",
                subTextColor: "text-green-700",
              },
            ].map((rec, index) => (
              <div
                key={index}
                className={`p-2 sm:p-3 ${rec.bgColor} rounded-lg border ${rec.borderColor} hover:shadow-md transition-all duration-300 hover-lift`}
              >
                <p
                  className={`text-xs sm:text-sm font-medium ${rec.textColor}`}
                >
                  {rec.type}
                </p>
                <p className={`text-xs ${rec.subTextColor} mt-1 line-clamp-2`}>
                  {rec.message}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
