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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    skillsMatched: 0,
    coursesCompleted: 0,
    careerProgress: 0,
  });

  // Counselor form
  const [showCounselorForm, setShowCounselorForm] = useState(false);
  const [counselorForm, setCounselorForm] = useState({
    name: "",
    advisor: "",
    field: "",
    bio: "",
    experience: "",
    email: "",
  });

  // Review form
  const [reviewForm, setReviewForm] = useState({
    name: "",
    position: "",
    review: "",
  });
  const [reviews, setReviews] = useState<
    { name: string; position: string; review: string }[]
  >([]);

  // Review submit handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.position || !reviewForm.review) {
      toast({
        title: "Error",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    setReviews([...reviews, reviewForm]);
    setReviewForm({ name: "", position: "", review: "" });
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your feedback!",
    });
  };

  // Counselor submit handler
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
      description: `Thanks ${counselorForm.name}, we’ll review your request!`,
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

  // Fetch user
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
        {/* Welcome */}
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
                Ready to take the next step in your career journey? Let’s see
                what’s new today and discover exciting opportunities.
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
              <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-300" />
              <span className="text-xs lg:text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[
            {
              title: "Resume Score",
              value: animatedValues.resumeScore,
              change: "+5% from last update",
              icon: FileText,
              color: "text-[#6C63FF]",
              bgColor: "bg-purple-50",
              trend: "up",
            },
            {
              title: "Skills Matched",
              value: `${animatedValues.skillsMatched}%`,
              change: "3 skills to improve",
              icon: Target,
              color: "text-green-600",
              bgColor: "bg-green-50",
              trend: "up",
            },
            {
              title: "Courses Completed",
              value: animatedValues.coursesCompleted,
              change: "2 in progress",
              icon: BookOpen,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              trend: "neutral",
            },
            {
              title: "Career Progress",
              value: `${animatedValues.careerProgress}%`,
              change: "Frontend Developer path",
              icon: Map,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
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
                <span className="text-xs font-medium text-purple-700">AI</span>
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

      {/* Reviews Section */}
      <Card className="hover:shadow-xl transition-shadow duration-300 border-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Submit a Review
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 sm:mt-2">
            Share your experience with others 🚀
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <form
            onSubmit={handleReviewSubmit}
            className="space-y-3 sm:space-y-4"
          >
            <Input
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, name: e.target.value })
              }
              className="focus:ring-2 focus:ring-cyan-300"
            />
            <Input
              placeholder="Your Position (e.g., Software Engineer at Google)"
              value={reviewForm.position}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, position: e.target.value })
              }
              className="focus:ring-2 focus:ring-cyan-300"
            />
            <Textarea
              placeholder="Write your review..."
              value={reviewForm.review}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, review: e.target.value })
              }
              className="focus:ring-2 focus:ring-cyan-300 resize-none"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
            >
              Submit Review
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg sm:text-xl">
              What others say:
            </h3>
            {reviews.length === 0 && (
              <p className="text-gray-500 text-sm sm:text-base">
                No reviews yet. Be the first!
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="font-medium text-gray-800">{r.name}</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    {r.position}
                  </p>
                  <p className="text-gray-800 mt-2 sm:mt-3">{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Counselor Section */}
      <Card className="hover:shadow-xl transition-shadow duration-300 border-0 rounded-xl overflow-hidden mt-6 sm:mt-8">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Want to be a Counselor?
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 sm:mt-2">
            Help others by guiding them in their career journey 🌟
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          {!showCounselorForm ? (
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              onClick={() => setShowCounselorForm(true)}
            >
              Click Me
            </Button>
          ) : (
            <form
              onSubmit={handleCounselorSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <Input
                placeholder="Your Name"
                value={counselorForm.name}
                onChange={(e) =>
                  setCounselorForm({ ...counselorForm, name: e.target.value })
                }
                className="focus:ring-2 focus:ring-emerald-300"
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
                className="focus:ring-2 focus:ring-emerald-300"
              />
              <Input
                placeholder="Field (e.g., AI, Web Development)"
                value={counselorForm.field}
                onChange={(e) =>
                  setCounselorForm({ ...counselorForm, field: e.target.value })
                }
                className="focus:ring-2 focus:ring-emerald-300"
              />
              <Textarea
                placeholder="Short Bio"
                value={counselorForm.bio}
                onChange={(e) =>
                  setCounselorForm({ ...counselorForm, bio: e.target.value })
                }
                className="focus:ring-2 focus:ring-emerald-300 resize-none"
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
                className="focus:ring-2 focus:ring-emerald-300"
              />
              <Input
                type="email"
                placeholder="Email"
                value={counselorForm.email}
                onChange={(e) =>
                  setCounselorForm({ ...counselorForm, email: e.target.value })
                }
                className="focus:ring-2 focus:ring-emerald-300"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              >
                Submit Request
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
