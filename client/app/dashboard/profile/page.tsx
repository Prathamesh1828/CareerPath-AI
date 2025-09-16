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
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast as shadcnToast } from "@/components/ui/use-toast";

const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  bio: "Passionate frontend developer with 3+ years of experience building modern web applications. Love working with React, TypeScript, and creating user-friendly interfaces.",
  skills: [
    { name: "JavaScript", level: "Advanced", verified: true },
    { name: "React", level: "Advanced", verified: true },
    { name: "TypeScript", level: "Intermediate", verified: false },
    { name: "HTML/CSS", level: "Advanced", verified: true },
    { name: "Node.js", level: "Intermediate", verified: false },
    { name: "Python", level: "Beginner", verified: false },
  ],
  resumeHistory: [
    {
      id: 1,
      name: "John_Doe_Resume_v3.pdf",
      uploadDate: "2024-01-15",
      score: 85,
    },
    {
      id: 2,
      name: "John_Doe_Resume_v2.pdf",
      uploadDate: "2023-12-10",
      score: 78,
    },
    {
      id: 3,
      name: "John_Doe_Resume_v1.pdf",
      uploadDate: "2023-11-05",
      score: 72,
    },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profileData, setProfileData] = useState({
    name: mockUserData.name,
    email: mockUserData.email,
    phone: mockUserData.phone,
    location: mockUserData.location,
    linkedin: mockUserData.linkedin,
    github: mockUserData.github,
    bio: mockUserData.bio,
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
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Skills Management

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };
  const addSkill = () => {
    if (selectedSkill && selectedLevel) {
      if (!skills.find((s) => s.name === selectedSkill)) {
        setSkills([...skills, { name: selectedSkill, level: selectedLevel }]);
      }
      setSelectedSkill("");
      setSelectedLevel("");
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillName));
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-gray-200 text-gray-700";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-200 text-gray-700";
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
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      skills: skills.map((s) => s.name), // only send names (or modify schema for {name, level})
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Skill Submit Response:", data);

      if (!res.ok) {
        return toast({
          title: "Error",
          description: data.message || "Failed to save profile.",
          variant: "destructive",
        });
      }

      toast({
        title: "Success!",
        description: "Your profile has been saved.",
        variant: "default",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Profile Submit Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Profile & Skills Management
          </h1>
          <p className="text-gray-600">
            Manage your personal information and track your skills
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="skills">Skills Management</TabsTrigger>
          <TabsTrigger value="resume">Resume History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-[#6C63FF] text-white text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                    <Badge variant="outline">Frontend Developer</Badge>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#6C63FF]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span className="text-gray-900">{profileData.name}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span className="text-gray-900">{profileData.email}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span className="text-gray-900">{profileData.phone}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span className="text-gray-900">
                        {profileData.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            linkedin: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <a
                        href={`https://${profileData.linkedin}`}
                        className="text-[#6C63FF] hover:underline"
                      >
                        {profileData.linkedin}
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            github: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <a
                        href={`https://${profileData.github}`}
                        className="text-[#6C63FF] hover:underline"
                      >
                        {profileData.github}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Tell us about your professional background and interests..."
                  />
                ) : (
                  <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Add New Skill */}
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-3xl space-y-6">
              {/* Header */}
              <Card>
                <CardHeader>
                  <CardTitle>CareerPath AI</CardTitle>
                  <CardDescription>
                    Fill this form to help us analyze and recommend your ideal
                    learning path
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardContent className="space-y-4 mt-4">
                    {/* Current Role */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Role
                      </label>
                      <Input
                        type="text"
                        name="currentRole"
                        placeholder="e.g. Frontend Developer"
                        value={formData.currentRole}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Experience
                      </label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            experience: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 outline-none">
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
                    </div>
                    {/* Career Goals */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Career Goals
                      </label>
                      <Input
                        type="text"
                        name="careerGoals"
                        placeholder="e.g. Full Stack Development, React Native"
                        value={formData.careerGoals}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Preferred Platforms */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Preferred Platforms
                      </label>
                      <Input
                        type="text"
                        name="preferredPlatforms"
                        placeholder="e.g. Udemy, Coursera"
                        value={formData.preferredPlatforms}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Budget
                      </label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, budget: value }))
                        }
                      >
                        <SelectTrigger className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 outline-none">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Time Commitment */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Time Commitment
                      </label>
                      <Select
                        value={formData.timeCommitment}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            timeCommitment: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-500 focus:border-indigo-500">
                          <SelectValue placeholder="Select commitment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Learning Style */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Learning Style
                      </label>
                      <Input
                        type="text"
                        name="learningStyle"
                        placeholder="e.g. Project-based, Visual, Reading/Writing"
                        value={formData.learningStyle}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Skill</CardTitle>
                    <CardDescription>
                      Select a skill and proficiency level to add to your
                      profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                      {/* Skill Dropdown */}
                      <Select
                        onValueChange={setSelectedSkill}
                        value={selectedSkill}
                      >
                        <SelectTrigger className="w-full md:w-1/2">
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

                      {/* Level Dropdown */}
                      <Select
                        onValueChange={setSelectedLevel}
                        value={selectedLevel}
                      >
                        <SelectTrigger className="w-full md:w-1/4">
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={addSkill}
                        type="button"
                        className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Skills</CardTitle>
                    <CardDescription>
                      Manage your skills and proficiency levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {skill.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSkill(skill.name)}
                              className="h-6 w-6 text-gray-400 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Badge className={getLevelColor(skill.level)}>
                              {skill.level}
                            </Badge>
                            {skill.verified && (
                              <Badge className="bg-green-100 text-green-800 ml-2">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Profile"}
                </Button>
              </form>
            </div>
          </div>

          {/* LinkedIn Integration */}
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Integration</CardTitle>
              <CardDescription>
                Connect your LinkedIn profile to automatically sync your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Connect LinkedIn
                    </p>
                    <p className="text-sm text-blue-700">
                      Auto-import your skills and experience
                    </p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Connect Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          {/* Upload New Resume */}
          <Card>
            <CardHeader>
              <CardTitle>Upload New Resume</CardTitle>
              <CardDescription>
                Keep your resume up to date for better analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#6C63FF] transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF, DOC, and DOCX files
                </p>
                <Button className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white">
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume History */}
          <Card>
            <CardHeader>
              <CardTitle>Resume Analysis History</CardTitle>
              <CardDescription>
                View your previous resume uploads and their analysis scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserData.resumeHistory.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-[#6C63FF]" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {resume.name}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Uploaded on{" "}
                            {new Date(resume.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-medium text-[#6C63FF]">
                          Score: {resume.score}/100
                        </p>
                        <p className="text-sm text-gray-600">
                          {resume.score >= 80
                            ? "Excellent"
                            : resume.score >= 70
                            ? "Good"
                            : "Needs Improvement"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Analysis
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
function toast(arg0: { title: string; description: any; variant: string }) {
  throw new Error("Function not implemented.");
}
