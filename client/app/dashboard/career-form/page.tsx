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
import { ArrowLeft, User, Mail } from "lucide-react";
import Link from "next/link";

export default function CareerPathForm() {
  const router = useRouter();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submitted Successfully",
      description:
        "We'll analyze your inputs and suggest the best career paths.",
    });
    console.log(formData);
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link> */}

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">CareerPath AI</CardTitle>
            <CardDescription className="text-gray-600">
              Fill this form to help us analyze and recommend your ideal career
              direction
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, education: value })
                    }
                    value={formData.education}
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
                  />
                </div>
                <div>
                  <Label htmlFor="personality">Personality Type</Label>
                  <Input
                    id="personality"
                    placeholder="e.g. INTJ, ENFP"
                    value={formData.personality}
                    onChange={(e) =>
                      setFormData({ ...formData, personality: e.target.value })
                    }
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
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
              >
                Submit & Get Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
