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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Plus,
  X,
  Upload,
  FileText,
  Calendar,
  Edit2,
  Save,
  Camera,
  LogOut,
  Star,
  Award,
  Target,
  BookOpen,
  Brain,
  Zap,
  CheckCircle,
  ExternalLink,
  Download,
  RefreshCw,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Copy,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  bio: "Passionate frontend developer with 3+ years of experience building modern web applications. Love working with React, TypeScript, and creating user-friendly interfaces.",
  skills: [],
  resumeHistory: [
    {
      id: 1,
      name: "John_Doe_Resume_v3.pdf",
      uploadDate: "2024-01-15",
      score: 85,
      size: "245 KB",
    },
    {
      id: 2,
      name: "John_Doe_Resume_v2.pdf",
      uploadDate: "2023-12-10",
      score: 78,
      size: "232 KB",
    },
    {
      id: 3,
      name: "John_Doe_Resume_v1.pdf",
      uploadDate: "2023-11-05",
      score: 72,
      size: "198 KB",
    },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    bio: "",
  });

  const [formData, setFormData] = useState({
    currentRole: "",
    experience: "",
    careerGoals: "",
    preferredPlatforms: "",
    budget: "",
    timeCommitment: "",
    learningStyle: "",
  });

  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");
  const [isLoading, setIsLoading] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    const savedFormData = localStorage.getItem("formData");
    const savedSkills = localStorage.getItem("skills");
    const savedImage = localStorage.getItem("profileImage");

    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [profileImage]);

  const calculateProfileCompleteness = () => {
    let completed = 0;
    const total = 10;

    if (profileData.name) completed++;
    if (profileData.email) completed++;
    if (profileData.phone) completed++;
    if (profileData.location) completed++;
    if (profileData.linkedin) completed++;
    if (profileData.github) completed++;
    if (profileData.bio && profileData.bio.length > 20) completed++;
    if (skills.length >= 3) completed++;
    if (formData.currentRole) completed++;
    if (formData.experience) completed++;

    setProfileCompleteness(Math.round((completed / total) * 100));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast({
          title: "Image Uploaded!",
          description: "Your profile image has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem("token");
    localStorage.removeItem("profileData");
    localStorage.removeItem("formData");
    localStorage.removeItem("skills");
    localStorage.removeItem("profileImage");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    router.push("/login");
  };

  const addSkill = () => {
    if (selectedSkill && selectedLevel) {
      if (!skills.find((s) => s.name === selectedSkill)) {
        setSkills([
          ...skills,
          { name: selectedSkill, level: selectedLevel, verified: false },
        ]);
        toast({
          title: "Skill Added!",
          description: `${selectedSkill} has been added to your profile.`,
        });
      }
      setSelectedSkill("");
      setSelectedLevel("Intermediate");
    }
  };

  const removeSkill = (skillName) => {
    setSkills(skills.filter((skill) => skill.name !== skillName));
    toast({
      title: "Skill Removed",
      description: `${skillName} has been removed from your profile.`,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const skillOptions = [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Java",
    "Spring Boot",
    "C++",
    "SQL",
    "MongoDB",
    "GraphQL",
    "Tailwind CSS",
    "Next.js",
    "React Native",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "Jest",
    "Cypress",
  ];

  useEffect(() => {
    setIsVisible(true);
    calculateProfileCompleteness();
  }, [profileData, skills, formData]);

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
  }, []);

  // Fixed: Wrapped the orphaned code in handleSubmit function
  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      ...formData,
      skills: skills.map((s) => ({ name: s.name, level: s.level })),
      careerGoals: formData.careerGoals.split(",").map((g) => g.trim()),
      preferredPlatforms: formData.preferredPlatforms
        .split(",")
        .map((p) => p.trim()),
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...formData, skills }),
      });

      const data = await res.json();
      console.log("Skill Save Response:", data);

      if (!res.ok) {
        return toast({
          title: "Error",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        });
      }

      toast({
        title: "Success!",
        description: "Your profile and skills have been saved.",
      });

      router.push("/dashboard/course-explorer");
    } catch (error) {
      console.error("Save Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Profile
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Manage your information & skills
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button
                  onClick={() =>
                    isEditing ? handleSaveProfile() : setIsEditing(true)
                  }
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                  size="sm"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="sm:hidden p-2"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="sm:hidden mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
              <Button
                onClick={() =>
                  isEditing ? handleSaveProfile() : setIsEditing(true)
                }
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Profile Completeness Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      Profile Completeness
                    </h3>
                    <span className="text-lg sm:text-xl font-bold text-purple-600">
                      {profileCompleteness}%
                    </span>
                  </div>
                  <Progress value={profileCompleteness} className="h-2" />
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    Complete your profile to get better recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Tab Selector */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={`space-y-4 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="sm:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full h-12 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profile">👤 Profile Info</SelectItem>
                  <SelectItem value="skills">🎯 Skills Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tab List */}
            <div className="hidden sm:block">
              <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 rounded-xl p-1">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Info
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Skills Management
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profile Info Tab - Mobile Optimized */}
            <TabsContent value="profile" className="space-y-4 sm:space-y-6">
              {/* Profile Header Card */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    {/* Avatar Section */}
                    <div className="relative">
                      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-lg">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl sm:text-2xl">
                            {profileData.name
                              ? profileData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                        onClick={() =>
                          document.getElementById("imageUpload")?.click()
                        }
                      >
                        <Camera className="h-3 w-3 text-white" />
                      </Button>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {profileData.name || "User Name"}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">
                        {profileData.email || "user@example.com"}
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Active
                        </Badge>
                        {formData.currentRole && (
                          <Badge variant="outline" className="text-xs">
                            {formData.currentRole}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions - Mobile */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-initial"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">View Public</span>
                        <span className="sm:hidden">Public</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-initial"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Copy Link</span>
                        <span className="sm:hidden">Copy</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information Card */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) =>
                              handleProfileChange("name", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border text-gray-900">
                            {profileData.name || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              handleProfileChange("email", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border text-gray-900">
                            {profileData.email || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) =>
                              handleProfileChange("phone", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border text-gray-900">
                            {profileData.phone || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location Field */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        Location
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) =>
                              handleProfileChange("location", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="Enter your location"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border text-gray-900">
                            {profileData.location || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* LinkedIn Field */}
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-medium">
                        LinkedIn Profile
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="linkedin"
                            value={profileData.linkedin}
                            onChange={(e) =>
                              handleProfileChange("linkedin", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="linkedin.com/in/username"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border">
                            {profileData.linkedin ? (
                              <a
                                href={`https://${profileData.linkedin}`}
                                className="text-purple-600 hover:underline flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {profileData.linkedin}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-gray-500">
                                Not provided
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* GitHub Field */}
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-sm font-medium">
                        GitHub Profile
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Github className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <Input
                            id="github"
                            value={profileData.github}
                            onChange={(e) =>
                              handleProfileChange("github", e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-purple-500"
                            placeholder="github.com/username"
                          />
                        ) : (
                          <div className="pl-10 h-12 flex items-center bg-gray-50 rounded-lg border">
                            {profileData.github ? (
                              <a
                                href={`https://${profileData.github}`}
                                className="text-purple-600 hover:underline flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {profileData.github}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-gray-500">
                                Not provided
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Professional Bio
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) =>
                          handleProfileChange("bio", e.target.value)
                        }
                        className="border-2 focus:border-purple-500 resize-none"
                        placeholder="Tell us about your professional background and interests..."
                      />
                    ) : (
                      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border min-h-[100px] text-gray-700 leading-relaxed">
                        {profileData.bio || "Not provided"}
                      </div>
                    )}
                    {isEditing && (
                      <p className="text-xs text-gray-500">
                        {profileData.bio.length}/500 characters
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Career Preferences Card */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    Career Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Current Role
                      </Label>
                      {isEditing ? (
                        <Input
                          value={formData.currentRole}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              currentRole: e.target.value,
                            })
                          }
                          className="h-12 border-2 focus:border-purple-500"
                          placeholder="e.g. Frontend Developer"
                        />
                      ) : (
                        <div className="h-12 flex items-center bg-gray-50 rounded-lg border px-3 text-gray-900">
                          {formData.currentRole || "Not provided"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Experience Level
                      </Label>
                      {isEditing ? (
                        <Select
                          value={formData.experience}
                          onValueChange={(value) =>
                            setFormData({ ...formData, experience: value })
                          }
                        >
                          <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="h-12 flex items-center bg-gray-50 rounded-lg border px-3 text-gray-900">
                          {formData.experience || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Career Goals</Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.careerGoals}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            careerGoals: e.target.value,
                          })
                        }
                        className="border-2 focus:border-purple-500 resize-none"
                        rows={3}
                        placeholder="e.g. Full Stack Development, React Native, DevOps"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border min-h-[80px] text-gray-700">
                        {formData.careerGoals || "Not provided"}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Management Tab - Mobile Optimized */}
            <TabsContent value="skills" className="space-y-4 sm:space-y-6">
              {/* Add Skill Card */}
              <div className="space-y-6">
                {/* Career Form */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      Career Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Fill your learning preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                    {Object.keys(formData).map((field) => {
                      const renderInput = () => {
                        if (field === "experience") {
                          return (
                            <Select
                              onValueChange={(value) =>
                                setFormData({ ...formData, [field]: value })
                              }
                              value={formData.experience}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">
                                  Beginner
                                </SelectItem>
                                <SelectItem value="Intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        } else if (field === "timeCommitment") {
                          return (
                            <Select
                              onValueChange={(value) =>
                                setFormData({ ...formData, [field]: value })
                              }
                              value={formData.timeCommitment}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time commitment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="part-time">
                                  Part-time
                                </SelectItem>
                                <SelectItem value="full-time">
                                  Full-time
                                </SelectItem>
                                <SelectItem value="flexible">
                                  Flexible
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        } else if (field === "budget") {
                          return (
                            <Select
                              onValueChange={(value) =>
                                setFormData({ ...formData, [field]: value })
                              }
                              value={formData.budget}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        } else {
                          return (
                            <Input
                              value={(formData as any)[field]}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [field]: e.target.value,
                                })
                              }
                            />
                          );
                        }
                      };

                      return (
                        <div key={field} className="space-y-2">
                          <Label className="capitalize">{field}</Label>
                          {renderInput()}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Skill Form */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <div className="p-1.5 bg-blue-200 rounded-lg">
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      Add New Skill
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Build your skill profile to get better job matches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm font-medium">Skill</Label>
                        <Select
                          onValueChange={setSelectedSkill}
                          value={selectedSkill}
                        >
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {skillOptions.map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1 sm:w-40 space-y-2">
                        <Label className="text-sm font-medium">Level</Label>
                        <Select
                          onValueChange={setSelectedLevel}
                          value={selectedLevel}
                        >
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={addSkill}
                        className="h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills List */}
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 rounded-lg">
                          <Brain className="h-4 w-4 text-purple-600" />
                        </div>
                        Your Skills ({skills.length})
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    {skills.length === 0 ? (
                      <p className="text-center text-sm text-gray-500">
                        No skills added yet
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="group p-4 border-2 border-gray-200 rounded-xl bg-white"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">
                                {skill.name}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSkill(skill.name)}
                                className="p-1 h-auto text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <Badge className="text-xs border">
                              {skill.level}
                            </Badge>
                            {!skill.verified && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs mt-2"
                              >
                                <Shield className="h-3 w-3 mr-1" />
                                Get Verified
                              </Button>
                            )}
                            {skill.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs mt-2 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Verified
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>Save Profile & Skills</>
                  )}
                </Button>
              </div>
              {/* LinkedIn Integration */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">
                    LinkedIn Integration
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Connect your LinkedIn profile to automatically sync your
                    skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 bg-white rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Linkedin className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="font-semibold text-blue-900 text-sm sm:text-base">
                          Connect LinkedIn
                        </p>
                        <p className="text-xs sm:text-sm text-blue-700">
                          Auto-import skills and experience
                        </p>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Connect Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resume History Tab - Mobile Optimized */}
            <TabsContent value="resume" className="space-y-4 sm:space-y-6">
              {/* Upload New Resume */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="p-1.5 bg-green-200 rounded-lg">
                      <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    Upload New Resume
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Keep your resume up to date for better analysis and job
                    matching
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-6 sm:p-8 text-center hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 cursor-pointer group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">
                      Drag and drop your resume here
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      or click to browse â€¢ Supports PDF, DOC, and DOCX files
                      â€¢ Max 10MB
                    </p>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Resume History */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="p-1.5 bg-orange-100 rounded-lg">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                    </div>
                    Resume Analysis History
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    View your previous resume uploads and their analysis scores
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {mockUserData.resumeHistory.map((resume) => (
                      <div
                        key={resume.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-purple-300 transition-all duration-300 bg-white"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                              {resume.name}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(
                                    resume.uploadDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="hidden sm:inline">â€¢</span>
                              <span>{resume.size}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-2 sm:gap-1">
                          <div className="text-left sm:text-right">
                            <div className="flex items-center gap-2 sm:justify-end">
                              <div
                                className={`text-base sm:text-lg font-bold ${
                                  resume.score >= 80
                                    ? "text-green-600"
                                    : resume.score >= 70
                                    ? "text-blue-600"
                                    : "text-orange-600"
                                }`}
                              >
                                {resume.score}/100
                              </div>
                              <TrendingUp
                                className={`h-4 w-4 ${
                                  resume.score >= 80
                                    ? "text-green-600"
                                    : resume.score >= 70
                                    ? "text-blue-600"
                                    : "text-orange-600"
                                }`}
                              />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {resume.score >= 80
                                ? "Excellent"
                                : resume.score >= 70
                                ? "Good"
                                : "Needs Improvement"}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button - Mobile Floating */}
          {isEditing && (
            <div className="fixed bottom-4 left-4 right-4 sm:relative sm:bottom-auto sm:left-auto sm:right-auto z-50">
              <Button
                onClick={handleSaveProfile}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl h-12"
              >
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 sm:h-8" />
    </div>
  );
}
