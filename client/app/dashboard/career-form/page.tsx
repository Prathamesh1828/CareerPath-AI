"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, User, Mail, Loader2, Brain } from "lucide-react";
import Link from "next/link";

export default function CareerPathForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    education: "",
    interest: "",
    learningStyle: "",
    personality: "",
    softSkills: "",
    technicalSkills: "",
    careerGoals: "",
    preferredWork: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting form data to Gemini AI:", formData);

      const response = await fetch("/api/career-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        throw new Error(
          `HTTP ${response.status}: ${errorData.error || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log("Received AI recommendations:", data);

      // Store recommendations in localStorage
      localStorage.setItem("careerRecommendations", JSON.stringify(data));

      toast({
        title: "AI Analysis Complete! 🎉",
        description:
          "Your personalized career recommendations are ready. Powered by Gemini AI.",
      });

      // Redirect to results page after a short delay
      setTimeout(() => {
        router.push("/dashboard/recommendations");
      }, 1500);
    } catch (error) {
      console.error("Detailed error:", error);
      toast({
        title: "Analysis Failed",
        description: `${error.message}. Please try again or contact support.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center justify-center">
              <Brain className="h-6 w-6 mr-2 text-indigo-600" />
              CareerPath AI
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill this form to help us analyze and recommend your ideal career
              direction using advanced AI
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* All your existing form fields remain the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      className="pl-10"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g. 21"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, education: value })
                    }
                    value={formData.education}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                      <SelectItem value="Master's">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="interest">Interests</Label>
                <Textarea
                  id="interest"
                  placeholder="E.g. Technology, Business, Arts, Healthcare..."
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learningStyle">Learning Style</Label>
                  <Input
                    id="learningStyle"
                    placeholder="Visual, Auditory, Reading/Writing, Kinesthetic"
                    value={formData.learningStyle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learningStyle: e.target.value,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="personality">Personality Type</Label>
                  <Input
                    id="personality"
                    placeholder="e.g. INTJ, INFJ, ENFP"
                    value={formData.personality}
                    onChange={(e) =>
                      setFormData({ ...formData, personality: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="softSkills">Soft Skills</Label>
                  <Textarea
                    id="softSkills"
                    placeholder="Teamwork, Communication, Leadership..."
                    value={formData.softSkills}
                    onChange={(e) =>
                      setFormData({ ...formData, softSkills: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <Textarea
                    id="technicalSkills"
                    placeholder="Programming, Design, Analytics..."
                    value={formData.technicalSkills}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        technicalSkills: e.target.value,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  placeholder="Your long-term goals and ambitions"
                  value={formData.careerGoals}
                  onChange={(e) =>
                    setFormData({ ...formData, careerGoals: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="preferredWork">
                  Preferred Work Environment
                </Label>
                <Input
                  id="preferredWork"
                  placeholder="Remote, Hybrid, Office, Flexible, etc."
                  value={formData.preferredWork}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredWork: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AI is Analyzing Your Profile...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Get AI Career Recommendations
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
